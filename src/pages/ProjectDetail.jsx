import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll.js';
import { getProject } from '../services/projectsAPI.js';
import ImageModal from '../components/ImageModal.jsx';
import BrandLogo from '../components/BrandLogo.jsx';
import { LAB_QUOTE } from '../data/labContent.js';
import '../styles/project.css';

export default function ProjectDetail() {
  const { key }               = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [viewing, setViewing] = useState(null);

  useAnimateOnScroll();

  useEffect(() => {
    setLoading(true);
    setError(false);
    setProject(null);
    setViewing(null);

    getProject(key)
      .then(setProject)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [key]);

  if (loading) {
    return (
      <div className="brand-splash">
        <BrandLogo variant="stacked" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="project-not-found">
        <h2>Project Not Found</h2>
        <p>The project you are looking for does not exist in our archive.</p>
        <Link to="/archive" className="back-nav">← Back to Archive</Link>
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
          </div>
          <h1 className="project-hero-title">{project.title}</h1>

          <div className="project-detail-meta">
            <div className="meta-item">
              <span className="meta-label">Location</span>
              <span className="meta-value">{project.location}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Sector</span>
              <span className="meta-value">{project.type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div className="project-body">
        <blockquote className="project-quote" data-animate="from-left">
          {LAB_QUOTE.quote}
        </blockquote>

        {/* Gallery */}
        {gallery.length > 0 && (
          <div className="project-gallery" data-animate>
            {gallery.map(({ src, label }, i) => (
              <button
                key={src}
                type="button"
                className="gallery-item"
                onClick={() => setViewing(i)}
                aria-label={`View ${label} full size`}
              >
                <img
                  className="gallery-item-img"
                  src={src}
                  alt={`${project.title} — ${label}`}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        <ImageModal
          images={gallery.map(({ full, label }) => ({
            src: full,
            alt: `${project.title} — ${label}`,
            caption: label,
          }))}
          index={viewing}
          onChange={setViewing}
          onClose={() => setViewing(null)}
        />

        {/* Description */}
        <div className="project-description" data-animate>
          {project.desc1 && <p>{project.desc1}</p>}
          {project.desc2 && <p>{project.desc2}</p>}
        </div>

        <Link to="/archive" className="back-nav">← Back to Archive</Link>
      </div>
    </div>
  );
}
