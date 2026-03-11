import React, { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Navbar
    navMethod: 'Method',
    navFunctional: 'Functional',
    navArchive: 'Archive',
    navCta: 'System Init',

    // Hero
    heroLine1: 'Stop losing hours to work',
    heroLine2Before: 'a machine',
    heroLine2After: 'should handle.',
    heroDesc: 'We build custom applications and workflows to make processes easier and less time-consuming for B2B companies.',
    heroCta: 'View Capabilities',

    // Features - Card 1
    card1Title: 'Process',
    card1TitleBreak: 'Before Tools',
    card1Desc: "We fix the process first. Technology comes after. We don't necessarily use AI if it doesn't help the process.",
    card1Label1: 'Process Audit',
    card1State1: 'Pending',
    card1Label2: 'Tool Removal',
    card1State2: 'Executing',
    card1Label3: 'Workflow Fix',
    card1State3: 'Complete',

    // Features - Card 2
    card2Badge: 'Live Telemetry',
    card2Title: 'Build What',
    card2TitleBreak: 'Actually Works',
    card2Desc: 'No reports or slide decks. We build systems that run natively inside your business logic.',
    card2Typewriter: '> Establishing connection...\n> Diagnosing workflow bottlenecks...\n> Deploying custom system...\n> Eliminating slide decks...\n> SYSTEM LIVE. Processes optimizing.',

    // Features - Card 3
    card3Title: 'Designed with',
    card3TitleBreak: 'the People Using It',
    card3Desc: 'We map processes with the team before building anything. Human operational reality maps to technical architecture.',
    card3Confirm: 'Confirm',
    card3Days: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

    // Philosophy
    philSub: 'Most software agencies focus on frameworks.',
    philMain: 'We focus on the',
    philHighlight: 'operational reality',
    philEnd: 'of your people.',

    // Protocol
    step01Title: 'Map the Context',
    step01Desc: 'Before a single line of code is written, we decompose your current operational pipeline to identify raw bottlenecks.',
    step02Title: 'Develop System',
    step02Desc: 'Rapid engineering of functional prototypes. We prioritize workflow utility over aesthetic bloat.',
    step03Title: 'System Handover',
    step03Desc: 'Integration into your existing human teams. Technology fails without behavioral alignment.',
    stepPrefix: 'Step',

    // CTA / Footer
    ctaTitle: 'Ready to reclaim',
    ctaHighlight: 'thousands',
    ctaEnd: 'of work hours?',
    ctaDesc: "Schedule a diagnostic session. We'll map your current workflow and show you what an automated system can replace.",
    ctaBtn: 'Book a Diagnostic Call',
    footerDesc: 'System architecture and custom workflows bridging the gap between hardware perfection and human operation.',
    footerNav: 'Navigation',
    footerNavItems: ['Functional Artifacts', 'The Manifesto', 'Protocol Archive'],
    footerContact: 'Contact',
    footerStatus: 'System Operational',
  },

  nl: {
    // Navbar
    navMethod: 'Methode',
    navFunctional: 'Functioneel',
    navArchive: 'Archief',
    navCta: 'Systeem Init',

    // Hero
    heroLine1: 'Stop met uren verliezen aan werk',
    heroLine2Before: 'dat een machine',
    heroLine2After: 'kan overnemen.',
    heroDesc: 'Wij bouwen op maat gemaakte applicaties en workflows om processen eenvoudiger en minder tijdrovend te maken voor B2B-bedrijven.',
    heroCta: 'Bekijk Mogelijkheden',

    // Features - Card 1
    card1Title: 'Proces',
    card1TitleBreak: 'Boven Tools',
    card1Desc: 'Wij repareren eerst het proces. Technologie komt daarna. We gebruiken niet per se AI als het het proces niet helpt.',
    card1Label1: 'Proces Audit',
    card1State1: 'In wacht',
    card1Label2: 'Tool Verwijdering',
    card1State2: 'Actief',
    card1Label3: 'Workflow Fix',
    card1State3: 'Gereed',

    // Features - Card 2
    card2Badge: 'Live Telemetrie',
    card2Title: 'Bouw Wat',
    card2TitleBreak: 'Daadwerkelijk Werkt',
    card2Desc: 'Geen rapporten of slide decks. Wij bouwen systemen die native draaien binnen jouw bedrijfslogica.',
    card2Typewriter: '> Verbinding maken...\n> Workflow-knelpunten analyseren...\n> Maatwerk systeem deployen...\n> Slide decks elimineren...\n> SYSTEEM LIVE. Processen optimaliseren.',

    // Features - Card 3
    card3Title: 'Ontworpen met',
    card3TitleBreak: 'de Mensen die het Gebruiken',
    card3Desc: 'We brengen processen in kaart met het team voordat we iets bouwen. Menselijke operationele realiteit vertaalt naar technische architectuur.',
    card3Confirm: 'Bevestig',
    card3Days: ['Z', 'M', 'D', 'W', 'D', 'V', 'Z'],

    // Philosophy
    philSub: 'De meeste software agencies focussen op frameworks.',
    philMain: 'Wij focussen op de',
    philHighlight: 'operationele realiteit',
    philEnd: 'van jouw mensen.',

    // Protocol
    step01Title: 'Breng de Context in Kaart',
    step01Desc: 'Voordat er ook maar één regel code wordt geschreven, ontleden we jouw huidige operationele pipeline om knelpunten te identificeren.',
    step02Title: 'Ontwikkel Systeem',
    step02Desc: 'Snelle engineering van functionele prototypes. Wij geven prioriteit aan workflow-nut boven cosmetische opsmuk.',
    step03Title: 'Systeem Overdracht',
    step03Desc: 'Integratie in jouw bestaande teams. Technologie faalt zonder gedragsmatige afstemming.',
    stepPrefix: 'Stap',

    // CTA / Footer
    ctaTitle: 'Klaar om',
    ctaHighlight: 'duizenden',
    ctaEnd: 'werkuren terug te winnen?',
    ctaDesc: 'Plan een diagnostische sessie. We brengen jouw huidige workflow in kaart en laten zien wat een geautomatiseerd systeem kan vervangen.',
    ctaBtn: 'Boek een Diagnostisch Gesprek',
    footerDesc: 'Systeemarchitectuur en maatwerk workflows die de kloof overbruggen tussen hardware-perfectie en menselijke operatie.',
    footerNav: 'Navigatie',
    footerNavItems: ['Functionele Artefacten', 'Het Manifest', 'Protocol Archief'],
    footerContact: 'Contact',
    footerStatus: 'Systeem Operationeel',
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
