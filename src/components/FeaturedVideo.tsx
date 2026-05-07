import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'motion/react';

/**
 * FeaturedVideo component: A high-impact entry video section.
 * Positioned right under the hero to set the tone.
 */
export default function FeaturedVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(videoWrapperRef.current, 
        { scale: 0.95, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-background overflow-hidden px-4 md:px-12">
      <div ref={videoWrapperRef} className="w-full max-w-7xl mx-auto flex flex-col">
        {/* Mobile-only header */}
        <div className="mb-6 md:hidden px-2">
           <span className="text-[10px] uppercase tracking-[0.4em] font-black text-muted block mb-2">Featured Showreel</span>
           <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
             Visual <span className="text-muted italic font-light">Excellence</span> 2024.
           </h2>
        </div>

        <div className="relative aspect-video w-full bg-surface border border-border rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group">
          <iframe 
            src="https://player.vimeo.com/video/1189015884?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&background=1&muted=1" 
            className="absolute inset-0 w-full h-full object-cover scale-[1.01]"
            frameBorder="0" 
            allow="autoplay; fullscreen"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none md:from-background/60" />
          
          {/* Desktop-only overlay */}
          <div className="hidden md:block absolute bottom-12 left-12 z-20">
             <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/50 block mb-3">Featured Showreel</span>
             <h3 className="text-5xl font-black uppercase tracking-tighter text-white leading-none">Visual Excellence 2024</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

