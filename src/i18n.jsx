import React, { createContext, useContext, useEffect, useState } from 'react';

const translations = {
  en: {
    // Navbar
    navMethod: 'Approach',
    navFunctional: 'What We Do',
    navArchive: 'How We Work',
    navCta: 'Get in Touch',

    // Hero
    heroLine1: "Yesterday's processes",
    heroLine2Before: "don't belong to",
    heroLine2After: "tomorrow's growth.",
    heroDesc: 'We fix operational friction with practical digital workflows, tools, and systems that fit how your team actually works.',
    heroCta: 'See How We Work',

    // Features - Card 1
    card1Title: 'Process First,',
    card1TitleBreak: 'Technology Second',
    card1Desc: "We understand the problem before choosing a solution. AI, automation, or a simpler workflow. We only use what actually helps.",
    card1Label1: 'Process Review',
    card1State1: 'Pending',
    card1Label2: 'Simplify Steps',
    card1State2: 'Active',
    card1Label3: 'Solution Live',
    card1State3: 'Complete',

    // Features - Card 2
    card2Badge: 'Building Mode',
    card2Title: 'We Build,',
    card2TitleBreak: "Not Just Advise",
    card2Desc: "No endless reports or strategy decks. We build practical solutions you can actually use in your daily operations.",
    card2Typewriter: '> Mapping current workflow...\n> Identifying friction points...\n> Building practical solution...\n> Testing with your team...\n> LIVE. Process running smoother.',

    // Features - Card 3
    card3Title: 'Built with',
    card3TitleBreak: 'Your People',
    card3Desc: 'The best solutions come from the people who know the work. We design together with your team, not from behind a desk.',
    card3Confirm: 'Confirm',
    card3Days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

    // Philosophy
    philSub: 'Most agencies sell technology as the answer.',
    philMain: 'We start with how',
    philHighlight: 'your work',
    philEnd: 'actually gets done.',

    // Protocol
    step01Title: 'Understand the Process',
    step01Desc: 'Before building anything, we walk through your process with the people who do the work. That is where the real insights are.',
    step02Title: 'Build the Solution',
    step02Desc: 'A workflow, tool, or system. Whatever fits. We build something practical that solves the actual problem.',
    step03Title: 'Make It Stick',
    step03Desc: 'A solution only works if your team actually uses it. We make sure it fits naturally into how people already work.',
    stepPrefix: 'Step',

    // Contact Section
    contactTitle: 'Let\'s have',
    contactHighlight: 'that conversation.',
    contactIntro: 'Tell us what\'s on your mind. No obligations, no sales pitch. Just an honest look at what could work better.',
    contactNameLabel: 'Name',
    contactNamePlaceholder: 'Your name',
    contactEmailLabel: 'Email',
    contactEmailPlaceholder: 'your@email.com',
    contactMessageLabel: 'Message',
    contactMessagePlaceholder: 'What process or challenge are you dealing with?',
    contactSubmit: 'Send Message',
    contactOrEmail: 'Rather just email?',
    contactDirectEmail: 'Send us a direct email',

    // CTA Banners
    ctaBanner1Text: 'Curious what we could improve for you?',
    ctaBanner1Btn: 'Get in Touch',
    ctaBanner2Text: 'Ready to make your processes work?',
    ctaBanner2Btn: 'Start the Conversation',

    // Footer
    footerDesc: 'Practical digital solutions for businesses that want their processes to be simpler, clearer, and less frustrating.',
    footerNav: 'Navigation',
    footerNavItems: ['What We Do', 'Our Approach', 'How We Work'],
    footerContact: 'Contact',
    footerStatus: 'Available for Projects',

    // Mobile menu
    menuOpen: 'Open menu',
    menuClose: 'Close menu',

    // Footer - KvK
    footerKvk: 'CoC: 91814219',

    // Footer - Privacy link
    footerPrivacy: 'Privacy',

    // Privacy Policy
    privacyTitle: 'Privacy Policy',
    privacyIntro: 'GearShyft respects your privacy. This policy explains what data we collect, why, and what your rights are.',
    privacySectionWho: 'Who are we?',
    privacySectionWhoText: 'GearShyft is a process improvement consultancy based in the Netherlands. For questions about this privacy policy, you can reach us at max@gearshyft.nl.',
    privacySectionWhat: 'What data do we collect?',
    privacySectionWhatText: 'When you use our contact form, we collect your name, email address, and the message you send us. We do not collect any other personal data.',
    privacySectionWhy: 'Why do we collect this data?',
    privacySectionWhyText: 'Solely to respond to your inquiry. We do not use your data for marketing, profiling, or any other purpose.',
    privacySectionCookies: 'Cookies and tracking',
    privacySectionCookiesText: 'This website does not use cookies or tracking technologies. We do not use analytics tools that track your behavior.',
    privacySectionSharing: 'Sharing with third parties',
    privacySectionSharingText: 'We do not sell or share your personal data with third parties, except where necessary to process your contact form submission (e.g., our form provider).',
    privacySectionRights: 'Your rights (GDPR)',
    privacySectionRightsText: 'Under the General Data Protection Regulation (GDPR), you have the right to access, correct, or delete your personal data. You can also object to processing or request data portability. To exercise these rights, email us at max@gearshyft.nl.',
    privacySectionChanges: 'Changes to this policy',
    privacySectionChangesText: 'We may update this policy from time to time. The latest version is always available on this website.',
    privacyClose: 'Close',
  },

  nl: {
    // Navbar
    navMethod: 'Aanpak',
    navFunctional: 'Wat We Doen',
    navArchive: 'Hoe We Werken',
    navCta: 'Neem Contact Op',

    // Hero
    heroLine1: 'Processen van gisteren',
    heroLine2Before: 'horen niet bij',
    heroLine2After: 'groei van morgen.',
    heroDesc: 'Wij lossen operationele frictie op met praktische digitale workflows, tools en systemen die passen bij hoe jullie team echt werkt.',
    heroCta: 'Bekijk Onze Aanpak',

    // Features - Card 1
    card1Title: 'Eerst het Proces,',
    card1TitleBreak: 'Dan de Technologie',
    card1Desc: 'We begrijpen eerst het probleem voordat we een oplossing kiezen. AI, automatisering of een simpelere workflow. We gebruiken alleen wat echt helpt.',
    card1Label1: 'Proces Review',
    card1State1: 'In wacht',
    card1Label2: 'Stappen Vereenvoudigen',
    card1State2: 'Actief',
    card1Label3: 'Oplossing Live',
    card1State3: 'Gereed',

    // Features - Card 2
    card2Badge: 'Bouwmodus',
    card2Title: 'Wij Bouwen,',
    card2TitleBreak: 'Niet Alleen Adviseren',
    card2Desc: 'Geen eindeloze rapporten of strategiedecks. Wij bouwen praktische oplossingen die je daadwerkelijk gebruikt in je dagelijkse operatie.',
    card2Typewriter: '> Huidige workflow in kaart brengen...\n> Frictiepunten identificeren...\n> Praktische oplossing bouwen...\n> Testen met jullie team...\n> LIVE. Proces loopt soepeler.',

    // Features - Card 3
    card3Title: 'Gebouwd met',
    card3TitleBreak: 'Jullie Mensen',
    card3Desc: 'De beste oplossingen komen van de mensen die het werk kennen. We ontwerpen samen met jullie team, niet vanachter een bureau.',
    card3Confirm: 'Bevestig',
    card3Days: ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'],

    // Philosophy
    philSub: 'De meeste bureaus verkopen technologie als het antwoord.',
    philMain: 'Wij beginnen bij hoe',
    philHighlight: 'jullie werk',
    philEnd: 'werkelijk gedaan wordt.',

    // Protocol
    step01Title: 'Het Proces Begrijpen',
    step01Desc: 'Voordat we iets bouwen, lopen we het proces door met de mensen die het werk doen. Daar zitten de echte inzichten.',
    step02Title: 'De Oplossing Bouwen',
    step02Desc: 'Een workflow, tool of systeem. Wat het beste past. We bouwen iets praktisch dat het echte probleem oplost.',
    step03Title: 'Zorgen dat het Blijft Werken',
    step03Desc: 'Een oplossing werkt alleen als je team het ook echt gebruikt. We zorgen dat het natuurlijk past in hoe mensen al werken.',
    stepPrefix: 'Stap',

    // Contact Section
    contactTitle: 'Laten we',
    contactHighlight: 'dat gesprek voeren.',
    contactIntro: 'Vertel ons wat er speelt. Geen verplichtingen, geen verkooppraatje. Gewoon een eerlijke blik op wat beter kan.',
    contactNameLabel: 'Naam',
    contactNamePlaceholder: 'Je naam',
    contactEmailLabel: 'E-mail',
    contactEmailPlaceholder: 'jouw@email.nl',
    contactMessageLabel: 'Bericht',
    contactMessagePlaceholder: 'Met welk proces of uitdaging zitten jullie?',
    contactSubmit: 'Verstuur Bericht',
    contactOrEmail: 'Liever direct mailen?',
    contactDirectEmail: 'Stuur ons een e-mail',

    // CTA Banners
    ctaBanner1Text: 'Benieuwd wat we voor jullie kunnen verbeteren?',
    ctaBanner1Btn: 'Neem Contact Op',
    ctaBanner2Text: 'Klaar om jullie processen echt werkend te maken?',
    ctaBanner2Btn: 'Start het Gesprek',

    // Footer
    footerDesc: 'Praktische digitale oplossingen voor bedrijven die hun processen simpeler, duidelijker en minder frustrerend willen maken.',
    footerNav: 'Navigatie',
    footerNavItems: ['Wat We Doen', 'Onze Aanpak', 'Hoe We Werken'],
    footerContact: 'Contact',
    footerStatus: 'Beschikbaar voor Projecten',

    // Mobile menu
    menuOpen: 'Menu openen',
    menuClose: 'Menu sluiten',

    // Footer - KvK
    footerKvk: 'KvK: 91814219',

    // Footer - Privacy link
    footerPrivacy: 'Privacy',

    // Privacy Policy
    privacyTitle: 'Privacyverklaring',
    privacyIntro: 'GearShyft respecteert je privacy. In deze verklaring leggen we uit welke gegevens we verzamelen, waarom, en wat je rechten zijn.',
    privacySectionWho: 'Wie zijn wij?',
    privacySectionWhoText: 'GearShyft is een procesverbeteringsbureau gevestigd in Nederland. Voor vragen over dit privacybeleid kun je ons bereiken via max@gearshyft.nl.',
    privacySectionWhat: 'Welke gegevens verzamelen we?',
    privacySectionWhatText: 'Wanneer je ons contactformulier gebruikt, verzamelen we je naam, e-mailadres en het bericht dat je stuurt. We verzamelen geen andere persoonsgegevens.',
    privacySectionWhy: 'Waarom verzamelen we deze gegevens?',
    privacySectionWhyText: 'Uitsluitend om te reageren op je vraag. We gebruiken je gegevens niet voor marketing, profilering of andere doeleinden.',
    privacySectionCookies: 'Cookies en tracking',
    privacySectionCookiesText: 'Deze website gebruikt geen cookies of trackingtechnologieen. We gebruiken geen analysetools die je gedrag volgen.',
    privacySectionSharing: 'Delen met derden',
    privacySectionSharingText: 'We verkopen of delen je persoonsgegevens niet met derden, behalve waar nodig voor de verwerking van je contactformulier (bijv. onze formulierenprovider).',
    privacySectionRights: 'Je rechten (AVG)',
    privacySectionRightsText: 'Op grond van de Algemene Verordening Gegevensbescherming (AVG) heb je het recht om je persoonsgegevens in te zien, te corrigeren of te verwijderen. Je kunt ook bezwaar maken tegen verwerking of verzoeken om gegevensoverdracht. Neem hiervoor contact op via max@gearshyft.nl.',
    privacySectionChanges: 'Wijzigingen in dit beleid',
    privacySectionChangesText: 'We kunnen dit beleid van tijd tot tijd aanpassen. De meest recente versie is altijd beschikbaar op deze website.',
    privacyClose: 'Sluiten',
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('nl');
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
