import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation, useLocalizedPath } from '../i18n';
import { getBlogPosts } from '../data/blogPosts';
import CTABanner from '../components/CTABanner';

gsap.registerPlugin(ScrollTrigger);

const BlogIndexPage = () => {
  const { t, lang } = useTranslation();
  const heroRef = useRef(null);
  const posts = getBlogPosts(lang);
  const blogBasePath = lang === 'nl' ? '/blog' : '/en/blog';

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero reveal
      const heroTl = gsap.timeline();
      heroTl
        .from('.blog-hero-label', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from('.blog-hero-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.blog-hero-intro', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');

      // Post cards staggered reveal
      gsap.utils.toArray('.blog-card').forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'nl' ? 'nl-NL' : 'en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div ref={heroRef}>
      {/* Hero */}
      <section className="relative min-h-[50vh] bg-charcoal flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-20 overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(242,240,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,240,233,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
        </div>

        <div className="relative z-10 max-w-4xl">
          <span className="blog-hero-label block font-mono text-xs tracking-widest uppercase text-clay mb-4">
            {t.blogLabel}
          </span>
          <h1 className="blog-hero-title font-serif italic text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.9] mb-10">
            {t.blogTitle}<span className="text-clay">.</span>
          </h1>
          <p className="blog-hero-intro font-mono text-base md:text-lg text-cream/60 leading-relaxed max-w-2xl border-l-2 border-clay pl-6">
            {t.blogIntro}
          </p>
        </div>
      </section>

      {/* Post listing */}
      <section className="bg-cream py-24 md:py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-0">
            {posts.map((post, i) => (
              <Link
                key={post.key}
                to={`${blogBasePath}/${post.slug}`}
                className="blog-card group block border-b border-charcoal/10 py-12 first:pt-0 last:border-b-0 hover:pl-4 transition-all duration-500"
              >
                {/* Meta row */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-mono text-[11px] tracking-widest uppercase text-clay">
                    {post.category}
                  </span>
                  <span className="text-charcoal/20">|</span>
                  <span className="font-mono text-[11px] text-charcoal/40">
                    {formatDate(post.publishedDate)}
                  </span>
                  <span className="text-charcoal/20">|</span>
                  <span className="font-mono text-[11px] text-charcoal/40 inline-flex items-center gap-1">
                    <Clock size={11} /> {post.readTime} min
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-sans font-bold text-2xl md:text-4xl text-charcoal group-hover:text-clay transition-colors duration-300 mb-4 tracking-tight">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="font-mono text-sm text-charcoal/60 leading-relaxed max-w-3xl mb-6">
                  {post.excerpt}
                </p>

                {/* Read more */}
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-clay group-hover:gap-4 transition-all duration-300">
                  {t.blogReadMore} <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner variant="dark" textKey="ctaBanner1Text" btnKey="ctaBanner1Btn" />
    </div>
  );
};

export default BlogIndexPage;
