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
        refNumber: String(sheet?.refNumber || "Procurement Sheet").trim(),
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

const NCOLS = 13;
const LAST_COL_LETTER = String.fromCharCode(64 + NCOLS); // "M"

const COLOR = {
    title:  "FF1459D9",  // brand blue
    header: "FF1D3557",  // dark navy
    stripe: "FFF0F4FA",  // light ice blue
    total:  "FFE8EEF7",  // slightly deeper for totals row
    meta:   "FFF8FAFC",  // near-white for metadata row
    border: "FFE2E8F0",  // light border
    tbd:    "FF94A3B8",  // muted gray for TBD text
    white:  "FFFFFFFF"
};

const THIN_BORDER = (color = COLOR.border) => ({
    top:    { style: "hair", color: { argb: color } },
    left:   { style: "hair", color: { argb: color } },
    bottom: { style: "hair", color: { argb: color } },
    right:  { style: "hair", color: { argb: color } }
});

module.exports = async function handler(request, response) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return sendJson(response, 405, { error: "Method not allowed." });
    }

    try {
        const sheet = normalizeSheet(request.body?.sheet || {});
        const workbook = new ExcelJS.Workbook();
        workbook.creator = "SantoSync";
        workbook.created = new Date();

        // Freeze rows 1-3 (title + metadata + column headers)
        const worksheet = workbook.addWorksheet("Procurement Sheet", {
            views: [{ state: "frozen", ySplit: 3 }]
        });

        // ── Row 1: Title banner ──────────────────────────────────────────
        worksheet.mergeCells(`A1:${LAST_COL_LETTER}1`);
        const titleCell = worksheet.getCell("A1");
        titleCell.value = sheet.refNumber || "Procurement Sheet";
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
        if (sheet.notes) {
            metaParts.push(`Notes: ${sheet.notes}`);
        }
        metaCell.value = metaParts.join("   ·   ");
        metaCell.font = { size: 10, color: { argb: "FF475569" } };
        metaCell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: COLOR.meta } };
        metaCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
        metaCell.border = { bottom: { style: "thin", color: { argb: "FFCBD5E1" } } };
        worksheet.getRow(2).height = 18;

        // ── Row 3: Column headers ────────────────────────────────────────
        //  Cols: # | Item # | Client Item Code | Item Description | Brand | Pack Size | Unit | Quantity | Unit Price | Currency | Lead Time | Supplier | Notes
        const headers = ["#", "Item #", "Client Item Code", "Item Description", "Brand", "Pack Size", "Unit", "Quantity", "Unit Price", "Currency", "Lead Time", "Supplier", "Notes"];
        const headerRow = worksheet.addRow(headers);
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
            // Default: center; left-align text-heavy columns (col 4 = Description, col 13 = Notes)
            const leftAligned = [4, 13];
            cell.alignment = {
                vertical: "middle",
                horizontal: leftAligned.includes(colNumber) ? "left" : "center",
                wrapText: false
            };
        });

        // ── Data rows ────────────────────────────────────────────────────
        let runningTotal = 0;
        let hasTotalizableRows = false;

        sheet.rows.forEach((row, i) => {
            const qty = row.quantityTbd ? null : Number.parseFloat(row.quantity);
            const hasQty = qty !== null && !Number.isNaN(qty) && qty > 0;
            const lineTotal = hasQty ? qty * row.unitPrice : null;
            if (lineTotal !== null) {
                runningTotal += lineTotal;
                hasTotalizableRows = true;
            }

            const dataRow = worksheet.addRow([
                row.lineNumber,        // col 1
                row.itemNumber,        // col 2  Item #
                row.clientItemCode,    // col 3  Client Item Code
                row.description,       // col 4
                row.brand,             // col 5
                row.packSize,          // col 6
                row.unit,              // col 7
                row.quantityTbd ? "TBD" : (row.quantity || ""), // col 8
                row.unitPrice > 0 ? row.unitPrice : "",         // col 9
                row.currency,          // col 10
                row.leadTime,          // col 11
                row.supplier,          // col 12
                row.notes              // col 13
            ]);

            dataRow.height = 18;
            const rowBg = i % 2 === 1 ? COLOR.stripe : COLOR.white;

            dataRow.eachCell((cell, colNumber) => {
                cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: rowBg } };
                cell.border = THIN_BORDER();
                cell.alignment = { vertical: "top", wrapText: [4, 13].includes(colNumber) };
            });

            // Line number: center
            dataRow.getCell(1).alignment = { vertical: "top", horizontal: "center" };

            // Quantity: center, TBD styled in muted italic
            dataRow.getCell(8).alignment = { vertical: "top", horizontal: "center" };
            if (row.quantityTbd) {
                dataRow.getCell(8).font = { italic: true, color: { argb: COLOR.tbd }, size: 10 };
            }

            // Unit Price: right-aligned number format
            if (row.unitPrice > 0) {
                dataRow.getCell(9).numFmt = "#,##0.00";
                dataRow.getCell(9).alignment = { vertical: "top", horizontal: "right" };
            }

            // Currency: center
            dataRow.getCell(10).alignment = { vertical: "top", horizontal: "center" };
        });

        // ── Totals row ───────────────────────────────────────────────────
        if (sheet.rows.length > 0 && hasTotalizableRows) {
            // 13 columns: col 4 = Description (TOTAL label), col 9 = Unit Price (total), col 10 = Currency
            const totalRow = worksheet.addRow([
                "", "", "", "TOTAL", "", "", "", "", runningTotal, sheet.currency || "USD", "", "", ""
            ]);
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
            totalRow.getCell(4).font = { bold: true, size: 10 };
            totalRow.getCell(4).alignment = { vertical: "middle", horizontal: "left" };
            totalRow.getCell(9).numFmt = "#,##0.00";
            totalRow.getCell(9).font = { bold: true, size: 10 };
            totalRow.getCell(9).alignment = { vertical: "middle", horizontal: "right" };
            totalRow.getCell(10).alignment = { vertical: "middle", horizontal: "center" };
        }

        // ── Column widths ────────────────────────────────────────────────
        worksheet.columns = [
            { width: 6  },   // # (line number)
            { width: 10 },   // Item #
            { width: 18 },   // Client Item Code
            { width: 38 },   // Item Description
            { width: 16 },   // Brand
            { width: 14 },   // Pack Size
            { width: 10 },   // Unit
            { width: 12 },   // Quantity
            { width: 14 },   // Unit Price
            { width: 10 },   // Currency
            { width: 14 },   // Lead Time
            { width: 20 },   // Supplier
            { width: 26 }    // Notes
        ];

        // ── Auto-filter on header row ────────────────────────────────────
        if (sheet.rows.length > 0) {
            const dataEndRow = 3 + sheet.rows.length;
            worksheet.autoFilter = {
                from: { row: 3, column: 1 },
                to:   { row: dataEndRow, column: NCOLS }
            };
        }

        const buffer = await workbook.xlsx.writeBuffer();
        const filename = `${safeFilenamePart(sheet.refNumber, "procurement-sheet")}_ProcurementSheet.xlsx`;
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        response.end(Buffer.from(buffer));
    } catch (error) {
        return sendJson(response, 500, {
            error: error.message || "Unable to generate procurement Excel file."
        });
    }
};
