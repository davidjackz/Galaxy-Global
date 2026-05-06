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

  return (
    <nav className="flex w-full items-center justify-between px-10 py-6 border-b border-border bg-background transition-colors duration-500 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-foreground flex items-center justify-center transition-colors">
          <div className="w-4 h-4 bg-background rotate-45 transition-colors" />
        </div>
        <span className="font-display text-xl font-black uppercase tracking-tighter text-foreground">Galaxy Global</span>
      </div>

      <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-medium text-muted">
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

      <div className="flex items-center gap-6">
        <button 
          onClick={toggleTheme}
          className="p-2 text-foreground hover:bg-foreground/10 transition-colors rounded-full"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <motion.button 
          whileHover={{ scale: 1.05, backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 border border-foreground text-[10px] uppercase tracking-widest transition-all"
        >
          Start Project
        </motion.button>
      </div>
    </nav>
  );
}
