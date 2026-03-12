# GearShyft Website

React 19 + Vite website met Tailwind CSS, GSAP animaties en Remotion video componenten.
Tweetalig: Nederlands (primair) + Engels. Deployed via Vercel.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint
```

## Project Structuur

```
src/
├── App.jsx                  # Alle secties en componenten (single-file SPA)
├── App.css                  # App-specifieke stijlen (leeg, Tailwind handles alles via index.css)
├── i18n.jsx                 # Vertalingen NL/EN + LanguageProvider context
├── i18n.backup.jsx          # Backup vertalingen
├── index.css                # Tailwind directives + base styles
├── main.jsx                 # React entry point
└── remotion/                # Remotion animaties (Protocol sectie)
    ├── BlueprintScanner.jsx     # Stap 01: reticle scant bottlenecks
    ├── BrutalistAssembly.jsx    # Stap 02: blokken assembleren tot dashboard
    ├── OperatorSync.jsx         # Stap 03: mens-machine synchronisatie
    └── *.backup.jsx             # Backups van animaties
```

**Geen React Router** - navigatie via anchor links (`#features`, `#philosophy`, `#protocol`, `#contact`).

## Tech Stack

- **React 19** + **Vite 7** (met @vitejs/plugin-react)
- **Tailwind CSS 3** met custom design tokens
- **GSAP 3** + ScrollTrigger (scroll-animaties, parallax, sticky cards)
- **Remotion 4** + @remotion/player (SVG animaties in browser)
- **Lucide React** (icons)
- **i18n** via custom React Context (`src/i18n.jsx`), geen library

## Design Tokens

**Kleuren:**
- `charcoal` #1A1A1A - primair donker/tekst
- `cream` #F2F0E9 - lichte achtergronden
- `clay` #CC5833 - accent, CTA's, alerts
- `moss` #7A8C70 - secondair accent, gezonde/actieve states

**Typografie:**
- Sans: Plus Jakarta Sans → Outfit (fallback)
- Serif: Cormorant Garamond (hero, italics)
- Mono: IBM Plex Mono (labels, code-achtige tekst)

## Taal & Stijl

- Schrijf website copy altijd eerst in het Nederlands, dan Engels
- Geen em dashes (—) in copy
- Direct, no-nonsense, geen buzzwords of tech jargon
- Geen "ondernemersbedrijven" of "owner-led businesses"
- Vertalingen toevoegen in `src/i18n.jsx` onder zowel `nl` als `en`

## Belangrijke Patronen

### i18n
Custom React Context in `src/i18n.jsx`. Gebruik `useTranslation()` hook:
```jsx
const { t, lang, setLang } = useTranslation();
// t.keyName geeft vertaling terug (property access, geen functie)
```
Alle keys staan in `translations` object met `nl` en `en` sub-objects.

### Remotion Animaties
- Spelen alleen af wanneer zichtbaar (IntersectionObserver, threshold 0.3)
- Player bestuurd via ref: `.play()`, `.pause()`, `.seekTo(0)`
- Pure SVG, frame-based (30fps), gebruiken `spring()` en `interpolate()`
- Backups bewaren als `*.backup.jsx` in dezelfde map

### GSAP Animaties
- ScrollTrigger voor scroll-gebaseerde animaties
- Navbar kleurwissel bij scrollen
- Hero tekst reveal met staggered timeline
- Protocol sectie: sticky-stacking cards met scale/blur transitions
- Magnetic button hover via mousemove event tracking

### Componenten
Alle componenten staan in `App.jsx` (single-file). Render volgorde in `AppContent`:
- `Navbar` - floating island nav, scroll-triggered styling, mobile hamburger menu overlay
- `Hero` - full-viewport met GSAP text reveal
- `Features` - 3 interactieve kaarten (shuffler, typewriter, cursor)
- `CTABanner` (light) - tussentijdse CTA na Features
- `Philosophy` - manifesto met parallax + word-by-word reveal
- `Protocol` - 3 sticky-stacking kaarten met Remotion players
- `CTABanner` (dark) - tussentijdse CTA na Protocol
- `SocialProof` - stats (cijfers) + testimonial cards (placeholder content, TODO)
- `Footer` - contactformulier (Formspree) + email sidebar + footer navigatie
- `PrivacyModal` - AVG-conforme privacyverklaring als overlay

### Contact & Formulier
- Contactformulier via Formspree (`action="https://formspree.io/f/xplaceholder"` - TODO: echt ID invullen)
- Email: `mailto:max@gearshyft.nl`
- Social links: Twitter/X en LinkedIn (TODO: echte URLs)
- Privacy link in footer opent PrivacyModal

### SEO & Meta
- `index.html`: lang="nl" (dynamisch bijgewerkt bij taalwissel), meta description, OG tags, Twitter Cards, canonical URL
- JSON-LD structured data (ProfessionalService schema)
- `public/robots.txt` + `public/sitemap.xml`
- TODO: favicon vervangen (nog vite.svg), og:image toevoegen

## Deployment

- **Platform:** Vercel
- **Build:** `npm run build` → `dist/`
- **GitHub:** https://github.com/MP0798/gearshyft-website.git
- Pure static SPA, geen backend nodig

---

## MCP Servers

### Context7 (`context7`)

Haalt actuele library/framework documentatie op.

**Wanneer gebruiken:**
- Bij vragen over libraries, frameworks of API's
- Bij code generatie die specifieke packages gebruikt (React, Tailwind, GSAP, Remotion, Vite, etc.)
- Bij setup/configuratie vragen
- Wanneer je twijfelt of je training data actueel genoeg is

**Hoe gebruiken:**
1. `resolve-library-id` aanroepen met library naam + vraag
2. Beste match kiezen (voorkeur: exact name match, hoge reputation)
3. `query-docs` aanroepen met gekozen library ID + specifieke vraag
4. Antwoord baseren op opgehaalde docs, niet op training data

**Niet nodig voor:** Simpele, algemeen bekende patronen die niet version-specific zijn.

---

## Plugins

### Development Workflow

#### `/commit` (commit-commands)
Automatische git commits met gegenereerde commit messages.
**Wanneer:** Als de gebruiker wil committen. Analyseert staged/unstaged changes en past bij de commit style van de repo.

#### `/feature-dev` (feature-dev)
Guided feature development met codebase analyse.
**Wanneer:** Bij het bouwen van nieuwe features. Gebruikt subagents voor code exploration, architecture design en code review.
**Subagents:** `code-explorer`, `code-architect`, `code-reviewer`

#### `/code-review` (code-review)
Code review op een PR of branch.
**Wanneer:** Als de gebruiker expliciet om een code review vraagt.

#### `/review-pr` (pr-review-toolkit)
Uitgebreide PR review met meerdere gespecialiseerde agents.
**Wanneer:** Bij diepgaande PR reviews. Heeft meer agents dan code-review (silent-failure-hunter, code-simplifier, type-design-analyzer, etc.).
**Gebruik code-review voor snelle reviews, review-pr voor grondige analyse.**

### Frontend & Design

#### frontend-design
Creatieve, production-grade frontend interfaces. Vermijdt generieke AI-look.
**Wanneer:** Automatisch actief bij frontend werk. Maakt onderscheidende visuele keuzes: typografie, kleurpaletten, animaties.
**Scope:** Alleen actief in dit project (lokale install).

### Security

#### security-guidance
Waarschuwt bij potentiele security issues tijdens het editen (command injection, XSS, unsafe patterns).
**Wanneer:** Draait automatisch als hook bij file edits. Geen handmatige aanroep nodig.

### Output Stijlen

#### explanatory-output-style (actief)
Voegt educatieve `★ Insight` blokken toe bij code schrijven.
**Wanneer:** Automatisch actief via SessionStart hook. Biedt context over implementatiekeuzes en codebase patronen.

#### learning-output-style
Interactieve leermodus: vraagt de gebruiker om zelf key code te schrijven op beslismomenten.
**Wanneer:** Activeer als je wilt leren door zelf code te schrijven in plaats van alles te laten genereren. Staat standaard uit als explanatory actief is.

### Plugin & Agent Development

#### `/create-plugin` (plugin-dev)
Plugin bouwen voor Claude Code.
**Wanneer:** Bij het maken van nieuwe plugins. Heeft subagents: `agent-creator`, `skill-reviewer`, `plugin-validator`.

#### `/new-sdk-app` (agent-sdk-dev)
Scaffold een Claude Agent SDK applicatie (Python/TypeScript).
**Wanneer:** Bij het bouwen van standalone AI agents met de Claude Agent SDK.

#### `/hookify` (hookify)
Maak custom hooks aan via natuurlijke taal of conversatie-analyse.
**Wanneer:** Als je gedrag wil blokkeren/waarschuwen zonder handmatig hooks.json te editen. Bijv: "warn me when I use rm -rf".

### SEO & Marketing

#### `/seo` (seo)
Uitgebreide SEO-analyse toolkit met gespecialiseerde sub-skills.
**Wanneer:** Bij alles wat met SEO, vindbaarheid, zoekresultaten of site-optimalisatie te maken heeft.

**Sub-skills (direct aanroepbaar):**

| Skill | Trigger | Wat het doet |
|-------|---------|-------------|
| `/seo-audit` | "audit mijn site", "volledige SEO check" | Full site audit (max 500 pagina's), health score, 6 specialist agents |
| `/seo-page` | "analyseer deze pagina", enkele URL | Diepe single-page analyse: on-page, content, meta, schema, images |
| `/seo-technical` | "technische SEO", "crawl issues", "Core Web Vitals" | 9 categorieën: crawlability, indexability, security, URL structuur, mobile, CWV, structured data, JS rendering, IndexNow |
| `/seo-content` | "content kwaliteit", "E-E-A-T", "thin content" | Content analyse op E-E-A-T, leesbaarheid, diepte, AI citation readiness |
| `/seo-schema` | "schema", "structured data", "JSON-LD" | Detecteer, valideer en genereer Schema.org markup (JSON-LD) |
| `/seo-sitemap` | "sitemap", "XML sitemap" | Valideer bestaande of genereer nieuwe sitemaps met industry templates |
| `/seo-images` | "image optimalisatie", "alt text", "image SEO" | Alt text, bestandsgrootte, formaten, responsive images, lazy loading, CLS |
| `/seo-performance` | "page speed", "performance" | Core Web Vitals meting en evaluatie |
| `/seo-hreflang` | "hreflang", "international SEO", "multi-language" | Hreflang validatie en generatie (relevant: site is NL/EN tweetalig) |
| `/seo-geo` | "AI Overviews", "GEO", "AI search", "Perplexity" | Generative Engine Optimization: AI crawler toegang, llms.txt, citability |
| `/seo-programmatic` | "programmatic SEO", "pages at scale" | Template-gebaseerde pagina's op schaal, URL patronen, thin content preventie |
| `/seo-competitor-pages` | "comparison page", "X vs Y", "alternatives" | Concurrentie-vergelijkingspagina's, feature matrices, conversie-optimalisatie |
| `/seo-plan` | "SEO strategie", "content strategie", "SEO roadmap" | Strategische SEO planning, competitive analysis, implementatie roadmap |

**Gebruik hoofdregel `/seo` voor brede vragen, specifieke sub-skills voor gerichte analyses.**

### Overig

#### claude-opus-4-5-migration
Migreert code en prompts naar Opus 4.5 compatibiliteit.
**Wanneer:** Bij het upgraden van model strings, beta headers of prompt patterns naar nieuwere Claude modellen.

#### `/ralph-loop` (ralph-wiggum)
Self-referential development loop. Claude blijft iteratief werken tot een taak af is.
**Wanneer:** Voor langlopende taken die meerdere iteraties nodig hebben. Blokkeert session exit via Stop hook totdat het werk compleet is.
