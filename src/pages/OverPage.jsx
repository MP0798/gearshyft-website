import { ArrowRight } from 'lucide-react';
import { useTranslation, useLocalizedPath } from '../i18n';
import MagneticBtn from '../components/MagneticBtn';

const OverPage = () => {
  const { t } = useTranslation();
  const contactPath = useLocalizedPath('/contact');

  return (
    <>
      {/* Hero */}
      <section className="min-h-[60vh] bg-charcoal flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-20">
        <div className="max-w-4xl">
          <span className="font-mono text-xs tracking-widest uppercase text-clay block mb-6">{t.aboutLabel}</span>
          <h1 className="font-serif italic text-5xl md:text-7xl text-cream leading-tight mb-8">
            {t.aboutTitle}
          </h1>
          <p className="font-mono text-base text-cream/60 leading-relaxed max-w-2xl border-l border-clay pl-6">
            {t.aboutIntro}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto space-y-16">
          <div>
            <h2 className="font-sans font-bold text-3xl mb-6 text-charcoal">{t.aboutMissionTitle}</h2>
            <p className="font-mono text-sm text-charcoal/70 leading-relaxed">{t.aboutMissionText}</p>
          </div>

          <div>
            <h2 className="font-sans font-bold text-3xl mb-6 text-charcoal">{t.aboutValuesTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.aboutValues.map((value, i) => (
                <div key={i} className="bg-charcoal/5 rounded-2xl p-8">
                  <h3 className="font-sans font-bold text-lg mb-3 text-charcoal">{value.title}</h3>
                  <p className="font-mono text-sm text-charcoal/60 leading-relaxed">{value.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-8">
            <MagneticBtn to={contactPath} className="btn-clay px-10 py-5 text-base">
              {t.aboutCta} <ArrowRight size={18} />
            </MagneticBtn>
          </div>
        </div>
      </section>
    </>
  );
};

export default OverPage;
