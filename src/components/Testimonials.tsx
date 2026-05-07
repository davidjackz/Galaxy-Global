import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "Galaxy Global didn't just edit our film; they architected a visual experience that resonated on a cellular level. Their technical precision is unmatched.",
    author: "Elena Vance",
    role: "Director, Aether Films",
    id: 1
  },
  {
    quote: "The technical precision and creative soul they bring to every project is unprecedented. They transformed our brand narrative into a high-performance visual asset.",
    author: "Marcus Thorne",
    role: "CMO, Zenith Arts",
    id: 2
  },
  {
    quote: "Their cinematic algorithms and motion systems are or a different class. If your vision demands extreme depth, this is the only collective to call.",
    author: "Sarah Jenkins",
    role: "Head of Content, Pulse Collective",
    id: 3
  }
];

/**
 * Testimonials: A cinematic slider for client feedback.
 * Uses high-contrast typography and fluid motion transitions.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-16 bg-background text-foreground border-b border-border overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="text-[12px] uppercase tracking-[1em] text-muted font-bold mb-4 block">Voice of the Industry</span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter">Client Testimony</h2>
        </div>

        <div className="max-w-5xl mx-auto relative px-12 md:px-24 py-20 bg-surface border border-border">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-foreground/20 -translate-x-1/2 -translate-y-1/2 rotate-45" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-foreground/20 translate-x-1/2 translate-y-1/2 rotate-45" />
          
          <div className="absolute top-10 left-10 text-foreground/5 transform -scale-x-100">
            <Quote size={80} />
          </div>

          <div className="relative min-h-[300px] flex flex-col justify-center items-center">
            {loading ? (
              <div className="w-full space-y-6 animate-pulse">
                <div className="h-4 bg-foreground/5 rounded w-full mx-auto" />
                <div className="h-4 bg-foreground/5 rounded w-[90%] mx-auto" />
                <div className="h-4 bg-foreground/5 rounded w-[80%] mx-auto" />
                <div className="flex flex-col items-center pt-8">
                  <div className="h-2 bg-foreground/5 rounded w-24 mb-2" />
                  <div className="h-2 bg-foreground/5 rounded w-32" />
                </div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={TESTIMONIALS[index].id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 1.02 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <blockquote className="text-xl md:text-3xl font-light text-foreground/80 leading-tight mb-12 italic">
                    "{TESTIMONIALS[index].quote}"
                  </blockquote>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-px bg-border mb-6" />
                    <cite className="not-italic">
                      <span className="text-[12px] md:text-[11px] font-black uppercase tracking-[0.4em] text-foreground block mb-1">
                        {TESTIMONIALS[index].author}
                      </span>
                      <span className="text-[12px] md:text-[9px] uppercase tracking-[0.2em] text-muted font-bold">
                        {TESTIMONIALS[index].role}
                      </span>
                    </cite>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button 
              onClick={prev}
              className="p-4 text-white/20 hover:text-white transition-colors group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button 
              onClick={next}
              className="p-4 text-white/20 hover:text-white transition-colors group"
              aria-label="Next testimonial"
            >
              <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Progress Bar Indicators */}
        <div className="flex justify-center gap-4 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="group relative py-4"
            >
              <div className={`h-[1px] transition-all duration-700 bg-white ${i === index ? 'w-12 opacity-100' : 'w-6 opacity-20 group-hover:opacity-50'}`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
