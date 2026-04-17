const { list, del } = require("@vercel/blob");

function getBlobToken() {
    return process.env.BLOB_READ_WRITE_TOKEN;
}

function isTimestampedBlob(blobName) {
    // Match pattern: something/TIMESTAMP.json where TIMESTAMP is 13 digits
    // Example: documents/1713350400000.json
    return /\/\d{13}\.json$/.test(blobName);
}

module.exports = async function handler(request, response) {
    // Support both GET (preview/report) and POST (execute cleanup)
    if (!["GET", "POST"].includes(request.method)) {
        response.setHeader("Allow", "GET, POST");
        return response.status(405).json({ error: "Method not allowed." });
    }

    try {
        const token = getBlobToken();
        if (!token) {
            return response.status(500).json({ error: "BLOB_READ_WRITE_TOKEN is not configured." });
        }

        // List all blobs in todos-logistics namespace
        const { blobs } = await list({
            token,
            prefix: "todos-logistics/",
            limit: 1000
        });

        if (!Array.isArray(blobs) || blobs.length === 0) {
            return response.status(200).json({
                success: true,
                mode: request.method === "GET" ? "preview" : "executed",
                message: "No blobs found to clean up.",
                totalBlobs: 0,
                currentBlobs: 0,
                deletedCount: 0,
                deletedBlobs: []
            });
        }

        // Identify old timestamped blobs to delete
        const blobsToDelete = blobs.filter(blob => isTimestampedBlob(blob.pathname));

        if (blobsToDelete.length === 0) {
            return response.status(200).json({
                success: true,
                mode: request.method === "GET" ? "preview" : "executed",
                message: "No old timestamped blobs found. Storage is already optimized.",
                totalBlobs: blobs.length,
                currentBlobs: blobs.length,
                deletedCount: 0,
                deletedBlobs: [],
                preservedBlobs: blobs.map(b => b.pathname)
            });
        }

        // GET: Return preview of what would be deleted
        if (request.method === "GET") {
            const totalSizeKB = Math.round(
                blobsToDelete.reduce((sum, blob) => sum + (blob.size || 0), 0) / 1024
            );

            return response.status(200).json({
                success: true,
                mode: "preview",
                message: `Ready to clean up ${blobsToDelete.length} old blob(s)`,
                totalBlobs: blobs.length,
                currentBlobs: blobs.length - blobsToDelete.length,
                estimatedFreedSpaceKB: totalSizeKB,
                deletedCount: blobsToDelete.length,
                blobsToDelete: blobsToDelete.map(blob => ({
                    pathname: blob.pathname,
                    sizeBytes: blob.size,
                    uploadedAt: blob.uploadedAt
                })),
                preservedBlobs: blobs
                    .filter(b => !isTimestampedBlob(b.pathname))
                    .map(b => ({ pathname: b.pathname, sizeBytes: b.size })),
                hint: "To execute cleanup, send a POST request to this endpoint."
            });
        }

        // POST: Execute the deletion
        const urlsToDelete = blobsToDelete.map(blob => blob.url);
        await del(urlsToDelete, { token });

        const totalSizeKB = Math.round(
            blobsToDelete.reduce((sum, blob) => sum + (blob.size || 0), 0) / 1024
        );

        return response.status(200).json({
            success: true,
            mode: "executed",
            message: `✓ Successfully cleaned up ${blobsToDelete.length} old blob(s). Freed ~${totalSizeKB} KB.`,
            totalBlobs: blobs.length,
            currentBlobs: blobs.length - blobsToDelete.length,
            deletedCount: blobsToDelete.length,
            freedSpaceKB: totalSizeKB,
            deletedBlobs: blobsToDelete.map(blob => ({
                pathname: blob.pathname,
                sizeBytes: blob.size,
                uploadedAt: blob.uploadedAt
            })),
            preservedBlobs: blobs
                .filter(b => !isTimestampedBlob(b.pathname))
                .map(b => ({ pathname: b.pathname, sizeBytes: b.size })),
            note: "✓ All current.json files and active data have been preserved."
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: "Cleanup operation failed.",
            message: error.message || String(error)
        });
    }
};
