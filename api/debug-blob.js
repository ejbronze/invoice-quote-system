const { readDataset } = require("./_storage");

module.exports = async function handler(request, response) {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return response.status(405).json({ error: "Method not allowed." });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN || "";
    const accessMode = process.env.BLOB_ACCESS_MODE === "private" ? "private" : "public";
    const dataMode = process.env.DATA_STORAGE_MODE || "(not set)";
    const localDataDir = process.env.LOCAL_DATA_DIR || "(not set)";
    const seedFromBlob = process.env.LOCAL_SEED_FROM_BLOB || "(not set)";

    let documentsResult = null;
    let documentsError = null;

    try {
        const docs = await readDataset("documents", []);
        documentsResult = {
            count: Array.isArray(docs) ? docs.length : "not an array",
            type: Array.isArray(docs) ? "array" : typeof docs
        };
    } catch (err) {
        documentsError = err.message || String(err);
    }

    return response.status(200).json({
        blobAccessMode: accessMode,
        hasBlobToken: Boolean(token),
        tokenPrefix: token ? token.slice(0, 12) + "..." : null,
        dataStorageMode: dataMode,
        localDataDir,
        localSeedFromBlob: seedFromBlob,
        documentsRead: documentsResult,
        documentsError
    });
};
