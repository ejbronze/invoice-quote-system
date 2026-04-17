(function attachStatementOfAccount(global) {
    const DEFAULT_CURRENCY = "USD";

    function escapeHtml(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function parseDateInput(dateValue) {
        if (!dateValue) {
            return null;
        }

        const normalizedValue = String(dateValue).trim();
        const dateOnlyMatch = normalizedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        const parsedDate = dateOnlyMatch
            ? new Date(Number(dateOnlyMatch[1]), Number(dateOnlyMatch[2]) - 1, Number(dateOnlyMatch[3]))
            : new Date(normalizedValue);

        return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
    }

    function formatDate(dateValue, locale) {
        const parsedDate = parseDateInput(dateValue);
        if (!parsedDate) {
            return "";
        }

        return parsedDate.toLocaleDateString(locale || "en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    }

    function formatStatementCurrency(amount, options = {}) {
        const locale = options.locale || "en-US";
        const currency = options.currency || DEFAULT_CURRENCY;

        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(Number(amount || 0));
    }

    function calculateDueDateFromTerms(invoiceDate, paymentTerms) {
        const parsedDate = parseDateInput(invoiceDate);
        if (!parsedDate) {
            return "";
        }

        const normalizedTerms = String(paymentTerms || "").trim().toUpperCase();
        const netMatch = normalizedTerms.match(/NET\s*[- ]?(\d{1,3})/i);
        const dayMatch = normalizedTerms.match(/\b(\d{1,3})\s*(DAY|DAYS)\b/i);
        const looseNumberMatch = normalizedTerms.match(/\b(\d{1,3})\b/);
        const offsetDays = Number(
            (netMatch && netMatch[1]) ||
            (dayMatch && dayMatch[1]) ||
            (looseNumberMatch && looseNumberMatch[1]) ||
            0
        );

        const dueDate = new Date(parsedDate);
        dueDate.setDate(dueDate.getDate() + (Number.isFinite(offsetDays) ? offsetDays : 0));
        return dueDate.toISOString().slice(0, 10);
    }

    function normalizePoNumbers(invoice) {
        const rawPoValue = Array.isArray(invoice?.poNumbers)
            ? invoice.poNumbers
            : [invoice?.poNumber];

        const values = rawPoValue
            .flatMap(value => String(value || "").split(","))
            .map(value => value.trim())
            .filter(value => value && value.toUpperCase() !== "N/A");

        return values.length ? Array.from(new Set(values)).join(", ") : "—";
    }

    function mapInvoicesToStatementRows(invoices, options = {}) {
        const locale = options.locale || "en-US";
        const currency = options.currency || DEFAULT_CURRENCY;
        const getStatusLabel = typeof options.getStatusLabel === "function"
            ? options.getStatusLabel
            : (status => String(status || "—"));

        return (Array.isArray(invoices) ? invoices : []).map(invoice => {
            const dueDate = invoice?.dueDate
                ? String(invoice.dueDate)
                : calculateDueDateFromTerms(invoice?.date, invoice?.paymentTerms);

            return {
                id: invoice?.id,
                invoiceNumber: invoice?.refNumber || "—",
                poNumbers: normalizePoNumbers(invoice),
                invoiceDate: formatDate(invoice?.date, locale) || "—",
                dueDate: formatDate(dueDate, locale) || "—",
                invoiceValue: Number(invoice?.total || 0),
                invoiceValueFormatted: formatStatementCurrency(invoice?.total || 0, { locale, currency }),
                status: getStatusLabel(invoice?.paymentStatus || invoice?.status || "—"),
                rawStatus: invoice?.paymentStatus || invoice?.status || ""
            };
        });
    }

    function slugifyFilePart(value) {
        return String(value || "client")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            || "client";
    }

    function createStatementFileName(clientName, dateValue = new Date()) {
        const stamp = typeof dateValue === "string"
            ? dateValue.slice(0, 10)
            : new Date(dateValue).toISOString().slice(0, 10);
        return `statement-of-account-${slugifyFilePart(clientName)}-${stamp}.pdf`;
    }

    function buildStatementCsv(rows) {
        const csvRows = [[
            "Invoice Number",
            "Related PO Number(s)",
            "Invoice Date",
            "Due Date",
            "Invoice Value",
            "Status"
        ]];

        rows.forEach(row => {
            csvRows.push([
                row.invoiceNumber,
                row.poNumbers,
                row.invoiceDate,
                row.dueDate,
                row.invoiceValueFormatted,
                row.status
            ]);
        });

        return csvRows
            .map(row => row.map(cell => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
            .join("\n");
    }

    function buildStatementDocumentMarkup(payload) {
        const {
            title,
            company,
            clientName,
            vendorName,
            generatedDate,
            currency,
            rows,
            totalSelectedFormatted,
            totalOutstandingFormatted,
            letterheadUrl,
            footerWaveUrl
        } = payload;

        const companyContact = [company?.phone, company?.email].filter(Boolean).join("  •  ");

        return `<!DOCTYPE html>
<html lang="${escapeHtml(payload.locale || "en-US")}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(title)}</title>
    <style>
        :root {
            color-scheme: light;
            --ink: #173453;
            --muted: #62758d;
            --line: #d8e2ee;
            --wash: #f4f7fb;
            --brand: #1459d9;
            --brand-soft: rgba(20, 89, 217, 0.08);
            --success: #0f766e;
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: Inter, Arial, sans-serif;
            background: #eaf0f7;
            color: var(--ink);
        }
        .statement-toolbar {
            position: sticky;
            top: 0;
            z-index: 20;
            display: flex;
            justify-content: flex-end;
            gap: 0.75rem;
            padding: 0.9rem 1rem;
            background: rgba(245, 247, 250, 0.96);
            border-bottom: 1px solid var(--line);
            backdrop-filter: blur(10px);
        }
        .statement-toolbar button {
            border: 0;
            border-radius: 999px;
            padding: 0.72rem 1rem;
            font: inherit;
            font-weight: 700;
            cursor: pointer;
            background: var(--brand);
            color: #fff;
        }
        .statement-toolbar button.secondary {
            background: #e7eef6;
            color: #28415b;
        }
        .statement-shell {
            max-width: 1080px;
            margin: 0 auto;
            padding: 1.1rem;
        }
        .document-sheet {
            background: #fff;
            width: 100%;
            max-width: 820px;
            margin: 0 auto;
            padding: 0.42in 0 28mm;
            color: #1f2937;
            font-family: Arial, sans-serif;
            position: relative;
            overflow: hidden;
            box-shadow: 0 18px 42px rgba(23, 52, 83, 0.08);
        }
        .letterhead {
            margin-bottom: 1.1rem;
        }
        .letterhead img {
            width: 100%;
            display: block;
        }
        .document-title {
            text-align: center;
            color: #e1462d;
            font-size: 1.92rem;
            font-weight: 700;
            margin: 0.45rem 0 1.5rem;
        }
        .document-body {
            padding: 0 0.42in;
        }
        .document-meta {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            align-items: start;
            margin-bottom: 1rem;
            font-size: 0.88rem;
        }
        .document-meta strong,
        .statement-summary-label,
        .statement-note strong,
        .statement-line-label {
            color: #3c67a7;
        }
        .statement-vendor {
            display: grid;
            gap: 0.2rem;
            max-width: 430px;
        }
        .statement-vendor strong {
            font-size: 0.95rem;
        }
        .statement-vendor span,
        .statement-meta-card span,
        .statement-summary-card span,
        .statement-note span {
            color: var(--muted);
            font-size: 0.82rem;
            line-height: 1.45;
        }
        .statement-meta-card {
            min-width: 220px;
            padding: 0.7rem 0.85rem;
            border: 1px solid #d6dbe6;
            background: #f8fafc;
            font-size: 0.82rem;
        }
        .statement-meta-card strong {
            display: block;
            color: #374151;
            margin: 0.12rem 0 0.4rem;
            font-size: 0.88rem;
        }
        .statement-summary-grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 0.75rem;
            margin-bottom: 1rem;
        }
        .statement-summary-card {
            border: 1px solid #d6dbe6;
            background: #f8fafc;
            padding: 0.72rem 0.85rem;
        }
        .statement-summary-card strong {
            display: block;
            margin-top: 0.2rem;
            font-size: 0.95rem;
            color: #173453;
        }
        .statement-table-wrap {
            border: 0;
            overflow: hidden;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }
        th, td {
            padding: 0.22rem 0.28rem;
            border: 1px solid #51555d;
            text-align: left;
            vertical-align: top;
            font-size: 0.82rem;
        }
        th {
            background: #eef3fb;
            color: #1f2937;
            font-size: 0.72rem;
            font-weight: 800;
            text-transform: uppercase;
            text-align: center;
        }
        td.amount, th.amount {
            text-align: right;
            white-space: nowrap;
        }
        .statement-divider {
            height: 3px;
            background: #86a6d4;
            margin: 1.1rem 0 0.8rem;
        }
        .statement-totals {
            display: grid;
            grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.8fr);
            gap: 1rem;
            margin-top: 0;
            align-items: start;
        }
        .statement-note {
            min-height: 4.5rem;
            margin-bottom: 0.8rem;
            font-size: 0.84rem;
        }
        .statement-note strong {
            display: block;
            margin-bottom: 0.35rem;
        }
        .statement-total-card {
            width: 280px;
            justify-self: end;
            border: 1px solid #51555d;
            background: #fff;
        }
        .statement-total-row {
            display: flex;
            justify-content: space-between;
            gap: 0.75rem;
            padding: 0.42rem 0.7rem;
            font-size: 0.88rem;
        }
        .statement-total-row + .statement-total-row {
            border-top: 1px solid #51555d;
        }
        .statement-total-row strong {
            font-size: 1rem;
        }
        .statement-signoff {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem;
            margin-top: 1.2rem;
        }
        .statement-line {
            padding-top: 1.2rem;
            border-bottom: 1px solid #1f2937;
            min-height: 2.4rem;
        }
        .statement-line-label {
            display: block;
            margin-top: 0.45rem;
            font-size: 0.76rem;
        }
        .footer-wave {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            display: block;
        }
        .document-sheet > *:not(.footer-wave) {
            position: relative;
            z-index: 1;
        }
        @media (max-width: 820px) {
            .document-sheet {
                padding-top: 0.3in;
            }
            .statement-summary-grid,
            .statement-totals,
            .statement-signoff {
                grid-template-columns: 1fr;
            }
            .document-body {
                padding: 0 0.3in;
            }
            th, td {
                font-size: 0.78rem;
            }
            .statement-total-card {
                width: 100%;
                justify-self: stretch;
            }
        }
        @media print {
            @page { size: auto; margin: 0; }
            body { background: #fff; }
            .statement-toolbar { display: none !important; }
            .statement-shell { max-width: none; padding: 0; }
            .document-sheet {
                box-shadow: none;
                max-width: none;
            }
        }
    </style>
</head>
<body>
    <div class="statement-toolbar">
        <button class="secondary" type="button" onclick="window.close()">Close Preview</button>
        <button type="button" onclick="window.print()">Print or Save as PDF</button>
    </div>
    <main class="statement-shell">
        <article class="document-sheet">
            ${letterheadUrl ? `<div class="letterhead"><img src="${escapeHtml(letterheadUrl)}" alt="Company letterhead"></div>` : ""}
            <div class="document-title">STATEMENT OF ACCOUNT</div>
            <div class="document-body">
                <div class="document-meta">
                    <div class="statement-vendor">
                        <strong>${escapeHtml(company?.companyName || vendorName || "Vendor")}</strong>
                        ${company?.address ? `<span>${escapeHtml(company.address).replace(/\n/g, "<br>")}</span>` : ""}
                        ${companyContact ? `<span>${escapeHtml(companyContact)}</span>` : ""}
                        ${company?.website ? `<span>${escapeHtml(company.website)}</span>` : ""}
                    </div>
                    <div class="statement-meta-card">
                        <span>Document</span>
                        <strong>${escapeHtml("STATEMENT OF ACCOUNT")}</strong>
                        <span>Date Generated</span>
                        <strong>${escapeHtml(generatedDate)}</strong>
                        <span>Currency</span>
                        <strong>${escapeHtml(currency)}</strong>
                    </div>
                </div>

                <div class="statement-summary-grid">
                    <div class="statement-summary-card">
                        <span class="statement-summary-label">Vendor Name</span>
                        <strong>${escapeHtml(vendorName || company?.companyName || "Vendor")}</strong>
                    </div>
                    <div class="statement-summary-card">
                        <span class="statement-summary-label">Client Name</span>
                        <strong>${escapeHtml(clientName || "Client")}</strong>
                    </div>
                    <div class="statement-summary-card">
                        <span class="statement-summary-label">Invoices Selected</span>
                        <strong>${escapeHtml(String(rows.length))}</strong>
                    </div>
                    <div class="statement-summary-card">
                        <span class="statement-summary-label">Total Selected Value</span>
                        <strong>${escapeHtml(totalSelectedFormatted)}</strong>
                    </div>
                </div>

                <div class="statement-table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>Invoice Number</th>
                                <th>Related PO Number(s)</th>
                                <th>Invoice Date</th>
                                <th>Due Date</th>
                                <th class="amount">Invoice Value</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.map(row => `
                                <tr>
                                    <td><strong>${escapeHtml(row.invoiceNumber)}</strong></td>
                                    <td>${escapeHtml(row.poNumbers)}</td>
                                    <td>${escapeHtml(row.invoiceDate)}</td>
                                    <td>${escapeHtml(row.dueDate)}</td>
                                    <td class="amount">${escapeHtml(row.invoiceValueFormatted)}</td>
                                    <td>${escapeHtml(row.status)}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>

                <div class="statement-divider"></div>

                <div class="statement-totals">
                    <div class="statement-note">
                        <strong>Account Summary</strong>
                        <span>This statement reflects only the invoices selected in the workspace at the time of export.</span>
                    </div>
                    <div class="statement-total-card">
                        <div class="statement-total-row">
                            <span>Total Selected Value</span>
                            <span>${escapeHtml(totalSelectedFormatted)}</span>
                        </div>
                        <div class="statement-total-row">
                            <span>Total Outstanding Balance</span>
                            <strong>${escapeHtml(totalOutstandingFormatted)}</strong>
                        </div>
                    </div>
                </div>

                <div class="statement-signoff">
                    <div>
                        <div class="statement-line"></div>
                        <span class="statement-line-label">Approved By</span>
                    </div>
                    <div>
                        <div class="statement-line"></div>
                        <span class="statement-line-label">Signature</span>
                    </div>
                </div>
            </div>
            ${footerWaveUrl ? `<img class="footer-wave" src="${escapeHtml(footerWaveUrl)}" alt="" aria-hidden="true">` : ""}
        </article>
    </main>
    <script>window.addEventListener("load", function () { setTimeout(function () { window.print(); }, 180); });<\/script>
</body>
</html>`;
    }

    function generateStatementOfAccountPdf(payload) {
        const previewWindow = window.open("", "_blank", "noopener,noreferrer,width=1180,height=920");
        if (!previewWindow) {
            throw new Error("Please allow pop-ups to export the statement PDF.");
        }

        previewWindow.document.open();
        previewWindow.document.write(buildStatementDocumentMarkup(payload));
        previewWindow.document.close();
        previewWindow.focus();
        return previewWindow;
    }

    global.StatementOfAccount = {
        calculateDueDateFromTerms,
        formatStatementCurrency,
        mapInvoicesToStatementRows,
        createStatementFileName,
        buildStatementCsv,
        buildStatementDocumentMarkup,
        generateStatementOfAccountPdf
    };
})(window);
