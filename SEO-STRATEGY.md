# GearShyft SEO Strategy

## Executive Summary

GearShyft is a process improvement consultancy targeting Dutch businesses with outdated/friction-heavy operations. The current website is a single-page React SPA with one indexable URL, no blog, no separate service pages, and no analytics. This strategy transforms GearShyft from invisible to findable for businesses searching for practical process improvement help.

**Primary market**: Netherlands (Dutch-language)
**Secondary market**: English-speaking prospects in NL
**Domain**: gearshyft.nl

---

## Current State Assessment

### What's Working
- Strong brand voice (direct, no-nonsense, Dutch-first)
- Good visual design with distinctive brutalist-rounded aesthetic
- Schema markup present (ProfessionalService)
- robots.txt and sitemap.xml exist
- SSL likely via Vercel
- Privacy policy present

### Critical Issues
| Issue | Impact | Priority |
|-------|--------|----------|
| Single-page SPA = 1 indexable URL | No keyword coverage | Critical |
| No separate service pages | Can't rank for service terms | Critical |
| No blog/content | Zero topical authority | Critical |
| No analytics (GA4/GSC) | Can't measure anything | Critical |
| No hreflang tags | NL/EN not properly signaled | High |
| Fake testimonials (placeholder) | E-E-A-T damage if discovered | High |
| No case studies | Missing trust signals | High |
| External images (Unsplash hotlinks) | Performance + reliability risk | Medium |
| Formspree placeholder (not connected) | No lead capture | High |
| No Google Business Profile | Missing local SEO | Medium |
| JS-rendered content | Crawl budget overhead | Medium |
| KvK number placeholder | Incomplete business signals | Low |

---

## Target Audience & Search Intent

### Primary Personas

**1. Operations Manager / COO** (30-50, Dutch companies 20-200 FTE)
- Searches: "procesverbetering bedrijf", "workflow automatisering", "operationele efficiëntie"
- Intent: Finding someone to fix broken processes
- Decision factor: Practical track record, not theory

**2. Ondernemer / DGA** (35-55, owner-led businesses)
- Searches: "bedrijfsprocessen verbeteren", "digitalisering mkb", "werkprocessen stroomlijnen"
- Intent: Making operations less frustrating
- Decision factor: Speed, directness, no-BS approach

**3. Team Lead / Afdelingshoofd**
- Searches: "workflow tool", "procesbeheer", "handmatig werk automatiseren"
- Intent: Solving daily friction points
- Decision factor: Solutions that team actually adopts

### Primary Keywords (NL)

| Keyword Cluster | Search Intent | Estimated Volume (NL) | Difficulty |
|----------------|---------------|----------------------|------------|
| procesverbetering | Informational/Commercial | Medium | Medium |
| workflow automatisering | Commercial | Medium | Medium |
| bedrijfsprocessen verbeteren | Commercial | Medium | Low-Medium |
| digitalisering mkb | Informational | Medium-High | Medium |
| operationele efficiëntie | Informational | Low-Medium | Low |
| werkprocessen stroomlijnen | Commercial | Low | Low |
| procesoptimalisatie | Commercial | Low-Medium | Medium |
| handmatig werk automatiseren | Commercial | Low | Low |
| digitale workflows | Informational | Low | Low |
| procesbeheer software | Commercial | Low | Medium |

### Secondary Keywords (EN - for bilingual reach)
| Keyword | Intent | Volume (NL) |
|---------|--------|-------------|
| process improvement consultant netherlands | Commercial | Low |
| workflow automation netherlands | Commercial | Low |
| business process optimization | Informational | Low |
| operational efficiency consulting | Commercial | Low |

### Long-tail Opportunities (NL)
- "processen verbeteren zonder dure software"
- "workflow maken voor klein bedrijf"
- "operationele problemen oplossen"
- "digitale transformatie zonder IT afdeling"
- "administratie automatiseren mkb"
- "procesverbetering zonder consultant"

---

## E-E-A-T Strategy

### Experience
- Publish real case studies with before/after metrics
- Show actual process walkthroughs (photos, screenshots)
- Include "day in the life" content showing on-site work

### Expertise
- Blog posts demonstrating deep process knowledge
- Frameworks and methodologies (original, not recycled)
- Specific industry insights (manufacturing, logistics, services)

### Authoritativeness
- Max's personal brand as subject matter expert
- LinkedIn presence linked to website content
- Guest posts on Dutch business platforms (Sprout, MT/Sprout)
- Speaking at relevant events (MKB, operations meetups)

### Trustworthiness
- Real testimonials from real clients (replace placeholders ASAP)
- KvK number on site
- Clear contact info (already good)
- Privacy policy (already present)
- No fake social proof

---

## Technical SEO Foundation

### Rendering Strategy
Current: Client-side rendered React SPA
**Recommended**: Move to SSR/SSG for SEO-critical pages

Options (in order of preference):
1. **Astro + React islands** - Best SEO, keep React for interactive parts
2. **Next.js** - Full SSR/SSG with React
3. **Prerender.io or similar** - Quick fix, adds prerendering layer
4. **Current SPA + separate blog** - Least migration, blog on subdirectory

For Phase 1, the quickest win is keeping the current SPA for the homepage and adding static pages via a lightweight solution.

### Core Web Vitals Targets
| Metric | Target | Current Risk |
|--------|--------|-------------|
| LCP | < 2.5s | Unsplash hotlinks could slow this |
| FID/INP | < 200ms | GSAP animations need monitoring |
| CLS | < 0.1 | Remotion players could cause shifts |

### Schema Markup Plan
| Page | Schema Types |
|------|-------------|
| Homepage | Organization, ProfessionalService, WebSite |
| Service pages | Service, ProfessionalService |
| Case studies | Article, Review |
| Blog posts | BlogPosting, Article |
| About/Team | Person, ProfilePage |
| Contact | ContactPage |

### Hreflang Implementation
```html
<link rel="alternate" hreflang="nl" href="https://gearshyft.nl/" />
<link rel="alternate" hreflang="en" href="https://gearshyft.nl/en/" />
<link rel="alternate" hreflang="x-default" href="https://gearshyft.nl/" />
```

---

## Content Strategy Overview

### Content Pillars

**1. Procesverbetering** (core topic)
- What it is, how to approach it, common mistakes
- Target: broad informational searches

**2. Workflow & Automatisering** (solution-oriented)
- Practical guides, tool comparisons, implementation tips
- Target: commercial intent searches

**3. Digitalisering MKB** (market-specific)
- Dutch SME-focused digital transformation content
- Target: market awareness searches

**4. Praktijkverhalen** (trust-building)
- Case studies, before/after, process walkthroughs
- Target: decision-stage prospects

### Content Types Priority
1. **Service pages** (4-6 pages, 800+ words each)
2. **Case studies** (3-5 real stories, 1000+ words)
3. **Blog articles** (2x/month, 1200+ words)
4. **Guides/resources** (quarterly, 2000+ words)

---

## KPI Targets

| Metric | Now (Baseline) | 3 Months | 6 Months | 12 Months |
|--------|---------------|----------|----------|-----------|
| Indexed Pages | 1 | 10-15 | 25-35 | 50+ |
| Organic Traffic (monthly) | ~0 | 100-200 | 500-800 | 1500-2500 |
| Keywords Ranking (top 50) | 0 | 15-25 | 50-80 | 150+ |
| Keywords Ranking (top 10) | 0 | 3-5 | 10-15 | 30+ |
| Domain Rating (Ahrefs) | 0 | 5-10 | 15-20 | 25-35 |
| Contact Form Submissions/mo | 0 | 2-5 | 5-10 | 10-20 |
| Core Web Vitals | Unknown | All Green | All Green | All Green |

### Success Criteria
- Phase 1: Site is properly indexable, analytics running, 10+ pages live
- Phase 2: Ranking for brand terms + 5 non-brand keywords in top 20
- Phase 3: 500+ organic visits/month, 5+ leads/month from organic
- Phase 4: Recognized as authority in "procesverbetering" space in NL

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| SPA rendering issues | Prerender or move to SSG |
| No real testimonials yet | Prioritize first 2-3 client engagements for case studies |
| Thin content penalty | Every page 800+ words, unique value |
| Over-optimization | Write for humans first, NL natural language |
| Competitor content superiority | Focus on practical, no-BS angle competitors lack |
| Resource constraints (solo founder) | Prioritize high-impact pages, sustainable 2x/month blog cadence |

---

## Next Steps

See companion documents:
- `COMPETITOR-ANALYSIS.md` - Competitive landscape
- `CONTENT-CALENDAR.md` - Publishing schedule
- `IMPLEMENTATION-ROADMAP.md` - Phased action plan
- `SITE-STRUCTURE.md` - URL architecture
