const DEFAULT_CLIENTS = [
    {
        id: "ccxpress",
        name: "CCXpress S.A | Chatelain Cargo Services",
        address: "42 Airport Road, Port Au Prince, Haiti",
        consigneeName: "",
        consigneeAddress: ""
    }
];

const DEFAULT_ADMIN_USER = Object.freeze({
    id: "admin-root",
    username: "admin",
    displayName: "Admin",
    email: "admin@santosync.com",
    password: "Todos123",
    role: "admin",
    language: "en",
    accessLevel: "workspace",
    parentUserId: "",
    lastLoginAt: ""
});

const DEFAULT_OWNER_USER = Object.freeze({
    id: "owner-root",
    username: "erjaquez",
    displayName: "Edwin Jaquez",
    email: "erjaquez@gmail.com",
    password: "Britney10!",
    role: "owner",
    language: "en",
    accessLevel: "owner",
    parentUserId: "",
    lastLoginAt: ""
});

const DEFAULT_COMPANY_PROFILE = Object.freeze({
    companyName: "SantoSync",
    tagline: "Premium workflow sync for quotes, invoices, and trade operations.",
    address: "Santo Domingo, Dominican Republic",
    email: "hello@santosync.com",
    phone: "+1 (809) 555-0110",
    website: "www.santosync.com",
    taxId: "Registration Pending",
    signatureDataUrl: "",
    stampDataUrl: ""
});

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
            address: client?.address || "",
            consigneeName: client?.consigneeName || "",
            consigneeAddress: client?.consigneeAddress || ""
        }))
        .filter(client => client.name && client.address);

    const hasDefaultClient = validClients.some(client =>
        client.id === "ccxpress" || client.name === "CCXpress S.A | Chatelain Cargo Services"
    );

    return hasDefaultClient ? validClients : [...DEFAULT_CLIENTS, ...validClients];
}

function normalizeUserAccounts(users) {
    const source = Array.isArray(users) ? users : [];
    const mergedUsers = [];
    const usernameSet = new Set();
    const emailSet = new Set();

    source.forEach(user => {
        const username = String(user?.username || "").trim().toLowerCase();
        if (!username || usernameSet.has(username)) {
            return;
        }
        const email = String(user?.email || "").trim().toLowerCase();
        if (email && emailSet.has(email)) {
            return;
        }

        usernameSet.add(username);
        if (email) {
            emailSet.add(email);
        }
        mergedUsers.push({
            id: String(user?.id || `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
            username,
            email,
            displayName: String(user?.displayName || username).trim() || username,
            password: String(user?.password || ""),
            role: ["owner", "admin"].includes(user?.role) ? user.role : "user",
            language: ["en", "es", "fr"].includes(user?.language) ? user.language : "en",
            accessLevel: ["owner", "workspace", "operations", "review"].includes(user?.accessLevel) ? user.accessLevel : "workspace",
            parentUserId: String(user?.parentUserId || "").trim(),
            lastLoginAt: String(user?.lastLoginAt || "").trim()
        });
    });

    if (!mergedUsers.some(user => user.email === DEFAULT_OWNER_USER.email)) {
        mergedUsers.unshift({ ...DEFAULT_OWNER_USER });
    }

    if (!mergedUsers.some(user => user.username === DEFAULT_ADMIN_USER.username)) {
        mergedUsers.unshift({ ...DEFAULT_ADMIN_USER });
    } else {
        const adminIndex = mergedUsers.findIndex(user => user.username === DEFAULT_ADMIN_USER.username);
        mergedUsers[adminIndex] = {
            ...mergedUsers[adminIndex],
            id: mergedUsers[adminIndex].id || DEFAULT_ADMIN_USER.id,
            displayName: mergedUsers[adminIndex].displayName || DEFAULT_ADMIN_USER.displayName,
            email: mergedUsers[adminIndex].email || DEFAULT_ADMIN_USER.email,
            password: mergedUsers[adminIndex].password || DEFAULT_ADMIN_USER.password,
            role: "admin",
            language: ["en", "es", "fr"].includes(mergedUsers[adminIndex].language) ? mergedUsers[adminIndex].language : "en",
            accessLevel: mergedUsers[adminIndex].accessLevel || DEFAULT_ADMIN_USER.accessLevel,
            parentUserId: "",
            lastLoginAt: mergedUsers[adminIndex].lastLoginAt || ""
        };
    }

    const ownerIndex = mergedUsers.findIndex(user => user.email === DEFAULT_OWNER_USER.email);
    if (ownerIndex >= 0) {
        mergedUsers[ownerIndex] = {
            ...mergedUsers[ownerIndex],
            id: mergedUsers[ownerIndex].id || DEFAULT_OWNER_USER.id,
            username: mergedUsers[ownerIndex].username || DEFAULT_OWNER_USER.username,
            displayName: mergedUsers[ownerIndex].displayName || DEFAULT_OWNER_USER.displayName,
            email: DEFAULT_OWNER_USER.email,
            password: mergedUsers[ownerIndex].password || DEFAULT_OWNER_USER.password,
            role: "owner",
            language: ["en", "es", "fr"].includes(mergedUsers[ownerIndex].language) ? mergedUsers[ownerIndex].language : "en",
            accessLevel: "owner",
            parentUserId: "",
            lastLoginAt: mergedUsers[ownerIndex].lastLoginAt || ""
        };
    }

    return mergedUsers;
}

function normalizeIssueReports(reports) {
    return Array.isArray(reports)
        ? reports
            .filter(report => report && typeof report === "object")
            .map(report => ({
                id: String(report.id || `issue-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                subject: String(report.subject || "").trim(),
                details: String(report.details || "").trim(),
                screenshotName: String(report.screenshotName || "").trim(),
                screenshotDataUrl: typeof report.screenshotDataUrl === "string" ? report.screenshotDataUrl : "",
                createdAt: String(report.createdAt || new Date().toISOString()),
                unread: report.unread !== false,
                status: report.status === "closed" ? "closed" : "open",
                adminNotes: String(report.adminNotes || "").trim(),
                createdBy: {
                    userId: String(report.createdBy?.userId || ""),
                    username: String(report.createdBy?.username || ""),
                    displayName: String(report.createdBy?.displayName || report.createdBy?.username || "Unknown")
                }
            }))
            .filter(report => report.subject && report.details)
        : [];
}

function normalizeCompanyProfile(profile) {
    return {
        companyName: String(profile?.companyName || DEFAULT_COMPANY_PROFILE.companyName).trim(),
        tagline: String(profile?.tagline || DEFAULT_COMPANY_PROFILE.tagline).trim(),
        address: String(profile?.address || DEFAULT_COMPANY_PROFILE.address).trim(),
        email: String(profile?.email || DEFAULT_COMPANY_PROFILE.email).trim(),
        phone: String(profile?.phone || DEFAULT_COMPANY_PROFILE.phone).trim(),
        website: String(profile?.website || DEFAULT_COMPANY_PROFILE.website).trim(),
        taxId: String(profile?.taxId || DEFAULT_COMPANY_PROFILE.taxId).trim(),
        signatureDataUrl: typeof profile?.signatureDataUrl === "string" ? profile.signatureDataUrl : "",
        stampDataUrl: typeof profile?.stampDataUrl === "string" ? profile.stampDataUrl : ""
    };
}

function normalizeSessionLogs(logs) {
    return Array.isArray(logs)
        ? logs
            .filter(log => log && typeof log === "object")
            .map(log => ({
                id: String(log.id || `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                userId: String(log.userId || ""),
                username: String(log.username || "").trim(),
                displayName: String(log.displayName || log.username || "Unknown").trim(),
                startedAt: String(log.startedAt || new Date().toISOString()),
                endedAt: String(log.endedAt || "").trim(),
                status: log.status === "closed" ? "closed" : "open",
                reason: String(log.reason || "").trim(),
                loginMethod: String(log.loginMethod || "local").trim()
            }))
        : [];
}

function normalizeActivityLogs(logs) {
    return Array.isArray(logs)
        ? logs
            .filter(log => log && typeof log === "object")
            .map(log => ({
                id: String(log.id || `activity-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                userId: String(log.userId || ""),
                username: String(log.username || "").trim(),
                displayName: String(log.displayName || log.username || "System").trim(),
                action: String(log.action || "updated workspace").trim(),
                details: String(log.details || "").trim(),
                createdAt: String(log.createdAt || new Date().toISOString())
            }))
        : [];
}

function normalizeSavedItems(items) {
    return Array.isArray(items)
        ? items
            .filter(item => item && typeof item === "object")
            .map(item => {
                const quantity = Number.parseFloat(item.quantity) || 0;
                const unitPrice = Number.parseFloat(item.unitPrice) || 0;
                const total = Number.parseFloat(item.total) || (quantity * unitPrice);
                return {
                    id: String(item.id || `saved-item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                    description: String(item.description || "").trim(),
                    quantity,
                    unitPrice,
                    total,
                    itemImageDataUrl: typeof item.itemImageDataUrl === "string" ? item.itemImageDataUrl : "",
                    createdAt: String(item.createdAt || new Date().toISOString())
                };
            })
            .filter(item => item.description)
        : [];
}

function normalizeCatalogItems(items) {
    return Array.isArray(items)
        ? items
            .filter(item => item && typeof item === "object")
            .map(item => ({
                id: String(item.id || `catalog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                name: String(item.name || "").trim(),
                details: String(item.details || "").trim(),
                notes: String(item.notes || "").trim(),
                price: Number.parseFloat(item.price) || 0,
                dateUpdated: String(item.dateUpdated || new Date().toISOString()),
                category: String(item.category || "").trim(),
                brand: String(item.brand || "").trim(),
                unitSize: String(item.unitSize || "").trim(),
                vendor: String(item.vendor || "").trim()
            }))
            .filter(item => item.name)
        : [];
}

function normalizeWorkspaceState(payload) {
    return {
        userAccounts: normalizeUserAccounts(payload?.userAccounts || []),
        issueReports: normalizeIssueReports(payload?.issueReports || []),
        companyProfile: normalizeCompanyProfile(payload?.companyProfile || DEFAULT_COMPANY_PROFILE),
        savedItems: normalizeSavedItems(payload?.savedItems || []),
        catalogItems: normalizeCatalogItems(payload?.catalogItems || []),
        sessionLogs: normalizeSessionLogs(payload?.sessionLogs || []),
        activityLogs: normalizeActivityLogs(payload?.activityLogs || [])
    };
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
    DEFAULT_COMPANY_PROFILE,
    getDefaultClients,
    normalizeClients,
    normalizeCompanyProfile,
    normalizeDocuments,
    normalizeIssueReports,
    normalizeCatalogItems,
    normalizeSavedItems,
    normalizeUserAccounts,
    normalizeWorkspaceState,
    readDataset,
    sendJson,
    writeDataset
};
