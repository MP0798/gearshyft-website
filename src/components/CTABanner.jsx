import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../i18n';
import MagneticBtn from './MagneticBtn';
import { useLocalizedPath } from '../i18n';

gsap.registerPlugin(ScrollTrigger);

const CTABanner = ({ variant = 'light', textKey, btnKey }) => {
  const { t } = useTranslation();
  const bannerRef = useRef(null);
  const contactPath = useLocalizedPath('/contact');

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(bannerRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 85%"
        }
      });
    }, bannerRef);
    return () => ctx.revert();
  }, []);

  const isLight = variant === 'light';

  return (
    <div
      ref={bannerRef}
      className={`py-20 px-6 md:px-16 lg:px-24 ${isLight ? 'bg-cream text-charcoal' : 'bg-charcoal text-cream'}`}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <p className={`font-serif italic text-3xl md:text-4xl leading-tight ${isLight ? 'text-charcoal' : 'text-cream'}`}>
          {t[textKey]}
        </p>
        <MagneticBtn
          to={contactPath}
          className={`${isLight ? 'btn-clay' : 'btn-moss'} px-10 py-5 text-base whitespace-nowrap`}
        >
          {t[btnKey]} <ArrowRight size={18} />
        </MagneticBtn>
      </div>
    </div>
  );
};

export default CTABanner;
