import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * BackgroundParallax component: "Galactic Dust".
 * Provides global depth with subtle moving layers of dots and geometric shapes.
 */
export default function BackgroundParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Deep layer - very slow
      gsap.to('.bg-layer-1', {
        yPercent: -5,
        xPercent: 2,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      });

      // Middle layer
      gsap.to('.bg-layer-2', {
        yPercent: -15,
        xPercent: -3,
        rotation: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        }
      });

      // Floaters - Aggressive Parallax
      gsap.to('.bg-layer-3', {
        yPercent: -40,
        xPercent: 5,
        rotation: -45,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-30 pointer-events-none bg-black overflow-hidden">
      {/* Layer 1: Fine Dust */}
      <div className="bg-layer-1 absolute inset-0 opacity-[0.05]" 
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 0.5px, transparent 0)', backgroundSize: '100px 100px' }} 
      />
      
      {/* Layer 2: Sparse Nodes */}
      <div className="bg-layer-2 absolute inset-0 opacity-[0.02]" 
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '250px 250px' }} 
      />

      {/* Layer 3: Occasional Large Geometric Outlines */}
      <div className="bg-layer-3 absolute inset-0 opacity-[0.01]">
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] border border-white rotate-12" />
        <div className="absolute top-[60%] right-[5%] w-[600px] h-[600px] border border-white -rotate-12" />
        <div className="absolute bottom-[10%] left-[30%] w-[300px] h-[300px] border border-white rotate-45" />
      </div>

      {/* Global Grain Overlay for that filmic texture */}
      <div className="absolute inset-0 opacity-[0.03] contrast-150 brightness-100 pointer-events-none mix-blend-screen"
        style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}
      />
    </div>
  );
}
