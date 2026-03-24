import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll.js';
import { getProjects } from '../services/projectsAPI.js';
import '../styles/archive.css';

/**
 * Get size class based on index for asymmetric masonry pattern
 * Pattern: large, small, wide, small, tall, small, medium...
 */
function getCardSize(index) {
  const pattern = [
    'large',   // 0 - Featured large
    'small',   // 1 - Compact
    'wide',    // 2 - Horizontal emphasis
    'small',   // 3 - Compact
    'tall',    // 4 - Vertical emphasis
    'small',   // 5 - Compact
    'medium',  // 6 - Standard
    'small',   // 7 - Compact
  ];
  return pattern[index % pattern.length];
}

/**
 * Get offset class for visual rhythm
 */
function getCardOffset(index) {
  const offsets = [
    '',           // 0 - No offset
    'offset-up',  // 1 - Shifted up
    '',           // 2 - No offset
    'offset-down',// 3 - Shifted down
    '',           // 4 - No offset
    'offset-up',  // 5 - Shifted up
    'offset-left',// 6 - Shifted left
    '',           // 7 - No offset
  ];
  return offsets[index % offsets.length];
}

export default function Archive() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const navigate                = useNavigate();

  useAnimateOnScroll();

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((err) => console.error('[archive] Failed to load projects', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div id="page-archive">
      <div className="archive-page">
        {/* Header with oversized title */}
        <header className="archive-header" data-animate>
          <p className="archive-label">Selected Works</p>
          <h1 className="archive-headline">
            <span className="archive-headline-main">Archive</span>
            <span className="archive-headline-count">{projects.length}</span>
          </h1>
          <p className="archive-subhead">
            A chronological collection of architectural projects spanning residential, 
            commercial, and cultural spaces.
          </p>
        </header>

        {loading ? (
          <div className="archive-loading">Loading works…</div>
        ) : (
          <div className="archive-masonry" role="list">
            {projects.map((p, i) => {
              const sizeClass = `archive-card--${getCardSize(i)}`;
              const offsetClass = getCardOffset(i);
              
              return (
                <article
                  key={p.key}
                  className={`archive-card ${sizeClass} ${offsetClass}`}
                  data-animate="fade-up"
                  style={{ transitionDelay: `${100 + (i % 8) * 80}ms` }}
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${p.title}, ${p.year}`}
                  onClick={() => navigate(`/project/${p.key}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${p.key}`)}
                >
                  {/* Index marker - positioned absolutely */}
                  <span className="archive-card__index">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Image container with aspect ratio based on size */}
                  <div className="archive-card__media">
                    <img 
                      src={p.images?.hero} 
                      alt="" 
                      loading={i < 4 ? "eager" : "lazy"}
                      className="archive-card__image"
                    />
                    {/* Hover overlay */}
                    <div className="archive-card__overlay" />
                  </div>

                  {/* Content overlay - positioned based on card size */}
                  <div className="archive-card__content">
                    <div className="archive-card__meta">
                      <span className="archive-card__year">{p.year}</span>
                      <span className="archive-card__type">{p.type}</span>
                    </div>
                    <h2 className="archive-card__title">{p.title}</h2>
                    <p className="archive-card__location">{p.location}</p>
                  </div>

                  {/* Decorative corner accent */}
                  <span className="archive-card__accent" aria-hidden="true" />
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer stats */}
      <div className="archive-footer">
        <div className="archive-stats">
          <div className="archive-stat">
            <span className="archive-stat__value">{projects.length}</span>
            <span className="archive-stat__label">Projects</span>
          </div>
          <div className="archive-stat">
            <span className="archive-stat__value">12</span>
            <span className="archive-stat__label">Countries</span>
          </div>
          <div className="archive-stat">
            <span className="archive-stat__value">24</span>
            <span className="archive-stat__label">Awards</span>
          </div>
        </div>
        <p className="archive-footer__text">
          © 2024 II Design Studio. All rights reserved.
        </p>
      </div>
    </div>
  );
}
