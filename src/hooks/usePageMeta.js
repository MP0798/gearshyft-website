import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';

const BASE_URL = 'https://gearshyft.nl';

// Route config: maps NL paths to page meta + EN equivalents
const routeMeta = {
  '/': {
    en: '/en',
    nl: {
      title: 'GearShyft | Praktische Procesverbetering voor Groeiende Bedrijven',
      description: 'GearShyft bouwt praktische digitale workflows, tools en systemen die passen bij hoe jullie team echt werkt. Proces eerst, technologie tweede.',
    },
    en_meta: {
      title: 'GearShyft | Practical Process Improvement for Growing Businesses',
      description: 'GearShyft builds practical digital workflows, tools, and systems that fit how your team actually works. Process first, technology second.',
    },
  },
  '/over': {
    en: '/en/about',
    nl: {
      title: 'Over GearShyft | Proces Eerst, Technologie Tweede',
      description: 'GearShyft helpt groeiende bedrijven hun processen te verbeteren. Niet met meer tools, maar met praktische oplossingen die passen bij hoe jullie team werkt.',
    },
    en_meta: {
      title: 'About GearShyft | Process First, Technology Second',
      description: 'GearShyft helps growing businesses fix their processes. Not with more tools, but with practical solutions that fit how your team actually works.',
    },
  },
  '/diensten': {
    en: '/en/services',
    nl: {
      title: 'Diensten | GearShyft - Werkprocessen, Tools & Data',
      description: 'Werkprocessen verbeteren, tools en systemen bouwen, data op orde brengen. Praktische oplossingen die passen bij jullie bedrijf.',
    },
    en_meta: {
      title: 'Services | GearShyft - Work Processes, Tools & Data',
      description: 'Improving work processes, building tools and systems, organizing your data. Practical solutions that fit your business.',
    },
  },
  '/werkwijze': {
    en: '/en/approach',
    nl: {
      title: 'Werkwijze | GearShyft - Van Probleem naar Oplossing',
      description: 'Geen starre methodologie. We werken pragmatisch, dicht bij jullie team, en leveren resultaten die je kunt zien. In 4 stappen van probleem naar oplossing.',
    },
    en_meta: {
      title: 'Our Approach | GearShyft - From Problem to Solution',
      description: 'No rigid methodology. We work pragmatically, close to your team, and deliver visible results. From problem to solution in 4 steps.',
    },
  },
  '/contact': {
    en: '/en/contact',
    nl: {
      title: 'Contact | GearShyft - Neem Contact Op',
      description: 'Neem contact op met GearShyft. Vertel ons wat er speelt, geen verplichtingen. Gewoon een eerlijke blik op wat beter kan.',
    },
    en_meta: {
      title: 'Contact | GearShyft - Get in Touch',
      description: 'Get in touch with GearShyft. Tell us what\'s on your mind, no obligations. Just an honest look at what could work better.',
    },
  },
  '/privacy': {
    en: '/en/privacy',
    nl: {
      title: 'Privacyverklaring | GearShyft',
      description: 'Privacyverklaring van GearShyft. Welke gegevens we verzamelen, waarom, en wat je rechten zijn onder de AVG.',
    },
    en_meta: {
      title: 'Privacy Policy | GearShyft',
      description: 'GearShyft privacy policy. What data we collect, why, and what your rights are under GDPR.',
    },
  },
  '/faq': {
    en: '/en/faq',
    nl: {
      title: 'Veelgestelde Vragen | GearShyft',
      description: 'Antwoorden op veelgestelde vragen over GearShyft. Met wat voor bedrijven we werken, wat het kost, en hoe lang een project duurt.',
    },
    en_meta: {
      title: 'FAQ | GearShyft',
      description: 'Answers to frequently asked questions about GearShyft. What businesses we work with, pricing, and how long projects take.',
    },
  },
  '/diensten/werkprocessen': {
    en: '/en/services/work-processes',
    nl: {
      title: 'Werkprocessen Verbeteren | GearShyft - Processen die Werken',
      description: 'We vinden waar jullie werkprocessen vastlopen en ontwerpen ze opnieuw. Praktisch, op de werkvloer, samen met jullie team. In 4-8 weken.',
    },
    en_meta: {
      title: 'Improving Work Processes | GearShyft - Processes That Work',
      description: 'We find where your work processes break down and redesign them. Practical, on the floor, with your team. In 4-8 weeks.',
    },
  },
  '/diensten/tools-en-systemen': {
    en: '/en/services/tools-and-systems',
    nl: {
      title: 'Tools & Systemen Bouwen | GearShyft - Maatwerk Software',
      description: 'We bouwen praktische software die jullie losse tools en spreadsheets vervangt. Een platform op maat dat past bij hoe jullie werken.',
    },
    en_meta: {
      title: 'Building Tools & Systems | GearShyft - Custom Software',
      description: 'We build practical software that replaces your scattered tools and spreadsheets. A custom platform that fits how you actually work.',
    },
  },
  '/diensten/data-op-orde': {
    en: '/en/services/data-management',
    nl: {
      title: 'Data op Orde | GearShyft - Van Spreadsheet Chaos naar Inzicht',
      description: 'We structureren jullie data, bouwen een centrale database met dashboards, en zorgen dat jullie cijfers betrouwbaar en toegankelijk zijn.',
    },
    en_meta: {
      title: 'Organizing Your Data | GearShyft - From Spreadsheet Chaos to Insight',
      description: 'We structure your data, build a central database with dashboards, and make sure your numbers are reliable and accessible.',
    },
  },
};

// Build reverse lookup: EN path -> NL base key
const enToNlKey = {};
for (const [nlPath, config] of Object.entries(routeMeta)) {
  enToNlKey[config.en] = nlPath;
}

/**
 * Get the NL base key and lang for any pathname
 */
function resolveRoute(pathname) {
  // Direct NL match
  if (routeMeta[pathname]) {
    return { nlKey: pathname, lang: 'nl' };
  }
  // EN match
  if (enToNlKey[pathname]) {
    return { nlKey: enToNlKey[pathname], lang: 'en' };
  }
  // Fallback to home
  return { nlKey: '/', lang: pathname.startsWith('/en') ? 'en' : 'nl' };
}

function setMetaTag(attribute, value, content) {
  let el = document.querySelector(`meta[${attribute}="${value}"]`);
  if (el) {
    el.setAttribute('content', content);
  } else {
    el = document.createElement('meta');
    el.setAttribute(attribute, value);
    el.setAttribute('content', content);
    document.head.appendChild(el);
  }
}

function setLinkTag(rel, hreflang, href) {
  let el = document.querySelector(`link[rel="${rel}"][hreflang="${hreflang}"]`);
  if (el) {
    el.setAttribute('href', href);
  } else {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute('hreflang', hreflang);
    el.setAttribute('href', href);
    document.head.appendChild(el);
  }
}

export default function usePageMeta() {
  const { pathname } = useLocation();
  const { lang } = useTranslation();

  useEffect(() => {
    const { nlKey } = resolveRoute(pathname);
    const config = routeMeta[nlKey];
    if (!config) return;

    const meta = lang === 'nl' ? config.nl : config.en_meta;
    const nlUrl = `${BASE_URL}${nlKey}`;
    const enUrl = `${BASE_URL}${config.en}`;
    const currentUrl = lang === 'nl' ? nlUrl : enUrl;

    // Title
    document.title = meta.title;

    // Meta description
    setMetaTag('name', 'description', meta.description);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', currentUrl);
    }

    // Hreflang
    setLinkTag('alternate', 'nl', nlUrl);
    setLinkTag('alternate', 'en', enUrl);
    setLinkTag('alternate', 'x-default', nlUrl);

    // Open Graph
    setMetaTag('property', 'og:title', meta.title);
    setMetaTag('property', 'og:description', meta.description);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:locale', lang === 'nl' ? 'nl_NL' : 'en_GB');

    // Twitter Card
    setMetaTag('name', 'twitter:title', meta.title);
    setMetaTag('name', 'twitter:description', meta.description);
  }, [pathname, lang]);
}
