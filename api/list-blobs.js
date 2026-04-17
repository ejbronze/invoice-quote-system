const { list } = require("@vercel/blob");

function getBlobToken() {
    return process.env.BLOB_READ_WRITE_TOKEN;
}

module.exports = async function handler(request, response) {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return response.status(405).json({ error: "Method not allowed." });
    }

    try {
        const token = getBlobToken();
        if (!token) {
            return response.status(500).json({ error: "BLOB_READ_WRITE_TOKEN is not configured." });
        }

        const { blobs } = await list({
            token,
            prefix: "todos-logistics/",
            limit: 1000
        });

        return response.status(200).json({
            totalBlobs: blobs.length,
            blobs: blobs.map(blob => ({
                pathname: blob.pathname,
                sizeBytes: blob.size,
                uploadedAt: blob.uploadedAt,
                url: blob.url
            }))
        });
    } catch (error) {
        return response.status(500).json({
            error: "Failed to list blobs.",
            message: error.message || String(error)
        });
    }
};