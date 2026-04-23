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
            description: String(row?.description || "").trim(),
            brand: String(row?.brand || "").trim(),
            packSize: String(row?.packSize || "").trim(),
            unit: String(row?.unit || "").trim(),
            unitPrice: toNumber(row?.unitPrice),
            currency: String(row?.currency || sheet?.currency || "USD").trim() || "USD",
            leadTime: String(row?.leadTime || "").trim(),
            supplier: String(row?.supplier || "").trim(),
            quantity: row?.quantityTbd ? "TBD" : String(row?.quantity || "").trim(),
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

        const worksheet = workbook.addWorksheet("Procurement Sheet", {
            views: [{ state: "frozen", ySplit: 5 }]
        });

        worksheet.mergeCells("A1:L1");
        worksheet.getCell("A1").value = sheet.refNumber || "Procurement Sheet";
        worksheet.getCell("A1").font = { bold: true, size: 16, color: { argb: "FFFFFFFF" } };
        worksheet.getCell("A1").fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1459D9" } };
        worksheet.getCell("A1").alignment = { vertical: "middle", horizontal: "left" };
        worksheet.getRow(1).height = 26;

        worksheet.addRow(["Bid / Client", sheet.clientName || "", "Date", sheet.date || "", "Currency", sheet.currency || "USD", "Notes", sheet.notes || ""]);
        worksheet.addRow([]);

        const headers = ["Line", "Item Description", "Brand", "Pack Size", "Unit", "Unit Price", "Currency", "Lead Time", "Supplier", "Quantity", "Notes", "Source"];
        const headerRow = worksheet.addRow(headers);
        headerRow.eachCell(cell => {
            cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
            cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF203B5A" } };
            cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
            cell.border = {
                top: { style: "thin", color: { argb: "FFD9E2EF" } },
                left: { style: "thin", color: { argb: "FFD9E2EF" } },
                bottom: { style: "thin", color: { argb: "FFD9E2EF" } },
                right: { style: "thin", color: { argb: "FFD9E2EF" } }
            };
        });

        sheet.rows.forEach(row => {
            worksheet.addRow([
                row.lineNumber,
                row.description,
                row.brand,
                row.packSize,
                row.unit,
                row.unitPrice,
                row.currency,
                row.leadTime,
                row.supplier,
                row.quantity,
                row.notes,
                ""
            ]);
        });

        worksheet.columns = [
            { width: 8 },
            { width: 38 },
            { width: 18 },
            { width: 18 },
            { width: 14 },
            { width: 14 },
            { width: 12 },
            { width: 16 },
            { width: 22 },
            { width: 12 },
            { width: 28 },
            { width: 14 }
        ];

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber <= 3) {
                return;
            }
            row.eachCell(cell => {
                cell.alignment = { vertical: "top", wrapText: true };
                cell.border = {
                    top: { style: "thin", color: { argb: "FFE1E8F0" } },
                    left: { style: "thin", color: { argb: "FFE1E8F0" } },
                    bottom: { style: "thin", color: { argb: "FFE1E8F0" } },
                    right: { style: "thin", color: { argb: "FFE1E8F0" } }
                };
            });
        });

        worksheet.getColumn(6).numFmt = '"$"#,##0.00;[Red]-"$"#,##0.00';
        worksheet.autoFilter = {
            from: { row: 4, column: 1 },
            to: { row: Math.max(4, 4 + sheet.rows.length), column: headers.length }
        };

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
