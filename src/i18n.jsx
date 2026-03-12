import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Route mappings: NL path -> EN path
const nlToEn = {
  '/': '/en',
  '/over': '/en/about',
  '/diensten': '/en/services',
  '/diensten/werkprocessen': '/en/services/work-processes',
  '/diensten/tools-en-systemen': '/en/services/tools-and-systems',
  '/diensten/data-op-orde': '/en/services/data-management',
  '/werkwijze': '/en/approach',
  '/contact': '/en/contact',
  '/privacy': '/en/privacy',
  '/faq': '/en/faq',
};

// Reverse mapping: EN path -> NL path
const enToNl = Object.fromEntries(
  Object.entries(nlToEn).map(([nl, en]) => [en, nl])
);

// Internal path mapping for useLocalizedPath hook
// Maps canonical NL paths to their EN equivalents (without /en prefix consideration)
const pathMap = {
  '/': { nl: '/', en: '/en' },
  '/over': { nl: '/over', en: '/en/about' },
  '/diensten': { nl: '/diensten', en: '/en/services' },
  '/diensten/werkprocessen': { nl: '/diensten/werkprocessen', en: '/en/services/work-processes' },
  '/diensten/tools-en-systemen': { nl: '/diensten/tools-en-systemen', en: '/en/services/tools-and-systems' },
  '/diensten/data-op-orde': { nl: '/diensten/data-op-orde', en: '/en/services/data-management' },
  '/werkwijze': { nl: '/werkwijze', en: '/en/approach' },
  '/contact': { nl: '/contact', en: '/en/contact' },
  '/privacy': { nl: '/privacy', en: '/en/privacy' },
  '/faq': { nl: '/faq', en: '/en/faq' },
};

const translations = {
  en: {
    // Navbar
    navAbout: 'About',
    navServices: 'Services',
    navApproach: 'Approach',
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

    // Contact
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
    footerNavItems: ['Services', 'About', 'Approach'],
    footerContact: 'Contact',
    footerStatus: 'Available for Projects',
    footerKvk: 'CoC: 91814219',
    footerPrivacy: 'Privacy',

    // Mobile menu
    menuOpen: 'Open menu',
    menuClose: 'Close menu',

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

    // About Page
    aboutLabel: 'About GearShyft',
    aboutTitle: 'Process first, technology second.',
    aboutIntro: 'GearShyft helps growing businesses fix their processes. Not with more tools, but with practical solutions that fit how your team actually works.',
    aboutMissionTitle: 'Why GearShyft exists',
    aboutMissionText: 'Too many businesses struggle with outdated, manual, or overly complex processes. They know something needs to change, but not where to start. GearShyft bridges that gap. We understand your operations, find the friction, and build solutions that actually stick.',
    aboutValuesTitle: 'How we work',
    aboutValues: [
      { title: 'Process first', text: 'We understand the problem before picking a solution. Technology is a tool, not the starting point.' },
      { title: 'Build, not advise', text: 'We deliver working solutions, not decks and reports. You get something you can use tomorrow.' },
      { title: 'With your people', text: 'The best solutions come from the people who do the work. We build together with your team.' },
    ],
    aboutCta: 'Get in Touch',

    // Services Page
    servicesLabel: 'Services',
    servicesTitle: 'What we can do for you.',
    servicesIntro: 'Every business is different. We tailor our approach to your specific situation, but these are the areas where we help most.',
    servicesReadMore: 'Learn more',
    servicesCta: 'Discuss your situation',
    servicesAnalysisLabel: 'Every project starts here',
    servicesAnalysisTitle: 'Process Analysis',
    servicesAnalysisDesc: 'Before we improve, build, or organize anything, we first understand how your work actually gets done. We walk through your processes with the people on the floor, find the friction, and determine what will have the most impact.',
    servicesThenLabel: 'Then we get to work',
    service_werkprocessen_title: 'Improving Work Processes',
    service_werkprocessen_desc: 'Processes that worked at 10 people break at 50. We find where things go wrong and redesign how work gets done. Practical, on the floor, with your team.',
    service_toolsEnSystemen_title: 'Building Tools & Systems',
    service_toolsEnSystemen_desc: 'Spreadsheets, loose tools, manual workarounds. We build practical software that brings everything together in one place. Custom-built for how you work.',
    service_dataOpOrde_title: 'Organizing Your Data',
    service_dataOpOrde_desc: 'Scattered files, inconsistent formats, no overview. We structure your data, build dashboards, and make sure the right information is always at hand.',

    // Service Detail Pages
    serviceDetailBackLink: 'All services',
    serviceDetailCta: 'Discuss this with us',
    serviceDetailForWhoTitle: 'Is this for you?',

    serviceDetail_werkprocessen: {
      label: 'Improving Work Processes',
      intro: 'Processes that worked fine at 10 people often break at 50. Steps get skipped, information gets lost, and everyone has their own version of "how we do things here". We help you fix that.',
      sections: [
        { title: 'What we do', text: 'We walk through your processes with the people who actually do the work. Not from a boardroom, but on the floor. We map out what happens, find where things go wrong, and redesign the process so it actually works. No theory, no frameworks for the sake of frameworks. Just a better way of working.' },
        { title: 'What you get', text: 'A clear overview of your current process, including the bottlenecks and friction points nobody talks about. A redesigned process that is simpler, faster, and less error-prone. And a way of working your team can actually follow.' },
        { title: 'How we work', text: 'We start with observation and conversations. Then we design improvements together with your team. We test changes on a small scale first, adjust where needed, and roll out when it works. The whole cycle typically takes 4 to 8 weeks.' },
      ],
      forWho: 'Teams that feel things take too long, make too many errors, or keep reinventing the wheel. Companies growing faster than their processes can keep up with.',
      caseTitle: 'RoosterHub',
      caseText: 'A call center managed their shift planning in Excel. Privacy-sensitive data was shared via email, creating GDPR risks. We professionalized the process with a lightweight scheduling app. Cost: 1.10 per employee per month.',
    },
    serviceDetail_toolsEnSystemen: {
      label: 'Building Tools & Systems',
      intro: 'Your team works with six different tools, three spreadsheets, and a folder full of workarounds. Nothing talks to each other, and you lose time switching between systems. We build one tool that brings it all together.',
      sections: [
        { title: 'What we do', text: 'We look at the tools and systems your team currently uses, find out what works and what does not, and build practical software that replaces the chaos. This can be a dashboard, an internal tool, or a complete platform. Custom-built for how you actually work, not the other way around.' },
        { title: 'What you get', text: 'One place where your team can do their work. No more switching between systems, no more copy-pasting data, no more manual workarounds. A tool that fits your process, is easy to use, and grows with your business.' },
        { title: 'How we work', text: 'We start by understanding what your team needs and what gets in the way today. Then we design and build the solution in short cycles, testing with real users along the way. We deliver working software, not prototypes.' },
      ],
      forWho: 'Teams juggling too many separate tools and spreadsheets. Businesses that need custom software but do not want a year-long IT project. Anyone who has outgrown their current tooling.',
      caseTitle: 'Desk to Dash',
      caseText: 'A freelancer managed hours, invoices, expenses, VAT, and planning in 6 separate tools. We brought everything together into one platform purpose-built for independent professionals.',
    },
    serviceDetail_dataOpOrde: {
      label: 'Organizing Your Data',
      intro: 'Spreadsheets everywhere, inconsistent formats, no single source of truth. When your data is a mess, you cannot trust your reports, your team wastes time looking for information, and decisions are based on gut feeling instead of facts.',
      sections: [
        { title: 'What we do', text: 'We untangle your data. We map out what data you have, where it lives, and how it is being used. Then we structure it properly: a central database, clear formats, automated imports, and quality checks. So your data is reliable and accessible.' },
        { title: 'What you get', text: 'Clean, structured data you can actually trust. Dashboards that give you real-time insight into your operations. No more hunting through spreadsheets or doubting whether the numbers are right. A foundation you can build on.' },
        { title: 'How we work', text: 'We start with an inventory of your current data landscape. Then we design the target structure, migrate and clean the data, build automated imports, and set up dashboards. We make sure your team can maintain it independently.' },
      ],
      forWho: 'Businesses drowning in spreadsheets and inconsistent data. Teams that need better reporting but do not trust their current numbers. Companies preparing for growth that need a solid data foundation.',
      caseTitle: 'Biogas facility',
      caseText: 'Over 430 Excel tabs with inconsistent formats and no overview. We built a central database with automated imports, quality checks, and a dashboard that gives the team real-time insight into operations.',
    },

    // Approach Page
    approachLabel: 'Our Approach',
    approachTitle: 'How we get from problem to solution.',
    approachIntro: 'No rigid methodology or endless discovery phases. We work pragmatically, close to your team, and deliver results you can see.',
    approachSteps: [
      { title: 'Listen & Understand', text: 'We start by walking through your process with the people who do the actual work. No assumptions, no shortcuts. This is where the real insights come from.' },
      { title: 'Analyze & Design', text: 'Based on what we learn, we map out where the friction is and design a practical solution. Not the most complex one, but the one that fits.' },
      { title: 'Build & Implement', text: 'We build the solution and implement it with your team. Not a handoff, but hands-on. We make sure it works in practice, not just on paper.' },
      { title: 'Verify & Adjust', text: 'After launch, we check if it actually works the way it should. If something needs tweaking, we adjust. The goal is a process that runs smoothly without us.' },
    ],
    approachCta: 'Start the Conversation',

    // FAQ Page
    faqLabel: 'FAQ',
    faqTitle: 'Questions we hear often.',
    faqStillQuestions: 'Still have questions?',
    faqCta: 'Get in Touch',
    faqItems: [
      { q: 'What kind of businesses do you work with?', a: 'We work with growing businesses that feel their processes are holding them back. Usually 10-200 people, across different industries. If your team spends too much time on things that should be simpler, we can probably help.' },
      { q: 'Do you only work with technology?', a: 'No. Technology is a tool, not the goal. Sometimes the best solution is a simpler process, a clearer workflow, or better communication. We figure out what fits.' },
      { q: 'How long does a typical project take?', a: 'It depends on the scope, but most projects run 4 to 12 weeks. We prefer short, focused engagements where you see results quickly.' },
      { q: 'What does it cost?', a: 'Every project is different. We work with fixed project fees so you know what to expect. Get in touch and we will give you an honest estimate.' },
      { q: 'Where are you based?', a: 'We are based in the Netherlands and work with companies throughout the Benelux region. We work both on-site and remotely, depending on what the project needs.' },
    ],
  },

  nl: {
    // Navbar
    navAbout: 'Over Ons',
    navServices: 'Diensten',
    navApproach: 'Werkwijze',
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

    // Contact
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
    footerNavItems: ['Diensten', 'Over Ons', 'Werkwijze'],
    footerContact: 'Contact',
    footerStatus: 'Beschikbaar voor Projecten',
    footerKvk: 'KvK: 91814219',
    footerPrivacy: 'Privacy',

    // Mobile menu
    menuOpen: 'Menu openen',
    menuClose: 'Menu sluiten',

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

    // About Page
    aboutLabel: 'Over GearShyft',
    aboutTitle: 'Proces eerst, technologie tweede.',
    aboutIntro: 'GearShyft helpt groeiende bedrijven hun processen te verbeteren. Niet met meer tools, maar met praktische oplossingen die passen bij hoe jullie team echt werkt.',
    aboutMissionTitle: 'Waarom GearShyft bestaat',
    aboutMissionText: 'Te veel bedrijven worstelen met verouderde, handmatige of onnodig complexe processen. Ze weten dat er iets moet veranderen, maar niet waar te beginnen. GearShyft overbrugt die kloof. We begrijpen jullie operatie, vinden de frictie en bouwen oplossingen die echt blijven werken.',
    aboutValuesTitle: 'Hoe wij werken',
    aboutValues: [
      { title: 'Proces eerst', text: 'We begrijpen het probleem voordat we een oplossing kiezen. Technologie is een middel, niet het startpunt.' },
      { title: 'Bouwen, niet adviseren', text: 'We leveren werkende oplossingen, geen decks en rapporten. Je krijgt iets dat je morgen kunt gebruiken.' },
      { title: 'Met jullie mensen', text: 'De beste oplossingen komen van de mensen die het werk doen. We bouwen samen met jullie team.' },
    ],
    aboutCta: 'Neem Contact Op',

    // Services Page
    servicesLabel: 'Diensten',
    servicesTitle: 'Wat we voor jullie kunnen doen.',
    servicesIntro: 'Elk bedrijf is anders. We stemmen onze aanpak af op jullie specifieke situatie, maar dit zijn de gebieden waar we het meest helpen.',
    servicesReadMore: 'Meer informatie',
    servicesCta: 'Bespreek jullie situatie',
    servicesAnalysisLabel: 'Elk project begint hier',
    servicesAnalysisTitle: 'Procesanalyse',
    servicesAnalysisDesc: 'Voordat we iets verbeteren, bouwen of structureren, begrijpen we eerst hoe jullie werk echt gedaan wordt. We lopen het proces door met de mensen op de werkvloer, vinden de frictie, en bepalen wat de meeste impact heeft.',
    servicesThenLabel: 'Dan gaan we aan de slag',
    service_werkprocessen_title: 'Werkprocessen Verbeteren',
    service_werkprocessen_desc: 'Processen die werkten bij 10 mensen lopen vast bij 50. We vinden waar het misgaat en ontwerpen opnieuw hoe het werk gedaan wordt. Praktisch, op de werkvloer, met jullie team.',
    service_toolsEnSystemen_title: 'Tools & Systemen Bouwen',
    service_toolsEnSystemen_desc: 'Spreadsheets, losse tools, handmatige workarounds. Wij bouwen praktische software die alles samenvoegt op een plek. Op maat gemaakt voor hoe jullie werken.',
    service_dataOpOrde_title: 'Data op Orde Brengen',
    service_dataOpOrde_desc: 'Verspreide bestanden, inconsistente formats, geen overzicht. Wij structureren jullie data, bouwen dashboards, en zorgen dat de juiste informatie altijd bij de hand is.',

    // Service Detail Pages
    serviceDetailBackLink: 'Alle diensten',
    serviceDetailCta: 'Bespreek dit met ons',
    serviceDetailForWhoTitle: 'Is dit iets voor jullie?',

    serviceDetail_werkprocessen: {
      label: 'Werkprocessen Verbeteren',
      intro: 'Processen die prima werkten met 10 mensen lopen vaak vast bij 50. Stappen worden overgeslagen, informatie raakt kwijt, en iedereen heeft zijn eigen versie van "hoe we het hier doen". Wij helpen dat te fixen.',
      sections: [
        { title: 'Wat we doen', text: 'We lopen jullie processen door met de mensen die het werk daadwerkelijk doen. Niet vanuit een vergaderruimte, maar op de werkvloer. We brengen in kaart wat er gebeurt, vinden waar het misgaat, en ontwerpen het proces opnieuw zodat het echt werkt. Geen theorie, geen frameworks om de frameworks. Gewoon een betere manier van werken.' },
        { title: 'Wat je krijgt', text: 'Een helder overzicht van jullie huidige proces, inclusief de knelpunten en frictiepunten waar niemand over praat. Een herontworpen proces dat simpeler, sneller en minder foutgevoelig is. En een werkwijze die jullie team daadwerkelijk kan volgen.' },
        { title: 'Hoe we werken', text: 'We beginnen met observatie en gesprekken. Dan ontwerpen we verbeteringen samen met jullie team. We testen veranderingen eerst op kleine schaal, sturen bij waar nodig, en rollen uit wanneer het werkt. De hele cyclus duurt meestal 4 tot 8 weken.' },
      ],
      forWho: 'Teams die voelen dat dingen te lang duren, te veel fouten maken, of steeds het wiel opnieuw uitvinden. Bedrijven die sneller groeien dan hun processen kunnen bijhouden.',
      caseTitle: 'RoosterHub',
      caseText: 'Een callcenter regelde de dienstroosters in Excel. Privacygevoelige data werd via e-mail gedeeld, een AVG-risico. Wij hebben het proces geprofessionaliseerd met een lichtgewicht rooster-app. Kosten: 1,10 per medewerker per maand.',
    },
    serviceDetail_toolsEnSystemen: {
      label: 'Tools & Systemen Bouwen',
      intro: 'Jullie team werkt met zes verschillende tools, drie spreadsheets en een map vol workarounds. Niets praat met elkaar, en je verliest tijd met schakelen tussen systemen. Wij bouwen een tool die alles samenvoegt.',
      sections: [
        { title: 'Wat we doen', text: 'We kijken naar de tools en systemen die jullie team nu gebruikt, zoeken uit wat werkt en wat niet, en bouwen praktische software die de chaos vervangt. Dit kan een dashboard zijn, een interne tool, of een compleet platform. Op maat gemaakt voor hoe jullie echt werken, niet andersom.' },
        { title: 'Wat je krijgt', text: 'Een plek waar jullie team het werk kan doen. Geen geschakeld meer tussen systemen, geen data meer kopieren, geen handmatige workarounds meer. Een tool die past bij jullie proces, makkelijk te gebruiken is, en meegroeit met jullie bedrijf.' },
        { title: 'Hoe we werken', text: 'We beginnen met begrijpen wat jullie team nodig heeft en wat nu in de weg zit. Dan ontwerpen en bouwen we de oplossing in korte cycli, en testen met echte gebruikers onderweg. We leveren werkende software, geen prototypes.' },
      ],
      forWho: 'Teams die jongleren met te veel losse tools en spreadsheets. Bedrijven die maatwerk software nodig hebben maar geen jaarlang IT-project willen. Iedereen die uit zijn huidige tooling is gegroeid.',
      caseTitle: 'Desk to Dash',
      caseText: 'Een ZZP\'er beheerde uren, facturen, kosten, BTW en planning in 6 losse tools. Wij hebben alles samengebracht in een platform dat speciaal gebouwd is voor zelfstandig ondernemers.',
    },
    serviceDetail_dataOpOrde: {
      label: 'Data op Orde Brengen',
      intro: 'Overal spreadsheets, inconsistente formats, geen enkele bron van waarheid. Als jullie data een rommeltje is, kunnen jullie je rapporten niet vertrouwen, verliest je team tijd met zoeken naar informatie, en worden beslissingen genomen op onderbuikgevoel in plaats van feiten.',
      sections: [
        { title: 'Wat we doen', text: 'We ontwarren jullie data. We brengen in kaart welke data jullie hebben, waar die staat, en hoe die gebruikt wordt. Dan structureren we het goed: een centrale database, duidelijke formats, geautomatiseerde imports en kwaliteitschecks. Zodat jullie data betrouwbaar en toegankelijk is.' },
        { title: 'Wat je krijgt', text: 'Schone, gestructureerde data die je kunt vertrouwen. Dashboards die jullie realtime inzicht geven in de operatie. Geen gezoek meer door spreadsheets of twijfel of de cijfers kloppen. Een fundament waar je op kunt bouwen.' },
        { title: 'Hoe we werken', text: 'We beginnen met een inventarisatie van jullie huidige datalandschap. Dan ontwerpen we de doelstructuur, migreren en schonen de data, bouwen geautomatiseerde imports, en zetten dashboards op. We zorgen dat jullie team het zelfstandig kan onderhouden.' },
      ],
      forWho: 'Bedrijven die verdrinken in spreadsheets en inconsistente data. Teams die betere rapportages nodig hebben maar hun huidige cijfers niet vertrouwen. Organisaties die zich voorbereiden op groei en een solide datafundament nodig hebben.',
      caseTitle: 'Biogasinstallatie',
      caseText: 'Meer dan 430 Excel-tabs met inconsistente formats en geen overzicht. Wij bouwden een centrale database met automatische imports, kwaliteitschecks en een dashboard dat het team realtime inzicht geeft in de operatie.',
    },

    // Approach Page
    approachLabel: 'Onze Werkwijze',
    approachTitle: 'Hoe we van probleem naar oplossing komen.',
    approachIntro: 'Geen starre methodologie of eindeloze discovery-fases. We werken pragmatisch, dicht bij jullie team, en leveren resultaten die je kunt zien.',
    approachSteps: [
      { title: 'Luisteren & Begrijpen', text: 'We beginnen met het doorlopen van jullie proces met de mensen die het werk doen. Geen aannames, geen shortcuts. Hier komen de echte inzichten vandaan.' },
      { title: 'Analyseren & Ontwerpen', text: 'Op basis van wat we leren, brengen we in kaart waar de frictie zit en ontwerpen we een praktische oplossing. Niet de meest complexe, maar degene die past.' },
      { title: 'Bouwen & Implementeren', text: 'We bouwen de oplossing en implementeren die met jullie team. Geen overdracht, maar hands-on. We zorgen dat het werkt in de praktijk, niet alleen op papier.' },
      { title: 'Controleren & Bijsturen', text: 'Na de lancering checken we of het daadwerkelijk werkt zoals het zou moeten. Als iets bijgestuurd moet worden, doen we dat. Het doel is een proces dat soepel draait zonder ons.' },
    ],
    approachCta: 'Start het Gesprek',

    // FAQ Page
    faqLabel: 'Veelgestelde Vragen',
    faqTitle: 'Vragen die we vaak horen.',
    faqStillQuestions: 'Nog vragen?',
    faqCta: 'Neem Contact Op',
    faqItems: [
      { q: 'Met wat voor bedrijven werken jullie?', a: 'We werken met groeiende bedrijven die voelen dat hun processen hen tegenhouden. Meestal 10 tot 200 mensen, in verschillende branches. Als jullie team te veel tijd kwijt is aan dingen die simpeler zouden moeten zijn, kunnen we waarschijnlijk helpen.' },
      { q: 'Werken jullie alleen met technologie?', a: 'Nee. Technologie is een middel, niet het doel. Soms is de beste oplossing een simpeler proces, een duidelijkere workflow of betere communicatie. We zoeken uit wat past.' },
      { q: 'Hoe lang duurt een gemiddeld project?', a: 'Dat hangt af van de scope, maar de meeste projecten duren 4 tot 12 weken. We geven de voorkeur aan korte, gerichte trajecten waarbij je snel resultaat ziet.' },
      { q: 'Wat kost het?', a: 'Elk project is anders. We werken met vaste projectprijzen zodat je weet waar je aan toe bent. Neem contact op en we geven een eerlijke inschatting.' },
      { q: 'Waar zijn jullie gevestigd?', a: 'We zijn gevestigd in Nederland en werken met bedrijven door de hele Benelux. We werken zowel op locatie als remote, afhankelijk van wat het project nodig heeft.' },
    ],
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const location = useLocation();

  // Determine language from URL path
  const lang = location.pathname.startsWith('/en') ? 'en' : 'nl';
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, t }), [lang, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);

// Hook to get localized path from a canonical NL path
export const useLocalizedPath = (nlPath) => {
  const { lang } = useTranslation();
  const mapping = pathMap[nlPath];
  if (!mapping) return nlPath;
  return mapping[lang];
};

// Utility to get the alternate language path for hreflang
export const getAlternatePath = (currentPath) => {
  if (currentPath.startsWith('/en')) {
    return enToNl[currentPath] || '/';
  }
  return nlToEn[currentPath] || '/en';
};
