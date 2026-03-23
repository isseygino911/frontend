import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll.js';
import '../styles/philosophy.css';

/**
 * Philosophy page — stroke headline, three tenets, pull quote.
 */
export default function Philosophy() {
  useAnimateOnScroll();

  const tenets = [
    {
      num:   '01',
      title: ['Chromatic', 'Silence'],
      art:   'art-tenet-1',
      body: [
        'Colour is not decoration. It is the temperature of a room, the emotional register of a threshold. Our palette begins with the earth — raw umber, volcanic grey, the pale gold of winter light on limestone.',
        'We do not add colour. We reveal it. The concrete takes its tone from the aggregate. The render carries the memory of its mixing. Nothing is applied; everything is inherent.',
      ],
    },
    {
      num:   '02',
      title: ['Form', 'Follows', 'Weight'],
      art:   'art-tenet-2',
      body: [
        'Sullivan said form follows function. We say form follows weight — the psychological mass of a wall, the tectonic honesty of a joint, the way a room announces its structure without apology.',
        'We do not dress the structure. The structure is the architecture. A beam is not concealed; it is the room\'s autobiography. An aperture is not a window; it is a proposal about light.',
      ],
    },
    {
      num:   '03',
      title: ['The', 'Human Void'],
      art:   'art-tenet-3',
      body: [
        'Every space we design contains a void proportioned to the human body — a negative volume that holds the person without enclosing them. The void is not emptiness; it is the architecture\'s most essential gesture.',
        'We measure success not by what is built but by what is preserved — the silence between walls, the air between surfaces, the pause between the architecture and its inhabitant.',
      ],
    },
  ];

  return (
    <div id="page-philosophy">
      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="philosophy-hero" aria-label="Philosophy hero">
        <div className="philosophy-hero-bg" aria-hidden="true" />

        <div className="philosophy-hero-content">
          <p className="section-label" data-animate="from-left">
            Our Conviction
          </p>
          <h1 className="philosophy-headline">
            <span className="stroke" data-animate="from-left">ORGANIC</span>
            <span className="stroke-primary" data-animate="from-left">BRUTAL</span>
            <span className="stroke" data-animate="from-left">ISM</span>
          </h1>
        </div>

        <div className="philosophy-intro" data-animate>
          <p>
            We build from the tension between the natural and the constructed —
            spaces that breathe through their contradictions, that find silence
            in the weight of material, and meaning in the geometry of restraint.
          </p>
        </div>
      </div>

      {/* ── Tenets ────────────────────────────────────────── */}
      <div className="tenets-section">
        {tenets.map((t) => (
          <div key={t.num} className="tenet" data-animate>
            <div className="tenet-number">{t.num}</div>
            <div>
              <h2 className="tenet-title">
                {t.title.map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < t.title.length - 1 && <br />}
                  </span>
                ))}
              </h2>
              <div className={`tenet-art ${t.art}`} />
            </div>
            <div className="tenet-body">
              {t.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Pull quote ────────────────────────────────────── */}
      <div className="pull-quote" data-animate>
        <blockquote className="pull-quote-text">
          "The most honest material is the one that{' '}
          <span className="highlight">refuses to pretend</span> it is something
          other than what it is."
        </blockquote>
        <p className="pull-quote-attr">— II Design, Manifesto — 2019</p>
      </div>

      <div className="footer-bottom">
        <span className="footer-bottom-text">
          © 2024 II Design Studio. All rights reserved.
        </span>
        <span className="footer-bottom-text">
          Philosophy — Organic Brutalism
        </span>
      </div>
    </div>
  );
}
