const { storeLegacyPdf } = require("./_storage");

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

        const savedFile = await storeLegacyPdf(filename, mimeType, fileData);

        return response.status(200).json({
            fileUrl: savedFile.fileUrl,
            filename: savedFile.filename
        });
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            error: error.message || "Unable to upload the legacy PDF."
        });
    }
};
