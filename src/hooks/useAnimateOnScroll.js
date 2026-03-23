import { useEffect } from 'react';

/**
 * Registers an IntersectionObserver on every [data-animate] element
 * that is not yet visible. Once an element enters the viewport it
 * receives the `.is-visible` class and is unobserved (one-way trigger).
 *
 * Call this hook inside any page component that contains animated elements.
 * Re-runs on every render so newly-mounted elements are always picked up.
 */
export function useAnimateOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    );

    const targets = document.querySelectorAll('[data-animate]:not(.is-visible)');
    const vh = window.innerHeight;

    targets.forEach((el) => {
      // Immediately reveal elements that are already in the viewport (above-fold)
      // to prevent blank sections on initial page render.
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 1.05) {
        el.classList.add('is-visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  });
}
