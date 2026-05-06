import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * CustomCursor component: The "Director's Loupe".
 * Replaces standard pointer with a cinematic ring that reacts to UI elements.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const moveCursor = (e: MouseEvent) => {
      // Main dot
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      });

      // Lazy follower ring
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Interaction handling
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .portfolio-item, .pricing-card');
      const isPortfolio = target.closest('.portfolio-item');

      if (isInteractive) {
        gsap.to(follower, {
          scale: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 1)',
          duration: 0.3
        });
        
        if (isPortfolio) {
          gsap.to(labelRef.current, { opacity: 1, scale: 1, duration: 0.3 });
        }
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .portfolio-item, .pricing-card');

      if (isInteractive) {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          duration: 0.3
        });
        gsap.to(labelRef.current, { opacity: 0, scale: 0.5, duration: 0.3 });
      }
    };

    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);

    // Hide default cursor globally
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Small dot target */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 z-[1001] w-2 h-2 -ml-1 -mt-1 bg-white rounded-full pointer-events-none mix-blend-difference"
      />
      
      {/* The Loupe Ring */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 z-[1001] w-10 h-10 -ml-5 -mt-5 border border-white/30 rounded-full pointer-events-none flex items-center justify-center transition-colors overflow-hidden"
      >
        <div ref={labelRef} className="text-[6px] font-black uppercase tracking-[0.2em] opacity-0 scale-50">
          VIEW
        </div>
      </div>
    </>
  );
}
