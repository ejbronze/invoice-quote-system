const fs = require("fs/promises");
const path = require("path");
const ExcelJS = require("exceljs");

const CURRENCY_FORMAT = '"$"#,##0.00;[Red]-"$"#,##0.00';

function sendJson(response, statusCode, payload) {
    response.statusCode = statusCode;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(JSON.stringify(payload));
}

function parseDateValue(value) {
    if (!value) {
        return null;
    }

    const normalized = String(value).trim();
    const match = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const parsed = match
        ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
        : new Date(normalized);

    return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDate(value) {
    const parsed = parseDateValue(value);
    if (!parsed) {
        return String(value || "");
    }

    return parsed.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

function toNumber(value) {
    const numeric = Number.parseFloat(value);
    return Number.isFinite(numeric) ? numeric : 0;
}

function normalizeInvoice(invoice, index) {
    const items = Array.isArray(invoice?.items) ? invoice.items : [];
    const payments = Array.isArray(invoice?.payments)
        ? invoice.payments
            .filter(payment => payment && typeof payment === "object")
            .map((payment, paymentIndex) => ({
                id: String(payment.id || `payment-${index + 1}-${paymentIndex + 1}`),
                date: String(payment.date || payment.createdAt || "").slice(0, 10),
                amount: Math.max(0, toNumber(payment.amount)),
                method: String(payment.method || "").trim(),
                reference: String(payment.reference || "").trim(),
                notes: String(payment.notes || "").trim()
            }))
            .filter(payment => payment.amount > 0)
        : [];

    return {
        id: String(invoice?.id || `invoice-${index + 1}`),
        type: String(invoice?.type || "invoice").toLowerCase(),
        refNumber: String(invoice?.refNumber || invoice?.invoiceNumber || `Invoice ${index + 1}`),
        date: String(invoice?.date || invoice?.invoiceDate || ""),
        clientName: String(invoice?.clientName || ""),
        clientAddress: String(invoice?.clientAddress || ""),
        consigneeName: String(invoice?.consigneeName || ""),
        consigneeAddress: String(invoice?.consigneeAddress || ""),
        poNumber: String(invoice?.poNumber || invoice?.poNumbers || ""),
        paymentStatus: String(invoice?.paymentStatus || invoice?.status || "unpaid"),
        paymentTerms: String(invoice?.paymentTerms || ""),
        notes: String(invoice?.notes || ""),
        subtotal: toNumber(invoice?.subtotal || invoice?.total),
        total: toNumber(invoice?.total || invoice?.invoiceValue || invoice?.subtotal),
        includeSignature: invoice?.includeSignature !== false,
        includeStamp: Boolean(invoice?.includeStamp),
        payments,
        items: items.map((item, itemIndex) => ({
            itemNo: item?.itemNo || itemIndex + 1,
            description: String(item?.description || ""),
            quantity: toNumber(item?.quantity),
            unitPrice: toNumber(item?.unitPrice || item?.price),
            totalPrice: toNumber(item?.totalPrice || item?.total || (toNumber(item?.quantity) * toNumber(item?.unitPrice || item?.price))),
            internalCost: toNumber(item?.internalCost),
            upchargePercent: toNumber(item?.upchargePercent)
        }))
    };
}

function resolveInvoiceCredit(invoice) {
    if (Array.isArray(invoice?.payments) && invoice.payments.length) {
        return invoice.payments.reduce((sum, payment) => sum + toNumber(payment.amount), 0);
    }

    const explicitCredit = [
        invoice?.creditAmount,
        invoice?.credits,
        invoice?.amountPaid,
        invoice?.paidAmount,
        invoice?.paymentsTotal
    ].find(value => Number.isFinite(Number.parseFloat(value)));

    if (explicitCredit !== undefined) {
        return Math.max(0, toNumber(explicitCredit));
    }

    return String(invoice?.paymentStatus || "").trim().toLowerCase() === "paid"
        ? toNumber(invoice?.total)
        : 0;
}

function resolveInvoiceStatus(invoice) {
    const paidTotal = resolveInvoiceCredit(invoice);
    const total = toNumber(invoice?.total);
    if (paidTotal <= 0) {
        return "unpaid";
    }
    if (paidTotal >= total && total > 0) {
        return "paid";
    }
    return "pending";
}

function computeSheetName(baseName, usedNames) {
    const cleaned = String(baseName || "Sheet")
        .replace(/[\[\]\*\/\\\?\:]/g, " ")
        .replace(/\s+/g, " ")
        .trim() || "Sheet";

    let candidate = cleaned.slice(0, 31);
    let sequence = 2;
    while (usedNames.has(candidate.toLowerCase())) {
        const suffix = ` ${sequence}`;
        candidate = `${cleaned.slice(0, Math.max(1, 31 - suffix.length))}${suffix}`;
        sequence += 1;
    }

    usedNames.add(candidate.toLowerCase());
    return candidate;
}

function applyHeaderRowStyle(row) {
    row.eachCell(cell => {
        cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
        cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF1E4D91" }
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = {
            top: { style: "thin", color: { argb: "FFD5E0EE" } },
            left: { style: "thin", color: { argb: "FFD5E0EE" } },
            bottom: { style: "thin", color: { argb: "FFD5E0EE" } },
            right: { style: "thin", color: { argb: "FFD5E0EE" } }
        };
    });
}

function applyTableBorders(worksheet, startRow, endRow, endColumn) {
    for (let rowIndex = startRow; rowIndex <= endRow; rowIndex += 1) {
        for (let columnIndex = 1; columnIndex <= endColumn; columnIndex += 1) {
            worksheet.getRow(rowIndex).getCell(columnIndex).border = {
                top: { style: "thin", color: { argb: "FFDDE6F0" } },
                left: { style: "thin", color: { argb: "FFDDE6F0" } },
                bottom: { style: "thin", color: { argb: "FFDDE6F0" } },
                right: { style: "thin", color: { argb: "FFDDE6F0" } }
            };
        }
    }
}

async function readImageFromSource(source) {
    const value = String(source || "").trim();
    if (!value) {
        return null;
    }

    const dataUrlMatch = value.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
    if (dataUrlMatch) {
        const mimeType = dataUrlMatch[1].toLowerCase();
        const extension = mimeType.includes("png")
            ? "png"
            : mimeType.includes("jpeg") || mimeType.includes("jpg")
            ? "jpeg"
            : null;

        if (!extension) {
            return null;
        }

        return {
            extension,
            buffer: Buffer.from(dataUrlMatch[2], "base64")
        };
    }

    let pathname = value;
    try {
        pathname = new URL(value).pathname;
    } catch (error) {
        pathname = value;
    }

    const normalizedPath = decodeURIComponent(pathname).replace(/^\/?/, "/");
    const resolvedPath = path.resolve(process.cwd(), `.${normalizedPath}`);
    if (!resolvedPath.startsWith(process.cwd())) {
        return null;
    }

    const extension = path.extname(resolvedPath).replace(".", "").toLowerCase();
    if (!["png", "jpg", "jpeg"].includes(extension)) {
        return null;
    }

    return {
        extension: extension === "jpg" ? "jpeg" : extension,
        buffer: await fs.readFile(resolvedPath)
    };
}

async function addLetterhead(workbook, worksheet, letterheadSource) {
    const image = await readImageFromSource(letterheadSource);
    if (!image) {
        return false;
    }

    const imageId = workbook.addImage(image);
    worksheet.addImage(imageId, {
        tl: { col: 0, row: 0 },
        ext: { width: 920, height: 130 }
    });
    worksheet.getRow(1).height = 24;
    worksheet.getRow(2).height = 24;
    worksheet.getRow(3).height = 24;
    worksheet.getRow(4).height = 24;
    worksheet.getRow(5).height = 24;
    worksheet.getRow(6).height = 16;
    return true;
}

function setCurrencyColumn(worksheet, columnKey) {
    worksheet.getColumn(columnKey).numFmt = CURRENCY_FORMAT;
}

async function buildWorkbook(statement, sourceInvoices) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "SantoSync";
    workbook.created = new Date();
    workbook.modified = new Date();

    const usedNames = new Set();
    const rows = Array.isArray(statement?.rows) ? statement.rows : [];
    const invoices = (Array.isArray(sourceInvoices) ? sourceInvoices : []).length
        ? sourceInvoices.map(normalizeInvoice)
        : rows.map((row, index) => normalizeInvoice({
            refNumber: row?.invoiceNumber,
            invoiceDate: row?.invoiceDate,
            poNumbers: row?.poNumbers,
            total: row?.invoiceValue,
            status: row?.rawStatus || row?.status,
            clientName: statement?.clientName
        }, index));

    const vendorName = statement?.vendorName || statement?.company?.companyName || "";
    const clientName = statement?.clientName || "";
    const clientAddress = statement?.clientAddress || "";
    const consigneeName = statement?.consigneeName
        || (invoices.length ? invoices[0].consigneeName : "");
    const consigneeAddress = statement?.consigneeAddress
        || (invoices.length ? invoices[0].consigneeAddress : "");
    const currency = statement?.currency || "USD";
    const projectName = statement?.projectName || statement?.referenceNumber || "";
    const generatedDate = statement?.generatedDate
        || formatDate(statement?.generatedIsoDate)
        || formatDate(new Date().toISOString().slice(0, 10));

    const totalDebits = invoices.reduce((sum, inv) => sum + inv.total, 0);
    const totalCredits = invoices.reduce((sum, inv) => sum + resolveInvoiceCredit(inv), 0);
    const totalOutstanding = Math.max(0, totalDebits - totalCredits);

    const NAVY = { argb: "FF1F3864" };
    const WHITE = { argb: "FFFFFFFF" };
    const LIGHT_BLUE_FILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FFB8CCE4" } };
    const LIGHT_YELLOW_FILL = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFF2CC" } };
    const NAVY_FILL = { type: "pattern", pattern: "solid", fgColor: NAVY };
    const THIN_BORDER = { style: "thin", color: { argb: "FFB8C8D8" } };
    const cellBorder = { top: THIN_BORDER, left: THIN_BORDER, bottom: THIN_BORDER, right: THIN_BORDER };

    const ws = workbook.addWorksheet(computeSheetName("Statement", usedNames), {
        views: [{ state: "frozen", ySplit: 6 }]
    });
    ws.columns = [
        { width: 14 },
        { width: 24 },
        { width: 18 },
        { width: 18 },
        { width: 18 },
        { width: 18 }
    ];

    // Row 1 — title banner
    ws.mergeCells("A1:F1");
    const titleCell = ws.getCell("A1");
    titleCell.value = "STATEMENT OF ACCOUNT";
    titleCell.font = { bold: true, size: 16, color: WHITE };
    titleCell.fill = NAVY_FILL;
    titleCell.alignment = { vertical: "middle", horizontal: "center" };
    ws.getRow(1).height = 32;

    // Row 2 — Vendor | name | Consignee | address (D:F merged)
    ws.getRow(2).height = 30;
    const r2 = (col, val, opts = {}) => {
        const cell = ws.getCell(`${col}2`);
        cell.value = val;
        if (opts.label) { cell.font = { bold: true }; cell.fill = LIGHT_BLUE_FILL; }
        if (opts.wrap) cell.alignment = { wrapText: true, vertical: "top" };
        if (opts.border) cell.border = cellBorder;
    };
    r2("A", "Vendor", { label: true, border: true });
    ws.getCell("B2").value = vendorName;
    ws.getCell("B2").border = cellBorder;
    r2("C", "Consignee", { label: true, border: true });
    ws.mergeCells("D2:F2");
    const consigneeText = [consigneeName, consigneeAddress].filter(Boolean).join("\n");
    ws.getCell("D2").value = consigneeText;
    ws.getCell("D2").alignment = { wrapText: true, vertical: "top" };
    ws.getCell("D2").border = cellBorder;

    // Row 3 — Bill To | client | Currency | USD | Total Outstanding Balance | amount
    ws.getRow(3).height = 30;
    ws.getCell("A3").value = "Bill To";
    ws.getCell("A3").font = { bold: true };
    ws.getCell("A3").fill = LIGHT_BLUE_FILL;
    ws.getCell("A3").border = cellBorder;
    const billToText = [clientName, clientAddress].filter(Boolean).join("\n");
    ws.getCell("B3").value = billToText;
    ws.getCell("B3").alignment = { wrapText: true, vertical: "top" };
    ws.getCell("B3").border = cellBorder;
    ws.getCell("C3").value = "Currency";
    ws.getCell("C3").font = { bold: true };
    ws.getCell("C3").fill = LIGHT_BLUE_FILL;
    ws.getCell("C3").border = cellBorder;
    ws.getCell("D3").value = currency;
    ws.getCell("D3").border = cellBorder;
    ws.getCell("E3").value = "Total Outstanding Balance";
    ws.getCell("E3").font = { bold: true };
    ws.getCell("E3").border = cellBorder;
    ws.getCell("F3").value = totalOutstanding;
    ws.getCell("F3").numFmt = CURRENCY_FORMAT;
    ws.getCell("F3").font = { bold: true };
    ws.getCell("F3").alignment = { horizontal: "right" };
    ws.getCell("F3").border = cellBorder;

    // Row 4 — Project Name
    ws.getRow(4).height = 20;
    ws.getCell("A4").value = "Project Name";
    ws.getCell("A4").font = { bold: true };
    ws.getCell("A4").fill = LIGHT_BLUE_FILL;
    ws.getCell("A4").border = cellBorder;
    ws.mergeCells("B4:F4");
    ws.getCell("B4").value = projectName;
    ws.getCell("B4").border = cellBorder;

    // Row 5 — date band
    ws.getRow(5).height = 20;
    ws.mergeCells("A5:F5");
    ws.getCell("A5").value = `Statement of Account as of ${generatedDate}`;
    ws.getCell("A5").font = { bold: true };
    ws.getCell("A5").fill = LIGHT_YELLOW_FILL;
    ws.getCell("A5").alignment = { vertical: "middle", horizontal: "center" };
    ws.getCell("A5").border = cellBorder;

    // Row 6 — column headers
    const headerRow = ws.addRow([
        "Inv Date",
        "Invoice Number",
        "PO Number",
        "Debits (Inv Amt)",
        "Credits (Payments)",
        "Bal Outstanding"
    ]);
    headerRow.height = 18;
    headerRow.eachCell(cell => {
        cell.font = { bold: true, color: WHITE };
        cell.fill = NAVY_FILL;
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = cellBorder;
    });

    // Data rows
    invoices.forEach(invoice => {
        const credits = resolveInvoiceCredit(invoice);
        const balance = Math.max(0, invoice.total - credits);

        const dataRow = ws.addRow([
            invoice.date || "",
            invoice.refNumber,
            invoice.poNumber || "",
            invoice.total,
            credits,
            balance
        ]);
        dataRow.getCell(1).alignment = { horizontal: "center" };
        dataRow.getCell(2).alignment = { horizontal: "left" };
        dataRow.getCell(3).alignment = { horizontal: "left" };
        dataRow.getCell(4).numFmt = CURRENCY_FORMAT;
        dataRow.getCell(4).alignment = { horizontal: "right" };
        dataRow.getCell(5).numFmt = CURRENCY_FORMAT;
        dataRow.getCell(5).alignment = { horizontal: "right" };
        dataRow.getCell(6).numFmt = CURRENCY_FORMAT;
        dataRow.getCell(6).alignment = { horizontal: "right" };
        dataRow.eachCell(cell => { cell.border = cellBorder; });
    });

    if (invoices.length) {
        // Totals row
        const totalsRow = ws.addRow([
            "", "Totals", "",
            totalDebits,
            totalCredits,
            totalOutstanding
        ]);
        totalsRow.getCell(2).font = { bold: true };
        totalsRow.getCell(4).numFmt = CURRENCY_FORMAT;
        totalsRow.getCell(4).font = { bold: true };
        totalsRow.getCell(4).alignment = { horizontal: "right" };
        totalsRow.getCell(5).numFmt = CURRENCY_FORMAT;
        totalsRow.getCell(5).font = { bold: true };
        totalsRow.getCell(5).alignment = { horizontal: "right" };
        totalsRow.getCell(6).numFmt = CURRENCY_FORMAT;
        totalsRow.getCell(6).font = { bold: true };
        totalsRow.getCell(6).alignment = { horizontal: "right" };
        totalsRow.eachCell(cell => { cell.border = cellBorder; });
        totalsRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFE2EFDA" } };
    }

    return workbook;
}

module.exports = async function handler(request, response) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return sendJson(response, 405, { error: "Method not allowed." });
    }

    try {
        const statement = request.body?.statement;
        const sourceInvoices = Array.isArray(request.body?.sourceInvoices) ? request.body.sourceInvoices : [];

        if (!statement || !Array.isArray(statement?.rows) || !statement.rows.length) {
            return sendJson(response, 400, { error: "A statement with at least one invoice row is required." });
        }

        const workbook = await buildWorkbook(statement, sourceInvoices);
        const buffer = await workbook.xlsx.writeBuffer();
        const safeFilename = String(statement?.title || "statement-of-account.xlsx").replace(/\.pdf$/i, ".xlsx");

        response.statusCode = 200;
        response.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        response.setHeader("Content-Disposition", `attachment; filename="${safeFilename}"`);
        response.end(Buffer.from(buffer));
    } catch (error) {
        return sendJson(response, 500, {
            error: error.message || "Unable to generate the Excel workbook."
        });
    }
};
