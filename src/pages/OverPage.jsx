import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, X } from 'lucide-react';
import { useTranslation, useLocalizedPath } from '../i18n';
import MagneticBtn from '../components/MagneticBtn';
import CTABanner from '../components/CTABanner';

gsap.registerPlugin(ScrollTrigger);

// Hero
const Hero = () => {
  const heroRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.about-hero-label', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
      gsap.from('.about-hero-title', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4 });
      gsap.from('.about-hero-intro', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.6 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-[60vh] bg-charcoal flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-20">
      <div className="max-w-4xl">
        <span className="about-hero-label font-mono text-xs tracking-widest uppercase text-clay block mb-6">{t.aboutLabel}</span>
        <h1 className="about-hero-title font-serif italic text-5xl md:text-7xl text-cream leading-tight mb-8">
          {t.aboutTitle}
        </h1>
        <p className="about-hero-intro font-mono text-base text-cream/60 leading-relaxed max-w-2xl border-l border-clay pl-6">
          {t.aboutIntro}
        </p>
      </div>
    </section>
  );
};

// Gear Metaphor Statement
const GearStatement = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.gear-line-1', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
      gsap.from('.gear-line-2', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
      gsap.from('.gear-desc', {
        y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-48 bg-cream overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="gear-line-1 font-sans font-bold text-2xl md:text-3xl text-charcoal/60 mb-4">
          {t.aboutGearLine1}
        </p>
        <p className="gear-line-2 font-serif italic text-5xl md:text-7xl lg:text-8xl leading-none text-charcoal mb-4">
          {t.aboutGearLine2} <span className="text-clay">{t.aboutGearHighlight}</span>
        </p>
        <p className="gear-desc font-mono text-sm md:text-base text-charcoal/50 leading-relaxed max-w-2xl mx-auto mt-12 border-t border-charcoal/10 pt-8">
          {t.aboutGearDesc}
        </p>
      </div>
    </section>
  );
};

// About Max
const AboutMax = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.max-photo', {
        scale: 0.9, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
      gsap.from('.max-content > *', {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-charcoal py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Photo */}
        <div className="max-photo flex justify-center md:justify-start">
          <div className="w-72 h-80 md:w-80 md:h-96 rounded-[2.5rem] overflow-hidden">
            <picture>
              <source srcSet="/images/max-poppes.webp" type="image/webp" />
              <img
                src="/images/max-poppes.png"
                alt={t.maxPhotoAlt}
                width={320}
                height={384}
                className="w-full h-full object-cover"
              />
            </picture>
          </div>
        </div>

        {/* Content */}
        <div className="max-content">
          <span className="font-mono text-xs tracking-widest uppercase text-clay block mb-6">{t.aboutMaxLabel}</span>
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-cream mb-2">{t.aboutMaxName}</h2>
          <p className="font-mono text-sm text-cream/50 mb-8">{t.aboutMaxRole}</p>
          <p className="font-mono text-sm text-cream/60 leading-relaxed mb-6">
            {t.aboutMaxBio}
          </p>
          <p className="font-mono text-sm text-cream/60 leading-relaxed mb-8">
            {t.aboutMaxBio2}
          </p>
          <blockquote className="border-l-2 border-clay pl-6 mb-8">
            <p className="font-serif italic text-2xl md:text-3xl text-cream leading-snug">
              "{t.aboutMaxQuote}"
            </p>
          </blockquote>
          <p className="font-mono text-sm text-cream/50 leading-relaxed">
            {t.aboutMaxOrigin}
          </p>
        </div>
      </div>
    </section>
  );
};

// What GearShyft is / isn't
const Identity = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.identity-card', {
        y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* What it is */}
        <div className="identity-card bg-charcoal rounded-[2.5rem] p-10 md:p-12">
          <h3 className="font-sans font-bold text-2xl md:text-3xl text-cream mb-8">{t.aboutIdentityTitle}</h3>
          <ul className="space-y-5">
            {t.aboutIdentityIs.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-moss/20 flex items-center justify-center flex-shrink-0">
                  <Check size={14} className="text-moss" />
                </div>
                <span className="font-mono text-sm text-cream/70 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What it's not */}
        <div className="identity-card bg-charcoal/5 rounded-[2.5rem] p-10 md:p-12">
          <h3 className="font-sans font-bold text-2xl md:text-3xl text-charcoal mb-8">{t.aboutIdentityIsNotTitle}</h3>
          <ul className="space-y-5">
            {t.aboutIdentityIsNot.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="mt-1 w-6 h-6 rounded-full bg-clay/10 flex items-center justify-center flex-shrink-0">
                  <X size={14} className="text-clay" />
                </div>
                <span className="font-mono text-sm text-charcoal/60 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// How we work (values)
const Values = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.value-card', {
        y: 60, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-charcoal py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-cream mb-16">{t.aboutValuesTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.aboutValues.map((value, i) => (
            <div key={i} className="value-card group">
              <span className="font-mono text-5xl font-bold text-cream/10 block mb-4 group-hover:text-clay/30 transition-colors duration-300">
                {value.number}
              </span>
              <h3 className="font-sans font-bold text-xl text-cream mb-4">{value.title}</h3>
              <p className="font-mono text-sm text-cream/50 leading-relaxed">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// What to expect
const Expectations = () => {
  const sectionRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from('.expect-item', {
        x: -40, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-sans font-bold text-3xl md:text-4xl text-charcoal mb-16">{t.aboutExpectTitle}</h2>
        <div className="space-y-0">
          {t.aboutExpectItems.map((item, i) => (
            <div key={i} className="expect-item flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 py-8 border-b border-charcoal/10">
              <h3 className="font-sans font-bold text-lg text-charcoal md:w-48 flex-shrink-0">{item.title}</h3>
              <p className="font-mono text-sm text-charcoal/60 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OverPage = () => {
  const { lang } = useTranslation();

  // Person schema for Max Poppes
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Max Poppes',
      jobTitle: lang === 'nl' ? 'Oprichter' : 'Founder',
      worksFor: {
        '@type': 'Organization',
        name: 'GearShyft',
        url: 'https://gearshyft.nl',
      },
      url: `https://gearshyft.nl${lang === 'nl' ? '/over' : '/en/about'}`,
      image: 'https://gearshyft.nl/images/max-poppes.webp',
      knowsAbout: [
        'Process Improvement',
        'Process Automation',
        'Business Operations',
        'Digital Transformation',
        'Data Management',
        'Robotic Process Automation (RPA)',
        'AI Implementation',
        'SaaS',
        'Machine Learning',
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'person-schema';
    script.textContent = JSON.stringify(schema);
    const existing = document.getElementById('person-schema');
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('person-schema');
      if (el) el.remove();
    };
  }, [lang]);

  return (
    <>
      <Hero />
      <GearStatement />
      <AboutMax />
      <Identity />
      <Values />
      <Expectations />
      <CTABanner variant="dark" textKey="ctaBanner1Text" btnKey="aboutCta" />
    </>
  );
};

export default OverPage;
