import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MousePointer2 } from 'lucide-react';
import { Player } from '@remotion/player';
import { BlueprintScanner } from '../remotion/BlueprintScanner';
import { BrutalistAssembly } from '../remotion/BrutalistAssembly';
import { OperatorSync } from '../remotion/OperatorSync';
import { useTranslation, useLocalizedPath } from '../i18n';
import MagneticBtn from '../components/MagneticBtn';
import CTABanner from '../components/CTABanner';

gsap.registerPlugin(ScrollTrigger);

// B. HERO SECTION
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

  const dienstenPath = useLocalizedPath('/diensten');

  return (
    <section ref={heroRef} className="relative h-[100dvh] w-full bg-charcoal overflow-hidden flex items-center px-6 md:px-16 lg:px-24">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      />
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
          <MagneticBtn className="btn-moss px-10 py-5 text-base" to={dienstenPath}>
            {t.heroCta} <ArrowRight size={18} />
          </MagneticBtn>
        </div>
      </div>
    </section>
  );
};

// C. FEATURES

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

      tl.fromTo(".sched-cursor",
        { x: 50, y: 100, opacity: 0 },
        { x: 30, y: 30, opacity: 1, duration: 1, ease: "power2.out" }
      )
      .to(".sched-cursor", { x: 120, y: 40, duration: 0.8, ease: "power1.inOut" })
      .to(".sched-cursor", { scale: 0.8, duration: 0.1 })
      .to(".target-cell", { backgroundColor: "#CC5833", color: "#F2F0E9", duration: 0.2 }, "<")
      .to(".sched-cursor", { scale: 1, duration: 0.1 })
      .to(".sched-cursor", { x: 180, y: 120, duration: 0.7, ease: "power1.inOut" })
      .to(".sched-cursor", { scale: 0.8, duration: 0.1 })
      .to(".btn-save", { scale: 0.95, duration: 0.1 }, "<")
      .to(".sched-cursor", { scale: 1, duration: 0.1 })
      .to(".btn-save", { scale: 1, duration: 0.1 }, "<")
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

// D. PHILOSOPHY
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

// E. PROTOCOL
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
            <Player {...playerProps} component={BlueprintScanner} durationInFrames={150} />
          )}
          {animType === "laser" && (
            <Player {...playerProps} component={BrutalistAssembly} durationInFrames={210} />
          )}
          {animType === "ekg" && (
            <Player {...playerProps} component={OperatorSync} durationInFrames={150} />
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
              start: "top 95%",
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
      <ProtocolCard index={0} step="01" title={t.step01Title} desc={t.step01Desc} animType="helix" />
      <ProtocolCard index={1} step="02" title={t.step02Title} desc={t.step02Desc} animType="laser" />
      <ProtocolCard index={2} step="03" title={t.step03Title} desc={t.step03Desc} animType="ekg" />
    </section>
  );
};

// HOMEPAGE
const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <CTABanner variant="light" textKey="ctaBanner1Text" btnKey="ctaBanner1Btn" />
      <Philosophy />
      <Protocol />
      <CTABanner variant="dark" textKey="ctaBanner2Text" btnKey="ctaBanner2Btn" />
    </>
  );
};

export default HomePage;
