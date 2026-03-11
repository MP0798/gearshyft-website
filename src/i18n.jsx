import React, { createContext, useContext, useState } from 'react';

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

    // CTA / Footer
    ctaTitle: 'Ready to make',
    ctaHighlight: 'your processes',
    ctaEnd: 'actually work?',
    ctaDesc: "Let's have an honest conversation about what's slowing your team down, and what would actually help.",
    ctaBtn: 'Plan a Conversation',
    footerDesc: 'Practical digital solutions for businesses that want their processes to be simpler, clearer, and less frustrating.',
    footerNav: 'Navigation',
    footerNavItems: ['What We Do', 'Our Approach', 'How We Work'],
    footerContact: 'Contact',
    footerStatus: 'Available for Projects',
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

    // CTA / Footer
    ctaTitle: 'Klaar om jullie',
    ctaHighlight: 'processen',
    ctaEnd: 'echt werkend te maken?',
    ctaDesc: 'Laten we een eerlijk gesprek voeren over wat jullie team vertraagt, en wat er echt zou helpen.',
    ctaBtn: 'Plan een Gesprek',
    footerDesc: 'Praktische digitale oplossingen voor bedrijven die hun processen simpeler, duidelijker en minder frustrerend willen maken.',
    footerNav: 'Navigatie',
    footerNavItems: ['Wat We Doen', 'Onze Aanpak', 'Hoe We Werken'],
    footerContact: 'Contact',
    footerStatus: 'Beschikbaar voor Projecten',
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('nl');
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
