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
    dataMode: "server"
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
const DEFAULT_ACCESS_ERROR_MESSAGE = "That username or password is incorrect. Try again.";
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
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
const TRANSLATIONS = {
    en: {
        language_name: "English",
        role_admin: "Admin",
        role_user: "User",
        login_kicker: "Workspace Sign In",
        login_title: "Open The Dashboard",
        login_copy: "Sign in with a local account to create, edit, and manage quotes and invoices.",
        username: "Username",
        username_placeholder: "Enter username",
        password: "Password",
        password_placeholder: "Enter password",
        login_error: "That username or password is incorrect. Try again.",
        sign_in: "Sign In",
        session_loader_kicker: "Loading Session",
        session_loader_title: "Opening your workspace",
        session_loader_message: "Signing in and preparing the dashboard...",
        workspace: "Workspace",
        dashboard_title_top: "Invoice & Quote Dashboard",
        end_session: "End Session",
        language: "Language",
        hero_kicker: "Document Workspace",
        hero_title: "Quotes and invoices without the clutter.",
        hero_copy: "Build polished documents, convert quotes fast, and keep your day moving from one clean workspace.",
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
        total: "Total",
        created_by: "Created by",
        converted_source: "Converted Source",
        legacy_pdf_attached: "Legacy PDF Attached",
        locked_after_conversion: "Locked after conversion",
        open_pdf_preview: "Open PDF Preview",
        view_pdf: "View PDF",
        convert_to_invoice: "Convert to Invoice",
        pipeline_value: "Pipeline Value",
        amount_invoiced: "Amount Invoiced",
        tap_view_invoiced: "Tap to view invoiced amount",
        tap_view_pipeline: "Tap to view pipeline value",
        documents_heading: "Documents",
        documents_subtitle: "Click any row to open it, then sort, filter, and manage your quotes and invoices.",
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
        editor_preferences_copy: "Choose which optional fields should appear while you build quotes and invoices.",
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
        export_json_copy: "Choose the quotes and invoices you want in this export file.",
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
        workflow_tip: "Workflow Tip",
        workflow_tip_copy: "Keep line items concise and use keywords like destination, service type, or priority to make search much easier later."
    },
    es: {
        language_name: "Español",
        role_admin: "Administrador",
        role_user: "Usuario",
        login_kicker: "Ingreso al Espacio",
        login_title: "Abrir El Panel",
        login_copy: "Inicia sesión con una cuenta local para crear, editar y gestionar cotizaciones y facturas.",
        username: "Usuario",
        username_placeholder: "Ingresa el usuario",
        password: "Contraseña",
        password_placeholder: "Ingresa la contraseña",
        login_error: "Ese usuario o contraseña es incorrecto. Inténtalo de nuevo.",
        sign_in: "Iniciar sesión",
        session_loader_kicker: "Cargando sesión",
        session_loader_title: "Abriendo tu espacio",
        session_loader_message: "Iniciando sesión y preparando el panel...",
        workspace: "Espacio",
        dashboard_title_top: "Panel de Cotizaciones y Facturas",
        end_session: "Cerrar sesión",
        language: "Idioma",
        hero_kicker: "Espacio de Documentos",
        hero_title: "Cotizaciones y facturas sin desorden.",
        hero_copy: "Crea documentos pulidos, convierte cotizaciones rápido y mantén tu día en movimiento desde un solo espacio limpio.",
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
        total: "Total",
        created_by: "Creado por",
        converted_source: "Fuente Convertida",
        legacy_pdf_attached: "PDF heredado adjunto",
        locked_after_conversion: "Bloqueado después de la conversión",
        open_pdf_preview: "Abrir Vista PDF",
        view_pdf: "Ver PDF",
        convert_to_invoice: "Convertir en Factura",
        pipeline_value: "Valor en Proceso",
        amount_invoiced: "Monto Facturado",
        tap_view_invoiced: "Toca para ver el monto facturado",
        tap_view_pipeline: "Toca para ver el valor en proceso",
        documents_heading: "Documentos",
        documents_subtitle: "Haz clic en cualquier fila para abrirla y luego ordenar, filtrar y gestionar tus cotizaciones y facturas.",
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
        editor_preferences_copy: "Elige qué campos opcionales deben aparecer mientras creas cotizaciones y facturas.",
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
        export_json_copy: "Elige las cotizaciones y facturas que deseas en este archivo de exportación.",
        select_all_documents: "Seleccionar todos los documentos",
        download_selected_json: "Descargar JSON Seleccionado",
        no_documents_export: "No hay documentos disponibles para exportar.",
        type_info: "Tipo e Información",
        client_details: "Datos del Cliente",
        line_items: "Líneas",
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
        items: "Ítems",
        subtotal: "Subtotal",
        no_keywords: "Aún no hay palabras clave",
        pdf_options: "Opciones PDF",
        include_signature: "Incluir firma al exportar",
        include_signature_help: "Desactiva esto para cotizaciones o facturas sin firma antes de abrir la vista PDF.",
        workflow_tip: "Consejo de Flujo",
        workflow_tip_copy: "Mantén las líneas concisas y usa palabras clave como destino, tipo de servicio o prioridad para facilitar la búsqueda."
    },
    fr: {
        language_name: "Français",
        role_admin: "Administrateur",
        role_user: "Utilisateur",
        login_kicker: "Connexion à l’Espace",
        login_title: "Ouvrir Le Tableau",
        login_copy: "Connectez-vous avec un compte local pour créer, modifier et gérer les devis et factures.",
        username: "Nom d’utilisateur",
        username_placeholder: "Entrez le nom d’utilisateur",
        password: "Mot de passe",
        password_placeholder: "Entrez le mot de passe",
        login_error: "Ce nom d’utilisateur ou mot de passe est incorrect. Réessayez.",
        sign_in: "Se connecter",
        session_loader_kicker: "Chargement de session",
        session_loader_title: "Ouverture de votre espace",
        session_loader_message: "Connexion et préparation du tableau de bord...",
        workspace: "Espace",
        dashboard_title_top: "Tableau Devis & Factures",
        end_session: "Fermer la session",
        language: "Langue",
        hero_kicker: "Espace Documents",
        hero_title: "Devis et factures sans encombrement.",
        hero_copy: "Créez des documents soignés, convertissez les devis rapidement et gardez votre journée fluide depuis un seul espace clair.",
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
        total: "Total",
        created_by: "Créé par",
        converted_source: "Source Convertie",
        legacy_pdf_attached: "PDF hérité joint",
        locked_after_conversion: "Verrouillé après conversion",
        open_pdf_preview: "Ouvrir l’aperçu PDF",
        view_pdf: "Voir le PDF",
        convert_to_invoice: "Convertir en Facture",
        pipeline_value: "Valeur Pipeline",
        amount_invoiced: "Montant Facturé",
        tap_view_invoiced: "Touchez pour voir le montant facturé",
        tap_view_pipeline: "Touchez pour voir la valeur pipeline",
        documents_heading: "Documents",
        documents_subtitle: "Cliquez sur une ligne pour l’ouvrir, puis triez, filtrez et gérez vos devis et factures.",
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
        editor_preferences_copy: "Choisissez quels champs optionnels doivent apparaître pendant la création des devis et factures.",
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
        export_json_copy: "Choisissez les devis et factures à inclure dans ce fichier d’export.",
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

function applyTranslations() {
    document.documentElement.lang = getCurrentLanguage();
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
    setElementText(".app-topbar-kicker", t("workspace"));
    setElementText(".app-topbar-copy strong", t("dashboard_title_top"));
    elements.endSessionBtn.textContent = t("end_session");
    document.getElementById("languagePickerLabel").textContent = t("language");
    elements.languageSelect.options[0].textContent = "🍔 ENG";
    elements.languageSelect.options[1].textContent = "🪇 ESP";
    elements.languageSelect.options[2].textContent = "🥐 FRN";

    setElementText(".workspace-hero .eyebrow", t("hero_kicker"));
    setElementText(".hero-copy h1", t("hero_title"));
    setElementText(".hero-copy p", t("hero_copy"));
    elements.newQuoteBtn.textContent = t("new_quote");
    elements.newInvoiceBtn.textContent = t("new_invoice");
    if (!elements.importDocumentStatus.dataset.customized) {
        elements.importDocumentStatus.textContent = t("import_status_default");
    }
    setElementText(".overview-kicker", t("snapshot"));
    setElementText(elements.totalDocumentsStat.previousElementSibling, t("documents"));
    setElementText(elements.quoteCountStat.previousElementSibling, t("quotes"));
    setElementText(elements.invoiceCountStat.previousElementSibling, t("invoices"));
    if (state.valueView === "invoiced") {
        elements.totalValueLabel.textContent = t("amount_invoiced");
        elements.totalValueHint.textContent = t("tap_view_pipeline");
    } else {
        elements.totalValueLabel.textContent = t("pipeline_value");
        elements.totalValueHint.textContent = t("tap_view_invoiced");
    }
    setElementText(".dashboard-topbar h2", t("documents_heading"));
    setElementText(".dashboard-subtitle", t("documents_subtitle"));
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

    updateStaticEditorTranslations();
    updateEditorSummary();
    renderUserManagementList();
    renderClientManagementList();
    renderExportSelectionList();
    renderDocuments();
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
    elements.prevBtn.textContent = t("previous");
    elements.nextBtn.textContent = t("next");
}

async function handleLanguageChange(event) {
    const nextLanguage = event.target.value;
    state.currentLanguage = TRANSLATIONS[nextLanguage] ? nextLanguage : "en";

    if (state.currentUser) {
        state.currentUser.language = state.currentLanguage;
        sessionStorage.setItem(CURRENT_SESSION_STORAGE_KEY, JSON.stringify(state.currentUser));
        saveUserAccounts(state.userAccounts.map(user =>
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
    elements.sessionLoader = document.getElementById("sessionLoader");
    elements.sessionLoaderMessage = document.getElementById("sessionLoaderMessage");
    elements.settingsModal = document.getElementById("settingsModal");
    elements.endSessionBtn = document.getElementById("endSessionBtn");
    elements.sessionBadge = document.getElementById("sessionBadge");
    elements.languageSelect = document.getElementById("languageSelect");
    elements.openSettingsBtn = document.getElementById("openSettingsBtn");
    elements.closeSettingsBtn = document.getElementById("closeSettingsBtn");
    elements.exportModal = document.getElementById("exportModal");
    elements.openExportSelectionBtn = document.getElementById("openExportSelectionBtn");
    elements.closeExportModalBtn = document.getElementById("closeExportModalBtn");
    elements.selectAllExportsToggle = document.getElementById("selectAllExportsToggle");
    elements.exportSelectionList = document.getElementById("exportSelectionList");
    elements.exportSelectedJsonBtn = document.getElementById("exportSelectedJsonBtn");
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
    elements.itemsContainer = document.getElementById("itemsContainer");
    elements.lineItemsPreviewContainer = document.getElementById("lineItemsPreviewContainer");
    elements.previewContainer = document.getElementById("previewContainer");
    elements.prevBtn = document.getElementById("prevBtn");
    elements.nextBtn = document.getElementById("nextBtn");
    elements.saveBtn = document.getElementById("saveBtn");
    elements.exportPdfBtn = document.getElementById("exportPdfBtn");
    elements.newQuoteBtn = document.getElementById("newQuoteBtn");
    elements.newInvoiceBtn = document.getElementById("newInvoiceBtn");
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
    elements.calculatorLauncher = document.getElementById("calculatorLauncher");
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
    elements.endSessionBtn.addEventListener("click", handleEndSessionClick);
    elements.languageSelect.addEventListener("change", handleLanguageChange);
    elements.openSettingsBtn.addEventListener("click", openSettingsModal);
    elements.closeSettingsBtn.addEventListener("click", closeSettingsModal);
    elements.exportCsvTemplateBtn.addEventListener("click", exportCsvTemplate);
    elements.importCsvBtn.addEventListener("click", openCsvImportPicker);
    elements.exportBackupBtn.addEventListener("click", exportSystemBackup);
    elements.openExportSelectionBtn.addEventListener("click", openExportModal);
    elements.closeExportModalBtn.addEventListener("click", closeExportModal);
    elements.selectAllExportsToggle.addEventListener("change", handleSelectAllExportsToggle);
    elements.exportSelectedJsonBtn.addEventListener("click", exportSelectedDocuments);
    elements.clearLocalTestDataBtn.addEventListener("click", clearLocalTestData);
    elements.addUserBtn.addEventListener("click", handleAddUser);
    elements.userManagementList.addEventListener("click", handleUserManagementClick);
    elements.clientManagementList.addEventListener("click", handleClientManagementClick);
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
    elements.documentSearch.addEventListener("input", handleSearchInput);
    elements.documentSort.addEventListener("change", handleSortChange);
    elements.documentsGrid.addEventListener("keydown", handleDocumentCardKeydown);
    elements.tagSuggestions.addEventListener("click", handleKeywordSuggestionClick);
    elements.calculatorLauncher.addEventListener("click", toggleCalculator);
    elements.calculatorMinimizeBtn.addEventListener("click", hideCalculator);
    elements.calculatorCloseBtn.addEventListener("click", hideCalculator);
    elements.calculatorGrid.addEventListener("click", handleCalculatorButtonClick);
    elements.calculatorDragHandle.addEventListener("pointerdown", startCalculatorDrag);
    window.addEventListener("pointermove", handleCalculatorDrag);
    window.addEventListener("pointerup", stopCalculatorDrag);
    elements.filterButtons.forEach(button => {
        button.addEventListener("click", () => setActiveFilter(button.dataset.filter));
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

    elements.documentModal.addEventListener("input", updateEditorSummary);
    elements.documentModal.addEventListener("change", updateEditorSummary);
    document.addEventListener("pointerdown", handleSessionActivity);
    document.addEventListener("keydown", handleSessionActivity);
    document.addEventListener("input", handleSessionActivity);
    window.addEventListener("focus", handleSessionActivity);
    window.addEventListener("scroll", handleSessionActivity, { passive: true });
}

function init() {
    state.userAccounts = loadUserAccounts();
    state.currentUser = getStoredSessionUser();
    state.currentLanguage = state.currentUser?.language || "en";
    applyRoleAccess();
    applyAccessState(hasActiveSession());
    setAccessLoading(false);
    setSessionLoader(false);
    applyTranslations();
    hydrateEditorPreferences();
    updateCalculatorDisplay();
    if (!hasActiveSession()) {
        return;
    }

    bootstrapAppData();
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
    elements.calculatorLauncher.setAttribute("aria-expanded", "true");

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
    elements.calculatorLauncher.setAttribute("aria-expanded", "false");
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

function saveUserAccounts(users) {
    state.userAccounts = normalizeUserAccounts(users);
    writeLocalDataset(USER_ACCOUNTS_STORAGE_KEY, state.userAccounts);
    renderUserManagementList();
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

    elements.openSettingsBtn.hidden = !isAdmin;
    elements.openSettingsBtn.setAttribute("aria-hidden", String(!isAdmin));
    elements.openSettingsBtn.tabIndex = isAdmin ? 0 : -1;
    elements.sessionBadge.hidden = !hasSession;
    elements.sessionBadge.textContent = hasSession
        ? `${state.currentUser.displayName} · ${isAdmin ? t("role_admin") : t("role_user")}`
        : "";

    if (!isAdmin) {
        closeSettingsModal();
    }

    renderUserManagementList();
    renderClientManagementList();
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
    await bootstrapAppData();
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

function handleAddUser() {
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

    saveUserAccounts([
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

function handleUserManagementClick(event) {
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

        saveUserAccounts(state.userAccounts.map(entry =>
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

        if (!window.confirm(`Remove ${user.displayName} from this device's local user list?`)) {
            return;
        }

        saveUserAccounts(state.userAccounts.filter(entry => entry.id !== user.id));
        setImportStatus(`Removed ${user.displayName} from local access.`);
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
    elements.importDocumentStatus.dataset.customized = message === t("import_status_default") ? "" : "true";
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
    window.localStorage.setItem(storageKey, JSON.stringify(value));
}

function clearLocalDataset(storageKey) {
    window.localStorage.removeItem(storageKey);
}

function loadLocalAppData() {
    const documents = normalizeDocuments(readLocalDataset(LOCAL_DOCUMENTS_STORAGE_KEY, []));
    const clients = normalizeClients(readLocalDataset(LOCAL_CLIENTS_STORAGE_KEY, []));

    state.dataMode = "local";
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
        return;
    }

    try {
        const payload = await requestJSON("/api/documents", {
            method: "POST",
            body: JSON.stringify({ documents })
        });

        state.dataMode = "server";
        state.documents = normalizeDocuments(payload.documents);
    } catch (error) {
        state.dataMode = "local";
        state.documents = normalizeDocuments(documents);
        writeLocalDataset(LOCAL_DOCUMENTS_STORAGE_KEY, state.documents);
        setImportStatus("Server save failed, so changes were saved locally in this browser instead.");
    }
}

async function saveClientsToServer(clients) {
    if (state.dataMode === "local") {
        state.clients = normalizeClients(clients);
        writeLocalDataset(LOCAL_CLIENTS_STORAGE_KEY, state.clients);
        return;
    }

    try {
        const payload = await requestJSON("/api/clients", {
            method: "POST",
            body: JSON.stringify({ clients })
        });

        state.dataMode = "server";
        state.clients = normalizeClients(payload.clients);
    } catch (error) {
        state.dataMode = "local";
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
    const stepContent = {
        1: {
            title: t("type_info"),
            text: isEditing
                ? "Update the saved document details and save right away if this is the only change you need."
                : "Choose the document type, confirm the date, and set the reference details.",
            tip: isEditing
                ? "Existing documents can be updated from any step, so you do not have to return to final review for quick fixes."
                : "Reference details first keeps new documents organized before you move into client and pricing work."
        },
        2: {
            title: t("client_details"),
            text: isEditing
                ? "Tighten up the saved client name or address without losing your place in the workflow."
                : "Select an existing client or enter a new one, then capture the address exactly as it should appear on the document.",
            tip: "Saved clients help you move much faster on repeat work and keep naming consistent."
        },
        3: {
            title: t("line_items"),
            text: "Add services, pricing, and payment terms. Unit price is derived automatically unless you switch to manual mode.",
            tip: "Keep item descriptions short and specific. The table stays cleaner when each service is one line item."
        },
        4: {
            title: t("keywords"),
            text: "Add search keywords after the line items are in place, or tap a suggestion generated from your item descriptions.",
            tip: "Keywords work best when they reflect destinations, service types, equipment, or priorities you will search for later."
        },
        5: {
            title: t("items_preview"),
            text: "Review the line items, notes, and totals in document form before moving to the final print preview.",
            tip: "This step is useful for catching quantity, unit price, and subtotal issues before you check the full page layout."
        },
        6: {
            title: t("review"),
            text: "Check the final layout before saving and exporting the PDF.",
            tip: "This preview mirrors the live document structure, so it is the fastest way to catch layout mistakes before print."
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
    const date = dateValue ? new Date(dateValue) : new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `TL-${year}-${month}${day}`;
}

function getNextRefSequence(dateValue = elements.docDate?.value || new Date()) {
    const prefix = getRefPrefix(dateValue);
    const usedNumbers = state.documents
        .map(doc => {
            const match = String(doc.refNumber || "").toUpperCase().match(/^TL-\d{4}-\d{4}-(\d+)$/);
            if (!match) {
                return null;
            }

            return String(doc.refNumber || "").toUpperCase().startsWith(`${prefix}-`) ? Number(match[1]) : null;
        })
        .filter(number => Number.isInteger(number) && number > 0)
        .sort((left, right) => left - right);

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

function handleRefNumberInput() {
    const prefix = getRefPrefix();
    const digitSuffix = elements.refNumber.value.replace(/\D/g, "").slice(-2);
    const fallbackSuffix = getNextRefSequence();
    elements.refNumber.value = `${prefix}-${digitSuffix || fallbackSuffix}`;
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

    const prefix = getRefPrefix();
    const existingMatch = String(elements.refNumber.value).match(new RegExp(`^${prefix}-(\\d{1,2})$`));
    const suffix = existingMatch ? existingMatch[1].padStart(2, "0") : getNextRefSequence();
    elements.refNumber.value = `${prefix}-${suffix}`;
}

function openModal(type = "quote") {
    state.currentDocType = type;
    elements.docType.value = type;
    updateModalTitle();
    elements.documentModal.classList.add("active");
    elements.documentModal.setAttribute("aria-hidden", "false");
    goToStep(isExistingDocumentEditMode() ? getTotalSteps() : 1);
}

function getActionButtonMarkup(icon, label) {
    if (!label) {
        return `<span class="btn-icon" aria-hidden="true">${icon}</span>`;
    }

    return `<span class="btn-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;
}

function closeModal() {
    elements.documentModal.classList.remove("active");
    elements.documentModal.classList.remove("review-mode");
    elements.documentModal.classList.remove("final-preview-mode");
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
    elements.itemsContainer.innerHTML = "";
    state.itemCounter = 0;
    addItem();
    setToday();
    generateRefNumber();
    updateModalTitle();
}

function prepareNewDocument(type = "quote") {
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
    elements.docType.value = type;
    setToday();
    updateModalTitle();
}

function goToStep(step) {
    const totalSteps = getTotalSteps();
    state.currentStep = step;
    elements.documentModal.classList.toggle("review-mode", step === totalSteps);
    elements.documentModal.classList.toggle("final-preview-mode", step === totalSteps);

    document.querySelectorAll(".step[data-step]").forEach(el => {
        const stepNumber = Number(el.dataset.step);
        el.classList.remove("active", "completed");
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

    elements.prevBtn.style.display = step > 1 ? "block" : "none";
    elements.nextBtn.style.display = step < totalSteps ? "block" : "none";
    elements.saveBtn.style.display = (isExistingDocumentEditMode() || step === totalSteps) ? "block" : "none";
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

    if (targetStep > state.currentStep && !isExistingDocumentEditMode()) {
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

function addItem() {
    state.itemCounter += 1;
    const itemId = String(state.itemCounter);

    const itemDiv = document.createElement("div");
    itemDiv.className = "item-row expanded";
    itemDiv.dataset.itemId = itemId;
    itemDiv.innerHTML = `
        <div class="item-row-header">
            <button type="button" class="item-summary-toggle" data-toggle-item="${itemId}" aria-expanded="true">
                <span class="item-number">Item #${state.itemCounter}</span>
                <span class="item-summary-copy">
                    <span class="item-summary-title">New line item</span>
                    <span class="item-summary-meta">Qty 1 | Unit $0.00 | Total $0.00</span>
                </span>
                <span class="item-summary-hint">Click to edit</span>
            </button>
            <button type="button" class="remove-item" data-remove-item="${itemId}">Remove</button>
        </div>
        <div class="item-editor">
            <div class="form-group">
                <label>Description</label>
                <textarea class="item-description" rows="2" placeholder="Item description..."></textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Quantity</label>
                    <input type="number" class="item-quantity" value="1" min="0" step="1">
                </div>
                <div class="form-group item-total-price-usd-group">
                    <label>Total Price (USD)</label>
                    <input type="number" class="item-total-price" value="0" min="0" step="0.01">
                </div>
                <div class="form-group">
                    <label>Unit Price (USD)</label>
                    <input type="text" class="item-unit-price" value="0.00" inputmode="decimal" placeholder="0.00" readonly>
                </div>
            </div>
            <div class="item-pricing-options">
                <div class="item-pricing-option">
                    <label class="checkbox-row checkbox-row-block">
                        <input type="checkbox" class="item-manual-unit-toggle">
                        <span>Enter unit price manually</span>
                    </label>
                    <small class="field-help">Leave this off to auto-calculate the unit price from quantity and total.</small>
                </div>
                <div class="item-pricing-option item-currency-mode">
                    <label class="checkbox-row checkbox-row-block">
                        <input type="checkbox" class="item-dop-toggle">
                        <span>Enter total in DOP</span>
                    </label>
                    <small class="field-help">Converts pesos back to USD using RD$${DOP_PER_USD} = US$1.</small>
                </div>
            </div>
            <div class="form-row item-dop-row" style="display: none;">
                <div class="form-group item-total-price-dop-group">
                    <label>Total Price (DOP)</label>
                    <input type="number" class="item-total-price-dop" value="0" min="0" step="0.01">
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
    itemDiv.querySelector(".item-internal-panel").hidden = !state.showInternalPricing;
    updateItemPricing(itemDiv);
    setExpandedItem(itemDiv);
}

function removeItem(id) {
    const item = elements.itemsContainer.querySelector(`[data-item-id="${id}"]`);
    if (item) {
        const shouldExpandNeighbor = item.classList.contains("expanded");
        item.remove();
        refreshItemOrdering();
        if (shouldExpandNeighbor) {
            const nextItem = elements.itemsContainer.querySelector(".item-row");
            if (nextItem) {
                setExpandedItem(nextItem);
            }
        }
    }
}

function handleItemContainerClick(event) {
    const removeButton = event.target.closest("[data-remove-item]");
    if (removeButton) {
        removeItem(removeButton.dataset.removeItem);
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

function handleItemsChange(event) {
    const activeRow = event?.target?.closest?.(".item-row") || null;
    const shouldPreserveManualUnitInput = Boolean(
        event
        && event.type === "input"
        && event.target?.classList?.contains("item-unit-price")
    );

    elements.itemsContainer.querySelectorAll(".item-row").forEach(row => {
        updateItemPricing(row, {
            preserveManualUnitInput: shouldPreserveManualUnitInput && row === activeRow
        });
        updateItemSummary(row);
    });
    calculateTotals();
    updateEditorSummary();
}

function updateItemPricing(row, options = {}) {
    const { preserveManualUnitInput = false } = options;
    const quantity = parseFloat(row.querySelector(".item-quantity").value) || 0;
    const totalPriceInput = row.querySelector(".item-total-price");
    const totalPriceUsdGroup = row.querySelector(".item-total-price-usd-group");
    const unitPriceInput = row.querySelector(".item-unit-price");
    const dopToggle = row.querySelector(".item-dop-toggle");
    const dopRow = row.querySelector(".item-dop-row");
    const dopTotalPriceInput = row.querySelector(".item-total-price-dop");
    const manualToggle = row.querySelector(".item-manual-unit-toggle");

    let totalPrice = parseFloat(totalPriceInput.value) || 0;
    const isManual = manualToggle.checked;
    const usesDopTotal = dopToggle.checked;

    if (isManual && usesDopTotal) {
        dopToggle.checked = false;
    }

    const isUsingDopTotal = dopToggle.checked;
    dopRow.style.display = isUsingDopTotal ? "grid" : "none";
    if (totalPriceUsdGroup) {
        totalPriceUsdGroup.style.display = isUsingDopTotal ? "none" : "block";
    }
    unitPriceInput.readOnly = !isManual;
    totalPriceInput.readOnly = isUsingDopTotal;

    if (isManual) {
        const manualUnitPrice = parseDecimalInput(unitPriceInput.value);
        if (!preserveManualUnitInput) {
            unitPriceInput.value = manualUnitPrice.toFixed(2);
        }
        totalPriceInput.value = (manualUnitPrice * quantity).toFixed(2);
        dopTotalPriceInput.value = (manualUnitPrice * quantity * DOP_PER_USD).toFixed(2);
    } else {
        if (isUsingDopTotal) {
            const dopTotal = parseFloat(dopTotalPriceInput.value) || 0;
            totalPrice = dopTotal / DOP_PER_USD;
            totalPriceInput.value = totalPrice.toFixed(2);
        } else {
            dopTotalPriceInput.value = (totalPrice * DOP_PER_USD).toFixed(2);
        }
        const derivedUnitPrice = quantity > 0 ? totalPrice / quantity : 0;
        unitPriceInput.value = derivedUnitPrice.toFixed(2);
    }

    updateItemInternalMetrics(row);
}

function updateItemSummary(row) {
    const description = row.querySelector(".item-description").value.trim();
    const quantity = parseFloat(row.querySelector(".item-quantity").value) || 0;
    const totalPrice = parseFloat(row.querySelector(".item-total-price").value) || 0;
    const unitPrice = parseDecimalInput(row.querySelector(".item-unit-price").value);
    const usesDopTotal = row.querySelector(".item-dop-toggle").checked;
    const dopTotalPrice = parseFloat(row.querySelector(".item-total-price-dop").value) || 0;
    const upchargePercent = row.querySelector(".item-upcharge-percent").value;
    const title = description || "New line item";
    const compactTitle = title.length > 72 ? `${title.slice(0, 69)}...` : title;
    const totalLabel = usesDopTotal
        ? `Total ${formatCurrency(totalPrice)} from RD$${formatAmount(dopTotalPrice)}`
        : `Total ${formatCurrency(totalPrice)}`;

    row.querySelector(".item-summary-title").textContent = compactTitle;
    row.querySelector(".item-summary-meta").textContent = `Qty ${quantity || 0} | Unit ${formatCurrency(unitPrice)} | ${totalLabel} | Upcharge ${upchargePercent}`;
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

function getFooterWaveUrl() {
    return new URL("assets/rg-footer-wave.png", window.location.href).href;
}

function buildDocumentData() {
    const items = [];

    elements.itemsContainer.querySelectorAll(".item-row").forEach((row, index) => {
        const quantity = parseFloat(row.querySelector(".item-quantity").value) || 0;
        const totalPrice = parseFloat(row.querySelector(".item-total-price").value) || 0;
        const isManualUnitPrice = row.querySelector(".item-manual-unit-toggle").checked;
        const usesDopTotal = row.querySelector(".item-dop-toggle").checked;
        const totalPriceDop = parseFloat(row.querySelector(".item-total-price-dop").value) || 0;
        const internalCost = parseFloat(row.querySelector(".item-internal-cost").value) || 0;
        const unitPrice = isManualUnitPrice
            ? parseDecimalInput(row.querySelector(".item-unit-price").value)
            : (quantity > 0 ? totalPrice / quantity : 0);
        items.push({
            itemNo: index + 1,
            description: row.querySelector(".item-description").value.trim(),
            quantity: row.querySelector(".item-quantity").value || "-",
            unitPrice: unitPrice.toFixed(2),
            totalPrice: totalPrice.toFixed(2),
            totalPriceDop: totalPriceDop.toFixed(2),
            internalCost: internalCost.toFixed(2),
            upchargePercent: internalCost > 0 ? (((totalPrice - internalCost) / internalCost) * 100).toFixed(2) : "0.00",
            usesDopTotal,
            manualUnitPrice: isManualUnitPrice
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
        printedAt: elements.docDate.value ? `${elements.docDate.value}T12:00:00.000Z` : new Date().toISOString(),
        subtotal,
        total: subtotal,
        items
    };
}

function buildDocumentMarkup(doc) {
    const documentTitle = doc.type === "quote" ? "Quote" : "Invoice";
    const referenceLabel = doc.type === "quote" ? "Reference No." : `${documentTitle} Reference`;
    const primaryPartyLabel = doc.type === "quote" ? "For:" : "Bill To:";
    const showConsignee = doc.type !== "quote";
    const showPoNumber = hasMeaningfulPoNumber(doc.poNumber);
    const safeNotes = doc.notes && doc.notes.trim()
        ? escapeHtml(doc.notes.trim())
        : "<em>*No additional notes provided.</em>";

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
                <td>${escapeHtml(item.itemNo || index + 1)}</td>
                <td>${escapeHtml(item.description || "")}</td>
                <td>${escapeHtml(quantity)}</td>
                <td>${escapeHtml(formattedUnitPrice)}</td>
                <td>${escapeHtml(formattedLineTotal)}</td>
            </tr>
        `;
    }).join("");

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

            <table class="document-items">
                <colgroup>
                    <col style="width: 11%;">
                    <col style="width: 47%;">
                    <col style="width: 12%;">
                    <col style="width: 12%;">
                    <col style="width: 18%;">
                </colgroup>
                <thead>
                    <tr>
                        <th>Item no.</th>
                        <th>Item Description:</th>
                        <th>Quantity:</th>
                        <th>Unit Price<br>$USD</th>
                        <th>Total Price<br>$USD</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>

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
                <td>${escapeHtml(item.itemNo || index + 1)}</td>
                <td>${escapeHtml(item.description || "")}</td>
                <td>${escapeHtml(quantity)}</td>
                <td>${escapeHtml(formattedUnitPrice)}</td>
                <td>${escapeHtml(formattedLineTotal)}</td>
            </tr>
        `;
    }).join("");

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

            <table class="document-items">
                <colgroup>
                    <col style="width: 11%;">
                    <col style="width: 47%;">
                    <col style="width: 12%;">
                    <col style="width: 12%;">
                    <col style="width: 18%;">
                </colgroup>
                <thead>
                    <tr>
                        <th>Item no.</th>
                        <th>Item Description:</th>
                        <th>Quantity:</th>
                        <th>Unit Price<br>$USD</th>
                        <th>Total Price<br>$USD</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>

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

                @media print {
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
            <div id="previewContainer" class="preview-container">${buildDocumentMarkup(doc)}</div>
        </body>
        </html>
    `);
    printWindow.document.close();
}

async function persistDocument(options = {}) {
    const { exportAfterSave = false } = options;
    const isEditing = state.editingDocumentId !== null;
    const existingDocument = isEditing ? getDocumentById(state.editingDocumentId) : null;
    const doc = {
        ...(existingDocument || {}),
        id: state.editingDocumentId ?? Date.now(),
        type: elements.docType.value,
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
        const usesDopTotal = row.querySelector(".item-dop-toggle").checked;
        const totalPriceDop = parseFloat(row.querySelector(".item-total-price-dop").value) || 0;
        const internalCost = parseFloat(row.querySelector(".item-internal-cost").value) || 0;
        const manualUnitPrice = row.querySelector(".item-manual-unit-toggle").checked
            ? parseDecimalInput(row.querySelector(".item-unit-price").value)
            : null;
        doc.items.push({
            description: row.querySelector(".item-description").value,
            quantity: qty,
            price: manualUnitPrice ?? (qty > 0 ? totalPrice / qty : 0),
            unitPrice: manualUnitPrice ?? (qty > 0 ? totalPrice / qty : 0),
            totalPrice,
            totalPriceDop,
            internalCost,
            upchargePercent: internalCost > 0 ? (((totalPrice - internalCost) / internalCost) * 100) : 0,
            usesDopTotal,
            manualUnitPrice: manualUnitPrice !== null
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
        closeModal();
        renderDocuments();
    } catch (error) {
        alert(`Unable to save this ${doc.type} to the server.\n\n${error.message}`);
        return;
    }

    const actionLabel = isEditing ? "updated" : "saved";
    if (exportAfterSave) {
        openPrintWindow(doc);
        alert(`${doc.type === "quote" ? "Quote" : "Invoice"} ${actionLabel} successfully.\n\nA PDF preview has opened in a new window. Print only if you want to from there.`);
        return;
    }

    alert(`${doc.type === "quote" ? "Quote" : "Invoice"} ${actionLabel} successfully.`);
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
    const showingInvoiced = state.valueView === "invoiced";
    const totalValue = showingInvoiced ? invoicedValue : pipelineValue;

    elements.totalDocumentsStat.textContent = String(state.documents.length);
    elements.quoteCountStat.textContent = String(quoteCount);
    elements.invoiceCountStat.textContent = String(invoiceCount);
    elements.totalValueStat.textContent = formatCurrency(totalValue);
    elements.totalValueLabel.textContent = showingInvoiced ? t("amount_invoiced") : t("pipeline_value");
    elements.totalValueHint.textContent = showingInvoiced ? t("tap_view_pipeline") : t("tap_view_invoiced");
    elements.valueToggleCard.setAttribute("aria-pressed", String(showingInvoiced));
    elements.valueToggleCard.classList.toggle("is-invoiced", showingInvoiced);
}

function toggleValueView() {
    state.valueView = state.valueView === "pipeline" ? "invoiced" : "pipeline";
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
        const rowAriaLabel = `${doc.type} ${doc.refNumber || "document"} for ${doc.clientName || "unknown client"}`;

        return `
            <div class="document-row${isLockedSourceQuote ? " document-row-locked" : ""}"${cardViewId}${isLockedSourceQuote ? "" : ' tabindex="0" role="button"'} aria-label="${escapeHtml(rowAriaLabel)}">
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
                    ${getDocumentTagPreviewMarkup(doc)}
                </div>
                <div class="doc-row-total">
                    <span class="doc-total-label">${escapeHtml(t("total"))}</span>
                    <div class="doc-total">${formatCurrency(doc.total || 0)}</div>
                </div>
                <div class="doc-actions">
                    ${isLockedSourceQuote ? `<span class="doc-lock-note">${escapeHtml(t("locked_after_conversion"))}</span>` : `<button type="button" class="doc-action-btn" data-action="edit" data-id="${doc.id}">${escapeHtml(t("edit"))}</button>`}
                    ${isLockedSourceQuote ? "" : `<button type="button" class="doc-action-btn" data-action="export-pdf" data-id="${doc.id}">${escapeHtml(t("open_pdf_preview"))}</button>`}
                    ${doc.legacyPdfUrl ? `<button type="button" class="doc-action-btn" data-action="view-pdf" data-id="${doc.id}">${escapeHtml(t("view_pdf"))}</button>` : ""}
                    ${doc.type === "quote" && !isLockedSourceQuote ? `<button type="button" class="doc-action-btn" data-action="convert" data-id="${doc.id}">${escapeHtml(t("convert_to_invoice"))}</button>` : ""}
                    ${isLockedSourceQuote ? "" : `<button type="button" class="doc-action-btn doc-action-btn-danger" data-action="delete" data-id="${doc.id}">${escapeHtml(t("delete"))}</button>`}
                </div>
            </div>
        `;
    }).join("");
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
    if (!row || event.target.closest("[data-action]") || event.target.closest("[data-show-tags]")) {
        return;
    }

    event.preventDefault();
    editDocument(row.dataset.viewId);
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

    elements.itemsContainer.innerHTML = "";
    state.itemCounter = 0;

    doc.items.forEach(item => {
        addItem();
        const lastItem = elements.itemsContainer.querySelector(".item-row:last-child");
        lastItem.querySelector(".item-description").value = item.description || "";
        lastItem.querySelector(".item-quantity").value = item.quantity ?? 0;
        lastItem.querySelector(".item-total-price").value = item.totalPrice ?? ((parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)).toFixed(2);
        lastItem.querySelector(".item-dop-toggle").checked = Boolean(item.usesDopTotal);
        lastItem.querySelector(".item-total-price-dop").value = item.totalPriceDop ?? (((parseFloat(item.totalPrice) || ((parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0))) * DOP_PER_USD).toFixed(2));
        lastItem.querySelector(".item-manual-unit-toggle").checked = Boolean(item.manualUnitPrice);
        lastItem.querySelector(".item-unit-price").value = item.unitPrice ?? item.price ?? 0;
        lastItem.querySelector(".item-internal-cost").value = item.internalCost ?? 0;
        updateItemPricing(lastItem);
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
    openModal("invoice");
    populateFormFromDocument({ ...doc, type: "invoice", date: getLocalDateInputValue() });
    elements.docType.value = "invoice";
    setToday();
    generateRefNumber();
    updateModalTitle();
    goToStep(getTotalSteps());
    updateEditorSummary();
}
