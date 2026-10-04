import { LAB_HERO } from '../../data/labContent.js';
import { SplitHeading } from './LabText.jsx';

/**
 * Full-bleed photo hero with script eyebrow, split serif headline and sub line.
 * Two page-coloured steps rise over its lower edge on scroll (taller on the left).
 */
export default function LabHero() {
  return (
    <section className="lab-hero" aria-label="Hero">
      <img className="lab-hero-img" src={LAB_HERO.image} alt="" fetchpriority="high" />
      <div className="lab-hero-shade" aria-hidden="true" />
      <div className="lab-hero-content">
        <p className="lab-hero-eyebrow" data-lab-hero-fade>{LAB_HERO.eyebrow}</p>
        <SplitHeading as="h1" lines={LAB_HERO.title} className="lab-h1" mode="hero" />
        <p className="lab-hero-sub" data-lab-hero-fade>{LAB_HERO.sub}</p>
      </div>
      <div className="lab-hero-steps" aria-hidden="true">
        <span className="lab-hero-step is-left" />
        <span className="lab-hero-step is-right" />
      </div>
    </section>
  );
}
