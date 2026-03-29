const DEFAULT_CLIENTS = [
    {
        id: "ccxpress",
        name: "CCXpress S.A | Chatelain Cargo Services",
        address: "42 Airport Road, Port Au Prince, Haiti"
    }
];

function getBlobToken() {
    return process.env.BLOB_READ_WRITE_TOKEN;
}

function getBlobAccessMode() {
    return process.env.BLOB_ACCESS_MODE === "private" ? "private" : "public";
}

function ensureBlobToken() {
    if (!getBlobToken()) {
        const error = new Error("BLOB_READ_WRITE_TOKEN is not configured.");
        error.statusCode = 500;
        throw error;
    }
}

function normalizeDocuments(documents) {
    return Array.isArray(documents) ? documents : [];
}

function normalizeClients(clients) {
    const validClients = (Array.isArray(clients) ? clients : [])
        .map(client => ({
            id: client?.id || `client-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name: client?.name || "",
            address: client?.address || ""
        }))
        .filter(client => client.name && client.address);

    const hasDefaultClient = validClients.some(client =>
        client.id === "ccxpress" || client.name === "CCXpress S.A | Chatelain Cargo Services"
    );

    return hasDefaultClient ? validClients : [...DEFAULT_CLIENTS, ...validClients];
}

async function loadBlobSdk() {
    return import("@vercel/blob");
}

async function readDataset(name, fallbackValue) {
    ensureBlobToken();

    const { get, list } = await loadBlobSdk();
    const { blobs } = await list({
        token: getBlobToken(),
        prefix: `todos-logistics/${name}/`
    });

    if (!Array.isArray(blobs) || blobs.length === 0) {
        return fallbackValue;
    }

    const latestBlob = [...blobs].sort((left, right) => {
        return new Date(right.uploadedAt).getTime() - new Date(left.uploadedAt).getTime();
    })[0];

    if (getBlobAccessMode() === "private") {
        const blobResponse = await get(latestBlob.url, {
            token: getBlobToken()
        });

        if (!blobResponse || !blobResponse.body) {
            const error = new Error(`Unable to read ${name} dataset.`);
            error.statusCode = 500;
            throw error;
        }

        const response = new Response(blobResponse.body);
        return response.json();
    }

    const response = await fetch(latestBlob.url, { cache: "no-store" });
    if (!response.ok) {
        const error = new Error(`Unable to read ${name} dataset.`);
        error.statusCode = 500;
        throw error;
    }

    return response.json();
}

async function writeDataset(name, value) {
    ensureBlobToken();

    const { put } = await loadBlobSdk();
    return put(`todos-logistics/${name}/${Date.now()}.json`, JSON.stringify(value, null, 2), {
        token: getBlobToken(),
        access: getBlobAccessMode(),
        contentType: "application/json",
        addRandomSuffix: false
    });
}

function sendJson(response, statusCode, payload) {
    response.status(statusCode).json(payload);
}

function getDefaultClients() {
    return [...DEFAULT_CLIENTS];
}

module.exports = {
    getDefaultClients,
    normalizeClients,
    normalizeDocuments,
    readDataset,
    sendJson,
    writeDataset
};
