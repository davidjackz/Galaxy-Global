import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';

/**
 * Hero component using GSAP for high-impact text reveals.
 * Refined with multi-layered parallax and advanced staggered reveals.
 */
export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const title1 = "The Global";
  const title2 = "Video Agency!";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.from(".char", {
        y: 100,
        rotateX: -90,
        stagger: 0.02,
        duration: 1.2,
      })
      .from(".subtitle-reveal", {
        opacity: 0,
        y: 20,
        duration: 1,
      }, "-=0.6")
      .from(".hero-cta", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 1,
      }, "-=0.8");

      // Interactive parallax for desktop
      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 1024) return;
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;

        gsap.to(".parallax-layer", {
          x: (i) => xPos * (i + 1) * 0.2,
          y: (i) => yPos * (i + 1) * 0.2,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex min-h-screen w-full flex-col items-center justify-center pt-24 md:pt-32 pb-20 overflow-hidden bg-background">
      {/* Background Parallax Layers */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="parallax-layer absolute inset-0 opacity-[0.03] flex items-center justify-center">
            <div className="w-[120%] h-[120%] border-[1px] border-foreground/10 rounded-full scale-150" />
        </div>
        <div className="parallax-layer absolute inset-0 opacity-[0.02] flex items-center justify-center">
            <div className="w-[100%] h-[100%] border-[2px] border-foreground/20 rounded-full rotate-45" />
        </div>
      </div>

      <div className="z-10 flex flex-col items-center text-center px-6 md:px-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="text-[8px] md:text-[10px] uppercase tracking-[0.6em] text-muted mb-8 md:mb-12 font-black"
        >
          Visual Engineering Studio
        </motion.div>

        <h1 className="text-[12vw] md:text-[9vw] font-black leading-[0.8] md:leading-[0.8] tracking-tighter uppercase mb-12 md:mb-20 text-foreground">
          <div className="reveal-container overflow-hidden py-2 flex flex-wrap justify-center gap-[0.05em]">
            {title1.split(" ").map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split("").map((c, ci) => (
                  <span key={ci} className="char inline-block">{c}</span>
                ))}
              </span>
            ))}
          </div>
          <div className="reveal-container overflow-hidden py-2 flex flex-wrap justify-center gap-[0.05em]">
            {title2.split(" ").map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap italic font-light opacity-60">
                {word.split("").map((c, ci) => (
                  <span key={ci} className="char inline-block">{c}</span>
                ))}
              </span>
            ))}
          </div>
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full max-w-4xl gap-12 md:gap-20">
          <div className="subtitle-reveal text-sm md:text-base leading-relaxed text-muted text-left border-l-[1px] border-foreground/20 pl-6 md:pl-10 max-w-sm">
            We build cinematic architectures for the next generation of global storytellers. Technical precision meets visual obsession.
          </div>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full md:w-auto">
            <motion.button 
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => (window as any).lenis?.scrollTo('#portfolio', { offset: -100 })}
              className="hero-cta px-10 py-5 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.4em] rounded-full transition-all"
            >
              Portfolio
            </motion.button>
            <motion.button 
              whileHover={{ y: -5, scale: 1.02, borderColor: 'var(--foreground)' }}
              whileTap={{ scale: 0.98 }}
              className="hero-cta px-10 py-5 border border-border text-foreground text-[10px] font-black uppercase tracking-[0.4em] rounded-full transition-all"
            >
              Contact
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-4 opacity-10"
      >
        <div className="w-[1px] h-24 bg-gradient-to-b from-foreground to-transparent" />
      </motion.div>
    </div>
  );
}

