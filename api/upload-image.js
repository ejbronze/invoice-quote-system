const path = require("path");
const fs = require("fs/promises");
const {
    getBlobToken,
    getBlobAccessMode,
    isLocalSandboxMode,
    sendJson
} = require("./_storage");

function getLocalDataDir() {
    const configuredDir = String(process.env.LOCAL_DATA_DIR || "").trim();
    return configuredDir || path.join(require("os").tmpdir(), "santosync-local-data");
}

async function loadBlobSdk() {
    return import("@vercel/blob");
}

module.exports = async function handler(request, response) {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return sendJson(response, 405, { error: "Method not allowed." });
    }

    try {
        const { imageDataUrl, filename = "catalog-image.jpg" } = request.body || {};

        if (!imageDataUrl || typeof imageDataUrl !== "string" || !imageDataUrl.startsWith("data:")) {
            return sendJson(response, 400, { error: "Invalid image data." });
        }

        const mimeType = imageDataUrl.match(/data:([^;]+);/)?.[1] || "image/jpeg";
        const base64 = imageDataUrl.includes(",") ? imageDataUrl.split(",")[1] : imageDataUrl;
        const buffer = Buffer.from(base64, "base64");
        const safeFilename = String(filename).replace(/[^a-z0-9._-]/gi, "-").replace(/-+/g, "-");
        const blobPath = `catalog-images/${Date.now()}-${safeFilename}`;

        if (isLocalSandboxMode() || !getBlobToken()) {
            // In local sandbox mode, store file locally and return a local path URL
            const localDir = path.join(getLocalDataDir(), "catalog-images");
            await fs.mkdir(localDir, { recursive: true });
            const localPath = path.join(localDir, `${Date.now()}-${safeFilename}`);
            await fs.writeFile(localPath, buffer);
            // Return the data URL unchanged — local mode has no public server for these files
            return sendJson(response, 200, { url: imageDataUrl });
        }

        const { put } = await loadBlobSdk();
        const blob = await put(blobPath, buffer, {
            token: getBlobToken(),
            access: getBlobAccessMode() === "private" ? "public" : getBlobAccessMode(),
            contentType: mimeType,
            addRandomSuffix: false
        });

        return sendJson(response, 200, { url: blob.url });
    } catch (error) {
        return sendJson(response, error.statusCode || 500, {
            error: error.message || "Image upload failed."
        });
    }
};
