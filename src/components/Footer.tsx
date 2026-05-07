import { Instagram, Twitter, Linkedin, Github, Youtube, Video, Facebook, Music2 } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * Footer component with comprehensive navigation and final CTA.
 */
export default function Footer() {
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Music2, label: 'TikTok', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
  ];

  return (
    <footer className="bg-background text-foreground py-16 md:py-32 border-t border-border relative overflow-hidden transition-colors duration-500">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-foreground/[0.02] rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 mb-16 md:mb-32">
          {/* Left Column: Get in Touch */}
          <div>
            <span className="text-[12px] md:text-[10px] font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-muted mb-4 md:mb-6 block">Ready to elevate?</span>
            <h2 className="text-3xl md:text-7xl font-bold uppercase tracking-tighter mb-8 md:mb-12 max-w-lg leading-[1] md:leading-[0.9]">
              Let's create the <span className="text-muted italic">unforgettable</span>.
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
              <div className="flex flex-col gap-4 w-full md:w-auto">
                <a href="mailto:davidlorn05@gmail.com" className="text-xl md:text-3xl font-light hover:text-muted transition-colors border-b border-border pb-2 md:pb-4 inline-block transition-colors duration-500">
                  davidlorn05@gmail.com
                </a>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-auto px-8 md:px-10 py-4 md:py-6 bg-foreground text-background text-[12px] md:text-[11px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-sm hover:bg-muted transition-all shadow-2xl shadow-foreground/10"
              >
                Request a Consultation
              </motion.button>
            </div>
            
            <div className="flex flex-wrap gap-6 md:gap-10 mt-10 md:mt-12">
                {socialLinks.map((social, i) => (
                  <motion.a 
                    key={social.label}
                    href={social.href} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1, color: 'var(--muted)' }}
                    className="group/social relative flex items-center gap-2 text-[12px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-muted transition-colors font-sans"
                  >
                    <social.icon size={12} className="md:w-3.5 md:h-3.5 opacity-40" />
                    <span className="hidden sm:inline">{social.label}</span>
                    
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 md:px-3 py-1 md:py-1.5 bg-foreground text-background text-[7px] md:text-[8px] font-black uppercase tracking-widest rounded-sm opacity-0 group-hover/social:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
                      {social.label}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right Column: Information Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <h4 className="text-[12px] md:text-[10px] uppercase tracking-[0.4em] font-black text-foreground mb-6 md:mb-8 border-b border-border pb-3 md:pb-4 transition-colors">Studio</h4>
              <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-muted transition-colors">
                <li 
                  onClick={() => {
                    const lenis = (window as any).lenis;
                    if (lenis) lenis.scrollTo('#portfolio', { offset: -100 });
                    else document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Projects
                </li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Archive</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Strategy</li>
                <li 
                  onClick={() => {
                    const lenis = (window as any).lenis;
                    if (lenis) lenis.scrollTo('#pricing', { offset: -100 });
                    else document.querySelector('#pricing')?.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="hover:text-foreground transition-colors cursor-pointer"
                >
                  Pricing
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[12px] md:text-[10px] uppercase tracking-[0.4em] font-black text-foreground mb-6 md:mb-8 border-b border-border pb-3 md:pb-4 transition-colors">Connect</h4>
              <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-muted transition-colors">
                <li className="hover:text-foreground transition-colors cursor-pointer">Brief Us</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Collab</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Journal</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Partners</li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-[12px] md:text-[10px] uppercase tracking-[0.4em] font-black text-foreground mb-6 md:mb-8 border-b border-border pb-3 md:pb-4 transition-colors">Legal</h4>
              <ul className="space-y-3 md:space-y-4 text-xs md:text-sm text-muted transition-colors">
                <li className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-foreground transition-colors cursor-pointer">Sustainability</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 md:pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 transition-colors">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-lg md:text-xl font-black uppercase tracking-[0.2em] flex items-center gap-2 text-foreground transition-colors">
              GALAXY GLOBAL
            </div>
            <p className="text-[12px] md:text-[10px] text-muted uppercase tracking-widest transition-colors">
              © 2026 Cinematic Production System
            </p>
          </div>
          
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[12px] md:text-[10px] uppercase tracking-widest text-muted font-bold transition-colors">System Status: Optimal</span>
              </div>
            </div>
        </div>
      </div>
    </footer>
  );
}
