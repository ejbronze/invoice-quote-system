const fs = require("fs/promises");
const os = require("os");
const path = require("path");

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

const LOCAL_STORAGE_MODE = "local-sandbox";
const LOCAL_LEGACY_PDF_PROTOCOL = "local-legacy-pdf://";

function getBlobToken() {
    return process.env.BLOB_READ_WRITE_TOKEN;
}

function getBlobAccessMode() {
    return process.env.BLOB_ACCESS_MODE === "private" ? "private" : "public";
}

function isLocalSandboxMode() {
    return String(process.env.DATA_STORAGE_MODE || "").trim().toLowerCase() === LOCAL_STORAGE_MODE;
}

function shouldSeedLocalDataFromBlob() {
    return ["1", "true", "yes", "on"].includes(String(process.env.LOCAL_SEED_FROM_BLOB || "").trim().toLowerCase());
}

function getLocalDataDir() {
    const configuredDir = String(process.env.LOCAL_DATA_DIR || "").trim();
    return configuredDir || path.join(os.tmpdir(), "santosync-local-data");
}

function getDatasetFilePath(name) {
    return path.join(getLocalDataDir(), "datasets", `${name}.json`);
}

function getDatasetSnapshotFilePath(name, stamp) {
    return path.join(getLocalDataDir(), "backups", name, `${stamp}.json`);
}

function getLegacyPdfDirectory() {
    return path.join(getLocalDataDir(), "legacy-pdfs");
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
            consigneeAddress: client?.consigneeAddress || "",
            contacts: Array.isArray(client?.contacts) ? client.contacts : [],
            logoDataUrl: typeof client?.logoDataUrl === "string" ? client.logoDataUrl : ""
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

function normalizeSignature(sig) {
    return {
        id: String(sig?.id || `sig-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        signerName: String(sig?.signerName || "").trim(),
        signerTitle: String(sig?.signerTitle || "").trim(),
        signatureImage: typeof sig?.signatureImage === "string" ? sig.signatureImage : "",
        isDefault: Boolean(sig?.isDefault),
        createdAt: String(sig?.createdAt || new Date().toISOString()),
        updatedAt: String(sig?.updatedAt || new Date().toISOString())
    };
}

function normalizeSignatures(sigs) {
    if (!Array.isArray(sigs)) return [];
    return sigs.filter(s => s && typeof s === "object").map(normalizeSignature);
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
        stampDataUrl: typeof profile?.stampDataUrl === "string" ? profile.stampDataUrl : "",
        signatures: normalizeSignatures(profile?.signatures)
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

function normalizeCatalogItems(items) {
    return Array.isArray(items)
        ? items
            .filter(item => item && typeof item === "object")
            .map(item => ({
                id: String(item.id || `catalog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                referenceId: String(item.referenceId || item.internalReferenceId || "").trim(),
                itemNumber: String(item.itemNumber || "").trim(),
                clientItemCode: String(item.clientItemCode || "").trim(),
                name: String(item.name || "").trim(),
                details: String(item.details || "").trim(),
                notes: String(item.notes || "").trim(),
                costPrice: Number.parseFloat(item.costPrice) || 0,
                price: Number.parseFloat(item.price ?? item.sellPrice) || 0,
                sellPrice: Number.parseFloat(item.sellPrice ?? item.price) || 0,
                currency: String(item.currency || "USD").trim() || "USD",
                taxIncluded: Boolean(item.taxIncluded),
                dateUpdated: String(item.dateUpdated || new Date().toISOString()),
                category: String(item.category || "").trim(),
                brand: String(item.brand || "").trim(),
                unitSize: String(item.unitSize || item.packSize || "").trim(),
                packSize: String(item.packSize || item.unitSize || "").trim(),
                unit: String(item.unit || item.unitOfMeasure || "").trim(),
                vendor: String(item.vendor || item.supplier || "").trim(),
                supplier: String(item.supplier || item.vendor || "").trim(),
                leadTime: String(item.leadTime || "").trim(),
                country: String(item.country || item.sourceCountry || item.source || "").trim(),
                tags: Array.isArray(item.tags)
                    ? item.tags.map(tag => String(tag || "").trim()).filter(Boolean)
                    : String(item.tags || "").split(",").map(tag => tag.trim()).filter(Boolean),
                archived: Boolean(item.archived),
                documentRefs: Array.isArray(item.documentRefs)
                    ? item.documentRefs.filter(r => r && r.docId)
                    : [],
                itemImageDataUrl: typeof item.itemImageDataUrl === "string"
                    ? item.itemImageDataUrl
                    : typeof item.imageDataUrl === "string"
                        ? item.imageDataUrl
                        : ""
            }))
            .filter(item => item.name)
        : [];
}

function makeCatalogDocumentRef(doc) {
    if (!doc) {
        return null;
    }

    return {
        docId: String(doc.id || ""),
        docRefNumber: String(doc.refNumber || ""),
        docType: String(doc.type || "document"),
        date: String(doc.date || ""),
        clientName: String(doc.clientName || "")
    };
}

function mergeCatalogDocumentRefs(existingRefs, nextRef) {
    const refs = Array.isArray(existingRefs) ? [...existingRefs] : [];
    if (!nextRef || !nextRef.docId) {
        return refs;
    }

    const existingIndex = refs.findIndex(ref => String(ref.docId) === nextRef.docId);
    if (existingIndex >= 0) {
        refs[existingIndex] = { ...refs[existingIndex], ...nextRef };
    } else {
        refs.push(nextRef);
    }

    return refs.sort((left, right) => String(right.date || "").localeCompare(String(left.date || "")));
}

function getCatalogRecoveryRowsFromDocument(doc) {
    const ref = makeCatalogDocumentRef(doc);
    const rows = doc?.type === "procurement"
        ? (doc.procurementItems || []).map(row => ({
            name: row.description,
            brand: row.brand,
            packSize: row.packSize,
            unit: row.unit,
            unitPrice: Number.parseFloat(row.unitPrice) || 0,
            currency: row.currency || doc.currency || "USD",
            leadTime: row.leadTime,
            supplier: row.supplier,
            notes: row.notes,
            itemImageDataUrl: row.itemImageDataUrl || "",
            docDate: doc.date || doc.printedAt || "",
            ref
        }))
        : (doc.items || []).map(row => ({
            name: row.description,
            unitPrice: Number.parseFloat(row.unitPrice ?? row.price) || 0,
            currency: doc.currency || "USD",
            itemImageDataUrl: row.itemImageDataUrl || row.imageDataUrl || "",
            docDate: doc.date || doc.printedAt || "",
            ref
        }));

    return rows.filter(row => String(row.name || "").trim());
}

function recoverCatalogItemsFromDocuments(documents) {
    const catalogByName = new Map();

    normalizeDocuments(documents)
        .filter(doc => doc && typeof doc === "object")
        .forEach(doc => {
            getCatalogRecoveryRowsFromDocument(doc).forEach(row => {
                const name = String(row.name || "").trim();
                const key = name.toLowerCase().replace(/\s+/g, " ");
                const existing = catalogByName.get(key);
                const docDate = String(row.docDate || new Date().toISOString());
                const nextItem = existing || {
                    id: `catalog-recovered-${catalogByName.size + 1}-${Math.random().toString(36).slice(2, 8)}`,
                    referenceId: `PLI-${String(catalogByName.size + 1).padStart(4, "0")}`,
                    name,
                    details: String(row.notes || "").trim(),
                    notes: "",
                    costPrice: 0,
                    price: 0,
                    sellPrice: 0,
                    currency: row.currency || "USD",
                    taxIncluded: false,
                    dateUpdated: docDate || new Date().toISOString(),
                    category: "",
                    brand: "",
                    unitSize: "",
                    packSize: "",
                    unit: "",
                    vendor: "",
                    supplier: "",
                    leadTime: "",
                    country: "",
                    tags: [],
                    archived: false,
                    documentRefs: [],
                    itemImageDataUrl: ""
                };
                const unitPrice = Number.parseFloat(row.unitPrice) || 0;

                catalogByName.set(key, {
                    ...nextItem,
                    ...(unitPrice > 0 ? { price: unitPrice, sellPrice: unitPrice } : {}),
                    ...(row.currency ? { currency: row.currency } : {}),
                    ...(row.brand ? { brand: String(row.brand).trim() } : {}),
                    ...(row.packSize ? {
                        packSize: String(row.packSize).trim(),
                        unitSize: String(row.packSize).trim()
                    } : {}),
                    ...(row.unit ? { unit: String(row.unit).trim() } : {}),
                    ...(row.supplier ? {
                        supplier: String(row.supplier).trim(),
                        vendor: String(row.supplier).trim()
                    } : {}),
                    ...(row.leadTime ? { leadTime: String(row.leadTime).trim() } : {}),
                    ...(row.itemImageDataUrl && !nextItem.itemImageDataUrl ? { itemImageDataUrl: row.itemImageDataUrl } : {}),
                    documentRefs: mergeCatalogDocumentRefs(nextItem.documentRefs, row.ref),
                    dateUpdated: String(docDate || "").localeCompare(String(nextItem.dateUpdated || "")) > 0
                        ? docDate
                        : (nextItem.dateUpdated || docDate || new Date().toISOString())
                });
            });
        });

    return normalizeCatalogItems([...catalogByName.values()]);
}

function normalizeStatementExports(items) {
    return Array.isArray(items)
        ? items
            .filter(item => item && typeof item === "object")
            .map(item => ({
                id: String(item.id || `statement-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                title: String(item.title || "Statement of Account").trim(),
                clientName: String(item.clientName || "Unknown client").trim(),
                generatedAt: String(item.generatedAt || new Date().toISOString()),
                rowCount: Number.parseInt(item.rowCount, 10) || 0,
                totalSelectedFormatted: String(item.totalSelectedFormatted || "").trim(),
                totalOutstandingFormatted: String(item.totalOutstandingFormatted || "").trim(),
                versionHistory: Array.isArray(item.versionHistory)
                    ? item.versionHistory
                        .filter(entry => entry && typeof entry === "object" && entry.payload && typeof entry.payload === "object")
                        .map((entry, index) => ({
                            id: String(entry.id || `statement-version-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`),
                            createdAt: String(entry.createdAt || new Date().toISOString()),
                            reason: String(entry.reason || "Date update").trim() || "Date update",
                            statementDateInput: String(entry.statementDateInput || entry.payload.statementDateInput || entry.payload.generatedIsoDate || "").slice(0, 10),
                            signatureDateInput: String(entry.signatureDateInput || entry.payload.signatureDateInput || entry.payload.generatedIsoDate || "").slice(0, 10),
                            payload: entry.payload
                        }))
                    : [],
                payload: item.payload && typeof item.payload === "object" ? item.payload : null
            }))
            .filter(item => item.payload)
        : [];
}

function normalizeWorkspaceState(payload) {
    return {
        userAccounts: normalizeUserAccounts(payload?.userAccounts || []),
        issueReports: normalizeIssueReports(payload?.issueReports || []),
        companyProfile: normalizeCompanyProfile(payload?.companyProfile || DEFAULT_COMPANY_PROFILE),
        catalogItems: normalizeCatalogItems(payload?.catalogItems || []),
        statementExports: normalizeStatementExports(payload?.statementExports || []),
        sessionLogs: normalizeSessionLogs(payload?.sessionLogs || []),
        activityLogs: normalizeActivityLogs(payload?.activityLogs || [])
    };
}

async function loadBlobSdk() {
    return import("@vercel/blob");
}

async function readBlobDataset(name, fallbackValue) {
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

async function ensureLocalDirectory(filePath) {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function readLocalJsonFile(filePath) {
    try {
        const rawValue = await fs.readFile(filePath, "utf8");
        return JSON.parse(rawValue);
    } catch (error) {
        if (error && error.code === "ENOENT") {
            return undefined;
        }

        throw error;
    }
}

async function writeLocalJsonFile(filePath, value) {
    await ensureLocalDirectory(filePath);
    await fs.writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

function createSnapshotStamp() {
    return new Date().toISOString().replace(/[:.]/g, "-");
}

async function readLocalDataset(name, fallbackValue) {
    const filePath = getDatasetFilePath(name);
    const existingValue = await readLocalJsonFile(filePath);
    if (existingValue !== undefined) {
        return existingValue;
    }

    let seededValue = fallbackValue;

    if (shouldSeedLocalDataFromBlob() && getBlobToken()) {
        try {
            seededValue = await readBlobDataset(name, fallbackValue);
        } catch (error) {
            seededValue = fallbackValue;
        }
    }

    await writeLocalJsonFile(filePath, seededValue);
    return seededValue;
}

async function readDataset(name, fallbackValue) {
    if (isLocalSandboxMode()) {
        return readLocalDataset(name, fallbackValue);
    }

    return readBlobDataset(name, fallbackValue);
}

async function writeBlobDataset(name, value) {
    ensureBlobToken();
    const { put } = await loadBlobSdk();
    const token = getBlobToken();
    const snapshotStamp = createSnapshotStamp();

    // Keep a stable "current" object for live reads and a timestamped copy for recovery.
    const blobPath = `todos-logistics/${name}/current.json`;

    const serializedValue = JSON.stringify(value);

    const newBlob = await put(blobPath, serializedValue, {
        token,
        access: getBlobAccessMode(),
        contentType: "application/json",
        addRandomSuffix: false
    });

    await put(`todos-logistics-backups/${name}/${snapshotStamp}.json`, serializedValue, {
        token,
        access: getBlobAccessMode(),
        contentType: "application/json",
        addRandomSuffix: false
    });

    return newBlob;
}

async function writeDataset(name, value) {
    if (isLocalSandboxMode()) {
        const snapshotStamp = createSnapshotStamp();
        await writeLocalJsonFile(getDatasetFilePath(name), value);
        await writeLocalJsonFile(getDatasetSnapshotFilePath(name, snapshotStamp), value);
        return { url: getDatasetFilePath(name) };
    }

    return writeBlobDataset(name, value);
}

function sanitizeFilename(filename) {
    return String(filename || "legacy-upload.pdf")
        .replace(/[^a-z0-9._-]+/gi, "-")
        .replace(/-+/g, "-");
}

function decodeFileBuffer(fileData) {
    const value = String(fileData || "");
    const base64 = value.includes(",") ? value.split(",")[1] : value;
    return Buffer.from(base64, "base64");
}

async function storeLegacyPdfLocally(filename, fileData) {
    const safeFilename = sanitizeFilename(filename);
    const storedFilename = `${Date.now()}-${safeFilename}`;
    const filePath = path.join(getLegacyPdfDirectory(), storedFilename);

    await ensureLocalDirectory(filePath);
    await fs.writeFile(filePath, decodeFileBuffer(fileData));

    return {
        fileUrl: `${LOCAL_LEGACY_PDF_PROTOCOL}${storedFilename}`,
        filename: safeFilename
    };
}

async function storeLegacyPdf(filename, mimeType, fileData) {
    if (mimeType !== "application/pdf") {
        const error = new Error("Legacy upload supports PDF files only.");
        error.statusCode = 400;
        throw error;
    }

    if (isLocalSandboxMode()) {
        return storeLegacyPdfLocally(filename, fileData);
    }

    ensureBlobToken();
    const { put } = await loadBlobSdk();
    const safeFilename = sanitizeFilename(filename);
    const blob = await put(`todos-logistics/legacy-pdfs/${Date.now()}-${safeFilename}`, decodeFileBuffer(fileData), {
        token: getBlobToken(),
        access: getBlobAccessMode(),
        contentType: "application/pdf",
        addRandomSuffix: false
    });

    return {
        fileUrl: blob.url,
        filename: safeFilename
    };
}

async function readLegacyPdfBuffer(fileUrl) {
    if (String(fileUrl || "").startsWith(LOCAL_LEGACY_PDF_PROTOCOL)) {
        const storedFilename = String(fileUrl).slice(LOCAL_LEGACY_PDF_PROTOCOL.length);
        const filePath = path.join(getLegacyPdfDirectory(), storedFilename);

        try {
            return await fs.readFile(filePath);
        } catch (error) {
            if (error && error.code === "ENOENT") {
                const notFoundError = new Error("Legacy PDF could not be opened.");
                notFoundError.statusCode = 404;
                throw notFoundError;
            }

            throw error;
        }
    }

    const token = getBlobToken();
    if (!token) {
        const error = new Error("BLOB_READ_WRITE_TOKEN is not configured.");
        error.statusCode = 500;
        throw error;
    }

    const { get } = await loadBlobSdk();
    const blobResponse = await get(fileUrl, { token });
    if (!blobResponse || !blobResponse.body) {
        const error = new Error("Legacy PDF could not be opened.");
        error.statusCode = 404;
        throw error;
    }

    const arrayBuffer = await new Response(blobResponse.body).arrayBuffer();
    return Buffer.from(arrayBuffer);
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
    recoverCatalogItemsFromDocuments,
    normalizeStatementExports,
    normalizeUserAccounts,
    normalizeWorkspaceState,
    readLegacyPdfBuffer,
    readDataset,
    sendJson,
    storeLegacyPdf,
    writeDataset
};
