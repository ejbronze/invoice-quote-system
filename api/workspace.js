const {
    normalizeWorkspaceState,
    readDataset,
    sendJson,
    writeDataset
} = require("./_storage");

module.exports = async function handler(request, response) {
    try {
        if (request.method === "GET") {
            const workspace = normalizeWorkspaceState(await readDataset("workspace", {}));
            return sendJson(response, 200, workspace);
        }

        if (request.method === "POST") {
            const workspace = normalizeWorkspaceState(request.body || {});
            await writeDataset("workspace", workspace);
            return sendJson(response, 200, workspace);
        }

        response.setHeader("Allow", "GET, POST");
        return sendJson(response, 405, { error: "Method not allowed." });
    } catch (error) {
        return sendJson(response, error.statusCode || 500, {
            error: error.message || "Unexpected server error."
        });
    }
};
