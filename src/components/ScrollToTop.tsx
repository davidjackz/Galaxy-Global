import { useEffect, useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';

/**
 * ScrollToTop component: A cinematic "Back to Top" button.
 * Appears after scrolling 500px and provides a smooth return with GSAP.
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle visibility after 500px of vertical scroll
      if (window.scrollY > 500) {
        if (!isVisible) setIsVisible(true);
      } else {
        if (isVisible) setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(buttonRef.current, 
        { y: 50, opacity: 0, scale: 0.5 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out' }
      );
    } else {
      gsap.to(buttonRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        ease: 'power2.in'
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    // We use window.scrollTo for the actual scroll, 
    // but we can also trigger a GSAP "lift" animation on the button itself
    gsap.to(buttonRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  };

  if (!isVisible && !buttonRef.current) return null;

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="fixed bottom-12 right-12 z-[90] w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.2)] group transition-transform active:scale-95"
    >
      <div className="absolute inset-0 rounded-full border border-white scale-100 group-hover:scale-125 opacity-0 group-hover:opacity-20 transition-all duration-500" />
      <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
    </button>
  );
}
