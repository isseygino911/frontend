import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll.js';
import '../styles/philosophy.css';

/**
 * Philosophy page — rebuilt to match the Stitch "Avant-Garde" design.
 * Sections: Hero (full-bleed image), Organic Brutalism (asymmetric),
 * Chromatic Silence (floating module), PRECISION (typography overlay),
 * The Human Void (final module), Footer.
 */
export default function Philosophy() {
  useAnimateOnScroll();

  return (
    <div id="page-philosophy">

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="phil-hero" aria-label="Philosophy hero">
        <div className="phil-hero-img-wrap" aria-hidden="true">
          <img
            className="phil-hero-img"
            src="/projects/whale-cloud-global-headquarters/01.jpg"
            alt="Whale Cloud Global Headquarters — diagonal lattice facade"
          />
          <div className="phil-hero-overlay" />
        </div>

        <div className="phil-hero-content">
          <span className="section-label" data-animate="from-left">Atelier Philosophy 01</span>
          <h1 className="phil-hero-headline" data-animate="from-left">
            THE <br />
            <em>ART</em> OF <br />
            STRUCTURE
          </h1>
          <p className="phil-hero-body" data-animate>
            A departure from the ornamental. We build not for the eye, but for the
            soul that inhabits the void. Every line is a definitive statement of existence.
          </p>
        </div>

        <div className="phil-hero-rule" aria-hidden="true">
          <div className="phil-hero-rule-line" />
          <div className="phil-hero-rule-mark" />
        </div>
      </section>

      {/* ── Organic Brutalism (asymmetric) ─────────────────── */}
      <section className="phil-brutalism" aria-label="Organic Brutalism">
        <div className="phil-brutalism-left" data-animate="from-left">
          <div className="phil-brutalism-ghost" aria-hidden="true">FORM</div>
          <img
            className="phil-brutalism-img"
            src="/projects/ecovacs-phase-vi-office/01-sm.jpg"
            alt="Ecovacs Robotics Phase VI Office — sweeping curved main hall"
          />
          <div className="phil-brutalism-caption">
            <span className="phil-caption-label">Perspective / 001</span>
            <span className="phil-caption-quote">"The weight of stone is the measure of silence."</span>
          </div>
        </div>

        <div className="phil-brutalism-right" data-animate>
          <h2 className="phil-brutalism-title">
            ORGANIC <br />
            <em>BRUTALISM</em>
          </h2>
          <div className="phil-brutalism-body">
            <p>
              We reject the sterile perfection of modern CAD designs. Our work celebrates the
              raw, the tactile, and the imperfect. Brutalism is not about coldness; it is about
              honesty. The honesty of material, the honesty of purpose.
            </p>
            <p className="phil-brutalism-indent">
              In the intersection of rough concrete and soft light, we find the sublime.
              Our structures are monoliths that breathe with the changing shadows of the day.
            </p>
          </div>
          <button className="phil-cta">Explore Methodology</button>
        </div>
      </section>

      {/* ── Chromatic Silence ──────────────────────────────── */}
      <section className="phil-chromatic" aria-label="Chromatic Silence">
        <div className="phil-chromatic-mask" aria-hidden="true" />

        <div className="phil-chromatic-inner">
          <div className="phil-chromatic-text" data-animate="from-left">
            <h3 className="phil-chromatic-title">
              CHROMATIC <br /><em>SILENCE</em>
            </h3>
            <p className="phil-chromatic-body">
              Colors are distractions. We work within the spectrum of shadows. From the deep
              ebony of charred cedar to the ghost-grey of weathered slate, our palette is a
              dialogue with time.
            </p>
            <div className="phil-palette" aria-label="Color palette" role="presentation">
              <div style={{ background: '#000000' }} />
              <div style={{ background: '#0e0e0e' }} />
              <div style={{ background: '#191a1a' }} />
              <div style={{ background: '#2b2c2c' }} />
            </div>
          </div>

          <div className="phil-chromatic-img-wrap" data-animate>
            <img
              className="phil-chromatic-img"
              src="/projects/simcere-rd-centre/06-sm.jpg"
              alt="Simcere Pharmaceutical R&D Centre — roof garden and reflecting pool"
            />
            <div className="phil-chromatic-badge" aria-hidden="true">
              <span className="phil-chromatic-badge-num">03</span>
              <span className="phil-chromatic-badge-label">Luce Sombra</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRECISION typography overlay ───────────────────── */}
      <section className="phil-precision" aria-label="The Atelier Standard">
        <div className="phil-precision-ghost" aria-hidden="true">PRECISION</div>
        <div className="phil-precision-content" data-animate>
          <span className="section-label">The Atelier Standard</span>
          <p className="phil-precision-statement">
            Architecture is the <em>geometry</em> of focus. We remove the clutter to find the core.
          </p>
          <div className="phil-precision-rule" aria-hidden="true" />
        </div>
      </section>

      {/* ── The Human Void ─────────────────────────────────── */}
      <section className="phil-void" aria-label="The Human Void">
        <div className="phil-void-img-wrap" data-animate="from-left">
          <img
            className="phil-void-img"
            src="/projects/hengli-group-headquarters/01-sm.jpg"
            alt="Hengli Group Headquarters — main hall"
          />
        </div>

        <div className="phil-void-text" data-animate>
          <span className="section-label">Philosophy 03</span>
          <h2 className="phil-void-title">
            THE <br />
            HUMAN <br />
            <em>VOID</em>
          </h2>
          <p className="phil-void-body">
            A space is only complete when it is empty. We design for the moments of quiet
            contemplation, the "voids" where human consciousness can expand without the
            friction of unnecessary detail.
          </p>
          {/* <div className="phil-void-links">
            <a href="#" className="phil-void-link primary" onClick={(e) => e.preventDefault()}>Manifesto PDF</a>
            <a href="#" className="phil-void-link" onClick={(e) => e.preventDefault()}>Process Reel</a>
          </div> */}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="phil-footer">
        <div className="phil-footer-left">
          <div className="phil-footer-logo">II&#8209;DESIGN</div>
          <p className="phil-footer-meta">
            Architectural Atelier<br />
            Global Practice<br />
            © 2024 All Rights Reserved
          </p>
        </div>
        <div className="phil-footer-right">
          <p className="phil-footer-tagline">Stay silent. Create depth.</p>
          <span className="phil-footer-sub">Philosophy — Organic Brutalism</span>
        </div>
      </footer>

    </div>
  );
}
