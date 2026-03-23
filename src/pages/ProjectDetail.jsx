import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll.js';
import { getProject } from '../services/projectsAPI.js';
import '../styles/project.css';

export default function ProjectDetail() {
  const { key }               = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useAnimateOnScroll();

  useEffect(() => {
    setLoading(true);
    setError(false);
    setProject(null);

    getProject(key)
      .then(setProject)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [key]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontFamily: 'var(--font-serif)',
        fontSize: '24px', fontWeight: 300, letterSpacing: '0.3em',
        color: 'var(--primary)',
      }}>
        II DESIGN
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-not-found">
        <h2>Project Not Found</h2>
        <p>The project you are looking for does not exist in our archive.</p>
        <Link to="/" className="back-nav">← Back to Atelier</Link>
      </div>
    );
  }

  const gallery = project.images?.gallery ?? [];

  return (
    <div id="page-project">
      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="project-hero" aria-label="Project hero">
        <div className="project-hero-bg">
          <img
            className="project-hero-img"
            src={project.images?.hero}
            alt={project.title}
            loading="eager"
          />
          <div className="project-hero-overlay" aria-hidden="true" />
        </div>

        <div className="project-hero-content">
          <div className="project-hero-eyebrow">
            <span>{project.code}</span>
            <span className="sep-dot">·</span>
            <span>{project.type}</span>
            <span className="sep-dot">·</span>
            <span>{project.year}</span>
          </div>
          <h1 className="project-hero-title">{project.title}</h1>

          <div className="project-detail-meta">
            <div className="meta-item">
              <span className="meta-label">Location</span>
              <span className="meta-value">{project.location}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Year</span>
              <span className="meta-value">{project.year}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Area</span>
              <span className="meta-value">{project.area}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Coordinates</span>
              <span className="meta-value">{project.coords}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div className="project-body">
        <blockquote className="project-quote" data-animate="from-left">
          "Space is only space when it is interrupted by the geometry of intent."
        </blockquote>

        {/* Gallery */}
        {gallery.length > 0 && (
          <div className="project-gallery" data-animate>
            {gallery.map((src, i) => (
              <div key={i} className="gallery-item">
                <img
                  className="gallery-item-img"
                  src={src}
                  alt={`${project.title} — view ${i + 1}`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <div className="project-description" data-animate>
          {project.desc1 && <p>{project.desc1}</p>}
          {project.desc2 && <p>{project.desc2}</p>}
          {project.desc3 && <p>{project.desc3}</p>}
        </div>

        <Link to="/" className="back-nav">← Back to Atelier</Link>
      </div>
    </div>
  );
}
