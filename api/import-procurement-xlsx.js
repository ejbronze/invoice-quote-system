const ExcelJS = require("exceljs");

function sendJson(response, statusCode, payload) {
    response.statusCode = statusCode;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(JSON.stringify(payload));
}

const COLUMN_ALIASES = {
    description: ["item description", "description", "item name", "item", "product", "product description"],
    brand:       ["brand"],
    packSize:    ["pack size", "packsize", "pack", "unit size", "unitsize"],
    unit:        ["unit", "uom", "unit of measure"],
    quantity:    ["quantity", "qty", "amount"],
    unitPrice:   ["unit price", "unitprice", "price", "unit cost", "cost"],
    currency:    ["currency", "ccy"],
    leadTime:    ["lead time", "leadtime", "lead"],
    supplier:    ["supplier", "vendor", "source"],
    notes:       ["notes", "note", "remarks", "comment"]
};

function resolveColumns(headers) {
    const map = {};
    for (const [field, aliases] of Object.entries(COLUMN_ALIASES)) {
        map[field] = headers.findIndex(h =>
            aliases.includes(String(h || "").toLowerCase().trim())
        );
    }
    return map;
}

function isHeaderRow(row) {
    const cells = row.map(c => String(c ?? "").toLowerCase().trim());
    return cells.some(c =>
        c === "item description" || c === "description" || c === "item name"
    );
}

function cellValue(row, idx) {
    if (idx < 0 || idx >= row.length) return "";
    const v = row[idx];
    return v === null || v === undefined ? "" : String(v).trim();
}

module.exports = async function handler(request, response) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return sendJson(response, 405, { error: "Method not allowed." });
    }

    try {
        const { data } = request.body || {};
        if (!data) {
            return sendJson(response, 400, { error: "No file data provided." });
        }

        const buffer = Buffer.from(data, "base64");
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);

        const worksheet = workbook.worksheets[0];
        if (!worksheet) {
            return sendJson(response, 422, { error: "No worksheets found in the file." });
        }

        // Collect all rows as arrays of raw values
        const allRows = [];
        worksheet.eachRow({ includeEmpty: false }, row => {
            allRows.push(row.values.slice(1)); // ExcelJS row.values is 1-indexed
        });

        // Find the header row
        let headerIdx = allRows.findIndex(isHeaderRow);
        if (headerIdx === -1) {
            // Fallback: first non-empty row
            headerIdx = allRows.findIndex(r => r.some(c => c != null && String(c).trim()));
        }
        if (headerIdx === -1) {
            return sendJson(response, 422, { error: "Could not detect a header row. Make sure the file has an 'Item Description' column." });
        }

        const headers = allRows[headerIdx].map(c => String(c ?? "").toLowerCase().trim());
        const col = resolveColumns(headers);

        if (col.description < 0) {
            return sendJson(response, 422, { error: "Could not find an 'Item Description' column. Check that the file has the correct headers." });
        }

        const rows = [];
        let skipped = 0;

        for (let i = headerIdx + 1; i < allRows.length; i++) {
            const raw = allRows[i];
            const description = cellValue(raw, col.description);
            if (!description) { skipped++; continue; }

            const rawQty = cellValue(raw, col.quantity);
            const quantityTbd = !rawQty || rawQty.toUpperCase() === "TBD";
            const unitPriceRaw = Number.parseFloat(cellValue(raw, col.unitPrice));

            rows.push({
                description,
                brand:       cellValue(raw, col.brand),
                packSize:    cellValue(raw, col.packSize),
                unit:        cellValue(raw, col.unit),
                quantity:    quantityTbd ? "" : rawQty,
                quantityTbd,
                unitPrice:   Number.isFinite(unitPriceRaw) ? unitPriceRaw : 0,
                currency:    cellValue(raw, col.currency) || "USD",
                leadTime:    cellValue(raw, col.leadTime),
                supplier:    cellValue(raw, col.supplier),
                notes:       cellValue(raw, col.notes)
            });
        }

        return sendJson(response, 200, { rows, skipped });
    } catch (error) {
        return sendJson(response, 500, {
            error: error.message || "Unable to parse the Excel file."
        });
    }
};
