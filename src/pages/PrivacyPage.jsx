import { useTranslation } from '../i18n';

const PrivacyPage = () => {
  const { t } = useTranslation();

  const sections = [
    { title: t.privacySectionWho, text: t.privacySectionWhoText },
    { title: t.privacySectionWhat, text: t.privacySectionWhatText },
    { title: t.privacySectionWhy, text: t.privacySectionWhyText },
    { title: t.privacySectionCookies, text: t.privacySectionCookiesText },
    { title: t.privacySectionSharing, text: t.privacySectionSharingText },
    { title: t.privacySectionRights, text: t.privacySectionRightsText },
    { title: t.privacySectionChanges, text: t.privacySectionChangesText },
  ];

  return (
    <section className="bg-charcoal min-h-screen pt-32 pb-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-serif italic text-4xl md:text-5xl text-cream mb-6">{t.privacyTitle}</h1>
        <p className="font-mono text-sm text-cream/60 leading-relaxed mb-12 border-l border-clay pl-6">
          {t.privacyIntro}
        </p>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-sans font-bold text-lg text-cream mb-3">{section.title}</h2>
              <p className="font-mono text-sm text-cream/60 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;
