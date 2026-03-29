const { put } = require("@vercel/blob");

function getBlobToken() {
    return process.env.BLOB_READ_WRITE_TOKEN;
}

function getBlobAccessMode() {
    return process.env.BLOB_ACCESS_MODE === "private" ? "private" : "public";
}

function decodeFileBuffer(fileData) {
    const value = String(fileData || "");
    const base64 = value.includes(",") ? value.split(",")[1] : value;
    return Buffer.from(base64, "base64");
}

function sanitizeFilename(filename) {
    return String(filename || "legacy-upload.pdf")
        .replace(/[^a-z0-9._-]+/gi, "-")
        .replace(/-+/g, "-");
}

module.exports = async function handler(request, response) {
    try {
        if (request.method !== "POST") {
            response.setHeader("Allow", "POST");
            return response.status(405).json({ error: "Method not allowed." });
        }

        const token = getBlobToken();
        if (!token) {
            return response.status(500).json({ error: "BLOB_READ_WRITE_TOKEN is not configured." });
        }

        const { filename, mimeType, fileData } = request.body || {};
        if (!filename || !mimeType || !fileData) {
            return response.status(400).json({ error: "Missing file upload details." });
        }

        if (mimeType !== "application/pdf") {
            return response.status(400).json({ error: "Legacy upload supports PDF files only." });
        }

        const safeFilename = sanitizeFilename(filename);
        const blob = await put(`todos-logistics/legacy-pdfs/${Date.now()}-${safeFilename}`, decodeFileBuffer(fileData), {
            token,
            access: getBlobAccessMode(),
            contentType: "application/pdf",
            addRandomSuffix: false
        });

        return response.status(200).json({
            fileUrl: blob.url,
            filename: safeFilename
        });
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            error: error.message || "Unable to upload the legacy PDF."
        });
    }
};
