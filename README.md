# Invoice & Quote System

Static web app for creating quotes and invoices, storing them through Vercel API routes, and exporting branded PDF-ready documents.

## Project Structure

```text
.
├── assets/
│   ├── david-forman-signature.png
│   ├── rg-footer-wave.png
│   └── rg-letterhead.png
├── css/
│   └── styles.css
├── index.html
├── js/
│   └── app.js
├── api/
│   ├── _storage.js
│   ├── clients.js
│   ├── debug-blob-write.js
│   ├── debug-blob.js
│   ├── documents.js
│   ├── legacy-pdf.js
│   └── upload-legacy-pdf.js
├── package.json
└── README.md
```

## Core Files

- `index.html`: Sign-in gate, admin tools modal, dashboard, document editor, and preview containers.
- `css/styles.css`: Dashboard layout, admin tools UI, editor styling, and print/export presentation.
- `js/app.js`: Session state, local role handling, document/client persistence, modal workflow, and preview/export logic.
- `api/documents.js`: Vercel endpoint for loading and saving quotes and invoices.
- `api/clients.js`: Vercel endpoint for loading and saving the shared saved-client list.
- `api/_storage.js`: Shared Vercel Blob helpers for the API layer.

## Roles

This app now has a simple local role model stored in browser storage on each device:

- `Admin`: Can use workspace tools, manage users, manage saved clients, import/export backups, use local test utilities, and see who created each quote or invoice.
- `User`: Can sign in, create and edit quotes/invoices, save clients from the editor flow, and use normal day-to-day document features without admin-only tools.

The seeded default admin account in code is:

- Username: `admin`
- Password: `Todos123`

Because the current role system is browser-local, user accounts created on one device do not automatically appear on another device yet.

## Current Workflow

1. Open the app through Vercel or a local web server.
2. Sign in with a local account.
3. Use `New Quote` or `New Invoice` from the dashboard.
4. Move through the six editor steps:
   - `Type & Info`
   - `Client Details`
   - `Line Items`
   - `Keywords`
   - `Items Preview`
   - `Review`
5. Use the calculator launcher from inside the document editor whenever you need quick math during document entry.
6. Save the document or use `Save & Preview PDF` on the review step.
7. From the dashboard, edit, preview, convert, search, sort, filter, or delete saved records.

## Features

- Create, edit, delete, and save quotes and invoices.
- Convert a saved quote into an invoice while keeping the source quote as a locked history record.
- Save reusable client records and reuse them from the editor.
- Admin-only client management from the dashboard tools area, including viewing, editing, and deleting saved clients.
- Admin-only user management for adding local users, resetting passwords, and removing local users.
- Admin-only document attribution showing which signed-in user created each quote or invoice.
- A streamlined top navbar showing the signed-in user, a hamburger menu for `Settings` and `Sign out`, and an admin-only mailbox icon for incoming issue reports.
- Search documents by reference number, date, client, type, or keyword.
- Sort documents by document date or created/exported date.
- Open the floating calculator from inside the document editor while preparing quotes and invoices. The widget stays above the editor modal so it remains usable during document entry.
- Export a CSV template and import bulk document rows.
- Export full JSON backups and import JSON backups.
- Export selected quotes/invoices as JSON.
- Fall back to browser-local test mode automatically if the API is unavailable.
- Clear browser-only local test data without touching server data.
- Manual or calculated line-item pricing, DOP conversion support, internal pricing toggle, and keyword suggestions.
- PDF preview window with print/save handled from the preview itself.
- Footer branding for Palmchat Innovations Lab / Palmchat Innovations LLC NYC with a `Submit / Report Issues` flow for users.
- Issue report modal with optional screenshot attachment and an admin inbox for reviewing submitted bug reports.

## Admin Tools

Admin tools currently live in the dashboard `Tools` modal and include:

- User management
- Client record management
- Editor preferences
- CSV import/export tools
- JSON backup import/export
- Selective JSON export
- Local testing utilities

## Storage Notes

- Documents and clients are loaded and saved through `/api/documents` and `/api/clients`.
- The API routes persist server data in Vercel Blob storage as JSON snapshots.
- If the API is unavailable, the app switches to browser-local mode for testing.
- Browser-local test data can be cleared without affecting live server data.
- Browser-local user accounts and roles are separate from the server-backed document/client data.
- The issue-report inbox is currently browser-local as well, so reports are not yet shared across devices until a server-backed reporting layer is added.

## Output Notes

- Quotes and invoices use the branded RG letterhead/footer assets from `assets/`.
- Printed/exported documents remain USD-based even when a line item was entered in DOP.
- Internal pricing fields never appear in the printed/exported document.
- PO numbers are omitted from the final preview/output when empty or `N/A`.
- Invoice output shows `Bill To` and `Consignee` side by side when applicable.
- Quote output uses `For:` and `Reference No.` and omits consignee details from the final document.

## Deployment Notes

- The app can run as a static HTML/CSS/JS site with Vercel serverless functions in `api/`.
- Server persistence requires the Vercel Blob token to be configured.
- The local role model is currently client-side only, so a future backend auth layer would be needed for true multi-device account management.

## Future Improvements

- Move from browser-local roles to real shared authentication and server-backed user management.
- Add stronger admin reporting for document activity and recent user actions.
- Add configurable exchange rates instead of the fixed DOP/USD value.
- Add duplicate-document actions for quickly reusing previous work.
