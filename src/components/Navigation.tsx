import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

/**
 * Navigation component with dynamic blur and sleek monochrome design.
 */
export default function Navigation() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex w-full items-center justify-between px-6 md:px-10 py-4 md:py-6 border-b border-border bg-background transition-colors duration-500 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 md:w-8 md:h-8 bg-foreground flex items-center justify-center transition-colors">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-background rotate-45 transition-colors" />
        </div>
        <span className="font-display text-lg md:text-xl font-black uppercase tracking-tighter text-foreground">Galaxy Global</span>
      </div>

      <div className="hidden lg:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-medium text-muted">
        {[
          { name: 'Portfolio', href: '#portfolio' },
          { name: 'Services', href: '#about' },
          { name: 'Pricing', href: '#pricing' },
          { name: 'Blog', href: '#blog' },
        ].map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              const lenis = (window as any).lenis;
              if (lenis) {
                lenis.scrollTo(link.href, {
                  offset: -100,
                  duration: 1.5,
                  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
              } else {
                const target = document.querySelector(link.href);
                if (target) {
                  const headerOffset = 100;
                  const elementPosition = target.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }
            }}
            className="hover:text-foreground transition-colors cursor-pointer"
          >
            {link.name}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <button 
          onClick={toggleTheme}
          className="p-1.5 md:p-2 text-foreground hover:bg-foreground/10 transition-colors rounded-full"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={16} className="md:w-[18px] md:h-[18px]" /> : <Moon size={16} className="md:w-[18px] md:h-[18px]" />}
        </button>
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:block px-4 md:px-6 py-1.5 md:py-2 border border-foreground text-[8px] md:text-[10px] uppercase tracking-widest transition-all"
        >
          Start Project
        </motion.button>
        
        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-foreground"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-current transition-transform ${isOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`w-full h-0.5 bg-current transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-current transition-transform ${isOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 bg-background z-40 lg:hidden flex flex-col items-center justify-center gap-8 p-10"
      >
        {[
          { name: 'Portfolio', href: '#portfolio' },
          { name: 'Services', href: '#about' },
          { name: 'Pricing', href: '#pricing' },
          { name: 'Blog', href: '#blog' },
        ].map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              const lenis = (window as any).lenis;
              if (lenis) {
                lenis.scrollTo(link.href, { offset: -80 });
              }
            }}
            className="text-2xl font-bold uppercase tracking-widest text-foreground"
          >
            {link.name}
          </a>
        ))}
        <button className="mt-4 px-8 py-4 bg-foreground text-background text-[10px] font-black uppercase tracking-widest">
          Start Project
        </button>
      </motion.div>
    </nav>
  );
}
