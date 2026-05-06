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
  const title2 = "Video Editing Agency!";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State: Set items slightly off-screen/transparent
      gsap.set('.char', { y: 100, rotateX: -60, opacity: 0 });
      gsap.set('.subtitle-reveal', { opacity: 0, x: -20 });

      // 2. Cinematic Entrance Timeline
      const tl = gsap.timeline({ 
        defaults: { ease: 'expo.out' },
        delay: 2.2 // wait for preloader curtain lift
      });

      tl.to('.char', {
        y: 0,
        rotateX: 0,
        opacity: 1,
        duration: 2.5,
        stagger: {
          amount: 0.8,
          from: 'random'
        },
        ease: 'expo.out'
      })
      .to('.subtitle-reveal', {
        opacity: 1,
        x: 0,
        duration: 1.5,
      }, '-=1.2')
      .from('.hero-cta', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
      }, '-=1');

      // 3. Multi-Layer Parallax Engine
      gsap.to('.parallax-layer-1', {
        y: -200,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      gsap.to('.parallax-layer-2', {
        y: -120,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to('.parallax-layer-3', {
        y: -60,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        }
      });

      gsap.to('.parallax-layer-4', {
        y: -100,
        x: -50,
        opacity: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        }
      });

      // Subtle float animation for background shapes
      gsap.to('.floating-shape', {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-10, 10)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative flex min-h-[85vh] w-full flex-col items-center justify-center pt-12 pb-20 overflow-hidden bg-background transition-colors duration-500">
      {/* Background Layer 1: Distant Glows */}
      <div className="parallax-layer-1 absolute inset-0 -z-30 flex items-center justify-center pointer-events-none opacity-20">
        <div className="h-[800px] w-[800px] rounded-full bg-foreground blur-[180px] opacity-10" />
      </div>

      {/* Background Layer 2: Geometric Accents with Loops */}
      <div className="parallax-layer-2 absolute inset-0 -z-20 flex items-center justify-center pointer-events-none opacity-40">
        <motion.div 
          animate={{ rotate: 360, y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="floating-shape absolute top-1/4 left-1/4 w-32 h-32 border border-foreground/5" 
        />
        <motion.div 
          animate={{ rotate: -360, x: [0, -20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="floating-shape absolute bottom-1/4 right-1/4 w-48 h-48 border border-foreground/5" 
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="floating-shape absolute top-1/2 right-20 w-16 h-16 border border-foreground/10 rotate-[45deg]" 
        />
      </div>

      {/* Background Layer 3: Grid Pattern */}
      <div className="parallax-layer-3 absolute inset-0 -z-10 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--foreground) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Background Layer 4: Distant Static Text / Branding */}
      <div className="parallax-layer-4 absolute inset-0 -z-5 flex items-end justify-start p-20 pointer-events-none opacity-[0.02]">
        <div className="text-[20vw] font-black uppercase tracking-tighter leading-none select-none text-foreground">
          Galaxy
        </div>
      </div>

      <div className="z-10 flex flex-col items-center text-center px-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2 }}
          className="text-[10px] uppercase tracking-[0.6em] text-muted mb-10 font-bold"
        >
          Visual Storytelling Engineering
        </motion.div>

        <h1 className="text-4xl md:text-[7vw] font-bold leading-[0.85] tracking-tighter uppercase max-w-4xl mb-12 text-foreground perspective-1000">
          <div className="reveal-container overflow-hidden py-2 flex flex-wrap justify-center gap-[0.2em]">
            {title1.split(" ").map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split("").map((c, ci) => (
                  <span key={ci} className="char inline-block">{c}</span>
                ))}
              </span>
            ))}
          </div>
          <div className="reveal-container overflow-hidden py-2 flex flex-wrap justify-center gap-[0.2em]">
            {title2.split(" ").map((word, wi) => (
              <span key={wi} className="inline-block whitespace-nowrap">
                {word.split("").map((c, ci) => (
                  <span key={ci} className="char inline-block">{c}</span>
                ))}
              </span>
            ))}
          </div>
        </h1>

        <div className="subtitle-reveal max-w-xl text-sm md:text-base leading-relaxed border-l border-border pl-8 text-neutral-500 text-left">
          Elite video architecture for the next dimension of creators. We don't just edit; we engineer audience retention through visual psychology and technical mastery.
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row gap-6"
        >
          <motion.button 
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 40px rgba(128, 128, 128, 0.3)" 
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const lenis = (window as any).lenis;
              if (lenis) {
                lenis.scrollTo('#portfolio', { offset: -100, duration: 2 });
              } else {
                document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hero-cta px-12 py-5 bg-foreground text-background text-[11px] font-black uppercase tracking-[0.3em] transition-all"
          >
            Explore Portfolio
          </motion.button>
          <motion.button 
            whileHover={{ 
              backgroundColor: "var(--foreground)", 
              color: "var(--background)",
              boxShadow: "0 0 30px rgba(128, 128, 128, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const lenis = (window as any).lenis;
              if (lenis) {
                lenis.scrollTo('#pricing', { offset: -100, duration: 2 });
              } else {
                document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="hero-cta px-12 py-5 border border-foreground/20 text-foreground text-[11px] font-black uppercase tracking-[0.3em] transition-all"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator with geometric feel */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-4 opacity-20"
      >
        <div className="w-px h-16 bg-gradient-to-b from-foreground to-transparent" />
      </motion.div>
    </div>
  );
}
