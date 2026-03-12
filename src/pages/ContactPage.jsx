import { ArrowRight, Send } from 'lucide-react';
import { useTranslation } from '../i18n';

const ContactPage = () => {
  const { t } = useTranslation();

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
            <form
              action="https://formsubmit.co/max@gearshyft.nl"
              method="POST"
              className="space-y-6"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://gearshyft.nl/" />
              <input type="hidden" name="_subject" value="Nieuw bericht via gearshyft.nl" />
              <input type="text" name="_honey" style={{ display: 'none' }} />
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

              <button type="submit" className="btn-magnetic btn-clay px-10 py-5 text-base">
                <span className="flex items-center gap-2">{t.contactSubmit} <Send size={16} /></span>
              </button>
            </form>

            {/* Direct Email */}
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
