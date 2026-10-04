import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LAB_SLIDER } from '../../data/labContent.js';

const AUTOPLAY_MS = 5000;
const pad = (n) => String(n).padStart(2, '0');

/** Signed distance from the active slide, wrapped to the shortest direction. */
function offsetOf(i, active, n) {
  let d = (i - active + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

/**
 * Pinned project slider. The motion hook scales the stage in on scroll and
 * dispatches `lab:slider-unlock` / `lab:slider-lock` on the section, which
 * start and stop autoplay. Without motion it renders as a swipeable card row.
 */
export default function LabSlider({ projects }) {
  const sectionRef = useRef(null);
  const prevOffsets = useRef([]);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  const slides = LAB_SLIDER.keys
    .map((key) => projects.find((p) => p.key === key))
    .filter(Boolean);
  const n = slides.length;

  const go = (step) => setActive((a) => (a + step + n) % n);

  useEffect(() => {
    const el = sectionRef.current;
    const unlock = () => setPlaying(true);
    const lock = () => {
      setPlaying(false);
      setActive(0);
    };
    el.addEventListener('lab:slider-unlock', unlock);
    el.addEventListener('lab:slider-lock', lock);
    return () => {
      el.removeEventListener('lab:slider-unlock', unlock);
      el.removeEventListener('lab:slider-lock', lock);
    };
  }, []);

  useEffect(() => {
    if (!playing || n < 2) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % n), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [playing, n, active]);

  const offsets = slides.map((_, i) => offsetOf(i, active, n));
  const jumps = offsets.map((o, i) => Math.abs(o - (prevOffsets.current[i] ?? o)) > 1);
  useEffect(() => {
    prevOffsets.current = offsets;
  });

  const current = slides[active];

  return (
    <section className="lab-slider" aria-label="Selected projects" ref={sectionRef} data-lab-slider>
      <div className="lab-slider-stage">
        <div className="lab-slider-back lab-slider-back-2" aria-hidden="true" />
        <div className="lab-slider-back lab-slider-back-1" aria-hidden="true" />

        <div className="lab-slider-track" aria-roledescription="carousel">
          {slides.map((p, i) => (
            <article
              key={p.key}
              className={`lab-slide${i === active ? ' is-active' : ''}${jumps[i] ? ' is-jump' : ''}`}
              style={{ '--offset': offsets[i] }}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}`}
            >
              <div className="lab-slide-frame">
                <img src={p.images.hero} alt={p.title} loading={i === 0 ? 'eager' : 'lazy'} />
                <div className="lab-slide-overlay" aria-hidden="true" />
              </div>
              <p className="lab-slide-number" aria-hidden="true">
                {pad(i + 1)}<span className="lab-slide-number-slash">/</span><small>{pad(n)}</small>
              </p>
              <div className="lab-slide-head">
                <h3 className="lab-slide-title">{p.title}</h3>
              </div>
              <dl className="lab-slide-meta">
                <div><dt>Type</dt><dd>{p.type}</dd></div>
                <div><dt>Spaces</dt><dd>{new Set(p.images.gallery.map((g) => g.label)).size}</dd></div>
                <div><dt>Location</dt><dd>{p.location}</dd></div>
              </dl>
              <Link to={`/project/${p.key}`} className="lab-btn lab-btn-light lab-slide-link">View Project</Link>
            </article>
          ))}
        </div>

        <div className="lab-slider-tools">
          <button type="button" className="lab-arrow lab-arrow-prev" aria-label="Previous project" onClick={() => go(-1)} />
          <button type="button" className="lab-arrow lab-arrow-next" aria-label="Next project" onClick={() => go(1)} />
        </div>
        <p className="lab-sr-only" aria-live="polite">{`${pad(active + 1)} / ${pad(n)}`}</p>

        <div className="lab-slider-footer">
          <Link to={`/project/${current.key}`} className="lab-btn lab-slider-cta-main">View Project</Link>
          <Link to="/archive" className="lab-btn lab-btn-light">View All Projects</Link>
        </div>
      </div>
    </section>
  );
}
