# GearShyft Site Structure & URL Architecture

## Current State

```
gearshyft.nl/                  ← Single page SPA (everything lives here)
gearshyft.nl/sitemap.xml
gearshyft.nl/robots.txt
```

**Problem**: 1 URL = 1 ranking opportunity. Can't target multiple keyword themes.

---

## Recommended URL Architecture

### Phase 1 (Month 1-2)

```
gearshyft.nl/
├── /                              ← Homepage (hero + overview)
├── /over                          ← About GearShyft + founder bio
├── /diensten                      ← Services overview
│   ├── /procesverbetering         ← Core service: process improvement
│   ├── /workflow-automatisering   ← Workflow & automation
│   ├── /digitale-werkprocessen    ← Digital workflows
│   └── /operationele-analyse      ← Operational analysis
├── /werkwijze                     ← How we work (expanded Protocol)
├── /contact                       ← Dedicated contact page
├── /faq                           ← Frequently asked questions
└── /privacy                       ← Privacy policy (currently modal)
```

**EN equivalent** (same structure under /en/):
```
gearshyft.nl/en/
├── /                              ← Homepage EN
├── /about                         ← About
├── /services                      ← Services overview
│   ├── /process-improvement
│   ├── /workflow-automation
│   ├── /digital-workflows
│   └── /operational-analysis
├── /approach                      ← How we work
├── /contact
├── /faq
└── /privacy
```

### Phase 2 (Month 2-4)

```
gearshyft.nl/
├── ... (alles uit Phase 1)
├── /blog                          ← Blog index
│   ├── /ai-nodig-of-beter-proces  ← First blog post
│   ├── /procesverbetering-hoeft-niet-ingewikkeld
│   ├── /signalen-proces-verbeteren
│   └── /digitalisering-mislukt-mkb
├── /cases                         ← Case studies index
│   ├── /[case-study-slug-1]
│   └── /[case-study-slug-2]
└── /investering                   ← Pricing/investment page
```

### Phase 3 (Month 4-8)

```
gearshyft.nl/
├── ... (alles uit Phase 1-2)
├── /branches                      ← Industry pages
│   ├── /logistiek
│   ├── /productie
│   └── /dienstverlening
├── /resources                     ← Guides & downloads
│   └── /procesverbetering-gids-mkb
└── /vergelijk                     ← Comparison content
    ├── /gearshyft-vs-adviesbureau
    └── /automatisering-vs-procesverbetering
```

---

## URL Naming Conventions

### Rules
1. **Dutch URLs** for NL content (primary)
2. **English URLs** under /en/ prefix
3. **Lowercase**, hyphens between words
4. **No dates** in blog URLs (evergreen content)
5. **Short but descriptive**: max 3-4 words per slug
6. **Keyword in URL** where natural

### Examples
| Good | Bad |
|------|-----|
| /diensten/procesverbetering | /services/service-1 |
| /blog/ai-nodig-of-beter-proces | /blog/2026/03/12/heb-je-ai-nodig |
| /cases/logistiek-workflow-verbetering | /cases/case-study-1 |
| /branches/logistiek | /industries/logistics-sector |

---

## Page Templates & SEO Elements

### Homepage (/)
```
Title: GearShyft | Praktische Procesverbetering voor Groeiende Bedrijven
Description: GearShyft bouwt praktische digitale workflows, tools en systemen
             die passen bij hoe jullie team echt werkt. Proces eerst, technologie tweede.
H1: Processen van gisteren horen niet bij groei van morgen
Schema: Organization, ProfessionalService, WebSite
```

### Service Page Template (/diensten/*)
```
Title: [Service] | GearShyft - Praktische Procesverbetering
Description: [Unique 150-char description of this service]
H1: [Service name - keyword-rich]
Content structure:
  - Probleem (what pain this solves)
  - Aanpak (how GearShyft approaches it)
  - Wat je krijgt (deliverables)
  - Voor wie (target audience)
  - Case study snippet (link to full case)
  - CTA (contact form)
Schema: Service, ProfessionalService
Min words: 800
```

### Blog Post Template (/blog/*)
```
Title: [Keyword-rich title] | GearShyft Blog
Description: [Compelling 150-char summary]
H1: [Post title]
Content structure:
  - Intro (hook + what reader will learn)
  - Body (structured with H2s/H3s)
  - Conclusion (key takeaway + CTA)
  - Author box (Max, with photo + bio link)
Schema: BlogPosting, Person (author)
Min words: 1200
```

### Case Study Template (/cases/*)
```
Title: [Client/Industry]: [Result] | GearShyft Case Study
Description: Hoe GearShyft [client type] hielp om [result] te bereiken.
H1: [Descriptive case study title]
Content structure:
  - Samenvatting (TL;DR with key metric)
  - De situatie (client background)
  - Het probleem (specific challenges)
  - De aanpak (GearShyft methodology)
  - De oplossing (what was built)
  - Het resultaat (metrics, before/after)
  - Quote van de klant
  - Gerelateerde diensten
Schema: Article, Review
Min words: 1000
```

### About Page (/over)
```
Title: Over GearShyft | Praktische Procesverbetering
Description: GearShyft is opgericht door Max [...]. Wij helpen bedrijven hun
             processen simpeler, duidelijker en minder frustrerend te maken.
H1: Over GearShyft
Content:
  - Founder story (why GearShyft exists)
  - Mission/vision (kort, geen corporate speak)
  - Photo + bio
  - Values (process first, build don't advise, work with your people)
  - CTA
Schema: Person, ProfilePage
```

---

## Internal Linking Strategy

### Navigation Links (every page)
- Homepage
- Diensten (dropdown with sub-services)
- Werkwijze
- Blog
- Contact

### Contextual Links
| From | To | Anchor Text Pattern |
|------|-----|-------------------|
| Blog post | Related service page | "onze aanpak voor [service]" |
| Service page | Relevant case study | "bekijk hoe we dit deden voor [client]" |
| Case study | Service page | "meer over [service]" |
| Service page | Related blog post | "lees meer over [topic]" |
| FAQ answer | Service or blog | Natural anchor in answer |

### Footer Links (every page)
- All service pages
- Latest 3 blog posts
- Contact
- Privacy
- Cases

### Breadcrumbs
```
Home > Diensten > Procesverbetering
Home > Blog > [Post Title]
Home > Cases > [Case Study Title]
```
Implement with BreadcrumbList schema.

---

## Sitemap Structure

### sitemap.xml (updated)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

  <!-- Homepage NL -->
  <url>
    <loc>https://gearshyft.nl/</loc>
    <xhtml:link rel="alternate" hreflang="nl" href="https://gearshyft.nl/" />
    <xhtml:link rel="alternate" hreflang="en" href="https://gearshyft.nl/en/" />
    <lastmod>2026-03-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Services -->
  <url>
    <loc>https://gearshyft.nl/diensten</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://gearshyft.nl/diensten/procesverbetering</loc>
    <priority>0.9</priority>
  </url>
  <!-- ... more service pages ... -->

  <!-- Blog -->
  <url>
    <loc>https://gearshyft.nl/blog</loc>
    <priority>0.8</priority>
  </url>
  <!-- ... blog posts ... -->

  <!-- Cases -->
  <url>
    <loc>https://gearshyft.nl/cases</loc>
    <priority>0.8</priority>
  </url>

  <!-- Static pages -->
  <url>
    <loc>https://gearshyft.nl/over</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://gearshyft.nl/werkwijze</loc>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://gearshyft.nl/contact</loc>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://gearshyft.nl/faq</loc>
    <priority>0.5</priority>
  </url>
</urlset>
```

---

## Routing Implementation Notes

### Option A: React Router (Quick)
Add `react-router-dom` to current project. Each "page" becomes a route component. Requires configuring Vercel for SPA fallback (already likely configured). **Downside**: Still client-side rendered, Google must execute JS.

### Option B: Astro + React Islands (Best for SEO)
Migrate to Astro. Keep React components for interactive parts (features cards, Remotion players, GSAP animations). Static pages are pre-rendered HTML. **Upside**: Best Core Web Vitals, best crawlability. **Downside**: Migration effort.

### Option C: Hybrid (Pragmatic)
Keep current SPA for homepage experience. Add separate static HTML pages (or a minimal Astro site) for blog, services, about. Link between them normally. **Upside**: No migration, can start fast. **Downside**: Two "systems" to maintain.

### Recommendation
Start with **Option A** (React Router) to unblock page creation immediately. Revisit at month 6 - if Core Web Vitals or indexing are problematic, migrate to **Option B** (Astro).

---

## Robots.txt (Updated)

```
User-agent: *
Allow: /

# AI Crawlers (allow for GEO)
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: https://gearshyft.nl/sitemap.xml
```

---

## Technical Checklist Per New Page

- [ ] Unique title tag (< 60 chars)
- [ ] Unique meta description (< 155 chars)
- [ ] H1 with target keyword
- [ ] Canonical URL set
- [ ] Hreflang tags (NL + EN)
- [ ] Open Graph tags (title, description, image)
- [ ] Schema markup (page-type specific)
- [ ] Breadcrumb navigation
- [ ] 2+ internal links to other pages
- [ ] 2+ internal links from other pages
- [ ] Added to sitemap.xml
- [ ] Mobile responsive
- [ ] Image alt texts
