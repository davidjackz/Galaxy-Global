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

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const menuLinks = [
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Services', href: '#about' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] hidden lg:flex items-center gap-8 px-8 py-3 rounded-full border border-border bg-background/60 backdrop-blur-xl transition-all duration-500 ${
          isScrolled ? 'shadow-2xl shadow-black/20 w-[95%] max-w-5xl py-2' : 'w-[90%] max-w-4xl'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-black uppercase tracking-tighter text-foreground">GALAXY GLOBAL</span>
        </div>

        <div className="flex-grow flex items-center justify-center gap-10 text-[9px] uppercase tracking-[0.4em] font-bold text-muted">
          {menuLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const lenis = (window as any).lenis;
                if (lenis) {
                  lenis.scrollTo(link.href, { offset: -100, duration: 1.5 });
                }
              }}
              className="hover:text-foreground transition-colors cursor-pointer relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-1.5 text-foreground hover:bg-foreground/10 transition-colors rounded-full"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-1.5 bg-foreground text-background text-[9px] font-black uppercase tracking-widest rounded-full"
          >
            Start Project
          </motion.button>
        </div>
      </nav>

      {/* Mobile Sticky Top Header */}
      <nav className="fixed top-0 left-0 w-full lg:hidden flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border z-[100]">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-black uppercase tracking-tighter text-foreground">GALAXY GLOBAL</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleTheme}
            className="p-2 text-foreground"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground flex flex-col gap-1 w-8 items-end"
          >
            <span className={`h-[1px] bg-foreground transition-all duration-300 ${isOpen ? 'w-6 rotate-45 translate-y-[2.5px]' : 'w-6'}`} />
            <span className={`h-[1px] bg-foreground transition-all duration-300 ${isOpen ? 'w-0 opacity-0' : 'w-4'}`} />
            <span className={`h-[1px] bg-foreground transition-all duration-300 ${isOpen ? 'w-6 -rotate-45 -translate-y-[2.5px]' : 'w-5'}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: '-10%' }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        className="fixed inset-0 bg-background z-[90] lg:hidden flex flex-col items-center justify-center gap-8 p-10 pt-20"
      >
        <div className="flex flex-col items-center gap-10">
          {menuLinks.map((link, i) => (
            <motion.a
              key={link.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: i * 0.1 }}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
                const lenis = (window as any).lenis;
                if (lenis) lenis.scrollTo(link.href, { offset: -80 });
              }}
              className="text-3xl font-black uppercase tracking-widest text-foreground hover:italic"
            >
              {link.name}
            </motion.a>
          ))}
        </div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isOpen ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          className="mt-12 px-10 py-5 bg-foreground text-background text-[12px] font-black uppercase tracking-[0.3em] rounded-full"
        >
          Start Project
        </motion.button>
      </motion.div>

      {/* Mobile Floating Bottom Bar Accessory (Nice touch) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:hidden z-[100] flex gap-2">
         {menuLinks.slice(0, 3).map((link) => (
           <a 
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const lenis = (window as any).lenis;
                if (lenis) lenis.scrollTo(link.href, { offset: -80 });
              }}
              className="px-4 py-2 bg-background/50 backdrop-blur-lg border border-border rounded-full text-[12px] uppercase font-black tracking-widest text-muted"
           >
             {link.name}
           </a>
         ))}
      </div>
    </>
  );
}

