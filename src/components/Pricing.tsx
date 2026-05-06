import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import gsap from 'gsap';

const PLANS = [
  {
    name: 'Starter',
    tagline: 'Precision editing for short-form impact',
    price: '$5',
    features: ['15-Second Short Video', 'Basic Subtitles & Cuts', '24h Fast Delivery'],
    highlight: false
  },
  {
    name: 'Standard',
    tagline: 'The gold standard for social influence',
    price: '$20',
    features: ['Up to 1-Min Full Edit', 'Engaging Sound Effects', 'Perfect for TikTok & Reels'],
    highlight: true
  },
  {
    name: 'Advanced',
    tagline: 'High-octane cinematic production',
    price: '$100+',
    features: ['Cinematic Video Editing', 'Pro Color Grading', 'Custom Motion Graphics'],
    highlight: false
  },
  {
    name: 'Enterprise',
    tagline: 'Industrial-strength volume solutions',
    price: '$500+',
    features: ['Long-Form YouTube Videos', 'Monthly Bulk Packages', 'Priority 24/7 Support'],
    highlight: false
  }
];

/**
 * Pricing component featuring 4 distinct plans with automated checkout flow.
 */
export default function Pricing() {
  return (
    <section className="py-12 md:py-16 bg-surface border-y border-border flex justify-center transition-colors duration-500">
      <div className="w-[90%] md:w-[80%] max-w-7xl">
        <div className="mb-8 md:mb-12 text-center text-foreground transition-colors">
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-muted font-bold mb-3 md:mb-4 block">Tailored Global Solutions</span>
          <h2 className="text-2xl md:text-5xl font-bold uppercase tracking-tighter">Strategic Plans</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border border border-border">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              onMouseEnter={(e) => {
                if (window.innerWidth >= 768) {
                  gsap.to(e.currentTarget, { y: -10, duration: 0.5, ease: 'power2.out' });
                }
              }}
              onMouseLeave={(e) => {
                if (window.innerWidth >= 768) {
                  gsap.to(e.currentTarget, { y: 0, duration: 0.5, ease: 'power2.inOut' });
                }
              }}
              className={`flex flex-col p-6 md:p-8 justify-between min-h-[350px] md:min-h-[450px] relative transition-all duration-500 bg-background ${
                plan.highlight 
                  ? 'border-2 border-foreground z-10 shadow-[0_20px_40px_rgba(0,0,0,0.1)]' 
                  : ''
              }`}
            >
              <div>
                <h3 className={`text-[8px] md:text-[10px] uppercase tracking-[0.2em] mb-3 md:mb-4 font-bold ${plan.highlight ? 'text-foreground' : 'text-muted'}`}>
                  {plan.name}
                </h3>
                <div className="text-4xl md:text-5xl font-black tracking-tighter mb-3 md:mb-4 text-foreground">
                  {plan.price}
                </div>
                <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-muted font-bold leading-relaxed mb-6 md:mb-8">
                  {plan.tagline}
                </p>
                
                <div className="w-6 md:w-8 h-px bg-border mb-6 md:mb-8" />
              </div>

              <ul className="text-[8px] md:text-[10px] uppercase tracking-widest space-y-3 md:space-y-4 my-6 md:my-8 text-foreground/70">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 md:gap-3">
                    <Check size={10} className="md:w-3 md:h-3 mt-0.5 text-foreground/40" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 md:py-5 text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                plan.highlight 
                  ? 'bg-foreground text-background hover:scale-[1.02]' 
                  : 'border border-border text-foreground hover:bg-foreground hover:text-background'
              }`}>
                Order Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
