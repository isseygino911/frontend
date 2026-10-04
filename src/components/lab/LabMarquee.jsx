import { LAB_MARQUEE } from '../../data/labContent.js';
import { Caption, SplitHeading } from './LabText.jsx';

/** Caption + heading, then an endless row of project names (rendered twice for a seamless loop). */
export default function LabMarquee({ projects }) {
  const names = projects.map((p) => p.title);
  return (
    <section className="lab-marquee" aria-label="Project index">
      <div className="lab-marquee-heading">
        <Caption>{LAB_MARQUEE.caption}</Caption>
        <SplitHeading lines={[LAB_MARQUEE.title]} className="lab-h2" />
      </div>
      <div className="lab-marquee-row">
        {[0, 1].map((copy) => (
          <ul className="lab-marquee-list" key={copy} aria-hidden={copy === 1 || undefined}>
            {names.map((name) => <li key={name}>{name}</li>)}
          </ul>
        ))}
      </div>
    </section>
  );
}
