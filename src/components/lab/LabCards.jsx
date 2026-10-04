import { Link } from 'react-router-dom';
import { LAB_CARDS } from '../../data/labContent.js';
import { Caption, SplitHeading } from './LabText.jsx';

/** Grey band with an asymmetric grid: small cards in the left column, large cards spanning the right two. */
export default function LabCards({ projects }) {
  const cards = projects.filter((p) => p.type === 'Office').slice(0, LAB_CARDS.count);
  return (
    <section className="lab-cards" aria-label="Office projects">
      <div className="lab-cards-heading">
        <Caption>{LAB_CARDS.caption}</Caption>
        <SplitHeading lines={[LAB_CARDS.title]} className="lab-h2" />
      </div>
      <div className="lab-cards-grid">
        {cards.map((p, i) => (
          <article key={p.key} className={`lab-card ${i % 2 ? 'is-large' : 'is-small'}`}>
            <Link to={`/project/${p.key}`} className="lab-card-link">
              <figure className="lab-card-img">
                <img src={i % 2 ? p.images.hero : p.images.thumb} alt="" loading="lazy" />
              </figure>
              <h3 className="lab-card-title">{p.title}</h3>
              <span className="lab-card-cta">View Project</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
