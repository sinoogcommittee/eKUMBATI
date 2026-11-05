import React, { useEffect, useRef } from 'react';

/**
 * ScrollProgressBar component
 * Displays a smooth reading progress indicator at the top of the viewport
 * Complies with modern web guidance: uses CSS scroll-driven animation when supported
 * with a passive fallback and aria-hidden="true" for screen reader accessibility.
 */
export const ScrollProgressBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply JavaScript fallback if CSS scroll-driven animations are unsupported
    if (typeof window !== 'undefined' && !window.CSS?.supports?.('animation-timeline', 'scroll()')) {
      const handleScroll = () => {
        if (!barRef.current) return;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
        barRef.current.style.transform = `scaleX(${progress})`;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      ref={barRef}
      id="scroll-progress-bar"
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 origin-left z-50 pointer-events-none transition-transform duration-75"
    />
  );
};

export default ScrollProgressBar;
