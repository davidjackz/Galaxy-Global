import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: "What is your typical project timeline?",
    answer: "Our standard cinematic production cycle ranges from 4 to 8 weeks depending on complexity. We prioritize precision over speed to ensure every frame meets our architectural standards."
  },
  {
    question: "Do you handle global distribution?",
    answer: "Yes. Our systems are optimized for multi-platform delivery, ensuring your visuals maintain integrity across cinema screens, broadcast, and high-performance digital displays globally."
  },
  {
    question: "What hardware and software stack do you use?",
    answer: "We utilize a proprietary blend of RED/ARRI capture systems, DaVinci Resolve for elite grading, and high-end workstation clusters for complex motion graphics and AI-driven processing."
  },
  {
    question: "Can we request a custom collaboration framework?",
    answer: "Absolutely. We offer tailored 'Strategic' and 'Enterprise' partnerships for long-term brand storytelling that requires a consistent visual language across multiple quarters."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
        }
      });

      gsap.from('.faq-item', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.faq-list',
          start: 'top 85%',
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="py-16 bg-background border-b border-border transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 faq-header">
            <span className="text-[10px] uppercase tracking-[0.5em] text-muted font-bold mb-4 block transition-colors">Knowledge Base</span>
            <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground transition-colors">Frequently Asked</h2>
          </div>

          <div className="space-y-4 faq-list">
            {FAQS.map((faq, i) => (
              <div 
                key={i} 
                className="faq-item border border-border bg-surface overflow-hidden transition-colors duration-500"
              >
                <button
                  onClick={() => toggleFAQ(i)}
                  className="w-full px-8 py-6 flex justify-between items-center text-left transition-colors hover:bg-foreground/5"
                >
                  <span className="text-sm font-bold uppercase tracking-widest text-foreground transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-muted transition-all duration-500 ${openIndex === i ? 'rotate-180 text-foreground' : ''}`} 
                  />
                </button>
                
                <div 
                  className={`px-8 transition-all duration-500 ease-in-out ${
                    openIndex === i ? 'max-h-[300px] py-6 opacity-100' : 'max-h-0 py-0 opacity-0'
                  }`}
                >
                  <p className="text-sm text-muted leading-relaxed max-w-2xl transition-colors">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
