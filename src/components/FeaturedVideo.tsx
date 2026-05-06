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
        { scale: 0.9, opacity: 0, y: 50 },
        { 
          scale: 1, 
          opacity: 1, 
          y: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-background transition-colors duration-500 overflow-hidden flex justify-center relative">
      {/* Subtle Animated Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div 
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-foreground/20 to-transparent" 
        />
        <motion.div 
          animate={{ x: [20, -20, 20] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-foreground/20 to-transparent" 
        />
      </div>

      <div ref={videoWrapperRef} className="w-[90%] md:w-[80%] max-w-7xl relative">
        {/* Cinematic Frame Decor */}
        <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-white/20 z-10" />
        <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-white/20 z-10" />
        
        <div className="relative aspect-video w-full bg-neutral-900 border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.02)]">
          <iframe 
            src="https://player.vimeo.com/video/1189015884?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&background=1&muted=1" 
            className="absolute inset-0 w-full h-full object-cover"
            frameBorder="0" 
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            title="Featured Intro Video"
          />
          
          {/* Subtle Scanline Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] z-20 opacity-20" />
        </div>

        <div className="mt-8 flex justify-between items-center px-2">
          <div className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold">
            Project // Alpha_Initiated
          </div>
          <div className="flex gap-4">
             <div className="w-1 h-1 bg-white/20 rotate-45" />
             <div className="w-1 h-1 bg-white/20 rotate-45" />
             <div className="w-1 h-1 bg-white/20 rotate-45" />
          </div>
        </div>
      </div>
    </section>
  );
}
