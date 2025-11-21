const translations = {
    en: {
        // Navigation
        home: "Home",
        services: "Services",
        portfolio: "Portfolio",
        pricing: "Pricing",
        blog: "Blog",
        team: "Team",
        about: "About",
        bookNow: "Book Now",
        contact: "Contact",

        // Hero
        heroTitle: "Premium Digital Solutions",
        heroTagline: "Transform Your Business with Cutting-Edge Technology",
        heroDescription: "We create stunning websites, AI-powered solutions, and digital experiences that drive results.",
        getStarted: "Get Started",
        viewWork: "View Our Work",

        // Services
        servicesTitle: "Our Services",
        servicesSubtitle: "Comprehensive solutions for your digital needs",
        webDev: "Web Development",
        aiSolutions: "AI Solutions",
        posSystems: "POS Systems",
        socialMedia: "Social Media",

        // Contact
        contactTitle: "Get In Touch",
        contactTagline: "Let's Start a Conversation",
        fullName: "Full Name",
        email: "Email Address",
        phone: "Phone Number",
        message: "Message",
        sendMessage: "Send Message",

        // Booking
        bookingTitle: "Book Your Consultation",
        selectDate: "Select Date & Time",
        yourInfo: "Your Information",
        service: "Service",
        meetingType: "Meeting Type",
        selectService: "Select a service...",
        selectMeetingType: "Select meeting type...",
        videoCall: "Video Call (Zoom/Google Meet)",
        phoneCall: "Phone Call",
        inPerson: "In-Person Meeting",
        confirmBooking: "Confirm Booking",

        // Footer
        footerDesc: "Premium digital solutions for modern businesses.",
        quickLinks: "Quick Links",
        contactInfo: "Contact",
        allRights: "All rights reserved."
    },

    fr: {
        // Navigation
        home: "Accueil",
        services: "Services",
        portfolio: "Portfolio",
        pricing: "Tarifs",
        blog: "Blog",
        team: "Équipe",
        about: "À propos",
        bookNow: "Réserver",
        contact: "Contact",

        // Hero
        heroTitle: "Solutions Numériques Premium",
        heroTagline: "Transformez Votre Entreprise avec une Technologie de Pointe",
        heroDescription: "Nous créons des sites web époustouflants, des solutions alimentées par l'IA et des expériences numériques qui génèrent des résultats.",
        getStarted: "Commencer",
        viewWork: "Voir Nos Travaux",

        // Services
        servicesTitle: "Nos Services",
        servicesSubtitle: "Solutions complètes pour vos besoins numériques",
        webDev: "Développement Web",
        aiSolutions: "Solutions IA",
        posSystems: "Systèmes PDV",
        socialMedia: "Réseaux Sociaux",

        // Contact
        contactTitle: "Contactez-Nous",
        contactTagline: "Commençons une Conversation",
        fullName: "Nom Complet",
        email: "Adresse Email",
        phone: "Numéro de Téléphone",
        message: "Message",
        sendMessage: "Envoyer le Message",

        // Booking
        bookingTitle: "Réservez Votre Consultation",
        selectDate: "Sélectionnez Date et Heure",
        yourInfo: "Vos Informations",
        service: "Service",
        meetingType: "Type de Réunion",
        selectService: "Sélectionnez un service...",
        selectMeetingType: "Sélectionnez le type de réunion...",
        videoCall: "Appel Vidéo (Zoom/Google Meet)",
        phoneCall: "Appel Téléphonique",
        inPerson: "Réunion en Personne",
        confirmBooking: "Confirmer la Réservation",

        // Footer
        footerDesc: "Solutions numériques premium pour les entreprises modernes.",
        quickLinks: "Liens Rapides",
        contactInfo: "Contact",
        allRights: "Tous droits réservés."
    },

    de: {
        // Navigation
        home: "Startseite",
        services: "Dienstleistungen",
        portfolio: "Portfolio",
        pricing: "Preise",
        blog: "Blog",
        team: "Team",
        about: "Über uns",
        bookNow: "Jetzt Buchen",
        contact: "Kontakt",

        // Hero
        heroTitle: "Premium Digitale Lösungen",
        heroTagline: "Transformieren Sie Ihr Unternehmen mit Spitzentechnologie",
        heroDescription: "Wir erstellen beeindruckende Websites, KI-gestützte Lösungen und digitale Erlebnisse, die Ergebnisse liefern.",
        getStarted: "Loslegen",
        viewWork: "Unsere Arbeit",

        // Services
        servicesTitle: "Unsere Dienstleistungen",
        servicesSubtitle: "Umfassende Lösungen für Ihre digitalen Bedürfnisse",
        webDev: "Webentwicklung",
        aiSolutions: "KI-Lösungen",
        posSystems: "POS-Systeme",
        socialMedia: "Social Media",

        // Contact
        contactTitle: "Kontaktieren Sie Uns",
        contactTagline: "Lassen Sie uns ein Gespräch beginnen",
        fullName: "Vollständiger Name",
        email: "E-Mail-Adresse",
        phone: "Telefonnummer",
        message: "Nachricht",
        sendMessage: "Nachricht Senden",

        // Booking
        bookingTitle: "Buchen Sie Ihre Beratung",
        selectDate: "Datum und Uhrzeit wählen",
        yourInfo: "Ihre Informationen",
        service: "Dienstleistung",
        meetingType: "Meeting-Typ",
        selectService: "Wählen Sie eine Dienstleistung...",
        selectMeetingType: "Wählen Sie den Meeting-Typ...",
        videoCall: "Videoanruf (Zoom/Google Meet)",
        phoneCall: "Telefonanruf",
        inPerson: "Persönliches Treffen",
        confirmBooking: "Buchung Bestätigen",

        // Footer
        footerDesc: "Premium digitale Lösungen für moderne Unternehmen.",
        quickLinks: "Schnelllinks",
        contactInfo: "Kontakt",
        allRights: "Alle Rechte vorbehalten."
    }
};

// Language switcher
function setLanguage(lang) {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
}

// Chatbot translations
const chatbotTranslations = {
    en: {
        welcome: "Hello! 👋 Welcome to Jaff Studio! I'm here to help you with our services. How can I assist you today?",
        services: "Our Services",
        pricing: "Pricing",
        portfolio: "Portfolio",
        booking: "Book a Consultation",
        contactUs: "Contact Us",
        servicesResponse: "Our Services:\n\n🌐 Web Development - Custom websites and web applications\n🤖 AI Solutions - Chatbots and intelligent automation\n💳 POS Systems - Modern point-of-sale solutions\n📱 Social Media Management - Complete digital presence\n\nWant to learn more about any specific service?",
        pricingResponse: "Our Pricing:\n\n💎 Premium Package - $999/month (Complete digital solution)\n⭐ Professional Package - $599/month (Advanced features)\n📦 Starter Package - $299/month (Essential services)\n\nWould you like to discuss which package fits your needs?",
        portfolioResponse: "Check out our Portfolio page to see our latest projects! We've worked with clients across various industries including e-commerce, hospitality, and professional services.\n\nVisit: jaffstudio.com/portfolio.html",
        bookingResponse: "Great! I can help you schedule a consultation. Visit our booking page to choose a convenient time:\n\njaffstudio.com/booking.html\n\nOr would you like me to collect your details and have our team reach out to you?",
        contactResponse: "Contact Information:\n\n📧 Email: contact@jaffstudio.com\n📱 Phone: +41 (0) 44 123 4567\n📍 Address: Bahnhofstrasse 123, 8001 Zürich, Switzerland\n\nFeel free to reach out anytime!",
        emailAsk: "I'd love to send you more information! May I have your email address?",
        emailThanks: "Thank you! We'll send you more information shortly.",
        invalidEmail: "Please enter a valid email address.",
        typeMessage: "Type your message..."
    },
    fr: {
        welcome: "Bonjour! 👋 Bienvenue chez Jaff Studio! Je suis là pour vous aider avec nos services. Comment puis-je vous aider aujourd'hui?",
        services: "Nos Services",
        pricing: "Tarifs",
        portfolio: "Portfolio",
        booking: "Réserver une Consultation",
        contactUs: "Nous Contacter",
        servicesResponse: "Nos Services:\n\n🌐 Développement Web - Sites web et applications sur mesure\n🤖 Solutions IA - Chatbots et automatisation intelligente\n💳 Systèmes PDV - Solutions de point de vente modernes\n📱 Gestion des Réseaux Sociaux - Présence numérique complète\n\nVoulez-vous en savoir plus sur un service spécifique?",
        pricingResponse: "Nos Tarifs:\n\n💎 Forfait Premium - 999€/mois (Solution numérique complète)\n⭐ Forfait Professionnel - 599€/mois (Fonctionnalités avancées)\n📦 Forfait Starter - 299€/mois (Services essentiels)\n\nSouhaitez-vous discuter du forfait qui correspond à vos besoins?",
        portfolioResponse: "Consultez notre page Portfolio pour voir nos derniers projets! Nous avons travaillé avec des clients de divers secteurs, notamment le commerce électronique, l'hôtellerie et les services professionnels.\n\nVisitez: jaffstudio.com/portfolio.html",
        bookingResponse: "Parfait! Je peux vous aider à planifier une consultation. Visitez notre page de réservation pour choisir un moment qui vous convient:\n\njaffstudio.com/booking.html\n\nOu souhaitez-vous que je collecte vos coordonnées pour que notre équipe vous contacte?",
        contactResponse: "Coordonnées:\n\n📧 Email: contact@jaffstudio.com\n📱 Téléphone: +41 (0) 44 123 4567\n📍 Adresse: Bahnhofstrasse 123, 8001 Zürich, Suisse\n\nN'hésitez pas à nous contacter!",
        emailAsk: "J'aimerais vous envoyer plus d'informations! Puis-je avoir votre adresse email?",
        emailThanks: "Merci! Nous vous enverrons plus d'informations sous peu.",
        invalidEmail: "Veuillez entrer une adresse email valide.",
        typeMessage: "Tapez votre message..."
    },
    de: {
        welcome: "Hallo! 👋 Willkommen bei Jaff Studio! Ich bin hier, um Ihnen bei unseren Dienstleistungen zu helfen. Wie kann ich Ihnen heute helfen?",
        services: "Unsere Dienstleistungen",
        pricing: "Preise",
        portfolio: "Portfolio",
        booking: "Beratung Buchen",
        contactUs: "Kontakt",
        servicesResponse: "Unsere Dienstleistungen:\n\n🌐 Webentwicklung - Maßgeschneiderte Websites und Webanwendungen\n🤖 KI-Lösungen - Chatbots und intelligente Automatisierung\n💳 POS-Systeme - Moderne Kassenlösungen\n📱 Social Media Management - Komplette digitale Präsenz\n\nMöchten Sie mehr über einen bestimmten Service erfahren?",
        pricingResponse: "Unsere Preise:\n\n💎 Premium-Paket - 999€/Monat (Komplette digitale Lösung)\n⭐ Professional-Paket - 599€/Monat (Erweiterte Funktionen)\n📦 Starter-Paket - 299€/Monat (Grundlegende Dienste)\n\nMöchten Sie besprechen, welches Paket zu Ihren Bedürfnissen passt?",
        portfolioResponse: "Schauen Sie sich unsere Portfolio-Seite an, um unsere neuesten Projekte zu sehen! Wir haben mit Kunden aus verschiedenen Branchen gearbeitet, darunter E-Commerce, Gastgewerbe und professionelle Dienstleistungen.\n\nBesuchen Sie: jaffstudio.com/portfolio.html",
        bookingResponse: "Großartig! Ich kann Ihnen helfen, eine Beratung zu planen. Besuchen Sie unsere Buchungsseite, um eine passende Zeit zu wählen:\n\njaffstudio.com/booking.html\n\nOder möchten Sie, dass ich Ihre Daten sammle und unser Team sich bei Ihnen meldet?",
        contactResponse: "Kontaktinformationen:\n\n📧 E-Mail: contact@jaffstudio.com\n📱 Telefon: +41 (0) 44 123 4567\n📍 Adresse: Bahnhofstrasse 123, 8001 Zürich, Schweiz\n\nKontaktieren Sie uns jederzeit!",
        emailAsk: "Ich würde Ihnen gerne weitere Informationen senden! Darf ich Ihre E-Mail-Adresse haben?",
        emailThanks: "Danke! Wir werden Ihnen in Kürze weitere Informationen senden.",
        invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        typeMessage: "Nachricht eingeben..."
    }
};

// Get current language for chatbot
function getChatbotText(key) {
    const lang = localStorage.getItem('language') || 'en';
    return chatbotTranslations[lang][key] || chatbotTranslations['en'][key];
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
});
