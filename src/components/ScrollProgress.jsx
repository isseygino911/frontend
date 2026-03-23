import { useEffect, useRef } from 'react';
import '../styles/nav.css';

/**
 * Renders a 1px vertical line on the left edge of the viewport
 * that grows in height proportional to the user's scroll position.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      const el  = barRef.current;
      if (!el) return;

      const scrollTop    = window.scrollY || document.documentElement.scrollTop;
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
      const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      el.style.height    = `${pct}%`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div id="scroll-progress" ref={barRef} aria-hidden="true" />;
}
