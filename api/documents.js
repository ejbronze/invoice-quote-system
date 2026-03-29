const {
    normalizeDocuments,
    readDataset,
    sendJson,
    writeDataset
} = require("./_storage");

module.exports = async function handler(request, response) {
    try {
        if (request.method === "GET") {
            const documents = normalizeDocuments(await readDataset("documents", []));
            return sendJson(response, 200, { documents });
        }

        if (request.method === "POST") {
            const documents = normalizeDocuments(request.body?.documents);
            await writeDataset("documents", documents);
            return sendJson(response, 200, { documents });
        }

        response.setHeader("Allow", "GET, POST");
        return sendJson(response, 405, { error: "Method not allowed." });
    } catch (error) {
        return sendJson(response, error.statusCode || 500, {
            error: error.message || "Unexpected server error."
        });
    }
};
