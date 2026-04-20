const state = {
    currentStep: 1,
    currentDocType: "quote",
    itemCounter: 0,
    documents: [],
    clients: [],
    editingDocumentId: null,
    convertingFromQuoteId: null,
    activeFilter: "all",
    searchQuery: "",
    sortOrder: "ref_date_desc",
    valueView: "pipeline",
    calculatorExpression: "0",
    isCalculatorOpen: false,
    isDraggingCalculator: false,
    calculatorDragOffsetX: 0,
    calculatorDragOffsetY: 0,
    isBootstrapping: false,
    isAuthenticating: false,
    inactivityTimerId: null,
    currentLanguage: "en",
    currentUser: null,
    userAccounts: [],
    showInternalPricing: false,
    dataMode: "server",
    workspaceDataMode: "server",
    runtimeMode: "unknown",
    activePage: "overview",
    issueReports: [],
    companyProfile: null,
    exchangeRateUsdToDop: 59,
    savedItems: [],
    catalogItems: [],
    statementExports: [],
    sessionLogs: [],
    activityLogs: [],
    editingSavedItemId: null,
    editingCatalogItemId: null,
    editingStatementExportId: null,
    pendingSavedItemImageUploadId: null,
    openItemMenuId: null,
    openDocumentMenuId: null,
    draftAutosaveTimerId: null,
    editingManagedUserId: null,
    highlightedSavedItemId: null,
    documentEditorBaseline: "",
    documentEditorDirty: false,
    mobileOverviewCollapsed: true,
    selectedInvoiceReportIds: [],
    statementExportInProgress: false,
    statementExportStep: 1
};

const DOP_PER_USD = 59;
const DEFAULT_PAYMENT_TERMS = "NET15 : Full payment for goods or services is due within 15 calendar days of the invoice date, aligned with shipping or completion.";
const DEFAULT_ADMIN_USER = Object.freeze({
    id: "admin-root",
    username: "admin",
    displayName: "Admin",
    email: "admin@santosync.com",
    password: "Todos123",
    role: "admin",
    language: "en",
    accessLevel: "workspace",
    parentUserId: ""
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
    parentUserId: ""
});
const USER_ACCOUNTS_STORAGE_KEY = "todosUserAccounts";
const CURRENT_SESSION_STORAGE_KEY = "todosCurrentSession";
const ISSUE_REPORTS_STORAGE_KEY = "todosIssueReports";
const COMPANY_PROFILE_STORAGE_KEY = "santosyncCompanyProfile";
const SAVED_ITEMS_STORAGE_KEY = "santosyncSavedItems";
const CATALOG_ITEMS_STORAGE_KEY = "santosyncCatalogItems";
const STATEMENT_EXPORTS_STORAGE_KEY = "santosyncStatementExports";
const SESSION_LOGS_STORAGE_KEY = "santosyncSessionLogs";
const ACTIVITY_LOGS_STORAGE_KEY = "santosyncActivityLogs";
const DEFAULT_ACCESS_ERROR_MESSAGE = "That username or password is incorrect. Try again.";
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
const BRAND_SPLASH_MIN_MS = 1100;
const LOCAL_DOCUMENTS_STORAGE_KEY = "todosLocalDocuments";
const LOCAL_CLIENTS_STORAGE_KEY = "todosLocalClients";
const KEYWORD_STOP_WORDS = new Set([
    "a", "an", "and", "at", "by", "for", "from", "in", "into", "of", "on", "or", "per",
    "the", "to", "with", "without", "service", "services", "charge", "charges", "item",
    "items", "fee", "fees", "shipment", "shipments", "cargo", "client", "invoice", "quote"
]);
const LANGUAGE_LOCALES = {
    en: "en-US",
    es: "es-DO",
    fr: "fr-FR"
};
const APP_LAST_UPDATED = "2026-04-17T12:00:00";
const BRAND = window.SANTO_BRAND || {
    name: "SantoSync",
    studioName: "Palmchat Innovations Lab",
    legalName: "Palmchat Innovations LLC NYC",
    developerName: "Edwin Jaquez",
    tagline: "Premium workflow sync for quotes, invoices, and trade operations.",
    heroTitle: "Trade documents, tuned to move with you.",
    heroCopy: "Build premium quotes and invoices, keep teams aligned, and move client-facing paperwork through one polished operational workspace.",
    onboardingTitle: "Enter SantoSync",
    onboardingCopy: "Sign in to prepare polished quotes, confident invoices, and a more unified back-office workflow.",
    sessionTitle: "Opening SantoSync",
    sessionMessage: "Signing in and syncing your operational workspace...",
    aboutMeaning: "SantoSync is a coined product name designed to feel premium, steady, and coordinated.",
    aboutProduct: "SantoSync is a modern document and operations workspace for teams that need quotes, invoices, company identity, and day-to-day workflow details to stay aligned.",
    aboutDeveloper: "Created by Edwin Jaquez through Palmchat Innovations Lab under Palmchat Innovations LLC NYC."
};
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
const TRANSLATIONS = {
    en: {
        language_name: "English",
        role_admin: "Admin",
        role_user: "User",
        login_kicker: "Workspace Sign In",
        login_title: BRAND.onboardingTitle,
        login_copy: BRAND.onboardingCopy,
        username: "Username or Email",
        username_placeholder: "Enter username or email",
        password: "Password",
        password_placeholder: "Enter password",
        login_error: "That username or password is incorrect. Try again.",
        sign_in: "Sign In",
        session_loader_kicker: "Loading Session",
        session_loader_title: BRAND.sessionTitle,
        session_loader_message: BRAND.sessionMessage,
        workspace: "Workspace",
        dashboard_title_top: BRAND.name,
        end_session: "End Session",
        sign_out: "Sign out",
        settings: "Settings",
        issue_inbox: "Service Reports",
        report_issue: "Report an Issue",
        issue_report_copy: "Share a bug, broken workflow, or visual issue and attach a screenshot if it helps explain the problem.",
        issue_summary: "Issue Summary",
        issue_summary_placeholder: "What went wrong?",
        issue_details: "Details",
        issue_details_placeholder: "Tell us what you were doing, what you expected, and what happened instead.",
        attach_screenshot: "Attach Screenshot",
        attach_screenshot_help: "Optional. A screenshot can make layout and bug reports much easier to review.",
        submit_report: "Submit Report",
        issue_inbox_copy: "Bug reports and service logs appear here for admins to review, annotate, and close when resolved.",
        no_issue_reports: "No reports yet.",
        submitted_by: "Submitted by",
        screenshot: "Screenshot",
        delete_report: "Delete report",
        issue_open: "Open",
        issue_closed: "Closed",
        close_report: "Close report",
        reopen_report: "Reopen report",
        issue_admin_notes: "Admin Notes",
        issue_admin_notes_placeholder: "Add internal notes, follow-up details, or a resolution summary.",
        save_notes: "Save notes",
        issue_notes_saved: "Notes saved.",
        new_report: "New",
        catalog: "Catalog",
        catalog_heading: "Catalog",
        catalog_copy: "Review every item captured from quotes, invoices, and the cart, and add manual catalog records for future use.",
        add_catalog_item: "Add Catalog Item",
        no_catalog_items: "No catalog items yet.",
        item_name: "Item Name",
        price: "Price",
        item_details: "Details",
        item_notes: "Notes",
        date_updated: "Date Updated",
        category: "Category",
        brand: "Brand",
        unit_size: "Unit Size",
        vendor: "Vendor",
        source: "Source",
        source_manual: "Manual",
        source_cart: "Cart",
        source_document: "Document",
        save_catalog_item: "Save Catalog Item",
        update_catalog_item: "Update Catalog Item",
        report_submitted_success: "Report submitted successfully.",
        report_required_error: "Add a summary and details before submitting.",
        report_delete_confirm: "Delete this issue report?",
        footer_credit_line: `Built by ${BRAND.developerName} at ${BRAND.studioName}, under ${BRAND.legalName}.`,
        footer_report_cta: "Submit / Report Issues",
        about_veloris: `About ${BRAND.name}`,
        about_brand_meaning: BRAND.aboutMeaning,
        about_product_copy: BRAND.aboutProduct,
        about_developer_copy: BRAND.aboutDeveloper,
        company_profile: "Company Profile",
        company_profile_copy: "Business identity details saved here appear in quotes, invoices, and export views.",
        company_name: "Company Name",
        company_tagline: "Tagline",
        company_address: "Address",
        company_email: "Email",
        company_phone: "Phone",
        company_website: "Website",
        company_tax_id: "Tax / Registration",
        save_company_profile: "Save Company Profile",
        company_profile_saved: "Company profile saved.",
        saved_items: "Pending Items Cart",
        saved_items_copy: "Keep requested items here until you are ready to pull them into a quote or invoice.",
        add_saved_item: "Add To Cart",
        add_saved_item_copy: "Capture items that are not yet tied to a quote or invoice.",
        saved_items_library: "Cart Items",
        saved_items_library_copy: "Add an item to the open document, or remove it from the cart if it is no longer pending.",
        item_description: "Item Description",
        unit_price_usd: "Unit Price (USD)",
        total_usd: "Total (USD)",
        save_item: "Create Cart Item",
        add_cart_item: "Add New Item To Cart",
        update_cart_item: "Update Cart Item",
        use_item: "Add To Document",
        save_for_later: "Move Line Item to Cart",
        no_saved_items: "No items in the cart yet.",
        saved_item_added: "Item moved to the cart.",
        saved_item_updated: "Cart item updated.",
        saved_item_used: "Cart item added to this document.",
        save_item_before_remove: "Move this line item to the cart before removing it?",
        open_pending_cart: "Open pending items cart",
        item_image: "Item Image",
        upload_item_image: "Upload item image",
        remove_item_image: "Remove image",
        menu: "Menu",
        language: "Language",
        hero_kicker: "Document Workspace",
        hero_title: BRAND.heroTitle,
        hero_copy: BRAND.heroCopy,
        new_quote: "New Quote",
        new_invoice: "New Invoice",
        invoice_reports: "Invoice Reports",
        statements: "Statements",
        statements_copy: "Open previously generated Statement of Account exports and keep them alongside the rest of your workspace output.",
        no_statements: "No statements generated yet.",
        open_statement: "Open Statement",
        invoice_reports_copy: "Review invoice totals by client, switch between unpaid, pending, and paid invoices, and keep the list sorted by client.",
        export_report_csv: "Export CSV",
        select_visible_reports: "Select Visible",
        clear_selection_reports: "Clear Selection",
        selection_tab: "Selection",
        export_tab: "Export",
        print_selected_reports: "Print Selected",
        open_statement_export: "Export Statement of Account PDF",
        review_selected_statement: "Step 2: Review Statement",
        export_selected_csv: "Export Selected as CSV",
        statement_of_account_title: "Statement of Account Export",
        statement_of_account_copy: "Review the selected invoices before opening the print-ready PDF statement.",
        statement_no_selection: "No invoices selected",
        statement_selection_help: "Select invoices from a single client to prepare a statement.",
        statement_selected_value: "Selected value",
        statement_outstanding_balance: "Outstanding balance",
        statement_generate_pdf: "Generate PDF",
        statement_export_success: "Statement of Account preview opened. Use Print or Save as PDF to finish the export.",
        statement_mixed_clients_error: "Select invoices for one client at a time before exporting a statement.",
        statement_popup_error: "Please allow pop-ups to export the statement PDF.",
        statement_select_first_error: "Select at least one invoice before exporting a statement.",
        statement_csv_success: "Selected invoices exported as CSV.",
        open_service_reports: "Open Service Reports",
        report_select: "Select",
        report_print_title: "Invoice Report",
        report_print_selected_empty: "Select at least one invoice from the invoice reports list before printing.",
        report_from: "From",
        report_to: "To",
        import_status_default: "Use JSON backup tools to restore deleted records or move data between environments.",
        snapshot: "Snapshot",
        documents: "Documents",
        quote_singular: "Quote",
        invoice_singular: "Invoice",
        quotes: "Quotes",
        invoices: "Invoices",
        date_label: "Date",
        quantity: "Quantity",
        total: "Total",
        status_draft: "Draft",
        status_logged: "Logged",
        created_by: "Created by",
        converted_source: "Converted Source",
        legacy_pdf_attached: "Legacy PDF Attached",
        locked_after_conversion: "Locked after conversion",
        open_pdf_preview: "Open PDF Preview",
        view_pdf: "View PDF",
        convert_to_invoice: "Convert to Invoice",
        convert_to_quote: "Convert to Quote",
        payment_paid: "Paid",
        payment_pending: "Pending Payment",
        payment_unpaid: "Unpaid",
        mark_as_paid: "Mark As Paid",
        mark_as_pending: "Mark As Pending",
        mark_as_unpaid: "Mark As Unpaid",
        report_pending: "Pending",
        local_mode: "LOCAL MODE",
        live_read_local_write: "LIVE READ / LOCAL WRITE",
        test_mode: "TEST MODE",
        pipeline_value: "Pipeline Value",
        amount_invoiced: "Amount Invoiced",
        income_received: "Income Received",
        tap_view_invoiced: "Tap to view invoiced amount",
        tap_view_income: "Tap to view income received",
        tap_view_pipeline: "Tap to view pipeline value",
        documents_heading: "Documents",
        documents_subtitle: "Open, sort, filter, and manage every quote and invoice from one coordinated workspace.",
        sort: "Sort",
        search: "Search",
        search_placeholder: "Search by ref, date, client, type, or keyword",
        sort_ref_date_desc: "Reference: Newest First",
        sort_ref_date_asc: "Reference: Oldest First",
        sort_date_desc: "Date: Newest First",
        sort_date_asc: "Date: Oldest First",
        sort_created_desc: "Created: Newest First",
        sort_created_asc: "Created: Oldest First",
        sort_client_asc: "Client: A to Z",
        sort_client_desc: "Client: Z to A",
        filter_all: "All",
        no_date: "No date",
        unknown_client: "Unknown client",
        empty_documents: "No documents yet. Create your first quote or invoice!",
        empty_documents_filtered: "No documents match your current search or filter.",
        tools: "Tools",
        tools_copy: "Use admin tools to manage users, clients, imports, backups, and local testing.",
        user_management: "User Management",
        user_management_copy: "Create local accounts, assign roles, reset passwords, and remove users who should not access the workspace.",
        display_name: "Display Name",
        display_name_placeholder: "For example, David",
        temp_password: "Temporary Password",
        temp_password_placeholder: "Create a password",
        role: "Role",
        add_user: "Add User",
        no_users: "No users have been added yet.",
        current_session: "Current session",
        reset_password: "Reset Password",
        delete: "Delete",
        client_records: "Client Records",
        client_records_copy: "View all saved clients, update their details, or remove outdated entries from the shared client list.",
        no_clients: "No saved clients yet.",
        edit: "Edit",
        editor_preferences: "Editor Preferences",
        editor_preferences_copy: "Choose which optional fields should appear while your team prepares documents.",
        show_internal_pricing: "Show internal pricing fields in line items",
        csv_tools: "CSV Tools",
        csv_tools_copy: "Download the spreadsheet template or import rows to create multiple documents at once.",
        export_csv_template: "Export CSV Template",
        import_csv: "Import CSV",
        json_backup: "JSON Backup",
        json_backup_copy: "Export a full backup or restore documents and clients from a JSON file.",
        export_backup: "Export Backup",
        import_backup: "Import Backup",
        selective_export: "Selective Export",
        selective_export_copy: "Open the export window and choose only the quotes or invoices you want in the JSON file.",
        export_selected_json: "Export Selected JSON",
        local_testing: "Local Testing",
        local_testing_copy: "Clear browser-only test data without affecting any server data.",
        clear_local_test_data: "Clear Local Test Data",
        export_json_title: "Export JSON",
        export_json_copy: "Choose the records you want to include in this export file.",
        select_all_documents: "Select all documents",
        download_selected_json: "Download Selected JSON",
        no_documents_export: "No documents available to export.",
        type_info: "Type & Info",
        client_details: "Client Details",
        line_items: "Line Items",
        keywords: "Keywords",
        items_preview: "Items Preview",
        review: "Review",
        current_step: "Current Step",
        previous: "Previous",
        next: "Next",
        save_draft: "Save Draft",
        save_changes: "Save Changes",
        save_preview_pdf: "Open Print Preview",
        document_summary: "Document Summary",
        ref_pending: "Ref pending",
        date_pending: "Date pending",
        client: "Client",
        no_client_selected: "No client selected",
        choose_or_enter_client: "Choose or enter a client to continue.",
        choose_or_add_client: "-- Choose or Add Client --",
        other_manual: "Other (manual entry)",
        commercial_snapshot: "Commercial Snapshot",
        items: "Items",
        subtotal: "Subtotal",
        no_keywords: "No keywords yet",
        pdf_options: "PDF Options",
        include_signature: "Include signature on export",
        include_signature_help: "Turn this off for unsigned quotes or invoices before opening the PDF preview.",
        include_stamp: "Include stamp on export",
        include_stamp_help: "Adds a small company stamp overlay near the signature without changing the document layout.",
        workflow_tip: "Workflow Tip",
        workflow_tip_copy: "Keep line items concise and use keywords like destination, service type, or priority to make search much easier later.",
        report_client: "Client",
        report_status: "Status",
        report_ref: "Reference",
        report_date: "Date",
        report_total: "Total",
        report_total_invoices: "Invoices",
        report_total_clients: "Clients",
        report_total_paid: "Paid",
        report_total_unpaid: "Unpaid",
        report_total_pending: "Pending",
        report_no_invoices: "No invoices yet.",
        report_no_matches: "No invoices match this report filter.",
        help_title: "Help & FAQ",
        help_search_placeholder: "Search help topics\u2026",
        help_no_results: "No results found. Try a different keyword.",
        help_idx_getting_started: "Getting Started",
        help_idx_documents: "Documents",
        help_idx_document_cards: "Document Cards",
        help_idx_clients: "Clients & Statements",
        help_idx_tips: "Tips & Shortcuts",
        help_sec_getting_started: "Getting Started",
        help_sec_documents: "Documents & Exporting",
        help_sec_document_cards: "Document Cards",
        help_sec_clients: "Clients & Statements",
        help_sec_tips: "Tips & Shortcuts",
        help_q_create_doc: "How do I create a new quote or invoice?",
        help_a_create_doc: "From the home screen, click <strong>New Quote</strong> or <strong>New Invoice</strong> in the top toolbar. The editor opens in a step-by-step flow \u2014 fill in document details, client info, line items, keywords, then review before exporting.",
        help_q_edit_doc: "How do I edit an existing document?",
        help_a_edit_doc: "Click the <strong>pencil icon</strong> on any document card, or click <strong>Edit</strong> inside the PDF preview window. The editor reopens with all fields intact and ready to update.",
        help_vl_edit_btn: "Edit button",
        help_vc_edit: "Edit",
        help_q_company_profile: "How do I set up my company profile?",
        help_a_company_profile: "Open <strong>Tools</strong> from the top toolbar, then click <strong>Open Company Profile</strong>. Your name, address, logo, letterhead, and payment info will appear on every document you generate.",
        help_q_diff_quote_invoice: "What is the difference between a Quote and an Invoice?",
        help_a_diff_quote_invoice: "A <strong>Quote</strong> is a price estimate sent before work begins. An <strong>Invoice</strong> is a formal payment request issued after work is completed or goods are delivered. You can switch between the two in Step 1 of the editor.",
        help_q_export_pdf: "How do I export a document to PDF?",
        help_a_export_pdf: "Click the <strong>eye icon</strong> on any document card to open the PDF preview window, then use your browser\u2019s print dialog to save as PDF. You can also reach the preview from <strong>Step 6 \u2013 Final Preview</strong> inside the editor.",
        help_vl_pdf_preview: "Open PDF preview",
        help_vc_preview_pdf: "Preview PDF",
        help_q_reuse_items: "Can I save line items to reuse later?",
        help_a_reuse_items: "Yes. In Step 3, use the cart icon next to <strong>Add Item</strong> to open your saved items. Any item saved from a previous document appears there and can be added with one click. The Catalog page aggregates all captured items across documents.",
        help_q_payment_terms: "How do I add or update payment terms?",
        help_a_payment_terms: "Scroll to the <strong>Document Notes &amp; Terms</strong> panel at the bottom of Step 3. The <strong>Terms of Payment</strong> field is pre-filled with a NET 15 default \u2014 update it to match your agreement.",
        help_q_backup: "How do I back up or restore my data?",
        help_a_backup: "Open <strong>Tools</strong> and use the <strong>JSON Backup</strong> option to export a full snapshot of your documents and clients. Use <strong>JSON Restore</strong> to import a previously saved backup. CSV import is also available for bulk document creation.",
        help_q_action_icons: "What do the action icons on document cards do?",
        help_a_action_icons: "Each card shows two icon buttons on the right. The <strong>eye icon</strong> opens the PDF preview in a new window. The <strong>pencil icon</strong> opens the document in the editor. A three-dot menu gives access to additional actions like payment status, type conversion, and delete.",
        help_vl_card_actions: "Card action buttons",
        help_q_pdf_preview: "How do I use the PDF preview window?",
        help_a_pdf_preview: "The preview window shows the print-ready document. Use <strong>Print</strong> to open your browser\u2019s print dialog and save as PDF. Use <strong>Edit</strong> to jump back to the editor with the document loaded. <strong>Close Preview</strong> dismisses the window.",
        help_q_filter_docs: "How do I filter documents by type?",
        help_a_filter_docs: "Use the <strong>All / Quotes / Invoices / Statements</strong> tabs directly below the search bar. Clicking a tab shows only documents of that type in the same view \u2014 no page reload. The Statements tab shows previously generated Statement of Account exports.",
        help_q_mark_paid: "How do I mark an invoice as paid?",
        help_a_mark_paid: "On the home screen, open the invoice card\u2019s three-dot menu and select the appropriate payment status \u2014 <strong>Unpaid</strong>, <strong>Pending</strong>, or <strong>Paid</strong>. Paid invoices are visually flagged and excluded from outstanding balance calculations in Invoice Reports.",
        help_q_save_client: "How do I save a client for reuse?",
        help_a_save_client: "In Step 2 of the editor, enter the client name and address, then click <strong>Save Client</strong>. Saved clients appear in the dropdown on future documents so you don\u2019t need to retype their details. Switching clients also restores their saved consignee fields.",
        help_q_statement: "What is a Statement of Account?",
        help_a_statement: "A Statement of Account is a branded PDF summary of selected invoices for a specific client \u2014 useful for reconciliation and payment follow-up. Access it from the <strong>Invoice Reports</strong> section. Generated statements are saved and appear under the <strong>Statements</strong> tab on the home screen.",
        help_q_statement_icons: "What do the action icons on statement rows do?",
        help_a_statement_icons: "Each saved statement has three action buttons. The <strong>eye icon</strong> reopens the PDF export. The <strong>pencil icon</strong> opens the statement editor so you can adjust it. The <strong>trash icon</strong> permanently deletes the saved statement.",
        help_vl_statement_actions: "Statement action buttons",
        help_vc_open: "Open",
        help_vc_delete: "Delete",
        help_q_language: "How do I switch the display language?",
        help_a_language: "Use the language selector in the top toolbar (<strong>EN / ES / FR</strong>). The interface and generated document labels will update to match your selected language immediately.",
        help_q_logo_sig: "Can I add my company logo and signature to documents?",
        help_a_logo_sig: "Yes. Open <strong>Company Profile</strong> from the Tools menu. You can upload a letterhead image, signature, stamp, and footer wave \u2014 all of which appear in exported PDFs automatically.",
        help_q_search: "How do I search for a document?",
        help_a_search: "Use the search bar at the top of the home screen. You can search by client name, reference number, date, or any keyword added in Step 4 of the editor. The search works across all document types.",
        help_q_catalog: "How do I use the Catalog?",
        help_a_catalog: "Click <strong>Catalog</strong> in the top navigation. It shows every line item captured from quotes, invoices, and the cart. You can also add manual catalog entries. Items in the catalog can be inserted into new documents quickly from the cart.",
        help_q_bug_report: "How do I report a bug or request a feature?",
        help_a_bug_report: "Click <strong>Submit / Report Issues</strong> in the footer. Fill in a summary, add any relevant screenshots, and submit. Your report is logged and visible to the admin in the Service Reports panel under <strong>Tools</strong>."
    },
    es: {
        language_name: "Español",
        role_admin: "Administrador",
        role_user: "Usuario",
        login_kicker: "Ingreso al Espacio",
        login_title: `Entrar a ${BRAND.name}`,
        login_copy: "Inicia sesión con una cuenta local para crear, editar y gestionar cotizaciones y facturas con una presentación premium y sincronizada.",
        username: "Usuario o correo",
        username_placeholder: "Ingresa usuario o correo",
        password: "Contraseña",
        password_placeholder: "Ingresa la contraseña",
        login_error: "Ese usuario o contraseña es incorrecto. Inténtalo de nuevo.",
        sign_in: "Iniciar sesión",
        session_loader_kicker: "Cargando sesión",
        session_loader_title: `Abriendo ${BRAND.name}`,
        session_loader_message: "Iniciando sesión y preparando tu espacio operativo...",
        workspace: "Espacio",
        dashboard_title_top: BRAND.name,
        end_session: "Cerrar sesión",
        sign_out: "Cerrar sesión",
        settings: "Configuración",
        issue_inbox: "Reportes de Servicio",
        report_issue: "Reportar un Problema",
        issue_report_copy: "Comparte un error, una falla del flujo o un problema visual y adjunta una captura si ayuda a explicar lo ocurrido.",
        issue_summary: "Resumen del Problema",
        issue_summary_placeholder: "¿Qué salió mal?",
        issue_details: "Detalles",
        issue_details_placeholder: "Cuéntanos qué estabas haciendo, qué esperabas y qué pasó en su lugar.",
        attach_screenshot: "Adjuntar Captura",
        attach_screenshot_help: "Opcional. Una captura puede facilitar mucho la revisión del problema.",
        submit_report: "Enviar Reporte",
        issue_inbox_copy: "Los reportes y registros de servicio aparecen aquí para que los administradores los revisen, agreguen notas y los cierren al resolverse.",
        no_issue_reports: "Aún no hay reportes.",
        submitted_by: "Enviado por",
        screenshot: "Captura",
        delete_report: "Eliminar reporte",
        issue_open: "Abierto",
        issue_closed: "Cerrado",
        close_report: "Cerrar reporte",
        reopen_report: "Reabrir reporte",
        issue_admin_notes: "Notas del Admin",
        issue_admin_notes_placeholder: "Agrega notas internas, seguimiento o un resumen de resolución.",
        save_notes: "Guardar notas",
        issue_notes_saved: "Notas guardadas.",
        new_report: "Nuevo",
        catalog: "Catálogo",
        catalog_heading: "Catálogo",
        catalog_copy: "Revisa cada artículo capturado desde cotizaciones, facturas y el carrito, y agrega registros manuales para uso futuro.",
        add_catalog_item: "Agregar Artículo al Catálogo",
        no_catalog_items: "Aún no hay artículos en el catálogo.",
        item_name: "Nombre del Artículo",
        price: "Precio",
        item_details: "Detalles",
        item_notes: "Notas",
        date_updated: "Fecha Actualizada",
        category: "Categoría",
        brand: "Marca",
        unit_size: "Tamaño de Unidad",
        vendor: "Proveedor",
        source: "Origen",
        source_manual: "Manual",
        source_cart: "Carrito",
        source_document: "Documento",
        save_catalog_item: "Guardar Artículo del Catálogo",
        update_catalog_item: "Actualizar Artículo del Catálogo",
        report_submitted_success: "Reporte enviado correctamente.",
        report_required_error: "Agrega un resumen y detalles antes de enviar.",
        report_delete_confirm: "¿Eliminar este reporte?",
        footer_credit_line: `Creado por ${BRAND.developerName} en ${BRAND.studioName}, bajo ${BRAND.legalName}.`,
        footer_report_cta: "Enviar / Reportar Problemas",
        about_veloris: `Sobre ${BRAND.name}`,
        about_brand_meaning: "SantoSync es un nombre creado para sugerir coordinación, elegancia y fiabilidad para flujos comerciales modernos.",
        about_product_copy: "SantoSync es un espacio de cotizaciones y facturas pensado para documentos pulidos y operaciones mejor alineadas.",
        about_developer_copy: `Diseñado y desarrollado por ${BRAND.developerName} a través de ${BRAND.studioName}, bajo ${BRAND.legalName}.`,
        company_profile: "Perfil de Empresa",
        company_profile_copy: "Los datos empresariales guardados aquí aparecen en cotizaciones, facturas y vistas de exportación.",
        company_name: "Nombre de la Empresa",
        company_tagline: "Lema",
        company_address: "Dirección",
        company_email: "Correo",
        company_phone: "Teléfono",
        company_website: "Sitio web",
        company_tax_id: "Fiscal / Registro",
        save_company_profile: "Guardar Perfil de Empresa",
        company_profile_saved: "Perfil de empresa guardado.",
        saved_items: "Carrito de Artículos Pendientes",
        saved_items_copy: "Mantén aquí los artículos solicitados hasta que estés listo para agregarlos a una cotización o factura.",
        add_saved_item: "Agregar al Carrito",
        add_saved_item_copy: "Guarda artículos que todavía no estén ligados a un documento.",
        saved_items_library: "Artículos del Carrito",
        saved_items_library_copy: "Agrega un artículo al documento abierto, o quítalo del carrito si ya no está pendiente.",
        item_description: "Descripción del Artículo",
        unit_price_usd: "Precio Unitario (USD)",
        total_usd: "Total (USD)",
        save_item: "Crear Artículo del Carrito",
        add_cart_item: "Agregar Nuevo Artículo al Carrito",
        update_cart_item: "Actualizar Artículo del Carrito",
        use_item: "Agregar al Documento",
        save_for_later: "Mover Línea al Carrito",
        no_saved_items: "Todavía no hay artículos en el carrito.",
        saved_item_added: "Artículo movido al carrito.",
        saved_item_updated: "Artículo del carrito actualizado.",
        saved_item_used: "Artículo del carrito agregado a este documento.",
        save_item_before_remove: "¿Mover esta línea al carrito antes de quitarla?",
        open_pending_cart: "Abrir carrito de artículos pendientes",
        item_image: "Imagen del Artículo",
        upload_item_image: "Subir imagen del artículo",
        remove_item_image: "Quitar imagen",
        menu: "Menú",
        language: "Idioma",
        hero_kicker: "Espacio de Documentos",
        hero_title: "Documentos comerciales, sincronizados con tu ritmo.",
        hero_copy: "Prepara cotizaciones refinadas, facturas seguras y un flujo diario más coordinado desde un solo espacio elegante.",
        new_quote: "Nueva Cotización",
        new_invoice: "Nueva Factura",
        invoice_reports: "Reportes de Facturas",
        invoice_reports_copy: "Revisa los totales de facturas por cliente, cambia entre facturas no pagadas, pendientes y pagadas, y mantén la lista ordenada por cliente.",
        export_report_csv: "Exportar CSV",
        select_visible_reports: "Seleccionar Visibles",
        print_selected_reports: "Imprimir Seleccionadas",
        open_service_reports: "Abrir Reportes de Servicio",
        report_select: "Seleccionar",
        report_print_title: "Reporte de Facturas",
        report_print_selected_empty: "Selecciona al menos una factura de la lista de reportes antes de imprimir.",
        report_from: "Desde",
        report_to: "Hasta",
        import_status_default: "Usa las herramientas JSON para restaurar registros eliminados o mover datos entre entornos.",
        snapshot: "Resumen",
        documents: "Documentos",
        quote_singular: "Cotización",
        invoice_singular: "Factura",
        quotes: "Cotizaciones",
        invoices: "Facturas",
        date_label: "Fecha",
        quantity: "Cantidad",
        total: "Total",
        status_draft: "Borrador",
        status_logged: "Registrado",
        created_by: "Creado por",
        converted_source: "Fuente Convertida",
        legacy_pdf_attached: "PDF heredado adjunto",
        locked_after_conversion: "Bloqueado después de la conversión",
        open_pdf_preview: "Abrir Vista PDF",
        view_pdf: "Ver PDF",
        convert_to_invoice: "Convertir en Factura",
        convert_to_quote: "Convertir en Cotizacion",
        payment_paid: "Pagada",
        payment_pending: "Pago Pendiente",
        payment_unpaid: "No Pagada",
        mark_as_paid: "Marcar como Pagada",
        mark_as_pending: "Marcar como Pendiente",
        mark_as_unpaid: "Marcar como No Pagada",
        report_pending: "Pendiente",
        local_mode: "MODO LOCAL",
        pipeline_value: "Valor en Proceso",
        amount_invoiced: "Monto Facturado",
        income_received: "Ingresos Recibidos",
        tap_view_invoiced: "Toca para ver el monto facturado",
        tap_view_income: "Toca para ver los ingresos recibidos",
        tap_view_pipeline: "Toca para ver el valor en proceso",
        documents_heading: "Documentos",
        documents_subtitle: "Abre, ordena, filtra y gestiona cada cotización y factura desde un solo espacio coordinado.",
        sort: "Ordenar",
        search: "Buscar",
        search_placeholder: "Buscar por ref., fecha, cliente, tipo o palabra clave",
        sort_ref_date_desc: "Referencia: más reciente primero",
        sort_ref_date_asc: "Referencia: más antigua primero",
        sort_date_desc: "Fecha: más reciente primero",
        sort_date_asc: "Fecha: más antigua primero",
        sort_created_desc: "Creado: más reciente primero",
        sort_created_asc: "Creado: más antiguo primero",
        sort_client_asc: "Cliente: A a Z",
        sort_client_desc: "Cliente: Z a A",
        filter_all: "Todos",
        no_date: "Sin fecha",
        unknown_client: "Cliente desconocido",
        empty_documents: "Aún no hay documentos. Crea tu primera cotización o factura.",
        empty_documents_filtered: "No hay documentos que coincidan con tu búsqueda o filtro actual.",
        tools: "Herramientas",
        tools_copy: "Usa herramientas administrativas para gestionar usuarios, clientes, importaciones, respaldos y pruebas locales.",
        user_management: "Gestión de Usuarios",
        user_management_copy: "Crea cuentas locales, asigna roles, restablece contraseñas y elimina usuarios que no deben acceder al espacio.",
        display_name: "Nombre Visible",
        display_name_placeholder: "Por ejemplo, David",
        temp_password: "Contraseña Temporal",
        temp_password_placeholder: "Crea una contraseña",
        role: "Rol",
        add_user: "Agregar Usuario",
        no_users: "Todavía no se han agregado usuarios.",
        current_session: "Sesión actual",
        reset_password: "Restablecer contraseña",
        delete: "Eliminar",
        client_records: "Registros de Clientes",
        client_records_copy: "Ver todos los clientes guardados, actualizar sus datos o eliminar entradas desactualizadas de la lista compartida.",
        no_clients: "Todavía no hay clientes guardados.",
        edit: "Editar",
        editor_preferences: "Preferencias del Editor",
        editor_preferences_copy: "Elige qué campos opcionales deben mostrarse mientras tu equipo prepara documentos.",
        show_internal_pricing: "Mostrar campos de precios internos en las líneas",
        csv_tools: "Herramientas CSV",
        csv_tools_copy: "Descarga la plantilla o importa filas para crear varios documentos a la vez.",
        export_csv_template: "Exportar Plantilla CSV",
        import_csv: "Importar CSV",
        json_backup: "Respaldo JSON",
        json_backup_copy: "Exporta un respaldo completo o restaura documentos y clientes desde un archivo JSON.",
        export_backup: "Exportar Respaldo",
        import_backup: "Importar Respaldo",
        selective_export: "Exportación Selectiva",
        selective_export_copy: "Abre la ventana de exportación y elige solo las cotizaciones o facturas que deseas en el archivo JSON.",
        export_selected_json: "Exportar JSON Seleccionado",
        local_testing: "Pruebas Locales",
        local_testing_copy: "Borra datos de prueba del navegador sin afectar ningún dato del servidor.",
        clear_local_test_data: "Borrar Datos Locales de Prueba",
        export_json_title: "Exportar JSON",
        export_json_copy: "Elige los registros que deseas incluir en este archivo de exportación.",
        select_all_documents: "Seleccionar todos los documentos",
        download_selected_json: "Descargar JSON Seleccionado",
        no_documents_export: "No hay documentos disponibles para exportar.",
        type_info: "Tipo e Información",
        client_details: "Datos del Cliente",
        line_items: "Artículos",
        keywords: "Palabras Clave",
        items_preview: "Vista de Líneas",
        review: "Revisión",
        current_step: "Paso Actual",
        previous: "Anterior",
        next: "Siguiente",
        save_draft: "Guardar Borrador",
        save_changes: "Guardar Cambios",
        save_preview_pdf: "Abrir Vista de Impresión",
        document_summary: "Resumen del Documento",
        ref_pending: "Ref pendiente",
        date_pending: "Fecha pendiente",
        client: "Cliente",
        no_client_selected: "Ningún cliente seleccionado",
        choose_or_enter_client: "Elige o ingresa un cliente para continuar.",
        choose_or_add_client: "-- Elegir o agregar cliente --",
        other_manual: "Otro (ingreso manual)",
        commercial_snapshot: "Resumen Comercial",
        items: "Artículos",
        subtotal: "Subtotal",
        no_keywords: "Aún no hay palabras clave",
        pdf_options: "Opciones PDF",
        include_signature: "Incluir firma al exportar",
        include_signature_help: "Desactiva esto para cotizaciones o facturas sin firma antes de abrir la vista PDF.",
        include_stamp: "Incluir sello al exportar",
        include_stamp_help: "Agrega un pequeño sello de la empresa cerca de la firma sin cambiar el diseño del documento.",
        workflow_tip: "Consejo de Flujo",
        workflow_tip_copy: "Mantén las líneas concisas y usa palabras clave como destino, tipo de servicio o prioridad para facilitar la búsqueda.",
        report_client: "Cliente",
        report_status: "Estado",
        report_ref: "Referencia",
        report_date: "Fecha",
        report_total: "Total",
        report_total_invoices: "Facturas",
        report_total_clients: "Clientes",
        report_total_paid: "Pagadas",
        report_total_unpaid: "No Pagadas",
        report_total_pending: "Pendientes",
        report_no_invoices: "Todavía no hay facturas.",
        report_no_matches: "No hay facturas que coincidan con este filtro.",
        help_title: "Ayuda y Preguntas",
        help_search_placeholder: "Buscar temas de ayuda\u2026",
        help_no_results: "No se encontraron resultados. Prueba con otra palabra clave.",
        help_idx_getting_started: "Primeros Pasos",
        help_idx_documents: "Documentos",
        help_idx_document_cards: "Tarjetas de Documentos",
        help_idx_clients: "Clientes y Estados de Cuenta",
        help_idx_tips: "Consejos y Atajos",
        help_sec_getting_started: "Primeros Pasos",
        help_sec_documents: "Documentos y Exportaci\u00f3n",
        help_sec_document_cards: "Tarjetas de Documentos",
        help_sec_clients: "Clientes y Estados de Cuenta",
        help_sec_tips: "Consejos y Atajos",
        help_q_create_doc: "\u00bfC\u00f3mo creo una nueva cotizaci\u00f3n o factura?",
        help_a_create_doc: "Desde la pantalla principal, haz clic en <strong>Nueva Cotizaci\u00f3n</strong> o <strong>Nueva Factura</strong> en la barra de herramientas. El editor se abre en un flujo paso a paso \u2014 completa los datos del documento, info del cliente, l\u00edneas de art\u00edculos, palabras clave y revisa antes de exportar.",
        help_q_edit_doc: "\u00bfC\u00f3mo edito un documento existente?",
        help_a_edit_doc: "Haz clic en el <strong>\u00edcono de l\u00e1piz</strong> en cualquier tarjeta de documento, o en <strong>Editar</strong> dentro de la ventana de vista previa del PDF. El editor se reabre con todos los campos intactos y listos para actualizar.",
        help_vl_edit_btn: "Bot\u00f3n Editar",
        help_vc_edit: "Editar",
        help_q_company_profile: "\u00bfC\u00f3mo configuro el perfil de mi empresa?",
        help_a_company_profile: "Abre <strong>Herramientas</strong> desde la barra superior y haz clic en <strong>Abrir Perfil de Empresa</strong>. Tu nombre, direcci\u00f3n, logo, encabezado y datos de pago aparecer\u00e1n en cada documento que generes.",
        help_q_diff_quote_invoice: "\u00bfCu\u00e1l es la diferencia entre una Cotizaci\u00f3n y una Factura?",
        help_a_diff_quote_invoice: "Una <strong>Cotizaci\u00f3n</strong> es un estimado de precio enviado antes de comenzar el trabajo. Una <strong>Factura</strong> es una solicitud formal de pago emitida despu\u00e9s de completar el trabajo o entregar bienes. Puedes cambiar entre ambos en el Paso 1 del editor.",
        help_q_export_pdf: "\u00bfC\u00f3mo exporto un documento a PDF?",
        help_a_export_pdf: "Haz clic en el <strong>\u00edcono de ojo</strong> en cualquier tarjeta para abrir la vista previa del PDF, luego usa el di\u00e1logo de impresi\u00f3n del navegador para guardar como PDF. Tambi\u00e9n puedes acceder desde el <strong>Paso 6 \u2013 Vista Final</strong> del editor.",
        help_vl_pdf_preview: "Abrir vista previa PDF",
        help_vc_preview_pdf: "Vista PDF",
        help_q_reuse_items: "\u00bfPuedo guardar l\u00edneas de art\u00edculos para reutilizarlas?",
        help_a_reuse_items: "S\u00ed. En el Paso 3, usa el \u00edcono del carrito junto a <strong>Agregar Art\u00edculo</strong> para abrir tus art\u00edculos guardados. Cualquier art\u00edculo guardado de un documento anterior aparece ah\u00ed y puede agregarse con un clic. La p\u00e1gina de Cat\u00e1logo agrupa todos los art\u00edculos capturados.",
        help_q_payment_terms: "\u00bfC\u00f3mo agrego o actualizo los t\u00e9rminos de pago?",
        help_a_payment_terms: "Baja hasta el panel de <strong>Notas y T\u00e9rminos del Documento</strong> al final del Paso 3. El campo <strong>Condiciones de Pago</strong> viene prellenado con NET 15 \u2014 actual\u00edzalo seg\u00fan tu acuerdo.",
        help_q_backup: "\u00bfC\u00f3mo respaldo o restauro mis datos?",
        help_a_backup: "Abre <strong>Herramientas</strong> y usa la opci\u00f3n <strong>Respaldo JSON</strong> para exportar un resguardo completo de tus documentos y clientes. Usa <strong>Restaurar JSON</strong> para importar un respaldo guardado. La importaci\u00f3n CSV tambi\u00e9n est\u00e1 disponible.",
        help_q_action_icons: "\u00bfQu\u00e9 hacen los \u00edconos de acci\u00f3n en las tarjetas de documentos?",
        help_a_action_icons: "Cada tarjeta muestra dos botones de \u00edconos. El <strong>\u00edcono de ojo</strong> abre la vista previa del PDF en una nueva ventana. El <strong>\u00edcono de l\u00e1piz</strong> abre el documento en el editor. El men\u00fa de tres puntos da acceso a acciones adicionales como estado de pago, conversi\u00f3n de tipo y eliminar.",
        help_vl_card_actions: "Botones de acci\u00f3n de la tarjeta",
        help_q_pdf_preview: "\u00bfC\u00f3mo uso la ventana de vista previa del PDF?",
        help_a_pdf_preview: "La ventana de vista previa muestra el documento listo para imprimir. Usa <strong>Imprimir</strong> para abrir el di\u00e1logo de impresi\u00f3n y guardar como PDF. Usa <strong>Editar</strong> para volver al editor con el documento cargado. <strong>Cerrar Vista</strong> cierra la ventana.",
        help_q_filter_docs: "\u00bfC\u00f3mo filtro documentos por tipo?",
        help_a_filter_docs: "Usa las pesta\u00f1as <strong>Todos / Cotizaciones / Facturas / Estados de Cuenta</strong> debajo de la barra de b\u00fasqueda. Al hacer clic en una pesta\u00f1a se muestran solo los documentos de ese tipo \u2014 sin recargar la p\u00e1gina. La pesta\u00f1a de Estados muestra exportaciones de Estado de Cuenta generadas anteriormente.",
        help_q_mark_paid: "\u00bfC\u00f3mo marco una factura como pagada?",
        help_a_mark_paid: "En la pantalla principal, abre el men\u00fa de tres puntos de la tarjeta de factura y selecciona el estado de pago correspondiente \u2014 <strong>No Pagada</strong>, <strong>Pendiente</strong> o <strong>Pagada</strong>. Las facturas pagadas se marcan visualmente y quedan excluidas del c\u00e1lculo de saldo pendiente.",
        help_q_save_client: "\u00bfC\u00f3mo guardo un cliente para reutilizarlo?",
        help_a_save_client: "En el Paso 2 del editor, ingresa el nombre y direcci\u00f3n del cliente y haz clic en <strong>Guardar Cliente</strong>. Los clientes guardados aparecen en el men\u00fa desplegable en documentos futuros. Cambiar de cliente tambi\u00e9n restaura sus campos de consignatario guardados.",
        help_q_statement: "\u00bfQu\u00e9 es un Estado de Cuenta?",
        help_a_statement: "Un Estado de Cuenta es un resumen PDF con marca de facturas seleccionadas para un cliente \u2014 \u00fatil para conciliaci\u00f3n y seguimiento de pagos. Acc\u00e9delo desde la secci\u00f3n <strong>Reportes de Facturas</strong>. Los estados generados se guardan y aparecen en la pesta\u00f1a <strong>Estados de Cuenta</strong>.",
        help_q_statement_icons: "\u00bfQu\u00e9 hacen los \u00edconos de acci\u00f3n en las filas de estados?",
        help_a_statement_icons: "Cada estado guardado tiene tres botones. El <strong>\u00edcono de ojo</strong> reabre la exportaci\u00f3n PDF. El <strong>\u00edcono de l\u00e1piz</strong> abre el editor de estados para ajustarlo. El <strong>\u00edcono de papelera</strong> elimina el estado guardado de forma permanente.",
        help_vl_statement_actions: "Botones de acci\u00f3n del estado",
        help_vc_open: "Abrir",
        help_vc_delete: "Eliminar",
        help_q_language: "\u00bfC\u00f3mo cambio el idioma de visualizaci\u00f3n?",
        help_a_language: "Usa el selector de idioma en la barra superior (<strong>EN / ES / FR</strong>). La interfaz y las etiquetas de los documentos se actualizar\u00e1n inmediatamente al idioma seleccionado.",
        help_q_logo_sig: "\u00bfPuedo agregar el logo y firma de mi empresa a los documentos?",
        help_a_logo_sig: "S\u00ed. Abre <strong>Perfil de Empresa</strong> desde el men\u00fa Herramientas. Puedes subir una imagen de encabezado, firma, sello y onda de pie \u2014 todos aparecen autom\u00e1ticamente en los PDFs exportados.",
        help_q_search: "\u00bfC\u00f3mo busco un documento?",
        help_a_search: "Usa la barra de b\u00fasqueda en la parte superior de la pantalla principal. Puedes buscar por nombre de cliente, n\u00famero de referencia, fecha o cualquier palabra clave agregada en el Paso 4 del editor. La b\u00fasqueda funciona para todos los tipos de documentos.",
        help_q_catalog: "\u00bfC\u00f3mo uso el Cat\u00e1logo?",
        help_a_catalog: "Haz clic en <strong>Cat\u00e1logo</strong> en la navegaci\u00f3n superior. Muestra cada l\u00ednea de art\u00edculo capturada desde cotizaciones, facturas y el carrito. Tambi\u00e9n puedes agregar entradas manuales. Los art\u00edculos del cat\u00e1logo se pueden insertar r\u00e1pidamente en nuevos documentos desde el carrito.",
        help_q_bug_report: "\u00bfC\u00f3mo reporto un error o solicito una funci\u00f3n?",
        help_a_bug_report: "Haz clic en <strong>Enviar / Reportar Problemas</strong> en el pie de p\u00e1gina. Completa un resumen, agrega capturas relevantes y env\u00eda. Tu reporte se registra y el admin puede verlo en el panel de Reportes de Servicio bajo <strong>Herramientas</strong>."
    },
    fr: {
        language_name: "Français",
        role_admin: "Administrateur",
        role_user: "Utilisateur",
        login_kicker: "Connexion à l’Espace",
        login_title: `Entrer dans ${BRAND.name}`,
        login_copy: "Connectez-vous avec un compte local pour créer, modifier et gérer des devis et factures avec une identité plus premium et cohérente.",
        username: "Identifiant ou e-mail",
        username_placeholder: "Entrez l’identifiant ou l’e-mail",
        password: "Mot de passe",
        password_placeholder: "Entrez le mot de passe",
        login_error: "Ce nom d’utilisateur ou mot de passe est incorrect. Réessayez.",
        sign_in: "Se connecter",
        session_loader_kicker: "Chargement de session",
        session_loader_title: `Ouverture de ${BRAND.name}`,
        session_loader_message: "Connexion et préparation de votre espace opérationnel...",
        workspace: "Espace",
        dashboard_title_top: BRAND.name,
        end_session: "Fermer la session",
        sign_out: "Se déconnecter",
        settings: "Paramètres",
        issue_inbox: "Rapports de Service",
        report_issue: "Signaler un Problème",
        issue_report_copy: "Partagez un bug, un flux cassé ou un problème visuel et joignez une capture si cela aide à expliquer le souci.",
        issue_summary: "Résumé du Problème",
        issue_summary_placeholder: "Quel est le problème ?",
        issue_details: "Détails",
        issue_details_placeholder: "Dites-nous ce que vous faisiez, ce que vous attendiez et ce qui s’est passé à la place.",
        attach_screenshot: "Joindre une Capture",
        attach_screenshot_help: "Optionnel. Une capture peut rendre les rapports bien plus faciles à examiner.",
        submit_report: "Envoyer le Rapport",
        issue_inbox_copy: "Les rapports et journaux de service apparaissent ici pour que les administrateurs puissent les examiner, ajouter des notes et les clôturer.",
        no_issue_reports: "Aucun rapport pour le moment.",
        submitted_by: "Envoyé par",
        screenshot: "Capture",
        delete_report: "Supprimer le rapport",
        issue_open: "Ouvert",
        issue_closed: "Clôturé",
        close_report: "Clôturer le rapport",
        reopen_report: "Rouvrir le rapport",
        issue_admin_notes: "Notes Admin",
        issue_admin_notes_placeholder: "Ajoutez des notes internes, un suivi ou un résumé de résolution.",
        save_notes: "Enregistrer les notes",
        issue_notes_saved: "Notes enregistrées.",
        new_report: "Nouveau",
        catalog: "Catalogue",
        catalog_heading: "Catalogue",
        catalog_copy: "Consultez chaque article issu des devis, factures et du panier, et ajoutez des fiches catalogue manuelles pour plus tard.",
        add_catalog_item: "Ajouter au Catalogue",
        no_catalog_items: "Aucun article dans le catalogue pour le moment.",
        item_name: "Nom de l’Article",
        price: "Prix",
        item_details: "Détails",
        item_notes: "Notes",
        date_updated: "Date de Mise à Jour",
        category: "Catégorie",
        brand: "Marque",
        unit_size: "Taille Unitaire",
        vendor: "Fournisseur",
        source: "Source",
        source_manual: "Manuel",
        source_cart: "Panier",
        source_document: "Document",
        save_catalog_item: "Enregistrer l’Article",
        update_catalog_item: "Mettre à Jour l’Article",
        report_submitted_success: "Rapport envoyé avec succès.",
        report_required_error: "Ajoutez un résumé et des détails avant l’envoi.",
        report_delete_confirm: "Supprimer ce rapport ?",
        footer_credit_line: `Créé par ${BRAND.developerName} via ${BRAND.studioName}, sous ${BRAND.legalName}.`,
        footer_report_cta: "Soumettre / Signaler un Problème",
        about_veloris: `À propos de ${BRAND.name}`,
        about_brand_meaning: "SantoSync est un nom imaginé pour évoquer la coordination, l’élégance et la fiabilité dans les flux commerciaux.",
        about_product_copy: "SantoSync est un espace devis-factures conçu pour des documents plus soignés et des opérations mieux synchronisées.",
        about_developer_copy: `Conçu et développé par ${BRAND.developerName} via ${BRAND.studioName}, sous ${BRAND.legalName}.`,
        company_profile: "Profil Société",
        company_profile_copy: "Les informations d’identité enregistrées ici apparaissent dans les devis, factures et vues d’export.",
        company_name: "Nom de la Société",
        company_tagline: "Signature",
        company_address: "Adresse",
        company_email: "Email",
        company_phone: "Téléphone",
        company_website: "Site web",
        company_tax_id: "Fiscal / Enregistrement",
        save_company_profile: "Enregistrer le Profil Société",
        company_profile_saved: "Profil société enregistré.",
        saved_items: "Panier d’Articles en Attente",
        saved_items_copy: "Gardez ici les articles demandés jusqu’au moment de les ajouter à un devis ou une facture.",
        add_saved_item: "Ajouter au Panier",
        add_saved_item_copy: "Conservez ici les articles qui ne sont pas encore liés à un document.",
        saved_items_library: "Articles du Panier",
        saved_items_library_copy: "Ajoutez un article au document ouvert, ou retirez-le du panier s’il n’est plus en attente.",
        item_description: "Description de l’Article",
        unit_price_usd: "Prix Unitaire (USD)",
        total_usd: "Total (USD)",
        save_item: "Créer un Article du Panier",
        add_cart_item: "Ajouter un Nouvel Article au Panier",
        update_cart_item: "Mettre à Jour l’Article du Panier",
        use_item: "Ajouter au Document",
        save_for_later: "Déplacer la Ligne vers le Panier",
        no_saved_items: "Aucun article dans le panier pour le moment.",
        saved_item_added: "Article déplacé vers le panier.",
        saved_item_updated: "Article du panier mis à jour.",
        saved_item_used: "Article du panier ajouté à ce document.",
        save_item_before_remove: "Déplacer cette ligne vers le panier avant de la supprimer ?",
        open_pending_cart: "Ouvrir le panier d’articles en attente",
        item_image: "Image de l’Article",
        upload_item_image: "Téléverser l’image de l’article",
        remove_item_image: "Retirer l’image",
        menu: "Menu",
        language: "Langue",
        hero_kicker: "Espace Documents",
        hero_title: "Des documents commerciaux au rythme de votre équipe.",
        hero_copy: "Préparez des devis raffinés, des factures sûres et un flux quotidien mieux synchronisé depuis un seul espace élégant.",
        new_quote: "Nouveau Devis",
        new_invoice: "Nouvelle Facture",
        invoice_reports: "Rapports de Factures",
        invoice_reports_copy: "Consultez les totaux de factures par client, basculez entre les factures impayees, en attente et payees, et gardez la liste triee par client.",
        export_report_csv: "Exporter CSV",
        select_visible_reports: "Sélectionner les visibles",
        print_selected_reports: "Imprimer la sélection",
        open_service_reports: "Ouvrir les rapports de service",
        report_select: "Sélection",
        report_print_title: "Rapport de Factures",
        report_print_selected_empty: "Sélectionnez au moins une facture dans la liste des rapports avant d’imprimer.",
        report_from: "Du",
        report_to: "Au",
        import_status_default: "Utilisez les outils JSON pour restaurer des enregistrements supprimés ou déplacer des données entre environnements.",
        snapshot: "Aperçu",
        documents: "Documents",
        quote_singular: "Devis",
        invoice_singular: "Facture",
        quotes: "Devis",
        invoices: "Factures",
        date_label: "Date",
        quantity: "Quantité",
        total: "Total",
        status_draft: "Brouillon",
        status_logged: "Enregistré",
        created_by: "Créé par",
        converted_source: "Source Convertie",
        legacy_pdf_attached: "PDF hérité joint",
        locked_after_conversion: "Verrouillé après conversion",
        open_pdf_preview: "Ouvrir l’aperçu PDF",
        view_pdf: "Voir le PDF",
        convert_to_invoice: "Convertir en Facture",
        convert_to_quote: "Convertir en Devis",
        payment_paid: "Payee",
        payment_pending: "Paiement en attente",
        payment_unpaid: "Non Payee",
        mark_as_paid: "Marquer comme Payee",
        mark_as_pending: "Marquer en attente",
        mark_as_unpaid: "Marquer comme Non Payee",
        report_pending: "En attente",
        local_mode: "MODE LOCAL",
        pipeline_value: "Valeur Pipeline",
        amount_invoiced: "Montant Facturé",
        income_received: "Revenus Reçus",
        tap_view_invoiced: "Touchez pour voir le montant facturé",
        tap_view_income: "Touchez pour voir les revenus reçus",
        tap_view_pipeline: "Touchez pour voir la valeur pipeline",
        documents_heading: "Documents",
        documents_subtitle: "Ouvrez, triez, filtrez et gérez chaque devis et facture depuis un espace coordonné.",
        sort: "Trier",
        search: "Rechercher",
        search_placeholder: "Rechercher par réf., date, client, type ou mot-clé",
        sort_date_desc: "Date : plus récent d’abord",
        sort_date_asc: "Date : plus ancien d’abord",
        sort_created_desc: "Créé : plus récent d’abord",
        sort_created_asc: "Créé : plus ancien d’abord",
        sort_client_asc: "Client : A a Z",
        sort_client_desc: "Client : Z a A",
        filter_all: "Tous",
        no_date: "Aucune date",
        unknown_client: "Client inconnu",
        empty_documents: "Aucun document pour l’instant. Créez votre premier devis ou facture.",
        empty_documents_filtered: "Aucun document ne correspond à votre recherche ou filtre actuel.",
        tools: "Outils",
        tools_copy: "Utilisez les outils d’administration pour gérer les utilisateurs, clients, imports, sauvegardes et tests locaux.",
        user_management: "Gestion des Utilisateurs",
        user_management_copy: "Créez des comptes locaux, attribuez des rôles, réinitialisez des mots de passe et supprimez les utilisateurs qui ne doivent pas accéder à l’espace.",
        display_name: "Nom Affiché",
        display_name_placeholder: "Par exemple, David",
        temp_password: "Mot de Passe Temporaire",
        temp_password_placeholder: "Créer un mot de passe",
        role: "Rôle",
        add_user: "Ajouter un Utilisateur",
        no_users: "Aucun utilisateur n’a encore été ajouté.",
        current_session: "Session actuelle",
        reset_password: "Réinitialiser le mot de passe",
        delete: "Supprimer",
        client_records: "Fiches Clients",
        client_records_copy: "Affichez tous les clients enregistrés, modifiez leurs détails ou supprimez les entrées obsolètes de la liste partagée.",
        no_clients: "Aucun client enregistré pour le moment.",
        edit: "Modifier",
        editor_preferences: "Préférences de l’Éditeur",
        editor_preferences_copy: "Choisissez quels champs optionnels doivent apparaître pendant la préparation des documents.",
        show_internal_pricing: "Afficher les champs de tarification interne dans les lignes",
        csv_tools: "Outils CSV",
        csv_tools_copy: "Téléchargez le modèle ou importez des lignes pour créer plusieurs documents à la fois.",
        export_csv_template: "Exporter le Modèle CSV",
        import_csv: "Importer CSV",
        json_backup: "Sauvegarde JSON",
        json_backup_copy: "Exportez une sauvegarde complète ou restaurez documents et clients depuis un fichier JSON.",
        export_backup: "Exporter la Sauvegarde",
        import_backup: "Importer la Sauvegarde",
        selective_export: "Export Sélectif",
        selective_export_copy: "Ouvrez la fenêtre d’export et choisissez seulement les devis ou factures à inclure dans le fichier JSON.",
        export_selected_json: "Exporter le JSON Sélectionné",
        local_testing: "Tests Locaux",
        local_testing_copy: "Effacez les données de test du navigateur sans affecter les données du serveur.",
        clear_local_test_data: "Effacer les Données Locales de Test",
        export_json_title: "Exporter JSON",
        export_json_copy: "Choisissez les enregistrements à inclure dans ce fichier d’export.",
        select_all_documents: "Sélectionner tous les documents",
        download_selected_json: "Télécharger le JSON Sélectionné",
        no_documents_export: "Aucun document disponible pour l’export.",
        type_info: "Type & Infos",
        client_details: "Détails Client",
        line_items: "Lignes",
        keywords: "Mots-clés",
        items_preview: "Aperçu des Lignes",
        review: "Révision",
        current_step: "Étape Actuelle",
        previous: "Précédent",
        next: "Suivant",
        save_draft: "Enregistrer le Brouillon",
        save_changes: "Enregistrer les Modifications",
        save_preview_pdf: "Ouvrir l’aperçu d’impression",
        document_summary: "Résumé du Document",
        ref_pending: "Réf en attente",
        date_pending: "Date en attente",
        client: "Client",
        no_client_selected: "Aucun client sélectionné",
        choose_or_enter_client: "Choisissez ou saisissez un client pour continuer.",
        choose_or_add_client: "-- Choisir ou ajouter un client --",
        other_manual: "Autre (saisie manuelle)",
        commercial_snapshot: "Aperçu Commercial",
        items: "Articles",
        subtotal: "Sous-total",
        no_keywords: "Aucun mot-clé pour l’instant",
        pdf_options: "Options PDF",
        include_signature: "Inclure la signature à l’export",
        include_signature_help: "Désactivez ceci pour des devis ou factures non signés avant d’ouvrir l’aperçu PDF.",
        include_stamp: "Inclure le tampon à l’export",
        include_stamp_help: "Ajoute un petit tampon de l’entreprise près de la signature sans modifier la mise en page du document.",
        workflow_tip: "Conseil de Flux",
        workflow_tip_copy: "Gardez les lignes concises et utilisez des mots-clés comme destination, type de service ou priorité pour faciliter la recherche.",
        report_client: "Client",
        report_status: "Statut",
        report_ref: "Reference",
        report_date: "Date",
        report_total: "Total",
        report_total_invoices: "Factures",
        report_total_clients: "Clients",
        report_total_paid: "Payees",
        report_total_unpaid: "Non Payees",
        report_total_pending: "En attente",
        report_no_invoices: "Aucune facture pour le moment.",
        report_no_matches: "Aucune facture ne correspond a ce filtre.",
        help_title: "Aide et FAQ",
        help_search_placeholder: "Rechercher des sujets d\u2019aide\u2026",
        help_no_results: "Aucun r\u00e9sultat trouv\u00e9. Essayez un autre mot-cl\u00e9.",
        help_idx_getting_started: "Premiers pas",
        help_idx_documents: "Documents",
        help_idx_document_cards: "Cartes de documents",
        help_idx_clients: "Clients et relev\u00e9s",
        help_idx_tips: "Conseils et raccourcis",
        help_sec_getting_started: "Premiers pas",
        help_sec_documents: "Documents et exportation",
        help_sec_document_cards: "Cartes de documents",
        help_sec_clients: "Clients et relev\u00e9s",
        help_sec_tips: "Conseils et raccourcis",
        help_q_create_doc: "Comment cr\u00e9er un nouveau devis ou une facture\u00a0?",
        help_a_create_doc: "Depuis l\u2019\u00e9cran d\u2019accueil, cliquez sur <strong>Nouveau devis</strong> ou <strong>Nouvelle facture</strong> dans la barre d\u2019outils. L\u2019\u00e9diteur s\u2019ouvre en mode guid\u00e9 \u2014 renseignez les d\u00e9tails du document, les informations client, les articles, les mots-cl\u00e9s, puis relisez avant d\u2019exporter.",
        help_q_edit_doc: "Comment modifier un document existant\u00a0?",
        help_a_edit_doc: "Cliquez sur l\u2019<strong>ic\u00f4ne de crayon</strong> sur une carte de document, ou sur <strong>Modifier</strong> dans la fen\u00eatre d\u2019aper\u00e7u PDF. L\u2019\u00e9diteur se rouvre avec tous les champs intacts et pr\u00eats \u00e0 \u00eatre mis \u00e0 jour.",
        help_vl_edit_btn: "Bouton Modifier",
        help_vc_edit: "Modifier",
        help_q_company_profile: "Comment configurer mon profil d\u2019entreprise\u00a0?",
        help_a_company_profile: "Ouvrez <strong>Outils</strong> dans la barre d\u2019outils, puis cliquez sur <strong>Ouvrir le profil d\u2019entreprise</strong>. Votre nom, adresse, logo, en-t\u00eate et informations de paiement appara\u00eetront sur chaque document g\u00e9n\u00e9r\u00e9.",
        help_q_diff_quote_invoice: "Quelle est la diff\u00e9rence entre un devis et une facture\u00a0?",
        help_a_diff_quote_invoice: "Un <strong>devis</strong> est une estimation de prix envoy\u00e9e avant le d\u00e9but du travail. Une <strong>facture</strong> est une demande de paiement formelle \u00e9mise apr\u00e8s la fin du travail ou la livraison des biens. Vous pouvez passer de l\u2019un \u00e0 l\u2019autre \u00e0 l\u2019\u00e9tape\u00a01 de l\u2019\u00e9diteur.",
        help_q_export_pdf: "Comment exporter un document en PDF\u00a0?",
        help_a_export_pdf: "Cliquez sur l\u2019<strong>ic\u00f4ne en forme d\u2019\u0153il</strong> sur une carte pour ouvrir l\u2019aper\u00e7u PDF, puis utilisez la bo\u00eete de dialogue d\u2019impression du navigateur pour enregistrer en PDF. Vous pouvez aussi acc\u00e9der \u00e0 l\u2019aper\u00e7u depuis l\u2019<strong>\u00e9tape\u00a06 \u2013 Aper\u00e7u final</strong> de l\u2019\u00e9diteur.",
        help_vl_pdf_preview: "Ouvrir l\u2019aper\u00e7u PDF",
        help_vc_preview_pdf: "Aper\u00e7u PDF",
        help_q_reuse_items: "Puis-je enregistrer des lignes d\u2019articles pour les r\u00e9utiliser\u00a0?",
        help_a_reuse_items: "Oui. \u00c0 l\u2019\u00e9tape\u00a03, utilisez l\u2019ic\u00f4ne de panier \u00e0 c\u00f4t\u00e9 d\u2019<strong>Ajouter un article</strong> pour ouvrir vos articles enregistr\u00e9s. Tout article sauvegard\u00e9 depuis un document pr\u00e9c\u00e9dent y appara\u00eet et peut \u00eatre ajout\u00e9 en un clic. La page Catalogue regroupe tous les articles captur\u00e9s.",
        help_q_payment_terms: "Comment ajouter ou mettre \u00e0 jour les conditions de paiement\u00a0?",
        help_a_payment_terms: "Faites d\u00e9filer jusqu\u2019au panneau <strong>Notes et conditions du document</strong> en bas de l\u2019\u00e9tape\u00a03. Le champ <strong>Conditions de paiement</strong> est pr\u00e9rempli avec NET\u00a015 \u2014 mettez-le \u00e0 jour selon votre accord.",
        help_q_backup: "Comment sauvegarder ou restaurer mes donn\u00e9es\u00a0?",
        help_a_backup: "Ouvrez <strong>Outils</strong> et utilisez l\u2019option <strong>Sauvegarde JSON</strong> pour exporter un instantan\u00e9 complet de vos documents et clients. Utilisez <strong>Restaurer JSON</strong> pour importer une sauvegarde pr\u00e9c\u00e9demment enregistr\u00e9e. L\u2019importation CSV est \u00e9galement disponible.",
        help_q_action_icons: "Que font les ic\u00f4nes d\u2019action sur les cartes de documents\u00a0?",
        help_a_action_icons: "Chaque carte affiche deux boutons d\u2019ic\u00f4nes. L\u2019<strong>ic\u00f4ne en forme d\u2019\u0153il</strong> ouvre l\u2019aper\u00e7u PDF dans une nouvelle fen\u00eatre. L\u2019<strong>ic\u00f4ne de crayon</strong> ouvre le document dans l\u2019\u00e9diteur. Le menu \u00e0 trois points donne acc\u00e8s \u00e0 des actions suppl\u00e9mentaires comme le statut de paiement, la conversion de type et la suppression.",
        help_vl_card_actions: "Boutons d\u2019action de la carte",
        help_q_pdf_preview: "Comment utiliser la fen\u00eatre d\u2019aper\u00e7u PDF\u00a0?",
        help_a_pdf_preview: "La fen\u00eatre d\u2019aper\u00e7u montre le document pr\u00eat \u00e0 l\u2019impression. Utilisez <strong>Imprimer</strong> pour ouvrir la bo\u00eete de dialogue d\u2019impression et enregistrer en PDF. Utilisez <strong>Modifier</strong> pour revenir \u00e0 l\u2019\u00e9diteur avec le document charg\u00e9. <strong>Fermer l\u2019aper\u00e7u</strong> ferme la fen\u00eatre.",
        help_q_filter_docs: "Comment filtrer les documents par type\u00a0?",
        help_a_filter_docs: "Utilisez les onglets <strong>Tous / Devis / Factures / Relev\u00e9s</strong> sous la barre de recherche. Cliquer sur un onglet n\u2019affiche que les documents de ce type dans la m\u00eame vue, sans rechargement. L\u2019onglet Relev\u00e9s affiche les exportations de relev\u00e9 de compte g\u00e9n\u00e9r\u00e9es pr\u00e9c\u00e9demment.",
        help_q_mark_paid: "Comment marquer une facture comme pay\u00e9e\u00a0?",
        help_a_mark_paid: "Sur l\u2019\u00e9cran d\u2019accueil, ouvrez le menu \u00e0 trois points de la carte de facture et s\u00e9lectionnez le statut de paiement appropri\u00e9 \u2014 <strong>Impay\u00e9e</strong>, <strong>En attente</strong> ou <strong>Pay\u00e9e</strong>. Les factures pay\u00e9es sont signal\u00e9es visuellement et exclues des calculs de solde impay\u00e9.",
        help_q_save_client: "Comment enregistrer un client pour le r\u00e9utiliser\u00a0?",
        help_a_save_client: "À l\u2019\u00e9tape\u00a02 de l\u2019\u00e9diteur, entrez le nom et l\u2019adresse du client, puis cliquez sur <strong>Enregistrer le client</strong>. Les clients enregistr\u00e9s apparaissent dans le menu d\u00e9roulant pour les futurs documents. Changer de client restaure \u00e9galement ses champs de destinataire enregistr\u00e9s.",
        help_q_statement: "Qu\u2019est-ce qu\u2019un relev\u00e9 de compte\u00a0?",
        help_a_statement: "Un relev\u00e9 de compte est un r\u00e9sum\u00e9 PDF de factures s\u00e9lectionn\u00e9es pour un client sp\u00e9cifique \u2014 utile pour la r\u00e9conciliation et le suivi des paiements. Acc\u00e9dez-y depuis la section <strong>Rapports de factures</strong>. Les relev\u00e9s g\u00e9n\u00e9r\u00e9s sont enregistr\u00e9s et apparaissent sous l\u2019onglet <strong>Relev\u00e9s</strong>.",
        help_q_statement_icons: "Que font les ic\u00f4nes d\u2019action sur les lignes de relev\u00e9s\u00a0?",
        help_a_statement_icons: "Chaque relev\u00e9 enregistr\u00e9 poss\u00e8de trois boutons. L\u2019<strong>ic\u00f4ne en forme d\u2019\u0153il</strong> rouvre l\u2019exportation PDF. L\u2019<strong>ic\u00f4ne de crayon</strong> ouvre l\u2019\u00e9diteur de relev\u00e9 pour l\u2019ajuster. L\u2019<strong>ic\u00f4ne de corbeille</strong> supprime d\u00e9finitivement le relev\u00e9 enregistr\u00e9.",
        help_vl_statement_actions: "Boutons d\u2019action du relev\u00e9",
        help_vc_open: "Ouvrir",
        help_vc_delete: "Supprimer",
        help_q_language: "Comment changer la langue d\u2019affichage\u00a0?",
        help_a_language: "Utilisez le s\u00e9lecteur de langue dans la barre d\u2019outils (<strong>EN / ES / FR</strong>). L\u2019interface et les libell\u00e9s des documents seront imm\u00e9diatement mis \u00e0 jour dans la langue s\u00e9lectionn\u00e9e.",
        help_q_logo_sig: "Puis-je ajouter le logo et la signature de mon entreprise aux documents\u00a0?",
        help_a_logo_sig: "Oui. Ouvrez <strong>Profil d\u2019entreprise</strong> depuis le menu Outils. Vous pouvez t\u00e9l\u00e9verser une image d\u2019en-t\u00eate, une signature, un tampon et une vague de pied de page \u2014 tous apparaissant automatiquement dans les PDF export\u00e9s.",
        help_q_search: "Comment rechercher un document\u00a0?",
        help_a_search: "Utilisez la barre de recherche en haut de l\u2019\u00e9cran d\u2019accueil. Vous pouvez rechercher par nom de client, num\u00e9ro de r\u00e9f\u00e9rence, date ou tout mot-cl\u00e9 ajout\u00e9 \u00e0 l\u2019\u00e9tape\u00a04 de l\u2019\u00e9diteur. La recherche fonctionne pour tous les types de documents.",
        help_q_catalog: "Comment utiliser le Catalogue\u00a0?",
        help_a_catalog: "Cliquez sur <strong>Catalogue</strong> dans la navigation sup\u00e9rieure. Il affiche chaque ligne d\u2019article captur\u00e9e depuis les devis, les factures et le panier. Vous pouvez \u00e9galement ajouter des entr\u00e9es manuelles. Les articles du catalogue peuvent \u00eatre ins\u00e9r\u00e9s rapidement dans de nouveaux documents depuis le panier.",
        help_q_bug_report: "Comment signaler un bug ou demander une fonctionnalit\u00e9\u00a0?",
        help_a_bug_report: "Cliquez sur <strong>Soumettre / Signaler des probl\u00e8mes</strong> dans le pied de page. Renseignez un r\u00e9sum\u00e9, ajoutez des captures d\u2019\u00e9cran pertinentes et soumettez. Votre rapport est enregistr\u00e9 et visible par l\u2019administrateur dans le panneau Rapports de service sous <strong>Outils</strong>."
    }
};

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
    cacheElements();
    renderBrandAssets();
    bindEvents();
    init();
});

function getCurrentLanguage() {
    return TRANSLATIONS[state.currentLanguage] ? state.currentLanguage : "en";
}

function getCurrentLocale() {
    return LANGUAGE_LOCALES[getCurrentLanguage()] || "en-US";
}

function getUsdToDopRate() {
    const rate = Number(state.exchangeRateUsdToDop);
    return Number.isFinite(rate) && rate > 0 ? rate : DOP_PER_USD;
}

function t(key, vars = {}) {
    const language = getCurrentLanguage();
    const template = TRANSLATIONS[language]?.[key] ?? TRANSLATIONS.en[key] ?? key;
    return String(template).replace(/\{(\w+)\}/g, (_, token) => String(vars[token] ?? ""));
}

function setElementText(selector, value) {
    const element = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (element) {
        element.textContent = value;
    }
}

function setElementHtml(selector, value) {
    const element = typeof selector === "string" ? document.querySelector(selector) : selector;
    if (element) {
        element.innerHTML = value;
    }
}

function updateHeroOperationalSummary() {
    setElementText(".hero-copy h1", formatPrintedDate(new Date()));
    setElementText(".hero-copy p", `USD 1.00 = DOP ${formatAmount(getUsdToDopRate())}`);
    if (elements.currencyDisplayValue) {
        elements.currencyDisplayValue.textContent = formatAmount(getUsdToDopRate());
    }
}

function updateExchangeRateCopy() {
    updateHeroOperationalSummary();
    elements.itemsContainer.querySelectorAll(".item-currency-mode .field-help").forEach(helpText => {
        helpText.textContent = `Converts pesos back to USD using RD$${formatAmount(getUsdToDopRate())} = US$1.`;
    });
}

async function refreshExchangeRate() {
    try {
        const payload = await requestJSON("/api/exchange-rate");
        const rate = Number(payload?.rate);
        if (Number.isFinite(rate) && rate > 0) {
            state.exchangeRateUsdToDop = rate;
            updateExchangeRateCopy();
        }
    } catch (error) {
        updateExchangeRateCopy();
    }
}

function applyTranslations() {
    document.documentElement.lang = getCurrentLanguage();
    if (typeof window.applySantoBrandTheme === "function") {
        window.applySantoBrandTheme(document);
    }
    const currentLang = getCurrentLanguage();
    elements.languageSelect.value = currentLang;
    if (elements.mobileDrawerLanguageSelect) elements.mobileDrawerLanguageSelect.value = currentLang;

    setElementText(".access-card .eyebrow", t("login_kicker"));
    setElementText(".access-card h1", t("login_title"));
    setElementText(".access-card p", t("login_copy"));
    setElementText(document.querySelector('label[for="accessUsername"]'), t("username"));
    setElementText(document.querySelector('label[for="accessCode"]'), t("password"));
    elements.accessUsername.placeholder = t("username_placeholder");
    elements.accessCode.placeholder = t("password_placeholder");
    elements.accessError.textContent = t("login_error");
    setElementText(".access-submit-label", t("sign_in"));
    setElementText(".session-loader-card .eyebrow", t("session_loader_kicker"));
    setElementText(".session-loader-card h2", t("session_loader_title"));
    elements.sessionLoaderMessage.textContent = t("session_loader_message");
    setElementText("#brandSplashName", BRAND.name);
    setElementText("#brandSplashTagline", BRAND.tagline);
    setElementText("#accessBrandName", BRAND.name);
    setElementText("#accessBrandTagline", BRAND.tagline);
    document.getElementById("languagePickerLabel").textContent = t("language");
    elements.navMenuBtn.setAttribute("aria-label", t("menu"));
    elements.topbarSignOutBtn.textContent = t("sign_out");
    if (elements.mobileDrawerSignOutBtn) elements.mobileDrawerSignOutBtn.textContent = t("sign_out");
    elements.newMenuBtn.textContent = `+ ${t("new_quote").split(" ")[0]}`;
    elements.newQuoteMenuBtn.textContent = t("new_quote");
    elements.newInvoiceMenuBtn.textContent = t("new_invoice");
    elements.newStatementMenuBtn.textContent = t("open_statement_export");
    updateRuntimeModeBadge();
    elements.languageSelect.options[0].textContent = "🇺🇸 English";
    elements.languageSelect.options[1].textContent = "🇩🇴 Español";
    elements.languageSelect.options[2].textContent = "🇫🇷 Français";

    setElementText(".workspace-hero .eyebrow", t("hero_kicker"));
    updateHeroOperationalSummary();
    setElementText("#viewAllDocumentsBtn", t("documents"));
    setElementText("#reportsOpenInvoiceReportsBtn", t("invoice_reports"));
    if (!elements.importDocumentStatus.dataset.customized) {
        elements.importDocumentStatus.textContent = t("import_status_default");
        elements.importDocumentStatus.hidden = true;
    }
    setElementText(".overview-kicker", t("snapshot"));
    setElementText(elements.totalDocumentsStat.previousElementSibling, t("documents"));
    setElementText(elements.quoteCountStat.previousElementSibling, t("quotes"));
    if (state.valueView === "invoiced") {
        elements.totalValueLabel.textContent = t("amount_invoiced");
        elements.totalValueHint.textContent = t("tap_view_income");
    } else if (state.valueView === "income") {
        elements.totalValueLabel.textContent = t("income_received");
        elements.totalValueHint.textContent = t("tap_view_pipeline");
    } else {
        elements.totalValueLabel.textContent = t("pipeline_value");
        elements.totalValueHint.textContent = t("tap_view_invoiced");
    }
    setElementText("#catalogHeading", t("catalog_heading"));
    setElementText("#catalogCopy", t("catalog_copy"));
    setElementText("#openCatalogItemModalBtn", t("add_catalog_item"));
    setElementText("#catalogItemModalTitle", state.editingCatalogItemId ? t("update_catalog_item") : t("add_catalog_item"));
    setElementText("#catalogItemNameLabel", t("item_name"));
    setElementText("#catalogItemPriceLabel", t("unit_price_usd"));
    setElementText("#catalogItemCategoryLabel", t("category"));
    setElementText("#catalogItemBrandLabel", t("brand"));
    setElementText("#catalogItemUnitSizeLabel", t("unit_size"));
    setElementText("#catalogItemVendorLabel", t("vendor"));
    setElementText("#catalogItemDetailsLabel", t("item_details"));
    setElementText("#catalogItemNotesLabel", t("item_notes"));
    elements.saveCatalogItemBtn.textContent = state.editingCatalogItemId ? t("update_catalog_item") : t("save_catalog_item");
    setElementText(document.querySelector('.sort-field .search-label'), t("sort"));
    setElementText(document.querySelector('.search-field .search-label'), t("search"));
    elements.documentSearch.placeholder = t("search_placeholder");
    elements.documentSort.options[0].textContent = t("sort_ref_date_desc");
    elements.documentSort.options[1].textContent = t("sort_ref_date_asc");
    elements.documentSort.options[2].textContent = t("sort_date_desc");
    elements.documentSort.options[3].textContent = t("sort_date_asc");
    elements.documentSort.options[4].textContent = t("sort_created_desc");
    elements.documentSort.options[5].textContent = t("sort_created_asc");
    elements.filterButtons[0].textContent = t("filter_all");
    elements.filterButtons[1].textContent = t("quotes");
    elements.filterButtons[2].textContent = t("invoices");
    setElementText("#filterStatementsBtn", t("statements"));

    setElementText("#settingsModal h2", t("settings"));

    const settingsPanels = elements.settingsModal.querySelectorAll(".settings-panel");
    settingsPanels[0].querySelector("h4").textContent = t("issue_inbox");
    settingsPanels[0].querySelector(".settings-panel-header p").textContent = t("issue_inbox_copy");
    elements.settingsIssueInboxBtn.textContent = t("open_service_reports");
    settingsPanels[1].querySelector("h4").textContent = t("editor_preferences");
    settingsPanels[1].querySelector(".settings-panel-header p").textContent = t("editor_preferences_copy");
    settingsPanels[1].querySelector("span").textContent = t("show_internal_pricing");
    settingsPanels[2].querySelector("h4").textContent = "Data Export & Import";
    settingsPanels[2].querySelector(".settings-panel-header p").textContent = "Open a smaller data tools menu when you need templates, backups, imports, or selective export.";
    setElementText("#openDataToolsBtn", "Open Data Tools");
    setElementText("#dataToolsTitle", "Data Tools");
    setElementText("#dataToolsCopy", "Choose the export or import action you want, without crowding the main Tools page.");
    setElementText("#csvToolsTitle", t("csv_tools"));
    setElementText("#csvToolsCopy", t("csv_tools_copy"));
    elements.exportCsvTemplateBtn.textContent = t("export_csv_template");
    elements.importCsvBtn.textContent = t("import_csv");
    setElementText("#jsonBackupTitle", t("json_backup"));
    setElementText("#jsonBackupCopy", t("json_backup_copy"));
    elements.exportBackupBtn.textContent = t("export_backup");
    elements.importBackupBtn.textContent = t("import_backup");
    setElementText("#selectiveExportTitle", t("selective_export"));
    setElementText("#selectiveExportCopy", t("selective_export_copy"));
    elements.openExportSelectionBtn.textContent = t("export_selected_json");
    settingsPanels[3].querySelector("h4").textContent = t("local_testing");
    settingsPanels[3].querySelector(".settings-panel-header p").textContent = t("local_testing_copy");
    elements.clearLocalTestDataBtn.textContent = t("clear_local_test_data");

    setElementText("#exportModal h3", t("export_json_title"));
    setElementText("#exportModal .settings-copy", t("export_json_copy"));
    setElementText("#selectAllExportsToggle + span", t("select_all_documents"));
    elements.exportSelectedJsonBtn.textContent = t("download_selected_json");
    setElementText("#issueReportTitle", t("report_issue"));
    setElementText("#issueReportCopy", t("issue_report_copy"));
    setElementText("#issueSummaryLabel", t("issue_summary"));
    elements.issueSummaryInput.placeholder = t("issue_summary_placeholder");
    setElementText("#issueDetailsLabel", t("issue_details"));
    elements.issueDetailsInput.placeholder = t("issue_details_placeholder");
    setElementText("#issueScreenshotLabel", t("attach_screenshot"));
    setElementText("#issueScreenshotHint", t("attach_screenshot_help"));
    elements.submitIssueReportBtn.textContent = t("submit_report");
    setElementText("#issueInboxTitle", t("issue_inbox"));
    setElementText("#issueInboxCopy", t("issue_inbox_copy"));
    setElementText("#invoiceReportsTitle", t("invoice_reports"));
    setElementText("#invoiceReportsCopy", t("invoice_reports_copy"));
    setElementText("#invoiceReportsSortLabel", t("sort"));
    setElementText("#invoiceReportStartLabel", t("report_from"));
    setElementText("#invoiceReportEndLabel", t("report_to"));
    setElementText("#selectVisibleInvoiceReportsBtn", t("select_visible_reports"));
    setElementText("#clearVisibleInvoiceReportsBtn", t("clear_selection_reports"));
    setElementText("#openStatementExportBtn", t("review_selected_statement"));
    setElementText("#printInvoiceReportBtn", t("print_selected_reports"));
    setElementText("#exportInvoiceReportCsvBtn", t("export_selected_csv"));
    elements.invoiceReportSort.options[0].textContent = t("sort_client_asc");
    elements.invoiceReportSort.options[1].textContent = t("sort_client_desc");
    elements.invoiceReportFilterButtons[0].textContent = t("filter_all");
    elements.invoiceReportFilterButtons[1].textContent = t("payment_unpaid");
    elements.invoiceReportFilterButtons[2].textContent = t("payment_pending");
    elements.invoiceReportFilterButtons[3].textContent = t("payment_paid");
    setElementText("#statementExportTitle", t("statement_of_account_title"));
    setElementText("#statementExportCopy", t("statement_of_account_copy"));
    setElementText("#statementSelectionTitle", t("statement_no_selection"));
    setElementText("#statementSelectionMeta", t("statement_selection_help"));
    setElementText("#confirmStatementExportBtn", t("statement_generate_pdf"));
    setElementText("#statementsHeading", t("statements"));
    setElementText("#statementsCopy", t("statements_copy"));
    setElementText("#companyProfileTitle", t("company_profile"));
    setElementText("#companyProfileCopy", t("company_profile_copy"));
    const companyProfileLabels = elements.companyProfileModal.querySelectorAll(".form-group > span");
    if (companyProfileLabels.length >= 7) {
        companyProfileLabels[0].textContent = t("company_name");
        companyProfileLabels[1].textContent = t("company_tagline");
        companyProfileLabels[2].textContent = t("company_address");
        companyProfileLabels[3].textContent = t("company_email");
        companyProfileLabels[4].textContent = t("company_phone");
        companyProfileLabels[5].textContent = t("company_website");
        companyProfileLabels[6].textContent = t("company_tax_id");
    }
    elements.companyNameInput.placeholder = t("company_name");
    elements.companyTaglineInput.placeholder = BRAND.tagline;
    elements.companyAddressInput.placeholder = "123 Trade Avenue\nSanto Domingo, DR";
    elements.companyEmailInput.placeholder = "hello@santosync.com";
    elements.companyPhoneInput.placeholder = "+1 (809) 555-0110";
    elements.companyWebsiteInput.placeholder = "www.santosync.com";
    elements.companyTaxIdInput.placeholder = "RNC / EIN / Registration";
    elements.saveCompanyProfileBtn.textContent = t("save_company_profile");
    setElementText("#savedItemsTitle", t("saved_items"));
    setElementText("#savedItemsCopy", t("saved_items_copy"));
    setElementText("#savedItemsAddTitle", t("add_saved_item"));
    setElementText("#savedItemsAddCopy", t("add_saved_item_copy"));
    setElementText("#savedItemCreateTitle", state.editingSavedItemId ? t("edit") : t("save_item"));
    setElementText("#savedItemCreateCopy", t("add_saved_item_copy"));
    setElementText("#savedItemsLibraryTitle", t("saved_items_library"));
    setElementText("#savedItemsLibraryCopy", t("saved_items_library_copy"));
    setElementText("#savedItemDescriptionLabel", t("item_description"));
    setElementText("#savedItemQuantityLabel", t("quantity"));
    setElementText("#savedItemUnitPriceLabel", t("unit_price_usd"));
    setElementText("#savedItemTotalLabel", t("total_usd"));
    setElementText(".saved-item-image-upload-copy strong", t("item_image"));
    elements.addSavedItemBtn.textContent = state.editingSavedItemId ? t("update_cart_item") : t("save_item");
    const savedItemsToggleText = elements.toggleSavedItemsFormBtn.querySelector(".saved-items-toggle-text");
    if (savedItemsToggleText) {
        savedItemsToggleText.textContent = t("add_cart_item");
    }
    elements.toggleSavedItemsFormBtn.setAttribute("aria-label", t("add_cart_item"));
    elements.toggleSavedItemsFormBtn.setAttribute("title", t("add_cart_item"));
    elements.openSavedItemsBtn.setAttribute("aria-label", t("open_pending_cart"));
    elements.openSavedItemsBtn.setAttribute("title", t("open_pending_cart"));
    setElementText("#aboutModalTitle", t("about_veloris"));
    setElementText("#aboutBrandName", BRAND.name);
    setElementText("#aboutBrandMeaning", t("about_brand_meaning"));
    setElementText("#aboutProductCopy", t("about_product_copy"));
    setElementText("#aboutDeveloperCopy", t("about_developer_copy"));
    elements.openAboutBtn.textContent = t("about_veloris");
    elements.openIssueReportBtn.textContent = t("footer_report_cta");
    if (elements.footerUpdated) {
        const updatedDate = new Date(APP_LAST_UPDATED);
        elements.footerUpdated.textContent = `Updated ${updatedDate.toLocaleDateString(getCurrentLocale(), { year: "numeric", month: "short", day: "numeric" })}`;
    }

    renderBrandAssets();
    updateStaticEditorTranslations();
    updateEditorSummary();
    renderUserManagementList();
    renderClientManagementList();
    renderIssueInbox();
    renderInvoiceReport();
    updateInboxBadge();
    renderExportSelectionList();
    renderSavedItemsList();
    renderDocuments();
    renderCatalog();
    updateHelpTranslations();
    applyPageState();
}

function renderBrandAssets() {
    if (typeof window.renderSantoLogo !== "function") {
        return;
    }

    window.renderSantoLogo(elements.brandSplashLogo, "monogram");
    window.renderSantoLogo(elements.accessBrandLogo, "monogram");
    window.renderSantoLogo(elements.sessionLoaderLogo, "monogram");
    window.renderSantoLogo(elements.sidebarBrandLogo, "monogram");
    window.renderSantoLogo(elements.aboutBrandLogo, "monogram");
}

function updateStaticEditorTranslations() {
    elements.stepIndicator.querySelectorAll(".step .step-label")[0].textContent = t("type_info");
    elements.stepIndicator.querySelectorAll(".step .step-label")[1].textContent = t("client_details");
    elements.stepIndicator.querySelectorAll(".step .step-label")[2].textContent = t("line_items");
    elements.stepIndicator.querySelectorAll(".step .step-label")[3].textContent = t("keywords");
    elements.stepIndicator.querySelectorAll(".step .step-label")[4].textContent = t("items_preview");
    elements.stepIndicator.querySelectorAll(".step .step-label")[5].textContent = t("review");
    setElementText(".step-intro-label", t("current_step"));
    setElementText(document.querySelector('.sidebar-card .sidebar-label'), t("document_summary"));
    setElementText(document.querySelectorAll('.sidebar-card .sidebar-label')[1], t("client"));
    setElementText(document.querySelectorAll('.sidebar-card .sidebar-label')[2], t("commercial_snapshot"));
    setElementText(document.querySelectorAll('.sidebar-card .sidebar-label')[3], t("pdf_options"));
    setElementText(document.querySelectorAll('.sidebar-card .sidebar-label')[4], t("workflow_tip"));
    setElementText(document.querySelector('#includeSignature + span'), t("include_signature"));
    setElementText(document.querySelector('#includeSignature').closest('.sidebar-card').querySelector('.field-help'), t("include_signature_help"));
    setElementText(document.querySelector('#includeStamp + span'), t("include_stamp"));
    setElementText(document.querySelector('#includeStamp').closest('.sidebar-card').querySelectorAll('.field-help')[1], t("include_stamp_help"));
    elements.prevBtn.textContent = t("previous");
    elements.nextBtn.textContent = t("next");
}

async function handleLanguageChange(event) {
    const nextLanguage = event.target.value;
    state.currentLanguage = TRANSLATIONS[nextLanguage] ? nextLanguage : "en";
    if (elements.languageSelect) elements.languageSelect.value = state.currentLanguage;
    if (elements.mobileDrawerLanguageSelect) elements.mobileDrawerLanguageSelect.value = state.currentLanguage;

    if (state.currentUser) {
        state.currentUser.language = state.currentLanguage;
        sessionStorage.setItem(CURRENT_SESSION_STORAGE_KEY, JSON.stringify(state.currentUser));
        await saveUserAccounts(state.userAccounts.map(user =>
            user.id === state.currentUser.userId ? { ...user, language: state.currentLanguage } : user
        ));
    }

    applyTranslations();
}

function cacheElements() {
    elements.accessGate = document.getElementById("accessGate");
    elements.adminAppShell = document.getElementById("adminAppShell");
    elements.accessForm = document.getElementById("accessForm");
    elements.accessUsername = document.getElementById("accessUsername");
    elements.accessCode = document.getElementById("accessCode");
    elements.accessSubmitBtn = document.getElementById("accessSubmitBtn");
    elements.accessError = document.getElementById("accessError");
    elements.brandSplash = document.getElementById("brandSplash");
    elements.brandSplashLogo = document.getElementById("brandSplashLogo");
    elements.accessBrandLogo = document.getElementById("accessBrandLogo");
    elements.sessionLoaderLogo = document.getElementById("sessionLoaderLogo");
    elements.sessionLoader = document.getElementById("sessionLoader");
    elements.sessionLoaderMessage = document.getElementById("sessionLoaderMessage");
    elements.runtimeModeBadge = document.getElementById("runtimeModeBadge");
    elements.environmentBadge = document.getElementById("environmentBadge");
    elements.currencyDisplayValue = document.getElementById("currencyDisplayValue");
    elements.workspaceShell = document.querySelector(".workspace-shell");
    elements.overviewPage = document.getElementById("overviewPage");
    elements.documentsPage = document.getElementById("documentsPage");
    elements.clientsPage = document.getElementById("clientsPage");
    elements.reportsPage = document.getElementById("reportsPage");
    elements.sidebarNav = document.getElementById("sidebarNav");
    elements.sidebarBrandLogo = document.getElementById("sidebarBrandLogo");
    elements.pageNavButtons = Array.from(document.querySelectorAll("[data-page-nav]"));
    elements.settingsNavBtn = document.getElementById("settingsNavBtn");
    elements.settingsDrawerBtn = document.getElementById("settingsDrawerBtn");
    elements.mobileDrawer = document.getElementById("mobileDrawer");
    elements.mobileNavBackdrop = document.getElementById("mobileNavBackdrop");
    elements.closeMobileDrawerBtn = document.getElementById("closeMobileDrawerBtn");
    elements.settingsModal = document.getElementById("settingsModal");
    elements.sessionBadge = document.getElementById("sessionBadge");
    elements.navMenuBtn = document.getElementById("navMenuBtn");
    elements.newMenuBtn = document.getElementById("newMenuBtn");
    elements.newMenu = document.getElementById("newMenu");
    elements.newQuoteMenuBtn = document.getElementById("newQuoteMenuBtn");
    elements.newInvoiceMenuBtn = document.getElementById("newInvoiceMenuBtn");
    elements.newStatementMenuBtn = document.getElementById("newStatementMenuBtn");
    elements.topbarSignOutBtn = document.getElementById("topbarSignOutBtn");
    elements.mobileDrawerSignOutBtn = document.getElementById("mobileDrawerSignOutBtn");
    elements.languageSelect = document.getElementById("languageSelect");
    elements.mobileDrawerLanguageSelect = document.querySelector(".mobile-drawer-language-select");
    elements.dataToolsModal = document.getElementById("dataToolsModal");
    elements.openDataToolsBtn = document.getElementById("openDataToolsBtn");
    elements.closeDataToolsModalBtn = document.getElementById("closeDataToolsModalBtn");
    elements.exportModal = document.getElementById("exportModal");
    elements.openExportSelectionBtn = document.getElementById("openExportSelectionBtn");
    elements.closeExportModalBtn = document.getElementById("closeExportModalBtn");
    elements.selectAllExportsToggle = document.getElementById("selectAllExportsToggle");
    elements.exportSelectionList = document.getElementById("exportSelectionList");
    elements.exportSelectedJsonBtn = document.getElementById("exportSelectedJsonBtn");
    elements.issueReportModal = document.getElementById("issueReportModal");
    elements.openIssueReportBtn = document.getElementById("openIssueReportBtn");
    elements.presetThisMonthBtn = document.getElementById("presetThisMonthBtn");
    elements.presetLast30Btn = document.getElementById("presetLast30Btn");
    elements.presetThisYearBtn = document.getElementById("presetThisYearBtn");
    elements.presetClearDatesBtn = document.getElementById("presetClearDatesBtn");
    elements.openAboutBtn = document.getElementById("openAboutBtn");
    elements.footerUpdated = document.getElementById("footerUpdated");
    elements.footerHelpBtn = document.getElementById("footerHelpBtn");
    elements.footerHelpMenu = document.getElementById("footerHelpMenu");
    elements.footerHelpWrap = document.getElementById("footerHelpWrap");
    elements.helpModal = document.getElementById("helpModal");
    elements.closeHelpModalBtn = document.getElementById("closeHelpModalBtn");
    elements.helpSearch = document.getElementById("helpSearch");
    elements.helpNoResults = document.getElementById("helpNoResults");
    elements.closeIssueReportModalBtn = document.getElementById("closeIssueReportModalBtn");
    elements.issueSummaryInput = document.getElementById("issueSummaryInput");
    elements.issueDetailsInput = document.getElementById("issueDetailsInput");
    elements.issueScreenshotInput = document.getElementById("issueScreenshotInput");
    elements.issueReportStatus = document.getElementById("issueReportStatus");
    elements.submitIssueReportBtn = document.getElementById("submitIssueReportBtn");
    elements.issueInboxModal = document.getElementById("issueInboxModal");
    elements.closeIssueInboxModalBtn = document.getElementById("closeIssueInboxModalBtn");
    elements.issueInboxList = document.getElementById("issueInboxList");
    elements.settingsIssueInboxBtn = document.getElementById("settingsIssueInboxBtn");
    elements.invoiceReportsModal = document.getElementById("invoiceReportsModal");
    elements.reportsOpenInvoiceReportsBtn = document.getElementById("reportsOpenInvoiceReportsBtn");
    elements.closeInvoiceReportsModalBtn = document.getElementById("closeInvoiceReportsModalBtn");
    elements.invoiceReportSort = document.getElementById("invoiceReportSort");
    elements.invoiceReportStartDate = document.getElementById("invoiceReportStartDate");
    elements.invoiceReportEndDate = document.getElementById("invoiceReportEndDate");
    elements.invoiceReportFilterButtons = Array.from(document.querySelectorAll("[data-invoice-report-filter]"));
    elements.invoiceReportSummary = document.getElementById("invoiceReportSummary");
    elements.invoiceReportList = document.getElementById("invoiceReportList");
    elements.selectVisibleInvoiceReportsBtn = document.getElementById("selectVisibleInvoiceReportsBtn");
    elements.clearVisibleInvoiceReportsBtn = document.getElementById("clearVisibleInvoiceReportsBtn");
    elements.openStatementExportBtn = document.getElementById("openStatementExportBtn");
    elements.invoiceReportExportMoreBtn = document.getElementById("invoiceReportExportMoreBtn");
    elements.invoiceReportExportMoreMenu = document.getElementById("invoiceReportExportMoreMenu");
    elements.printInvoiceReportBtn = document.getElementById("printInvoiceReportBtn");
    elements.exportInvoiceReportCsvBtn = document.getElementById("exportInvoiceReportCsvBtn");
    elements.statementSelectionToolbar = document.getElementById("statementSelectionToolbar");
    elements.statementSelectionTitle = document.getElementById("statementSelectionTitle");
    elements.statementSelectionMeta = document.getElementById("statementSelectionMeta");
    elements.statementSelectionTotal = document.getElementById("statementSelectionTotal");
    elements.statementSelectionOutstanding = document.getElementById("statementSelectionOutstanding");
    elements.statementExportModal = document.getElementById("statementExportModal");
    elements.closeStatementExportModalBtn = document.getElementById("closeStatementExportModalBtn");
    elements.statementExportSteps = Array.from(document.querySelectorAll("[data-statement-export-step]"));
    elements.statementExportStageLabel = document.getElementById("statementExportStageLabel");
    elements.statementExportStageTitle = document.getElementById("statementExportStageTitle");
    elements.statementExportStageCopy = document.getElementById("statementExportStageCopy");
    elements.statementExportOverviewPanel = document.getElementById("statementExportOverviewPanel");
    elements.statementExportRowsPanel = document.getElementById("statementExportRowsPanel");
    elements.statementExportConfirmPanel = document.getElementById("statementExportConfirmPanel");
    elements.statementExportOverview = document.getElementById("statementExportOverview");
    elements.statementExportTableBody = document.getElementById("statementExportTableBody");
    elements.statementExportSnapshot = document.getElementById("statementExportSnapshot");
    elements.statementExportBackBtn = document.getElementById("statementExportBackBtn");
    elements.statementExportNextBtn = document.getElementById("statementExportNextBtn");
    elements.confirmStatementExportBtn = document.getElementById("confirmStatementExportBtn");
    elements.statementEditModal = document.getElementById("statementEditModal");
    elements.closeStatementEditModalBtn = document.getElementById("closeStatementEditModalBtn");
    elements.statementEditSummary = document.getElementById("statementEditSummary");
    elements.statementEditRows = document.getElementById("statementEditRows");
    elements.statementEditDeductions = document.getElementById("statementEditDeductions");
    elements.statementEditTotals = document.getElementById("statementEditTotals");
    elements.statementEditNoteInput = document.getElementById("statementEditNoteInput");
    elements.addStatementRowBtn = document.getElementById("addStatementRowBtn");
    elements.addStatementDeductionBtn = document.getElementById("addStatementDeductionBtn");
    elements.previewStatementEditBtn = document.getElementById("previewStatementEditBtn");
    elements.saveStatementEditBtn = document.getElementById("saveStatementEditBtn");
    elements.companyProfileModal = document.getElementById("companyProfileModal");
    elements.savedItemsModal = document.getElementById("savedItemsModal");
    elements.savedItemCreateModal = document.getElementById("savedItemCreateModal");
    elements.savedItemImageModal = document.getElementById("savedItemImageModal");
    elements.catalogPage = document.getElementById("catalogPage");
    elements.statementsPage = document.getElementById("statementsPage");
    elements.statementExportsList = document.getElementById("statementExportsList");
    elements.accountAdminPage = document.getElementById("accountAdminPage");
    elements.accountAdminWorkspaceBtn = document.getElementById("accountAdminWorkspaceBtn");
    elements.accountAdminCatalogBtn = document.getElementById("accountAdminCatalogBtn");
    elements.accountAdminOwnerName = document.getElementById("accountAdminOwnerName");
    elements.accountAdminOwnerMeta = document.getElementById("accountAdminOwnerMeta");
    elements.accountAdminOwnerBadge = document.getElementById("accountAdminOwnerBadge");
    elements.accountUserCountStat = document.getElementById("accountUserCountStat");
    elements.accountSubaccountCountStat = document.getElementById("accountSubaccountCountStat");
    elements.accountSessionCountStat = document.getElementById("accountSessionCountStat");
    elements.accountActivityCountStat = document.getElementById("accountActivityCountStat");
    elements.accountAdminUserList = document.getElementById("accountAdminUserList");
    elements.accountAdminFormTitle = document.getElementById("accountAdminFormTitle");
    elements.accountAdminDisplayNameInput = document.getElementById("accountAdminDisplayNameInput");
    elements.accountAdminUsernameInput = document.getElementById("accountAdminUsernameInput");
    elements.accountAdminEmailInput = document.getElementById("accountAdminEmailInput");
    elements.accountAdminPasswordInput = document.getElementById("accountAdminPasswordInput");
    elements.accountAdminRoleSelect = document.getElementById("accountAdminRoleSelect");
    elements.accountAdminAccessLevelSelect = document.getElementById("accountAdminAccessLevelSelect");
    elements.accountAdminParentSelect = document.getElementById("accountAdminParentSelect");
    elements.accountAdminSaveBtn = document.getElementById("accountAdminSaveBtn");
    elements.accountAdminCancelEditBtn = document.getElementById("accountAdminCancelEditBtn");
    elements.accountSignatureInput = document.getElementById("accountSignatureInput");
    elements.accountStampInput = document.getElementById("accountStampInput");
    elements.accountSignaturePreview = document.getElementById("accountSignaturePreview");
    elements.accountStampPreview = document.getElementById("accountStampPreview");
    elements.accountSignatureFallback = document.getElementById("accountSignatureFallback");
    elements.accountStampFallback = document.getElementById("accountStampFallback");
    elements.saveBrandAssetsBtn = document.getElementById("saveBrandAssetsBtn");
    elements.clearSignatureAssetBtn = document.getElementById("clearSignatureAssetBtn");
    elements.clearStampAssetBtn = document.getElementById("clearStampAssetBtn");
    elements.accountSessionLogList = document.getElementById("accountSessionLogList");
    elements.accountActivityLogList = document.getElementById("accountActivityLogList");
    elements.catalogGrid = document.getElementById("catalogGrid");
    elements.openCatalogItemModalBtn = document.getElementById("openCatalogItemModalBtn");
    elements.catalogItemModal = document.getElementById("catalogItemModal");
    elements.closeCatalogItemModalBtn = document.getElementById("closeCatalogItemModalBtn");
    elements.catalogDetailsModal = document.getElementById("catalogDetailsModal");
    elements.closeCatalogDetailsModalBtn = document.getElementById("closeCatalogDetailsModalBtn");
    elements.catalogDetailsTitle = document.getElementById("catalogDetailsTitle");
    elements.catalogDetailsImage = document.getElementById("catalogDetailsImage");
    elements.catalogDetailsFallback = document.getElementById("catalogDetailsFallback");
    elements.catalogDetailsName = document.getElementById("catalogDetailsName");
    elements.catalogDetailsMeta = document.getElementById("catalogDetailsMeta");
    elements.catalogDetailsPrice = document.getElementById("catalogDetailsPrice");
    elements.catalogDetailsCategory = document.getElementById("catalogDetailsCategory");
    elements.catalogDetailsBrand = document.getElementById("catalogDetailsBrand");
    elements.catalogDetailsUnitSize = document.getElementById("catalogDetailsUnitSize");
    elements.catalogDetailsVendor = document.getElementById("catalogDetailsVendor");
    elements.catalogDetailsText = document.getElementById("catalogDetailsText");
    elements.catalogDetailsNotes = document.getElementById("catalogDetailsNotes");
    elements.catalogItemNameInput = document.getElementById("catalogItemNameInput");
    elements.catalogItemPriceInput = document.getElementById("catalogItemPriceInput");
    elements.catalogItemCategoryInput = document.getElementById("catalogItemCategoryInput");
    elements.catalogItemBrandInput = document.getElementById("catalogItemBrandInput");
    elements.catalogItemUnitSizeInput = document.getElementById("catalogItemUnitSizeInput");
    elements.catalogItemVendorInput = document.getElementById("catalogItemVendorInput");
    elements.catalogItemDetailsInput = document.getElementById("catalogItemDetailsInput");
    elements.catalogItemNotesInput = document.getElementById("catalogItemNotesInput");
    elements.saveCatalogItemBtn = document.getElementById("saveCatalogItemBtn");
    elements.openSavedItemsBtn = document.getElementById("openSavedItemsBtn");
    elements.openSavedItemsInlineCount = document.getElementById("openSavedItemsInlineCount");
    elements.closeCompanyProfileModalBtn = document.getElementById("closeCompanyProfileModalBtn");
    elements.closeSavedItemsModalBtn = document.getElementById("closeSavedItemsModalBtn");
    elements.toggleSavedItemsFormBtn = document.getElementById("toggleSavedItemsFormBtn");
    elements.closeSavedItemCreateModalBtn = document.getElementById("closeSavedItemCreateModalBtn");
    elements.closeSavedItemImageModalBtn = document.getElementById("closeSavedItemImageModalBtn");
    elements.companyNameInput = document.getElementById("companyNameInput");
    elements.companyTaglineInput = document.getElementById("companyTaglineInput");
    elements.companyAddressInput = document.getElementById("companyAddressInput");
    elements.companyEmailInput = document.getElementById("companyEmailInput");
    elements.companyPhoneInput = document.getElementById("companyPhoneInput");
    elements.companyWebsiteInput = document.getElementById("companyWebsiteInput");
    elements.companyTaxIdInput = document.getElementById("companyTaxIdInput");
    elements.saveCompanyProfileBtn = document.getElementById("saveCompanyProfileBtn");
    elements.savedItemsList = document.getElementById("savedItemsList");
    elements.savedItemDescriptionInput = document.getElementById("savedItemDescriptionInput");
    elements.savedItemImageInput = document.getElementById("savedItemImageInput");
    elements.savedItemImagePreview = document.getElementById("savedItemImagePreview");
    elements.savedItemImagePreviewImg = document.getElementById("savedItemImagePreviewImg");
    elements.savedItemImageModalImg = document.getElementById("savedItemImageModalImg");
    elements.savedItemImageRemoveBtn = document.getElementById("savedItemImageRemoveBtn");
    elements.savedItemQuantityInput = document.getElementById("savedItemQuantityInput");
    elements.savedItemUnitPriceInput = document.getElementById("savedItemUnitPriceInput");
    elements.savedItemTotalInput = document.getElementById("savedItemTotalInput");
    elements.addSavedItemBtn = document.getElementById("addSavedItemBtn");
    elements.aboutModal = document.getElementById("aboutModal");
    elements.aboutBrandLogo = document.getElementById("aboutBrandLogo");
    elements.closeAboutModalBtn = document.getElementById("closeAboutModalBtn");
    elements.showInternalPricingToggle = document.getElementById("showInternalPricingToggle");
    elements.clientManagementList = document.getElementById("clientManagementList");
    elements.documentModal = document.getElementById("documentModal");
    elements.editorProgressStep = document.getElementById("editorProgressStep");
    elements.editorProgressTitle = document.getElementById("editorProgressTitle");
    elements.editorProgressFill = document.getElementById("editorProgressFill");
    elements.editorMobileSummary = document.getElementById("editorMobileSummary");
    elements.editorMobileSummaryType = document.getElementById("editorMobileSummaryType");
    elements.editorMobileSummaryRef = document.getElementById("editorMobileSummaryRef");
    elements.editorMobileSummaryClient = document.getElementById("editorMobileSummaryClient");
    elements.editorMobileSummaryTotal = document.getElementById("editorMobileSummaryTotal");
    elements.stepIndicator = document.querySelector(".step-indicator");
    elements.modalTitle = document.getElementById("modalTitle");
    elements.documentsGrid = document.getElementById("documentsGrid");
    elements.docType = document.getElementById("docType");
    elements.refNumber = document.getElementById("refNumber");
    elements.docDate = document.getElementById("docDate");
    elements.poNumber = document.getElementById("poNumber");
    elements.docTags = document.getElementById("docTags");
    elements.clientSelect = document.getElementById("clientSelect");
    elements.clientName = document.getElementById("clientName");
    elements.clientAddress = document.getElementById("clientAddress");
    elements.consigneeName = document.getElementById("consigneeName");
    elements.consigneeAddress = document.getElementById("consigneeAddress");
    elements.notes = document.getElementById("notes");
    elements.paymentTerms = document.getElementById("paymentTerms");
    elements.includeSignature = document.getElementById("includeSignature");
    elements.includeStamp = document.getElementById("includeStamp");
    elements.itemsContainer = document.getElementById("itemsContainer");
    elements.lineItemsPreviewContainer = document.getElementById("lineItemsPreviewContainer");
    elements.previewContainer = document.getElementById("previewContainer");
    elements.prevBtn = document.getElementById("prevBtn");
    elements.nextBtn = document.getElementById("nextBtn");
    elements.saveBtn = document.getElementById("saveBtn");
    elements.exportPdfBtn = document.getElementById("exportPdfBtn");
    elements.overviewNewBtn = document.getElementById("overviewNewBtn");
    elements.overviewNewMenu = document.getElementById("overviewNewMenu");
    elements.overviewNewQuoteBtn = document.getElementById("overviewNewQuoteBtn");
    elements.overviewNewInvoiceBtn = document.getElementById("overviewNewInvoiceBtn");
    elements.overviewNewStatementBtn = document.getElementById("overviewNewStatementBtn");
    elements.viewAllDocumentsBtn = document.getElementById("viewAllDocumentsBtn");
    elements.overviewRecentDocuments = document.getElementById("overviewRecentDocuments");
    elements.overviewSummaryGrid = document.getElementById("overviewSummaryGrid");
    elements.calculatorLauncherModal = document.getElementById("calculatorLauncherModal");
    elements.exportCsvTemplateBtn = document.getElementById("exportCsvTemplateBtn");
    elements.importCsvBtn = document.getElementById("importCsvBtn");
    elements.exportBackupBtn = document.getElementById("exportBackupBtn");
    elements.importBackupBtn = document.getElementById("importBackupBtn");
    elements.clearLocalTestDataBtn = document.getElementById("clearLocalTestDataBtn");
    elements.importBackupInput = document.getElementById("importBackupInput");
    elements.importDocumentStatus = document.getElementById("importDocumentStatus");
    elements.closeModalBtn = document.getElementById("closeModalBtn");
    elements.saveClientBtn = document.getElementById("saveClientBtn");
    elements.addItemBtn = document.getElementById("addItemBtn");
    elements.addAnotherItemBtn = document.getElementById("addAnotherItemBtn");
    elements.totalDocumentsStat = document.getElementById("totalDocumentsStat");
    elements.quoteCountStat = document.getElementById("quoteCountStat");
    elements.totalValueStat = document.getElementById("totalValueStat");
    elements.totalValueLabel = document.getElementById("totalValueLabel");
    elements.totalValueHint = document.getElementById("totalValueHint");
    elements.valueToggleCard = document.getElementById("valueToggleCard");
    elements.overviewMobileToggle = document.getElementById("overviewMobileToggle");
    elements.overviewMobileToggleValue = document.getElementById("overviewMobileToggleValue");
    elements.overviewMobileToggleMeta = document.getElementById("overviewMobileToggleMeta");
    elements.overviewMobileToggleLabel = document.getElementById("overviewMobileToggleLabel");
    elements.overviewPanel = document.querySelector(".overview-panel");
    elements.workspaceHero = document.querySelector(".workspace-hero");
    elements.documentSearch = document.getElementById("documentSearch");
    elements.documentSort = document.getElementById("documentSort");
    elements.filterButtons = Array.from(document.querySelectorAll("[data-filter]"));
    elements.stepIntroTitle = document.getElementById("stepIntroTitle");
    elements.stepIntroText = document.getElementById("stepIntroText");
    elements.summaryDocType = document.getElementById("summaryDocType");
    elements.summaryRef = document.getElementById("summaryRef");
    elements.summaryDate = document.getElementById("summaryDate");
    elements.summaryClient = document.getElementById("summaryClient");
    elements.summaryAddress = document.getElementById("summaryAddress");
    elements.summaryItems = document.getElementById("summaryItems");
    elements.summaryTotal = document.getElementById("summaryTotal");
    elements.summaryTags = document.getElementById("summaryTags");
    elements.tagSuggestions = document.getElementById("tagSuggestions");
    elements.sidebarTip = document.getElementById("sidebarTip");
    elements.calculatorWidget = document.getElementById("calculatorWidget");
    elements.calculatorDragHandle = document.getElementById("calculatorDragHandle");
    elements.calculatorMinimizeBtn = document.getElementById("calculatorMinimizeBtn");
    elements.calculatorCloseBtn = document.getElementById("calculatorCloseBtn");
    elements.calculatorDisplay = document.getElementById("calculatorDisplay");
    elements.calculatorGrid = document.getElementById("calculatorGrid");
}

function bindEvents() {
    elements.accessForm.addEventListener("submit", handleAccessSubmit);
    elements.overviewNewBtn?.addEventListener("click", toggleOverviewNewMenu);
    elements.overviewNewQuoteBtn?.addEventListener("click", () => {
        closeOverviewNewMenu();
        prepareNewDocument("quote");
        openModal("quote");
    });
    elements.overviewNewInvoiceBtn?.addEventListener("click", () => {
        closeOverviewNewMenu();
        prepareNewDocument("invoice");
        openModal("invoice");
    });
    elements.overviewNewStatementBtn?.addEventListener("click", () => {
        closeOverviewNewMenu();
        openInvoiceReportsModal();
    });
    elements.newQuoteMenuBtn?.addEventListener("click", () => {
        closeNewMenu();
        prepareNewDocument("quote");
        openModal("quote");
    });
    elements.newInvoiceMenuBtn?.addEventListener("click", () => {
        closeNewMenu();
        prepareNewDocument("invoice");
        openModal("invoice");
    });
    elements.newStatementMenuBtn?.addEventListener("click", () => {
        closeNewMenu();
        openInvoiceReportsModal();
    });
    elements.languageSelect.addEventListener("change", handleLanguageChange);
    elements.mobileDrawerLanguageSelect?.addEventListener("change", handleLanguageChange);
    elements.settingsIssueInboxBtn.addEventListener("click", openIssueInboxFromSettings);
    elements.navMenuBtn.addEventListener("click", toggleMobileDrawer);
    elements.newMenuBtn?.addEventListener("click", toggleNewMenu);
    elements.closeMobileDrawerBtn?.addEventListener("click", closeMobileDrawer);
    elements.mobileNavBackdrop?.addEventListener("click", closeMobileDrawer);
    elements.pageNavButtons.forEach(button => {
        button.addEventListener("click", () => {
            setActivePage(button.dataset.pageNav);
            closeMobileDrawer();
        });
    });
    elements.topbarSignOutBtn.addEventListener("click", handleEndSessionClick);
    elements.mobileDrawerSignOutBtn?.addEventListener("click", handleEndSessionClick);
    elements.openDataToolsBtn?.addEventListener("click", openDataToolsModal);
    elements.closeDataToolsModalBtn?.addEventListener("click", closeDataToolsModal);
    elements.exportCsvTemplateBtn.addEventListener("click", exportCsvTemplate);
    elements.importCsvBtn.addEventListener("click", openCsvImportPicker);
    elements.exportBackupBtn.addEventListener("click", exportSystemBackup);
    elements.openExportSelectionBtn.addEventListener("click", openExportModal);
    elements.closeExportModalBtn.addEventListener("click", closeExportModal);
    elements.selectAllExportsToggle.addEventListener("change", handleSelectAllExportsToggle);
    elements.exportSelectedJsonBtn.addEventListener("click", exportSelectedDocuments);
    elements.openIssueReportBtn.addEventListener("click", openIssueReportModal);
    elements.openSavedItemsBtn.addEventListener("click", openSavedItemsModal);
    elements.openAboutBtn.addEventListener("click", openAboutModal);
    elements.closeIssueReportModalBtn.addEventListener("click", closeIssueReportModal);
    elements.closeCompanyProfileModalBtn.addEventListener("click", closeCompanyProfileModal);
    elements.closeSavedItemsModalBtn.addEventListener("click", closeSavedItemsModal);
    elements.closeSavedItemCreateModalBtn.addEventListener("click", closeSavedItemCreateModal);
    elements.closeSavedItemImageModalBtn?.addEventListener("click", closeSavedItemImageModal);
    elements.toggleSavedItemsFormBtn.addEventListener("click", openSavedItemCreateModal);
    elements.accountAdminWorkspaceBtn?.addEventListener("click", () => setActivePage("overview"));
    elements.accountAdminCatalogBtn?.addEventListener("click", openCatalogPage);
    elements.openCatalogItemModalBtn.addEventListener("click", openCatalogItemModal);
    elements.closeCatalogItemModalBtn.addEventListener("click", closeCatalogItemModal);
    elements.closeCatalogDetailsModalBtn.addEventListener("click", closeCatalogDetailsModal);
    elements.saveCatalogItemBtn.addEventListener("click", saveCatalogItemFromModal);
    elements.catalogGrid.addEventListener("click", handleCatalogGridClick);
    elements.statementExportsList?.addEventListener("click", handleStatementExportsListClick);
    elements.closeAboutModalBtn.addEventListener("click", closeAboutModal);
    elements.footerHelpBtn?.addEventListener("click", toggleHelpMenu);
    elements.footerHelpMenu?.addEventListener("click", handleHelpMenuItemClick);
    elements.closeHelpModalBtn?.addEventListener("click", closeHelpModal);
    document.addEventListener("click", handleHelpMenuOutsideClick);
    initHelpSearch();
    initHelpIndex();
    elements.issueScreenshotInput.addEventListener("change", handleIssueScreenshotChange);
    elements.submitIssueReportBtn.addEventListener("click", submitIssueReport);
    elements.closeIssueInboxModalBtn.addEventListener("click", closeIssueInboxModal);
    elements.closeInvoiceReportsModalBtn.addEventListener("click", closeInvoiceReportsModal);
    elements.reportsOpenInvoiceReportsBtn?.addEventListener("click", openInvoiceReportsModal);
    elements.invoiceReportSort.addEventListener("change", renderInvoiceReport);
    elements.invoiceReportStartDate.addEventListener("change", () => { document.querySelectorAll(".preset-chip").forEach(b => b.classList.remove("active")); renderInvoiceReport(); });
    elements.invoiceReportEndDate.addEventListener("change", () => { document.querySelectorAll(".preset-chip").forEach(b => b.classList.remove("active")); renderInvoiceReport(); });
    elements.selectVisibleInvoiceReportsBtn.addEventListener("click", selectVisibleInvoiceReports);
    elements.clearVisibleInvoiceReportsBtn.addEventListener("click", clearSelectedInvoiceReports);
    elements.openStatementExportBtn.addEventListener("click", openStatementExportModal);
    elements.invoiceReportExportMoreBtn?.addEventListener("click", toggleInvoiceReportExportMenu);
    elements.printInvoiceReportBtn.addEventListener("click", printSelectedInvoiceReports);
    elements.exportInvoiceReportCsvBtn.addEventListener("click", exportSelectedInvoiceReportCsv);
    elements.invoiceReportFilterButtons.forEach(button => {
        button.addEventListener("click", handleInvoiceReportFilterClick);
    });
    elements.invoiceReportList.addEventListener("change", handleInvoiceReportListChange);
    elements.invoiceReportList.addEventListener("click", handleInvoiceReportListClick);
    [elements.presetThisMonthBtn, elements.presetLast30Btn, elements.presetThisYearBtn, elements.presetClearDatesBtn].forEach(btn => {
        btn?.addEventListener("click", handleDatePresetClick);
    });
    elements.closeStatementExportModalBtn.addEventListener("click", closeStatementExportModal);
    elements.statementExportSteps.forEach(button => {
        button.addEventListener("click", handleStatementExportStepClick);
    });
    elements.statementExportBackBtn.addEventListener("click", goToPreviousStatementExportStep);
    elements.statementExportNextBtn.addEventListener("click", goToNextStatementExportStep);
    elements.confirmStatementExportBtn.addEventListener("click", exportStatementOfAccountPdf);
    elements.closeStatementEditModalBtn?.addEventListener("click", closeStatementEditModal);
    elements.addStatementRowBtn?.addEventListener("click", addStatementEditRow);
    elements.addStatementDeductionBtn?.addEventListener("click", addStatementEditDeduction);
    elements.statementEditRows?.addEventListener("click", handleStatementEditRowsClick);
    elements.statementEditRows?.addEventListener("input", syncStatementEditTotalsUi);
    elements.statementEditDeductions?.addEventListener("click", handleStatementEditDeductionsClick);
    elements.statementEditDeductions?.addEventListener("input", syncStatementEditTotalsUi);
    elements.statementEditNoteInput?.addEventListener("input", syncStatementEditTotalsUi);
    elements.previewStatementEditBtn?.addEventListener("click", () => saveStatementEdit({ openPreview: true }));
    elements.saveStatementEditBtn?.addEventListener("click", () => saveStatementEdit({ openPreview: false }));
    elements.saveCompanyProfileBtn.addEventListener("click", saveCompanyProfile);
    elements.addSavedItemBtn.addEventListener("click", addSavedItemFromModal);
    elements.savedItemsList.addEventListener("click", handleSavedItemsListClick);
    elements.savedItemsList.addEventListener("keydown", handleSavedItemsListKeydown);
    elements.overviewRecentDocuments?.addEventListener("click", event => {
        const button = event.target.closest("[data-open-overview-doc]");
        if (!button) {
            return;
        }
        setActivePage("documents");
        editDocument(button.dataset.openOverviewDoc);
    });
    document.addEventListener("click", handleImageUploadTriggerClick);
    elements.savedItemImageInput.addEventListener("change", handleSavedItemImageInputChange);
    elements.savedItemImageRemoveBtn.addEventListener("click", clearSavedItemImageSelection);
    elements.savedItemQuantityInput.addEventListener("input", syncSavedItemsTotal);
    elements.savedItemUnitPriceInput.addEventListener("input", syncSavedItemsTotal);
    elements.clearLocalTestDataBtn.addEventListener("click", clearLocalTestData);
    elements.accountAdminSaveBtn?.addEventListener("click", handleAccountAdminSaveUser);
    elements.accountAdminCancelEditBtn?.addEventListener("click", resetAccountAdminForm);
    elements.accountAdminUserList?.addEventListener("click", handleAccountAdminUserListClick);
    elements.accountSignatureInput?.addEventListener("change", handleBrandAssetSelection);
    elements.accountStampInput?.addEventListener("change", handleBrandAssetSelection);
    elements.clearSignatureAssetBtn?.addEventListener("click", () => clearBrandAsset("signature"));
    elements.clearStampAssetBtn?.addEventListener("click", () => clearBrandAsset("stamp"));
    elements.saveBrandAssetsBtn?.addEventListener("click", saveBrandAssets);
    elements.clientManagementList.addEventListener("click", handleClientManagementClick);
    elements.issueInboxList.addEventListener("click", handleIssueInboxClick);
    elements.valueToggleCard.addEventListener("click", toggleValueView);
    elements.overviewMobileToggle?.addEventListener("click", toggleMobileOverview);
    elements.viewAllDocumentsBtn?.addEventListener("click", () => setActivePage("documents"));
    elements.showInternalPricingToggle.addEventListener("change", handleInternalPricingToggleChange);
    elements.importBackupBtn.addEventListener("click", () => {
        elements.importBackupInput.click();
    });
    elements.importBackupInput.addEventListener("change", handleBackupImportSelect);
    elements.closeModalBtn.addEventListener("click", closeModal);
    elements.docType.addEventListener("change", updateModalTitle);
    elements.refNumber.addEventListener("input", handleRefNumberInput);
    elements.docDate.addEventListener("change", handleDocumentDateChange);
    elements.clientSelect.addEventListener("change", onClientSelectChange);
    elements.saveClientBtn.addEventListener("click", saveClient);
    elements.addItemBtn.addEventListener("click", addItem);
    elements.addAnotherItemBtn?.addEventListener("click", addItem);
    elements.prevBtn.addEventListener("click", prevStep);
    elements.nextBtn.addEventListener("click", nextStep);
    elements.saveBtn.addEventListener("click", saveDocumentOnly);
    elements.exportPdfBtn.addEventListener("click", saveAndExportDocument);
    elements.stepIndicator.addEventListener("click", handleStepIndicatorClick);
    elements.previewContainer.addEventListener("click", handlePreviewContainerClick);
    elements.documentsGrid.addEventListener("click", handleDocumentCardClick);
    elements.itemsContainer.addEventListener("click", handleItemContainerClick);
    elements.itemsContainer.addEventListener("input", handleItemsChange);
    elements.itemsContainer.addEventListener("change", handleItemsChange);
    elements.itemsContainer.addEventListener("change", handleItemImageInputChange);
    elements.itemsContainer.addEventListener("keydown", handleItemEditorKeydown);
    elements.documentSearch.addEventListener("input", handleSearchInput);
    elements.documentSort.addEventListener("change", handleSortChange);
    elements.documentsGrid.addEventListener("keydown", handleDocumentCardKeydown);
    elements.tagSuggestions.addEventListener("click", handleKeywordSuggestionClick);
    elements.calculatorLauncherModal.addEventListener("click", toggleCalculator);
    elements.calculatorMinimizeBtn.addEventListener("click", hideCalculator);
    elements.calculatorCloseBtn.addEventListener("click", hideCalculator);
    elements.calculatorGrid.addEventListener("click", handleCalculatorButtonClick);
    elements.calculatorDragHandle.addEventListener("pointerdown", startCalculatorDrag);
    window.addEventListener("pointermove", handleCalculatorDrag);
    window.addEventListener("pointerup", stopCalculatorDrag);
    elements.filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (state.activePage !== "documents") {
                setActivePage("documents");
            }
            setActiveFilter(button.dataset.filter);
        });
    });

    [
        elements.docType,
        elements.refNumber,
        elements.docDate,
        elements.clientName,
        elements.clientAddress,
        elements.consigneeName,
        elements.consigneeAddress,
        elements.poNumber,
        elements.docTags,
        elements.notes,
        elements.paymentTerms,
        elements.includeSignature,
        elements.includeStamp
    ].forEach(field => {
        if (!field) {
            return;
        }
        field.addEventListener("input", queueDraftAutosave);
        field.addEventListener("change", queueDraftAutosave);
    });

    elements.documentModal.addEventListener("click", event => {
        if (event.target === elements.documentModal) {
            closeModal();
        }
    });

    elements.exportModal.addEventListener("click", event => {
        if (event.target === elements.exportModal) {
            closeExportModal();
        }
    });

    elements.issueReportModal.addEventListener("click", event => {
        if (event.target === elements.issueReportModal) {
            closeIssueReportModal();
        }
    });

    elements.issueInboxModal.addEventListener("click", event => {
        if (event.target === elements.issueInboxModal) {
            closeIssueInboxModal();
        }
    });

    elements.companyProfileModal.addEventListener("click", event => {
        if (event.target === elements.companyProfileModal) {
            closeCompanyProfileModal();
        }
    });

    elements.savedItemsModal.addEventListener("click", event => {
        if (event.target === elements.savedItemsModal) {
            closeSavedItemsModal();
        }
    });
    elements.savedItemCreateModal.addEventListener("click", event => {
        if (event.target === elements.savedItemCreateModal) {
            closeSavedItemCreateModal();
        }
    });
    elements.savedItemImageModal?.addEventListener("click", event => {
        if (event.target === elements.savedItemImageModal) {
            closeSavedItemImageModal();
        }
    });
    elements.catalogItemModal.addEventListener("click", event => {
        if (event.target === elements.catalogItemModal) {
            closeCatalogItemModal();
        }
    });
    elements.catalogDetailsModal.addEventListener("click", event => {
        if (event.target === elements.catalogDetailsModal) {
            closeCatalogDetailsModal();
        }
    });
    elements.invoiceReportsModal.addEventListener("click", event => {
        if (event.target === elements.invoiceReportsModal) {
            closeInvoiceReportsModal();
        }
    });
    elements.statementExportModal.addEventListener("click", event => {
        if (event.target === elements.statementExportModal) {
            closeStatementExportModal();
        }
    });
    elements.statementEditModal?.addEventListener("click", event => {
        if (event.target === elements.statementEditModal) {
            closeStatementEditModal();
        }
    });
    elements.dataToolsModal?.addEventListener("click", event => {
        if (event.target === elements.dataToolsModal) {
            closeDataToolsModal();
        }
    });

    elements.aboutModal.addEventListener("click", event => {
        if (event.target === elements.aboutModal) {
            closeAboutModal();
        }
    });

    elements.documentModal.addEventListener("input", updateEditorSummary);
    elements.documentModal.addEventListener("change", updateEditorSummary);
    document.addEventListener("click", handleGlobalClick);
    document.addEventListener("pointerdown", handleSessionActivity);
    document.addEventListener("keydown", handleSessionActivity);
    document.addEventListener("input", handleSessionActivity);
    window.addEventListener("focus", handleSessionActivity);
    window.addEventListener("scroll", handleSessionActivity, { passive: true });
    window.addEventListener("resize", () => {
        window.requestAnimationFrame(syncActivePreviewScale);
        window.requestAnimationFrame(syncMobileOverviewState);
    });
}

async function init() {
    await bootstrapRuntimeMode();
    loadLocalWorkspaceState();
    await bootstrapSharedWorkspaceData();
    state.currentUser = getStoredSessionUser();
    state.currentLanguage = state.currentUser?.language || "en";
    applyAccessState(hasActiveSession());
    setAccessLoading(false);
    setSessionLoader(false);
    applyTranslations();
    hydrateEditorPreferences();
    updateCalculatorDisplay();
    syncMobileOverviewState();
    void refreshExchangeRate();
    if (!hasActiveSession()) {
        return;
    }

    setSessionLoader(true);
    await bootstrapAppData();
    if (isOwnerSession()) {
        resetAccountAdminForm();
    }
    setActivePage("overview");
    applyRoleAccess();
    applyAccessState(true);
    setSessionLoader(false);
    revealBrandSplash();
}

async function bootstrapRuntimeMode() {
    try {
        const payload = await requestJSON("/api/runtime-mode");
        state.runtimeMode = String(payload?.mode || "live");
    } catch (error) {
        state.runtimeMode = "unknown";
    }

    updateEnvironmentBadge();
}

function updateEnvironmentBadge() {
    if (!elements.environmentBadge) {
        return;
    }

    elements.environmentBadge.classList.remove("is-local-sandbox", "is-test-mirror");

    if (state.runtimeMode === "live-read-local-write") {
        elements.environmentBadge.textContent = t("live_read_local_write");
        elements.environmentBadge.hidden = false;
        elements.environmentBadge.classList.add("is-test-mirror");
        return;
    }

    if (state.runtimeMode === "local-sandbox") {
        elements.environmentBadge.textContent = "Local Sandbox";
        elements.environmentBadge.hidden = false;
        elements.environmentBadge.classList.add("is-local-sandbox");
        return;
    }

    elements.environmentBadge.textContent = "";
    elements.environmentBadge.hidden = true;
}

function revealBrandSplash() {
    window.setTimeout(() => {
        elements.brandSplash.classList.add("is-hidden");
        elements.brandSplash.setAttribute("aria-hidden", "true");
    }, BRAND_SPLASH_MIN_MS);
}

function toggleCalculator() {
    if (state.isCalculatorOpen) {
        hideCalculator();
    } else {
        showCalculator();
    }
}

function showCalculator() {
    state.isCalculatorOpen = true;
    elements.calculatorWidget.hidden = false;
    elements.calculatorWidget.classList.remove("hidden");
    elements.calculatorWidget.classList.add("is-visible");
    elements.calculatorLauncherModal.setAttribute("aria-expanded", "true");

    if (!elements.calculatorWidget.style.left) {
        elements.calculatorWidget.style.left = `${Math.max(window.innerWidth - 360, 16)}px`;
        elements.calculatorWidget.style.top = "112px";
    }
}

function hideCalculator() {
    state.isCalculatorOpen = false;
    state.isDraggingCalculator = false;
    elements.calculatorWidget.classList.add("hidden");
    elements.calculatorWidget.classList.remove("is-visible");
    elements.calculatorWidget.hidden = true;
    elements.calculatorLauncherModal.setAttribute("aria-expanded", "false");
}

function handleCalculatorButtonClick(event) {
    const button = event.target.closest("button");
    if (!button) {
        return;
    }

    const value = button.dataset.calcValue;
    const action = button.dataset.calcAction;

    if (value) {
        appendCalculatorValue(value);
        return;
    }

    if (action === "clear") {
        state.calculatorExpression = "0";
    } else if (action === "sign") {
        toggleCalculatorSign();
    } else if (action === "percent") {
        applyCalculatorPercent();
    } else if (action === "equals") {
        evaluateCalculatorExpression();
    }

    updateCalculatorDisplay();
}

function appendCalculatorValue(value) {
    const current = state.calculatorExpression === "Error" ? "0" : state.calculatorExpression;
    const operators = ["+", "-", "*", "/"];
    const lastCharacter = current.slice(-1);

    if (value === "." && /(^|[+\-*/])\d*\.\d*$/.test(current)) {
        return;
    }

    if (operators.includes(value)) {
        if (operators.includes(lastCharacter)) {
            state.calculatorExpression = `${current.slice(0, -1)}${value}`;
        } else {
            state.calculatorExpression = `${current}${value}`;
        }
        updateCalculatorDisplay();
        return;
    }

    if (current === "0" && value !== ".") {
        state.calculatorExpression = value;
    } else {
        state.calculatorExpression = `${current}${value}`;
    }

    updateCalculatorDisplay();
}

function toggleCalculatorSign() {
    const match = state.calculatorExpression.match(/(-?\d*\.?\d+)$/);
    if (!match) {
        return;
    }

    const currentNumber = match[0];
    const replacement = currentNumber.startsWith("-")
        ? currentNumber.slice(1)
        : `-${currentNumber}`;

    state.calculatorExpression = `${state.calculatorExpression.slice(0, -currentNumber.length)}${replacement}`;
}

function applyCalculatorPercent() {
    const match = state.calculatorExpression.match(/(-?\d*\.?\d+)$/);
    if (!match) {
        return;
    }

    const currentNumber = Number(match[0]);
    const percentValue = String(currentNumber / 100);
    state.calculatorExpression = `${state.calculatorExpression.slice(0, -match[0].length)}${percentValue}`;
}

function evaluateCalculatorExpression() {
    try {
        const sanitized = state.calculatorExpression.replace(/x/g, "*");
        if (!/^[0-9+\-*/.() ]+$/.test(sanitized)) {
            throw new Error("Invalid expression");
        }

        const result = Function(`"use strict"; return (${sanitized});`)();
        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }
        state.calculatorExpression = String(Number(result.toFixed(6)));
    } catch (error) {
        state.calculatorExpression = "Error";
    }
}

function updateCalculatorDisplay() {
    elements.calculatorDisplay.value = state.calculatorExpression;
}

function startCalculatorDrag(event) {
    if (!state.isCalculatorOpen) {
        return;
    }

    if (event.target.closest("button")) {
        return;
    }

    const rect = elements.calculatorWidget.getBoundingClientRect();
    state.isDraggingCalculator = true;
    state.calculatorDragOffsetX = event.clientX - rect.left;
    state.calculatorDragOffsetY = event.clientY - rect.top;
    elements.calculatorWidget.classList.add("is-dragging");
    elements.calculatorDragHandle.setPointerCapture(event.pointerId);
}

function handleCalculatorDrag(event) {
    if (!state.isDraggingCalculator) {
        return;
    }

    const nextLeft = Math.min(
        Math.max(12, event.clientX - state.calculatorDragOffsetX),
        window.innerWidth - elements.calculatorWidget.offsetWidth - 12
    );
    const nextTop = Math.min(
        Math.max(12, event.clientY - state.calculatorDragOffsetY),
        window.innerHeight - elements.calculatorWidget.offsetHeight - 12
    );

    elements.calculatorWidget.style.left = `${nextLeft}px`;
    elements.calculatorWidget.style.top = `${nextTop}px`;
}

function stopCalculatorDrag(event) {
    if (!state.isDraggingCalculator) {
        return;
    }

    state.isDraggingCalculator = false;
    elements.calculatorWidget.classList.remove("is-dragging");
    if (event && elements.calculatorDragHandle.hasPointerCapture?.(event.pointerId)) {
        elements.calculatorDragHandle.releasePointerCapture(event.pointerId);
    }
}

function normalizeUserAccounts(users) {
    const normalizedUsers = Array.isArray(users)
        ? users
            .filter(user => user && typeof user === "object")
            .map(user => ({
                id: String(user.id || `user-${Date.now()}-${Math.random().toString(36).slice(2)}`),
                username: String(user.username || "").trim().toLowerCase(),
                displayName: String(user.displayName || user.username || "").trim(),
                email: String(user.email || "").trim().toLowerCase(),
                password: String(user.password || ""),
                role: ["owner", "admin"].includes(user.role) ? user.role : "user",
                language: TRANSLATIONS[user.language] ? user.language : "en",
                accessLevel: ["owner", "workspace", "operations", "review"].includes(user.accessLevel) ? user.accessLevel : "workspace",
                parentUserId: String(user.parentUserId || "").trim(),
                lastLoginAt: String(user.lastLoginAt || "").trim()
            }))
            .filter(user => user.username && user.displayName && user.password)
        : [];

    const mergedUsers = [];
    const usernameSet = new Set();
    const emailSet = new Set();
    normalizedUsers.forEach(user => {
        if (usernameSet.has(user.username)) {
            return;
        }
        if (user.email && emailSet.has(user.email)) {
            return;
        }
        usernameSet.add(user.username);
        if (user.email) {
            emailSet.add(user.email);
        }
        mergedUsers.push(user);
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
            accessLevel: "owner",
            parentUserId: "",
            language: TRANSLATIONS[mergedUsers[ownerIndex].language] ? mergedUsers[ownerIndex].language : "en",
            lastLoginAt: mergedUsers[ownerIndex].lastLoginAt || ""
        };
    }

    return mergedUsers;
}

function loadUserAccounts() {
    const users = normalizeUserAccounts(readLocalDataset(USER_ACCOUNTS_STORAGE_KEY, []));
    writeLocalDataset(USER_ACCOUNTS_STORAGE_KEY, users);
    return users;
}

function loadLocalWorkspaceState() {
    state.workspaceDataMode = "local";
    state.userAccounts = loadUserAccounts();
    state.issueReports = loadIssueReports();
    state.companyProfile = loadCompanyProfile();
    state.savedItems = loadSavedItems();
    state.catalogItems = loadCatalogItems();
    state.statementExports = loadStatementExports();
    state.sessionLogs = loadSessionLogs();
    state.activityLogs = loadActivityLogs();
    updateRuntimeModeBadge();
}

function cacheWorkspaceStateLocally() {
    writeLocalDataset(USER_ACCOUNTS_STORAGE_KEY, state.userAccounts);
    writeLocalDataset(ISSUE_REPORTS_STORAGE_KEY, state.issueReports);
    writeLocalDataset(COMPANY_PROFILE_STORAGE_KEY, state.companyProfile);
    writeLocalDataset(SAVED_ITEMS_STORAGE_KEY, state.savedItems);
    writeLocalDataset(CATALOG_ITEMS_STORAGE_KEY, state.catalogItems);
    writeLocalDataset(STATEMENT_EXPORTS_STORAGE_KEY, state.statementExports);
    writeLocalDataset(SESSION_LOGS_STORAGE_KEY, state.sessionLogs);
    writeLocalDataset(ACTIVITY_LOGS_STORAGE_KEY, state.activityLogs);
}

function applyWorkspaceState(payload) {
    state.userAccounts = normalizeUserAccounts(payload?.userAccounts || []);
    state.issueReports = normalizeIssueReports(payload?.issueReports || []);
    state.companyProfile = normalizeCompanyProfile(payload?.companyProfile || DEFAULT_COMPANY_PROFILE);
    state.savedItems = normalizeSavedItems(payload?.savedItems || []);
    state.catalogItems = normalizeCatalogItems(payload?.catalogItems || []);
    state.statementExports = normalizeStatementExports(payload?.statementExports || []);
    state.sessionLogs = normalizeSessionLogs(payload?.sessionLogs || []);
    state.activityLogs = normalizeActivityLogs(payload?.activityLogs || []);
    cacheWorkspaceStateLocally();
    updateRuntimeModeBadge();
    renderUserManagementList();
    renderIssueInbox();
    updateInboxBadge();
    renderSavedItemsList();
    renderCatalog();
    renderStatementsPage();
    renderAccountAdminPage();
}

async function bootstrapSharedWorkspaceData() {
    try {
        const payload = await requestJSON("/api/workspace");
        state.workspaceDataMode = "server";
        applyWorkspaceState(payload);
    } catch (error) {
        state.workspaceDataMode = "local";
        loadLocalWorkspaceState();
    }
    updateRuntimeModeBadge();
}

async function persistSharedWorkspaceData() {
    cacheWorkspaceStateLocally();

    if (state.workspaceDataMode === "local") {
        updateRuntimeModeBadge();
        return;
    }

    try {
        const payload = await requestJSON("/api/workspace", {
            method: "POST",
            body: JSON.stringify({
                userAccounts: state.userAccounts,
                issueReports: state.issueReports,
                companyProfile: state.companyProfile,
                savedItems: state.savedItems,
                catalogItems: state.catalogItems,
                statementExports: state.statementExports,
                sessionLogs: state.sessionLogs,
                activityLogs: state.activityLogs
            })
        });

        state.workspaceDataMode = "server";
        applyWorkspaceState(payload);
    } catch (error) {
        state.workspaceDataMode = "local";
        cacheWorkspaceStateLocally();
        setImportStatus("Server save failed, so shared workspace data was saved locally in this browser instead.");
    }
    updateRuntimeModeBadge();
}

async function saveUserAccounts(users) {
    state.userAccounts = normalizeUserAccounts(users);
    cacheWorkspaceStateLocally();
    renderUserManagementList();
    renderAccountAdminPage();
    await persistSharedWorkspaceData();
}

function normalizeIssueReports(reports) {
    return Array.isArray(reports)
        ? reports
            .filter(report => report && typeof report === "object")
            .map(report => ({
                id: String(report.id || `issue-${Date.now()}-${Math.random().toString(36).slice(2)}`),
                subject: String(report.subject || "").trim(),
                details: String(report.details || "").trim(),
                screenshotName: String(report.screenshotName || "").trim(),
                screenshotDataUrl: typeof report.screenshotDataUrl === "string" ? report.screenshotDataUrl : "",
                createdAt: report.createdAt || new Date().toISOString(),
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

function loadIssueReports() {
    const reports = normalizeIssueReports(readLocalDataset(ISSUE_REPORTS_STORAGE_KEY, []));
    writeLocalDataset(ISSUE_REPORTS_STORAGE_KEY, reports);
    return reports;
}

async function saveIssueReports(reports) {
    state.issueReports = normalizeIssueReports(reports);
    cacheWorkspaceStateLocally();
    renderIssueInbox();
    updateInboxBadge();
    await persistSharedWorkspaceData();
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
        stampDataUrl: typeof profile?.stampDataUrl === "string" ? profile.stampDataUrl : ""
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

function loadSessionLogs() {
    const logs = normalizeSessionLogs(readLocalDataset(SESSION_LOGS_STORAGE_KEY, []));
    writeLocalDataset(SESSION_LOGS_STORAGE_KEY, logs);
    return logs;
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

function loadActivityLogs() {
    const logs = normalizeActivityLogs(readLocalDataset(ACTIVITY_LOGS_STORAGE_KEY, []));
    writeLocalDataset(ACTIVITY_LOGS_STORAGE_KEY, logs);
    return logs;
}

function recordActivity(action, details) {
    if (!state.currentUser) {
        return;
    }

    state.activityLogs = normalizeActivityLogs([
        {
            id: `activity-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            userId: state.currentUser.userId,
            username: state.currentUser.username,
            displayName: state.currentUser.displayName,
            action,
            details,
            createdAt: new Date().toISOString()
        },
        ...state.activityLogs
    ]).slice(0, 100);

    cacheWorkspaceStateLocally();
    renderAccountAdminPage();
    void persistSharedWorkspaceData();
}

async function startSessionLog(user) {
    const sessionLog = {
        id: `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        userId: user.id,
        username: user.username,
        displayName: user.displayName,
        startedAt: new Date().toISOString(),
        endedAt: "",
        status: "open",
        reason: "",
        loginMethod: user.email ? "email / local" : "local"
    };

    state.sessionLogs = normalizeSessionLogs([sessionLog, ...state.sessionLogs]).slice(0, 100);
    state.userAccounts = state.userAccounts.map(entry =>
        entry.id === user.id ? { ...entry, lastLoginAt: sessionLog.startedAt } : entry
    );
    cacheWorkspaceStateLocally();
    await persistSharedWorkspaceData();
    return sessionLog.id;
}

async function closeSessionLog(reason = "Signed out") {
    const sessionLogId = state.currentUser?.sessionLogId;
    if (!sessionLogId) {
        return;
    }

    state.sessionLogs = normalizeSessionLogs(state.sessionLogs.map(log =>
        log.id === sessionLogId
            ? {
                ...log,
                endedAt: new Date().toISOString(),
                status: "closed",
                reason
            }
            : log
    ));
    cacheWorkspaceStateLocally();
    renderAccountAdminPage();
    await persistSharedWorkspaceData();
}

function loadCompanyProfile() {
    const profile = normalizeCompanyProfile(readLocalDataset(COMPANY_PROFILE_STORAGE_KEY, DEFAULT_COMPANY_PROFILE));
    writeLocalDataset(COMPANY_PROFILE_STORAGE_KEY, profile);
    return profile;
}

async function saveCompanyProfileState(profile) {
    state.companyProfile = normalizeCompanyProfile(profile);
    cacheWorkspaceStateLocally();
    renderAccountAdminPage();
    await persistSharedWorkspaceData();
}

function normalizeCatalogItems(items) {
    return Array.isArray(items)
        ? items
            .filter(item => item && typeof item === "object")
            .map(item => ({
                id: String(item.id || `catalog-${Date.now()}-${Math.random().toString(36).slice(2)}`),
                name: String(item.name || "").trim(),
                details: String(item.details || "").trim(),
                notes: String(item.notes || "").trim(),
                price: Number.parseFloat(item.price) || 0,
                dateUpdated: item.dateUpdated || new Date().toISOString(),
                category: String(item.category || "").trim(),
                brand: String(item.brand || "").trim(),
                unitSize: String(item.unitSize || "").trim(),
                vendor: String(item.vendor || "").trim()
            }))
            .filter(item => item.name)
        : [];
}

function normalizeStatementExports(items) {
    if (!Array.isArray(items)) {
        return [];
    }

    const normalizedItems = items
        .filter(item => item && typeof item === "object")
        .map(item => {
            const payload = item.payload && typeof item.payload === "object"
                ? window.StatementOfAccount.normalizeStatementPayload(item.payload)
                : null;
            const totals = payload
                ? window.StatementOfAccount.calculateStatementTotals(payload)
                : null;

            return {
                id: String(item.id || `statement-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                title: String(item.title || payload?.title || "Statement of Account").trim(),
                clientName: String(item.clientName || payload?.clientName || t("unknown_client")).trim() || t("unknown_client"),
                vendorName: String(item.vendorName || payload?.vendorName || payload?.company?.companyName || BRAND.name).trim() || BRAND.name,
                referenceNumber: String(item.referenceNumber || payload?.referenceNumber || "").trim(),
                generatedAt: String(item.generatedAt || new Date().toISOString()),
                rowCount: Number.parseInt(item.rowCount, 10) || Number(payload?.rows?.length || 0),
                totalSelectedFormatted: String(item.totalSelectedFormatted || payload?.totalSelectedFormatted || totals?.selectedTotalFormatted || "").trim(),
                totalOutstandingFormatted: String(item.totalOutstandingFormatted || payload?.grandTotalFormatted || totals?.grandTotalFormatted || "").trim(),
                payload
            };
        })
        .filter(item => item.payload);

    let nextSequence = Math.max(0, ...normalizedItems.map(item => parseStatementReferenceSequence(item.referenceNumber)));
    normalizedItems
        .sort((left, right) => Date.parse(left.generatedAt || 0) - Date.parse(right.generatedAt || 0))
        .forEach(item => {
            if (!parseStatementReferenceSequence(item.referenceNumber)) {
                nextSequence += 1;
                item.referenceNumber = formatStatementReferenceNumber(nextSequence);
            }

            item.payload = window.StatementOfAccount.normalizeStatementPayload({
                ...item.payload,
                referenceNumber: item.referenceNumber
            });

            item.title = window.StatementOfAccount.createStatementFileName(item.referenceNumber, item.clientName, item.generatedAt);
        });

    return normalizedItems.sort(compareStatementExports);
}

function parseStatementReferenceSequence(referenceNumber) {
    const match = String(referenceNumber || "").trim().match(/^TL-S-(\d+)$/i);
    return match ? Number.parseInt(match[1], 10) || 0 : 0;
}

function formatStatementReferenceNumber(sequence) {
    return `TL-S-${String(Math.max(1, Number(sequence) || 1)).padStart(2, "0")}`;
}

function getNextStatementReferenceNumber() {
    const maxSequence = Math.max(0, ...state.statementExports.map(statement => parseStatementReferenceSequence(statement.referenceNumber)));
    return formatStatementReferenceNumber(maxSequence + 1);
}

function compareStatementExports(left, right) {
    const vendorComparison = String(left.vendorName || "").localeCompare(String(right.vendorName || ""), getCurrentLocale(), { sensitivity: "base" });
    if (vendorComparison !== 0) {
        return vendorComparison;
    }

    const clientComparison = String(left.clientName || "").localeCompare(String(right.clientName || ""), getCurrentLocale(), { sensitivity: "base" });
    if (clientComparison !== 0) {
        return clientComparison;
    }

    const referenceComparison = parseStatementReferenceSequence(right.referenceNumber) - parseStatementReferenceSequence(left.referenceNumber);
    if (referenceComparison !== 0) {
        return referenceComparison;
    }

    return Date.parse(right.generatedAt || 0) - Date.parse(left.generatedAt || 0);
}

function loadStatementExports() {
    const items = normalizeStatementExports(readLocalDataset(STATEMENT_EXPORTS_STORAGE_KEY, []));
    writeLocalDataset(STATEMENT_EXPORTS_STORAGE_KEY, items);
    return items;
}

async function saveStatementExportsState(items) {
    state.statementExports = normalizeStatementExports(items);
    await persistSharedWorkspaceData();
    renderStatementsPage();
}

function loadCatalogItems() {
    const items = normalizeCatalogItems(readLocalDataset(CATALOG_ITEMS_STORAGE_KEY, []));
    writeLocalDataset(CATALOG_ITEMS_STORAGE_KEY, items);
    return items;
}

async function saveCatalogItems(items) {
    state.catalogItems = normalizeCatalogItems(items);
    cacheWorkspaceStateLocally();
    renderCatalog();
    await persistSharedWorkspaceData();
}

function normalizeSavedItems(items) {
    return Array.isArray(items)
        ? items
            .filter(item => item && typeof item === "object")
            .map(item => {
                const quantity = Number.parseFloat(item.quantity) || 0;
                const unitPrice = Number.parseFloat(item.unitPrice) || 0;
                const total = Number.parseFloat(item.total) || (quantity * unitPrice);
                return {
                    id: String(item.id || `saved-item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
                    description: String(item.description || "").trim(),
                    quantity,
                    unitPrice,
                    total,
                    itemImageDataUrl: typeof item.itemImageDataUrl === "string" ? item.itemImageDataUrl : "",
                    createdAt: String(item.createdAt || new Date().toISOString())
                };
            })
            .filter(item => item.description)
        : [];
}

function loadSavedItems() {
    const items = normalizeSavedItems(readLocalDataset(SAVED_ITEMS_STORAGE_KEY, []));
    writeLocalDataset(SAVED_ITEMS_STORAGE_KEY, items);
    return items;
}

async function saveSavedItemsState(items) {
    state.savedItems = normalizeSavedItems(items);
    cacheWorkspaceStateLocally();
    renderSavedItemsList();
    renderCatalog();
    await persistSharedWorkspaceData();
}

function updateSavedItemsCountBadge() {
    const count = state.savedItems.length;
    if (elements.savedItemsCountBadge) {
        elements.savedItemsCountBadge.textContent = String(count);
    }
    if (elements.openSavedItemsInlineCount) {
        elements.openSavedItemsInlineCount.textContent = String(count);
        elements.openSavedItemsInlineCount.hidden = count === 0;
    }
}

function updateRuntimeModeBadge() {
    if (!elements.runtimeModeBadge) {
        return;
    }

    elements.runtimeModeBadge.classList.remove("is-test-mirror");

    if (state.runtimeMode === "live-read-local-write") {
        elements.runtimeModeBadge.hidden = false;
        elements.runtimeModeBadge.textContent = t("test_mode");
        elements.runtimeModeBadge.classList.add("is-test-mirror");
        return;
    }

    const isLocalMode = state.dataMode === "local" || state.workspaceDataMode === "local" || state.runtimeMode === "local-sandbox";
    elements.runtimeModeBadge.hidden = !isLocalMode;
    elements.runtimeModeBadge.textContent = t("local_mode");
}

function getStoredSessionUser() {
    try {
        const rawValue = sessionStorage.getItem(CURRENT_SESSION_STORAGE_KEY);
        if (!rawValue) {
            return null;
        }

        const session = JSON.parse(rawValue);
        if (!session || typeof session !== "object" || !session.userId) {
            return null;
        }

        const user = state.userAccounts.find(entry => entry.id === session.userId);
        if (!user) {
            return null;
        }

        return {
            userId: user.id,
            username: user.username,
            displayName: user.displayName,
            role: user.role,
            language: TRANSLATIONS[user.language] ? user.language : "en",
            email: user.email || "",
            accessLevel: user.accessLevel || "workspace",
            sessionLogId: String(session.sessionLogId || "")
        };
    } catch (error) {
        return null;
    }
}

async function migrateLocalDataToServer() {
    // Check if we have local data that needs to be migrated
    const localDocuments = readLocalDataset(LOCAL_DOCUMENTS_STORAGE_KEY, []);
    const localClients = readLocalDataset(LOCAL_CLIENTS_STORAGE_KEY, []);

    const hasLocalDocuments = Array.isArray(localDocuments) && localDocuments.length > 0;
    const hasLocalClients = Array.isArray(localClients) && localClients.length > 0;

    // Only migrate if we have local data and server data is empty/minimal
    const serverHasDocuments = state.documents.length > 1; // More than just default
    const serverHasClients = state.clients.length > 1; // More than just default CCXpress

    if ((hasLocalDocuments && !serverHasDocuments) || (hasLocalClients && !serverHasClients)) {
        console.log("Migrating local data to server...");

        try {
            // Migrate documents if server is empty but local has data
            if (hasLocalDocuments && !serverHasDocuments) {
                await saveDocumentsToServer(localDocuments);
                console.log(`Migrated ${localDocuments.length} documents to server`);
            }

            // Migrate clients if server only has default client
            if (hasLocalClients && !serverHasClients) {
                await saveClientsToServer(localClients);
                console.log(`Migrated ${localClients.length} clients to server`);
            }

            // Clear local data after successful migration
            if (hasLocalDocuments && !serverHasDocuments) {
                clearLocalDataset(LOCAL_DOCUMENTS_STORAGE_KEY);
            }
            if (hasLocalClients && !serverHasClients) {
                clearLocalDataset(LOCAL_CLIENTS_STORAGE_KEY);
            }

            setImportStatus("✓ Local data has been migrated to server storage.");
        } catch (error) {
            console.error("Data migration failed:", error);
            setImportStatus("⚠️ Data migration failed. Your local data is still safe in browser storage.", true);
        }
    }
}

function hasActiveSession() {
    return Boolean(state.currentUser);
}

function isOwnerSession() {
    return state.currentUser?.role === "owner";
}

function isAdminSession() {
    return ["owner", "admin"].includes(state.currentUser?.role);
}

function persistCurrentSession(user) {
    state.currentUser = {
        userId: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        language: user.language || "en",
        email: user.email || "",
        accessLevel: user.accessLevel || "workspace",
        sessionLogId: user.sessionLogId || ""
    };
    sessionStorage.setItem(CURRENT_SESSION_STORAGE_KEY, JSON.stringify(state.currentUser));
    applyRoleAccess();
}

function clearCurrentSession() {
    state.currentUser = null;
    sessionStorage.removeItem(CURRENT_SESSION_STORAGE_KEY);
    applyRoleAccess();
}

function applyRoleAccess() {
    const isAdmin = isAdminSession();
    const hasSession = hasActiveSession();

    elements.sessionBadge.hidden = !hasSession;
    elements.sessionBadge.textContent = hasSession
        ? state.currentUser.displayName
        : "";
    elements.settingsIssueInboxBtn.hidden = !isAdmin;
    elements.settingsIssueInboxBtn.setAttribute("aria-hidden", String(!isAdmin));
    if (elements.settingsNavBtn) {
        elements.settingsNavBtn.hidden = !isAdmin;
        elements.settingsNavBtn.setAttribute("aria-hidden", String(!isAdmin));
    }
    if (elements.settingsDrawerBtn) {
        elements.settingsDrawerBtn.hidden = !isAdmin;
        elements.settingsDrawerBtn.setAttribute("aria-hidden", String(!isAdmin));
    }
    updateInboxBadge();

    if (!isAdmin) {
        closeSettingsModal();
        closeIssueInboxModal();
    }

    if (!isAdmin && state.activePage === "settings") {
        state.activePage = "overview";
    }

    renderUserManagementList();
    renderClientManagementList();
    renderIssueInbox();
    renderAccountAdminPage();
    applyPageState();
}

function applyAccessState(isUnlocked) {
    elements.accessGate.classList.toggle("hidden", isUnlocked);
    elements.adminAppShell.classList.toggle("app-shell-locked", !isUnlocked);
    elements.accessGate.hidden = isUnlocked;
    elements.adminAppShell.hidden = !isUnlocked;
    elements.adminAppShell.setAttribute("aria-hidden", String(!isUnlocked));

    if (isUnlocked) {
        resetInactivityTimer();
    } else {
        clearInactivityTimer();
        elements.accessForm.reset();
        elements.accessError.textContent = DEFAULT_ACCESS_ERROR_MESSAGE;
        elements.accessError.hidden = true;
        setAccessLoading(false);
        setSessionLoader(false);
        closeTopbarMenu();
        elements.accessUsername.focus();
    }
}

function setAccessLoading(isLoading) {
    state.isAuthenticating = isLoading;
    elements.accessForm.classList.toggle("is-authenticating", isLoading);
    elements.accessUsername.disabled = isLoading;
    elements.accessCode.disabled = isLoading;
    elements.accessSubmitBtn.disabled = isLoading;
}

function setSessionLoader(isVisible, message = t("session_loader_message")) {
    elements.sessionLoader.hidden = !isVisible;
    elements.sessionLoader.setAttribute("aria-hidden", String(!isVisible));
    elements.sessionLoaderMessage.textContent = message;
}

async function unlockAccess(user) {
    const sessionLogId = await startSessionLog(user);
    persistCurrentSession({ ...user, sessionLogId });
    state.currentUser = { ...user, sessionLogId };
    await bootstrapSharedWorkspaceData();
    state.currentUser = getStoredSessionUser() || { ...user, sessionLogId };
    recordActivity("signed in", "Opened the SantoSync workspace.");
    await bootstrapAppData();
    setActivePage("overview");
    applyRoleAccess();
    applyAccessState(true);
}

function clearInactivityTimer() {
    if (state.inactivityTimerId !== null) {
        window.clearTimeout(state.inactivityTimerId);
        state.inactivityTimerId = null;
    }
}

function resetInactivityTimer() {
    if (!hasActiveSession() || state.isAuthenticating) {
        clearInactivityTimer();
        return;
    }

    clearInactivityTimer();
    state.inactivityTimerId = window.setTimeout(() => {
        signOutForInactivity();
    }, INACTIVITY_TIMEOUT_MS);
}

function handleSessionActivity() {
    if (!hasActiveSession() || state.isAuthenticating) {
        return;
    }

    resetInactivityTimer();
}

async function endSession(message = "", { showMessage = false } = {}) {
    clearInactivityTimer();
    await closeSessionLog(message || "Signed out");
    recordActivity("signed out", message || "Ended the current session.");
    clearCurrentSession();
    closeModal();
    closeSettingsModal();
    closeExportModal();
    closeIssueReportModal();
    closeIssueInboxModal();
    closeTopbarMenu();
    hideCalculator();
    applyAccessState(false);

    if (showMessage) {
        elements.accessError.textContent = message;
        elements.accessError.hidden = false;
    }
}

function signOutForInactivity() {
    void endSession("Signed out after 5 minutes of inactivity. Sign in again to continue.", {
        showMessage: true
    });
}

function handleEndSessionClick() {
    void endSession("Session ended. Sign in again to open the dashboard.", {
        showMessage: true
    });
}

function toggleTopbarMenu() {
    if (!elements.topbarMenu) return;
    const isOpen = !elements.topbarMenu.hidden;
    elements.topbarMenu.hidden = isOpen;
    elements.userMenuBtn?.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) {
        closeNewMenu();
    }
}

function closeTopbarMenu() {
    if (!elements.topbarMenu) return;
    elements.topbarMenu.hidden = true;
    elements.userMenuBtn?.setAttribute("aria-expanded", "false");
}

function toggleNewMenu() {
    const isOpen = !elements.newMenu.hidden;
    elements.newMenu.hidden = isOpen;
    elements.newMenuBtn?.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) {
        closeTopbarMenu();
    }
}

function closeNewMenu() {
    if (!elements.newMenu) {
        return;
    }
    elements.newMenu.hidden = true;
    elements.newMenuBtn?.setAttribute("aria-expanded", "false");
}

function toggleOverviewNewMenu() {
    if (!elements.overviewNewMenu) return;
    const isOpen = !elements.overviewNewMenu.hidden;
    elements.overviewNewMenu.hidden = isOpen;
    elements.overviewNewBtn?.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) closeNewMenu();
}

function closeOverviewNewMenu() {
    if (!elements.overviewNewMenu) return;
    elements.overviewNewMenu.hidden = true;
    elements.overviewNewBtn?.setAttribute("aria-expanded", "false");
}

function toggleMobileDrawer() {
    const isOpen = !elements.mobileDrawer.hidden;
    if (isOpen) {
        closeMobileDrawer();
        return;
    }

    elements.mobileDrawer.hidden = false;
    elements.mobileDrawer.setAttribute("aria-hidden", "false");
    elements.mobileNavBackdrop.hidden = false;
    elements.navMenuBtn?.setAttribute("aria-expanded", "true");
}

function closeMobileDrawer() {
    if (!elements.mobileDrawer || !elements.mobileNavBackdrop) {
        return;
    }

    elements.mobileDrawer.hidden = true;
    elements.mobileDrawer.setAttribute("aria-hidden", "true");
    elements.mobileNavBackdrop.hidden = true;
    elements.navMenuBtn?.setAttribute("aria-expanded", "false");
}

function setActivePage(page) {
    const validPages = ["overview", "documents", "clients", "catalog", "reports", "settings"];
    state.activePage = validPages.includes(page) ? page : "overview";
    applyPageState();
    syncPageNavigation();
    closeTopbarMenu();
    closeNewMenu();
    closeOverviewNewMenu();
}

function applyPageState() {
    if (elements.overviewPage) elements.overviewPage.hidden = state.activePage !== "overview";
    if (elements.documentsPage) elements.documentsPage.hidden = state.activePage !== "documents";
    if (elements.clientsPage) elements.clientsPage.hidden = state.activePage !== "clients";
    if (elements.catalogPage) elements.catalogPage.hidden = state.activePage !== "catalog";
    if (elements.reportsPage) elements.reportsPage.hidden = state.activePage !== "reports";
    if (elements.settingsModal) elements.settingsModal.hidden = state.activePage !== "settings";
    if (elements.accountAdminPage) {
        elements.accountAdminPage.hidden = !(state.activePage === "settings" && isOwnerSession());
    }
}

function openCatalogPage() {
    setActivePage("catalog");
    renderCatalog();
}

function openStatementsPage() {
    setActivePage("reports");
    renderStatementsPage();
}

function syncPageNavigation() {
    if (!elements.pageNavButtons?.length) {
        return;
    }

    elements.pageNavButtons.forEach(button => {
        const isActive = button.dataset.pageNav === state.activePage;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
}

function openAccountAdminPage() {
    setActivePage("settings");
}

function syncModalOpenState() {
    document.body.classList.toggle("modal-open", Boolean(document.querySelector(".modal.active")));
}

function isMobileViewport() {
    return window.matchMedia("(max-width: 768px)").matches;
}

function setModalState(modal, isOpen) {
    if (!modal) {
        return;
    }

    if (isOpen) modal.removeAttribute("hidden");
    modal.classList.toggle("active", isOpen);
    modal.setAttribute("aria-hidden", isOpen ? "false" : "true");

    const modalBody = modal.querySelector(".modal-body");
    if (isOpen && modalBody) {
        modalBody.scrollTop = 0;
    }

    syncModalOpenState();
}

function resetDocumentModalViewport(step) {
    const modalBody = elements.documentModal?.querySelector(".modal-body");
    if (modalBody) {
        modalBody.scrollTop = 0;
    }

    const activePreview = step >= 5
        ? elements.documentModal?.querySelector(`.form-step.active .preview-container`)
        : null;
    if (activePreview) {
        activePreview.scrollTop = 0;
        activePreview.scrollLeft = 0;
    }
}

function syncActivePreviewScale() {
    if (!elements.documentModal?.classList.contains("active")) {
        return;
    }

    const activePreview = elements.documentModal.querySelector(".form-step.active .preview-container");
    const sheet = activePreview?.querySelector(".document-sheet");
    if (!activePreview || !sheet) {
        return;
    }

    sheet.style.transform = "";
    sheet.style.transformOrigin = "";

    if (!isMobileViewport() || state.currentStep < getTotalSteps()) {
        return;
    }

    const modalBody = elements.documentModal.querySelector(".modal-body");
    const stepIndicatorHeight = elements.stepIndicator?.offsetHeight || 0;
    const availableWidth = Math.max(activePreview.clientWidth - 8, 1);
    const availableHeight = Math.max((modalBody?.clientHeight || window.innerHeight) - stepIndicatorHeight - 24, 1);
    const sheetWidth = Math.max(sheet.offsetWidth, 1);
    const sheetHeight = Math.max(sheet.offsetHeight, 1);
    const scale = Math.min(availableWidth / sheetWidth, availableHeight / sheetHeight, 1);

    if (scale < 0.999) {
        sheet.style.transform = `scale(${scale})`;
        sheet.style.transformOrigin = "top center";
    }
}

function openCatalogItemModal() {
    state.editingCatalogItemId = null;
    elements.catalogItemNameInput.value = "";
    elements.catalogItemPriceInput.value = "0";
    elements.catalogItemCategoryInput.value = "";
    elements.catalogItemBrandInput.value = "";
    elements.catalogItemUnitSizeInput.value = "";
    elements.catalogItemVendorInput.value = "";
    elements.catalogItemDetailsInput.value = "";
    elements.catalogItemNotesInput.value = "";
    setModalState(elements.catalogItemModal, true);
    applyTranslations();
}

function closeCatalogItemModal() {
    setModalState(elements.catalogItemModal, false);
    state.editingCatalogItemId = null;
}

function openCatalogDetailsModal(item) {
    if (!item || !elements.catalogDetailsModal) {
        return;
    }

    const fallbackLabel = (item.name || "Item").trim().slice(0, 2).toUpperCase() || "IT";
    setElementText("#catalogDetailsTitle", item.name || "Catalog Item");
    setElementText("#catalogDetailsName", item.name || "Untitled item");
    setElementText("#catalogDetailsMeta", `${t(`source_${item.sourceKey}`)} · ${formatDateTime(item.dateUpdated)}`);
    setElementText("#catalogDetailsPrice", formatCurrency(item.price || 0));
    setElementText("#catalogDetailsCategory", item.category || "—");
    setElementText("#catalogDetailsBrand", item.brand || "—");
    setElementText("#catalogDetailsUnitSize", item.unitSize || "—");
    setElementText("#catalogDetailsVendor", item.vendor || "—");
    setElementText("#catalogDetailsText", item.details || "—");
    setElementText("#catalogDetailsNotes", item.notes || "—");
    setElementText("#catalogDetailsFallback", fallbackLabel);

    if (item.imageDataUrl) {
        elements.catalogDetailsImage.src = item.imageDataUrl;
        elements.catalogDetailsImage.hidden = false;
        elements.catalogDetailsFallback.hidden = true;
    } else {
        elements.catalogDetailsImage.hidden = true;
        elements.catalogDetailsImage.removeAttribute("src");
        elements.catalogDetailsFallback.hidden = false;
    }

    setModalState(elements.catalogDetailsModal, true);
}

function closeCatalogDetailsModal() {
    setModalState(elements.catalogDetailsModal, false);
}

function getCatalogEntries() {
    const manualEntries = state.catalogItems.map(item => ({
        ...item,
        imageDataUrl: typeof item.itemImageDataUrl === "string" ? item.itemImageDataUrl : "",
        sourceKey: "manual"
    }));

    const cartEntries = state.savedItems.map(item => ({
        id: `cart-${item.id}`,
        name: item.description || "Untitled item",
        details: item.description || "",
        notes: "",
        price: Number(item.unitPrice || 0),
        dateUpdated: item.createdAt || new Date().toISOString(),
        category: "",
        brand: "",
        unitSize: item.quantity ? `Qty ${formatAmount(item.quantity)}` : "",
        vendor: "",
        imageDataUrl: typeof item.itemImageDataUrl === "string" ? item.itemImageDataUrl : "",
        sourceKey: "cart"
    }));

    const documentEntries = state.documents.flatMap(doc => (Array.isArray(doc.items) ? doc.items : []).map((item, index) => ({
        id: `doc-${doc.id}-${index}`,
        name: item.description || `Item ${index + 1}`,
        details: item.description || "",
        notes: doc.notes || "",
        price: Number(item.unitPrice || item.price || 0),
        dateUpdated: doc.printedAt || doc.date || new Date().toISOString(),
        category: "",
        brand: "",
        unitSize: item.quantity ? `Qty ${formatAmount(item.quantity)}` : "",
        vendor: doc.clientName || "",
        imageDataUrl: typeof item.itemImageDataUrl === "string" ? item.itemImageDataUrl : "",
        sourceKey: "document"
    })));

    return [...manualEntries, ...cartEntries, ...documentEntries]
        .sort((left, right) => Date.parse(right.dateUpdated || 0) - Date.parse(left.dateUpdated || 0));
}

function renderCatalog() {
    if (!elements.catalogGrid) {
        return;
    }

    const entries = getCatalogEntries();
    if (!entries.length) {
        elements.catalogGrid.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h16M4 17h10"></path>
                </svg>
                <p>${escapeHtml(t("no_catalog_items"))}</p>
            </div>
        `;
        return;
    }

    elements.catalogGrid.innerHTML = entries.map(item => `
        <article class="catalog-card">
            <button class="catalog-card-trigger" type="button" data-catalog-action="open" data-catalog-id="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.name)}">
                <div class="catalog-card-bubble" aria-hidden="true">
                    ${item.imageDataUrl
                        ? `<img src="${escapeHtml(item.imageDataUrl)}" alt="${escapeHtml(item.name)}">`
                        : `<span>${escapeHtml((item.name || "Item").trim().slice(0, 2).toUpperCase() || "IT")}</span>`}
                </div>
                <div class="catalog-card-copy">
                    <strong>${escapeHtml(item.name)}</strong>
                    <span>${escapeHtml(t(`source_${item.sourceKey}`))}</span>
                </div>
            </button>
            ${item.sourceKey === "manual" ? `<button class="catalog-edit-btn" type="button" data-catalog-action="edit" data-catalog-id="${escapeHtml(item.id)}">${escapeHtml(t("edit"))}</button>` : ""}
        </article>
    `).join("");
}

function merchantColorIndex(name) {
    let hash = 0;
    const str = String(name || "");
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % 8;
}

function renderStatementsPage() {
    if (!elements.statementExportsList) {
        return;
    }

    if (!state.statementExports.length) {
        elements.statementExportsList.innerHTML = `<p class="client-list-empty">${escapeHtml(t("no_statements"))}</p>`;
        return;
    }

    const filtered = state.searchQuery
        ? state.statementExports.filter(statement => {
            const haystack = [
                statement.clientName,
                statement.vendorName,
                statement.referenceNumber,
                formatPrintedDate(statement.generatedAt)
            ].join(" ").toLowerCase();
            return haystack.includes(state.searchQuery);
        })
        : state.statementExports;

    if (!filtered.length) {
        elements.statementExportsList.innerHTML = `<p class="client-list-empty">${escapeHtml(t("no_results") || "No statements match your search.")}</p>`;
        return;
    }

    elements.statementExportsList.innerHTML = filtered.map(statement => {
        const accentClass = `merchant-${merchantColorIndex(statement.clientName || statement.payload?.clientName || "")}`;
        return `
        <article class="client-row statement-export-row ${accentClass}">
            <div class="client-row-copy statement-export-copy">
                <div class="statement-export-card-head">
                    <span class="statement-export-ref">${escapeHtml(statement.referenceNumber || "TL-S-01")}</span>
                    <span class="statement-export-date">${escapeHtml(formatPrintedDate(statement.generatedAt))}</span>
                </div>
                <span class="statement-export-client">Client</span>
                <strong>${escapeHtml(statement.clientName)}</strong>
                <div class="statement-export-metrics">
                    <div class="statement-export-metric">
                        <span>Invoices</span>
                        <strong>${escapeHtml(String(statement.rowCount))}</strong>
                    </div>
                    <div class="statement-export-metric">
                        <span>Total</span>
                        <strong>${escapeHtml(statement.totalSelectedFormatted)}</strong>
                    </div>
                    <div class="statement-export-metric is-grand">
                        <span>Grand Total</span>
                        <strong>${escapeHtml(statement.totalOutstandingFormatted)}</strong>
                    </div>
                </div>
            </div>
            <div class="client-row-actions statement-export-actions-bar">
                <button class="statement-action-btn is-open" type="button" data-statement-action="open" data-statement-id="${escapeHtml(statement.id)}" aria-label="${escapeHtml(t("open_statement"))}" title="${escapeHtml(t("open_statement"))}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s3.6-6 9-6 9 6 9 6-3.6 6-9 6-9-6-9-6Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.9"/></svg>
                    <span class="visually-hidden">${escapeHtml(t("open_statement"))}</span>
                </button>
                <button class="statement-action-btn is-edit" type="button" data-statement-action="edit" data-statement-id="${escapeHtml(statement.id)}" aria-label="${escapeHtml(t("edit"))}" title="${escapeHtml(t("edit"))}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4.2-1 9.1-9.1a1.9 1.9 0 0 0 0-2.7l-.5-.5a1.9 1.9 0 0 0-2.7 0L5 15.8 4 20Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="m13.5 7.5 3 3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
                    <span class="visually-hidden">${escapeHtml(t("edit"))}</span>
                </button>
                <button class="statement-action-btn is-delete" type="button" data-statement-action="delete" data-statement-id="${escapeHtml(statement.id)}" aria-label="${escapeHtml(t("delete"))}" title="${escapeHtml(t("delete"))}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M9 4h6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M7 7l1 12h8l1-12" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 11v5M14 11v5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
                    <span class="visually-hidden">${escapeHtml(t("delete"))}</span>
                </button>
            </div>
        </article>
    `; }).join("");
}

function handleStatementExportsListClick(event) {
    const button = event.target.closest("[data-statement-action]");
    if (!button) {
        return;
    }

    const statement = state.statementExports.find(entry => entry.id === button.dataset.statementId);
    if (!statement) {
        return;
    }

    if (button.dataset.statementAction === "open") {
        window.StatementOfAccount.generateStatementOfAccountPdf(statement.payload);
        return;
    }

    if (button.dataset.statementAction === "edit") {
        openStatementEditModal(statement.id);
        return;
    }

    if (button.dataset.statementAction === "delete") {
        deleteStatementExport(statement.id);
    }
}

function createEmptyStatementEditRow() {
    return {
        id: `statement-row-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        invoiceNumber: "",
        poNumbers: "—",
        invoiceDate: "",
        dueDate: "",
        invoiceValue: 0,
        invoiceValueFormatted: formatCurrency(0),
        status: "Unpaid",
        rawStatus: "unpaid"
    };
}

function createEmptyStatementDeduction() {
    return {
        id: `statement-deduction-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        label: "",
        amount: 0
    };
}

function getEditingStatementExport() {
    return state.statementExports.find(entry => entry.id === state.editingStatementExportId) || null;
}

function buildStatementEditRowMarkup(row) {
    return `
        <article class="statement-edit-row" data-statement-row-id="${escapeHtml(String(row.id))}">
            <div class="statement-edit-row-head">
                <strong>${escapeHtml(row.invoiceNumber || "Statement Row")}</strong>
                <button class="statement-edit-inline-btn" type="button" data-statement-row-remove="${escapeHtml(String(row.id))}">Remove row</button>
            </div>
            <div class="statement-edit-row-grid">
                <label class="form-group statement-edit-field">
                    <span>Invoice Number</span>
                    <input type="text" data-statement-row-field="invoiceNumber" value="${escapeHtml(row.invoiceNumber || "")}">
                </label>
                <label class="form-group statement-edit-field">
                    <span>PO Number(s)</span>
                    <input type="text" data-statement-row-field="poNumbers" value="${escapeHtml(row.poNumbers || "")}">
                </label>
                <label class="form-group statement-edit-field">
                    <span>Status</span>
                    <input type="text" data-statement-row-field="status" value="${escapeHtml(row.status || "")}">
                </label>
                <label class="form-group statement-edit-field">
                    <span>Invoice Date</span>
                    <input type="text" data-statement-row-field="invoiceDate" value="${escapeHtml(row.invoiceDate || "")}">
                </label>
                <label class="form-group statement-edit-field">
                    <span>Due Date</span>
                    <input type="text" data-statement-row-field="dueDate" value="${escapeHtml(row.dueDate || "")}">
                </label>
                <label class="form-group statement-edit-field statement-edit-amount-field">
                    <span>Value</span>
                    <input type="number" step="0.01" data-statement-row-field="invoiceValue" value="${escapeHtml(String(Number(row.invoiceValue || 0).toFixed(2)))}">
                </label>
            </div>
        </article>
    `;
}

function buildStatementEditDeductionMarkup(deduction) {
    return `
        <article class="statement-edit-deduction" data-statement-deduction-id="${escapeHtml(String(deduction.id))}">
            <div class="statement-edit-row-head">
                <strong>${escapeHtml(deduction.label || "Deduction")}</strong>
                <button class="statement-edit-inline-btn" type="button" data-statement-deduction-remove="${escapeHtml(String(deduction.id))}">Remove deduction</button>
            </div>
            <div class="statement-edit-row-grid statement-edit-deduction-grid">
                <label class="form-group statement-edit-field">
                    <span>Deduction Label</span>
                    <input type="text" data-statement-deduction-field="label" value="${escapeHtml(deduction.label || "")}" placeholder="Advance payment">
                </label>
                <label class="form-group statement-edit-field statement-edit-amount-field">
                    <span>Amount</span>
                    <input type="number" step="0.01" data-statement-deduction-field="amount" value="${escapeHtml(String(Number(deduction.amount || 0).toFixed(2)))}">
                </label>
            </div>
        </article>
    `;
}

function collectStatementEditPayload() {
    const statement = getEditingStatementExport();
    if (!statement) {
        return null;
    }

    const rows = Array.from(elements.statementEditRows.querySelectorAll("[data-statement-row-id]")).map(card => {
        const id = String(card.dataset.statementRowId || "");
        const getField = name => card.querySelector(`[data-statement-row-field="${name}"]`)?.value || "";
        const invoiceNumberValue = getField("invoiceNumber").trim();
        const poNumbersValue = getField("poNumbers").trim();
        const invoiceDateValue = getField("invoiceDate").trim();
        const dueDateValue = getField("dueDate").trim();
        const statusValue = getField("status").trim();
        const amount = Number.parseFloat(getField("invoiceValue")) || 0;
        return {
            id,
            invoiceNumber: invoiceNumberValue || "—",
            poNumbers: poNumbersValue || "—",
            invoiceDate: invoiceDateValue || "—",
            dueDate: dueDateValue || "—",
            invoiceValue: amount,
            invoiceValueFormatted: window.StatementOfAccount.formatStatementCurrency(amount, { locale: statement.payload.locale, currency: statement.payload.currency }),
            status: statusValue || "—",
            rawStatus: statusValue || "",
            _hasUserInput: Boolean(invoiceNumberValue || poNumbersValue || invoiceDateValue || dueDateValue || statusValue || amount)
        };
    }).filter(row => row._hasUserInput).map(({ _hasUserInput, ...row }) => row);

    const deductions = Array.from(elements.statementEditDeductions.querySelectorAll("[data-statement-deduction-id]")).map(card => {
        const id = String(card.dataset.statementDeductionId || "");
        const label = card.querySelector('[data-statement-deduction-field="label"]')?.value || "";
        const amount = Number.parseFloat(card.querySelector('[data-statement-deduction-field="amount"]')?.value || "0") || 0;
        return { id, label: label.trim(), amount };
    }).filter(entry => entry.label || entry.amount);

    return window.StatementOfAccount.normalizeStatementPayload({
        ...statement.payload,
        rows,
        deductions,
        statementNote: elements.statementEditNoteInput.value.trim()
    });
}

function syncStatementEditTotalsUi() {
    if (!elements.statementEditTotals || !state.editingStatementExportId) {
        return;
    }
    const payload = collectStatementEditPayload();
    if (!payload) {
        return;
    }
    const totals = window.StatementOfAccount.calculateStatementTotals(payload);
    elements.statementEditTotals.innerHTML = `
        <div class="statement-edit-total-row"><span>Outstanding subtotal</span><strong>${escapeHtml(totals.selectedTotalFormatted)}</strong></div>
        <div class="statement-edit-total-row"><span>Total deductions</span><strong>${escapeHtml(totals.deductionTotalFormatted)}</strong></div>
        <div class="statement-edit-total-row is-grand"><span>Grand total</span><strong>${escapeHtml(totals.grandTotalFormatted)}</strong></div>
    `;
}

function renderStatementEditModal() {
    const statement = getEditingStatementExport();
    if (!statement) {
        return;
    }
    const payload = window.StatementOfAccount.normalizeStatementPayload(statement.payload);
    elements.statementEditSummary.innerHTML = `
        <article class="invoice-report-summary-card">
            <span>Vendor</span>
            <strong>${escapeHtml(payload.vendorName || statement.vendorName || BRAND.name)}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>Client</span>
            <strong>${escapeHtml(statement.clientName)}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>Reference</span>
            <strong>${escapeHtml(payload.referenceNumber || "—")}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>Currency</span>
            <strong>${escapeHtml(payload.currency || "USD")}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>Rows</span>
            <strong>${escapeHtml(String(payload.rows.length))}</strong>
        </article>
    `;
    elements.statementEditRows.innerHTML = payload.rows.map(buildStatementEditRowMarkup).join("");
    elements.statementEditDeductions.innerHTML = payload.deductions.map(buildStatementEditDeductionMarkup).join("");
    elements.statementEditNoteInput.value = payload.statementNote || "";
    syncStatementEditTotalsUi();
}

function openStatementEditModal(statementId) {
    state.editingStatementExportId = statementId;
    renderStatementEditModal();
    setModalState(elements.statementEditModal, true);
}

function closeStatementEditModal() {
    state.editingStatementExportId = null;
    setModalState(elements.statementEditModal, false);
}

function addStatementEditRow() {
    if (!elements.statementEditRows) {
        return;
    }
    elements.statementEditRows.insertAdjacentHTML("beforeend", buildStatementEditRowMarkup(createEmptyStatementEditRow()));
    syncStatementEditTotalsUi();
}

function addStatementEditDeduction() {
    if (!elements.statementEditDeductions) {
        return;
    }
    elements.statementEditDeductions.insertAdjacentHTML("beforeend", buildStatementEditDeductionMarkup(createEmptyStatementDeduction()));
    syncStatementEditTotalsUi();
}

function handleStatementEditRowsClick(event) {
    const removeButton = event.target.closest("[data-statement-row-remove]");
    if (!removeButton) {
        return;
    }
    removeButton.closest("[data-statement-row-id]")?.remove();
    syncStatementEditTotalsUi();
}

function handleStatementEditDeductionsClick(event) {
    const removeButton = event.target.closest("[data-statement-deduction-remove]");
    if (!removeButton) {
        return;
    }
    removeButton.closest("[data-statement-deduction-id]")?.remove();
    syncStatementEditTotalsUi();
}

async function saveStatementEdit(options = {}) {
    const statement = getEditingStatementExport();
    const payload = collectStatementEditPayload();
    if (!statement || !payload) {
        return;
    }
    const updatedStatement = {
        ...statement,
        vendorName: payload.vendorName || statement.vendorName || BRAND.name,
        referenceNumber: payload.referenceNumber || statement.referenceNumber,
        clientName: payload.clientName || statement.clientName,
        rowCount: payload.rows.length,
        totalSelectedFormatted: payload.totalSelectedFormatted,
        totalOutstandingFormatted: payload.grandTotalFormatted,
        payload
    };
    await saveStatementExportsState(state.statementExports.map(entry => (
        entry.id === statement.id ? updatedStatement : entry
    )));
    if (options.openPreview) {
        window.StatementOfAccount.generateStatementOfAccountPdf(payload);
        setImportStatus("Statement changes saved and preview opened.");
    } else {
        setImportStatus("Statement changes saved.");
    }
    closeStatementEditModal();
}

async function deleteStatementExport(statementId) {
    const statement = state.statementExports.find(entry => entry.id === statementId);
    if (!statement) {
        return;
    }

    if (!window.confirm(`Delete saved statement "${statement.referenceNumber || "TL-S"}" for "${statement.clientName}"?`)) {
        return;
    }

    await saveStatementExportsState(state.statementExports.filter(entry => entry.id !== statementId));
    setImportStatus(`Deleted saved statement ${statement.referenceNumber || ""} for ${statement.clientName}.`);
}

function handleCatalogGridClick(event) {
    const openButton = event.target.closest("[data-catalog-action=\"open\"]");
    if (openButton) {
        const item = getCatalogEntries().find(entry => entry.id === openButton.dataset.catalogId);
        if (item) {
            openCatalogDetailsModal(item);
        }
        return;
    }

    const editButton = event.target.closest("[data-catalog-action=\"edit\"]");
    if (!editButton) {
        return;
    }

    const item = state.catalogItems.find(entry => entry.id === editButton.dataset.catalogId);
    if (!item) {
        return;
    }

    state.editingCatalogItemId = item.id;
    elements.catalogItemNameInput.value = item.name || "";
    elements.catalogItemPriceInput.value = String(item.price || 0);
    elements.catalogItemCategoryInput.value = item.category || "";
    elements.catalogItemBrandInput.value = item.brand || "";
    elements.catalogItemUnitSizeInput.value = item.unitSize || "";
    elements.catalogItemVendorInput.value = item.vendor || "";
    elements.catalogItemDetailsInput.value = item.details || "";
    elements.catalogItemNotesInput.value = item.notes || "";
    closeCatalogDetailsModal();
    setModalState(elements.catalogItemModal, true);
    applyTranslations();
}

async function saveCatalogItemFromModal() {
    const name = elements.catalogItemNameInput.value.trim();
    if (!name) {
        window.alert("Enter an item name before saving.");
        return;
    }

    const item = {
        id: state.editingCatalogItemId || `catalog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name,
        details: elements.catalogItemDetailsInput.value.trim(),
        notes: elements.catalogItemNotesInput.value.trim(),
        price: Number.parseFloat(elements.catalogItemPriceInput.value) || 0,
        dateUpdated: new Date().toISOString(),
        category: elements.catalogItemCategoryInput.value.trim(),
        brand: elements.catalogItemBrandInput.value.trim(),
        unitSize: elements.catalogItemUnitSizeInput.value.trim(),
        vendor: elements.catalogItemVendorInput.value.trim()
    };

    const nextItems = state.editingCatalogItemId
        ? state.catalogItems.map(entry => entry.id === state.editingCatalogItemId ? item : entry)
        : [item, ...state.catalogItems];

    await saveCatalogItems(nextItems);
    closeCatalogItemModal();
    setActivePage("catalog");
}

function syncItemActionMenus() {
    elements.itemsContainer.querySelectorAll("[data-item-menu]").forEach(menu => {
        const isOpen = menu.dataset.itemMenu === state.openItemMenuId;
        menu.hidden = !isOpen;
        menu.style.display = isOpen ? "grid" : "none";
    });
    elements.itemsContainer.querySelectorAll("[data-toggle-item-menu]").forEach(button => {
        button.setAttribute("aria-expanded", String(button.dataset.toggleItemMenu === state.openItemMenuId));
    });
}

function syncDocumentActionMenus() {
    elements.documentsGrid.querySelectorAll("[data-document-menu]").forEach(menu => {
        const isOpen = menu.dataset.documentMenu === state.openDocumentMenuId;
        menu.hidden = !isOpen;
        menu.style.display = isOpen ? "grid" : "none";
        const row = menu.closest(".document-card");
        if (row) {
            row.classList.toggle("has-open-menu", isOpen);
        }
    });
    elements.documentsGrid.querySelectorAll("[data-toggle-document-menu]").forEach(button => {
        button.setAttribute("aria-expanded", String(button.dataset.toggleDocumentMenu === state.openDocumentMenuId));
    });
}

function handleTopbarSettingsClick() {
    closeTopbarMenu();
    openSettingsModal();
}

function handleGlobalClick(event) {
    if (!event.target.closest(".topbar-menu-wrap") && !event.target.closest(".docs-new-wrap")) {
        closeTopbarMenu();
        closeNewMenu();
    }
    if (!event.target.closest(".workspace-new-wrap")) {
        closeOverviewNewMenu();
    }

    if (!event.target.closest(".invoice-report-export-more-wrap")) {
        closeInvoiceReportExportMenu();
    }

    if (!event.target.closest(".item-actions-menu-wrap") && state.openItemMenuId !== null) {
        state.openItemMenuId = null;
        syncItemActionMenus();
    }

    if (!event.target.closest(".doc-actions-menu-wrap") && state.openDocumentMenuId !== null) {
        state.openDocumentMenuId = null;
        syncDocumentActionMenus();
    }
}

function openSettingsModal() {
    if (!isAdminSession()) {
        setImportStatus("Only admin accounts can open workspace tools.", true);
        return;
    }

    syncEditorPreferenceControls();
    renderUserManagementList();
    renderClientManagementList();
    setActivePage("settings");
}

function openDataToolsModal() {
    setModalState(elements.dataToolsModal, true);
}

function openCompanyProfileFromSettings() {
    openCompanyProfileModal();
}

function closeSettingsModal() {
    if (state.activePage === "settings") {
        setActivePage("overview");
    }
}

function closeDataToolsModal() {
    setModalState(elements.dataToolsModal, false);
}

function openIssueInboxFromSettings() {
    void openIssueInboxModal();
}

function openIssueReportModal() {
    elements.issueReportStatus.hidden = true;
    elements.issueReportStatus.textContent = "";
    elements.issueReportStatus.classList.remove("hero-helper-error");
    setModalState(elements.issueReportModal, true);
}

function closeIssueReportModal() {
    setModalState(elements.issueReportModal, false);
}

async function openIssueInboxModal() {
    if (!isAdminSession()) {
        return;
    }

    await saveIssueReports(state.issueReports.map(report => ({ ...report, unread: false })));
    setModalState(elements.issueInboxModal, true);
}

function closeIssueInboxModal() {
    setModalState(elements.issueInboxModal, false);
}

function openInvoiceReportsModal() {
    state.selectedInvoiceReportIds = [];
    renderInvoiceReport();
    setModalState(elements.invoiceReportsModal, true);
}

function closeInvoiceReportsModal() {
    setModalState(elements.invoiceReportsModal, false);
}

function openStatementExportModal() {
    const selection = getSelectedInvoiceStatementContext();
    if (!selection.selectedInvoices.length) {
        setImportStatus(t("statement_select_first_error"), true);
        window.alert(t("statement_select_first_error"));
        return;
    }

    if (!selection.isSingleClient) {
        setImportStatus(t("statement_mixed_clients_error"), true);
        window.alert(t("statement_mixed_clients_error"));
        return;
    }

    state.statementExportStep = 1;
    renderStatementExportModal();
    setModalState(elements.statementExportModal, true);
}

function closeStatementExportModal() {
    setModalState(elements.statementExportModal, false);
}

function syncStatementExportWizardUi() {
    const step = Math.min(3, Math.max(1, Number(state.statementExportStep || 1)));
    const stepMeta = {
        1: {
            title: "Selection Summary",
            copy: "Confirm the client and totals before reviewing the exact invoice rows."
        },
        2: {
            title: "Included Invoices",
            copy: "These are the only invoices that will appear in the generated statement."
        },
        3: {
            title: "Ready To Generate",
            copy: "One last check, then open the print-ready Statement of Account."
        }
    };

    state.statementExportStep = step;
    elements.statementExportSteps.forEach(button => {
        const buttonStep = Number(button.dataset.statementExportStep || "1");
        const isActive = buttonStep === step;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-current", isActive ? "step" : "false");
        button.disabled = state.statementExportInProgress;
    });

    if (elements.statementExportStageLabel) {
        elements.statementExportStageLabel.textContent = `Step ${step} of 3`;
    }
    if (elements.statementExportStageTitle) {
        elements.statementExportStageTitle.textContent = stepMeta[step].title;
    }
    if (elements.statementExportStageCopy) {
        elements.statementExportStageCopy.textContent = stepMeta[step].copy;
    }

    if (elements.statementExportOverviewPanel) {
        elements.statementExportOverviewPanel.hidden = step !== 1;
    }
    if (elements.statementExportRowsPanel) {
        elements.statementExportRowsPanel.hidden = step !== 2;
    }
    if (elements.statementExportConfirmPanel) {
        elements.statementExportConfirmPanel.hidden = step !== 3;
    }

    if (elements.statementExportBackBtn) {
        elements.statementExportBackBtn.disabled = step === 1 || state.statementExportInProgress;
    }
    if (elements.statementExportNextBtn) {
        elements.statementExportNextBtn.hidden = step === 3;
        elements.statementExportNextBtn.disabled = state.statementExportInProgress;
    }
    if (elements.confirmStatementExportBtn) {
        elements.confirmStatementExportBtn.hidden = step !== 3;
    }
}

function handleStatementExportStepClick(event) {
    if (state.statementExportInProgress) {
        return;
    }
    state.statementExportStep = Number(event.currentTarget.dataset.statementExportStep || "1");
    syncStatementExportWizardUi();
}

function goToPreviousStatementExportStep() {
    if (state.statementExportInProgress) {
        return;
    }
    state.statementExportStep = Math.max(1, Number(state.statementExportStep || 1) - 1);
    syncStatementExportWizardUi();
}

function goToNextStatementExportStep() {
    if (state.statementExportInProgress) {
        return;
    }
    state.statementExportStep = Math.min(3, Number(state.statementExportStep || 1) + 1);
    syncStatementExportWizardUi();
}

function getInvoiceReportFilter() {
    const activeButton = elements.invoiceReportFilterButtons.find(button => button.classList.contains("active"));
    return activeButton?.dataset?.invoiceReportFilter || "all";
}

function getVisibleInvoiceReportInvoices() {
    return getInvoiceReportData().clientGroups.flatMap(group => group.invoices);
}

function syncInvoiceReportExportMenu() {
    if (!elements.invoiceReportExportMoreBtn || !elements.invoiceReportExportMoreMenu) {
        return;
    }

    const isOpen = elements.invoiceReportExportMoreMenu.hidden === false;
    elements.invoiceReportExportMoreBtn.setAttribute("aria-expanded", String(isOpen));
}

function closeInvoiceReportExportMenu() {
    if (!elements.invoiceReportExportMoreMenu) {
        return;
    }

    elements.invoiceReportExportMoreMenu.hidden = true;
    syncInvoiceReportExportMenu();
}

function toggleInvoiceReportExportMenu() {
    if (!elements.invoiceReportExportMoreMenu) {
        return;
    }

    elements.invoiceReportExportMoreMenu.hidden = !elements.invoiceReportExportMoreMenu.hidden;
    syncInvoiceReportExportMenu();
}

function getSelectedInvoiceReportInvoices() {
    const selectedIds = new Set(state.selectedInvoiceReportIds.map(String));
    return getVisibleInvoiceReportInvoices().filter(doc => selectedIds.has(String(doc.id)));
}

function getSelectedInvoiceStatementContext() {
    const selectedInvoices = getSelectedInvoiceReportInvoices();
    const clientNames = Array.from(new Set(
        selectedInvoices.map(doc => String(doc.clientName || t("unknown_client")).trim() || t("unknown_client"))
    ));
    const totalSelected = selectedInvoices.reduce((sum, doc) => sum + Number(doc.total || 0), 0);
    const outstandingTotal = selectedInvoices.reduce((sum, doc) => {
        return normalizePaymentStatus(doc.paymentStatus) === "paid"
            ? sum
            : sum + Number(doc.total || 0);
    }, 0);

    return {
        selectedInvoices,
        clientNames,
        isSingleClient: clientNames.length <= 1,
        clientName: clientNames[0] || "",
        totalSelected,
        outstandingTotal
    };
}

function getStatementExportCountForInvoice(doc) {
    return state.statementExports.reduce((count, statement) => {
        const sourceIds = Array.isArray(statement?.payload?.sourceInvoiceIds)
            ? statement.payload.sourceInvoiceIds.map(String)
            : [];
        if (sourceIds.includes(String(doc.id))) {
            return count + 1;
        }

        const rowMatch = Array.isArray(statement?.payload?.rows)
            && statement.payload.rows.some(row => String(row.invoiceNumber || "") === String(doc.refNumber || ""));
        return rowMatch ? count + 1 : count;
    }, 0);
}

function syncInvoiceReportSelectionUi() {
    if (!elements.statementSelectionToolbar) {
        return;
    }

    const selection = getSelectedInvoiceStatementContext();
    const selectedCount = selection.selectedInvoices.length;
    const mixedClients = !selection.isSingleClient;

    elements.statementSelectionToolbar.hidden = false;
    elements.statementSelectionTitle.textContent = selectedCount
        ? `${selectedCount} ${t("report_total_invoices").toLowerCase()} selected`
        : t("statement_no_selection");
    elements.statementSelectionMeta.textContent = !selectedCount
        ? t("statement_selection_help")
        : mixedClients
        ? t("statement_mixed_clients_error")
        : selection.clientName;
    elements.statementSelectionTotal.textContent = formatCurrency(selection.totalSelected);
    elements.statementSelectionOutstanding.textContent = formatCurrency(selection.outstandingTotal);

    const canExportStatement = selectedCount > 0 && !mixedClients && !state.statementExportInProgress;
    elements.openStatementExportBtn.disabled = !canExportStatement;
    elements.exportInvoiceReportCsvBtn.disabled = selectedCount === 0;
    elements.confirmStatementExportBtn.disabled = !canExportStatement;
}

function handleInvoiceReportFilterClick(event) {
    const button = event.currentTarget;
    const nextFilter = button.dataset.invoiceReportFilter || "all";
    elements.invoiceReportFilterButtons.forEach(entry => {
        const isActive = entry.dataset.invoiceReportFilter === nextFilter;
        entry.classList.toggle("active", isActive);
        entry.setAttribute("aria-pressed", String(isActive));
    });
    renderInvoiceReport();
}

function handleInvoiceReportListChange(event) {
    const checkbox = event.target.closest("[data-invoice-report-select]");
    const groupCheckbox = event.target.closest("[data-invoice-report-group-select]");
    if (groupCheckbox) {
        const clientName = String(groupCheckbox.dataset.invoiceReportGroupSelect || "");
        const clientInvoices = getVisibleInvoiceReportInvoices().filter(doc => (String(doc.clientName || t("unknown_client")).trim() || t("unknown_client")) === clientName);
        const nextSelection = new Set(state.selectedInvoiceReportIds.map(String));
        clientInvoices.forEach(doc => {
            if (groupCheckbox.checked) {
                nextSelection.add(String(doc.id));
            } else {
                nextSelection.delete(String(doc.id));
            }
        });
        state.selectedInvoiceReportIds = [...nextSelection];
        renderInvoiceReport();
        return;
    }

    if (!checkbox) {
        return;
    }

    const documentId = String(checkbox.dataset.invoiceReportSelect || "");
    if (!documentId) {
        return;
    }

    const nextSelection = new Set(state.selectedInvoiceReportIds.map(String));
    if (checkbox.checked) {
        nextSelection.add(documentId);
    } else {
        nextSelection.delete(documentId);
    }
    state.selectedInvoiceReportIds = [...nextSelection];
    syncInvoiceReportSelectionUi();
}

function handleInvoiceReportListClick() {}

function selectVisibleInvoiceReports() {
    const visibleIds = getVisibleInvoiceReportInvoices().map(doc => String(doc.id));
    state.selectedInvoiceReportIds = visibleIds;
    renderInvoiceReport();
}

function clearSelectedInvoiceReports() {
    state.selectedInvoiceReportIds = [];
    renderInvoiceReport();
}

function handleDatePresetClick(event) {
    const preset = event.currentTarget.dataset.preset;
    const today = new Date();
    let start = "";
    let end = "";

    if (preset === "this-month") {
        start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().slice(0, 10);
    } else if (preset === "last-30") {
        const past = new Date(today);
        past.setDate(today.getDate() - 29);
        start = past.toISOString().slice(0, 10);
        end = today.toISOString().slice(0, 10);
    } else if (preset === "this-year") {
        start = new Date(today.getFullYear(), 0, 1).toISOString().slice(0, 10);
        end = new Date(today.getFullYear(), 11, 31).toISOString().slice(0, 10);
    }

    document.querySelectorAll(".preset-chip").forEach(btn => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");
    elements.invoiceReportStartDate.value = start;
    elements.invoiceReportEndDate.value = end;
    renderInvoiceReport();
}

function getInvoiceReportDateRange() {
    const startValue = elements.invoiceReportStartDate?.value || "";
    const endValue = elements.invoiceReportEndDate?.value || "";
    const startTimestamp = startValue ? Date.parse(`${startValue}T00:00:00`) : null;
    const endTimestamp = endValue ? Date.parse(`${endValue}T23:59:59.999`) : null;

    return {
        startValue,
        endValue,
        startTimestamp: Number.isNaN(startTimestamp) ? null : startTimestamp,
        endTimestamp: Number.isNaN(endTimestamp) ? null : endTimestamp
    };
}

function getInvoiceReportData() {
    const dateRange = getInvoiceReportDateRange();
    const rangedInvoices = state.documents.filter(doc => {
        if (doc.type !== "invoice") {
            return false;
        }

        const timestamp = getDocumentDateAt(doc);
        if (dateRange.startTimestamp !== null && timestamp < dateRange.startTimestamp) {
            return false;
        }
        if (dateRange.endTimestamp !== null && timestamp > dateRange.endTimestamp) {
            return false;
        }
        return true;
    });
    const filter = getInvoiceReportFilter();
    const sortOrder = elements.invoiceReportSort.value || "client_asc";
    const filteredInvoices = rangedInvoices
        .filter(doc => filter === "all" || normalizePaymentStatus(doc.paymentStatus) === filter);
    const groupedByClient = new Map();

    filteredInvoices.forEach(doc => {
        const clientName = String(doc.clientName || t("unknown_client")).trim() || t("unknown_client");
        const existingGroup = groupedByClient.get(clientName) || {
            clientName,
            invoices: [],
            total: 0
        };
        existingGroup.invoices.push(doc);
        existingGroup.total += Number(doc.total || 0);
        groupedByClient.set(clientName, existingGroup);
    });

    const clientGroups = [...groupedByClient.values()]
        .map(group => ({
            ...group,
            invoices: [...group.invoices].sort((left, right) => compareDocuments(left, right, "date_desc"))
        }))
        .sort((left, right) => {
            const comparison = left.clientName.localeCompare(right.clientName, getCurrentLocale(), { sensitivity: "base" });
            return sortOrder === "client_desc" ? -comparison : comparison;
        });

    const paidCount = rangedInvoices.filter(doc => normalizePaymentStatus(doc.paymentStatus) === "paid").length;
    const pendingCount = rangedInvoices.filter(doc => normalizePaymentStatus(doc.paymentStatus) === "pending").length;
    const unpaidCount = rangedInvoices.filter(doc => normalizePaymentStatus(doc.paymentStatus) === "unpaid").length;
    const paidTotal = rangedInvoices
        .filter(doc => normalizePaymentStatus(doc.paymentStatus) === "paid")
        .reduce((sum, doc) => sum + Number(doc.total || 0), 0);
    const pendingTotal = rangedInvoices
        .filter(doc => normalizePaymentStatus(doc.paymentStatus) === "pending")
        .reduce((sum, doc) => sum + Number(doc.total || 0), 0);
    const unpaidTotal = rangedInvoices
        .filter(doc => normalizePaymentStatus(doc.paymentStatus) === "unpaid")
        .reduce((sum, doc) => sum + Number(doc.total || 0), 0);

    return {
        allInvoices: rangedInvoices,
        clientGroups,
        dateRange,
        summary: {
            paidCount,
            pendingCount,
            unpaidCount,
            paidTotal,
            pendingTotal,
            unpaidTotal,
            clientCount: new Set(rangedInvoices.map(doc => String(doc.clientName || t("unknown_client")).trim() || t("unknown_client"))).size
        }
    };
}

function renderInvoiceReport() {
    if (!elements.invoiceReportList || !elements.invoiceReportSummary || !elements.invoiceReportSort) {
        return;
    }

    const { allInvoices, clientGroups, summary } = getInvoiceReportData();
    const selectedIds = new Set(state.selectedInvoiceReportIds.map(String));

    elements.invoiceReportSummary.innerHTML = `
        <article class="invoice-report-summary-card">
            <span>${escapeHtml(t("report_total_invoices"))}</span>
            <strong>${escapeHtml(String(allInvoices.length))}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>${escapeHtml(t("report_total_clients"))}</span>
            <strong>${escapeHtml(String(summary.clientCount))}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>${escapeHtml(t("report_total_paid"))}</span>
            <strong>${escapeHtml(`${summary.paidCount} • ${formatCurrency(summary.paidTotal)}`)}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>${escapeHtml(t("report_total_unpaid"))}</span>
            <strong>${escapeHtml(`${summary.unpaidCount} • ${formatCurrency(summary.unpaidTotal)}`)}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>${escapeHtml(t("report_total_pending"))}</span>
            <strong>${escapeHtml(`${summary.pendingCount} • ${formatCurrency(summary.pendingTotal)}`)}</strong>
        </article>
    `;

    if (!allInvoices.length) {
        elements.invoiceReportList.innerHTML = `<p class="invoice-report-empty">${escapeHtml(t("report_no_invoices"))}</p>`;
        syncInvoiceReportSelectionUi();
        return;
    }

    if (!clientGroups.length) {
        elements.invoiceReportList.innerHTML = `<p class="invoice-report-empty">${escapeHtml(t("report_no_matches"))}</p>`;
        syncInvoiceReportSelectionUi();
        return;
    }

    elements.invoiceReportList.innerHTML = clientGroups.map(group => `
        <article class="invoice-report-client-card">
            <div class="invoice-report-client-header">
                <div>
                    <strong>${escapeHtml(group.clientName)}</strong>
                    <span>${escapeHtml(`${group.invoices.length} ${t("report_total_invoices").toLowerCase()}`)}</span>
                </div>
                <div class="invoice-report-client-actions">
                    <label class="invoice-report-select-cell" title="${escapeHtml(t("select_visible_reports"))}">
                        <input
                            class="invoice-report-group-toggle"
                            type="checkbox"
                            data-invoice-report-group-select="${escapeHtml(group.clientName)}"
                            ${group.invoices.every(doc => selectedIds.has(String(doc.id))) ? "checked" : ""}
                        >
                    </label>
                    <div class="invoice-report-client-total">${escapeHtml(formatCurrency(group.total))}</div>
                </div>
            </div>
            <table class="invoice-report-table">
                <thead>
                    <tr>
                        <th>${escapeHtml(t("report_select"))}</th>
                        <th>${escapeHtml(t("report_ref"))}</th>
                        <th>${escapeHtml(t("report_date"))}</th>
                        <th>${escapeHtml(t("report_status"))}</th>
                        <th>${escapeHtml(t("report_total"))}</th>
                    </tr>
                </thead>
                <tbody>
                    ${group.invoices.map(doc => {
                        const statementCount = getStatementExportCountForInvoice(doc);
                        return `
                        <tr>
                            <td>
                                <label class="invoice-report-select-cell">
                                    <input type="checkbox" data-invoice-report-select="${escapeHtml(String(doc.id))}" ${selectedIds.has(String(doc.id)) ? "checked" : ""}>
                                </label>
                            </td>
                            <td>
                                <strong>${escapeHtml(doc.refNumber || "—")}</strong>
                                ${statementCount ? `<div class="invoice-report-inline-badge is-statement">In ${escapeHtml(String(statementCount))} saved statement${statementCount === 1 ? "" : "s"}</div>` : ""}
                            </td>
                            <td>${escapeHtml(formatDisplayDate(doc.date) || t("no_date"))}</td>
                            <td>${escapeHtml(getPaymentStatusLabel(doc.paymentStatus))}</td>
                            <td>${escapeHtml(formatCurrency(doc.total || 0))}</td>
                        </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        </article>
    `).join("");
    syncInvoiceReportSelectionUi();
}

function escapeCsvCell(value) {
    const normalized = String(value ?? "").replace(/\r?\n/g, " ").trim();
    return `"${normalized.replace(/"/g, '""')}"`;
}

function exportSelectedInvoiceReportCsv() {
    closeInvoiceReportExportMenu();
    const selection = getSelectedInvoiceStatementContext();
    if (!selection.selectedInvoices.length) {
        setImportStatus(t("statement_select_first_error"), true);
        return;
    }

    const rows = window.StatementOfAccount.mapInvoicesToStatementRows(selection.selectedInvoices, {
        locale: getCurrentLocale(),
        getStatusLabel: getPaymentStatusLabel
    });
    const csv = window.StatementOfAccount.buildStatementCsv(rows);
    const timestamp = new Date().toISOString().slice(0, 10);
    const baseName = selection.clientName
        ? `statement-of-account-${String(selection.clientName).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}-${timestamp}.csv`
        : `statement-of-account-${timestamp}.csv`;
    downloadTextFile(baseName, `${csv}\n`, "text/csv;charset=utf-8");
    setImportStatus(t("statement_csv_success"));
}

function printSelectedInvoiceReports() {
    closeInvoiceReportExportMenu();
    const selectedIds = new Set(state.selectedInvoiceReportIds.map(String));
    const selectedInvoices = getVisibleInvoiceReportInvoices().filter(doc => selectedIds.has(String(doc.id)));

    if (!selectedInvoices.length) {
        setImportStatus(t("report_print_selected_empty"), true);
        window.alert(t("report_print_selected_empty"));
        return;
    }

    const groupedByClient = new Map();
    selectedInvoices.forEach(doc => {
        const clientName = String(doc.clientName || t("unknown_client")).trim() || t("unknown_client");
        const group = groupedByClient.get(clientName) || {
            clientName,
            invoices: [],
            total: 0
        };
        group.invoices.push(doc);
        group.total += Number(doc.total || 0);
        groupedByClient.set(clientName, group);
    });

    const clientGroups = [...groupedByClient.values()]
        .map(group => ({
            ...group,
            invoices: [...group.invoices].sort((left, right) => compareDocuments(left, right, "date_desc"))
        }))
        .sort((left, right) => left.clientName.localeCompare(right.clientName, getCurrentLocale(), { sensitivity: "base" }));

    const dateRange = getInvoiceReportDateRange();
    const filter = getInvoiceReportFilter();
    const filterLabel = filter === "all" ? t("filter_all") : getPaymentStatusLabel(filter);
    const rangeLabel = dateRange.startValue || dateRange.endValue
        ? `${dateRange.startValue || "—"} to ${dateRange.endValue || "—"}`
        : "All dates";

    const printWindow = window.open("", "_blank", "noopener,noreferrer,width=1100,height=900");
    if (!printWindow) {
        window.alert("Please allow pop-ups to open the printable report.");
        return;
    }

    printWindow.document.write(`<!doctype html>
        <html lang="${escapeHtml(getCurrentLocale())}">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>${escapeHtml(t("report_print_title"))}</title>
            <style>
                body { margin: 0; font-family: Inter, system-ui, sans-serif; background: #eef3f9; color: #173453; }
                .report-print-toolbar { position: sticky; top: 0; display: flex; justify-content: flex-end; gap: 0.75rem; padding: 0.9rem 1rem; background: rgba(245,247,250,0.96); border-bottom: 1px solid #d8e0e8; }
                .report-print-toolbar button { border: 0; border-radius: 999px; padding: 0.7rem 1rem; font: inherit; font-weight: 700; cursor: pointer; background: #1d4ed8; color: white; }
                .report-print-toolbar button.secondary { background: #e7eef6; color: #28415b; }
                .report-print-shell { max-width: 1080px; margin: 0 auto; padding: 1.1rem; }
                .report-print-card { background: white; border-radius: 18px; padding: 1.2rem 1.25rem; box-shadow: 0 12px 30px rgba(23,52,83,0.08); }
                .report-print-header { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; }
                .report-print-header h1 { margin: 0 0 0.25rem; font-size: 1.4rem; }
                .report-print-header p, .report-print-meta span { margin: 0; color: #5b6f89; font-size: 0.88rem; }
                .report-print-meta { display: grid; gap: 0.2rem; text-align: right; }
                .report-print-group { border-top: 1px solid #dfe7f0; padding-top: 1rem; margin-top: 1rem; }
                .report-print-group:first-of-type { border-top: 0; padding-top: 0; margin-top: 0; }
                .report-print-group-head { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 0.7rem; }
                .report-print-group-head strong { font-size: 1rem; }
                .report-print-table { width: 100%; border-collapse: collapse; }
                .report-print-table th, .report-print-table td { padding: 0.6rem 0.45rem; text-align: left; border-top: 1px solid #e3eaf3; font-size: 0.84rem; }
                .report-print-table th { border-top: 0; padding-top: 0; color: #6d8097; font-size: 0.72rem; text-transform: uppercase; }
                @media print {
                    body { background: white; }
                    .report-print-toolbar { display: none !important; }
                    .report-print-shell { max-width: none; padding: 0; }
                    .report-print-card { box-shadow: none; border-radius: 0; padding: 0; }
                }
            </style>
        </head>
        <body>
            <div class="report-print-toolbar">
                <button class="secondary" type="button" onclick="window.close()">Close Preview</button>
                <button type="button" onclick="window.print()">Print</button>
            </div>
            <div class="report-print-shell">
                <article class="report-print-card">
                    <div class="report-print-header">
                        <div>
                            <h1>${escapeHtml(t("report_print_title"))}</h1>
                            <p>${escapeHtml(`${selectedInvoices.length} ${t("report_total_invoices").toLowerCase()}`)}</p>
                        </div>
                        <div class="report-print-meta">
                            <span>${escapeHtml(`${t("report_status")}: ${filterLabel}`)}</span>
                            <span>${escapeHtml(`${t("report_from")}/${t("report_to")}: ${rangeLabel}`)}</span>
                            <span>${escapeHtml(`Printed ${new Date().toLocaleString(getCurrentLocale())}`)}</span>
                        </div>
                    </div>
                    ${clientGroups.map(group => `
                        <section class="report-print-group">
                            <div class="report-print-group-head">
                                <div><strong>${escapeHtml(group.clientName)}</strong></div>
                                <strong>${escapeHtml(formatCurrency(group.total))}</strong>
                            </div>
                            <table class="report-print-table">
                                <thead>
                                    <tr>
                                        <th>${escapeHtml(t("report_ref"))}</th>
                                        <th>${escapeHtml(t("report_date"))}</th>
                                        <th>${escapeHtml(t("report_status"))}</th>
                                        <th>${escapeHtml(t("report_total"))}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${group.invoices.map(doc => `
                                        <tr>
                                            <td>${escapeHtml(doc.refNumber || "—")}</td>
                                            <td>${escapeHtml(formatDisplayDate(doc.date) || t("no_date"))}</td>
                                            <td>${escapeHtml(getPaymentStatusLabel(doc.paymentStatus))}</td>
                                            <td>${escapeHtml(formatCurrency(doc.total || 0))}</td>
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        </section>
                    `).join("")}
                </article>
            </div>
        </body>
        </html>`);
    printWindow.document.close();
    printWindow.focus();
}

function renderStatementExportModal() {
    const selection = getSelectedInvoiceStatementContext();
    const rows = window.StatementOfAccount.mapInvoicesToStatementRows(selection.selectedInvoices, {
        locale: getCurrentLocale(),
        getStatusLabel: getPaymentStatusLabel
    });

    elements.statementExportOverview.innerHTML = `
        <article class="invoice-report-summary-card">
            <span>Client</span>
            <strong>${escapeHtml(selection.clientName || t("unknown_client"))}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>Invoices Selected</span>
            <strong>${escapeHtml(String(rows.length))}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>${escapeHtml(t("statement_selected_value"))}</span>
            <strong>${escapeHtml(formatCurrency(selection.totalSelected))}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>${escapeHtml(t("statement_outstanding_balance"))}</span>
            <strong>${escapeHtml(formatCurrency(selection.outstandingTotal))}</strong>
        </article>
    `;

    elements.statementExportTableBody.innerHTML = rows.length
        ? rows.map(row => `
            <tr>
                <td><strong>${escapeHtml(row.invoiceNumber)}</strong></td>
                <td>${escapeHtml(row.poNumbers)}</td>
                <td>${escapeHtml(row.invoiceDate)}</td>
                <td>${escapeHtml(row.dueDate)}</td>
                <td>${escapeHtml(row.invoiceValueFormatted)}</td>
                <td>${escapeHtml(row.status)}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="6">${escapeHtml(t("statement_no_selection"))}</td></tr>`;

    const thumbLetterheadUrl = getLetterheadUrl();
    const thumbDate = new Date().toLocaleDateString(getCurrentLocale(), { year: "numeric", month: "short", day: "numeric" });
    const thumbRows = rows.slice(0, 3);
    const thumbHiddenCount = rows.length - thumbRows.length;

    const thumbRowsHtml = thumbRows.length
        ? thumbRows.map(row => `
            <div class="soa-thumb-row">
                <span class="soa-thumb-row-num">${escapeHtml(row.invoiceNumber)}</span>
                <span>${escapeHtml(row.invoiceDate)}</span>
                <span class="soa-thumb-row-val">${escapeHtml(row.invoiceValueFormatted)}</span>
                <span class="soa-thumb-row-status">${escapeHtml(row.status)}</span>
            </div>`).join("")
        : `<div class="soa-thumb-row"><span class="soa-thumb-row-empty" style="grid-column:1/-1">No invoices selected</span></div>`;

    elements.statementExportSnapshot.innerHTML = `
        <div class="soa-thumb-wrap">
            <span class="soa-thumb-caption">Page 1 Preview</span>
            <div class="soa-thumb-page">
                <div class="soa-thumb-lh">
                    ${thumbLetterheadUrl
                        ? `<img class="soa-thumb-lh-img" src="${escapeHtml(thumbLetterheadUrl)}" alt="">`
                        : `<div class="soa-thumb-lh-bar"></div>`}
                </div>
                <div class="soa-thumb-body">
                    <div class="soa-thumb-doc-title">Statement of Account</div>
                    <div class="soa-thumb-meta">
                        <div class="soa-thumb-meta-left">
                            <span class="soa-thumb-meta-label">Prepared for</span>
                            <strong class="soa-thumb-meta-value">${escapeHtml(selection.clientName || "—")}</strong>
                        </div>
                        <div class="soa-thumb-meta-right">
                            <span class="soa-thumb-meta-label">Generated</span>
                            <strong class="soa-thumb-meta-value">${escapeHtml(thumbDate)}</strong>
                        </div>
                    </div>
                    <div class="soa-thumb-divider"></div>
                    <div class="soa-thumb-table-head">
                        <span>Invoice #</span>
                        <span>Date</span>
                        <span>Value</span>
                        <span>Status</span>
                    </div>
                    ${thumbRowsHtml}
                    ${thumbHiddenCount > 0 ? `<div class="soa-thumb-more">+ ${thumbHiddenCount} more invoice${thumbHiddenCount !== 1 ? "s" : ""}</div>` : ""}
                    <div class="soa-thumb-divider"></div>
                    <div class="soa-thumb-balance">
                        <span class="soa-thumb-balance-label">Outstanding Balance</span>
                        <strong class="soa-thumb-balance-val">${escapeHtml(formatCurrency(selection.outstandingTotal))}</strong>
                    </div>
                </div>
            </div>
        </div>
    `;

    syncStatementExportWizardUi();
}

function getStatementPayload() {
    const selection = getSelectedInvoiceStatementContext();
    const profile = state.companyProfile || DEFAULT_COMPANY_PROFILE;
    const generatedAt = new Date();
    const referenceNumber = getNextStatementReferenceNumber();
    const rows = window.StatementOfAccount.mapInvoicesToStatementRows(selection.selectedInvoices, {
        locale: getCurrentLocale(),
        getStatusLabel: getPaymentStatusLabel
    });

    return window.StatementOfAccount.normalizeStatementPayload({
        locale: getCurrentLocale(),
        title: window.StatementOfAccount.createStatementFileName(referenceNumber, selection.clientName || "client", generatedAt),
        generatedIsoDate: generatedAt.toISOString(),
        sourceInvoiceIds: selection.selectedInvoices.map(doc => String(doc.id)),
        company: {
            companyName: profile.companyName || BRAND.name,
            address: profile.address || "",
            email: profile.email || "",
            phone: profile.phone || "",
            website: profile.website || ""
        },
        vendorName: profile.companyName || BRAND.name,
        clientName: selection.clientName || t("unknown_client"),
        generatedDate: formatPrintedDate(generatedAt),
        referenceNumber,
        currency: "USD",
        rows,
        deductions: [],
        totalSelectedFormatted: formatCurrency(selection.totalSelected),
        totalOutstandingFormatted: formatCurrency(selection.outstandingTotal),
        letterheadUrl: getLetterheadUrl(),
        footerWaveUrl: getFooterWaveUrl(),
        signatureUrl: getSignatureUrl(),
        stampUrl: getStampUrl(),
        statementNote: "This statement reflects all outstanding invoices issued to your company as of the date above."
    });
}

async function exportStatementOfAccountPdf() {
    const selection = getSelectedInvoiceStatementContext();
    if (!selection.selectedInvoices.length) {
        setImportStatus(t("statement_select_first_error"), true);
        return;
    }

    if (!selection.isSingleClient) {
        setImportStatus(t("statement_mixed_clients_error"), true);
        return;
    }

    state.statementExportInProgress = true;
    syncInvoiceReportSelectionUi();
    syncStatementExportWizardUi();
    elements.confirmStatementExportBtn.disabled = true;
    elements.confirmStatementExportBtn.textContent = "Generating...";

    try {
        const payload = getStatementPayload();
        window.StatementOfAccount.generateStatementOfAccountPdf(payload);
        await saveStatementExportsState([
            {
                id: `statement-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                title: payload.title,
                referenceNumber: payload.referenceNumber,
                clientName: payload.clientName,
                vendorName: payload.vendorName,
                generatedAt: new Date().toISOString(),
                rowCount: payload.rows.length,
                totalSelectedFormatted: payload.totalSelectedFormatted,
                totalOutstandingFormatted: payload.grandTotalFormatted,
                payload
            },
            ...state.statementExports
        ]);
        closeStatementExportModal();
        setImportStatus(t("statement_export_success"));
        recordActivity("exported statement of account", `Statement of Account generated for ${selection.clientName || "unknown client"} (${selection.selectedInvoices.length} invoices).`);
    } catch (error) {
        setImportStatus(error.message || t("statement_popup_error"), true);
        window.alert(error.message || t("statement_popup_error"));
    } finally {
        state.statementExportInProgress = false;
        elements.confirmStatementExportBtn.textContent = t("statement_generate_pdf");
        syncStatementExportWizardUi();
        syncInvoiceReportSelectionUi();
    }
}

function syncCompanyProfileForm() {
    const profile = state.companyProfile || DEFAULT_COMPANY_PROFILE;
    elements.companyNameInput.value = profile.companyName;
    elements.companyTaglineInput.value = profile.tagline;
    elements.companyAddressInput.value = profile.address;
    elements.companyEmailInput.value = profile.email;
    elements.companyPhoneInput.value = profile.phone;
    elements.companyWebsiteInput.value = profile.website;
    elements.companyTaxIdInput.value = profile.taxId;
}

function openCompanyProfileModal() {
    if (!isAdminSession()) {
        setImportStatus("Only admin accounts can edit the company profile.", true);
        return;
    }

    closeTopbarMenu();
    syncCompanyProfileForm();
    setModalState(elements.companyProfileModal, true);
}

function closeCompanyProfileModal() {
    setModalState(elements.companyProfileModal, false);
}

async function saveCompanyProfile() {
    await saveCompanyProfileState({
        companyName: elements.companyNameInput.value,
        tagline: elements.companyTaglineInput.value,
        address: elements.companyAddressInput.value,
        email: elements.companyEmailInput.value,
        phone: elements.companyPhoneInput.value,
        website: elements.companyWebsiteInput.value,
        taxId: elements.companyTaxIdInput.value
    });
    recordActivity("updated company profile", "Edited the SantoSync business identity settings.");
    closeCompanyProfileModal();
    renderDocuments();
    generatePreviews();
    window.alert(t("company_profile_saved"));
}

function syncSavedItemsTotal() {
    const quantity = Number.parseFloat(elements.savedItemQuantityInput.value) || 0;
    const unitPrice = Number.parseFloat(elements.savedItemUnitPriceInput.value) || 0;
    elements.savedItemTotalInput.value = formatAmount(quantity * unitPrice);
}

function syncSavedItemImageUI() {
    if (!elements.savedItemCreateModal) {
        return;
    }

    const imageDataUrl = elements.savedItemCreateModal.dataset.itemImageDataUrl || "";
    const preview = elements.savedItemImagePreview;
    const previewImg = elements.savedItemImagePreviewImg;
    const removeBtn = elements.savedItemImageRemoveBtn;
    const uploadCopy = document.querySelector(".saved-item-image-upload-copy small");

    if (preview && previewImg) {
        if (imageDataUrl) {
            preview.hidden = false;
            previewImg.src = imageDataUrl;
        } else {
            preview.hidden = true;
            previewImg.removeAttribute("src");
        }
    }

    if (removeBtn) {
        removeBtn.hidden = !imageDataUrl;
    }

    if (uploadCopy) {
        uploadCopy.textContent = imageDataUrl ? "Change image" : "Add image";
    }
}

function clearSavedItemImageSelection() {
    if (!elements.savedItemCreateModal) {
        return;
    }

    state.pendingSavedItemImageUploadId = null;
    elements.savedItemCreateModal.dataset.itemImageDataUrl = "";
    if (elements.savedItemImageInput) {
        elements.savedItemImageInput.value = "";
    }
    syncSavedItemImageUI();
}

async function handleSavedItemImageInputChange() {
    const file = elements.savedItemImageInput?.files?.[0] || null;
    if (!elements.savedItemCreateModal) {
        return;
    }

    if (state.pendingSavedItemImageUploadId) {
        if (!file) {
            state.pendingSavedItemImageUploadId = null;
            return;
        }

        try {
            const itemImageDataUrl = await readImageFileAsDataUrl(file);
            await saveSavedItemsState(state.savedItems.map(item =>
                item.id === state.pendingSavedItemImageUploadId
                    ? { ...item, itemImageDataUrl }
                    : item
            ));
            setImportStatus("Cart item image updated.");
        } catch (error) {
            window.alert(error.message || "Unable to read image.");
        } finally {
            state.pendingSavedItemImageUploadId = null;
            if (elements.savedItemImageInput) {
                elements.savedItemImageInput.value = "";
            }
        }
        return;
    }

    if (!file) {
        clearSavedItemImageSelection();
        return;
    }

    try {
        elements.savedItemCreateModal.dataset.itemImageDataUrl = await readImageFileAsDataUrl(file);
        syncSavedItemImageUI();
    } catch (error) {
        clearSavedItemImageSelection();
        window.alert(error.message || "Unable to read image.");
    }
}

function handleImageUploadTriggerClick(event) {
    const itemUploadTrigger = event.target.closest(".item-image-upload-btn");
    if (itemUploadTrigger) {
        const itemRow = itemUploadTrigger.closest(".item-row");
        const fileInput = itemRow?.querySelector(".item-image-input");
        if (fileInput) {
            event.preventDefault();
            fileInput.click();
        }
    }
}

function openSavedItemsModal() {
    renderSavedItemsList();
    syncSavedItemsTotal();
    setModalState(elements.savedItemsModal, true);
}

function closeSavedItemsModal() {
    setModalState(elements.savedItemsModal, false);
    closeSavedItemCreateModal();
}

function openSavedItemCreateModal() {
    if (!elements.savedItemCreateModal) {
        return;
    }
    state.editingSavedItemId = null;
    elements.savedItemDescriptionInput.value = "";
    elements.savedItemCreateModal.dataset.itemImageDataUrl = "";
    if (elements.savedItemImageInput) {
        elements.savedItemImageInput.value = "";
    }
    elements.savedItemQuantityInput.value = "1";
    elements.savedItemUnitPriceInput.value = "0";
    elements.savedItemTotalInput.value = "0";
    applyTranslations();
    syncSavedItemImageUI();
    setModalState(elements.savedItemCreateModal, true);
    elements.savedItemDescriptionInput.focus();
}

function openSavedItemEditModal(item) {
    if (!elements.savedItemCreateModal || !item) {
        return;
    }
    state.editingSavedItemId = item.id;
    elements.savedItemDescriptionInput.value = item.description || "";
    elements.savedItemCreateModal.dataset.itemImageDataUrl = item.itemImageDataUrl || "";
    if (elements.savedItemImageInput) {
        elements.savedItemImageInput.value = "";
    }
    elements.savedItemQuantityInput.value = formatAmount(item.quantity || 0);
    elements.savedItemUnitPriceInput.value = formatAmount(item.unitPrice || 0);
    elements.savedItemTotalInput.value = formatAmount(item.total || 0);
    applyTranslations();
    syncSavedItemImageUI();
    setModalState(elements.savedItemCreateModal, true);
    elements.savedItemDescriptionInput.focus();
}

function closeSavedItemCreateModal() {
    if (!elements.savedItemCreateModal) {
        return;
    }
    state.editingSavedItemId = null;
    elements.savedItemCreateModal.dataset.itemImageDataUrl = "";
    setModalState(elements.savedItemCreateModal, false);
}

function openSavedItemImageModal(imageUrl) {
    if (!elements.savedItemImageModal || !elements.savedItemImageModalImg || !imageUrl) {
        return;
    }

    elements.savedItemImageModalImg.src = imageUrl;
    elements.savedItemImageModal.classList.add("active");
    elements.savedItemImageModal.setAttribute("aria-hidden", "false");
}

function closeSavedItemImageModal() {
    if (!elements.savedItemImageModal || !elements.savedItemImageModalImg) {
        return;
    }

    elements.savedItemImageModal.classList.remove("active");
    elements.savedItemImageModal.setAttribute("aria-hidden", "true");
    elements.savedItemImageModalImg.removeAttribute("src");
}

function renderSavedItemsList() {
    if (!elements.savedItemsList) {
        return;
    }

    updateSavedItemsCountBadge();

    if (!state.savedItems.length) {
        elements.savedItemsList.innerHTML = `<p class="client-list-empty">${escapeHtml(t("no_saved_items"))}</p>`;
        return;
    }

    const sortedItems = [...state.savedItems].sort((left, right) => Date.parse(right.createdAt || 0) - Date.parse(left.createdAt || 0));
    const canUseInCurrentDocument = canInsertCartItemIntoEditor();
    elements.savedItemsList.innerHTML = sortedItems.map(item => `
        <article class="saved-item-card${state.highlightedSavedItemId === item.id ? " saved-item-card-highlighted" : ""}" data-saved-item-card="${escapeHtml(item.id)}">
            <div class="saved-item-card-layout">
                <div class="saved-item-thumb${item.itemImageDataUrl ? " is-clickable" : ""}" ${item.itemImageDataUrl ? `data-saved-item-action="preview-image" data-saved-item-id="${escapeHtml(item.id)}" role="button" tabindex="0" aria-label="Preview item image"` : 'aria-hidden="true"'}>
                    ${item.itemImageDataUrl
                        ? `<img src="${escapeHtml(item.itemImageDataUrl)}" alt="${escapeHtml(item.description)}">`
                        : `<div class="saved-item-thumb-placeholder">
                            <div class="saved-item-thumb-icon">
                                <svg viewBox="0 0 24 24" aria-hidden="true">
                                    <rect x="4.5" y="5" width="15" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/>
                                    <circle cx="9" cy="10" r="1.4" fill="currentColor"/>
                                    <path d="M6.8 16l3.6-3.5 2.5 2.2 2.4-2 1.9 3.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                            <span>No Image</span>
                        </div>`}
                </div>
                <div class="saved-item-card-main">
                    <div class="saved-item-card-top">
                        <strong>${escapeHtml(item.description)}</strong>
                        <span class="saved-item-card-date">${escapeHtml(formatDateTime(item.createdAt))}</span>
                    </div>
                    <p class="saved-item-card-copy">${escapeHtml(item.description)}</p>
                    <div class="saved-item-card-metrics">
                        <div class="saved-item-metric">
                            <span class="saved-item-metric-label">Qty</span>
                            <strong>${escapeHtml(formatAmount(item.quantity))}</strong>
                        </div>
                        <div class="saved-item-metric">
                            <span class="saved-item-metric-label">Price</span>
                            <strong>${escapeHtml(formatCurrency(item.unitPrice))}</strong>
                        </div>
                        <div class="saved-item-metric saved-item-metric-total">
                            <span class="saved-item-metric-label">Total</span>
                            <strong>${escapeHtml(formatCurrency(item.total))}</strong>
                        </div>
                    </div>
                </div>
            </div>
            <div class="client-row-actions saved-item-card-actions">
                <div class="saved-item-card-toolbar">
                    <button
                        class="saved-item-icon-action"
                        type="button"
                        data-saved-item-action="edit"
                        data-saved-item-id="${escapeHtml(item.id)}"
                        aria-label="${escapeHtml(t("edit"))}"
                        title="${escapeHtml(t("edit"))}"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7.2 16.8l1.1-3.6L15.7 5.8a1.4 1.4 0 0 1 2 0l.5.5a1.4 1.4 0 0 1 0 2l-7.4 7.4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                            <path d="M6.8 17.2l3.8-.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <button
                        class="saved-item-icon-action"
                        type="button"
                        data-saved-item-action="image"
                        data-saved-item-id="${escapeHtml(item.id)}"
                        aria-label="${escapeHtml(t("upload_item_image"))}"
                        title="${escapeHtml(t("upload_item_image"))}"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <rect x="4.5" y="5" width="15" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/>
                            <circle cx="9" cy="10" r="1.4" fill="currentColor"/>
                            <path d="M6.8 16l3.6-3.5 2.5 2.2 2.4-2 1.9 3.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="saved-item-card-cta-row">
                    ${canUseInCurrentDocument ? `<button class="btn btn-secondary" type="button" data-saved-item-action="use" data-saved-item-id="${escapeHtml(item.id)}">${escapeHtml(t("use_item"))}</button>` : ""}
                    <button class="btn btn-secondary" type="button" data-saved-item-action="delete" data-saved-item-id="${escapeHtml(item.id)}">${escapeHtml(t("delete"))}</button>
                </div>
            </div>
        </article>
    `).join("");

    if (state.highlightedSavedItemId) {
        const highlightedCard = elements.savedItemsList.querySelector(`[data-saved-item-card="${CSS.escape(state.highlightedSavedItemId)}"]`);
        if (highlightedCard) {
            highlightedCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
            window.setTimeout(() => {
                state.highlightedSavedItemId = null;
                highlightedCard.classList.remove("saved-item-card-highlighted");
            }, 2200);
        }
    }
}

function createSavedItem(payload) {
    const quantity = Number.parseFloat(payload.quantity) || 0;
    const unitPrice = Number.parseFloat(payload.unitPrice) || 0;
    const total = Number.parseFloat(payload.total) || (quantity * unitPrice);

    return {
        id: `saved-item-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        description: String(payload.description || "").trim(),
        quantity,
        unitPrice,
        total,
        itemImageDataUrl: typeof payload.itemImageDataUrl === "string" ? payload.itemImageDataUrl : "",
        createdAt: new Date().toISOString()
    };
}

async function addSavedItem(item) {
    const nextItem = createSavedItem(item);
    await saveSavedItemsState([nextItem, ...state.savedItems]);
    return nextItem;
}

async function addSavedItemFromModal() {
    const isEditingSavedItem = Boolean(state.editingSavedItemId);
    const description = elements.savedItemDescriptionInput.value.trim();
    const quantity = Number.parseFloat(elements.savedItemQuantityInput.value) || 0;
    const unitPrice = Number.parseFloat(elements.savedItemUnitPriceInput.value) || 0;
    const total = Number.parseFloat(elements.savedItemTotalInput.value) || (quantity * unitPrice);
    const itemImageDataUrl = elements.savedItemCreateModal?.dataset?.itemImageDataUrl || "";

    if (!description) {
        window.alert("Enter an item description before adding it to the cart.");
        return;
    }

    if (state.editingSavedItemId) {
        const editedId = state.editingSavedItemId;
        await saveSavedItemsState(state.savedItems.map(item =>
            item.id === state.editingSavedItemId
                ? {
                    ...item,
                    description,
                    quantity,
                    unitPrice,
                    total,
                    itemImageDataUrl
                }
                : item
        ));
        state.highlightedSavedItemId = editedId;
    } else {
        const savedItem = await addSavedItem({ description, quantity, unitPrice, total, itemImageDataUrl });
        state.highlightedSavedItemId = savedItem.id;
    }
    elements.savedItemDescriptionInput.value = "";
    elements.savedItemQuantityInput.value = "1";
    elements.savedItemUnitPriceInput.value = "0";
    elements.savedItemTotalInput.value = "0";
    clearSavedItemImageSelection();
    closeSavedItemCreateModal();
    openSavedItemsModal();
    setImportStatus(isEditingSavedItem ? t("saved_item_updated") : t("saved_item_added"));
}

async function removeSavedItem(itemId) {
    await saveSavedItemsState(state.savedItems.filter(item => item.id !== itemId));
}

function canInsertCartItemIntoEditor() {
    return Boolean(elements.documentModal?.classList.contains("active"));
}

function addSavedItemToEditor(item) {
    if (!canInsertCartItemIntoEditor()) {
        return false;
    }

    addItem();
    const lastItem = elements.itemsContainer.querySelector(".item-row:last-child");
    if (!lastItem) {
        return false;
    }

    lastItem.querySelector(".item-description").value = item.description;
    lastItem.querySelector(".item-quantity").value = formatAmount(item.quantity);
    lastItem.querySelector(".item-unit-price").value = formatAmount(item.unitPrice);
    lastItem.querySelector(".item-total-price").value = formatAmount(item.total);
    lastItem.dataset.priceDriver = "unit";
    lastItem.dataset.itemImageDataUrl = item.itemImageDataUrl || "";
    updateItemPricing(lastItem);
    syncItemImageUI(lastItem);
    updateItemSummary(lastItem);
    setExpandedItem(lastItem);
    updateEditorSummary();
    return true;
}

async function handleSavedItemsListClick(event) {
    const button = event.target.closest("[data-saved-item-action]");
    if (!button) {
        return;
    }

    const item = state.savedItems.find(entry => entry.id === button.dataset.savedItemId);
    if (!item) {
        return;
    }

    if (button.dataset.savedItemAction === "edit") {
        openSavedItemEditModal(item);
        return;
    }

    if (button.dataset.savedItemAction === "image") {
        state.pendingSavedItemImageUploadId = item.id;
        if (elements.savedItemImageInput) {
            elements.savedItemImageInput.value = "";
            elements.savedItemImageInput.click();
        }
        return;
    }

    if (button.dataset.savedItemAction === "preview-image") {
        if (item.itemImageDataUrl) {
            openSavedItemImageModal(item.itemImageDataUrl);
        }
        return;
    }

    if (button.dataset.savedItemAction === "use") {
        if (!canInsertCartItemIntoEditor()) {
            setImportStatus("Open a quote or invoice first, then add cart items into that document.", true);
            window.alert("Open a quote or invoice first, then add cart items into that document.");
            return;
        }

        const wasInserted = addSavedItemToEditor(item);
        if (!wasInserted) {
            setImportStatus("Unable to add that cart item into the current document.", true);
            window.alert("Unable to add that cart item into the current document.");
            return;
        }

        await removeSavedItem(item.id);
        setImportStatus(t("saved_item_used"));
        closeSavedItemsModal();
        return;
    }

    if (button.dataset.savedItemAction === "delete") {
        if (!window.confirm(`Delete saved item "${item.description}"?`)) {
            return;
        }
        await removeSavedItem(item.id);
    }
}

function handleSavedItemsListKeydown(event) {
    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    const previewTarget = event.target.closest('[data-saved-item-action="preview-image"]');
    if (!previewTarget) {
        return;
    }

    event.preventDefault();
    previewTarget.click();
}

function openAboutModal() {
    setModalState(elements.aboutModal, true);
}

function closeAboutModal() {
    setModalState(elements.aboutModal, false);
}

function toggleHelpMenu() {
    const isHidden = elements.footerHelpMenu.hidden;
    elements.footerHelpMenu.hidden = !isHidden;
    elements.footerHelpBtn.setAttribute("aria-expanded", String(isHidden));
}

function closeHelpMenu() {
    if (!elements.footerHelpMenu) return;
    elements.footerHelpMenu.hidden = true;
    elements.footerHelpBtn?.setAttribute("aria-expanded", "false");
}

function handleHelpMenuOutsideClick(event) {
    if (elements.footerHelpWrap && !elements.footerHelpWrap.contains(event.target)) {
        closeHelpMenu();
    }
}

function openHelpModal(sectionId) {
    closeHelpMenu();
    setModalState(elements.helpModal, true);
    if (elements.helpSearch) {
        elements.helpSearch.value = "";
        elements.helpModal.querySelectorAll(".help-item, .help-section").forEach(el => { el.hidden = false; });
        if (elements.helpNoResults) elements.helpNoResults.classList.remove("visible");
    }
    if (sectionId) {
        const target = document.getElementById(`help-section-${sectionId}`);
        if (target) {
            requestAnimationFrame(() => target.scrollIntoView({ behavior: "smooth", block: "start" }));
        }
    }
}

function closeHelpModal() {
    setModalState(elements.helpModal, false);
}

function initHelpSearch() {
    const input = elements.helpSearch;
    if (!input) return;
    input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        const sections = elements.helpModal.querySelectorAll(".help-section");
        let anyVisible = false;
        sections.forEach(section => {
            const items = section.querySelectorAll(".help-item");
            let sectionVisible = false;
            items.forEach(item => {
                const matches = !query || item.textContent.toLowerCase().includes(query);
                item.hidden = !matches;
                if (matches) { sectionVisible = true; anyVisible = true; }
            });
            section.hidden = !sectionVisible;
        });
        if (elements.helpNoResults) {
            elements.helpNoResults.classList.toggle("visible", !anyVisible && query.length > 0);
        }
    });
}

function initHelpIndex() {
    if (!elements.helpModal) return;
    elements.helpModal.querySelectorAll(".help-index-link").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const target = document.getElementById(link.getAttribute("href").slice(1));
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

function updateHelpTranslations() {
    if (!elements.helpModal) return;
    if (elements.helpSearch) {
        elements.helpSearch.placeholder = t("help_search_placeholder");
    }
    elements.helpModal.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        const val = t(key);
        if (val) el.textContent = val;
    });
    elements.helpModal.querySelectorAll("[data-i18n-html]").forEach(el => {
        const key = el.getAttribute("data-i18n-html");
        const val = t(key);
        if (val) el.innerHTML = val;
    });
}

function handleHelpMenuItemClick(event) {
    const item = event.target.closest(".footer-help-menu-item");
    if (!item) return;
    openHelpModal(item.dataset.helpSection || null);
}

function getManagedUserLabel(userId) {
    if (!userId) {
        return "Direct account";
    }
    const parent = state.userAccounts.find(entry => entry.id === userId);
    return parent ? `Sub-account of ${parent.displayName}` : "Direct account";
}

function syncAccountAdminParentOptions() {
    if (!elements.accountAdminParentSelect) {
        return;
    }

    const currentEditingId = state.editingManagedUserId;
    const options = ['<option value="">Direct account for SantoSync</option>']
        .concat(state.userAccounts
            .filter(user => user.id !== currentEditingId && user.role !== "owner")
            .map(user => `<option value="${escapeHtml(user.id)}">${escapeHtml(user.displayName)}${user.email ? ` • ${escapeHtml(user.email)}` : ""}</option>`));
    elements.accountAdminParentSelect.innerHTML = options.join("");
}

function resetAccountAdminForm() {
    state.editingManagedUserId = null;
    if (!elements.accountAdminDisplayNameInput) {
        return;
    }

    elements.accountAdminFormTitle.textContent = "Add Workspace Account";
    elements.accountAdminDisplayNameInput.value = "";
    elements.accountAdminUsernameInput.value = "";
    elements.accountAdminEmailInput.value = "";
    elements.accountAdminPasswordInput.value = "";
    elements.accountAdminRoleSelect.value = "user";
    elements.accountAdminAccessLevelSelect.value = "workspace";
    syncAccountAdminParentOptions();
    elements.accountAdminParentSelect.value = "";
    elements.accountAdminCancelEditBtn.hidden = true;
}

function syncBrandAssetPreviews() {
    const signatureUrl = state.companyProfile?.signatureDataUrl || "";
    const stampUrl = state.companyProfile?.stampDataUrl || "";

    if (elements.accountSignaturePreview && elements.accountSignatureFallback) {
        elements.accountSignaturePreview.hidden = !signatureUrl;
        elements.accountSignatureFallback.hidden = Boolean(signatureUrl);
        if (signatureUrl) {
            elements.accountSignaturePreview.src = signatureUrl;
        } else {
            elements.accountSignaturePreview.removeAttribute("src");
        }
    }

    if (elements.accountStampPreview && elements.accountStampFallback) {
        elements.accountStampPreview.hidden = !stampUrl;
        elements.accountStampFallback.hidden = Boolean(stampUrl);
        if (stampUrl) {
            elements.accountStampPreview.src = stampUrl;
        } else {
            elements.accountStampPreview.removeAttribute("src");
        }
    }
}

function renderAccountAdminPage() {
    if (!elements.accountAdminPage) {
        return;
    }

    if (!isOwnerSession()) {
        elements.accountAdminPage.hidden = true;
        return;
    }

    const managedUsers = state.userAccounts.filter(user => user.role !== "owner");
    const subaccountCount = managedUsers.filter(user => user.parentUserId).length;
    const recentSessions = state.sessionLogs.slice(0, 8);
    const recentActivities = state.activityLogs.slice(0, 10);

    elements.accountAdminOwnerName.textContent = state.currentUser?.displayName || "SantoSync Owner";
    elements.accountAdminOwnerMeta.textContent = state.currentUser?.email || DEFAULT_OWNER_USER.email;
    elements.accountAdminOwnerBadge.textContent = "Owner";
    elements.accountUserCountStat.textContent = String(managedUsers.length);
    elements.accountSubaccountCountStat.textContent = String(subaccountCount);
    elements.accountSessionCountStat.textContent = String(recentSessions.length);
    elements.accountActivityCountStat.textContent = String(recentActivities.length);

    const sortedUsers = [...managedUsers].sort((left, right) => {
        if (Boolean(left.parentUserId) !== Boolean(right.parentUserId)) {
            return left.parentUserId ? 1 : -1;
        }
        return left.displayName.localeCompare(right.displayName);
    });

    elements.accountAdminUserList.innerHTML = sortedUsers.length
        ? sortedUsers.map(user => `
            <article class="account-admin-user-card${user.parentUserId ? " subaccount" : ""}">
                <div class="account-admin-user-copy">
                    <strong>${escapeHtml(user.displayName)}</strong>
                    <span class="account-admin-user-meta">@${escapeHtml(user.username)}${user.email ? ` • ${escapeHtml(user.email)}` : ""}</span>
                    <div class="account-admin-user-tags">
                        <span class="account-admin-user-tag">${escapeHtml(user.role === "admin" ? "Admin" : "User")}</span>
                        <span class="account-admin-user-tag">${escapeHtml(user.accessLevel || "workspace")}</span>
                        <span class="account-admin-user-tag">${escapeHtml(getManagedUserLabel(user.parentUserId))}</span>
                        ${user.lastLoginAt ? `<span class="account-admin-user-tag">Last login ${escapeHtml(formatDateTime(user.lastLoginAt))}</span>` : ""}
                    </div>
                </div>
                <div class="account-admin-user-actions">
                    <button class="btn btn-secondary" type="button" data-account-action="edit" data-user-id="${escapeHtml(user.id)}">Edit</button>
                    <button class="btn btn-secondary" type="button" data-account-action="reset-password" data-user-id="${escapeHtml(user.id)}">Reset Password</button>
                    <button class="btn btn-secondary" type="button" data-account-action="delete" data-user-id="${escapeHtml(user.id)}"${user.username === "admin" ? " disabled" : ""}>Delete</button>
                </div>
            </article>
        `).join("")
        : `<p class="user-list-empty">No registered accounts yet.</p>`;

    elements.accountSessionLogList.innerHTML = recentSessions.length
        ? recentSessions.map(log => `
            <article class="account-admin-feed-card">
                <strong>${escapeHtml(log.displayName)}</strong>
                <span class="account-admin-feed-meta">${escapeHtml(log.username)} • ${escapeHtml(log.status === "open" ? "Active session" : "Closed session")}</span>
                <span class="account-admin-feed-meta">Started ${escapeHtml(formatDateTime(log.startedAt))}${log.endedAt ? ` • Ended ${escapeHtml(formatDateTime(log.endedAt))}` : ""}</span>
                ${log.reason ? `<span class="account-admin-feed-meta">${escapeHtml(log.reason)}</span>` : ""}
            </article>
        `).join("")
        : `<p class="user-list-empty">No login sessions recorded yet.</p>`;

    elements.accountActivityLogList.innerHTML = recentActivities.length
        ? recentActivities.map(log => `
            <article class="account-admin-feed-card">
                <strong>${escapeHtml(log.action)}</strong>
                <span class="account-admin-feed-meta">${escapeHtml(log.displayName)} • ${escapeHtml(formatDateTime(log.createdAt))}</span>
                <span class="account-admin-feed-meta">${escapeHtml(log.details || "")}</span>
            </article>
        `).join("")
        : `<p class="user-list-empty">No workspace activity recorded yet.</p>`;

    syncAccountAdminParentOptions();
    syncBrandAssetPreviews();
}

async function handleAccountAdminSaveUser() {
    if (!isOwnerSession()) {
        setImportStatus("Only the owner account can manage registered accounts.", true);
        return;
    }

    const displayName = elements.accountAdminDisplayNameInput.value.trim();
    const username = elements.accountAdminUsernameInput.value.trim().toLowerCase();
    const email = elements.accountAdminEmailInput.value.trim().toLowerCase();
    const password = elements.accountAdminPasswordInput.value.trim();
    const role = elements.accountAdminRoleSelect.value === "admin" ? "admin" : "user";
    const accessLevel = elements.accountAdminAccessLevelSelect.value;
    const parentUserId = elements.accountAdminParentSelect.value;

    if (!displayName || !username || !email || !password) {
        window.alert("Enter a display name, username, email, and password before saving this account.");
        return;
    }

    const duplicateUser = state.userAccounts.find(user =>
        user.id !== state.editingManagedUserId && (user.username === username || user.email === email)
    );
    if (duplicateUser) {
        window.alert("That username or email is already in use.");
        return;
    }

    const nextUsers = state.editingManagedUserId
        ? state.userAccounts.map(user => user.id === state.editingManagedUserId
            ? { ...user, displayName, username, email, password, role, accessLevel, parentUserId }
            : user)
        : [
            ...state.userAccounts,
            {
                id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                displayName,
                username,
                email,
                password,
                role,
                accessLevel,
                parentUserId
            }
        ];

    await saveUserAccounts(nextUsers);
    recordActivity(state.editingManagedUserId ? "updated account" : "created account", `${displayName} was ${state.editingManagedUserId ? "updated" : "added"} in Account Admin.`);
    resetAccountAdminForm();
    setImportStatus(`${displayName} saved to SantoSync account management.`);
}

async function handleAccountAdminUserListClick(event) {
    const button = event.target.closest("[data-account-action]");
    if (!button || !isOwnerSession()) {
        return;
    }

    const userId = button.dataset.userId;
    const action = button.dataset.accountAction;
    const user = state.userAccounts.find(entry => entry.id === userId);
    if (!user) {
        return;
    }

    if (action === "edit") {
        state.editingManagedUserId = user.id;
        elements.accountAdminFormTitle.textContent = `Edit ${user.displayName}`;
        elements.accountAdminDisplayNameInput.value = user.displayName;
        elements.accountAdminUsernameInput.value = user.username;
        elements.accountAdminEmailInput.value = user.email || "";
        elements.accountAdminPasswordInput.value = user.password;
        elements.accountAdminRoleSelect.value = user.role === "admin" ? "admin" : "user";
        elements.accountAdminAccessLevelSelect.value = user.accessLevel || "workspace";
        syncAccountAdminParentOptions();
        elements.accountAdminParentSelect.value = user.parentUserId || "";
        elements.accountAdminCancelEditBtn.hidden = false;
        return;
    }

    if (action === "reset-password") {
        const nextPassword = window.prompt(`Enter a new password for ${user.displayName}:`, user.password || "");
        if (!nextPassword) {
            return;
        }

        await saveUserAccounts(state.userAccounts.map(entry =>
            entry.id === user.id ? { ...entry, password: nextPassword.trim() || entry.password } : entry
        ));
        recordActivity("reset password", `Reset the password for ${user.displayName}.`);
        setImportStatus(`Password reset for ${user.displayName}.`);
        return;
    }

    if (action === "delete") {
        if (!window.confirm(`Remove ${user.displayName} from SantoSync account management?`)) {
            return;
        }

        await saveUserAccounts(state.userAccounts.filter(entry => entry.id !== user.id && entry.parentUserId !== user.id));
        recordActivity("deleted account", `Removed ${user.displayName} and any direct sub-accounts.`);
        resetAccountAdminForm();
        setImportStatus(`Removed ${user.displayName} from SantoSync.`);
    }
}

async function handleBrandAssetSelection(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file) {
        return;
    }

    try {
        const dataUrl = await readFileAsDataUrl(file);
        if (input === elements.accountSignatureInput) {
            state.companyProfile = normalizeCompanyProfile({
                ...state.companyProfile,
                signatureDataUrl: dataUrl
            });
        }
        if (input === elements.accountStampInput) {
            state.companyProfile = normalizeCompanyProfile({
                ...state.companyProfile,
                stampDataUrl: dataUrl
            });
        }
        syncBrandAssetPreviews();
    } catch (error) {
        window.alert(error.message || "Unable to read image.");
    }
}

function clearBrandAsset(type) {
    state.companyProfile = normalizeCompanyProfile({
        ...state.companyProfile,
        signatureDataUrl: type === "signature" ? "" : state.companyProfile?.signatureDataUrl,
        stampDataUrl: type === "stamp" ? "" : state.companyProfile?.stampDataUrl
    });
    if (type === "signature" && elements.accountSignatureInput) {
        elements.accountSignatureInput.value = "";
    }
    if (type === "stamp" && elements.accountStampInput) {
        elements.accountStampInput.value = "";
    }
    syncBrandAssetPreviews();
}

async function saveBrandAssets() {
    if (!isOwnerSession()) {
        return;
    }

    await saveCompanyProfileState(state.companyProfile);
    recordActivity("updated branding assets", "Changed the signature or stamp used for generated documents.");
    generatePreviews();
    setImportStatus("Branding assets saved for document generation.");
}

function renderUserManagementList() {
    if (!elements.userManagementList) {
        return;
    }

    if (!isAdminSession()) {
        elements.userManagementList.innerHTML = "";
        return;
    }

    const manageableUsers = state.userAccounts.filter(user => user.role !== "owner");

    if (!manageableUsers.length) {
        elements.userManagementList.innerHTML = `<p class="user-list-empty">${escapeHtml(t("no_users"))}</p>`;
        return;
    }

    elements.userManagementList.innerHTML = manageableUsers.map(user => {
        const isCurrentUser = state.currentUser?.userId === user.id;
        const isOnlyAdmin = user.role === "admin" && manageableUsers.filter(entry => entry.role === "admin").length === 1;
        return `
            <article class="user-row">
                <div class="user-row-copy">
                    <strong>${escapeHtml(user.displayName)}</strong>
                    <span>@${escapeHtml(user.username)} · ${escapeHtml(user.role === "admin" ? t("role_admin") : t("role_user"))}${isCurrentUser ? ` · ${escapeHtml(t("current_session"))}` : ""}</span>
                </div>
                <div class="user-row-actions">
                    <button class="btn btn-secondary" type="button" data-user-action="reset-password" data-user-id="${escapeHtml(user.id)}">${escapeHtml(t("reset_password"))}</button>
                    <button class="btn btn-secondary" type="button" data-user-action="delete-user" data-user-id="${escapeHtml(user.id)}"${isCurrentUser || isOnlyAdmin ? " disabled" : ""}>${escapeHtml(t("delete"))}</button>
                </div>
            </article>
        `;
    }).join("");
}

function renderClientManagementList() {
    if (!elements.clientManagementList) {
        return;
    }

    if (!state.clients.length) {
        elements.clientManagementList.innerHTML = `<p class="client-list-empty">${escapeHtml(t("no_clients"))}</p>`;
        return;
    }

    elements.clientManagementList.innerHTML = state.clients.map(client => `
        <article class="client-row">
            <div class="client-row-copy">
                <strong>${escapeHtml(client.name)}</strong>
                <span>${escapeHtml(client.address || "No address saved")}</span>
                ${client.consigneeName || client.consigneeAddress
                    ? `<span class="client-row-consignee"><svg viewBox="0 0 16 16" aria-hidden="true" fill="none"><path d="M8 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm-5 10c0-2.2 2.24-4 5-4s5 1.8 5 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>${escapeHtml(client.consigneeName || "Consignee")}</span>`
                    : ""}
            </div>
            ${isAdminSession()
                ? `<div class="client-row-actions">
                    <button class="statement-action-btn is-edit" type="button" data-client-action="edit-client" data-client-id="${escapeHtml(client.id)}" aria-label="${escapeHtml(t("edit"))}" title="${escapeHtml(t("edit"))}">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4.2-1 9.1-9.1a1.9 1.9 0 0 0 0-2.7l-.5-.5a1.9 1.9 0 0 0-2.7 0L5 15.8 4 20Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="m13.5 7.5 3 3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
                    </button>
                    <button class="statement-action-btn is-delete" type="button" data-client-action="delete-client" data-client-id="${escapeHtml(client.id)}" aria-label="${escapeHtml(t("delete"))}" title="${escapeHtml(t("delete"))}">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M9 4h6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M7 7l1 12h8l1-12" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 11v5M14 11v5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
                    </button>
                </div>`
                : ""}
        </article>
    `).join("");
}

async function handleAddUser() {
    if (!isAdminSession()) {
        setImportStatus("Only admin accounts can manage users.", true);
        return;
    }

    const displayName = elements.newUserDisplayName.value.trim();
    const username = elements.newUserUsername.value.trim().toLowerCase();
    const password = elements.newUserPassword.value.trim();
    const role = elements.newUserRole.value === "admin" ? "admin" : "user";

    if (!displayName || !username || !password) {
        alert("Enter a display name, username, and password before adding a user.");
        return;
    }

    if (!/^[a-z0-9._-]+$/.test(username)) {
        alert("Usernames can include letters, numbers, periods, underscores, and hyphens only.");
        return;
    }

    if (state.userAccounts.some(user => user.username === username)) {
        alert("That username already exists. Choose another one.");
        return;
    }

    await saveUserAccounts([
        ...state.userAccounts,
        {
            id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            displayName,
            username,
            password,
            role
        }
    ]);
    recordActivity("created user", `Added ${displayName} from the workspace tools.`);

    elements.newUserDisplayName.value = "";
    elements.newUserUsername.value = "";
    elements.newUserPassword.value = "";
    elements.newUserRole.value = "user";
    setImportStatus(`Added ${displayName} as a ${role}.`);
}

async function handleUserManagementClick(event) {
    const button = event.target.closest("[data-user-action]");
    if (!button || !isAdminSession()) {
        return;
    }

    const userId = button.dataset.userId;
    const action = button.dataset.userAction;
    const user = state.userAccounts.find(entry => entry.id === userId);
    if (!user || user.role === "owner") {
        return;
    }

    if (action === "reset-password") {
        const nextPassword = window.prompt(`Enter a new password for ${user.displayName}:`, "");
        if (!nextPassword) {
            return;
        }

        await saveUserAccounts(state.userAccounts.map(entry =>
            entry.id === user.id ? { ...entry, password: nextPassword.trim() || entry.password } : entry
        ));
        recordActivity("reset password", `Reset the password for ${user.displayName}.`);
        setImportStatus(`Password reset for ${user.displayName}.`);
        return;
    }

    if (action === "delete-user") {
        if (state.currentUser?.userId === user.id) {
            alert("You cannot delete the account currently signed in.");
            return;
        }

        const adminCount = state.userAccounts.filter(entry => entry.role === "admin").length;
        if (user.role === "admin" && adminCount <= 1) {
            alert("Keep at least one admin account in the workspace.");
            return;
        }

        if (!window.confirm(`Remove ${user.displayName} from the shared workspace user list?`)) {
            return;
        }

        await saveUserAccounts(state.userAccounts.filter(entry => entry.id !== user.id));
        recordActivity("deleted user", `Removed ${user.displayName} from the workspace user list.`);
        setImportStatus(`Removed ${user.displayName} from workspace access.`);
    }
}

async function handleClientManagementClick(event) {
    const button = event.target.closest("[data-client-action]");
    if (!button || !isAdminSession()) {
        return;
    }

    const clientId = button.dataset.clientId;
    const action = button.dataset.clientAction;
    const client = state.clients.find(entry => isSameDocumentId(entry.id, clientId));
    if (!client) {
        return;
    }

    if (action === "edit-client") {
        const nextName = window.prompt("Update client name:", client.name);
        if (nextName === null) {
            return;
        }

        const trimmedName = nextName.trim();
        if (!trimmedName) {
            alert("Client name cannot be empty.");
            return;
        }

        const nextAddress = window.prompt("Update client address:", client.address || "");
        if (nextAddress === null) {
            return;
        }

        const trimmedAddress = nextAddress.trim();
        if (!trimmedAddress) {
            alert("Client address cannot be empty.");
            return;
        }

        const nextConsigneeName = window.prompt("Update consignee name:", client.consigneeName || "");
        if (nextConsigneeName === null) {
            return;
        }

        const nextConsigneeAddress = window.prompt("Update consignee address:", client.consigneeAddress || "");
        if (nextConsigneeAddress === null) {
            return;
        }

        const duplicateClient = state.clients.find(entry =>
            !isSameDocumentId(entry.id, client.id) && entry.name.toLowerCase() === trimmedName.toLowerCase()
        );
        if (duplicateClient) {
            alert("Another saved client already uses that name.");
            return;
        }

        try {
            await saveClientsToServer(state.clients.map(entry =>
                isSameDocumentId(entry.id, client.id)
                    ? {
                        ...entry,
                        name: trimmedName,
                        address: trimmedAddress,
                        consigneeName: nextConsigneeName.trim(),
                        consigneeAddress: nextConsigneeAddress.trim()
                    }
                    : entry
            ));
        } catch (error) {
            alert(`Unable to update this client.\n\n${error.message}`);
            return;
        }

        renderClientOptions();
        renderClientManagementList();
        setImportStatus(`Updated saved client ${trimmedName}.`);
        return;
    }

    if (action === "delete-client") {
        if (!window.confirm(`Delete saved client "${client.name}"?`)) {
            return;
        }

        try {
            await saveClientsToServer(state.clients.filter(entry => !isSameDocumentId(entry.id, client.id)));
        } catch (error) {
            alert(`Unable to delete this client.\n\n${error.message}`);
            return;
        }

        renderClientOptions();
        renderClientManagementList();
        if (elements.clientSelect.value === client.id) {
            elements.clientSelect.value = "";
        }
        setImportStatus(`Deleted saved client ${client.name}.`);
    }
}

function openExportModal() {
    if (!isAdminSession()) {
        setImportStatus("Only admin accounts can export JSON files.", true);
        return;
    }

    closeDataToolsModal();
    closeSettingsModal();
    renderExportSelectionList();
    setModalState(elements.exportModal, true);
}

function closeExportModal() {
    setModalState(elements.exportModal, false);
}

function updateInboxBadge() {
    const openCount = isAdminSession() ? state.issueReports.filter(report => report.status !== "closed").length : 0;
    if (!elements.inboxCountBadge) {
        return;
    }
    elements.inboxCountBadge.hidden = openCount === 0;
    elements.inboxCountBadge.textContent = openCount > 99 ? "99+" : String(openCount);
}

function renderIssueInbox() {
    if (!elements.issueInboxList) {
        return;
    }

    if (!isAdminSession()) {
        elements.issueInboxList.innerHTML = "";
        return;
    }

    if (!state.issueReports.length) {
        elements.issueInboxList.innerHTML = `<p class="export-empty">${escapeHtml(t("no_issue_reports"))}</p>`;
        return;
    }

    const reports = [...state.issueReports].sort((left, right) => Date.parse(right.createdAt || 0) - Date.parse(left.createdAt || 0));
    elements.issueInboxList.innerHTML = reports.map(report => `
        <article class="issue-card${report.unread ? " issue-card-unread" : ""}${report.status === "closed" ? " issue-card-closed" : ""}" data-issue-id="${escapeHtml(report.id)}">
            <div class="issue-card-header">
                <div class="issue-card-header-copy">
                    <strong>${escapeHtml(report.subject)}</strong>
                    <span>${escapeHtml(t("submitted_by"))} ${escapeHtml(report.createdBy.displayName || report.createdBy.username || "Unknown")} · ${escapeHtml(formatDateTime(report.createdAt))}</span>
                </div>
                <div class="issue-card-status-wrap">
                    <span class="issue-status-pill issue-status-pill-${report.status}">${escapeHtml(report.status === "closed" ? t("issue_closed") : t("issue_open"))}</span>
                    ${report.unread ? `<span class="issue-fresh-pill">${escapeHtml(t("new_report"))}</span>` : ""}
                </div>
            </div>
            ${report.status === "closed"
                ? `<div class="issue-card-collapsed-copy">${escapeHtml(report.adminNotes || report.details).replace(/\n/g, "<br>")}</div>`
                : `<p>${escapeHtml(report.details).replace(/\n/g, "<br>")}</p>
            ${report.screenshotDataUrl
                ? `<a class="issue-screenshot-link" href="${escapeHtml(report.screenshotDataUrl)}" target="_blank" rel="noreferrer">
                    <span>${escapeHtml(t("screenshot"))}</span>
                    <img src="${escapeHtml(report.screenshotDataUrl)}" alt="${escapeHtml(report.screenshotName || t("screenshot"))}">
                </a>`
                : ""}
            <div class="issue-notes-block">
                <label class="issue-notes-label" for="issueNotes-${escapeHtml(report.id)}">${escapeHtml(t("issue_admin_notes"))}</label>
                <textarea class="issue-notes-input" id="issueNotes-${escapeHtml(report.id)}" data-issue-notes="${escapeHtml(report.id)}" placeholder="${escapeHtml(t("issue_admin_notes_placeholder"))}" rows="3">${escapeHtml(report.adminNotes || "")}</textarea>
            </div>`}
            <div class="issue-card-actions">
                ${report.status === "closed" ? "" : `<button class="issue-action-btn" type="button" data-issue-action="save-notes" data-issue-id="${escapeHtml(report.id)}">${escapeHtml(t("save_notes"))}</button>`}
                <button class="issue-action-btn issue-action-btn-secondary" type="button" data-issue-action="${report.status === "closed" ? "reopen" : "close"}" data-issue-id="${escapeHtml(report.id)}">${escapeHtml(report.status === "closed" ? t("reopen_report") : t("close_report"))}</button>
                <button class="issue-action-btn issue-action-btn-danger" type="button" data-issue-action="delete" data-issue-id="${escapeHtml(report.id)}">${escapeHtml(t("delete_report"))}</button>
            </div>
        </article>
    `).join("");
}

async function handleIssueInboxClick(event) {
    const button = event.target.closest("[data-issue-action]");
    if (!button || !isAdminSession()) {
        return;
    }

    const issueId = button.dataset.issueId;
    const action = button.dataset.issueAction;

    if (!issueId || !action) {
        return;
    }

    if (action === "save-notes") {
        const issueCard = button.closest("[data-issue-id]");
        const notesInput = issueCard?.querySelector("[data-issue-notes]");
        const adminNotes = notesInput ? notesInput.value.trim() : "";
        await saveIssueReports(state.issueReports.map(report => (
            report.id === issueId ? { ...report, adminNotes, unread: false } : report
        )));
        window.alert(t("issue_notes_saved"));
        return;
    }

    if (action === "close" || action === "reopen") {
        await saveIssueReports(state.issueReports.map(report => (
            report.id === issueId
                ? { ...report, status: action === "close" ? "closed" : "open", unread: false }
                : report
        )));
        return;
    }

    if (action !== "delete") {
        return;
    }

    if (!window.confirm(t("report_delete_confirm"))) {
        return;
    }

    await saveIssueReports(state.issueReports.filter(report => report.id !== issueId));
}

function handleIssueScreenshotChange() {
    elements.issueReportStatus.hidden = true;
}

async function submitIssueReport() {
    const subject = elements.issueSummaryInput.value.trim();
    const details = elements.issueDetailsInput.value.trim();
    const screenshotFile = elements.issueScreenshotInput.files?.[0] || null;

    if (!subject || !details) {
        elements.issueReportStatus.hidden = false;
        elements.issueReportStatus.textContent = t("report_required_error");
        elements.issueReportStatus.classList.add("hero-helper-error");
        return;
    }

    let screenshotDataUrl = "";
    if (screenshotFile) {
        try {
            screenshotDataUrl = await readFileAsDataUrl(screenshotFile);
        } catch (error) {
            elements.issueReportStatus.hidden = false;
            elements.issueReportStatus.textContent = error.message;
            elements.issueReportStatus.classList.add("hero-helper-error");
            return;
        }
    }

    await saveIssueReports([
        {
            id: `issue-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            subject,
            details,
            screenshotName: screenshotFile?.name || "",
            screenshotDataUrl,
            createdAt: new Date().toISOString(),
            unread: true,
            status: "open",
            adminNotes: "",
            createdBy: {
                userId: state.currentUser?.userId || "",
                username: state.currentUser?.username || "",
                displayName: state.currentUser?.displayName || state.currentUser?.username || "Unknown"
            }
        },
        ...state.issueReports
    ]);

    elements.issueSummaryInput.value = "";
    elements.issueDetailsInput.value = "";
    elements.issueScreenshotInput.value = "";
    closeIssueReportModal();
    window.alert(t("report_submitted_success"));
}

function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
        reader.onerror = () => reject(new Error("Unable to read screenshot."));
        reader.readAsDataURL(file);
    });
}

function readImageFileAsDataUrl(file, { maxDimension = 1200, quality = 0.82 } = {}) {
    if (!file || !String(file.type || "").startsWith("image/")) {
        return readFileAsDataUrl(file);
    }

    return new Promise((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => {
            try {
                const longestSide = Math.max(image.naturalWidth || 0, image.naturalHeight || 0);
                const scale = longestSide > maxDimension ? maxDimension / longestSide : 1;
                const width = Math.max(1, Math.round((image.naturalWidth || 1) * scale));
                const height = Math.max(1, Math.round((image.naturalHeight || 1) * scale));
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const context = canvas.getContext("2d");

                if (!context) {
                    URL.revokeObjectURL(objectUrl);
                    readFileAsDataUrl(file).then(resolve).catch(reject);
                    return;
                }

                context.drawImage(image, 0, 0, width, height);
                const normalizedType = file.type === "image/png" ? "image/png" : "image/jpeg";
                const result = canvas.toDataURL(normalizedType, normalizedType === "image/png" ? undefined : quality);
                URL.revokeObjectURL(objectUrl);
                resolve(result);
            } catch (error) {
                URL.revokeObjectURL(objectUrl);
                reject(new Error("Unable to process image."));
            }
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Unable to read image."));
        };

        image.src = objectUrl;
    });
}

function formatDateTime(value) {
    const parsed = Date.parse(value);
    if (Number.isNaN(parsed)) {
        return t("no_date");
    }

    return new Intl.DateTimeFormat(getCurrentLocale(), {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
    }).format(parsed);
}

function renderExportSelectionList() {
    if (!state.documents.length) {
        elements.exportSelectionList.innerHTML = `<p class="export-empty">${escapeHtml(t("no_documents_export"))}</p>`;
        elements.selectAllExportsToggle.checked = false;
        return;
    }

    const sortedDocuments = [...state.documents].sort((left, right) => compareDocuments(left, right, "date_desc"));
    elements.exportSelectionList.innerHTML = sortedDocuments.map(doc => `
        <label class="export-row">
            <input type="checkbox" class="export-doc-checkbox" value="${escapeHtml(String(doc.id))}" checked>
            <span class="export-row-copy">
                <span class="export-row-title">${escapeHtml(doc.refNumber || "Untitled document")}</span>
                <span class="export-row-meta">${escapeHtml(doc.type === "quote" ? t("quote_singular") : t("invoice_singular"))} • ${escapeHtml(doc.clientName || t("unknown_client"))} • ${escapeHtml(formatDisplayDate(doc.date) || t("no_date"))}</span>
            </span>
        </label>
    `).join("");
    elements.selectAllExportsToggle.checked = true;
}

function handleSelectAllExportsToggle(event) {
    const isChecked = Boolean(event.target.checked);
    elements.exportSelectionList.querySelectorAll(".export-doc-checkbox").forEach(checkbox => {
        checkbox.checked = isChecked;
    });
}

function exportSelectedDocuments() {
    if (!isAdminSession()) {
        setImportStatus("Only admin accounts can export JSON files.", true);
        return;
    }

    const selectedIds = Array.from(elements.exportSelectionList.querySelectorAll(".export-doc-checkbox:checked"))
        .map(checkbox => checkbox.value);

    if (!selectedIds.length) {
        setImportStatus("Select at least one quote or invoice to export.", true);
        return;
    }

    const selectedDocuments = state.documents.filter(doc => selectedIds.includes(String(doc.id)));
    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    downloadJSONFile(`invoice-quote-export-${stamp}.json`, {
        exportedAt: new Date().toISOString(),
        version: 1,
        documents: selectedDocuments
    });
    closeExportModal();
    setImportStatus(`Exported ${selectedDocuments.length} selected documents as JSON.`);
}

function hydrateEditorPreferences() {
    state.showInternalPricing = false;
    syncEditorPreferenceControls();
}

function syncEditorPreferenceControls() {
    if (elements.showInternalPricingToggle) {
        elements.showInternalPricingToggle.checked = state.showInternalPricing;
    }
    syncInternalPricingVisibility();
}

function handleInternalPricingToggleChange(event) {
    state.showInternalPricing = Boolean(event.target.checked);
    syncInternalPricingVisibility();
}

function syncInternalPricingVisibility() {
    elements.itemsContainer.querySelectorAll(".item-internal-panel").forEach(panel => {
        panel.hidden = !state.showInternalPricing;
    });
}

async function handleAccessSubmit(event) {
    event.preventDefault();

    if (state.isAuthenticating) {
        return;
    }

    const submittedUsername = elements.accessUsername.value.trim().toLowerCase();
    const submittedCode = elements.accessCode.value.trim();
    const matchingUser = state.userAccounts.find(user =>
        (user.username === submittedUsername || user.email === submittedUsername) && user.password === submittedCode
    );
    const isValid = Boolean(matchingUser);
    elements.accessError.textContent = DEFAULT_ACCESS_ERROR_MESSAGE;
    elements.accessError.hidden = isValid;

    if (!isValid) {
        if (!submittedUsername) {
            elements.accessUsername.focus();
        } else {
            elements.accessCode.select();
        }
        return;
    }

    setAccessLoading(true);
    setSessionLoader(true);
    await new Promise(resolve => window.setTimeout(resolve, 300));

    try {
        await unlockAccess(matchingUser);
    } finally {
        setAccessLoading(false);
        setSessionLoader(false);
    }
}

async function requestJSON(url, options = {}) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(payload.error || "Request failed.");
    }

    return payload;
}

function normalizePaymentStatus(status) {
    if (status === "paid" || status === "pending" || status === "unpaid") {
        return status;
    }
    return "unpaid";
}

function getPaymentStatusLabel(status) {
    const normalizedStatus = normalizePaymentStatus(status);
    if (normalizedStatus === "paid") {
        return t("payment_paid");
    }
    if (normalizedStatus === "pending") {
        return t("payment_pending");
    }
    return t("payment_unpaid");
}

function normalizeDocuments(documents) {
    const normalized = Array.isArray(documents) ? documents : [];
    const consolidated = [];
    const tlIndexByKey = new Map();

    normalized.forEach(document => {
        const doc = document && typeof document === "object" ? { ...document } : null;
        if (!doc) {
            return;
        }

        doc.status = doc.status === "draft" ? "draft" : "logged";
        doc.paymentStatus = String(doc.type || "").toLowerCase() === "invoice"
            ? normalizePaymentStatus(doc.paymentStatus)
            : null;

        const refNumber = String(doc.refNumber || "").trim().toUpperCase();
        const isTlReference = /^TL-\d{4}-\d{4}-\d+$/i.test(refNumber);

        if (!isTlReference) {
            consolidated.push(doc);
            return;
        }

        const key = `${String(doc.type || "quote").toLowerCase()}::${refNumber}`;
        const existingIndex = tlIndexByKey.get(key);

        if (existingIndex === undefined) {
            tlIndexByKey.set(key, consolidated.length);
            consolidated.push(doc);
            return;
        }

        const existingDoc = consolidated[existingIndex];
        consolidated[existingIndex] = {
            ...doc,
            legacyPdfUrl: doc.legacyPdfUrl || existingDoc.legacyPdfUrl,
            legacyPdfFilename: doc.legacyPdfFilename || existingDoc.legacyPdfFilename,
            createdBy: doc.createdBy || existingDoc.createdBy || null,
            tags: Array.isArray(doc.tags) && doc.tags.length ? doc.tags : existingDoc.tags,
            items: Array.isArray(doc.items) && doc.items.length ? doc.items : existingDoc.items,
            notes: doc.notes || existingDoc.notes,
            clientName: doc.clientName || existingDoc.clientName,
            clientAddress: doc.clientAddress || existingDoc.clientAddress,
            consigneeName: doc.consigneeName || existingDoc.consigneeName,
            consigneeAddress: doc.consigneeAddress || existingDoc.consigneeAddress,
            poNumber: doc.poNumber || existingDoc.poNumber,
            paymentTerms: doc.paymentTerms || existingDoc.paymentTerms,
            total: Number(doc.total || existingDoc.total || 0),
            subtotal: Number(doc.subtotal || existingDoc.subtotal || 0)
        };
    });

    return consolidated;
}

function normalizeClients(clients) {
    const validClients = (Array.isArray(clients) ? clients : [])
        .map(client => ({
            id: client?.id || `client-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name: client?.name || "",
            address: client?.address || "",
            consigneeName: client?.consigneeName || "",
            consigneeAddress: client?.consigneeAddress || ""
        }))
        .filter(client => client.name && client.address);

    const hasDefaultClient = validClients.some(client =>
        client.id === "ccxpress" || client.name === "CCXpress S.A | Chatelain Cargo Services"
    );

    return hasDefaultClient
        ? validClients
        : [
            {
                id: "ccxpress",
                name: "CCXpress S.A | Chatelain Cargo Services",
                address: "42 Airport Road, Port Au Prince, Haiti",
                consigneeName: "",
                consigneeAddress: ""
            },
            ...validClients
        ];
}

function renderDocumentsMessage(message) {
    elements.documentsGrid.innerHTML = `
        <div class="empty-state">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p>${escapeHtml(message)}</p>
        </div>
    `;
}

function setImportStatus(message, isError = false) {
    elements.importDocumentStatus.textContent = message;
    elements.importDocumentStatus.classList.toggle("hero-helper-error", isError);
    const isDefaultMessage = message === t("import_status_default");
    elements.importDocumentStatus.dataset.customized = isDefaultMessage ? "" : "true";
    elements.importDocumentStatus.hidden = isDefaultMessage;
}

function readLocalDataset(storageKey, fallbackValue) {
    try {
        const rawValue = window.localStorage.getItem(storageKey);
        if (!rawValue) {
            return fallbackValue;
        }

        return JSON.parse(rawValue);
    } catch (error) {
        return fallbackValue;
    }
}

function writeLocalDataset(storageKey, value) {
    try {
        window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
        if (error?.name === "QuotaExceededError") {
            throw new Error("Local storage is full. Try a smaller image.");
        }
        throw error;
    }
}

function clearLocalDataset(storageKey) {
    window.localStorage.removeItem(storageKey);
}

function loadLocalAppData() {
    const documents = normalizeDocuments(readLocalDataset(LOCAL_DOCUMENTS_STORAGE_KEY, []));
    const clients = normalizeClients(readLocalDataset(LOCAL_CLIENTS_STORAGE_KEY, []));

    state.dataMode = "local";
    updateRuntimeModeBadge();
    state.documents = documents;
    state.clients = clients;
    renderClientOptions();
    prepareNewDocument("quote");
    renderDocuments();
    setImportStatus("Running in local test mode. Data is saved in this browser only.");
}

function clearLocalTestData() {
    if (!isAdminSession()) {
        setImportStatus("Only admin accounts can clear local test data.", true);
        closeSettingsModal();
        return;
    }

    if (state.dataMode !== "local") {
        setImportStatus("Local test data is only available while the app is running in browser-only mode.");
        closeSettingsModal();
        return;
    }

    if (!window.confirm("Clear all local test quotes, invoices, and saved clients from this browser?")) {
        return;
    }

    clearLocalDataset(LOCAL_DOCUMENTS_STORAGE_KEY);
    clearLocalDataset(LOCAL_CLIENTS_STORAGE_KEY);
    clearLocalDataset(USER_ACCOUNTS_STORAGE_KEY);
    clearLocalDataset(ISSUE_REPORTS_STORAGE_KEY);
    clearLocalDataset(COMPANY_PROFILE_STORAGE_KEY);
    clearLocalDataset(SAVED_ITEMS_STORAGE_KEY);
    loadLocalWorkspaceState();
    loadLocalAppData();
    closeSettingsModal();
    setImportStatus("Local test data cleared from this browser.");
}

async function bootstrapAppData() {
    if (state.isBootstrapping) {
        return;
    }

    state.isBootstrapping = true;
    renderDocumentsMessage("Loading saved quotes and invoices...");

    try {
        const [documentsResponse, clientsResponse] = await Promise.all([
            requestJSON("/api/documents"),
            requestJSON("/api/clients")
        ]);

        state.dataMode = "server";
        updateRuntimeModeBadge();
        state.documents = normalizeDocuments(documentsResponse.documents);
        state.clients = normalizeClients(clientsResponse.clients);

        // Check for local data migration
        await migrateLocalDataToServer();

        renderClientOptions();
        prepareNewDocument("quote");
        renderDocuments();
    } catch (error) {
        loadLocalAppData();
        setImportStatus(`Server unavailable (${error.message}). Local test mode is active for this browser.`);
    } finally {
        state.isBootstrapping = false;
    }
}

async function saveDocumentsToServer(documents) {
    if (state.dataMode === "local") {
        state.documents = normalizeDocuments(documents);
        writeLocalDataset(LOCAL_DOCUMENTS_STORAGE_KEY, state.documents);
        updateRuntimeModeBadge();
        return;
    }

    try {
        const payload = await requestJSON("/api/documents", {
            method: "POST",
            body: JSON.stringify({ documents })
        });

        state.dataMode = "server";
        updateRuntimeModeBadge();
        state.documents = normalizeDocuments(payload.documents);
    } catch (error) {
        state.dataMode = "local";
        updateRuntimeModeBadge();
        state.documents = normalizeDocuments(documents);
        writeLocalDataset(LOCAL_DOCUMENTS_STORAGE_KEY, state.documents);
        setImportStatus("Server save failed, so changes were saved locally in this browser instead.");
    }
}

async function saveClientsToServer(clients) {
    if (state.dataMode === "local") {
        state.clients = normalizeClients(clients);
        writeLocalDataset(LOCAL_CLIENTS_STORAGE_KEY, state.clients);
        updateRuntimeModeBadge();
        return;
    }

    try {
        const payload = await requestJSON("/api/clients", {
            method: "POST",
            body: JSON.stringify({ clients })
        });

        state.dataMode = "server";
        updateRuntimeModeBadge();
        state.clients = normalizeClients(payload.clients);
    } catch (error) {
        state.dataMode = "local";
        updateRuntimeModeBadge();
        state.clients = normalizeClients(clients);
        writeLocalDataset(LOCAL_CLIENTS_STORAGE_KEY, state.clients);
        setImportStatus("Server save failed, so clients were saved locally in this browser instead.");
    }
}

function downloadTextFile(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function downloadJSONFile(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}

function exportSystemBackup() {
    if (!isAdminSession()) {
        setImportStatus("Only admin accounts can export backups.", true);
        return;
    }

    const stamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    downloadJSONFile(`invoice-quote-backup-${stamp}.json`, {
        exportedAt: new Date().toISOString(),
        version: 1,
        documents: state.documents,
        clients: state.clients
    });
    closeSettingsModal();
    setImportStatus("Backup exported. Keep the JSON file somewhere safe.");
}

function exportCsvTemplate() {
    if (!isAdminSession()) {
        setImportStatus("Only admin accounts can export CSV templates.", true);
        return;
    }

    const headers = [
        "type",
        "refNumber",
        "date",
        "clientName",
        "clientAddress",
        "consigneeName",
        "consigneeAddress",
        "poNumber",
        "tags",
        "notes",
        "paymentTerms",
        "includeSignature",
        "includeStamp",
        "itemDescription",
        "itemQuantity",
        "itemUnitPrice",
        "itemTotalPrice",
        "itemInternalCost",
        "total"
    ];

    const exampleRow1 = [
        "quote",
        "TL-2026-0329-01",
        "2026-03-29",
        "CCXpress S.A | Chatelain Cargo Services",
        "\"42 Airport Road, Port Au Prince, Haiti\"",
        "\"ABC Shipping Corp\"",
        "\"Port Terminal A, Port-au-Prince, Haiti\"",
        "PO-1001",
        "\"Priority, Port-au-Prince\"",
        "\"Legacy bulk import example\"",
        `"${DEFAULT_PAYMENT_TERMS}"`,
        "true",
        "false",
        "Freight coordination services",
        "1",
        "850.00",
        "850.00",
        "750.00",
        "850.00"
    ];

    const exampleRow2 = [
        "invoice",
        "TL-2026-0329-02",
        "2026-03-29",
        "CCXpress S.A | Chatelain Cargo Services",
        "\"42 Airport Road, Port Au Prince, Haiti\"",
        "\"XYZ Logistics Ltd\"",
        "\"Industrial Zone, Santo Domingo, DR\"",
        "INV-2026-001",
        "\"Urgent, Express\"",
        "\"Monthly service invoice\"",
        `"${DEFAULT_PAYMENT_TERMS}"`,
        "true",
        "true",
        "Customs clearance and documentation",
        "2",
        "450.00",
        "900.00",
        "400.00",
        "1350.00"
    ];

    const exampleRow3 = [
        "quote",
        "TL-2026-0329-03",
        "2026-03-29",
        "CCXpress S.A | Chatelain Cargo Services",
        "\"42 Airport Road, Port Au Prince, Haiti\"",
        "",
        "",
        "QT-2026-001",
        "\"Standard\"",
        "\"Quote for multiple services\"",
        `"${DEFAULT_PAYMENT_TERMS}"`,
        "true",
        "false",
        "Port handling and storage",
        "3",
        "200.00",
        "600.00",
        "150.00",
        "600.00"
    ];

    const exampleRow4 = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Documentation and permits",
        "1",
        "300.00",
        "300.00",
        "250.00",
        ""
    ];

    closeSettingsModal();
    downloadTextFile("invoice-quote-template.csv", `${headers.join(",")}\n${exampleRow1.join(",")}\n${exampleRow2.join(",")}\n${exampleRow3.join(",")}\n${exampleRow4.join(",")}\n`, "text/csv;charset=utf-8");
    setImportStatus("Enhanced CSV template exported. Each document can have multiple item rows. Fill in one row per item, leaving document fields blank for additional items.");
}

function openCsvImportPicker() {
    if (!isAdminSession()) {
        setImportStatus("Only admin accounts can import CSV files.", true);
        return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,text/csv";
    input.addEventListener("change", handleCsvImportSelect, { once: true });
    input.click();
}

function parseCsv(content) {
    const rows = [];
    let current = "";
    let row = [];
    let inQuotes = false;

    for (let index = 0; index < content.length; index += 1) {
        const char = content[index];
        const next = content[index + 1];

        if (char === "\"") {
            if (inQuotes && next === "\"") {
                current += "\"";
                index += 1;
            } else {
                inQuotes = !inQuotes;
            }
            continue;
        }

        if (char === "," && !inQuotes) {
            row.push(current);
            current = "";
            continue;
        }

        if ((char === "\n" || char === "\r") && !inQuotes) {
            if (char === "\r" && next === "\n") {
                index += 1;
            }
            row.push(current);
            current = "";
            if (row.some(cell => String(cell).trim() !== "")) {
                rows.push(row);
            }
            row = [];
            continue;
        }

        current += char;
    }

    row.push(current);
    if (row.some(cell => String(cell).trim() !== "")) {
        rows.push(row);
    }

    return rows;
}

function csvValue(row, indexMap, key) {
    return String(row[indexMap[key]] || "").trim();
}

function numberOrZero(value) {
    const parsed = Number.parseFloat(String(value || "").replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
}

function buildDocumentFromCsvRow(row, indexMap) {
    const type = csvValue(row, indexMap, "type").toLowerCase() === "invoice" ? "invoice" : "quote";
    const itemQuantity = numberOrZero(csvValue(row, indexMap, "itemQuantity")) || 1;
    const itemUnitPrice = numberOrZero(csvValue(row, indexMap, "itemUnitPrice"));
    const itemTotalPrice = numberOrZero(csvValue(row, indexMap, "itemTotalPrice")) || (itemQuantity * itemUnitPrice);
    const itemInternalCost = numberOrZero(csvValue(row, indexMap, "itemInternalCost")) || 0;
    const total = numberOrZero(csvValue(row, indexMap, "total")) || itemTotalPrice;
    const itemDescription = csvValue(row, indexMap, "itemDescription") || "Imported line item";
    const date = csvValue(row, indexMap, "date") || getLocalDateInputValue();
    const clientName = csvValue(row, indexMap, "clientName") || "Imported Client";
    const clientAddress = csvValue(row, indexMap, "clientAddress");
    const consigneeName = csvValue(row, indexMap, "consigneeName") || "";
    const consigneeAddress = csvValue(row, indexMap, "consigneeAddress") || "";
    const refNumber = csvValue(row, indexMap, "refNumber") || `${getRefPrefix()}-${getNextRefSequence()}`;
    const includeSignature = csvValue(row, indexMap, "includeSignature").toLowerCase() === "true";
    const includeStamp = csvValue(row, indexMap, "includeStamp").toLowerCase() === "true";

    return {
        id: Date.now() + Math.floor(Math.random() * 100000),
        type,
        status: "draft",
        paymentStatus: type === "invoice" ? "unpaid" : null,
        refNumber,
        date,
        clientName,
        clientAddress,
        consigneeName,
        consigneeAddress,
        poNumber: csvValue(row, indexMap, "poNumber"),
        tags: parseTags(csvValue(row, indexMap, "tags")),
        notes: csvValue(row, indexMap, "notes"),
        paymentTerms: csvValue(row, indexMap, "paymentTerms") || DEFAULT_PAYMENT_TERMS,
        includeSignature,
        includeStamp,
        printedAt: new Date().toISOString(),
        subtotal: total,
        total,
        items: [
            {
                description: itemDescription,
                quantity: itemQuantity,
                price: itemUnitPrice,
                unitPrice: itemUnitPrice,
                totalPrice: itemTotalPrice,
                totalPriceDop: 0,
                internalCost: itemInternalCost,
                upchargePercent: itemInternalCost > 0 ? (((itemTotalPrice - itemInternalCost) / itemInternalCost) * 100) : 0,
                usesDopTotal: false,
                manualUnitPrice: false,
                itemImageDataUrl: ""
            }
        ]
    };
}

function groupCsvRowsByDocument(rows, indexMap) {
    const documents = [];
    let currentDoc = null;

    for (const row of rows) {
        const type = csvValue(row, indexMap, "type");
        const refNumber = csvValue(row, indexMap, "refNumber");
        const clientName = csvValue(row, indexMap, "clientName");
        const date = csvValue(row, indexMap, "date");
        const itemDescription = csvValue(row, indexMap, "itemDescription");

        // Check if this row starts a new document
        const startsNewDocument = type || clientName || date ||
            (refNumber && (!currentDoc || currentDoc.refNumber !== refNumber));

        if (startsNewDocument) {
            // Save the previous document if it exists
            if (currentDoc) {
                documents.push(currentDoc);
            }
            // Start a new document
            currentDoc = buildDocumentFromCsvRow(row, indexMap);
        } else if (currentDoc && itemDescription) {
            // Add item to current document
            const itemQuantity = numberOrZero(csvValue(row, indexMap, "itemQuantity")) || 1;
            const itemUnitPrice = numberOrZero(csvValue(row, indexMap, "itemUnitPrice"));
            const itemTotalPrice = numberOrZero(csvValue(row, indexMap, "itemTotalPrice")) || (itemQuantity * itemUnitPrice);
            const itemInternalCost = numberOrZero(csvValue(row, indexMap, "itemInternalCost")) || 0;

            currentDoc.items.push({
                description: itemDescription,
                quantity: itemQuantity,
                price: itemUnitPrice,
                unitPrice: itemUnitPrice,
                totalPrice: itemTotalPrice,
                totalPriceDop: 0,
                internalCost: itemInternalCost,
                upchargePercent: itemInternalCost > 0 ? (((itemTotalPrice - itemInternalCost) / itemInternalCost) * 100) : 0,
                usesDopTotal: false,
                manualUnitPrice: false,
                itemImageDataUrl: ""
            });

            // Update document totals
            currentDoc.subtotal += itemTotalPrice;
            currentDoc.total += itemTotalPrice;
        }
        // Skip rows that have neither document fields nor item description
    }

    // Add the last document
    if (currentDoc) {
        documents.push(currentDoc);
    }

    return documents;
}

async function handleCsvImportSelect(event) {
    if (!isAdminSession()) {
        setImportStatus("Only admin accounts can import CSV files.", true);
        event.target.value = "";
        return;
    }

    const [file] = event.target.files || [];
    if (!file) {
        return;
    }

    try {
        const text = await file.text();
        const rows = parseCsv(text);
        if (rows.length < 2) {
            throw new Error("The CSV needs a header row and at least one data row.");
        }

        const headers = rows[0].map(value => String(value || "").trim());
        const requiredHeaders = ["type", "clientName", "itemDescription"];
        for (const header of requiredHeaders) {
            if (!headers.includes(header)) {
                throw new Error(`Missing required CSV column: ${header}`);
            }
        }

        const indexMap = Object.fromEntries(headers.map((header, index) => [header, index]));
        const importedDocuments = groupCsvRowsByDocument(rows.slice(1), indexMap);

        if (!importedDocuments.length) {
            throw new Error("No valid document rows were found in the CSV.");
        }

        const mergedClients = [...state.clients];
        importedDocuments.forEach(doc => {
            if (!doc.clientName || !doc.clientAddress) {
                return;
            }

            const existing = mergedClients.find(client => client.name.toLowerCase() === doc.clientName.toLowerCase());
            if (existing) {
                existing.address = doc.clientAddress;
                existing.consigneeName = doc.consigneeName || existing.consigneeName || "";
                existing.consigneeAddress = doc.consigneeAddress || existing.consigneeAddress || "";
            } else {
                mergedClients.push({
                    id: `client-${Date.now()}-${Math.random().toString(36).slice(2)}`,
                    name: doc.clientName,
                    address: doc.clientAddress,
                    consigneeName: doc.consigneeName || "",
                    consigneeAddress: doc.consigneeAddress || ""
                });
            }
        });

        await Promise.all([
            saveDocumentsToServer([...importedDocuments, ...state.documents]),
            saveClientsToServer(mergedClients)
        ]);

        closeSettingsModal();
        renderClientOptions();
        renderDocuments();
        setImportStatus(`Imported ${importedDocuments.length} documents from CSV. Review and edit any details as needed.`);
    } catch (error) {
        setImportStatus(`CSV import failed: ${error.message}`, true);
    }
}

async function handleBackupImportSelect(event) {
    if (!isAdminSession()) {
        setImportStatus("Only admin accounts can import backups.", true);
        event.target.value = "";
        return;
    }

    const [file] = event.target.files || [];
    event.target.value = "";

    if (!file) {
        return;
    }

    try {
        const text = await file.text();
        const payload = JSON.parse(text);
        const nextDocuments = normalizeDocuments(payload.documents || (payload.document ? [payload.document] : []));
        const nextClients = normalizeClients(payload.clients || state.clients);

        if (!nextDocuments.length && !payload.document) {
            throw new Error("This backup file does not contain any documents.");
        }

        const mergedDocuments = nextDocuments.length === 1 && payload.document
            ? [payload.document, ...state.documents.filter(entry => entry.id !== payload.document.id)]
            : nextDocuments;

        await Promise.all([
            saveDocumentsToServer(mergedDocuments),
            saveClientsToServer(nextClients)
        ]);

        closeSettingsModal();
        renderClientOptions();
        renderDocuments();
        setImportStatus("Backup imported successfully.");
    } catch (error) {
        setImportStatus(`Backup import failed: ${error.message}`, true);
    }
}

function setToday() {
    elements.docDate.value = getLocalDateInputValue();
}

function getLocalDateInputValue(dateValue = new Date()) {
    const date = new Date(dateValue);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function parseLocalDateValue(dateValue = elements.docDate?.value || new Date()) {
    if (dateValue instanceof Date) {
        return new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate());
    }

    const normalizedValue = String(dateValue || "").trim();
    const dateOnlyMatch = normalizedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateOnlyMatch) {
        return new Date(
            Number(dateOnlyMatch[1]),
            Number(dateOnlyMatch[2]) - 1,
            Number(dateOnlyMatch[3])
        );
    }

    const parsedDate = new Date(normalizedValue || Date.now());
    if (Number.isNaN(parsedDate.getTime())) {
        const fallback = new Date();
        return new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate());
    }

    return parsedDate;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat(getCurrentLocale(), {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
    }).format(Number(amount || 0));
}

function formatAmount(amount) {
    return new Intl.NumberFormat(getCurrentLocale(), {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(Number(amount || 0));
}

function parseDecimalInput(value) {
    const normalized = String(value || "")
        .replace(/,/g, "")
        .replace(/[^\d.]/g, "");
    const match = normalized.match(/^\d*\.?\d*/);
    const parsed = parseFloat(match ? match[0] : "");
    return Number.isFinite(parsed) ? parsed : 0;
}

function hasMeaningfulPoNumber(value) {
    const normalized = String(value || "").trim();
    return Boolean(normalized && normalized.toUpperCase() !== "N/A");
}

function getStepContent(step) {
    const isEditing = isExistingDocumentEditMode();
    const isPrefilled = isPrefilledEditMode();
    const stepContent = {
        1: {
            title: t("type_info"),
            text: isPrefilled
                ? "Quick edit the converted document details, reference number, and invoice date."
                : isEditing
                ? "Update the saved document details and save right away if this is the only change you need."
                : "Choose the document type, confirm the date, and set the reference details.",
            tip: isPrefilled
                ? "Use this section for fast admin changes before you finalize the invoice."
                : isEditing
                ? "Existing documents can be updated from any step, so you do not have to return to final review for quick fixes."
                : "Reference details first keeps new documents organized before you move into client and pricing work."
        },
        2: {
            title: t("client_details"),
            text: isPrefilled
                ? "Adjust bill-to or consignee details without walking the full workflow again."
                : isEditing
                ? "Tighten up the saved client name or address without losing your place in the workflow."
                : "Select an existing client or enter a new one, then capture the address exactly as it should appear on the document.",
            tip: "Saved clients help you move much faster on repeat work and keep naming consistent."
        },
        3: {
            title: t("line_items"),
            text: isPrefilled
                ? "Fine-tune quantities, pricing, notes, and payment terms from one section."
                : "Add services, pricing, and payment terms. Unit price is derived automatically unless you switch to manual mode.",
            tip: isPrefilled
                ? "This is the fastest place to make operational edits before export."
                : "Keep item descriptions short and specific. The table stays cleaner when each service is one line item."
        },
        4: {
            title: t("keywords"),
            text: isPrefilled
                ? "Refresh search keywords only if the services, route, or priorities changed."
                : "Add search keywords after the line items are in place, or tap a suggestion generated from your item descriptions.",
            tip: isPrefilled
                ? "Keywords are optional here, but they help later search stay accurate."
                : "Keywords work best when they reflect destinations, service types, equipment, or priorities you will search for later."
        },
        5: {
            title: t("items_preview"),
            text: "Review the line items, notes, and totals in document form before moving to the final print preview.",
            tip: "This step is useful for catching quantity, unit price, and subtotal issues before you check the full page layout."
        },
        6: {
            title: t("review"),
            text: isPrefilled
                ? "Start from the final review, then jump only into the sections you want to edit."
                : "Check the final layout before saving and exporting the PDF.",
            tip: isPrefilled
                ? "Use the quick step bar above to edit just the fields that need attention."
                : "This preview mirrors the live document structure, so it is the fastest way to catch layout mistakes before print."
        }
    };

    return stepContent[step] || stepContent[1];
}

function updateEditorSummary() {
    const docType = elements.docType.value === "invoice" ? t("invoice_singular") : t("quote_singular");
    const clientName = elements.clientName.value.trim();
    const clientAddress = elements.clientAddress.value.trim();
    const tags = parseTags(elements.docTags.value);
    const itemCount = elements.itemsContainer.querySelectorAll(".item-row").length;
    const stepContent = getStepContent(state.currentStep);
    const totalSteps = getTotalSteps();
    const currentTotal = formatCurrency(calculateTotals());

    elements.stepIntroTitle.textContent = stepContent.title;
    elements.stepIntroText.textContent = stepContent.text;
    elements.sidebarTip.textContent = stepContent.tip;
    elements.editorProgressStep.textContent = `Step ${state.currentStep} of ${totalSteps}`;
    elements.editorProgressTitle.textContent = stepContent.title;
    elements.editorProgressFill.style.width = `${(state.currentStep / totalSteps) * 100}%`;

    elements.summaryDocType.textContent = docType;
    elements.summaryRef.textContent = elements.refNumber.value ? `Ref ${elements.refNumber.value}` : t("ref_pending");
    elements.summaryDate.textContent = elements.docDate.value ? formatDisplayDate(elements.docDate.value) : t("date_pending");
    elements.summaryClient.textContent = clientName || t("no_client_selected");
    elements.summaryAddress.textContent = clientAddress || t("choose_or_enter_client");
    elements.summaryItems.textContent = String(itemCount);
    elements.summaryTotal.textContent = currentTotal;
    elements.editorMobileSummaryType.textContent = docType;
    elements.editorMobileSummaryRef.textContent = elements.refNumber.value ? `Ref ${elements.refNumber.value}` : t("ref_pending");
    elements.editorMobileSummaryClient.textContent = clientName || t("no_client_selected");
    elements.editorMobileSummaryTotal.textContent = currentTotal;

    elements.summaryTags.innerHTML = tags.length
        ? tags.map(tag => `<span class="sidebar-tag">${escapeHtml(tag)}</span>`).join("")
        : `<span class="sidebar-tag muted">${escapeHtml(t("no_keywords"))}</span>`;

    renderKeywordSuggestions(tags);

    if (state.currentStep >= 5) {
        generatePreviews();
    }
}

function parseTags(value) {
    return String(value || "")
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean)
        .filter((tag, index, tags) => tags.findIndex(entry => entry.toLowerCase() === tag.toLowerCase()) === index);
}

function isExistingDocumentEditMode() {
    return state.editingDocumentId !== null;
}

function isPrefilledEditMode() {
    return state.editingDocumentId !== null || state.convertingFromQuoteId !== null;
}

function getTotalSteps() {
    return elements.stepIndicator.querySelectorAll(".step[data-step]").length;
}

function toKeywordLabel(value) {
    return value
        .split(" ")
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function normalizeKeywordCandidate(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/[^\w\s/&-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function getSuggestedKeywords() {
    const existingKeywords = new Set(parseTags(elements.docTags.value).map(tag => tag.toLowerCase()));
    const scores = new Map();
    const addSuggestion = (candidate, weight) => {
        const normalized = normalizeKeywordCandidate(candidate);
        if (!normalized || normalized.length < 3 || normalized.length > 40) {
            return;
        }

        const words = normalized.split(" ").filter(Boolean);
        if (!words.length) {
            return;
        }

        if (words.length === 1 && KEYWORD_STOP_WORDS.has(words[0])) {
            return;
        }

        if (words.every(word => KEYWORD_STOP_WORDS.has(word))) {
            return;
        }

        scores.set(normalized, (scores.get(normalized) || 0) + weight);
    };

    elements.itemsContainer.querySelectorAll(".item-row").forEach(row => {
        const description = row.querySelector(".item-description").value.trim();
        if (!description) {
            return;
        }

        description
            .split(/[,/|]+/)
            .map(segment => segment.trim())
            .filter(Boolean)
            .forEach(segment => addSuggestion(segment, 4));

        const words = description
            .toLowerCase()
            .split(/[^a-z0-9]+/i)
            .map(word => word.trim())
            .filter(word => word.length >= 2 && !KEYWORD_STOP_WORDS.has(word));

        words.forEach(word => {
            addSuggestion(word, 1);
        });

        for (let index = 0; index < words.length - 1; index += 1) {
            const phrase = `${words[index]} ${words[index + 1]}`;
            addSuggestion(phrase, 2);
        }

        for (let index = 0; index < words.length - 2; index += 1) {
            const phrase = `${words[index]} ${words[index + 1]} ${words[index + 2]}`;
            addSuggestion(phrase, 1);
        }
    });

    return Array.from(scores.entries())
        .filter(([keyword]) => !existingKeywords.has(keyword))
        .sort((left, right) => {
            if (right[1] !== left[1]) {
                return right[1] - left[1];
            }
            return left[0].localeCompare(right[0]);
        })
        .slice(0, 8)
        .map(([keyword]) => toKeywordLabel(keyword));
}

function renderKeywordSuggestions(existingTags = parseTags(elements.docTags.value)) {
    if (!elements.tagSuggestions) {
        return;
    }

    const suggestions = getSuggestedKeywords();
    if (!suggestions.length) {
        elements.tagSuggestions.innerHTML = existingTags.length
            ? '<span class="keyword-suggestion-empty">No new keyword suggestions right now.</span>'
            : '<span class="keyword-suggestion-empty">Add or update line items to see suggestions.</span>';
        return;
    }

    elements.tagSuggestions.innerHTML = suggestions.map(keyword => `
        <button type="button" class="keyword-suggestion-chip" data-keyword="${escapeHtml(keyword)}">${escapeHtml(keyword)}</button>
    `).join("");
}

function handleKeywordSuggestionClick(event) {
    const button = event.target.closest("[data-keyword]");
    if (!button) {
        return;
    }

    const nextTags = parseTags(elements.docTags.value);
    nextTags.push(button.dataset.keyword);
    elements.docTags.value = parseTags(nextTags.join(", ")).join(", ");
    updateEditorSummary();
}

function getRefPrefix(dateValue = elements.docDate?.value || new Date()) {
    const date = parseLocalDateValue(dateValue);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `TL-${year}-${month}${day}`;
}

function getUsedRefNumbers(dateValue = elements.docDate?.value || new Date(), excludeDocumentId = null) {
    const prefix = getRefPrefix(dateValue);
    return state.documents
        .filter(doc => excludeDocumentId === null || !isSameDocumentId(doc.id, excludeDocumentId))
        .map(doc => {
            const match = String(doc.refNumber || "").toUpperCase().match(/^TL-\d{4}-\d{4}-(\d+)$/);
            if (!match) {
                return null;
            }

            return String(doc.refNumber || "").toUpperCase().startsWith(`${prefix}-`) ? Number(match[1]) : null;
        })
        .filter(number => Number.isInteger(number) && number > 0)
        .sort((left, right) => left - right);
}

function getNextRefSequence(dateValue = elements.docDate?.value || new Date(), excludeDocumentId = null) {
    const usedNumbers = getUsedRefNumbers(dateValue, excludeDocumentId);

    let nextSequence = 1;
    for (const usedNumber of usedNumbers) {
        if (usedNumber === nextSequence) {
            nextSequence += 1;
            continue;
        }

        if (usedNumber > nextSequence) {
            break;
        }
    }

    return String(nextSequence).padStart(2, "0");
}

function getAvailableRefSequence(dateValue = elements.docDate?.value || new Date(), preferredSequence = "", excludeDocumentId = null) {
    const usedNumbers = new Set(getUsedRefNumbers(dateValue, excludeDocumentId));
    const normalizedPreferred = Number.parseInt(String(preferredSequence || "").replace(/\D/g, ""), 10);
    if (Number.isInteger(normalizedPreferred) && normalizedPreferred > 0 && !usedNumbers.has(normalizedPreferred)) {
        return String(normalizedPreferred).padStart(2, "0");
    }

    return getNextRefSequence(dateValue, excludeDocumentId);
}

function isAutoGeneratedRefNumber(value) {
    const refNumber = String(value || "").trim().toUpperCase();
    return /^TL-\d{4}-\d{4}-(\d{1,2})$/.test(refNumber)
        || /^TL-\d{4}\s*\(\d{2}\/\d{2}\)-DOC\s*\d+$/.test(refNumber);
}

function handleRefNumberInput() {
    updateEditorSummary();
}

function handleDocumentDateChange() {
    const currentRef = String(elements.refNumber.value || "").trim();
    if (!isExistingDocumentEditMode() && state.convertingFromQuoteId === null && (!currentRef || isAutoGeneratedRefNumber(currentRef))) {
        generateRefNumber(true);
    }
    updateEditorSummary();
}

function generateRefNumber(force = false) {
    if (state.editingDocumentId !== null && state.convertingFromQuoteId === null) {
        return;
    }

    if (!force) {
        const currentRef = String(elements.refNumber.value || "").trim();
        if (currentRef && !isAutoGeneratedRefNumber(currentRef)) {
            return;
        }
    }

    const dateValue = elements.docDate?.value || new Date();
    const prefix = getRefPrefix(dateValue);
    const existingMatch = String(elements.refNumber.value).match(/^TL-\d{4}-\d{4}-(\d{1,2})$/);
    const preferredSuffix = existingMatch ? existingMatch[1] : "";
    const suffix = getAvailableRefSequence(dateValue, preferredSuffix, state.editingDocumentId);
    elements.refNumber.value = `${prefix}-${suffix}`;
}

function openModal(type = "quote") {
    state.currentDocType = type;
    elements.docType.value = type;
    updateModalTitle();
    setModalState(elements.documentModal, true);
    goToStep(isPrefilledEditMode() ? getTotalSteps() : 1);
}

function getActionButtonMarkup(icon, label) {
    if (!label) {
        return `<span class="btn-icon" aria-hidden="true">${icon}</span>`;
    }

    return `<span class="btn-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;
}

function closeModal() {
    clearDraftAutosaveTimer();
    setModalState(elements.documentModal, false);
    elements.documentModal.classList.remove("review-mode");
    elements.documentModal.classList.remove("final-preview-mode");
    elements.documentModal.classList.remove("prefilled-edit-mode");
    resetForm();
}

function updateModalTitle() {
    const type = elements.docType.value;
    state.currentDocType = type;
    const docLabel = type === "quote" ? t("quote_singular") : t("invoice_singular");
    if (state.editingDocumentId !== null) {
        elements.modalTitle.textContent = `Edit ${docLabel}`;
    } else if (state.convertingFromQuoteId !== null) {
        elements.modalTitle.textContent = `Convert to ${docLabel}`;
    } else {
        elements.modalTitle.textContent = `New ${docLabel}`;
    }

    const saveButtonLabel = state.editingDocumentId !== null ? t("save_changes") : t("save_draft");
    elements.saveBtn.innerHTML = getActionButtonMarkup(
        '<svg viewBox="0 0 24 24"><path d="M5 4h11l3 3v13H5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 4v6h8V4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 17h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
        ""
    );
    elements.saveBtn.setAttribute("aria-label", saveButtonLabel);
    elements.saveBtn.setAttribute("title", saveButtonLabel);
    elements.saveBtn.classList.add("btn-icon-only");
    elements.exportPdfBtn.innerHTML = getActionButtonMarkup(
        '<svg viewBox="0 0 24 24"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M14 3v6h6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 15h8M8 11h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
        t("save_preview_pdf")
    );
    elements.exportPdfBtn.removeAttribute("title");
    elements.exportPdfBtn.removeAttribute("aria-label");
    generateRefNumber();
}

function resetForm() {
    clearDraftAutosaveTimer();
    state.editingDocumentId = null;
    state.convertingFromQuoteId = null;
    elements.clientSelect.value = "";
    elements.clientName.value = "";
    elements.clientAddress.value = "";
    elements.consigneeName.value = "";
    elements.consigneeAddress.value = "";
    elements.poNumber.value = "";
    elements.docTags.value = "";
    elements.notes.value = "";
    elements.paymentTerms.value = DEFAULT_PAYMENT_TERMS;
    elements.includeSignature.checked = true;
    elements.includeStamp.checked = false;
    elements.itemsContainer.innerHTML = "";
    state.itemCounter = 0;
    addItem();
    setToday();
    generateRefNumber();
    updateModalTitle();
}

function prepareNewDocument(type = "quote") {
    clearDraftAutosaveTimer();
    state.editingDocumentId = null;
    state.convertingFromQuoteId = null;
    elements.itemsContainer.innerHTML = "";
    state.itemCounter = 0;
    addItem();
    elements.clientSelect.value = "";
    elements.clientName.value = "";
    elements.clientAddress.value = "";
    elements.consigneeName.value = "";
    elements.consigneeAddress.value = "";
    elements.poNumber.value = "";
    elements.docTags.value = "";
    elements.notes.value = "";
    elements.paymentTerms.value = DEFAULT_PAYMENT_TERMS;
    elements.includeSignature.checked = true;
    elements.includeStamp.checked = false;
    elements.docType.value = type;
    setToday();
    updateModalTitle();
}

function goToStep(step) {
    const totalSteps = getTotalSteps();
    const isPrefilled = isPrefilledEditMode();
    state.currentStep = step;
    elements.documentModal.classList.toggle("review-mode", step === totalSteps);
    elements.documentModal.classList.toggle("final-preview-mode", step === totalSteps && !isMobileViewport());
    elements.documentModal.classList.toggle("prefilled-edit-mode", isPrefilled);

    document.querySelectorAll(".step[data-step]").forEach(el => {
        const stepNumber = Number(el.dataset.step);
        el.classList.remove("active", "completed");
        if (stepNumber === 5 && isPrefilled) {
            return;
        }
        if (stepNumber < step) {
            el.classList.add("completed");
        }
        if (stepNumber === step) {
            el.classList.add("active");
        }
    });

    document.querySelectorAll(".form-step[data-step]").forEach(el => {
        const stepNumber = Number(el.dataset.step);
        el.classList.toggle("active", stepNumber === step);
    });

    elements.prevBtn.style.display = isPrefilled ? "none" : (step > 1 ? "block" : "none");
    elements.nextBtn.style.display = isPrefilled ? "none" : (step < totalSteps ? "block" : "none");
    elements.prevBtn.textContent = step === totalSteps ? "Back to Edit" : "Previous";
    elements.nextBtn.textContent = step === totalSteps - 1 ? "Review Document" : step === totalSteps - 2 ? "Continue to Preview" : "Continue";
    elements.saveBtn.style.display = (isPrefilled || step === totalSteps) ? "block" : "none";
    elements.exportPdfBtn.style.display = step === totalSteps ? "block" : "none";

    if (step >= totalSteps - 1) {
        generatePreviews();
    }

    updateEditorSummary();
    resetDocumentModalViewport(step);
    const activeStep = elements.stepIndicator.querySelector(`.step[data-step="${step}"]`);
    if (activeStep && isMobileViewport()) {
        activeStep.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
    window.requestAnimationFrame(syncActivePreviewScale);
}

function nextStep() {
    if (isExistingDocumentEditMode() || validateStep(state.currentStep)) {
        goToStep(state.currentStep + 1);
    }
}

function prevStep() {
    goToStep(state.currentStep - 1);
}

function handleStepIndicatorClick(event) {
    const stepButton = event.target.closest(".step[data-step]");
    if (!stepButton) {
        return;
    }

    const targetStep = Number(stepButton.dataset.step);
    if (!targetStep || targetStep === state.currentStep) {
        return;
    }

    if (targetStep === 5 && isPrefilledEditMode()) {
        return;
    }

    if (targetStep > state.currentStep && !isPrefilledEditMode()) {
        for (let step = state.currentStep; step < targetStep; step += 1) {
            if (!validateStep(step)) {
                return;
            }
        }
    }

    goToStep(targetStep);
}

function validateStep(step) {
    if (step === 2 && !elements.clientName.value.trim()) {
        alert("Please enter client name");
        return false;
    }

    if (step === 3 && elements.itemsContainer.querySelectorAll(".item-row").length === 0) {
        alert("Please add at least one item");
        return false;
    }

    return true;
}

function clearDraftAutosaveTimer() {
    if (state.draftAutosaveTimerId) {
        window.clearTimeout(state.draftAutosaveTimerId);
        state.draftAutosaveTimerId = null;
    }
}

function hasMeaningfulDraftContent() {
    if (state.editingDocumentId !== null) {
        return true;
    }

    const simpleFields = [
        elements.clientName?.value,
        elements.clientAddress?.value,
        elements.consigneeName?.value,
        elements.consigneeAddress?.value,
        elements.poNumber?.value,
        elements.notes?.value,
        elements.docTags?.value
    ];

    if (simpleFields.some(value => String(value || "").trim())) {
        return true;
    }

    return Array.from(elements.itemsContainer.querySelectorAll(".item-row")).some(row => {
        const description = row.querySelector(".item-description")?.value.trim();
        const total = parseFloat(row.querySelector(".item-total-price")?.value) || 0;
        const quantity = parseFloat(row.querySelector(".item-quantity")?.value) || 0;
        return Boolean(description || total > 0 || quantity > 1);
    });
}

function queueDraftAutosave() {
    if (!elements.documentModal?.classList.contains("active")) {
        return;
    }

    clearDraftAutosaveTimer();
    if (!hasMeaningfulDraftContent()) {
        return;
    }

    state.draftAutosaveTimerId = window.setTimeout(() => {
        state.draftAutosaveTimerId = null;
        void persistDocument({
            exportAfterSave: false,
            silent: true,
            keepOpen: true,
            forceDraft: true
        });
    }, 900);
}

function addItem() {
    state.itemCounter += 1;
    const itemId = String(state.itemCounter);

    const itemDiv = document.createElement("div");
    itemDiv.className = "item-row expanded";
    itemDiv.dataset.itemId = itemId;
    itemDiv.dataset.priceDriver = "total";
    itemDiv.innerHTML = `
        <div class="item-row-header">
            <button type="button" class="item-summary-toggle" data-toggle-item="${itemId}" aria-expanded="true">
                <span class="item-summary-thumb" aria-hidden="true">
                    <span class="item-summary-thumb-fallback">${state.itemCounter}</span>
                </span>
                <span class="item-summary-copy">
                    <span class="item-summary-title-row">
                        <span class="item-number">Item #${state.itemCounter}</span>
                        <span class="item-summary-title">New line item</span>
                    </span>
                    <span class="item-summary-meta">Add the item description, then set quantity and pricing.</span>
                    <span class="item-summary-stats" aria-hidden="true">
                        <span class="item-summary-stat">
                            <span class="item-summary-stat-label">Qty</span>
                            <strong class="item-summary-qty">1</strong>
                        </span>
                        <span class="item-summary-stat">
                            <span class="item-summary-stat-label">Unit</span>
                            <strong class="item-summary-unit">$0.00</strong>
                        </span>
                        <span class="item-summary-stat item-summary-stat-total">
                            <span class="item-summary-stat-label">Total</span>
                            <strong class="item-summary-total">$0.00</strong>
                        </span>
                    </span>
                </span>
            </button>
            <div class="item-row-header-actions">
                <button type="button" class="item-quick-action item-quick-action-primary" data-toggle-item="${itemId}">
                    <span class="item-edit-label">Done</span>
                </button>
                <button type="button" class="item-quick-action item-quick-action-danger" data-remove-item="${itemId}">${escapeHtml(t("delete"))}</button>
            </div>
        </div>
        <div class="item-editor">
            <div class="item-editor-grid">
                <div class="item-editor-main">
                    <div class="form-group">
                        <label>Description</label>
                        <textarea class="item-description" rows="2" placeholder="Item description..."></textarea>
                    </div>
                    <div class="form-row item-pricing-row">
                        <div class="form-group">
                            <label>Quantity</label>
                            <input type="number" class="item-quantity" value="1" min="0" step="1">
                        </div>
                        <div class="form-group">
                            <label>Unit Price (USD)</label>
                            <input type="number" class="item-unit-price" value="0.00" min="0" step="0.01" inputmode="decimal">
                        </div>
                        <div class="form-group item-total-price-usd-group">
                            <label>Total Price (USD)</label>
                            <input type="number" class="item-total-price" value="0.00" min="0" step="0.01">
                        </div>
                    </div>
                </div>
            </div>
            <div class="item-internal-panel">
                <div class="item-internal-header">
                    <h6>Internal Only</h6>
                    <p>Not included in the final printout.</p>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Internal Cost (USD)</label>
                        <input type="number" class="item-internal-cost" value="0" min="0" step="0.01">
                    </div>
                    <div class="form-group">
                        <label>Upcharge %</label>
                        <input type="text" class="item-upcharge-percent" value="0.00%" readonly>
                        <small class="field-help">Calculated from selling total versus internal cost.</small>
                    </div>
                </div>
            </div>
        </div>
    `;

    elements.itemsContainer.appendChild(itemDiv);
    itemDiv.dataset.itemImageDataUrl = "";
    itemDiv.querySelector(".item-internal-panel").hidden = !state.showInternalPricing;
    syncItemImageUI(itemDiv);
    updateItemPricing(itemDiv);
    setExpandedItem(itemDiv);
    focusItemPrimaryField(itemDiv);
    syncItemActionMenus();
    queueDraftAutosave();
}

function focusItemPrimaryField(row) {
    if (!row || state.currentStep !== 3) {
        return;
    }

    const target = row.querySelector(".item-description");
    if (!target) {
        return;
    }

    window.requestAnimationFrame(() => {
        target.focus();
        target.setSelectionRange?.(target.value.length, target.value.length);
    });
}

function removeItem(id) {
    const item = elements.itemsContainer.querySelector(`[data-item-id="${id}"]`);
    if (item) {
        if (state.openItemMenuId === String(id)) {
            state.openItemMenuId = null;
        }
        const shouldExpandNeighbor = item.classList.contains("expanded");
        item.remove();
        refreshItemOrdering();
        syncItemActionMenus();
        if (shouldExpandNeighbor) {
            const nextItem = elements.itemsContainer.querySelector(".item-row");
            if (nextItem) {
                setExpandedItem(nextItem);
            }
        }
        queueDraftAutosave();
    }
}

function saveEditorItemForLater(id) {
    const item = elements.itemsContainer.querySelector(`[data-item-id="${id}"]`);
    if (!item) {
        return;
    }

    const description = item.querySelector(".item-description").value.trim();
    const quantity = Number.parseFloat(item.querySelector(".item-quantity").value) || 0;
    const total = Number.parseFloat(item.querySelector(".item-total-price").value) || 0;
    const unitPrice = parseDecimalInput(item.querySelector(".item-unit-price").value) || 0;

    if (!description) {
        window.alert("Add an item description before moving it to the cart.");
        return;
    }

    addSavedItem({
        description,
        quantity,
        unitPrice,
        total,
        itemImageDataUrl: item.dataset.itemImageDataUrl || ""
    });
    removeItem(id);
    setImportStatus(t("saved_item_added"));
    queueDraftAutosave();
}

async function handleItemContainerClick(event) {
    const menuToggleButton = event.target.closest("[data-toggle-item-menu]");
    if (menuToggleButton) {
        event.preventDefault();
        event.stopPropagation();
        const itemId = String(menuToggleButton.dataset.toggleItemMenu);
        state.openItemMenuId = state.openItemMenuId === itemId ? null : itemId;
        syncItemActionMenus();
        elements.itemsContainer.querySelectorAll("[data-toggle-item-menu]").forEach(button => {
            button.setAttribute("aria-expanded", String(button.dataset.toggleItemMenu === state.openItemMenuId));
        });
        return;
    }

    const saveForLaterButton = event.target.closest("[data-save-item-later]");
    if (saveForLaterButton) {
        state.openItemMenuId = null;
        syncItemActionMenus();
        saveEditorItemForLater(saveForLaterButton.dataset.saveItemLater);
        return;
    }

    const removeButton = event.target.closest("[data-remove-item]");
    if (removeButton) {
        state.openItemMenuId = null;
        syncItemActionMenus();
        removeItem(removeButton.dataset.removeItem);
        return;
    }

    const removeImageButton = event.target.closest(".item-image-remove-btn");
    if (removeImageButton) {
        const itemRow = removeImageButton.closest(".item-row");
        if (itemRow) {
            itemRow.dataset.itemImageDataUrl = "";
            const imageInput = itemRow.querySelector(".item-image-input");
            if (imageInput) {
                imageInput.value = "";
            }
            syncItemImageUI(itemRow);
        }
        return;
    }

    const toggleButton = event.target.closest("[data-toggle-item]");
    if (toggleButton) {
        const item = elements.itemsContainer.querySelector(`[data-item-id="${toggleButton.dataset.toggleItem}"]`);
        if (item) {
            if (item.classList.contains("expanded")) {
                setExpandedItem(null);
            } else {
                setExpandedItem(item);
                focusItemPrimaryField(item);
            }
        }
    }
}

function handleItemEditorKeydown(event) {
    const target = event.target;
    const itemRow = target.closest(".item-row");
    if (!itemRow || event.key !== "Enter") {
        return;
    }

    if (target.classList.contains("item-description")) {
        if ((event.metaKey || event.ctrlKey) && !event.shiftKey) {
            event.preventDefault();
            addItem();
        }
        return;
    }

    if (!target.matches("input")) {
        return;
    }

    event.preventDefault();

    const sequence = [
        ".item-quantity",
        ".item-unit-price",
        ".item-total-price",
        ".item-internal-cost"
    ];
    const currentIndex = sequence.findIndex(selector => target.matches(selector));
    const nextSelector = currentIndex >= 0 ? sequence[currentIndex + 1] : null;

    if (nextSelector && (!target.matches(".item-total-price") || state.showInternalPricing)) {
        const nextField = itemRow.querySelector(nextSelector);
        if (nextField && !nextField.closest("[hidden]")) {
            nextField.focus();
            nextField.select?.();
            return;
        }
    }

    addItem();
}

async function handleItemImageInputChange(event) {
    const imageInput = event.target.closest(".item-image-input");
    if (!imageInput) {
        return;
    }

    const itemRow = imageInput.closest(".item-row");
    if (!itemRow) {
        return;
    }

    const file = imageInput.files?.[0] || null;
    if (!file) {
        itemRow.dataset.itemImageDataUrl = "";
        syncItemImageUI(itemRow);
        return;
    }

    try {
        itemRow.dataset.itemImageDataUrl = await readFileAsDataUrl(file);
        syncItemImageUI(itemRow);
        queueDraftAutosave();
    } catch (error) {
        itemRow.dataset.itemImageDataUrl = "";
        imageInput.value = "";
        syncItemImageUI(itemRow);
        window.alert(error.message || "Unable to read image.");
    }
}

function syncItemImageUI(row) {
    const imageDataUrl = row?.dataset?.itemImageDataUrl || "";
    const preview = row.querySelector(".item-image-preview");
    const previewImage = row.querySelector(".item-image-preview-img");
    const removeButton = row.querySelector(".item-image-remove-btn");
    const uploadButtonCopy = row.querySelector(".item-image-upload-copy small");

    if (!preview || !previewImage || !removeButton || !uploadButtonCopy) {
        return;
    }

    if (imageDataUrl) {
        preview.hidden = false;
        previewImage.src = imageDataUrl;
        removeButton.hidden = false;
        row.classList.add("has-item-image");
        uploadButtonCopy.textContent = "Change image";
    } else {
        preview.hidden = true;
        previewImage.removeAttribute("src");
        removeButton.hidden = true;
        row.classList.remove("has-item-image");
        uploadButtonCopy.textContent = "Add image";
    }

    const summaryThumbImage = row.querySelector(".item-summary-thumb-img");
    const summaryThumbFallback = row.querySelector(".item-summary-thumb-fallback");
    if (summaryThumbImage && summaryThumbFallback) {
        if (imageDataUrl) {
            summaryThumbImage.src = imageDataUrl;
            summaryThumbImage.hidden = false;
            summaryThumbFallback.hidden = true;
        } else {
            summaryThumbImage.removeAttribute("src");
            summaryThumbImage.hidden = true;
            summaryThumbFallback.hidden = false;
        }
    }
}

function handleItemsChange(event) {
    const activeRow = event?.target?.closest?.(".item-row") || null;
    const isInputEvent = event?.type === "input";
    const activeTarget = event?.target || null;

    if (activeRow && activeTarget?.classList?.contains("item-unit-price")) {
        activeRow.dataset.priceDriver = "unit";
    } else if (activeRow && activeTarget?.classList?.contains("item-total-price")) {
        activeRow.dataset.priceDriver = "total";
    }

    elements.itemsContainer.querySelectorAll(".item-row").forEach(row => {
        updateItemPricing(row, {
            sourceField: row === activeRow ? (
                activeTarget?.classList?.contains("item-unit-price")
                    ? "unit"
                    : activeTarget?.classList?.contains("item-total-price")
                        ? "total"
                        : activeTarget?.classList?.contains("item-quantity")
                            ? "quantity"
                            : null
            ) : null,
            preserveActiveInput: isInputEvent && row === activeRow
        });
        updateItemSummary(row);
    });
    calculateTotals();
    updateEditorSummary();
    queueDraftAutosave();
}

function updateItemPricing(row, options = {}) {
    const { sourceField = null, preserveActiveInput = false } = options;
    const quantity = parseFloat(row.querySelector(".item-quantity").value) || 0;
    const totalPriceInput = row.querySelector(".item-total-price");
    const unitPriceInput = row.querySelector(".item-unit-price");
    let totalPrice = parseFloat(totalPriceInput.value) || 0;
    let unitPrice = parseDecimalInput(unitPriceInput.value);
    const driver = sourceField === "quantity"
        ? (row.dataset.priceDriver || "total")
        : (sourceField || row.dataset.priceDriver || "total");

    row.dataset.priceDriver = driver;

    if (driver === "unit") {
        totalPrice = unitPrice * quantity;
        if (!preserveActiveInput || sourceField !== "total") {
            totalPriceInput.value = totalPrice.toFixed(2);
        }
    } else {
        unitPrice = quantity > 0 ? totalPrice / quantity : 0;
        if (!preserveActiveInput || sourceField !== "unit") {
            unitPriceInput.value = unitPrice.toFixed(2);
        }
    }

    updateItemInternalMetrics(row);
}

function updateItemSummary(row) {
    const description = row.querySelector(".item-description").value.trim();
    const quantity = parseFloat(row.querySelector(".item-quantity").value) || 0;
    const totalPrice = parseFloat(row.querySelector(".item-total-price").value) || 0;
    const unitPrice = parseDecimalInput(row.querySelector(".item-unit-price").value);
    const upchargePercent = row.querySelector(".item-upcharge-percent").value;
    const title = description || "New line item";
    const compactTitle = title.length > 72 ? `${title.slice(0, 69)}...` : title;
    const summaryMeta = `Qty ${quantity || 0} | Unit ${formatCurrency(unitPrice)} | Total ${formatCurrency(totalPrice)}${state.showInternalPricing ? ` | Upcharge ${upchargePercent}` : ""}`;

    row.querySelector(".item-summary-title").textContent = compactTitle;
    row.querySelector(".item-summary-meta").textContent = summaryMeta;
    const qtyNode = row.querySelector(".item-summary-qty");
    const unitNode = row.querySelector(".item-summary-unit");
    const totalNode = row.querySelector(".item-summary-total");
    if (qtyNode) {
        qtyNode.textContent = String(quantity || 0);
    }
    if (unitNode) {
        unitNode.textContent = formatCurrency(unitPrice);
    }
    if (totalNode) {
        totalNode.textContent = formatCurrency(totalPrice);
    }
}

function documentHasItemImages(doc) {
    return Array.isArray(doc?.items) && doc.items.some(item => Boolean(item?.itemImageDataUrl));
}

function buildDocumentItemsTable(doc) {
    const hasItemImages = documentHasItemImages(doc);
    const itemsHTML = doc.items.map((item, index) => {
        const quantity = item.quantity ?? "-";
        const lineTotal = item.totalPrice ?? ((parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)).toFixed(2);
        const unitPrice = item.unitPrice ?? (parseFloat(item.quantity) > 0
            ? ((parseFloat(lineTotal) || 0) / (parseFloat(item.quantity) || 1)).toFixed(2)
            : "0.00");
        const formattedUnitPrice = `$${formatAmount(unitPrice)}`;
        const formattedLineTotal = formatAmount(lineTotal);

        return `
            <tr>
                <td class="document-item-col-no">${escapeHtml(item.itemNo || index + 1)}</td>
                ${hasItemImages ? `
                <td class="document-item-col-image">
                    ${item.itemImageDataUrl
                        ? `<div class="document-item-thumb"><img src="${escapeHtml(item.itemImageDataUrl)}" alt="${escapeHtml(item.description || `Item ${index + 1}`)}"></div>`
                        : `<div class="document-item-thumb document-item-thumb-empty" aria-hidden="true"></div>`}
                </td>` : ""}
                <td class="document-item-col-description">${escapeHtml(item.description || "")}</td>
                <td class="document-item-col-qty">${escapeHtml(quantity)}</td>
                <td class="document-item-col-unit">${escapeHtml(formattedUnitPrice)}</td>
                <td class="document-item-col-total">${escapeHtml(formattedLineTotal)}</td>
            </tr>
        `;
    }).join("");

    return `
        <table class="document-items${hasItemImages ? " has-item-images" : ""}">
            <colgroup>
                <col class="document-items-col-no">
                ${hasItemImages ? '<col class="document-items-col-image">' : ""}
                <col class="document-items-col-description">
                <col class="document-items-col-qty">
                <col class="document-items-col-unit">
                <col class="document-items-col-total">
            </colgroup>
            <thead>
                <tr>
                    <th class="document-item-col-no">Item no.</th>
                    ${hasItemImages ? '<th class="document-item-col-image">Image</th>' : ""}
                    <th class="document-item-col-description">Item Description:</th>
                    <th class="document-item-col-qty">Quantity:</th>
                    <th class="document-item-col-unit">Unit Price<br>$USD</th>
                    <th class="document-item-col-total">Total Price<br>$USD</th>
                </tr>
            </thead>
            <tbody>
                ${itemsHTML}
            </tbody>
        </table>
    `;
}

function updateItemInternalMetrics(row) {
    const totalPrice = parseFloat(row.querySelector(".item-total-price").value) || 0;
    const internalCost = parseFloat(row.querySelector(".item-internal-cost").value) || 0;
    const upchargeField = row.querySelector(".item-upcharge-percent");

    if (internalCost <= 0) {
        upchargeField.value = "0.00%";
        return;
    }

    const markupPercent = ((totalPrice - internalCost) / internalCost) * 100;
    upchargeField.value = `${formatAmount(markupPercent)}%`;
}

function refreshItemOrdering() {
    elements.itemsContainer.querySelectorAll(".item-row").forEach((row, index) => {
        row.querySelector(".item-number").textContent = `Item #${index + 1}`;
        const thumbFallback = row.querySelector(".item-summary-thumb-fallback");
        if (thumbFallback) {
            thumbFallback.textContent = String(index + 1);
        }
        updateItemSummary(row);
    });
}

function setExpandedItem(targetRow) {
    elements.itemsContainer.querySelectorAll(".item-row").forEach(row => {
        const isTarget = row === targetRow;
        row.classList.toggle("expanded", isTarget);
        const toggle = row.querySelector(".item-summary-toggle");
        if (toggle) {
            toggle.setAttribute("aria-expanded", String(isTarget));
        }
        const actionLabel = row.querySelector(".item-edit-label");
        if (actionLabel) {
            actionLabel.textContent = isTarget ? "Done" : "Edit Item";
        }
    });
    if (targetRow) {
        targetRow.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
}

function calculateTotals() {
    let subtotal = 0;
    elements.itemsContainer.querySelectorAll(".item-row").forEach(row => {
        const totalPrice = parseFloat(row.querySelector(".item-total-price").value) || 0;
        subtotal += totalPrice;
    });
    return subtotal;
}

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function formatDisplayDate(dateValue) {
    if (!dateValue) {
        return "";
    }

    const normalizedValue = String(dateValue).trim();
    const dateOnlyMatch = normalizedValue.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const parsedDate = dateOnlyMatch
        ? new Date(Number(dateOnlyMatch[1]), Number(dateOnlyMatch[2]) - 1, Number(dateOnlyMatch[3]))
        : new Date(normalizedValue);

    return parsedDate.toLocaleDateString(getCurrentLocale(), {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

function formatPrintedDate(dateValue = new Date()) {
    return new Date(dateValue).toLocaleDateString(getCurrentLocale(), {
        year: "numeric",
        month: "short",
        day: "numeric"
    });
}

function getLetterheadUrl() {
    return new URL("assets/rg-letterhead.png", window.location.href).href;
}

function getSignatureUrl() {
    if (state.companyProfile?.signatureDataUrl) {
        return state.companyProfile.signatureDataUrl;
    }
    const url = new URL("assets/david-forman-signature.png", window.location.href);
    url.searchParams.set("v", "20260328-1434");
    return url.href;
}

function getStampUrl() {
    if (state.companyProfile?.stampDataUrl) {
        return state.companyProfile.stampDataUrl;
    }
    const url = new URL("assets/gonzalez-logistics-stamp.svg", window.location.href);
    url.searchParams.set("v", "20260408-2300");
    return url.href;
}

function getStampStyle(seedText = "") {
    const offsets = [
        { x: -22, y: 4, rotate: -13 },
        { x: 26, y: -5, rotate: 9 },
        { x: -8, y: 20, rotate: -7 },
        { x: 32, y: 8, rotate: 15 },
        { x: -28, y: -3, rotate: -11 },
        { x: 16, y: 26, rotate: 6 },
        { x: -12, y: -7, rotate: -17 },
        { x: 22, y: 32, rotate: 12 },
        { x: -18, y: 14, rotate: -9 },
        { x: 6, y: -9, rotate: 19 },
        { x: 34, y: 18, rotate: -14 },
        { x: -30, y: 10, rotate: 8 },
    ];
    const normalizedSeed = String(seedText || "").trim();
    if (!normalizedSeed) {
        const choice = offsets[Math.floor(Math.random() * offsets.length)];
        return `left: calc(50% + ${choice.x}px); bottom: ${choice.y}px; transform: translateX(-50%) rotate(${choice.rotate}deg);`;
    }

    let hash = 0;
    for (let index = 0; index < normalizedSeed.length; index += 1) {
        hash = ((hash * 31) + normalizedSeed.charCodeAt(index)) >>> 0;
    }

    const choice = offsets[hash % offsets.length];
    return `left: calc(50% + ${choice.x}px); bottom: ${choice.y}px; transform: translateX(-50%) rotate(${choice.rotate}deg);`;
}

function getDocumentStampStyle(doc) {
    if (!doc) {
        return getStampStyle();
    }

    return getStampStyle([
        doc.type,
        doc.refNumber,
        doc.date,
        doc.clientName,
        doc.total,
        doc.includeStamp ? "stamp" : "no-stamp"
    ].join("|"));
}

function getFooterWaveUrl() {
    return new URL("assets/rg-footer-wave.png", window.location.href).href;
}

function buildDocumentData() {
    const items = [];

    elements.itemsContainer.querySelectorAll(".item-row").forEach((row, index) => {
        const quantity = parseFloat(row.querySelector(".item-quantity").value) || 0;
        const totalPrice = parseFloat(row.querySelector(".item-total-price").value) || 0;
        const internalCost = parseFloat(row.querySelector(".item-internal-cost").value) || 0;
        const unitPrice = parseDecimalInput(row.querySelector(".item-unit-price").value);
        items.push({
            itemNo: index + 1,
            description: row.querySelector(".item-description").value.trim(),
            quantity: row.querySelector(".item-quantity").value || "-",
            unitPrice: unitPrice.toFixed(2),
            totalPrice: totalPrice.toFixed(2),
            totalPriceDop: "0.00",
            internalCost: internalCost.toFixed(2),
            upchargePercent: internalCost > 0 ? (((totalPrice - internalCost) / internalCost) * 100).toFixed(2) : "0.00",
            usesDopTotal: false,
            manualUnitPrice: row.dataset.priceDriver === "unit",
            itemImageDataUrl: row.dataset.itemImageDataUrl || ""
        });
    });

    const subtotal = calculateTotals();

    return {
        type: elements.docType.value,
        refNumber: elements.refNumber.value,
        date: elements.docDate.value,
        clientName: elements.clientName.value,
        clientAddress: elements.clientAddress.value,
        consigneeName: elements.consigneeName.value,
        consigneeAddress: elements.consigneeAddress.value,
        poNumber: elements.poNumber.value || "N/A",
        tags: parseTags(elements.docTags.value),
        notes: elements.notes.value,
        paymentTerms: elements.paymentTerms.value,
        includeSignature: elements.includeSignature.checked,
        includeStamp: elements.includeStamp.checked,
        printedAt: elements.docDate.value ? `${elements.docDate.value}T12:00:00.000Z` : new Date().toISOString(),
        subtotal,
        total: subtotal,
        items
    };
}

function buildDocumentMarkup(doc, stampStyle, options = {}) {
    const { printPreview = false } = options;
    const documentTitle = doc.type === "quote" ? "Quote" : "Invoice";
    const referenceLabel = doc.type === "quote" ? "Reference No." : `${documentTitle} Reference`;
    const primaryPartyLabel = doc.type === "quote" ? "For:" : "Bill To:";
    const showConsignee = doc.type !== "quote";
    const showPoNumber = hasMeaningfulPoNumber(doc.poNumber);
    const safeNotes = doc.notes && doc.notes.trim()
        ? escapeHtml(doc.notes.trim())
        : "<em>*No additional notes provided.</em>";
    const resolvedStampStyle = stampStyle || getDocumentStampStyle(doc);
    const sheetClassName = ["document-sheet", printPreview ? "print-preview-sheet" : ""]
        .filter(Boolean)
        .join(" ");

    return `
        <div class="${sheetClassName}">
            <div class="letterhead">
                <img class="letterhead-image" src="${escapeHtml(getLetterheadUrl())}" alt="Todos Logistics letterhead">
            </div>

            <div class="document-title">${documentTitle}</div>

            <div class="document-body">
            <div class="document-meta">
                <div><strong>${referenceLabel}</strong> ${escapeHtml(doc.refNumber)}</div>
                <div><strong>Date:</strong> <span class="meta-date-value">${escapeHtml(formatDisplayDate(doc.date))}</span></div>
            </div>

            <div class="document-parties">
                <div class="party-card">
                    <div class="issued-to-label"><strong>${primaryPartyLabel}</strong></div>
                    <div class="issued-to-value">
                        ${escapeHtml(doc.clientName)}<br>
                        ${escapeHtml(doc.clientAddress).replace(/\n/g, "<br>")}
                    </div>
                </div>
                ${showConsignee ? `<div class="party-card">
                    <div class="issued-to-label"><strong>Consignee:</strong></div>
                    <div class="issued-to-value compact-party-value">
                        ${doc.consigneeName || doc.consigneeAddress
                            ? `${escapeHtml(doc.consigneeName || "Consignee pending")}${doc.consigneeAddress ? `<br>${escapeHtml(doc.consigneeAddress).replace(/\n/g, "<br>")}` : ""}`
                            : "<em>Not provided</em>"}
                    </div>
                </div>` : ""}
                ${showPoNumber ? `<div class="party-card po-card"><span class="po-label">Purchase Order Number:</span> ${escapeHtml(doc.poNumber)}</div>` : ""}
            </div>

            ${buildDocumentItemsTable(doc)}

            <div class="document-divider"></div>

            <div class="document-notes">
                <div class="notes-label"><strong>Notes:</strong></div>
                <div class="document-notes-content">${safeNotes}</div>
            </div>

            <div class="document-bottom">
                <div class="document-terms">
                    <span class="terms-label"><strong>Terms of Payment:</strong></span>
                    ${escapeHtml(doc.paymentTerms || DEFAULT_PAYMENT_TERMS)}
                </div>

                <table class="document-totals">
                    <colgroup>
                        <col style="width: 58%;">
                        <col style="width: 42%;">
                    </colgroup>
                    <tr>
                        <td>Subtotal</td>
                        <td>USD $ ${escapeHtml(formatAmount(doc.subtotal))}</td>
                    </tr>
                    <tr>
                        <td>ITBIS (TAX)</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td><strong>Grand Total</strong></td>
                        <td><strong>USD $ ${escapeHtml(formatAmount(doc.total))}</strong></td>
                    </tr>
                </table>
            </div>

            ${doc.includeSignature === false ? "" : `
            <div class="document-signatures">
                <div class="signature-block">
                    <div class="signature-row">
                        <span class="signature-label">Approved By:</span>
                        <span class="signature-line">
                            <span class="line-fill approved-by-name">David Forman</span>
                        </span>
                    </div>
                    <div class="signature-row signature-image-row">
                        <span class="signature-label">Signature:</span>
                        <span class="signature-line signature-image-line">
                            <span class="line-fill">
                                <img
                                    class="signature-image"
                                    src="${escapeHtml(getSignatureUrl())}"
                                    alt="David Forman signature"
                                    onerror="this.closest('.line-fill').innerHTML = '&nbsp;';"
                                >
                            </span>
                        </span>
                    </div>
                    ${doc.includeStamp ? `
                    <img
                        class="signature-stamp"
                        src="${escapeHtml(getStampUrl())}"
                        alt="Company stamp"
                        style="${escapeHtml(resolvedStampStyle)}"
                    >
                    ` : ""}
                </div>
            </div>
            `}
            </div>

            <img class="footer-wave" src="${escapeHtml(getFooterWaveUrl())}" alt="" aria-hidden="true">
        </div>
    `;
}

function buildLineItemsPreviewMarkup(doc) {
    const safeNotes = doc.notes && doc.notes.trim()
        ? escapeHtml(doc.notes.trim())
        : "<em>*No additional notes provided.</em>";

    return `
        <div class="document-sheet line-items-review-sheet">
            ${buildDocumentItemsTable(doc)}

            <div class="document-divider"></div>

            <div class="document-notes">
                <div class="notes-label"><strong>Notes:</strong></div>
                <div class="document-notes-content">${safeNotes}</div>
            </div>

            <div class="document-bottom line-items-review-bottom">
                <div class="document-terms">
                    <span class="terms-label"><strong>Terms of Payment:</strong></span>
                    ${escapeHtml(doc.paymentTerms || DEFAULT_PAYMENT_TERMS)}
                </div>

                <table class="document-totals">
                    <colgroup>
                        <col style="width: 58%;">
                        <col style="width: 42%;">
                    </colgroup>
                    <tr>
                        <td>Subtotal</td>
                        <td>USD $ ${escapeHtml(formatAmount(doc.subtotal))}</td>
                    </tr>
                    <tr>
                        <td>ITBIS (TAX)</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td><strong>Grand Total</strong></td>
                        <td><strong>USD $ ${escapeHtml(formatAmount(doc.total))}</strong></td>
                    </tr>
                </table>
            </div>
        </div>
    `;
}

function generatePreviews() {
    const doc = buildDocumentData();
    const stampStyle = getDocumentStampStyle(doc);
    if (elements.lineItemsPreviewContainer) {
        elements.lineItemsPreviewContainer.innerHTML = buildLineItemsPreviewMarkup(doc);
    }
    elements.previewContainer.innerHTML = shouldUseMobilePreviewLauncher()
        ? buildMobilePreviewLauncherMarkup(doc)
        : buildDocumentMarkup(doc, stampStyle, { printPreview: true });
}

function shouldUseMobilePreviewLauncher() {
    return isMobileViewport() && state.currentStep === getTotalSteps();
}

function buildMobilePreviewLauncherMarkup(doc) {
    const documentLabel = doc.type === "quote" ? "quote" : "invoice";

    return `
        <div class="mobile-preview-launcher-card">
            <span class="mobile-preview-launcher-kicker">Print-ready preview</span>
            <h6>Open the ${escapeHtml(documentLabel)} in a separate preview.</h6>
            <p>The preview uses the same layout and content that will be printed or saved as PDF.</p>
            <div class="mobile-preview-launcher-meta">
                <span>${escapeHtml(doc.refNumber || "Reference pending")}</span>
                <span>${escapeHtml(formatDisplayDate(doc.date) || "Date pending")}</span>
            </div>
            <button class="btn btn-secondary" type="button" data-open-preview-window="true">Open Print Preview</button>
        </div>
    `;
}

function getPrintStylesMarkup() {
    return Array.from(document.styleSheets).map(styleSheet => {
        try {
            const rules = Array.from(styleSheet.cssRules || []).map(rule => rule.cssText).join("\n");
            return `<style>${rules}</style>`;
        } catch (error) {
            return "";
        }
    }).join("\n");
}

function createPrintWindow(doc) {
    const printWindow = window.open("", "_blank", "width=1024,height=900");
    if (!printWindow) {
        alert("Please allow pop-ups to export the PDF.");
        return null;
    }

    const documentTitle = `${doc.type === "quote" ? "Quote" : "Invoice"} ${doc.refNumber || "Preview"}`;
    printWindow.document.open();
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${escapeHtml(documentTitle)}</title>
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

                .print-preview-loading {
                    display: grid;
                    gap: 0.7rem;
                    justify-items: center;
                    padding: 2rem;
                    text-align: center;
                }

                .print-preview-loading strong {
                    font-size: 1rem;
                }

                .print-preview-loading span {
                    color: #5b6b81;
                    font-size: 0.92rem;
                }
            </style>
        </head>
        <body>
            <div class="print-preview-loading">
                <strong>Preparing preview</strong>
                <span>${escapeHtml(documentTitle)}</span>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
    return printWindow;
}

function openPrintWindow(doc, existingWindow = null) {
    const printWindow = existingWindow || createPrintWindow(doc);
    if (!printWindow) {
        return null;
    }

    const stampStyle = getDocumentStampStyle(doc);
    const docId = String(doc.id);
    printWindow.document.open();
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${escapeHtml((doc.type === "quote" ? "Quote" : "Invoice") + " " + doc.refNumber)}</title>
            ${getPrintStylesMarkup()}
            <style>
                .pdf-preview-toolbar {
                    position: sticky;
                    top: 0;
                    z-index: 20;
                    display: flex;
                    justify-content: flex-end;
                    gap: 0.75rem;
                    padding: 0.9rem 1rem;
                    background: rgba(245, 247, 250, 0.96);
                    border-bottom: 1px solid #d8e0e8;
                    backdrop-filter: blur(10px);
                }

                .pdf-preview-toolbar button {
                    border: 0;
                    border-radius: 999px;
                    padding: 0.7rem 1rem;
                    font: inherit;
                    font-weight: 700;
                    cursor: pointer;
                    background: #1d4ed8;
                    color: white;
                }

                .pdf-preview-toolbar button.secondary {
                    background: #e7eef6;
                    color: #28415b;
                }

                .pdf-preview-toolbar button.edit {
                    background: rgba(20, 89, 217, 0.1);
                    color: #1459d9;
                    border: 1px solid rgba(20, 89, 217, 0.16);
                }

                .print-preview-sheet {
                    min-height: 100vh;
                }

                @media print {
                    @page { size: auto; margin: 0; }
                    .pdf-preview-toolbar {
                        display: none !important;
                    }
                }
            </style>
        </head>
        <body class="print-window">
            <div class="pdf-preview-toolbar">
                <button class="secondary" type="button" onclick="window.close()">Close Preview</button>
                <button class="edit" type="button" onclick="if (window.opener && !window.opener.closed && typeof window.opener.editDocument === 'function') { window.opener.focus(); window.opener.editDocument('${docId}'); window.close(); }">Edit</button>
                <button type="button" onclick="window.print()">Print</button>
            </div>
            <div id="previewContainer" class="preview-container">${buildDocumentMarkup(doc, stampStyle, { printPreview: true })}</div>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    return printWindow;
}

function handlePreviewContainerClick(event) {
    const previewButton = event.target.closest("[data-open-preview-window]");
    if (!previewButton) {
        return;
    }

    openPrintWindow(buildDocumentData());
}

async function persistDocument(options = {}) {
    const {
        exportAfterSave = false,
        silent = false,
        keepOpen = false,
        forceDraft = false,
        previewWindow = null
    } = options;
    const isEditing = state.editingDocumentId !== null;
    const existingDocument = isEditing ? getDocumentById(state.editingDocumentId) : null;
    const nextStatus = exportAfterSave
        ? "logged"
        : (forceDraft ? "draft" : (existingDocument?.status === "logged" ? "logged" : "draft"));
    const doc = {
        ...(existingDocument || {}),
        id: state.editingDocumentId ?? Date.now(),
        type: elements.docType.value,
        status: nextStatus,
        paymentStatus: elements.docType.value === "invoice"
            ? normalizePaymentStatus(existingDocument?.paymentStatus)
            : null,
        refNumber: elements.refNumber.value,
        date: elements.docDate.value,
        clientName: elements.clientName.value,
        clientAddress: elements.clientAddress.value,
        consigneeName: elements.consigneeName.value,
        consigneeAddress: elements.consigneeAddress.value,
        poNumber: elements.poNumber.value,
        tags: parseTags(elements.docTags.value),
        notes: elements.notes.value,
        paymentTerms: elements.paymentTerms.value,
        includeSignature: elements.includeSignature.checked,
        includeStamp: elements.includeStamp.checked,
        createdBy: existingDocument?.createdBy || (state.currentUser ? {
            userId: state.currentUser.userId,
            username: state.currentUser.username,
            displayName: state.currentUser.displayName,
            role: state.currentUser.role
        } : null),
        printedAt: elements.docDate.value ? `${elements.docDate.value}T12:00:00.000Z` : (existingDocument?.printedAt || new Date().toISOString()),
        items: [],
        subtotal: 0,
        total: 0
    };

    elements.itemsContainer.querySelectorAll(".item-row").forEach(row => {
        const qty = parseFloat(row.querySelector(".item-quantity").value) || 0;
        const totalPrice = parseFloat(row.querySelector(".item-total-price").value) || 0;
        const internalCost = parseFloat(row.querySelector(".item-internal-cost").value) || 0;
        const unitPrice = parseDecimalInput(row.querySelector(".item-unit-price").value);
        doc.items.push({
            description: row.querySelector(".item-description").value,
            quantity: qty,
            price: unitPrice,
            unitPrice,
            totalPrice,
            totalPriceDop: 0,
            internalCost,
            upchargePercent: internalCost > 0 ? (((totalPrice - internalCost) / internalCost) * 100) : 0,
            usesDopTotal: false,
            manualUnitPrice: row.dataset.priceDriver === "unit",
            itemImageDataUrl: row.dataset.itemImageDataUrl || ""
        });
    });

    doc.subtotal = calculateTotals();
    doc.total = doc.subtotal;

    let nextDocuments;

    if (isEditing) {
        nextDocuments = state.documents.map(entry => isSameDocumentId(entry.id, state.editingDocumentId) ? doc : entry);
    } else {
        if (state.convertingFromQuoteId !== null) {
            // When converting from a quote, update the quote in-place to become an invoice
            // This transforms the quote directly instead of creating a separate locked record
            const sourceQuoteIndex = state.documents.findIndex(entry => isSameDocumentId(entry.id, state.convertingFromQuoteId));
            if (sourceQuoteIndex !== -1) {
                // Update the original quote document to be the invoice
                doc.id = state.convertingFromQuoteId;
                nextDocuments = state.documents.map((entry, index) => index === sourceQuoteIndex ? doc : entry);
                state.editingDocumentId = state.convertingFromQuoteId;
            } else {
                nextDocuments = [doc, ...state.documents];
            }
        } else {
            nextDocuments = [doc, ...state.documents];
        }
    }

    try {
        await saveDocumentsToServer(nextDocuments);
        state.editingDocumentId = doc.id;
        renderDocuments();
        recordActivity(
            exportAfterSave ? "exported document" : (isEditing ? "updated document" : "created document"),
            `${doc.type === "quote" ? "Quote" : "Invoice"} ${doc.refNumber} for ${doc.clientName || "unknown client"}.`
        );
    } catch (error) {
        if (previewWindow && !previewWindow.closed) {
            previewWindow.close();
        }
        if (!silent) {
            alert(`Unable to save this ${doc.type} to the server.\n\n${error.message}`);
        }
        return;
    }

    if (keepOpen) {
        updateEditorSummary();
        return;
    }

    closeModal();
    const actionLabel = isEditing ? "updated" : "saved";
    if (exportAfterSave) {
        openPrintWindow(doc, previewWindow);
        if (!silent) {
            alert(`${doc.type === "quote" ? "Quote" : "Invoice"} ${actionLabel} successfully.\n\nA PDF preview has opened in a new window. Print only if you want to from there.`);
        }
        return;
    }

    if (!silent) {
        alert(`${doc.type === "quote" ? "Quote" : "Invoice"} ${actionLabel} successfully.`);
    }
}

async function saveDocumentOnly() {
    if (!validateDocumentForSave()) {
        return;
    }
    await persistDocument({ exportAfterSave: false });
}

async function saveAndExportDocument() {
    if (!validateDocumentForSave()) {
        return;
    }
    const previewWindow = createPrintWindow(buildDocumentData());
    await persistDocument({
        exportAfterSave: true,
        previewWindow
    });
}

function validateDocumentForSave() {
    if (!elements.refNumber.value.trim()) {
        alert("Please enter a reference number.");
        goToStep(1);
        return false;
    }

    if (!elements.docDate.value) {
        alert("Please choose a document date.");
        goToStep(1);
        return false;
    }

    if (!elements.clientName.value.trim()) {
        alert("Please enter client name");
        goToStep(2);
        return false;
    }

    const normalizedRefNumber = String(elements.refNumber.value || "").trim().toUpperCase();
    const duplicateRefDocument = state.documents.find(entry => {
        if (state.editingDocumentId !== null && isSameDocumentId(entry.id, state.editingDocumentId)) {
            return false;
        }
        return String(entry.refNumber || "").trim().toUpperCase() === normalizedRefNumber;
    });
    if (normalizedRefNumber && duplicateRefDocument) {
        alert(`Reference number ${normalizedRefNumber} is already being used by another document. Open that record and change its type instead of creating a duplicate.`);
        goToStep(1);
        return false;
    }

    if (elements.itemsContainer.querySelectorAll(".item-row").length === 0) {
        alert("Please add at least one item");
        goToStep(3);
        return false;
    }

    return true;
}

function isMobileOverviewViewport() {
    return window.innerWidth <= 640;
}

function syncMobileOverviewState() {
    if (!elements.overviewPanel || !elements.overviewMobileToggle || !elements.workspaceHero) {
        return;
    }

    const isMobile = isMobileOverviewViewport();
    if (!isMobile) {
        elements.overviewMobileToggle.hidden = true;
        elements.overviewPanel.hidden = false;
        elements.workspaceHero.classList.remove("workspace-hero-collapsed");
        return;
    }

    elements.overviewMobileToggle.hidden = false;
    elements.overviewPanel.hidden = false;
    elements.workspaceHero.classList.remove("workspace-hero-collapsed");
}

function toggleMobileOverview() {
    if (!isMobileOverviewViewport()) {
        return;
    }

    toggleValueView();
    if (elements.overviewMobileToggle) {
        elements.overviewMobileToggle.classList.remove("is-pulsing");
        void elements.overviewMobileToggle.offsetWidth;
        elements.overviewMobileToggle.classList.add("is-pulsing");
    }
}

function updateOverviewStats() {
    const quoteCount = state.documents.filter(doc => doc.type === "quote").length;
    const invoiceCount = state.documents.filter(doc => doc.type === "invoice").length;
    const pipelineValue = state.documents
        .filter(doc => doc.type === "quote")
        .reduce((sum, doc) => sum + Number(doc.total || 0), 0);
    const invoicedValue = state.documents
        .filter(doc => doc.type === "invoice")
        .reduce((sum, doc) => sum + Number(doc.total || 0), 0);
    const incomeValue = state.documents
        .filter(doc => doc.type === "invoice" && doc.paymentStatus === "paid")
        .reduce((sum, doc) => sum + Number(doc.total || 0), 0);
    const totalValue = state.valueView === "invoiced"
        ? invoicedValue
        : state.valueView === "income"
            ? incomeValue
            : pipelineValue;
    const currentLabelKey = state.valueView === "invoiced"
        ? "amount_invoiced"
        : state.valueView === "income"
            ? "income_received"
            : "pipeline_value";
    const nextHintKey = state.valueView === "pipeline"
        ? "tap_view_invoiced"
        : state.valueView === "invoiced"
            ? "tap_view_income"
            : "tap_view_pipeline";

    elements.totalDocumentsStat.textContent = String(state.documents.length);
    elements.quoteCountStat.textContent = String(quoteCount);
    elements.totalValueStat.textContent = formatCurrency(totalValue);
    elements.totalValueLabel.textContent = t(currentLabelKey);
    elements.totalValueHint.textContent = t(nextHintKey);
    elements.valueToggleCard.setAttribute("aria-pressed", String(state.valueView !== "pipeline"));
    elements.valueToggleCard.classList.toggle("is-invoiced", state.valueView === "invoiced");
    elements.valueToggleCard.classList.toggle("is-income", state.valueView === "income");
    if (elements.overviewMobileToggleValue && elements.overviewMobileToggleMeta) {
        elements.overviewMobileToggleValue.textContent = formatCurrency(totalValue);
        elements.overviewMobileToggleMeta.textContent = `${state.documents.length} ${t("documents").toLowerCase()} • ${quoteCount} ${t("quotes").toLowerCase()} • ${invoiceCount} ${t("invoices").toLowerCase()}`;
        if (elements.overviewMobileToggleLabel) {
            elements.overviewMobileToggleLabel.textContent = t(currentLabelKey);
        }
    }
    syncMobileOverviewState();
}

function toggleValueView() {
    state.valueView = state.valueView === "pipeline"
        ? "invoiced"
        : state.valueView === "invoiced"
            ? "income"
            : "pipeline";
    updateOverviewStats();
    elements.valueToggleCard.classList.remove("is-pulsing");
    void elements.valueToggleCard.offsetWidth;
    elements.valueToggleCard.classList.add("is-pulsing");
}

function getFilteredDocuments() {
    return state.documents.filter(doc => {
        const matchesType = state.activeFilter === "all" || doc.type === state.activeFilter;
        const rawDate = String(doc.date || "");
        const formattedDate = formatDisplayDate(doc.date || "");
        const tags = Array.isArray(doc.tags) ? doc.tags.join(" ") : "";
        const haystack = `${doc.refNumber} ${doc.clientName} ${doc.type} ${rawDate} ${formattedDate} ${tags}`.toLowerCase();
        const matchesSearch = !state.searchQuery || haystack.includes(state.searchQuery);
        return matchesType && matchesSearch;
    }).sort((left, right) => compareDocuments(left, right, state.sortOrder));
}

function compareDocuments(left, right, sortOrder) {
    // Check if we're sorting by ref number date
    if (sortOrder === "ref_date_desc" || sortOrder === "ref_date_asc") {
        const leftRefInfo = getDocumentRefInfo(left);
        const rightRefInfo = getDocumentRefInfo(right);

        // If both have ref info, sort by date first, then by sequence
        if (leftRefInfo && rightRefInfo) {
            const direction = sortOrder.endsWith("_desc") ? 1 : -1;

            // Sort by date first (newest first by default)
            if (leftRefInfo.date !== rightRefInfo.date) {
                return (rightRefInfo.date - leftRefInfo.date) * direction;
            }

            // Same date, sort by sequence (highest first)
            if (leftRefInfo.sequence !== rightRefInfo.sequence) {
                return (rightRefInfo.sequence - leftRefInfo.sequence) * direction;
            }
        }

        // If one has ref info and the other doesn't, prioritize the one with ref info
        if (leftRefInfo && !rightRefInfo) return -1;
        if (!leftRefInfo && rightRefInfo) return 1;
    }

    // Fall back to original date sorting logic
    const isDateSort = sortOrder.startsWith("date_");
    const leftTimestamp = isDateSort ? getDocumentDateAt(left) : getDocumentCreatedAt(left);
    const rightTimestamp = isDateSort ? getDocumentDateAt(right) : getDocumentCreatedAt(right);
    const direction = sortOrder.endsWith("_asc") ? 1 : -1;

    if (leftTimestamp !== rightTimestamp) {
        return (leftTimestamp - rightTimestamp) * direction;
    }

    const leftRefInfo = getDocumentRefInfo(left);
    const rightRefInfo = getDocumentRefInfo(right);
    if (leftRefInfo && rightRefInfo && leftRefInfo.prefix === rightRefInfo.prefix && leftRefInfo.sequence !== rightRefInfo.sequence) {
        return (leftRefInfo.sequence - rightRefInfo.sequence) * direction;
    }

    const leftCreatedAt = getDocumentCreatedAt(left);
    const rightCreatedAt = getDocumentCreatedAt(right);
    if (leftCreatedAt !== rightCreatedAt) {
        return (leftCreatedAt - rightCreatedAt) * direction;
    }

    return String(left.refNumber || left.id || "").localeCompare(String(right.refNumber || right.id || "")) * direction;
}

function getDocumentRefInfo(doc) {
    const refNumber = String(doc?.refNumber || "").trim().toUpperCase();
    const parentheticalMatch = refNumber.match(/^TL-(\d{4})\s*\((\d{2})\/(\d{2})\)-DOC\s*(\d+)$/);
    const compactMatch = refNumber.match(/^TL-(\d{4})-(\d{2})(\d{2})-(\d+)$/);
    const match = parentheticalMatch || compactMatch;
    if (!match) {
        return null;
    }

    const [, year, month, day, sequenceText] = match;
    const refYear = Number.parseInt(year, 10);
    const refMonth = Number.parseInt(month, 10);
    const refDay = Number.parseInt(day, 10);
    const sequence = Number.parseInt(sequenceText, 10);
    if (!Number.isInteger(refYear) || !Number.isInteger(refMonth) || !Number.isInteger(refDay) || !Number.isInteger(sequence)) {
        return null;
    }

    const refDate = new Date(refYear, refMonth - 1, refDay);
    if (Number.isNaN(refDate.getTime())) {
        return null;
    }

    return {
        prefix: `TL-${refYear}-${String(refMonth).padStart(2, "0")}${String(refDay).padStart(2, "0")}`,
        sequence: sequence,
        date: refDate.getTime(),
        year: refYear,
        month: refMonth,
        day: refDay
    };
}

function getDocumentTagPreviewMarkup(doc) {
    const tags = Array.isArray(doc?.tags) ? doc.tags.filter(Boolean) : [];
    if (!tags.length) {
        return "";
    }

    const visibleTags = tags.slice(0, 5);
    const hiddenCount = tags.length - visibleTags.length;

    return `
        <div class="doc-tags">
            ${visibleTags.map(tag => `<span class="doc-tag">${escapeHtml(tag)}</span>`).join("")}
            ${hiddenCount > 0
                ? `<button type="button" class="doc-tag doc-tag-more" data-show-tags="${escapeHtml(String(doc.id))}" aria-label="Show all keywords for ${escapeHtml(doc.refNumber || "this document")}">+${hiddenCount}...</button>`
                : ""}
        </div>
    `;
}

function getDocumentDateAt(doc) {
    const parsed = Date.parse(doc.date);
    if (!Number.isNaN(parsed)) {
        return parsed;
    }

    return getDocumentCreatedAt(doc);
}

function getDocumentCreatedAt(doc) {
    const candidates = [doc.printedAt, doc.createdAt, doc.date];

    for (const value of candidates) {
        const parsed = Date.parse(value);
        if (!Number.isNaN(parsed)) {
            return parsed;
        }
    }

    const numericId = Number(doc.id);
    if (Number.isFinite(numericId)) {
        return numericId;
    }

    return 0;
}

function isSameDocumentId(left, right) {
    return String(left) === String(right);
}

function getDocumentById(id) {
    return state.documents.find(entry => isSameDocumentId(entry.id, id));
}

function getStatusBadgeMarkup(label, className = "") {
    return `<span class="status-badge ${className}">${escapeHtml(label)}</span>`;
}

function getKpiCardMarkup(label, value, meta = "") {
    return `
        <article class="summary-card">
            <span class="summary-card-label">${escapeHtml(label)}</span>
            <strong class="summary-card-value">${escapeHtml(value)}</strong>
            ${meta ? `<span class="summary-card-meta">${escapeHtml(meta)}</span>` : ""}
        </article>
    `;
}

function getDocumentCardMarkup(doc) {
    const statusLabel = doc.status === "draft" ? t("status_draft") : t("status_logged");
    const paymentStatus = doc.type === "invoice" ? normalizePaymentStatus(doc.paymentStatus) : "";
    const statusMarkup = doc.type === "invoice"
        ? [
            getStatusBadgeMarkup(statusLabel, doc.status === "draft" ? "is-draft" : "is-logged"),
            getStatusBadgeMarkup(getPaymentStatusLabel(paymentStatus), `is-${paymentStatus}`)
        ].join("")
        : getStatusBadgeMarkup(statusLabel, doc.status === "draft" ? "is-draft" : "is-logged");

    return `
        <article class="document-card document-card-${doc.type}" data-view-id="${escapeHtml(String(doc.id))}">
            <div class="document-card-copy">
                <div class="document-card-head">
                    <strong class="document-card-ref">${escapeHtml(doc.refNumber || "Reference pending")}</strong>
                    <div class="document-card-statuses">${statusMarkup}</div>
                </div>
                <div class="document-card-meta">
                    <span class="document-card-client">${escapeHtml(doc.clientName || "Unknown client")}</span>
                    <span class="document-card-date">${escapeHtml(formatDisplayDate(doc.date || ""))}</span>
                    <strong class="document-card-total">${escapeHtml(formatCurrency(doc.total || 0))}</strong>
                </div>
            </div>
            <div class="document-card-actions">
                <button type="button" class="statement-action-btn is-open" data-action="export-pdf" data-id="${escapeHtml(String(doc.id))}" aria-label="${escapeHtml(t("view_pdf"))}" title="${escapeHtml(t("view_pdf"))}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s3.6-6 9-6 9 6 9 6-3.6 6-9 6-9-6-9-6Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.9"/></svg>
                </button>
                <button type="button" class="statement-action-btn is-edit" data-action="edit" data-id="${escapeHtml(String(doc.id))}" aria-label="${escapeHtml(t("edit"))}" title="${escapeHtml(t("edit"))}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4.2-1 9.1-9.1a1.9 1.9 0 0 0 0-2.7l-.5-.5a1.9 1.9 0 0 0-2.7 0L5 15.8 4 20Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="m13.5 7.5 3 3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
                </button>
                <div class="doc-actions-menu-wrap">
                    <button
                        type="button"
                        class="statement-action-btn is-more"
                        data-toggle-document-menu="${escapeHtml(String(doc.id))}"
                        aria-expanded="false"
                        aria-haspopup="menu"
                        aria-label="More options"
                        title="More options"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></svg>
                    </button>
                    <div class="doc-actions-menu" data-document-menu="${escapeHtml(String(doc.id))}" hidden style="display:none;">
                        ${doc.type === "invoice" ? `<button type="button" class="doc-actions-menu-btn" data-action="set-payment-status" data-payment-status="unpaid" data-id="${escapeHtml(String(doc.id))}">${escapeHtml(t("mark_as_unpaid"))}</button>` : ""}
                        ${doc.type === "invoice" ? `<button type="button" class="doc-actions-menu-btn" data-action="set-payment-status" data-payment-status="pending" data-id="${escapeHtml(String(doc.id))}">${escapeHtml(t("mark_as_pending"))}</button>` : ""}
                        ${doc.type === "invoice" ? `<button type="button" class="doc-actions-menu-btn" data-action="set-payment-status" data-payment-status="paid" data-id="${escapeHtml(String(doc.id))}">${escapeHtml(t("mark_as_paid"))}</button>` : ""}
                        <button type="button" class="doc-actions-menu-btn" data-action="convert" data-id="${escapeHtml(String(doc.id))}" data-target-type="${doc.type === "quote" ? "invoice" : "quote"}">${escapeHtml(t(doc.type === "quote" ? "convert_to_invoice" : "convert_to_quote"))}</button>
                        <button type="button" class="doc-actions-menu-btn doc-actions-menu-btn-danger" data-action="delete" data-id="${escapeHtml(String(doc.id))}">${escapeHtml(t("delete"))}</button>
                    </div>
                </div>
            </div>
        </article>
    `;
}

function renderOverviewPanels() {
    if (elements.overviewRecentDocuments) {
        const parseTlRef = ref => {
            const m = String(ref || "").toUpperCase().match(/^TL-(\d{4})-(\d{4})-(\d+)$/);
            return m ? { date: m[1] + m[2], seq: parseInt(m[3], 10) } : null;
        };
        const recentDocuments = [...state.documents]
            .sort((left, right) => {
                const lk = parseTlRef(left.refNumber);
                const rk = parseTlRef(right.refNumber);
                if (lk && rk) {
                    if (rk.date !== lk.date) return rk.date > lk.date ? 1 : -1;
                    return rk.seq - lk.seq;
                }
                if (lk) return -1;
                if (rk) return 1;
                return getDocumentCreatedAt(right) - getDocumentCreatedAt(left);
            })
            .slice(0, 5);

        elements.overviewRecentDocuments.innerHTML = recentDocuments.length
            ? recentDocuments.map(doc => `
                <button class="overview-document-link overview-document-link-${escapeHtml(doc.type || "quote")}" type="button" data-open-overview-doc="${escapeHtml(String(doc.id))}">
                    <span class="overview-document-ref">${escapeHtml(doc.refNumber || "Reference pending")}</span>
                    <span class="overview-document-meta">${escapeHtml(doc.clientName || "Unknown client")} · ${escapeHtml(formatDisplayDate(doc.date || ""))}</span>
                    <strong class="overview-document-total">${escapeHtml(formatCurrency(doc.total || 0))}</strong>
                </button>
            `).join("")
            : `<div class="empty-state compact-empty-state"><p>${escapeHtml(t("empty_documents"))}</p></div>`;
    }

    if (elements.overviewSummaryGrid) {
        elements.overviewSummaryGrid.innerHTML = [
            getKpiCardMarkup(t("clients"), String(state.clients.length), "Saved billing records"),
            getKpiCardMarkup(t("statements"), String(state.statementExports.length), "Generated exports"),
            getKpiCardMarkup(t("invoice_reports"), String(state.documents.filter(doc => doc.type === "invoice").length), "Invoices ready for review")
        ].join("");
    }
}

function renderDocuments() {
    updateOverviewStats();
    renderOverviewPanels();
    renderCatalog();
    renderInvoiceReport();

    const visibleDocuments = getFilteredDocuments();

    if (state.documents.length === 0) {
        elements.documentsGrid.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"></path>
                </svg>
                <p>${escapeHtml(t("empty_documents"))}</p>
            </div>
        `;
        return;
    }

    if (visibleDocuments.length === 0) {
        elements.documentsGrid.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <p>${escapeHtml(t("empty_documents_filtered"))}</p>
            </div>
        `;
        return;
    }

    elements.documentsGrid.innerHTML = visibleDocuments.map(getDocumentCardMarkup).join("");

    syncDocumentActionMenus();
}

function handleSearchInput(event) {
    state.searchQuery = event.target.value.trim().toLowerCase();
    renderDocuments();
    renderStatementsPage();
}

function handleSortChange(event) {
    state.sortOrder = event.target.value || "date_desc";
    renderDocuments();
}

function setActiveFilter(filter) {
    state.activeFilter = filter;
    syncDocumentFilters();
    renderDocuments();
}

function syncDocumentFilters() {
    elements.filterButtons.forEach(button => {
        const isActive = button.dataset.filter === state.activeFilter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
}

function renderClientOptions() {
    elements.clientSelect.innerHTML = `<option value="">${escapeHtml(t("choose_or_add_client"))}</option><option value="other">${escapeHtml(t("other_manual"))}</option>`;
    state.clients.forEach(client => {
        elements.clientSelect.innerHTML += `<option value="${client.id}">${client.name}</option>`;
    });
    renderClientManagementList();
}

function onClientSelectChange() {
    const selected = elements.clientSelect.value;

    if (!selected || selected === "other") {
        elements.clientName.value = "";
        elements.clientAddress.value = "";
        elements.consigneeName.value = "";
        elements.consigneeAddress.value = "";
        updateEditorSummary();
        return;
    }

    const client = state.clients.find(entry => entry.id === selected);
    if (client) {
        elements.clientName.value = client.name;
        elements.clientAddress.value = client.address;
        elements.consigneeName.value = client.consigneeName || "";
        elements.consigneeAddress.value = client.consigneeAddress || "";
    }

    updateEditorSummary();
}

async function saveClient() {
    const name = elements.clientName.value.trim();
    const address = elements.clientAddress.value.trim();
    const consigneeName = elements.consigneeName.value.trim();
    const consigneeAddress = elements.consigneeAddress.value.trim();

    if (!name || !address) {
        alert("Enter client name and address before saving.");
        return;
    }

    const nextClients = [...state.clients];
    const existing = nextClients.find(client => client.name.toLowerCase() === name.toLowerCase());

    if (existing) {
        existing.address = address;
        existing.consigneeName = consigneeName;
        existing.consigneeAddress = consigneeAddress;
    } else {
        nextClients.push({
            id: `client-${Date.now()}`,
            name,
            address,
            consigneeName,
            consigneeAddress
        });
    }

    try {
        await saveClientsToServer(nextClients);
    } catch (error) {
        alert(`Unable to save this client to the server.\n\n${error.message}`);
        return;
    }

    alert(existing ? "Client already exists; address updated." : "Client saved for future use.");
    renderClientOptions();
    renderClientManagementList();

    const selectedClient = state.clients.find(client => client.name === name);
    elements.clientSelect.value = selectedClient ? selectedClient.id : "";
    updateEditorSummary();
}

async function handleDocumentCardClick(event) {
    const menuToggleButton = event.target.closest("[data-toggle-document-menu]");
    if (menuToggleButton) {
        event.preventDefault();
        event.stopPropagation();
        const docId = String(menuToggleButton.dataset.toggleDocumentMenu);
        state.openDocumentMenuId = state.openDocumentMenuId === docId ? null : docId;
        syncDocumentActionMenus();
        return;
    }

    const showTagsButton = event.target.closest("[data-show-tags]");
    if (showTagsButton) {
        event.preventDefault();
        event.stopPropagation();

        const doc = getDocumentById(showTagsButton.dataset.showTags);
        if (doc && Array.isArray(doc.tags) && doc.tags.length) {
            window.alert(`${doc.refNumber || "Document"} keywords:\n\n${doc.tags.join(", ")}`);
        }
        return;
    }

    const actionButton = event.target.closest("[data-action]");
    if (actionButton) {
        event.preventDefault();
        event.stopPropagation();

        const docId = actionButton.dataset.id;
        const action = actionButton.dataset.action;

        if (action === "edit") {
            editDocument(docId);
        } else if (action === "export-pdf") {
            const doc = getDocumentById(docId);
            if (doc) {
                openPrintWindow(doc);
            }
        } else if (action === "set-payment-status") {
            await updateDocumentPaymentStatus(docId, actionButton.dataset.paymentStatus);
        } else if (action === "delete") {
            await deleteDocument(docId);
        } else if (action === "convert") {
            convertDocumentType(docId, actionButton.dataset.targetType || "invoice");
        } else if (action === "view-pdf") {
            const doc = getDocumentById(docId);
            if (doc?.legacyPdfUrl) {
                window.open(`/api/legacy-pdf?documentId=${encodeURIComponent(String(doc.id))}`, "_blank", "noopener,noreferrer");
            }
        }
        return;
    }

    const card = event.target.closest("[data-view-id]");
    if (!card) {
        return;
    }
}

function handleDocumentCardKeydown(event) {
    return;
}

async function updateDocumentPaymentStatus(id, status) {
    const doc = getDocumentById(id);
    if (!doc || doc.type !== "invoice") {
        return;
    }

    const nextStatus = normalizePaymentStatus(status);
    if (normalizePaymentStatus(doc.paymentStatus) === nextStatus) {
        state.openDocumentMenuId = null;
        renderDocuments();
        return;
    }

    const nextDocuments = state.documents.map(entry => (
        isSameDocumentId(entry.id, id)
            ? { ...entry, paymentStatus: nextStatus }
            : entry
    ));

    try {
        await saveDocumentsToServer(nextDocuments);
        state.openDocumentMenuId = null;
        renderDocuments();
    } catch (error) {
        alert(`Unable to update invoice payment status.\n\n${error.message}`);
    }
}

function populateFormFromDocument(doc) {
    elements.docType.value = doc.type;
    elements.refNumber.value = doc.refNumber;
    elements.docDate.value = doc.date;
    elements.clientName.value = doc.clientName;
    elements.clientAddress.value = doc.clientAddress;
    elements.consigneeName.value = doc.consigneeName || "";
    elements.consigneeAddress.value = doc.consigneeAddress || "";
    elements.poNumber.value = doc.poNumber || "";
    elements.docTags.value = Array.isArray(doc.tags) ? doc.tags.join(", ") : "";
    elements.notes.value = doc.notes || "";
    elements.paymentTerms.value = doc.paymentTerms || DEFAULT_PAYMENT_TERMS;
    elements.includeSignature.checked = doc.includeSignature !== false;
    elements.includeStamp.checked = Boolean(doc.includeStamp);

    elements.itemsContainer.innerHTML = "";
    state.itemCounter = 0;

    doc.items.forEach(item => {
        addItem();
        const lastItem = elements.itemsContainer.querySelector(".item-row:last-child");
        lastItem.querySelector(".item-description").value = item.description || "";
        lastItem.querySelector(".item-quantity").value = item.quantity ?? 0;
        lastItem.querySelector(".item-total-price").value = item.totalPrice ?? ((parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)).toFixed(2);
        lastItem.querySelector(".item-unit-price").value = item.unitPrice ?? item.price ?? 0;
        lastItem.dataset.priceDriver = item.manualUnitPrice ? "unit" : "total";
        lastItem.querySelector(".item-internal-cost").value = item.internalCost ?? 0;
        lastItem.dataset.itemImageDataUrl = item.itemImageDataUrl || "";
        updateItemPricing(lastItem);
        syncItemImageUI(lastItem);
        updateItemSummary(lastItem);
    });

    syncInternalPricingVisibility();
}

function editDocument(id) {
    const doc = getDocumentById(id);
    if (!doc) {
        return;
    }

    state.editingDocumentId = id;
    state.convertingFromQuoteId = null;
    state.openDocumentMenuId = null;
    openModal(doc.type);
    populateFormFromDocument(doc);
    updateModalTitle();
    goToStep(getTotalSteps());
    updateEditorSummary();
}

window.editDocument = editDocument;

function convertDocumentType(id, nextType) {
    const doc = getDocumentById(id);
    if (!doc || !["quote", "invoice"].includes(nextType) || doc.type === nextType) {
        return;
    }

    state.editingDocumentId = id;
    state.convertingFromQuoteId = null;
    state.openDocumentMenuId = null;
    openModal(nextType);
    populateFormFromDocument({
        ...doc,
        type: nextType,
        paymentStatus: nextType === "invoice"
            ? normalizePaymentStatus(doc.paymentStatus)
            : null
    });
    updateModalTitle();
    goToStep(getTotalSteps());
    updateEditorSummary();
}

async function deleteDocument(id) {
    const doc = getDocumentById(id);
    if (!doc) {
        return;
    }

    const docLabel = doc.type === "quote" ? "quote" : "invoice";
    if (!window.confirm(`Delete this ${docLabel} (${doc.refNumber})?`)) {
        return;
    }

    const nextDocuments = state.documents.filter(entry => !isSameDocumentId(entry.id, id));

    try {
        await saveDocumentsToServer(nextDocuments);
        state.openDocumentMenuId = null;
        renderDocuments();
    } catch (error) {
        alert(`Unable to delete this ${docLabel} from the server.\n\n${error.message}`);
    }
}

function convertQuoteToInvoice(id) {
    convertDocumentType(id, "invoice");
}
