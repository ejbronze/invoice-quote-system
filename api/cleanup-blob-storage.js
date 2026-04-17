const { list, del } = require("@vercel/blob");

function getBlobToken() {
    return process.env.BLOB_READ_WRITE_TOKEN;
}

function isTimestampedBlob(blobName) {
    // Match pattern: something/TIMESTAMP.json where TIMESTAMP is 13 digits
    // Example: documents/1713350400000.json
    return /\/\d{13}\.json$/.test(blobName);
}

function isCurrentDataBlob(blobName) {
    // Current data files: documents/current.json, clients/current.json, workspace/current.json
    return /\/current\.json$/.test(blobName);
}

function isLegacyPdf(blobName) {
    // Legacy PDF files: legacy-pdfs/filename.pdf
    return blobName.startsWith('todos-logistics/legacy-pdfs/');
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

        // Categorize blobs
        const currentDataBlobs = blobs.filter(blob => isCurrentDataBlob(blob.pathname));
        const timestampedBlobs = blobs.filter(blob => isTimestampedBlob(blob.pathname));
        const legacyPdfBlobs = blobs.filter(blob => isLegacyPdf(blob.pathname));
        const otherBlobs = blobs.filter(blob =>
            !isCurrentDataBlob(blob.pathname) &&
            !isTimestampedBlob(blob.pathname) &&
            !isLegacyPdf(blob.pathname)
        );

        // Safety check: Only proceed if we have current data blobs
        if (currentDataBlobs.length === 0) {
            return response.status(400).json({
                success: false,
                error: "Safety check failed: No current data blobs found. Cleanup aborted to prevent data loss.",
                message: "This suggests data may be in localStorage only. Export your data first before cleaning.",
                totalBlobs: blobs.length,
                currentDataBlobs: [],
                timestampedBlobs: timestampedBlobs.length,
                hint: "Use the Export Backup feature in Settings → Tools → JSON Backup before cleaning."
            });
        }

        // Only delete timestamped blobs that are older than current data
        const latestCurrentDataTime = Math.max(...currentDataBlobs.map(b => new Date(b.uploadedAt).getTime()));
        const safeToDeleteBlobs = timestampedBlobs.filter(blob => {
            const blobTime = new Date(blob.uploadedAt).getTime();
            // Only delete if it's significantly older than current data (at least 1 hour older)
            return (latestCurrentDataTime - blobTime) > (60 * 60 * 1000); // 1 hour in milliseconds
        });

        if (safeToDeleteBlobs.length === 0) {
            return response.status(200).json({
                success: true,
                mode: request.method === "GET" ? "preview" : "executed",
                message: "No old timestamped blobs found that are safe to delete.",
                totalBlobs: blobs.length,
                currentDataBlobs: currentDataBlobs.length,
                timestampedBlobs: timestampedBlobs.length,
                safeToDeleteCount: 0,
                protectedBlobs: blobs.map(b => ({ pathname: b.pathname, sizeBytes: b.size, uploadedAt: b.uploadedAt })),
                hint: "All timestamped blobs are recent and may contain active data."
            });
        }

        // GET: Return preview of what would be deleted
        if (request.method === "GET") {
            const totalSizeKB = Math.round(
                safeToDeleteBlobs.reduce((sum, blob) => sum + (blob.size || 0), 0) / 1024
            );

            return response.status(200).json({
                success: true,
                mode: "preview",
                message: `Safe to clean up ${safeToDeleteBlobs.length} old timestamped blob(s).`,
                totalBlobs: blobs.length,
                currentDataBlobs: currentDataBlobs.length,
                timestampedBlobs: timestampedBlobs.length,
                safeToDeleteCount: safeToDeleteBlobs.length,
                estimatedFreedSpaceKB: totalSizeKB,
                blobsToDelete: safeToDeleteBlobs.map(blob => ({
                    pathname: blob.pathname,
                    sizeBytes: blob.size,
                    uploadedAt: blob.uploadedAt,
                    ageHours: Math.round((latestCurrentDataTime - new Date(blob.uploadedAt).getTime()) / (60 * 60 * 1000))
                })),
                protectedBlobs: [
                    ...currentDataBlobs.map(b => ({ pathname: b.pathname, sizeBytes: b.size, type: 'current-data' })),
                    ...legacyPdfBlobs.map(b => ({ pathname: b.pathname, sizeBytes: b.size, type: 'legacy-pdf' })),
                    ...otherBlobs.map(b => ({ pathname: b.pathname, sizeBytes: b.size, type: 'other' }))
                ],
                warning: "⚠️ Only deleting blobs older than 1 hour. Recent data is protected.",
                hint: "To execute cleanup, send a POST request to this endpoint."
            });
        }

        // POST: Execute the deletion
        const urlsToDelete = safeToDeleteBlobs.map(blob => blob.url);
        await del(urlsToDelete, { token });

        const totalSizeKB = Math.round(
            safeToDeleteBlobs.reduce((sum, blob) => sum + (blob.size || 0), 0) / 1024
        );

        return response.status(200).json({
            success: true,
            mode: "executed",
            message: `✓ Safely cleaned up ${safeToDeleteBlobs.length} old blob(s). Freed ~${totalSizeKB} KB.`,
            totalBlobs: blobs.length,
            remainingBlobs: blobs.length - safeToDeleteBlobs.length,
            deletedCount: safeToDeleteBlobs.length,
            freedSpaceKB: totalSizeKB,
            deletedBlobs: safeToDeleteBlobs.map(blob => ({
                pathname: blob.pathname,
                sizeBytes: blob.size,
                uploadedAt: blob.uploadedAt,
                ageHours: Math.round((latestCurrentDataTime - new Date(blob.uploadedAt).getTime()) / (60 * 60 * 1000))
            })),
            protectedBlobs: [
                ...currentDataBlobs.map(b => ({ pathname: b.pathname, sizeBytes: b.size, type: 'current-data' })),
                ...legacyPdfBlobs.map(b => ({ pathname: b.pathname, sizeBytes: b.size, type: 'legacy-pdf' })),
                ...otherBlobs.map(b => ({ pathname: b.pathname, sizeBytes: b.size, type: 'other' }))
            ],
            note: "✓ All current data and recent backups have been preserved."
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            error: "Cleanup operation failed.",
            message: error.message || String(error)
        });
    }
};
