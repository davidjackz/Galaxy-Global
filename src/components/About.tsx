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
      gsap.from(".about-line", {
        scaleX: 0,
        transformOrigin: "left",
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
      
      gsap.from(".about-reveal", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="container mx-auto px-6 py-20 md:py-32">
       <div className="flex flex-col lg:flex-row gap-16 md:gap-32">
          <div className="lg:w-1/3">
             <span className="about-reveal text-[10px] uppercase tracking-[0.6em] font-black text-muted block mb-6">Discovery</span>
             <h2 className="about-reveal text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-8">
               We Craft <br/> <span className="text-muted italic font-light">Next-Gen</span> <br/> Stories.
             </h2>
             <div className="about-line h-[1px] w-full bg-border" />
          </div>
          
          <div className="lg:w-2/3 space-y-12">
             <p className="about-reveal text-xl md:text-3xl font-medium text-foreground tracking-tight leading-snug max-w-2xl">
               Galaxy is a technical video studio specializing in audience retention and cinematic psychology. We bridge the gap between imagination and technical execution.
             </p>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {[
                  { title: "Technical Mastery", desc: "Expert use of industry-standard tools to create visual experiences that command attention." },
                  { title: "Psychological Pacing", desc: "Optimizing every cut and transition to maintain maximum audience engagement." },
                  { title: "Global Scalability", desc: "Content architected to perform across diverse platforms and international markets." },
                  { title: "High Fidelity", desc: "Uncompromising quality standards for pixel-perfect results in any resolution." }
                ].map((item) => (
                  <div key={item.title} className="about-reveal space-y-3">
                    <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground transition-colors group-hover:text-muted">
                      {item.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
}
