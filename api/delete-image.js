const {
    getBlobToken,
    isLocalSandboxMode,
    sendJson
} = require("./_storage");

async function loadBlobSdk() {
    return import("@vercel/blob");
}

function isDeletableBlobUrl(url) {
    const value = String(url || "").trim();
    return /^https:\/\/.+\.public\.blob\.vercel-storage\.com\//.test(value)
        || /^https:\/\/.+\.blob\.vercel-storage\.com\//.test(value);
}

module.exports = async function handler(request, response) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return sendJson(response, 405, { error: "Method not allowed." });
    }

    try {
        const { url } = request.body || {};
        if (!url || typeof url !== "string") {
            return sendJson(response, 400, { error: "Missing image URL." });
        }

        if (isLocalSandboxMode() || !getBlobToken()) {
            return sendJson(response, 200, { deleted: false, skipped: true });
        }

        if (!isDeletableBlobUrl(url)) {
            return sendJson(response, 200, { deleted: false, skipped: true });
        }

        const { del } = await loadBlobSdk();
        await del(url, { token: getBlobToken() });
        return sendJson(response, 200, { deleted: true });
    } catch (error) {
        return sendJson(response, error.statusCode || 500, {
            error: error.message || "Image delete failed."
        });
    }
};
