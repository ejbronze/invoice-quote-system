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
    valueViewInterval: null,
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
    notesFilter: "all",
    notesSearchQuery: "",
    notesClientFilter: "all",
    issueReports: [],
    companyProfile: null,
    exchangeRateUsdToDop: 59,
    catalogItems: [],
    statementExports: [],
    sessionLogs: [],
    activityLogs: [],
    editingCatalogItemId: null,
    editingStatementExportId: null,
    openItemMenuId: null,
    openDocumentMenuId: null,
    statementStatusFilter: "pending",
    editingClientId: null,
    draftAutosaveTimerId: null,
    editingManagedUserId: null,
    documentEditorBaseline: "",
    documentEditorDirty: false,
    mobileOverviewCollapsed: true,
    selectedInvoiceReportIds: [],
    selectedDocumentIds: [],
    statementExportInProgress: false,
    statementExportStep: 1,
    activeQuickPaymentInvoiceId: null,
    activeQuickPaymentStatementId: null,
    pendingPaymentDeleteContext: null,
    activeNotesDocId: null,
    activeNotesTargetType: null,
    activeNotesTargetId: null,
    activeNotesRecordTargetType: null,
    activeNotesRecordTargetId: null,
    pricingSearchQuery: "",
    pricingCategoryFilter: "all",
    pricingSupplierFilter: "all",
    pricingSortOrder: "date_desc",
    pricingImageFilter: "all",
    editingProcurementSheetId: null,
    notesDrawerTab: "notes",
    pendingCatalogInsertItem: null,
    pendingCatalogItemImageDataUrl: null,
    pendingCatalogItemCropSrc: "",
    selectedCatalogItemIds: []
};

const DOP_PER_USD = 59;
const BULK_ZIP_THRESHOLD = 4;
const DEFAULT_PAYMENT_TERMS = "NET30 : Full payment is due within a minimum of 30 calendar days from the invoice date. Monthly client balances due may not exceed $10,000 without approval.";
const MONTHLY_CLIENT_DUE_LIMIT = 10000;
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
const APP_LAST_UPDATED = "2026-04-22T18:00:00";

const ICONS = {
    plus:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`,
    trash:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M9 4h6M7 7l1 12h8l1-12M10 11v5M14 11v5"/></svg>`,
    convert:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 16V4M7 4 3 8M7 4l4 4M17 8v12M17 20l4-4M17 20l-4-4"/></svg>`,
    download:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 3v12M8 11l4 4 4-4"/></svg>`,
    upload:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M12 21V9M16 13l-4-4-4 4"/></svg>`,
    fileText:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h5"/></svg>`,
    spreadsheet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 10l4 4M13 10l-4 4"/></svg>`,
    payment:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg>`,
    circle:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10"/></svg>`,
    checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    clock:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    send:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    save:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h11l3 3v13H5z"/><path d="M8 4v6h8V4"/><path d="M9 17h6"/></svg>`,
    notepad:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 12h8M8 16h5"/></svg>`,
    quote:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/><path d="M8 13h8M8 17h8"/></svg>`,
    invoice:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M7 7h10M7 12h6M7 17h4"/></svg>`,
    procurement: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M2 8h20M2 14h20M8 2v20M14 2v20"/></svg>`,
    library:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    insert:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M8 11l4 4 4-4"/><path d="M5 19h14"/></svg>`,
};

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
    aboutProduct: "SantoSync is a focused document and operations workspace built for trade teams, freelancers, and logistics operators who need to generate, track, and deliver professional quotes and invoices without the overhead of enterprise billing software.",
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
        catalog: "Pricing Library",
        catalog_heading: "Pricing Library",
        catalog_copy: "Maintain reusable sourced items with supplier, packaging, cost, sell price, and lead-time details.",
        add_catalog_item: "Add Library Item",
        no_catalog_items: "No pricing library items yet.",
        item_name: "Item Name",
        price: "Price",
        item_details: "Details",
        item_notes: "Notes",
        date_updated: "Date Updated",
        category: "Category",
        brand: "Brand",
        unit_size: "Pack Size",
        vendor: "Supplier",
        source: "Source",
        source_manual: "Manual",
        source_document: "Document",
        save_catalog_item: "Save Library Item",
        update_catalog_item: "Update Library Item",
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
        use_item: "Add To Document",
        item_image: "Item Image",
        upload_item_image: "Upload item image",
        remove_item_image: "Remove image",
        menu: "Menu",
        language: "Language",
        dashboard: "Dashboard",
        document_workspace: "Document workspace",
        hero_kicker: "Document Workspace",
        hero_title: BRAND.heroTitle,
        hero_copy: BRAND.heroCopy,
        new_action: "New",
        new_quote: "New Quote",
        new_invoice: "New Invoice",
        new_procurement_sheet: "New Procurement Sheet",
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
        export_selected_excel: "Export Selected as Excel",
        statement_of_account_title: "Statement of Account Export",
        statement_of_account_copy: "Review the selected invoices before opening the print-ready PDF statement.",
        statement_no_selection: "No invoices selected",
        statement_selection_help: "Select invoices from a single client to prepare a statement.",
        statement_selected_value: "Selected value",
        statement_outstanding_balance: "Outstanding balance",
        statement_generate_pdf: "Generate PDF",
        statement_generate_excel: "Generate Excel",
        statement_export_success: "Statement of Account preview opened. Use Print or Save as PDF to finish the export.",
        statement_excel_success: "Statement of Account Excel report downloaded.",
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
        json_backup_copy: "Export a full workspace backup or restore documents, clients, and admin data from a JSON file.",
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
        save_document: "Save Document",
        save_changes: "Save Changes",
        save_preview_pdf: "View / Print",
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
        statement_exports_heading: "Statement Exports",
        statement_exports_copy: "Generated statements stay here for later review, edits, and PDF access.",
        statement_filter_pending: "Pending",
        statement_filter_paid: "Paid",
        statement_filter_all: "All",
        no_paid_statements: "No paid statements yet.",
        no_pending_statements: "No pending statements right now.",
        no_statement_matches: "No statements match your search.",
        statement_metric_invoices: "Invoices",
        statement_metric_total: "Total",
        statement_metric_outstanding: "Outstanding",
        statement_mark_paid_all: "Mark all invoices as paid",
        payment_history_heading: "Payment History",
        payment_history_copy: "See every payment recorded across invoices, ordered from newest to oldest.",
        log_payment: "Log Payment",
        no_payments_recorded: "No payments recorded yet.",
        aging_heading: "Client Aging",
        aging_copy: "Track outstanding balances by client using current, 1-30, 31-60, 61-90, and 90+ day buckets.",
        aging_current: "Current",
        aging_1_30: "1-30",
        aging_31_60: "31-60",
        aging_61_90: "61-90",
        aging_90_plus: "90+",
        total_outstanding: "Total Outstanding",
        no_outstanding_balances: "No outstanding balances right now.",
        data_transfer_title: "Data Export & Import",
        data_transfer_copy: "Open a smaller data tools menu when you need templates, backups, imports, or selective export.",
        open_data_tools: "Open Data Tools",
        data_tools_title: "Data Tools",
        data_tools_copy: "Choose the export or import action you want, without crowding the main tools page.",
        snapshots_title: "Local Snapshots",
        snapshots_copy: "The app saves a local backup after every manual save. Use these to recover if server data is lost.",
        exchange_rate_help: "Converts pesos back to USD using RD${rate} = US$1.",
        company_address_placeholder: "123 Trade Avenue\nSanto Domingo, DR",
        company_email_placeholder: "hello@santosync.com",
        company_phone_placeholder: "+1 (809) 555-0110",
        company_website_placeholder: "www.santosync.com",
        company_tax_id_placeholder: "RNC / EIN / Registration",
        client_location: "Location",
        client_consignee: "Consignee",
        client_contacts: "Contacts",
        client_activity: "Activity",
        client_total_invoiced: "Total Invoiced",
        client_outstanding: "Outstanding",
        clients_with_balances: "Clients With Balances",
        past_due: "Past Due",
        consignee_pending: "Consignee pending",
        not_provided: "Not provided",
        client_activity_modal_title: "Client Activity",
        client_activity_modal_copy: "Open the linked quotes, invoices, or statements for this client.",
        client_activity_quotes_title: "{client} Quotes",
        client_activity_quotes_copy: "Open any quote linked to this client.",
        client_activity_invoices_title: "{client} Invoices",
        client_activity_invoices_copy: "Open any invoice linked to this client.",
        client_activity_statements_title: "{client} Statements",
        client_activity_statements_copy: "Reopen any saved statement for this client.",
        client_activity_total_invoiced_title: "{client} Total Invoiced",
        client_activity_total_invoiced_copy: "These invoices make up the total invoiced amount for this client.",
        client_activity_outstanding_title: "{client} Outstanding",
        client_activity_outstanding_copy: "These invoices still have a balance outstanding.",
        client_activity_statement_meta: "{amount} outstanding",
        client_activity_no_records: "No records found for this section yet.",
        clients_heading: "Client directory",
        clients_subtitle: "Saved bill-to details, consignee info, and contact records for every client.",
        add_client: "Add Client",
        reports_heading: "Statements and invoice reporting",
        reports_subtitle: "Prepare invoice selections for statements, then reopen exported statements whenever you need them.",
        settings_heading: "Workspace settings",
        settings_subtitle: "Company profile, user access, editor preferences, and data tools live here.",
        account_admin_title: "Account Admin",
        account_admin_subtitle: "Manage SantoSync accounts, sub-accounts, session reporting, activity history, and document branding from one owner dashboard.",
        direct_account_label: "Direct account",
        subaccount_of_label: "Sub-account of {parent}",
        no_registered_accounts: "No registered accounts yet.",
        active_session: "Active session",
        closed_session: "Closed session",
        started_label: "Started",
        ended_label: "Ended",
        no_login_sessions: "No login sessions recorded yet.",
        no_workspace_activity: "No workspace activity recorded yet.",
        last_login_label: "Last login",
        owner_access: "Owner Access",
        signed_in_as_owner: "Signed in as owner",
        owner_role: "Owner",
        registered_users: "Registered Users",
        sub_accounts: "Sub-Accounts",
        recent_sessions: "Recent Sessions",
        activity_events: "Activity Events",
        registered_accounts: "Registered Accounts",
        registered_accounts_copy: "Review everyone attached to SantoSync, edit their names and access, and assign sub-accounts to a parent account.",
        add_workspace_account: "Add Workspace Account",
        add_workspace_account_copy: "Create a direct account or assign it under an existing user as a sub-account.",
        access_level: "Access Level",
        access_workspace: "Workspace",
        access_operations: "Operations",
        access_review: "Review Only",
        parent_account: "Parent Account",
        direct_account_for_workspace: "Direct account for SantoSync",
        cancel_edit: "Cancel Edit",
        document_branding: "Document Branding",
        document_branding_copy: "Update the signature and stamp used when SantoSync generates final document output.",
        upload_signature: "Upload Signature",
        clear_signature: "Clear Signature",
        upload_stamp: "Upload Stamp",
        clear_stamp: "Clear Stamp",
        save_brand_assets: "Save Branding Assets",
        login_session_reports: "Login Session Reports",
        login_session_reports_copy: "Track recent sign-ins, sign-outs, and who has been active in the workspace.",
        workspace_activity: "Workspace Activity",
        workspace_activity_copy: "Review recent account edits, exports, branding changes, and other logged actions.",
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
        help_a_create_doc: "Click the <strong>+ New</strong> button at the top of the Documents page, or use the <strong>+ New</strong> dropdown on the dashboard. Choose Quote, Invoice, or Statement. The editor opens in a step-by-step flow — fill in document details, client info, line items, keywords, then review before exporting.",
        help_q_edit_doc: "How do I edit an existing document?",
        help_a_edit_doc: "Click the <strong>pencil icon</strong> on any document card, or click <strong>Edit</strong> inside the PDF preview window. The editor reopens with all fields intact and ready to update.",
        help_vl_edit_btn: "Edit button",
        help_vc_edit: "Edit",
        help_q_company_profile: "How do I set up my company profile?",
        help_a_company_profile: "Open <strong>Settings</strong> from the sidebar, then click <strong>Open Company Profile</strong>. Your name, address, logo, letterhead, and payment info will appear on every document you generate.",
        help_q_diff_quote_invoice: "What is the difference between a Quote and an Invoice?",
        help_a_diff_quote_invoice: "A <strong>Quote</strong> is a price estimate sent before work begins. An <strong>Invoice</strong> is a formal payment request issued after work is completed or goods are delivered. You can switch between the two in Step 1 of the editor.",
        help_q_export_pdf: "How do I export a document to PDF?",
        help_a_export_pdf: "Click the <strong>download icon</strong> on any saved document card to download the PDF immediately. If you want to review the layout first, you can still use <strong>Step 6 \u2013 Final Preview</strong> inside the editor.",
        help_vl_pdf_preview: "Download PDF",
        help_vc_preview_pdf: "Download PDF",
        help_q_reuse_items: "Can I save line items to reuse later?",
        help_a_reuse_items: "Yes. Reusable items now live in the <strong>Catalog</strong>. Keep the quote or invoice line-item table focused on direct entry, then manage reusable sourced items, pricing, supplier details, packaging, and lead-time data from the Catalog when needed.",
        help_q_payment_terms: "How do I set payment terms on an invoice?",
        help_a_payment_terms: "Scroll to the <strong>Document Notes &amp; Terms</strong> panel at the bottom of Step 3. The <strong>Terms of Payment</strong> selector offers four options: <strong>Due Immediately</strong> (disables other options and prints \u201cPayment is due immediately upon receipt\u201d), <strong>Net 15</strong> (due date auto-set to 15 days from invoice date), <strong>Net 30</strong> (due date auto-set to 30 days), or <strong>Other</strong> \u2014 enter a custom day count and optional terms text. Invoice cards show the calculated due date and an overdue indicator when applicable.",
        help_q_backup: "How do I back up or restore my data?",
        help_a_backup: "Open <strong>Settings</strong> from the sidebar and use the <strong>JSON Backup</strong> option to export a full workspace snapshot, including documents, clients, and admin data. Use <strong>JSON Restore</strong> to import a previously saved backup. The server now also keeps timestamped dataset snapshots for recovery.",
        help_q_action_icons: "What do the action icons on document cards do?",
        help_a_action_icons: "Each card shows action buttons on the right. The <strong>download icon</strong> saves the PDF immediately. The <strong>pencil icon</strong> opens the document in the editor. A three-dot menu gives access to additional actions like payment status, type conversion, and delete.",
        help_vl_card_actions: "Card action buttons",
        help_q_pdf_preview: "How do I use the PDF preview window?",
        help_a_pdf_preview: "The preview window shows the print-ready document. Use <strong>Print</strong> to open your browser\u2019s print dialog and save as PDF. Use <strong>Edit</strong> to jump back to the editor with the document loaded. <strong>Close Preview</strong> dismisses the window.",
        help_q_filter_docs: "How do I filter documents by type?",
        help_a_filter_docs: "Use the <strong>All / Quotes / Invoices / Statements</strong> tabs directly below the search bar. Clicking a tab shows only documents of that type in the same view \u2014 no page reload. The Statements tab shows previously generated Statement of Account exports.",
        help_q_mark_paid: "How do I mark an invoice as paid?",
        help_a_mark_paid: "On the Documents page, open the invoice card\u2019s three-dot menu and select the appropriate payment status \u2014 <strong>Unpaid</strong>, <strong>Pending</strong>, or <strong>Paid</strong>. For real payment tracking, open the invoice and use the payment ledger, or log a payment from the Statements page. Paid invoices are visually flagged and excluded from outstanding balance calculations in Invoice Reports.",
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
        help_a_language: "Use the language selector in the sidebar footer (<strong>EN / ES / FR</strong>). The interface and generated document labels will update to match your selected language immediately.",
        help_q_logo_sig: "Can I add my company logo and signature to documents?",
        help_a_logo_sig: "Yes. Open <strong>Settings</strong> from the sidebar, then click <strong>Company Profile</strong>. You can upload a letterhead image, signature, stamp, and footer wave \u2014 all of which appear in exported PDFs automatically.",
        help_q_search: "How do I search for a document?",
        help_a_search: "Use the search bar at the top of the Documents page. You can search by client name, reference number, date, or any keyword added in Step 4 of the editor. The same query simultaneously filters whichever tab is active \u2014 including the Statements tab, which matches by client name, vendor, reference number, and date.",
        help_q_snapshot: "What is the auto-cycling card on the dashboard?",
        help_a_snapshot: "The snapshot card in the top-right of the dashboard automatically rotates every 3 seconds between three metrics: <strong>Pipeline Value</strong> (blue \u2014 total value of all quotes and invoices), <strong>Amount Invoiced</strong> (green \u2014 total billed), and <strong>Income Received</strong> (amber \u2014 payments collected). Click the card at any time to advance manually; the 3-second timer resets from that point.",
        help_q_catalog: "How do I use the Catalog?",
        help_a_catalog: "Click <strong>Catalog</strong> in the sidebar navigation. It shows reusable pricing-library items, including entries captured from documents and manually added sourced items. Catalog entries can be inserted into quotes or invoices from the line-item editor.",
        help_q_client_contacts: "How do I add contact information to a client?",
        help_a_client_contacts: "Go to the <strong>Clients</strong> page in the sidebar. Click <strong>Add Client</strong> to create a new client, or click the <strong>edit icon</strong> on an existing client card to open the client modal. Inside, you can add multiple contacts — each with a name, email, phone number, and a WhatsApp flag. Click a client card to expand it and see their address, consignee, and all saved contacts at a glance.",
        help_q_record_payment: "How do I record a payment against an invoice?",
        help_a_record_payment: "You have two ways. From the <strong>Statements</strong> page, click <strong>+ Log Payment</strong> at the top of the Payment History panel — select the invoice from the dropdown, enter the amount, date, method, and reference, then save. Alternatively, open the invoice itself and add or adjust entries in the payment ledger. Logged payments can now also be removed from Payment History with a confirmation modal.",
        help_q_statement_payment: "Can I mark a statement deduction as a payment?",
        help_a_statement_payment: "Yes. Open the statement's edit modal (pencil icon on the statement row), find the deduction you want to apply, and check <strong>Mark as payment</strong>. A payment date field will appear. When you save, that deduction is written as a real payment entry on the matching invoices — it will immediately appear in Payment History and reduce the outstanding balance.",
        help_q_aging_clickthrough: "How do I see the open invoices behind a client in the aging table?",
        help_a_aging_clickthrough: "On the <strong>Statements</strong> page, scroll to the Client Aging table and click any client row. The app navigates directly to the Documents page with that client's open invoices pre-filtered — no extra steps needed.",
        help_q_excel_export: "Can I export a statement to Excel?",
        help_a_excel_export: "Yes. On a saved statement row, open the three-dot menu and choose <strong>Export to Excel</strong>. The download is a single-sheet workbook with a branded header block (vendor, consignee, bill-to, currency, outstanding balance), a date band, and one row per invoice showing debits, credits, and balance outstanding.",
        help_q_bug_report: "How do I report a bug or request a feature?",
        help_a_bug_report: "Click <strong>Submit / Report Issues</strong> in the footer. Fill in a summary, add any relevant screenshots, and submit. Your report is logged and visible to the admin in the Service Reports panel under <strong>Settings</strong>."
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
        catalog: "Pricing Library",
        catalog_heading: "Pricing Library",
        catalog_copy: "Mantén artículos reutilizables con proveedor, empaque, costo, precio de venta y tiempos de entrega.",
        add_catalog_item: "Add Library Item",
        no_catalog_items: "No pricing library items yet.",
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
        source_document: "Documento",
        save_catalog_item: "Save Library Item",
        update_catalog_item: "Update Library Item",
        report_submitted_success: "Reporte enviado correctamente.",
        report_required_error: "Agrega un resumen y detalles antes de enviar.",
        report_delete_confirm: "¿Eliminar este reporte?",
        footer_credit_line: `Creado por ${BRAND.developerName} en ${BRAND.studioName}, bajo ${BRAND.legalName}.`,
        footer_report_cta: "Enviar / Reportar Problemas",
        about_veloris: `Sobre ${BRAND.name}`,
        about_brand_meaning: "SantoSync es un nombre creado para sugerir coordinación, elegancia y fiabilidad para flujos comerciales modernos.",
        about_product_copy: "SantoSync es un espacio de trabajo enfocado en documentos y operaciones, creado para equipos comerciales, freelancers y operadores log\u00edsticos que necesitan generar, rastrear y entregar cotizaciones y facturas profesionales sin la complejidad del software empresarial.",
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
        use_item: "Agregar al Documento",
        item_image: "Imagen del Artículo",
        upload_item_image: "Subir imagen del artículo",
        remove_item_image: "Quitar imagen",
        menu: "Menú",
        language: "Idioma",
        dashboard: "Panel",
        document_workspace: "Espacio documental",
        hero_kicker: "Espacio de Documentos",
        hero_title: "Documentos comerciales, sincronizados con tu ritmo.",
        hero_copy: "Prepara cotizaciones refinadas, facturas seguras y un flujo diario más coordinado desde un solo espacio elegante.",
        new_action: "Nuevo",
        new_quote: "Nueva Cotización",
        new_invoice: "Nueva Factura",
        new_procurement_sheet: "New Procurement Sheet",
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
        json_backup_copy: "Exporta un respaldo completo del espacio de trabajo o restaura documentos, clientes y datos administrativos desde un archivo JSON.",
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
        save_document: "Guardar Documento",
        save_changes: "Guardar Cambios",
        save_preview_pdf: "Ver / Imprimir",
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
        statement_exports_heading: "Estados de Cuenta Exportados",
        statement_exports_copy: "Los estados generados quedan aquí para revisión, edición y acceso posterior.",
        statement_filter_pending: "Pendientes",
        statement_filter_paid: "Pagados",
        statement_filter_all: "Todos",
        no_paid_statements: "Todavía no hay estados pagados.",
        no_pending_statements: "No hay estados pendientes en este momento.",
        no_statement_matches: "Ningún estado coincide con tu búsqueda.",
        statement_metric_invoices: "Facturas",
        statement_metric_total: "Total",
        statement_metric_outstanding: "Pendiente",
        statement_mark_paid_all: "Marcar todas las facturas como pagadas",
        payment_history_heading: "Historial de Pagos",
        payment_history_copy: "Mira cada pago registrado en facturas, ordenado del más reciente al más antiguo.",
        log_payment: "Registrar Pago",
        no_payments_recorded: "Todavía no hay pagos registrados.",
        aging_heading: "Antigüedad por Cliente",
        aging_copy: "Sigue los balances pendientes por cliente usando actual, 1-30, 31-60, 61-90 y 90+ días.",
        aging_current: "Actual",
        aging_1_30: "1-30",
        aging_31_60: "31-60",
        aging_61_90: "61-90",
        aging_90_plus: "90+",
        total_outstanding: "Total Pendiente",
        no_outstanding_balances: "No hay balances pendientes en este momento.",
        data_transfer_title: "Exportación e Importación de Datos",
        data_transfer_copy: "Abre un menú más pequeño cuando necesites plantillas, respaldos, importaciones o exportación selectiva.",
        open_data_tools: "Abrir Herramientas de Datos",
        data_tools_title: "Herramientas de Datos",
        data_tools_copy: "Elige la acción de exportar o importar que quieres sin recargar la página principal de herramientas.",
        snapshots_title: "Instantáneas Locales",
        snapshots_copy: "La app guarda un respaldo local después de cada guardado manual. Úsalos para recuperar datos si el servidor falla.",
        exchange_rate_help: "Convierte pesos a USD usando RD${rate} = US$1.",
        company_address_placeholder: "123 Avenida Trade\nSanto Domingo, RD",
        company_email_placeholder: "hola@santosync.com",
        company_phone_placeholder: "+1 (809) 555-0110",
        company_website_placeholder: "www.santosync.com",
        company_tax_id_placeholder: "RNC / EIN / Registro",
        client_location: "Ubicación",
        client_consignee: "Consignatario",
        client_contacts: "Contactos",
        client_activity: "Actividad",
        client_total_invoiced: "Total Facturado",
        client_outstanding: "Pendiente",
        clients_with_balances: "Clientes con Balance",
        past_due: "Vencido",
        consignee_pending: "Consignatario pendiente",
        not_provided: "No proporcionado",
        client_activity_modal_title: "Actividad del Cliente",
        client_activity_modal_copy: "Abre las cotizaciones, facturas o estados enlazados a este cliente.",
        client_activity_quotes_title: "Cotizaciones de {client}",
        client_activity_quotes_copy: "Abre cualquier cotización vinculada a este cliente.",
        client_activity_invoices_title: "Facturas de {client}",
        client_activity_invoices_copy: "Abre cualquier factura vinculada a este cliente.",
        client_activity_statements_title: "Estados de {client}",
        client_activity_statements_copy: "Reabre cualquier estado guardado de este cliente.",
        client_activity_total_invoiced_title: "Total Facturado de {client}",
        client_activity_total_invoiced_copy: "Estas facturas componen el total facturado de este cliente.",
        client_activity_outstanding_title: "Pendiente de {client}",
        client_activity_outstanding_copy: "Estas facturas todavía tienen balance pendiente.",
        client_activity_statement_meta: "{amount} pendiente",
        client_activity_no_records: "Todavía no hay registros para esta sección.",
        clients_heading: "Directorio de Clientes",
        clients_subtitle: "Datos de facturación, consignatario y contactos guardados para cada cliente.",
        add_client: "Agregar Cliente",
        reports_heading: "Estados y reporte de facturas",
        reports_subtitle: "Prepara selecciones de facturas para estados y vuelve a abrir estados exportados cuando lo necesites.",
        settings_heading: "Configuración del espacio",
        settings_subtitle: "Perfil de empresa, acceso de usuarios, preferencias del editor y herramientas de datos viven aquí.",
        account_admin_title: "Administración de Cuentas",
        account_admin_subtitle: "Gestiona cuentas de SantoSync, subcuentas, reportes de sesión, historial de actividad y branding documental desde un panel del propietario.",
        direct_account_label: "Cuenta directa",
        subaccount_of_label: "Subcuenta de {parent}",
        no_registered_accounts: "Todavía no hay cuentas registradas.",
        active_session: "Sesión activa",
        closed_session: "Sesión cerrada",
        started_label: "Inició",
        ended_label: "Terminó",
        no_login_sessions: "Todavía no hay sesiones registradas.",
        no_workspace_activity: "Todavía no hay actividad registrada en el espacio.",
        last_login_label: "Último acceso",
        owner_access: "Acceso del Propietario",
        signed_in_as_owner: "Sesión iniciada como propietario",
        owner_role: "Propietario",
        registered_users: "Usuarios Registrados",
        sub_accounts: "Subcuentas",
        recent_sessions: "Sesiones Recientes",
        activity_events: "Eventos de Actividad",
        registered_accounts: "Cuentas Registradas",
        registered_accounts_copy: "Revisa a todos los vinculados a SantoSync, edita sus nombres y accesos, y asigna subcuentas a una cuenta padre.",
        add_workspace_account: "Agregar Cuenta del Espacio",
        add_workspace_account_copy: "Crea una cuenta directa o asígnala bajo un usuario existente como subcuenta.",
        access_level: "Nivel de Acceso",
        access_workspace: "Espacio",
        access_operations: "Operaciones",
        access_review: "Solo Revisión",
        parent_account: "Cuenta Padre",
        direct_account_for_workspace: "Cuenta directa para SantoSync",
        cancel_edit: "Cancelar Edición",
        document_branding: "Branding del Documento",
        document_branding_copy: "Actualiza la firma y el sello usados cuando SantoSync genera la salida final del documento.",
        upload_signature: "Subir Firma",
        clear_signature: "Borrar Firma",
        upload_stamp: "Subir Sello",
        clear_stamp: "Borrar Sello",
        save_brand_assets: "Guardar Branding",
        login_session_reports: "Reportes de Sesión",
        login_session_reports_copy: "Sigue inicios y cierres de sesión recientes y quién ha estado activo en el espacio.",
        workspace_activity: "Actividad del Espacio",
        workspace_activity_copy: "Revisa cambios de cuentas, exportaciones, branding y otras acciones registradas.",
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
        help_a_create_doc: "Haz clic en el bot\u00f3n <strong>+ Nuevo</strong> en la parte superior de la p\u00e1gina de Documentos, o usa el men\u00fa desplegable <strong>+ Nuevo</strong> en el panel de inicio. Elige Cotizaci\u00f3n, Factura o Estado de Cuenta. El editor se abre en un flujo paso a paso.",
        help_q_edit_doc: "\u00bfC\u00f3mo edito un documento existente?",
        help_a_edit_doc: "Haz clic en el <strong>\u00edcono de l\u00e1piz</strong> en cualquier tarjeta de documento, o en <strong>Editar</strong> dentro de la ventana de vista previa del PDF. El editor se reabre con todos los campos intactos y listos para actualizar.",
        help_vl_edit_btn: "Bot\u00f3n Editar",
        help_vc_edit: "Editar",
        help_q_company_profile: "\u00bfC\u00f3mo configuro el perfil de mi empresa?",
        help_a_company_profile: "Abre <strong>Configuraci\u00f3n</strong> desde la barra lateral y haz clic en <strong>Abrir Perfil de Empresa</strong>. Tu nombre, direcci\u00f3n, logo, encabezado y datos de pago aparecer\u00e1n en cada documento que generes.",
        help_q_diff_quote_invoice: "\u00bfCu\u00e1l es la diferencia entre una Cotizaci\u00f3n y una Factura?",
        help_a_diff_quote_invoice: "Una <strong>Cotizaci\u00f3n</strong> es un estimado de precio enviado antes de comenzar el trabajo. Una <strong>Factura</strong> es una solicitud formal de pago emitida despu\u00e9s de completar el trabajo o entregar bienes. Puedes cambiar entre ambos en el Paso 1 del editor.",
        help_q_export_pdf: "\u00bfC\u00f3mo exporto un documento a PDF?",
        help_a_export_pdf: "Haz clic en el <strong>\u00edcono de descarga</strong> en cualquier tarjeta guardada para descargar el PDF de inmediato. Si quieres revisar el dise\u00f1o primero, todav\u00eda puedes usar el <strong>Paso 6 \u2013 Vista Final</strong> dentro del editor.",
        help_vl_pdf_preview: "Descargar PDF",
        help_vc_preview_pdf: "Descargar PDF",
        help_q_reuse_items: "\u00bfPuedo guardar l\u00edneas de art\u00edculos para reutilizarlas?",
        help_a_reuse_items: "S\u00ed. Los art\u00edculos reutilizables ahora viven en el <strong>Cat\u00e1logo</strong>. Mant\u00e9n la tabla de l\u00edneas enfocada en entrada directa y gestiona art\u00edculos reutilizables, precios, proveedores, empaques y tiempos de entrega desde el Cat\u00e1logo cuando lo necesites.",
        help_q_payment_terms: "\u00bfC\u00f3mo configuro los t\u00e9rminos de pago en una factura?",
        help_a_payment_terms: "Baja hasta el panel de <strong>Notas y T\u00e9rminos del Documento</strong> al final del Paso 3. El selector de <strong>Condiciones de Pago</strong> ofrece cuatro opciones: <strong>Vencimiento Inmediato</strong> (desactiva las dem\u00e1s opciones e imprime \u201cEl pago vence inmediatamente al recibir\u201d), <strong>Net 15</strong> (fecha de vencimiento autom\u00e1tica a 15 d\u00edas desde la fecha de factura), <strong>Net 30</strong> (30 d\u00edas), u <strong>Otro</strong> \u2014 ingresa un n\u00famero de d\u00edas personalizado y texto opcional. Las tarjetas de factura muestran la fecha de vencimiento calculada e indicador de vencido cuando aplica.",
        help_q_backup: "\u00bfC\u00f3mo respaldo o restauro mis datos?",
        help_a_backup: "Abre <strong>Configuraci\u00f3n</strong> desde la barra lateral y usa la opci\u00f3n <strong>Respaldo JSON</strong> para exportar un resumen completo del espacio de trabajo, incluidos documentos, clientes y datos administrativos. Usa <strong>Restaurar JSON</strong> para importar un respaldo guardado. El servidor ahora tambi\u00e9n conserva instant\u00e1neas con fecha para recuperaci\u00f3n.",
        help_q_action_icons: "\u00bfQu\u00e9 hacen los \u00edconos de acci\u00f3n en las tarjetas de documentos?",
        help_a_action_icons: "Cada tarjeta muestra botones de acci\u00f3n. El <strong>\u00edcono de descarga</strong> guarda el PDF de inmediato. El <strong>\u00edcono de l\u00e1piz</strong> abre el documento en el editor. El men\u00fa de tres puntos da acceso a acciones adicionales como estado de pago, conversi\u00f3n de tipo y eliminar.",
        help_vl_card_actions: "Botones de acci\u00f3n de la tarjeta",
        help_q_pdf_preview: "\u00bfC\u00f3mo uso la ventana de vista previa del PDF?",
        help_a_pdf_preview: "La ventana de vista previa muestra el documento listo para imprimir. Usa <strong>Imprimir</strong> para abrir el di\u00e1logo de impresi\u00f3n y guardar como PDF. Usa <strong>Editar</strong> para volver al editor con el documento cargado. <strong>Cerrar Vista</strong> cierra la ventana.",
        help_q_filter_docs: "\u00bfC\u00f3mo filtro documentos por tipo?",
        help_a_filter_docs: "Usa las pesta\u00f1as <strong>Todos / Cotizaciones / Facturas / Estados de Cuenta</strong> debajo de la barra de b\u00fasqueda. Al hacer clic en una pesta\u00f1a se muestran solo los documentos de ese tipo \u2014 sin recargar la p\u00e1gina. La pesta\u00f1a de Estados muestra exportaciones de Estado de Cuenta generadas anteriormente.",
        help_q_mark_paid: "\u00bfC\u00f3mo marco una factura como pagada?",
        help_a_mark_paid: "En la p\u00e1gina de Documentos, abre el men\u00fa de tres puntos de la tarjeta de factura y selecciona el estado de pago correspondiente \u2014 <strong>No Pagada</strong>, <strong>Pendiente</strong> o <strong>Pagada</strong>. Para el seguimiento real de pagos, abre la factura y usa el libro de pagos, o registra el pago desde la p\u00e1gina de Estados. Las facturas pagadas se marcan visualmente y quedan excluidas del c\u00e1lculo de saldo pendiente.",
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
        help_a_language: "Usa el selector de idioma en el pie de la barra lateral (<strong>EN / ES / FR</strong>). La interfaz y las etiquetas de los documentos se actualizar\u00e1n inmediatamente.",
        help_q_logo_sig: "\u00bfPuedo agregar el logo y firma de mi empresa a los documentos?",
        help_a_logo_sig: "S\u00ed. Abre <strong>Configuraci\u00f3n</strong> desde la barra lateral y haz clic en <strong>Perfil de Empresa</strong>. Puedes subir una imagen de encabezado, firma, sello y onda de pie \u2014 todos aparecen autom\u00e1ticamente en los PDFs exportados.",
        help_q_search: "\u00bfC\u00f3mo busco un documento?",
        help_a_search: "Usa la barra de b\u00fasqueda en la parte superior de la p\u00e1gina de Documentos. Puedes buscar por nombre de cliente, n\u00famero de referencia, fecha o cualquier palabra clave. La misma b\u00fasqueda filtra simult\u00e1neamente la pesta\u00f1a activa, incluida la pesta\u00f1a de Estados, que se indexa por cliente, proveedor, referencia y fecha.",
        help_q_snapshot: "\u00bfQu\u00e9 es la tarjeta de rotaci\u00f3n en el panel principal?",
        help_a_snapshot: "La tarjeta de resumen en la esquina superior derecha del panel rota autom\u00e1ticamente cada 3 segundos entre tres m\u00e9tricas: <strong>Valor en Proceso</strong> (azul), <strong>Monto Facturado</strong> (verde) e <strong>Ingresos Recibidos</strong> (ambar). Haz clic en la tarjeta para avanzar manualmente; el temporizador se reinicia desde ese punto.",
        help_q_catalog: "\u00bfC\u00f3mo uso el Cat\u00e1logo?",
        help_a_catalog: "Haz clic en <strong>Cat\u00e1logo</strong> en la barra lateral. Muestra art\u00edculos reutilizables de la biblioteca de precios, incluyendo entradas capturadas desde documentos y art\u00edculos agregados manualmente. Las entradas del cat\u00e1logo se pueden insertar en cotizaciones o facturas desde el editor de l\u00edneas.",
        help_q_client_contacts: "\u00bfC\u00f3mo agrego informaci\u00f3n de contacto a un cliente?",
        help_a_client_contacts: "Ve a la p\u00e1gina de <strong>Clientes</strong> en la barra lateral. Haz clic en <strong>Agregar Cliente</strong> o en el \u00edcono de edici\u00f3n de una tarjeta existente. Puedes agregar m\u00faltiples contactos con nombre, correo, tel\u00e9fono y opci\u00f3n de WhatsApp. Haz clic en una tarjeta para expandirla y ver direcci\u00f3n, consignatario y contactos.",
        help_q_record_payment: "\u00bfC\u00f3mo registro un pago en una factura?",
        help_a_record_payment: "Desde la p\u00e1gina de <strong>Estados</strong>, haz clic en <strong>+ Registrar Pago</strong> en el historial de pagos \u2014 selecciona la factura, ingresa el monto, fecha, m\u00e9todo y referencia. Tambi\u00e9n puedes abrir la factura y agregar o ajustar entradas en el libro de pagos. Los pagos registrados ahora tambi\u00e9n se pueden eliminar desde el historial con un modal de confirmaci\u00f3n.",
        help_q_statement_payment: "\u00bfPuedo marcar una deducci\u00f3n como pago?",
        help_a_statement_payment: "S\u00ed. Abre el editor del estado (l\u00e1piz), busca la deducci\u00f3n y activa <strong>Marcar como pago</strong>. Al guardar, se crea una entrada de pago real en las facturas del estado, aparece en el historial y reduce el saldo pendiente.",
        help_q_aging_clickthrough: "\u00bfC\u00f3mo veo las facturas de un cliente en la tabla de antig\u00fcedad?",
        help_a_aging_clickthrough: "En la p\u00e1gina de <strong>Estados</strong>, despl\u00e1zate a la tabla de Antig\u00fcedad de Clientes y haz clic en cualquier fila de cliente. La app navega directamente a la vista de Documentos con las facturas abiertas de ese cliente ya filtradas.",
        help_q_excel_export: "\u00bfPuedo exportar un estado a Excel?",
        help_a_excel_export: "S\u00ed. En la fila del estado, abre el men\u00fa de tres puntos y elige <strong>Exportar a Excel</strong>. Obtienes una hoja con encabezado, banda de fecha y una fila por factura con d\u00e9bitos, cr\u00e9ditos y saldo pendiente.",
        help_q_bug_report: "\u00bfC\u00f3mo reporto un error o solicito una funci\u00f3n?",
        help_a_bug_report: "Haz clic en <strong>Enviar / Reportar Problemas</strong> en el pie de p\u00e1gina. Completa un resumen, agrega capturas relevantes y env\u00eda. Tu reporte se registra y el admin puede verlo en los Reportes de Servicio bajo <strong>Configuraci\u00f3n</strong>."
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
        catalog: "Pricing Library",
        catalog_heading: "Pricing Library",
        catalog_copy: "G\u00e9rez les articles r\u00e9utilisables avec fournisseur, emballage, co\u00fbt, prix de vente et d\u00e9lais.",
        add_catalog_item: "Add Library Item",
        no_catalog_items: "No pricing library items yet.",
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
        source_document: "Document",
        save_catalog_item: "Save Library Item",
        update_catalog_item: "Update Library Item",
        report_submitted_success: "Rapport envoyé avec succès.",
        report_required_error: "Ajoutez un résumé et des détails avant l’envoi.",
        report_delete_confirm: "Supprimer ce rapport ?",
        footer_credit_line: `Créé par ${BRAND.developerName} via ${BRAND.studioName}, sous ${BRAND.legalName}.`,
        footer_report_cta: "Soumettre / Signaler un Problème",
        about_veloris: `À propos de ${BRAND.name}`,
        about_brand_meaning: "SantoSync est un nom imaginé pour évoquer la coordination, l’élégance et la fiabilité dans les flux commerciaux.",
        about_product_copy: "SantoSync est un espace de travail document et op\u00e9rations con\u00e7u pour les \u00e9quipes commerciales, les freelances et les op\u00e9rateurs logistiques qui ont besoin de g\u00e9n\u00e9rer, suivre et livrer des devis et factures professionnels sans la lourdeur d\u2019un logiciel de facturation entreprise.",
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
        use_item: "Ajouter au Document",
        item_image: "Image de l’Article",
        upload_item_image: "Téléverser l’image de l’article",
        remove_item_image: "Retirer l’image",
        menu: "Menu",
        language: "Langue",
        dashboard: "Tableau",
        document_workspace: "Espace documentaire",
        hero_kicker: "Espace Documents",
        hero_title: "Des documents commerciaux au rythme de votre équipe.",
        hero_copy: "Préparez des devis raffinés, des factures sûres et un flux quotidien mieux synchronisé depuis un seul espace élégant.",
        new_action: "Nouveau",
        new_quote: "Nouveau Devis",
        new_invoice: "Nouvelle Facture",
        new_procurement_sheet: "New Procurement Sheet",
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
        json_backup_copy: "Exportez une sauvegarde complète de l’espace de travail ou restaurez documents, clients et données d’administration depuis un fichier JSON.",
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
        save_document: "Enregistrer le document",
        save_changes: "Enregistrer les Modifications",
        save_preview_pdf: "Voir / Imprimer",
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
        statement_exports_heading: "Exports de Relevés",
        statement_exports_copy: "Les relevés générés restent ici pour une révision, une modification et un accès ultérieurs.",
        statement_filter_pending: "En attente",
        statement_filter_paid: "Payés",
        statement_filter_all: "Tous",
        no_paid_statements: "Aucun relevé payé pour le moment.",
        no_pending_statements: "Aucun relevé en attente pour le moment.",
        no_statement_matches: "Aucun relevé ne correspond à votre recherche.",
        statement_metric_invoices: "Factures",
        statement_metric_total: "Total",
        statement_metric_outstanding: "En souffrance",
        statement_mark_paid_all: "Marquer toutes les factures comme payées",
        payment_history_heading: "Historique des Paiements",
        payment_history_copy: "Consultez tous les paiements enregistrés sur les factures, du plus récent au plus ancien.",
        log_payment: "Enregistrer un Paiement",
        no_payments_recorded: "Aucun paiement enregistré pour le moment.",
        aging_heading: "Ancienneté Clients",
        aging_copy: "Suivez les soldes impayés par client avec les tranches actuel, 1-30, 31-60, 61-90 et 90+ jours.",
        aging_current: "Actuel",
        aging_1_30: "1-30",
        aging_31_60: "31-60",
        aging_61_90: "61-90",
        aging_90_plus: "90+",
        total_outstanding: "Total en Souffrance",
        no_outstanding_balances: "Aucun solde impayé pour le moment.",
        data_transfer_title: "Export et Import de Données",
        data_transfer_copy: "Ouvrez un menu plus compact lorsque vous avez besoin de modèles, sauvegardes, imports ou exports sélectifs.",
        open_data_tools: "Ouvrir les Outils de Données",
        data_tools_title: "Outils de Données",
        data_tools_copy: "Choisissez l’action d’export ou d’import voulue sans encombrer la page principale des outils.",
        snapshots_title: "Instantanés Locaux",
        snapshots_copy: "L’application enregistre une sauvegarde locale après chaque enregistrement manuel. Utilisez-les pour récupérer les données si le serveur échoue.",
        exchange_rate_help: "Convertit les pesos en USD avec RD${rate} = US$1.",
        company_address_placeholder: "123 Avenue Trade\nSaint-Domingue, RD",
        company_email_placeholder: "bonjour@santosync.com",
        company_phone_placeholder: "+1 (809) 555-0110",
        company_website_placeholder: "www.santosync.com",
        company_tax_id_placeholder: "RNC / EIN / Immatriculation",
        client_location: "Emplacement",
        client_consignee: "Destinataire",
        client_contacts: "Contacts",
        client_activity: "Activité",
        client_total_invoiced: "Total Facturé",
        client_outstanding: "En souffrance",
        clients_with_balances: "Clients avec Solde",
        past_due: "En retard",
        consignee_pending: "Destinataire en attente",
        not_provided: "Non fourni",
        client_activity_modal_title: "Activité du Client",
        client_activity_modal_copy: "Ouvrez les devis, factures ou relevés liés à ce client.",
        client_activity_quotes_title: "Devis de {client}",
        client_activity_quotes_copy: "Ouvrez tout devis lié à ce client.",
        client_activity_invoices_title: "Factures de {client}",
        client_activity_invoices_copy: "Ouvrez toute facture liée à ce client.",
        client_activity_statements_title: "Relevés de {client}",
        client_activity_statements_copy: "Rouvrez tout relevé enregistré pour ce client.",
        client_activity_total_invoiced_title: "Total Facturé de {client}",
        client_activity_total_invoiced_copy: "Ces factures composent le total facturé pour ce client.",
        client_activity_outstanding_title: "En souffrance pour {client}",
        client_activity_outstanding_copy: "Ces factures ont encore un solde impayé.",
        client_activity_statement_meta: "{amount} en souffrance",
        client_activity_no_records: "Aucun enregistrement pour cette section pour le moment.",
        clients_heading: "Répertoire Clients",
        clients_subtitle: "Coordonnées de facturation, destinataire et contacts enregistrés pour chaque client.",
        add_client: "Ajouter un Client",
        reports_heading: "Relevés et reporting factures",
        reports_subtitle: "Préparez des sélections de factures pour les relevés puis rouvrez les relevés exportés quand nécessaire.",
        settings_heading: "Paramètres de l’espace",
        settings_subtitle: "Profil d’entreprise, accès utilisateurs, préférences éditeur et outils de données se trouvent ici.",
        account_admin_title: "Admin des Comptes",
        account_admin_subtitle: "Gérez les comptes SantoSync, sous-comptes, rapports de session, historique d’activité et branding documentaire depuis un tableau propriétaire.",
        direct_account_label: "Compte direct",
        subaccount_of_label: "Sous-compte de {parent}",
        no_registered_accounts: "Aucun compte enregistré pour le moment.",
        active_session: "Session active",
        closed_session: "Session fermée",
        started_label: "Début",
        ended_label: "Fin",
        no_login_sessions: "Aucune session enregistrée pour le moment.",
        no_workspace_activity: "Aucune activité enregistrée dans l’espace pour le moment.",
        last_login_label: "Dernière connexion",
        owner_access: "Accès Propriétaire",
        signed_in_as_owner: "Connecté en tant que propriétaire",
        owner_role: "Propriétaire",
        registered_users: "Utilisateurs Enregistrés",
        sub_accounts: "Sous-comptes",
        recent_sessions: "Sessions Récentes",
        activity_events: "Événements d’Activité",
        registered_accounts: "Comptes Enregistrés",
        registered_accounts_copy: "Passez en revue tous les comptes liés à SantoSync, modifiez leurs noms et accès, et attribuez des sous-comptes à un compte parent.",
        add_workspace_account: "Ajouter un Compte d’Espace",
        add_workspace_account_copy: "Créez un compte direct ou assignez-le sous un utilisateur existant comme sous-compte.",
        access_level: "Niveau d’Accès",
        access_workspace: "Espace",
        access_operations: "Opérations",
        access_review: "Lecture seule",
        parent_account: "Compte Parent",
        direct_account_for_workspace: "Compte direct pour SantoSync",
        cancel_edit: "Annuler la modification",
        document_branding: "Branding Document",
        document_branding_copy: "Mettez à jour la signature et le cachet utilisés lorsque SantoSync génère le document final.",
        upload_signature: "Téléverser la Signature",
        clear_signature: "Effacer la Signature",
        upload_stamp: "Téléverser le Cachet",
        clear_stamp: "Effacer le Cachet",
        save_brand_assets: "Enregistrer le Branding",
        login_session_reports: "Rapports de Session",
        login_session_reports_copy: "Suivez les connexions, déconnexions et l’activité récente dans l’espace.",
        workspace_activity: "Activité de l’Espace",
        workspace_activity_copy: "Consultez les modifications de comptes, exports, branding et autres actions enregistrées.",
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
        help_a_create_doc: "Cliquez sur le bouton <strong>+ Nouveau</strong> en haut de la page Documents, ou utilisez le menu d\u00e9roulant <strong>+ Nouveau</strong> sur le tableau de bord. Choisissez Devis, Facture ou Relevé. L\u2019\u00e9diteur s\u2019ouvre en mode guidé.",
        help_q_edit_doc: "Comment modifier un document existant\u00a0?",
        help_a_edit_doc: "Cliquez sur l\u2019<strong>ic\u00f4ne de crayon</strong> sur une carte de document, ou sur <strong>Modifier</strong> dans la fen\u00eatre d\u2019aper\u00e7u PDF. L\u2019\u00e9diteur se rouvre avec tous les champs intacts et pr\u00eats \u00e0 \u00eatre mis \u00e0 jour.",
        help_vl_edit_btn: "Bouton Modifier",
        help_vc_edit: "Modifier",
        help_q_company_profile: "Comment configurer mon profil d\u2019entreprise\u00a0?",
        help_a_company_profile: "Ouvrez <strong>Paramètres</strong> dans la barre lat\u00e9rale, puis cliquez sur <strong>Ouvrir le profil d\u2019entreprise</strong>. Votre nom, adresse, logo, en-t\u00eate et informations de paiement appara\u00eetront sur chaque document g\u00e9n\u00e9r\u00e9.",
        help_q_diff_quote_invoice: "Quelle est la diff\u00e9rence entre un devis et une facture\u00a0?",
        help_a_diff_quote_invoice: "Un <strong>devis</strong> est une estimation de prix envoy\u00e9e avant le d\u00e9but du travail. Une <strong>facture</strong> est une demande de paiement formelle \u00e9mise apr\u00e8s la fin du travail ou la livraison des biens. Vous pouvez passer de l\u2019un \u00e0 l\u2019autre \u00e0 l\u2019\u00e9tape\u00a01 de l\u2019\u00e9diteur.",
        help_q_export_pdf: "Comment exporter un document en PDF\u00a0?",
        help_a_export_pdf: "Cliquez sur l\u2019<strong>ic\u00f4ne de t\u00e9l\u00e9chargement</strong> d\u2019un document enregistr\u00e9 pour r\u00e9cup\u00e9rer le PDF imm\u00e9diatement. Si vous voulez v\u00e9rifier la mise en page d\u2019abord, vous pouvez toujours utiliser l\u2019<strong>\u00e9tape\u00a06 \u2013 Aper\u00e7u final</strong> dans l\u2019\u00e9diteur.",
        help_vl_pdf_preview: "T\u00e9l\u00e9charger le PDF",
        help_vc_preview_pdf: "T\u00e9l\u00e9charger le PDF",
        help_q_reuse_items: "Puis-je enregistrer des lignes d\u2019articles pour les r\u00e9utiliser\u00a0?",
        help_a_reuse_items: "Oui. Les articles r\u00e9utilisables se g\u00e8rent maintenant depuis le <strong>Catalogue</strong>. Gardez le tableau des lignes concentr\u00e9 sur la saisie directe, puis g\u00e9rez les articles r\u00e9utilisables, les prix, les fournisseurs, les emballages et les d\u00e9lais depuis le Catalogue quand n\u00e9cessaire.",
        help_q_payment_terms: "Comment configurer les conditions de paiement sur une facture\u00a0?",
        help_a_payment_terms: "Faites d\u00e9filer jusqu\u2019au panneau <strong>Notes et conditions du document</strong> en bas de l\u2019\u00e9tape\u00a03. Le s\u00e9lecteur <strong>Conditions de paiement</strong> propose quatre options\u00a0: <strong>D\u00fb imm\u00e9diatement</strong> (d\u00e9sactive les autres options et imprime \u201cLe paiement est d\u00fb imm\u00e9diatement \u00e0 la r\u00e9ception\u201d), <strong>Net\u00a015</strong> (\u00e9ch\u00e9ance fix\u00e9e automatiquement \u00e0 15\u00a0jours), <strong>Net\u00a030</strong> (30\u00a0jours), ou <strong>Autre</strong> \u2014 saisissez un nombre de jours personnalis\u00e9 et un texte optionnel. Les cartes de facture affichent la date d\u2019\u00e9ch\u00e9ance calcul\u00e9e et un indicateur de retard le cas \u00e9ch\u00e9ant.",
        help_q_backup: "Comment sauvegarder ou restaurer mes donn\u00e9es\u00a0?",
        help_a_backup: "Ouvrez <strong>Paramètres</strong> dans la barre lat\u00e9rale et utilisez l\u2019option <strong>Sauvegarde JSON</strong> pour exporter un instantané complet de l’espace de travail, y compris les documents, clients et données d’administration. Utilisez <strong>Restaurer JSON</strong> pour importer une sauvegarde. Le serveur conserve désormais aussi des instantanés horodatés pour la récupération.",
        help_q_action_icons: "Que font les ic\u00f4nes d\u2019action sur les cartes de documents\u00a0?",
        help_a_action_icons: "Chaque carte affiche des boutons d\u2019action. L\u2019<strong>ic\u00f4ne de t\u00e9l\u00e9chargement</strong> enregistre le PDF imm\u00e9diatement. L\u2019<strong>ic\u00f4ne de crayon</strong> ouvre le document dans l\u2019\u00e9diteur. Le menu \u00e0 trois points donne acc\u00e8s \u00e0 des actions suppl\u00e9mentaires comme le statut de paiement, la conversion de type et la suppression.",
        help_vl_card_actions: "Boutons d\u2019action de la carte",
        help_q_pdf_preview: "Comment utiliser la fen\u00eatre d\u2019aper\u00e7u PDF\u00a0?",
        help_a_pdf_preview: "La fen\u00eatre d\u2019aper\u00e7u montre le document pr\u00eat \u00e0 l\u2019impression. Utilisez <strong>Imprimer</strong> pour ouvrir la bo\u00eete de dialogue d\u2019impression et enregistrer en PDF. Utilisez <strong>Modifier</strong> pour revenir \u00e0 l\u2019\u00e9diteur avec le document charg\u00e9. <strong>Fermer l\u2019aper\u00e7u</strong> ferme la fen\u00eatre.",
        help_q_filter_docs: "Comment filtrer les documents par type\u00a0?",
        help_a_filter_docs: "Utilisez les onglets <strong>Tous / Devis / Factures / Relev\u00e9s</strong> sous la barre de recherche. Cliquer sur un onglet n\u2019affiche que les documents de ce type dans la m\u00eame vue, sans rechargement. L\u2019onglet Relev\u00e9s affiche les exportations de relev\u00e9 de compte g\u00e9n\u00e9r\u00e9es pr\u00e9c\u00e9demment.",
        help_q_mark_paid: "Comment marquer une facture comme pay\u00e9e\u00a0?",
        help_a_mark_paid: "Sur la page Documents, ouvrez le menu \u00e0 trois points de la carte de facture et s\u00e9lectionnez le statut de paiement appropri\u00e9 \u2014 <strong>Impay\u00e9e</strong>, <strong>En attente</strong> ou <strong>Pay\u00e9e</strong>. Pour un vrai suivi des paiements, ouvrez la facture et utilisez le registre des paiements, ou enregistrez un paiement depuis la page Relev\u00e9s. Les factures pay\u00e9es sont signal\u00e9es visuellement et exclues des calculs de solde impay\u00e9.",
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
        help_a_language: "Utilisez le s\u00e9lecteur de langue dans le pied de la barre lat\u00e9rale (<strong>EN / ES / FR</strong>). L\u2019interface sera imm\u00e9diatement mise \u00e0 jour.",
        help_q_logo_sig: "Puis-je ajouter le logo et la signature de mon entreprise aux documents\u00a0?",
        help_a_logo_sig: "Oui. Ouvrez <strong>Param\u00e8tres</strong> dans la barre lat\u00e9rale, puis cliquez sur <strong>Profil d\u2019entreprise</strong>. Vous pouvez t\u00e9l\u00e9verser une image d\u2019en-t\u00eate, une signature, un tampon et une vague de pied de page \u2014 tous apparaissant automatiquement dans les PDF export\u00e9s.",
        help_q_search: "Comment rechercher un document\u00a0?",
        help_a_search: "Utilisez la barre de recherche en haut de la page Documents. Vous pouvez rechercher par nom de client, num\u00e9ro de r\u00e9f\u00e9rence, date ou mot-cl\u00e9. La m\u00eame requ\u00eate filtre simultan\u00e9ment l\u2019onglet actif \u2014 y compris l\u2019onglet Relev\u00e9s, index\u00e9 par client, fournisseur, r\u00e9f\u00e9rence et date.",
        help_q_snapshot: "Qu\u2019est-ce que la carte rotative sur le tableau de bord\u00a0?",
        help_a_snapshot: "La carte de synth\u00e8se en haut \u00e0 droite du tableau de bord bascule automatiquement toutes les 3\u00a0secondes entre trois indicateurs\u00a0: <strong>Valeur pipeline</strong> (bleu), <strong>Montant factur\u00e9</strong> (vert) et <strong>Revenus re\u00e7us</strong> (ambre). Cliquez sur la carte pour avancer manuellement\u00a0; le minuteur repart de z\u00e9ro.",
        help_q_catalog: "Comment utiliser le Catalogue\u00a0?",
        help_a_catalog: "Cliquez sur <strong>Catalogue</strong> dans la barre lat\u00e9rale. Il affiche les articles r\u00e9utilisables de la biblioth\u00e8que de prix, y compris les entr\u00e9es captur\u00e9es depuis les documents et les articles ajout\u00e9s manuellement. Les entr\u00e9es du catalogue peuvent \u00eatre ins\u00e9r\u00e9es dans les devis ou factures depuis l\u2019\u00e9diteur de lignes.",
        help_q_client_contacts: "Comment ajouter des contacts à un client\u00a0?",
        help_a_client_contacts: "Allez sur la page <strong>Clients</strong> dans la barre lat\u00e9rale. Cliquez sur <strong>Ajouter un client</strong> ou sur l\u2019ic\u00f4ne de modification d\u2019une fiche existante. Ajoutez autant de contacts que n\u00e9cessaire avec nom, e-mail, t\u00e9l\u00e9phone et option WhatsApp. Cliquez sur une fiche pour d\u00e9velopper les d\u00e9tails.",
        help_q_record_payment: "Comment enregistrer un paiement sur une facture\u00a0?",
        help_a_record_payment: "Depuis la page <strong>Relevés</strong>, cliquez sur <strong>+ Enregistrer paiement</strong> dans l\u2019historique — s\u00e9lectionnez la facture, saisissez le montant, la date, le mode et la r\u00e9f\u00e9rence. Vous pouvez aussi ouvrir la facture et ajouter ou ajuster les entr\u00e9es dans le registre des paiements. Les paiements enregistr\u00e9s peuvent d\u00e9sormais aussi \u00eatre supprim\u00e9s depuis l\u2019historique avec une modale de confirmation.",
        help_q_statement_payment: "Puis-je marquer une d\u00e9duction comme paiement\u00a0?",
        help_a_statement_payment: "Oui. Ouvrez l\u2019\u00e9diteur du relevé (crayon), trouvez la d\u00e9duction et cochez <strong>Marquer comme paiement</strong>. En enregistrant, une entr\u00e9e de paiement r\u00e9elle est cr\u00e9\u00e9e sur les factures correspondantes.",
        help_q_aging_clickthrough: "Comment voir les factures d\u2019un client dans le tableau de v\u00e9tust\u00e9\u00a0?",
        help_a_aging_clickthrough: "Sur la page <strong>Relevés</strong>, dans le tableau V\u00e9tust\u00e9 client, cliquez sur une ligne. L\u2019application navigue directement vers les Documents filtr\u00e9s pour ce client.",
        help_q_excel_export: "Puis-je exporter un relevé en Excel\u00a0?",
        help_a_excel_export: "Oui. Sur la ligne du relevé, ouvrez le menu à trois points et choisissez <strong>Exporter en Excel</strong>. Vous obtenez un classeur avec en-t\u00eate, bande de date et une ligne par facture (d\u00e9bits, cr\u00e9dits, solde).",
        help_q_bug_report: "Comment signaler un bug ou demander une fonctionnalit\u00e9\u00a0?",
        help_a_bug_report: "Cliquez sur <strong>Soumettre / Signaler des probl\u00e8mes</strong> dans le pied de page. Renseignez un r\u00e9sum\u00e9, ajoutez des captures et soumettez. Votre rapport est visible par l\u2019administrateur sous <strong>Paramètres</strong>."
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
    setElementText(".hero-copy p", "");
    if (elements.currencyDisplayValue) {
        elements.currencyDisplayValue.textContent = formatAmount(getUsdToDopRate());
    }
}

function updateExchangeRateCopy() {
    updateHeroOperationalSummary();
    elements.itemsContainer.querySelectorAll(".item-currency-mode .field-help").forEach(helpText => {
        helpText.textContent = t("exchange_rate_help", { rate: formatAmount(getUsdToDopRate()) });
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
    elements.newMenuBtn.textContent = `+ ${t("new_action")}`;
    elements.newQuoteMenuBtn.innerHTML = `${ICONS.quote}<span>${escapeHtml(t("new_quote"))}</span>`;
    elements.newInvoiceMenuBtn.innerHTML = `${ICONS.invoice}<span>${escapeHtml(t("new_invoice"))}</span>`;
    if (elements.newProcurementMenuBtn) elements.newProcurementMenuBtn.innerHTML = `${ICONS.procurement}<span>${escapeHtml(t("new_procurement_sheet"))}</span>`;
    elements.newStatementMenuBtn.textContent = t("open_statement_export");
    updateRuntimeModeBadge();
    elements.languageSelect.options[0].textContent = "🇺🇸 English";
    elements.languageSelect.options[1].textContent = "🇩🇴 Español";
    elements.languageSelect.options[2].textContent = "🇫🇷 Français";

    setElementText(".workspace-hero .eyebrow", t("hero_kicker"));
    document.querySelectorAll('[data-page-nav="overview"]').forEach(button => { button.textContent = t("dashboard"); });
    document.querySelectorAll('[data-page-nav="documents"]').forEach(button => { button.textContent = t("documents"); });
    document.querySelectorAll('[data-page-nav="notes"]').forEach(button => { button.textContent = t("item_notes"); });
    document.querySelectorAll('[data-page-nav="clients"]').forEach(button => { button.textContent = t("clients_heading"); });
    document.querySelectorAll('[data-page-nav="catalog"]').forEach(button => { button.textContent = t("catalog"); });
    document.querySelectorAll('[data-page-nav="reports"]').forEach(button => { button.textContent = t("statements"); });
    document.querySelectorAll('[data-page-nav="settings"]').forEach(button => { button.textContent = t("settings"); });
    if (elements.sidebarCalculatorBtn) {
        elements.sidebarCalculatorBtn.innerHTML = getCalculatorButtonMarkup();
        elements.sidebarCalculatorBtn.setAttribute("aria-label", "Calculator");
        elements.sidebarCalculatorBtn.setAttribute("title", "Calculator");
    }
    if (elements.mobileDrawerCalculatorBtn) {
        elements.mobileDrawerCalculatorBtn.innerHTML = getCalculatorButtonMarkup();
        elements.mobileDrawerCalculatorBtn.setAttribute("aria-label", "Calculator");
        elements.mobileDrawerCalculatorBtn.setAttribute("title", "Calculator");
    }
    document.querySelectorAll(".brand-lockup-copy span").forEach(span => { span.textContent = t("document_workspace"); });
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
    } else if (state.valueView === "income") {
        elements.totalValueLabel.textContent = t("income_received");
    } else {
        elements.totalValueLabel.textContent = t("pipeline_value");
    }
    elements.totalValueHint.textContent = "";
    setElementText("#catalogHeading", t("catalog_heading"));
    setElementText("#catalogCopy", t("catalog_copy"));
    setElementHtml("#openCatalogItemModalBtn", `${ICONS.plus}<span>${escapeHtml(t("add_catalog_item"))}</span>`);
    setElementText("#catalogItemModalTitle", state.editingCatalogItemId ? t("update_catalog_item") : t("add_catalog_item"));
    setElementText("#catalogItemNameLabel", t("item_name"));
    setElementText("#catalogItemCostLabel", "Cost Price");
    setElementText("#catalogItemPriceLabel", "Sell Price");
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
    elements.statementFilterButtons?.[0] && (elements.statementFilterButtons[0].textContent = t("statement_filter_pending"));
    elements.statementFilterButtons?.[1] && (elements.statementFilterButtons[1].textContent = t("statement_filter_paid"));
    elements.statementFilterButtons?.[2] && (elements.statementFilterButtons[2].textContent = t("statement_filter_all"));

    setElementText("#documentsPage .page-eyebrow", t("documents"));
    setElementText("#documentsPage .page-header h2", t("documents_heading"));
    setElementText("#documentsPage .dashboard-subtitle", t("documents_subtitle"));
    setElementText("#clientsPage .page-eyebrow", t("client"));
    setElementText("#clientsPage .page-header h2", t("clients_heading"));
    setElementText("#clientsPage .dashboard-subtitle", t("clients_subtitle"));
    setElementText("#addClientBtn", `+ ${t("add_client")}`);
    setElementText("#reportsPage .page-eyebrow", t("statements"));
    setElementText("#reportsPage .page-header h2", t("reports_heading"));
    setElementText("#reportsPage .dashboard-subtitle", t("reports_subtitle"));
    setElementText("#reportsPage .settings-panel:nth-of-type(1) .settings-panel-header h4", t("statement_exports_heading"));
    setElementText("#reportsPage .settings-panel:nth-of-type(1) .settings-panel-header p", t("statement_exports_copy"));
    setElementText("#reportsPage .settings-panel:nth-of-type(2) .settings-panel-header h4", t("payment_history_heading"));
    setElementText("#reportsPage .settings-panel:nth-of-type(2) .settings-panel-header p", t("payment_history_copy"));
    setElementText("#logPaymentBtn", `+ ${t("log_payment")}`);
    setElementText("#reportsPage .settings-panel:nth-of-type(3) .settings-panel-header h4", t("aging_heading"));
    setElementText("#reportsPage .settings-panel:nth-of-type(3) .settings-panel-header p", t("aging_copy"));

    setElementText("#settingsModal .page-eyebrow", t("settings"));
    setElementText("#settingsModal h2", t("settings_heading"));
    setElementText("#settingsModal .dashboard-subtitle", t("settings_subtitle"));

    const settingsPanels = elements.settingsModal.querySelectorAll(".settings-panel");
    settingsPanels[0].querySelector("h4").textContent = t("issue_inbox");
    settingsPanels[0].querySelector(".settings-panel-header p").textContent = t("issue_inbox_copy");
    elements.settingsIssueInboxBtn.textContent = t("open_service_reports");
    settingsPanels[1].querySelector("h4").textContent = t("editor_preferences");
    settingsPanels[1].querySelector(".settings-panel-header p").textContent = t("editor_preferences_copy");
    settingsPanels[1].querySelector("span").textContent = t("show_internal_pricing");
    settingsPanels[2].querySelector("h4").textContent = t("data_transfer_title");
    settingsPanels[2].querySelector(".settings-panel-header p").textContent = t("data_transfer_copy");
    setElementText("#openDataToolsBtn", t("open_data_tools"));
    setElementText("#dataToolsTitle", t("data_tools_title"));
    setElementText("#dataToolsCopy", t("data_tools_copy"));
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
    settingsPanels[3].querySelector("h4").textContent = t("snapshots_title");
    settingsPanels[3].querySelector(".settings-panel-header p").textContent = t("snapshots_copy");
    settingsPanels[4].querySelector("h4").textContent = t("local_testing");
    settingsPanels[4].querySelector(".settings-panel-header p").textContent = t("local_testing_copy");
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
    setElementText("#exportInvoiceReportExcelBtn", t("export_selected_excel"));
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
    setElementText("#generateStatementExcelBtn", t("statement_generate_excel"));
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
    elements.companyAddressInput.placeholder = t("company_address_placeholder");
    elements.companyEmailInput.placeholder = t("company_email_placeholder");
    elements.companyPhoneInput.placeholder = t("company_phone_placeholder");
    elements.companyWebsiteInput.placeholder = t("company_website_placeholder");
    elements.companyTaxIdInput.placeholder = t("company_tax_id_placeholder");
    elements.saveCompanyProfileBtn.textContent = t("save_company_profile");
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
    setElementText("#clientActivityModalTitle", t("client_activity_modal_title"));
    setElementText("#clientActivityModalCopy", t("client_activity_modal_copy"));
    setElementText("#accountAdminPage .dashboard-topbar h2", t("account_admin_title"));
    setElementText("#accountAdminPage .dashboard-subtitle", t("account_admin_subtitle"));
    setElementText("#accountAdminWorkspaceBtn", t("workspace"));
    setElementText("#accountAdminCatalogBtn", t("catalog"));
    setElementText(".account-admin-owner-card .overview-kicker", t("owner_access"));
    setElementText("#accountAdminOwnerMeta", t("signed_in_as_owner"));
    setElementText("#accountAdminOwnerBadge", t("owner_role"));
    setElementText(elements.accountUserCountStat?.previousElementSibling, t("registered_users"));
    setElementText(elements.accountSubaccountCountStat.previousElementSibling, t("sub_accounts"));
    setElementText(elements.accountSessionCountStat.previousElementSibling, t("recent_sessions"));
    setElementText(elements.accountActivityCountStat.previousElementSibling, t("activity_events"));
    const accountListPanel = elements.accountAdminUserList?.closest(".settings-panel");
    setElementText(accountListPanel?.querySelector("h4"), t("registered_accounts"));
    setElementText(accountListPanel?.querySelector(".settings-panel-header p"), t("registered_accounts_copy"));
    setElementText("#accountAdminFormTitle", t("add_workspace_account"));
    const accountFormPanel = elements.accountAdminFormTitle?.closest(".settings-panel");
    setElementText(accountFormPanel?.querySelector(".settings-panel-header p"), t("add_workspace_account_copy"));
    setElementText(elements.accountAdminRoleSelect?.closest(".form-group")?.querySelector("span"), t("role"));
    elements.accountAdminRoleSelect.options[0].textContent = t("role_user");
    elements.accountAdminRoleSelect.options[1].textContent = t("role_admin");
    setElementText(elements.accountAdminAccessLevelSelect?.closest(".form-group")?.querySelector("span"), t("access_level"));
    elements.accountAdminAccessLevelSelect.options[0].textContent = t("access_workspace");
    elements.accountAdminAccessLevelSelect.options[1].textContent = t("access_operations");
    elements.accountAdminAccessLevelSelect.options[2].textContent = t("access_review");
    setElementText(elements.accountAdminParentSelect?.closest(".form-group")?.querySelector("span"), t("parent_account"));
    elements.accountAdminParentSelect.options[0].textContent = t("direct_account_for_workspace");
    setElementText("#accountAdminCancelEditBtn", t("cancel_edit"));
    setElementText("#saveBrandAssetsBtn", t("save_brand_assets"));
    setElementText("#clearSignatureAssetBtn", t("clear_signature"));
    setElementText("#clearStampAssetBtn", t("clear_stamp"));
    document.querySelector('label[for="accountSignatureInput"]')?.replaceChildren(document.createTextNode(t("upload_signature")));
    document.querySelector('label[for="accountStampInput"]')?.replaceChildren(document.createTextNode(t("upload_stamp")));
    const brandingPanel = elements.saveBrandAssetsBtn?.closest(".settings-panel");
    setElementText(brandingPanel?.querySelector("h4"), t("document_branding"));
    setElementText(brandingPanel?.querySelector(".settings-panel-header p"), t("document_branding_copy"));
    const sessionPanel = elements.accountSessionLogList?.closest(".settings-panel");
    setElementText(sessionPanel?.querySelector("h4"), t("login_session_reports"));
    setElementText(sessionPanel?.querySelector(".settings-panel-header p"), t("login_session_reports_copy"));
    const activityPanel = elements.accountActivityLogList?.closest(".settings-panel");
    setElementText(activityPanel?.querySelector("h4"), t("workspace_activity"));
    setElementText(activityPanel?.querySelector(".settings-panel-header p"), t("workspace_activity_copy"));

    renderBrandAssets();
    updateStaticEditorTranslations();
    updateEditorSummary();
    renderUserManagementList();
    renderClientManagementList();
    renderIssueInbox();
    renderInvoiceReport();
    updateInboxBadge();
    renderExportSelectionList();
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
    setElementText("#finalPreviewOptionsLabel", t("pdf_options"));
    setElementText("#includeSignatureLabel", t("include_signature"));
    setElementText("#includeSignatureHelp", t("include_signature_help"));
    setElementText("#includeStampLabel", t("include_stamp"));
    setElementText("#includeStampHelp", t("include_stamp_help"));
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
    elements.notesPage = document.getElementById("notesPage");
    elements.clientsPage = document.getElementById("clientsPage");
    elements.reportsPage = document.getElementById("reportsPage");
    elements.sidebarNav = document.getElementById("sidebarNav");
    elements.sidebarBrandLogo = document.getElementById("sidebarBrandLogo");
    elements.pageNavButtons = Array.from(document.querySelectorAll("[data-page-nav]"));
    elements.settingsNavBtn = document.getElementById("settingsNavBtn");
    elements.settingsDrawerBtn = document.getElementById("settingsDrawerBtn");
    elements.sidebarCalculatorBtn = document.getElementById("sidebarCalculatorBtn");
    elements.mobileDrawerCalculatorBtn = document.getElementById("mobileDrawerCalculatorBtn");
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
    elements.newProcurementMenuBtn = document.getElementById("newProcurementMenuBtn");
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
    elements.quickPaymentModal = document.getElementById("quickPaymentModal");
    elements.closeQuickPaymentModalBtn = document.getElementById("closeQuickPaymentModalBtn");
    elements.notesDrawer = document.getElementById("notesDrawer");
    elements.notesDrawerOverlay = document.getElementById("notesDrawerOverlay");
    elements.notesDrawerFeed = document.getElementById("notesDrawerFeed");
    elements.notesDrawerInput = document.getElementById("notesDrawerInput");
    elements.notesDrawerSubmitBtn = document.getElementById("notesDrawerSubmitBtn");
    elements.notesDrawerRef = document.getElementById("notesDrawerRef");
    elements.closeNotesDrawerBtn = document.getElementById("closeNotesDrawerBtn");
    elements.quickPaymentSummary = document.getElementById("quickPaymentSummary");
    elements.quickPaymentHistory = document.getElementById("quickPaymentHistory");
    elements.quickPaymentDateInput = document.getElementById("quickPaymentDateInput");
    elements.quickPaymentAmountInput = document.getElementById("quickPaymentAmountInput");
    elements.quickPaymentMethodInput = document.getElementById("quickPaymentMethodInput");
    elements.quickPaymentReferenceInput = document.getElementById("quickPaymentReferenceInput");
    elements.quickPaymentNotesInput = document.getElementById("quickPaymentNotesInput");
    elements.saveQuickPaymentBtn = document.getElementById("saveQuickPaymentBtn");
    elements.logPaymentBtn = document.getElementById("logPaymentBtn");
    elements.quickPaymentInvoicePicker = document.getElementById("quickPaymentInvoicePicker");
    elements.quickPaymentInvoiceSelect = document.getElementById("quickPaymentInvoiceSelect");
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
    elements.exportInvoiceReportExcelBtn = document.getElementById("exportInvoiceReportExcelBtn");
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
    elements.generateStatementExcelBtn = document.getElementById("generateStatementExcelBtn");
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
    elements.paymentDeleteConfirmModal = document.getElementById("paymentDeleteConfirmModal");
    elements.closePaymentDeleteConfirmModalBtn = document.getElementById("closePaymentDeleteConfirmModalBtn");
    elements.cancelPaymentDeleteConfirmBtn = document.getElementById("cancelPaymentDeleteConfirmBtn");
    elements.confirmPaymentDeleteConfirmBtn = document.getElementById("confirmPaymentDeleteConfirmBtn");
    elements.paymentDeleteConfirmSummary = document.getElementById("paymentDeleteConfirmSummary");
    elements.catalogPage = document.getElementById("catalogPage");
    elements.statementsPage = document.getElementById("statementsPage");
    elements.statementExportsList = document.getElementById("statementExportsList");
    elements.statementFilterButtons = Array.from(document.querySelectorAll("[data-statement-filter]"));
    elements.paymentExposureAlerts = document.getElementById("paymentExposureAlerts");
    elements.paymentHistoryMetrics = document.getElementById("paymentHistoryMetrics");
    elements.paymentHistoryTableBody = document.getElementById("paymentHistoryTableBody");
    elements.agingMetrics = document.getElementById("agingMetrics");
    elements.clientAgingTableBody = document.getElementById("clientAgingTableBody");
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
    elements.pricingLibrarySearch = document.getElementById("pricingLibrarySearch");
    elements.pricingLibraryCategoryFilter = document.getElementById("pricingLibraryCategoryFilter");
    elements.pricingLibrarySupplierFilter = document.getElementById("pricingLibrarySupplierFilter");
    elements.pricingLibrarySortOrder = document.getElementById("pricingLibrarySortOrder");
    elements.pricingLibraryImageFilter = document.getElementById("pricingLibraryImageFilter");
    elements.openCatalogItemModalBtn = document.getElementById("openCatalogItemModalBtn");
    elements.catalogItemModal = document.getElementById("catalogItemModal");
    elements.closeCatalogItemModalBtn = document.getElementById("closeCatalogItemModalBtn");
    elements.catalogDetailsModal = document.getElementById("catalogDetailsModal");
    elements.closeCatalogDetailsModalBtn = document.getElementById("closeCatalogDetailsModalBtn");
    elements.catalogDetailsTitle = document.getElementById("catalogDetailsTitle");
    elements.catalogDetailsImage = document.getElementById("catalogDetailsImage");
    elements.catalogDetailsExpandImageBtn = document.getElementById("catalogDetailsExpandImageBtn");
    elements.catalogDetailsFallback = document.getElementById("catalogDetailsFallback");
    elements.catalogItemImageExpandModal = document.getElementById("catalogItemImageExpandModal");
    elements.catalogItemImageExpandImg = document.getElementById("catalogItemImageExpandImg");
    elements.catalogItemImageExpandTitle = document.getElementById("catalogItemImageExpandTitle");
    elements.closeCatalogItemImageExpandModalBtn = document.getElementById("closeCatalogItemImageExpandModalBtn");
    elements.catalogDetailsName = document.getElementById("catalogDetailsName");
    elements.catalogDetailsMeta = document.getElementById("catalogDetailsMeta");
    elements.catalogDetailsPrice = document.getElementById("catalogDetailsPrice");
    elements.catalogDetailsCategory = document.getElementById("catalogDetailsCategory");
    elements.catalogDetailsBrand = document.getElementById("catalogDetailsBrand");
    elements.catalogDetailsUnitSize = document.getElementById("catalogDetailsUnitSize");
    elements.catalogDetailsVendor = document.getElementById("catalogDetailsVendor");
    elements.catalogDetailsEditItemBtn = document.getElementById("catalogDetailsEditItemBtn");
    elements.catalogDetailsText = document.getElementById("catalogDetailsText");
    elements.catalogDetailsNotes = document.getElementById("catalogDetailsNotes");
    elements.catalogDetailsRefId = document.getElementById("catalogDetailsRefId");
    elements.catalogDetailsCostPrice = document.getElementById("catalogDetailsCostPrice");
    elements.catalogDetailsCurrency = document.getElementById("catalogDetailsCurrency");
    elements.catalogDetailsUnit = document.getElementById("catalogDetailsUnit");
    elements.catalogDetailsLeadTime = document.getElementById("catalogDetailsLeadTime");
    elements.catalogDetailsCountry = document.getElementById("catalogDetailsCountry");
    elements.catalogDetailsTax = document.getElementById("catalogDetailsTax");
    elements.catalogDetailsDocRefsSection = document.getElementById("catalogDetailsDocRefsSection");
    elements.catalogDetailsDocRefs = document.getElementById("catalogDetailsDocRefs");
    elements.catalogDetailsAddToDocBtn = document.getElementById("catalogDetailsAddToDocBtn");
    elements.catalogDetailsDocPicker = document.getElementById("catalogDetailsDocPicker");
    elements.catalogDetailsDocPickerList = document.getElementById("catalogDetailsDocPickerList");
    elements.notesDrawerTabs = document.getElementById("notesDrawerTabs");
    elements.notesDrawerCompose = document.getElementById("notesDrawerCompose");
    elements.catalogItemNameInput = document.getElementById("catalogItemNameInput");
    elements.catalogItemCostInput = document.getElementById("catalogItemCostInput");
    elements.catalogItemPriceInput = document.getElementById("catalogItemPriceInput");
    elements.catalogItemCurrencyInput = document.getElementById("catalogItemCurrencyInput");
    elements.catalogItemCategoryInput = document.getElementById("catalogItemCategoryInput");
    elements.catalogItemBrandInput = document.getElementById("catalogItemBrandInput");
    elements.catalogItemUnitSizeInput = document.getElementById("catalogItemUnitSizeInput");
    elements.catalogItemUnitInput = document.getElementById("catalogItemUnitInput");
    elements.catalogItemVendorInput = document.getElementById("catalogItemVendorInput");
    elements.catalogItemLeadTimeInput = document.getElementById("catalogItemLeadTimeInput");
    elements.catalogItemCountryInput = document.getElementById("catalogItemCountryInput");
    elements.catalogItemTaxIncludedInput = document.getElementById("catalogItemTaxIncludedInput");
    elements.catalogItemTagsInput = document.getElementById("catalogItemTagsInput");
    elements.catalogItemDetailsInput = document.getElementById("catalogItemDetailsInput");
    elements.catalogItemNotesInput = document.getElementById("catalogItemNotesInput");
    elements.saveCatalogItemBtn = document.getElementById("saveCatalogItemBtn");
    elements.archiveCatalogItemBtn = document.getElementById("archiveCatalogItemBtn");
    elements.catalogItemImageInput = document.getElementById("catalogItemImageInput");
    elements.catalogItemImageRemoveBtn = document.getElementById("catalogItemImageRemoveBtn");
    elements.catalogItemImagePreview = document.getElementById("catalogItemImagePreview");
    elements.catalogItemImagePreviewImg = document.getElementById("catalogItemImagePreviewImg");
    elements.catalogItemImageStatus = document.getElementById("catalogItemImageStatus");
    elements.catalogItemCropModal = document.getElementById("catalogItemCropModal");
    elements.catalogItemCropCanvas = document.getElementById("catalogItemCropCanvas");
    elements.catalogItemCropSelection = document.getElementById("catalogItemCropSelection");
    elements.closeCatalogItemCropModalBtn = document.getElementById("closeCatalogItemCropModalBtn");
    elements.cancelCatalogItemCropBtn = document.getElementById("cancelCatalogItemCropBtn");
    elements.applyCatalogItemCropBtn = document.getElementById("applyCatalogItemCropBtn");
    elements.catalogSelectionToolbar = document.getElementById("catalogSelectionToolbar");
    elements.catalogSelectionTitle = document.getElementById("catalogSelectionTitle");
    elements.exportCatalogReportBtn = document.getElementById("exportCatalogReportBtn");
    elements.clearCatalogSelectionBtn = document.getElementById("clearCatalogSelectionBtn");
    elements.toggleCatalogSelectionModeBtn = document.getElementById("toggleCatalogSelectionModeBtn");
    elements.closeCompanyProfileModalBtn = document.getElementById("closeCompanyProfileModalBtn");
    elements.companyNameInput = document.getElementById("companyNameInput");
    elements.companyTaglineInput = document.getElementById("companyTaglineInput");
    elements.companyAddressInput = document.getElementById("companyAddressInput");
    elements.companyEmailInput = document.getElementById("companyEmailInput");
    elements.companyPhoneInput = document.getElementById("companyPhoneInput");
    elements.companyWebsiteInput = document.getElementById("companyWebsiteInput");
    elements.companyTaxIdInput = document.getElementById("companyTaxIdInput");
    elements.saveCompanyProfileBtn = document.getElementById("saveCompanyProfileBtn");
    elements.aboutModal = document.getElementById("aboutModal");
    elements.aboutBrandLogo = document.getElementById("aboutBrandLogo");
    elements.closeAboutModalBtn = document.getElementById("closeAboutModalBtn");
    elements.showInternalPricingToggle = document.getElementById("showInternalPricingToggle");
    elements.clientManagementList = document.getElementById("clientManagementList");
    elements.clientsPageHeaderActions = document.getElementById("clientsPageHeaderActions");
    elements.addClientBtn = document.getElementById("addClientBtn");
    elements.clientModal = document.getElementById("clientModal");
    elements.clientModalTitle = document.getElementById("clientModalTitle");
    elements.clientModalName = document.getElementById("clientModalName");
    elements.clientModalAddress = document.getElementById("clientModalAddress");
    elements.clientModalConsigneeName = document.getElementById("clientModalConsigneeName");
    elements.clientModalConsigneeAddress = document.getElementById("clientModalConsigneeAddress");
    elements.clientModalContactsList = document.getElementById("clientModalContactsList");
    elements.addClientContactBtn = document.getElementById("addClientContactBtn");
    elements.saveClientModalBtn = document.getElementById("saveClientModalBtn");
    elements.cancelClientModalBtn = document.getElementById("cancelClientModalBtn");
    elements.closeClientModalBtn = document.getElementById("closeClientModalBtn");
    elements.clientActivityModal = document.getElementById("clientActivityModal");
    elements.clientActivityModalTitle = document.getElementById("clientActivityModalTitle");
    elements.clientActivityModalCopy = document.getElementById("clientActivityModalCopy");
    elements.clientActivityModalList = document.getElementById("clientActivityModalList");
    elements.closeClientActivityModalBtn = document.getElementById("closeClientActivityModalBtn");
    elements.notesRecordModal = document.getElementById("notesRecordModal");
    elements.closeNotesRecordModalBtn = document.getElementById("closeNotesRecordModalBtn");
    elements.notesRecordModalTitle = document.getElementById("notesRecordModalTitle");
    elements.notesRecordModalCopy = document.getElementById("notesRecordModalCopy");
    elements.notesRecordModalType = document.getElementById("notesRecordModalType");
    elements.notesRecordModalReference = document.getElementById("notesRecordModalReference");
    elements.notesRecordModalClient = document.getElementById("notesRecordModalClient");
    elements.notesRecordSummaryGrid = document.getElementById("notesRecordSummaryGrid");
    elements.notesRecordNotesList = document.getElementById("notesRecordNotesList");
    elements.notesRecordNotesCount = document.getElementById("notesRecordNotesCount");
    elements.notesRecordOpenClientBtn = document.getElementById("notesRecordOpenClientBtn");
    elements.notesRecordManageNotesBtn = document.getElementById("notesRecordManageNotesBtn");
    elements.notesRecordOpenDocumentBtn = document.getElementById("notesRecordOpenDocumentBtn");
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
    elements.notesSearchInput = document.getElementById("notesSearchInput");
    elements.notesClientFilter = document.getElementById("notesClientFilter");
    elements.notesFilterButtons = Array.from(document.querySelectorAll("[data-notes-filter]"));
    elements.notesPageSummary = document.getElementById("notesPageSummary");
    elements.notesFeed = document.getElementById("notesFeed");
    elements.documentsSelectionToolbar = document.getElementById("documentsSelectionToolbar");
    elements.documentsSelectionTitle = document.getElementById("documentsSelectionTitle");
    elements.documentsSelectionMeta = document.getElementById("documentsSelectionMeta");
    elements.selectVisibleDocumentsBtn = document.getElementById("selectVisibleDocumentsBtn");
    elements.clearSelectedDocumentsBtn = document.getElementById("clearSelectedDocumentsBtn");
    elements.downloadSelectedDocumentsZipBtn = document.getElementById("downloadSelectedDocumentsZipBtn");
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
    elements.internalNotes = document.getElementById("internalNotes");
    elements.paymentTerms = document.getElementById("paymentTerms");
    elements.paymentTermsImmediate = document.getElementById("paymentTermsImmediate");
    elements.paymentTermsOptions = document.getElementById("paymentTermsOptions");
    elements.paymentTermsOtherFields = document.getElementById("paymentTermsOtherFields");
    elements.paymentTermsDays = document.getElementById("paymentTermsDays");
    elements.paymentTermsCustomText = document.getElementById("paymentTermsCustomText");
    elements.paymentLedgerPanel = document.getElementById("paymentLedgerPanel");
    elements.paymentLedgerSummary = document.getElementById("paymentLedgerSummary");
    elements.paymentLedgerInvoiceTotal = document.getElementById("paymentLedgerInvoiceTotal");
    elements.paymentLedgerPaidTotal = document.getElementById("paymentLedgerPaidTotal");
    elements.paymentLedgerBalance = document.getElementById("paymentLedgerBalance");
    elements.paymentLedgerList = document.getElementById("paymentLedgerList");
    elements.addPaymentEntryBtn = document.getElementById("addPaymentEntryBtn");
    elements.includeSignature = document.getElementById("includeSignature");
    elements.includeStamp = document.getElementById("includeStamp");
    elements.documentLibrarySelect = document.getElementById("documentLibrarySelect");
    elements.insertDocumentLibraryItemBtn = document.getElementById("insertDocumentLibraryItemBtn");
    elements.createDocumentLibraryItemBtn = document.getElementById("createDocumentLibraryItemBtn");
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
    elements.overviewNewProcurementBtn = document.getElementById("overviewNewProcurementBtn");
    elements.overviewNewStatementBtn = document.getElementById("overviewNewStatementBtn");
    elements.procurementSheetModal = document.getElementById("procurementSheetModal");
    elements.procurementSheetTitle = document.getElementById("procurementSheetTitle");
    elements.closeProcurementSheetModalBtn = document.getElementById("closeProcurementSheetModalBtn");
    elements.procurementRefNumberInput = document.getElementById("procurementRefNumberInput");
    elements.procurementDateInput = document.getElementById("procurementDateInput");
    elements.procurementClientInput = document.getElementById("procurementClientInput");
    elements.procurementCurrencyInput = document.getElementById("procurementCurrencyInput");
    elements.procurementNotesInput = document.getElementById("procurementNotesInput");
    elements.procurementLibrarySelect = document.getElementById("procurementLibrarySelect");
    elements.insertProcurementLibraryItemBtn = document.getElementById("insertProcurementLibraryItemBtn");
    elements.createProcurementLibraryItemBtn = document.getElementById("createProcurementLibraryItemBtn");
    elements.procurementRowsContainer = document.getElementById("procurementRowsContainer");
    elements.addProcurementRowBtn = document.getElementById("addProcurementRowBtn");
    elements.importProcurementDropdown = document.getElementById("importProcurementDropdown");
    elements.importProcurementDropdownBtn = document.getElementById("importProcurementDropdownBtn");
    elements.exportProcurementDropdown = document.getElementById("exportProcurementDropdown");
    elements.exportProcurementDropdownBtn = document.getElementById("exportProcurementDropdownBtn");
    elements.procurementCsvFileInput = document.getElementById("procurementCsvFileInput");
    elements.procurementXlsxFileInput = document.getElementById("procurementXlsxFileInput");
    elements.selectAllProcurementRows = document.getElementById("selectAllProcurementRows");
    elements.convertSelectedToQuoteBtn = document.getElementById("convertSelectedToQuoteBtn");
    elements.convertProcurementToQuoteBtn = document.getElementById("convertProcurementToQuoteBtn");
    elements.saveProcurementSheetBtn = document.getElementById("saveProcurementSheetBtn");
    elements.procurementTranslateBtn = document.getElementById("procurementTranslateBtn");
    elements.procTranslatePanel = document.getElementById("procTranslatePanel");
    elements.procTranslatePreviewBtn = document.getElementById("procTranslatePreviewBtn");
    elements.procTranslateDuplicateBtn = document.getElementById("procTranslateDuplicateBtn");
    elements.procTranslateInPlaceBtn = document.getElementById("procTranslateInPlaceBtn");
    elements.procTranslateStatus = document.getElementById("procTranslateStatus");
    elements.procTranslatePreview = document.getElementById("procTranslatePreview");
    elements.procColumnsDropdown = document.getElementById("procColumnsDropdown");
    elements.procColumnsDropdownBtn = document.getElementById("procColumnsDropdownBtn");
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
    elements.modalHelpBtn = document.getElementById("modalHelpBtn");
    elements.modalHelpPanel = document.getElementById("modalHelpPanel");
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
    elements.tagSuggestions = document.getElementById("tagSuggestions");
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
    elements.overviewNewProcurementBtn?.addEventListener("click", () => {
        closeOverviewNewMenu();
        openProcurementSheetModal();
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
    elements.newProcurementMenuBtn?.addEventListener("click", () => {
        closeNewMenu();
        openProcurementSheetModal();
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
    elements.closePaymentDeleteConfirmModalBtn?.addEventListener("click", closePaymentDeleteConfirmModal);
    elements.cancelPaymentDeleteConfirmBtn?.addEventListener("click", closePaymentDeleteConfirmModal);
    elements.confirmPaymentDeleteConfirmBtn?.addEventListener("click", () => {
        void confirmPendingPaymentDelete();
    });
    elements.openAboutBtn.addEventListener("click", openAboutModal);
    elements.closeIssueReportModalBtn.addEventListener("click", closeIssueReportModal);
    elements.closeCompanyProfileModalBtn.addEventListener("click", closeCompanyProfileModal);
    elements.accountAdminWorkspaceBtn?.addEventListener("click", () => setActivePage("overview"));
    elements.accountAdminCatalogBtn?.addEventListener("click", openCatalogPage);
    elements.openCatalogItemModalBtn.addEventListener("click", openCatalogItemModal);
    elements.closeCatalogItemModalBtn.addEventListener("click", closeCatalogItemModal);
    elements.closeCatalogDetailsModalBtn.addEventListener("click", closeCatalogDetailsModal);
    elements.closeCatalogItemImageExpandModalBtn?.addEventListener("click", closeCatalogItemImageExpand);
    elements.catalogItemImageExpandModal?.addEventListener("click", event => {
        if (event.target === elements.catalogItemImageExpandModal) closeCatalogItemImageExpand();
    });
    elements.catalogDetailsExpandImageBtn?.addEventListener("click", () => {
        const src = elements.catalogDetailsExpandImageBtn.dataset.expandSrc;
        const alt = elements.catalogDetailsExpandImageBtn.dataset.expandAlt;
        if (src) openCatalogItemImageExpand(src, alt);
    });
    elements.catalogDetailsEditItemBtn?.addEventListener("click", () => {
        if (!state.pendingCatalogInsertItem) return;
        openCatalogItemModal({ item: state.pendingCatalogInsertItem });
        closeCatalogDetailsModal();
    });
    elements.saveCatalogItemBtn.addEventListener("click", saveCatalogItemFromModal);
    elements.archiveCatalogItemBtn?.addEventListener("click", archiveCatalogItemFromModal);
    elements.catalogItemImageInput?.addEventListener("change", handleCatalogItemImageInputChange);
    elements.catalogItemImageRemoveBtn?.addEventListener("click", clearCatalogItemImage);
    elements.closeCatalogItemCropModalBtn?.addEventListener("click", closeCatalogItemCropModal);
    elements.cancelCatalogItemCropBtn?.addEventListener("click", skipCatalogItemCrop);
    elements.applyCatalogItemCropBtn?.addEventListener("click", applyCatalogItemCrop);
    elements.catalogGrid.addEventListener("click", handleCatalogGridClick);
    elements.catalogGrid.addEventListener("change", handleCatalogGridChange);
    elements.clearCatalogSelectionBtn?.addEventListener("click", clearCatalogSelection);
    elements.exportCatalogReportBtn?.addEventListener("click", () => { void exportCatalogItemReport(); });
    elements.toggleCatalogSelectionModeBtn?.addEventListener("click", () => {
        if (state.selectedCatalogItemIds.length > 0) {
            clearCatalogSelection();
        } else {
            const toolbar = elements.catalogSelectionToolbar;
            if (toolbar) toolbar.hidden = false;
            syncCatalogSelectionToolbar();
        }
    });
    elements.pricingLibrarySearch?.addEventListener("input", event => {
        state.pricingSearchQuery = event.target.value.trim().toLowerCase();
        renderCatalog();
    });
    elements.pricingLibraryCategoryFilter?.addEventListener("change", event => {
        state.pricingCategoryFilter = event.target.value || "all";
        renderCatalog();
    });
    elements.pricingLibrarySupplierFilter?.addEventListener("change", event => {
        state.pricingSupplierFilter = event.target.value || "all";
        renderCatalog();
    });
    elements.pricingLibrarySortOrder?.addEventListener("change", event => {
        state.pricingSortOrder = event.target.value || "date_desc";
        renderCatalog();
    });
    elements.pricingLibraryImageFilter?.addEventListener("change", event => {
        state.pricingImageFilter = event.target.value || "all";
        renderCatalog();
    });
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
    elements.closeQuickPaymentModalBtn?.addEventListener("click", closeQuickPaymentModal);
    elements.saveQuickPaymentBtn?.addEventListener("click", saveQuickPaymentEntry);
    elements.closeNotesDrawerBtn?.addEventListener("click", closeNotesDrawer);
    elements.notesDrawerOverlay?.addEventListener("click", closeNotesDrawer);
    elements.notesDrawerSubmitBtn?.addEventListener("click", submitNote);
    elements.notesDrawerInput?.addEventListener("keydown", event => {
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            submitNote();
        }
    });
    elements.notesDrawerFeed?.addEventListener("click", handleNotesFeedClick);
    elements.logPaymentBtn?.addEventListener("click", openLogPaymentModal);
    elements.quickPaymentInvoiceSelect?.addEventListener("change", handleLogPaymentInvoiceChange);
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
    elements.exportInvoiceReportExcelBtn.addEventListener("click", exportSelectedInvoiceReportExcel);
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
    elements.generateStatementExcelBtn.addEventListener("click", exportStatementOfAccountExcelFromSelection);
    elements.confirmStatementExportBtn.addEventListener("click", exportStatementOfAccountPdf);
    elements.closeStatementEditModalBtn?.addEventListener("click", closeStatementEditModal);
    elements.addStatementRowBtn?.addEventListener("click", addStatementEditRow);
    elements.addStatementDeductionBtn?.addEventListener("click", addStatementEditDeduction);
    elements.statementEditRows?.addEventListener("click", handleStatementEditRowsClick);
    elements.statementEditRows?.addEventListener("input", syncStatementEditTotalsUi);
    elements.statementEditDeductions?.addEventListener("click", handleStatementEditDeductionsClick);
    elements.statementEditDeductions?.addEventListener("input", syncStatementEditTotalsUi);
    elements.statementEditDeductions?.addEventListener("change", event => {
        const checkbox = event.target.closest('[data-statement-deduction-field="isPayment"]');
        if (!checkbox) return;
        const card = checkbox.closest("[data-statement-deduction-id]");
        const dateField = card?.querySelector(".statement-deduction-date-field");
        if (dateField) dateField.hidden = !checkbox.checked;
    });
    elements.statementEditNoteInput?.addEventListener("input", syncStatementEditTotalsUi);
    elements.previewStatementEditBtn?.addEventListener("click", () => saveStatementEdit({ openPreview: true }));
    elements.saveStatementEditBtn?.addEventListener("click", () => saveStatementEdit({ openPreview: false }));
    elements.closeProcurementSheetModalBtn?.addEventListener("click", closeProcurementSheetModal);
    elements.procurementSheetModal?.addEventListener("click", event => {
        if (event.target === elements.procurementSheetModal) {
            closeProcurementSheetModal();
        }
    });
    elements.addProcurementRowBtn?.addEventListener("click", () => addProcurementRow());
    elements.procurementCsvFileInput?.addEventListener("change", handleProcurementCsvImport);
    elements.procurementXlsxFileInput?.addEventListener("change", handleProcurementXlsxImport);
    elements.procurementRowsContainer?.addEventListener("input", e => {
        refreshProcurementRowOrdering();
        refreshProcurementRowTotals();
        const rowEl = e.target.closest(".procurement-row");
        if (rowEl && e.target.matches('[data-procurement-field="notes"]')) {
            updateProcNotesIconDot(rowEl);
        }
    });
    elements.procurementRowsContainer?.addEventListener("change", handleProcurementRowsChange);
    elements.procurementRowsContainer?.addEventListener("click", handleProcurementRowsClick);
    elements.insertProcurementLibraryItemBtn?.addEventListener("click", insertSelectedLibraryItemIntoProcurement);
    elements.createProcurementLibraryItemBtn?.addEventListener("click", () => openCatalogItemModal({ returnToProcurement: true }));
    elements.saveProcurementSheetBtn?.addEventListener("click", () => saveProcurementSheet({ keepOpen: true }));
    elements.convertSelectedToQuoteBtn?.addEventListener("click", convertSelectedProcurementRowsToQuote);
    elements.convertProcurementToQuoteBtn?.addEventListener("click", convertOpenProcurementToQuote);
    elements.selectAllProcurementRows?.addEventListener("change", handleSelectAllProcurementRows);
    // Procurement Import / Export dropdowns
    elements.importProcurementDropdownBtn?.addEventListener("click", e => {
        e.stopPropagation();
        toggleProcurementDropdown(elements.importProcurementDropdown);
    });
    elements.exportProcurementDropdownBtn?.addEventListener("click", e => {
        e.stopPropagation();
        toggleProcurementDropdown(elements.exportProcurementDropdown);
    });
    elements.importProcurementDropdown?.addEventListener("click", e => {
        const btn = e.target.closest("[data-procurement-import]");
        if (!btn) return;
        closeProcurementDropdowns();
        if (btn.dataset.procurementImport === "csv") elements.procurementCsvFileInput?.click();
        else if (btn.dataset.procurementImport === "xlsx") elements.procurementXlsxFileInput?.click();
    });
    elements.exportProcurementDropdown?.addEventListener("click", e => {
        const btn = e.target.closest("[data-procurement-export]");
        if (!btn) return;
        closeProcurementDropdowns();
        if (btn.dataset.procurementExport === "csv") exportOpenProcurementCsv();
        else if (btn.dataset.procurementExport === "xlsx") exportOpenProcurementExcel();
    });
    document.addEventListener("click", closeProcurementDropdowns);
    elements.procurementTranslateBtn?.addEventListener("click", toggleProcTranslatePanel);
    elements.procTranslatePreviewBtn?.addEventListener("click", handleProcTranslatePreview);
    elements.procTranslateDuplicateBtn?.addEventListener("click", () => handleProcTranslateApply("duplicate"));
    elements.procTranslateInPlaceBtn?.addEventListener("click", () => handleProcTranslateApply("inplace"));
    elements.procColumnsDropdownBtn?.addEventListener("click", e => {
        e.stopPropagation();
        toggleProcurementDropdown(elements.procColumnsDropdown);
    });
    elements.procColumnsDropdown?.addEventListener("change", e => {
        const cb = e.target.closest("[data-col-toggle]");
        if (cb) toggleProcColumn(cb.dataset.colToggle, cb.checked);
    });
    // Library search combobox
    document.getElementById("procLibSearchInput")?.addEventListener("focus", openProcLibDropdown);
    document.getElementById("procLibSearchInput")?.addEventListener("input", e => {
        renderProcLibItems(filterProcLibItems(e.target.value), e.target.value);
    });
    document.getElementById("procLibDropdown")?.addEventListener("click", handleProcLibDropdownClick);
    document.addEventListener("click", e => {
        const wrap = document.getElementById("procLibDropdown")?.closest(".proc-lib-combobox-wrap");
        if (wrap && !wrap.contains(e.target)) closeProcLibDropdown();
    });
    elements.saveCompanyProfileBtn.addEventListener("click", saveCompanyProfile);
    elements.overviewRecentDocuments?.addEventListener("click", event => {
        const button = event.target.closest("[data-open-overview-doc]");
        if (!button) {
            return;
        }
        setActivePage("documents");
        const doc = getDocumentById(button.dataset.openOverviewDoc);
        if (doc?.type === "procurement") {
            openProcurementSheetModal(doc);
        } else {
            editDocument(button.dataset.openOverviewDoc);
        }
    });
    elements.overviewSummaryGrid?.addEventListener("click", event => {
        const button = event.target.closest("[data-summary-nav]");
        if (!button) {
            return;
        }
        const filter = button.dataset.summaryFilter || "all";
        const targetPage = button.dataset.summaryNav || "overview";
        if (targetPage === "documents") {
            openDocumentsPageWithFilter(filter);
        } else {
            setActivePage(targetPage);
        }
        closeMobileDrawer();
    });
    document.addEventListener("click", handleImageUploadTriggerClick);
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
    elements.clientManagementList.addEventListener("click", handleClientStatClick);
    elements.clientManagementList.addEventListener("click", handleClientRowToggle);
    elements.clientManagementList.addEventListener("keydown", e => {
        if ((e.key === "Enter" || e.key === " ") && e.target.closest("[data-toggle-client]") && !e.target.closest("[data-client-action]")) {
            e.preventDefault();
            handleClientRowToggle(e);
        }
    });
    elements.addClientBtn?.addEventListener("click", () => openClientModal(null));
    elements.addClientContactBtn?.addEventListener("click", addClientContactRow);
    elements.saveClientModalBtn?.addEventListener("click", saveClientFromModal);
    elements.cancelClientModalBtn?.addEventListener("click", closeClientModal);
    elements.closeClientModalBtn?.addEventListener("click", closeClientModal);
    elements.closeClientActivityModalBtn?.addEventListener("click", closeClientActivityModal);
    elements.clientActivityModalList?.addEventListener("click", handleClientActivityModalClick);
    elements.closeNotesRecordModalBtn?.addEventListener("click", closeNotesRecordModal);
    elements.notesRecordOpenDocumentBtn?.addEventListener("click", () => handleNotesRecordModalAction("open-record"));
    elements.notesRecordOpenClientBtn?.addEventListener("click", () => handleNotesRecordModalAction("open-client"));
    elements.notesRecordManageNotesBtn?.addEventListener("click", () => handleNotesRecordModalAction("manage-notes"));
    elements.notesRecordSummaryGrid?.addEventListener("click", event => {
        const trigger = event.target.closest("[data-notes-record-action]");
        if (!trigger) {
            return;
        }
        handleNotesRecordModalAction(trigger.dataset.notesRecordAction || "open-record");
    });
    elements.issueInboxList.addEventListener("click", handleIssueInboxClick);
    elements.valueToggleCard.addEventListener("click", () => toggleValueView(true));
    elements.overviewMobileToggle?.addEventListener("click", toggleMobileOverview);
    elements.viewAllDocumentsBtn?.addEventListener("click", () => setActivePage("documents"));
    elements.showInternalPricingToggle.addEventListener("change", handleInternalPricingToggleChange);
    elements.importBackupBtn.addEventListener("click", () => {
        elements.importBackupInput.click();
    });
    elements.importBackupInput.addEventListener("change", handleBackupImportSelect);
    elements.closeModalBtn.addEventListener("click", closeModal);
    elements.modalHelpBtn?.addEventListener("click", () => {
        const open = elements.modalHelpPanel.hidden;
        elements.modalHelpPanel.hidden = !open;
        elements.modalHelpPanel.setAttribute("aria-hidden", String(!open));
        elements.modalHelpBtn.setAttribute("aria-expanded", String(open));
    });
    elements.docType.addEventListener("change", updateModalTitle);
    elements.refNumber.addEventListener("input", handleRefNumberInput);
    elements.docDate.addEventListener("change", handleDocumentDateChange);
    elements.clientSelect.addEventListener("change", onClientSelectChange);
    elements.saveClientBtn.addEventListener("click", saveClient);
    elements.addItemBtn.addEventListener("click", addItem);
    elements.addAnotherItemBtn?.addEventListener("click", addItem);
    elements.insertDocumentLibraryItemBtn?.addEventListener("click", insertSelectedLibraryItemIntoDocument);
    elements.createDocumentLibraryItemBtn?.addEventListener("click", () => openCatalogItemModal({ returnToDocument: true }));
    elements.prevBtn.addEventListener("click", prevStep);
    elements.nextBtn.addEventListener("click", nextStep);
    elements.saveBtn.addEventListener("click", saveDocumentOnly);
    elements.exportPdfBtn.addEventListener("click", saveAndExportDocument);
    elements.stepIndicator.addEventListener("click", handleStepIndicatorClick);
    elements.previewContainer.addEventListener("click", handlePreviewContainerClick);
    elements.documentsGrid.addEventListener("click", handleDocumentCardClick);
    elements.documentsGrid.addEventListener("change", handleDocumentsGridChange);
    elements.itemsContainer.addEventListener("click", handleItemContainerClick);
    elements.itemsContainer.addEventListener("input", handleItemsChange);
    elements.itemsContainer.addEventListener("change", handleItemsChange);
    elements.itemsContainer.addEventListener("change", handleItemImageInputChange);
    elements.itemsContainer.addEventListener("keydown", handleItemEditorKeydown);
    elements.itemsContainer.addEventListener("pointerdown", handleItemDragPointerDown);
    elements.itemsContainer.addEventListener("dragstart", handleItemDragStart);
    elements.itemsContainer.addEventListener("dragover", handleItemDragOver);
    elements.itemsContainer.addEventListener("dragleave", handleItemDragLeave);
    elements.itemsContainer.addEventListener("drop", handleItemDrop);
    elements.itemsContainer.addEventListener("dragend", handleItemDragEnd);
    document.addEventListener("keydown", handleGlobalShortcuts);
    elements.paymentTermsImmediate?.addEventListener("change", () => syncPaymentTermsUI());
    elements.paymentTermsOptions?.addEventListener("change", () => syncPaymentTermsUI());
    elements.paymentTermsDays?.addEventListener("input", () => syncPaymentTermsUI());
    elements.paymentTermsCustomText?.addEventListener("input", () => syncPaymentTermsUI());
    elements.addPaymentEntryBtn?.addEventListener("click", addPaymentEntry);
    elements.paymentLedgerList?.addEventListener("click", handlePaymentLedgerListClick);
    elements.paymentLedgerList?.addEventListener("input", syncPaymentLedgerUi);
    elements.paymentLedgerList?.addEventListener("change", syncPaymentLedgerUi);
    elements.documentSearch.addEventListener("input", handleSearchInput);
    elements.documentSort.addEventListener("change", handleSortChange);
    elements.notesSearchInput?.addEventListener("input", event => {
        state.notesSearchQuery = event.target.value || "";
        renderNotesPage();
    });
    elements.notesClientFilter?.addEventListener("change", event => {
        state.notesClientFilter = event.target.value || "all";
        renderNotesPage();
    });
    elements.notesFilterButtons?.forEach(button => {
        button.addEventListener("click", () => {
            state.notesFilter = button.dataset.notesFilter || "all";
            renderNotesPage();
        });
    });
    elements.notesFeed?.addEventListener("click", event => {
        const trigger = event.target.closest("[data-open-note-target]");
        if (!trigger) {
            return;
        }
        openNotesRecordModal({
            targetId: trigger.dataset.openNoteTarget,
            targetType: trigger.dataset.openNoteTargetType
        });
    });
    elements.notesFeed?.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }
        const trigger = event.target.closest("[data-open-note-target]");
        if (!trigger) {
            return;
        }
        event.preventDefault();
        openNotesRecordModal({
            targetId: trigger.dataset.openNoteTarget,
            targetType: trigger.dataset.openNoteTargetType
        });
    });
    elements.statementFilterButtons.forEach(button => {
        button.addEventListener("click", () => {
            state.statementStatusFilter = button.dataset.statementFilter || "pending";
            syncStatementFilterButtons();
            renderStatementsPage();
        });
    });
    elements.documentsGrid.addEventListener("keydown", handleDocumentCardKeydown);
    elements.tagSuggestions.addEventListener("click", handleKeywordSuggestionClick);
    elements.calculatorLauncherModal.addEventListener("click", toggleCalculator);
    elements.sidebarCalculatorBtn?.addEventListener("click", () => {
        toggleCalculator();
        closeMobileDrawer();
    });
    elements.mobileDrawerCalculatorBtn?.addEventListener("click", () => {
        toggleCalculator();
        closeMobileDrawer();
    });
    elements.calculatorMinimizeBtn.addEventListener("click", hideCalculator);
    elements.calculatorCloseBtn.addEventListener("click", hideCalculator);
    elements.calculatorGrid.addEventListener("click", handleCalculatorButtonClick);
    elements.calculatorDragHandle.addEventListener("pointerdown", startCalculatorDrag);
    window.addEventListener("pointermove", handleCalculatorDrag);
    window.addEventListener("pointerup", stopCalculatorDrag);
    elements.selectVisibleDocumentsBtn?.addEventListener("click", selectVisibleDocuments);
    elements.clearSelectedDocumentsBtn?.addEventListener("click", clearSelectedDocuments);
    elements.downloadSelectedDocumentsZipBtn?.addEventListener("click", async () => {
        try {
            const selectedCount = getSelectedDocuments().length;
            setImportStatus(selectedCount >= BULK_ZIP_THRESHOLD ? "Preparing download ZIP..." : "Preparing PDF download...");
            await downloadSelectedDocuments();
            setImportStatus(selectedCount >= BULK_ZIP_THRESHOLD ? "ZIP download ready." : "PDF download ready.");
        } catch (error) {
            window.alert(error.message || "Unable to download the selected documents right now.");
        }
    });
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

    elements.clientActivityModal?.addEventListener("click", event => {
        if (event.target === elements.clientActivityModal) {
            closeClientActivityModal();
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
    elements.quickPaymentModal?.addEventListener("click", event => {
        if (event.target === elements.quickPaymentModal) {
            closeQuickPaymentModal();
        }
    });

    elements.companyProfileModal.addEventListener("click", event => {
        if (event.target === elements.companyProfileModal) {
            closeCompanyProfileModal();
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
    elements.catalogDetailsAddToDocBtn?.addEventListener("click", () => {
        showCatalogDocPicker();
    });
    elements.catalogDetailsDocPickerList?.addEventListener("click", event => {
        const btn = event.target.closest("[data-catalog-add-doc-id]");
        if (!btn) return;
        const docId = btn.dataset.catalogAddDocId;
        if (state.pendingCatalogInsertItem) {
            addCatalogItemToDocument(state.pendingCatalogInsertItem, docId);
        }
    });
    elements.notesDrawerTabs?.addEventListener("click", event => {
        const tab = event.target.closest("[data-notes-tab]");
        if (tab) switchNotesDrawerTab(tab.dataset.notesTab);
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
    elements.sidebarCalculatorBtn?.setAttribute("aria-pressed", "true");
    elements.mobileDrawerCalculatorBtn?.setAttribute("aria-pressed", "true");

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
    elements.sidebarCalculatorBtn?.setAttribute("aria-pressed", "false");
    elements.mobileDrawerCalculatorBtn?.setAttribute("aria-pressed", "false");
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
    writeLocalDataset(CATALOG_ITEMS_STORAGE_KEY, state.catalogItems);
    writeLocalDataset(STATEMENT_EXPORTS_STORAGE_KEY, state.statementExports);
    writeLocalDataset(SESSION_LOGS_STORAGE_KEY, state.sessionLogs);
    writeLocalDataset(ACTIVITY_LOGS_STORAGE_KEY, state.activityLogs);
}

function applyWorkspaceState(payload) {
    state.userAccounts = normalizeUserAccounts(payload?.userAccounts || []);
    state.issueReports = normalizeIssueReports(payload?.issueReports || []);
    state.companyProfile = normalizeCompanyProfile(payload?.companyProfile || DEFAULT_COMPANY_PROFILE);
    state.catalogItems = normalizeCatalogItems(payload?.catalogItems || []);
    state.statementExports = normalizeStatementExports(payload?.statementExports || []);
    state.sessionLogs = normalizeSessionLogs(payload?.sessionLogs || []);
    state.activityLogs = normalizeActivityLogs(payload?.activityLogs || []);
    try { cacheWorkspaceStateLocally(); } catch (_) { /* localStorage quota — state is valid, continue */ }
    updateRuntimeModeBadge();
    renderUserManagementList();
    renderIssueInbox();
    updateInboxBadge();
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
        renderCatalog();
        renderStatementsPage();
        renderAccountAdminPage();
        renderUserManagementList();
        renderIssueInbox();
        updateInboxBadge();
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
                referenceId: String(item.referenceId || item.internalReferenceId || "").trim(),
                name: String(item.name || "").trim(),
                details: String(item.details || "").trim(),
                notes: String(item.notes || "").trim(),
                costPrice: Number.parseFloat(item.costPrice) || 0,
                price: Number.parseFloat(item.price ?? item.sellPrice) || 0,
                sellPrice: Number.parseFloat(item.sellPrice ?? item.price) || 0,
                currency: String(item.currency || "USD").trim() || "USD",
                taxIncluded: Boolean(item.taxIncluded),
                dateUpdated: item.dateUpdated || new Date().toISOString(),
                category: String(item.category || "").trim(),
                brand: String(item.brand || "").trim(),
                unitSize: String(item.unitSize || item.packSize || "").trim(),
                packSize: String(item.packSize || item.unitSize || "").trim(),
                unit: String(item.unit || item.unitOfMeasure || "").trim(),
                vendor: String(item.vendor || item.supplier || "").trim(),
                supplier: String(item.supplier || item.vendor || "").trim(),
                leadTime: String(item.leadTime || "").trim(),
                country: String(item.country || item.sourceCountry || item.source || "").trim(),
                tags: parseTags(Array.isArray(item.tags) ? item.tags.join(", ") : item.tags || ""),
                archived: Boolean(item.archived),
                documentRefs: Array.isArray(item.documentRefs)
                    ? item.documentRefs.filter(r => r && r.docId)
                    : [],
                itemImageDataUrl: typeof item.itemImageDataUrl === "string"
                    ? item.itemImageDataUrl
                    : typeof item.imageDataUrl === "string"
                        ? item.imageDataUrl
                        : ""
            }))
            .filter(item => item.name)
        : [];
}

function normalizeNoteLog(notes) {
    if (!Array.isArray(notes)) {
        return [];
    }

    return notes
        .filter(note => note && typeof note === "object" && String(note.text || "").trim())
        .map(note => ({
            id: String(note.id || `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
            text: String(note.text || "").trim(),
            author: String(note.author || "Unknown").trim() || "Unknown",
            userId: String(note.userId || "").trim(),
            createdAt: String(note.createdAt || new Date().toISOString()),
            editedAt: note.editedAt ? String(note.editedAt) : null
        }));
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
                noteLog: normalizeNoteLog(item.noteLog),
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
    try { cacheWorkspaceStateLocally(); } catch (_) { /* localStorage quota — state is valid, continue */ }
    renderCatalog();
    await persistSharedWorkspaceData();
}

// Auto-syncs items from documents/procurement into the library.
// items: [{ name, brand, packSize, unit, unitPrice, currency, leadTime, supplier, notes }]
// docRef: { docId, docRefNumber, docType, date, clientName }
async function upsertItemsIntoCatalog(items, docRef) {
    const incoming = items.filter(i => String(i.name || "").trim());
    if (!incoming.length) return;

    function makeRef(ref) {
        if (!ref) return null;
        return {
            docId: String(ref.docId),
            docRefNumber: String(ref.docRefNumber || ""),
            docType: String(ref.docType || "document"),
            date: String(ref.date || ""),
            clientName: String(ref.clientName || "")
        };
    }

    function mergeRefs(existing, newRef) {
        const refs = Array.isArray(existing) ? [...existing] : [];
        if (!newRef) return refs;
        const alreadyPresent = refs.some(r => r.docId === newRef.docId);
        if (!alreadyPresent) refs.push(newRef);
        // Sort most recent first by date
        return refs.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
    }

    const catalog = state.catalogItems.map(e => ({ ...e }));
    let changed = false;

    for (const item of incoming) {
        const normName = String(item.name).toLowerCase().trim().replace(/\s+/g, " ");
        // Primary match: exact normalized name. Secondary: name + brand.
        let matchIdx = catalog.findIndex(e =>
            e.name.toLowerCase().trim().replace(/\s+/g, " ") === normName
        );
        if (matchIdx < 0 && item.brand) {
            matchIdx = catalog.findIndex(e =>
                e.name.toLowerCase().trim().replace(/\s+/g, " ") === normName &&
                (e.brand || "").toLowerCase().trim() === String(item.brand).toLowerCase().trim()
            );
        }

        const ref = makeRef(docRef);

        if (matchIdx >= 0) {
            const entry = catalog[matchIdx];
            catalog[matchIdx] = {
                ...entry,
                // Only overwrite with non-blank incoming values
                ...(item.unitPrice > 0 ? { price: item.unitPrice, sellPrice: item.unitPrice } : {}),
                ...(item.currency ? { currency: item.currency } : {}),
                ...(item.brand ? { brand: item.brand } : {}),
                ...(item.supplier ? { supplier: item.supplier, vendor: item.supplier } : {}),
                ...(item.packSize ? { packSize: item.packSize, unitSize: item.packSize } : {}),
                ...(item.unit ? { unit: item.unit } : {}),
                ...(item.leadTime ? { leadTime: item.leadTime } : {}),
                // Preserve archived status — do not un-archive automatically
                archived: entry.archived,
                documentRefs: mergeRefs(entry.documentRefs, ref),
                dateUpdated: new Date().toISOString()
            };
            changed = true;
        } else {
            catalog.unshift({
                id: `catalog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                referenceId: `PLI-${String(catalog.length + 1).padStart(4, "0")}`,
                name: String(item.name).trim(),
                details: String(item.notes || "").trim(),
                notes: "",
                costPrice: 0,
                price: item.unitPrice || 0,
                sellPrice: item.unitPrice || 0,
                currency: item.currency || "USD",
                taxIncluded: false,
                dateUpdated: new Date().toISOString(),
                category: "",
                brand: String(item.brand || "").trim(),
                unitSize: String(item.packSize || "").trim(),
                packSize: String(item.packSize || "").trim(),
                unit: String(item.unit || "").trim(),
                vendor: String(item.supplier || "").trim(),
                supplier: String(item.supplier || "").trim(),
                leadTime: String(item.leadTime || "").trim(),
                country: "",
                tags: [],
                archived: false,
                documentRefs: ref ? [ref] : []
            });
            changed = true;
        }
    }

    if (changed) {
        await saveCatalogItems(catalog);
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

function getDocumentSyncKey(doc) {
    const type = String(doc?.type || "quote").toLowerCase();
    const refNumber = String(doc?.refNumber || "").trim().toUpperCase();
    return refNumber ? `${type}::${refNumber}` : `${type}::${String(doc?.id || "")}`;
}

function getPaymentSyncKey(payment) {
    return [
        String(payment?.id || "").trim(),
        String(payment?.date || "").trim(),
        Number(payment?.amount || 0).toFixed(2),
        String(payment?.reference || "").trim().toLowerCase(),
        String(payment?.notes || "").trim().toLowerCase()
    ].join("::");
}

function mergeInvoicePaymentCollections(primaryPayments, secondaryPayments) {
    const merged = [];
    const seen = new Set();

    normalizeInvoicePayments([...(Array.isArray(primaryPayments) ? primaryPayments : []), ...(Array.isArray(secondaryPayments) ? secondaryPayments : [])])
        .forEach(payment => {
            const key = getPaymentSyncKey(payment);
            if (seen.has(key)) {
                return;
            }
            seen.add(key);
            merged.push(payment);
        });

    return merged.sort((left, right) => Date.parse(right.date || right.createdAt || 0) - Date.parse(left.date || left.createdAt || 0));
}

function mergeLocalDocumentsIntoServerDocuments(serverDocuments, localDocuments) {
    const normalizedServer = normalizeDocuments(serverDocuments);
    const normalizedLocal = normalizeDocuments(localDocuments);
    const localByKey = new Map(normalizedLocal.map(doc => [getDocumentSyncKey(doc), doc]));
    let didChange = false;

    const mergedDocuments = normalizedServer.map(serverDoc => {
        const localDoc = localByKey.get(getDocumentSyncKey(serverDoc));
        if (!localDoc) {
            return serverDoc;
        }

        localByKey.delete(getDocumentSyncKey(serverDoc));

        if (serverDoc.type !== "invoice" || localDoc.type !== "invoice") {
            return serverDoc;
        }

        const mergedPayments = mergeInvoicePaymentCollections(serverDoc.payments, localDoc.payments);
        const hasPaymentUpgrade = mergedPayments.length !== getInvoicePayments(serverDoc).length;
        const nextPaymentTerms = String(localDoc.paymentTerms || "").trim() || serverDoc.paymentTerms || DEFAULT_PAYMENT_TERMS;
        const shouldUseLocalTerms = nextPaymentTerms !== (serverDoc.paymentTerms || DEFAULT_PAYMENT_TERMS);

        if (!hasPaymentUpgrade && !shouldUseLocalTerms) {
            return serverDoc;
        }

        didChange = true;
        return {
            ...serverDoc,
            paymentTerms: nextPaymentTerms,
            payments: mergedPayments,
            paymentStatus: getInvoiceDerivedPaymentStatus({
                ...serverDoc,
                paymentTerms: nextPaymentTerms,
                payments: mergedPayments
            })
        };
    });

    localByKey.forEach(localDoc => {
        mergedDocuments.push(localDoc);
        didChange = true;
    });

    return {
        documents: normalizeDocuments(mergedDocuments),
        didChange
    };
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

    const mergedDocumentResult = hasLocalDocuments
        ? mergeLocalDocumentsIntoServerDocuments(state.documents, localDocuments)
        : { documents: state.documents, didChange: false };

    if (mergedDocumentResult.didChange || (hasLocalDocuments && !serverHasDocuments) || (hasLocalClients && !serverHasClients)) {
        console.log("Migrating local data to server...");

        try {
            if (hasLocalDocuments && mergedDocumentResult.didChange) {
                await saveDocumentsToServer(mergedDocumentResult.documents);
                console.log(`Synced ${localDocuments.length} locally saved documents back to server`);
                clearLocalDataset(LOCAL_DOCUMENTS_STORAGE_KEY);
            } else if (hasLocalDocuments && !serverHasDocuments) {
                await saveDocumentsToServer(localDocuments);
                console.log(`Migrated ${localDocuments.length} documents to server`);
                clearLocalDataset(LOCAL_DOCUMENTS_STORAGE_KEY);
            }

            // Migrate clients if server only has default client
            if (hasLocalClients && !serverHasClients) {
                await saveClientsToServer(localClients);
                console.log(`Migrated ${localClients.length} clients to server`);
                clearLocalDataset(LOCAL_CLIENTS_STORAGE_KEY);
            }

            setImportStatus(mergedDocumentResult.didChange
                ? "Recovered locally saved payments and synced them back to server storage."
                : "✓ Local data has been migrated to server storage.");
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
    const validPages = ["overview", "documents", "notes", "clients", "catalog", "reports", "settings"];
    state.activePage = validPages.includes(page) ? page : "overview";
    applyPageState();
    if (state.activePage === "reports") {
        renderStatementsPage();
    } else if (state.activePage === "notes") {
        renderNotesPage();
    } else if (state.activePage === "catalog") {
        renderCatalog();
    }
    syncPageNavigation();
    closeTopbarMenu();
    closeNewMenu();
    closeOverviewNewMenu();
    if (state.activePage === "overview") {
        startValueViewCycle();
    } else {
        stopValueViewCycle();
    }
}

function applyPageState() {
    if (elements.overviewPage) elements.overviewPage.hidden = state.activePage !== "overview";
    if (elements.documentsPage) elements.documentsPage.hidden = state.activePage !== "documents";
    if (elements.notesPage) elements.notesPage.hidden = state.activePage !== "notes";
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

    if (isOpen) {
        modal.removeAttribute("hidden");
    } else {
        modal.setAttribute("hidden", "");
    }
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

function openCatalogItemModal(options = {}) {
    state.editingCatalogItemId = null;
    state.catalogModalReturnToProcurement = Boolean(options.returnToProcurement);
    state.catalogModalReturnToDocument = Boolean(options.returnToDocument);
    elements.catalogItemNameInput.value = "";
    elements.catalogItemCostInput.value = "0";
    elements.catalogItemPriceInput.value = "0";
    elements.catalogItemCurrencyInput.value = "USD";
    elements.catalogItemCategoryInput.value = "";
    elements.catalogItemBrandInput.value = "";
    elements.catalogItemUnitSizeInput.value = "";
    elements.catalogItemUnitInput.value = "";
    elements.catalogItemVendorInput.value = "";
    elements.catalogItemLeadTimeInput.value = "";
    elements.catalogItemCountryInput.value = "";
    elements.catalogItemTaxIncludedInput.checked = false;
    elements.catalogItemTagsInput.value = "";
    elements.catalogItemDetailsInput.value = "";
    elements.catalogItemNotesInput.value = "";
    if (elements.archiveCatalogItemBtn) {
        elements.archiveCatalogItemBtn.hidden = true;
    }

    if (options.item) {
        const item = options.item;
        state.editingCatalogItemId = item.id || null;
        elements.catalogItemNameInput.value = item.name || "";
        elements.catalogItemCostInput.value = String(item.costPrice || 0);
        elements.catalogItemPriceInput.value = String(item.sellPrice ?? item.price ?? 0);
        elements.catalogItemCurrencyInput.value = item.currency || "USD";
        elements.catalogItemCategoryInput.value = item.category || "";
        elements.catalogItemBrandInput.value = item.brand || "";
        elements.catalogItemUnitSizeInput.value = item.packSize || item.unitSize || "";
        elements.catalogItemUnitInput.value = item.unit || "";
        elements.catalogItemVendorInput.value = item.supplier || item.vendor || "";
        elements.catalogItemLeadTimeInput.value = item.leadTime || "";
        elements.catalogItemCountryInput.value = item.country || "";
        elements.catalogItemTaxIncludedInput.checked = Boolean(item.taxIncluded);
        elements.catalogItemTagsInput.value = Array.isArray(item.tags) ? item.tags.join(", ") : "";
        elements.catalogItemDetailsInput.value = item.details || "";
        elements.catalogItemNotesInput.value = item.notes || "";
        if (elements.archiveCatalogItemBtn) {
            elements.archiveCatalogItemBtn.hidden = false;
        }
        state.pendingCatalogItemImageDataUrl = item.itemImageDataUrl || item.imageDataUrl || null;
    } else {
        state.pendingCatalogItemImageDataUrl = null;
    }

    syncCatalogItemImageUI();
    setModalState(elements.catalogItemModal, true);
    applyTranslations();
}

function closeCatalogItemModal() {
    setModalState(elements.catalogItemModal, false);
    state.editingCatalogItemId = null;
    state.pendingCatalogItemImageDataUrl = null;
    state.catalogModalReturnToProcurement = false;
    state.catalogModalReturnToDocument = false;
}

function openCatalogDetailsModal(item) {
    if (!item || !elements.catalogDetailsModal) {
        return;
    }

    state.pendingCatalogInsertItem = item;
    hideCatalogDocPicker();

    const fallbackLabel = (item.name || "Item").trim().slice(0, 2).toUpperCase() || "IT";
    setElementText("#catalogDetailsTitle", item.name || "Catalog Item");
    setElementText("#catalogDetailsName", item.name || "Untitled item");
    setElementText("#catalogDetailsMeta", `Updated ${formatDateTime(item.dateUpdated)}`);
    setElementText("#catalogDetailsFallback", fallbackLabel);

    if (elements.catalogDetailsRefId) {
        elements.catalogDetailsRefId.textContent = item.referenceId || "";
        elements.catalogDetailsRefId.hidden = !item.referenceId;
    }

    const sellPrice = item.sellPrice ?? item.price ?? 0;
    const costPrice = item.costPrice ?? null;
    setElementText("#catalogDetailsPrice", formatCurrency(sellPrice));
    setElementText("#catalogDetailsCostPrice", costPrice != null ? formatCurrency(costPrice) : "—");
    setElementText("#catalogDetailsCurrency", item.currency || "—");
    setElementText("#catalogDetailsCategory", item.category || "—");
    setElementText("#catalogDetailsBrand", item.brand || "—");
    setElementText("#catalogDetailsUnitSize", item.packSize || item.unitSize || "—");
    setElementText("#catalogDetailsUnit", item.unit || "—");
    setElementText("#catalogDetailsVendor", item.supplier || item.vendor || "—");
    setElementText("#catalogDetailsLeadTime", item.leadTime || "—");
    setElementText("#catalogDetailsCountry", item.country || "—");
    setElementText("#catalogDetailsTax", item.taxIncluded ? "Included" : "—");
    setElementText("#catalogDetailsText", item.details || "—");
    setElementText("#catalogDetailsNotes", item.notes || "—");

    // Document references
    const docRefs = Array.isArray(item.documentRefs) ? item.documentRefs : [];
    if (elements.catalogDetailsDocRefsSection) {
        elements.catalogDetailsDocRefsSection.hidden = docRefs.length === 0;
    }
    if (elements.catalogDetailsDocRefs && docRefs.length) {
        elements.catalogDetailsDocRefs.innerHTML = docRefs.map(r => {
            const label = `${r.docRefNumber || r.docId} ${r.clientName ? `· ${r.clientName}` : ""}`.trim();
            return `<button class="catalog-ref-link" type="button" data-open-doc-id="${escapeHtml(String(r.docId))}">${escapeHtml(label)}</button>`;
        }).join("");
    }

    const detailsImageUrl = item.imageDataUrl || item.itemImageDataUrl || "";
    if (detailsImageUrl) {
        elements.catalogDetailsImage.src = detailsImageUrl;
        elements.catalogDetailsImage.hidden = false;
        elements.catalogDetailsFallback.hidden = true;
        if (elements.catalogDetailsExpandImageBtn) {
            elements.catalogDetailsExpandImageBtn.hidden = false;
            elements.catalogDetailsExpandImageBtn.dataset.expandSrc = detailsImageUrl;
            elements.catalogDetailsExpandImageBtn.dataset.expandAlt = item.name || "Item image";
        }
    } else {
        elements.catalogDetailsImage.hidden = true;
        elements.catalogDetailsImage.removeAttribute("src");
        elements.catalogDetailsFallback.hidden = false;
        if (elements.catalogDetailsExpandImageBtn) {
            elements.catalogDetailsExpandImageBtn.hidden = true;
        }
    }

    setModalState(elements.catalogDetailsModal, true);
}

function openCatalogItemImageExpand(dataUrl, altText) {
    if (!elements.catalogItemImageExpandModal || !elements.catalogItemImageExpandImg) return;
    elements.catalogItemImageExpandImg.src = dataUrl;
    elements.catalogItemImageExpandImg.alt = altText || "Item image";
    if (elements.catalogItemImageExpandTitle) {
        elements.catalogItemImageExpandTitle.textContent = altText || "Item Image";
    }
    setModalState(elements.catalogItemImageExpandModal, true);
}

function closeCatalogItemImageExpand() {
    setModalState(elements.catalogItemImageExpandModal, false);
}

function closeCatalogDetailsModal() {
    state.pendingCatalogInsertItem = null;
    hideCatalogDocPicker();
    setModalState(elements.catalogDetailsModal, false);
}

function getCatalogDocPickerOptions() {
    const currentId = state.editingDocumentId ?? state.editingProcurementSheetId;
    return state.documents
        .filter(doc => doc.status === "logged" && ["quote", "invoice", "procurement"].includes(doc.type))
        .sort((a, b) => ((b.printedAt || b.date || "") > (a.printedAt || a.date || "") ? 1 : -1))
        .map(doc => ({
            id: doc.id,
            type: doc.type,
            refNumber: doc.refNumber || "—",
            clientName: doc.clientName || "",
            isCurrent: currentId !== null && isSameDocumentId(doc.id, currentId)
        }))
        .sort((a, b) => (b.isCurrent ? 1 : 0) - (a.isCurrent ? 1 : 0));
}

function showCatalogDocPicker() {
    if (!elements.catalogDetailsDocPicker || !elements.catalogDetailsDocPickerList) return;
    if (elements.catalogDetailsAddToDocBtn?.dataset.pickerOpen === "1") {
        hideCatalogDocPicker();
        return;
    }
    const docs = getCatalogDocPickerOptions();
    if (!docs.length) {
        elements.catalogDetailsDocPickerList.innerHTML = `<p class="catalog-doc-picker-empty">No saved documents found. Create a Quote, Invoice, or Procurement Sheet first.</p>`;
    } else {
        elements.catalogDetailsDocPickerList.innerHTML = docs.map(d => {
            const typeLabel = d.type === "procurement" ? "Procurement" : d.type === "invoice" ? "Invoice" : "Quote";
            const currentBadge = d.isCurrent ? `<span class="catalog-doc-picker-badge">Current</span>` : "";
            return `<button type="button" class="catalog-doc-picker-item${d.isCurrent ? " is-current" : ""}" data-catalog-add-doc-id="${escapeHtml(String(d.id))}">
                <span class="catalog-doc-picker-type">${escapeHtml(typeLabel)}</span>
                <span class="catalog-doc-picker-ref">${escapeHtml(d.refNumber)}</span>
                <span class="catalog-doc-picker-client">${escapeHtml(d.clientName || "—")}</span>
                ${currentBadge}
            </button>`;
        }).join("");
    }
    elements.catalogDetailsDocPicker.hidden = false;
    if (elements.catalogDetailsAddToDocBtn) {
        elements.catalogDetailsAddToDocBtn.innerHTML = `${ICONS.circle}<span>Cancel</span>`;
        elements.catalogDetailsAddToDocBtn.dataset.pickerOpen = "1";
    }
}

function hideCatalogDocPicker() {
    if (!elements.catalogDetailsDocPicker) return;
    elements.catalogDetailsDocPicker.hidden = true;
    if (elements.catalogDetailsAddToDocBtn) {
        elements.catalogDetailsAddToDocBtn.innerHTML = `${ICONS.insert}<span>Add to Document</span>`;
        delete elements.catalogDetailsAddToDocBtn.dataset.pickerOpen;
    }
}

function addCatalogItemToDocument(item, targetDocId) {
    if (!item || !targetDocId) return;
    const targetDoc = getDocumentById(targetDocId);
    if (!targetDoc) return;
    closeCatalogDetailsModal();
    if (targetDoc.type === "procurement") {
        const isCurrentlyEditing = state.editingProcurementSheetId !== null &&
            isSameDocumentId(state.editingProcurementSheetId, targetDocId);
        if (!isCurrentlyEditing) {
            openProcurementSheetModal(targetDoc);
        }
        addProcurementRow({
            description: item.name || "",
            brand: item.brand || "",
            packSize: item.packSize || item.unitSize || "",
            unit: item.unit || "",
            unitPrice: Number.parseFloat(item.sellPrice ?? item.price) || 0,
            currency: item.currency || "USD",
            leadTime: item.leadTime || "",
            supplier: item.supplier || item.vendor || "",
            notes: item.notes || "",
            libraryItemId: item.id || "",
            libraryReferenceId: item.referenceId || ""
        });
        setImportStatus(`"${item.name}" added to ${targetDoc.refNumber}.`);
    } else {
        const isCurrentlyEditing = state.editingDocumentId !== null &&
            isSameDocumentId(state.editingDocumentId, targetDocId);
        if (!isCurrentlyEditing) {
            editDocument(targetDocId);
        }
        insertLibraryItemIntoDocument(item);
    }
}

function getCatalogEntries() {
    const manualEntries = state.catalogItems.map(item => {
        const createdAt = item.createdAt || item.dateUpdated || new Date().toISOString();
        const imageDataUrl = typeof item.itemImageDataUrl === "string"
            ? item.itemImageDataUrl
            : typeof item.imageDataUrl === "string"
                ? item.imageDataUrl
                : "";
        return {
            ...item,
            imageDataUrl,
            createdAt,
            sourceKey: "manual"
        };
    });

    return manualEntries
        .sort((left, right) => Date.parse(right.createdAt || right.dateUpdated || 0) - Date.parse(left.createdAt || left.dateUpdated || 0));
}

function getActiveLibraryItems() {
    return state.catalogItems.filter(item => !item.archived);
}

function catalogItemMatchesSearch(item) {
    const query = state.pricingSearchQuery;
    if (!query) {
        return true;
    }

    const haystack = [
        item.name,
        item.referenceId,
        item.details,
        item.category,
        item.brand,
        item.supplier || item.vendor,
        item.packSize || item.unitSize,
        item.unit,
        item.country,
        ...(Array.isArray(item.tags) ? item.tags : [])
    ].join(" ").toLowerCase();
    return haystack.includes(query);
}

function renderPricingLibraryFilters(entries) {
    if (!elements.pricingLibraryCategoryFilter || !elements.pricingLibrarySupplierFilter) {
        return;
    }

    const categories = [...new Set(entries.map(item => item.category).filter(Boolean))]
        .sort((left, right) => left.localeCompare(right));
    const suppliers = [...new Set(entries.map(item => item.supplier || item.vendor).filter(Boolean))]
        .sort((left, right) => left.localeCompare(right));
    const categoryValue = state.pricingCategoryFilter;
    const supplierValue = state.pricingSupplierFilter;

    elements.pricingLibraryCategoryFilter.innerHTML = `<option value="all">All categories</option>${categories.map(category => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join("")}`;
    elements.pricingLibrarySupplierFilter.innerHTML = `<option value="all">All suppliers</option>${suppliers.map(supplier => `<option value="${escapeHtml(supplier)}">${escapeHtml(supplier)}</option>`).join("")}`;
    elements.pricingLibraryCategoryFilter.value = categories.includes(categoryValue) ? categoryValue : "all";
    elements.pricingLibrarySupplierFilter.value = suppliers.includes(supplierValue) ? supplierValue : "all";
    state.pricingCategoryFilter = elements.pricingLibraryCategoryFilter.value;
    state.pricingSupplierFilter = elements.pricingLibrarySupplierFilter.value;
}

function getFilteredCatalogEntries() {
    const entries = getCatalogEntries();
    renderPricingLibraryFilters(entries);
    return entries
        .filter(item => {
            if (item.archived) {
                return false;
            }
            const supplier = item.supplier || item.vendor || "";
            const matchesCategory = state.pricingCategoryFilter === "all" || item.category === state.pricingCategoryFilter;
            const matchesSupplier = state.pricingSupplierFilter === "all" || supplier === state.pricingSupplierFilter;
            const hasImage = Boolean((item.itemImageDataUrl || item.imageDataUrl)?.trim());
            const matchesImage = state.pricingImageFilter === "all"
                || (state.pricingImageFilter === "has_image" && hasImage)
                || (state.pricingImageFilter === "no_image" && !hasImage);
            return matchesCategory && matchesSupplier && matchesImage && catalogItemMatchesSearch(item);
        })
        .sort((left, right) => {
            if (state.pricingSortOrder === "name_asc" || state.pricingSortOrder === "name_desc") {
                const comparison = String(left.name || "").localeCompare(String(right.name || ""), undefined, { sensitivity: "base" });
                return state.pricingSortOrder === "name_desc" ? -comparison : comparison;
            }

            const leftTimestamp = Date.parse(left.createdAt || left.dateUpdated || 0) || 0;
            const rightTimestamp = Date.parse(right.createdAt || right.dateUpdated || 0) || 0;
            const direction = state.pricingSortOrder === "date_asc" ? 1 : -1;
            return (leftTimestamp - rightTimestamp) * direction;
        });
}

function renderCatalog() {
    if (!elements.catalogGrid) {
        return;
    }

    const allActive = getCatalogEntries().filter(item => !item.archived);
    const entries = getFilteredCatalogEntries();
    if (!entries.length) {
        if (allActive.length === 0) {
            elements.catalogGrid.innerHTML = `
                <div class="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8M16 21H8"/>
                    </svg>
                    <p>No pricing library items yet.</p>
                    <button class="btn btn-primary" type="button" data-catalog-action="add-new">Add Your First Item</button>
                </div>
            `;
        } else {
            elements.catalogGrid.innerHTML = `
                <div class="empty-state">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    <p>No pricing library items match these filters.</p>
                </div>
            `;
        }
        syncProcurementLibrarySelect();
        syncDocumentLibrarySelect();
        return;
    }

    elements.catalogGrid.innerHTML = entries.map(item => {
        const refs = Array.isArray(item.documentRefs) ? item.documentRefs : [];
        const SHOW_MAX = 4;
        const visibleRefs = refs.slice(0, SHOW_MAX);
        const overflow = refs.length - SHOW_MAX;

        const refsHtml = visibleRefs.length
            ? `<span class="catalog-card-used-in">Used in: ${
                visibleRefs.map(r => {
                    const typeTag = r.docType === "procurement" ? "Proc" : r.docType === "invoice" ? "Inv" : "Quote";
                    const label = `${typeTag} ${escapeHtml(r.docRefNumber || "")}`;
                    const title = [r.clientName, r.date].filter(Boolean).join(" · ");
                    return `<button class="catalog-ref-link" type="button" data-open-doc-id="${escapeHtml(r.docId)}"${title ? ` title="${escapeHtml(title)}"` : ""}>${label}</button>`;
                }).join(", ")
            }${overflow > 0 ? ` <span class="catalog-ref-overflow">+${overflow} more</span>` : ""}</span>`
            : "";

        const isSelected = state.selectedCatalogItemIds.includes(item.id);
        return `
        <article class="catalog-card${isSelected ? " is-selected" : ""}">
            <label class="catalog-card-selector" aria-label="Select ${escapeHtml(item.name)}">
                <input type="checkbox" data-catalog-select="${escapeHtml(item.id)}"${isSelected ? " checked" : ""}>
                <span class="catalog-card-selector-ui" aria-hidden="true"></span>
            </label>
            <button class="catalog-card-trigger" type="button" data-catalog-action="open" data-catalog-id="${escapeHtml(item.id)}" aria-label="${escapeHtml(item.name)}">
                <div class="catalog-card-bubble${(item.imageDataUrl || item.itemImageDataUrl) ? " is-expandable" : ""}" ${(item.imageDataUrl || item.itemImageDataUrl) ? `data-catalog-action="expand-image" data-catalog-id="${escapeHtml(item.id)}" data-catalog-img-src="${escapeHtml(item.imageDataUrl || item.itemImageDataUrl)}" data-catalog-img-alt="${escapeHtml(item.name)}"` : ""} aria-hidden="true">
                    ${(item.imageDataUrl || item.itemImageDataUrl)
                        ? `<img src="${escapeHtml(item.imageDataUrl || item.itemImageDataUrl)}" alt="${escapeHtml(item.name)}" loading="lazy">`
                        : `<span>${escapeHtml((item.name || "Item").trim().slice(0, 2).toUpperCase() || "IT")}</span>`}
                </div>
                <div class="catalog-card-copy">
                    <strong>${escapeHtml(item.name)}</strong>
                    <span>${escapeHtml([item.brand, item.supplier || item.vendor, item.packSize || item.unitSize].filter(Boolean).join(" · ") || item.referenceId || "Library item")}</span>
                    <small>${escapeHtml(`${item.currency || "USD"} ${formatAmount(item.sellPrice ?? item.price ?? 0)}${item.leadTime ? ` · ${item.leadTime}` : ""}`)}</small>
                    ${refsHtml}
                </div>
            </button>
            <button class="catalog-edit-btn" type="button" data-catalog-action="edit" data-catalog-id="${escapeHtml(item.id)}">${escapeHtml(t("edit"))}</button>
        </article>
    `;
    }).join("");
    syncProcurementLibrarySelect();
    syncDocumentLibrarySelect();
    syncCatalogSelectionToolbar();
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

    renderNotesPage();
    renderPaymentHistoryPanel();
    renderClientAgingPanel();
    syncStatementFilterButtons();

    if (!state.statementExports.length) {
        elements.statementExportsList.innerHTML = `<p class="client-list-empty">${escapeHtml(t("no_statements"))}</p>`;
        return;
    }

    const searched = state.searchQuery
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

    const filtered = searched.filter(statement => {
        const liveOutstanding = getStatementLiveOutstanding(statement);
        if (state.statementStatusFilter === "paid") {
            return liveOutstanding <= 0;
        }
        if (state.statementStatusFilter === "pending") {
            return liveOutstanding > 0;
        }
        return true;
    });

    if (!filtered.length) {
        const emptyCopy = state.statementStatusFilter === "paid"
            ? t("no_paid_statements")
            : state.statementStatusFilter === "pending"
                ? t("no_pending_statements")
                : t("no_statement_matches");
        elements.statementExportsList.innerHTML = `<p class="client-list-empty">${escapeHtml(emptyCopy)}</p>`;
        return;
    }

    elements.statementExportsList.innerHTML = filtered.map(statement => {
        const accentClass = `merchant-${merchantColorIndex(statement.clientName || statement.payload?.clientName || "")}`;
        const noteCount = Array.isArray(statement.noteLog) ? statement.noteLog.length : 0;
        const noteBadge = noteCount > 0 ? `<span class="notes-count-badge">${noteCount}</span>` : "";
        const latestNote = noteCount > 0 ? statement.noteLog[noteCount - 1] : null;
        const latestNoteMarkup = latestNote
            ? `<div class="statement-export-note-preview"><strong>Latest note:</strong> ${escapeHtml((latestNote.text || "").length > 120 ? `${latestNote.text.slice(0, 120)}…` : latestNote.text || "")}</div>`
            : "";

        const liveOutstanding = getStatementLiveOutstanding(statement);
        const liveOutstandingFormatted = formatCurrency(liveOutstanding);
        const isPaid = liveOutstanding <= 0;

        return `
        <article class="client-row statement-export-row ${accentClass}">
            <div class="client-row-copy statement-export-copy">
                <div class="statement-export-card-head">
                    <span class="statement-export-ref">${escapeHtml(statement.referenceNumber || "TL-S-01")}</span>
                    <span class="statement-export-date">${escapeHtml(formatPrintedDate(statement.generatedAt))}</span>
                </div>
                <span class="statement-export-client">Client</span>
                <strong>${escapeHtml(statement.clientName)}</strong>
                ${latestNoteMarkup}
                <div class="statement-export-metrics">
                    <div class="statement-export-metric">
                        <span>${escapeHtml(t("statement_metric_invoices"))}</span>
                        <strong>${escapeHtml(String(statement.rowCount))}</strong>
                    </div>
                    <div class="statement-export-metric">
                        <span>${escapeHtml(t("statement_metric_total"))}</span>
                        <strong>${escapeHtml(statement.totalSelectedFormatted)}</strong>
                    </div>
                    <div class="statement-export-metric is-grand${isPaid ? " is-paid" : ""}">
                        <span>${escapeHtml(t("statement_metric_outstanding"))}</span>
                        <strong>${escapeHtml(liveOutstandingFormatted)}</strong>
                    </div>
                </div>
            </div>
            <div class="client-row-actions statement-export-actions-bar">
                ${!isPaid ? `<button class="statement-action-btn is-markpaid" type="button" data-statement-action="mark-paid" data-statement-id="${escapeHtml(statement.id)}" aria-label="${escapeHtml(t("statement_mark_paid_all"))}" title="${escapeHtml(t("statement_mark_paid_all"))}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span class="visually-hidden">${escapeHtml(t("statement_mark_paid_all"))}</span>
                </button>` : ""}
                <button class="statement-action-btn is-open" type="button" data-statement-action="open" data-statement-id="${escapeHtml(statement.id)}" aria-label="${escapeHtml(t("open_statement"))}" title="${escapeHtml(t("open_statement"))}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12s3.6-6 9-6 9 6 9 6-3.6 6-9 6-9-6-9-6Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.9"/></svg>
                    <span class="visually-hidden">${escapeHtml(t("open_statement"))}</span>
                </button>
                <button class="statement-action-btn is-open" type="button" data-statement-action="excel" data-statement-id="${escapeHtml(statement.id)}" aria-label="${escapeHtml(t("statement_generate_excel"))}" title="${escapeHtml(t("statement_generate_excel"))}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M14 3v4h4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="m9 10 4 4M13 10l-4 4M9 18h6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span class="visually-hidden">${escapeHtml(t("statement_generate_excel"))}</span>
                </button>
                <button class="statement-action-btn is-notes${noteCount > 0 ? " has-notes" : ""}" type="button" data-statement-action="notes" data-statement-id="${escapeHtml(statement.id)}" aria-label="Notes" title="Notes">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    ${noteBadge}
                    <span class="visually-hidden">Notes</span>
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

function syncStatementFilterButtons() {
    elements.statementFilterButtons?.forEach(button => {
        const isActive = button.dataset.statementFilter === state.statementStatusFilter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
}

function getStatementLiveOutstanding(statement) {
    return getStatementLinkedInvoices(statement)
        .reduce((sum, doc) => sum + getInvoiceOutstandingBalance(doc), 0);
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

    if (button.dataset.statementAction === "excel") {
        void downloadStatementExcelReport(statement.payload)
            .then(() => {
                setImportStatus(t("statement_excel_success"));
                recordActivity("downloaded statement excel", `Statement Excel report downloaded for ${statement.clientName || "unknown client"} (${statement.referenceNumber || "statement"}).`);
            })
            .catch(error => {
                setImportStatus(error.message || "Unable to export the Excel statement report.", true);
                window.alert(error.message || "Unable to export the Excel statement report.");
            });
        return;
    }

    if (button.dataset.statementAction === "mark-paid") {
        void markStatementAsPaid(statement.id);
        return;
    }

    if (button.dataset.statementAction === "notes") {
        openNotesDrawer(statement.id, "statement");
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
        amount: 0,
        isPayment: false,
        paymentDate: new Date().toISOString().slice(0, 10)
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
    const isPayment = Boolean(deduction.isPayment);
    const paymentDate = String(deduction.paymentDate || new Date().toISOString().slice(0, 10)).slice(0, 10);
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
            <div class="statement-deduction-payment-row">
                <label class="statement-deduction-payment-toggle">
                    <input type="checkbox" data-statement-deduction-field="isPayment" ${isPayment ? "checked" : ""}>
                    <span>Mark as payment — apply to invoice balance</span>
                </label>
                <label class="form-group statement-deduction-date-field" ${isPayment ? "" : "hidden"}>
                    <span>Payment Date</span>
                    <input type="date" data-statement-deduction-field="paymentDate" value="${escapeHtml(paymentDate)}">
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
        const isPayment = card.querySelector('[data-statement-deduction-field="isPayment"]')?.checked ?? false;
        const paymentDate = card.querySelector('[data-statement-deduction-field="paymentDate"]')?.value || new Date().toISOString().slice(0, 10);
        return { id, label: label.trim(), amount, isPayment, paymentDate };
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
    const paymentDeductions = (payload.deductions || []).filter(d => d.isPayment);
    const paymentsAppliedTotal = paymentDeductions.reduce((sum, d) => sum + Number(d.amount || 0), 0);
    const pureDeductionsTotal = totals.deductionTotal - paymentsAppliedTotal;
    const paymentsRow = paymentsAppliedTotal > 0
        ? `<div class="statement-edit-total-row statement-edit-payment-row"><span>Payments applied</span><strong>${escapeHtml(formatCurrency(paymentsAppliedTotal))}</strong></div>`
        : "";
    const deductionsRow = pureDeductionsTotal > 0
        ? `<div class="statement-edit-total-row"><span>Other deductions</span><strong>${escapeHtml(formatCurrency(pureDeductionsTotal))}</strong></div>`
        : "";
    elements.statementEditTotals.innerHTML = `
        <div class="statement-edit-total-row"><span>Outstanding subtotal</span><strong>${escapeHtml(totals.selectedTotalFormatted)}</strong></div>
        ${paymentsRow}${deductionsRow}
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

async function propagateStatementDeductionPayments(payload, statementRef) {
    const paymentDeductions = (payload.deductions || []).filter(d => d.isPayment && d.amount > 0);
    if (!paymentDeductions.length) return;

    const statementInvoiceNumbers = new Set(
        (payload.rows || []).map(r => String(r.invoiceNumber || "").trim().toLowerCase()).filter(Boolean)
    );
    const matchedInvoices = state.documents.filter(
        doc => doc.type === "invoice" && statementInvoiceNumbers.has(String(doc.refNumber || "").trim().toLowerCase())
    );
    if (!matchedInvoices.length) return;

    const totalInvoiceValue = matchedInvoices.reduce((sum, doc) => sum + Number(doc.total || 0), 0);

    let nextDocuments = [...state.documents];
    for (const deduction of paymentDeductions) {
        const dedId = `stmt-pmt-${deduction.id}`;
        for (const invoice of matchedInvoices) {
            const alreadyApplied = (invoice.payments || []).some(p => p.id === dedId);
            if (alreadyApplied) continue;

            const portion = totalInvoiceValue > 0
                ? (Number(invoice.total || 0) / totalInvoiceValue) * deduction.amount
                : deduction.amount / matchedInvoices.length;

            const newPayment = {
                id: dedId,
                date: deduction.paymentDate || new Date().toISOString().slice(0, 10),
                amount: Math.round(portion * 100) / 100,
                method: "Statement Deduction",
                reference: statementRef || "",
                notes: deduction.label || "Applied from statement deduction",
                appliedTo: "invoice",
                createdAt: new Date().toISOString()
            };

            nextDocuments = nextDocuments.map(doc =>
                doc.id === invoice.id
                    ? { ...doc, payments: normalizeInvoicePayments([...(doc.payments || []), newPayment]) }
                    : doc
            );
        }
    }

    await saveDocumentsToServer(nextDocuments);
    renderDocuments();
    renderPaymentHistoryPanel();
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
    await propagateStatementDeductionPayments(payload, updatedStatement.referenceNumber || statement.referenceNumber);
    if (options.openPreview) {
        window.StatementOfAccount.generateStatementOfAccountPdf(payload);
        setImportStatus("Statement changes saved and preview opened.");
    } else {
        setImportStatus("Statement changes saved.");
    }
    closeStatementEditModal();
    renderStatementsPage();
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
    const refLink = event.target.closest(".catalog-ref-link[data-open-doc-id]");
    if (refLink) {
        event.stopPropagation();
        const docId = refLink.dataset.openDocId;
        const doc = state.documents.find(d => isSameDocumentId(d.id, docId));
        if (doc && doc.isProcurement) {
            const sheet = doc;
            openProcurementSheetModal(sheet);
        } else if (doc) {
            editDocument(docId);
        }
        return;
    }

    const addButton = event.target.closest("[data-catalog-action=\"add-new\"]");
    if (addButton) {
        openCatalogItemModal();
        return;
    }

    const expandBubble = event.target.closest("[data-catalog-action=\"expand-image\"]");
    if (expandBubble && expandBubble.dataset.catalogImgSrc) {
        event.stopPropagation();
        openCatalogItemImageExpand(expandBubble.dataset.catalogImgSrc, expandBubble.dataset.catalogImgAlt || "");
        return;
    }

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
    elements.catalogItemCostInput.value = String(item.costPrice || 0);
    elements.catalogItemPriceInput.value = String(item.sellPrice ?? item.price ?? 0);
    elements.catalogItemCurrencyInput.value = item.currency || "USD";
    elements.catalogItemCategoryInput.value = item.category || "";
    elements.catalogItemBrandInput.value = item.brand || "";
    elements.catalogItemUnitSizeInput.value = item.packSize || item.unitSize || "";
    elements.catalogItemUnitInput.value = item.unit || "";
    elements.catalogItemVendorInput.value = item.supplier || item.vendor || "";
    elements.catalogItemLeadTimeInput.value = item.leadTime || "";
    elements.catalogItemCountryInput.value = item.country || "";
    elements.catalogItemTaxIncludedInput.checked = Boolean(item.taxIncluded);
    elements.catalogItemTagsInput.value = Array.isArray(item.tags) ? item.tags.join(", ") : "";
    elements.catalogItemDetailsInput.value = item.details || "";
    elements.catalogItemNotesInput.value = item.notes || "";
    if (elements.archiveCatalogItemBtn) {
        elements.archiveCatalogItemBtn.hidden = false;
    }
    state.pendingCatalogItemImageDataUrl = item.itemImageDataUrl || item.imageDataUrl || null;
    syncCatalogItemImageUI();
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
        referenceId: state.editingCatalogItemId
            ? (state.catalogItems.find(entry => entry.id === state.editingCatalogItemId)?.referenceId || `PLI-${String(state.catalogItems.length + 1).padStart(4, "0")}`)
            : `PLI-${String(state.catalogItems.length + 1).padStart(4, "0")}`,
        name,
        details: elements.catalogItemDetailsInput.value.trim(),
        notes: elements.catalogItemNotesInput.value.trim(),
        costPrice: Number.parseFloat(elements.catalogItemCostInput.value) || 0,
        price: Number.parseFloat(elements.catalogItemPriceInput.value) || 0,
        sellPrice: Number.parseFloat(elements.catalogItemPriceInput.value) || 0,
        currency: elements.catalogItemCurrencyInput.value.trim() || "USD",
        taxIncluded: elements.catalogItemTaxIncludedInput.checked,
        dateUpdated: new Date().toISOString(),
        category: elements.catalogItemCategoryInput.value.trim(),
        brand: elements.catalogItemBrandInput.value.trim(),
        unitSize: elements.catalogItemUnitSizeInput.value.trim(),
        packSize: elements.catalogItemUnitSizeInput.value.trim(),
        unit: elements.catalogItemUnitInput.value.trim(),
        vendor: elements.catalogItemVendorInput.value.trim(),
        supplier: elements.catalogItemVendorInput.value.trim(),
        leadTime: elements.catalogItemLeadTimeInput.value.trim(),
        country: elements.catalogItemCountryInput.value.trim(),
        tags: parseTags(elements.catalogItemTagsInput.value),
        archived: false,
        itemImageDataUrl: state.pendingCatalogItemImageDataUrl != null
            ? state.pendingCatalogItemImageDataUrl
            : (state.editingCatalogItemId
                ? (state.catalogItems.find(e => e.id === state.editingCatalogItemId)?.itemImageDataUrl
                    || state.catalogItems.find(e => e.id === state.editingCatalogItemId)?.imageDataUrl
                    || "")
                : "")
    };

    const nextItems = state.editingCatalogItemId
        ? state.catalogItems.map(entry => entry.id === state.editingCatalogItemId ? item : entry)
        : [item, ...state.catalogItems];

    await saveCatalogItems(nextItems);
    syncProcurementLibrarySelect();
    syncDocumentLibrarySelect();
    const hadImage = Boolean(item.itemImageDataUrl);
    const shouldReturnToProcurement = Boolean(state.catalogModalReturnToProcurement);
    const shouldReturnToDocument = Boolean(state.catalogModalReturnToDocument);
    closeCatalogItemModal();
    if (shouldReturnToProcurement && elements.procurementSheetModal?.classList.contains("active")) {
        elements.procurementLibrarySelect.value = item.id;
        insertLibraryItemIntoProcurement(item);
        if (hadImage) setImportStatus("Image saved to Pricing Library and added to procurement row.");
    } else if (shouldReturnToDocument && elements.documentModal?.classList.contains("active")) {
        elements.documentLibrarySelect.value = item.id;
        insertLibraryItemIntoDocument(item);
        if (hadImage) setImportStatus("Image saved to Pricing Library and added to document row.");
    } else {
        setActivePage("catalog");
        if (hadImage) setImportStatus("Library item saved with image.");
    }
}

async function archiveCatalogItemFromModal() {
    const item = state.catalogItems.find(entry => entry.id === state.editingCatalogItemId);
    if (!item) {
        return;
    }

    if (!window.confirm(`Archive "${item.name}" from the pricing library? Existing documents keep their snapshots.`)) {
        return;
    }

    await saveCatalogItems(state.catalogItems.map(entry => (
        entry.id === item.id
            ? { ...entry, archived: true, dateUpdated: new Date().toISOString() }
            : entry
    )));
    closeCatalogItemModal();
    setImportStatus("Library item archived. Existing document line items were not changed.");
}

// ── Catalog item image upload ──────────────────────────────────

function syncCatalogItemImageUI() {
    const dataUrl = state.pendingCatalogItemImageDataUrl || "";
    const preview = elements.catalogItemImagePreview;
    const previewImg = elements.catalogItemImagePreviewImg;
    const removeBtn = elements.catalogItemImageRemoveBtn;
    const hint = document.getElementById("catalogItemImageUploadHint");

    if (preview && previewImg) {
        if (dataUrl) {
            preview.hidden = false;
            previewImg.src = dataUrl;
            setCatalogItemImageStatus("Image ready");
        } else {
            preview.hidden = true;
            previewImg.removeAttribute("src");
            setCatalogItemImageStatus("");
        }
    }
    if (removeBtn) removeBtn.hidden = !dataUrl;
    if (hint) hint.textContent = dataUrl ? "Change image" : "Add image";
}

function setCatalogItemImageStatus(message) {
    const el = elements.catalogItemImageStatus;
    if (!el) return;
    el.textContent = message;
    el.hidden = !message;
}

function clearCatalogItemImage() {
    state.pendingCatalogItemImageDataUrl = "";
    if (elements.catalogItemImageInput) elements.catalogItemImageInput.value = "";
    syncCatalogItemImageUI();
}

async function handleCatalogItemImageInputChange() {
    const file = elements.catalogItemImageInput?.files?.[0];
    if (!file) return;

    if (elements.catalogItemImageInput) elements.catalogItemImageInput.value = "";
    setCatalogItemImageStatus("Uploading image…");

    try {
        setCatalogItemImageStatus("Optimizing image…");
        const resizedDataUrl = await readImageFileAsDataUrl(file, { maxDimension: 600, quality: 0.85 });
        setCatalogItemImageStatus("Preparing crop…");
        openCatalogItemCropModal(resizedDataUrl);
    } catch {
        setCatalogItemImageStatus("Could not read image. Try a different file.");
    }
}

// ── Catalog item crop modal ────────────────────────────────────

let _cropDragState = null;

function openCatalogItemCropModal(imageDataUrl) {
    if (!elements.catalogItemCropModal || !elements.catalogItemCropCanvas) return;

    state.pendingCatalogItemCropSrc = imageDataUrl;
    _cropDragState = null;

    const canvas = elements.catalogItemCropCanvas;
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
        const MAX_DISPLAY = 560;
        const scale = img.naturalWidth > MAX_DISPLAY ? MAX_DISPLAY / img.naturalWidth : 1;
        canvas.width = Math.round(img.naturalWidth * scale);
        canvas.height = Math.round(img.naturalHeight * scale);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Show modal before measuring layout — getBoundingClientRect returns zeros on hidden elements
        setModalState(elements.catalogItemCropModal, true);
        requestAnimationFrame(() => {
            const r = canvas.getBoundingClientRect();
            // Use actual CSS display dimensions so selection coords match the visible image
            initCatalogCropSelection(r.width || canvas.width, r.height || canvas.height);
        });
    };
    img.src = imageDataUrl;
}

function initCatalogCropSelection(cw, ch) {
    const sel = elements.catalogItemCropSelection;
    if (!sel) return;

    const inset = Math.round(Math.min(cw, ch) * 0.1);
    const x = inset;
    const y = inset;
    const w = cw - inset * 2;
    const h = ch - inset * 2;

    sel.style.left = x + "px";
    sel.style.top = y + "px";
    sel.style.width = w + "px";
    sel.style.height = h + "px";

    sel.innerHTML = "";
    const handles = ["nw", "n", "ne", "e", "se", "s", "sw", "w"];
    for (const pos of handles) {
        const span = document.createElement("span");
        span.className = "catalog-item-crop-handle";
        span.dataset.handle = pos;
        applyCropHandlePosition(span, pos);
        sel.appendChild(span);
    }

    sel.addEventListener("mousedown", onCropMouseDown);
}

function applyCropHandlePosition(span, pos) {
    const half = -5;
    const mid = "calc(50% - 5px)";
    const positions = {
        nw: { top: half + "px", left: half + "px" },
        n:  { top: half + "px", left: mid },
        ne: { top: half + "px", right: half + "px" },
        e:  { top: mid,         right: half + "px" },
        se: { bottom: half + "px", right: half + "px" },
        s:  { bottom: half + "px", left: mid },
        sw: { bottom: half + "px", left: half + "px" },
        w:  { top: mid,          left: half + "px" }
    };
    const p = positions[pos] || {};
    Object.assign(span.style, p);
}

function onCropMouseDown(event) {
    const canvas = elements.catalogItemCropCanvas;
    const sel = elements.catalogItemCropSelection;
    if (!canvas || !sel) return;

    const canvasRect = canvas.getBoundingClientRect();
    const selRect = sel.getBoundingClientRect();
    const handle = event.target.dataset?.handle || null;

    _cropDragState = {
        handle,
        startX: event.clientX,
        startY: event.clientY,
        origLeft: selRect.left - canvasRect.left,
        origTop: selRect.top - canvasRect.top,
        origWidth: selRect.width,
        origHeight: selRect.height,
        canvasW: canvasRect.width,
        canvasH: canvasRect.height
    };

    event.preventDefault();
    document.addEventListener("mousemove", onCropMouseMove);
    document.addEventListener("mouseup", onCropMouseUp);
}

function onCropMouseMove(event) {
    if (!_cropDragState) return;
    const sel = elements.catalogItemCropSelection;
    if (!sel) return;

    const { handle, startX, startY, origLeft, origTop, origWidth, origHeight, canvasW, canvasH } = _cropDragState;
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    const MIN = 20;

    let left = origLeft;
    let top = origTop;
    let width = origWidth;
    let height = origHeight;

    if (!handle) {
        left = origLeft + dx;
        top = origTop + dy;
    } else {
        if (handle.includes("e")) width = origWidth + dx;
        if (handle.includes("s")) height = origHeight + dy;
        if (handle.includes("w")) { left = origLeft + dx; width = origWidth - dx; }
        if (handle.includes("n")) { top = origTop + dy; height = origHeight - dy; }
    }

    width = Math.max(MIN, width);
    height = Math.max(MIN, height);
    left = Math.max(0, Math.min(left, canvasW - width));
    top = Math.max(0, Math.min(top, canvasH - height));
    if (left + width > canvasW) width = canvasW - left;
    if (top + height > canvasH) height = canvasH - top;

    sel.style.left = left + "px";
    sel.style.top = top + "px";
    sel.style.width = width + "px";
    sel.style.height = height + "px";
}

function onCropMouseUp() {
    _cropDragState = null;
    document.removeEventListener("mousemove", onCropMouseMove);
    document.removeEventListener("mouseup", onCropMouseUp);
}

function closeCatalogItemCropModal() {
    _cropDragState = null;
    document.removeEventListener("mousemove", onCropMouseMove);
    document.removeEventListener("mouseup", onCropMouseUp);
    setModalState(elements.catalogItemCropModal, false);
    state.pendingCatalogItemCropSrc = "";
}

function skipCatalogItemCrop() {
    if (state.pendingCatalogItemCropSrc) {
        state.pendingCatalogItemImageDataUrl = state.pendingCatalogItemCropSrc;
    }
    closeCatalogItemCropModal();
    syncCatalogItemImageUI();
    setCatalogItemImageStatus("Image ready — save item to apply.");
}

function applyCatalogItemCrop() {
    const canvas = elements.catalogItemCropCanvas;
    const sel = elements.catalogItemCropSelection;
    if (!canvas || !sel || !state.pendingCatalogItemCropSrc) {
        skipCatalogItemCrop();
        return;
    }

    const canvasRect = canvas.getBoundingClientRect();
    const selRect = sel.getBoundingClientRect();
    const img = new Image();

    img.onload = () => {
        // Map directly from CSS display coords to source image coords in one step.
        // This stays correct even when the canvas is letterboxed by max-height CSS.
        const srcScaleX = img.naturalWidth / (canvasRect.width || canvas.width);
        const srcScaleY = img.naturalHeight / (canvasRect.height || canvas.height);
        const sx = Math.max(0, Math.round((selRect.left - canvasRect.left) * srcScaleX));
        const sy = Math.max(0, Math.round((selRect.top - canvasRect.top) * srcScaleY));
        const sw = Math.max(1, Math.round(selRect.width * srcScaleX));
        const sh = Math.max(1, Math.round(selRect.height * srcScaleY));

        const out = document.createElement("canvas");
        out.width = sw;
        out.height = sh;
        out.getContext("2d").drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
        state.pendingCatalogItemImageDataUrl = out.toDataURL("image/jpeg", 0.85);
        closeCatalogItemCropModal();
        syncCatalogItemImageUI();
        setCatalogItemImageStatus("Image ready — save item to apply.");
    };
    img.onerror = () => {
        skipCatalogItemCrop();
    };
    img.src = state.pendingCatalogItemCropSrc;
}

// ── Catalog item selection ────────────────────────────────────

function syncCatalogSelectionToolbar() {
    if (!elements.catalogSelectionToolbar || !elements.catalogSelectionTitle) return;
    const count = state.selectedCatalogItemIds.length;
    elements.catalogSelectionToolbar.hidden = count === 0;
    elements.catalogSelectionTitle.textContent = `${count} item${count === 1 ? "" : "s"} selected`;
    if (elements.exportCatalogReportBtn) elements.exportCatalogReportBtn.disabled = count === 0;
}

function handleCatalogGridChange(event) {
    const checkbox = event.target.closest("[data-catalog-select]");
    if (!checkbox) return;
    const itemId = String(checkbox.dataset.catalogSelect || "");
    const next = new Set(state.selectedCatalogItemIds);
    if (checkbox.checked) {
        next.add(itemId);
    } else {
        next.delete(itemId);
    }
    state.selectedCatalogItemIds = [...next];
    const card = checkbox.closest(".catalog-card");
    if (card) card.classList.toggle("is-selected", checkbox.checked);
    syncCatalogSelectionToolbar();
}

function clearCatalogSelection() {
    state.selectedCatalogItemIds = [];
    renderCatalog();
}

// ── Catalog item report PDF export ───────────────────────────

function buildCatalogReportNode(items) {
    const shell = document.createElement("div");
    shell.style.cssText = "position:fixed;left:-9999px;top:-9999px;pointer-events:none;";

    const companyName = state.companyProfile?.companyName || "Pricing Library";
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const itemsHtml = items.map(item => {
        const initials = escapeHtml((item.name || "Item").trim().slice(0, 2).toUpperCase() || "IT");
        const sellPrice = item.sellPrice ?? item.price ?? 0;
        const metaParts = [item.brand, item.supplier || item.vendor, item.packSize || item.unitSize].filter(Boolean);
        const meta = metaParts.length ? `<p class="catalog-report-item-meta">${escapeHtml(metaParts.join(" · "))}</p>` : "";
        const detail = item.details
            ? `<p class="catalog-report-item-meta">${escapeHtml(item.details.slice(0, 100))}</p>`
            : "";
        const thumbHtml = item.itemImageDataUrl
            ? `<img src="${escapeHtml(item.itemImageDataUrl)}" alt="${escapeHtml(item.name)}">`
            : `<div class="catalog-report-item-thumb-fallback">${initials}</div>`;

        return `
        <div class="catalog-report-item">
            <div class="catalog-report-item-thumb">${thumbHtml}</div>
            <div class="catalog-report-item-body">
                <p class="catalog-report-item-name">${escapeHtml(item.name)}</p>
                ${meta}${detail}
                <p class="catalog-report-item-price">${escapeHtml(item.currency || "USD")} ${escapeHtml(formatAmount(sellPrice))}</p>
            </div>
        </div>`;
    }).join("");

    shell.innerHTML = `
        <div data-pdf-export-page>
            <div class="catalog-report-page">
                <div class="catalog-report-header">
                    <div>
                        <h1 class="catalog-report-title">${escapeHtml(companyName)}</h1>
                        <p class="catalog-report-subtitle">Pricing Library · ${escapeHtml(today)} · ${items.length} item${items.length === 1 ? "" : "s"}</p>
                    </div>
                </div>
                <div class="catalog-report-grid">${itemsHtml}</div>
            </div>
        </div>`;
    return shell;
}

async function exportCatalogItemReport() {
    if (!window.html2pdf) {
        window.alert("PDF export is unavailable. Please reload and try again.");
        return;
    }
    const selectedItems = state.selectedCatalogItemIds
        .map(id => state.catalogItems.find(item => item.id === id))
        .filter(Boolean);
    if (!selectedItems.length) {
        window.alert("Select at least one item to export.");
        return;
    }

    if (elements.exportCatalogReportBtn) elements.exportCatalogReportBtn.disabled = true;
    setImportStatus("Generating item report…");

    try {
        const stamp = getTodayStamp();
        const filename = `pricing-library-report-${stamp}.pdf`;
        const node = buildCatalogReportNode(selectedItems);
        document.body.appendChild(node);

        const blob = await window.html2pdf()
            .set({
                filename,
                margin: [0, 0, 0, 0],
                pagebreak: { mode: ["avoid-all"] },
                html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
            })
            .from(node.querySelector("[data-pdf-export-page]"))
            .outputPdf("blob");

        node.remove();
        downloadBlobFile(filename, blob);
        setImportStatus(`Item report exported — ${selectedItems.length} item${selectedItems.length === 1 ? "" : "s"}.`);
    } catch (err) {
        setImportStatus("Report export failed: " + (err?.message || "Unknown error"), true);
    } finally {
        if (elements.exportCatalogReportBtn) {
            elements.exportCatalogReportBtn.disabled = state.selectedCatalogItemIds.length === 0;
        }
    }
}

// ── Column visibility (Columns dropdown) ──────────────────────

function toggleProcColumn(colName, forceState) {
    const wrap = elements.procurementSheetModal?.querySelector(".procurement-table-wrap");
    if (!wrap) return;
    const cls = `proc-show-col-${colName}`;
    const show = typeof forceState === "boolean" ? forceState : !wrap.classList.contains(cls);
    wrap.classList.toggle(cls, show);
    const cb = elements.procurementSheetModal?.querySelector(`[data-col-toggle="${colName}"]`);
    if (cb) cb.checked = show;
}

function initProcColumnsState() {
    const wrap = elements.procurementSheetModal?.querySelector(".procurement-table-wrap");
    if (wrap) {
        wrap.classList.remove("proc-show-col-lead-time", "proc-show-col-supplier", "proc-show-col-currency", "proc-show-col-notes");
    }
    elements.procurementSheetModal?.querySelectorAll("[data-col-toggle]").forEach(cb => { cb.checked = false; });
}

function autoShowInternalFieldsIfNeeded() {
    const rows = elements.procurementRowsContainer?.querySelectorAll(".procurement-row") || [];
    const hasLT  = Array.from(rows).some(r => r.querySelector('[data-procurement-field="leadTime"]')?.value.trim());
    const hasSup = Array.from(rows).some(r => r.querySelector('[data-procurement-field="supplier"]')?.value.trim());
    if (hasLT)  toggleProcColumn("lead-time", true);
    if (hasSup) toggleProcColumn("supplier",  true);
}

// ── Library search combobox ────────────────────────────────────

function filterProcLibItems(query) {
    const q = query.toLowerCase().trim();
    const all = getActiveLibraryItems();
    if (!q) return all;
    return all.filter(item =>
        (item.name || "").toLowerCase().includes(q) ||
        (item.brand || "").toLowerCase().includes(q) ||
        (item.referenceId || "").toLowerCase().includes(q)
    );
}

function renderProcLibItems(items, query) {
    const dropdown = document.getElementById("procLibDropdown");
    if (!dropdown) return;
    const createRow = `<div class="proc-lib-option proc-lib-create-opt" data-proc-lib-create="1"><span>+ Create new item</span></div>`;
    if (!items.length) {
        dropdown.innerHTML = `<div class="proc-lib-empty">No matches found.</div>${createRow}`;
    } else {
        dropdown.innerHTML = items.map(item => {
            const meta = [item.brand, item.packSize || item.unitSize, item.unit].filter(Boolean).join(" · ");
            const price = (item.sellPrice != null && item.sellPrice !== "") ? ` · ${Number(item.sellPrice).toFixed(2)} ${item.currency || ""}`.trimEnd() : "";
            return `<div class="proc-lib-option" data-item-id="${escapeHtml(item.id)}" role="option" tabindex="-1">
                <span class="proc-lib-option-name">${escapeHtml(item.name)}</span>
                ${(meta || price) ? `<span class="proc-lib-option-meta">${escapeHtml(meta + price)}</span>` : ""}
            </div>`;
        }).join("") + createRow;
    }
    dropdown.hidden = false;
    document.getElementById("procLibSearchInput")?.setAttribute("aria-expanded", "true");
}

function openProcLibDropdown() {
    const input = document.getElementById("procLibSearchInput");
    renderProcLibItems(filterProcLibItems(input?.value || ""), input?.value || "");
}

function closeProcLibDropdown() {
    const dropdown = document.getElementById("procLibDropdown");
    if (dropdown) dropdown.hidden = true;
    document.getElementById("procLibSearchInput")?.setAttribute("aria-expanded", "false");
}

function handleProcLibDropdownClick(event) {
    const createOpt = event.target.closest("[data-proc-lib-create]");
    if (createOpt) {
        closeProcLibDropdown();
        openCatalogItemModal({ returnToProcurement: true });
        return;
    }
    const opt = event.target.closest("[data-item-id]");
    if (!opt) return;
    const item = state.catalogItems.find(i => i.id === opt.dataset.itemId);
    if (item) {
        insertLibraryItemIntoProcurement(item);
        const input = document.getElementById("procLibSearchInput");
        if (input) input.value = "";
        closeProcLibDropdown();
    }
}

// ── Row totals ─────────────────────────────────────────────────

function refreshProcurementRowTotals() {
    elements.procurementRowsContainer?.querySelectorAll(".procurement-row").forEach(row => {
        const tbd = row.querySelector('[data-procurement-field="quantityTbd"]')?.checked;
        const qty = Number.parseFloat(row.querySelector('[data-procurement-field="quantity"]')?.value) || 0;
        const price = Number.parseFloat(row.querySelector('[data-procurement-field="unitPrice"]')?.value) || 0;
        const totalEl = row.querySelector(".proc-row-total");
        if (!totalEl) return;
        if (tbd) {
            totalEl.textContent = "TBD";
            totalEl.classList.remove("has-value");
        } else if (qty > 0 && price > 0) {
            totalEl.textContent = (qty * price).toFixed(2);
            totalEl.classList.add("has-value");
        } else {
            totalEl.textContent = "—";
            totalEl.classList.remove("has-value");
        }
    });
}

// ── Notes icon ─────────────────────────────────────────────────

function handleProcNotesIconClick(rowEl) {
    const isOpen = rowEl.classList.toggle("proc-row-notes-open");
    const btn = rowEl.querySelector(".proc-notes-btn");
    if (btn) btn.classList.toggle("notes-open", isOpen);
    if (isOpen) {
        rowEl.querySelector('[data-procurement-field="notes"]')?.focus();
    }
}

function updateProcNotesIconDot(rowEl) {
    const notes = rowEl.querySelector('[data-procurement-field="notes"]')?.value.trim();
    const btn = rowEl.querySelector(".proc-notes-btn");
    const dot = rowEl.querySelector(".proc-notes-dot");
    if (!btn || !dot) return;
    btn.classList.toggle("has-notes", Boolean(notes));
    dot.hidden = !notes;
}

// ── Translation panel ──────────────────────────────────────────

let _procCachedTranslations = null;

function getProcTranslateLang() {
    return elements.procTranslatePanel?.querySelector('input[name="procTranslateLang"]:checked')?.value || "es";
}

function setProcTranslateStatus(message, isError = false) {
    if (!elements.procTranslateStatus) return;
    elements.procTranslateStatus.textContent = message;
    elements.procTranslateStatus.classList.toggle("error", isError);
}

function toggleProcTranslatePanel() {
    const panel = elements.procTranslatePanel;
    if (!panel) return;
    const opening = panel.hidden;
    panel.hidden = !opening;
    elements.procurementTranslateBtn?.classList.toggle("active", opening);
    if (!opening) {
        _procCachedTranslations = null;
        setProcTranslateStatus("");
        if (elements.procTranslatePreview) elements.procTranslatePreview.hidden = true;
        if (elements.procTranslateDuplicateBtn) elements.procTranslateDuplicateBtn.disabled = true;
        if (elements.procTranslateInPlaceBtn) elements.procTranslateInPlaceBtn.disabled = true;
    }
}

function resetProcTranslatePanel() {
    if (elements.procTranslatePanel) elements.procTranslatePanel.hidden = true;
    elements.procurementTranslateBtn?.classList.remove("active");
    _procCachedTranslations = null;
    setProcTranslateStatus("");
    if (elements.procTranslatePreview) elements.procTranslatePreview.hidden = true;
    if (elements.procTranslateDuplicateBtn) elements.procTranslateDuplicateBtn.disabled = true;
    if (elements.procTranslateInPlaceBtn) elements.procTranslateInPlaceBtn.disabled = true;
}

async function translateText(text, targetLang) {
    const trimmed = text.trim();
    if (!trimmed) return text;
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=en|${targetLang}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Translation service unavailable.");
    const data = await response.json();
    if (data.responseStatus !== 200) return text;
    return data.responseData?.translatedText || text;
}

async function translateProcurementRowsData(rows, targetLang) {
    const results = [];
    for (const row of rows) {
        const description = await translateText(row.description, targetLang);
        const notes = row.notes ? await translateText(row.notes, targetLang) : row.notes;
        results.push({ ...row, description, notes });
    }
    return results;
}

async function handleProcTranslatePreview() {
    const lang = getProcTranslateLang();
    const langLabel = lang === "es" ? "Spanish" : "French";
    const rows = collectProcurementRows();

    if (!rows.length || !rows.some(r => r.description)) {
        setProcTranslateStatus("Add descriptions to rows before translating.", true);
        return;
    }

    const count = rows.filter(r => r.description).length;
    setProcTranslateStatus(`Translating ${count} row${count === 1 ? "" : "s"} to ${langLabel}…`);
    if (elements.procTranslatePreviewBtn) elements.procTranslatePreviewBtn.disabled = true;

    try {
        const translatedRows = await translateProcurementRowsData(rows, lang);
        _procCachedTranslations = { rows: translatedRows, lang, originalRows: rows };

        const previewEl = elements.procTranslatePreview;
        if (previewEl) {
            previewEl.innerHTML = translatedRows
                .filter(r => r.description)
                .map(row => {
                    const orig = rows.find(r => r.id === row.id);
                    return `<div class="proc-translate-preview-row">
                        <span class="proc-translate-original">${escapeHtml(orig?.description || "")}</span>
                        <span class="proc-translate-arrow">→</span>
                        <span class="proc-translate-translated">${escapeHtml(row.description)}</span>
                    </div>`;
                }).join("");
            previewEl.hidden = false;
        }

        if (elements.procTranslateDuplicateBtn) elements.procTranslateDuplicateBtn.disabled = false;
        if (elements.procTranslateInPlaceBtn) elements.procTranslateInPlaceBtn.disabled = false;
        setProcTranslateStatus(`Preview ready — choose how to apply the ${langLabel} translation.`);
    } catch (error) {
        setProcTranslateStatus(error.message || "Translation failed.", true);
    } finally {
        if (elements.procTranslatePreviewBtn) elements.procTranslatePreviewBtn.disabled = false;
    }
}

async function handleProcTranslateApply(mode) {
    if (!_procCachedTranslations) return;
    const { rows: translatedRows, lang } = _procCachedTranslations;
    const langLabel = lang === "es" ? "Spanish" : "French";
    const langTag = lang === "es" ? "ES" : "FR";

    if (mode === "inplace") {
        const allRowEls = elements.procurementRowsContainer?.querySelectorAll(".procurement-row") || [];
        allRowEls.forEach(rowEl => {
            const translated = translatedRows.find(r => r.id === rowEl.dataset.procurementRowId);
            if (!translated) return;
            const descInput = rowEl.querySelector('[data-procurement-field="description"]');
            const notesInput = rowEl.querySelector('[data-procurement-field="notes"]');
            if (descInput) descInput.value = translated.description;
            if (notesInput && translated.notes) notesInput.value = translated.notes;
        });
        setProcTranslateStatus(`Translated to ${langLabel} in place.`);
        _procCachedTranslations = null;
        if (elements.procTranslateDuplicateBtn) elements.procTranslateDuplicateBtn.disabled = true;
        if (elements.procTranslateInPlaceBtn) elements.procTranslateInPlaceBtn.disabled = true;
        if (elements.procTranslatePreview) elements.procTranslatePreview.hidden = true;
        return;
    }

    // mode === "duplicate"
    if (elements.procTranslateDuplicateBtn) elements.procTranslateDuplicateBtn.disabled = true;
    setProcTranslateStatus(`Saving ${langLabel} version…`);

    try {
        const currentSheet = buildProcurementSheetFromEditor();
        const translatedNotes = currentSheet.notes ? await translateText(currentSheet.notes, lang) : currentSheet.notes;
        const langRef = `${currentSheet.refNumber || createProcurementReference()}-${langTag}`;
        const translatedSheet = {
            ...currentSheet,
            id: Date.now(),
            refNumber: langRef,
            notes: translatedNotes,
            procurementItems: translatedRows,
            items: translatedRows.map(row => ({
                description: row.description,
                quantity: row.quantityTbd ? "TBD" : row.quantity,
                unitPrice: row.unitPrice,
                price: row.unitPrice,
                totalPrice: row.quantityTbd ? 0 : (Number.parseFloat(row.quantity) || 0) * row.unitPrice
            })),
            printedAt: new Date().toISOString(),
            changeHistory: [{
                date: new Date().toISOString(),
                summary: `Created as ${langLabel} translation of ${currentSheet.refNumber}`,
                type: "system"
            }]
        };
        const nextDocuments = [translatedSheet, ...state.documents];
        await saveDocumentsToServer(nextDocuments);
        renderDocuments();
        setProcTranslateStatus(`${langLabel} version saved as "${langRef}" — find it in your documents list.`);
        _procCachedTranslations = null;
        if (elements.procTranslateInPlaceBtn) elements.procTranslateInPlaceBtn.disabled = true;
    } catch (error) {
        setProcTranslateStatus(error.message || "Unable to save translated version.", true);
        if (elements.procTranslateDuplicateBtn) elements.procTranslateDuplicateBtn.disabled = false;
    }
}

function syncProcurementLibrarySelect() {
    if (!elements.procurementLibrarySelect) {
        return;
    }

    const currentValue = elements.procurementLibrarySelect.value;
    const items = getActiveLibraryItems();
    elements.procurementLibrarySelect.innerHTML = `<option value="">Choose a library item</option>${items.map(item => {
        const meta = [item.brand, item.supplier || item.vendor, item.packSize || item.unitSize].filter(Boolean).join(" · ");
        return `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}${meta ? ` (${escapeHtml(meta)})` : ""}</option>`;
    }).join("")}`;
    if (items.some(item => item.id === currentValue)) {
        elements.procurementLibrarySelect.value = currentValue;
    }
    // Refresh combobox if open
    const dropdown = document.getElementById("procLibDropdown");
    const input = document.getElementById("procLibSearchInput");
    if (dropdown && !dropdown.hidden) {
        renderProcLibItems(filterProcLibItems(input?.value || ""), input?.value || "");
    }
}

function syncDocumentLibrarySelect() {
    if (!elements.documentLibrarySelect) {
        return;
    }

    const currentValue = elements.documentLibrarySelect.value;
    const items = getActiveLibraryItems();
    elements.documentLibrarySelect.innerHTML = `<option value="">Pricing Library</option>${items.map(item => {
        const meta = [item.brand, item.supplier || item.vendor].filter(Boolean).join(" · ");
        return `<option value="${escapeHtml(item.id)}">${escapeHtml(item.name)}${meta ? ` (${escapeHtml(meta)})` : ""}</option>`;
    }).join("")}`;
    if (items.some(item => item.id === currentValue)) {
        elements.documentLibrarySelect.value = currentValue;
    }
}

function createProcurementReference(dateValue = getLocalDateInputValue()) {
    return `${getRefPrefix(dateValue)}-${getNextRefSequence(dateValue)}`;
}

function createProcurementRowData(source = {}) {
    const quantityValue = String(source.quantity ?? "").trim();
    const quantityTbd = Boolean(source.quantityTbd) || !quantityValue || quantityValue.toLowerCase() === "tbd";
    return {
        id: String(source.id || `proc-row-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`),
        lineNumber: Number.parseInt(source.lineNumber, 10) || 1,
        libraryItemId: String(source.libraryItemId || ""),
        libraryReferenceId: String(source.libraryReferenceId || ""),
        description: String(source.description || source.name || "").trim(),
        brand: String(source.brand || "").trim(),
        packSize: String(source.packSize || source.unitSize || "").trim(),
        unit: String(source.unit || "").trim(),
        unitPrice: Number.parseFloat(source.unitPrice ?? source.sellPrice ?? source.price) || 0,
        currency: String(source.currency || elements.procurementCurrencyInput?.value || "USD").trim() || "USD",
        leadTime: String(source.leadTime || "").trim(),
        supplier: String(source.supplier || source.vendor || "").trim(),
        notes: String(source.notes || "").trim(),
        itemImageDataUrl: String(source.itemImageDataUrl || source.imageDataUrl || "").trim(),
        quantity: quantityTbd ? "" : quantityValue,
        quantityTbd
    };
}

function createProcurementSnapshotFromLibraryItem(item) {
    return createProcurementRowData({
        libraryItemId: item.id,
        libraryReferenceId: item.referenceId,
        description: item.name,
        brand: item.brand,
        packSize: item.packSize || item.unitSize,
        unit: item.unit,
        unitPrice: item.sellPrice ?? item.price,
        currency: item.currency,
        leadTime: item.leadTime,
        supplier: item.supplier || item.vendor,
        notes: item.notes,
        itemImageDataUrl: item.itemImageDataUrl || item.imageDataUrl || ""
    });
}

function getProcurementRowMarkup(row = {}) {
    const data = createProcurementRowData(row);
    const tbdClass = data.quantityTbd ? " procurement-row--tbd" : "";
    const hasNotes = Boolean(data.notes);
    const tbdTip = "TBD = To Be Determined. Use this when the quantity is not yet confirmed — it lets you price items before final quantities are known. Uncheck TBD once you have the actual quantity and enter it directly.";
    const price = Number(data.unitPrice || 0);
    const qty = data.quantityTbd ? 0 : (Number.parseFloat(data.quantity) || 0);
    const lineTotal = qty > 0 && price > 0 ? (qty * price).toFixed(2) : null;
    return `
        <tr class="procurement-row${tbdClass}" data-procurement-row-id="${escapeHtml(data.id)}" data-library-item-id="${escapeHtml(data.libraryItemId)}" data-library-reference-id="${escapeHtml(data.libraryReferenceId)}" data-item-image-data-url="${escapeHtml(data.itemImageDataUrl)}">
            <td class="proc-select-col"><input type="checkbox" class="procurement-row-select" aria-label="Select row"></td>
            <td><span class="procurement-line-number">${escapeHtml(String(data.lineNumber))}</span></td>
            <td class="proc-td-desc">
                ${data.itemImageDataUrl ? `<div class="procurement-row-image"><img src="${escapeHtml(data.itemImageDataUrl)}" alt="${escapeHtml(data.description || "Item image")}"></div>` : ""}
                <textarea data-procurement-field="description" rows="2" placeholder="Item description">${escapeHtml(data.description)}</textarea>
            </td>
            <td><input type="text" data-procurement-field="brand" value="${escapeHtml(data.brand)}"></td>
            <td><input type="text" data-procurement-field="packSize" value="${escapeHtml(data.packSize)}"></td>
            <td><input type="text" data-procurement-field="unit" value="${escapeHtml(data.unit)}"></td>
            <td><input type="number" step="0.01" min="0" data-procurement-field="unitPrice" value="${escapeHtml(String(price.toFixed(2)))}"></td>
            <td class="proc-qty-cell">
                <input type="text" data-procurement-field="quantity" value="${escapeHtml(data.quantity)}" ${data.quantityTbd ? "disabled" : ""} placeholder="Qty">
                <label class="procurement-tbd-toggle" title="${escapeHtml(tbdTip)}"><input type="checkbox" data-procurement-field="quantityTbd" ${data.quantityTbd ? "checked" : ""}> TBD <span class="tbd-help" aria-hidden="true" title="${escapeHtml(tbdTip)}">?</span></label>
            </td>
            <td class="proc-total-cell"><span class="proc-row-total${lineTotal ? " has-value" : ""}">${data.quantityTbd ? "TBD" : (lineTotal || "—")}</span></td>
            <td class="proc-col-lead-time"><input type="text" data-procurement-field="leadTime" value="${escapeHtml(data.leadTime)}"></td>
            <td class="proc-col-supplier"><input type="text" data-procurement-field="supplier" value="${escapeHtml(data.supplier)}"></td>
            <td class="proc-col-currency"><input type="text" data-procurement-field="currency" value="${escapeHtml(data.currency)}"></td>
            <td class="proc-col-notes"><textarea data-procurement-field="notes" rows="2" placeholder="Row notes">${escapeHtml(data.notes)}</textarea></td>
            <td class="procurement-row-actions">
                <button type="button" class="proc-notes-btn${hasNotes ? " has-notes" : ""}" data-proc-notes="${escapeHtml(data.id)}" aria-label="Row notes" title="Row notes"><svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2" width="11" height="12" rx="1.5"/><line x1="5" y1="5.5" x2="11" y2="5.5"/><line x1="5" y1="8" x2="11" y2="8"/><line x1="5" y1="10.5" x2="8.5" y2="10.5"/></svg><span class="proc-notes-dot"${hasNotes ? "" : " hidden"}></span></button>
                <button type="button" class="item-to-doc-btn" data-send-to-doc="${escapeHtml(data.id)}" aria-label="Add to open document" title="Add to open document"><svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2h7l3 3v9H3z"/><path d="M10 2v3h3"/><path d="M5.5 9l2 2 3-3"/></svg></button>
                <button type="button" class="item-del-btn" data-remove-procurement-row="${escapeHtml(data.id)}" aria-label="Remove row" title="Remove row"><svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/></svg></button>
            </td>
        </tr>
    `;
}

function addProcurementRow(row = {}) {
    if (!elements.procurementRowsContainer) {
        return;
    }

    const lineNumber = elements.procurementRowsContainer.querySelectorAll(".procurement-row").length + 1;
    elements.procurementRowsContainer.insertAdjacentHTML("beforeend", getProcurementRowMarkup({ ...row, lineNumber }));
    refreshProcurementRowOrdering();
}

function refreshProcurementRowOrdering() {
    elements.procurementRowsContainer?.querySelectorAll(".procurement-row").forEach((row, index) => {
        const number = row.querySelector(".procurement-line-number");
        if (number) {
            number.textContent = String(index + 1);
        }
    });
}

function handleProcurementRowsChange(event) {
    const toggle = event.target.closest('[data-procurement-field="quantityTbd"]');
    if (toggle) {
        const row = toggle.closest(".procurement-row");
        const quantityInput = row?.querySelector('[data-procurement-field="quantity"]');
        if (quantityInput) {
            quantityInput.disabled = toggle.checked;
            if (toggle.checked) quantityInput.value = "";
        }
        row?.classList.toggle("procurement-row--tbd", toggle.checked);
        refreshProcurementRowTotals();
        return;
    }

    const rowCheckbox = event.target.closest(".procurement-row-select");
    if (rowCheckbox) {
        syncProcurementRowSelection();
    }
}

function syncProcurementRowSelection() {
    if (!elements.procurementRowsContainer) return;
    const all = elements.procurementRowsContainer.querySelectorAll(".procurement-row-select");
    const checked = elements.procurementRowsContainer.querySelectorAll(".procurement-row-select:checked");
    if (elements.selectAllProcurementRows) {
        elements.selectAllProcurementRows.indeterminate = checked.length > 0 && checked.length < all.length;
        elements.selectAllProcurementRows.checked = all.length > 0 && checked.length === all.length;
    }
    if (elements.convertSelectedToQuoteBtn) {
        elements.convertSelectedToQuoteBtn.hidden = checked.length === 0;
    }
}

function handleSelectAllProcurementRows(event) {
    const checked = event.target.checked;
    elements.procurementRowsContainer?.querySelectorAll(".procurement-row-select").forEach(cb => {
        cb.checked = checked;
    });
    if (elements.convertSelectedToQuoteBtn) {
        const total = elements.procurementRowsContainer?.querySelectorAll(".procurement-row-select").length || 0;
        elements.convertSelectedToQuoteBtn.hidden = !checked || total === 0;
    }
}

function handleProcurementRowsClick(event) {
    const notesBtn = event.target.closest("[data-proc-notes]");
    if (notesBtn) {
        const rowEl = notesBtn.closest(".procurement-row");
        if (rowEl) handleProcNotesIconClick(rowEl);
        return;
    }

    const sendToDocButton = event.target.closest("[data-send-to-doc]");
    if (sendToDocButton) {
        const rowEl = sendToDocButton.closest(".procurement-row");
        if (rowEl) {
            const getValue = field => rowEl.querySelector(`[data-procurement-field="${field}"]`)?.value || "";
            const quantityTbd = rowEl.querySelector('[data-procurement-field="quantityTbd"]')?.checked ?? false;
            const rowData = createProcurementRowData({
                id: rowEl.dataset.procurementRowId,
                description: getValue("description"),
                brand: getValue("brand"),
                packSize: getValue("packSize"),
                unit: getValue("unit"),
                unitPrice: getValue("unitPrice"),
                leadTime: getValue("leadTime"),
                supplier: getValue("supplier"),
                quantity: getValue("quantity"),
                quantityTbd
            });
            addProcurementRowToCurrentDocument(rowData);
        }
        return;
    }

    const removeButton = event.target.closest("[data-remove-procurement-row]");
    if (!removeButton) {
        return;
    }

    removeButton.closest(".procurement-row")?.remove();
    refreshProcurementRowOrdering();
}

function collectProcurementRows() {
    return Array.from(elements.procurementRowsContainer?.querySelectorAll(".procurement-row") || []).map((row, index) => {
        const getValue = field => row.querySelector(`[data-procurement-field="${field}"]`)?.value || "";
        const quantityTbd = row.querySelector('[data-procurement-field="quantityTbd"]')?.checked ?? false;
        return createProcurementRowData({
            id: row.dataset.procurementRowId,
            lineNumber: index + 1,
            libraryItemId: row.dataset.libraryItemId || "",
            description: getValue("description"),
            brand: getValue("brand"),
            packSize: getValue("packSize"),
            unit: getValue("unit"),
            unitPrice: getValue("unitPrice"),
            currency: getValue("currency"),
            leadTime: getValue("leadTime"),
            supplier: getValue("supplier"),
            quantity: getValue("quantity"),
            quantityTbd,
            notes: getValue("notes"),
            itemImageDataUrl: row.dataset.itemImageDataUrl || ""
        });
    }).filter(row => row.description || row.brand || row.supplier || row.unitPrice > 0);
}

function buildProcurementSheetFromEditor() {
    const existing = state.editingProcurementSheetId ? getDocumentById(state.editingProcurementSheetId) : null;
    const rows = collectProcurementRows();
    const total = rows.reduce((sum, row) => {
        const qty = row.quantityTbd ? 0 : Number.parseFloat(row.quantity) || 0;
        return sum + (qty * (Number.parseFloat(row.unitPrice) || 0));
    }, 0);
    return {
        ...(existing || {}),
        id: state.editingProcurementSheetId || Date.now(),
        type: "procurement",
        status: "logged",
        refNumber: elements.procurementRefNumberInput.value.trim() || createProcurementReference(elements.procurementDateInput.value || getLocalDateInputValue()),
        date: elements.procurementDateInput.value || getLocalDateInputValue(),
        clientName: elements.procurementClientInput.value.trim() || "Procurement Request",
        clientAddress: "",
        consigneeName: "",
        consigneeAddress: "",
        currency: elements.procurementCurrencyInput.value.trim() || "USD",
        notes: elements.procurementNotesInput.value.trim(),
        internalNotes: "",
        tags: parseTags(`${elements.procurementClientInput.value}, procurement, bid`),
        procurementItems: rows,
        items: rows.map(row => ({
            description: row.description,
            quantity: row.quantityTbd ? "TBD" : row.quantity,
            unitPrice: row.unitPrice,
            price: row.unitPrice,
            totalPrice: row.quantityTbd ? 0 : (Number.parseFloat(row.quantity) || 0) * row.unitPrice
        })),
        subtotal: total,
        total,
        printedAt: new Date().toISOString(),
        createdBy: existing?.createdBy || (state.currentUser ? {
            userId: state.currentUser.userId,
            username: state.currentUser.username,
            displayName: state.currentUser.displayName,
            role: state.currentUser.role
        } : null)
    };
}

function populateProcurementEditor(sheet = null, initialRows = null) {
    const today = getLocalDateInputValue();
    const doc = sheet || {};
    state.editingProcurementSheetId = sheet?.id || null;
    elements.procurementSheetTitle.textContent = sheet ? `Edit ${sheet.refNumber || "Procurement Sheet"}` : "New Procurement Sheet";
    elements.procurementRefNumberInput.value = doc.refNumber || createProcurementReference(today);
    elements.procurementDateInput.value = doc.date || today;
    elements.procurementClientInput.value = doc.clientName || "";
    elements.procurementCurrencyInput.value = doc.currency || "USD";
    elements.procurementNotesInput.value = doc.notes || "";
    resetProcTranslatePanel();
    initProcColumnsState();
    closeProcLibDropdown();
    elements.procurementRowsContainer.innerHTML = "";
    const rows = initialRows || (Array.isArray(doc.procurementItems) ? doc.procurementItems : []);
    if (rows.length) {
        rows.forEach(row => addProcurementRow(row));
    } else {
        addProcurementRow();
    }
    refreshProcurementRowTotals();
    syncProcurementLibrarySelect();
    autoShowInternalFieldsIfNeeded();
}

function openProcurementSheetModal(sheet = null, initialRows = null) {
    populateProcurementEditor(sheet, initialRows);
    setModalState(elements.procurementSheetModal, true);
}

function closeProcurementSheetModal() {
    state.editingProcurementSheetId = null;
    closeProcurementDropdowns();
    resetProcTranslatePanel();
    if (elements.convertSelectedToQuoteBtn) elements.convertSelectedToQuoteBtn.hidden = true;
    if (elements.selectAllProcurementRows) {
        elements.selectAllProcurementRows.checked = false;
        elements.selectAllProcurementRows.indeterminate = false;
    }
    setModalState(elements.procurementSheetModal, false);
}

function insertLibraryItemIntoProcurement(item) {
    if (!item) {
        return;
    }
    addProcurementRow(createProcurementSnapshotFromLibraryItem(item));
    setImportStatus(`Inserted "${item.name}" as a frozen procurement snapshot.`);
}

function insertSelectedLibraryItemIntoProcurement() {
    const item = state.catalogItems.find(entry => entry.id === elements.procurementLibrarySelect.value);
    if (!item) {
        window.alert("Choose a pricing library item first.");
        return;
    }
    insertLibraryItemIntoProcurement(item);
}

function insertLibraryItemIntoDocument(item) {
    if (!item) {
        return;
    }

    addItem();
    const row = elements.itemsContainer.querySelector(".item-row:last-child");
    if (!row) {
        return;
    }

    const descriptionParts = [
        item.name,
        item.brand ? `Brand: ${item.brand}` : "",
        item.packSize || item.unitSize ? `Pack: ${item.packSize || item.unitSize}` : "",
        item.unit ? `Unit: ${item.unit}` : "",
        item.leadTime ? `Lead time: ${item.leadTime}` : "",
        item.supplier || item.vendor ? `Supplier: ${item.supplier || item.vendor}` : ""
    ].filter(Boolean);
    const unitPrice = Number.parseFloat(item.sellPrice ?? item.price) || 0;

    row.dataset.libraryItemId = item.id;
    row.dataset.libraryReferenceId = item.referenceId || "";
    row.dataset.priceDriver = "unit";
    row.dataset.itemImageDataUrl = item.itemImageDataUrl || item.imageDataUrl || "";
    row.querySelector(".item-description").value = descriptionParts.join("\n");
    row.querySelector(".item-quantity").value = "1";
    row.querySelector(".item-unit-price").value = unitPrice.toFixed(2);
    row.querySelector(".item-total-price").value = unitPrice.toFixed(2);
    row.querySelector(".item-internal-cost").value = String(Number.parseFloat(item.costPrice) || 0);
    updateItemPricing(row, { sourceField: "unit" });
    syncItemImageUI(row);
    autoResizeTextarea(row.querySelector(".item-description"));
    handleItemsChange({ target: row.querySelector(".item-unit-price"), type: "input" });
    setImportStatus(`Inserted "${item.name}" as a frozen document snapshot.`);
}

function insertSelectedLibraryItemIntoDocument() {
    const item = state.catalogItems.find(entry => entry.id === elements.documentLibrarySelect.value);
    if (!item) {
        window.alert("Choose a pricing library item first.");
        return;
    }
    insertLibraryItemIntoDocument(item);
}

function showProcSheetPicker(itemId, anchorElement) {
    document.getElementById("procSheetPicker")?.remove();

    const procSheets = state.documents
        .filter(doc => doc.type === "procurement")
        .sort((a, b) => (b.printedAt || b.date || "") > (a.printedAt || a.date || "") ? 1 : -1);

    const picker = document.createElement("div");
    picker.id = "procSheetPicker";
    picker.className = "proc-sheet-picker";
    picker.innerHTML = `
        <div class="proc-sheet-picker-head">
            <span>Send to Procurement Sheet</span>
            <button type="button" class="proc-sheet-picker-close" aria-label="Close">×</button>
        </div>
        <select class="proc-sheet-picker-select" id="procSheetPickerSelect">
            <option value="">+ New Procurement Sheet</option>
            ${procSheets.map(sheet => `<option value="${escapeHtml(String(sheet.id))}">${escapeHtml(sheet.refNumber || sheet.clientName || "Untitled sheet")}</option>`).join("")}
        </select>
        <button type="button" class="btn btn-primary proc-sheet-picker-submit" id="procSheetPickerSubmit">Add to Sheet</button>
    `;

    document.body.appendChild(picker);

    const rect = anchorElement.getBoundingClientRect();
    picker.style.top = `${Math.min(rect.bottom + 6, window.innerHeight - 160)}px`;
    picker.style.left = `${Math.max(8, Math.min(rect.left - 100, window.innerWidth - 260))}px`;

    picker.querySelector("#procSheetPickerSubmit").addEventListener("click", () => {
        const selectedSheetId = picker.querySelector("#procSheetPickerSelect").value || null;
        picker.remove();
        void confirmSendItemToProcurement(itemId, selectedSheetId);
    });

    picker.querySelector(".proc-sheet-picker-close").addEventListener("click", () => picker.remove());

    const closeOnOutside = e => {
        if (!picker.contains(e.target) && e.target !== anchorElement) {
            picker.remove();
            document.removeEventListener("click", closeOnOutside, true);
        }
    };
    setTimeout(() => document.addEventListener("click", closeOnOutside, true), 0);
}

async function confirmSendItemToProcurement(itemId, sheetId) {
    const row = elements.itemsContainer.querySelector(`[data-item-id="${itemId}"]`);
    if (!row) {
        return;
    }

    const description = row.querySelector(".item-description").value.trim();
    if (!description) {
        window.alert("Add a description before sending to a Procurement Sheet.");
        return;
    }

    const unitPrice = parseDecimalInput(row.querySelector(".item-unit-price").value) || 0;
    const quantity = Number.parseFloat(row.querySelector(".item-quantity").value) || 1;

    const procRow = createProcurementRowData({ description, unitPrice, quantity: String(quantity) });

    if (!sheetId) {
        openProcurementSheetModal(null, [procRow]);
        return;
    }

    try {
        const sheet = getDocumentById(sheetId);
        if (!sheet) {
            return;
        }
        const updatedSheet = {
            ...sheet,
            procurementItems: [...(sheet.procurementItems || []), procRow],
            printedAt: new Date().toISOString()
        };
        const nextDocuments = state.documents.map(doc => isSameDocumentId(doc.id, sheet.id) ? updatedSheet : doc);
        await saveDocumentsToServer(nextDocuments);
        renderDocuments();
        setImportStatus(`"${description.slice(0, 40)}" added to ${sheet.refNumber || "procurement sheet"}.`);
    } catch (error) {
        window.alert(error.message || "Unable to add item to procurement sheet.");
    }
}

function addProcurementRowToCurrentDocument(rowData) {
    if (!elements.documentModal?.classList.contains("active")) {
        window.alert("Open a quote or invoice first, then use this button to add the row to it.");
        return;
    }

    addItem();
    const itemRow = elements.itemsContainer.querySelector(".item-row:last-child");
    if (!itemRow) {
        return;
    }

    const descriptionParts = [
        rowData.description,
        rowData.brand ? `Brand: ${rowData.brand}` : "",
        rowData.packSize ? `Pack: ${rowData.packSize}` : "",
        rowData.leadTime ? `Lead time: ${rowData.leadTime}` : ""
    ].filter(Boolean);

    const qty = rowData.quantityTbd ? 1 : (Number.parseFloat(rowData.quantity) || 1);
    const unitPrice = Number.parseFloat(rowData.unitPrice) || 0;

    itemRow.querySelector(".item-description").value = descriptionParts.join("\n");
    itemRow.querySelector(".item-quantity").value = String(qty);
    itemRow.querySelector(".item-unit-price").value = unitPrice.toFixed(2);
    itemRow.dataset.priceDriver = "unit";
    updateItemPricing(itemRow, { sourceField: "unit" });
    autoResizeTextarea(itemRow.querySelector(".item-description"));
    handleItemsChange({ target: itemRow.querySelector(".item-unit-price"), type: "input" });
    setImportStatus(`Row added to the open document.`);
}

async function saveProcurementSheet(options = {}) {
    const sheet = buildProcurementSheetFromEditor();
    if (!sheet.refNumber || !sheet.date) {
        window.alert("Add a reference number and date before saving.");
        return null;
    }
    if (!sheet.procurementItems.length) {
        window.alert("Add at least one procurement row before saving.");
        return null;
    }

    const existingSheet = state.editingProcurementSheetId
        ? getDocumentById(state.editingProcurementSheetId)
        : null;
    appendDocumentChangeHistory(sheet, existingSheet, existingSheet ? null : ["Procurement sheet created"]);

    const nextDocuments = state.editingProcurementSheetId
        ? state.documents.map(doc => isSameDocumentId(doc.id, state.editingProcurementSheetId) ? sheet : doc)
        : [sheet, ...state.documents];
    await saveDocumentsToServer(nextDocuments);
    state.editingProcurementSheetId = sheet.id;
    renderDocuments();

    const procDocRef = { docId: sheet.id, docRefNumber: sheet.refNumber, docType: "procurement", date: sheet.date, clientName: sheet.clientName || "" };
    const procCatalogItems = sheet.procurementItems.map(row => ({
        name: row.description,
        brand: row.brand,
        packSize: row.packSize,
        unit: row.unit,
        unitPrice: Number.parseFloat(row.unitPrice) || 0,
        currency: row.currency || sheet.currency || "USD",
        leadTime: row.leadTime,
        supplier: row.supplier,
        notes: row.notes
    }));
    await upsertItemsIntoCatalog(procCatalogItems, procDocRef);

    setImportStatus(`Procurement sheet ${sheet.refNumber} saved and synced to Pricing Library.`);
    if (!options.keepOpen) {
        closeProcurementSheetModal();
    }
    return sheet;
}

function getOpenProcurementSheetSnapshot() {
    return buildProcurementSheetFromEditor();
}

function getProcurementFileStem(sheet) {
    const ref = String(sheet?.refNumber || createProcurementReference(sheet?.date || getLocalDateInputValue())).replace(/[^a-z0-9._-]+/gi, "-");
    return `${ref}_ProcurementSheet`;
}

function buildProcurementCsv(sheet) {
    const meta = [
        ["Procurement Sheet", sheet.refNumber || ""],
        ["Client", sheet.clientName || ""],
        ["Date", sheet.date || ""],
        ["Currency", sheet.currency || "USD"],
        ...(sheet.notes ? [["Notes", sheet.notes]] : []),
        []
    ];
    const headers = ["Line No.", "Item Description", "Brand", "Pack Size", "Unit", "Quantity", "Unit Price", "Currency", "Lead Time", "Supplier", "Notes"];
    const rows = (sheet.procurementItems || []).map(row => [
        row.lineNumber,
        row.description,
        row.brand,
        row.packSize,
        row.unit,
        row.quantityTbd ? "TBD" : (row.quantity || ""),
        Number(row.unitPrice || 0).toFixed(2),
        row.currency || sheet.currency || "USD",
        row.leadTime,
        row.supplier,
        row.notes
    ]);
    return [...meta, headers, ...rows].map(r => r.map(escapeCsvCell).join(",")).join("\n");
}

function exportOpenProcurementCsv() {
    const sheet = getOpenProcurementSheetSnapshot();
    downloadTextFile(`${getProcurementFileStem(sheet)}.csv`, `${buildProcurementCsv(sheet)}\n`, "text/csv;charset=utf-8");
    setImportStatus("Procurement CSV exported.");
}

function parseProcurementCsvText(text) {
    // Parse a CSV (our own export format or a plain table) into procurement rows.
    // Tolerates the metadata preamble by scanning for the header row.
    const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

    function splitCsvLine(line) {
        const cells = [];
        let inQuote = false;
        let cell = "";
        for (let i = 0; i < line.length; i++) {
            const ch = line[i];
            if (ch === '"') {
                if (inQuote && line[i + 1] === '"') { cell += '"'; i++; }
                else { inQuote = !inQuote; }
            } else if (ch === "," && !inQuote) {
                cells.push(cell.trim());
                cell = "";
            } else {
                cell += ch;
            }
        }
        cells.push(cell.trim());
        return cells;
    }

    // Find header row: first row where column 1 (index 1) matches "Item Description" or "description"
    let headerIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        const cells = splitCsvLine(lines[i]);
        const col1 = (cells[1] || "").toLowerCase().trim();
        if (col1 === "item description" || col1 === "description") {
            headerIdx = i;
            break;
        }
    }

    // Fall back: treat first non-blank line as header
    if (headerIdx === -1) {
        headerIdx = lines.findIndex(l => l.trim());
    }
    if (headerIdx === -1) return [];

    const headers = splitCsvLine(lines[headerIdx]).map(h => h.toLowerCase().trim());
    const col = key => {
        const aliases = {
            lineNumber: ["line no.", "#", "line", "line number"],
            description: ["item description", "description", "item"],
            brand: ["brand"],
            packSize: ["pack size", "packsize", "pack"],
            unit: ["unit"],
            quantity: ["quantity", "qty"],
            unitPrice: ["unit price", "unitprice", "price"],
            currency: ["currency"],
            leadTime: ["lead time", "leadtime"],
            supplier: ["supplier", "vendor"],
            notes: ["notes", "note"]
        };
        const list = aliases[key] || [key];
        const idx = headers.findIndex(h => list.includes(h));
        return idx;
    };

    const rows = [];
    for (let i = headerIdx + 1; i < lines.length; i++) {
        const cells = splitCsvLine(lines[i]);
        if (cells.every(c => !c)) continue;
        const description = (cells[col("description")] || "").trim();
        if (!description) continue;
        rows.push({
            description,
            brand: (cells[col("brand")] || "").trim(),
            packSize: (cells[col("packSize")] || "").trim(),
            unit: (cells[col("unit")] || "").trim(),
            quantity: (cells[col("quantity")] || "").trim(),
            quantityTbd: (cells[col("quantity")] || "").trim().toUpperCase() === "TBD",
            unitPrice: Number.parseFloat(cells[col("unitPrice")]) || 0,
            currency: (cells[col("currency")] || "").trim() || "USD",
            leadTime: (cells[col("leadTime")] || "").trim(),
            supplier: (cells[col("supplier")] || "").trim(),
            notes: (cells[col("notes")] || "").trim()
        });
    }
    return rows;
}

function toggleProcurementDropdown(dropdown) {
    if (!dropdown) return;
    const isOpen = dropdown.classList.contains("open");
    closeProcurementDropdowns();
    if (!isOpen) {
        dropdown.classList.add("open");
        const trigger = dropdown.querySelector(".proc-dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "true");
    }
}

function closeProcurementDropdowns(event) {
    document.querySelectorAll(".proc-dropdown.open").forEach(d => {
        if (event && d.classList.contains("proc-dropdown-persist") && d.contains(event.target)) return;
        d.classList.remove("open");
        const trigger = d.querySelector(".proc-dropdown-trigger");
        if (trigger) trigger.setAttribute("aria-expanded", "false");
    });
}

function finishProcurementImport(rows, skipped, sourceLabel) {
    if (!rows.length) {
        window.alert(`No items found in the ${sourceLabel}. Make sure the file has an 'Item Description' column.`);
        return;
    }
    rows.forEach(row => addProcurementRow(row));
    const parts = [`Imported ${rows.length} row${rows.length === 1 ? "" : "s"} from ${sourceLabel}`];
    if (skipped > 0) parts.push(`skipped ${skipped} empty row${skipped === 1 ? "" : "s"}`);
    setImportStatus(parts.join(", ") + ".");
}

function handleProcurementCsvImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";

    const reader = new FileReader();
    reader.onload = e => {
        const parsed = parseProcurementCsvText(e.target.result);
        finishProcurementImport(parsed, 0, "CSV");
    };
    reader.readAsText(file);
}

async function handleProcurementXlsxImport(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    event.target.value = "";

    try {
        const arrayBuffer = await file.arrayBuffer();
        const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
        const response = await fetch("/api/import-procurement-xlsx", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: base64 })
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
            window.alert(payload.error || "Unable to import the Excel file.");
            return;
        }
        finishProcurementImport(payload.rows || [], payload.skipped || 0, "Excel");
    } catch (error) {
        window.alert(error.message || "Unable to import the Excel file.");
    }
}

async function downloadProcurementExcel(sheet) {
    const response = await fetch("/api/procurement-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sheet })
    });
    if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.error || "Unable to generate the procurement Excel file.");
    }
    const blob = await response.blob();
    downloadBlobFile(`${getProcurementFileStem(sheet)}.xlsx`, blob);
}

async function exportOpenProcurementExcel() {
    try {
        await downloadProcurementExcel(getOpenProcurementSheetSnapshot());
        setImportStatus("Procurement Excel exported.");
    } catch (error) {
        window.alert(error.message || "Unable to export procurement Excel.");
    }
}

async function convertOpenProcurementToQuote() {
    try {
        const sheet = await saveProcurementSheet({ keepOpen: true });
        if (!sheet) return;
        const quote = convertProcurementSheetToQuote(sheet, sheet.procurementItems);
        await saveDocumentsToServer([quote, ...state.documents]);
        closeProcurementSheetModal();
        renderDocuments();
        editDocument(quote.id);
        setImportStatus(`Created quote ${quote.refNumber} from all rows in ${sheet.refNumber}.`);
    } catch (error) {
        window.alert(error.message || "Unable to convert procurement sheet to quote.");
    }
}

async function convertSelectedProcurementRowsToQuote() {
    const selectedRowEls = Array.from(
        elements.procurementRowsContainer?.querySelectorAll(".procurement-row-select:checked") || []
    ).map(cb => cb.closest(".procurement-row")).filter(Boolean);

    if (!selectedRowEls.length) {
        window.alert("Select at least one row first.");
        return;
    }

    try {
        const sheet = await saveProcurementSheet({ keepOpen: true });
        if (!sheet) return;

        // Collect the selected rows from the live DOM (post-save)
        const selectedRows = selectedRowEls.map(rowEl => {
            const getValue = field => rowEl.querySelector(`[data-procurement-field="${field}"]`)?.value || "";
            const quantityTbd = rowEl.querySelector('[data-procurement-field="quantityTbd"]')?.checked ?? false;
            return createProcurementRowData({
                id: rowEl.dataset.procurementRowId,
                description: getValue("description"),
                brand: getValue("brand"),
                packSize: getValue("packSize"),
                unit: getValue("unit"),
                unitPrice: getValue("unitPrice"),
                currency: getValue("currency"),
                leadTime: getValue("leadTime"),
                supplier: getValue("supplier"),
                quantity: getValue("quantity"),
                quantityTbd,
                notes: getValue("notes")
            });
        }).filter(r => r.description);

        if (!selectedRows.length) {
            window.alert("None of the selected rows have a description. Fill in at least one item description.");
            return;
        }

        const quote = convertProcurementSheetToQuote(sheet, selectedRows);
        await saveDocumentsToServer([quote, ...state.documents]);
        closeProcurementSheetModal();
        renderDocuments();
        editDocument(quote.id);
        setImportStatus(`Created quote ${quote.refNumber} from ${selectedRows.length} selected row${selectedRows.length === 1 ? "" : "s"}.`);
    } catch (error) {
        window.alert(error.message || "Unable to convert selected rows to quote.");
    }
}

function convertProcurementSheetToQuote(sheet, rows = null) {
    const date = getLocalDateInputValue();
    const refNumber = createProcurementReference(date);
    const sourceRows = Array.isArray(rows) ? rows : (sheet.procurementItems || []);
    const items = sourceRows.map(row => {
        const quantity = row.quantityTbd ? 1 : (Number.parseFloat(row.quantity) || 1);
        const unitPrice = Number.parseFloat(row.unitPrice) || 0;
        const descriptionParts = [
            row.description,
            row.brand ? `Brand: ${row.brand}` : "",
            row.packSize ? `Pack: ${row.packSize}` : "",
            row.leadTime ? `Lead time: ${row.leadTime}` : "",
            row.quantityTbd ? "Qty: TBD — confirm quantity before ordering" : ""
        ].filter(Boolean);
        return {
            description: descriptionParts.join("\n"),
            quantity,
            price: unitPrice,
            unitPrice,
            totalPrice: quantity * unitPrice,
            internalCost: 0,
            upchargePercent: 0,
            procurementSheetId: sheet.id,
            procurementRowId: row.id
        };
    });
    const total = items.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);
    return {
        id: `quote-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        type: "quote",
        status: "logged",
        refNumber,
        date,
        clientName: sheet.clientName || "Procurement Client",
        clientAddress: "",
        consigneeName: "",
        consigneeAddress: "",
        poNumber: sheet.refNumber || "",
        tags: parseTags(`procurement, ${sheet.refNumber || ""}, ${sheet.clientName || ""}`),
        notes: sheet.notes || "",
        internalNotes: rows && rows.length < (sheet.procurementItems || []).length
            ? `Converted from ${rows.length} selected row${rows.length === 1 ? "" : "s"} of procurement sheet ${sheet.refNumber || sheet.id}.`
            : `Converted from procurement sheet ${sheet.refNumber || sheet.id}.`,
        paymentTerms: DEFAULT_PAYMENT_TERMS,
        paymentTermsMode: "net30",
        paymentTermsDays: 30,
        includeSignature: true,
        includeStamp: false,
        payments: [],
        paymentStatus: null,
        printedAt: new Date().toISOString(),
        subtotal: total,
        total,
        sourceProcurementSheetId: sheet.id,
        items
    };
}

function syncItemActionMenus() {
    // No per-item action menus in table layout.
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

function handleGlobalShortcuts(event) {
    if ((event.metaKey || event.ctrlKey) && !event.shiftKey && event.key === "s") {
        if (elements.documentModal && !elements.documentModal.hidden) {
            event.preventDefault();
            saveDocumentOnly();
        }
    }
}

function handleGlobalClick(event) {
    const snapshotBtn = event.target.closest("[data-snapshot-action]");
    if (snapshotBtn) {
        void handleSnapshotAction(snapshotBtn);
        return;
    }

    const phistToggle = event.target.closest("[data-phist-toggle]");
    if (phistToggle) {
        const idx = phistToggle.dataset.phistToggle;
        const detail = document.getElementById(`phist-detail-${idx}`);
        if (detail) {
            const isOpen = !detail.hidden;
            detail.hidden = isOpen;
            phistToggle.setAttribute("aria-expanded", String(!isOpen));
            phistToggle.closest(".phist-row")?.classList.toggle("is-open", !isOpen);
        }
        return;
    }

    const phistAction = event.target.closest("[data-phist-action]");
    if (phistAction) {
        const action = phistAction.dataset.phistAction;
        if (action === "open-invoice") {
            const invoiceId = phistAction.dataset.invoiceId;
            if (invoiceId) {
                setActivePage("documents");
                editDocument(invoiceId);
            }
        } else if (action === "open-statement") {
            const statementId = phistAction.dataset.statementId;
            if (statementId) {
                setActivePage("reports");
                openStatementEditModal(statementId);
            }
        } else if (action === "delete-payment") {
            const invoiceId = phistAction.dataset.invoiceId;
            const paymentId = phistAction.dataset.paymentId;
            if (invoiceId && paymentId) {
                requestLoggedPaymentDelete(invoiceId, paymentId);
            }
        }
        return;
    }

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
    renderSnapshotsList();
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

function getActiveQuickPaymentInvoice() {
    return getDocumentById(state.activeQuickPaymentInvoiceId);
}

function renderQuickPaymentModal(invoice) {
    if (!invoice || !elements.quickPaymentSummary || !elements.quickPaymentHistory) {
        return;
    }

    const paidTotal = getInvoicePaymentsTotal(invoice);
    const balance = getInvoiceOutstandingBalance(invoice);
    const status = getPaymentStatusLabel(getInvoiceDerivedPaymentStatus(invoice));
    const payments = getInvoicePayments(invoice);

    elements.quickPaymentSummary.innerHTML = `
        <article class="quick-payment-summary-card">
            <strong>${escapeHtml(invoice.refNumber || "Invoice")}</strong>
            <div class="quick-payment-summary-meta">
                ${escapeHtml(invoice.clientName || "Unknown client")}<br>
                Status: ${escapeHtml(status)}<br>
                Total: ${escapeHtml(formatCurrency(invoice.total || 0))} | Paid: ${escapeHtml(formatCurrency(paidTotal))} | Balance: ${escapeHtml(formatCurrency(balance))}
            </div>
        </article>
    `;

    elements.quickPaymentHistory.innerHTML = payments.length
        ? `<article class="quick-payment-history-card">
            <div class="quick-payment-history-meta">Recent payments already applied to this invoice.</div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Method</th>
                        <th>Reference</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${payments.map(payment => `
                        <tr>
                            <td>${escapeHtml(formatDisplayDate(payment.date) || payment.date || "—")}</td>
                            <td>${escapeHtml(payment.method || "—")}</td>
                            <td>${escapeHtml(payment.reference || "—")}</td>
                            <td>${escapeHtml(formatCurrency(payment.amount || 0))}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </article>`
        : `<article class="quick-payment-history-card"><div class="quick-payment-history-meta">No payments have been recorded on this invoice yet.</div></article>`;
}

function openQuickPaymentModal(invoiceId) {
    const invoice = getDocumentById(invoiceId);
    if (!invoice || invoice.type !== "invoice") {
        return;
    }

    state.activeQuickPaymentInvoiceId = String(invoice.id);
    state.openDocumentMenuId = null;
    syncDocumentActionMenus();
    renderQuickPaymentModal(invoice);
    elements.quickPaymentDateInput.value = getLocalDateInputValue();
    elements.quickPaymentAmountInput.value = getInvoiceOutstandingBalance(invoice) > 0
        ? Number(getInvoiceOutstandingBalance(invoice)).toFixed(2)
        : "";
    elements.quickPaymentMethodInput.value = "";
    elements.quickPaymentReferenceInput.value = "";
    elements.quickPaymentNotesInput.value = "";
    setModalState(elements.quickPaymentModal, true);
}

function closeQuickPaymentModal() {
    state.activeQuickPaymentInvoiceId = null;
    state.activeQuickPaymentStatementId = null;
    if (elements.quickPaymentInvoicePicker) elements.quickPaymentInvoicePicker.hidden = true;
    setModalState(elements.quickPaymentModal, false);
}

// ─── Notes Drawer ────────────────────────────────────────────

function getStatementExportById(id) {
    return state.statementExports.find(entry => String(entry.id) === String(id));
}

function getNotesTarget(targetType, targetId) {
    if (targetType === "statement") {
        return getStatementExportById(targetId);
    }
    return getDocumentById(targetId);
}

function getActiveNotesTarget() {
    if (!state.activeNotesTargetType || !state.activeNotesTargetId) {
        return null;
    }
    return getNotesTarget(state.activeNotesTargetType, state.activeNotesTargetId);
}

function getNotesTargetReference(target, targetType) {
    if (!target) {
        return "";
    }
    if (targetType === "statement") {
        return target.referenceNumber || target.title || "Statement";
    }
    return target.refNumber || "";
}

function getNotesTargetClientName(target, targetType) {
    if (!target) {
        return "";
    }
    if (targetType === "statement") {
        return target.clientName || target.payload?.clientName || t("unknown_client");
    }
    return target.clientName || t("unknown_client");
}

function getNotesTargetTypeLabel(target, targetType) {
    if (targetType === "statement") {
        return "Statement";
    }
    return target?.type === "invoice" ? "Invoice" : "Quote";
}

function openNotesDrawer(targetId, targetType = "document") {
    const target = getNotesTarget(targetType, targetId);
    if (!target) return;
    state.activeNotesTargetType = targetType;
    state.activeNotesTargetId = String(targetId);
    state.activeNotesDocId = targetType === "document" ? String(targetId) : null;
    state.openDocumentMenuId = null;
    syncDocumentActionMenus();
    if (elements.notesDrawerRef) {
        const refLabel = getNotesTargetReference(target, targetType);
        const typeLabel = getNotesTargetTypeLabel(target, targetType);
        const clientLabel = getNotesTargetClientName(target, targetType);
        elements.notesDrawerRef.textContent = `${typeLabel}${refLabel ? ` · ${refLabel}` : ""}${clientLabel ? ` · ${clientLabel}` : ""}`;
    }
    if (elements.notesDrawerInput) elements.notesDrawerInput.value = "";
    state.notesDrawerTab = "notes";
    syncNotesDrawerTabs();
    renderNotesFeed(target, targetType);
    elements.notesDrawer.removeAttribute("hidden");
    elements.notesDrawerOverlay.removeAttribute("hidden");
    elements.notesDrawer.setAttribute("aria-hidden", "false");
    elements.notesDrawerOverlay.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => {
        elements.notesDrawer.classList.add("active");
        elements.notesDrawerOverlay.classList.add("active");
        elements.notesDrawerInput?.focus();
    });
}

function syncNotesDrawerTabs() {
    elements.notesDrawerTabs?.querySelectorAll("[data-notes-tab]").forEach(btn => {
        btn.classList.toggle("is-active", btn.dataset.notesTab === state.notesDrawerTab);
    });
    if (elements.notesDrawerCompose) {
        elements.notesDrawerCompose.hidden = state.notesDrawerTab !== "notes";
    }
}

function switchNotesDrawerTab(tab) {
    state.notesDrawerTab = tab || "notes";
    syncNotesDrawerTabs();
    const target = getNotesTarget(state.activeNotesTargetType, state.activeNotesTargetId);
    if (state.notesDrawerTab === "history") {
        renderHistoryFeed(target);
    } else {
        renderNotesFeed(target, state.activeNotesTargetType);
    }
}

function renderHistoryFeed(target) {
    if (!elements.notesDrawerFeed) return;
    const history = Array.isArray(target?.changeHistory) ? target.changeHistory : [];
    if (!history.length) {
        elements.notesDrawerFeed.innerHTML = `<p class="notes-empty">No change history yet. History is recorded each time this document is saved.</p>`;
        return;
    }
    elements.notesDrawerFeed.innerHTML = [...history].reverse().map(entry => {
        const timeLabel = formatNoteTimestamp(entry.timestamp);
        const changesHtml = (entry.changes || []).map(c => `<li>${escapeHtml(c)}</li>`).join("");
        return `<div class="note-item note-item--system">
            <div class="note-item-header">
                <span class="note-item-system-badge">System</span>
                <span class="note-item-author">${escapeHtml(entry.user || "System")}</span>
                <span class="note-item-time">${escapeHtml(timeLabel)}</span>
            </div>
            <ul class="note-item-history-list">${changesHtml}</ul>
        </div>`;
    }).join("");
    elements.notesDrawerFeed.scrollTop = 0;
}

function closeNotesDrawer() {
    state.activeNotesDocId = null;
    state.activeNotesTargetType = null;
    state.activeNotesTargetId = null;
    elements.notesDrawer?.classList.remove("active");
    elements.notesDrawerOverlay?.classList.remove("active");
    elements.notesDrawer?.setAttribute("aria-hidden", "true");
    elements.notesDrawerOverlay?.setAttribute("aria-hidden", "true");
    setTimeout(() => {
        if (!elements.notesDrawer?.classList.contains("active")) {
            elements.notesDrawer?.setAttribute("hidden", "");
            elements.notesDrawerOverlay?.setAttribute("hidden", "");
        }
    }, 240);
}

function renderNotesFeed(target, targetType = "document") {
    if (!elements.notesDrawerFeed) return;
    const notes = Array.isArray(target?.noteLog) ? target.noteLog : [];
    if (notes.length === 0) {
        elements.notesDrawerFeed.innerHTML = `<p class="notes-empty">No notes yet. Add one below.</p>`;
        return;
    }
    const currentUserId = state.currentUser?.userId;
    elements.notesDrawerFeed.innerHTML = notes.map(note => {
        const canEdit = note.userId === currentUserId;
        const timeLabel = note.editedAt
            ? `${formatNoteTimestamp(note.createdAt)} (edited)`
            : formatNoteTimestamp(note.createdAt);
        return `
            <div class="note-item" data-note-id="${escapeHtml(String(note.id))}">
                <div class="note-item-header">
                    <span class="note-item-author">${escapeHtml(note.author || "Unknown")}</span>
                    <span class="note-item-time">${escapeHtml(timeLabel)}</span>
                </div>
                <div class="note-item-text">${escapeHtml(note.text)}</div>
                ${canEdit ? `
                <div class="note-item-actions">
                    <button type="button" class="note-action-btn" data-note-action="edit" data-note-id="${escapeHtml(String(note.id))}" title="Edit note" aria-label="Edit note">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4.2-1 9.1-9.1a1.9 1.9 0 0 0 0-2.7l-.5-.5a1.9 1.9 0 0 0-2.7 0L5 15.8 4 20Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="m13.5 7.5 3 3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
                    </button>
                    <button type="button" class="note-action-btn is-danger" data-note-action="delete" data-note-id="${escapeHtml(String(note.id))}" title="Delete note" aria-label="Delete note">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </button>
                </div>` : ""}
            </div>
        `;
    }).join("");
    elements.notesDrawerFeed.scrollTop = elements.notesDrawerFeed.scrollHeight;
}

function formatNoteTimestamp(isoString) {
    if (!isoString) return "";
    try {
        return new Date(isoString).toLocaleString(undefined, {
            month: "short", day: "numeric", year: "numeric",
            hour: "numeric", minute: "2-digit"
        });
    } catch {
        return isoString;
    }
}

function handleNotesFeedClick(event) {
    const btn = event.target.closest("[data-note-action]");
    if (!btn) return;
    event.stopPropagation();
    const noteId = btn.dataset.noteId;
    const noteAction = btn.dataset.noteAction;
    if (noteAction === "edit") startEditNote(noteId);
    else if (noteAction === "delete") deleteNote(noteId);
    else if (noteAction === "save-edit") saveEditNote(noteId);
    else if (noteAction === "cancel-edit") cancelEditNote(noteId);
}

async function submitNote() {
    const targetType = state.activeNotesTargetType;
    const targetId = state.activeNotesTargetId;
    const text = elements.notesDrawerInput?.value.trim();
    if (!targetType || !targetId || !text) return;
    const target = getNotesTarget(targetType, targetId);
    if (!target) return;
    const note = {
        id: String(Date.now()),
        text,
        author: state.currentUser?.displayName || state.currentUser?.username || "Unknown",
        userId: state.currentUser?.userId || "",
        createdAt: new Date().toISOString(),
        editedAt: null
    };
    const updatedTarget = { ...target, noteLog: [...(Array.isArray(target.noteLog) ? target.noteLog : []), note] };
    await saveNoteLogUpdate(updatedTarget, targetType);
    if (elements.notesDrawerInput) elements.notesDrawerInput.value = "";
    renderNotesFeed(getNotesTarget(targetType, targetId) || updatedTarget, targetType);
    renderDocuments();
    renderStatementsPage();
    renderNotesPage();
}

async function deleteNote(noteId) {
    const targetType = state.activeNotesTargetType;
    const targetId = state.activeNotesTargetId;
    if (!targetType || !targetId) return;
    const target = getNotesTarget(targetType, targetId);
    if (!target) return;
    if (!window.confirm("Delete this note?")) return;
    const updatedTarget = { ...target, noteLog: (target.noteLog || []).filter(n => String(n.id) !== String(noteId)) };
    await saveNoteLogUpdate(updatedTarget, targetType);
    renderNotesFeed(getNotesTarget(targetType, targetId) || updatedTarget, targetType);
    renderDocuments();
    renderStatementsPage();
    renderNotesPage();
}

function startEditNote(noteId) {
    const targetType = state.activeNotesTargetType;
    const targetId = state.activeNotesTargetId;
    if (!targetType || !targetId) return;
    const target = getNotesTarget(targetType, targetId);
    if (!target) return;
    const note = (target.noteLog || []).find(n => String(n.id) === String(noteId));
    if (!note) return;
    const noteEl = elements.notesDrawerFeed?.querySelector(`[data-note-id="${CSS.escape(String(noteId))}"]`);
    if (!noteEl) return;
    const textEl = noteEl.querySelector(".note-item-text");
    if (!textEl) return;
    textEl.innerHTML = `
        <textarea class="note-edit-textarea" rows="3">${escapeHtml(note.text)}</textarea>
        <div class="note-edit-actions">
            <button type="button" class="btn btn-sm" data-note-action="cancel-edit" data-note-id="${escapeHtml(String(noteId))}">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" data-note-action="save-edit" data-note-id="${escapeHtml(String(noteId))}">Save</button>
        </div>
    `;
    const actionsEl = noteEl.querySelector(".note-item-actions");
    if (actionsEl) actionsEl.hidden = true;
    textEl.querySelector("textarea")?.focus();
}

async function saveEditNote(noteId) {
    const targetType = state.activeNotesTargetType;
    const targetId = state.activeNotesTargetId;
    if (!targetType || !targetId) return;
    const target = getNotesTarget(targetType, targetId);
    if (!target) return;
    const noteEl = elements.notesDrawerFeed?.querySelector(`[data-note-id="${CSS.escape(String(noteId))}"]`);
    const newText = noteEl?.querySelector(".note-edit-textarea")?.value.trim();
    if (!newText) return;
    const updatedTarget = {
        ...target,
        noteLog: (target.noteLog || []).map(n =>
            String(n.id) === String(noteId) ? { ...n, text: newText, editedAt: new Date().toISOString() } : n
        )
    };
    await saveNoteLogUpdate(updatedTarget, targetType);
    renderNotesFeed(getNotesTarget(targetType, targetId) || updatedTarget, targetType);
    renderDocuments();
    renderStatementsPage();
    renderNotesPage();
}

function cancelEditNote(noteId) {
    const target = getActiveNotesTarget();
    if (target) {
        renderNotesFeed(target, state.activeNotesTargetType);
    }
}

async function saveNoteLogUpdate(updatedTarget, targetType = "document") {
    if (targetType === "statement") {
        const nextStatements = state.statementExports.map(entry =>
            String(entry.id) === String(updatedTarget.id) ? { ...updatedTarget, noteLog: normalizeNoteLog(updatedTarget.noteLog) } : entry
        );
        await saveStatementExportsState(nextStatements);
        return;
    }

    const idx = state.documents.findIndex(d => String(d.id) === String(updatedTarget.id));
    if (idx === -1) return;
    const nextDocuments = state.documents.map((d, i) =>
        i === idx ? { ...updatedTarget, noteLog: normalizeNoteLog(updatedTarget.noteLog) } : d
    );
    await saveDocumentsToServer(nextDocuments);
}

function getAllSystemNotes() {
    const documentNotes = state.documents.flatMap(doc =>
        normalizeNoteLog(doc.noteLog).map(note => ({
            ...note,
            targetType: "document",
            documentType: doc.type === "invoice" ? "invoice" : "quote",
            targetId: String(doc.id),
            documentReference: doc.refNumber || "Reference pending",
            clientName: doc.clientName || t("unknown_client"),
            sortDate: note.editedAt || note.createdAt
        }))
    );

    const statementNotes = state.statementExports.flatMap(statement =>
        normalizeNoteLog(statement.noteLog).map(note => ({
            ...note,
            targetType: "statement",
            documentType: "statement",
            targetId: String(statement.id),
            documentReference: statement.referenceNumber || statement.title || "Statement",
            clientName: statement.clientName || t("unknown_client"),
            sortDate: note.editedAt || note.createdAt
        }))
    );

    return [...documentNotes, ...statementNotes].sort((left, right) => {
        const rightTime = Date.parse(right.sortDate || right.createdAt || "") || 0;
        const leftTime = Date.parse(left.sortDate || left.createdAt || "") || 0;
        return rightTime - leftTime;
    });
}

function getAllNoteRecords() {
    const documentRecords = state.documents
        .filter(doc => normalizeNoteLog(doc.noteLog).length > 0)
        .map(doc => {
            const notes = normalizeNoteLog(doc.noteLog);
            const latestNote = notes[notes.length - 1];
            return {
                targetType: "document",
                targetId: String(doc.id),
                documentType: doc.type === "invoice" ? "invoice" : "quote",
                documentReference: doc.refNumber || "Reference pending",
                clientName: doc.clientName || t("unknown_client"),
                noteCount: notes.length,
                latestNote,
                sortDate: latestNote?.editedAt || latestNote?.createdAt || "",
                allNotesText: notes.map(note => String(note.text || "")).join(" "),
                target: doc
            };
        });

    const statementRecords = state.statementExports
        .filter(statement => normalizeNoteLog(statement.noteLog).length > 0)
        .map(statement => {
            const notes = normalizeNoteLog(statement.noteLog);
            const latestNote = notes[notes.length - 1];
            return {
                targetType: "statement",
                targetId: String(statement.id),
                documentType: "statement",
                documentReference: statement.referenceNumber || statement.title || "Statement",
                clientName: statement.clientName || t("unknown_client"),
                noteCount: notes.length,
                latestNote,
                sortDate: latestNote?.editedAt || latestNote?.createdAt || "",
                allNotesText: notes.map(note => String(note.text || "")).join(" "),
                target: statement
            };
        });

    return [...documentRecords, ...statementRecords].sort((left, right) => {
        const rightTime = Date.parse(right.sortDate || "") || 0;
        const leftTime = Date.parse(left.sortDate || "") || 0;
        return rightTime - leftTime;
    });
}

function getFilteredNoteRecords() {
    const query = state.notesSearchQuery.trim().toLowerCase();
    return getAllNoteRecords().filter(note => {
        const matchesType = state.notesFilter === "all" || note.documentType === state.notesFilter;
        const matchesClient = state.notesClientFilter === "all" || String(note.clientName || "") === state.notesClientFilter;
        const haystack = [
            note.allNotesText,
            note.clientName,
            note.documentReference
        ].join(" ").toLowerCase();
        const matchesSearch = !query || haystack.includes(query);
        return matchesType && matchesClient && matchesSearch;
    });
}

function syncNotesFilterButtons() {
    elements.notesFilterButtons?.forEach(button => {
        const isActive = button.dataset.notesFilter === state.notesFilter;
        button.classList.toggle("active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
}

function renderNotesClientOptions() {
    if (!elements.notesClientFilter) {
        return;
    }

    const clients = Array.from(new Set(getAllNoteRecords().map(note => String(note.clientName || "").trim()).filter(Boolean)))
        .sort((left, right) => left.localeCompare(right, getCurrentLocale(), { sensitivity: "base" }));
    const currentValue = state.notesClientFilter;
    elements.notesClientFilter.innerHTML = `<option value="all">All clients</option>${clients.map(client => `<option value="${escapeHtml(client)}">${escapeHtml(client)}</option>`).join("")}`;
    elements.notesClientFilter.value = clients.includes(currentValue) ? currentValue : "all";
    state.notesClientFilter = elements.notesClientFilter.value;
}

function openNoteLinkedRecord(note) {
    if (!note) {
        return;
    }

    if (note.targetType === "statement") {
        setActivePage("reports");
        openStatementEditModal(note.targetId);
        return;
    }

    setActivePage("documents");
    editDocument(note.targetId);
}

function getNoteRecordByTarget(targetId, targetType = "document") {
    return getAllNoteRecords().find(record =>
        record.targetType === targetType && String(record.targetId) === String(targetId)
    ) || null;
}

function getClientByName(clientName) {
    const normalized = String(clientName || "").trim().toLowerCase();
    return state.clients.find(client => String(client.name || "").trim().toLowerCase() === normalized) || null;
}

function revealClientProfile(clientName) {
    const client = getClientByName(clientName);
    if (!client) {
        return false;
    }

    setActivePage("clients");
    const card = elements.clientManagementList?.querySelector(`[data-client-id="${CSS.escape(String(client.id))}"]`);
    const header = card?.querySelector("[data-toggle-client]");
    const body = card?.querySelector(".client-row-body");
    if (card && header && body) {
        card.classList.add("is-expanded");
        header.setAttribute("aria-expanded", "true");
        body.hidden = false;
        card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return true;
}

function closeNotesRecordModal() {
    state.activeNotesRecordTargetType = null;
    state.activeNotesRecordTargetId = null;
    setModalState(elements.notesRecordModal, false);
}

function buildNotesRecordSummaryCards(record) {
    const target = record?.target;
    if (!target) {
        return [];
    }

    const cards = [
        { label: "Reference", value: record.documentReference, action: "open-record" },
        { label: "Client", value: record.clientName || t("unknown_client"), action: "open-client" },
        { label: "Type", value: record.documentType === "statement" ? "Statement" : record.documentType === "invoice" ? "Invoice" : "Quote", action: "open-type" }
    ];

    if (record.targetType === "statement") {
        cards.push(
            { label: "Outstanding", value: formatCurrency(getStatementLiveOutstanding(target)), action: "open-record" },
            { label: "Rows", value: String(target.rowCount || target.payload?.rows?.length || 0), action: "open-record" },
            { label: "Notes", value: String(record.noteCount), action: "manage-notes" }
        );
        return cards;
    }

    cards.push(
        { label: "Total", value: formatCurrency(target.total || 0), action: "open-record" },
        {
            label: target.type === "invoice" ? "Status" : "Date",
            value: target.type === "invoice" ? getPaymentStatusLabel(getInvoiceDerivedPaymentStatus(target)) : formatDisplayDate(target.date || ""),
            action: "open-record"
        },
        { label: "Notes", value: String(record.noteCount), action: "manage-notes" }
    );
    return cards;
}

function renderNotesRecordModal(record) {
    if (!record || !elements.notesRecordSummaryGrid || !elements.notesRecordNotesList) {
        return;
    }

    const target = record.target;
    const notes = normalizeNoteLog(target?.noteLog);
    const typeLabel = record.documentType === "statement" ? "Statement" : record.documentType === "invoice" ? "Invoice" : "Quote";
    const client = getClientByName(record.clientName);

    elements.notesRecordModalTitle.textContent = `${typeLabel} Summary`;
    elements.notesRecordModalCopy.textContent = "Review the linked record, jump to the client profile, and scan every internal note without leaving the Notes page.";
    elements.notesRecordModalType.textContent = typeLabel;
    elements.notesRecordModalReference.textContent = record.documentReference;
    elements.notesRecordModalClient.textContent = record.clientName || t("unknown_client");
    elements.notesRecordOpenClientBtn.disabled = !client;
    elements.notesRecordSummaryGrid.innerHTML = buildNotesRecordSummaryCards(record).map(card => `
        <button class="notes-record-summary-card" type="button" data-notes-record-action="${escapeHtml(card.action)}">
            <span>${escapeHtml(card.label)}</span>
            <strong>${escapeHtml(card.value || "—")}</strong>
        </button>
    `).join("");
    elements.notesRecordNotesCount.textContent = `${notes.length} note${notes.length === 1 ? "" : "s"}`;
    elements.notesRecordNotesList.innerHTML = notes.length
        ? notes.slice().reverse().map(note => `
            <article class="notes-record-note-item">
                <div class="notes-record-note-head">
                    <strong>${escapeHtml(note.author || "Unknown")}</strong>
                    <span>${escapeHtml(note.editedAt ? `${formatNoteTimestamp(note.createdAt)} · edited` : formatNoteTimestamp(note.createdAt))}</span>
                </div>
                <p>${escapeHtml(note.text)}</p>
            </article>
        `).join("")
        : `<div class="empty-state compact-empty-state"><p>No notes yet for this record.</p></div>`;
}

function openNotesRecordModal(entry) {
    const record = getNoteRecordByTarget(entry?.targetId, entry?.targetType || "document");
    if (!record) {
        return;
    }

    state.activeNotesRecordTargetType = record.targetType;
    state.activeNotesRecordTargetId = String(record.targetId);
    renderNotesRecordModal(record);
    setModalState(elements.notesRecordModal, true);
}

function handleNotesRecordModalAction(action) {
    const record = getNoteRecordByTarget(state.activeNotesRecordTargetId, state.activeNotesRecordTargetType || "document");
    if (!record) {
        return;
    }

    if (action === "open-client") {
        if (revealClientProfile(record.clientName)) {
            closeNotesRecordModal();
        }
        return;
    }

    if (action === "manage-notes") {
        closeNotesRecordModal();
        openNotesDrawer(record.targetId, record.targetType);
        return;
    }

    if (action === "open-type") {
        closeNotesRecordModal();
        if (record.targetType === "statement") {
            setActivePage("reports");
        } else {
            openDocumentsPageWithFilter(record.documentType);
        }
        return;
    }

    closeNotesRecordModal();
    openNoteLinkedRecord({
        targetId: record.targetId,
        targetType: record.targetType
    });
}

function renderNotesPage() {
    if (!elements.notesFeed || !elements.notesPageSummary) {
        return;
    }

    renderNotesClientOptions();
    syncNotesFilterButtons();
    const records = getFilteredNoteRecords();
    elements.notesPageSummary.innerHTML = `
        <article class="invoice-report-summary-card">
            <span>Visible Records</span>
            <strong>${escapeHtml(String(records.length))}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>Invoices</span>
            <strong>${escapeHtml(String(records.filter(note => note.documentType === "invoice").length))}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>Quotes</span>
            <strong>${escapeHtml(String(records.filter(note => note.documentType === "quote").length))}</strong>
        </article>
        <article class="invoice-report-summary-card">
            <span>Statements</span>
            <strong>${escapeHtml(String(records.filter(note => note.documentType === "statement").length))}</strong>
        </article>
    `;

    if (!records.length) {
        elements.notesFeed.innerHTML = `<div class="empty-state compact-empty-state"><p>No notes match the current filters.</p></div>`;
        return;
    }

    elements.notesFeed.innerHTML = records.map(record => {
        const previewSource = record.latestNote?.text || "";
        const preview = previewSource.length > 180 ? `${previewSource.slice(0, 180)}…` : previewSource;
        const typeLabel = record.documentType === "statement" ? "Statement" : record.documentType === "invoice" ? "Invoice" : "Quote";
        return `
            <article class="notes-feed-item" data-open-note-target="${escapeHtml(record.targetId)}" data-open-note-target-type="${escapeHtml(record.targetType)}" tabindex="0" role="button" aria-label="${escapeHtml(`Open ${typeLabel} summary for ${record.documentReference}`)}">
                <div class="notes-feed-item-main">
                    <div class="notes-feed-item-head">
                        <div class="notes-feed-item-meta">
                            <span class="notes-feed-item-type is-${escapeHtml(record.documentType)}">${escapeHtml(typeLabel)}</span>
                            <strong>${escapeHtml(record.documentReference)}</strong>
                            <span>${escapeHtml(record.clientName || t("unknown_client"))}</span>
                            <span class="notes-feed-item-count">${escapeHtml(String(record.noteCount))} note${record.noteCount === 1 ? "" : "s"}</span>
                        </div>
                        <span class="notes-feed-item-time">${escapeHtml(formatNoteTimestamp(record.latestNote?.createdAt || record.sortDate))}</span>
                    </div>
                    <p class="notes-feed-item-text">${escapeHtml(preview)}</p>
                    <div class="notes-feed-item-foot">
                        <span>${escapeHtml(record.latestNote?.author || "Unknown")}</span>
                        <span>Latest note</span>
                    </div>
                </div>
                <button class="btn btn-secondary notes-feed-open-btn" type="button" data-open-note-target="${escapeHtml(record.targetId)}" data-open-note-target-type="${escapeHtml(record.targetType)}">View Summary</button>
            </article>
        `;
    }).join("");
}

function openLogPaymentModal() {
    if (!elements.quickPaymentInvoicePicker || !elements.quickPaymentInvoiceSelect) return;

    const invoices = state.documents
        .filter(doc => doc.type === "invoice" && getInvoiceOutstandingBalance(doc) > 0)
        .sort((a, b) => String(a.clientName || "").localeCompare(String(b.clientName || "")));

    const statements = state.statementExports.filter(stmt => {
        const totals = window.StatementOfAccount.calculateStatementTotals(stmt.payload);
        return totals.grandTotal > 0;
    }).sort((a, b) => String(a.clientName || "").localeCompare(String(b.clientName || "")));

    const invoiceOptions = invoices.map(inv => {
        const label = `${escapeHtml(inv.clientName || "Unknown")} — ${escapeHtml(inv.refNumber || inv.id)} (${escapeHtml(formatCurrency(getInvoiceOutstandingBalance(inv)))} due)`;
        return `<option value="inv:${escapeHtml(String(inv.id))}">${label}</option>`;
    }).join("");

    const statementOptions = statements.map(stmt => {
        const totals = window.StatementOfAccount.calculateStatementTotals(stmt.payload);
        const label = `${escapeHtml(stmt.clientName || "Unknown")} — ${escapeHtml(stmt.referenceNumber || stmt.id)} (${escapeHtml(formatCurrency(totals.grandTotal))} outstanding)`;
        return `<option value="stmt:${escapeHtml(String(stmt.id))}">${label}</option>`;
    }).join("");

    elements.quickPaymentInvoiceSelect.innerHTML =
        `<option value="">— Select invoice or statement —</option>` +
        (invoiceOptions ? `<optgroup label="Invoices">${invoiceOptions}</optgroup>` : "") +
        (statementOptions ? `<optgroup label="Statements">${statementOptions}</optgroup>` : "");

    elements.quickPaymentInvoicePicker.hidden = false;
    if (elements.quickPaymentSummary) elements.quickPaymentSummary.innerHTML = "";
    if (elements.quickPaymentHistory) elements.quickPaymentHistory.innerHTML = "";
    elements.quickPaymentDateInput.value = getLocalDateInputValue();
    elements.quickPaymentAmountInput.value = "";
    elements.quickPaymentMethodInput.value = "";
    elements.quickPaymentReferenceInput.value = "";
    elements.quickPaymentNotesInput.value = "";
    state.activeQuickPaymentInvoiceId = null;
    state.activeQuickPaymentStatementId = null;
    setModalState(elements.quickPaymentModal, true);
}

function handleLogPaymentInvoiceChange() {
    const val = elements.quickPaymentInvoiceSelect?.value;
    if (!val) return;

    if (val.startsWith("inv:")) {
        const invoiceId = val.slice(4);
        const invoice = getDocumentById(invoiceId);
        if (!invoice) return;
        state.activeQuickPaymentInvoiceId = String(invoice.id);
        state.activeQuickPaymentStatementId = null;
        renderQuickPaymentModal(invoice);
        elements.quickPaymentAmountInput.value = getInvoiceOutstandingBalance(invoice) > 0
            ? Number(getInvoiceOutstandingBalance(invoice)).toFixed(2)
            : "";
    } else if (val.startsWith("stmt:")) {
        const statementId = val.slice(5);
        const stmt = state.statementExports.find(s => String(s.id) === statementId);
        if (!stmt) return;
        state.activeQuickPaymentStatementId = String(stmt.id);
        state.activeQuickPaymentInvoiceId = null;
        const totals = window.StatementOfAccount.calculateStatementTotals(stmt.payload);
        if (elements.quickPaymentSummary) {
            elements.quickPaymentSummary.innerHTML = `
                <div class="quick-payment-stat"><span>Statement</span><strong>${escapeHtml(stmt.referenceNumber || "—")}</strong></div>
                <div class="quick-payment-stat"><span>Client</span><strong>${escapeHtml(stmt.clientName || "—")}</strong></div>
                <div class="quick-payment-stat"><span>Outstanding</span><strong>${escapeHtml(formatCurrency(totals.grandTotal))}</strong></div>
            `;
        }
        if (elements.quickPaymentHistory) elements.quickPaymentHistory.innerHTML = "";
        elements.quickPaymentAmountInput.value = totals.grandTotal > 0
            ? Number(totals.grandTotal).toFixed(2)
            : "";
    }
}

async function saveQuickPaymentEntry() {
    const amount = Number.parseFloat(elements.quickPaymentAmountInput.value || "0") || 0;
    if (amount <= 0) {
        window.alert("Enter a payment amount greater than zero.");
        return;
    }

    const paymentBase = {
        id: `payment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        date: elements.quickPaymentDateInput.value || getLocalDateInputValue(),
        amount,
        method: elements.quickPaymentMethodInput.value.trim(),
        reference: elements.quickPaymentReferenceInput.value.trim(),
        notes: elements.quickPaymentNotesInput.value.trim(),
        appliedTo: "invoice",
        createdAt: new Date().toISOString()
    };

    // Statement payment: distribute across matched invoices proportionally
    if (state.activeQuickPaymentStatementId) {
        const stmt = state.statementExports.find(s => String(s.id) === state.activeQuickPaymentStatementId);
        if (!stmt) { window.alert("Statement not found."); return; }
        const stmtInvoiceNumbers = new Set(
            (stmt.payload?.rows || []).map(r => String(r.invoiceNumber || "").trim().toLowerCase()).filter(Boolean)
        );
        const matchedInvoices = state.documents.filter(
            doc => doc.type === "invoice" && stmtInvoiceNumbers.has(String(doc.refNumber || "").trim().toLowerCase())
        );
        if (!matchedInvoices.length) { window.alert("No matching invoices found for this statement."); return; }
        const totalValue = matchedInvoices.reduce((sum, doc) => sum + Number(doc.total || 0), 0);
        let nextDocuments = [...state.documents];
        for (const inv of matchedInvoices) {
            const portion = totalValue > 0
                ? (Number(inv.total || 0) / totalValue) * amount
                : amount / matchedInvoices.length;
            const pmt = { ...paymentBase, id: `${paymentBase.id}-${inv.id}`, amount: Math.round(portion * 100) / 100, reference: paymentBase.reference || stmt.referenceNumber || "" };
            nextDocuments = nextDocuments.map(doc =>
                doc.id === inv.id
                    ? { ...doc, payments: normalizeInvoicePayments([...(doc.payments || []), pmt]) }
                    : doc
            );
        }
        try {
            await saveDocumentsToServer(nextDocuments);
            renderDocuments();
            renderStatementsPage();
            setImportStatus(`Payment of ${formatCurrency(amount)} applied to statement ${stmt.referenceNumber || ""}.`);
            closeQuickPaymentModal();
        } catch (error) {
            window.alert(`Unable to save the payment.\n\n${error.message}`);
        }
        return;
    }

    const invoice = getActiveQuickPaymentInvoice();
    if (!invoice) {
        window.alert("Select an invoice or statement first.");
        return;
    }

    const nextDocuments = state.documents.map(entry => (
        isSameDocumentId(entry.id, invoice.id)
            ? { ...entry, payments: normalizeInvoicePayments([...(Array.isArray(entry.payments) ? entry.payments : []), paymentBase]) }
            : entry
    ));

    try {
        await saveDocumentsToServer(nextDocuments);
        renderDocuments();
        if (!elements.invoiceReportsModal.hidden) {
            renderInvoiceReport();
        }
        renderStatementsPage();
        setImportStatus(`Payment saved for ${invoice.refNumber || "invoice"}.`);
        recordActivity("recorded invoice payment", `Payment of ${formatCurrency(amount)} logged for ${invoice.refNumber || "invoice"}.`);
        closeQuickPaymentModal();
    } catch (error) {
        window.alert(`Unable to save the payment.\n\n${error.message}`);
    }
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
    if (elements.generateStatementExcelBtn) {
        elements.generateStatementExcelBtn.hidden = step !== 3;
        elements.generateStatementExcelBtn.disabled = state.statementExportInProgress;
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
    const outstandingTotal = selectedInvoices.reduce((sum, doc) => sum + getInvoiceOutstandingBalance(doc), 0);

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
    elements.exportInvoiceReportExcelBtn.disabled = !canExportStatement;
    elements.generateStatementExcelBtn.disabled = !canExportStatement;
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

function handleInvoiceReportListClick(event) {
    const actionButton = event.target.closest("[data-invoice-report-action]");
    if (!actionButton) {
        return;
    }

    if (actionButton.dataset.invoiceReportAction === "quick-payment") {
        openQuickPaymentModal(actionButton.dataset.id);
    }
}

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
        .filter(doc => filter === "all" || getInvoiceDerivedPaymentStatus(doc) === filter);
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

    const paidCount = rangedInvoices.filter(doc => getInvoiceDerivedPaymentStatus(doc) === "paid").length;
    const pendingCount = rangedInvoices.filter(doc => getInvoiceDerivedPaymentStatus(doc) === "pending").length;
    const unpaidCount = rangedInvoices.filter(doc => getInvoiceDerivedPaymentStatus(doc) === "unpaid").length;
    const paidTotal = rangedInvoices
        .reduce((sum, doc) => sum + getInvoicePaymentsTotal(doc), 0);
    const pendingTotal = rangedInvoices
        .filter(doc => getInvoiceDerivedPaymentStatus(doc) === "pending")
        .reduce((sum, doc) => sum + getInvoiceOutstandingBalance(doc), 0);
    const unpaidTotal = rangedInvoices
        .filter(doc => getInvoiceDerivedPaymentStatus(doc) === "unpaid")
        .reduce((sum, doc) => sum + getInvoiceOutstandingBalance(doc), 0);

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
                        <th>Actions</th>
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
                            <td>${escapeHtml(getPaymentStatusLabel(getInvoiceDerivedPaymentStatus(doc)))}</td>
                            <td>${escapeHtml(formatCurrency(doc.total || 0))}</td>
                            <td><button type="button" class="btn btn-secondary" data-invoice-report-action="quick-payment" data-id="${escapeHtml(String(doc.id))}">Add Payment</button></td>
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

function createStatementExcelFileName(payload) {
    const baseName = String(payload?.title || "statement-of-account.xlsx").trim() || "statement-of-account.xlsx";
    return /\.xlsx$/i.test(baseName)
        ? baseName
        : baseName.replace(/\.pdf$/i, ".xlsx");
}

function cloneDocumentForStatementExport(doc) {
    if (!doc || typeof doc !== "object") {
        return null;
    }

    return JSON.parse(JSON.stringify(doc));
}

function resolveStatementSourceInvoices(payload) {
    const snapshotInvoices = Array.isArray(payload?.sourceInvoices)
        ? payload.sourceInvoices.map(cloneDocumentForStatementExport).filter(Boolean)
        : [];
    if (snapshotInvoices.length) {
        return snapshotInvoices;
    }

    const sourceIds = new Set((Array.isArray(payload?.sourceInvoiceIds) ? payload.sourceInvoiceIds : []).map(String));
    const rowInvoiceNumbers = new Set((Array.isArray(payload?.rows) ? payload.rows : []).map(row => String(row?.invoiceNumber || "")));

    return state.documents
        .filter(doc => doc.type === "invoice")
        .filter(doc => sourceIds.has(String(doc.id)) || rowInvoiceNumbers.has(String(doc.refNumber || "")))
        .map(cloneDocumentForStatementExport)
        .filter(Boolean);
}

async function downloadStatementExcelReport(payload) {
    const response = await fetch("/api/statement-report", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            statement: payload,
            sourceInvoices: resolveStatementSourceInvoices(payload)
        })
    });

    if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload.error || "Unable to generate the Excel statement report.");
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = createStatementExcelFileName(payload);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
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

async function exportSelectedInvoiceReportExcel() {
    closeInvoiceReportExportMenu();
    const selection = getSelectedInvoiceStatementContext();
    if (!selection.selectedInvoices.length) {
        setImportStatus(t("statement_select_first_error"), true);
        return;
    }

    if (!selection.isSingleClient) {
        setImportStatus(t("statement_mixed_clients_error"), true);
        return;
    }

    try {
        const payload = getStatementPayload();
        await downloadStatementExcelReport(payload);
        setImportStatus(t("statement_excel_success"));
        recordActivity("exported statement of account excel", `Statement Excel report generated for ${selection.clientName || "unknown client"} (${selection.selectedInvoices.length} invoices).`);
    } catch (error) {
        setImportStatus(error.message || "Unable to export the Excel statement report.", true);
        window.alert(error.message || "Unable to export the Excel statement report.");
    }
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
                                            <td>${escapeHtml(getPaymentStatusLabel(getInvoiceDerivedPaymentStatus(doc)))}</td>
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
        sourceInvoices: selection.selectedInvoices.map(cloneDocumentForStatementExport).filter(Boolean),
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
    elements.generateStatementExcelBtn.disabled = true;
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
        elements.generateStatementExcelBtn.textContent = t("statement_generate_excel");
        elements.confirmStatementExportBtn.textContent = t("statement_generate_pdf");
        syncStatementExportWizardUi();
        syncInvoiceReportSelectionUi();
    }
}

async function exportStatementOfAccountExcelFromSelection() {
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
    elements.generateStatementExcelBtn.disabled = true;
    elements.generateStatementExcelBtn.textContent = "Generating...";
    elements.confirmStatementExportBtn.disabled = true;

    try {
        const payload = getStatementPayload();
        await downloadStatementExcelReport(payload);
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
        setImportStatus(t("statement_excel_success"));
        recordActivity("exported statement of account excel", `Statement Excel report generated for ${selection.clientName || "unknown client"} (${selection.selectedInvoices.length} invoices).`);
    } catch (error) {
        setImportStatus(error.message || "Unable to export the Excel statement report.", true);
        window.alert(error.message || "Unable to export the Excel statement report.");
    } finally {
        state.statementExportInProgress = false;
        elements.generateStatementExcelBtn.textContent = t("statement_generate_excel");
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
        return t("direct_account_label");
    }
    const parent = state.userAccounts.find(entry => entry.id === userId);
    return parent ? t("subaccount_of_label", { parent: parent.displayName }) : t("direct_account_label");
}

function syncAccountAdminParentOptions() {
    if (!elements.accountAdminParentSelect) {
        return;
    }

    const currentEditingId = state.editingManagedUserId;
    const options = [`<option value="">${escapeHtml(t("direct_account_for_workspace"))}</option>`]
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
                        <span class="account-admin-user-tag">${escapeHtml(user.role === "admin" ? t("role_admin") : t("role_user"))}</span>
                        <span class="account-admin-user-tag">${escapeHtml(t(`access_${user.accessLevel || "workspace"}`))}</span>
                        <span class="account-admin-user-tag">${escapeHtml(getManagedUserLabel(user.parentUserId))}</span>
                        ${user.lastLoginAt ? `<span class="account-admin-user-tag">${escapeHtml(t("last_login_label"))} ${escapeHtml(formatDateTime(user.lastLoginAt))}</span>` : ""}
                    </div>
                </div>
                <div class="account-admin-user-actions">
                    <button class="btn btn-secondary" type="button" data-account-action="edit" data-user-id="${escapeHtml(user.id)}">${escapeHtml(t("edit"))}</button>
                    <button class="btn btn-secondary" type="button" data-account-action="reset-password" data-user-id="${escapeHtml(user.id)}">${escapeHtml(t("reset_password"))}</button>
                    <button class="btn btn-secondary" type="button" data-account-action="delete" data-user-id="${escapeHtml(user.id)}"${user.username === "admin" ? " disabled" : ""}>${escapeHtml(t("delete"))}</button>
                </div>
            </article>
        `).join("")
        : `<p class="user-list-empty">${escapeHtml(t("no_registered_accounts"))}</p>`;

    elements.accountSessionLogList.innerHTML = recentSessions.length
        ? recentSessions.map(log => `
            <article class="account-admin-feed-card">
                <strong>${escapeHtml(log.displayName)}</strong>
                <span class="account-admin-feed-meta">${escapeHtml(log.username)} • ${escapeHtml(log.status === "open" ? t("active_session") : t("closed_session"))}</span>
                <span class="account-admin-feed-meta">${escapeHtml(t("started_label"))} ${escapeHtml(formatDateTime(log.startedAt))}${log.endedAt ? ` • ${escapeHtml(t("ended_label"))} ${escapeHtml(formatDateTime(log.endedAt))}` : ""}</span>
                ${log.reason ? `<span class="account-admin-feed-meta">${escapeHtml(log.reason)}</span>` : ""}
            </article>
        `).join("")
        : `<p class="user-list-empty">${escapeHtml(t("no_login_sessions"))}</p>`;

    elements.accountActivityLogList.innerHTML = recentActivities.length
        ? recentActivities.map(log => `
            <article class="account-admin-feed-card">
                <strong>${escapeHtml(log.action)}</strong>
                <span class="account-admin-feed-meta">${escapeHtml(log.displayName)} • ${escapeHtml(formatDateTime(log.createdAt))}</span>
                <span class="account-admin-feed-meta">${escapeHtml(log.details || "")}</span>
            </article>
        `).join("")
        : `<p class="user-list-empty">${escapeHtml(t("no_workspace_activity"))}</p>`;

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
    if (!elements.clientManagementList) return;

    if (elements.clientsPageHeaderActions) {
        elements.clientsPageHeaderActions.hidden = !isAdminSession();
    }

    if (!state.clients.length) {
        elements.clientManagementList.innerHTML = `
            <div class="empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <p>${escapeHtml(t("no_clients"))}</p>
            </div>`;
        return;
    }

    const admin = isAdminSession();

    elements.clientManagementList.innerHTML = state.clients.map(client => {
        const contacts = Array.isArray(client.contacts) ? client.contacts : [];

        const normalizedClientName = String(client.name || "").trim().toLowerCase();
        const clientDocs = state.documents.filter(doc =>
            String(doc.clientName || "").trim().toLowerCase() === normalizedClientName
        );
        const clientQuotes = clientDocs.filter(doc => doc.type === "quote");
        const clientInvoices = clientDocs.filter(doc => doc.type === "invoice");
        const totalInvoiced = clientInvoices.reduce((sum, doc) => sum + Number(doc.total || 0), 0);
        const totalOutstanding = clientInvoices.reduce((sum, doc) => sum + getInvoiceOutstandingBalance(doc), 0);
        const clientStatements = (state.statementExports || []).filter(stmt =>
            String(stmt.clientName || "").trim().toLowerCase() === normalizedClientName
        );

        const badges = [
            client.address ? `<span class="client-row-badge"><svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z"/><circle cx="8" cy="6" r="1.5"/></svg>${escapeHtml(client.address.split(/\n|,/)[0].trim())}</span>` : "",
            client.consigneeName ? `<span class="client-row-badge client-row-badge-consignee"><svg viewBox="0 0 16 16" aria-hidden="true" fill="none"><path d="M8 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm-5 10c0-2.2 2.24-4 5-4s5 1.8 5 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>${escapeHtml(client.consigneeName)}</span>` : "",
            contacts.length ? `<span class="client-row-badge client-row-badge-contacts"><svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><circle cx="5" cy="5" r="2.5"/><path d="M1 13c0-2.2 1.8-4 4-4s4 1.8 4 4"/><path d="M11 8a2 2 0 0 0 0-4"/><path d="M13 13c0-1.86-1.27-3.41-3-3.87"/></svg>${contacts.length} contact${contacts.length > 1 ? "s" : ""}</span>` : ""
        ].filter(Boolean).join("");

        const contactsDetail = contacts.length ? `
            <div class="client-detail-section">
                <span class="client-detail-label">${escapeHtml(t("client_contacts"))}</span>
                <div class="client-detail-contacts">
                    ${contacts.map(c => `
                        <div class="client-detail-contact">
                            <span class="client-detail-contact-name">${escapeHtml(c.name || "—")}</span>
                            ${c.email ? `<a class="client-detail-contact-link" href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a>` : ""}
                            ${c.phone ? `<span class="client-detail-contact-phone">${escapeHtml(c.phone)}${c.isWhatsapp ? `<span class="client-contact-wa-badge">WA</span>` : ""}</span>` : ""}
                        </div>`).join("")}
                </div>
            </div>` : "";

        const clientStatsSummary = (clientDocs.length || clientStatements.length)
            ? `<div class="client-row-stats">
                ${clientQuotes.length ? `<span class="client-row-stat">${clientQuotes.length} ${escapeHtml(t("quotes").toLowerCase())}</span>` : ""}
                ${clientInvoices.length ? `<span class="client-row-stat client-row-stat-invoice">${clientInvoices.length} ${escapeHtml(t("invoices").toLowerCase())}</span>` : ""}
                ${clientStatements.length ? `<span class="client-row-stat client-row-stat-statement">${clientStatements.length} ${escapeHtml(t("statements").toLowerCase())}</span>` : ""}
                ${totalInvoiced > 0 ? `<span class="client-row-stat client-row-stat-value">${escapeHtml(formatCurrency(totalInvoiced))} ${escapeHtml(t("client_total_invoiced").toLowerCase())}</span>` : ""}
                ${totalOutstanding > 0 ? `<span class="client-row-stat client-row-stat-outstanding">${escapeHtml(formatCurrency(totalOutstanding))} ${escapeHtml(t("client_outstanding").toLowerCase())}</span>` : ""}
              </div>`
            : "";

        const clientStatsDetail = (clientDocs.length || clientStatements.length) ? `
            <div class="client-detail-section client-detail-stats-grid">
                <span class="client-detail-label">${escapeHtml(t("client_activity"))}</span>
                <div class="client-stats-grid">
                    <button class="client-stat-cell client-stat-action" type="button" data-client-stat-action="quotes" data-client-id="${escapeHtml(client.id)}">
                        <span class="client-stat-value">${clientQuotes.length}</span>
                        <span class="client-stat-label">${escapeHtml(t("quotes"))}</span>
                    </button>
                    <button class="client-stat-cell client-stat-action" type="button" data-client-stat-action="invoices" data-client-id="${escapeHtml(client.id)}">
                        <span class="client-stat-value">${clientInvoices.length}</span>
                        <span class="client-stat-label">${escapeHtml(t("invoices"))}</span>
                    </button>
                    <button class="client-stat-cell client-stat-cell-statement client-stat-action" type="button" data-client-stat-action="statements" data-client-id="${escapeHtml(client.id)}">
                        <span class="client-stat-value">${clientStatements.length}</span>
                        <span class="client-stat-label">${escapeHtml(t("statements"))}</span>
                    </button>
                    <button class="client-stat-cell client-stat-action" type="button" data-client-stat-action="total-invoiced" data-client-id="${escapeHtml(client.id)}">
                        <span class="client-stat-value">${escapeHtml(formatCurrency(totalInvoiced))}</span>
                        <span class="client-stat-label">${escapeHtml(t("client_total_invoiced"))}</span>
                    </button>
                    <button class="client-stat-cell client-stat-action${totalOutstanding > 0 ? " is-outstanding" : ""}" type="button" data-client-stat-action="outstanding" data-client-id="${escapeHtml(client.id)}">
                        <span class="client-stat-value">${escapeHtml(formatCurrency(totalOutstanding))}</span>
                        <span class="client-stat-label">${escapeHtml(t("client_outstanding"))}</span>
                    </button>
                </div>
            </div>` : "";

        return `
        <article class="client-row" data-client-id="${escapeHtml(client.id)}">
            <div class="client-row-header" data-toggle-client="${escapeHtml(client.id)}" role="button" tabindex="0" aria-expanded="false">
                <svg class="client-row-chevron" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 8 10 12 14 8"/></svg>
                <div class="client-row-headline">
                    <strong class="client-row-name">${escapeHtml(client.name)}</strong>
                    <div class="client-row-badges">${badges}</div>
                    ${clientStatsSummary}
                </div>
                ${admin ? `<div class="client-row-actions" role="group">
                    <button class="statement-action-btn is-edit" type="button" data-client-action="edit-client" data-client-id="${escapeHtml(client.id)}" aria-label="${escapeHtml(t("edit"))}" title="${escapeHtml(t("edit"))}">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4.2-1 9.1-9.1a1.9 1.9 0 0 0 0-2.7l-.5-.5a1.9 1.9 0 0 0-2.7 0L5 15.8 4 20Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="m13.5 7.5 3 3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
                    </button>
                    <button class="statement-action-btn is-delete" type="button" data-client-action="delete-client" data-client-id="${escapeHtml(client.id)}" aria-label="${escapeHtml(t("delete"))}" title="${escapeHtml(t("delete"))}">
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M9 4h6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="M7 7l1 12h8l1-12" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 11v5M14 11v5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
                    </button>
                </div>` : ""}
            </div>
            <div class="client-row-body" hidden>
                ${clientStatsDetail}
                ${client.address ? `
                <div class="client-detail-section">
                    <span class="client-detail-label">
                        <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z"/><circle cx="8" cy="6" r="1.5"/></svg>
                        ${escapeHtml(t("client_location"))}
                    </span>
                    <p class="client-detail-value">${escapeHtml(client.address)}</p>
                </div>` : ""}
                ${client.consigneeName ? `
                <div class="client-detail-section">
                    <span class="client-detail-label">
                        <svg viewBox="0 0 16 16" aria-hidden="true" fill="none"><path d="M8 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm-5 10c0-2.2 2.24-4 5-4s5 1.8 5 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                        ${escapeHtml(t("client_consignee"))}
                    </span>
                    <p class="client-detail-value">${escapeHtml(client.consigneeName)}${client.consigneeAddress ? `<span class="client-detail-sub">${escapeHtml(client.consigneeAddress)}</span>` : ""}</p>
                </div>` : ""}
                ${contactsDetail}
            </div>
        </article>`;
    }).join("");
}

function handleClientRowToggle(event) {
    const header = event.target.closest("[data-toggle-client]");
    if (!header) return;
    if (event.target.closest("[data-client-action]")) return;
    if (event.target.closest("[data-client-stat-action]")) return;

    const card = header.closest(".client-row");
    const body = card.querySelector(".client-row-body");
    const expanded = !card.classList.contains("is-expanded");

    card.classList.toggle("is-expanded", expanded);
    header.setAttribute("aria-expanded", String(expanded));
    body.hidden = !expanded;
}

function handleClientStatClick(event) {
    const button = event.target.closest("[data-client-stat-action]");
    if (!button) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const clientId = button.dataset.clientId;
    const action = button.dataset.clientStatAction;
    const client = state.clients.find(entry => isSameDocumentId(entry.id, clientId));
    if (!client) {
        return;
    }

    openClientActivityModal(client, action);
}

function openClientActivityModal(client, action) {
    const normalizedClientName = String(client.name || "").trim().toLowerCase();
    const clientQuotes = state.documents.filter(doc =>
        doc.type === "quote" && String(doc.clientName || "").trim().toLowerCase() === normalizedClientName
    );
    const clientInvoices = state.documents.filter(doc =>
        doc.type === "invoice" && String(doc.clientName || "").trim().toLowerCase() === normalizedClientName
    );
    const clientStatements = (state.statementExports || []).filter(statement =>
        String(statement.clientName || "").trim().toLowerCase() === normalizedClientName
    );

    let title = "";
    let subtitle = "";
    let entries = [];

    if (action === "quotes") {
        title = t("client_activity_quotes_title", { client: client.name });
        subtitle = t("client_activity_quotes_copy");
        entries = clientQuotes.map(doc => ({ kind: "document", doc, meta: formatCurrency(doc.total || 0) }));
    } else if (action === "invoices") {
        title = t("client_activity_invoices_title", { client: client.name });
        subtitle = t("client_activity_invoices_copy");
        entries = clientInvoices.map(doc => ({ kind: "document", doc, meta: formatCurrency(doc.total || 0) }));
    } else if (action === "statements") {
        title = t("client_activity_statements_title", { client: client.name });
        subtitle = t("client_activity_statements_copy");
        entries = clientStatements.map(statement => ({
            kind: "statement",
            statement,
            meta: t("client_activity_statement_meta", { amount: formatCurrency(getStatementLiveOutstanding(statement)) })
        }));
    } else if (action === "total-invoiced") {
        title = t("client_activity_total_invoiced_title", { client: client.name });
        subtitle = t("client_activity_total_invoiced_copy");
        entries = clientInvoices.map(doc => ({ kind: "document", doc, meta: formatCurrency(doc.total || 0) }));
    } else if (action === "outstanding") {
        title = t("client_activity_outstanding_title", { client: client.name });
        subtitle = t("client_activity_outstanding_copy");
        entries = clientInvoices
            .filter(doc => getInvoiceOutstandingBalance(doc) > 0)
            .map(doc => ({
                kind: "document",
                doc,
                meta: t("client_activity_statement_meta", { amount: formatCurrency(getInvoiceOutstandingBalance(doc)) })
            }));
    }

    elements.clientActivityModalTitle.textContent = title || t("client_activity_modal_title");
    elements.clientActivityModalCopy.textContent = subtitle || t("client_activity_modal_copy");
    elements.clientActivityModalList.innerHTML = entries.length
        ? entries.map(entry => entry.kind === "statement"
            ? `
                <button class="overview-document-link overview-document-link-invoice client-activity-link" type="button" data-client-activity-open-statement="${escapeHtml(entry.statement.id)}">
                    <span class="overview-document-ref">${escapeHtml(entry.statement.referenceNumber || "Statement")}</span>
                    <span class="overview-document-meta">${escapeHtml(formatPrintedDate(entry.statement.generatedAt || ""))}</span>
                    <strong class="overview-document-total">${escapeHtml(entry.meta)}</strong>
                </button>
            `
            : `
                <button class="overview-document-link overview-document-link-${escapeHtml(entry.doc.type || "quote")} client-activity-link" type="button" data-client-activity-open-doc="${escapeHtml(String(entry.doc.id))}">
                    <span class="overview-document-ref">${escapeHtml(entry.doc.refNumber || "Reference pending")}</span>
                    <span class="overview-document-meta">${escapeHtml(formatDisplayDate(entry.doc.date || ""))}</span>
                    <strong class="overview-document-total">${escapeHtml(entry.meta)}</strong>
                </button>
            `).join("")
        : `<div class="empty-state compact-empty-state"><p>${escapeHtml(t("client_activity_no_records"))}</p></div>`;

    setModalState(elements.clientActivityModal, true);
}

function closeClientActivityModal() {
    setModalState(elements.clientActivityModal, false);
}

function handleClientActivityModalClick(event) {
    const openDocButton = event.target.closest("[data-client-activity-open-doc]");
    if (openDocButton) {
        closeClientActivityModal();
        setActivePage("documents");
        editDocument(openDocButton.dataset.clientActivityOpenDoc);
        return;
    }

    const openStatementButton = event.target.closest("[data-client-activity-open-statement]");
    if (openStatementButton) {
        const statement = state.statementExports.find(entry => entry.id === openStatementButton.dataset.clientActivityOpenStatement);
        if (!statement) {
            return;
        }
        closeClientActivityModal();
        window.StatementOfAccount.generateStatementOfAccountPdf(statement.payload);
    }
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
    if (!button || !isAdminSession()) return;

    const clientId = button.dataset.clientId;
    const action = button.dataset.clientAction;
    const client = state.clients.find(entry => isSameDocumentId(entry.id, clientId));
    if (!client) return;

    if (action === "edit-client") {
        openClientModal(clientId);
        return;
    }

    if (action === "delete-client") {
        if (!window.confirm(`Delete saved client "${client.name}"?`)) return;

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

// ── Client modal ──────────────────────────────────────────────────

function openClientModal(clientId) {
    state.editingClientId = clientId || null;
    const client = clientId ? state.clients.find(c => isSameDocumentId(c.id, clientId)) : null;

    elements.clientModalTitle.textContent = client ? "Edit Client" : "Add Client";
    elements.clientModalName.value = client?.name || "";
    elements.clientModalAddress.value = client?.address || "";
    elements.clientModalConsigneeName.value = client?.consigneeName || "";
    elements.clientModalConsigneeAddress.value = client?.consigneeAddress || "";

    const contacts = Array.isArray(client?.contacts) ? client.contacts : [];
    elements.clientModalContactsList.innerHTML = "";
    contacts.forEach(c => appendClientContactRow(c));

    setModalState(elements.clientModal, true);
    elements.clientModalName.focus();
}

function closeClientModal() {
    setModalState(elements.clientModal, false);
    state.editingClientId = null;
}

function buildContactRowHTML(contact, index) {
    const id = contact?.id || `contact-new-${index}`;
    const name = escapeHtml(contact?.name || "");
    const email = escapeHtml(contact?.email || "");
    const phone = escapeHtml(contact?.phone || "");
    const wa = contact?.isWhatsapp ? "checked" : "";
    return `
        <div class="client-contact-row" data-contact-row="${index}">
            <div class="client-contact-fields">
                <input type="text" class="client-contact-input client-contact-name" placeholder="Full Name" value="${name}" aria-label="Contact name">
                <input type="email" class="client-contact-input client-contact-email" placeholder="Email address" value="${email}" aria-label="Contact email">
                <div class="client-contact-phone-group">
                    <input type="tel" class="client-contact-input client-contact-phone" placeholder="Phone number" value="${phone}" aria-label="Contact phone">
                    <label class="client-contact-wa-label" title="This number is on WhatsApp">
                        <input type="checkbox" class="client-contact-wa-check" ${wa}>
                        <span class="client-contact-wa-badge-toggle">
                            <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.944-1.42A9.956 9.956 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                            WA
                        </span>
                    </label>
                </div>
            </div>
            <button type="button" class="client-contact-remove-btn" data-remove-contact="${index}" aria-label="Remove contact">
                <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
        </div>`;
}

function appendClientContactRow(contact) {
    const index = elements.clientModalContactsList.children.length;
    const div = document.createElement("div");
    div.innerHTML = buildContactRowHTML(contact, index);
    elements.clientModalContactsList.appendChild(div.firstElementChild);
    rebindContactRemoveButtons();
}

function addClientContactRow() {
    appendClientContactRow(null);
}

function rebindContactRemoveButtons() {
    elements.clientModalContactsList.querySelectorAll("[data-remove-contact]").forEach(btn => {
        btn.onclick = () => {
            btn.closest(".client-contact-row").remove();
        };
    });
}

function collectContactsFromModal() {
    return Array.from(elements.clientModalContactsList.querySelectorAll(".client-contact-row")).map(row => ({
        id: `contact-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: row.querySelector(".client-contact-name")?.value.trim() || "",
        email: row.querySelector(".client-contact-email")?.value.trim() || "",
        phone: row.querySelector(".client-contact-phone")?.value.trim() || "",
        isWhatsapp: row.querySelector(".client-contact-wa-check")?.checked || false
    })).filter(c => c.name || c.email || c.phone);
}

async function saveClientFromModal() {
    const name = elements.clientModalName.value.trim();
    const address = elements.clientModalAddress.value.trim();

    if (!name) {
        elements.clientModalName.focus();
        return;
    }
    if (!address) {
        elements.clientModalAddress.focus();
        return;
    }

    const duplicate = state.clients.find(c =>
        !isSameDocumentId(c.id, state.editingClientId) &&
        c.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicate) {
        alert("Another saved client already uses that name.");
        return;
    }

    const updatedClient = {
        id: state.editingClientId || `client-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name,
        address,
        consigneeName: elements.clientModalConsigneeName.value.trim(),
        consigneeAddress: elements.clientModalConsigneeAddress.value.trim(),
        contacts: collectContactsFromModal()
    };

    let updatedList;
    if (state.editingClientId) {
        updatedList = state.clients.map(c => isSameDocumentId(c.id, state.editingClientId) ? updatedClient : c);
    } else {
        updatedList = [...state.clients, updatedClient];
    }

    try {
        await saveClientsToServer(updatedList);
    } catch (error) {
        alert(`Unable to save client.\n\n${error.message}`);
        return;
    }

    renderClientOptions();
    renderClientManagementList();
    setImportStatus(state.editingClientId ? `Updated client ${name}.` : `Added client ${name}.`);
    closeClientModal();
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
    const show = state.showInternalPricing;
    ["itemsColCost", "itemsColMargin", "itemsSubtotalCost", "itemsSubtotalMargin"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.hidden = !show;
    });
    elements.itemsContainer.querySelectorAll(".it-cost, .it-margin").forEach(cell => {
        cell.hidden = !show;
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

function normalizeInvoicePayments(payments) {
    return Array.isArray(payments)
        ? payments
            .filter(payment => payment && typeof payment === "object")
            .map((payment, index) => ({
                id: String(payment.id || `payment-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`),
                date: String(payment.date || payment.createdAt || new Date().toISOString().slice(0, 10)).slice(0, 10),
                amount: Math.max(0, Number.parseFloat(payment.amount) || 0),
                method: String(payment.method || "").trim(),
                reference: String(payment.reference || "").trim(),
                notes: String(payment.notes || "").trim(),
                appliedTo: String(payment.appliedTo || "invoice").trim() || "invoice",
                createdAt: String(payment.createdAt || new Date().toISOString())
            }))
            .filter(payment => payment.amount > 0)
        : [];
}

function getInvoicePayments(doc) {
    return normalizeInvoicePayments(doc?.payments);
}

function getInvoicePaymentsTotal(doc) {
    return getInvoicePayments(doc).reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
}

function getInvoiceOutstandingBalance(doc) {
    const total = Number(doc?.total || 0);
    return Math.max(0, total - getInvoicePaymentsTotal(doc));
}

function getInvoiceDerivedPaymentStatus(doc) {
    const payments = getInvoicePayments(doc);
    if (!payments.length) {
        return normalizePaymentStatus(doc?.paymentStatus);
    }

    const total = Number(doc?.total || 0);
    const paidTotal = getInvoicePaymentsTotal(doc);
    if (paidTotal <= 0) {
        return "unpaid";
    }
    if (paidTotal >= total && total > 0) {
        return "paid";
    }
    return "pending";
}

function inferPaymentTermsMode(paymentTermsText) {
    const upper = String(paymentTermsText || "").toUpperCase().trim();
    if (upper.includes("IMMEDIATE") || upper.includes("UPON RECEIPT")) return "immediate";
    if (/\bNET\s*15\b/.test(upper) || /\b15\s*DAYS?\b/.test(upper)) return "net15";
    if (/\bNET\s*30\b/.test(upper) || /\b30\s*DAYS?\b/.test(upper)) return "net30";
    return "other";
}

function computePaymentTermsText(mode, days, customText) {
    if (mode === "immediate") return "Payment is due immediately upon receipt.";
    if (mode === "net15") return "NET15 : Payment is due within 15 days of the invoice date.";
    if (mode === "net30") return "NET30 : Payment is due within 30 days of the invoice date.";
    const d = Math.max(1, parseInt(days, 10) || 45);
    const text = (customText || "").trim();
    return text || `Payment is due within ${d} days of the invoice date.`;
}

function syncPaymentTermsUI(triggerAutosave = true) {
    const isImmediate = elements.paymentTermsImmediate?.checked;
    if (isImmediate) {
        elements.paymentTermsOptions?.classList.add("is-disabled");
    } else {
        elements.paymentTermsOptions?.classList.remove("is-disabled");
    }
    const preset = document.querySelector("input[name=\"paymentTermsPreset\"]:checked")?.value || "net30";
    const isOther = preset === "other";
    if (elements.paymentTermsOtherFields) elements.paymentTermsOtherFields.hidden = !isOther;
    const mode = isImmediate ? "immediate" : preset;
    const days = parseInt(elements.paymentTermsDays?.value, 10) || 45;
    const customText = elements.paymentTermsCustomText?.value || "";
    if (elements.paymentTerms) elements.paymentTerms.value = computePaymentTermsText(mode, days, customText);
    if (triggerAutosave) queueDraftAutosave();
}

function loadPaymentTermsIntoEditor(doc) {
    const mode = doc.paymentTermsMode || inferPaymentTermsMode(doc.paymentTerms);
    elements.paymentTermsImmediate.checked = mode === "immediate";
    const presetId = mode === "net15" ? "paymentTermsNet15"
        : mode === "net30" ? "paymentTermsNet30"
        : mode === "other" ? "paymentTermsOther"
        : "paymentTermsNet30";
    const presetInput = document.getElementById(presetId);
    if (presetInput) presetInput.checked = true;
    elements.paymentTermsDays.value = doc.paymentTermsDays || 45;
    elements.paymentTermsCustomText.value = mode === "other" ? (doc.paymentTerms || "") : "";
    syncPaymentTermsUI(false);
}

function resetPaymentTermsUI() {
    elements.paymentTermsImmediate.checked = false;
    const net30 = document.getElementById("paymentTermsNet30");
    if (net30) net30.checked = true;
    elements.paymentTermsOtherFields.hidden = true;
    elements.paymentTermsDays.value = 45;
    elements.paymentTermsCustomText.value = "";
    syncPaymentTermsUI(false);
}

function getPaymentTermsModeFromUI() {
    if (elements.paymentTermsImmediate?.checked) return "immediate";
    return document.querySelector("input[name=\"paymentTermsPreset\"]:checked")?.value || "net30";
}

function getInvoicePaymentTermDays(invoice) {
    const mode = invoice?.paymentTermsMode;
    if (mode === "immediate") return 0;
    if (mode === "net15") return 15;
    if (mode === "net30") return 30;
    if (mode === "other") return Math.max(1, invoice?.paymentTermsDays || 45);
    // backward compat: parse from text
    const normalizedTerms = String(invoice?.paymentTerms || DEFAULT_PAYMENT_TERMS).trim().toUpperCase();
    if (normalizedTerms.includes("IMMEDIATE") || normalizedTerms.includes("UPON RECEIPT")) return 0;
    const netMatch = normalizedTerms.match(/NET\s*[- ]?(\d{1,3})/i);
    const dayMatch = normalizedTerms.match(/\b(\d{1,3})\s*(DAY|DAYS)\b/i);
    const looseNumberMatch = normalizedTerms.match(/\b(\d{1,3})\b/);
    const parsedDays = Number(
        (netMatch && netMatch[1]) ||
        (dayMatch && dayMatch[1]) ||
        (looseNumberMatch && looseNumberMatch[1]) ||
        30
    );
    return Math.max(1, Number.isFinite(parsedDays) ? parsedDays : 30);
}

function calculateInvoiceDueDate(invoice) {
    const invoiceDate = parseLocalDateValue(invoice?.date || new Date());
    const dueDate = new Date(invoiceDate);
    dueDate.setDate(dueDate.getDate() + getInvoicePaymentTermDays(invoice));
    return dueDate;
}

function getInvoiceDaysPastDue(invoice, referenceDate = new Date()) {
    const balance = getInvoiceOutstandingBalance(invoice);
    if (balance <= 0) {
        return 0;
    }

    const dueDate = calculateInvoiceDueDate(invoice);
    const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
    const due = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    const diffMs = today.getTime() - due.getTime();
    return diffMs > 0 ? Math.floor(diffMs / 86400000) : 0;
}

function buildPaymentDeleteSummaryMarkup(context) {
    if (!context) {
        return "";
    }

    const amountText = formatCurrency(Number(context.amount || 0));
    const invoiceLabel = context.invoiceNumber ? `Invoice ${context.invoiceNumber}` : "Invoice payment";
    const dateLabel = formatDisplayDate(context.date) || context.date || "Date unavailable";
    const methodLabel = context.method || "Payment record";

    return `
        <strong>${escapeHtml(amountText)} • ${escapeHtml(methodLabel)}</strong>
        <span>${escapeHtml(`${invoiceLabel}${context.clientName ? ` • ${context.clientName}` : ""}`)}</span>
        <span>${escapeHtml(`${dateLabel}${context.reference ? ` • Ref ${context.reference}` : ""}`)}</span>
    `;
}

function openPaymentDeleteConfirmModal(context) {
    if (!elements.paymentDeleteConfirmModal || !elements.paymentDeleteConfirmSummary) {
        return;
    }

    state.pendingPaymentDeleteContext = context;
    elements.paymentDeleteConfirmSummary.innerHTML = buildPaymentDeleteSummaryMarkup(context);
    if (elements.confirmPaymentDeleteConfirmBtn) {
        elements.confirmPaymentDeleteConfirmBtn.disabled = false;
    }
    setModalState(elements.paymentDeleteConfirmModal, true);
}

function closePaymentDeleteConfirmModal() {
    state.pendingPaymentDeleteContext = null;
    if (elements.paymentDeleteConfirmSummary) {
        elements.paymentDeleteConfirmSummary.innerHTML = "";
    }
    if (elements.confirmPaymentDeleteConfirmBtn) {
        elements.confirmPaymentDeleteConfirmBtn.disabled = false;
    }
    setModalState(elements.paymentDeleteConfirmModal, false);
}

function requestEditorPaymentDelete(paymentEntryId) {
    const payment = normalizeInvoicePayments(readPaymentEntriesFromEditor())
        .find(entry => String(entry.id) === String(paymentEntryId));
    if (!payment) {
        return;
    }

    openPaymentDeleteConfirmModal({
        mode: "editor",
        paymentEntryId: String(paymentEntryId),
        invoiceNumber: elements.refNumber?.value?.trim() || "",
        clientName: elements.clientName?.value?.trim() || "",
        amount: payment.amount,
        date: payment.date,
        method: payment.method,
        reference: payment.reference
    });
}

function requestLoggedPaymentDelete(invoiceId, paymentId) {
    const invoice = getDocumentById(invoiceId);
    if (!invoice || invoice.type !== "invoice") {
        window.alert("This payment could not be found.");
        return;
    }

    const payment = getInvoicePayments(invoice).find(entry => String(entry.id) === String(paymentId));
    if (!payment) {
        window.alert("This payment could not be found.");
        return;
    }

    openPaymentDeleteConfirmModal({
        mode: "logged",
        invoiceId: String(invoice.id),
        paymentId: String(payment.id),
        invoiceNumber: invoice.refNumber || "",
        clientName: invoice.clientName || "",
        amount: payment.amount,
        date: payment.date,
        method: payment.method,
        reference: payment.reference
    });
}

async function confirmPendingPaymentDelete() {
    const context = state.pendingPaymentDeleteContext;
    if (!context) {
        return;
    }

    if (elements.confirmPaymentDeleteConfirmBtn) {
        elements.confirmPaymentDeleteConfirmBtn.disabled = true;
    }

    if (context.mode === "editor") {
        const card = elements.paymentLedgerList?.querySelector(`[data-payment-entry-id="${CSS.escape(String(context.paymentEntryId))}"]`);
        card?.remove();
        if (elements.paymentLedgerList && !elements.paymentLedgerList.querySelector("[data-payment-entry-id]")) {
            elements.paymentLedgerList.innerHTML = `<p class="payment-ledger-empty">No payments recorded yet.</p>`;
        }
        syncPaymentLedgerUi();
        closePaymentDeleteConfirmModal();
        return;
    }

    if (context.mode === "logged") {
        const invoice = getDocumentById(context.invoiceId);
        if (!invoice || invoice.type !== "invoice") {
            closePaymentDeleteConfirmModal();
            window.alert("This payment could not be found.");
            return;
        }

        const nextPayments = getInvoicePayments(invoice).filter(payment => String(payment.id) !== String(context.paymentId));
        const nextDocuments = state.documents.map(doc => (
            isSameDocumentId(doc.id, invoice.id)
                ? {
                    ...doc,
                    payments: nextPayments,
                    paymentStatus: getInvoiceDerivedPaymentStatus({ ...doc, payments: nextPayments })
                }
                : doc
        ));

        try {
            await saveDocumentsToServer(nextDocuments);
            renderDocuments();
            renderStatementsPage();

            if (state.editingDocumentId && isSameDocumentId(state.editingDocumentId, invoice.id)) {
                renderPaymentLedger(nextPayments);
                syncPaymentLedgerUi();
            }

            setImportStatus(`Deleted payment ${formatCurrency(context.amount || 0)} from ${invoice.refNumber || "invoice"}.`);
            closePaymentDeleteConfirmModal();
        } catch (error) {
            if (elements.confirmPaymentDeleteConfirmBtn) {
                elements.confirmPaymentDeleteConfirmBtn.disabled = false;
            }
            window.alert(`Unable to delete this payment.\n\n${error.message}`);
        }
    }
}

function getPaymentHistoryEntries() {
    return state.documents
        .filter(doc => doc.type === "invoice")
        .flatMap(doc => getInvoicePayments(doc).map(payment => ({
            ...payment,
            invoiceId: String(doc.id),
            invoiceNumber: doc.refNumber || "—",
            clientName: doc.clientName || t("unknown_client"),
            invoiceTotal: Number(doc.total || 0),
            outstandingBalance: getInvoiceOutstandingBalance(doc)
        })))
        .sort((left, right) => Date.parse(right.date || right.createdAt || 0) - Date.parse(left.date || left.createdAt || 0));
}

function getClientAgingRows(referenceDate = new Date()) {
    const grouped = new Map();

    state.documents
        .filter(doc => doc.type === "invoice")
        .forEach(doc => {
            const outstanding = getInvoiceOutstandingBalance(doc);
            if (outstanding <= 0) {
                return;
            }

            const clientName = String(doc.clientName || t("unknown_client")).trim() || t("unknown_client");
            const group = grouped.get(clientName) || {
                clientName,
                invoiceCount: 0,
                current: 0,
                bucket1to30: 0,
                bucket31to60: 0,
                bucket61to90: 0,
                bucket90plus: 0,
                totalOutstanding: 0
            };

            const daysPastDue = getInvoiceDaysPastDue(doc, referenceDate);
            group.invoiceCount += 1;
            group.totalOutstanding += outstanding;

            if (daysPastDue <= 0) {
                group.current += outstanding;
            } else if (daysPastDue <= 30) {
                group.bucket1to30 += outstanding;
            } else if (daysPastDue <= 60) {
                group.bucket31to60 += outstanding;
            } else if (daysPastDue <= 90) {
                group.bucket61to90 += outstanding;
            } else {
                group.bucket90plus += outstanding;
            }

            grouped.set(clientName, group);
        });

    return [...grouped.values()].sort((left, right) => right.totalOutstanding - left.totalOutstanding);
}

function getMonthlyPaymentExposureAlerts(referenceDate = new Date()) {
    const grouped = new Map();

    state.documents
        .filter(doc => doc.type === "invoice")
        .forEach(doc => {
            const outstanding = getInvoiceOutstandingBalance(doc);
            if (outstanding <= 0) {
                return;
            }

            const dueDate = calculateInvoiceDueDate(doc);
            const monthKey = `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(2, "0")}`;
            const clientName = String(doc.clientName || t("unknown_client")).trim() || t("unknown_client");
            const key = `${clientName}::${monthKey}`;
            const group = grouped.get(key) || {
                clientName,
                monthKey,
                dueDate,
                totalOutstanding: 0,
                invoiceCount: 0
            };

            group.totalOutstanding += outstanding;
            group.invoiceCount += 1;
            if (dueDate > group.dueDate) {
                group.dueDate = dueDate;
            }
            grouped.set(key, group);
        });

    return [...grouped.values()]
        .filter(group => group.totalOutstanding > MONTHLY_CLIENT_DUE_LIMIT)
        .sort((left, right) => right.totalOutstanding - left.totalOutstanding);
}

function renderReportsMetrics(container, metrics) {
    if (!container) {
        return;
    }

    container.innerHTML = metrics.map(metric => `
        <article class="invoice-report-summary-card">
            <span>${escapeHtml(metric.label)}</span>
            <strong>${escapeHtml(metric.value)}</strong>
        </article>
    `).join("");
}

function renderPaymentHistoryPanel() {
    if (!elements.paymentHistoryMetrics || !elements.paymentHistoryTableBody) {
        return;
    }

    const entries = getPaymentHistoryEntries();
    const totalPaid = entries.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
    const uniqueClients = new Set(entries.map(entry => entry.clientName)).size;
    const exposureAlerts = getMonthlyPaymentExposureAlerts();

    renderReportsMetrics(elements.paymentHistoryMetrics, [
        { label: "Payments Logged", value: String(entries.length) },
        { label: "Clients Touched", value: String(uniqueClients) },
        { label: "Total Applied", value: formatCurrency(totalPaid) }
    ]);

    if (elements.paymentExposureAlerts) {
        elements.paymentExposureAlerts.hidden = exposureAlerts.length === 0;
        elements.paymentExposureAlerts.innerHTML = exposureAlerts.map(alert => `
            <article class="report-alert-card">
                <strong>Monthly due alert: ${escapeHtml(alert.clientName)}</strong>
                <p>${escapeHtml(`${formatCurrency(alert.totalOutstanding)} is due across ${alert.invoiceCount} invoice${alert.invoiceCount === 1 ? "" : "s"} in ${alert.dueDate.toLocaleString(getCurrentLocale(), { month: "long", year: "numeric" })}. This exceeds the ${formatCurrency(MONTHLY_CLIENT_DUE_LIMIT)} monthly limit.`)}</p>
            </article>
        `).join("");
    }

    elements.paymentHistoryTableBody.innerHTML = entries.length
        ? entries.map((entry, idx) => {
            const linkedStatement = getStatementForInvoiceId(entry.invoiceId);
            return `
            <div class="phist-row" data-phist-index="${idx}">
                <button class="phist-toggle" type="button" data-phist-toggle="${idx}" aria-expanded="false">
                    <span class="phist-date">${escapeHtml(formatDisplayDate(entry.date) || entry.date || "—")}</span>
                    <span class="phist-client">${escapeHtml(entry.clientName)}</span>
                    <span class="phist-invoice">${escapeHtml(entry.invoiceNumber)}</span>
                    <span class="phist-method">${escapeHtml(entry.method || "—")}</span>
                    <span class="phist-amount">${escapeHtml(formatCurrency(entry.amount || 0))}</span>
                    <svg class="phist-chevron" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <div class="phist-detail" id="phist-detail-${idx}" hidden>
                    <div class="phist-meta">
                        ${entry.reference ? `<span><strong>Ref:</strong> ${escapeHtml(entry.reference)}</span>` : ""}
                        ${entry.notes ? `<span><strong>Notes:</strong> ${escapeHtml(entry.notes)}</span>` : ""}
                    </div>
                    <div class="phist-nav-row">
                        <button class="btn btn-secondary phist-nav-btn" type="button" data-phist-action="open-invoice" data-invoice-id="${escapeHtml(String(entry.invoiceId))}">Open Invoice ${escapeHtml(entry.invoiceNumber)}</button>
                        ${linkedStatement ? `<button class="btn btn-secondary phist-nav-btn" type="button" data-phist-action="open-statement" data-statement-id="${escapeHtml(linkedStatement.id)}">View Statement ${escapeHtml(linkedStatement.referenceNumber || "")}</button>` : ""}
                        <button class="btn phist-nav-btn is-danger" type="button" data-phist-action="delete-payment" data-invoice-id="${escapeHtml(String(entry.invoiceId))}" data-payment-id="${escapeHtml(String(entry.id || ""))}">Delete Payment</button>
                    </div>
                </div>
            </div>`;
        }).join("")
        : `<div class="phist-empty">No payments recorded yet.</div>`;
}

function renderClientAgingPanel() {
    if (!elements.agingMetrics || !elements.clientAgingTableBody) {
        return;
    }

    const rows = getClientAgingRows();
    const totalOutstanding = rows.reduce((sum, row) => sum + row.totalOutstanding, 0);
    const overdueTotal = rows.reduce((sum, row) => sum + row.bucket1to30 + row.bucket31to60 + row.bucket61to90 + row.bucket90plus, 0);

    renderReportsMetrics(elements.agingMetrics, [
        { label: t("clients_with_balances"), value: String(rows.length) },
        { label: t("total_outstanding"), value: formatCurrency(totalOutstanding) },
        { label: t("past_due"), value: formatCurrency(overdueTotal) }
    ]);

    elements.clientAgingTableBody.innerHTML = rows.length
        ? rows.map(row => `
            <tr class="aging-row" data-aging-client="${escapeHtml(row.clientName)}" tabindex="0" role="button" title="View open invoices for ${escapeHtml(row.clientName)}">
                <td>
                    <div class="reports-client-cell aging-client-cell">
                        <strong>${escapeHtml(row.clientName)}</strong>
                        <span class="aging-row-hint">
                            ${escapeHtml(`${row.invoiceCount} open invoice${row.invoiceCount === 1 ? "" : "s"}`)}
                            <svg class="aging-row-arrow" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                        </span>
                    </div>
                </td>
                <td>${escapeHtml(String(row.invoiceCount))}</td>
                <td class="${row.current > 0 ? "aging-cell-current" : ""}">${escapeHtml(formatCurrency(row.current))}</td>
                <td class="${row.bucket1to30 > 0 ? "aging-cell-overdue" : ""}">${escapeHtml(formatCurrency(row.bucket1to30))}</td>
                <td class="${row.bucket31to60 > 0 ? "aging-cell-overdue" : ""}">${escapeHtml(formatCurrency(row.bucket31to60))}</td>
                <td class="${row.bucket61to90 > 0 ? "aging-cell-late" : ""}">${escapeHtml(formatCurrency(row.bucket61to90))}</td>
                <td class="${row.bucket90plus > 0 ? "aging-cell-critical" : ""}">${escapeHtml(formatCurrency(row.bucket90plus))}</td>
                <td class="aging-cell-total">${escapeHtml(formatCurrency(row.totalOutstanding))}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="8">No outstanding balances right now.</td></tr>`;

    elements.clientAgingTableBody.addEventListener("click", handleAgingRowClick, { once: true });
    elements.clientAgingTableBody.addEventListener("keydown", handleAgingRowKeydown, { once: true });
}

function handleAgingRowClick(event) {
    const row = event.target.closest("[data-aging-client]");
    if (row) openClientInvoicesFromAging(row.dataset.agingClient);
    elements.clientAgingTableBody.addEventListener("click", handleAgingRowClick, { once: true });
}

function handleAgingRowKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
        const row = event.target.closest("[data-aging-client]");
        if (row) { event.preventDefault(); openClientInvoicesFromAging(row.dataset.agingClient); }
    }
    elements.clientAgingTableBody.addEventListener("keydown", handleAgingRowKeydown, { once: true });
}

function openClientInvoicesFromAging(clientName) {
    state.searchQuery = clientName.trim().toLowerCase();
    state.activeFilter = "invoice";
    elements.documentSearch.value = clientName.trim();
    syncDocumentFilters();
    renderDocuments();
    setActivePage("documents");
    elements.documentSearch.focus();
}

function createEmptyPaymentEntry() {
    return {
        id: `payment-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        date: new Date().toISOString().slice(0, 10),
        amount: 0,
        method: "",
        reference: "",
        notes: "",
        appliedTo: "invoice",
        createdAt: new Date().toISOString()
    };
}

function buildPaymentEntryMarkup(payment, index) {
    const amount = Number(payment?.amount || 0);
    return `
        <article class="payment-entry-card" data-payment-entry-id="${escapeHtml(String(payment.id || ""))}">
            <div class="payment-entry-head">
                <strong>Payment ${index + 1}</strong>
                <button class="payment-entry-remove" type="button" data-remove-payment-entry="${escapeHtml(String(payment.id || ""))}">Remove</button>
            </div>
            <div class="payment-entry-grid">
                <label class="form-group">
                    <span>Date</span>
                    <input type="date" data-payment-field="date" value="${escapeHtml(String(payment.date || "").slice(0, 10))}">
                </label>
                <label class="form-group">
                    <span>Amount</span>
                    <input type="number" min="0" step="0.01" data-payment-field="amount" value="${escapeHtml(amount ? amount.toFixed(2) : "")}" placeholder="0.00">
                </label>
                <label class="form-group">
                    <span>Method</span>
                    <input type="text" data-payment-field="method" value="${escapeHtml(payment.method || "")}" placeholder="Bank transfer">
                </label>
                <label class="form-group">
                    <span>Reference</span>
                    <input type="text" data-payment-field="reference" value="${escapeHtml(payment.reference || "")}" placeholder="Receipt or transfer ID">
                </label>
                <label class="form-group report-field-wide">
                    <span>Notes</span>
                    <textarea rows="2" data-payment-field="notes" placeholder="Advance payment, wire confirmation, check details...">${escapeHtml(payment.notes || "")}</textarea>
                </label>
            </div>
        </article>
    `;
}

function readPaymentEntriesFromEditor() {
    if (!elements.paymentLedgerList) {
        return [];
    }

    return Array.from(elements.paymentLedgerList.querySelectorAll("[data-payment-entry-id]"))
        .map(card => {
            const id = String(card.dataset.paymentEntryId || "");
            const getField = name => card.querySelector(`[data-payment-field="${name}"]`)?.value || "";
            return {
                id,
                date: String(getField("date") || new Date().toISOString().slice(0, 10)).slice(0, 10),
                amount: Number.parseFloat(getField("amount")) || 0,
                method: getField("method").trim(),
                reference: getField("reference").trim(),
                notes: getField("notes").trim(),
                appliedTo: "invoice"
            };
        })
        .filter(entry => entry.amount > 0 || entry.method || entry.reference || entry.notes);
}

function renderPaymentLedger(payments = []) {
    if (!elements.paymentLedgerList) {
        return;
    }

    const normalizedPayments = normalizeInvoicePayments(payments);
    elements.paymentLedgerList.innerHTML = normalizedPayments.length
        ? normalizedPayments.map((payment, index) => buildPaymentEntryMarkup(payment, index)).join("")
        : `<p class="payment-ledger-empty">No payments recorded yet.</p>`;
}

function syncPaymentLedgerVisibility() {
    const isInvoice = elements.docType?.value === "invoice";
    if (elements.paymentLedgerPanel) {
        elements.paymentLedgerPanel.hidden = !isInvoice;
    }
    if (elements.sidebarPaymentSummary) {
        elements.sidebarPaymentSummary.hidden = !isInvoice;
    }
}

function syncPaymentLedgerUi() {
    syncPaymentLedgerVisibility();
    const currentTotal = calculateTotals();
    const payments = readPaymentEntriesFromEditor();
    const paidTotal = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    const balance = Math.max(0, currentTotal - paidTotal);

    if (elements.paymentLedgerInvoiceTotal) {
        elements.paymentLedgerInvoiceTotal.textContent = formatCurrency(currentTotal);
    }
    if (elements.paymentLedgerPaidTotal) {
        elements.paymentLedgerPaidTotal.textContent = formatCurrency(paidTotal);
    }
    if (elements.paymentLedgerBalance) {
        elements.paymentLedgerBalance.textContent = formatCurrency(balance);
    }
}

function addPaymentEntry() {
    if (!elements.paymentLedgerList) {
        return;
    }

    const payments = normalizeInvoicePayments(readPaymentEntriesFromEditor());
    payments.push(createEmptyPaymentEntry());
    renderPaymentLedger(payments);
    syncPaymentLedgerUi();
    elements.paymentLedgerList.querySelector("[data-payment-entry-id]:last-child input, [data-payment-entry-id]:last-child textarea")?.focus();
}

function handlePaymentLedgerListClick(event) {
    const removeButton = event.target.closest("[data-remove-payment-entry]");
    if (!removeButton || !elements.paymentLedgerList) {
        return;
    }

    requestEditorPaymentDelete(removeButton.dataset.removePaymentEntry);
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
        doc.payments = String(doc.type || "").toLowerCase() === "invoice"
            ? normalizeInvoicePayments(doc.payments)
            : [];
        doc.paymentStatus = String(doc.type || "").toLowerCase() === "invoice"
            ? getInvoiceDerivedPaymentStatus(doc)
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
            payments: Array.isArray(doc.payments) && doc.payments.length ? doc.payments : existingDoc.payments,
            total: Number(doc.total || existingDoc.total || 0),
            subtotal: Number(doc.subtotal || existingDoc.subtotal || 0)
        };
    });

    return consolidated;
}

function normalizeClientContacts(raw) {
    if (!Array.isArray(raw)) return [];
    return raw.map(c => ({
        id: c?.id || `contact-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: c?.name || "",
        email: c?.email || "",
        phone: c?.phone || "",
        isWhatsapp: Boolean(c?.isWhatsapp)
    })).filter(c => c.name || c.email || c.phone);
}

function normalizeClients(clients) {
    const validClients = (Array.isArray(clients) ? clients : [])
        .map(client => ({
            id: client?.id || `client-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            name: client?.name || "",
            address: client?.address || "",
            consigneeName: client?.consigneeName || "",
            consigneeAddress: client?.consigneeAddress || "",
            contacts: normalizeClientContacts(client?.contacts)
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
    renderStatementsPage();
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
        renderStatementsPage();
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
    downloadBlobFile(filename, blob);
}

function downloadJSONFile(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    downloadBlobFile(filename, blob);
}

function downloadBlobFile(filename, blob) {
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
        version: 2,
        documents: state.documents,
        clients: state.clients,
        workspace: {
            userAccounts: state.userAccounts,
            issueReports: state.issueReports,
            companyProfile: state.companyProfile,
            catalogItems: state.catalogItems,
            statementExports: state.statementExports,
            sessionLogs: state.sessionLogs,
            activityLogs: state.activityLogs
        }
    });
    closeSettingsModal();
    setImportStatus("Full workspace backup exported. Keep the JSON file somewhere safe.");
}

const LOCAL_SNAPSHOT_KEY = "app_autosnapshots";
const MAX_LOCAL_SNAPSHOTS = 3;

function saveLocalSnapshot() {
    if (!state.documents.length && !state.clients.length) {
        return;
    }
    try {
        const snap = {
            savedAt: new Date().toISOString(),
            documents: state.documents,
            clients: state.clients,
            statementExports: state.statementExports || []
        };
        const existing = loadLocalSnapshots();
        existing.unshift(snap);
        localStorage.setItem(LOCAL_SNAPSHOT_KEY, JSON.stringify(existing.slice(0, MAX_LOCAL_SNAPSHOTS)));
    } catch (e) {
        // localStorage full — skip silently
    }
}

function loadLocalSnapshots() {
    try {
        return JSON.parse(localStorage.getItem(LOCAL_SNAPSHOT_KEY) || "[]");
    } catch (e) {
        return [];
    }
}

function renderSnapshotsList() {
    const container = document.getElementById("snapshotsList");
    if (!container) {
        return;
    }
    const snapshots = loadLocalSnapshots();
    const panel = document.getElementById("snapshotsPanel");
    if (panel) {
        panel.hidden = !isAdminSession();
    }
    if (!snapshots.length) {
        container.innerHTML = `<p class="snapshot-empty">No local snapshots yet. They are created automatically after each save.</p>`;
        return;
    }
    container.innerHTML = snapshots.map((snap, index) => {
        const date = new Date(snap.savedAt);
        const label = date.toLocaleString();
        const docCount = (snap.documents || []).length;
        const clientCount = (snap.clients || []).length;
        return `
        <div class="snapshot-row">
            <div class="snapshot-row-info">
                <strong class="snapshot-row-date">${escapeHtml(label)}</strong>
                <span class="snapshot-row-meta">${docCount} doc${docCount !== 1 ? "s" : ""} · ${clientCount} client${clientCount !== 1 ? "s" : ""}</span>
            </div>
            <div class="snapshot-row-actions">
                <button class="btn btn-secondary" type="button" data-snapshot-action="download" data-snapshot-index="${index}">Download</button>
                <button class="btn btn-secondary" type="button" data-snapshot-action="restore" data-snapshot-index="${index}">Restore</button>
            </div>
        </div>`;
    }).join("");
}

async function handleSnapshotAction(button) {
    const index = Number(button.dataset.snapshotIndex);
    const snapshots = loadLocalSnapshots();
    const snap = snapshots[index];
    if (!snap) {
        return;
    }
    const action = button.dataset.snapshotAction;
    if (action === "download") {
        const stamp = new Date(snap.savedAt).toISOString().slice(0, 19).replace(/[:T]/g, "-");
        downloadJSONFile(`santosync-snapshot-${stamp}.json`, {
            exportedAt: snap.savedAt,
            version: 2,
            documents: snap.documents,
            clients: snap.clients,
            workspace: { statementExports: snap.statementExports }
        });
        return;
    }
    if (action === "restore") {
        const dateLabel = new Date(snap.savedAt).toLocaleString();
        if (!window.confirm(`Restore data from snapshot saved on ${dateLabel}?\n\nThis will overwrite the current documents and clients on the server.`)) {
            return;
        }
        try {
            const nextDocuments = normalizeDocuments(snap.documents || []);
            const nextClients = normalizeClients(snap.clients || []);
            await Promise.all([
                saveDocumentsToServer(nextDocuments),
                saveClientsToServer(nextClients)
            ]);
            state.documents = nextDocuments;
            state.clients = nextClients;
            renderDocuments();
            renderClientOptions();
            renderClientManagementList();
            setImportStatus(`Snapshot from ${dateLabel} restored successfully.`);
        } catch (error) {
            setImportStatus(`Restore failed: ${error.message}`, true);
        }
    }
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
        const hasWorkspaceBackup = Boolean(payload.workspace) || [
            payload.userAccounts,
            payload.issueReports,
            payload.companyProfile,
            payload.catalogItems,
            payload.statementExports,
            payload.sessionLogs,
            payload.activityLogs
        ].some(value => value !== undefined);
        const nextWorkspaceState = hasWorkspaceBackup
            ? (payload.workspace || {
                userAccounts: payload.userAccounts,
                issueReports: payload.issueReports,
                companyProfile: payload.companyProfile,
                catalogItems: payload.catalogItems,
                statementExports: payload.statementExports,
                sessionLogs: payload.sessionLogs,
                activityLogs: payload.activityLogs
            })
            : null;

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

        if (hasWorkspaceBackup && nextWorkspaceState) {
            applyWorkspaceState(nextWorkspaceState);
            await persistSharedWorkspaceData();
        }

        closeSettingsModal();
        renderClientOptions();
        renderDocuments();
        setImportStatus(hasWorkspaceBackup
            ? "Full workspace backup imported successfully."
            : "Documents and clients backup imported successfully.");
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
    const tags = parseTags(elements.docTags.value);
    const stepContent = getStepContent(state.currentStep);
    const totalSteps = getTotalSteps();
    const currentTotal = formatCurrency(calculateTotals());

    elements.stepIntroTitle.textContent = stepContent.title;
    elements.stepIntroText.textContent = stepContent.text;
    elements.editorProgressStep.textContent = `Step ${state.currentStep} of ${totalSteps}`;
    elements.editorProgressTitle.textContent = stepContent.title;
    elements.editorProgressFill.style.width = `${(state.currentStep / totalSteps) * 100}%`;

    elements.editorMobileSummaryType.textContent = docType;
    elements.editorMobileSummaryRef.textContent = elements.refNumber.value ? `Ref ${elements.refNumber.value}` : t("ref_pending");
    elements.editorMobileSummaryClient.textContent = clientName || t("no_client_selected");
    elements.editorMobileSummaryTotal.textContent = currentTotal;

    syncPaymentLedgerUi();
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
    syncDocumentLibrarySelect();
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
    if (elements.modalHelpPanel) {
        elements.modalHelpPanel.hidden = true;
        elements.modalHelpPanel.setAttribute("aria-hidden", "true");
        elements.modalHelpBtn?.setAttribute("aria-expanded", "false");
    }
    elements.documentModal.classList.remove("review-mode");
    elements.documentModal.classList.remove("final-preview-mode");
    elements.documentModal.classList.remove("prefilled-edit-mode");
    resetForm();
}

function isUserSavedDocument(doc) {
    return String(doc?.status || "").toLowerCase() === "logged";
}

function getCurrentEditorDocument() {
    return state.editingDocumentId !== null ? getDocumentById(state.editingDocumentId) : null;
}

function canCurrentEditorViewPrint() {
    return isUserSavedDocument(getCurrentEditorDocument());
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

    const saveButtonLabel = state.editingDocumentId !== null ? t("save_changes") : t("save_document");
    elements.saveBtn.innerHTML = getActionButtonMarkup(
        '<img src="/assets/icons/icon-calculator.png" alt="" class="btn-custom-icon">',
        null
    );
    elements.saveBtn.setAttribute("aria-label", saveButtonLabel);
    elements.saveBtn.setAttribute("data-tooltip", saveButtonLabel);
    elements.saveBtn.classList.add("btn-icon-only");
    const pdfLabel = t("save_preview_pdf");
    elements.exportPdfBtn.innerHTML = getActionButtonMarkup(
        '<img src="/assets/icons/icon-pdf.png" alt="" class="btn-custom-icon">',
        null
    );
    elements.exportPdfBtn.setAttribute("aria-label", pdfLabel);
    elements.exportPdfBtn.setAttribute("data-tooltip", pdfLabel);
    syncPaymentLedgerVisibility();
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
    elements.internalNotes.value = "";
    resetPaymentTermsUI();
    elements.includeSignature.checked = true;
    elements.includeStamp.checked = false;
    renderPaymentLedger([]);
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
    elements.internalNotes.value = "";
    resetPaymentTermsUI();
    elements.includeSignature.checked = true;
    elements.includeStamp.checked = false;
    renderPaymentLedger([]);
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
    elements.exportPdfBtn.style.display = step === totalSteps && canCurrentEditorViewPrint() ? "block" : "none";

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

    const itemRow = document.createElement("tr");
    itemRow.className = "item-row";
    itemRow.dataset.itemId = itemId;
    itemRow.dataset.priceDriver = "total";
    itemRow.dataset.itemImageDataUrl = "";
    itemRow.dataset.libraryItemId = "";
    itemRow.dataset.libraryReferenceId = "";
    itemRow.innerHTML = `
        <td class="it-num">
            <span class="item-drag-handle" title="Drag to reorder" aria-hidden="true">
                <svg viewBox="0 0 10 14" fill="currentColor"><circle cx="3" cy="2" r="1.2"/><circle cx="7" cy="2" r="1.2"/><circle cx="3" cy="7" r="1.2"/><circle cx="7" cy="7" r="1.2"/><circle cx="3" cy="12" r="1.2"/><circle cx="7" cy="12" r="1.2"/></svg>
            </span>
            <span class="item-number">${state.itemCounter}</span>
        </td>
        <td class="it-desc">
            <textarea class="item-description" placeholder="Describe the item or service..."></textarea>
            <div class="item-image-group">
                <div class="item-image-uploader">
                    <label class="item-image-upload-btn" for="itemImageInput-${itemId}" aria-label="Upload item image" title="Upload item image">
                        <input type="file" id="itemImageInput-${itemId}" class="item-image-input" accept="image/jpeg,image/png,image/webp" hidden>
                        <span class="item-image-upload-art" aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                                <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 16.5z" fill="none" stroke="currentColor" stroke-width="1.7"/>
                                <path d="M8 15l2.4-2.4a1 1 0 0 1 1.4 0l1.1 1.1 2.1-2.1a1 1 0 0 1 1.4 0L19 14.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="10" cy="9.5" r="1.2" fill="currentColor"/>
                            </svg>
                        </span>
                        <span class="item-image-upload-copy">
                            <strong>Item image</strong>
                            <small>Add image</small>
                        </span>
                    </label>
                    <button type="button" class="item-image-remove-btn" hidden aria-label="Remove item image" title="Remove item image">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M6 7h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M9.5 7V5.6c0-.4.3-.6.6-.6h3.8c.3 0 .6.2.6.6V7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                            <path d="M8.2 7l.7 10.2c0 .4.3.8.8.8h4.6c.4 0 .7-.3.8-.8L16 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div class="item-image-preview" hidden>
                    <img class="item-image-preview-img" alt="Item image preview">
                </div>
            </div>
        </td>
        <td class="it-qty">
            <input type="number" class="item-quantity" value="1" min="0" step="1">
        </td>
        <td class="it-unit">
            <input type="number" class="item-unit-price" value="0.00" min="0" step="0.01" inputmode="decimal">
        </td>
        <td class="it-total">
            <input type="number" class="item-total-price" value="0.00" min="0" step="0.01">
        </td>
        <td class="it-cost">
            <input type="number" class="item-internal-cost" value="0" min="0" step="0.01">
        </td>
        <td class="it-margin">
            <input type="text" class="item-upcharge-percent" value="0.00%" readonly tabindex="-1">
        </td>
        <td class="it-actions">
            <button type="button" class="item-to-proc-btn" data-send-to-proc="${itemId}" aria-label="Add to Procurement Sheet" title="Add to Procurement Sheet">
                <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="5" width="14" height="9" rx="1.5"/><path d="m4.5 9.5 2 2 4-3"/><path d="M5 5V3.5a1.5 1.5 0 0 1 3 0V5"/></svg>
            </button>
            <button type="button" class="item-del-btn" data-remove-item="${itemId}" aria-label="Remove item" title="Remove item">
                <svg viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/></svg>
            </button>
        </td>
    `;

    elements.itemsContainer.appendChild(itemRow);
    itemRow.querySelector(".it-cost").hidden = !state.showInternalPricing;
    itemRow.querySelector(".it-margin").hidden = !state.showInternalPricing;
    updateItemPricing(itemRow);
    syncItemImageUI(itemRow);
    setExpandedItem(itemRow);
    focusItemPrimaryField(itemRow);
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

    const sendToProcButton = event.target.closest("[data-send-to-proc]");
    if (sendToProcButton) {
        showProcSheetPicker(sendToProcButton.dataset.sendToProc, sendToProcButton);
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
    if (!itemRow) return;

    // Cmd/Ctrl+Enter anywhere → add new item
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey) && !event.shiftKey) {
        event.preventDefault();
        addItem();
        return;
    }

    // Enter on a numeric input → advance to next field or add new row
    if (event.key === "Enter" && target.matches("input:not([readonly])")) {
        event.preventDefault();
        const focusable = Array.from(
            itemRow.querySelectorAll("textarea, input:not([readonly]):not([tabindex='-1'])")
        ).filter(el => !el.closest("[hidden]") && !el.hidden);
        const idx = focusable.indexOf(target);
        if (idx >= 0 && idx < focusable.length - 1) {
            focusable[idx + 1].focus();
            focusable[idx + 1].select?.();
        } else {
            addItem();
        }
        return;
    }

    // Tab on last focusable field of last row → add new row
    if (event.key === "Tab" && !event.shiftKey) {
        const isLastRow = !itemRow.nextElementSibling;
        if (isLastRow) {
            const focusable = Array.from(
                itemRow.querySelectorAll("textarea, input:not([readonly]):not([tabindex='-1'])")
            ).filter(el => !el.closest("[hidden]") && !el.hidden);
            if (focusable.length && focusable[focusable.length - 1] === target) {
                event.preventDefault();
                addItem();
            }
        }
    }
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

    const statusCopy = itemRow.querySelector(".item-image-upload-copy small");
    if (statusCopy) statusCopy.textContent = "Optimizing…";

    try {
        itemRow.dataset.itemImageDataUrl = await readImageFileAsDataUrl(file, { maxDimension: 600, quality: 0.85 });
        syncItemImageUI(itemRow);
        if (statusCopy) statusCopy.textContent = "Image ready";
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

function autoResizeTextarea(textarea) {
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
}

function handleItemsChange(event) {
    const activeRow = event?.target?.closest?.(".item-row") || null;
    const isInputEvent = event?.type === "input";
    const activeTarget = event?.target || null;

    if (isInputEvent && activeTarget?.classList?.contains("item-description")) {
        autoResizeTextarea(activeTarget);
    }

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
    // All values are visible inline in the table — no separate summary needed.
}

function documentHasItemImages(doc) {
    return Array.isArray(doc?.items) && doc.items.some(item => Boolean(item?.itemImageDataUrl || item?.imageDataUrl));
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
        const itemImageUrl = item.itemImageDataUrl || item.imageDataUrl || "";

        return `
            <tr>
                <td class="document-item-col-no">${escapeHtml(item.itemNo || index + 1)}</td>
                ${hasItemImages ? `
                <td class="document-item-col-image">
                    ${itemImageUrl
                        ? `<div class="document-item-thumb"><img src="${escapeHtml(itemImageUrl)}" alt="${escapeHtml(item.description || `Item ${index + 1}`)}"></div>`
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
        const numCell = row.querySelector(".item-number");
        if (numCell) numCell.textContent = String(index + 1);
    });
}

// ─── Drag-to-reorder ────────────────────────────────────────────

let _dragRow = null;
let _dragOverRow = null;
let _dragDropBefore = false;

function handleItemDragPointerDown(event) {
    const onHandle = Boolean(event.target.closest(".item-drag-handle"));
    elements.itemsContainer.querySelectorAll(".item-row").forEach(row => {
        row.setAttribute("draggable", onHandle ? "true" : "false");
    });
}

function handleItemDragStart(event) {
    const row = event.target.closest(".item-row");
    if (!row || row.getAttribute("draggable") !== "true") {
        event.preventDefault();
        return;
    }
    _dragRow = row;
    row.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", row.dataset.itemId || "");
}

function handleItemDragOver(event) {
    if (!_dragRow) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";

    const row = event.target.closest(".item-row");
    _clearDropIndicators();
    if (!row || row === _dragRow) return;

    const rect = row.getBoundingClientRect();
    _dragDropBefore = event.clientY < rect.top + rect.height / 2;
    row.classList.add(_dragDropBefore ? "drop-before" : "drop-after");
    _dragOverRow = row;
}

function handleItemDragLeave(event) {
    if (!event.relatedTarget || !event.relatedTarget.closest("#itemsContainer")) {
        _clearDropIndicators();
        _dragOverRow = null;
    }
}

function handleItemDrop(event) {
    event.preventDefault();
    if (!_dragRow || !_dragOverRow) { _clearDragState(); return; }
    const target = _dragDropBefore ? _dragOverRow : _dragOverRow.nextSibling;
    elements.itemsContainer.insertBefore(_dragRow, target);
    _clearDragState();
    refreshItemOrdering();
    calculateTotals();
    queueDraftAutosave();
}

function handleItemDragEnd() {
    _clearDragState();
}

function _clearDropIndicators() {
    elements.itemsContainer.querySelectorAll(".drop-before, .drop-after").forEach(r => {
        r.classList.remove("drop-before", "drop-after");
    });
}

function _clearDragState() {
    if (_dragRow) {
        _dragRow.classList.remove("is-dragging");
        _dragRow.setAttribute("draggable", "false");
    }
    _clearDropIndicators();
    _dragRow = null;
    _dragOverRow = null;
    _dragDropBefore = false;
}

function setExpandedItem(targetRow) {
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
    const subtotalCell = document.getElementById("itemsSubtotalCell");
    if (subtotalCell) subtotalCell.textContent = formatCurrency(subtotal);
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
            itemImageDataUrl: row.dataset.itemImageDataUrl || "",
            libraryItemId: row.dataset.libraryItemId || "",
            libraryReferenceId: row.dataset.libraryReferenceId || ""
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
        internalNotes: elements.internalNotes.value,
        paymentTerms: elements.paymentTerms.value,
        paymentTermsMode: getPaymentTermsModeFromUI(),
        paymentTermsDays: parseInt(elements.paymentTermsDays?.value, 10) || 45,
        includeSignature: elements.includeSignature.checked,
        includeStamp: elements.includeStamp.checked,
        payments: elements.docType.value === "invoice"
            ? normalizeInvoicePayments(readPaymentEntriesFromEditor())
            : [],
        printedAt: elements.docDate.value ? `${elements.docDate.value}T12:00:00.000Z` : new Date().toISOString(),
        subtotal,
        total: subtotal,
        items
    };
}

function buildInvoicePaymentSummaryMarkup(doc) {
    if (doc.type !== "invoice") {
        return "";
    }

    const payments = getInvoicePayments(doc);
    const paidTotal = getInvoicePaymentsTotal(doc);
    const balance = getInvoiceOutstandingBalance(doc);
    const statusLabel = getPaymentStatusLabel(getInvoiceDerivedPaymentStatus(doc));

    return `
        <div class="document-payment-summary">
            <div class="document-payment-head">
                <div>
                    <span class="document-payment-label">Payments Applied</span>
                    <strong class="document-payment-status">${escapeHtml(statusLabel)}</strong>
                </div>
                <div class="document-payment-metrics">
                    <span><strong>Paid:</strong> USD $ ${escapeHtml(formatAmount(paidTotal))}</span>
                    <span><strong>Balance:</strong> USD $ ${escapeHtml(formatAmount(balance))}</span>
                </div>
            </div>
            ${payments.length
                ? `<table class="document-payment-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Method</th>
                            <th>Reference</th>
                            <th>Notes</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${payments.map(payment => `
                            <tr>
                                <td>${escapeHtml(formatDisplayDate(payment.date) || payment.date || "—")}</td>
                                <td>${escapeHtml(payment.method || "—")}</td>
                                <td>${escapeHtml(payment.reference || "—")}</td>
                                <td>${escapeHtml(payment.notes || "—")}</td>
                                <td>USD $ ${escapeHtml(formatAmount(payment.amount || 0))}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>`
                : `<div class="document-payment-empty">No payments or advances have been applied to this invoice yet.</div>`}
        </div>
    `;
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
                    <div class="issued-to-label"><strong>${escapeHtml(t("client_consignee"))}:</strong></div>
                    <div class="issued-to-value compact-party-value">
                        ${doc.consigneeName || doc.consigneeAddress
                            ? `${escapeHtml(doc.consigneeName || t("consignee_pending"))}${doc.consigneeAddress ? `<br>${escapeHtml(doc.consigneeAddress).replace(/\n/g, "<br>")}` : ""}`
                            : `<em>${escapeHtml(t("not_provided"))}</em>`}
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

            ${buildInvoicePaymentSummaryMarkup(doc)}

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

            ${buildInvoicePaymentSummaryMarkup(doc)}

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
    elements.previewContainer.innerHTML = buildDocumentMarkup(doc, stampStyle, { printPreview: true });
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

    if (!canCurrentEditorViewPrint()) {
        window.alert("Save this document first to unlock View / Print.");
        return;
    }

    openPrintWindow(buildDocumentData());
}

function generateDocumentDiff(oldDoc, newDoc) {
    if (!oldDoc || !newDoc) return [];
    const changes = [];

    if ((oldDoc.clientName || "") !== (newDoc.clientName || "")) {
        changes.push(`Changed client from "${oldDoc.clientName || "—"}" to "${newDoc.clientName || "—"}"`);
    }
    if ((oldDoc.date || "") !== (newDoc.date || "")) {
        changes.push(`Changed date from ${oldDoc.date || "—"} to ${newDoc.date || "—"}`);
    }
    if ((oldDoc.poNumber || "") !== (newDoc.poNumber || "")) {
        if (newDoc.poNumber) changes.push(`Set PO number to "${newDoc.poNumber}"`);
        else changes.push("Removed PO number");
    }
    if ((oldDoc.notes || "") !== (newDoc.notes || "")) {
        changes.push("Updated document notes");
    }
    if ((oldDoc.internalNotes || "") !== (newDoc.internalNotes || "")) {
        changes.push("Updated internal notes");
    }
    if ((oldDoc.type || "") !== (newDoc.type || "")) {
        const oldLabel = oldDoc.type === "quote" ? "Quote" : "Invoice";
        const newLabel = newDoc.type === "quote" ? "Quote" : "Invoice";
        changes.push(`Converted from ${oldLabel} to ${newLabel}`);
    }
    if (newDoc.type === "invoice" && (oldDoc.paymentStatus || "") !== (newDoc.paymentStatus || "")) {
        changes.push(`Payment status changed to "${newDoc.paymentStatus || "—"}"`);
    }
    const oldTags = (Array.isArray(oldDoc.tags) ? [...oldDoc.tags] : []).sort().join(",");
    const newTags = (Array.isArray(newDoc.tags) ? [...newDoc.tags] : []).sort().join(",");
    if (oldTags !== newTags) changes.push("Updated tags");

    const oldTotal = Number(oldDoc.total || 0);
    const newTotal = Number(newDoc.total || 0);
    if (Math.abs(oldTotal - newTotal) > 0.005) {
        changes.push(`Total changed from ${formatCurrency(oldTotal)} to ${formatCurrency(newTotal)}`);
    }

    // Line items diff (quote / invoice)
    if (newDoc.type !== "procurement") {
        const oldItems = Array.isArray(oldDoc.items) ? oldDoc.items : [];
        const newItems = Array.isArray(newDoc.items) ? newDoc.items : [];
        const getKey = i => String(i.description || "").split("\n")[0].trim().toLowerCase();
        const oldByKey = new Map(oldItems.map(i => [getKey(i), i]));
        const newByKey = new Map(newItems.map(i => [getKey(i), i]));
        const added = newItems.filter(i => !oldByKey.has(getKey(i)));
        const removed = oldItems.filter(i => !newByKey.has(getKey(i)));
        if (added.length === 1) {
            const name = String(added[0].description || "").split("\n")[0].trim();
            const fromLib = added[0].libraryItemId ? " (from Pricing Library)" : "";
            changes.push(`Added item: "${name}"${fromLib}`);
        } else if (added.length > 1) {
            const fromLib = added.some(i => i.libraryItemId) ? " (includes Pricing Library items)" : "";
            changes.push(`Added ${added.length} items${fromLib}`);
        }
        if (removed.length === 1) {
            changes.push(`Removed item: "${String(removed[0].description || "").split("\n")[0].trim()}"`);
        } else if (removed.length > 1) {
            changes.push(`Removed ${removed.length} items`);
        }
        let priceChanges = 0, qtyChanges = 0;
        for (const [key, oldItem] of oldByKey) {
            const newItem = newByKey.get(key);
            if (!newItem) continue;
            if (Math.abs((Number(oldItem.unitPrice) || 0) - (Number(newItem.unitPrice) || 0)) > 0.005) priceChanges++;
            if ((Number(oldItem.quantity) || 0) !== (Number(newItem.quantity) || 0)) qtyChanges++;
        }
        if (priceChanges > 0) changes.push(`Updated price on ${priceChanges} item${priceChanges > 1 ? "s" : ""}`);
        if (qtyChanges > 0) changes.push(`Updated quantity on ${qtyChanges} item${qtyChanges > 1 ? "s" : ""}`);
    }

    // Procurement rows diff
    if (newDoc.type === "procurement") {
        const oldRows = Array.isArray(oldDoc.procurementItems) ? oldDoc.procurementItems : [];
        const newRows = Array.isArray(newDoc.procurementItems) ? newDoc.procurementItems : [];
        const diff = newRows.length - oldRows.length;
        if (diff > 0) changes.push(`Added ${diff} procurement row${diff > 1 ? "s" : ""}`);
        else if (diff < 0) changes.push(`Removed ${Math.abs(diff)} procurement row${Math.abs(diff) > 1 ? "s" : ""}`);
        let rowChanges = 0;
        const checkCount = Math.min(oldRows.length, newRows.length);
        for (let i = 0; i < checkCount; i++) {
            const o = oldRows[i], n = newRows[i];
            if ((o.description || "") !== (n.description || "") ||
                String(o.quantity || "") !== String(n.quantity || "") ||
                Math.abs((Number(o.unitPrice) || 0) - (Number(n.unitPrice) || 0)) > 0.005) {
                rowChanges++;
            }
        }
        if (rowChanges > 0) changes.push(`Updated ${rowChanges} row${rowChanges > 1 ? "s" : ""}`);
    }

    return changes;
}

function appendDocumentChangeHistory(doc, oldDoc, overrideChanges = null) {
    const changes = overrideChanges ?? generateDocumentDiff(oldDoc, doc);
    if (!changes.length) return doc;
    const entry = {
        id: `hist-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        timestamp: new Date().toISOString(),
        userId: state.currentUser?.userId || "",
        user: state.currentUser?.displayName || "System",
        changes
    };
    const existing = Array.isArray(doc.changeHistory) ? doc.changeHistory : [];
    doc.changeHistory = [...existing, entry];
    return doc;
}

async function persistDocument(options = {}) {
    const {
        silent = false,
        keepOpen = false,
        forceDraft = false
    } = options;
    const isEditing = state.editingDocumentId !== null;
    const existingDocument = isEditing ? getDocumentById(state.editingDocumentId) : null;
    const nextStatus = forceDraft
        ? (isUserSavedDocument(existingDocument) ? "logged" : "draft")
        : "logged";
    const doc = {
        ...(existingDocument || {}),
        id: state.editingDocumentId ?? Date.now(),
        type: elements.docType.value,
        status: nextStatus,
        paymentStatus: elements.docType.value === "invoice"
            ? normalizePaymentStatus(existingDocument?.paymentStatus)
            : null,
        payments: elements.docType.value === "invoice"
            ? normalizeInvoicePayments(readPaymentEntriesFromEditor())
            : [],
        refNumber: elements.refNumber.value,
        date: elements.docDate.value,
        clientName: elements.clientName.value,
        clientAddress: elements.clientAddress.value,
        consigneeName: elements.consigneeName.value,
        consigneeAddress: elements.consigneeAddress.value,
        poNumber: elements.poNumber.value,
        tags: parseTags(elements.docTags.value),
        notes: elements.notes.value,
        internalNotes: elements.internalNotes.value,
        paymentTerms: elements.paymentTerms.value,
        paymentTermsMode: getPaymentTermsModeFromUI(),
        paymentTermsDays: parseInt(elements.paymentTermsDays?.value, 10) || 45,
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
            itemImageDataUrl: row.dataset.itemImageDataUrl || "",
            libraryItemId: row.dataset.libraryItemId || "",
            libraryReferenceId: row.dataset.libraryReferenceId || ""
        });
    });

    doc.subtotal = calculateTotals();
    doc.total = doc.subtotal;
    doc.payments = doc.type === "invoice" ? normalizeInvoicePayments(readPaymentEntriesFromEditor()) : [];
    doc.paymentStatus = doc.type === "invoice"
        ? getInvoiceDerivedPaymentStatus(doc)
        : null;

    if (!forceDraft) {
        appendDocumentChangeHistory(doc, existingDocument, isEditing ? null : ["Document created"]);
    }

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
        if (!forceDraft) {
            saveLocalSnapshot();
        }
        // Skip the full re-render during a silent background autosave — it rebuilds the
        // document list DOM while the user is actively typing, causing the modal to scroll
        // back to the top via goToStep → resetDocumentModalViewport below.
        if (!silent || !keepOpen) {
            renderDocuments();
        }
        recordActivity(
            isEditing ? "updated document" : "created document",
            `${doc.type === "quote" ? "Quote" : "Invoice"} ${doc.refNumber} for ${doc.clientName || "unknown client"}.`
        );

        if (!forceDraft && !silent) {
            const docRef = { docId: String(doc.id), docRefNumber: doc.refNumber, docType: doc.type, date: doc.date, clientName: doc.clientName || "" };
            const docCatalogItems = (doc.items || [])
                .filter(item => String(item.description || "").trim())
                .map(item => ({
                    name: String(item.description).trim(),
                    unitPrice: Number.parseFloat(item.unitPrice || item.price) || 0,
                    currency: "USD"
                }));
            upsertItemsIntoCatalog(docCatalogItems, docRef).catch(() => {});
            const docLabel = doc.type === "quote" ? "Quote" : "Invoice";
            const hasRowImages = (doc.items || []).some(item => Boolean(item.itemImageDataUrl));
            setImportStatus(`${docLabel} ${doc.refNumber} saved and Pricing Library updated.${hasRowImages ? " Images saved." : ""}`);
        }
    } catch (error) {
        if (!silent) {
            alert(`Unable to save this ${doc.type} to the server.\n\n${error.message}`);
        }
        return;
    }

    if (keepOpen) {
        updateModalTitle();
        // Don't call goToStep during a silent autosave — goToStep calls
        // resetDocumentModalViewport which forces modalBody.scrollTop = 0,
        // jumping the editor to the top while the user is mid-edit.
        if (!silent) {
            goToStep(state.currentStep);
        }
        updateEditorSummary();
        if (!silent) {
            const docLabel = doc.type === "quote" ? "Quote" : "Invoice";
            const hint = canCurrentEditorViewPrint() ? "" : " View / Print unlocks on Step 6.";
            setImportStatus(`${docLabel} saved.${hint}`);
        }
        return;
    }

    closeModal();
    if (!silent) {
        const docLabel = doc.type === "quote" ? "Quote" : "Invoice";
        const actionLabel = isEditing ? "updated" : "saved";
        alert(`${docLabel} ${actionLabel} successfully.`);
    }
}

async function saveDocumentOnly() {
    clearDraftAutosaveTimer();
    if (!validateDocumentForSave()) {
        return;
    }
    await persistDocument({
        exportAfterSave: false,
        keepOpen: state.currentStep === getTotalSteps()
    });
}

function saveAndExportDocument() {
    if (!canCurrentEditorViewPrint()) {
        window.alert("Save this document first — View / Print is available on Step 6 after saving.");
        return;
    }
    openPrintWindow(buildDocumentData());
    setImportStatus("Preview opened in a new window.");
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
        .filter(doc => doc.type === "invoice")
        .reduce((sum, doc) => sum + getInvoicePaymentsTotal(doc), 0);
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
    elements.totalDocumentsStat.textContent = String(state.documents.length);
    elements.quoteCountStat.textContent = String(quoteCount);
    elements.totalValueStat.textContent = formatCurrency(totalValue);
    elements.totalValueLabel.textContent = t(currentLabelKey);
    elements.totalValueHint.textContent = "";
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

function toggleValueView(isManual = false) {
    state.valueView = state.valueView === "pipeline"
        ? "invoiced"
        : state.valueView === "invoiced"
            ? "income"
            : "pipeline";
    updateOverviewStats();
    elements.valueToggleCard.classList.remove("is-pulsing");
    void elements.valueToggleCard.offsetWidth;
    elements.valueToggleCard.classList.add("is-pulsing");
    if (isManual) {
        stopValueViewCycle();
        startValueViewCycle();
    }
}

function startValueViewCycle() {
    stopValueViewCycle();
    state.valueViewInterval = setInterval(() => toggleValueView(false), 3000);
}

function stopValueViewCycle() {
    if (state.valueViewInterval) {
        clearInterval(state.valueViewInterval);
        state.valueViewInterval = null;
    }
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

function isDocumentSelected(id) {
    return state.selectedDocumentIds.some(entry => isSameDocumentId(entry, id));
}

function getSelectedDocuments() {
    return state.selectedDocumentIds
        .map(getDocumentById)
        .filter(Boolean);
}

function slugifyFilePart(value, fallback = "document") {
    const normalized = String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return normalized || fallback;
}

function getTodayStamp() {
    return new Date().toISOString().slice(0, 10);
}

function getDocumentPdfFileName(doc) {
    const referencePart = slugifyFilePart(doc?.refNumber || doc?.type || "document", doc?.type || "document");
    const clientPart = slugifyFilePart(doc?.clientName || "client", "client");
    const datePart = String(doc?.date || "").trim() || getTodayStamp();
    return `${referencePart}-${clientPart}-${datePart}.pdf`;
}

function getDocumentZipFileName(selectedDocuments = []) {
    const datePart = getTodayStamp();
    const selectedTypes = new Set(selectedDocuments.map(doc => String(doc?.type || "").trim()).filter(Boolean));
    const selectedClients = new Set(selectedDocuments.map(doc => String(doc?.clientName || "").trim()).filter(Boolean));
    if (selectedClients.size === 1) {
        return `santosync-${slugifyFilePart([...selectedClients][0], "client")}-documents-${datePart}.zip`;
    }
    if (selectedTypes.size === 1) {
        return `santosync-${slugifyFilePart([...selectedTypes][0], "documents")}-${datePart}.zip`;
    }
    return `santosync-documents-${datePart}.zip`;
}

function createDocumentExportNode(doc) {
    const stampStyle = getDocumentStampStyle(doc);
    const shell = document.createElement("div");
    shell.className = "pdf-export-shell";
    shell.innerHTML = `
        <div class="pdf-export-page" data-pdf-export-page>
            <div class="pdf-export-scale-wrap" data-pdf-scale-wrap>
                ${buildDocumentMarkup(doc, stampStyle, { printPreview: true })}
            </div>
        </div>
    `;
    const sheet = shell.querySelector(".document-sheet");
    sheet?.classList.add("pdf-export-sheet");
    return shell;
}

function applyPdfFitStrategy(exportNode) {
    const page = exportNode.querySelector("[data-pdf-export-page]");
    const scaleWrap = exportNode.querySelector("[data-pdf-scale-wrap]");
    const sheet = exportNode.querySelector(".pdf-export-sheet");
    if (!page || !scaleWrap || !sheet) {
        return { scaleApplied: 1, usedCompactType: false };
    }

    const maxHeight = 11 * 96;
    let scaleApplied = 1;
    let usedCompactType = false;

    sheet.classList.add("pdf-fit-tight");
    const tightenHeight = sheet.scrollHeight;
    if (tightenHeight > maxHeight) {
        scaleApplied = Math.min(maxHeight / tightenHeight, 1);
        scaleWrap.style.transformOrigin = "top center";
        scaleWrap.style.transform = `scale(${scaleApplied})`;
        page.style.height = `${Math.ceil(tightenHeight * scaleApplied)}px`;
    } else {
        page.style.height = `${tightenHeight}px`;
    }

    if (tightenHeight * scaleApplied > maxHeight) {
        sheet.classList.add("pdf-fit-compact-type");
        usedCompactType = true;
        const compactHeight = sheet.scrollHeight;
        scaleApplied = Math.min(maxHeight / compactHeight, 1);
        scaleWrap.style.transform = `scale(${scaleApplied})`;
        page.style.height = `${Math.ceil(compactHeight * scaleApplied)}px`;
    }

    return { scaleApplied, usedCompactType };
}

async function generateDocumentPdfBlob(doc) {
    if (!window.html2pdf) {
        throw new Error("PDF export is unavailable right now.");
    }

    const exportNode = createDocumentExportNode(doc);
    document.body.appendChild(exportNode);
    try {
        applyPdfFitStrategy(exportNode);
        return await window.html2pdf()
            .set({
                filename: getDocumentPdfFileName(doc),
                margin: [0, 0, 0, 0],
                pagebreak: { mode: ["avoid-all"] },
                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                    logging: false
                },
                jsPDF: {
                    unit: "in",
                    format: "letter",
                    orientation: "portrait"
                }
            })
            .from(exportNode.querySelector("[data-pdf-export-page]"))
            .outputPdf("blob");
    } finally {
        exportNode.remove();
    }
}

async function downloadDocumentPdf(doc) {
    const blob = await generateDocumentPdfBlob(doc);
    downloadBlobFile(getDocumentPdfFileName(doc), blob);
}

async function downloadSelectedDocumentsAsPdf() {
    const selectedDocuments = getSelectedDocuments();
    if (!selectedDocuments.length) {
        window.alert("Select at least one document to download.");
        return;
    }

    const failures = [];

    for (const doc of selectedDocuments) {
        try {
            await downloadDocumentPdf(doc);
        } catch (error) {
            failures.push({
                doc,
                message: error?.message || "Export failed."
            });
        }
    }

    if (failures.length) {
        window.alert(`Downloaded ${selectedDocuments.length - failures.length} PDF(s).\n\nSome documents could not be exported:\n${failures.map(entry => `${entry.doc?.refNumber || "Unknown document"}: ${entry.message}`).join("\n")}`);
    }
}

async function downloadSelectedDocumentsZip() {
    const selectedDocuments = getSelectedDocuments();
    if (!selectedDocuments.length) {
        window.alert("Select at least one document to create a ZIP download.");
        return;
    }

    if (!window.JSZip) {
        throw new Error("ZIP export is unavailable right now.");
    }

    const zip = new window.JSZip();
    const failures = [];

    for (const doc of selectedDocuments) {
        try {
            const blob = await generateDocumentPdfBlob(doc);
            zip.file(getDocumentPdfFileName(doc), blob);
        } catch (error) {
            failures.push({
                doc,
                message: error?.message || "Export failed."
            });
        }
    }

    if (!Object.keys(zip.files).length) {
        const details = failures.length
            ? failures.map(entry => `${entry.doc?.refNumber || "Unknown document"}: ${entry.message}`).join("\n")
            : "No PDFs were generated.";
        throw new Error(details);
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    downloadBlobFile(getDocumentZipFileName(selectedDocuments), zipBlob);

    if (failures.length) {
        window.alert(`Downloaded a ZIP with ${selectedDocuments.length - failures.length} PDF(s).\n\nSome documents could not be exported:\n${failures.map(entry => `${entry.doc?.refNumber || "Unknown document"}: ${entry.message}`).join("\n")}`);
    }
}

async function downloadSelectedDocuments() {
    const selectedDocuments = getSelectedDocuments();
    if (!selectedDocuments.length) {
        window.alert("Select at least one document to download.");
        return;
    }

    if (selectedDocuments.length >= BULK_ZIP_THRESHOLD) {
        await downloadSelectedDocumentsZip();
        return;
    }

    await downloadSelectedDocumentsAsPdf();
}

function getStatusBadgeMarkup(label, className = "") {
    return `<span class="status-badge ${className}">${escapeHtml(label)}</span>`;
}

function getCalculatorButtonMarkup() {
    return `<img src="/assets/icons/icon-calculator.png" alt="" class="sidebar-calc-icon"><span class="visually-hidden">Calculator</span>`;
}

function getOverviewSummaryCardMarkup({ label, value, icon = "", tone = "default", targetPage = "overview", targetFilter = "" }) {
    return `
        <button
            class="summary-card summary-card-${escapeHtml(tone)}"
            type="button"
            data-summary-nav="${escapeHtml(targetPage)}"
            ${targetFilter ? `data-summary-filter="${escapeHtml(targetFilter)}"` : ""}
            aria-label="${escapeHtml(`Open ${label}`)}"
        >
            <span class="summary-card-icon" aria-hidden="true">${icon}</span>
            <span class="summary-card-copy">
                <span class="summary-card-label">${escapeHtml(label)}</span>
                <strong class="summary-card-value">${escapeHtml(value)}</strong>
            </span>
            <span class="summary-card-arrow" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none"><path d="M7 5.5 12 10l-5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
        </button>
    `;
}

function getDocumentCardMarkup(doc) {
    const paymentStatus = doc.type === "invoice" ? getInvoiceDerivedPaymentStatus(doc) : "";
    const isProcurement = doc.type === "procurement";
    const canViewPdf = !isProcurement && isUserSavedDocument(doc);
    const statusBadges = [];

    if (doc.status === "draft") {
        statusBadges.push(getStatusBadgeMarkup(t("status_draft"), "is-draft"));
    }

    if (doc.type === "invoice") {
        statusBadges.push(getStatusBadgeMarkup(getPaymentStatusLabel(paymentStatus), `is-${paymentStatus}`));
    } else if (isProcurement) {
        statusBadges.push(getStatusBadgeMarkup("Procurement", "is-draft"));
    }

    const statusMarkup = statusBadges.join("");

    let dueDateMarkup = "";
    if (doc.type === "invoice" && paymentStatus !== "paid") {
        const mode = doc.paymentTermsMode || inferPaymentTermsMode(doc.paymentTerms);
        const daysPastDue = getInvoiceDaysPastDue(doc);
        const overdueText = daysPastDue > 0 ? ` · ${daysPastDue}d overdue` : "";
        const dueCls = daysPastDue > 0 ? " is-overdue" : "";
        if (mode === "immediate") {
            dueDateMarkup = `<div class="document-card-due${dueCls}">Due Upon Receipt${escapeHtml(overdueText)}</div>`;
        } else {
            const termDays = getInvoicePaymentTermDays(doc);
            const dueDate = calculateInvoiceDueDate(doc);
            const dueDateStr = formatDisplayDate(dueDate.toISOString().slice(0, 10));
            dueDateMarkup = `<div class="document-card-due${dueCls}">Due ${escapeHtml(dueDateStr)} · NET${termDays}${escapeHtml(overdueText)}</div>`;
        }
    }

    const internalNotesMarkup = doc.internalNotes
        ? `<div class="document-card-internal-note">${escapeHtml(doc.internalNotes.length > 90 ? doc.internalNotes.slice(0, 90) + "…" : doc.internalNotes)}</div>`
        : "";

    const noteCount = Array.isArray(doc.noteLog) ? doc.noteLog.length : 0;
    const noteBadge = noteCount > 0 ? `<span class="notes-count-badge">${noteCount}</span>` : "";
    const latestNote = noteCount > 0 ? doc.noteLog[noteCount - 1] : null;
    const latestNoteMarkup = latestNote
        ? `<div class="document-card-note-preview"><strong>Latest note:</strong> ${escapeHtml((latestNote.text || "").length > 110 ? `${latestNote.text.slice(0, 110)}…` : latestNote.text || "")}</div>`
        : "";
    const isSelected = isDocumentSelected(doc.id);

    const rowCount = isProcurement ? (doc.procurementItems || []).length : 0;
    const savedDateLabel = isProcurement && doc.printedAt ? ` · Saved ${formatDisplayDate(doc.printedAt)}` : "";
    const totalLabel = isProcurement
        ? `${rowCount} row${rowCount === 1 ? "" : "s"}${savedDateLabel}`
        : formatCurrency(doc.total || 0);

    return `
        <article class="document-card document-card-${doc.type}" data-view-id="${escapeHtml(String(doc.id))}" tabindex="0" role="button" aria-label="${escapeHtml(`Open ${doc.type} ${doc.refNumber || ""}`.trim())}">
            <label class="document-card-selector" aria-label="${escapeHtml(`Select ${doc.refNumber || doc.type}`)}">
                <input type="checkbox" data-doc-select="${escapeHtml(String(doc.id))}" ${isSelected ? "checked" : ""}>
                <span class="document-card-selector-ui" aria-hidden="true"></span>
            </label>
            <div class="document-card-copy">
                <div class="document-card-head">
                    <strong class="document-card-ref">${escapeHtml(doc.refNumber || "Reference pending")}</strong>
                    <div class="document-card-statuses">${statusMarkup}</div>
                </div>
                <div class="document-card-meta">
                    <span class="document-card-client">${escapeHtml(doc.clientName || "Unknown client")}</span>
                    <span class="document-card-date">${escapeHtml(formatDisplayDate(doc.date || ""))}</span>
                    <strong class="document-card-total">${escapeHtml(totalLabel)}</strong>
                </div>
                ${dueDateMarkup}
                ${latestNoteMarkup}
                ${internalNotesMarkup}
            </div>
            <div class="document-card-actions">
                ${canViewPdf ? `
                <button type="button" class="statement-action-btn is-open" data-action="export-pdf" data-id="${escapeHtml(String(doc.id))}" aria-label="Download PDF" title="Download PDF">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v10" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><path d="m8 11 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 19h14" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
                </button>` : ""}
                ${isProcurement ? `
                <button type="button" class="statement-action-btn is-open" data-action="export-excel" data-id="${escapeHtml(String(doc.id))}" aria-label="Export Excel" title="Export Excel">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M14 3v4h4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="m9 10 4 4M13 10l-4 4M9 18h6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </button>
                <button type="button" class="statement-action-btn is-open" data-action="convert" data-id="${escapeHtml(String(doc.id))}" aria-label="Convert to Quote" title="Convert to Quote">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="M14 2v6h6" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><path d="m8 13 3 3 5-5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span class="visually-hidden">Convert to Quote</span>
                </button>` : ""}
                <button type="button" class="statement-action-btn is-edit" data-action="edit" data-id="${escapeHtml(String(doc.id))}" aria-label="${escapeHtml(t("edit"))}" title="${escapeHtml(t("edit"))}">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 20 4.2-1 9.1-9.1a1.9 1.9 0 0 0 0-2.7l-.5-.5a1.9 1.9 0 0 0-2.7 0L5 15.8 4 20Z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="m13.5 7.5 3 3" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>
                </button>
                <button type="button" class="statement-action-btn is-notes${noteCount > 0 ? " has-notes" : ""}" data-action="notes" data-id="${escapeHtml(String(doc.id))}" aria-label="Notes" title="Notes">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    ${noteBadge}
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
                        ${doc.type === "invoice" ? `<button type="button" class="doc-actions-menu-btn" data-action="quick-payment" data-id="${escapeHtml(String(doc.id))}">${ICONS.payment}<span>Add Payment</span></button>` : ""}
                        ${doc.type === "invoice" ? `<button type="button" class="doc-actions-menu-btn" data-action="set-payment-status" data-payment-status="unpaid" data-id="${escapeHtml(String(doc.id))}">${ICONS.circle}<span>${escapeHtml(t("mark_as_unpaid"))}</span></button>` : ""}
                        ${doc.type === "invoice" ? `<button type="button" class="doc-actions-menu-btn" data-action="set-payment-status" data-payment-status="pending" data-id="${escapeHtml(String(doc.id))}">${ICONS.clock}<span>${escapeHtml(t("mark_as_pending"))}</span></button>` : ""}
                        ${doc.type === "invoice" ? `<button type="button" class="doc-actions-menu-btn" data-action="set-payment-status" data-payment-status="paid" data-id="${escapeHtml(String(doc.id))}">${ICONS.checkCircle}<span>${escapeHtml(t("mark_as_paid"))}</span></button>` : ""}
                        ${isProcurement ? `<button type="button" class="doc-actions-menu-btn" data-action="export-csv" data-id="${escapeHtml(String(doc.id))}">${ICONS.fileText}<span>Export CSV</span></button>` : ""}
                        ${isProcurement ? `<button type="button" class="doc-actions-menu-btn" data-action="export-excel" data-id="${escapeHtml(String(doc.id))}">${ICONS.spreadsheet}<span>Export Excel</span></button>` : ""}
                        <button type="button" class="doc-actions-menu-btn" data-action="convert" data-id="${escapeHtml(String(doc.id))}" data-target-type="${doc.type === "quote" ? "invoice" : "quote"}">${ICONS.convert}<span>${escapeHtml(isProcurement ? "Convert to Quote" : t(doc.type === "quote" ? "convert_to_invoice" : "convert_to_quote"))}</span></button>
                        <button type="button" class="doc-actions-menu-btn doc-actions-menu-btn-danger" data-action="delete" data-id="${escapeHtml(String(doc.id))}">${ICONS.trash}<span>${escapeHtml(t("delete"))}</span></button>
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
                    <strong class="overview-document-total">${escapeHtml(doc.type === "procurement" ? `${(doc.procurementItems || []).length} rows` : formatCurrency(doc.total || 0))}</strong>
                </button>
            `).join("")
            : `<div class="empty-state compact-empty-state"><p>${escapeHtml(t("empty_documents"))}</p></div>`;
    }

    if (elements.overviewSummaryGrid) {
        elements.overviewSummaryGrid.innerHTML = [
            getOverviewSummaryCardMarkup({
                label: t("quotes"),
                value: String(state.documents.filter(doc => doc.type === "quote").length),
                tone: "quote",
                targetPage: "documents",
                targetFilter: "quote",
                icon: `<svg viewBox="0 0 20 20" fill="none"><path d="M5 2.5h7l3 3v12H5z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 2.5v3h3" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M7.5 10h5M7.5 13h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
            }),
            getOverviewSummaryCardMarkup({
                label: t("invoices"),
                value: String(state.documents.filter(doc => doc.type === "invoice").length),
                tone: "invoice",
                targetPage: "documents",
                targetFilter: "invoice",
                icon: `<svg viewBox="0 0 20 20" fill="none"><rect x="4" y="3" width="12" height="14" rx="2" stroke="currentColor" stroke-width="1.6"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`
            }),
            getOverviewSummaryCardMarkup({
                label: "Procurement",
                value: String(state.documents.filter(doc => doc.type === "procurement").length),
                tone: "statements",
                targetPage: "documents",
                targetFilter: "procurement",
                icon: `<svg viewBox="0 0 20 20" fill="none"><path d="M3 4h14v12H3z" stroke="currentColor" stroke-width="1.6"/><path d="M3 8h14M7.5 4v12M12.5 4v12" stroke="currentColor" stroke-width="1.4"/></svg>`
            }),
            getOverviewSummaryCardMarkup({
                label: t("clients"),
                value: String(state.clients.length),
                tone: "clients",
                targetPage: "clients",
                icon: `<svg viewBox="0 0 20 20" fill="none"><path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" stroke-width="1.6"/><path d="M4.5 16.5a5.5 5.5 0 0 1 11 0" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`
            }),
            getOverviewSummaryCardMarkup({
                label: t("statements"),
                value: String(state.statementExports.length),
                tone: "statements",
                targetPage: "reports",
                icon: `<svg viewBox="0 0 20 20" fill="none"><path d="M4 4.5h12M4 9.5h12M4 14.5h7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`
            })
        ].join("");
    }
}

function syncDocumentsSelectionToolbar() {
    if (!elements.documentsSelectionToolbar || !elements.documentsSelectionTitle || !elements.documentsSelectionMeta || !elements.downloadSelectedDocumentsZipBtn) {
        return;
    }

    const selectedCount = getSelectedDocuments().length;
    elements.documentsSelectionToolbar.hidden = selectedCount === 0;
    elements.documentsSelectionTitle.textContent = `${selectedCount} document${selectedCount === 1 ? "" : "s"} selected`;
    elements.documentsSelectionMeta.textContent = selectedCount >= BULK_ZIP_THRESHOLD
        ? "Large selections download as a ZIP package."
        : selectedCount === 1
            ? "This selection will download as a PDF."
            : "Small selections download as separate PDFs.";
    elements.downloadSelectedDocumentsZipBtn.disabled = selectedCount === 0;
}

function renderDocuments() {
    updateOverviewStats();
    renderOverviewPanels();
    renderCatalog();
    renderInvoiceReport();
    renderNotesPage();
    const documentIdSet = new Set(state.documents.map(doc => String(doc.id)));
    state.selectedDocumentIds = state.selectedDocumentIds.filter(id => documentIdSet.has(String(id)));

    const visibleDocuments = getFilteredDocuments();
    syncDocumentsSelectionToolbar();

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
    syncDocumentsSelectionToolbar();
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

function openDocumentsPageWithFilter(filter = "all") {
    setActivePage("documents");
    setActiveFilter(filter);
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
    if (event.target.closest(".document-card-selector")) {
        return;
    }

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

        if (action === "notes") {
            openNotesDrawer(docId);
        } else if (action === "edit") {
            const doc = getDocumentById(docId);
            if (doc?.type === "procurement") {
                openProcurementSheetModal(doc);
            } else {
                editDocument(docId);
            }
        } else if (action === "export-pdf") {
            const doc = getDocumentById(docId);
            if (doc) {
                try {
                    setImportStatus(`Preparing ${doc.refNumber || "document"} PDF download...`);
                    await downloadDocumentPdf(doc);
                    setImportStatus(`${doc.refNumber || "Document"} downloaded as PDF.`);
                } catch (error) {
                    window.alert(error.message || "Unable to download this PDF right now.");
                }
            }
        } else if (action === "export-csv") {
            const doc = getDocumentById(docId);
            if (doc?.type === "procurement") {
                downloadTextFile(`${getProcurementFileStem(doc)}.csv`, `${buildProcurementCsv(doc)}\n`, "text/csv;charset=utf-8");
                setImportStatus("Procurement CSV exported.");
            }
        } else if (action === "export-excel") {
            const doc = getDocumentById(docId);
            if (doc?.type === "procurement") {
                try {
                    await downloadProcurementExcel(doc);
                    setImportStatus("Procurement Excel exported.");
                } catch (error) {
                    window.alert(error.message || "Unable to export procurement Excel.");
                }
            }
        } else if (action === "quick-payment") {
            openQuickPaymentModal(docId);
        } else if (action === "set-payment-status") {
            await updateDocumentPaymentStatus(docId, actionButton.dataset.paymentStatus);
        } else if (action === "delete") {
            await deleteDocument(docId);
        } else if (action === "convert") {
            const doc = getDocumentById(docId);
            if (doc?.type === "procurement") {
                const quote = convertProcurementSheetToQuote(doc);
                await saveDocumentsToServer([quote, ...state.documents]);
                renderDocuments();
                editDocument(quote.id);
                setImportStatus(`Created quote ${quote.refNumber} from ${doc.refNumber}.`);
            } else {
                convertDocumentType(docId, actionButton.dataset.targetType || "invoice");
            }
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

    const doc = getDocumentById(card.dataset.viewId);
    if (doc?.type === "procurement") {
        openProcurementSheetModal(doc);
    } else {
        editDocument(card.dataset.viewId);
    }
}

function handleDocumentCardKeydown(event) {
    if (event.target.closest(".document-card-selector, .document-card-actions, [data-show-tags]")) {
        return;
    }

    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    const card = event.target.closest("[data-view-id]");
    if (!card) {
        return;
    }

    event.preventDefault();
    editDocument(card.dataset.viewId);
}

function handleDocumentsGridChange(event) {
    const checkbox = event.target.closest("[data-doc-select]");
    if (!checkbox) {
        return;
    }

    const documentId = String(checkbox.dataset.docSelect || "");
    const nextSelection = new Set(state.selectedDocumentIds.map(String));
    if (checkbox.checked) {
        nextSelection.add(documentId);
    } else {
        nextSelection.delete(documentId);
    }
    state.selectedDocumentIds = [...nextSelection];
    syncDocumentsSelectionToolbar();
}

function selectVisibleDocuments() {
    const visibleIds = getFilteredDocuments().map(doc => String(doc.id));
    state.selectedDocumentIds = Array.from(new Set([...state.selectedDocumentIds.map(String), ...visibleIds]));
    renderDocuments();
}

function clearSelectedDocuments() {
    state.selectedDocumentIds = [];
    renderDocuments();
}

const STATUS_PAYMENT_PREFIX = "status-paid-";

async function updateDocumentPaymentStatus(id, status) {
    const doc = getDocumentById(id);
    if (!doc || doc.type !== "invoice") {
        return;
    }

    const allPayments = getInvoicePayments(doc);
    const realPayments = allPayments.filter(p => !String(p.id).startsWith(STATUS_PAYMENT_PREFIX));

    if (realPayments.length) {
        state.openDocumentMenuId = null;
        renderDocuments();
        window.alert("This invoice already has tracked payments. Update the payment ledger instead of forcing the status.");
        return;
    }

    const nextStatus = normalizePaymentStatus(status);
    if (getInvoiceDerivedPaymentStatus(doc) === nextStatus) {
        state.openDocumentMenuId = null;
        renderDocuments();
        return;
    }

    let nextPayments = [];
    if (nextStatus === "paid" && Number(doc.total || 0) > 0) {
        nextPayments = normalizeInvoicePayments([{
            id: `${STATUS_PAYMENT_PREFIX}${Date.now()}`,
            date: new Date().toISOString().slice(0, 10),
            amount: Number(doc.total),
            method: "Marked as Paid",
            reference: "",
            notes: "Full payment applied via Mark as Paid",
            appliedTo: "invoice",
            createdAt: new Date().toISOString()
        }]);
    }

    const updatedDoc = {
        ...doc,
        paymentStatus: nextStatus,
        payments: nextPayments
    };

    const nextDocuments = state.documents.map(entry =>
        isSameDocumentId(entry.id, id) ? updatedDoc : entry
    );

    try {
        await saveDocumentsToServer(nextDocuments);
        state.openDocumentMenuId = null;
        renderDocuments();
        renderPaymentHistoryPanel();
        renderStatementsPage();
    } catch (error) {
        alert(`Unable to update invoice payment status.\n\n${error.message}`);
    }
}

function getStatementLinkedInvoices(statement) {
    const sourceIds = new Set(
        (Array.isArray(statement.payload?.sourceInvoiceIds) ? statement.payload.sourceInvoiceIds : []).map(String)
    );
    const statementInvoiceRefs = new Set(
        ((statement.payload?.rows) || [])
            .map(r => String(r.invoiceNumber || "").trim().toLowerCase())
            .filter(Boolean)
    );
    return state.documents.filter(doc =>
        doc.type === "invoice" && (
            sourceIds.has(String(doc.id)) ||
            (sourceIds.size === 0 && statementInvoiceRefs.has(String(doc.refNumber || "").trim().toLowerCase()))
        )
    );
}

function getStatementForInvoiceId(invoiceId) {
    const idStr = String(invoiceId);
    return state.statementExports.find(stmt => {
        const sourceIds = (Array.isArray(stmt.payload?.sourceInvoiceIds) ? stmt.payload.sourceInvoiceIds : []).map(String);
        return sourceIds.includes(idStr);
    }) || null;
}

async function markStatementAsPaid(statementId) {
    const statement = state.statementExports.find(s => s.id === statementId);
    if (!statement) { return; }

    const linkedInvoices = getStatementLinkedInvoices(statement);
    const unpaidInvoices = linkedInvoices.filter(doc => getInvoiceOutstandingBalance(doc) > 0);

    if (!unpaidInvoices.length) {
        window.alert("All invoices on this statement are already fully paid.");
        return;
    }

    const confirmed = window.confirm(
        `Mark ${unpaidInvoices.length} unpaid invoice${unpaidInvoices.length === 1 ? "" : "s"} on statement ${statement.referenceNumber || ""} as fully paid?`
    );
    if (!confirmed) { return; }

    const now = new Date().toISOString();
    const today = now.slice(0, 10);

    const nextDocuments = state.documents.map(doc => {
        if (!unpaidInvoices.some(inv => isSameDocumentId(inv.id, doc.id))) { return doc; }
        const outstanding = getInvoiceOutstandingBalance(doc);
        if (outstanding <= 0) { return doc; }
        const existingReal = getInvoicePayments(doc).filter(p => !String(p.id).startsWith(STATUS_PAYMENT_PREFIX));
        const newPayment = normalizeInvoicePayments([{
            id: `${STATUS_PAYMENT_PREFIX}${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            date: today,
            amount: outstanding,
            method: "Marked as Paid",
            reference: "",
            notes: `Paid via statement ${statement.referenceNumber || statementId}`,
            appliedTo: "invoice",
            createdAt: now
        }]);
        return { ...doc, paymentStatus: "paid", payments: [...existingReal, ...newPayment] };
    });

    try {
        await saveDocumentsToServer(nextDocuments);
        renderDocuments();
        renderPaymentHistoryPanel();
        renderStatementsPage();
        setImportStatus(`${unpaidInvoices.length} invoice${unpaidInvoices.length === 1 ? "" : "s"} marked as paid.`);
    } catch (error) {
        alert(`Unable to mark invoices as paid.\n\n${error.message}`);
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
    elements.internalNotes.value = doc.internalNotes || "";
    loadPaymentTermsIntoEditor(doc);
    elements.includeSignature.checked = doc.includeSignature !== false;
    elements.includeStamp.checked = Boolean(doc.includeStamp);
    renderPaymentLedger(doc.type === "invoice" ? doc.payments : []);

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
        lastItem.dataset.itemImageDataUrl = item.itemImageDataUrl || item.imageDataUrl || "";
        lastItem.dataset.libraryItemId = item.libraryItemId || "";
        lastItem.dataset.libraryReferenceId = item.libraryReferenceId || "";
        updateItemPricing(lastItem);
        syncItemImageUI(lastItem);
        updateItemSummary(lastItem);
    });

    syncInternalPricingVisibility();
    window.requestAnimationFrame(() => {
        elements.itemsContainer.querySelectorAll(".item-description").forEach(autoResizeTextarea);
        calculateTotals();
    });
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
            : null,
        payments: nextType === "invoice"
            ? normalizeInvoicePayments(doc.payments)
            : []
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

    const docLabel = doc.type === "procurement" ? "procurement sheet" : doc.type === "quote" ? "quote" : "invoice";
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
