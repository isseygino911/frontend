import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll.js';
import { getProjects } from '../services/projectsAPI.js';
import '../styles/archive.css';

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
        <div className="archive-header" data-animate>
          <p className="section-label">Complete Works</p>
          <h1 className="archive-headline">Archive</h1>
        </div>

        {loading ? (
          <div className="archive-loading">Loading works…</div>
        ) : (
          <div className="archive-list" role="list">
            {projects.map((p, i) => (
              <div
                key={p.key}
                className="archive-item"
                data-animate
                role="listitem"
                tabIndex={0}
                aria-label={`${p.title}, ${p.year}`}
                onClick={() => navigate(`/project/${p.key}`)}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/project/${p.key}`)}
                style={{ cursor: 'pointer' }}
              >
                <span className="archive-item-num">{String(i + 1).padStart(3, '0')}</span>
                <span className="archive-item-thumb">
                  <img src={p.images?.hero} alt={p.title} loading="lazy" />
                </span>
                <span className="archive-item-title">{p.title}</span>
                <span className="archive-item-type">{p.type}</span>
                <span className="archive-item-location">{p.location}</span>
                <span className="archive-item-year">{p.year}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="footer-bottom archive-footer">
        <span className="footer-bottom-text">© 2024 II Design Studio. All rights reserved.</span>
        <span className="footer-bottom-text">148 Works — 12 Countries</span>
      </div>
    </div>
  );
}
