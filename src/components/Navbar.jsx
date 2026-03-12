import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { useTranslation, useLocalizedPath } from '../i18n';
import LangSwitch from './LangSwitch';
import MagneticBtn from './MagneticBtn';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const navRef = useRef(null);
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuLinksRef = useRef([]);
  const menuTl = useRef(null);

  const werkwijzePath = useLocalizedPath('/werkwijze');
  const dienstenPath = useLocalizedPath('/diensten');
  const overPath = useLocalizedPath('/over');
  const blogPath = useLocalizedPath('/blog');
  const contactPath = useLocalizedPath('/contact');

  // Scroll-triggered navbar styling
  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -100",
        onUpdate: (self) => {
          if (self.direction === 1) {
            gsap.to(navRef.current, { backgroundColor: "rgba(242, 240, 233, 0.85)", backdropFilter: "blur(16px)", color: "#1A1A1A", borderBottom: "1px solid rgba(26, 26, 26, 0.1)", duration: 0.6, ease: "power3.out" });
          } else if (self.progress === 0) {
            gsap.to(navRef.current, { backgroundColor: "transparent", backdropFilter: "blur(0px)", color: "#F2F0E9", borderBottom: "1px solid transparent", duration: 0.6, ease: "power3.out" });
          }
        }
      });
    });
    return () => ctx.revert();
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // GSAP animation for mobile menu
  useEffect(() => {
    if (!overlayRef.current) return;

    if (menuOpen) {
      const links = menuLinksRef.current.filter(Boolean);
      gsap.set(overlayRef.current, { display: 'flex' });
      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power3.out" });
      tl.fromTo(links, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", stagger: 0.08 }, "-=0.2");
      menuTl.current = tl;
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          if (overlayRef.current) gsap.set(overlayRef.current, { display: 'none' });
        }
      });
      tl.to(overlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" });
      menuTl.current = tl;
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { to: overPath, label: t.navAbout },
    { to: dienstenPath, label: t.navServices },
    { to: werkwijzePath, label: t.navApproach },
    { to: blogPath, label: t.blogLabel },
  ];

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
        <nav ref={navRef} className="pointer-events-auto flex items-center justify-between px-8 py-4 rounded-[3rem] w-full max-w-6xl transition-colors text-cream border border-transparent">
          <Link to={useLocalizedPath('/')} className="font-sans font-bold text-xl tracking-tight">GearShyft.</Link>
          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wide">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:-translate-y-[2px] transition-transform duration-300">{link.label}</Link>
            ))}
            <LangSwitch />
          </div>
          <div className="flex items-center gap-4">
            <MagneticBtn to={contactPath} className="btn-clay px-6 py-2 h-auto text-xs w-auto hidden md:inline-flex">
              {t.navCta}
            </MagneticBtn>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label={t.menuOpen}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
            >
              <span className="block w-6 h-[2px] bg-current rounded-full" />
              <span className="block w-6 h-[2px] bg-current rounded-full" />
              <span className="block w-4 h-[2px] bg-current rounded-full self-start" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile fullscreen overlay menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-charcoal flex-col items-center justify-center px-8"
        style={{ display: 'none' }}
      >
        {/* Close button */}
        <button
          onClick={closeMenu}
          aria-label={t.menuClose}
          className="absolute top-10 right-8 text-cream hover:text-clay transition-colors duration-300"
        >
          <X size={32} strokeWidth={1.5} />
        </button>

        {/* Menu links */}
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={link.to}
              to={link.to}
              ref={(el) => (menuLinksRef.current[i] = el)}
              onClick={closeMenu}
              className="font-serif italic text-cream text-4xl sm:text-5xl hover:text-clay transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
          <div ref={(el) => (menuLinksRef.current[navLinks.length] = el)}>
            <LangSwitch />
          </div>
          <Link
            ref={(el) => (menuLinksRef.current[navLinks.length + 1] = el)}
            to={contactPath}
            onClick={closeMenu}
            className="btn-magnetic btn-clay px-8 py-3 text-sm font-mono tracking-wide rounded-full inline-flex items-center gap-2 mt-4"
          >
            {t.navCta}
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
