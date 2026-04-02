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
        aboutProduct: "SantoSync is a modern document and operations workspace for teams that need quotes, invoices, company identity, and day-to-day workflow details to stay aligned.",
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

    function getLogoSvg(variant = "icon") {
        const mark = `
            <svg viewBox="0 0 80 80" aria-hidden="true">
                <defs>
                    <linearGradient id="santosyncGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#0c3fa6"/>
                        <stop offset="52%" stop-color="#1459d9"/>
                        <stop offset="100%" stop-color="#17b889"/>
                    </linearGradient>
                    <linearGradient id="santosyncStrokeA" x1="12%" y1="14%" x2="88%" y2="86%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="100%" stop-color="#d7fff0"/>
                    </linearGradient>
                    <linearGradient id="santosyncStrokeB" x1="88%" y1="14%" x2="12%" y2="86%">
                        <stop offset="0%" stop-color="#cce1ff"/>
                        <stop offset="100%" stop-color="#ffffff"/>
                    </linearGradient>
                </defs>
                <rect x="8" y="8" width="64" height="64" rx="22" fill="url(#santosyncGradient)"/>
                <path d="M46 21c-7.8 0-13 3.9-13 9.1 0 3.7 2.6 6.1 7.7 7.5l7.2 1.9c3.7 1 5.2 2.1 5.2 4.1 0 2.7-2.8 4.4-7.4 4.4-4.9 0-8.6-1.5-12.2-4.8" fill="none" stroke="url(#santosyncStrokeA)" stroke-width="6.6" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M34 59c7.8 0 13-3.9 13-9.1 0-3.7-2.6-6.1-7.7-7.5l-7.2-1.9c-3.7-1-5.2-2.1-5.2-4.1 0-2.7 2.8-4.4 7.4-4.4 4.9 0 8.6 1.5 12.2 4.8" fill="none" stroke="url(#santosyncStrokeB)" stroke-width="6.6" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="27" cy="36.5" r="2.7" fill="#dffbf2"/>
                <circle cx="53" cy="43.5" r="2.7" fill="#ffffff"/>
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
