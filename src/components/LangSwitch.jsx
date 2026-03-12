import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from '../i18n';

// Maps NL paths to EN paths and vice versa
const routeMap = {
  nl: {
    '/': '/en',
    '/over': '/en/about',
    '/diensten': '/en/services',
    '/diensten/werkprocessen': '/en/services/work-processes',
    '/diensten/tools-en-systemen': '/en/services/tools-and-systems',
    '/diensten/data-op-orde': '/en/services/data-management',
    '/werkwijze': '/en/approach',
    '/contact': '/en/contact',
    '/privacy': '/en/privacy',
    '/faq': '/en/faq',
  },
  en: {
    '/en': '/',
    '/en/about': '/over',
    '/en/services': '/diensten',
    '/en/services/work-processes': '/diensten/werkprocessen',
    '/en/services/tools-and-systems': '/diensten/tools-en-systemen',
    '/en/services/data-management': '/diensten/data-op-orde',
    '/en/approach': '/werkwijze',
    '/en/contact': '/contact',
    '/en/privacy': '/privacy',
    '/en/faq': '/faq',
  },
};

const LangSwitch = () => {
  const { lang } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const switchLang = () => {
    const currentPath = location.pathname;
    const map = routeMap[lang];
    const targetPath = map[currentPath] || (lang === 'nl' ? '/en' : '/');
    navigate(targetPath);
  };

  return (
    <button
      onClick={switchLang}
      className="font-mono text-xs tracking-wide uppercase px-3 py-1 rounded-full border border-current opacity-60 hover:opacity-100 transition-opacity duration-300"
    >
      {lang === 'en' ? 'NL' : 'EN'}
    </button>
  );
};

export default LangSwitch;
