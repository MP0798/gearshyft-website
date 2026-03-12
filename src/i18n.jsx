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
  '/blog': '/en/blog',
  '/projecten': '/en/projects',
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
  '/blog': { nl: '/blog', en: '/en/blog' },
  '/projecten': { nl: '/projecten', en: '/en/projects' },
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
    contactSending: 'Sending...',
    contactSuccessTitle: 'Message sent!',
    contactSuccessText: 'We\'ll get back to you as soon as possible.',
    contactSpamNote: 'Check your spam folder if you don\'t see our confirmation email.',
    contactError: 'Something went wrong. Try again or email us directly.',
    contactOrEmail: 'Rather just email?',
    contactDirectEmail: 'Send us a direct email',
    contactOrCall: 'Rather talk it through?',
    contactCalendly: 'Schedule an introduction',

    // CTA Banners
    ctaBanner1Text: 'Curious what we could improve for you?',
    ctaBanner1Btn: 'Get in Touch',
    ctaBanner2Text: 'Ready to make your processes work?',
    ctaBanner2Btn: 'Start the Conversation',

    // Footer
    footerDesc: 'Practical digital solutions for businesses that want their processes to be simpler, clearer, and less frustrating.',
    footerNav: 'Navigation',
    footerNavItems: ['Services', 'About', 'Approach', 'Blog'],
    footerContact: 'Contact',
    footerStatus: 'Available for Projects',
    footerKvk: 'CoC: 91814219',
    footerPrivacy: 'Privacy',

    // Blog
    blogLabel: 'Blog',
    blogTitle: 'Insights from Practice',
    blogIntro: 'Tips, cases and lessons from the field. How real businesses improve their processes, without the jargon.',
    blogReadMore: 'Read More',
    blogBackLink: 'Back to Blog',

    // Projects Page
    projectsLabel: 'Projects',
    projectsTitle: 'Built, not just talked about.',
    projectsIntro: 'Real projects, real results. This is what it looks like when we get to work.',
    projectsItems: [
      {
        name: 'RoosterHub',
        tag: 'Work Processes',
        slug: 'work-processes',
        situation: 'A call center managed shift schedules in Excel. Privacy-sensitive data was shared via email, creating a GDPR risk. Onboarding new planners took 2 weeks because the process was undocumented and overly complex.',
        approach: 'We walked through the entire scheduling process with the team on the floor. Simplified the steps, removed unnecessary handoffs, and built a lightweight scheduling app that does exactly what they needed.',
        results: [
          'Cost: \u20AC1.10 per employee per month',
          'Onboarding time: from 2 weeks to 1 day',
          'GDPR risk eliminated',
          'Zero Excel files in the process',
        ],
      },
      {
        name: 'Desk to Dash',
        tag: 'Tools & Systems',
        slug: 'tools-and-systems',
        situation: 'A freelancer managed hours, invoices, expenses, VAT, and planning in 6 separate tools. Switching between apps, manually copying data, and reconciling numbers at the end of each month. Hours lost every week.',
        approach: 'We mapped out all the flows, identified where data was duplicated or manually transferred, and built a single platform that brings everything together.',
        results: [
          'From 6 tools to 1 platform',
          'Month-end close: from a full day to a few clicks',
          'One login, one overview',
          'Ready for the accountant automatically',
        ],
      },
      {
        name: 'Industrial company',
        tag: 'Data Management',
        slug: 'data-management',
        situation: 'A mid-sized industrial company managed operational data across 430+ Excel tabs. Inconsistent formats, no overview, and a team losing hours every week manually merging data. Nobody could say with certainty which numbers were correct.',
        approach: 'We migrated everything to a central database with automated imports from existing sources and quality checks that catch errors before they end up in a report.',
        results: [
          '430+ Excel tabs replaced by one database',
          'Live dashboard for the entire team',
          'Automated data imports and quality checks',
          'Hours per week freed up for actual work',
        ],
      },
    ],
    projectsSituationLabel: 'The situation',
    projectsApproachLabel: 'What we did',
    projectsResultsLabel: 'Results',
    projectsServiceLink: 'More about this service',

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
    privacySectionCookiesText: 'This website uses Google Analytics (GA4) to understand how visitors use our site. GA4 collects anonymized usage data and may place cookies. We do not use this data for marketing or profiling. You can opt out via your browser settings or a plugin like Google Analytics Opt-out.',
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
    aboutIntro: 'GearShyft helps businesses fix their processes. Not with more tools, but with practical solutions that fit how your team actually works.',

    // Gear metaphor statement
    aboutGearLine1: 'Your engine doesn\'t work harder.',
    aboutGearLine2: 'You just go',
    aboutGearHighlight: 'faster.',
    aboutGearDesc: 'In a higher gear, you get more out of the same RPM. Less effort, more output. That\'s GearShyft.',

    // About Max
    maxPhotoAlt: 'Max Poppes - Founder of GearShyft',
    aboutMaxLabel: 'The person behind GearShyft',
    aboutMaxName: 'Max Poppes',
    aboutMaxRole: 'Founder',
    aboutMaxBio: 'Background in entrepreneurship, always drawn to technology and making things simpler. Experience across SaaS, data, and energy. In every role, the same thing stood out: there was always room for a more efficient way. That\'s what I dig into.',
    aboutMaxQuote: 'Call me lazy. I\'d rather do it smart.',
    aboutMaxOrigin: 'After finishing my studies and several internships, the same thing kept coming back: improving or building solutions. No more doubt, that became GearShyft.',

    // What GearShyft is (and isn't)
    aboutIdentityTitle: 'What GearShyft is',
    aboutIdentityIs: [
      'A practical builder who makes processes work better',
      'Someone who honestly assesses what\'s needed',
      'A partner who implements, not just advises',
    ],
    aboutIdentityIsNotTitle: 'And what it\'s not',
    aboutIdentityIsNot: [
      'Not a consultancy that only delivers slides',
      'Not an AI agency that slaps AI on everything',
      'Not a software shop that pushes technology',
    ],

    // How we work (values)
    aboutValuesTitle: 'How we work',
    aboutValues: [
      { title: 'Process first', text: 'We understand the problem before picking a solution. Technology is a tool, not the starting point.', number: '01' },
      { title: 'Build, not advise', text: 'We deliver working solutions, not decks and reports. You get something you can use tomorrow.', number: '02' },
      { title: 'With your people', text: 'The best solutions come from the people who do the work. We build together with your team.', number: '03' },
    ],

    // What to expect
    aboutExpectTitle: 'What to expect',
    aboutExpectItems: [
      { title: 'Short lines', text: 'No layers, no lead time. Direct contact, fast decisions.' },
      { title: 'Direct impact', text: 'No months-long programs. We focus on what makes the biggest difference right now.' },
      { title: 'No nonsense', text: 'No buzzwords, no unnecessary complexity. Just solutions that work.' },
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
      intro: 'Your process works. Kind of. But it takes too long, things fall through the cracks, and onboarding new people takes weeks because nobody knows exactly how things should be done. We fix that.',
      sections: [
        { title: 'On the floor, not in the boardroom', text: 'We always start with the people who do the work. Shadowing, asking questions, observing. Where is work being done twice? Where is someone waiting on someone else? Which step gets skipped every time because nobody understands why it exists? The real bottlenecks are not in an org chart. They are in the daily grind.' },
        { title: 'From chaos to a process that works', text: 'Based on what we see, we redesign the process. Not on paper, but together with your team. Fewer steps, clearer responsibilities, less room for errors. The result: a way of working you can explain to a new colleague in 5 minutes.' },
        { title: 'Start small, then scale', text: 'We test every change with a small team or a single process first. Does it work? Then we expand. Does something not work? We adjust. No big change management program, no months-long implementation. Usually the first improvements are live within 2 to 3 weeks.' },
      ],
      forWho: 'Teams where things take too long, errors keep repeating, or everyone does it slightly differently. Companies that are growing and notice their processes are not keeping up.',
      caseTitle: 'RoosterHub',
      caseText: 'A call center managed shift schedules in Excel. Privacy-sensitive data was shared via email, a GDPR risk. We walked through the entire scheduling process with the team, simplified the steps, and built a lightweight scheduling app that does exactly what they needed. Cost: 1.10 per employee per month. Onboarding time for new planners: from 2 weeks to 1 day.',
    },
    serviceDetail_toolsEnSystemen: {
      label: 'Building Tools & Systems',
      intro: 'Excel as a database. WhatsApp as a ticket system. A shared folder where nobody can find anything anymore. Sound familiar? You have outgrown your current tooling. Time for something that actually works.',
      sections: [
        { title: 'One tool instead of six', text: 'We replace the patchwork of separate tools, spreadsheets, and workarounds with a system that fits your work. That can be an internal dashboard, a client portal, a planning tool, or a platform that combines multiple processes. Not an off-the-shelf software package you have to adapt to. Software that adapts to you.' },
        { title: 'Built with you, not for you', text: 'We build in short rounds of 1 to 2 weeks. After each round we show what we have and ask for feedback. Your team tests from day one. That way we do not build something that is technically correct but nobody wants to use. We build something your team will actually use because it makes their work easier.' },
        { title: 'Deliver, hand over, done', text: 'We deliver working software, not prototypes or mockups. Including documentation and a proper handover to your team. Want to adjust or expand it later? You can. The system belongs to you, not to us.' },
      ],
      forWho: 'Businesses stuck on their current tooling but not looking for a year-long IT project. Teams that lose time every day switching, copying, and doing manual work that should have been automated long ago.',
      caseTitle: 'Desk to Dash',
      caseText: 'A freelancer managed hours, invoices, expenses, VAT, and planning in 6 separate tools. We mapped out all the flows and built a platform that brings everything together. One login, a clear overview, and at the end of the month everything ready for the accountant in a few clicks.',
    },
    serviceDetail_dataOpOrde: {
      label: 'Organizing Your Data',
      intro: 'You have the data. Somewhere. Spread across dozens of spreadsheets, in different formats, maintained by different people. Nobody can say with certainty which number is correct. That is about to change.',
      sections: [
        { title: 'First, understand what you have', text: 'We start with an inventory. What data do you have, where does it live, who maintains it, and how is it used? This alone is often an eye-opener. Most companies have no idea how much time they spend searching, manually transferring, and checking whether numbers are correct. We map it out, including what it costs.' },
        { title: 'A single source of truth', text: 'We build a central place for your data. No more spreadsheets as databases, but a real structure: consistent formats, automated imports from your existing sources, and quality checks that catch errors before they end up in a report. The result is data you can trust without having to double-check it every time.' },
        { title: 'Insight instead of gut feeling', text: 'On top of the clean data we build dashboards your team can use every day. Not a one-time report that ends up in a drawer, but live insight into what is happening in your operations. And we make sure you can maintain it yourselves. No dependency on us.' },
      ],
      forWho: 'Businesses where nobody can say with certainty whether the numbers are right. Teams that spend more time searching for and copying data than actually doing something with it. Organizations that want to grow but need to get their data foundation in order first.',
      caseTitle: 'Industrial company',
      caseText: 'A mid-sized industrial company managed operational data across 430+ Excel tabs. Inconsistent formats, no overview, and a team losing hours every week manually merging data. We migrated everything to a central database with automated imports and quality checks. The team now has a live dashboard and spends those hours on their actual work.',
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
    contactSending: 'Versturen...',
    contactSuccessTitle: 'Bericht verstuurd!',
    contactSuccessText: 'We nemen zo snel mogelijk contact met je op.',
    contactSpamNote: 'Geen bevestiging ontvangen? Check je spam- of ongewenste-map.',
    contactError: 'Er ging iets mis. Probeer het opnieuw of mail ons direct.',
    contactOrEmail: 'Liever direct mailen?',
    contactDirectEmail: 'Stuur ons een e-mail',
    contactOrCall: 'Liever even sparren?',
    contactCalendly: 'Plan een kennismaking',

    // CTA Banners
    ctaBanner1Text: 'Benieuwd wat we voor jullie kunnen verbeteren?',
    ctaBanner1Btn: 'Neem Contact Op',
    ctaBanner2Text: 'Klaar om jullie processen echt werkend te maken?',
    ctaBanner2Btn: 'Start het Gesprek',

    // Footer
    footerDesc: 'Praktische digitale oplossingen voor bedrijven die hun processen simpeler, duidelijker en minder frustrerend willen maken.',
    footerNav: 'Navigatie',
    footerNavItems: ['Diensten', 'Over Ons', 'Werkwijze', 'Blog'],
    footerContact: 'Contact',
    footerStatus: 'Beschikbaar voor Projecten',
    footerKvk: 'KvK: 91814219',
    footerPrivacy: 'Privacy',

    // Blog
    blogLabel: 'Blog',
    blogTitle: 'Inzichten uit de Praktijk',
    blogIntro: 'Tips, cases en lessen uit het veld. Hoe echte bedrijven hun processen verbeteren, zonder het jargon.',
    blogReadMore: 'Lees Meer',
    blogBackLink: 'Terug naar Blog',

    // Projects Page
    projectsLabel: 'Projecten',
    projectsTitle: 'Gebouwd, niet alleen besproken.',
    projectsIntro: 'Echte projecten, echte resultaten. Dit is hoe het eruitziet als we aan de slag gaan.',
    projectsItems: [
      {
        name: 'RoosterHub',
        tag: 'Werkprocessen',
        slug: 'werkprocessen',
        situation: 'Een callcenter regelde dienstroosters in Excel. Privacygevoelige data ging via e-mail rond, een AVG-risico. Nieuwe planners inwerken duurde 2 weken omdat het proces niet was vastgelegd en onnodig complex was.',
        approach: 'We hebben het hele roosterproces doorgelicht op de werkvloer met het team. Stappen vereenvoudigd, onnodige schakels verwijderd en een lichtgewicht rooster-app gebouwd die precies doet wat ze nodig hadden.',
        results: [
          'Kosten: \u20AC1,10 per medewerker per maand',
          'Inwerktijd: van 2 weken naar 1 dag',
          'AVG-risico weggenomen',
          'Nul Excel-bestanden in het proces',
        ],
      },
      {
        name: 'Desk to Dash',
        tag: 'Tools & Systemen',
        slug: 'tools-en-systemen',
        situation: 'Een ZZP\'er beheerde uren, facturen, kosten, BTW en planning in 6 losse tools. Schakelen tussen apps, handmatig data kopieren en aan het eind van elke maand alles afstemmen. Uren per week kwijt.',
        approach: 'We hebben alle stromen in kaart gebracht, onderzocht waar data gedupliceerd of handmatig overgezet werd, en een platform gebouwd dat alles samenvoegt.',
        results: [
          'Van 6 tools naar 1 platform',
          'Maandafsluiting: van een hele dag naar een paar klikken',
          'E\u00E9n login, \u00E9\u00E9n overzicht',
          'Automatisch klaar voor de boekhouder',
        ],
      },
      {
        name: 'Industrieel bedrijf',
        tag: 'Data op Orde',
        slug: 'data-op-orde',
        situation: 'Een middelgroot industrieel bedrijf beheerde operationele data in meer dan 430 Excel-tabs. Inconsistente formats, geen overzicht, en een team dat uren per week kwijt was aan handmatig data samenvoegen. Niemand kon met zekerheid zeggen welke cijfers klopten.',
        approach: 'Alles gemigreerd naar een centrale database met automatische imports vanuit bestaande bronnen en kwaliteitschecks die fouten vangen voordat ze in een rapport belanden.',
        results: [
          '430+ Excel-tabs vervangen door \u00E9\u00E9n database',
          'Live dashboard voor het hele team',
          'Automatische data-imports en kwaliteitschecks',
          'Uren per week vrij voor het eigenlijke werk',
        ],
      },
    ],
    projectsSituationLabel: 'De situatie',
    projectsApproachLabel: 'Wat we deden',
    projectsResultsLabel: 'Resultaat',
    projectsServiceLink: 'Meer over deze dienst',

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
    privacySectionCookiesText: 'Deze website gebruikt Google Analytics (GA4) om te begrijpen hoe bezoekers de site gebruiken. GA4 verzamelt geanonimiseerde gebruiksgegevens en kan cookies plaatsen. We gebruiken deze data niet voor marketing of profilering. Je kunt je afmelden via je browserinstellingen of een plugin zoals Google Analytics Opt-out.',
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
    aboutIntro: 'GearShyft helpt bedrijven hun processen te verbeteren. Niet met meer tools, maar met praktische oplossingen die passen bij hoe jullie team echt werkt.',

    // Gear metaphor statement
    aboutGearLine1: 'Je motor draait niet harder.',
    aboutGearLine2: 'Je gaat wel',
    aboutGearHighlight: 'sneller.',
    aboutGearDesc: 'In een hogere versnelling haal je meer uit dezelfde toeren. Minder moeite, meer resultaat. Dat is GearShyft.',

    // About Max
    maxPhotoAlt: 'Max Poppes - Oprichter GearShyft',
    aboutMaxLabel: 'De persoon achter GearShyft',
    aboutMaxName: 'Max Poppes',
    aboutMaxRole: 'Oprichter',
    aboutMaxBio: 'Opleiding in ondernemerschap, altijd geinteresseerd in techniek en het leven simpeler maken. Ervaring in SaaS, data en energie. Bij elke ervaring viel hetzelfde op: er kon altijd een efficientieslag gemaakt worden. Dat is waar ik me in vastbijt.',
    aboutMaxQuote: 'Noem me lui. Ik doe het liever slim.',
    aboutMaxOrigin: 'Na mijn studie en meerdere stages kwam steeds hetzelfde terug: het verbeteren of bouwen van oplossingen. Geen twijfel meer, dat werd GearShyft.',

    // What GearShyft is (and isn't)
    aboutIdentityTitle: 'Wat GearShyft is',
    aboutIdentityIs: [
      'Een praktische bouwer die processen beter werkend maakt',
      'Iemand die eerlijk kijkt naar wat nodig is',
      'Een partner die implementeert, niet alleen adviseert',
    ],
    aboutIdentityIsNotTitle: 'En wat het niet is',
    aboutIdentityIsNot: [
      'Geen adviesbureau dat alleen slides levert',
      'Geen AI-agency die overal AI op plakt',
      'Geen softwarebureau dat technologie pusht',
    ],

    // How we work (values)
    aboutValuesTitle: 'Hoe wij werken',
    aboutValues: [
      { title: 'Proces eerst', text: 'We begrijpen het probleem voordat we een oplossing kiezen. Technologie is een middel, niet het startpunt.', number: '01' },
      { title: 'Bouwen, niet adviseren', text: 'We leveren werkende oplossingen, geen decks en rapporten. Je krijgt iets dat je morgen kunt gebruiken.', number: '02' },
      { title: 'Met jullie mensen', text: 'De beste oplossingen komen van de mensen die het werk doen. We bouwen samen met jullie team.', number: '03' },
    ],

    // What to expect
    aboutExpectTitle: 'Wat je kunt verwachten',
    aboutExpectItems: [
      { title: 'Korte lijnen', text: 'Geen lagen, geen doorlooptijd. Direct contact, snelle beslissingen.' },
      { title: 'Directe impact', text: 'Geen maandenlange trajecten. We focussen op wat nu het meeste verschil maakt.' },
      { title: 'Geen onzin', text: 'Geen buzzwords, geen onnodige complexiteit. Gewoon oplossingen die werken.' },
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
      intro: 'Jullie proces werkt. Soort van. Maar het kost te veel tijd, er vallen dingen tussen wal en schip, en nieuwe mensen inwerken duurt weken omdat niemand precies weet hoe het eigenlijk hoort. Dat gaan we fixen.',
      sections: [
        { title: 'Op de werkvloer, niet in de vergaderruimte', text: 'We beginnen altijd bij de mensen die het werk doen. Meelopen, vragen stellen, observeren. Waar wordt dubbel werk gedaan? Waar wacht iemand op een ander? Welke stap wordt standaard overgeslagen omdat niemand snapt waarom die er is? De echte knelpunten zitten niet in een organogram. Die zitten in de dagelijkse praktijk.' },
        { title: 'Van chaos naar een proces dat klopt', text: 'Op basis van wat we zien ontwerpen we het proces opnieuw. Niet op papier, maar samen met jullie team. Minder stappen, duidelijkere verantwoordelijkheden, minder ruimte voor fouten. Het resultaat: een werkwijze die je in 5 minuten aan een nieuwe collega kunt uitleggen.' },
        { title: 'Klein beginnen, dan uitrollen', text: 'We testen elke verandering eerst met een klein team of een enkel proces. Werkt het? Dan breiden we uit. Werkt iets niet? Dan passen we aan. Geen groot verandertraject, geen maandenlange implementatie. Meestal staan de eerste verbeteringen binnen 2 tot 3 weken.' },
      ],
      forWho: 'Teams waar dingen te lang duren, fouten zich herhalen, of waar elke medewerker het net even anders doet. Bedrijven die groeien en merken dat hun processen niet meegroeien.',
      caseTitle: 'RoosterHub',
      caseText: 'Een callcenter regelde dienstroosters in Excel. Privacygevoelige data ging via e-mail rond, een AVG-risico. We hebben het hele roosterproces doorgelicht met het team, de stappen vereenvoudigd en een lichtgewicht rooster-app gebouwd die precies doet wat ze nodig hadden. Kosten: 1,10 per medewerker per maand. Inwerktijd nieuwe planners: van 2 weken naar 1 dag.',
    },
    serviceDetail_toolsEnSystemen: {
      label: 'Tools & Systemen Bouwen',
      intro: 'Excel als database. WhatsApp als ticketsysteem. Een gedeelde map waar niemand meer iets in terugvindt. Herkenbaar? Jullie zijn je huidige tooling ontgroeid. Tijd voor iets dat echt werkt.',
      sections: [
        { title: 'Eén tool in plaats van zes', text: 'We vervangen het lappendeken van losse tools, spreadsheets en workarounds door een systeem dat past bij jullie werk. Dat kan een intern dashboard zijn, een klantportaal, een plannings-tool, of een platform dat meerdere processen samenvoegt. Geen standaard softwarepakket waar jullie je aan moeten aanpassen. Software die zich aanpast aan jullie.' },
        { title: 'Gebouwd met jullie, niet voor jullie', text: 'We bouwen in korte rondes van 1 tot 2 weken. Na elke ronde laten we zien wat er staat en vragen we feedback. Jullie team test mee vanaf dag een. Zo bouwen we niet iets dat technisch klopt maar dat niemand wil gebruiken. We bouwen iets dat jullie team echt gaat gebruiken omdat het hun werk makkelijker maakt.' },
        { title: 'Opleveren, overdragen, klaar', text: 'We leveren werkende software, geen prototypes of mockups. Inclusief uitleg, documentatie en een overdracht aan jullie team. Willen jullie later iets aanpassen of uitbreiden? Dat kan. Het systeem is van jullie, niet van ons.' },
      ],
      forWho: 'Bedrijven die vastlopen op hun huidige tooling maar geen jaarlang IT-project willen. Teams die dagelijks tijd verliezen aan schakelen, kopieren en handmatig werk dat allang geautomatiseerd had moeten zijn.',
      caseTitle: 'Desk to Dash',
      caseText: 'Een ZZP\'er beheerde uren, facturen, kosten, BTW en planning in 6 losse tools. We hebben alle stromen in kaart gebracht en een platform gebouwd dat alles samenvoegt. Eén login, een duidelijk overzicht, en aan het eind van de maand alles in een paar klikken klaar voor de boekhouder.',
    },
    serviceDetail_dataOpOrde: {
      label: 'Data op Orde Brengen',
      intro: 'Jullie hebben de data wel. Ergens. Verspreid over tientallen spreadsheets, in verschillende formats, bijgehouden door verschillende mensen. Niemand durft met zekerheid te zeggen welk getal klopt. Dat gaat veranderen.',
      sections: [
        { title: 'Eerst snappen wat jullie hebben', text: 'We beginnen met een inventarisatie. Welke data hebben jullie, waar staat die, wie houdt het bij, en hoe wordt het gebruikt? Vaak is dat al een eye-opener. De meeste bedrijven weten niet hoeveel tijd ze kwijt zijn aan zoeken, handmatig overzetten en controleren of cijfers kloppen. We brengen dat in kaart, inclusief wat het kost.' },
        { title: 'Een bron van waarheid', text: 'We bouwen een centrale plek voor jullie data. Geen spreadsheet meer als database, maar een echte structuur: consistente formats, automatische imports vanuit jullie bestaande bronnen, en kwaliteitschecks die fouten vangen voordat ze in een rapport belanden. Het resultaat is data die je kunt vertrouwen zonder het elke keer te hoeven dubbelchecken.' },
        { title: 'Inzicht in plaats van buikgevoel', text: 'Op de schone data bouwen we dashboards die jullie team dagelijks kan gebruiken. Geen eenmalig rapport dat in een la verdwijnt, maar live inzicht in wat er in jullie operatie gebeurt. En we zorgen dat jullie het zelf kunnen onderhouden. Geen afhankelijkheid van ons.' },
      ],
      forWho: 'Bedrijven waar niemand met zekerheid kan zeggen of de cijfers kloppen. Teams die meer tijd besteden aan data zoeken en kopieren dan aan er iets mee doen. Organisaties die willen groeien maar eerst hun datafundament op orde moeten hebben.',
      caseTitle: 'Industrieel bedrijf',
      caseText: 'Een middelgroot industrieel bedrijf beheerde operationele data in meer dan 430 Excel-tabs. Inconsistente formats, geen overzicht, en uren per week kwijt aan handmatig data samenvoegen. We hebben alles gemigreerd naar een centrale database met automatische imports en kwaliteitschecks. Het team heeft nu een live dashboard en besteedt die uren aan hun eigenlijke werk.',
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
