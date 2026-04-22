# SantoSync

SantoSync is a premium quote-and-invoice workspace for modern trade teams. It combines document creation, client history, per-user preferences, admin tools, and branded export output in one polished operational dashboard.

Version: `1.6.1` — Last updated: April 22, 2026

## Version 1.6.1 Summary

This release refreshes the app's visual tone so SantoSync feels newer, cleaner, and less old-timey without changing the underlying workflows.

**Typography refresh:** The product now uses a more modern type system with `Manrope` for UI text and `Sora` for headings and branded display moments. This replaces the older serif-heavy look with a sharper, more contemporary voice that feels closer to a clean Helvetica-inspired workspace while still keeping enough personality for SantoSync.

**Visual consistency pass:** The new font pairing carries through the splash screen, sign-in flow, dashboard headings, page headers, brand lockups, and about surfaces so the interface reads as one coherent system instead of mixing modern UI copy with vintage-looking display text.

**Documentation sync:** README, Help & FAQ, and About SantoSync copy now reflect the updated visual direction alongside the recent workflow, payment, and recovery improvements shipped in the previous release updates.

## Version 1.6.0 Summary

This release focuses on workflow clarity, payment controls, responsive layout cleanup, and documentation accuracy.

**Statements layout fit and rendering polish:** The Statements page now keeps its content inside the working column more reliably on laptop-sized screens. The statement export cards wrap their metric and action areas earlier, and the reports layout uses a dedicated width so Payment History, Client Aging, and saved statement rows stay visually contained instead of pushing past the viewport.

**Line-item editor cleanup:** The cart trigger was removed from the quote and invoice line-items step. The table-style editor now stays focused on direct item entry with a single clear `Add Item` action, which avoids the glitchy cart interaction and reduces visual noise in the most frequently used part of the document flow.

**Safer payment deletion:** Logged payments can now be removed intentionally from the Statements page through a dedicated `Delete Payment` action. Deleting either a logged payment or an in-editor payment entry now opens a confirmation modal first, then refreshes balances and reporting immediately after removal so users are not left wondering whether the payment actually changed.

**Help, FAQ, and about-copy alignment:** The in-app Help & FAQ, the About SantoSync copy, and this README now reflect the current behavior: documents save cleanly before print, the document list is more clickable, payment history has stronger controls, backups are broader, and the old Step 3 cart button is no longer part of the quote/invoice editor flow.

## Version 1.5.0 Summary

This release focuses on data persistence reliability, usability improvements to the line-item editor, new document intelligence fields, and richer client intelligence.

**Payment History persistence fix:** Payment History and Client Aging data on the Statements page no longer reset to zero after a page refresh. The root cause was a timing issue in the bootstrap sequence — workspace state loaded first and rendered the panels with an empty document list, and the subsequent document load never re-triggered the panel render. Both `bootstrapAppData` and `loadLocalAppData` now call `renderStatementsPage` after documents are ready, so the panels always reflect the correct payment data on first load.

**Table-based line-item editor:** The line-item entry experience has been redesigned from an expand/collapse card accordion into a compact spreadsheet-style table. Each item is now a single row showing all fields inline — Description, Quantity, Unit Price, and Total — so nothing is hidden and there is no clicking to expand. Tab moves between fields naturally, Enter on any numeric field advances to the next column, Tab from the last field of the last row adds a new row automatically, and Cmd/Ctrl+Enter adds a new row from anywhere. The internal Cost and Margin columns appear when the Internal Pricing toggle is enabled, matching the previous behavior. This layout significantly reduces scrolling and interaction cost when building multi-item quotes and invoices.

**Internal Notes per document:** Every quote and invoice now has an Internal Notes field alongside the existing public Notes field. Internal notes are saved to the document record but are never printed or shown in PDF exports — they are strictly for team use. The field carries a "Private" label badge in the editor to make the distinction clear. When internal notes exist, a subtle italic callout appears on the document card in the list view (truncated at 90 characters). Use this field to log submission dates, follow-up reminders, payment context, or any operational detail that should travel with the document without appearing on client-facing output.

**Invoice due date on document cards:** Invoice cards now display the calculated due date and payment term (e.g., "Due May 21, 2026 · NET30") for any invoice that is not yet fully paid. When the invoice is past due, the due-date line turns red and appends the number of overdue days (e.g., "Due Apr 5, 2026 · NET30 · 16d overdue"). This pulls from the existing payment terms parser and due-date calculator, so it respects NET15, NET30, NET60, and custom terms correctly.

**Client card document statistics:** Each client card in the Clients directory now shows a compact summary of that client's activity — quote count, invoice count, total invoiced value, and outstanding balance — directly in the collapsed header row. Expanding the card reveals a four-cell stats grid. The outstanding cell is highlighted in red when there is an unpaid balance, providing an at-a-glance receivables signal per client without navigating to the aging report.

## Version 1.4.0 Summary

This release tightens the document workflow, improves recovery, and makes the workspace more clickable and easier to scan.

**Document save-state cleanup:** Documents now use `Draft` only for autosaved, not-yet-confirmed work. A manual save marks the record as the confirmed version, which removes the old ambiguity where opening print preview could change the document state. The Step 6 action has been renamed to `View / Print`, and it only unlocks after the user has saved the document.

**Clickable document list:** Document cards are now more direct to use. The whole card can be clicked to reopen the editor, keyboard users can open cards with `Enter` or `Space`, and the redundant `Logged` pill has been removed so only draft records stand out visually. Logged status is now implied by the absence of the draft marker.

**Payment reliability and receivables controls:** Payment entries are reconciled back into shared storage more safely on bootstrap, which protects against the payment-history reset scenario where locally recovered invoice payments could disappear after signing back in. Invoices now default to a minimum `NET30` term, the due-date logic enforces that floor, and the reports page raises an alert when a client exceeds `$10,000` of outstanding balance due within the same month.

**Full-workspace backup and recovery:** JSON backups now include the wider workspace state in addition to documents and clients: user accounts, issue reports, company profile, saved items, catalog items, statement exports, session logs, and activity logs. Server writes also keep timestamped dataset snapshots so recovery no longer depends only on manually exported files.

## Version 1.3.0 Summary

This release expands the client directory, adds full payment lifecycle management, and redesigns the Excel statement export.

**Client Directory overhaul:** Client profiles now support multiple contacts per record — each with a name, email, phone number, and a WhatsApp flag. Clients are managed through a dedicated Add/Edit modal that replaces the old prompt-based flow. The client directory renders as accordion cards: clicking a card expands it inline to reveal the full address, consignee, and all saved contacts without leaving the page.

**Statement payment tracking:** Statement deductions can now be flagged as payments. When the "Mark as payment" checkbox is enabled on a deduction inside the statement editor, saving the statement writes that deduction back as a real payment entry on the matched invoice documents. The payment propagates to Payment History, reduces the outstanding balance in the aging table, and updates the invoice payment status automatically. The statement summary panel separates "Payments applied" (green) from "Other deductions" so the financial breakdown is immediately clear.

**Log Payment entry point:** The Payment History panel on the Statements page now has a "+ Log Payment" button. It opens the existing quick-payment modal with an invoice picker pre-filtered to all open invoices, so payments can be recorded without reopening the full document editor.

**Aging table click-throughs:** Clicking any client row in the Client Aging table navigates directly to the Documents page with that client's open invoices pre-filtered — collections work becomes one hop.

**Excel statement export redesign:** The Excel export for Statements of Account has been fully redesigned. The output is now a single branded sheet: a dark-navy title banner, a header block with labeled vendor/consignee/bill-to/currency/outstanding balance cells, a light-yellow date band, navy column headers, and one data row per invoice (Inv Date, Invoice Number, PO Number, Debits, Credits, Bal Outstanding) with a totals row at the bottom. The old letterhead-image area and per-invoice sub-sheets have been removed in favor of this focused layout.

## Version 1.2.0 Summary

This release is a layout and navigation redesign. The full-width app topbar has been removed and replaced with a compact mobile-only header (`<header class="mobile-topbar">`). On desktop, navigation lives entirely in the left sidebar. Sign out, language selection, session and environment status badges, and the `+ New` quick-action menu have all moved into the sidebar footer, eliminating the topbar entirely on wide screens.

The dashboard `+ New` area in the workspace actions row has been consolidated from two separate buttons (New Quote, New Invoice) into a single `+ New` button that opens an inline dropdown with three options: Quote, Invoice, and Statement. The same options are also reachable from the Documents page header.

The overview snapshot KPI grid has been trimmed: the Invoices stat card has been removed, leaving Documents, Quotes, and the three-state Pipeline Value toggle card. The snapshot area and hero section have been tightened with reduced padding and smaller display type to take up less vertical space on the dashboard.

Settings have been cleaned up: the User Management panel (Create local accounts, assign roles, reset passwords, remove users) has been removed from the Settings modal. Remaining settings panels are Service Reports, Editor Preferences, Data Export & Import, and Local Testing.

Modals have been visually reworked to match the dashboard aesthetic — light header backgrounds instead of the dark blue gradient, a brand accent top border, and a softer close button style.

## Version 1.1.1 Summary

Statement exports are now indexed by the main search bar. Typing in the search field on the Documents page filters statements by client name, vendor name, reference number, and generated date — the same query applies simultaneously to whichever tab is active. The Statements tab shows a "No statements match your search" empty state when a query returns no results. No separate search UI is needed; the single search bar covers all content in the workspace.

## Version 1.1.0 Summary

This release focuses on UI consistency, navigation improvements, and help system upgrades.

Document cards now use the same icon-button system introduced for statement rows: a filled blue eye icon opens the PDF preview and a ghost-blue pencil icon opens the editor — both with animated tooltip labels on hover, matching the visual language of the statements panel exactly. The edit button inside the PDF preview popup window has been fixed; it now correctly navigates back to the editor with the document loaded.

The Statements tab has been restructured to render inline within the main dashboard section. The filter tabs (All / Quotes / Invoices / Statements) remain visible at all times, so switching between document types feels like a true tab panel rather than a page transition. The separate "Back to Documents" button has been removed — any other tab takes you back naturally.

The Help & FAQ modal has been fully upgraded: it now opens with a live search bar that filters topics as you type, a quick-jump index of pill-style section links, and inline visual demonstrations of the actual action buttons (rendered using the app's own CSS, so they look exactly as they do in the workspace). Topics now reflect the current sidebar navigation, the save-before-print workflow, broader backup and recovery options, the spreadsheet-style line-item editor, and the new payment deletion safeguards.

## Version 1.0.0 Summary

This version brought SantoSync into a more complete shared-workspace release. The app now supports server-backed shared workspace data for online use, invoice payment tracking, a three-state commercial snapshot card, stronger quote-versus-invoice card styling, compact overflow menus for document and line-item actions, a more refined pending-items cart flow, per-item image handling across the editor and cart, a dedicated catalog page, compact export thumbnails for imaged line items, admin issue inbox controls, stronger mobile modal behavior, and a cleaner branded dashboard shell. The quote/invoice workflow, cart behavior, catalog flow, document preview/export flow, and admin tooling all remain intact while the product identity and UI structure are more polished and easier to navigate.

## Brand Identity

- Name: `SantoSync`
- Positioning: Premium workflow sync for quotes, invoices, and trade operations
- Core feel: Coordinated, modern, calm, and reliable
- Typography direction: Modern neo-grotesk UI with cleaner, sharper headings
- Developer: Edwin Jaquez
- Studio: Palmchat Innovations Lab
- Legal credit: Palmchat Innovations LLC NYC

## Product Structure

```text
.
├── assets/
│   └── david-forman-signature.png
│   └── gonzalez-logistics-stamp.png
├── css/
│   └── styles.css
├── index.html
├── js/
│   ├── app.js
│   ├── brand.js
│   └── statement-of-account.js
├── api/
│   ├── _storage.js
│   ├── clients.js
│   ├── debug-blob-write.js
│   ├── debug-blob.js
│   ├── documents.js
│   ├── legacy-pdf.js
│   ├── statement-report.js
│   ├── workspace.js
│   └── upload-legacy-pdf.js
├── package.json
└── README.md
```

## Core Files

- `index.html`: App shell, auth screens, dashboard, editor flow, admin tools, issue reporting, and company profile surface.
- `css/styles.css`: SantoSync UI system, dashboard layout, catalog and cart layouts, document styling, modal patterns, and print/export presentation.
- `js/brand.js`: Centralized brand config, SantoSync logo SVG system, and theme token application.
- `js/app.js`: Session handling, local roles, translations, document workflow, catalog/cart behavior, exports, client persistence, payment tracking, and admin utilities.
- `js/statement-of-account.js`: Statement of Account PDF generation, normalization, and totals calculation.
- `api/documents.js`: Vercel API route for saving and loading quotes and invoices.
- `api/clients.js`: Vercel API route for saving and loading shared client records.
- `api/workspace.js`: Vercel API route for saving and loading shared workspace state.
- `api/statement-report.js`: Vercel API route that generates the Excel Statement of Account workbook.
- `api/_storage.js`: Shared Vercel Blob helpers and dataset normalizers for server persistence.

## Brand System

The SantoSync brand is centralized in `js/brand.js`.

It currently defines:

- Brand name and tagline
- Developer and company credits
- Hero, onboarding, session, and about copy
- Primary brand colors
- Display and UI typography
- Reusable SVG logo rendering

Logo system:

- Wordmark: SantoSync logotype with product tagline
- Icon: Rounded square sync mark
- Monogram: Compact SVG mark used in splash, auth, navbar, and document branding
- Lockup: Icon plus name/tagline combination for brand surfaces

## Company Profile

Admins can manage a Company Profile inside the app via Settings in the sidebar. This profile is used in quote and invoice outputs.

Saved fields:

- Company name
- Tagline
- Address
- Email
- Phone
- Website
- Tax or registration ID

The Company Profile is stored in the shared workspace dataset when the API is available, and falls back to browser storage during local-only testing. It is used to populate:

- document preview headers
- print/PDF output
- company contact/footer identity in exports

## Roles

SantoSync uses a simple username/password role model inside the app:

- `Admin`: Can access settings, company profile, client management, imports/exports, local test tools, issue inbox, and admin-only visibility such as creator attribution.
- `User`: Can sign in, create quotes/invoices, edit documents, save clients, and use the normal workspace without admin-only controls.

Default seeded admin account:

- Username: `admin`
- Password: `Todos123`

When the app is online with the API available, user accounts are stored in the shared workspace dataset so they can be seen across devices. During local-only testing, they fall back to browser storage.

## Main Features

- Create, edit, delete, and convert quotes and invoices
- Daily reference numbering using the app's document naming convention
- Reference numbering resolves against the selected local document date and checks existing same-day refs before choosing the next sequence
- Admin-only client record management
- Admin-only company profile management
- Per-user language preferences for English, Spanish, and French
- Client profiles that preserve bill-to and consignee details, including saved client switching in the editor
- Client directory with expandable accordion cards — click any client to see their full address, consignee, and all saved contacts inline
- Multiple contacts per client (name, email, phone, WhatsApp flag) managed via a dedicated Add/Edit modal
- Aging table rows click through to the Documents page pre-filtered to that client's open invoices — collections work is one hop
- Statement deductions can be flagged as payments; on save, they write payment entries back to the matched invoice documents, reflecting immediately in Payment History and balance calculations
- "+ Log Payment" button in the Payment History panel lets you record payments against any open invoice without opening the document editor
- Statement summary panel shows "Payments applied" and "Other deductions" as separate line items
- Statement of Account Excel export with a branded single-sheet layout: title banner, header block (vendor, consignee, bill-to, currency, outstanding balance, project name), date band, column headers, and one row per invoice
- Pending items cart with a dedicated create-item popup
- Pending items cart with visual item cards, a header action pill, document-insert controls, compact cart item editing, and cart item image editing
- Catalog page that aggregates items captured from quotes, invoices, and cart records, with support for manually added catalog entries
- Line item image support inside the document editor with a visual add-image tile
- Compact overflow menus for line-item editor actions instead of persistent inline action buttons
- Issue reporting with optional screenshot upload
- Admin issue inbox with delete controls
- Local fallback mode when the API is unavailable
- Full-workspace JSON backup, restore, and selective export tools
- Timestamped server-side dataset snapshots for recovery
- CSV template export and CSV import
- Calculator inside the document editor
- Logged payment deletion with a confirmation modal from the Statements payment history
- Compact dashboard with a tightened hero section and trimmed snapshot KPI grid (Documents, Quotes, Pipeline Value)
- Single `+ New` button on the dashboard and Documents page header — opens a quick-action dropdown with Quote, Invoice, and Statement options
- Document cards use stronger quote/invoice color separation, click-to-open behavior, and a visible `Draft` badge only when the document is still an autosaved draft
- Invoice cards support `Paid` / `Unpaid` / `Pending` status badges and a menu action for payment tracking
- Manual save now confirms a document before `View / Print` becomes available on Step 6
- Payment History raises an alert when one client exceeds `$10,000` due in a single month
- Invoice payment terms default to a minimum `NET30`
- The top commercial snapshot value card auto-cycles through `Pipeline Value`, `Amount Invoiced`, and `Income Received` every 3 seconds; each state has a distinct background color (blue, green, amber). Clicking the card manually advances the cycle and resets the timer.
- Document cards use icon-based action buttons (eye for PDF preview, pencil for edit) with animated tooltip labels on hover
- The PDF preview popup window's Edit button correctly navigates back to the editor with the document loaded
- The Statements tab renders inline within the main dashboard — the filter tab bar stays visible while browsing statements
- Statement rows show the same open/edit/delete icon buttons as document cards for a unified control language
- Mobile-tuned modal sizing for cart, issue reporting, and document preview/export flows
- Branded splash, auth, session-loading, about, and dashboard identity
- Branded print/PDF preview output with SantoSync company identity
- Help & FAQ modal with live keyword search, a quick-jump section index, and inline visual button demos rendered using the app's own CSS; all topics reflect the current sidebar-based navigation and current line-item / payment workflows
- The main search bar indexes both documents and statements — searching by client name, vendor, reference number, or date filters whichever tab is active with a single query

## Document Output Rules

- Quotes use `For:` and `Reference No.`
- Quotes do not render consignee information in final output
- Invoices can render `Bill To` and `Consignee`
- PO numbers are omitted when blank or set to `N/A`
- Line item images are saved with the document and render as a compact export column when at least one item includes an uploaded image
- Printed/exported documents use the active Company Profile identity
- Internal-only pricing fields never appear in the exported document
- PDF preview opens first, and printing happens from that preview window
- Optional signature support is available at export time
- Optional company stamp overlay can be rendered near the signature as a visual export effect using the bundled Gonzalez Logistics stamp asset

## Local Storage vs Server Storage

Server-backed:

- Quotes and invoices through `/api/documents`
- Shared saved clients through `/api/clients`
  - saved client records persist `name`, `address`, `consigneeName`, `consigneeAddress`, and `contacts[]`
  - contacts include name, email, phone, and WhatsApp flag per entry
  - switching between saved clients restores the saved consignee fields instead of resetting them
- Shared workspace state through `/api/workspace`
  - user accounts and roles
  - issue inbox/reporting
  - company profile
  - pending items cart
  - cart item images and related shared cart metadata
  - catalog items and related catalog metadata

Browser-local:

- Current signed-in session
- Local fallback copies of workspace data when the API is unavailable
- Local fallback test documents/clients when the API is unavailable

Local sandbox server:

- Available when running local development through `npm run dev:sandbox`
- Can seed `documents`, `clients`, and `workspace` from live Vercel Blob once at startup
- Stores all writes in a temporary local folder instead of production storage
- Deletes that temporary dataset when the local sandbox server stops

## Local Development

Install dependencies first:

```bash
npm install
```

Run the app locally with the Vercel dev server so the `api/` routes are available:

```bash
npx vercel dev
```

Then open:

```text
http://127.0.0.1:3000
```

Notes:

- This repository currently uses `npx vercel dev` directly; there is no custom `dev:sandbox` script in `package.json`.
- When the API is unavailable, SantoSync automatically switches to browser-local fallback mode for documents, clients, and workspace data.
- For pure static UI-only checks, you can still use a static server, but API-backed features will not be available in that mode.

## Local Sandbox Workflow

Use the sandbox mode when you want realistic local testing with production-like data, but you do not want any local edits to be pushed back to the live server.

What it does:

- Reads the live datasets once from Vercel Blob when the local sandbox starts
- Copies that data into a temporary local folder
- Serves all later reads and writes from that temporary local copy only
- Removes the temporary local copy when you stop the dev server

This gives you a disposable local environment that is seeded from live data but isolated from production writes.

### 1. Create a local env file

Create `.env.local` in the project root with your live blob token:

```bash
BLOB_READ_WRITE_TOKEN=your_live_vercel_blob_token
BLOB_ACCESS_MODE=private
```

Notes:

- `BLOB_READ_WRITE_TOKEN` is only used to read the live data once during sandbox startup
- In sandbox mode, document, client, workspace, and legacy PDF uploads are written locally instead of to Vercel Blob
- If you do not set `BLOB_READ_WRITE_TOKEN`, the sandbox still runs, but it starts from empty/default local data instead of cloning live data

### 2. Start the sandbox server

From the project root, run:

```bash
npm install
npm run dev:sandbox
```

Then open:

```text
http://127.0.0.1:3000
```

What the command does:

- Starts `vercel dev` locally so the frontend and `api/` routes work together
- Uses the locally installed project dependencies, including `@vercel/blob`
- Forces the app into `local-sandbox` storage mode
- Seeds local temporary datasets from live Blob on first read when a blob token is available
- Cleans up the temporary sandbox data when you stop the server with `Ctrl+C`

First-time note:

- On the first local run, Vercel CLI may ask to link this folder to the existing Vercel project and pull the development environment variables
- Accept those prompts so `.env.local` is created and the sandbox can clone the live datasets once before switching to local-only writes

### 3. Test normally

While the sandbox server is running:

- The app behaves like it has a working backend
- Reads come from the temporary local sandbox copy
- Writes stay inside the temporary local sandbox copy
- No local test edits are pushed to the live server
- The top bar shows a `LOCAL SANDBOX` badge so you can visually confirm you are not using the live environment

### 4. End the session

Stop the server with `Ctrl+C`.

The `dev:sandbox` wrapper removes the temporary local data directory automatically, so the next sandbox session starts fresh and reseeds from live again.

When `LOCAL_SEED_FROM_BLOB=true` (the default), local sandbox runs in a safe `live-read / local-write` mode:
- documents, clients, and workspace data seed from the live Blob datasets once
- every change after that is written only to the temporary local sandbox directory
- nothing is pushed back to the live datasets

### Optional: start without cloning live data

If you want a blank disposable sandbox instead of a live-seeded one:

```bash
LOCAL_SEED_FROM_BLOB=false npm run dev:sandbox
```

## Deployment Notes

- The app is a static HTML/CSS/JS frontend with Vercel serverless functions in `api/`
- Persistent server data depends on Vercel Blob configuration
- Shared workspace data now syncs online through `/api/workspace`
- The active signed-in session still remains browser-local by design
- Local sandbox mode can safely emulate server-backed behavior without writing to production Blob
- The bundled signature and stamp assets are served from `assets/` for PDF preview/export consistency
- A future backend auth layer would still be needed for stronger account security and password management

## Future Improvements

- Move roles and auth to a stronger shared backend
- Add a richer company profile page with logo upload and legal footer options
- Add document activity history and admin reporting
- Add configurable exchange rates and tax profiles
- Add reusable brand themes per company/account
