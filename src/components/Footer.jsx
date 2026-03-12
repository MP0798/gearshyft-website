import { Link } from 'react-router-dom';
import { ArrowRight, Send } from 'lucide-react';
import { useTranslation, useLocalizedPath } from '../i18n';

const Footer = () => {
  const { t } = useTranslation();
  const dienstenPath = useLocalizedPath('/diensten');
  const overPath = useLocalizedPath('/over');
  const werkwijzePath = useLocalizedPath('/werkwijze');
  const projectenPath = useLocalizedPath('/projecten');
  const blogPath = useLocalizedPath('/blog');
  const contactPath = useLocalizedPath('/contact');
  const privacyPath = useLocalizedPath('/privacy');

  return (
    <footer className="bg-charcoal relative z-20 rounded-t-[4rem] -mt-12 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      {/* Footer Bottom */}
      <div className="px-6 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 font-mono text-xs text-cream/50 max-w-6xl mx-auto">
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-sans font-bold text-2xl text-cream mb-4">GearShyft.</h4>
            <p className="max-w-xs leading-relaxed">{t.footerDesc}</p>
          </div>

          <div>
            <h5 className="uppercase tracking-widest text-clay mb-6">{t.footerNav}</h5>
            <ul className="space-y-4">
              <li><Link to={dienstenPath} className="hover:text-cream transition-colors">{t.footerNavItems[0]}</Link></li>
              <li><Link to={overPath} className="hover:text-cream transition-colors">{t.footerNavItems[1]}</Link></li>
              <li><Link to={werkwijzePath} className="hover:text-cream transition-colors">{t.footerNavItems[2]}</Link></li>
              <li><Link to={projectenPath} className="hover:text-cream transition-colors">{t.projectsLabel}</Link></li>
              <li><Link to={blogPath} className="hover:text-cream transition-colors">{t.footerNavItems[3]}</Link></li>
              <li><Link to={privacyPath} className="hover:text-cream transition-colors">{t.footerPrivacy}</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-widest text-clay mb-6">{t.footerContact}</h5>
            <ul className="space-y-4">
              <li><a href="mailto:max@gearshyft.nl" className="hover:text-cream transition-colors">max@gearshyft.nl</a></li>
              <li><a href="https://x.com/gearshyft" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">Twitter (X)</a></li>
              <li><a href="https://linkedin.com/company/gearshyft" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col md:flex-row justify-between items-center px-4 font-mono text-[10px] text-cream/40 uppercase tracking-widest max-w-6xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span>&copy; {new Date().getFullYear()} GearShyft</span>
            <span className="font-mono text-[10px] text-cream/40 uppercase tracking-widest">{t.footerKvk}</span>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0 bg-moss/20 px-4 py-2 rounded-full border border-moss/50">
            <span className="w-2 h-2 rounded-full bg-[#CC5833] animate-pulse"></span>
            {t.footerStatus}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
