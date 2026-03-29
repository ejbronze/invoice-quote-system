const { get } = require("@vercel/blob");
const { normalizeDocuments, readDataset } = require("./_storage");

function getBlobToken() {
    return process.env.BLOB_READ_WRITE_TOKEN;
}

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

        const token = getBlobToken();
        if (!token) {
            return response.status(500).json({ error: "BLOB_READ_WRITE_TOKEN is not configured." });
        }

        const blobResponse = await get(doc.legacyPdfUrl, { token });
        if (!blobResponse || !blobResponse.body) {
            return response.status(404).json({ error: "Legacy PDF could not be opened." });
        }

        response.setHeader("Content-Type", "application/pdf");
        response.setHeader("Content-Disposition", `inline; filename="${doc.legacyPdfFilename || "legacy-document.pdf"}"`);

        const arrayBuffer = await new Response(blobResponse.body).arrayBuffer();
        return response.status(200).send(Buffer.from(arrayBuffer));
    } catch (error) {
        return response.status(error.statusCode || 500).json({
            error: error.message || "Unable to load the legacy PDF."
        });
    }
};
