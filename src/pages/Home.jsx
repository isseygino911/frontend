import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll.js';
import { getProjects } from '../services/projectsAPI.js';
import '../styles/home.css';

/**
 * Home page — full landing experience with:
 * - Hero with CSS art geometric layers and cursor parallax
 * - Clip-path text reveal animation on mount
 * - Marquee strip
 * - Asymmetric projects grid
 * - Manifesto stats strip
 * - Commission footer
 */
export default function Home() {
  const navigate    = useNavigate();
  const depth1Ref   = useRef(null);
  const depth2Ref   = useRef(null);
  const depth3Ref   = useRef(null);
  const line1Ref    = useRef(null);
  const line2Ref    = useRef(null);
  const rafIdRef    = useRef(null);

  useAnimateOnScroll();

  // Hero text clip-path reveal on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      line1Ref.current?.classList.add('revealed');
      line2Ref.current?.classList.add('revealed');
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  // Cursor parallax on hero depth layers
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    function onMouseMove(e) {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      targetX  = (e.clientX - cx) / cx;
      targetY  = (e.clientY - cy) / cy;
    }

    function raf() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (depth1Ref.current)
        depth1Ref.current.style.transform = `translate(${currentX * 12}px, ${currentY * 8}px)`;
      if (depth2Ref.current)
        depth2Ref.current.style.transform = `translate(${currentX * 22}px, ${currentY * 14}px)`;
      if (depth3Ref.current)
        depth3Ref.current.style.transform = `translate(${currentX * 32}px, ${currentY * 20}px)`;

      rafIdRef.current = requestAnimationFrame(raf);
    }

    window.addEventListener('mousemove', onMouseMove);
    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    getProjects()
      .then((data) => setFeaturedProjects(data.slice(0, 4)))
      .catch((err) => console.error('[home] Failed to load projects', err));
  }, []);

  return (
    <div id="page-home">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero-section" aria-label="Hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="depth-layer" ref={depth1Ref}>
            <div className="hero-geo-1" />
          </div>
          <div className="depth-layer" ref={depth2Ref}>
            <div className="hero-geo-2" />
            <div className="hero-geo-accent" />
            <div className="hero-geo-accent-2" />
          </div>
          <div className="depth-layer" ref={depth3Ref}>
            <div className="hero-geo-3" />
          </div>
          <div className="hero-noise" />
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Studio — 2019 — Organic Brutalism</p>
          <h1 className="hero-display" aria-label="II Design">
            <span className="hero-display-line">
              <span className="hero-display-inner" ref={line1Ref}>
                II&nbsp;DES
              </span>
            </span>
            <span className="hero-display-line">
              <span className="hero-display-inner outline-text" ref={line2Ref}>
                IGN
              </span>
            </span>
          </h1>
          <p className="hero-subtitle">Spatial Deconstruction&nbsp;&nbsp;001</p>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────── */}
      <div className="marquee-track" aria-hidden="true">
        <div className="marquee-inner">
          <span>ORGANIC BRUTALISM</span>
          <span className="sep">·</span>
          <span>SPATIAL DECONSTRUCTION</span>
          <span className="sep">·</span>
          <span>ARCHITECTURE OF SILENCE</span>
          <span className="sep">·</span>
          <span>THE GEOMETRY OF INTENT</span>
          <span className="sep">·</span>
          <span>ORGANIC BRUTALISM</span>
          <span className="sep">·</span>
          <span>SPATIAL DECONSTRUCTION</span>
          <span className="sep">·</span>
          <span>ARCHITECTURE OF SILENCE</span>
          <span className="sep">·</span>
          <span>THE GEOMETRY OF INTENT</span>
          <span className="sep">·&nbsp;&nbsp;</span>
        </div>
      </div>

      {/* ── Projects grid ─────────────────────────────────── */}
      <div className="projects-section">
        <p className="section-label" data-animate="from-left">
          Selected Works
        </p>

        <div className="projects-grid">
          {featuredProjects.map((p, i) => {
            const isWide = i === 3;
            return (
              <article
                key={p.key}
                className="project-card"
                data-animate={i === 0 ? 'scale-in' : i < 3 ? 'from-right' : undefined}
                style={isWide ? { gridColumn: '1 / -1' } : undefined}
                onClick={() => navigate(`/project/${p.key}`)}
                role="button"
                tabIndex={0}
                aria-label={`View project: ${p.title}`}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${p.key}`)}
              >
                <div
                  className="project-card-image"
                  style={isWide ? { aspectRatio: '21/7', minHeight: 'auto' } : undefined}
                >
                  <img
                    src={p.images?.hero}
                    alt={p.title}
                    className="project-card-img"
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                </div>

                <div className={`project-card-info${isWide ? ' project-card-info-wide' : ''}`}>
                  <div>
                    <div className="project-card-meta">
                      <span className="project-code">{p.code}</span>
                      <span className="project-year" style={isWide ? { marginLeft: '16px' } : undefined}>
                        {p.year}
                      </span>
                    </div>
                    <h2 className="project-title">{p.title}</h2>
                    <p className="project-location">{p.location}</p>
                  </div>
                  {isWide && (
                    <div className="project-card-type-label">{p.type}</div>
                  )}
                </div>

                <div className="project-card-hover-reveal" aria-hidden="true">
                  <span className="view-project">View Project →</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── Manifesto strip ───────────────────────────────── */}
      <div className="manifesto-strip" data-animate>
        <div className="manifesto-stat">
          <div className="manifesto-number">148</div>
          <div className="manifesto-label">Projects</div>
        </div>
        <div className="manifesto-divider" aria-hidden="true" />
        <div className="manifesto-stat">
          <div className="manifesto-number">12</div>
          <div className="manifesto-label">Countries</div>
        </div>
        <div className="manifesto-divider" aria-hidden="true" />
        <div className="manifesto-stat">
          <div className="manifesto-number">01</div>
          <div className="manifesto-label">Philosophy</div>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="home-footer" data-animate>
        <div>
          <p className="footer-cta-label">Commission</p>
          <h2 className="footer-cta-headline">
            Begin your
            <br />
            <em>spatial</em> dialogue.
          </h2>
          <div className="footer-cta-btns">
            <Link to="/contact" className="btn-primary">
              Start a Project <span aria-hidden="true">→</span>
            </Link>
            <Link to="/archive" className="btn-outline">
              View Archive <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="footer-contact-info">
          <h3>Studio</h3>
          <div className="contact-line">
            <div className="contact-item">
              <span className="contact-item-label">Location</span>
              <span className="contact-item-value">
                Schönhauser Allee 36
                <br />
                10435 Berlin, Germany
              </span>
            </div>
            <div className="contact-item">
              <span className="contact-item-label">Email</span>
              <a
                className="contact-item-value"
                href="mailto:studio@iidesign.com"
              >
                studio@iidesign.com
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-item-label">Phone</span>
              <a className="contact-item-value" href="tel:+4930123456">
                +49 30 123 456
              </a>
            </div>
          </div>
        </div>
      </footer>

      <div className="footer-bottom">
        <span className="footer-bottom-text">
          © 2024 II Design Studio. All rights reserved.
        </span>
        <span className="footer-bottom-text">Organic Brutalism — Since 2019</span>
      </div>
    </div>
  );
}
