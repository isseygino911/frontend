import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LAB_NAV, LAB_STUDIO } from '../../data/labContent.js';
import BrandLogo from '../BrandLogo.jsx';

/** Fixed header: menu pill, centred logo, outlined call to action, and the full-screen menu. */
export default function LabHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <header className={`lab-header${open ? ' is-menu-open' : ''}`} data-lab-header>
        <button
          type="button"
          className="lab-menu-btn"
          aria-expanded={open}
          aria-controls="lab-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span>{open ? 'Close' : 'Menu'}</span>
          <span className="lab-menu-dots" aria-hidden="true" />
        </button>
        <Link to="/" className="lab-wordmark" aria-label="II Design — Home"><BrandLogo /></Link>
        <Link to="/contact" className="lab-btn lab-btn-outline lab-header-cta">Start a Project</Link>
      </header>

      <div id="lab-menu" className={`lab-menu${open ? ' is-open' : ''}`} hidden={!open}>
        <nav aria-label="Site">
          <ul className="lab-menu-list">
            {LAB_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={() => setOpen(false)}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="lab-menu-meta">
          <a href={`mailto:${LAB_STUDIO.email}`}>{LAB_STUDIO.email}</a>
          <a href={LAB_STUDIO.phoneHref}>{LAB_STUDIO.phone}</a>
        </div>
      </div>
    </>
  );
}
