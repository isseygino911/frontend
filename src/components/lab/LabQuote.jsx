import { Link } from 'react-router-dom';
import { LAB_QUOTE, LAB_STUDIO } from '../../data/labContent.js';

/** Three-part studio card: greyscale photo, script quote box, dark contact card. */
export default function LabQuote() {
  return (
    <section className="lab-quote" aria-label="Studio">
      <figure className="lab-quote-photo">
        <img src={LAB_QUOTE.image} alt="" loading="lazy" />
      </figure>
      <figure className="lab-quote-box">
        <blockquote className="lab-quote-text" data-lab-text="body">{LAB_QUOTE.quote}</blockquote>
        <figcaption className="lab-quote-sign">
          <span className="lab-quote-name">{LAB_QUOTE.name}</span>
          <span className="lab-quote-role">{LAB_QUOTE.role}</span>
        </figcaption>
      </figure>
      <div className="lab-quote-card">
        <p className="lab-body lab-muted">{LAB_QUOTE.body}</p>
        <dl className="lab-quote-details">
          <div><dt>Email</dt><dd><a href={`mailto:${LAB_STUDIO.email}`}>{LAB_STUDIO.email}</a></dd></div>
          <div><dt>Location</dt><dd>{LAB_STUDIO.location}</dd></div>
        </dl>
        <Link to="/contact" className="lab-btn lab-btn-light">Start a Project</Link>
      </div>
    </section>
  );
}
