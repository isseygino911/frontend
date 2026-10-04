import { Link } from 'react-router-dom';
import { LAB_COMPOSITION } from '../../data/labContent.js';
import { Caption, SplitHeading } from './LabText.jsx';

/**
 * Three hairline columns with a sticky centred heading, two sticky text blocks,
 * and five project cards scrolling past; each card's photo drifts inside its frame.
 */
export default function LabComposition({ projects }) {
  const cards = LAB_COMPOSITION.photos
    .map(([key, i]) => {
      const project = projects.find((p) => p.key === key);
      const shot = project?.images.gallery[i];
      return shot && { key, src: shot.src, title: project.title };
    })
    .filter(Boolean);

  return (
    <section className="lab-comp" aria-label="Composition">
      <div className="lab-comp-lines" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="lab-comp-heading">
        <Caption>{LAB_COMPOSITION.caption}</Caption>
        <SplitHeading lines={LAB_COMPOSITION.title} className="lab-h2" />
      </div>

      <div className="lab-comp-text lab-comp-text-right">
        <p className="lab-body" data-lab-text="body">{LAB_COMPOSITION.right}</p>
      </div>
      <div className="lab-comp-text lab-comp-text-left">
        <p className="lab-body" data-lab-text="body">{LAB_COMPOSITION.left}</p>
      </div>

      {cards.map((card, i) => (
        <Link
          key={card.src}
          to={`/project/${card.key}`}
          className={`lab-comp-card lab-comp-card-${i} lab-wipe`}
          aria-label={`View project: ${card.title}`}
        >
          <span className="lab-comp-card-img" data-lab-parallax>
            <img src={card.src} alt="" loading="lazy" />
          </span>
          <span className="lab-comp-card-view" aria-hidden="true">View</span>
        </Link>
      ))}
    </section>
  );
}
