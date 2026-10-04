import { Link } from 'react-router-dom';
import { LAB_FOOTER, LAB_NAV, LAB_STUDIO } from '../../data/labContent.js';
import { Caption, SplitHeading } from './LabText.jsx';
import LineArt from './LineArt.jsx';
import BrandLogo from '../BrandLogo.jsx';

/** Centred commission CTA over a striped gradient, link rows, and a wide line drawing. */
export default function LabFooter() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="lab-footer">
      <div className="lab-footer-cta">
        <Caption>{LAB_FOOTER.caption}</Caption>
        <SplitHeading lines={LAB_FOOTER.title} className="lab-h2" />
        <p className="lab-body lab-muted" data-lab-text="body">{LAB_FOOTER.body}</p>
        <Link to="/contact" className="lab-btn lab-btn-light">Start a Project</Link>
      </div>

      <div className="lab-footer-main">
        <nav aria-label="Footer">
          <ul className="lab-footer-links">
            {LAB_NAV.map((item) => (
              <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="lab-footer-brand">
          <BrandLogo variant="stacked" className="lab-wordmark" />
          <p>{LAB_STUDIO.copyright}</p>
        </div>
        <ul className="lab-footer-links lab-footer-links-right">
          <li><a href={`mailto:${LAB_STUDIO.email}`}>{LAB_STUDIO.email}</a></li>
        </ul>
      </div>

      <div className="lab-footer-bottom">
        <p><span className="lab-muted">Email</span> <a href={`mailto:${LAB_STUDIO.email}`}>{LAB_STUDIO.email}</a></p>
        <button type="button" className="lab-footer-top" onClick={toTop}>Back to top</button>
        <p className="lab-muted">{LAB_STUDIO.tagline}</p>
      </div>

      <LineArt variant="building" className="lab-footer-art" />
    </footer>
  );
}
