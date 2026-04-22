// Demo / marketing seed data for SantoSync.
// All companies, names, and amounts are fictional.
// Safe to use for screenshots, videos, and landing page marketing.

export const DEMO_CLIENTS = [
    {
        id: "ccxpress",
        name: "Caribbean Cargo Express Co.",
        address: "42 Terminal Road, Port au Prince, Haiti",
        consigneeName: "Jean-Marc Dominique",
        consigneeAddress: "Caribbean Cargo — Receiving Dock A, Port au Prince"
    },
    {
        id: "demo-gulf-catering",
        name: "Gulf Catering Company",
        address: "12 Wrightson Road, Port of Spain, Trinidad and Tobago",
        consigneeName: "Marcus Phillip",
        consigneeAddress: "Gulf Catering — Receiving Gate 3, Port of Spain"
    },
    {
        id: "demo-allied-procurement",
        name: "Allied Procurement Ltd",
        address: "Av. Winston Churchill 1099, Santo Domingo, Dominican Republic",
        consigneeName: "Sofia Fernandez",
        consigneeAddress: "Allied Procurement — Warehouse Zone B, Santo Domingo"
    },
    {
        id: "demo-ccs-express",
        name: "CCS Express Logistics",
        address: "7200 NW 19th Street, Suite 210, Miami, FL 33126",
        consigneeName: "Derek Halloran",
        consigneeAddress: "CCS Express — Freight Terminal 4, Miami"
    },
    {
        id: "demo-caribbean-food",
        name: "Caribbean Food Distributors",
        address: "Harbour Road Industrial Estate, Bridgetown, Barbados",
        consigneeName: "Natalie Clarke",
        consigneeAddress: "CFD Receiving Dock, Harbour Road, Bridgetown"
    },
    {
        id: "demo-pap-supply",
        name: "Port au Prince Supply Co.",
        address: "Route Nationale 1, Zone Industrielle, Port au Prince, Haiti",
        consigneeName: "Jean-Louis Beaumont",
        consigneeAddress: "PAP Supply — Depot Industriel, Port au Prince"
    }
];

const CREATED_BY_OWNER = {
    userId: "owner-root",
    username: "erjaquez",
    displayName: "Edwin Jaquez",
    role: "owner"
};

function item(description, quantity, unitPrice) {
    return {
        description,
        quantity,
        price: unitPrice,
        unitPrice,
        totalPrice: Math.round(quantity * unitPrice * 100) / 100,
        internalCost: 0,
        upchargePercent: 0,
        itemImageDataUrl: "",
        manualUnitPrice: false
    };
}

function calcTotal(items) {
    return Math.round(items.reduce((sum, i) => sum + i.totalPrice, 0) * 100) / 100;
}

// ─── QUOTES ───────────────────────────────────────────────────────────────────

const q1Items = [
    item("Food service cling film, 450m roll", 24, 45.00),
    item("Commercial kitchen gloves, heavy duty", 8, 32.00),
    item("Stainless steel food trays, full-size", 24, 18.50),
    item("Plastic pallet wrap, 500m stretch film", 12, 28.00),
    item("Empty carton boxes, food-grade flat-pack", 80, 1.60),
    item("Consolidated freight handling fee", 1, 596.00)
];

const q2Items = [
    item("Plastic pallet wrap, 500m stretch film", 18, 28.00),
    item("Packaging tape, heavy duty 50m", 36, 8.50),
    item("Empty carton boxes, flat-pack double wall", 100, 2.20),
    item("Bubble wrap roll, 50m × 100cm", 10, 25.00)
];

const q3Items = [
    item("Warehouse to warehouse transportation, 2 FCL", 1, 2800.00),
    item("Consolidated freight handling fee", 1, 1200.00),
    item("Palletizing and wrapping service", 40, 32.00),
    item("Cold storage surcharge", 7, 160.00)
];

const q4Items = [
    item("Dining chairs, commercial-grade stackable", 30, 68.00),
    item("Commercial kitchen prep table, stainless steel", 4, 185.00),
    item("Industrial food wrap dispensers", 6, 48.00),
    item("Warehouse delivery surcharge — port area", 1, 432.00),
    item("Freight surcharge, island delivery", 1, 650.00)
];

const q5Items = [
    item("Empty carton boxes, corrugated double wall", 100, 2.20),
    item("Plastic pallet wrap, 500m stretch film", 8, 28.00),
    item("Food service cling film, 450m roll", 6, 45.00),
    item("Warehouse to warehouse transportation", 1, 936.00)
];

// ─── INVOICES ─────────────────────────────────────────────────────────────────

// INV1 — Gulf Catering — $2,480 — PAID
const inv1Items = [
    item("Food service cling film, 450m roll", 18, 45.00),
    item("Commercial kitchen gloves, heavy duty", 6, 32.00),
    item("Stainless steel food trays, half-size", 36, 14.50),
    item("Plastic pallet wrap, 500m stretch film", 10, 28.00),
    item("Consolidated freight handling fee", 1, 676.00)
];

// INV2 — CCS Express — $5,200 — PAID
const inv2Items = [
    item("Warehouse to warehouse transportation, 1 FCL", 1, 2400.00),
    item("Consolidated freight handling fee", 1, 1000.00),
    item("Palletizing and wrapping service", 25, 32.00),
    item("Cold storage surcharge", 5, 160.00),
    item("Port fees and delivery note documentation", 1, 200.00)
];

// INV3 — Allied Procurement — $1,280 — PARTIAL ($600 paid)
const inv3Items = [
    item("Plastic pallet wrap, 500m stretch film", 18, 28.00),
    item("Packaging tape, heavy duty 50m", 36, 8.50),
    item("Empty carton boxes, flat-pack double wall", 100, 2.20),
    item("Bubble wrap roll, 50m × 100cm", 10, 25.00)
];

// INV4 — Caribbean Food Distributors — $3,900 — UNPAID
const inv4Items = [
    item("Dining chairs, commercial-grade stackable", 24, 68.00),
    item("Commercial kitchen prep table, stainless steel", 3, 185.00),
    item("Industrial food wrap dispensers", 5, 48.00),
    item("Freight surcharge, island delivery", 1, 873.00),
    item("Customs documentation handling", 2, 300.00)
];

// INV5 — Port au Prince Supply Co. — $1,650 — UNPAID
const inv5Items = [
    item("Empty carton boxes, corrugated double wall", 100, 2.20),
    item("Plastic pallet wrap, 500m stretch film", 8, 28.00),
    item("Food service cling film, 450m roll", 6, 45.00),
    item("Warehouse to warehouse transportation", 1, 936.00)
];

// INV6 — Gulf Catering — $3,200 — PAID
const inv6Items = [
    item("Dining chairs, commercial-grade stackable", 40, 68.00),
    item("Commercial table protectors, vinyl wrap", 10, 24.00),
    item("Delivery and placement service", 1, 240.00)
];

// INV7 — CCS Express — $4,800 — UNPAID (overdue, NET 7, issued Apr 10, due Apr 17)
const inv7Items = [
    item("Warehouse to warehouse transportation, 2 LCL", 1, 2600.00),
    item("Consolidated freight handling fee", 1, 800.00),
    item("Palletizing and wrapping service", 30, 32.00),
    item("Port area delivery surcharge", 1, 440.00)
];

// INV8 — Allied Procurement — $960 — PENDING
const inv8Items = [
    item("Empty carton boxes, flat-pack double wall", 200, 2.20),
    item("Packaging tape, heavy duty 50m", 48, 8.50),
    item("Stretch film dispenser, ergonomic handle", 4, 28.00)
];

export const DEMO_DOCUMENTS = [

    // ── QUOTES ──────────────────────────────────────────────────────────────

    {
        id: "demo-q-001",
        type: "quote",
        status: "logged",
        refNumber: "TL-2026-0228-01",
        date: "2026-02-28",
        clientName: "Gulf Catering Company",
        clientAddress: "12 Wrightson Road, Port of Spain, Trinidad and Tobago",
        consigneeName: "",
        consigneeAddress: "",
        poNumber: "",
        tags: ["food-service", "catering"],
        notes: "Prices valid for 30 days from quote date. Customs handling not included.",
        internalNotes: "",
        paymentTerms: "Net 30 Days — Payment due within 30 days of invoice date.",
        paymentTermsMode: "net30",
        paymentTermsDays: 30,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "2026-02-28T14:22:00.000Z",
        items: q1Items,
        subtotal: calcTotal(q1Items),
        total: calcTotal(q1Items),
        payments: [],
        paymentStatus: null
    },
    {
        id: "demo-q-002",
        type: "quote",
        status: "logged",
        refNumber: "TL-2026-0310-01",
        date: "2026-03-10",
        clientName: "Allied Procurement Ltd",
        clientAddress: "Av. Winston Churchill 1099, Santo Domingo, Dominican Republic",
        consigneeName: "",
        consigneeAddress: "",
        poNumber: "",
        tags: ["packaging"],
        notes: "Pricing based on current supplier rates. Volume discounts available on orders over 500 units.",
        internalNotes: "",
        paymentTerms: "Net 30 Days — Payment due within 30 days of invoice date.",
        paymentTermsMode: "net30",
        paymentTermsDays: 30,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "2026-03-10T09:45:00.000Z",
        items: q2Items,
        subtotal: calcTotal(q2Items),
        total: calcTotal(q2Items),
        payments: [],
        paymentStatus: null
    },
    {
        id: "demo-q-003",
        type: "quote",
        status: "logged",
        refNumber: "TL-2026-0320-01",
        date: "2026-03-20",
        clientName: "CCS Express Logistics",
        clientAddress: "7200 NW 19th Street, Suite 210, Miami, FL 33126",
        consigneeName: "Derek Halloran",
        consigneeAddress: "CCS Express — Freight Terminal 4, Miami",
        poNumber: "PO-CCS-2026-088",
        tags: ["freight", "logistics", "cold-storage"],
        notes: "Transportation quote covers door-to-door delivery within agreed corridor. Cold storage availability subject to confirmation. Customs duties and taxes are excluded.",
        internalNotes: "",
        paymentTerms: "Net 15 Days — Payment due within 15 days of invoice date.",
        paymentTermsMode: "net15",
        paymentTermsDays: 15,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "2026-03-20T11:10:00.000Z",
        items: q3Items,
        subtotal: calcTotal(q3Items),
        total: calcTotal(q3Items),
        payments: [],
        paymentStatus: null
    },
    {
        id: "demo-q-004",
        type: "quote",
        status: "draft",
        refNumber: "TL-2026-0402-01",
        date: "2026-04-02",
        clientName: "Caribbean Food Distributors",
        clientAddress: "Harbour Road Industrial Estate, Bridgetown, Barbados",
        consigneeName: "Natalie Clarke",
        consigneeAddress: "CFD Receiving Dock, Harbour Road, Bridgetown",
        poNumber: "",
        tags: ["kitchen-equipment", "furniture"],
        notes: "Customs handling fees are excluded from this quote and will be the responsibility of the consignee. Final delivery window subject to scheduling confirmation.",
        internalNotes: "",
        paymentTerms: "Net 30 Days — Payment due within 30 days of invoice date.",
        paymentTermsMode: "net30",
        paymentTermsDays: 30,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "",
        items: q4Items,
        subtotal: calcTotal(q4Items),
        total: calcTotal(q4Items),
        payments: [],
        paymentStatus: null
    },
    {
        id: "demo-q-005",
        type: "quote",
        status: "draft",
        refNumber: "TL-2026-0415-01",
        date: "2026-04-15",
        clientName: "Port au Prince Supply Co.",
        clientAddress: "Route Nationale 1, Zone Industrielle, Port au Prince, Haiti",
        consigneeName: "Jean-Louis Beaumont",
        consigneeAddress: "PAP Supply — Depot Industriel, Port au Prince",
        poNumber: "",
        tags: ["mixed-goods"],
        notes: "Mixed goods shipment. Subject to port availability and scheduling. Pricing valid for 15 days.",
        internalNotes: "",
        paymentTerms: "Net 30 Days — Payment due within 30 days of invoice date.",
        paymentTermsMode: "net30",
        paymentTermsDays: 30,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "",
        items: q5Items,
        subtotal: calcTotal(q5Items),
        total: calcTotal(q5Items),
        payments: [],
        paymentStatus: null
    },

    // ── INVOICES ─────────────────────────────────────────────────────────────

    {
        id: "demo-inv-001",
        type: "invoice",
        status: "logged",
        refNumber: "TL-2026-0215-01",
        date: "2026-02-15",
        clientName: "Gulf Catering Company",
        clientAddress: "12 Wrightson Road, Port of Spain, Trinidad and Tobago",
        consigneeName: "Marcus Phillip",
        consigneeAddress: "Gulf Catering — Receiving Gate 3, Port of Spain",
        poNumber: "PO-GCC-2026-014",
        tags: ["food-service", "catering"],
        notes: "Thank you for your business. Please include invoice number on all remittances.",
        internalNotes: "",
        paymentTerms: "Net 30 Days — Payment due within 30 days of invoice date.",
        paymentTermsMode: "net30",
        paymentTermsDays: 30,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "2026-02-15T10:00:00.000Z",
        items: inv1Items,
        subtotal: calcTotal(inv1Items),
        total: calcTotal(inv1Items),
        paymentStatus: "paid",
        payments: [
            {
                id: "demo-pay-001",
                date: "2026-03-05",
                amount: calcTotal(inv1Items),
                method: "Bank Transfer",
                reference: "BT-GCC-20260305",
                notes: "Full payment received.",
                appliedTo: "invoice",
                createdAt: "2026-03-05T11:30:00.000Z"
            }
        ]
    },
    {
        id: "demo-inv-002",
        type: "invoice",
        status: "logged",
        refNumber: "TL-2026-0301-01",
        date: "2026-03-01",
        clientName: "CCS Express Logistics",
        clientAddress: "7200 NW 19th Street, Suite 210, Miami, FL 33126",
        consigneeName: "Derek Halloran",
        consigneeAddress: "CCS Express — Freight Terminal 4, Miami",
        poNumber: "PO-CCS-2026-088",
        tags: ["freight", "logistics", "cold-storage"],
        notes: "Payment via wire transfer. Banking details on file. Reference invoice number on all transfers.",
        internalNotes: "",
        paymentTerms: "Net 15 Days — Payment due within 15 days of invoice date.",
        paymentTermsMode: "net15",
        paymentTermsDays: 15,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "2026-03-01T09:00:00.000Z",
        items: inv2Items,
        subtotal: calcTotal(inv2Items),
        total: calcTotal(inv2Items),
        paymentStatus: "paid",
        payments: [
            {
                id: "demo-pay-002",
                date: "2026-03-20",
                amount: calcTotal(inv2Items),
                method: "Wire Transfer",
                reference: "WT-CCS-20260320",
                notes: "Full payment received via wire.",
                appliedTo: "invoice",
                createdAt: "2026-03-20T14:15:00.000Z"
            }
        ]
    },
    {
        id: "demo-inv-003",
        type: "invoice",
        status: "logged",
        refNumber: "TL-2026-0318-01",
        date: "2026-03-18",
        clientName: "Allied Procurement Ltd",
        clientAddress: "Av. Winston Churchill 1099, Santo Domingo, Dominican Republic",
        consigneeName: "Sofia Fernandez",
        consigneeAddress: "Allied Procurement — Warehouse Zone B, Santo Domingo",
        poNumber: "PO-APL-2026-031",
        tags: ["packaging"],
        notes: "Balance of $680.00 remains outstanding. Please remit remaining payment at your earliest convenience.",
        internalNotes: "",
        paymentTerms: "Net 30 Days — Payment due within 30 days of invoice date.",
        paymentTermsMode: "net30",
        paymentTermsDays: 30,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "2026-03-18T10:30:00.000Z",
        items: inv3Items,
        subtotal: calcTotal(inv3Items),
        total: calcTotal(inv3Items),
        paymentStatus: "pending",
        payments: [
            {
                id: "demo-pay-003",
                date: "2026-04-05",
                amount: 600.00,
                method: "Check",
                reference: "CHK-APL-20260405",
                notes: "Partial payment — check no. 2204.",
                appliedTo: "invoice",
                createdAt: "2026-04-05T09:00:00.000Z"
            }
        ]
    },
    {
        id: "demo-inv-004",
        type: "invoice",
        status: "logged",
        refNumber: "TL-2026-0328-01",
        date: "2026-03-28",
        clientName: "Caribbean Food Distributors",
        clientAddress: "Harbour Road Industrial Estate, Bridgetown, Barbados",
        consigneeName: "Natalie Clarke",
        consigneeAddress: "CFD Receiving Dock, Harbour Road, Bridgetown",
        poNumber: "PO-CFD-2026-055",
        tags: ["kitchen-equipment", "furniture"],
        notes: "Customs documentation included at two sets. All duties and taxes remain the responsibility of the consignee. Payment due by April 27, 2026.",
        internalNotes: "",
        paymentTerms: "Net 30 Days — Payment due within 30 days of invoice date.",
        paymentTermsMode: "net30",
        paymentTermsDays: 30,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "2026-03-28T13:00:00.000Z",
        items: inv4Items,
        subtotal: calcTotal(inv4Items),
        total: calcTotal(inv4Items),
        paymentStatus: "unpaid",
        payments: []
    },
    {
        id: "demo-inv-005",
        type: "invoice",
        status: "logged",
        refNumber: "TL-2026-0405-01",
        date: "2026-04-05",
        clientName: "Port au Prince Supply Co.",
        clientAddress: "Route Nationale 1, Zone Industrielle, Port au Prince, Haiti",
        consigneeName: "Jean-Louis Beaumont",
        consigneeAddress: "PAP Supply — Depot Industriel, Port au Prince",
        poNumber: "",
        tags: ["mixed-goods"],
        notes: "Mixed goods as per purchase agreement. Payment due by May 5, 2026.",
        internalNotes: "",
        paymentTerms: "Net 30 Days — Payment due within 30 days of invoice date.",
        paymentTermsMode: "net30",
        paymentTermsDays: 30,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "2026-04-05T10:00:00.000Z",
        items: inv5Items,
        subtotal: calcTotal(inv5Items),
        total: calcTotal(inv5Items),
        paymentStatus: "unpaid",
        payments: []
    },
    {
        id: "demo-inv-006",
        type: "invoice",
        status: "logged",
        refNumber: "TL-2026-0408-01",
        date: "2026-04-08",
        clientName: "Gulf Catering Company",
        clientAddress: "12 Wrightson Road, Port of Spain, Trinidad and Tobago",
        consigneeName: "Marcus Phillip",
        consigneeAddress: "Gulf Catering — Receiving Gate 3, Port of Spain",
        poNumber: "PO-GCC-2026-022",
        tags: ["furniture", "delivery"],
        notes: "40 units delivered and placed as confirmed by receiving team. Thank you for your continued business.",
        internalNotes: "",
        paymentTerms: "Net 15 Days — Payment due within 15 days of invoice date.",
        paymentTermsMode: "net15",
        paymentTermsDays: 15,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "2026-04-08T09:30:00.000Z",
        items: inv6Items,
        subtotal: calcTotal(inv6Items),
        total: calcTotal(inv6Items),
        paymentStatus: "paid",
        payments: [
            {
                id: "demo-pay-004",
                date: "2026-04-12",
                amount: calcTotal(inv6Items),
                method: "Bank Transfer",
                reference: "BT-GCC-20260412",
                notes: "Full payment received.",
                appliedTo: "invoice",
                createdAt: "2026-04-12T10:45:00.000Z"
            }
        ]
    },
    {
        id: "demo-inv-007",
        type: "invoice",
        status: "logged",
        refNumber: "TL-2026-0410-01",
        date: "2026-04-10",
        clientName: "CCS Express Logistics",
        clientAddress: "7200 NW 19th Street, Suite 210, Miami, FL 33126",
        consigneeName: "Derek Halloran",
        consigneeAddress: "CCS Express — Freight Terminal 4, Miami",
        poNumber: "PO-CCS-2026-102",
        tags: ["freight", "logistics"],
        notes: "Payment was due April 17, 2026. This invoice is now past due. Please remit immediately or contact us to arrange settlement.",
        internalNotes: "",
        paymentTerms: "Net 7 Days — Payment due within 7 days of invoice date.",
        paymentTermsMode: "other",
        paymentTermsDays: 7,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "2026-04-10T08:00:00.000Z",
        items: inv7Items,
        subtotal: calcTotal(inv7Items),
        total: calcTotal(inv7Items),
        paymentStatus: "unpaid",
        payments: []
    },
    {
        id: "demo-inv-008",
        type: "invoice",
        status: "logged",
        refNumber: "TL-2026-0418-01",
        date: "2026-04-18",
        clientName: "Allied Procurement Ltd",
        clientAddress: "Av. Winston Churchill 1099, Santo Domingo, Dominican Republic",
        consigneeName: "Sofia Fernandez",
        consigneeAddress: "Allied Procurement — Warehouse Zone B, Santo Domingo",
        poNumber: "PO-APL-2026-047",
        tags: ["packaging", "bulk"],
        notes: "Bulk carton packaging order. Payment acknowledged — pending confirmation of receipt.",
        internalNotes: "",
        paymentTerms: "Net 15 Days — Payment due within 15 days of invoice date.",
        paymentTermsMode: "net15",
        paymentTermsDays: 15,
        includeSignature: false,
        includeStamp: false,
        createdBy: CREATED_BY_OWNER,
        printedAt: "2026-04-18T11:00:00.000Z",
        items: inv8Items,
        subtotal: calcTotal(inv8Items),
        total: calcTotal(inv8Items),
        paymentStatus: "pending",
        payments: []
    }
];

export const DEMO_WORKSPACE = {
    userAccounts: [],   // normalizer will inject admin + owner
    issueReports: [],
    companyProfile: {
        companyName: "SantoSync",
        tagline: "Premium workflow sync for quotes, invoices, and trade operations.",
        address: "Santo Domingo, Dominican Republic",
        email: "hello@santosync.com",
        phone: "+1 (809) 555-0110",
        website: "www.santosync.com",
        taxId: "RNC-101-25480-1",
        signatureDataUrl: "",
        stampDataUrl: ""
    },
    savedItems: [],
    catalogItems: [
        {
            id: "cat-001",
            name: "Plastic pallet wrap, 500m stretch film",
            details: "Industrial stretch wrap for palletizing. 500m roll, 17-micron gauge.",
            notes: "Keep in dry storage.",
            price: 28.00,
            dateUpdated: "2026-03-01T00:00:00.000Z",
            category: "Packaging",
            brand: "",
            unitSize: "1 roll",
            vendor: ""
        },
        {
            id: "cat-002",
            name: "Food service cling film, 450m roll",
            details: "Commercial cling film for food service use. 450m × 30cm roll.",
            notes: "",
            price: 45.00,
            dateUpdated: "2026-03-01T00:00:00.000Z",
            category: "Food Service",
            brand: "",
            unitSize: "1 roll",
            vendor: ""
        },
        {
            id: "cat-003",
            name: "Empty carton boxes, flat-pack double wall",
            details: "Double-wall corrugated carton boxes, flat-packed for easy shipping. Standard size.",
            notes: "Minimum order: 50 units.",
            price: 2.20,
            dateUpdated: "2026-03-01T00:00:00.000Z",
            category: "Packaging",
            brand: "",
            unitSize: "1 unit",
            vendor: ""
        },
        {
            id: "cat-004",
            name: "Packaging tape, heavy duty 50m",
            details: "Heavy-duty carton sealing tape. 50m × 48mm.",
            notes: "",
            price: 8.50,
            dateUpdated: "2026-03-01T00:00:00.000Z",
            category: "Packaging",
            brand: "",
            unitSize: "1 roll",
            vendor: ""
        },
        {
            id: "cat-005",
            name: "Dining chairs, commercial-grade stackable",
            details: "Heavy-duty commercial dining chairs, stackable up to 8 units. Steel frame.",
            notes: "Available in black and white.",
            price: 68.00,
            dateUpdated: "2026-03-15T00:00:00.000Z",
            category: "Furniture",
            brand: "",
            unitSize: "1 unit",
            vendor: ""
        },
        {
            id: "cat-006",
            name: "Palletizing and wrapping service",
            details: "Per-pallet palletizing service including wrap and banding.",
            notes: "Minimum 10 pallets.",
            price: 32.00,
            dateUpdated: "2026-02-01T00:00:00.000Z",
            category: "Services",
            brand: "",
            unitSize: "per pallet",
            vendor: ""
        },
        {
            id: "cat-007",
            name: "Consolidated freight handling fee",
            details: "Flat-rate consolidated cargo handling at origin terminal.",
            notes: "Rate subject to volume review quarterly.",
            price: 800.00,
            dateUpdated: "2026-02-01T00:00:00.000Z",
            category: "Services",
            brand: "",
            unitSize: "flat fee",
            vendor: ""
        },
        {
            id: "cat-008",
            name: "Cold storage surcharge",
            details: "Per-day cold storage fee for temperature-sensitive shipments.",
            notes: "Requires advance booking.",
            price: 160.00,
            dateUpdated: "2026-02-01T00:00:00.000Z",
            category: "Services",
            brand: "",
            unitSize: "per day",
            vendor: ""
        }
    ],
    statementExports: [],
    sessionLogs: [],
    activityLogs: []
};
