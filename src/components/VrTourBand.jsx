const ARCHIVE_TOUR = {
  code: 'MX-10',
  title: 'Lion Forest Single House',
  badge: '360° Virtual Tour',
  hint: 'Drag to look around · Tour interface is in Chinese',
  url: 'https://vr.justeasy.cn/view/17su8o487o44y461-1791684467.html',
  cover: '/projects/mx-10/tour-cover.jpg',
};

export default function VrTourBand() {
  const { code, title, badge, hint, url, cover } = ARCHIVE_TOUR;
  const linkProps = { href: url, target: '_blank', rel: 'noopener noreferrer' };

  return (
    <section className="archive-tour" aria-labelledby="archive-tour-title" data-animate="fade-up">
      <div className="archive-tour__head">
        <div>
          <p className="archive-tour__eyebrow">
            <span className="archive-tour__code">{code}</span>
            <span className="archive-tour__badge">{badge}</span>
          </p>
          <h2 id="archive-tour-title" className="archive-tour__title">{title}</h2>
          <p className="archive-tour__hint">{hint}</p>
        </div>
        <a className="archive-tour__open" {...linkProps}>
          Open full tour <span aria-hidden="true">↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>

      {/* Duplicate of the button above for pointer users; hidden from keyboard/AT. */}
      <a className="archive-tour__frame" tabIndex={-1} aria-hidden="true" {...linkProps}>
        <img className="archive-tour__cover" src={cover} alt="" />
        <span className="archive-tour__enter">
          <span className="archive-tour__enter-icon">360°</span>
          Enter the tour
        </span>
      </a>
    </section>
  );
}
