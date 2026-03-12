import { useEffect, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Clock, User } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation, useLocalizedPath } from '../i18n';
import { getBlogPostBySlug, getBlogPosts } from '../data/blogPosts';
import MagneticBtn from '../components/MagneticBtn';
import CTABanner from '../components/CTABanner';

gsap.registerPlugin(ScrollTrigger);

const BlogPostPage = () => {
  const { slug } = useParams();
  const { t, lang } = useTranslation();
  const blogPath = useLocalizedPath('/blog');
  const contactPath = useLocalizedPath('/contact');
  const heroRef = useRef(null);

  const post = getBlogPostBySlug(slug, lang);

  // BlogPosting JSON-LD structured data
  useEffect(() => {
    if (!post) return;

    const postUrl = `https://gearshyft.nl${lang === 'nl' ? '/blog' : '/en/blog'}/${post.slug}`;
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      publisher: {
        '@type': 'Organization',
        name: 'GearShyft',
        url: 'https://gearshyft.nl',
      },
      datePublished: post.publishedDate,
      url: postUrl,
      inLanguage: lang === 'nl' ? 'nl-NL' : 'en-GB',
      mainEntityOfPage: postUrl,
      articleBody: post.sections.map((s) => s.text).join(' '),
      wordCount: post.sections.reduce((acc, s) => acc + s.text.split(/\s+/).length, 0),
    };

    // Add alternate language link
    if (post.slugs) {
      const altLang = lang === 'nl' ? 'en' : 'nl';
      const altSlug = post.slugs[altLang];
      const altBase = altLang === 'nl' ? '/blog' : '/en/blog';
      schema.workTranslation = {
        '@type': 'BlogPosting',
        url: `https://gearshyft.nl${altBase}/${altSlug}`,
        inLanguage: altLang === 'nl' ? 'nl-NL' : 'en-GB',
      };
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-post-schema';
    script.textContent = JSON.stringify(schema);

    // Remove previous if exists
    const existing = document.getElementById('blog-post-schema');
    if (existing) existing.remove();

    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('blog-post-schema');
      if (el) el.remove();
    };
  }, [post?.key, lang]);

  // GSAP animations
  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      // Hero staggered reveal
      const heroTl = gsap.timeline();
      heroTl
        .from('.bp-hero-back', { x: -20, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .from('.bp-hero-meta', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from('.bp-hero-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.bp-hero-excerpt', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');

      // Content sections scroll reveal
      gsap.utils.toArray('.bp-section').forEach((section) => {
        gsap.from(section.querySelectorAll('.bp-section-title, .bp-section-text'), {
          y: 50,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, [post?.key]);

  if (!post) return <Navigate to={blogPath} replace />;

  // Format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Get prev/next posts for navigation
  const allPosts = getBlogPosts(lang);
  const currentIndex = allPosts.findIndex((p) => p.key === post.key);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const blogBasePath = lang === 'nl' ? '/blog' : '/en/blog';

  return (
    <div ref={heroRef}>
      {/* Hero */}
      <section className="relative min-h-[60vh] bg-charcoal flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-20 overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(242,240,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,240,233,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
        </div>

        <div className="relative z-10 max-w-4xl">
          <Link
            to={blogPath}
            className="bp-hero-back inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-clay mb-8 hover:text-cream transition-colors duration-300"
          >
            <ArrowLeft size={14} /> {t.blogBackLink}
          </Link>

          {/* Meta */}
          <div className="bp-hero-meta flex items-center gap-4 mb-6">
            <span className="font-mono text-[11px] tracking-widest uppercase text-clay">
              {post.category}
            </span>
            <span className="text-cream/20">|</span>
            <span className="font-mono text-[11px] text-cream/40 inline-flex items-center gap-1">
              <Clock size={11} /> {post.readTime} min
            </span>
          </div>

          <h1 className="bp-hero-title font-serif italic text-4xl md:text-6xl lg:text-7xl text-cream leading-[0.95] mb-10">
            {post.title}<span className="text-clay">.</span>
          </h1>

          <p className="bp-hero-excerpt font-mono text-base md:text-lg text-cream/60 leading-relaxed max-w-2xl border-l-2 border-clay pl-6">
            {post.excerpt}
          </p>

          {/* Author & date */}
          <div className="flex items-center gap-6 mt-10 font-mono text-xs text-cream/40">
            <span className="inline-flex items-center gap-2">
              <User size={12} /> {post.author}
            </span>
            <span>{formatDate(post.publishedDate)}</span>
          </div>
        </div>
      </section>

      {/* Content Sections - alternating backgrounds */}
      <div>
        {post.sections.map((section, i) => {
          const isEven = i % 2 === 0;
          return (
            <section
              key={i}
              className={`bp-section py-24 md:py-32 px-6 md:px-16 lg:px-24 ${isEven ? 'bg-cream' : 'bg-charcoal'}`}
            >
              <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start ${i % 2 === 1 ? 'direction-rtl' : ''}`}>
                {/* Number column */}
                <div className={`md:col-span-3 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <span className={`block font-sans font-bold text-8xl md:text-9xl leading-none ${isEven ? 'text-charcoal/[0.06]' : 'text-cream/[0.06]'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content column */}
                <div className={`md:col-span-9 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <h2 className={`bp-section-title font-sans font-bold text-3xl md:text-5xl mb-8 tracking-tight ${isEven ? 'text-charcoal' : 'text-cream'}`}>
                    {section.title}
                  </h2>
                  <p className={`bp-section-text font-mono text-sm md:text-base leading-relaxed max-w-2xl ${isEven ? 'text-charcoal/70 border-l-2 border-clay pl-6' : 'text-cream/60 border-l-2 border-moss pl-6'}`}>
                    {section.text}
                  </p>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Related Services */}
      {post.relatedServices?.length > 0 && (
        <section className="bg-cream py-20 px-6 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <span className="block font-mono text-xs tracking-widest uppercase text-clay mb-4">
              {lang === 'nl' ? 'Gerelateerde dienst' : 'Related service'}
            </span>
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-charcoal mb-8 tracking-tight">
              {lang === 'nl' ? 'Hier helpen we mee.' : 'How we can help.'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedServices.map((serviceKey) => {
                const serviceDetail = t[`serviceDetail_${serviceKey}`];
                if (!serviceDetail) return null;
                const slugMap = {
                  werkprocessen: lang === 'nl' ? 'werkprocessen' : 'work-processes',
                  toolsEnSystemen: lang === 'nl' ? 'tools-en-systemen' : 'tools-and-systems',
                  dataOpOrde: lang === 'nl' ? 'data-op-orde' : 'data-management',
                };
                const servicePath = lang === 'nl'
                  ? `/diensten/${slugMap[serviceKey]}`
                  : `/en/services/${slugMap[serviceKey]}`;
                return (
                  <Link
                    key={serviceKey}
                    to={servicePath}
                    className="group bg-charcoal rounded-[2rem] p-8 hover:bg-charcoal/90 transition-all duration-300"
                  >
                    <span className="block font-mono text-[11px] tracking-widest uppercase text-clay mb-3">
                      {lang === 'nl' ? 'Dienst' : 'Service'}
                    </span>
                    <span className="block font-sans font-bold text-xl text-cream group-hover:text-clay transition-colors duration-300 mb-3">
                      {serviceDetail.label}
                    </span>
                    <span className="block font-mono text-sm text-cream/50 line-clamp-2">
                      {serviceDetail.intro}
                    </span>
                    <span className="inline-flex items-center gap-2 mt-4 font-mono text-xs text-clay">
                      {lang === 'nl' ? 'Bekijk dienst' : 'View service'} <ArrowRight size={12} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next navigation */}
      {(prevPost || nextPost) && (
        <section className="bg-charcoal py-16 px-6 md:px-16 lg:px-24 border-t border-cream/10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevPost ? (
              <Link
                to={`${blogBasePath}/${prevPost.slug}`}
                className="group bg-cream/5 border border-cream/10 rounded-[2rem] p-8 hover:bg-cream/10 transition-all duration-300"
              >
                <span className="block font-mono text-xs text-cream/40 uppercase tracking-widest mb-3">
                  <ArrowLeft size={12} className="inline mr-2" />
                  {lang === 'nl' ? 'Vorig artikel' : 'Previous article'}
                </span>
                <span className="block font-sans font-bold text-lg text-cream group-hover:text-clay transition-colors duration-300 line-clamp-2">
                  {prevPost.title}
                </span>
              </Link>
            ) : <div />}
            {nextPost && (
              <Link
                to={`${blogBasePath}/${nextPost.slug}`}
                className="group bg-cream/5 border border-cream/10 rounded-[2rem] p-8 hover:bg-cream/10 transition-all duration-300 text-right"
              >
                <span className="block font-mono text-xs text-cream/40 uppercase tracking-widest mb-3">
                  {lang === 'nl' ? 'Volgend artikel' : 'Next article'}
                  <ArrowRight size={12} className="inline ml-2" />
                </span>
                <span className="block font-sans font-bold text-lg text-cream group-hover:text-clay transition-colors duration-300 line-clamp-2">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <CTABanner variant="light" textKey="ctaBanner2Text" btnKey="ctaBanner2Btn" />
    </div>
  );
};

export default BlogPostPage;
