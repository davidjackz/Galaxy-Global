import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * ReelSection component showing a cinematic Vimeo reel.
 * Optimized for vertical content (TikTok/IG style) within a cinematic frame.
 */
const REELS = [
  { id: '1189630834', title: 'Urban_Essence.mp4', aspect: 'aspect-[9/16]' },
  { id: '1189630868', title: 'Aether_Loop.mp4', aspect: 'aspect-[9/16]' },
  { id: '1189630834', title: 'Lunar_Pulse.mp4', aspect: 'aspect-[9/16]' },
  { id: '1189630868', title: 'Vortex_Core.mp4', aspect: 'aspect-[9/16]' }
];

export default function ReelSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for the reels
      gsap.from('.reel-card', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-black border-b border-white/10 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-16 text-center">
        <span className="text-[10px] uppercase tracking-[1em] text-white/30 font-bold mb-6 block">Visual Repository</span>
        <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none">The Vision</h2>
      </div>

      <div className="container mx-auto px-6">
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REELS.map((reel, i) => (
            <div 
              key={reel.id}
              className="reel-card relative group aspect-[9/16] bg-neutral-900 border border-white/5 overflow-hidden"
            >
              {/* Pro Player Overlay */}
              <div className="absolute inset-0 z-20 pointer-events-none p-6 flex flex-col justify-between border-[1px] border-white/10">
                <div className="flex justify-between items-start opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-px bg-white" />
                  <div className="text-[8px] uppercase tracking-widest text-white">REEL_{i + 1}</div>
                </div>
                <div className="flex justify-between items-end opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="text-[8px] font-bold text-white uppercase tracking-widest">{reel.title}</div>
                  <div className="w-6 h-px bg-white" />
                </div>
              </div>

              {/* Vimeo Embed */}
              <div className="absolute inset-0 scale-[1.1] group-hover:scale-100 transition-transform duration-1000">
                <iframe 
                  src={`https://player.vimeo.com/video/${reel.id}?autoplay=1&loop=1&background=1&muted=1`}
                  className="w-full h-full object-cover"
                  frameBorder="0" 
                  allow="autoplay; fullscreen" 
                  title={reel.title}
                />
              </div>

              {/* Hover Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 opacity-40 group-hover:opacity-10 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 container mx-auto px-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] font-medium text-white/20 max-w-lg mx-auto leading-relaxed">
          Proprietary visual algorithms applied to global brand storytelling. 
          Synchronized for high-impact cinematic distribution.
        </p>
      </div>
    </section>
  );
}
