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

  // Hero letters fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      line1Ref.current?.classList.add('hero-letter-visible');
      line2Ref.current?.classList.add('hero-letter-visible');
    }, 80);
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
  const [projectCount, setProjectCount]         = useState(0);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setFeaturedProjects(data.slice(0, 4));
        setProjectCount(data.length);
      })
      .catch((err) => console.error('[home] Failed to load projects', err));
  }, []);

  return (
    <div id="page-home">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="hero-section" aria-label="Hero">

        {/* Floating image planes */}
        <div className="hero-planes" aria-hidden="true">
          <div className="hero-plane hero-plane-1" ref={depth1Ref}>
            <img
              src="/projects/west-lake-state-guesthouse/01-sm.jpg"
              alt=""
            />
          </div>
          <div className="hero-plane hero-plane-2" ref={depth2Ref}>
            <img
              src="/projects/whale-cloud-global-headquarters/01-sm.jpg"
              alt=""
            />
          </div>
          <div className="hero-diamond" ref={depth3Ref} />
        </div>

        {/* Fragmented typography */}
        <div className="hero-letters" aria-label="II Design">
          <span className="hero-letter hero-letter-ii" ref={line1Ref}>II</span>
          <span className="hero-letter hero-letter-des" ref={line2Ref}>DES</span>
          <span className="hero-letter hero-letter-ign">IGN</span>
        </div>

        {/* Bottom-left subtitle */}
        <div className="hero-subtitle-block">
          <p className="hero-eyebrow">Spatial Deconstruction&nbsp;&nbsp;001</p>
          <p className="hero-tagline">
            The architecture of the invisible, articulated<br />
            through fragmented planes and captured silence.
          </p>
        </div>

        {/* CTA — vertical line + button */}
        <div className="hero-cta-block">
          <div className="hero-cta-line" aria-hidden="true" />
          <button className="hero-cta-btn" onClick={() => navigate('/archive')}>
            Begin Exploration
          </button>
        </div>

        {/* Bottom gradient fade */}
        <div className="hero-fade-bottom" aria-hidden="true" />
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

      {/* ── Selected Works — Layered Composition ───────────── */}
      <div className="works-section">
        <div className="works-header" data-animate="from-left">
          <p className="works-eyebrow">Portfolio</p>
          <h2 className="works-title">
            Selected
            <br />
            <span className="works-title-accent">Works</span>
          </h2>
          <div className="works-title-line" aria-hidden="true" />
        </div>

        <div className="works-composition">
          {/* Layer 1: Featured Project — Large, overlapping left */}
          {featuredProjects[0] && (
            <article
              className="work-card work-card-featured"
              data-animate="layer-up"
              onClick={() => navigate(`/project/${featuredProjects[0].key}`)}
              role="button"
              tabIndex={0}
              aria-label={`View project: ${featuredProjects[0].title}`}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${featuredProjects[0].key}`)}
            >
              <div className="work-card-frame work-card-frame-inverted" aria-hidden="true">
                <span className="frame-corner frame-corner-tl" />
                <span className="frame-corner frame-corner-br" />
              </div>
              <div className="work-card-image-wrap">
                <img
                  src={featuredProjects[0].images?.hero}
                  alt={featuredProjects[0].title}
                  loading="eager"
                />
                <div className="work-card-image-overlay" />
              </div>
              <div className="work-card-content">
                <div className="work-card-meta">
                  <span className="work-index">01</span>
                  <span className="work-year">{featuredProjects[0].type}</span>
                </div>
                <h3 className="work-card-title">{featuredProjects[0].title}</h3>
                <p className="work-card-location">{featuredProjects[0].location}</p>
                <div className="work-card-cta">
                  <span>Explore</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>
              <div className="work-card-backdrop" aria-hidden="true" />
            </article>
          )}

          {/* Layer 2: Secondary Projects — Offset grid with overlap */}
          <div className="works-secondary">
            {featuredProjects.slice(1, 3).map((p, i) => (
              <article
                key={p.key}
                className={`work-card work-card-secondary work-card-offset-${i}`}
                data-animate="layer-up"
                style={{ animationDelay: `${(i + 1) * 0.1}s` }}
                onClick={() => navigate(`/project/${p.key}`)}
                role="button"
                tabIndex={0}
                aria-label={`View project: ${p.title}`}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${p.key}`)}
              >
                <div className="work-card-image-wrap">
                  <img
                    src={p.images?.thumb}
                    alt={p.title}
                    loading="lazy"
                  />
                  <div className="work-card-image-overlay" />
                </div>
                <div className="work-card-content-compact">
                  <span className="work-index">0{i + 2}</span>
                  <h3 className="work-card-title-compact">{p.title}</h3>
                  <p className="work-card-location-compact">{p.location}</p>
                </div>
                {/* Inverted border decoration */}
                <div className="work-card-border work-card-border-left" aria-hidden="true" />
                <div className="work-card-border work-card-border-bottom" aria-hidden="true" />
              </article>
            ))}
          </div>

          {/* Layer 3: Tertiary — Wide strip with fragment overlap */}
          {featuredProjects[3] && (
            <article
              className="work-card work-card-wide"
              data-animate="layer-up"
              style={{ animationDelay: '0.3s' }}
              onClick={() => navigate(`/project/${featuredProjects[3].key}`)}
              role="button"
              tabIndex={0}
              aria-label={`View project: ${featuredProjects[3].title}`}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${featuredProjects[3].key}`)}
            >
              <div className="work-card-wide-fragment" aria-hidden="true">
                <span className="fragment-square" />
                <span className="fragment-line" />
              </div>
              <div className="work-card-wide-inner">
                <div className="work-card-image-wrap work-card-image-wrap-wide">
                  <img
                    src={featuredProjects[3].images?.thumb}
                    alt={featuredProjects[3].title}
                    loading="lazy"
                  />
                  <div className="work-card-image-overlay" />
                </div>
                <div className="work-card-wide-content">
                  <div className="work-card-meta">
                    <span className="work-index">04</span>
                    <span className="work-code">{featuredProjects[3].code}</span>
                  </div>
                  <h3 className="work-card-title">{featuredProjects[3].title}</h3>
                  <p className="work-card-wide-type">{featuredProjects[3].type}</p>
                  <div className="work-card-cta work-card-cta-minimal">
                    <span>View Project</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M1 6H11M11 6L6 1M11 6L6 11" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  </div>
                </div>
              </div>
              {/* Inverted L-shape border */}
              <div className="work-card-frame work-card-frame-wide" aria-hidden="true">
                <span className="frame-edge frame-edge-top" />
                <span className="frame-edge frame-edge-right" />
              </div>
            </article>
          )}
        </div>

        {/* Archive link */}
        <div className="works-archive-link" data-animate="from-right">
          <button className="works-archive-btn" onClick={() => navigate('/archive')}>
            <span className="archive-btn-text">View All Projects</span>
            <span className="archive-btn-count">{projectCount}</span>
            <span className="archive-btn-line" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Studio Manifesto ──────────────────────────────── */}
      <section className="studio-manifesto" aria-label="Studio Manifesto">
        <div className="studio-manifesto-bg" aria-hidden="true" />
        <div className="studio-manifesto-inner">

          {/* Left: ghost headline + numbered principles */}
          <div className="studio-manifesto-left" data-animate="from-left">
            <h2 className="studio-manifesto-headline" aria-hidden="true">Manifesto</h2>
            <div className="studio-manifesto-principles">
              <div className="studio-manifesto-principle">
                <span className="principle-num">01</span>
                <p className="principle-text">
                  Respect the weight of material. Concrete is not just structure;
                  it is the frozen history of the site.
                </p>
              </div>
              <div className="studio-manifesto-principle">
                <span className="principle-num">02</span>
                <p className="principle-text">
                  The most important room in a building is the space immediately
                  outside it. The void defines the solid.
                </p>
              </div>
              <div className="studio-manifesto-principle">
                <span className="principle-num">03</span>
                <p className="principle-text">
                  Light should be treated as a physical material. It must be
                  carved, directed, and contained.
                </p>
              </div>
            </div>
          </div>

          {/* Right: image with quote overlaid */}
          <div className="studio-manifesto-right" data-animate>
            <div className="studio-manifesto-img-wrap">
              <div className="studio-manifesto-border" aria-hidden="true" />
              <img
                src="/projects/spd-hotel/06-sm.jpg"
                alt=""
                className="studio-manifesto-img"
              />
              <div className="studio-manifesto-quote-overlay">
                <blockquote className="studio-manifesto-quote">
                  "In the shadow of the monolith, we find the truth of the occupant."
                </blockquote>
              </div>
            </div>
          </div>

        </div>
      </section>

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
