import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MousePointer2, Send, Menu, X } from 'lucide-react';

import { Player } from '@remotion/player';
import { BlueprintScanner } from './remotion/BlueprintScanner';
import { BrutalistAssembly } from './remotion/BrutalistAssembly';
import { OperatorSync } from './remotion/OperatorSync';
import { LanguageProvider, useTranslation } from './i18n';

gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Utility Component
const MagneticBtn = ({ children, className, href }) => {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const onMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };

    btn.addEventListener('mousemove', onMouseMove);
    btn.addEventListener('mouseleave', onMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', onMouseMove);
      btn.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const Component = href ? 'a' : 'button';
  return (
    <Component href={href} ref={btnRef} className={`btn-magnetic ${className}`}>
      <span className="flex items-center gap-2">{children}</span>
    </Component>
  );
};

// Language Switcher
const LangSwitch = () => {
  const { lang, setLang } = useTranslation();
  return (
    <button
      onClick={() => setLang(lang === 'en' ? 'nl' : 'en')}
      className="font-mono text-xs tracking-wide uppercase px-3 py-1 rounded-full border border-current opacity-60 hover:opacity-100 transition-opacity duration-300"
    >
      {lang === 'en' ? 'NL' : 'EN'}
    </button>
  );
};

// A. NAVBAR - "The Floating Island"
const Navbar = () => {
  const navRef = useRef(null);
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuLinksRef = useRef([]);
  const menuTl = useRef(null);

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
    { href: '#philosophy', label: t.navMethod },
    { href: '#features', label: t.navFunctional },
    { href: '#protocol', label: t.navArchive },
  ];

  return (
    <>
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
        <nav ref={navRef} className="pointer-events-auto flex items-center justify-between px-8 py-4 rounded-[3rem] w-full max-w-6xl transition-colors text-cream border border-transparent">
          <div className="font-sans font-bold text-xl tracking-tight">GearShyft.</div>
          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-wide">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:-translate-y-[2px] transition-transform duration-300">{link.label}</a>
            ))}
            <LangSwitch />
          </div>
          <div className="flex items-center gap-4">
            <MagneticBtn href="#contact" className="btn-clay px-6 py-2 h-auto text-xs w-auto hidden md:inline-flex">
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
            <a
              key={link.href}
              href={link.href}
              ref={(el) => (menuLinksRef.current[i] = el)}
              onClick={closeMenu}
              className="font-serif italic text-cream text-4xl sm:text-5xl hover:text-clay transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <div ref={(el) => (menuLinksRef.current[navLinks.length] = el)}>
            <LangSwitch />
          </div>
          <a
            ref={(el) => (menuLinksRef.current[navLinks.length + 1] = el)}
            href="#contact"
            onClick={closeMenu}
            className="btn-magnetic btn-clay px-8 py-3 text-sm font-mono tracking-wide rounded-full inline-flex items-center gap-2 mt-4"
          >
            {t.navCta}
          </a>
        </nav>
      </div>
    </>
  );
};

// B. HERO SECTION - "The Opening Shot"
const Hero = () => {
  const heroRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.to(".hero-overlay", { opacity: 0.6, duration: 2, ease: "power2.inOut" })
        .from(".hero-line-1", { y: 60, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1.5")
        .from(".hero-line-2", { y: 60, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1.0")
        .from(".hero-desc", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .from(".hero-btn", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6");

    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full bg-charcoal overflow-hidden flex items-center px-6 md:px-16 lg:px-24">
      {/* Background Image: Dark Forest / Lab texture */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
      {/* Heavy Primary to Black gradient overlay per spec */}
      <div className="absolute inset-0 z-10 hero-overlay opacity-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-moss/40" />

      <div className="relative z-20 max-w-4xl text-cream w-full lg:w-2/3 xl:w-1/2 pt-16">
        <h1 className="flex flex-col gap-2 mb-8">
          <span className="hero-line-1 font-sans font-bold text-5xl md:text-6xl text-clay uppercase tracking-tighter">
            {t.heroLine1}
          </span>
          <span className="hero-line-2 font-serif italic text-7xl md:text-[8rem] leading-[0.8] text-cream">
            {t.heroLine2Before} <br/>{t.heroLine2After}
          </span>
        </h1>

        <p className="hero-desc font-mono text-sm md:text-base leading-relaxed max-w-lg mb-12 opacity-80 border-l border-clay pl-6">
          {t.heroDesc}
        </p>

        <div className="hero-btn">
          <MagneticBtn className="btn-moss px-10 py-5 text-base" href="#features">
            {t.heroCta} <ArrowRight size={18} />
          </MagneticBtn>
        </div>
      </div>
    </section>
  );
};

// C. FEATURES - "Interactive Functional Artifacts"

// Card 1 - Diagnostic Shuffler
const DiagnosticShufflerCard = () => {
  const { t } = useTranslation();
  const [order, setOrder] = useState([0, 1, 2]);

  const cards = useMemo(() => {
    const base = [
      { id: 1, label: t.card1Label1, state: t.card1State1 },
      { id: 2, label: t.card1Label2, state: t.card1State2 },
      { id: 3, label: t.card1Label3, state: t.card1State3 }
    ];
    return order.map(i => base[i]);
  }, [t, order]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="col-span-1 bg-cream border border-charcoal/10 rounded-[2.5rem] p-10 shadow-xl flex flex-col justify-between h-[450px]">
      <div>
        <h3 className="font-sans font-bold text-2xl mb-2 text-charcoal">{t.card1Title} <br/>{t.card1TitleBreak}</h3>
        <p className="font-mono text-sm text-charcoal/60 leading-relaxed mb-8">{t.card1Desc}</p>
      </div>

      <div className="relative h-40 w-full flex items-end justify-center perspective-1000">
        {cards.map((card, index) => {
          const isTop = index === 2;
          const isMiddle = index === 1;
          const isBottom = index === 0;

          return (
            <div
              key={card.id}
              className={`absolute w-full max-w-[280px] bg-charcoal text-cream rounded-[1.5rem] p-4 flex justify-between items-center border border-charcoal/20 transition-all duration-700`}
              style={{
                transform: `translateY(-${index * 20}px) scale(${1 - (2 - index) * 0.05})`,
                opacity: isBottom ? 0.3 : isMiddle ? 0.6 : 1,
                zIndex: index,
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
            >
              <span className="font-mono text-xs">{card.label}</span>
              <span className={`text-[10px] font-sans px-2 py-1 rounded-full ${isTop ? 'bg-clay text-cream' : 'bg-charcoal/50'}`}>
                {card.state}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Card 2 - Telemetry Typewriter
const TelemetryTypewriterCard = () => {
  const { t } = useTranslation();
  const textToType = t.card2Typewriter;
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= textToType.length) {
        setTyped(textToType.slice(0, i));
        i++;
      } else {
        i = 0;
        setTyped("");
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [textToType]);

  return (
    <div className="col-span-1 bg-charcoal text-cream rounded-[2.5rem] p-10 shadow-2xl flex flex-col justify-between h-[450px]">
      <div>
        <div className="flex items-center gap-3 mb-6 font-mono text-xs text-clay">
          <div className="w-2 h-2 rounded-full bg-clay animate-pulse"></div> {t.card2Badge}
        </div>
        <h3 className="font-sans font-bold text-2xl mb-2">{t.card2Title} <br/>{t.card2TitleBreak}</h3>
        <p className="font-mono text-sm text-cream/50 leading-relaxed mb-6 border-l border-moss pl-4">{t.card2Desc}</p>
      </div>

      <div className="bg-moss/20 rounded-[1.5rem] p-6 h-40 border border-moss/30 overflow-hidden relative">
        <pre className="font-mono text-xs leading-relaxed text-clay whitespace-pre-wrap">
          {typed}
          <span className="inline-block w-2 text-clay animate-pulse">_</span>
        </pre>
      </div>
    </div>
  );
};

// Card 3 - Cursor Protocol Scheduler
const CursorSchedulerCard = () => {
  const svgRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

      // Cursor enter
      tl.fromTo(".sched-cursor",
        { x: 50, y: 100, opacity: 0 },
        { x: 30, y: 30, opacity: 1, duration: 1, ease: "power2.out" }
      )
      // Hover cell
      .to(".sched-cursor", { x: 120, y: 40, duration: 0.8, ease: "power1.inOut" })
      // Click cell
      .to(".sched-cursor", { scale: 0.8, duration: 0.1 })
      .to(".target-cell", { backgroundColor: "#CC5833", color: "#F2F0E9", duration: 0.2 }, "<")
      .to(".sched-cursor", { scale: 1, duration: 0.1 })
      // Move to save
      .to(".sched-cursor", { x: 180, y: 120, duration: 0.7, ease: "power1.inOut" })
      // Click save
      .to(".sched-cursor", { scale: 0.8, duration: 0.1 })
      .to(".btn-save", { scale: 0.95, duration: 0.1 }, "<")
      .to(".sched-cursor", { scale: 1, duration: 0.1 })
      .to(".btn-save", { scale: 1, duration: 0.1 }, "<")
      // Exit
      .to(".sched-cursor", { x: 250, y: 150, opacity: 0, duration: 0.8 });

    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="col-span-1 bg-cream border border-charcoal/10 rounded-[2.5rem] p-10 shadow-xl flex flex-col justify-between h-[450px]">
      <div>
        <h3 className="font-sans font-bold text-2xl mb-2 text-charcoal">{t.card3Title} <br/>{t.card3TitleBreak}</h3>
        <p className="font-mono text-sm text-charcoal/60 leading-relaxed mb-6">{t.card3Desc}</p>
      </div>

      <div ref={svgRef} className="bg-charcoal/5 rounded-[1.5rem] p-6 h-40 border border-charcoal/10 relative overflow-hidden">
        <div className="grid grid-cols-7 gap-1 text-[10px] font-mono text-center mb-4">
          {t.card3Days.map((day, i) => <div key={i}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({length: 14}).map((_, i) => (
            <div key={i} className={`h-6 rounded-md bg-charcoal/10 flex items-center justify-center ${i === 9 ? 'target-cell' : ''}`}></div>
          ))}
        </div>

        <div className="absolute bottom-4 right-4 btn-save bg-charcoal text-cream text-[10px] font-mono px-4 py-2 rounded-full">
          {t.card3Confirm}
        </div>

        {/* Animated Cursor */}
        <MousePointer2 className="sched-cursor absolute z-10 text-moss w-6 h-6 will-change-transform" strokeWidth={1.5} fill="white" />
      </div>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".feature-card-wrapper", {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%"
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-32 px-6 md:px-16 lg:px-24 bg-cream relative z-20 rounded-t-[3rem] -mt-12 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="feature-card-wrapper">
          <DiagnosticShufflerCard />
        </div>
        <div className="feature-card-wrapper">
          <TelemetryTypewriterCard />
        </div>
        <div className="feature-card-wrapper">
          <CursorSchedulerCard />
        </div>
      </div>
    </section>
  );
};

// D. PHILOSOPHY - "The Manifesto"
const Philosophy = () => {
  const philRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".phil-text > span", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: philRef.current,
          start: "top 60%"
        }
      });

      gsap.to(".phil-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: philRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, philRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={philRef} id="philosophy" className="relative py-48 bg-charcoal overflow-hidden flex items-center justify-center">
      {/* Background organic parallax */}
      <img src="/images/philosophy-bg.jpg" alt="Organic Tech Background" className="phil-bg absolute inset-0 w-full h-[150%] object-cover opacity-10" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center phil-text">
        <span className="block font-sans text-sm md:text-base text-cream/60 tracking-widest uppercase mb-12 border-b border-cream/20 pb-4 max-w-md mx-auto">
          {t.philSub}
        </span>
        <span className="block font-serif italic text-5xl md:text-7xl lg:text-8xl leading-none text-cream mb-6">
          {t.philMain} <span className="text-clay">{t.philHighlight}</span> {t.philEnd}
        </span>
      </div>
    </section>
  );
};

// E. PROTOCOL - "Sticky Stacking Archive"
const ProtocolCard = ({ step, title, desc, animType, index }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isVisible) {
      player.seekTo(0);
      player.play();
    } else {
      player.pause();
    }
  }, [isVisible]);

  const playerProps = {
    ref: playerRef,
    compositionWidth: animType === "ekg" ? 400 : 600,
    compositionHeight: 400,
    fps: 30,
    style: { width: '100%', height: '100%' },
    loop: true,
  };

  return (
    <div className={`protocol-stack-card sticky top-0 h-screen w-full flex items-center justify-center pt-20 px-6 ${index % 2 === 0 ? 'bg-cream text-charcoal' : 'bg-charcoal text-cream'}`}>
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="font-mono text-xs tracking-widest uppercase block mb-8 text-clay">{t.stepPrefix} // {step}</span>
          <h2 className="font-sans font-bold text-5xl md:text-7xl mb-8 tracking-tighter">{title}</h2>
          <p className="font-mono text-base md:text-lg opacity-70 leading-relaxed max-w-lg border-l border-moss pl-6">{desc}</p>
        </div>

        <div ref={containerRef} className="h-64 md:h-96 rounded-[3rem] border border-current flex justify-center items-center overflow-hidden relative opacity-60 hover:opacity-100 transition-opacity duration-500">
          {animType === "helix" && (
            <Player
              {...playerProps}
              component={BlueprintScanner}
              durationInFrames={150}
            />
          )}
          {animType === "laser" && (
            <Player
              {...playerProps}
              component={BrutalistAssembly}
              durationInFrames={210}
            />
          )}
          {animType === "ekg" && (
            <Player
              {...playerProps}
              component={OperatorSync}
              durationInFrames={150}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-stack-card');

      cards.forEach((card, i) => {
        if (i !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.9,
            filter: "blur(10px)",
            opacity: 0.5,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top 95%", // Delay the fade out until the next card is almost fully visible
              end: "top 20%",
              scrub: true,
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="protocol" className="relative">
      <ProtocolCard
        index={0}
        step="01"
        title={t.step01Title}
        desc={t.step01Desc}
        animType="helix"
      />
      <ProtocolCard
        index={1}
        step="02"
        title={t.step02Title}
        desc={t.step02Desc}
        animType="laser"
      />
      <ProtocolCard
        index={2}
        step="03"
        title={t.step03Title}
        desc={t.step03Desc}
        animType="ekg"
      />
    </section>
  );
};

// INTERMEDIATE CTA BANNER
const CTABanner = ({ variant = 'light', textKey, btnKey }) => {
  const { t } = useTranslation();
  const bannerRef = useRef(null);

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
          href="#contact"
          className={`${isLight ? 'btn-clay' : 'btn-moss'} px-10 py-5 text-base whitespace-nowrap`}
        >
          {t[btnKey]} <ArrowRight size={18} />
        </MagneticBtn>
      </div>
    </div>
  );
};

// PRIVACY MODAL
const PrivacyModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const overlayRef = useRef(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-sm flex items-start justify-center overflow-y-auto"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="relative w-full max-w-3xl mx-auto px-6 py-20 md:py-24">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={t.privacyClose}
          className="fixed top-8 right-8 text-cream/60 hover:text-clay transition-colors duration-300 z-[101]"
        >
          <X size={32} strokeWidth={1.5} />
        </button>

        {/* Content */}
        <h2 className="font-serif italic text-4xl md:text-5xl text-cream mb-6">{t.privacyTitle}</h2>
        <p className="font-mono text-sm text-cream/60 leading-relaxed mb-12 border-l border-clay pl-6">
          {t.privacyIntro}
        </p>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h3 className="font-sans font-bold text-lg text-cream mb-3">{section.title}</h3>
              <p className="font-mono text-sm text-cream/60 leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10">
          <button
            onClick={onClose}
            className="font-mono text-xs uppercase tracking-widest text-clay hover:text-cream transition-colors duration-300"
          >
            {t.privacyClose}
          </button>
        </div>
      </div>
    </div>
  );
};

// G. CONTACT SECTION & FOOTER
const Footer = ({ onOpenPrivacy }) => {
  const { t } = useTranslation();
  return (
    <footer id="contact" className="bg-charcoal relative z-20 rounded-t-[4rem] -mt-12 overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      {/* Contact Section */}
      <div className="py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif italic text-6xl md:text-8xl text-cream mb-6 leading-none text-center">
            {t.contactTitle} <span className="text-clay">{t.contactHighlight}</span>
          </h2>
          <p className="font-mono text-cream/60 max-w-lg mx-auto mb-16 text-center">
            {t.contactIntro}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form via Formsubmit.co (free, no account needed) */}
            <form
              action="https://formsubmit.co/max@gearshyft.nl"
              method="POST"
              className="space-y-6"
            >
              {/* Formsubmit config: disable captcha page, redirect back to site */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://gearshyft.nl/" />
              <input type="hidden" name="_subject" value="Nieuw bericht via gearshyft.nl" />
              {/* Honeypot spam protection */}
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

            {/* Direct Email Option */}
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
      </div>

      {/* Footer Bottom */}
      <div className="px-6 md:px-16 lg:px-24 pb-16">
        <div className="border-t border-cream/10 pt-16 grid grid-cols-1 md:grid-cols-4 gap-12 font-mono text-xs text-cream/50 max-w-6xl mx-auto">
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-sans font-bold text-2xl text-cream mb-4">GearShyft.</h4>
            <p className="max-w-xs leading-relaxed">{t.footerDesc}</p>
          </div>

          <div>
            <h5 className="uppercase tracking-widest text-clay mb-6">{t.footerNav}</h5>
            <ul className="space-y-4">
              <li><a href="#features" className="hover:text-cream transition-colors">{t.footerNavItems[0]}</a></li>
              <li><a href="#philosophy" className="hover:text-cream transition-colors">{t.footerNavItems[1]}</a></li>
              <li><a href="#protocol" className="hover:text-cream transition-colors">{t.footerNavItems[2]}</a></li>
              <li><button onClick={onOpenPrivacy} className="hover:text-cream transition-colors">{t.footerPrivacy}</button></li>
            </ul>
          </div>

          <div>
            <h5 className="uppercase tracking-widest text-clay mb-6">{t.footerContact}</h5>
            <ul className="space-y-4">
              <li><a href="mailto:max@gearshyft.nl" className="hover:text-cream transition-colors">max@gearshyft.nl</a></li>
              {/* TODO: Update with real Twitter/X URL */}
              <li><a href="https://x.com/gearshyft" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">Twitter (X)</a></li>
              {/* TODO: Update with real LinkedIn URL */}
              <li><a href="https://linkedin.com/company/gearshyft" target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col md:flex-row justify-between items-center px-4 font-mono text-[10px] text-cream/40 uppercase tracking-widest max-w-6xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span>&copy; {new Date().getFullYear()} GearShyft</span>
            {/* TODO: Max - vul hier het echte KvK-nummer in */}
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

function AppContent() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <div className="relative selection:bg-clay selection:text-cream font-sans bg-cream text-charcoal">
      <div className="noise-overlay fixed inset-0 pointer-events-none z-50"></div>

      <Navbar />

      <main>
        <Hero />
        <Features />
        <CTABanner variant="light" textKey="ctaBanner1Text" btnKey="ctaBanner1Btn" />
        <Philosophy />
        <Protocol />
        <CTABanner variant="dark" textKey="ctaBanner2Text" btnKey="ctaBanner2Btn" />
      </main>

      <Footer onOpenPrivacy={() => setPrivacyOpen(true)} />
      <PrivacyModal isOpen={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
