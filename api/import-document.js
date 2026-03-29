const pdfParse = require("pdf-parse");

function decodePdfBuffer(fileData) {
    const value = String(fileData || "");
    const base64 = value.includes(",") ? value.split(",")[1] : value;
    return Buffer.from(base64, "base64");
}

function cleanLine(line) {
    return String(line || "")
        .replace(/\s+/g, " ")
        .replace(/[|•]/g, " ")
        .trim();
}

function getLines(text) {
    return String(text || "")
        .split(/\r?\n/)
        .map(cleanLine)
        .filter(Boolean);
}

function parseMoney(value) {
    const cleaned = String(value || "")
        .replace(/USD|US\$|\$/gi, "")
        .replace(/RD\$|DOP/gi, "")
        .replace(/,/g, "")
        .trim();

    const number = Number.parseFloat(cleaned);
    return Number.isFinite(number) ? number : 0;
}

function toIsoDate(value) {
    const raw = String(value || "").trim();
    if (!raw) {
        return "";
    }

    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
        return raw;
    }

    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) {
        return "";
    }

    return parsed.toISOString().split("T")[0];
}

function findFirstMatch(text, patterns) {
    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            return cleanLine(match[1]);
        }
    }

    return "";
}

function detectType(text) {
    if (/\binvoice\b/i.test(text)) {
        return "invoice";
    }

    return "quote";
}

function extractReference(text) {
    return findFirstMatch(text, [
        /(?:quote|invoice)\s*(?:reference|number|no\.?|#)\s*[:\-]?\s*([A-Z0-9\-\/]+)/i,
        /\bref(?:erence)?\s*[:\-]?\s*([A-Z0-9\-\/]+)/i
    ]);
}

function extractDate(text) {
    const value = findFirstMatch(text, [
        /\bdate\s*[:\-]?\s*([A-Za-z]{3,9}\s+\d{1,2},\s+\d{4})/i,
        /\bdate\s*[:\-]?\s*(\d{4}-\d{2}-\d{2})/i,
        /\bdate\s*[:\-]?\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/i
    ]);

    return toIsoDate(value);
}

function extractPoNumber(text) {
    return findFirstMatch(text, [
        /purchase order(?: number)?\s*[:\-]?\s*([A-Z0-9\-\/]+)/i,
        /\bpo(?: number)?\s*[:\-]?\s*([A-Z0-9\-\/]+)/i
    ]);
}

function extractPaymentTerms(text) {
    return findFirstMatch(text, [
        /terms of payment\s*[:\-]?\s*(.+)/i,
        /payment terms\s*[:\-]?\s*(.+)/i
    ]);
}

function extractTotal(text) {
    const value = findFirstMatch(text, [
        /grand total\s*[:\-]?\s*(?:USD|US\$|\$)?\s*([\d,]+(?:\.\d{2})?)/i,
        /total amount\s*[:\-]?\s*(?:USD|US\$|\$)?\s*([\d,]+(?:\.\d{2})?)/i,
        /\btotal\s*[:\-]?\s*(?:USD|US\$|\$)?\s*([\d,]+(?:\.\d{2})?)/i
    ]);

    return parseMoney(value);
}

function extractNotes(text) {
    return findFirstMatch(text, [
        /notes?\s*[:\-]?\s*([\s\S]{0,500}?)(?:terms of payment|payment terms|grand total|total amount|approved by|signature|$)/i
    ]);
}

function extractClientBlock(lines) {
    const labels = [/issued to/i, /bill to/i, /client/i, /customer/i];

    for (let index = 0; index < lines.length; index += 1) {
        if (!labels.some(pattern => pattern.test(lines[index]))) {
            continue;
        }

        const block = [];
        for (let offset = 1; offset <= 4 && index + offset < lines.length; offset += 1) {
            const candidate = lines[index + offset];
            if (/(purchase order|po number|invoice|quote|date|item no|subtotal|total|notes|terms)/i.test(candidate)) {
                break;
            }
            block.push(candidate);
        }

        if (block.length > 0) {
            return block;
        }
    }

    return [];
}

function extractClientNameAndAddress(lines) {
    const block = extractClientBlock(lines);
    if (!block.length) {
        return {
            clientName: "",
            clientAddress: ""
        };
    }

    return {
        clientName: block[0] || "",
        clientAddress: block.slice(1).join("\n")
    };
}

function extractItems(lines) {
    const items = [];

    for (const line of lines) {
        const match = line.match(/^(.*?)(\d+(?:\.\d+)?)\s+(?:USD|US\$|\$)?([\d,]+(?:\.\d{2})?)\s+(?:USD|US\$|\$)?([\d,]+(?:\.\d{2})?)$/i);
        if (!match) {
            continue;
        }

        const description = cleanLine(match[1]);
        const quantity = Number.parseFloat(match[2]);
        const unitPrice = parseMoney(match[3]);
        const totalPrice = parseMoney(match[4]);

        if (!description || !Number.isFinite(quantity) || totalPrice <= 0) {
            continue;
        }

        items.push({
            description,
            quantity,
            unitPrice,
            totalPrice,
            totalPriceDop: 0,
            usesDopTotal: false
        });
    }

    return items.slice(0, 25);
}

async function extractDocumentFromPdf(fileData) {
    const buffer = decodePdfBuffer(fileData);
    const parsed = await pdfParse(buffer);
    const text = String(parsed.text || "");

    if (!text.trim()) {
        const error = new Error("This PDF does not contain readable text. Use a text-based PDF export, not a scanned image PDF.");
        error.statusCode = 400;
        throw error;
    }

    const lines = getLines(text);
    const { clientName, clientAddress } = extractClientNameAndAddress(lines);
    const items = extractItems(lines);
    const total = extractTotal(text) || items.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);

    return {
        type: detectType(text),
        refNumber: extractReference(text),
        date: extractDate(text),
        clientName,
        clientAddress,
        poNumber: extractPoNumber(text),
        tags: ["Imported PDF"],
        notes: extractNotes(text),
        paymentTerms: extractPaymentTerms(text),
        total,
        items
    };
}

module.exports = async function handler(request, response) {
    try {
        if (request.method !== "POST") {
            response.setHeader("Allow", "POST");
            return response.status(405).json({ error: "Method not allowed." });
        }

        const { filename, mimeType, fileData } = request.body || {};
        if (!filename || !mimeType || !fileData) {
            return response.status(400).json({ error: "Missing file upload details." });
        }

        if (mimeType !== "application/pdf") {
            return response.status(400).json({ error: "Free import currently supports text-based PDF files only." });
        }

        const document = await extractDocumentFromPdf(fileData);
        return response.status(200).json({ document });
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            error: error.message || "Unable to import the uploaded document."
        });
    }
};
