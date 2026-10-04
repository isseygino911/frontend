import { Link } from 'react-router-dom';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll.js';
import BrandLogo from '../components/BrandLogo.jsx';
import { LAB_STUDIO } from '../data/labContent.js';
import '../styles/philosophy.css';

/**
 * Philosophy page — how the studio works, in the same voice as the landing page.
 * Sections: Hero, Plan First (asymmetric), Lasting Materials (palette),
 * Detail (typography overlay), Light (final module), Footer.
 */
/** Material tones for the palette strip: stone, timber, brass, dark metal. */
const MATERIALS = [
  { name: 'Stone',  tone: '#d6cfc2',           ink: '#131313' },
  { name: 'Timber', tone: '#7a5a3a',           ink: '#f3eee6' },
  { name: 'Brass',  tone: 'var(--brand-gold)', ink: '#131313' },
  { name: 'Metal',  tone: '#2b2c2c',           ink: '#e7e5e5' },
];

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
          <span className="section-label" data-animate="from-left">Our Philosophy</span>
          <h1 className="phil-hero-headline" data-animate="from-left">
            DESIGNED <br />
            <em>AROUND</em> <br />
            PEOPLE
          </h1>
          <p className="phil-hero-body" data-animate>
            Every interior starts with the people who will use it — the guest checking in late,
            the team at their desks all day, the family at home. We plan around those routines
            first, then choose the materials, light and detail that make them easier.
          </p>
        </div>

        <div className="phil-hero-rule" aria-hidden="true">
          <div className="phil-hero-rule-line" />
          <div className="phil-hero-rule-mark" />
        </div>
      </section>

      {/* ── Plan First (asymmetric) ───────────────────────── */}
      <section className="phil-plan" aria-label="Plan first">
        <div className="phil-plan-left" data-animate="from-left">
          <div className="phil-plan-ghost" aria-hidden="true">PLAN</div>
          <img
            className="phil-plan-img"
            src="/projects/ecovacs-phase-vi-office/01-sm.jpg"
            alt="Ecovacs Robotics Phase VI Office — sweeping curved main hall"
          />
          <div className="phil-plan-caption">
            <span className="phil-caption-label">Office · China</span>
            <span className="phil-caption-quote">Ecovacs Robotics Phase VI Office — main hall</span>
          </div>
        </div>

        <div className="phil-plan-right" data-animate>
          <h2 className="phil-plan-title">
            PLAN <br />
            <em>FIRST</em>
          </h2>
          <div className="phil-plan-body">
            <p>
              Before a single finish is chosen, we study how the space will run — occupancy,
              circulation, operations. How guests arrive, how teams meet and focus, how a family
              lives day to day. That becomes a clear layout, and everything else follows from it.
            </p>
            <p className="phil-plan-indent">
              Most of our work is commercial: hotels, corporate headquarters and research
              facilities. We bring the same care to private residences.
            </p>
          </div>
          <Link to="/archive" className="phil-cta">View Projects</Link>
        </div>
      </section>

      {/* ── Lasting Materials ──────────────────────────────── */}
      <section className="phil-material" aria-label="Lasting materials">
        <div className="phil-material-mask" aria-hidden="true" />

        <div className="phil-material-inner">
          <div className="phil-material-text" data-animate="from-left">
            <h3 className="phil-material-title">
              LASTING <br /><em>MATERIALS</em>
            </h3>
            <p className="phil-material-body">
              Stone, timber and metal chosen to wear well — tested against heavy daily use in
              hotels and offices and the slower rhythm of a home, so a lobby or workplace still
              looks right years after opening.
            </p>
            <ul className="phil-palette" aria-label="Material palette">
              {MATERIALS.map(({ name, tone, ink }) => (
                <li key={name} style={{ background: tone, color: ink }}>
                  <span>{name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="phil-material-img-wrap" data-animate>
            <img
              className="phil-material-img"
              src="/projects/simcere-rd-centre/06-sm.jpg"
              alt="Simcere Pharmaceutical R&D Centre — roof garden and reflecting pool"
            />
            <div className="phil-material-badge" aria-hidden="true">
              <span className="phil-material-badge-num">02</span>
              <span className="phil-material-badge-label">Material</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── DETAIL typography overlay ──────────────────────── */}
      <section className="phil-precision" aria-label="Detail">
        <div className="phil-precision-ghost" aria-hidden="true">DETAIL</div>
        <div className="phil-precision-content" data-animate>
          <span className="section-label">How We Work</span>
          <p className="phil-precision-statement">
            Joinery, lighting and furniture are drawn to the <em>millimetre</em>, so what gets built is exactly what was designed.
          </p>
          <div className="phil-precision-rule" aria-hidden="true" />
        </div>
      </section>

      {/* ── Light ──────────────────────────────────────────── */}
      <section className="phil-light" aria-label="Light">
        <div className="phil-light-img-wrap" data-animate="from-left">
          <img
            className="phil-light-img"
            src="/projects/hengli-group-headquarters/01-sm.jpg"
            alt="Hengli Group Headquarters — main hall"
          />
        </div>

        <div className="phil-light-text" data-animate>
          <span className="section-label">Philosophy 03</span>
          <h2 className="phil-light-title">
            LIGHT <br />
            FOR EVERY <br />
            <em>HOUR</em>
          </h2>
          <p className="phil-light-body">
            Daylight and artificial light are planned together, so each space works from
            morning meetings to evening service — and a home feels as calm at night as it
            does at noon.
          </p>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="phil-footer">
        <div className="phil-footer-left">
          <BrandLogo className="phil-footer-logo" />
          <p className="phil-footer-meta">
            <a href={`mailto:${LAB_STUDIO.email}`}>{LAB_STUDIO.email}</a><br />
            {LAB_STUDIO.copyright}
          </p>
        </div>
        <div className="phil-footer-right">
          <p className="phil-footer-tagline">Interiors shaped around people.</p>
          <span className="phil-footer-sub">{LAB_STUDIO.tagline}</span>
        </div>
      </footer>

    </div>
  );
}
