# Invoice & Quote System

Static web app for creating quotes and invoices, storing them on the server, and exporting branded PDF-ready documents that match the RG Logistics layout.

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
│   └── documents.js
├── package.json
└── README.md
```

## Files

- `index.html`: Main app markup, admin access gate, dashboard, modal editor, and preview containers.
- `css/styles.css`: App UI, modal layout, document preview, and print/export styling.
- `js/app.js`: State management, step flow, server sync, line-item logic, preview rendering, and print export.
- `api/documents.js`: Vercel serverless endpoint for loading and saving quotes and invoices.
- `api/clients.js`: Vercel serverless endpoint for loading and saving saved clients.
- `api/_storage.js`: Shared Vercel Blob storage helpers used by the API routes.
- `package.json`: Runtime dependency declaration for Vercel Blob storage.
- `assets/rg-letterhead.png`: Letterhead used in quote and invoice output.
- `assets/rg-footer-wave.png`: Footer wave image used in document output.
- `assets/david-forman-signature.png`: Signature image used when signature export is enabled.

## Current Workflow

1. Open `index.html` in a browser.
2. Enter the admin access code `Todos123`.
3. Create a new quote or invoice from the dashboard.
4. Move through the five editor steps:
   - `Type & Info`
   - `Client Details`
   - `Line Items`
   - `Items Preview`
   - `Review`
5. Click any step in the step indicator to jump directly to that part of the modal. Forward jumps still respect validation rules.
6. On the last step, inspect the final print preview and export with `Save & Export PDF`.

## Features

- Create, edit, delete, and save quotes and invoices on the server.
- Convert a saved quote into a new invoice while keeping the source quote in history.
- Lock converted source quotes so they remain visible in quote history but can no longer be edited or deleted.
- Search documents by reference number, date, client, type, or tags.
- Add tags to documents for filtering and later lookup.
- Save reusable client records on the server so they remain available across browsers and devices.
- Use a compact line-item editor where each item collapses into a summary row and expands when selected.
- Enter line-item totals in USD by default.
- Optionally enter a line-item total in DOP and convert it automatically to USD using `RD$59 = US$1`.
- Optionally make the unit price field manually editable instead of deriving it from quantity and total.
- Track an internal-only line-item cost and automatically calculate the upcharge percentage.
- Toggle the signature on or off before export.
- Continue quote/invoice numbering from the highest saved document sequence already in the system.
- Adjust the trailing digits of the generated reference number manually when needed.
- Export through the browser print dialog using the branded quote/invoice layout.

## Document Output Notes

- Quotes display `Quote` in the title area.
- Invoices display `Invoice` in the title area.
- The document output uses the RG Logistics letterhead and footer assets from the `assets` folder.
- The printed/exported document remains USD-based even when a line item was entered in DOP.
- Internal-only pricing fields such as internal cost and upcharge percentage are never shown in the printed/exported document.
- Signature output depends on `assets/david-forman-signature.png` and the `Include signature on export` option.

## Conversion Notes

- Converting a quote creates a new working document from that quote's data.
- Before saving the converted document, the user can still change the document type back to `Quote` if needed.
- After the converted document is saved, the original quote remains in quote history as a locked source record.
- Locked source quotes are preserved for reference and cannot be edited or deleted.

## Storage Notes

- Documents and saved clients are loaded and saved through the Vercel `/api` routes.
- The API routes persist data in Vercel Blob storage as JSON snapshots.
- Blob access defaults to `public`; if your Vercel Blob store is private, set `BLOB_ACCESS_MODE=private`.
- Because the data is stored server-side, quotes, invoices, and saved clients can be shared across browsers and devices.
- This setup requires `BLOB_READ_WRITE_TOKEN` to be configured in Vercel for the deployed project.

## Git / Deployment Notes

- This project has been initialized as a local git repository with a `main` branch.
- The intended public repository URL is `https://github.com/ejbronze/invoice-quote-system`.
- The app is now structured for straightforward Vercel static hosting with `index.html` at the site root.
- The deployed app now also depends on Vercel serverless functions in `api/` plus Vercel Blob storage for persistence.
- Because this is a static HTML/CSS/JS app, it remains compatible with other simple static hosting workflows too.

## Print Notes

- The app opens the browser print dialog to generate the PDF.
- Final PDF appearance can still vary slightly by browser or print settings.
- The app is tuned so the preview and print output stay closely aligned, but browser print scaling can still affect the final result.

## Future Improvements

- Add clickable edit anchors inside previews so users can jump straight to the matching editor section.
- Add stronger tag management such as quick-pick suggestions or saved common tags.
- Support configurable exchange rates instead of a fixed `RD$59 = US$1`.
- Add optional duplicate-document actions for quickly reusing a previous quote or invoice.
- Add import/export for saved browser data so documents can be backed up or moved to another device.
