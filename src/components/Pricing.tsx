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
    <section id="pricing" className="py-20 md:py-32 bg-surface flex justify-center">
      <div className="w-full max-w-7xl px-4 md:px-12">
        <div className="mb-16 md:mb-20 max-w-2xl px-2 md:px-0">
          <span className="text-[10px] uppercase tracking-[0.5em] text-muted font-black mb-4 block">Tailored Global Solutions</span>
          <h2 className="text-3xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            Strategic <br/> <span className="text-muted italic font-light">Growth Plans</span>.
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`flex flex-col p-6 md:p-10 justify-between min-h-[380px] md:min-h-[500px] border rounded-2xl md:rounded-3xl transition-all duration-500 bg-background ${
                plan.highlight 
                  ? 'border-foreground shadow-xl scale-[1.02] md:scale-[1.05] z-10' 
                  : 'border-border hover:border-foreground/20'
              }`}
            >
              <div>
                <h3 className={`text-[9px] md:text-[10px] uppercase tracking-widest mb-4 md:mb-6 font-black ${plan.highlight ? 'text-foreground' : 'text-muted'}`}>
                  {plan.name}
                </h3>
                <div className="text-4xl md:text-5xl font-black tracking-tighter mb-2 md:mb-4 text-foreground">
                  {plan.price}
                </div>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-muted font-bold leading-relaxed mb-6 md:mb-10">
                  {plan.tagline}
                </p>
                
                <div className="w-8 h-[1px] bg-foreground/20 mb-6 md:mb-10" />
                
                <ul className="text-[8px] md:text-[10px] uppercase tracking-widest space-y-3 md:space-y-4 text-muted">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 md:gap-3">
                      <Check size={10} className="mt-0.5 text-foreground md:w-3 md:h-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full py-4 md:py-5 mt-8 md:mt-12 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all ${
                plan.highlight 
                  ? 'bg-foreground text-background shadow-lg' 
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
