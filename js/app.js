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
    sortOrder: "date_desc",
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
    activePage: "documents",
    issueReports: [],
    companyProfile: null,
    exchangeRateUsdToDop: 59,
    savedItems: [],
    catalogItems: [],
    editingSavedItemId: null,
    editingCatalogItemId: null,
    pendingSavedItemImageUploadId: null,
    openItemMenuId: null,
    openDocumentMenuId: null,
    draftAutosaveTimerId: null
};

const DOP_PER_USD = 59;
const DEFAULT_PAYMENT_TERMS = "NET15 : Full payment for goods or services is due within 15 calendar days of the invoice date, aligned with shipping or completion.";
const DEFAULT_ADMIN_USER = Object.freeze({
    id: "admin-root",
    username: "admin",
    displayName: "Admin",
    password: "Todos123",
    role: "admin",
    language: "en"
});
const USER_ACCOUNTS_STORAGE_KEY = "todosUserAccounts";
const CURRENT_SESSION_STORAGE_KEY = "todosCurrentSession";
const ISSUE_REPORTS_STORAGE_KEY = "todosIssueReports";
const COMPANY_PROFILE_STORAGE_KEY = "santosyncCompanyProfile";
const SAVED_ITEMS_STORAGE_KEY = "santosyncSavedItems";
const CATALOG_ITEMS_STORAGE_KEY = "santosyncCatalogItems";
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
    taxId: "Registration Pending"
});
const TRANSLATIONS = {
    en: {
        language_name: "English",
        role_admin: "Admin",
        role_user: "User",
        login_kicker: "Workspace Sign In",
        login_title: BRAND.onboardingTitle,
        login_copy: BRAND.onboardingCopy,
        username: "Username",
        username_placeholder: "Enter username",
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
        payment_paid: "Paid",
        payment_unpaid: "Unpaid",
        mark_as_paid: "Mark As Paid",
        mark_as_unpaid: "Mark As Unpaid",
        local_mode: "LOCAL MODE",
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
        sort_date_desc: "Date: Newest First",
        sort_date_asc: "Date: Oldest First",
        sort_created_desc: "Created: Newest First",
        sort_created_asc: "Created: Oldest First",
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
        save_preview_pdf: "Save & Preview PDF",
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
        workflow_tip_copy: "Keep line items concise and use keywords like destination, service type, or priority to make search much easier later."
    },
    es: {
        language_name: "Español",
        role_admin: "Administrador",
        role_user: "Usuario",
        login_kicker: "Ingreso al Espacio",
        login_title: `Entrar a ${BRAND.name}`,
        login_copy: "Inicia sesión con una cuenta local para crear, editar y gestionar cotizaciones y facturas con una presentación premium y sincronizada.",
        username: "Usuario",
        username_placeholder: "Ingresa el usuario",
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
        payment_paid: "Pagada",
        payment_unpaid: "No Pagada",
        mark_as_paid: "Marcar como Pagada",
        mark_as_unpaid: "Marcar como No Pagada",
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
        sort_date_desc: "Fecha: más reciente primero",
        sort_date_asc: "Fecha: más antigua primero",
        sort_created_desc: "Creado: más reciente primero",
        sort_created_asc: "Creado: más antiguo primero",
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
        save_preview_pdf: "Guardar y Ver PDF",
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
        workflow_tip_copy: "Mantén las líneas concisas y usa palabras clave como destino, tipo de servicio o prioridad para facilitar la búsqueda."
    },
    fr: {
        language_name: "Français",
        role_admin: "Administrateur",
        role_user: "Utilisateur",
        login_kicker: "Connexion à l’Espace",
        login_title: `Entrer dans ${BRAND.name}`,
        login_copy: "Connectez-vous avec un compte local pour créer, modifier et gérer des devis et factures avec une identité plus premium et cohérente.",
        username: "Nom d’utilisateur",
        username_placeholder: "Entrez le nom d’utilisateur",
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
        payment_paid: "Payee",
        payment_unpaid: "Non Payee",
        mark_as_paid: "Marquer comme Payee",
        mark_as_unpaid: "Marquer comme Non Payee",
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
        save_preview_pdf: "Enregistrer et Voir le PDF",
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
        workflow_tip_copy: "Gardez les lignes concises et utilisez des mots-clés comme destination, type de service ou priorité pour faciliter la recherche."
    }
};

const elements = {};

document.addEventListener("DOMContentLoaded", () => {
    cacheElements();
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
    elements.languageSelect.value = getCurrentLanguage();

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
    setElementText(".app-topbar-kicker", t("workspace"));
    setElementText(".app-topbar-copy strong", t("dashboard_title_top"));
    document.getElementById("languagePickerLabel").textContent = t("language");
    elements.openInboxBtn.setAttribute("aria-label", t("issue_inbox"));
    elements.openInboxBtn.setAttribute("title", t("issue_inbox"));
    setElementText("#openInboxLabel", t("issue_inbox"));
    elements.navMenuBtn.setAttribute("aria-label", t("menu"));
    elements.topbarCatalogBtn.textContent = t("catalog");
    elements.topbarSettingsBtn.textContent = t("settings");
    elements.topbarSignOutBtn.textContent = t("sign_out");
    updateRuntimeModeBadge();
    elements.languageSelect.options[0].textContent = "🍔 ENG";
    elements.languageSelect.options[1].textContent = "🪇 ESP";
    elements.languageSelect.options[2].textContent = "🥐 FRN";

    setElementText(".workspace-hero .eyebrow", t("hero_kicker"));
    updateHeroOperationalSummary();
    elements.newQuoteBtn.textContent = t("new_quote");
    elements.newInvoiceBtn.textContent = t("new_invoice");
    if (!elements.importDocumentStatus.dataset.customized) {
        elements.importDocumentStatus.textContent = t("import_status_default");
        elements.importDocumentStatus.hidden = true;
    }
    setElementText(".overview-kicker", t("snapshot"));
    setElementText(elements.totalDocumentsStat.previousElementSibling, t("documents"));
    setElementText(elements.quoteCountStat.previousElementSibling, t("quotes"));
    setElementText(elements.invoiceCountStat.previousElementSibling, t("invoices"));
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
    setElementText(".dashboard-topbar h2", t("documents_heading"));
    setElementText(".dashboard-subtitle", t("documents_subtitle"));
    setElementText("#catalogHeading", t("catalog_heading"));
    setElementText("#catalogCopy", t("catalog_copy"));
    setElementText("#backToDocumentsBtn", t("documents"));
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
    elements.documentSort.options[0].textContent = t("sort_date_desc");
    elements.documentSort.options[1].textContent = t("sort_date_asc");
    elements.documentSort.options[2].textContent = t("sort_created_desc");
    elements.documentSort.options[3].textContent = t("sort_created_asc");
    elements.filterButtons[0].textContent = t("filter_all");
    elements.filterButtons[1].textContent = t("quotes");
    elements.filterButtons[2].textContent = t("invoices");

    setElementText("#settingsModal h3", t("tools"));
    setElementText("#settingsModal .settings-copy", t("tools_copy"));
    setElementText(elements.newUserDisplayName.closest("label").querySelector("span"), t("display_name"));
    setElementText(elements.newUserUsername.closest("label").querySelector("span"), t("username"));
    setElementText(elements.newUserPassword.closest("label").querySelector("span"), t("temp_password"));
    setElementText(elements.newUserRole.closest("label").querySelector("span"), t("role"));
    elements.newUserDisplayName.placeholder = t("display_name_placeholder");
    elements.newUserUsername.placeholder = t("username_placeholder");
    elements.newUserPassword.placeholder = t("temp_password_placeholder");
    elements.newUserRole.options[0].textContent = t("role_user");
    elements.newUserRole.options[1].textContent = t("role_admin");
    elements.addUserBtn.textContent = t("add_user");

    const settingsPanels = elements.settingsModal.querySelectorAll(".settings-panel");
    settingsPanels[0].querySelector("h4").textContent = t("user_management");
    settingsPanels[0].querySelector(".settings-panel-header p").textContent = t("user_management_copy");
    settingsPanels[1].querySelector("h4").textContent = t("client_records");
    settingsPanels[1].querySelector(".settings-panel-header p").textContent = t("client_records_copy");
    settingsPanels[2].querySelector("h4").textContent = t("editor_preferences");
    settingsPanels[2].querySelector(".settings-panel-header p").textContent = t("editor_preferences_copy");
    settingsPanels[2].querySelector("span").textContent = t("show_internal_pricing");
    settingsPanels[3].querySelector("h4").textContent = t("csv_tools");
    settingsPanels[3].querySelector(".settings-panel-header p").textContent = t("csv_tools_copy");
    elements.exportCsvTemplateBtn.textContent = t("export_csv_template");
    elements.importCsvBtn.textContent = t("import_csv");
    settingsPanels[4].querySelector("h4").textContent = t("json_backup");
    settingsPanels[4].querySelector(".settings-panel-header p").textContent = t("json_backup_copy");
    elements.exportBackupBtn.textContent = t("export_backup");
    elements.importBackupBtn.textContent = t("import_backup");
    settingsPanels[5].querySelector("h4").textContent = t("selective_export");
    settingsPanels[5].querySelector(".settings-panel-header p").textContent = t("selective_export_copy");
    elements.openExportSelectionBtn.textContent = t("export_selected_json");
    settingsPanels[6].querySelector("h4").textContent = t("local_testing");
    settingsPanels[6].querySelector(".settings-panel-header p").textContent = t("local_testing_copy");
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
    elements.openSavedItemsTopbarBtn.setAttribute("aria-label", t("open_pending_cart"));
    elements.openSavedItemsTopbarBtn.setAttribute("title", t("open_pending_cart"));
    setElementText("#aboutModalTitle", t("about_veloris"));
    setElementText("#aboutBrandName", BRAND.name);
    setElementText("#aboutBrandMeaning", t("about_brand_meaning"));
    setElementText("#aboutProductCopy", t("about_product_copy"));
    setElementText("#aboutDeveloperCopy", t("about_developer_copy"));
    setElementText("#footerStudioName", `${BRAND.studioName} - ${BRAND.developerName}`);
    setElementText("#footerCreditLine", t("footer_credit_line"));
    elements.openCompanyProfileBtn.textContent = t("company_profile");
    elements.openAboutBtn.textContent = t("about_veloris");
    elements.openIssueReportBtn.textContent = t("footer_report_cta");

    renderBrandAssets();
    updateStaticEditorTranslations();
    updateEditorSummary();
    renderUserManagementList();
    renderClientManagementList();
    renderIssueInbox();
    updateInboxBadge();
    renderExportSelectionList();
    renderSavedItemsList();
    renderDocuments();
    renderCatalog();
    applyPageState();
}

function renderBrandAssets() {
    if (typeof window.renderSantoLogo !== "function") {
        return;
    }

    window.renderSantoLogo(elements.brandSplashLogo, "monogram");
    window.renderSantoLogo(elements.accessBrandLogo, "monogram");
    window.renderSantoLogo(elements.sessionLoaderLogo, "monogram");
    window.renderSantoLogo(elements.topbarBrandLogo, "monogram");
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
    elements.topbarBrandLogo = document.getElementById("topbarBrandLogo");
    elements.sessionLoader = document.getElementById("sessionLoader");
    elements.sessionLoaderMessage = document.getElementById("sessionLoaderMessage");
    elements.runtimeModeBadge = document.getElementById("runtimeModeBadge");
    elements.settingsModal = document.getElementById("settingsModal");
    elements.sessionBadge = document.getElementById("sessionBadge");
    elements.openInboxBtn = document.getElementById("openInboxBtn");
    elements.inboxCountBadge = document.getElementById("inboxCountBadge");
    elements.openSavedItemsTopbarBtn = document.getElementById("openSavedItemsTopbarBtn");
    elements.savedItemsCountBadge = document.getElementById("savedItemsCountBadge");
    elements.navMenuBtn = document.getElementById("navMenuBtn");
    elements.topbarMenu = document.getElementById("topbarMenu");
    elements.topbarCatalogBtn = document.getElementById("topbarCatalogBtn");
    elements.topbarCompanyProfileBtn = document.getElementById("topbarCompanyProfileBtn");
    elements.topbarSettingsBtn = document.getElementById("topbarSettingsBtn");
    elements.topbarSignOutBtn = document.getElementById("topbarSignOutBtn");
    elements.languageSelect = document.getElementById("languageSelect");
    elements.openSettingsBtn = document.getElementById("openSettingsBtn");
    elements.closeSettingsBtn = document.getElementById("closeSettingsBtn");
    elements.exportModal = document.getElementById("exportModal");
    elements.openExportSelectionBtn = document.getElementById("openExportSelectionBtn");
    elements.closeExportModalBtn = document.getElementById("closeExportModalBtn");
    elements.selectAllExportsToggle = document.getElementById("selectAllExportsToggle");
    elements.exportSelectionList = document.getElementById("exportSelectionList");
    elements.exportSelectedJsonBtn = document.getElementById("exportSelectedJsonBtn");
    elements.issueReportModal = document.getElementById("issueReportModal");
    elements.openIssueReportBtn = document.getElementById("openIssueReportBtn");
    elements.openAboutBtn = document.getElementById("openAboutBtn");
    elements.closeIssueReportModalBtn = document.getElementById("closeIssueReportModalBtn");
    elements.issueSummaryInput = document.getElementById("issueSummaryInput");
    elements.issueDetailsInput = document.getElementById("issueDetailsInput");
    elements.issueScreenshotInput = document.getElementById("issueScreenshotInput");
    elements.issueReportStatus = document.getElementById("issueReportStatus");
    elements.submitIssueReportBtn = document.getElementById("submitIssueReportBtn");
    elements.issueInboxModal = document.getElementById("issueInboxModal");
    elements.closeIssueInboxModalBtn = document.getElementById("closeIssueInboxModalBtn");
    elements.issueInboxList = document.getElementById("issueInboxList");
    elements.companyProfileModal = document.getElementById("companyProfileModal");
    elements.savedItemsModal = document.getElementById("savedItemsModal");
    elements.savedItemCreateModal = document.getElementById("savedItemCreateModal");
    elements.catalogPage = document.getElementById("catalogPage");
    elements.catalogGrid = document.getElementById("catalogGrid");
    elements.backToDocumentsBtn = document.getElementById("backToDocumentsBtn");
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
    elements.openCompanyProfileBtn = document.getElementById("openCompanyProfileBtn");
    elements.openSavedItemsBtn = document.getElementById("openSavedItemsBtn");
    elements.openSavedItemsInlineCount = document.getElementById("openSavedItemsInlineCount");
    elements.closeCompanyProfileModalBtn = document.getElementById("closeCompanyProfileModalBtn");
    elements.closeSavedItemsModalBtn = document.getElementById("closeSavedItemsModalBtn");
    elements.toggleSavedItemsFormBtn = document.getElementById("toggleSavedItemsFormBtn");
    elements.closeSavedItemCreateModalBtn = document.getElementById("closeSavedItemCreateModalBtn");
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
    elements.savedItemImageRemoveBtn = document.getElementById("savedItemImageRemoveBtn");
    elements.savedItemQuantityInput = document.getElementById("savedItemQuantityInput");
    elements.savedItemUnitPriceInput = document.getElementById("savedItemUnitPriceInput");
    elements.savedItemTotalInput = document.getElementById("savedItemTotalInput");
    elements.addSavedItemBtn = document.getElementById("addSavedItemBtn");
    elements.aboutModal = document.getElementById("aboutModal");
    elements.aboutBrandLogo = document.getElementById("aboutBrandLogo");
    elements.closeAboutModalBtn = document.getElementById("closeAboutModalBtn");
    elements.showInternalPricingToggle = document.getElementById("showInternalPricingToggle");
    elements.newUserDisplayName = document.getElementById("newUserDisplayName");
    elements.newUserUsername = document.getElementById("newUserUsername");
    elements.newUserPassword = document.getElementById("newUserPassword");
    elements.newUserRole = document.getElementById("newUserRole");
    elements.addUserBtn = document.getElementById("addUserBtn");
    elements.userManagementList = document.getElementById("userManagementList");
    elements.clientManagementList = document.getElementById("clientManagementList");
    elements.documentModal = document.getElementById("documentModal");
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
    elements.newQuoteBtn = document.getElementById("newQuoteBtn");
    elements.newInvoiceBtn = document.getElementById("newInvoiceBtn");
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
    elements.totalDocumentsStat = document.getElementById("totalDocumentsStat");
    elements.quoteCountStat = document.getElementById("quoteCountStat");
    elements.invoiceCountStat = document.getElementById("invoiceCountStat");
    elements.totalValueStat = document.getElementById("totalValueStat");
    elements.totalValueLabel = document.getElementById("totalValueLabel");
    elements.totalValueHint = document.getElementById("totalValueHint");
    elements.valueToggleCard = document.getElementById("valueToggleCard");
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
    elements.newQuoteBtn.addEventListener("click", () => {
        prepareNewDocument("quote");
        openModal("quote");
    });
    elements.newInvoiceBtn.addEventListener("click", () => {
        prepareNewDocument("invoice");
        openModal("invoice");
    });
    elements.languageSelect.addEventListener("change", handleLanguageChange);
    elements.openInboxBtn.addEventListener("click", openIssueInboxModal);
    elements.openSavedItemsTopbarBtn.addEventListener("click", openSavedItemsModal);
    elements.navMenuBtn.addEventListener("click", toggleTopbarMenu);
    elements.topbarCatalogBtn.addEventListener("click", openCatalogPage);
    elements.topbarCompanyProfileBtn.addEventListener("click", openCompanyProfileModal);
    elements.topbarSettingsBtn.addEventListener("click", handleTopbarSettingsClick);
    elements.topbarSignOutBtn.addEventListener("click", handleEndSessionClick);
    elements.openSettingsBtn?.addEventListener("click", openSettingsModal);
    elements.closeSettingsBtn.addEventListener("click", closeSettingsModal);
    elements.exportCsvTemplateBtn.addEventListener("click", exportCsvTemplate);
    elements.importCsvBtn.addEventListener("click", openCsvImportPicker);
    elements.exportBackupBtn.addEventListener("click", exportSystemBackup);
    elements.openExportSelectionBtn.addEventListener("click", openExportModal);
    elements.closeExportModalBtn.addEventListener("click", closeExportModal);
    elements.selectAllExportsToggle.addEventListener("change", handleSelectAllExportsToggle);
    elements.exportSelectedJsonBtn.addEventListener("click", exportSelectedDocuments);
    elements.openIssueReportBtn.addEventListener("click", openIssueReportModal);
    elements.openCompanyProfileBtn.addEventListener("click", openCompanyProfileModal);
    elements.openSavedItemsBtn.addEventListener("click", openSavedItemsModal);
    elements.openAboutBtn.addEventListener("click", openAboutModal);
    elements.closeIssueReportModalBtn.addEventListener("click", closeIssueReportModal);
    elements.closeCompanyProfileModalBtn.addEventListener("click", closeCompanyProfileModal);
    elements.closeSavedItemsModalBtn.addEventListener("click", closeSavedItemsModal);
    elements.closeSavedItemCreateModalBtn.addEventListener("click", closeSavedItemCreateModal);
    elements.toggleSavedItemsFormBtn.addEventListener("click", openSavedItemCreateModal);
    elements.backToDocumentsBtn.addEventListener("click", () => setActivePage("documents"));
    elements.openCatalogItemModalBtn.addEventListener("click", openCatalogItemModal);
    elements.closeCatalogItemModalBtn.addEventListener("click", closeCatalogItemModal);
    elements.closeCatalogDetailsModalBtn.addEventListener("click", closeCatalogDetailsModal);
    elements.saveCatalogItemBtn.addEventListener("click", saveCatalogItemFromModal);
    elements.catalogGrid.addEventListener("click", handleCatalogGridClick);
    elements.closeAboutModalBtn.addEventListener("click", closeAboutModal);
    elements.issueScreenshotInput.addEventListener("change", handleIssueScreenshotChange);
    elements.submitIssueReportBtn.addEventListener("click", submitIssueReport);
    elements.closeIssueInboxModalBtn.addEventListener("click", closeIssueInboxModal);
    elements.saveCompanyProfileBtn.addEventListener("click", saveCompanyProfile);
    elements.addSavedItemBtn.addEventListener("click", addSavedItemFromModal);
    elements.savedItemsList.addEventListener("click", handleSavedItemsListClick);
    document.addEventListener("click", handleImageUploadTriggerClick);
    elements.savedItemImageInput.addEventListener("change", handleSavedItemImageInputChange);
    elements.savedItemImageRemoveBtn.addEventListener("click", clearSavedItemImageSelection);
    elements.savedItemQuantityInput.addEventListener("input", syncSavedItemsTotal);
    elements.savedItemUnitPriceInput.addEventListener("input", syncSavedItemsTotal);
    elements.clearLocalTestDataBtn.addEventListener("click", clearLocalTestData);
    elements.addUserBtn.addEventListener("click", handleAddUser);
    elements.userManagementList.addEventListener("click", handleUserManagementClick);
    elements.clientManagementList.addEventListener("click", handleClientManagementClick);
    elements.issueInboxList.addEventListener("click", handleIssueInboxClick);
    elements.valueToggleCard.addEventListener("click", toggleValueView);
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
    elements.prevBtn.addEventListener("click", prevStep);
    elements.nextBtn.addEventListener("click", nextStep);
    elements.saveBtn.addEventListener("click", saveDocumentOnly);
    elements.exportPdfBtn.addEventListener("click", saveAndExportDocument);
    elements.stepIndicator.addEventListener("click", handleStepIndicatorClick);
    elements.documentsGrid.addEventListener("click", handleDocumentCardClick);
    elements.itemsContainer.addEventListener("click", handleItemContainerClick);
    elements.itemsContainer.addEventListener("input", handleItemsChange);
    elements.itemsContainer.addEventListener("change", handleItemsChange);
    elements.itemsContainer.addEventListener("change", handleItemImageInputChange);
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
        button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
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

    elements.settingsModal.addEventListener("click", event => {
        if (event.target === elements.settingsModal) {
            closeSettingsModal();
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
}

async function init() {
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
    void refreshExchangeRate();
    if (!hasActiveSession()) {
        return;
    }

    setSessionLoader(true);
    await bootstrapAppData();
    applyRoleAccess();
    applyAccessState(true);
    setSessionLoader(false);
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
                password: String(user.password || ""),
                role: user.role === "admin" ? "admin" : "user",
                language: TRANSLATIONS[user.language] ? user.language : "en"
            }))
            .filter(user => user.username && user.displayName && user.password)
        : [];

    const mergedUsers = [];
    const usernameSet = new Set();
    normalizedUsers.forEach(user => {
        if (usernameSet.has(user.username)) {
            return;
        }
        usernameSet.add(user.username);
        mergedUsers.push(user);
    });

    if (!mergedUsers.some(user => user.username === DEFAULT_ADMIN_USER.username)) {
        mergedUsers.unshift({ ...DEFAULT_ADMIN_USER });
    } else {
        const adminIndex = mergedUsers.findIndex(user => user.username === DEFAULT_ADMIN_USER.username);
        mergedUsers[adminIndex] = {
            ...mergedUsers[adminIndex],
            id: mergedUsers[adminIndex].id || DEFAULT_ADMIN_USER.id,
            displayName: mergedUsers[adminIndex].displayName || DEFAULT_ADMIN_USER.displayName,
            password: mergedUsers[adminIndex].password || DEFAULT_ADMIN_USER.password,
            role: "admin"
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
    updateRuntimeModeBadge();
}

function cacheWorkspaceStateLocally() {
    writeLocalDataset(USER_ACCOUNTS_STORAGE_KEY, state.userAccounts);
    writeLocalDataset(ISSUE_REPORTS_STORAGE_KEY, state.issueReports);
    writeLocalDataset(COMPANY_PROFILE_STORAGE_KEY, state.companyProfile);
    writeLocalDataset(SAVED_ITEMS_STORAGE_KEY, state.savedItems);
    writeLocalDataset(CATALOG_ITEMS_STORAGE_KEY, state.catalogItems);
}

function applyWorkspaceState(payload) {
    state.userAccounts = normalizeUserAccounts(payload?.userAccounts || []);
    state.issueReports = normalizeIssueReports(payload?.issueReports || []);
    state.companyProfile = normalizeCompanyProfile(payload?.companyProfile || DEFAULT_COMPANY_PROFILE);
    state.savedItems = normalizeSavedItems(payload?.savedItems || []);
    state.catalogItems = normalizeCatalogItems(payload?.catalogItems || []);
    cacheWorkspaceStateLocally();
    updateRuntimeModeBadge();
    renderUserManagementList();
    renderIssueInbox();
    updateInboxBadge();
    renderSavedItemsList();
    renderCatalog();
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
                catalogItems: state.catalogItems
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
        taxId: String(profile?.taxId || DEFAULT_COMPANY_PROFILE.taxId).trim()
    };
}

function loadCompanyProfile() {
    const profile = normalizeCompanyProfile(readLocalDataset(COMPANY_PROFILE_STORAGE_KEY, DEFAULT_COMPANY_PROFILE));
    writeLocalDataset(COMPANY_PROFILE_STORAGE_KEY, profile);
    return profile;
}

async function saveCompanyProfileState(profile) {
    state.companyProfile = normalizeCompanyProfile(profile);
    cacheWorkspaceStateLocally();
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

    const isLocalMode = state.dataMode === "local" || state.workspaceDataMode === "local";
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
            language: TRANSLATIONS[user.language] ? user.language : "en"
        };
    } catch (error) {
        return null;
    }
}

function hasActiveSession() {
    return Boolean(state.currentUser);
}

function isAdminSession() {
    return state.currentUser?.role === "admin";
}

function persistCurrentSession(user) {
    state.currentUser = {
        userId: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        language: user.language || "en"
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

    if (elements.openSettingsBtn) {
        elements.openSettingsBtn.hidden = !isAdmin;
        elements.openSettingsBtn.setAttribute("aria-hidden", String(!isAdmin));
        elements.openSettingsBtn.tabIndex = isAdmin ? 0 : -1;
    }
    elements.sessionBadge.hidden = !hasSession;
    elements.sessionBadge.textContent = hasSession
        ? state.currentUser.displayName
        : "";
    elements.openInboxBtn.hidden = !isAdmin;
    elements.topbarCompanyProfileBtn.hidden = !isAdmin;
    elements.openCompanyProfileBtn.hidden = !isAdmin;
    elements.topbarSettingsBtn.hidden = !isAdmin;
    elements.topbarSettingsBtn.setAttribute("aria-hidden", String(!isAdmin));
    elements.topbarCompanyProfileBtn.setAttribute("aria-hidden", String(!isAdmin));
    elements.openCompanyProfileBtn.setAttribute("aria-hidden", String(!isAdmin));
    updateInboxBadge();

    if (!isAdmin) {
        closeSettingsModal();
        closeIssueInboxModal();
    }

    renderUserManagementList();
    renderClientManagementList();
    renderIssueInbox();
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
    persistCurrentSession(user);
    state.currentUser = user;
    await bootstrapSharedWorkspaceData();
    state.currentUser = getStoredSessionUser() || user;
    await bootstrapAppData();
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

function endSession(message = "", { showMessage = false } = {}) {
    clearInactivityTimer();
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
    endSession("Signed out after 5 minutes of inactivity. Sign in again to continue.", {
        showMessage: true
    });
}

function handleEndSessionClick() {
    endSession("Session ended. Sign in again to open the dashboard.", {
        showMessage: true
    });
}

function toggleTopbarMenu() {
    const isOpen = !elements.topbarMenu.hidden;
    elements.topbarMenu.hidden = isOpen;
    elements.navMenuBtn.setAttribute("aria-expanded", String(!isOpen));
}

function closeTopbarMenu() {
    elements.topbarMenu.hidden = true;
    elements.navMenuBtn.setAttribute("aria-expanded", "false");
}

function setActivePage(page) {
    state.activePage = page === "catalog" ? "catalog" : "documents";
    applyPageState();
    closeTopbarMenu();
}

function applyPageState() {
    if (elements.catalogPage) {
        elements.catalogPage.hidden = state.activePage !== "catalog";
    }
    if (elements.documentsGrid?.closest(".dashboard")) {
        elements.documentsGrid.closest(".dashboard").hidden = state.activePage !== "documents";
    }
}

function openCatalogPage() {
    setActivePage("catalog");
    renderCatalog();
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
    elements.catalogItemModal.classList.add("active");
    elements.catalogItemModal.setAttribute("aria-hidden", "false");
    applyTranslations();
}

function closeCatalogItemModal() {
    elements.catalogItemModal.classList.remove("active");
    elements.catalogItemModal.setAttribute("aria-hidden", "true");
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

    elements.catalogDetailsModal.classList.add("active");
    elements.catalogDetailsModal.setAttribute("aria-hidden", "false");
}

function closeCatalogDetailsModal() {
    elements.catalogDetailsModal.classList.remove("active");
    elements.catalogDetailsModal.setAttribute("aria-hidden", "true");
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
    elements.catalogItemModal.classList.add("active");
    elements.catalogItemModal.setAttribute("aria-hidden", "false");
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
        const row = menu.closest(".document-row");
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
    if (!event.target.closest(".topbar-menu-wrap")) {
        closeTopbarMenu();
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
    elements.settingsModal.classList.add("active");
    elements.settingsModal.setAttribute("aria-hidden", "false");
}

function closeSettingsModal() {
    elements.settingsModal.classList.remove("active");
    elements.settingsModal.setAttribute("aria-hidden", "true");
}

function openIssueReportModal() {
    elements.issueReportStatus.hidden = true;
    elements.issueReportStatus.textContent = "";
    elements.issueReportStatus.classList.remove("hero-helper-error");
    elements.issueReportModal.classList.add("active");
    elements.issueReportModal.setAttribute("aria-hidden", "false");
}

function closeIssueReportModal() {
    elements.issueReportModal.classList.remove("active");
    elements.issueReportModal.setAttribute("aria-hidden", "true");
}

async function openIssueInboxModal() {
    if (!isAdminSession()) {
        return;
    }

    await saveIssueReports(state.issueReports.map(report => ({ ...report, unread: false })));
    elements.issueInboxModal.classList.add("active");
    elements.issueInboxModal.setAttribute("aria-hidden", "false");
}

function closeIssueInboxModal() {
    elements.issueInboxModal.classList.remove("active");
    elements.issueInboxModal.setAttribute("aria-hidden", "true");
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
    elements.companyProfileModal.classList.add("active");
    elements.companyProfileModal.setAttribute("aria-hidden", "false");
}

function closeCompanyProfileModal() {
    elements.companyProfileModal.classList.remove("active");
    elements.companyProfileModal.setAttribute("aria-hidden", "true");
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
    elements.savedItemsModal.classList.add("active");
    elements.savedItemsModal.setAttribute("aria-hidden", "false");
}

function closeSavedItemsModal() {
    elements.savedItemsModal.classList.remove("active");
    elements.savedItemsModal.setAttribute("aria-hidden", "true");
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
    elements.savedItemCreateModal.classList.add("active");
    elements.savedItemCreateModal.setAttribute("aria-hidden", "false");
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
    elements.savedItemCreateModal.classList.add("active");
    elements.savedItemCreateModal.setAttribute("aria-hidden", "false");
    elements.savedItemDescriptionInput.focus();
}

function closeSavedItemCreateModal() {
    if (!elements.savedItemCreateModal) {
        return;
    }
    state.editingSavedItemId = null;
    elements.savedItemCreateModal.dataset.itemImageDataUrl = "";
    elements.savedItemCreateModal.classList.remove("active");
    elements.savedItemCreateModal.setAttribute("aria-hidden", "true");
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
        <article class="saved-item-card">
            <div class="saved-item-card-layout">
                <div class="saved-item-thumb" aria-hidden="true">
                    ${item.itemImageDataUrl
                        ? `<img src="${escapeHtml(item.itemImageDataUrl)}" alt="${escapeHtml(item.description)}">`
                        : `<div class="saved-item-thumb-icon">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <rect x="4.5" y="5" width="15" height="14" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/>
                                <circle cx="9" cy="10" r="1.4" fill="currentColor"/>
                                <path d="M6.8 16l3.6-3.5 2.5 2.2 2.4-2 1.9 3.3" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>`}
                </div>
                <div class="saved-item-card-main">
                    <div class="saved-item-card-top">
                        <strong>${escapeHtml(item.description)}</strong>
                        <span class="saved-item-card-date">${escapeHtml(formatAmount(item.quantity))} · ${escapeHtml(formatCurrency(item.total))}</span>
                    </div>
                    <div class="saved-item-card-metrics">
                        <span class="saved-item-chip">Unit ${escapeHtml(formatCurrency(item.unitPrice))}</span>
                        <span class="saved-item-chip">${escapeHtml(formatDateTime(item.createdAt))}</span>
                    </div>
                </div>
            </div>
            <div class="client-row-actions saved-item-card-actions">
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
                ${canUseInCurrentDocument ? `<button class="btn btn-secondary" type="button" data-saved-item-action="use" data-saved-item-id="${escapeHtml(item.id)}">${escapeHtml(t("use_item"))}</button>` : ""}
                <button class="btn btn-secondary" type="button" data-saved-item-action="delete" data-saved-item-id="${escapeHtml(item.id)}">${escapeHtml(t("delete"))}</button>
            </div>
        </article>
    `).join("");
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
    await saveSavedItemsState([createSavedItem(item), ...state.savedItems]);
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
    } else {
        await addSavedItem({ description, quantity, unitPrice, total, itemImageDataUrl });
    }
    elements.savedItemDescriptionInput.value = "";
    elements.savedItemQuantityInput.value = "1";
    elements.savedItemUnitPriceInput.value = "0";
    elements.savedItemTotalInput.value = "0";
    clearSavedItemImageSelection();
    closeSavedItemCreateModal();
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

function openAboutModal() {
    elements.aboutModal.classList.add("active");
    elements.aboutModal.setAttribute("aria-hidden", "false");
}

function closeAboutModal() {
    elements.aboutModal.classList.remove("active");
    elements.aboutModal.setAttribute("aria-hidden", "true");
}

function renderUserManagementList() {
    if (!elements.userManagementList) {
        return;
    }

    if (!isAdminSession()) {
        elements.userManagementList.innerHTML = "";
        return;
    }

    if (!state.userAccounts.length) {
        elements.userManagementList.innerHTML = `<p class="user-list-empty">${escapeHtml(t("no_users"))}</p>`;
        return;
    }

    elements.userManagementList.innerHTML = state.userAccounts.map(user => {
        const isCurrentUser = state.currentUser?.userId === user.id;
        const isOnlyAdmin = user.role === "admin" && state.userAccounts.filter(entry => entry.role === "admin").length === 1;
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

    if (!isAdminSession()) {
        elements.clientManagementList.innerHTML = "";
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
                <span>${escapeHtml(client.address || "No address saved").replace(/\n/g, "<br>")}</span>
                ${client.consigneeName || client.consigneeAddress
                    ? `<span><strong>Consignee:</strong> ${escapeHtml(client.consigneeName || "No consignee name saved")}${client.consigneeAddress ? `<br>${escapeHtml(client.consigneeAddress).replace(/\n/g, "<br>")}` : ""}</span>`
                    : ""}
            </div>
            <div class="client-row-actions">
                <button class="btn btn-secondary" type="button" data-client-action="edit-client" data-client-id="${escapeHtml(client.id)}">${escapeHtml(t("edit"))}</button>
                <button class="btn btn-secondary" type="button" data-client-action="delete-client" data-client-id="${escapeHtml(client.id)}">${escapeHtml(t("delete"))}</button>
            </div>
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
    if (!user) {
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

    closeSettingsModal();
    renderExportSelectionList();
    elements.exportModal.classList.add("active");
    elements.exportModal.setAttribute("aria-hidden", "false");
}

function closeExportModal() {
    elements.exportModal.classList.remove("active");
    elements.exportModal.setAttribute("aria-hidden", "true");
}

function updateInboxBadge() {
    const openCount = isAdminSession() ? state.issueReports.filter(report => report.status !== "closed").length : 0;
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
        user.username === submittedUsername && user.password === submittedCode
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
        "poNumber",
        "tags",
        "notes",
        "paymentTerms",
        "itemDescription",
        "itemQuantity",
        "itemUnitPrice",
        "itemTotalPrice",
        "total"
    ];

    const exampleRow = [
        "quote",
        "TL-2026-0329-01",
        "2026-03-29",
        "CCXpress S.A | Chatelain Cargo Services",
        "\"42 Airport Road, Port Au Prince, Haiti\"",
        "PO-1001",
        "\"Priority, Port-au-Prince\"",
        "\"Legacy bulk import example\"",
        `"${DEFAULT_PAYMENT_TERMS}"`,
        "Freight coordination services",
        "1",
        "850.00",
        "850.00",
        "850.00"
    ];

    closeSettingsModal();
    downloadTextFile("invoice-quote-template.csv", `${headers.join(",")}\n${exampleRow.join(",")}\n`, "text/csv;charset=utf-8");
    setImportStatus("CSV template exported. Fill in one row per quote or invoice, then import it.");
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
    const total = numberOrZero(csvValue(row, indexMap, "total")) || itemTotalPrice;
    const itemDescription = csvValue(row, indexMap, "itemDescription") || "Imported line item";
    const date = csvValue(row, indexMap, "date") || getLocalDateInputValue();
    const clientName = csvValue(row, indexMap, "clientName") || "Imported Client";
    const clientAddress = csvValue(row, indexMap, "clientAddress");
    const refNumber = csvValue(row, indexMap, "refNumber") || `${getRefPrefix()}-${getNextRefSequence()}`;

    return {
        id: Date.now() + Math.floor(Math.random() * 100000),
        type,
        refNumber,
        date,
        clientName,
        clientAddress,
        poNumber: csvValue(row, indexMap, "poNumber"),
        tags: parseTags(csvValue(row, indexMap, "tags")),
        notes: csvValue(row, indexMap, "notes"),
        paymentTerms: csvValue(row, indexMap, "paymentTerms") || DEFAULT_PAYMENT_TERMS,
        includeSignature: false,
        includeStamp: false,
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
                internalCost: 0,
                upchargePercent: 0,
                usesDopTotal: false,
                manualUnitPrice: false
            }
        ]
    };
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
        const requiredHeaders = ["type", "clientName"];
        for (const header of requiredHeaders) {
            if (!headers.includes(header)) {
                throw new Error(`Missing required CSV column: ${header}`);
            }
        }

        const indexMap = Object.fromEntries(headers.map((header, index) => [header, index]));
        const importedDocuments = rows.slice(1)
            .filter(row => row.some(cell => String(cell || "").trim() !== ""))
            .map(row => buildDocumentFromCsvRow(row, indexMap));

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

    elements.stepIntroTitle.textContent = stepContent.title;
    elements.stepIntroText.textContent = stepContent.text;
    elements.sidebarTip.textContent = stepContent.tip;

    elements.summaryDocType.textContent = docType;
    elements.summaryRef.textContent = elements.refNumber.value ? `Ref ${elements.refNumber.value}` : t("ref_pending");
    elements.summaryDate.textContent = elements.docDate.value ? formatDisplayDate(elements.docDate.value) : t("date_pending");
    elements.summaryClient.textContent = clientName || t("no_client_selected");
    elements.summaryAddress.textContent = clientAddress || t("choose_or_enter_client");
    elements.summaryItems.textContent = String(itemCount);
    elements.summaryTotal.textContent = formatCurrency(calculateTotals());

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

function handleRefNumberInput() {
    const dateValue = elements.docDate?.value || new Date();
    const prefix = getRefPrefix(dateValue);
    const digitSuffix = elements.refNumber.value.replace(/\D/g, "").slice(-2);
    const fallbackSuffix = getAvailableRefSequence(dateValue, digitSuffix, state.editingDocumentId);
    elements.refNumber.value = `${prefix}-${fallbackSuffix}`;
    updateEditorSummary();
}

function handleDocumentDateChange() {
    generateRefNumber();
    updateEditorSummary();
}

function generateRefNumber() {
    if (state.editingDocumentId !== null && state.convertingFromQuoteId === null) {
        return;
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
    elements.documentModal.classList.add("active");
    elements.documentModal.setAttribute("aria-hidden", "false");
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
    elements.documentModal.classList.remove("active");
    elements.documentModal.classList.remove("review-mode");
    elements.documentModal.classList.remove("final-preview-mode");
    elements.documentModal.classList.remove("prefilled-edit-mode");
    elements.documentModal.setAttribute("aria-hidden", "true");
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
    elements.documentModal.classList.toggle("final-preview-mode", step === totalSteps);
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
    elements.saveBtn.style.display = (isPrefilled || step === totalSteps) ? "block" : "none";
    elements.exportPdfBtn.style.display = step === totalSteps ? "block" : "none";

    if (step >= totalSteps - 1) {
        generatePreviews();
    }

    updateEditorSummary();
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
        const image = row.dataset.itemImageDataUrl || "";
        return Boolean(description || total > 0 || quantity > 1 || image);
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
                    <img class="item-summary-thumb-img" alt="">
                    <span class="item-summary-thumb-fallback">${state.itemCounter}</span>
                </span>
                <span class="item-summary-copy">
                    <span class="item-summary-title-row">
                        <span class="item-number">Item #${state.itemCounter}</span>
                        <span class="item-summary-title">New line item</span>
                    </span>
                    <span class="item-summary-meta">Qty 1 | Unit $0.00 | Total $0.00</span>
                </span>
            </button>
            <div class="item-row-header-actions">
                <div class="item-actions-menu-wrap">
                    <button
                        type="button"
                        class="item-menu-toggle"
                        data-toggle-item-menu="${itemId}"
                        aria-expanded="false"
                        aria-haspopup="menu"
                        aria-label="${escapeHtml(t("menu"))}"
                        title="${escapeHtml(t("menu"))}"
                    >
                        <span></span><span></span><span></span>
                    </button>
                    <div class="item-actions-menu" data-item-menu="${itemId}" hidden style="display: none;">
                        <button type="button" class="item-actions-menu-btn" data-save-item-later="${itemId}">${escapeHtml(t("save_for_later"))}</button>
                        <button type="button" class="item-actions-menu-btn item-actions-menu-btn-danger" data-remove-item="${itemId}">${escapeHtml(t("delete"))}</button>
                    </div>
                </div>
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
                <div class="form-group item-image-group">
                    <div class="item-image-uploader">
                        <label class="item-image-upload-btn" aria-label="${escapeHtml(t("upload_item_image"))}" title="${escapeHtml(t("upload_item_image"))}">
                            <input type="file" class="item-image-input" accept="image/*" hidden>
                            <span class="item-image-upload-art" aria-hidden="true">
                                <svg viewBox="0 0 24 24">
                                    <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 5 16.5z" fill="none" stroke="currentColor" stroke-width="1.7"/>
                                    <path d="M8 15l2.4-2.4a1 1 0 0 1 1.4 0l1.1 1.1 2.1-2.1a1 1 0 0 1 1.4 0L19 14.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
                                    <circle cx="10" cy="9.5" r="1.2" fill="currentColor"/>
                                </svg>
                            </span>
                            <span class="item-image-upload-copy">
                                <strong>${escapeHtml(t("item_image"))}</strong>
                                <small>Add image</small>
                            </span>
                        </label>
                        <button type="button" class="item-image-remove-btn" hidden aria-label="${escapeHtml(t("remove_item_image"))}" title="${escapeHtml(t("remove_item_image"))}">
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M6 7h12" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                <path d="M9.5 7V5.6c0-.4.3-.6.6-.6h3.8c.3 0 .6.2.6.6V7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                <path d="M8.2 7l.7 10.2c0 .4.3.8.8.8h4.6c.4 0 .7-.3.8-.8L16 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
                    <div class="item-image-preview" hidden>
                        <img class="item-image-preview-img" alt="Item preview">
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
    syncItemActionMenus();
    queueDraftAutosave();
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
            setExpandedItem(item);
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
    const url = new URL("assets/david-forman-signature.png", window.location.href);
    url.searchParams.set("v", "20260328-1434");
    return url.href;
}

function getStampUrl() {
    const url = new URL("assets/gonzalez-logistics-stamp.png", window.location.href);
    url.searchParams.set("v", "20260408-2");
    return url.href;
}

function getStampStyle() {
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
    const choice = offsets[Math.floor(Math.random() * offsets.length)];
    return `left: calc(50% + ${choice.x}px); bottom: ${choice.y}px; transform: translateX(-50%) rotate(${choice.rotate}deg);`;
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

function buildDocumentMarkup(doc, stampStyle) {
    const documentTitle = doc.type === "quote" ? "Quote" : "Invoice";
    const referenceLabel = doc.type === "quote" ? "Reference No." : `${documentTitle} Reference`;
    const primaryPartyLabel = doc.type === "quote" ? "For:" : "Bill To:";
    const showConsignee = doc.type !== "quote";
    const showPoNumber = hasMeaningfulPoNumber(doc.poNumber);
    const safeNotes = doc.notes && doc.notes.trim()
        ? escapeHtml(doc.notes.trim())
        : "<em>*No additional notes provided.</em>";

    return `
        <div class="document-sheet">
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
                        style="${escapeHtml(stampStyle || getStampStyle())}"
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
    const documentTitle = doc.type === "quote" ? "Quote" : "Invoice";
    const primaryPartyLabel = doc.type === "quote" ? "For:" : "Bill To:";
    const showConsignee = doc.type !== "quote";
    const showPoNumber = hasMeaningfulPoNumber(doc.poNumber);
    const safeNotes = doc.notes && doc.notes.trim()
        ? escapeHtml(doc.notes.trim())
        : "<em>*No additional notes provided.</em>";

    return `
        <div class="document-sheet line-items-review-sheet">
            <div class="line-items-review-header">
                <div class="line-items-review-kicker">${documentTitle} line item review</div>
                <div class="line-items-review-ref">${escapeHtml(doc.refNumber || "Reference pending")}</div>
            </div>

            <div class="document-meta">
                <div><strong>${primaryPartyLabel}</strong> ${escapeHtml(doc.clientName || "Client pending")}</div>
                <div><strong>Date:</strong> <span class="meta-date-value">${escapeHtml(formatDisplayDate(doc.date))}</span></div>
            </div>

            <div class="document-parties line-items-parties">
                <div class="party-card">
                    <div class="issued-to-label"><strong>${primaryPartyLabel}</strong></div>
                    <div class="issued-to-value">${escapeHtml(doc.clientAddress || "Address pending").replace(/\n/g, "<br>")}</div>
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
        </div>
    `;
}

function generatePreviews() {
    const doc = buildDocumentData();
    if (elements.lineItemsPreviewContainer) {
        elements.lineItemsPreviewContainer.innerHTML = buildLineItemsPreviewMarkup(doc);
    }
    elements.previewContainer.innerHTML = buildDocumentMarkup(doc);
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

function openPrintWindow(doc) {
    const printWindow = window.open("", "_blank", "width=1024,height=900");
    if (!printWindow) {
        alert("Please allow pop-ups to export the PDF.");
        return;
    }

    const stampStyle = getStampStyle();

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

                /* Apply print layout to the screen preview so it matches the printed output */
                .document-sheet {
                    box-shadow: none;
                    max-width: none;
                    width: 100%;
                    margin: 0;
                    min-height: 100vh;
                    padding: 0.42in 0 28mm;
                    box-sizing: border-box;
                }

                .document-body {
                    padding: 0 0.42in;
                }

                .document-meta {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) auto;
                    align-items: start;
                }

                .document-parties {
                    display: grid !important;
                    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
                    align-items: start;
                    gap: 0.85rem 1rem !important;
                }

                .party-card {
                    min-width: 0;
                    break-inside: avoid;
                }

                .po-card {
                    grid-column: 1 / -1 !important;
                    justify-self: start;
                }

                .issued-to-value {
                    padding-left: 1.8rem !important;
                }

                .compact-party-value {
                    padding-left: 0 !important;
                }

                .document-bottom {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) 280px;
                    align-items: start;
                }

                .document-totals {
                    width: 280px;
                    justify-self: end;
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
                <button type="button" onclick="window.print()">Print or Save as PDF</button>
            </div>
            <div id="previewContainer" class="preview-container">${buildDocumentMarkup(doc, stampStyle)}</div>
        </body>
        </html>
    `);
    printWindow.document.close();
}

async function persistDocument(options = {}) {
    const {
        exportAfterSave = false,
        silent = false,
        keepOpen = false,
        forceDraft = false
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
            ? (existingDocument?.paymentStatus || "unpaid")
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
            doc.sourceQuoteId = state.convertingFromQuoteId;
            nextDocuments = state.documents.map(entry => isSameDocumentId(entry.id, state.convertingFromQuoteId)
                ? {
                    ...entry,
                    lockedAfterConversion: true,
                    convertedDocumentId: doc.id
                }
                : entry);
            nextDocuments.unshift(doc);
        } else {
            nextDocuments = [doc, ...state.documents];
        }
    }

    try {
        await saveDocumentsToServer(nextDocuments);
        state.editingDocumentId = doc.id;
        renderDocuments();
    } catch (error) {
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
        openPrintWindow(doc);
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
    await persistDocument({ exportAfterSave: true });
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

    if (elements.itemsContainer.querySelectorAll(".item-row").length === 0) {
        alert("Please add at least one item");
        goToStep(3);
        return false;
    }

    return true;
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
    elements.invoiceCountStat.textContent = String(invoiceCount);
    elements.totalValueStat.textContent = formatCurrency(totalValue);
    elements.totalValueLabel.textContent = t(currentLabelKey);
    elements.totalValueHint.textContent = t(nextHintKey);
    elements.valueToggleCard.setAttribute("aria-pressed", String(state.valueView !== "pipeline"));
    elements.valueToggleCard.classList.toggle("is-invoiced", state.valueView === "invoiced");
    elements.valueToggleCard.classList.toggle("is-income", state.valueView === "income");
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
    const match = refNumber.match(/^(TL-\d{4}-\d{4})-(\d+)$/);
    if (!match) {
        return null;
    }

    return {
        prefix: match[1],
        sequence: Number(match[2])
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

function renderDocuments() {
    updateOverviewStats();
    renderCatalog();

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

    elements.documentsGrid.innerHTML = visibleDocuments.map(doc => {
        const date = formatDisplayDate(doc.date);
        const isLockedSourceQuote = Boolean(doc.lockedAfterConversion);
        const statusLabel = doc.status === "draft" ? t("status_draft") : t("status_logged");
        const statusClass = doc.status === "draft" ? "draft" : "logged";
        const paymentStatus = doc.type === "invoice" ? (doc.paymentStatus === "paid" ? "paid" : "unpaid") : null;
        const creatorLabel = isAdminSession() && doc.createdBy?.displayName
            ? `${escapeHtml(doc.createdBy.displayName)}${doc.createdBy.username ? ` (@${escapeHtml(doc.createdBy.username)})` : ""}`
            : "";
        const cardViewId = isLockedSourceQuote ? "" : ` data-view-id="${doc.id}"`;
        const statusBadge = isLockedSourceQuote
            ? `<span class="doc-lock-badge">${escapeHtml(t("converted_source"))}</span>`
            : "";
        const legacyBadge = doc.legacyPdfUrl
            ? `<span class="doc-lock-badge">${escapeHtml(t("legacy_pdf_attached"))}</span>`
            : "";
        const paymentBadge = paymentStatus
            ? `<span class="doc-payment-badge ${paymentStatus}">${escapeHtml(t(paymentStatus === "paid" ? "payment_paid" : "payment_unpaid"))}</span>`
            : "";
        const rowAriaLabel = `${doc.type} ${doc.refNumber || "document"} for ${doc.clientName || "unknown client"}`;

        return `
            <div class="document-row document-row-${doc.type}${doc.status === "draft" ? " document-row-draft" : ""}${isLockedSourceQuote ? " document-row-locked" : ""}"${cardViewId}${isLockedSourceQuote ? "" : ' tabindex="0" role="button"'} aria-label="${escapeHtml(rowAriaLabel)}">
                <div class="doc-row-main">
                    <div class="doc-row-primary">
                        <span class="doc-type ${doc.type}">${escapeHtml(doc.type === "quote" ? t("quote_singular") : t("invoice_singular"))}</span>
                        <div class="doc-ref">${doc.refNumber}</div>
                    </div>
                    <div class="doc-row-secondary">
                        <div class="doc-client">${escapeHtml(doc.clientName)}</div>
                        <div class="doc-date">${escapeHtml(t("date_label"))} ${date}</div>
                        ${creatorLabel ? `<div class="doc-creator">${escapeHtml(t("created_by"))} ${creatorLabel}</div>` : ""}
                    </div>
                </div>
                <div class="doc-row-badges">
                    ${statusBadge}
                    ${legacyBadge}
                    <span class="doc-status-badge ${statusClass}">${escapeHtml(statusLabel)}</span>
                    ${paymentBadge}
                </div>
                <div class="doc-row-total">
                    <span class="doc-total-label">${escapeHtml(t("total"))}</span>
                    <div class="doc-total">${formatCurrency(doc.total || 0)}</div>
                </div>
                <div class="doc-actions">
                    ${isLockedSourceQuote ? `<span class="doc-lock-note">${escapeHtml(t("locked_after_conversion"))}</span>` : `
                        <div class="doc-actions-menu-wrap">
                            <button
                                type="button"
                                class="doc-menu-toggle"
                                data-toggle-document-menu="${doc.id}"
                                aria-expanded="false"
                                aria-haspopup="menu"
                                aria-label="${escapeHtml(t("menu"))}"
                                title="${escapeHtml(t("menu"))}"
                            >
                                <span></span><span></span><span></span>
                            </button>
                            <div class="doc-actions-menu" data-document-menu="${doc.id}" hidden style="display: none;">
                                <button type="button" class="doc-actions-menu-btn" data-action="edit" data-id="${doc.id}">${escapeHtml(t("edit"))}</button>
                                <button type="button" class="doc-actions-menu-btn" data-action="export-pdf" data-id="${doc.id}">${escapeHtml(t("open_pdf_preview"))}</button>
                                ${doc.legacyPdfUrl ? `<button type="button" class="doc-actions-menu-btn" data-action="view-pdf" data-id="${doc.id}">${escapeHtml(t("view_pdf"))}</button>` : ""}
                                ${doc.type === "invoice" ? `<button type="button" class="doc-actions-menu-btn" data-action="toggle-paid" data-id="${doc.id}">${escapeHtml(t(paymentStatus === "paid" ? "mark_as_unpaid" : "mark_as_paid"))}</button>` : ""}
                                ${doc.type === "quote" ? `<button type="button" class="doc-actions-menu-btn" data-action="convert" data-id="${doc.id}">${escapeHtml(t("convert_to_invoice"))}</button>` : ""}
                                <button type="button" class="doc-actions-menu-btn doc-actions-menu-btn-danger" data-action="delete" data-id="${doc.id}">${escapeHtml(t("delete"))}</button>
                            </div>
                        </div>
                    `}
                </div>
            </div>
        `;
    }).join("");

    syncDocumentActionMenus();
}

function handleSearchInput(event) {
    state.searchQuery = event.target.value.trim().toLowerCase();
    renderDocuments();
}

function handleSortChange(event) {
    state.sortOrder = event.target.value || "date_desc";
    renderDocuments();
}

function setActiveFilter(filter) {
    state.activeFilter = filter;
    elements.filterButtons.forEach(button => {
        button.classList.toggle("active", button.dataset.filter === filter);
    });
    renderDocuments();
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
        } else if (action === "toggle-paid") {
            await toggleDocumentPaid(docId);
        } else if (action === "delete") {
            await deleteDocument(docId);
        } else if (action === "convert") {
            convertQuoteToInvoice(docId);
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

    editDocument(card.dataset.viewId);
}

function handleDocumentCardKeydown(event) {
    if (event.key !== "Enter" && event.key !== " ") {
        return;
    }

    const row = event.target.closest("[data-view-id]");
    if (!row || event.target.closest("[data-action]") || event.target.closest("[data-show-tags]") || event.target.closest("[data-toggle-document-menu]")) {
        return;
    }

    event.preventDefault();
    editDocument(row.dataset.viewId);
}

async function toggleDocumentPaid(id) {
    const doc = getDocumentById(id);
    if (!doc || doc.type !== "invoice") {
        return;
    }

    const nextStatus = doc.paymentStatus === "paid" ? "unpaid" : "paid";
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

    if (doc.lockedAfterConversion) {
        alert("This quote is kept as a locked source record after conversion and can no longer be edited.");
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

async function deleteDocument(id) {
    const doc = getDocumentById(id);
    if (!doc) {
        return;
    }

    if (doc.lockedAfterConversion) {
        alert("This quote is kept as a locked source record after conversion and can no longer be deleted.");
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
    const doc = state.documents.find(entry => isSameDocumentId(entry.id, id) && entry.type === "quote");
    if (!doc) {
        return;
    }

    if (doc.lockedAfterConversion) {
        alert("This quote has already been converted and is now kept as a locked source record.");
        return;
    }

    state.editingDocumentId = null;
    state.convertingFromQuoteId = id;
    state.openDocumentMenuId = null;
    openModal("invoice");
    populateFormFromDocument({ ...doc, type: "invoice", date: getLocalDateInputValue() });
    elements.docType.value = "invoice";
    setToday();
    generateRefNumber();
    updateModalTitle();
    goToStep(getTotalSteps());
    updateEditorSummary();
}
