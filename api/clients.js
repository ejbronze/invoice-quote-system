const {
    getDefaultClients,
    normalizeClients,
    readDataset,
    sendJson,
    writeDataset
} = require("./_storage");

module.exports = async function handler(request, response) {
    try {
        if (request.method === "GET") {
            const clients = normalizeClients(await readDataset("clients", getDefaultClients()));
            return sendJson(response, 200, { clients });
        }

        if (request.method === "POST") {
            const clients = normalizeClients(request.body?.clients);
            await writeDataset("clients", clients);
            return sendJson(response, 200, { clients });
        }

        response.setHeader("Allow", "GET, POST");
        return sendJson(response, 405, { error: "Method not allowed." });
    } catch (error) {
        return sendJson(response, error.statusCode || 500, {
            error: error.message || "Unexpected server error."
        });
    }
};
