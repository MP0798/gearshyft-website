import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, useLocalizedPath } from '../i18n';
import MagneticBtn from '../components/MagneticBtn';

const DienstenPage = () => {
  const { t } = useTranslation();
  const contactPath = useLocalizedPath('/contact');

  const services = [
    { key: 'werkprocessen', path: useLocalizedPath('/diensten/werkprocessen') },
    { key: 'toolsEnSystemen', path: useLocalizedPath('/diensten/tools-en-systemen') },
    { key: 'dataOpOrde', path: useLocalizedPath('/diensten/data-op-orde') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] bg-charcoal flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-20">
        <div className="max-w-4xl">
          <span className="font-mono text-xs tracking-widest uppercase text-clay block mb-6">{t.servicesLabel}</span>
          <h1 className="font-serif italic text-5xl md:text-7xl text-cream leading-tight mb-8">
            {t.servicesTitle}
          </h1>
          <p className="font-mono text-base text-cream/60 leading-relaxed max-w-2xl border-l border-clay pl-6">
            {t.servicesIntro}
          </p>
        </div>
      </section>

      {/* Process Analysis Banner + Services Grid */}
      <section className="bg-cream py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">

          {/* Step 0: Process Analysis - always first */}
          <div className="mb-6">
            <span className="font-mono text-xs tracking-widest uppercase text-clay block mb-4">
              {t.servicesAnalysisLabel}
            </span>
            <div className="bg-charcoal rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full opacity-[0.03]">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(242,240,233,1) 1px, transparent 1px), linear-gradient(90deg, rgba(242,240,233,1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-12 h-12 rounded-full bg-clay/10 flex items-center justify-center">
                    <Search size={20} className="text-clay" />
                  </div>
                  <h2 className="font-sans font-bold text-2xl md:text-3xl text-cream">
                    {t.servicesAnalysisTitle}<span className="text-clay">.</span>
                  </h2>
                </div>
                <p className="font-mono text-sm text-cream/50 leading-relaxed">
                  {t.servicesAnalysisDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Arrow connector */}
          <div className="flex items-center justify-center py-2">
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-6 bg-charcoal/20" />
              <ArrowRight size={16} className="text-charcoal/30 rotate-90" />
            </div>
          </div>

          {/* Then: 3 service columns */}
          <div className="mt-2">
            <span className="font-mono text-xs tracking-widest uppercase text-moss block mb-4">
              {t.servicesThenLabel}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.key}
                  to={service.path}
                  className="group bg-charcoal text-cream rounded-[2.5rem] p-8 md:p-10 hover:bg-charcoal/90 transition-colors duration-300 flex flex-col"
                >
                  <h2 className="font-sans font-bold text-xl md:text-2xl mb-4 group-hover:text-clay transition-colors">
                    {t[`service_${service.key}_title`]}
                  </h2>
                  <p className="font-mono text-sm text-cream/60 leading-relaxed mb-6 flex-1">
                    {t[`service_${service.key}_desc`]}
                  </p>
                  <span className="inline-flex items-center gap-2 font-mono text-xs text-clay group-hover:translate-x-2 transition-transform duration-300">
                    {t.servicesReadMore} <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-16">
          <MagneticBtn to={contactPath} className="btn-clay px-10 py-5 text-base">
            {t.servicesCta} <ArrowRight size={18} />
          </MagneticBtn>
        </div>
      </section>
    </>
  );
};

export default DienstenPage;
