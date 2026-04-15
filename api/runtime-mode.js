module.exports = async function handler(request, response) {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return response.status(405).json({ error: "Method not allowed." });
    }

    const configuredMode = String(process.env.DATA_STORAGE_MODE || "").trim().toLowerCase();

    return response.status(200).json({
        mode: configuredMode === "local-sandbox" ? "local-sandbox" : "live"
    });
};
