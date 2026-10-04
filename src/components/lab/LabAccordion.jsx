import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LAB_INDEX } from '../../data/labContent.js';
import { Caption, SplitHeading } from './LabText.jsx';

/** Centred heading and an A–Z accordion of every project; "Show more" reveals the rest. */
export default function LabAccordion({ projects }) {
  const [openKey, setOpenKey] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const sorted = [...projects].sort((a, b) => a.title.localeCompare(b.title));
  const visible = showAll ? sorted : sorted.slice(0, LAB_INDEX.initial);

  return (
    <section className="lab-index" aria-label="Projects A–Z">
      <div className="lab-index-heading">
        <Caption>{LAB_INDEX.caption}</Caption>
        <SplitHeading lines={[LAB_INDEX.title]} className="lab-h2" />
      </div>
      <ul className="lab-index-list">
        {visible.map((p) => {
          const open = openKey === p.key;
          const panelId = `lab-index-${p.key}`;
          return (
            <li key={p.key} className={`lab-index-item${open ? ' is-open' : ''}`}>
              <h3 className="lab-index-q">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={panelId}
                  onClick={() => setOpenKey(open ? null : p.key)}
                >
                  <span>{p.title}</span>
                  <span className="lab-index-chevron" aria-hidden="true" />
                </button>
              </h3>
              <div id={panelId} className="lab-index-a">
                <div className="lab-index-a-inner">
                  <p className="lab-body lab-muted">{p.desc2} {p.location}.</p>
                  <Link to={`/project/${p.key}`} className="lab-card-cta">View Project</Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {!showAll && sorted.length > LAB_INDEX.initial && (
        <button type="button" className="lab-btn lab-btn-muted lab-index-more" onClick={() => setShowAll(true)}>
          Show more
        </button>
      )}
    </section>
  );
}
