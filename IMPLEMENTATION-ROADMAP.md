# GearShyft SEO Implementation Roadmap

## Phase 1 - Foundation (Weeks 1-4)

### Week 1: Analytics & Technical Setup
- [ ] **Install Google Analytics 4** on gearshyft.nl
- [ ] **Set up Google Search Console** and verify domain
- [ ] **Create Google Business Profile** (even without physical office - use service area)
- [ ] **Connect Formspree** (replace xplaceholder with real form ID)
- [ ] **Fill in KvK number** on website
- [ ] **Remove/replace placeholder testimonials** (either use real ones or remove section entirely)
- [ ] **Self-host images** (download Unsplash images to /public, remove external hotlinks)

### Week 2: Hreflang & Meta Tags
- [ ] **Add hreflang tags** to index.html for NL/EN
- [ ] **Add og:image** (create a social sharing image for GearShyft)
- [ ] **Expand schema markup** (add WebSite schema with SearchAction, improve ProfessionalService)
- [ ] **Update sitemap.xml** as new pages are added
- [ ] **Add Twitter/X and LinkedIn URLs** (replace placeholder links in footer)

### Week 3-4: Core Pages
- [ ] **Create separate pages** for key content (see SITE-STRUCTURE.md)
  - /over (About/Founder page)
  - /diensten (Services overview)
  - /diensten/procesverbetering
  - /diensten/workflow-automatisering
  - /diensten/digitale-werkprocessen
  - /werkwijze (How we work - expanded from current Protocol section)
  - /contact (dedicated contact page)
  - /faq
- [ ] **Decision: routing strategy**
  - Option A: Add React Router to current SPA (quickest)
  - Option B: Migrate to Astro/Next.js (best for SEO long-term)
  - Option C: Keep SPA homepage + static HTML for content pages

### Week 4: Content & Launch
- [ ] **Write service page content** (800+ words each, NL + EN)
- [ ] **Write About/Founder page** (with photo, bio, credentials)
- [ ] **Submit sitemap to Google Search Console**
- [ ] **Set up rank tracking** (free: Google Search Console / paid: Ahrefs, SE Ranking)

### Phase 1 Deliverables
- [ ] GA4 collecting data
- [ ] GSC verified and sitemap submitted
- [ ] 8-10 indexable pages live
- [ ] All placeholder content replaced with real content
- [ ] Hreflang tags implemented

---

## Phase 2 - Expansion (Weeks 5-12)

### Content Creation Sprint
- [ ] **Launch blog** at /blog or /insights
- [ ] **Publish first 4 blog posts** (see CONTENT-CALENDAR.md):
  1. "Heb je AI nodig, of gewoon een beter proces?"
  2. "Procesverbetering zonder Lean of Six Sigma"
  3. "5 signalen dat je bedrijfsproces toe is aan verbetering"
  4. "Waarom digitalisering mislukt bij MKB bedrijven"
- [ ] **Publish first case study** (real project, real results)
- [ ] **Create FAQ page** with structured data (FAQPage schema)

### Technical SEO
- [ ] **Implement BlogPosting schema** for all blog posts
- [ ] **Add breadcrumb navigation** + BreadcrumbList schema
- [ ] **Set up internal linking strategy** (every page links to 2-3 related pages)
- [ ] **Optimize images**: WebP format, proper alt text, lazy loading
- [ ] **Add /werkwijze page** expanding the Protocol section into full page
- [ ] **Create /investering (pricing) page** with transparent pricing ranges

### Link Building (start)
- [ ] **Claim directory listings**: KvK, Google Business, LinkedIn Company
- [ ] **Set up LinkedIn company page** properly (link to website)
- [ ] **Start LinkedIn content** (Max personal + company page)

### Phase 2 Deliverables
- [ ] Blog live with 4+ posts
- [ ] 1+ case study published
- [ ] 15-25 indexed pages
- [ ] Internal linking structure in place
- [ ] LinkedIn content cadence established

---

## Phase 3 - Scale (Weeks 13-24)

### Content Scaling
- [ ] **Continue 2 blog posts/month** cadence
- [ ] **Publish 3 more case studies** (diverse industries)
- [ ] **Create first long-form guide** ("De complete gids voor procesverbetering in het MKB")
- [ ] **Add industry/branche pages** if patterns emerge from clients:
  - /branches/logistiek
  - /branches/productie
  - /branches/dienstverlening

### Advanced SEO
- [ ] **Implement HowTo schema** on process/methodology content
- [ ] **Add comparison content** (vs traditional consulting, vs automation-only, vs AI agencies)
- [ ] **Optimize for featured snippets** (definition boxes, step lists, tables)
- [ ] **Review and update all meta tags** based on GSC performance data

### GEO (Generative Engine Optimization)
- [ ] **Create llms.txt** file (helps AI crawlers understand your site)
- [ ] **Ensure content is "citable"** - clear, quotable statements in each article
- [ ] **Check AI crawler access** (GPTBot, ClaudeBot, PerplexityBot in robots.txt)
- [ ] **Monitor AI mentions** in ChatGPT, Perplexity, Google AI Overviews

### Link Building (scale)
- [ ] **Guest post** on 1-2 Dutch business platforms (Sprout, MT/Sprout, Emerce)
- [ ] **Get featured** in MKB-focused podcasts or interviews
- [ ] **Create shareable resources** (templates, checklists) that earn natural links

### Phase 3 Deliverables
- [ ] 25-35 indexed pages
- [ ] 500+ organic visits/month
- [ ] 5-10 keywords in top 10
- [ ] 3+ case studies published
- [ ] First external mentions/backlinks

---

## Phase 4 - Authority (Months 7-12)

### Thought Leadership
- [ ] **Publish original research**: "De staat van procesverbetering in het Nederlandse MKB"
- [ ] **Start interview series** with business owners about process challenges
- [ ] **Speak at** MKB events, meetups, or webinars
- [ ] **Write for** established Dutch business publications

### Advanced Content
- [ ] **Create comparison pages**: "GearShyft vs. Traditioneel Adviesbureau"
- [ ] **Develop interactive tools** (process health check quiz, ROI calculator)
- [ ] **Video content**: short process improvement tips, case study walkthroughs
- [ ] **Newsletter launch** (email capture on all blog posts)

### Technical Maturity
- [ ] **Consider SSG migration** (Astro/Next.js) if SPA is limiting rankings
- [ ] **Implement advanced schema** (Review, AggregateRating if enough testimonials)
- [ ] **Performance audit** and optimization pass
- [ ] **A/B test** key landing pages (title tags, CTAs)

### Phase 4 Deliverables
- [ ] 50+ indexed pages
- [ ] 1500+ organic visits/month
- [ ] 30+ keywords in top 10
- [ ] Recognized as authority in NL process improvement space
- [ ] 10+ leads/month from organic

---

## Resource Requirements

### Tools (Budget Estimate)

| Tool | Purpose | Cost (monthly) | Phase |
|------|---------|---------------|-------|
| Google Analytics 4 | Traffic tracking | Free | 1 |
| Google Search Console | SEO monitoring | Free | 1 |
| Google Business Profile | Local SEO | Free | 1 |
| Formspree (Pro) | Form handling | ~$10 | 1 |
| SE Ranking or Ahrefs Lite | Rank tracking + research | ~$30-50 | 1-2 |
| Canva (images) | Social + blog visuals | Free/$13 | 2 |

**Total monthly cost**: ~$40-75

### Time Investment (Solo Founder)

| Activity | Hours/Week | Phase |
|----------|-----------|-------|
| Technical setup | 5-8h | Phase 1 only |
| Content writing (blog) | 3-4h | Ongoing from Phase 2 |
| Service page writing | 4-6h | Phase 1-2 |
| LinkedIn posting | 1-2h | Ongoing from Phase 2 |
| SEO monitoring/tweaks | 1h | Ongoing from Phase 1 |
| **Total ongoing** | **~5-7h/week** | Phase 2+ |

---

## Decision Points

### Month 1: Routing Strategy
Decide between React Router (quick) vs Astro/Next.js migration (better SEO).
**Recommendation**: Start with React Router for speed. Revisit at month 6 if rankings lag.

### Month 3: Content Performance Review
Review which content performs best. Double down on winning topics, adjust calendar.

### Month 6: Platform Decision
If organic growth is below targets, consider SSG migration. If on track, continue current approach.

### Month 9: Specialization Decision
Based on client patterns, decide whether to specialize content by industry or stay broad.
