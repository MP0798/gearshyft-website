import { ArrowRight } from 'lucide-react';
import { useTranslation, useLocalizedPath } from '../i18n';
import MagneticBtn from '../components/MagneticBtn';

const WerkwijzePage = () => {
  const { t } = useTranslation();
  const contactPath = useLocalizedPath('/contact');

  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] bg-charcoal flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-20">
        <div className="max-w-4xl">
          <span className="font-mono text-xs tracking-widest uppercase text-clay block mb-6">{t.approachLabel}</span>
          <h1 className="font-serif italic text-5xl md:text-7xl text-cream leading-tight mb-8">
            {t.approachTitle}
          </h1>
          <p className="font-mono text-base text-cream/60 leading-relaxed max-w-2xl border-l border-clay pl-6">
            {t.approachIntro}
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-cream py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-16">
          {t.approachSteps.map((step, i) => (
            <div key={i} className={`flex flex-col md:flex-row gap-8 items-start ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="flex-shrink-0 w-16 h-16 bg-charcoal text-cream rounded-2xl flex items-center justify-center font-mono text-lg font-bold">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <h2 className="font-sans font-bold text-2xl mb-4 text-charcoal">{step.title}</h2>
                <p className="font-mono text-sm text-charcoal/70 leading-relaxed">{step.text}</p>
              </div>
            </div>
          ))}

          <div className="text-center pt-8">
            <MagneticBtn to={contactPath} className="btn-clay px-10 py-5 text-base">
              {t.approachCta} <ArrowRight size={18} />
            </MagneticBtn>
          </div>
        </div>
      </section>
    </>
  );
};

export default WerkwijzePage;
