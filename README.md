# SantoSync

SantoSync is a premium quote-and-invoice workspace for modern trade teams. It combines document creation, client history, per-user preferences, admin tools, and branded export output in one polished operational dashboard.

Version: `1.0.0`

## Version 1.0.0 Summary

This version brings SantoSync into a more complete shared-workspace release. The app now supports server-backed shared workspace data for online use, a more refined pending-items cart flow, per-item image handling across the editor and cart, compact export thumbnails for imaged line items, admin issue inbox controls, stronger mobile modal behavior, and a cleaner branded dashboard shell. The quote/invoice workflow, cart behavior, document preview/export flow, and admin tooling all remain intact while the product identity and UI structure are more polished and easier to navigate.

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
- `css/styles.css`: SantoSync UI system, dashboard layout, document styling, modal patterns, and print/export presentation.
- `js/brand.js`: Centralized brand config, SantoSync logo SVG system, and theme token application.
- `js/app.js`: Session handling, local roles, translations, document workflow, exports, client persistence, and admin utilities.
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
- Reference numbering now resolves against the selected local document date and checks existing same-day refs before choosing the next sequence
- Admin-only user management
- Admin-only client record management
- Admin-only company profile management
- Per-user language preferences for English, Spanish, and French
- Client profiles that also preserve consignee name and address
- Pending items cart with a dedicated create-item popup
- Pending items cart with visual item cards, a header action pill, document-insert controls, direct image upload from the cart list, and cart item image editing
- Line item image support inside the document editor with a visual add-image tile
- Issue reporting with optional screenshot upload
- Admin issue inbox with delete controls
- Local fallback mode when the API is unavailable
- JSON backup, restore, and selective export tools
- CSV template export and CSV import
- Calculator inside the document editor
- Compact dashboard actions and snapshot strip
- Document cards use compact top-left state indicators instead of full draft/logged pills
- Mobile-tuned modal sizing for cart, issue reporting, and document preview/export flows
- Branded splash, auth, session-loading, about, and dashboard identity
- Branded print/PDF preview output with SantoSync company identity

## Document Output Rules

- Quotes use `For:` and `Reference No.`
- Quotes do not render consignee information in final output
- Invoices can render `Bill To` and `Consignee`
- PO numbers are omitted when blank or set to `N/A`
- Line item images are saved with the document and render as a compact export column when at least one item includes an uploaded image
- Printed/exported documents use the active Company Profile identity
- Internal-only pricing fields never appear in the exported document
- PDF preview opens first, and printing happens from that preview window

## Local Storage vs Server Storage

Server-backed:

- Quotes and invoices through `/api/documents`
- Shared saved clients through `/api/clients`
- Shared workspace state through `/api/workspace`
  - user accounts and roles
  - issue inbox/reporting
  - company profile
  - pending items cart
  - cart item images and related shared cart metadata

Browser-local:

- Current signed-in session
- Local fallback copies of workspace data when the API is unavailable
- Local fallback test documents/clients when the API is unavailable

## Local Development

Run a static local server for safe UI testing:

```bash
python3 -m http.server 3000
```

Then open:

```text
http://127.0.0.1:3000
```

When the API is unavailable, SantoSync automatically switches to browser-local test mode.

## Deployment Notes

- The app is a static HTML/CSS/JS frontend with Vercel serverless functions in `api/`
- Persistent server data depends on Vercel Blob configuration
- Shared workspace data now syncs online through `/api/workspace`
- The active signed-in session still remains browser-local by design
- A future backend auth layer would still be needed for stronger account security and password management

## Future Improvements

- Move roles and auth to a stronger shared backend
- Add a richer company profile page with logo upload and legal footer options
- Add document activity history and admin reporting
- Add configurable exchange rates and tax profiles
- Add reusable brand themes per company/account
