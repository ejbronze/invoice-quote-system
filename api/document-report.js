const ExcelJS = require("exceljs");

function sendJson(response, statusCode, payload) {
    response.statusCode = statusCode;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(JSON.stringify(payload));
}

function toNumber(value) {
    const numeric = Number.parseFloat(value);
    return Number.isFinite(numeric) ? numeric : 0;
}

function formatDate(value) {
    const str = String(value || "").trim();
    if (!str) return "";
    const match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const parsed = match
        ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
        : new Date(str);
    if (Number.isNaN(parsed.getTime())) return str;
    return parsed.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function safeFilenamePart(value, fallback) {
    return String(value || fallback)
        .trim()
        .replace(/[^a-z0-9._-]+/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "") || fallback;
}

function normalizeItems(items) {
    return (Array.isArray(items) ? items : []).map((item, i) => ({
        itemNo: Number.parseInt(item?.itemNo, 10) || i + 1,
        description: String(item?.description || "").trim(),
        quantity: toNumber(item?.quantity),
        unitPrice: toNumber(item?.unitPrice),
        totalPrice: toNumber(item?.totalPrice)
    })).filter(item => item.description);
}

function normalizePayments(payments) {
    return (Array.isArray(payments) ? payments : []).map(p => ({
        date: String(p?.date || "").trim(),
        amount: toNumber(p?.amount),
        method: String(p?.method || "").trim(),
        reference: String(p?.reference || "").trim(),
        notes: String(p?.notes || "").trim()
    })).filter(p => p.amount > 0);
}

function normalizeDoc(doc) {
    const total = toNumber(doc?.total ?? doc?.subtotal);
    return {
        type: String(doc?.type || "quote").trim(),
        refNumber: String(doc?.refNumber || "Document").trim(),
        date: String(doc?.date || "").trim(),
        clientName: String(doc?.clientName || "").trim(),
        clientAddress: String(doc?.clientAddress || "").trim(),
        poNumber: String(doc?.poNumber || "").trim(),
        paymentTerms: String(doc?.paymentTerms || "").trim(),
        paymentStatus: String(doc?.paymentStatus || "").trim(),
        currency: String(doc?.currency || "USD").trim() || "USD",
        notes: String(doc?.notes || "").trim(),
        total,
        items: normalizeItems(doc?.items),
        payments: normalizePayments(doc?.payments)
    };
}

function normalizeCompany(profile) {
    return {
        companyName: String(profile?.companyName || "").trim(),
        address: String(profile?.address || "").trim(),
        email: String(profile?.email || "").trim(),
        phone: String(profile?.phone || "").trim(),
        taxId: String(profile?.taxId || "").trim()
    };
}

// ── Merge a single full-width row by its row number ──────────────────────────
function mergeFullRow(ws, rowNumber, ncols) {
    const lastCol = String.fromCharCode(64 + ncols);
    ws.mergeCells(`A${rowNumber}:${lastCol}${rowNumber}`);
}

// ── Style constants ──────────────────────────────────────────────────────────

const NCOLS = 5;

const COLOR = {
    title:  "FF1459D9",
    header: "FF1D3557",
    stripe: "FFF0F4FA",
    total:  "FFE8EEF7",
    meta:   "FFF8FAFC",
    pay:    "FFFFFBEB",
    payHdr: "FF92400E",
    border: "FFE2E8F0",
    white:  "FFFFFFFF",
    muted:  "FF64748B"
};

const THIN_BORDER = (color = COLOR.border) => ({
    top:    { style: "hair", color: { argb: color } },
    left:   { style: "hair", color: { argb: color } },
    bottom: { style: "hair", color: { argb: color } },
    right:  { style: "hair", color: { argb: color } }
});

const CURRENCY_FMT = '"$"#,##0.00';

// ── Handler ──────────────────────────────────────────────────────────────────

module.exports = async function handler(request, response) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return sendJson(response, 405, { error: "Method not allowed." });
    }

    try {
        const doc = normalizeDoc(request.body?.doc || {});
        const company = normalizeCompany(request.body?.companyProfile || {});

        const typeLabel = doc.type === "invoice" ? "INVOICE" : "QUOTE";
        const statusLabel = doc.paymentStatus
            ? doc.paymentStatus.charAt(0).toUpperCase() + doc.paymentStatus.slice(1)
            : (doc.type === "invoice" ? "Unpaid" : "Draft");

        const workbook = new ExcelJS.Workbook();
        workbook.creator = "SantoSync";
        workbook.created = new Date();

        // Freeze rows 1-3 (title + meta + column headers)
        const ws = workbook.addWorksheet("Document", {
            views: [{ state: "frozen", ySplit: 3 }]
        });

        // ── Row 1: Title banner ──────────────────────────────────────────
        const titleRow = ws.addRow([`${typeLabel}  —  ${doc.refNumber}`]);
        mergeFullRow(ws, titleRow.number, NCOLS);
        titleRow.height = 26;
        const titleCell = titleRow.getCell(1);
        titleCell.font = { bold: true, size: 14, color: { argb: COLOR.white } };
        titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.title } };
        titleCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };

        // ── Row 2: Metadata bar ──────────────────────────────────────────
        const metaParts = [
            `Client: ${doc.clientName || "—"}`,
            `Date: ${formatDate(doc.date) || "—"}`,
            `Status: ${statusLabel}`,
            `Currency: ${doc.currency}`
        ];
        if (doc.poNumber && doc.poNumber !== "N/A") metaParts.push(`PO: ${doc.poNumber}`);
        if (doc.paymentTerms) metaParts.push(`Terms: ${doc.paymentTerms}`);
        if (company.companyName) metaParts.push(`Issued by: ${company.companyName}`);

        const metaRow = ws.addRow([metaParts.join("   ·   ")]);
        mergeFullRow(ws, metaRow.number, NCOLS);
        metaRow.height = 18;
        const metaCell = metaRow.getCell(1);
        metaCell.font = { size: 10, color: { argb: "FF475569" } };
        metaCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.meta } };
        metaCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
        metaCell.border = { bottom: { style: "thin", color: { argb: "FFCBD5E1" } } };

        // ── Row 3: Column headers ────────────────────────────────────────
        const headerRow = ws.addRow(["#", "Description", "Qty", "Unit Price", "Total"]);
        headerRow.height = 22;
        headerRow.eachCell((cell, colNumber) => {
            cell.font = { bold: true, size: 10, color: { argb: COLOR.white } };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.header } };
            cell.border = {
                top:    { style: "thin", color: { argb: "FF253E57" } },
                left:   { style: "thin", color: { argb: "FF253E57" } },
                bottom: { style: "thin", color: { argb: "FF253E57" } },
                right:  { style: "thin", color: { argb: "FF253E57" } }
            };
            cell.alignment = {
                vertical: "middle",
                horizontal: colNumber === 2 ? "left" : "center",
                wrapText: false
            };
        });

        // ── Data rows ────────────────────────────────────────────────────
        doc.items.forEach((item, i) => {
            const rowBg = i % 2 === 1 ? COLOR.stripe : COLOR.white;
            const dataRow = ws.addRow([
                item.itemNo,
                item.description,
                item.quantity,
                item.unitPrice > 0 ? item.unitPrice : "",
                item.totalPrice > 0 ? item.totalPrice : ""
            ]);
            dataRow.height = 18;
            dataRow.eachCell((cell, colNumber) => {
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: rowBg } };
                cell.border = THIN_BORDER();
                cell.alignment = { vertical: "top" };
            });

            dataRow.getCell(1).alignment = { vertical: "top", horizontal: "center" };
            dataRow.getCell(2).alignment = { vertical: "top", horizontal: "left", wrapText: true };
            dataRow.getCell(3).alignment = { vertical: "top", horizontal: "center" };

            if (item.unitPrice > 0) {
                dataRow.getCell(4).numFmt = CURRENCY_FMT;
                dataRow.getCell(4).alignment = { vertical: "top", horizontal: "right" };
            }
            if (item.totalPrice > 0) {
                dataRow.getCell(5).numFmt = CURRENCY_FMT;
                dataRow.getCell(5).alignment = { vertical: "top", horizontal: "right" };
            }
        });

        // ── Totals row ───────────────────────────────────────────────────
        if (doc.items.length > 0 && doc.total > 0) {
            const totalRow = ws.addRow(["", "", "", "Total", doc.total]);
            totalRow.height = 22;
            totalRow.eachCell(cell => {
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.total } };
                cell.border = {
                    top:    { style: "medium", color: { argb: "FF94A3B8" } },
                    bottom: { style: "medium", color: { argb: "FF94A3B8" } },
                    left:   THIN_BORDER().left,
                    right:  THIN_BORDER().right
                };
                cell.alignment = { vertical: "middle" };
            });
            totalRow.getCell(4).font = { bold: true, size: 11 };
            totalRow.getCell(4).alignment = { vertical: "middle", horizontal: "right" };
            totalRow.getCell(5).numFmt = CURRENCY_FMT;
            totalRow.getCell(5).font = { bold: true, size: 11 };
            totalRow.getCell(5).alignment = { vertical: "middle", horizontal: "right" };
        }

        // ── Payments section (invoices only) ─────────────────────────────
        if (doc.type === "invoice" && doc.payments.length > 0) {
            const paidTotal = doc.payments.reduce((sum, p) => sum + p.amount, 0);
            const balance = Math.max(0, doc.total - paidTotal);

            ws.addRow([]); // blank separator

            // Section header
            const payHdrRow = ws.addRow(["Payments Applied"]);
            mergeFullRow(ws, payHdrRow.number, NCOLS);
            payHdrRow.height = 20;
            const payHdrCell = payHdrRow.getCell(1);
            payHdrCell.font = { bold: true, size: 10, color: { argb: COLOR.payHdr } };
            payHdrCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.pay } };
            payHdrCell.border = { bottom: { style: "thin", color: { argb: "FFFD974F" } } };
            payHdrCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };

            // Payment column sub-headers
            const payColRow = ws.addRow(["Date", "Amount", "Method", "Reference", "Notes"]);
            payColRow.height = 18;
            payColRow.eachCell((cell, colNumber) => {
                cell.font = { bold: true, size: 9, color: { argb: COLOR.white } };
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF475569" } };
                cell.alignment = { vertical: "middle", horizontal: colNumber === 1 ? "left" : "center" };
                cell.border = THIN_BORDER("FF64748B");
            });

            // Payment rows
            doc.payments.forEach((payment, i) => {
                const payRow = ws.addRow([
                    formatDate(payment.date),
                    payment.amount,
                    payment.method,
                    payment.reference,
                    payment.notes
                ]);
                payRow.height = 16;
                const rowBg = i % 2 === 0 ? COLOR.white : COLOR.pay;
                payRow.eachCell((cell, colNumber) => {
                    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: rowBg } };
                    cell.border = THIN_BORDER("FFCBD5E1");
                    cell.font = { size: 9 };
                    cell.alignment = { vertical: "middle", horizontal: colNumber === 1 ? "left" : "center" };
                });
                payRow.getCell(2).numFmt = CURRENCY_FMT;
                payRow.getCell(2).alignment = { vertical: "middle", horizontal: "right" };
            });

            // Amount Paid / Balance Due
            ws.addRow([]);
            const paidRow = ws.addRow(["", "", "", "Amount Paid", paidTotal]);
            paidRow.height = 18;
            paidRow.eachCell(cell => {
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.pay } };
                cell.border = THIN_BORDER("FFFD974F");
            });
            paidRow.getCell(4).font = { size: 10, color: { argb: COLOR.payHdr } };
            paidRow.getCell(4).alignment = { vertical: "middle", horizontal: "right" };
            paidRow.getCell(5).numFmt = CURRENCY_FMT;
            paidRow.getCell(5).font = { size: 10, color: { argb: COLOR.payHdr } };
            paidRow.getCell(5).alignment = { vertical: "middle", horizontal: "right" };

            const balRow = ws.addRow(["", "", "", "Balance Due", balance]);
            balRow.height = 20;
            balRow.eachCell(cell => {
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.pay } };
                cell.border = THIN_BORDER("FFFD974F");
            });
            balRow.getCell(4).font = { bold: true, size: 11, color: { argb: COLOR.payHdr } };
            balRow.getCell(4).alignment = { vertical: "middle", horizontal: "right" };
            balRow.getCell(5).numFmt = CURRENCY_FMT;
            balRow.getCell(5).font = { bold: true, size: 11, color: { argb: COLOR.payHdr } };
            balRow.getCell(5).alignment = { vertical: "middle", horizontal: "right" };
        }

        // ── Notes footer ─────────────────────────────────────────────────
        if (doc.notes) {
            ws.addRow([]);
            const notesRow = ws.addRow([`Notes: ${doc.notes}`]);
            mergeFullRow(ws, notesRow.number, NCOLS);
            notesRow.height = 16;
            const notesCell = notesRow.getCell(1);
            notesCell.font = { size: 9, italic: true, color: { argb: COLOR.muted } };
            notesCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.meta } };
            notesCell.alignment = { vertical: "middle", horizontal: "left", indent: 1, wrapText: true };
        }

        // ── Company info footer ───────────────────────────────────────────
        if (company.companyName || company.address || company.email) {
            const compParts = [];
            if (company.companyName) compParts.push(company.companyName);
            if (company.address) compParts.push(company.address);
            if (company.email) compParts.push(company.email);
            if (company.phone) compParts.push(company.phone);
            if (company.taxId) compParts.push(`Tax ID: ${company.taxId}`);

            ws.addRow([]);
            const compRow = ws.addRow([compParts.join("   ·   ")]);
            mergeFullRow(ws, compRow.number, NCOLS);
            compRow.height = 16;
            const compCell = compRow.getCell(1);
            compCell.font = { size: 9, color: { argb: COLOR.muted } };
            compCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.meta } };
            compCell.border = { top: { style: "hair", color: { argb: COLOR.border } } };
            compCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
        }

        // ── Column widths ────────────────────────────────────────────────
        ws.columns = [
            { width: 6  },
            { width: 48 },
            { width: 10 },
            { width: 16 },
            { width: 16 }
        ];

        // ── Auto-filter on header row ────────────────────────────────────
        if (doc.items.length > 0) {
            ws.autoFilter = {
                from: { row: 3, column: 1 },
                to:   { row: 3 + doc.items.length, column: NCOLS }
            };
        }

        const buffer = await workbook.xlsx.writeBuffer();
        const refPart = safeFilenamePart(doc.refNumber, "document");
        const typePart = doc.type === "invoice" ? "Invoice" : "Quote";
        const clientPart = safeFilenamePart(doc.clientName, "client");
        const filename = `${refPart}_${typePart}_${clientPart}.xlsx`;

        response.statusCode = 200;
        response.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        response.end(Buffer.from(buffer));
    } catch (error) {
        return sendJson(response, 500, {
            error: error.message || "Unable to generate the Excel file."
        });
    }
};
