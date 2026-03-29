module.exports = async function handler(request, response) {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return response.status(405).json({ error: "Method not allowed." });
    }

    const token = process.env.BLOB_READ_WRITE_TOKEN || "";
    const accessMode = process.env.BLOB_ACCESS_MODE === "private" ? "private" : "public";

    return response.status(200).json({
        blobAccessMode: accessMode,
        hasBlobToken: Boolean(token),
        tokenPrefix: token ? token.slice(0, 12) : null,
        tokenLength: token ? token.length : 0
    });
};
