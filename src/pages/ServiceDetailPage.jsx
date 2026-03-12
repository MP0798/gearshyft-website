import { useEffect, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation, useLocalizedPath } from '../i18n';
import MagneticBtn from '../components/MagneticBtn';
import CTABanner from '../components/CTABanner';

gsap.registerPlugin(ScrollTrigger);

// Map URL slugs to i18n keys
const slugToKey = {
  // NL slugs
  'werkprocessen': 'werkprocessen',
  'tools-en-systemen': 'toolsEnSystemen',
  'data-op-orde': 'dataOpOrde',
  // EN slugs
  'work-processes': 'werkprocessen',
  'tools-and-systems': 'toolsEnSystemen',
  'data-management': 'dataOpOrde',
};

// Service order for prev/next navigation
const serviceOrder = [
  'werkprocessen',
  'toolsEnSystemen',
  'dataOpOrde',
];

const nlSlugs = {
  werkprocessen: 'werkprocessen',
  toolsEnSystemen: 'tools-en-systemen',
  dataOpOrde: 'data-op-orde',
};

const enSlugs = {
  werkprocessen: 'work-processes',
  toolsEnSystemen: 'tools-and-systems',
  dataOpOrde: 'data-management',
};

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const { t, lang } = useTranslation();
  const dienstenPath = useLocalizedPath('/diensten');
  const contactPath = useLocalizedPath('/contact');
  const heroRef = useRef(null);
  const sectionsRef = useRef(null);
  const forWhoRef = useRef(null);

  const key = slugToKey[slug];

  // GSAP animations
  useEffect(() => {
    if (!key) return;

    const ctx = gsap.context(() => {
      // Hero staggered reveal
      const heroTl = gsap.timeline();
      heroTl
        .from('.sd-hero-back', { x: -20, opacity: 0, duration: 0.6, ease: 'power2.out' })
        .from('.sd-hero-label', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .from('.sd-hero-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.sd-hero-intro', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');

      // Content sections - each reveals on scroll
      gsap.utils.toArray('.sd-section').forEach((section) => {
        gsap.from(section.querySelectorAll('.sd-section-num, .sd-section-title, .sd-section-text'), {
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

      // For who card
      gsap.from('.sd-for-who', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.sd-for-who',
          start: 'top 85%',
        },
      });

      // Navigation cards
      gsap.from('.sd-nav-card', {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.sd-nav-section',
          start: 'top 85%',
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [key]);

  if (!key) return <Navigate to={dienstenPath} replace />;

  const detail = t[`serviceDetail_${key}`];
  if (!detail) return <Navigate to={dienstenPath} replace />;

  // Prev/next service
  const currentIndex = serviceOrder.indexOf(key);
  const prevKey = currentIndex > 0 ? serviceOrder[currentIndex - 1] : null;
  const nextKey = currentIndex < serviceOrder.length - 1 ? serviceOrder[currentIndex + 1] : null;
  const slugMap = lang === 'nl' ? nlSlugs : enSlugs;
  const basePath = lang === 'nl' ? '/diensten' : '/en/services';

  return (
    <div ref={heroRef}>
      {/* Hero */}
      <section className="relative min-h-[70vh] bg-charcoal flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-20 overflow-hidden">
        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(242,240,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,240,233,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
        </div>

        {/* Large decorative number */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-sans font-bold text-[20rem] md:text-[30rem] leading-none text-cream/[0.02] select-none pointer-events-none">
          {String(currentIndex + 1).padStart(2, '0')}
        </div>

        <div className="relative z-10 max-w-4xl">
          <Link
            to={dienstenPath}
            className="sd-hero-back inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-clay mb-8 hover:text-cream transition-colors duration-300"
          >
            <ArrowLeft size={14} /> {t.serviceDetailBackLink}
          </Link>

          <span className="sd-hero-label block font-mono text-xs tracking-widest uppercase text-cream/40 mb-4">
            {t.servicesLabel} // {String(currentIndex + 1).padStart(2, '0')}
          </span>

          <h1 className="sd-hero-title font-serif italic text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.9] mb-10">
            {detail.label}<span className="text-clay">.</span>
          </h1>

          <p className="sd-hero-intro font-mono text-base md:text-lg text-cream/60 leading-relaxed max-w-2xl border-l-2 border-clay pl-6">
            {detail.intro}
          </p>
        </div>
      </section>

      {/* Content Sections - alternating backgrounds */}
      <div ref={sectionsRef}>
        {detail.sections.map((section, i) => {
          const isEven = i % 2 === 0;
          return (
            <section
              key={i}
              className={`sd-section py-24 md:py-32 px-6 md:px-16 lg:px-24 ${isEven ? 'bg-cream' : 'bg-charcoal'}`}
            >
              <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start ${i % 2 === 1 ? 'direction-rtl' : ''}`}>
                {/* Number column */}
                <div className={`md:col-span-3 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <span className={`sd-section-num block font-sans font-bold text-8xl md:text-9xl leading-none ${isEven ? 'text-charcoal/[0.06]' : 'text-cream/[0.06]'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Content column */}
                <div className={`md:col-span-9 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <h2 className={`sd-section-title font-sans font-bold text-3xl md:text-5xl mb-8 tracking-tight ${isEven ? 'text-charcoal' : 'text-cream'}`}>
                    {section.title}
                  </h2>
                  <p className={`sd-section-text font-mono text-sm md:text-base leading-relaxed max-w-2xl ${isEven ? 'text-charcoal/70 border-l-2 border-clay pl-6' : 'text-cream/60 border-l-2 border-moss pl-6'}`}>
                    {section.text}
                  </p>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Case - real project example */}
      {detail.caseTitle && (
        <section className="bg-charcoal py-24 md:py-32 px-6 md:px-16 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <span className="block font-mono text-xs tracking-widest uppercase text-moss mb-4">
              {lang === 'nl' ? 'Uit de praktijk' : 'From practice'}
            </span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-cream mb-8 tracking-tight">
              {detail.caseTitle}<span className="text-clay">.</span>
            </h2>
            <p className="font-mono text-sm md:text-base text-cream/60 leading-relaxed max-w-3xl border-l-2 border-moss pl-6">
              {detail.caseText}
            </p>
          </div>
        </section>
      )}

      {/* For Who - distinctive card section */}
      <section className="bg-cream py-24 md:py-32 px-6 md:px-16 lg:px-24">
        <div ref={forWhoRef} className="sd-for-who max-w-5xl mx-auto bg-charcoal rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
          {/* Decorative accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-clay/10 rounded-bl-[4rem]" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-moss/10 rounded-tr-[4rem]" />

          <div className="relative z-10">
            <span className="block font-mono text-xs tracking-widest uppercase text-clay mb-4">
              {t.serviceDetailForWhoTitle}
            </span>
            <p className="font-serif italic text-2xl md:text-4xl text-cream leading-snug mb-8">
              {detail.forWho}
            </p>
            <MagneticBtn to={contactPath} className="btn-clay px-10 py-5 text-base">
              {t.serviceDetailCta} <ArrowRight size={18} />
            </MagneticBtn>
          </div>
        </div>
      </section>

      {/* Prev / Next navigation */}
      {(prevKey || nextKey) && (
        <section className="sd-nav-section bg-charcoal py-16 px-6 md:px-16 lg:px-24 border-t border-cream/10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {prevKey ? (
              <Link
                to={`${basePath}/${slugMap[prevKey]}`}
                className="sd-nav-card group bg-cream/5 border border-cream/10 rounded-[2rem] p-8 hover:bg-cream/10 transition-all duration-300"
              >
                <span className="block font-mono text-xs text-cream/40 uppercase tracking-widest mb-3">
                  <ArrowLeft size={12} className="inline mr-2" />
                  {lang === 'nl' ? 'Vorige dienst' : 'Previous service'}
                </span>
                <span className="block font-sans font-bold text-xl text-cream group-hover:text-clay transition-colors duration-300">
                  {t[`serviceDetail_${prevKey}`]?.label}
                </span>
              </Link>
            ) : <div />}
            {nextKey && (
              <Link
                to={`${basePath}/${slugMap[nextKey]}`}
                className="sd-nav-card group bg-cream/5 border border-cream/10 rounded-[2rem] p-8 hover:bg-cream/10 transition-all duration-300 text-right"
              >
                <span className="block font-mono text-xs text-cream/40 uppercase tracking-widest mb-3">
                  {lang === 'nl' ? 'Volgende dienst' : 'Next service'}
                  <ArrowRight size={12} className="inline ml-2" />
                </span>
                <span className="block font-sans font-bold text-xl text-cream group-hover:text-clay transition-colors duration-300">
                  {t[`serviceDetail_${nextKey}`]?.label}
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

export default ServiceDetailPage;
