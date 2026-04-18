# SantoSync

SantoSync is a premium quote-and-invoice workspace for modern trade teams. It combines document creation, client history, per-user preferences, admin tools, and branded export output in one polished operational dashboard.

Version: `1.1.0` — Last updated: April 17, 2026

## Version 1.1.0 Summary

This release focuses on UI consistency, navigation improvements, and help system upgrades.

Document cards now use the same icon-button system introduced for statement rows: a filled blue eye icon opens the PDF preview and a ghost-blue pencil icon opens the editor — both with animated tooltip labels on hover, matching the visual language of the statements panel exactly. The edit button inside the PDF preview popup window has been fixed; it now correctly navigates back to the editor with the document loaded.

The Statements tab has been restructured to render inline within the main dashboard section. The filter tabs (All / Quotes / Invoices / Statements) remain visible at all times, so switching between document types feels like a true tab panel rather than a page transition. The separate "Back to Documents" button has been removed — any other tab takes you back naturally.

The Help & FAQ modal has been fully upgraded: it now opens with a live search bar that filters topics as you type, a quick-jump index of pill-style section links, and inline visual demonstrations of the actual action buttons (rendered using the app's own CSS, so they look exactly as they do in the workspace). New help topics cover the Document Cards section, the PDF preview workflow, the Statements tab, and data backup/restore.

The footer "Updated" date now reflects April 17, 2026.

## Version 1.0.0 Summary

This version brought SantoSync into a more complete shared-workspace release. The app now supports server-backed shared workspace data for online use, invoice payment tracking, a three-state commercial snapshot card, stronger quote-versus-invoice card styling, compact overflow menus for document and line-item actions, a more refined pending-items cart flow, per-item image handling across the editor and cart, a dedicated catalog page, compact export thumbnails for imaged line items, admin issue inbox controls, stronger mobile modal behavior, and a cleaner branded dashboard shell. The quote/invoice workflow, cart behavior, catalog flow, document preview/export flow, and admin tooling all remain intact while the product identity and UI structure are more polished and easier to navigate.

## Brand Identity

- Name: `SantoSync`
- Positioning: Premium workflow sync for quotes, invoices, and trade operations
- Core feel: Coordinated, modern, calm, and reliable
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
│   └── brand.js
├── api/
│   ├── _storage.js
│   ├── clients.js
│   ├── debug-blob-write.js
│   ├── debug-blob.js
│   ├── documents.js
│   ├── legacy-pdf.js
│   ├── workspace.js
│   └── upload-legacy-pdf.js
├── package.json
└── README.md
```

## Core Files

- `index.html`: App shell, auth screens, dashboard, editor flow, admin tools, issue reporting, and company profile surface.
- `css/styles.css`: SantoSync UI system, dashboard layout, catalog and cart layouts, document styling, modal patterns, and print/export presentation.
- `js/brand.js`: Centralized brand config, SantoSync logo SVG system, and theme token application.
- `js/app.js`: Session handling, local roles, translations, document workflow, catalog/cart behavior, exports, client persistence, and admin utilities.
- `api/documents.js`: Vercel API route for saving and loading quotes and invoices.
- `api/clients.js`: Vercel API route for saving and loading shared client records.
- `api/workspace.js`: Vercel API route for saving and loading shared workspace state.
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

Admins can manage a Company Profile inside the app. This profile is used in quote and invoice outputs.

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

- `Admin`: Can access settings, company profile, user management, client management, imports/exports, local test tools, issue inbox, and admin-only visibility such as creator attribution.
- `User`: Can sign in, create quotes/invoices, edit documents, save clients, and use the normal workspace without admin-only controls.

Default seeded admin account:

- Username: `admin`
- Password: `Todos123`

When the app is online with the API available, user accounts are stored in the shared workspace dataset so they can be seen across devices. During local-only testing, they fall back to browser storage.

## Main Features

- Create, edit, delete, and convert quotes and invoices
- Daily reference numbering using the app’s document naming convention
- Reference numbering resolves against the selected local document date and checks existing same-day refs before choosing the next sequence
- Admin-only user management
- Admin-only client record management
- Admin-only company profile management
- Per-user language preferences for English, Spanish, and French
- Client profiles that preserve bill-to and consignee details, including saved client switching in the editor
- Pending items cart with a dedicated create-item popup
- Pending items cart with visual item cards, a header action pill, document-insert controls, direct image upload from the cart list, compact cart item editing, and cart item image editing
- Catalog page that aggregates items captured from quotes, invoices, and cart records, with support for manually added catalog entries
- Line item image support inside the document editor with a visual add-image tile
- Compact overflow menus for line-item editor actions instead of persistent inline action buttons
- Issue reporting with optional screenshot upload
- Admin issue inbox with delete controls
- Local fallback mode when the API is unavailable
- JSON backup, restore, and selective export tools
- CSV template export and CSV import
- Calculator inside the document editor
- Compact dashboard actions and snapshot strip
- Document cards use stronger quote/invoice color separation plus text badges for `Draft` / `Logged`
- Invoice cards support `Paid` / `Unpaid` / `Pending` status badges and a menu action for payment tracking
- The top commercial snapshot value card cycles through `Pipeline Value`, `Amount Invoiced`, and `Income Received`
- Document cards use icon-based action buttons (eye for PDF preview, pencil for edit) with animated tooltip labels on hover, visually consistent with the statement rows
- Document card icon buttons use the same `statement-action-btn` style class system introduced for statement rows, keeping the visual language unified across the dashboard
- The PDF preview popup window’s Edit button now correctly navigates back to the editor with the document loaded
- Quote and invoice menus intentionally differ so payment actions appear only on invoices
- The Statements tab renders inline within the main dashboard — the filter tab bar stays visible while browsing statements, behaving like a true tab panel
- Statement rows show the same open/edit/delete icon buttons as document cards for a unified control language across the app
- Mobile-tuned modal sizing for cart, issue reporting, and document preview/export flows
- Branded splash, auth, session-loading, about, and dashboard identity
- Branded print/PDF preview output with SantoSync company identity
- Help & FAQ modal with live keyword search, a quick-jump section index, and inline visual button demos rendered using the app’s own CSS

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
  - saved client records persist `name`, `address`, `consigneeName`, and `consigneeAddress`
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
