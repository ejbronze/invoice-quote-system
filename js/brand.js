(() => {
    const BRAND = {
        name: "SantoSync",
        shortName: "Santo",
        legalName: "Palmchat Innovations LLC NYC",
        studioName: "Palmchat Innovations Lab",
        developerName: "Edwin Jaquez",
        tagline: "Premium workflow sync for quotes, invoices, and trade operations.",
        heroTitle: "Trade documents, tuned to move with you.",
        heroCopy: "Build premium quotes and invoices, keep teams aligned, and move client-facing paperwork through one polished operational workspace.",
        onboardingTitle: "Enter SantoSync",
        onboardingCopy: "Sign in to prepare polished quotes, confident invoices, and a more unified back-office workflow.",
        sessionTitle: "Opening SantoSync",
        sessionMessage: "Signing in and syncing your operational workspace...",
        aboutMeaning: "SantoSync is a coined product name designed to feel premium, steady, and coordinated. It suggests a calm, dependable system that keeps commercial work synchronized from first quote to final invoice.",
        aboutProduct: "SantoSync is a modern document and operations workspace with cleaner draft-versus-saved document flow, click-to-open records, stronger payment tracking, monthly exposure alerts, and fuller backup recovery across the workspace.",
        aboutDeveloper: "Created by Edwin Jaquez through Palmchat Innovations Lab under Palmchat Innovations LLC NYC, SantoSync is built to bring premium product identity and practical operational discipline into one workflow tool.",
        ui: {
            primary: "#1459d9",
            primaryDeep: "#0c3fa6",
            accent: "#17b889",
            accentWarm: "#ff9d42",
            ink: "#1f2f48",
            soft: "#6d809b",
            bg: "#f6f8ff"
        },
        typography: {
            display: "\"Fraunces\", Georgia, serif",
            ui: "\"Plus Jakarta Sans\", \"Avenir Next\", \"Segoe UI\", sans-serif"
        }
    };

    let logoInstanceCounter = 0;

    function getLogoSvg(variant = "icon") {
        logoInstanceCounter += 1;
        const instanceId = `santosync-logo-${logoInstanceCounter}`;
        const gradientId = `${instanceId}-gradient`;
        const mark = `
            <svg viewBox="0 0 80 80" aria-hidden="true">
                <defs>
                    <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#0c3fa6"/>
                        <stop offset="52%" stop-color="#1459d9"/>
                        <stop offset="100%" stop-color="#17b889"/>
                    </linearGradient>
                </defs>
                <rect x="8" y="8" width="64" height="64" rx="20" fill="url(#${gradientId})"/>
                <path d="M50,21 C50,13 22,13 22,30 C22,44 58,46 58,59" fill="none" stroke="rgba(255,255,255,0.96)" stroke-width="7" stroke-linecap="round"/>
                <path d="M30,59 C30,67 58,67 58,50 C58,36 22,34 22,21" fill="none" stroke="rgba(215,255,240,0.78)" stroke-width="7" stroke-linecap="round"/>
            </svg>
        `;

        if (variant === "monogram") {
            return mark;
        }

        if (variant === "lockup") {
            return `
                <span class="brand-lockup-mark">${mark}</span>
                <span class="brand-wordmark-text">
                    <span class="brand-wordmark-name">${BRAND.name}</span>
                    <span class="brand-wordmark-tagline">${BRAND.tagline}</span>
                </span>
            `;
        }

        if (variant === "wordmark") {
            return `
                <span class="brand-wordmark-text">
                    <span class="brand-wordmark-name">${BRAND.name}</span>
                    <span class="brand-wordmark-tagline">${BRAND.tagline}</span>
                </span>
            `;
        }

        return mark;
    }

    function renderLogo(target, variant = "icon") {
        if (!target) {
            return;
        }

        target.innerHTML = getLogoSvg(variant);
        target.dataset.brandVariant = variant;
    }

    function applyBrandTheme(doc = document) {
        const root = doc.documentElement;
        root.style.setProperty("--brand-primary", BRAND.ui.primary);
        root.style.setProperty("--brand-primary-deep", BRAND.ui.primaryDeep);
        root.style.setProperty("--brand-accent", BRAND.ui.accent);
        root.style.setProperty("--brand-accent-warm", BRAND.ui.accentWarm);
        root.style.setProperty("--brand-ink", BRAND.ui.ink);
        root.style.setProperty("--brand-soft", BRAND.ui.soft);
        root.style.setProperty("--brand-bg", BRAND.ui.bg);
        root.style.setProperty("--brand-display-font", BRAND.typography.display);
        root.style.setProperty("--brand-ui-font", BRAND.typography.ui);
        doc.title = BRAND.name;
    }

    window.SANTO_BRAND = BRAND;
    window.getSantoLogoSvg = getLogoSvg;
    window.renderSantoLogo = renderLogo;
    window.applySantoBrandTheme = applyBrandTheme;
})();
