import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation, useLocalizedPath } from '../i18n';
import MagneticBtn from '../components/MagneticBtn';
import CTABanner from '../components/CTABanner';

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project, index, lang }) => {
  const cardRef = useRef(null);
  const basePath = lang === 'nl' ? '/diensten' : '/en/services';

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for card content
      gsap.from('.proj-reveal-' + index, {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
        },
      });

      // Result items slide in
      gsap.from('.proj-result-' + index, {
        x: -30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.proj-results-' + index,
          start: 'top 85%',
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  const isEven = index % 2 === 0;
  const bg = isEven ? 'bg-cream' : 'bg-charcoal';
  const textPrimary = isEven ? 'text-charcoal' : 'text-cream';
  const textSecondary = isEven ? 'text-charcoal/60' : 'text-cream/60';
  const tagBg = isEven ? 'bg-charcoal/5 text-charcoal/70' : 'bg-cream/10 text-cream/60';
  const resultBg = isEven ? 'bg-charcoal/[0.03] border-charcoal/10' : 'bg-cream/[0.03] border-cream/10';
  const checkColor = isEven ? 'text-moss' : 'text-clay';
  const borderColor = isEven ? 'border-clay' : 'border-moss';

  return (
    <section ref={cardRef} className={`${bg} py-24 md:py-32 px-6 md:px-16 lg:px-24`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`proj-reveal-${index} flex flex-wrap items-center gap-4 mb-6`}>
          <span className={`font-mono text-xs tracking-widest uppercase ${textSecondary}`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full ${tagBg}`}>
            {project.tag}
          </span>
        </div>

        <h2 className={`proj-reveal-${index} font-serif italic text-5xl md:text-7xl ${textPrimary} leading-[0.9] mb-16`}>
          {project.name}<span className="text-clay">.</span>
        </h2>

        {/* Two-column: Situation + Approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-16">
          <div className={`proj-reveal-${index}`}>
            <span className={`block font-mono text-xs tracking-widest uppercase ${isEven ? 'text-clay' : 'text-moss'} mb-4`}>
              {project.situationLabel}
            </span>
            <p className={`font-mono text-sm md:text-base leading-relaxed ${textSecondary} border-l-2 ${borderColor} pl-6`}>
              {project.situation}
            </p>
          </div>

          <div className={`proj-reveal-${index}`}>
            <span className={`block font-mono text-xs tracking-widest uppercase ${isEven ? 'text-clay' : 'text-moss'} mb-4`}>
              {project.approachLabel}
            </span>
            <p className={`font-mono text-sm md:text-base leading-relaxed ${textSecondary} border-l-2 ${borderColor} pl-6`}>
              {project.approach}
            </p>
          </div>
        </div>

        {/* Results grid */}
        <div className={`proj-results-${index}`}>
          <span className={`proj-reveal-${index} block font-mono text-xs tracking-widest uppercase ${isEven ? 'text-clay' : 'text-moss'} mb-6`}>
            {project.resultsLabel}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.results.map((result, i) => (
              <div
                key={i}
                className={`proj-result-${index} flex items-start gap-4 ${resultBg} border rounded-2xl p-5`}
              >
                <CheckCircle2 size={18} className={`${checkColor} flex-shrink-0 mt-0.5`} />
                <span className={`font-mono text-sm ${textPrimary}`}>{result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Link to service */}
        <div className={`proj-reveal-${index} mt-10`}>
          <Link
            to={`${basePath}/${project.slug}`}
            className={`inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest ${isEven ? 'text-clay hover:text-charcoal' : 'text-clay hover:text-cream'} transition-colors duration-300`}
          >
            {project.serviceLink} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

const ProjectenPage = () => {
  const heroRef = useRef(null);
  const { t, lang } = useTranslation();
  const contactPath = useLocalizedPath('/contact');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from('.proj-hero-label', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' })
        .from('.proj-hero-title', { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
        .from('.proj-hero-intro', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const projects = t.projectsItems.map((item) => ({
    ...item,
    situationLabel: t.projectsSituationLabel,
    approachLabel: t.projectsApproachLabel,
    resultsLabel: t.projectsResultsLabel,
    serviceLink: t.projectsServiceLink,
  }));

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[60vh] bg-charcoal flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-20 overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(242,240,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,240,233,1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
        </div>

        <div className="relative z-10 max-w-4xl">
          <span className="proj-hero-label block font-mono text-xs tracking-widest uppercase text-cream/40 mb-4">
            {t.projectsLabel}
          </span>

          <h1 className="proj-hero-title font-serif italic text-5xl md:text-7xl lg:text-8xl text-cream leading-[0.9] mb-10">
            {t.projectsTitle.replace('.', '')}<span className="text-clay">.</span>
          </h1>

          <p className="proj-hero-intro font-mono text-base md:text-lg text-cream/60 leading-relaxed max-w-2xl border-l-2 border-clay pl-6">
            {t.projectsIntro}
          </p>
        </div>
      </section>

      {/* Project Cards */}
      {projects.map((project, index) => (
        <ProjectCard key={project.name} project={project} index={index} lang={lang} />
      ))}

      {/* CTA */}
      <CTABanner variant="dark" textKey="ctaBanner2Text" btnKey="ctaBanner2Btn" />
    </div>
  );
};

export default ProjectenPage;
