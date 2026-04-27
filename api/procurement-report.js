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

        const workbook = new ExcelJS.Workbook();
        workbook.creator = "SantoSync";
        workbook.created = new Date();

        const worksheet = workbook.addWorksheet("Offer", {
            views: [{ state: "frozen", ySplit: 3 }]
        });

        // ── Row 1: Title banner ──────────────────────────────────────────
        worksheet.mergeCells(`A1:${LAST_COL_LETTER}1`);
        const titleCell = worksheet.getCell("A1");
        titleCell.value = sheet.refNumber || "Offer";
        titleCell.font = { bold: true, size: 14, color: { argb: COLOR.white } };
        titleCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.title } };
        titleCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
        worksheet.getRow(1).height = 26;

        // ── Row 2: Metadata ──────────────────────────────────────────────
        worksheet.mergeCells(`A2:${LAST_COL_LETTER}2`);
        const metaCell = worksheet.getCell("A2");
        const metaParts = [
            `Client: ${sheet.clientName || "—"}`,
            `Date: ${sheet.date || "—"}`,
            `Currency: ${sheet.currency || "USD"}`
        ];
        if (sheet.notes) metaParts.push(`Notes: ${sheet.notes}`);
        metaCell.value = metaParts.join("   ·   ");
        metaCell.font = { size: 10, color: { argb: "FF475569" } };
        metaCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.meta } };
        metaCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
        metaCell.border = { bottom: { style: "thin", color: { argb: "FFCBD5E1" } } };
        worksheet.getRow(2).height = 18;

        // ── Row 3: Column headers ────────────────────────────────────────
        const headerRow = worksheet.addRow(activeCols.map(c => c.label));
        headerRow.height = 22;
        headerRow.eachCell((cell, colIdx) => {
            const col = activeCols[colIdx - 1];
            cell.font = { bold: true, size: 10, color: { argb: COLOR.white } };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.header } };
            cell.border = {
                top:    { style: "thin", color: { argb: "FF253E57" } },
                left:   { style: "thin", color: { argb: "FF253E57" } },
                bottom: { style: "thin", color: { argb: "FF253E57" } },
                right:  { style: "thin", color: { argb: "FF253E57" } }
            };
            const isWrap = col && ["description", "notes"].includes(col.key);
            cell.alignment = {
                vertical: "middle",
                horizontal: col ? (isWrap ? "left" : col.align) : "center",
                wrapText: false
            };
        });

        // ── Data rows ────────────────────────────────────────────────────
        let runningTotal = 0;
        let hasTotalizableRows = false;

        sheet.rows.forEach((row, i) => {
            const qty = row.quantityTbd ? null : Number.parseFloat(row.quantity);
            const hasQty = qty !== null && !Number.isNaN(qty) && qty > 0;
            const lineTotal = hasQty && row.unitPrice > 0 ? qty * row.unitPrice : null;
            if (lineTotal !== null) {
                runningTotal += lineTotal;
                hasTotalizableRows = true;
            }

            const dataRow = worksheet.addRow(activeCols.map(col => getCellValue(col, row, sheet.currency)));
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

            const totalRowData = activeCols.map(() => "");
            if (descIdx >= 0)       totalRowData[descIdx]       = "TOTAL";
            totalRowData[lineTotalColIdx] = runningTotal;
            if (currIdx >= 0)       totalRowData[currIdx]       = sheet.currency || "USD";

            const totalRow = worksheet.addRow(totalRowData);
            totalRow.height = 20;
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
            if (descIdx >= 0) {
                totalRow.getCell(descIdx + 1).font = { bold: true, size: 10 };
                totalRow.getCell(descIdx + 1).alignment = { vertical: "middle", horizontal: "left" };
            }
            totalRow.getCell(lineTotalColIdx + 1).numFmt = "#,##0.00";
            totalRow.getCell(lineTotalColIdx + 1).font = { bold: true, size: 10 };
            totalRow.getCell(lineTotalColIdx + 1).alignment = { vertical: "middle", horizontal: "right" };
            if (currIdx >= 0) {
                totalRow.getCell(currIdx + 1).alignment = { vertical: "middle", horizontal: "center" };
            }
        }

        // ── Column widths ────────────────────────────────────────────────
        worksheet.columns = activeCols.map(col => ({ width: col.width }));

        // ── Auto-filter ──────────────────────────────────────────────────
        if (sheet.rows.length > 0) {
            worksheet.autoFilter = {
                from: { row: 3, column: 1 },
                to:   { row: 3 + sheet.rows.length, column: NCOLS }
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
