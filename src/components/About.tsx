import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * About component detailing global expertise and technical SEO integration.
 * Incorporates high-converting copywriting for a premium agency branding.
 */
export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Heading
      gsap.from('.about-heading', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.about-heading',
          start: 'top 90%',
        }
      });

      // Staggered Reveal for items
      gsap.from('.about-item', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-grid',
          start: 'top 85%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-start divide-y lg:divide-y-0 lg:divide-x divide-border">
        <div className="lg:col-span-5 pb-6 md:pb-10 lg:pb-0 lg:pr-16 about-heading">
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] font-bold text-muted mb-4 md:mb-6 block transition-colors">The Mission</span>
          <h2 className="text-3xl md:text-7xl font-bold uppercase leading-[1] md:leading-[0.9] tracking-tighter text-foreground transition-colors">
            Global Vision. <br/><span className="text-muted">Local Impact.</span>
          </h2>
        </div>
        
        <div className="lg:col-span-7 pt-6 md:pt-10 lg:pt-0 lg:pl-16 space-y-8 md:space-y-12">
          <div className="space-y-4 md:space-y-6 about-item">
            <p className="text-lg md:text-2xl font-medium text-foreground/90 leading-tight tracking-tight border-l-2 border-foreground/30 pl-6 md:pl-8 italic transition-colors">
              "We don't just edit videos. We engineer emotional impact and algorithmic dominance through technical precision."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10 pt-8 md:pt-12 border-t border-border about-grid">
            {[
              { t: "Cinematic Mastery", d: "Industry-standard tools for visual experiences that command global attention." },
              { t: "Conversion Architecture", d: "Optimizing pacing and transitions for maximum retention and ROI." },
              { t: "Global Scalability", d: "Built for high-volume YouTube services and enterprise agency needs." },
              { t: "SEO & Performance", d: "Technical optimization ensuring your content captures top-tier organic traffic." }
            ].map((item) => (
              <div key={item.t} className="space-y-2 about-item">
                <h3 className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-muted transition-colors">{item.t}</h3>
                <p className="text-[10px] md:text-xs text-muted leading-relaxed uppercase tracking-tighter transition-colors">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
