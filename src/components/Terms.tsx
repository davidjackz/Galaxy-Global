import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Terms() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.terms-content', {
        y: 20,
        opacity: 0,
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
    <section id="terms" ref={containerRef} className="py-16 md:py-20 bg-background border-b border-border transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto terms-content">
          <div className="mb-10">
            <span className="text-[10px] uppercase tracking-[0.5em] text-muted font-bold mb-4 block transition-colors">Legal Framework</span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-foreground transition-colors">Terms of Service</h2>
          </div>

          <div className="space-y-10 text-muted text-sm leading-relaxed transition-colors">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="font-black uppercase tracking-widest text-foreground text-[10px] border-l border-border pl-4 py-1 transition-colors">
                01 // Usage
              </div>
              <div className="md:col-span-2 text-foreground/80 transition-colors">
                By accessing Galaxy Global's cinematic systems, you agree to utilize our assets solely for authorized brand storytelling. Reverse engineering of our proprietary visual algorithms or motion frameworks is strictly prohibited.
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="font-black uppercase tracking-widest text-foreground text-[10px] border-l border-border pl-4 py-1 transition-colors">
                02 // IP Rights
              </div>
              <div className="md:col-span-2 text-foreground/80 transition-colors">
                All cinematic content, technical shaders, and custom-coded digital assets remain the exclusive intellectual property of Galaxy Global Agency. User-generated content processed through our stack remains owned by the client, subject to our usage license.
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="font-black uppercase tracking-widest text-foreground text-[10px] border-l border-border pl-4 py-1 transition-colors">
                03 // Service
              </div>
              <div className="md:col-span-2 text-foreground/80 transition-colors">
                We provide high-intensity visual engineering services "as is." While we strive for absolute technical precision (99.9% render accuracy), we are not liable for external distribution platform limitations or third-party compression artifacts.
              </div>
            </div>

            <div className="pt-8 border-t border-border flex flex-wrap gap-6 items-center">
              <span className="text-[9px] uppercase tracking-widest text-muted transition-colors">Last Updated: May 2026</span>
              <button className="text-[9px] uppercase tracking-widest text-foreground hover:text-muted transition-colors bg-foreground/5 px-4 py-2 hover:bg-foreground/10">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
