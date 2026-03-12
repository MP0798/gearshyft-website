import { useEffect, useState } from 'react';
import { ArrowRight, Send, Calendar, CheckCircle } from 'lucide-react';
import { useTranslation } from '../i18n';

const ContactPage = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        e.target.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal pt-32 pb-20 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif italic text-6xl md:text-8xl text-cream mb-6 leading-none text-center">
            {t.contactTitle} <span className="text-clay">{t.contactHighlight}</span>
          </h1>
          <p className="font-mono text-cream/60 max-w-lg mx-auto mb-16 text-center">
            {t.contactIntro}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle size={48} className="text-moss mb-6" />
                <h2 className="font-sans font-bold text-2xl text-cream mb-3">{t.contactSuccessTitle}</h2>
                <p className="font-mono text-sm text-cream/60">{t.contactSuccessText}</p>
                <p className="font-mono text-xs text-cream/40 mt-4">{t.contactSpamNote}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-xs uppercase tracking-widest text-cream/50 mb-3">
                    {t.contactNameLabel}
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    placeholder={t.contactNamePlaceholder}
                    className="w-full bg-cream/5 border border-cream/15 rounded-2xl px-6 py-4 text-cream font-mono text-sm placeholder:text-cream/30 focus:outline-none focus:border-clay/60 focus:bg-cream/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block font-mono text-xs uppercase tracking-widest text-cream/50 mb-3">
                    {t.contactEmailLabel}
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    placeholder={t.contactEmailPlaceholder}
                    className="w-full bg-cream/5 border border-cream/15 rounded-2xl px-6 py-4 text-cream font-mono text-sm placeholder:text-cream/30 focus:outline-none focus:border-clay/60 focus:bg-cream/10 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-mono text-xs uppercase tracking-widest text-cream/50 mb-3">
                    {t.contactMessageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t.contactMessagePlaceholder}
                    className="w-full bg-cream/5 border border-cream/15 rounded-2xl px-6 py-4 text-cream font-mono text-sm placeholder:text-cream/30 focus:outline-none focus:border-clay/60 focus:bg-cream/10 transition-all duration-300 resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="font-mono text-sm text-clay">{t.contactError}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-magnetic btn-clay px-10 py-5 text-base disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    {status === 'sending' ? t.contactSending : t.contactSubmit} <Send size={16} />
                  </span>
                </button>
              </form>
            )}

            {/* Direct Email + Calendly */}
            <div className="flex flex-col justify-center lg:pl-8">
              <div className="bg-cream/5 border border-cream/10 rounded-[2.5rem] p-10">
                <p className="font-mono text-sm text-cream/50 mb-6">{t.contactOrEmail}</p>
                <a
                  href="mailto:max@gearshyft.nl"
                  className="font-sans font-bold text-2xl md:text-3xl text-cream hover:text-clay transition-colors duration-300 break-all"
                >
                  max@gearshyft.nl
                </a>
                <div className="mt-8 pt-8 border-t border-cream/10">
                  <a
                    href="mailto:max@gearshyft.nl"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-clay hover:text-cream transition-colors duration-300"
                  >
                    {t.contactDirectEmail} <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Calendly */}
              <div className="bg-cream/5 border border-cream/10 rounded-[2.5rem] p-10 mt-6">
                <p className="font-mono text-sm text-cream/50 mb-6">{t.contactOrCall}</p>
                <button
                  onClick={() => window.Calendly?.initPopupWidget({ url: 'https://calendly.com/maxpoppes/30min' })}
                  className="btn-magnetic btn-clay px-8 py-4 text-base cursor-pointer"
                >
                  <span className="flex items-center gap-2"><Calendar size={16} /> {t.contactCalendly}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
