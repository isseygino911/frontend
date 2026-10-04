import { LAB_DELIVERY } from '../../data/labContent.js';
import { Caption, SplitHeading } from './LabText.jsx';

const pad = (n) => String(n).padStart(2, '0');

/** Lead text left, caption + heading right, then numbered rows with a photo that warms to colour. */
export default function LabDelivery() {
  return (
    <section className="lab-delivery" aria-label="How we work">
      <div className="lab-delivery-top">
        <p className="lab-body lab-muted lab-delivery-lead" data-lab-text="body">{LAB_DELIVERY.lead}</p>
        <div className="lab-delivery-heading">
          <Caption>{LAB_DELIVERY.caption}</Caption>
          <SplitHeading lines={LAB_DELIVERY.title} className="lab-h2" />
        </div>
      </div>

      <ol className="lab-delivery-rows">
        {LAB_DELIVERY.rows.map((row, i) => (
          <li className="lab-delivery-row" key={row.title} data-lab-warm>
            <figure className="lab-delivery-photo lab-wipe">
              <img src={row.image} alt="" loading="lazy" />
            </figure>
            <div className="lab-delivery-copy">
              <Caption className="lab-caption-index">{pad(i + 1)}</Caption>
              <div>
                <h3 className="lab-h4" data-lab-text="body">{row.title}</h3>
                <p className="lab-body lab-muted" data-lab-text="body">{row.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
