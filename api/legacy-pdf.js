const { normalizeDocuments, readDataset, readLegacyPdfBuffer } = require("./_storage");

module.exports = async function handler(request, response) {
    try {
        if (request.method !== "GET") {
            response.setHeader("Allow", "GET");
            return response.status(405).json({ error: "Method not allowed." });
        }

        const documentId = Number(request.query.documentId);
        if (!Number.isFinite(documentId)) {
            return response.status(400).json({ error: "Missing or invalid documentId." });
        }

        const documents = normalizeDocuments(await readDataset("documents", []));
        const doc = documents.find(entry => entry.id === documentId);

        if (!doc || !doc.legacyPdfUrl) {
            return response.status(404).json({ error: "Legacy PDF not found." });
        }

        response.setHeader("Content-Type", "application/pdf");
        response.setHeader("Content-Disposition", `inline; filename="${doc.legacyPdfFilename || "legacy-document.pdf"}"`);
        return response.status(200).send(await readLegacyPdfBuffer(doc.legacyPdfUrl));
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            error: error.message || "Unable to load the legacy PDF."
        });
    }
};
