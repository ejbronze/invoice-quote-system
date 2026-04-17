module.exports = async function handler(request, response) {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return response.status(405).json({ error: "Method not allowed." });
    }

    const configuredMode = String(process.env.DATA_STORAGE_MODE || "").trim().toLowerCase();
    const localSeedFromBlob = ["1", "true", "yes", "on"].includes(String(process.env.LOCAL_SEED_FROM_BLOB || "").trim().toLowerCase());

    let mode = "live";
    if (configuredMode === "local-sandbox" && localSeedFromBlob) {
        mode = "live-read-local-write";
    } else if (configuredMode === "local-sandbox") {
        mode = "local-sandbox";
    }

    return response.status(200).json({
        mode
    });
};
