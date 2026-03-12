import { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useTranslation, useLocalizedPath } from '../i18n';
import MagneticBtn from '../components/MagneticBtn';

const FaqSchema = ({ items }) => {
  useEffect(() => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      })),
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    script.id = 'faq-schema';
    document.head.appendChild(script);
    return () => {
      const el = document.getElementById('faq-schema');
      if (el) el.remove();
    };
  }, [items]);
  return null;
};

const FaqItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-charcoal/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left"
      >
        <h2 className="font-sans font-bold text-lg text-charcoal pr-8">{question}</h2>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-clay transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 pb-6' : 'max-h-0'}`}
      >
        <p className="font-mono text-sm text-charcoal/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FaqPage = () => {
  const { t } = useTranslation();
  const contactPath = useLocalizedPath('/contact');

  return (
    <>
      <FaqSchema items={t.faqItems} />
      {/* Hero */}
      <section className="min-h-[40vh] bg-charcoal flex items-center px-6 md:px-16 lg:px-24 pt-32 pb-20">
        <div className="max-w-4xl">
          <span className="font-mono text-xs tracking-widest uppercase text-clay block mb-6">{t.faqLabel}</span>
          <h1 className="font-serif italic text-5xl md:text-7xl text-cream leading-tight">
            {t.faqTitle}
          </h1>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="bg-cream py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-3xl mx-auto">
          {t.faqItems.map((item, i) => (
            <FaqItem key={i} question={item.q} answer={item.a} />
          ))}

          <div className="text-center pt-16">
            <p className="font-mono text-sm text-charcoal/60 mb-6">{t.faqStillQuestions}</p>
            <MagneticBtn to={contactPath} className="btn-clay px-10 py-5 text-base">
              {t.faqCta} <ArrowRight size={18} />
            </MagneticBtn>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqPage;
