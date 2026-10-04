import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LAB_APPROACH, LAB_STATS } from '../../data/labContent.js';
import { Caption, SplitHeading, SplitWords } from './LabText.jsx';
import LineArt from './LineArt.jsx';

const pad = (n) => String(n).padStart(2, '0');

/**
 * Long pinned scene: manifesto intro, a horizontal track of half-width panels,
 * then the stats block that slides up over the track. The motion hook scrubs the
 * track and dispatches `lab:stats-active` with the card index for the scroll position.
 */
export default function LabApproach({ projects }) {
  const statsRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const el = statsRef.current;
    const onActive = (e) => setActiveCard(e.detail);
    el.addEventListener('lab:stats-active', onActive);
    return () => el.removeEventListener('lab:stats-active', onActive);
  }, []);

  const stats = [
    { label: 'Projects', value: projects.length },
    { label: 'Hotels', value: projects.filter((p) => p.type === 'Hotel').length },
    { label: 'Offices', value: projects.filter((p) => p.type === 'Office').length },
    { label: 'Locations', value: new Set(projects.map((p) => p.location)).size },
  ];

  return (
    <div className="lab-approach" data-lab-approach>
      <section className="lab-approach-stage" aria-label="Manifesto">
        <div className="lab-approach-intro">
          <Caption>{LAB_APPROACH.caption}</Caption>
          <SplitHeading lines={LAB_APPROACH.lines} className="lab-h2" />
          <LineArt variant="corridor" className="lab-approach-sketch lab-approach-sketch-left" />
          <LineArt variant="volumes" className="lab-approach-sketch lab-approach-sketch-right" />
        </div>

        <div className="lab-approach-track" data-lab-track>
          {LAB_APPROACH.panels.map((panel, i) => (
            <article key={panel.title} className={`lab-panel ${i % 2 ? 'is-dark' : 'is-light'}`} data-lab-panel>
              <div className="lab-panel-head">
                <Caption className="lab-caption-index">{pad(i + 1)}</Caption>
                <SplitHeading as="h3" lines={[panel.title]} className="lab-h2" mode="fill" />
              </div>
              <div className={`lab-panel-media lab-panel-media-${panel.images.length > 1 ? 'grid' : 'single'}`}>
                {panel.images.map((src) => (
                  <img key={src} src={src} alt="" loading="lazy" />
                ))}
              </div>
              <SplitWords text={panel.body} className="lab-body lab-panel-body" />
            </article>
          ))}
          <div className="lab-panel is-dark lab-panel-spacer" aria-hidden="true" />
        </div>
      </section>

      <div className="lab-stats-wrap">
        <section className="lab-stats" aria-label="Portfolio in numbers" ref={statsRef} data-lab-stats>
          <div className="lab-stats-heading">
            <Caption>{LAB_STATS.caption}</Caption>
            <SplitHeading lines={[LAB_STATS.title]} className="lab-h2" />
          </div>
          <ul className="lab-stats-cards">
            {stats.map((s, i) => (
              <li
                key={s.label}
                className={`lab-stat${i === activeCard ? ' is-active' : ''}`}
                onMouseEnter={() => setActiveCard(i)}
              >
                <img className="lab-stat-img" src={LAB_STATS.images[i]} alt="" loading="lazy" />
                <p className="lab-stat-label">{s.label}</p>
                <p className="lab-stat-num" data-lab-count={s.value}>{s.value}</p>
              </li>
            ))}
          </ul>
          <div className="lab-stats-text">
            {LAB_STATS.body.map((t) => (
              <p key={t} className="lab-body lab-muted" data-lab-text="body">{t}</p>
            ))}
            <Link to="/archive" className="lab-btn">View Archive</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
