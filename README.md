# SantoSync

SantoSync is a focused document and operations workspace built for trade teams, freelancers, and logistics operators who need to generate, track, and deliver professional quotes and invoices without the overhead of enterprise billing software.

Version: `1.17.0` — Last updated: May 4, 2026

## Version 1.17.0 Summary

This release improves the mobile layout for the Statements and invoice reporting page so saved statement cards are shorter, clearer, and easier to tap.

**Compact mobile statement cards:** On mobile, each saved statement now uses a tighter card structure: statement reference and date on the top-left, Paid/Pending status on the top-right, the client name as the primary two-line row, compact metric pills for invoice count, total, and outstanding balance, and a horizontal action bar at the bottom.

**Mobile action bar:** Statement actions no longer stack vertically in the center of the card on mobile. View remains the primary action, with Excel export, Notes, Edit, and Delete kept as equal tap targets in one bottom row. The settle/paid shortcut remains available where the mobile width can support the extra control.

**Status and balance color:** Paid statements use green status styling. Pending statements use amber, while larger outstanding balances use a red-tinted metric pill. The color is limited to badges, pills, and subtle borders rather than full-card backgrounds.

**Preserved reporting behavior:** Pending/Paid/All filters, PDF viewing, Excel export, notes, editing, deletion, statement persistence, and the existing statement data structure are unchanged.

## Version 1.16.0 Summary

This release refactors the Notes page into a compact timeline-style activity feed for faster scanning across invoices, quotes, offers, and statements.

**Timeline activity feed:** The Notes page now groups records by date with compact activity rows instead of bulky note cards. Each row shows a type badge, document reference, note count, smart summary, metadata, and a right-side open action that jumps to the linked document.

**Collapsed details by default:** Rows stay collapsed for faster review. Use the inline details control to expand the row and view the full original note history, complete bullet lists, and raw system change log details.

**Smart summaries and chips:** Common system notes are summarized into readable activity labels such as "Procurement updated," "Payment status changed," "Tags updated," and "Document note added." Repetitive change lines are condensed into chips like "+13 rows," "64 updated," "Total changed," "Paid," or "Tags updated," while the original text remains available in expanded details.

**Document type colors:** The feed uses minimal type color accents: Invoice = green, Quote = blue, Offer = amber, and Statement = gray. Offers now render amber on the Notes page instead of purple.

**Preserved filters and counts:** Search, client filtering, document type filters, visible record counts, note counts, and existing note data all continue to use the current document and storage structure.

## Version 1.15.0 Summary

This release adds inline item image support to line items in Offer, Quote, and Invoice editors without expanding the table or adding new columns.

**Inline image cell:** A compact 22px camera icon now appears to the left of each item description. When an image is set, it displays as a 22×22px thumbnail. Clicking the icon with no image opens a file picker; clicking a thumbnail opens a preview modal with Replace and Remove options.

**Hover preview:** On pointer/hover-capable devices, hovering over an item thumbnail shows a 120×160px floating preview above the row with a subtle shadow and fade-in animation (120ms). Mobile devices rely on tap behavior only — no hover preview fires.

**PDF export:** The printed document table already includes an image column when any line item has an image (existing behavior preserved). Excel exports remain image-free.

**Auto-populate from catalog:** Items added from the catalog automatically carry their catalog image into the line item (existing behavior preserved).

**No layout changes:** No new table columns, no row height increase, no impact on totals, pricing, or drag-to-reorder.

## Version 1.14.0 Summary

This release fixes Signatures access in workspace Settings, making it visible and usable for all admin users without requiring access to Account Admin.

**Signatures in Settings:** The Signatures panel has been moved from the owner-only Account Admin page into the standard Settings page. All admins can now open Settings and see the Signatures section — including the list of saved signatures, the editor form, and the "+ Add Signature" button.

**Empty-state UX:** When no signatures exist, the panel now shows "Add your first signature to include it on quotes and invoices." instead of the previous generic message.

**No data changes:** Signature data structure, export logic, `selectedSignatureId` behavior, and all existing signature functionality are unchanged. The move is a visibility-only fix.

## Version 1.13.0 Summary

This release delivers a visual hierarchy upgrade to the dashboard overview page, improving the layout, information architecture, and polish of the workspace's main landing screen.

**Refreshed dashboard layout:** The overview page has been redesigned with a cleaner information hierarchy. The top of the page now shows a concise header (eyebrow label + "Workspace Overview" headline + "+ New" button) instead of the previous generic marketing copy. This gives the dashboard an operator-console feel from the moment you land.

**KPI strip:** The snapshot panel (cycling pipeline value, invoiced amount, and income received) has been extracted from the old workspace-hero layout into a dedicated `.dash-kpi-strip`. The hero value card is larger and more prominent, with the financial figure displayed at up to 3rem. When an outstanding invoice balance exists, a second tile appears alongside the hero card showing the total outstanding amount in a red-tinted tile — hidden when the balance is zero.

**Unified attention card:** The two separate Past Due and Coming Due cards have been merged into a single unified card with a shared header ("Attention — Invoices needing review"). The two columns sit side by side inside the unified card, separated by a subtle divider. Both the hover tooltip ⓘ icons and the card-level totals are fully preserved. The card hides itself when no invoices require attention.

**Improved empty states:** The Recent Documents empty state and inline attention empty states now use a styled dashed-border container to feel intentional and helpful rather than broken.

**Responsive layout:** The KPI strip collapses to a single column on screens ≤ 768px. The attention grid stacks vertically on mobile with a horizontal divider between the two sections.

**No data or logic changes:** All existing calculations — overdue detection, coming-due logic, outstanding balance math, pipeline/invoiced/income cycling, status badges, filter chips, document cards, and export behavior — are unchanged. All element IDs and JS event bindings are intact.

## Version 1.12.0 Summary

This release upgrades the dashboard's visual hierarchy, surfaces financial urgency data more prominently, and refines the overdue/coming-due invoice detection logic.

**Dashboard Snapshot hero layout:** The pipeline value stat card has been redesigned as a full-width hero element with the amount displayed in large text (clamped between 1.9rem and 2.6rem) and the label directly below it. Secondary stats (total documents and total quotes) moved to a compact inline row beneath the hero card. An Outstanding Balance bar now appears below the secondary stats when any invoice has an unpaid balance — hidden when the balance is zero.

**Outstanding Balance metric:** A new global metric sums all positive outstanding invoice balances across the workspace. It is displayed in a red-tinted bar in the snapshot panel and is recalculated on every document change.

**Attention card row refactor:** Each invoice row in the Past Due and Coming Due cards has been reorganized. The outstanding balance (large, bold) and urgency text (colored, small) appear on the first line. The client name appears on the second line with medium emphasis. The reference number and due date appear on the third line in the smallest text.

**Card-level totals:** Both attention cards now display a running total of the outstanding balances in all listed invoices — shown in a tinted footer bar at the bottom of each card. The totals are hidden when the card is empty.

**Recent Documents type and status badges:** Each document in the Recent Documents list now shows a compact type badge (Quote / Invoice / Offer) and a status badge (e.g., Draft, Sent, Paid, Unpaid) directly next to the reference number.

**Workspace Summary 3-column layout:** The summary card grid changed from 2 to 3 columns, fitting all five nav cards in a tighter two-row layout. Summary cards now display the count as the primary element with the label below it.

**Procurement offer left-border accent:** Offer (procurement) documents in the Recent Documents list now use a purple left border and purple gradient background, consistent with the blue (quotes) and green (invoices) accents already in use.

**Overdue and coming-due logic refinement:** A new `resolveInvoiceDueDate` helper returns `null` when an invoice has no explicit due date field or payment terms, preventing invoices without configured terms from appearing in the attention section. The strict resolver is used throughout `isInvoiceOverdue` and the coming-due filter. The existing `calculateInvoiceDueDate` (which always falls back to DEFAULT_PAYMENT_TERMS) is preserved for card display and aging report contexts.

**Tooltip ⓘ icons:** Both attention card headings now include an information tooltip explaining the qualification criteria for each section.

## Version 1.11.0 Summary

This release adds a dashboard attention section, improves icon consistency and attribution, fixes procurement notes visibility, introduces automatic system notes on document edits, cleans up the Settings page, and makes the Pricing Library toolbar fully responsive.

**Dashboard Attention Required section:** The overview dashboard now surfaces an "Attention Required" section above the secondary grid whenever there are overdue or soon-due invoices. The section renders two cards — Past Due Invoices and Coming Due — each listing up to five unpaid invoices sorted by urgency. Each row shows the reference number, client name, balance, and a colored label (e.g., "3d overdue" in red, "Due in 2d" in amber). Clicking a row opens the invoice directly in the document editor. A small notes icon on the right edge of each row opens the notes drawer for that invoice as a secondary action. "View all" buttons appear when more than five invoices qualify, linking to the full Documents page. The section hides itself entirely when no invoices require attention.

**Pricing Library pagination UI:** The per-page selector has moved from the toolbar to the bottom of the list, centered below the results. The dropdown has been replaced with `20 / 50 / 100` quick-link buttons. The active selection is highlighted. The previous/next navigation and the item range label ("1–20 of 143") sit above the per-page row in a single centered strip.

**Automatic system notes on document edits:** When a document is saved with changes, a system-generated note is automatically appended to the document's note log. The note summarizes what changed (single-line for one change, bulleted for multiple) and timestamps the entry. System notes are labeled with a "System" badge in the Notes drawer, appear in a distinct muted style, and cannot be edited or deleted by users.

**Procurement notes visibility fix:** Opening the notes drawer for a Procurement Sheet now correctly labels the target as "Procurement" instead of "Quote." The submission notes field (`doc.notes`) is displayed as a pinned "Submission Notes" banner at the top of the notes feed whenever it contains content.

**Icon standardization:** Document delete actions now use `icon-trash.png` from the asset library. The Post Note button in the notes drawer now uses `icon-paper-plane.png`. The "Save Document" row in the Help modal now shows `icon-help.png`. All icon uses follow the same `<img class="btn-custom-icon">` pattern used for the save icon.

**Flaticon icon attribution:** A Flaticon attribution line has been added to the app footer crediting Smashicons, lalawidi, and Pixel perfect for the icons used throughout the interface.

**Responsive Pricing Library toolbar:** The library toolbar has been converted from a fixed seven-column CSS grid to a flexbox layout with `flex-wrap: wrap`. Search, filter, and sort fields resize proportionally and wrap cleanly on narrower viewports. The view toggle stays aligned to the end of the row and never clips.

**Settings page cleanup:** "Service Reports" has been renamed to "Tech Tickets" throughout the settings page and related labels. "Data Export & Import" has been renamed to "Download Backup / Upload Recovery File." The "Editor Preferences" panel (internal pricing toggle) is now hidden from the settings UI while keeping the underlying toggle element functional in the DOM. The "Local Testing" panel is now visibility-controlled by runtime mode — it only renders when the app is running in local or sandbox mode, hiding itself in production.

## Version 1.10.0 Summary

This release refines the Pricing Library browsing experience, standardizes save actions, and fixes client outstanding balances when invoice payment status changes.

**Pricing Library browsing and edit flow:** The library now supports Card and List views, instant search/filter/sort updates, and pagination with 25, 50, or 100 items per page. Clicking an item opens a detail modal first; item edits now start only from the modal's **Edit Item** action, reducing accidental inline changes from cards or rows.

**Compact item detail modal:** Empty fields are hidden instead of rendered as placeholder boxes. Item details now flow in tighter grouped sections, keeping visible pricing, supplier, packaging, document reference, detail, and note data easier to scan.

**Save icon standardization:** Explicit save actions now use the shared `/assets/icons/icon-save.png` asset across document saves, item modals, settings/profile forms, payments, notes, procurement sheets, and client/profile actions while preserving existing button styling.

**Client balance recalculation fix:** Client Directory outstanding balances now recalculate immediately when invoice status changes in either direction. Marking an invoice Paid removes its remaining balance; moving it back to Pending or Unpaid adds the unpaid amount back without requiring a refresh. Statements, payment history, and invoice reporting use the same outstanding-balance path.

## Version 1.9.0 Summary

This release adds visual product management to the Pricing Library, full per-document change history, a substantially improved Procurement Sheet experience, and a catalog item PDF report generator.

**Product images in the Pricing Library:** Catalog items now support uploaded product images. Users can upload a JPEG, PNG, or WebP file directly from the item add/edit modal. The image is automatically compressed and resized to a maximum of 600px on the longest side at JPEG quality 0.85 before it is saved — keeping stored images small while maintaining acceptable visual fidelity. After upload, an optional crop step lets users trim the image to exactly the area they want before committing. Cropping is optional and can be skipped with a single click. A status line shows "Optimizing…" while compression runs and "Image ready" once the image is committed. Images can be replaced or removed from the edit modal at any time. The stored image survives all normalize and load cycles so it persists reliably across reloads and workspace syncs.

**Catalog card thumbnails:** When an item has an image, the card bubble renders the image instead of the two-letter initials placeholder. Items without images continue to show the colored initials bubble — no empty image placeholder is forced. Thumbnails use native lazy loading. Clicking the thumbnail on a catalog card opens the image in an expand modal without navigating away from the library. The item detail modal also shows the image in the hero section, and clicking it opens the same expand modal.

**Image expand modal:** A shared full-size image viewer modal can be opened from both the card thumbnail and the item detail modal. The expand modal shows the image at its natural display size with a standard close button. It is keyboard-accessible and closes on backdrop click.

**Catalog item selection and PDF report export:** A "Select Items" button in the Pricing Library toolbar activates selection mode. Checkboxes appear on every card. When one or more items are selected, a selection toolbar shows the selected count and an "Export Item Report" button. The exported PDF is a letter-size document with a 2-column grid layout — each item row shows the product image thumbnail (or an initials block for items without images), item name, supplier/brand/pack size metadata, details excerpt, and unit price. The export uses the existing html2pdf.js pipeline so it is consistent with the rest of SantoSync's PDF output.

**Per-document change history:** Every confirmed document save (quotes, invoices, and procurement sheets) now appends a timestamped change record to `doc.changeHistory[]`. The notes drawer has been expanded with a History tab alongside the existing Notes tab. The History feed shows who saved the document, when, and what changed — including client name, date, PO number, payment status, type conversion, total value, and line-by-line item diffs (added, removed, price changed, quantity changed). Autosaves are excluded from the history feed. Procurement sheet saves generate comparable row-level diffs.

**Procurement Sheet UX overhaul:** The Procurement Sheet modal has been significantly tightened and extended.

The header has been condensed from a stacked 5-field form into a single-strip compact header with Reference Number, Date, Client/Bid, Currency, and Notes arranged in a single row — reducing vertical height from roughly 275px to about 50px.

The item library selector has been replaced with a search combobox. Users now type to filter the library in real time by name, brand, or reference ID rather than scrolling a long dropdown. Selecting an item from the dropdown inserts it immediately. A "Create new item" option at the bottom of the dropdown opens the catalog modal and automatically inserts the newly created item.

A Columns dropdown in the sheet toolbar controls which optional columns are visible — Lead Time, Supplier, Currency, and Notes can be shown or hidden independently. Lead Time and Supplier auto-reveal when existing row data is detected. Each row also has a per-row notes icon: when notes are entered for a row, a pulsing dot appears on the icon as a visual indicator.

A Total column (quantity × unit price) is always visible and recalculates live as rows are edited. TBD rows show "TBD" in the total cell.

A translation workflow has been added to the sheet. Clicking the globe icon reveals a panel with language radios (Spanish, French), a Preview mode that shows original and translated text side by side, a Duplicate as Translated option that creates a new translated copy of the sheet, and a Translate In Place option that replaces the current form values with translated text. Translation uses the MyMemory free API (no key required).

**Help and FAQ updates:** All Help topics have been reviewed and updated to reflect the current UI. Procurement, Pricing Library, image management, and document history topics have been added or rewritten to match v1.9.0 behavior.

## Version 1.8.0 Summary

This release redesigns the payment terms experience, expands the About SantoSync modal with a full product narrative, and aligns the Help & FAQ to reflect the current UI across all three supported languages.

**Structured payment terms selector:** The freeform Terms of Payment text input has been replaced with a purpose-built selector in Step 3. Users now choose from four modes: **Due Immediately** — checks a box that greys out all other options and renders "Payment is due immediately upon receipt" on the document; **Net 15** — automatically aligns the invoice due date to 15 days from the invoice date; **Net 30** — automatically aligns to 30 days; or **Other** — unlocks a day-count field and an optional custom terms text box that auto-generates a terms sentence when left blank. The mode and day count are stored with the document so selections survive reloads and syncs. Legacy documents with freeform terms text are automatically inferred to the nearest mode on load.

**Due-date card display update:** Invoice cards now show "Due Upon Receipt" instead of a calculated date for invoices in Due Immediately mode. Overdue detection still applies — invoices set to immediate payment that remain unpaid past the invoice date show the overdue day count in red.

**About SantoSync narrative:** The About modal now includes a structured product narrative covering what the app does, the problems it solves, and why it exists — giving new users and team members a clear picture of the product's purpose and scope without navigating to external documentation.

**Help & FAQ alignment:** The payment terms FAQ topic has been rewritten across English, Spanish, and French to describe the new selector UI. The outdated "why does the app look more modern?" tip has been replaced with a practical guide to setting due dates automatically using the payment terms modes.

## Version 1.7.0 Summary

This release focuses on language coverage, client drill-down workflows, statement organization, and a cleaner final preview experience.

**Translation coverage audit:** The app now translates a much broader set of runtime UI surfaces across the dashboard, clients page, statements page, settings, account admin, and the final preview flow. This includes section headers, statement filter tabs, client-activity modal copy, account-admin labels, and several render-time empty states that previously stayed in English even after switching to Spanish or French.

**Client directory drill-downs:** The client directory activity tiles are now actionable. Clicking `Quotes`, `Invoices`, `Statements`, `Total Invoiced`, or `Outstanding` opens a focused modal with the relevant records for that client, making it faster to inspect related work without manually filtering the full document list.

**Statement status tabs:** The Statements page now separates saved statements into `Pending`, `Paid`, and `All`. Status is determined from the live outstanding balance of linked invoices, so statements automatically move into the paid tab when their balance reaches zero.

**Step 6 preview expansion:** The quote/invoice final preview now uses the full width of the modal instead of leaving space to a separate right-hand column. Signature and stamp controls remain available in a compact preview toolbar, and mobile now renders the actual preview in place rather than replacing it with a separate launcher card.

## Version 1.6.1 Summary

This release refreshes the app's visual tone so SantoSync feels newer, cleaner, and less old-timey without changing the underlying workflows.

**Typography refresh:** The product now uses a more modern type system with `Manrope` for UI text and `Sora` for headings and branded display moments. This replaces the older serif-heavy look with a sharper, more contemporary voice that feels closer to a clean Helvetica-inspired workspace while still keeping enough personality for SantoSync.

**Visual consistency pass:** The new font pairing carries through the splash screen, sign-in flow, dashboard headings, page headers, brand lockups, and about surfaces so the interface reads as one coherent system instead of mixing modern UI copy with vintage-looking display text.

**Documentation sync:** README, Help & FAQ, and About SantoSync copy now reflect the updated visual direction alongside the recent workflow, payment, and recovery improvements shipped in the previous release updates.

## Version 1.6.0 Summary

This release focuses on workflow clarity, payment controls, responsive layout cleanup, and documentation accuracy.

**Statements layout fit and rendering polish:** The Statements page now keeps its content inside the working column more reliably on laptop-sized screens. The statement export cards wrap their metric and action areas earlier, and the reports layout uses a dedicated width so Payment History, Client Aging, and saved statement rows stay visually contained instead of pushing past the viewport.

**Line-item editor cleanup:** The old cart flow was removed from the quote and invoice line-items step. The table-style editor now stays focused on direct item entry with a single clear `Add Item` action, while reusable pricing and sourced-item details live in the Pricing Library.

**Safer payment deletion:** Logged payments can now be removed intentionally from the Statements page through a dedicated `Delete Payment` action. Deleting either a logged payment or an in-editor payment entry now opens a confirmation modal first, then refreshes balances and reporting immediately after removal so users are not left wondering whether the payment actually changed.

**Help, FAQ, and about-copy alignment:** The in-app Help & FAQ, the About SantoSync copy, and this README now reflect the current behavior: documents save cleanly before print, the document list is more clickable, payment history has stronger controls, backups are broader, and reusable line-item management is consolidated into the Pricing Library.

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

This version brought SantoSync into a more complete shared-workspace release. The app now supports server-backed shared workspace data for online use, invoice payment tracking, a three-state commercial snapshot card, stronger quote-versus-invoice card styling, compact overflow menus for document and line-item actions, per-item image handling across the editor and catalog, a dedicated catalog page, compact export thumbnails for imaged line items, admin issue inbox controls, stronger mobile modal behavior, and a cleaner branded dashboard shell. The quote/invoice workflow, catalog flow, document preview/export flow, and admin tooling all remain intact while the product identity and UI structure are more polished and easier to navigate.

## Dashboard Overview

The SantoSync dashboard (Overview page) is designed around three tiers of financial visibility:

**Snapshot Panel (top)**
A hero stat card displays the current workspace value in large text with the label directly below. The active view cycles between Pipeline Value (quote totals), Amount Invoiced (invoice totals), and Income Received (total logged payments). Secondary counts — total documents and total quotes — appear as a compact inline row below the hero card. When any invoice has an outstanding balance, a red-tinted Outstanding Balance bar appears at the bottom of the snapshot panel showing the total unpaid amount across all invoices.

**Attention Required (middle)**
Two cards appear side-by-side when there are past-due or soon-due invoices, and are hidden entirely when no invoices need attention.

- **Past Due Invoices** lists invoices whose due date has passed and still carry an unpaid balance, sorted by most days overdue first. A running total of the overdue amount appears at the bottom of the card.
- **Coming Due** lists invoices due within the next 7 days (including today), sorted by closest due date first. A running total also appears.

Each row in both cards shows: the outstanding balance and urgency text on the first line (amount large/bold, urgency colored), client name on the second line, and reference number with due date on the third line. Clicking the row opens the invoice in the editor. A secondary notes icon opens the notes drawer for that invoice.

Only invoices with explicit payment terms (NET15, NET30, etc.) or a specific due date set are included in both attention cards. Invoices without payment terms are excluded to prevent false urgency.

**Workspace Summary (bottom)**
A 3-column grid of quick-nav cards provides one-click access to Quotes, Invoices, Offers, Clients, and Statements. Each card shows the count as the primary (large) number with the label below it.

**Recent Documents**
A list of the 5 most recently created or edited documents. Each row shows the reference number with document-type and status badges, the client name and date, and the total amount (or row count for Offers). Each document type uses a distinct left-border color: blue for quotes, green for invoices, purple for offers.

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
- `css/styles.css`: SantoSync UI system, dashboard layout, catalog layouts, document styling, modal patterns, and print/export presentation.
- `js/brand.js`: Centralized brand config, SantoSync logo SVG system, and theme token application.
- `js/app.js`: Session handling, local roles, translations, document workflow, catalog behavior, exports, client persistence, payment tracking, and admin utilities.
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
- Pricing Library (catalog) for reusable sourced items, supplier details, packaging, cost, sell price, and lead-time tracking
- **Product image upload for Pricing Library items** — upload JPEG/PNG/WebP; auto-compressed to max 600px longest side, JPEG quality 0.85; optional crop step before saving; replace or delete from the edit modal at any time
- **Loading states during image processing** — "Optimizing…" status while compressing, "Image ready" after crop or skip; prevent duplicate uploads while processing
- **Catalog card thumbnails** — items with images show a thumbnail on the card instead of initials; items without images show the colored initials bubble; thumbnails use lazy loading
- **Image expand modal** — clicking a catalog card thumbnail or the hero image in the item detail modal opens the image full-size in a lightbox; closes on the close button or backdrop click
- **Catalog item selection and PDF report** — select multiple catalog items using per-card checkboxes; a selection toolbar shows the count and an Export Item Report button; the PDF report shows each item in a 2-column grid with product image (or initials fallback), name, metadata, and unit price
- Line item image support inside the document editor with a visual add-image tile
- Compact overflow menus for line-item editor actions instead of persistent inline action buttons
- **Per-document change history** — every confirmed save generates a timestamped history entry in `doc.changeHistory[]` covering client, date, PO number, payment status, type conversion, total, and item-level diffs; visible in the History tab of the notes drawer; autosaves are excluded
- **Procurement Sheet compact header** — condensed from a stacked 5-field form to a single-strip row (Reference No. · Date · Client/Bid · Currency · Notes)
- **Procurement library combobox** — type-to-filter search replaces the static dropdown; selecting an item inserts it immediately; "Create new item" option opens the catalog modal
- **Procurement column visibility** — Columns dropdown controls Lead Time, Supplier, Currency, and Notes independently; columns auto-reveal when existing row data is detected
- **Procurement per-row notes** — notes icon on each row; pulsing dot appears when notes are entered; click to toggle inline
- **Procurement total column** — quantity × unit price per row; recalculates live; TBD rows show "TBD"
- **Procurement translation workflow** — globe icon opens a translate panel; supports Spanish and French via MyMemory API; Preview, Duplicate as Translated, and Translate In Place modes
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
- Mobile-tuned modal sizing for issue reporting, catalog, and document preview/export flows
- Branded splash, auth, session-loading, about, and dashboard identity
- Branded print/PDF preview output with SantoSync company identity
- Help & FAQ modal with live keyword search, a quick-jump section index, and inline visual button demos rendered using the app's own CSS; all topics reflect the current sidebar-based navigation and current line-item / payment / image / procurement workflows
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
  - catalog items and related catalog metadata, including product images (`itemImageDataUrl`)

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
- Catalog item images are stored as compressed base64 data URLs inside the workspace dataset; images are capped at 600px on the longest side and JPEG quality 0.85, targeting under 150KB per image

## FAQ

**Document Badges**
Every document card shows one or more status badges:

- **Offers** always show an "Offer" badge. They never show "Draft."
- **Quotes** always show their pipeline status: **Draft** (created, not yet sent), **Sent**, **Approved**, or **Rejected.** The pipeline status is independent of whether the document has been explicitly saved.
- **Invoices** show an amber **"Draft"** badge only while the invoice is in a pre-save state (autosaved but not yet explicitly saved by the user). Once saved, invoices show their payment status only: Unpaid, Pending, or Paid.

Internal values such as `status: "logged"` are system-only and are never displayed to users.

---

**How do I add an image to a Pricing Library item?**
Open the Pricing Library and click the item you want to review. The detail modal opens first. Click **Edit Item** inside that modal, then use the "Item Image" upload area to pick a JPEG, PNG, or WebP file. The app compresses it to a maximum of 600px and then shows a crop modal. You can drag the selection handles to trim the image or click "Skip Crop" to accept it as-is. Once confirmed, a small preview thumbnail appears in the modal. Click Save Library Item to persist it.

**How do I browse Pricing Library items?**
Use the Pricing Library search box, category filter, supplier filter, image filter, and sort menu to narrow the list. Switch between Card view and List view from the toolbar. The library shows 25 items per page by default, with 50 and 100 item options, and shows the current range such as "1-25 of 143" below the results.

**How do I edit a Pricing Library item?**
Click any card or list row to open the item detail modal. Review the visible fields, then click **Edit Item** inside the modal. Direct inline editing from cards and rows is intentionally disabled so browsing and editing are separate actions.

**Can I remove or replace a product image?**
Yes. Open the item edit modal. If an image is already set, a remove (trash) button appears next to the upload label. Click the trash button to clear the image, or click the upload label again to replace it with a different file.

**Why is there no image on my catalog card even though I uploaded one?**
Make sure you clicked Save Library Item after the crop step. If you closed the modal without saving, the image was not committed. If you saved and the image disappears after a page reload, check that the workspace sync completed — look for any save-error banners at the top of the screen.

**How do I view a product image at full size?**
Click the thumbnail on any catalog card that has an image — it opens in a full-size expand modal. You can also open the item detail modal by clicking the card title area, and then click the hero image at the top of the detail modal to expand it.

**How do I export a PDF report of selected Pricing Library items?**
Click "Select Items" in the Pricing Library page header. Checkboxes appear on every card. Check the items you want to include, then click "Export Item Report" in the selection toolbar that appears at the top. A letter-size PDF will download with each selected item displayed in a two-column grid showing the product image, name, metadata, and unit price.

**How do I see what changed in a document?**
Open any quote, invoice, or procurement sheet from the documents list. In the editor, click the Notes icon in the toolbar to open the notes drawer, then switch to the History tab. Each entry shows who saved the document, when, and a summary of what changed — including item additions, removals, price and quantity changes, client name, date, total, and payment status changes. Autosaves do not create history entries.

**How does the Notes activity feed work?**
Open the Notes page from the sidebar to scan note activity across documents. The page now uses a timeline-style activity feed grouped by date, with rows collapsed by default so you can review more records at once. Chips summarize common changes like payment status, tags, totals, and procurement row edits. Expand a row to view the full original note history and raw change log details. Document type colors are Invoice = green, Quote = blue, Offer = amber, and Statement = gray.

**How do I use the Procurement Sheet translation feature?**
Open any Procurement Sheet. Click the globe icon in the modal header. Select a target language (Spanish or French), then click Preview to see how the row descriptions and notes would read in translation. From there you can either Duplicate as Translated (creates a new sheet with translated content) or Translate In Place (replaces the current form values with the translated text). Translation uses the MyMemory free API and requires an internet connection.

**How do I control which columns show in the Procurement Sheet?**
Click the Columns button in the sheet toolbar. A dropdown appears with toggles for Lead Time, Supplier, Currency, and Notes. Each can be turned on or off independently. The columns auto-reveal if any existing row already has data in those fields when you open the sheet.

**Where are product images stored?**
Images are stored as base64-encoded JPEG data URLs inside the catalog item record, which is part of the shared workspace dataset saved to Vercel Blob. They are not stored as separate files. The compression step (600px max / JPEG 0.85) keeps each image under approximately 150KB, so typical library sizes remain manageable.

**How do I set payment terms on an invoice?**
In Step 3 of the invoice editor (Terms & Notes), use the payment terms selector. Choose Due Immediately, Net 15, Net 30, or Other. Net 15 and Net 30 automatically set the invoice due date. Other unlocks a day count field and an optional custom terms sentence. The selected mode is saved with the document and shown on the invoice card's due-date line.

**How do I add a client contact with a WhatsApp number?**
Go to Clients in the sidebar. Click Add Client or edit an existing client. Inside the client modal, use the Contacts section to add one or more contacts — each with a name, email, phone number, and a WhatsApp toggle. Save the client. The contacts are visible when you expand the client card in the directory.

**How do I record a payment against an invoice?**
There are three ways: (1) Open the invoice in the editor, go to Step 5 (Payments), and add a payment entry there. (2) On the Statements page, click "+ Log Payment" in the Payment History panel and select the invoice from the picker. (3) Create a Statement of Account, add a deduction, and check "Mark as payment" — saving the statement writes the payment back to the matched invoice automatically.

**How do mobile statement cards work?**
On mobile, saved statements are compact cards with the statement reference/date and Paid or Pending status at the top, the client name as the main two-line label, metric pills for invoice count, total, and outstanding balance, and a horizontal bottom action bar. View is the primary action; Excel export, Notes, Edit, and Delete remain available as equal tap targets without stacking vertically.

**How are client outstanding balances calculated?**
Client balances come from invoices for that client. Paid invoices contribute $0 outstanding. Pending Payment and Unpaid invoices contribute the remaining invoice total after logged payments. Changing an invoice from Pending to Paid lowers the balance immediately; changing it from Paid back to Pending or Unpaid adds the unpaid amount back immediately across the Client Directory, Statements, Payment History, and reporting views.

**How do I back up my workspace data?**
Go to Settings in the sidebar, open the Data Export & Import panel, and click Export Workspace Backup. This downloads a full JSON file covering all documents, clients, user accounts, company profile, catalog items, saved items, and statement exports. You can import it back at any time using the Import option in the same panel.

**What happens to my data when the API is unavailable?**
SantoSync automatically switches to browser-local fallback mode. All reads and writes go to localStorage. When the API becomes available again on the next session, the app syncs the local copies back to the server. No data is lost during offline periods as long as you do not clear browser storage.

**Can multiple people use SantoSync at the same time?**
Yes, with some caveats. All workspace data (catalog, documents, clients, company profile) is stored in a shared Vercel Blob dataset. Multiple users with different accounts can sign in and work simultaneously. However, there is no real-time conflict resolution — if two users edit the same document at the same time, the last save wins. The current role model (Admin / User) is password-based and stored in the shared workspace rather than a dedicated auth service.

## Future Improvements

- Move roles and auth to a stronger shared backend
- Add a richer company profile page with logo upload and legal footer options
- Add configurable exchange rates and tax profiles
- Add reusable brand themes per company/account
- Touch/drag support for the catalog image crop modal (currently mouse-only)
- Excel export for the Pricing Library item report with embedded images
