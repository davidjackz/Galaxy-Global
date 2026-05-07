import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Preloader component that creates a "Curtain Lift" entrance effect.
 * Features a splitting horizontal panel reveal for a dramatic first impression.
 */
export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Initial State
    gsap.set([leftPanelRef.current, rightPanelRef.current], { width: '50%' });

    // 2. Pulse of the central geometric element & Text Reveal
    tl.fromTo(contentRef.current, 
      { scale: 0.9, opacity: 0, y: 20 }, 
      { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }
    )
    .from('.preloader-text', {
      opacity: 0,
      y: 10,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.out'
    }, '-=1')
    
    // 3. Curtain Lift: Horizontal split (Clean move)
    .to([leftPanelRef.current, rightPanelRef.current], {
      xPercent: (i) => i === 0 ? -100 : 100,
      duration: 1.2,
      ease: 'expo.inOut',
    }, '+=0.5')
    .to(contentRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: 'power2.inOut'
    }, '<') // Start fading content as curtains split
    .to(containerRef.current, {
      display: 'none',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Left Curtain */}
      <div 
        ref={leftPanelRef}
        className="absolute left-0 top-0 h-full bg-black border-r border-white/5"
      />
      
      {/* Right Curtain */}
      <div 
        ref={rightPanelRef}
        className="absolute right-0 top-0 h-full bg-black border-l border-white/5"
      />

      {/* Central Logo Splash */}
      <div ref={contentRef} className="z-10 flex flex-col items-center gap-12">
        <div className="relative group">
          <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
          <img 
            src="https://i.postimg.cc/bvw6hwc3/Galaxy-Global-Logo-1.jpg" 
            alt="Galaxy Global Logo" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain relative z-10 grayscale brightness-125 contrast-125 shadow-[0_0_50px_rgba(255,255,255,0.05)]"
          />
        </div>
        
        <div className="flex flex-col items-center gap-5">
          <div className="preloader-text text-[12px] md:text-sm uppercase tracking-[1.5em] md:tracking-[2.5em] text-white font-black text-center pl-[1.5em] md:pl-[2.5em]">
            GALAXY GLOBAL
          </div>
          <div className="preloader-text text-[12px] md:text-[8px] uppercase tracking-[0.5em] text-white/40 font-bold mb-2">
            Digital Architecture // V2.0
          </div>
          <div className="preloader-text w-12 h-px bg-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-white translate-x-[-100%] animate-[shimmer_2s_infinite]" style={{ width: '50%' }} />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 z-10 overflow-hidden flex flex-col items-center gap-2">
        <div className="preloader-text text-[12px] md:text-[10px] uppercase tracking-[0.5em] md:tracking-[0.8em] text-white/20">
          Cinematic Production System // 2026
        </div>
        <div className="preloader-text text-[12px] md:text-[7px] uppercase tracking-widest text-white/10 font-mono">
          STATUS: INITIALIZING_CORE_ENGINE
        </div>
      </div>
    </div>
  );
}
