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
            footerWaveUrl,
            referenceNumber,
            signatureUrl,
            stampUrl,
            statementNote
        } = payload;

        const companyContact = [company?.address, company?.phone, company?.email].filter(Boolean);

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
            padding: 0.34in 0 20mm;
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
            font-size: 0.92rem;
        }
        .document-meta strong,
        .statement-label,
        .statement-note strong,
        .statement-line-label,
        .statement-section-title {
            color: #3c67a7;
        }
        .statement-ref {
            display: grid;
            gap: 0.25rem;
            align-items: start;
            flex: 1 1 auto;
        }
        .statement-date {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            justify-self: end;
            margin-left: auto;
            white-space: nowrap;
        }
        .statement-date-chip {
            display: inline-flex;
            align-items: center;
            min-height: 2rem;
            padding: 0.2rem 0.6rem;
            border-radius: 999px;
            background: #eef0f4;
            color: #1f2937;
        }
        .statement-party-lines {
            display: grid;
            gap: 0.4rem;
            margin-bottom: 1rem;
            font-size: 0.9rem;
        }
        .statement-party-line {
            display: flex;
            gap: 0.35rem;
            flex-wrap: wrap;
        }
        .statement-party-line strong {
            font-size: 0.92rem;
        }
        .statement-table-wrap {
            border: 0;
            overflow: hidden;
            margin-bottom: 0.2rem;
        }
        .statement-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }
        .statement-table th,
        .statement-table td {
            padding: 0.32rem 0.35rem;
            border: 1px solid #51555d;
            text-align: left;
            vertical-align: top;
            font-size: 0.75rem;
        }
        .statement-table th {
            background: #eef3fb;
            color: #1f2937;
            font-size: 0.72rem;
            font-weight: 800;
            text-align: center;
        }
        .statement-table td.amount,
        .statement-table th.amount {
            text-align: right;
            white-space: nowrap;
        }
        .statement-balance-row {
            display: flex;
            justify-content: flex-end;
            gap: 1.2rem;
            align-items: center;
            margin: 0.25rem 0 0.45rem;
            padding-right: 0.2rem;
            font-size: 0.84rem;
        }
        .statement-balance-label {
            color: #3b6fca;
            font-weight: 700;
        }
        .statement-balance-value {
            color: #e21c13;
            font-weight: 800;
            font-size: 0.92rem;
        }
        .statement-rule {
            height: 3px;
            background: #1f6ea1;
            margin: 0 0 0.45rem;
        }
        .statement-section-title {
            font-size: 0.84rem;
            font-weight: 700;
            margin-bottom: 0.2rem;
        }
        .statement-note {
            min-height: 3.2rem;
            margin-bottom: 0.85rem;
            font-size: 0.8rem;
        }
        .statement-note-body {
            text-align: center;
            font-weight: 700;
            font-size: 0.8rem;
            line-height: 1.45;
            padding: 0.2rem 1rem 0;
        }
        .statement-signoff {
            display: grid;
            grid-template-columns: 420px 290px;
            justify-content: space-between;
            gap: 0.8rem;
            align-items: end;
            margin-top: 0.15rem;
        }
        .statement-approval {
            display: grid;
            gap: 0.7rem;
            position: relative;
            min-height: 92px;
            max-width: 420px;
        }
        .statement-line-row {
            display: grid;
            grid-template-columns: auto 235px;
            align-items: end;
            gap: 0.45rem;
            justify-content: start;
        }
        .statement-line {
            border-bottom: 1px solid #1f2937;
            min-height: 1rem;
            display: flex;
            align-items: flex-end;
        }
        .statement-line-label {
            font-size: 0.78rem;
            white-space: nowrap;
        }
        .statement-signature-image {
            position: absolute;
            left: 118px;
            bottom: -2px;
            width: 126px;
            height: auto;
        }
        .statement-stamp-image {
            position: absolute;
            left: 54px;
            bottom: -18px;
            width: 112px;
            height: auto;
            opacity: 0.75;
        }
        .statement-date-line {
            display: grid;
            grid-template-columns: auto 215px;
            align-items: end;
            gap: 0.45rem;
            margin-top: 0.9rem;
            justify-self: end;
        }
        .statement-date-value {
            border-bottom: 1px solid #1f2937;
            min-height: 1rem;
            font-size: 0.78rem;
            letter-spacing: 0.08em;
            display: flex;
            align-items: flex-end;
        }
        .footer-wave {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            max-height: 82px;
            object-fit: cover;
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
            .statement-signoff,
            .document-meta {
                grid-template-columns: 1fr;
                display: grid;
            }
            .document-body {
                padding: 0 0.3in;
            }
            .statement-table th,
            .statement-table td {
                font-size: 0.78rem;
            }
            .statement-date {
                justify-self: start;
            }
            .statement-balance-row {
                justify-content: space-between;
                gap: 0.7rem;
                flex-wrap: wrap;
            }
            .statement-line-row,
            .statement-date-line {
                grid-template-columns: auto minmax(0, 1fr);
            }
            .statement-signoff {
                justify-content: stretch;
            }
            .statement-approval {
                max-width: none;
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
                    <div class="statement-ref">
                        <div><strong class="statement-label">Reference:</strong> ${escapeHtml(referenceNumber || title.replace(/\.pdf$/i, ""))}</div>
                    </div>
                    <div class="statement-date">
                        <strong class="statement-label">Date:</strong>
                        <span class="statement-date-chip">${escapeHtml(generatedDate)}</span>
                    </div>
                </div>

                <div class="statement-party-lines">
                    <div class="statement-party-line"><strong class="statement-label">Vendor:</strong> <span>${escapeHtml(vendorName || company?.companyName || "Vendor")}</span></div>
                    <div class="statement-party-line"><strong class="statement-label">Client:</strong> <span>${escapeHtml(clientName || "Client")}</span></div>
                    <div class="statement-party-line"><strong class="statement-label">Currency:</strong> <span>${escapeHtml(currency)}</span></div>
                </div>

                <div class="statement-table-wrap">
                    <table class="statement-table">
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

                <div class="statement-balance-row">
                    <span class="statement-balance-label">Total Outstanding Balance:</span>
                    <span class="statement-balance-value">USD ${escapeHtml(String(totalOutstandingFormatted).replace(/^[A-Z$ ]+/i, "").trim() || totalOutstandingFormatted)}</span>
                </div>

                <div class="statement-rule"></div>

                <div class="statement-note">
                    <div class="statement-section-title">Notes:</div>
                    <div class="statement-note-body">
                        ${escapeHtml(statementNote || "This statement reflects all outstanding invoices issued to your company as of the date above.")}
                    </div>
                </div>

                <div class="statement-signoff">
                    <div class="statement-approval">
                        <div class="statement-line-row">
                            <span class="statement-line-label">Approved By:</span>
                            <div class="statement-line">David Forman</div>
                        </div>
                        <div class="statement-line-row">
                            <span class="statement-line-label">Signature:</span>
                            <div class="statement-line"></div>
                        </div>
                        ${stampUrl ? `<img class="statement-stamp-image" src="${escapeHtml(stampUrl)}" alt="Company stamp">` : ""}
                        ${signatureUrl ? `<img class="statement-signature-image" src="${escapeHtml(signatureUrl)}" alt="Signature">` : ""}
                    </div>
                    <div class="statement-date-line">
                        <span class="statement-line-label">Date:</span>
                        <div class="statement-date-value">${escapeHtml(new Date(payload.generatedIsoDate || Date.now()).toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "2-digit" }).replace(/\//g, " / "))}</div>
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
        const previewWindow = window.open("", "_blank", "width=1180,height=920");
        if (!previewWindow) {
            throw new Error("Please allow pop-ups to export the statement PDF.");
        }

        previewWindow.document.open();
        previewWindow.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preparing Statement</title>
    <style>
        body {
            margin: 0;
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: #eef3fb;
            color: #1f2937;
            font-family: Arial, sans-serif;
        }
        .statement-loading {
            display: grid;
            gap: 0.7rem;
            justify-items: center;
            padding: 2rem;
            text-align: center;
        }
        .statement-loading strong {
            font-size: 1rem;
        }
        .statement-loading span {
            color: #5b6b81;
            font-size: 0.92rem;
        }
    </style>
</head>
<body>
    <div class="statement-loading">
        <strong>Preparing Statement of Account</strong>
        <span>${escapeHtml(payload.title || "Statement of Account")}</span>
    </div>
</body>
</html>`);
        previewWindow.document.close();

        const markup = buildStatementDocumentMarkup(payload);
        const blobUrl = URL.createObjectURL(new Blob([markup], { type: "text/html" }));
        previewWindow.location.replace(blobUrl);
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
