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

function normalizeSheet(sheet) {
    const rows = Array.isArray(sheet?.procurementItems) ? sheet.procurementItems : [];
    return {
        refNumber: String(sheet?.refNumber || "Offer").trim(),
        date: String(sheet?.date || "").trim(),
        clientName: String(sheet?.clientName || "").trim(),
        currency: String(sheet?.currency || "USD").trim() || "USD",
        notes: String(sheet?.notes || "").trim(),
        rows: rows.map((row, index) => ({
            lineNumber: Number.parseInt(row?.lineNumber, 10) || index + 1,
            itemNumber: String(row?.itemNumber || "").trim(),
            clientItemCode: String(row?.clientItemCode || "").trim(),
            description: String(row?.description || "").trim(),
            brand: String(row?.brand || "").trim(),
            packSize: String(row?.packSize || "").trim(),
            unit: String(row?.unit || "").trim(),
            quantityTbd: Boolean(row?.quantityTbd),
            quantity: row?.quantityTbd ? "TBD" : String(row?.quantity || "").trim(),
            unitPrice: toNumber(row?.unitPrice),
            currency: String(row?.currency || sheet?.currency || "USD").trim() || "USD",
            leadTime: String(row?.leadTime || "").trim(),
            supplier: String(row?.supplier || "").trim(),
            notes: String(row?.notes || "").trim()
        })).filter(row => row.description)
    };
}

function safeFilenamePart(value, fallback) {
    return String(value || fallback)
        .trim()
        .replace(/[^a-z0-9._-]+/gi, "-")
        .replace(/-+/g, "-")
        .replace(/^-+|-+$/g, "") || fallback;
}

// All 14 columns in schema order (# is always index 0)
const ALL_COLUMNS = [
    { key: "#",              label: "#",                width: 6,  align: "center" },
    { key: "itemNumber",     label: "Item #",           width: 10, align: "center" },
    { key: "clientItemCode", label: "Client Item Code", width: 18, align: "left"   },
    { key: "description",    label: "Item Description", width: 38, align: "left"   },
    { key: "brand",          label: "Brand",            width: 16, align: "center" },
    { key: "packSize",       label: "Pack Size",        width: 14, align: "center" },
    { key: "unit",           label: "Unit",             width: 10, align: "center" },
    { key: "quantity",       label: "Quantity",         width: 12, align: "center" },
    { key: "unitPrice",      label: "Unit Price",       width: 14, align: "right"  },
    { key: "currency",       label: "Currency",         width: 10, align: "center" },
    { key: "lineTotal",      label: "Line Total",       width: 14, align: "right"  },
    { key: "leadTime",       label: "Lead Time",        width: 14, align: "center" },
    { key: "supplier",       label: "Supplier",         width: 20, align: "left"   },
    { key: "notes",          label: "Notes",            width: 26, align: "left"   },
];

const DEFAULT_SELECTED = new Set(["#","itemNumber","description","brand","packSize","unit","quantity","unitPrice","currency","lineTotal","leadTime","supplier","notes"]);

const COLOR = {
    title:  "FF1459D9",
    header: "FF1D3557",
    stripe: "FFF0F4FA",
    total:  "FFE8EEF7",
    meta:   "FFF8FAFC",
    border: "FFE2E8F0",
    tbd:    "FF94A3B8",
    white:  "FFFFFFFF"
};

const THIN_BORDER = (color = COLOR.border) => ({
    top:    { style: "hair", color: { argb: color } },
    left:   { style: "hair", color: { argb: color } },
    bottom: { style: "hair", color: { argb: color } },
    right:  { style: "hair", color: { argb: color } }
});

function getCellValue(col, row, sheetCurrency) {
    switch (col.key) {
        case "#":              return row.lineNumber;
        case "itemNumber":     return row.itemNumber;
        case "clientItemCode": return row.clientItemCode;
        case "description":    return row.description;
        case "brand":          return row.brand;
        case "packSize":       return row.packSize;
        case "unit":           return row.unit;
        case "quantity":       return row.quantityTbd ? "TBD" : (row.quantity || "");
        case "unitPrice":      return row.unitPrice > 0 ? row.unitPrice : "";
        case "currency":       return row.currency;
        case "lineTotal": {
            const qty = row.quantityTbd ? null : Number.parseFloat(row.quantity);
            const hasQty = qty !== null && !Number.isNaN(qty) && qty > 0;
            return (hasQty && row.unitPrice > 0) ? qty * row.unitPrice : "";
        }
        case "leadTime":  return row.leadTime;
        case "supplier":  return row.supplier;
        case "notes":     return row.notes;
        default:          return "";
    }
}

module.exports = async function handler(request, response) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return sendJson(response, 405, { error: "Method not allowed." });
    }

    try {
        const sheet = normalizeSheet(request.body?.sheet || {});
        const includeGrandTotal = request.body?.includeGrandTotal === true;
        const requestedCols = Array.isArray(request.body?.selectedColumns) ? new Set(request.body.selectedColumns) : DEFAULT_SELECTED;

        // Always include # column; filter to valid keys in schema order
        const activeCols = ALL_COLUMNS.filter(c => c.key === "#" || requestedCols.has(c.key));
        const NCOLS = activeCols.length;
        const LAST_COL_LETTER = String.fromCharCode(64 + NCOLS);

        const companyName = String(request.body?.companyName || "").trim();

        const workbook = new ExcelJS.Workbook();
        workbook.creator = "SantoSync";
        workbook.created = new Date();

        const worksheet = workbook.addWorksheet("Offer", {
            views: [{ state: "frozen", ySplit: 6 }]
        });

        // Helper: column letter for 1-based index
        const colLetter = n => String.fromCharCode(64 + n);
        const splitCol = NCOLS > 1 ? colLetter(NCOLS - 1) : LAST_COL_LETTER;

        // ── Row 1: Company name ──────────────────────────────────────────
        worksheet.mergeCells(`A1:${LAST_COL_LETTER}1`);
        const companyCell = worksheet.getCell("A1");
        companyCell.value = companyName || "";
        companyCell.font = { size: 11, color: { argb: "FF1E293B" } };
        companyCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.white } };
        companyCell.alignment = { vertical: "middle", horizontal: "center" };
        worksheet.getRow(1).height = 22;

        // ── Row 2: Document ref number ───────────────────────────────────
        worksheet.mergeCells(`A2:${LAST_COL_LETTER}2`);
        const titleCell = worksheet.getCell("A2");
        titleCell.value = sheet.refNumber || "Offer";
        titleCell.font = { bold: true, size: 14, color: { argb: COLOR.white } };
        titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.header } };
        titleCell.alignment = { vertical: "middle", horizontal: "center" };
        worksheet.getRow(2).height = 28;

        // ── Row 3: Client (left) + Date (right) ──────────────────────────
        const metaFill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.meta } };
        const metaFont = { size: 10, color: { argb: "FF1E293B" } };
        if (NCOLS > 1) worksheet.mergeCells(`A3:${splitCol}3`);
        const clientCell = worksheet.getCell("A3");
        clientCell.value = `Client: ${sheet.clientName || "—"}`;
        clientCell.font = metaFont;
        clientCell.fill = metaFill;
        clientCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
        const dateCell = worksheet.getCell(`${LAST_COL_LETTER}3`);
        dateCell.value = `Date: ${sheet.date || "—"}`;
        dateCell.font = metaFont;
        dateCell.fill = metaFill;
        dateCell.alignment = { vertical: "middle", horizontal: "right", indent: 1 };
        worksheet.getRow(3).height = 18;

        // ── Row 4: Notes (left) + Currency (right) ───────────────────────
        if (NCOLS > 1) worksheet.mergeCells(`A4:${splitCol}4`);
        const notesCell = worksheet.getCell("A4");
        notesCell.value = sheet.notes ? `Notes: ${sheet.notes}` : "Notes:";
        notesCell.font = metaFont;
        notesCell.fill = metaFill;
        notesCell.alignment = { vertical: "middle", horizontal: "left", indent: 1, wrapText: false };
        notesCell.border = { bottom: { style: "thin", color: { argb: "FFCBD5E1" } } };
        const currencyCell = worksheet.getCell(`${LAST_COL_LETTER}4`);
        currencyCell.value = `Currency: ${sheet.currency || "USD"}`;
        currencyCell.font = metaFont;
        currencyCell.fill = metaFill;
        currencyCell.alignment = { vertical: "middle", horizontal: "right", indent: 1 };
        currencyCell.border = { bottom: { style: "thin", color: { argb: "FFCBD5E1" } } };
        worksheet.getRow(4).height = 18;

        // ── Row 5: Empty spacer ───────────────────────────────────────────
        worksheet.getRow(5).height = 6;

        // ── Row 6: Column headers ────────────────────────────────────────
        const headerRow = worksheet.getRow(6);
        headerRow.height = 22;
        activeCols.forEach((col, i) => {
            const cell = headerRow.getCell(i + 1);
            cell.value = col.label;
            cell.font = { bold: true, size: 10, color: { argb: COLOR.white } };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.header } };
            cell.border = {
                top:    { style: "thin", color: { argb: "FF253E57" } },
                left:   { style: "thin", color: { argb: "FF253E57" } },
                bottom: { style: "thin", color: { argb: "FF253E57" } },
                right:  { style: "thin", color: { argb: "FF253E57" } }
            };
            const isWrap = ["description", "notes"].includes(col.key);
            cell.alignment = {
                vertical: "middle",
                horizontal: isWrap ? "left" : col.align,
                wrapText: false
            };
        });

        // ── Data rows (start at row 7) ───────────────────────────────────
        let runningTotal = 0;
        let hasTotalizableRows = false;
        let nextDataRow = 7;

        sheet.rows.forEach((row, i) => {
            const qty = row.quantityTbd ? null : Number.parseFloat(row.quantity);
            const hasQty = qty !== null && !Number.isNaN(qty) && qty > 0;
            const lineTotal = hasQty && row.unitPrice > 0 ? qty * row.unitPrice : null;
            if (lineTotal !== null) {
                runningTotal += lineTotal;
                hasTotalizableRows = true;
            }

            const dataRow = worksheet.getRow(nextDataRow++);
            activeCols.forEach((col, ci) => {
                dataRow.getCell(ci + 1).value = getCellValue(col, row, sheet.currency);
            });
            dataRow.height = 18;
            const rowBg = i % 2 === 1 ? COLOR.stripe : COLOR.white;

            dataRow.eachCell((cell, colIdx) => {
                const col = activeCols[colIdx - 1];
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: rowBg } };
                cell.border = THIN_BORDER();
                const isWrap = col && ["description", "notes"].includes(col.key);
                cell.alignment = { vertical: "top", wrapText: isWrap, horizontal: col ? col.align : "left" };

                if (!col) return;
                if (col.key === "quantity" && row.quantityTbd) {
                    cell.font = { italic: true, color: { argb: COLOR.tbd }, size: 10 };
                }
                if ((col.key === "unitPrice") && row.unitPrice > 0) {
                    cell.numFmt = "#,##0.00";
                }
                if (col.key === "lineTotal" && lineTotal !== null) {
                    cell.numFmt = "#,##0.00";
                }
            });
        });

        // ── Grand total row ──────────────────────────────────────────────
        // Only render when: grand total is ON, Line Total column is selected, and at least one valid total exists.
        // Never place grand total under Unit Price.
        const lineTotalColIdx = activeCols.findIndex(c => c.key === "lineTotal");
        if (includeGrandTotal && lineTotalColIdx >= 0 && sheet.rows.length > 0 && hasTotalizableRows) {
            const descIdx = activeCols.findIndex(c => c.key === "description");
            const currIdx = activeCols.findIndex(c => c.key === "currency");

            const totalRow = worksheet.getRow(nextDataRow++);
            totalRow.height = 20;
            activeCols.forEach((_, ci) => {
                const cell = totalRow.getCell(ci + 1);
                cell.value = "";
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.total } };
                cell.border = {
                    top:    { style: "medium", color: { argb: "FF94A3B8" } },
                    bottom: { style: "medium", color: { argb: "FF94A3B8" } },
                    left:   THIN_BORDER().left,
                    right:  THIN_BORDER().right
                };
                cell.alignment = { vertical: "middle" };
            });
            if (descIdx >= 0) {
                const c = totalRow.getCell(descIdx + 1);
                c.value = "TOTAL";
                c.font = { bold: true, size: 10 };
                c.alignment = { vertical: "middle", horizontal: "left" };
            }
            const ltCell = totalRow.getCell(lineTotalColIdx + 1);
            ltCell.value = runningTotal;
            ltCell.numFmt = "#,##0.00";
            ltCell.font = { bold: true, size: 10 };
            ltCell.alignment = { vertical: "middle", horizontal: "right" };
            if (currIdx >= 0) {
                const c = totalRow.getCell(currIdx + 1);
                c.value = sheet.currency || "USD";
                c.alignment = { vertical: "middle", horizontal: "center" };
            }
        }

        // ── Column widths ────────────────────────────────────────────────
        worksheet.columns = activeCols.map(col => ({ width: col.width }));

        // ── Auto-filter ──────────────────────────────────────────────────
        if (sheet.rows.length > 0) {
            worksheet.autoFilter = {
                from: { row: 6, column: 1 },
                to:   { row: 6 + sheet.rows.length, column: NCOLS }
            };
        }

        const buffer = await workbook.xlsx.writeBuffer();
        const refPart = safeFilenamePart(sheet.refNumber, "offer");
        const filename = `${refPart}-OFFER.xlsx`;
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        response.end(Buffer.from(buffer));
    } catch (error) {
        return sendJson(response, 500, {
            error: error.message || "Unable to generate Offer Excel file."
        });
    }
};
