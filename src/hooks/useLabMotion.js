import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MOTION = '(prefers-reduced-motion: no-preference)';
const PIN = '(prefers-reduced-motion: no-preference) and (min-width: 768px)';
const EASE = 'power2.inOut';
const SCRUB = 0.8;

/** Slider scrub progress at which the stage is fully framed and autoplay starts. */
const SLIDER_UNLOCK = 1.5 / 3.12;
/** Approach scene: track scrub length (viewports) and travel, as fractions of the viewport width. */
const TRACK_VH = 5.9;
const TRACK_FROM = 1;
const TRACK_TO = -0.61;

/** Registers ScrollTrigger on first use; false where matchMedia is missing (jsdom), so nothing animates. */
function canAnimate() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  gsap.registerPlugin(ScrollTrigger);
  return true;
}

/** Hides the fixed header while scrolling down, shows it again on scroll up. */
function autoHideHeader(root) {
  const header = root.querySelector('[data-lab-header]');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-hidden', y > 120 && y > lastY);
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    window.removeEventListener('scroll', onScroll);
    header.classList.remove('is-hidden');
  };
}

/** Page-coloured steps grow up over the hero's lower edge during the first ~70vh of scroll. */
function heroSteps(root) {
  const hero = root.querySelector('.lab-hero');
  gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: () => `+=${innerHeight * 0.7}`, scrub: SCRUB, invalidateOnRefresh: true } })
    .fromTo(hero.querySelector('.lab-hero-step.is-left'), { height: 0 }, { height: '55vh', ease: 'power1.out' }, 0)
    .fromTo(hero.querySelector('.lab-hero-step.is-right'), { height: 0 }, { height: '35vh', ease: 'power1.out' }, 0);
}

function heroIntro(root) {
  const delay = 0.9; // after the global page loader fades
  gsap.from(root.querySelectorAll('[data-lab-split="hero"] .lab-split-char'), {
    opacity: 0, yPercent: 20, duration: 1.5, stagger: 0.03, ease: 'power2.out', delay,
  });
  gsap.from(root.querySelectorAll('[data-lab-hero-fade]'), {
    opacity: 0, duration: 0.6, ease: 'power2.out', delay: delay + 0.4,
  });
}

/** One-shot reveals as elements reach 80% of the viewport, matching the reference text animator. */
function textReveals(root) {
  root.querySelectorAll('[data-lab-split="rise"]').forEach((el) => {
    gsap.from(el.querySelectorAll('.lab-split-char'), {
      opacity: 0, yPercent: 20, duration: 1.5, stagger: 0.03, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    });
  });
  root.querySelectorAll('[data-lab-text]').forEach((el) => {
    gsap.from(el, {
      opacity: 0, duration: el.dataset.labText === 'caption' ? 0.3 : 0.45, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true },
    });
  });
}

function countUp(el) {
  const target = Number(el.dataset.labCount);
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / 1000, 1);
    el.textContent = String(Math.round(target * (1 - (1 - t) * (1 - t))));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/** Class toggles driven by IntersectionObserver: image wipes, greyscale-to-colour rows, counters. */
function observers(root) {
  const once = (selector, rootMargin, threshold, onEnter) => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        onEnter(entry.target);
        io.unobserve(entry.target);
      });
    }, { rootMargin, threshold });
    root.querySelectorAll(selector).forEach((el) => io.observe(el));
    return io;
  };

  const counters = [...root.querySelectorAll('[data-lab-count]')];
  counters.forEach((el) => { el.textContent = '0'; });

  const ios = [
    once('.lab-wipe', '0px 0px -35% 0px', 0, (el) => el.classList.add('is-revealed')),
    once('[data-lab-warm]', '0px 0px -45% 0px', 0, (el) => el.classList.add('is-warm')),
    once('[data-lab-count]', '0px', 0.2, countUp),
  ];

  return () => {
    ios.forEach((io) => io.disconnect());
    root.querySelectorAll('.is-revealed, .is-warm').forEach((el) => el.classList.remove('is-revealed', 'is-warm'));
    counters.forEach((el) => { el.textContent = el.dataset.labCount; });
  };
}

function composition(root) {
  root.querySelectorAll('.lab-comp [data-lab-parallax]').forEach((el) => {
    gsap.fromTo(el, { yPercent: -8 }, {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: SCRUB },
    });
  });
}

function slider(root) {
  const section = root.querySelector('[data-lab-slider]');
  const q = (sel) => section.querySelectorAll(sel);

  const footer = section.querySelector('.lab-slider-footer');
  let unlocked = false;
  const setLock = (progress) => {
    footer.classList.toggle('is-framed', progress >= 1 / 3.2);
    const next = progress >= SLIDER_UNLOCK;
    if (next === unlocked) return;
    unlocked = next;
    section.dispatchEvent(new CustomEvent(next ? 'lab:slider-unlock' : 'lab:slider-lock'));
  };

  gsap.timeline({
    scrollTrigger: {
      trigger: section, start: 'top -50%', end: 'bottom bottom', scrub: SCRUB,
      onUpdate: (self) => setLock(self.progress),
    },
  })
    .fromTo(q('.lab-slider-back-2'), { scale: 0.65 }, { scale: 1.5, duration: 3, ease: EASE }, 0)
    .fromTo(q('.lab-slider-back-1'), { scale: 0.65 }, { scale: 1.25, duration: 3, ease: EASE }, 0.1)
    .fromTo(q('.lab-slide-frame'), { scale: 0.65 }, { scale: 1, duration: 3, ease: EASE }, 0.2)
    .fromTo(q('.lab-slide-head'), { x: 40, yPercent: -120 }, { x: 0, yPercent: 0, duration: 1, ease: EASE }, 0.5)
    .fromTo(q('.lab-slide-meta'), { x: -40, yPercent: -85 }, { x: 0, yPercent: 0, duration: 1, ease: EASE }, 0.5)
    .fromTo(q('.lab-slide-number, .lab-slider-tools'), { opacity: 0 }, { opacity: 1, duration: 0.001 }, 1)
    .fromTo(footer, { y: -48 }, { y: 0, duration: 2, ease: EASE }, 1)
    .fromTo(q('.lab-slide-overlay'), { opacity: 0 }, { opacity: 1, duration: 0.001 }, 1.5)
    .to(q('.lab-slider-tools'), { opacity: 0, duration: 0.12, ease: EASE }, 3);

  return () => {
    footer.classList.remove('is-framed');
    if (unlocked) section.dispatchEvent(new CustomEvent('lab:slider-lock'));
  };
}

function approach(root) {
  const wrap = root.querySelector('[data-lab-approach]');
  const track = wrap.querySelector('[data-lab-track]');
  const stats = wrap.querySelector('[data-lab-stats]');

  const trackTween = gsap.fromTo(track, { x: () => innerWidth * TRACK_FROM }, {
    x: () => innerWidth * TRACK_TO, ease: 'none',
    scrollTrigger: {
      trigger: wrap, start: 'top top', end: () => `+=${innerHeight * TRACK_VH}`,
      scrub: SCRUB, invalidateOnRefresh: true,
    },
  });

  wrap.querySelectorAll('[data-lab-panel]').forEach((panel) => {
    gsap.fromTo(panel.querySelectorAll('[data-lab-split="fill"] .lab-split-char'), { opacity: 0.15 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: panel, containerAnimation: trackTween, start: 'left 100%', end: 'left 40%', scrub: true },
    });
  });

  let active = 0;
  ScrollTrigger.create({
    trigger: wrap.querySelector('.lab-stats-wrap'), start: 'top top', end: 'bottom bottom',
    onUpdate: (self) => {
      const next = Math.min(3, Math.floor(self.progress * 4));
      if (next === active) return;
      active = next;
      stats.dispatchEvent(new CustomEvent('lab:stats-active', { detail: next }));
    },
  });
}

/**
 * All scroll motion for the /lab page. Reveals run when motion is allowed; pins and
 * scrubs additionally need a ≥768px viewport. Everything is reverted on unmount, and
 * nothing runs where matchMedia is unavailable (jsdom), so content renders fully static.
 */
export function useLabMotion(rootRef, ready) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !canAnimate()) return undefined;
    const stopHeader = autoHideHeader(root);
    const mm = gsap.matchMedia();
    mm.add(MOTION, () => {
      heroIntro(root);
      heroSteps(root);
    });
    return () => {
      mm.revert();
      stopHeader();
    };
  }, [rootRef]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !ready || !canAnimate()) return undefined;
    const mm = gsap.matchMedia();

    mm.add(MOTION, () => {
      root.classList.add('lab-motion');
      textReveals(root);
      const stopObservers = observers(root);
      return () => {
        stopObservers();
        root.classList.remove('lab-motion');
      };
    });

    mm.add(PIN, () => {
      composition(root);
      const stopSlider = slider(root);
      approach(root);
      return stopSlider;
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => mm.revert();
  }, [rootRef, ready]);
}
