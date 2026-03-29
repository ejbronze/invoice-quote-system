const { put } = require("@vercel/blob");

function getBlobToken() {
    return process.env.BLOB_READ_WRITE_TOKEN || "";
}

function getBlobAccessMode() {
    return process.env.BLOB_ACCESS_MODE === "private" ? "private" : "public";
}

module.exports = async function handler(request, response) {
    if (request.method !== "GET") {
        response.setHeader("Allow", "GET");
        return response.status(405).json({ error: "Method not allowed." });
    }

    const token = getBlobToken();
    if (!token) {
        return response.status(500).json({ error: "BLOB_READ_WRITE_TOKEN is not configured." });
    }

    const access = getBlobAccessMode();
    const pathname = `todos-logistics/debug/${Date.now()}.txt`;

    try {
        const blob = await put(pathname, "blob debug probe", {
            token,
            access,
            addRandomSuffix: false,
            contentType: "text/plain"
        });

        return response.status(200).json({
            ok: true,
            attemptedAccess: access,
            pathname,
            url: blob.url
        });
    } catch (error) {
        return response.status(200).json({
            ok: false,
            attemptedAccess: access,
            error: error.message || String(error)
        });
    }
};
