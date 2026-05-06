import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const PARTNERS = [
  { name: 'Nebula', icon: '✦' },
  { name: 'Vortex', icon: '✧' },
  { name: 'Zenith', icon: '❂' },
  { name: 'Aether', icon: '❈' },
  { name: 'Nova', icon: '✷' },
  { name: 'Pulse', icon: '✺' },
  { name: 'Quantum', icon: '⚛' },
  { name: 'Lumen', icon: '☼' },
];

/**
 * SponsorMarquee: An infinite, silk-smooth horizontal auto-play slider.
 * Uses GSAP for high-performance sub-pixel animation.
 */
export default function SponsorMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Clone items for infinite effect
    const items = Array.from(slider.children) as Element[];
    items.forEach(item => {
      const clone = item.cloneNode(true);
      slider.appendChild(clone);
    });

    const totalWidth = slider.scrollWidth / 2;

    const ctx = gsap.context(() => {
      gsap.to(slider, {
        x: -totalWidth,
        duration: 30,
        ease: 'none',
        repeat: -1,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="py-12 bg-background border-y border-border overflow-hidden relative cursor-default transition-colors duration-500"
    >
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 transition-colors duration-500" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 transition-colors duration-500" />

      <div 
        ref={sliderRef} 
        className="flex whitespace-nowrap gap-20 items-center w-fit"
      >
        {PARTNERS.map((partner, i) => (
          <div 
            key={i} 
            className="flex items-center gap-6 group"
          >
            <span className="text-4xl text-foreground/10 group-hover:text-foreground transition-colors duration-700">
              {partner.icon}
            </span>
            <span className="text-sm font-black uppercase tracking-[0.5em] text-foreground/20 group-hover:text-foreground transition-colors duration-700">
              {partner.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
