import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const LOGOS = [
  { name: 'Nebula Studios', icon: '✦' },
  { name: 'Vortex Media', icon: '✧' },
  { name: 'Zenith Arts', icon: '❂' },
  { name: 'Aether Films', icon: '❈' },
  { name: 'Nova Agency', icon: '✷' },
  { name: 'Pulse Collective', icon: '✺' },
];

/**
 * Collaboration component showing partner logos and references.
 * Maintains the minimal, monochromatic theme.
 */
export default function Collaboration() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.collab-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-16 border-b border-border bg-background transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-muted font-bold mb-4 block transition-colors">Trusted By Industry Leaders</span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-foreground transition-colors">Strategic Partnerships</h2>
          </div>
          <p className="max-w-xs text-sm text-muted leading-relaxed transition-colors">
            Collaborating with global brands to push the boundaries of digital visual storytelling.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-border border border-border">
          {LOGOS.map((logo) => (
            <div 
              key={logo.name}
              className="collab-item group aspect-square bg-background flex flex-col items-center justify-center p-8 transition-colors hover:bg-surface cursor-default"
            >
              <div className="text-4xl mb-4 text-foreground/20 group-hover:text-foreground group-hover:scale-110 transition-all duration-500">
                {logo.icon}
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-muted group-hover:text-foreground transition-colors">
                {logo.name}
              </span>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
