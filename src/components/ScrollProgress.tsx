import { motion, useScroll, useSpring } from 'motion/react';

/**
 * ScrollProgress component: A subtle top-fixed indicator of page read progress.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-foreground origin-left z-[100] transition-colors duration-500"
      style={{ scaleX }}
    />
  );
}
