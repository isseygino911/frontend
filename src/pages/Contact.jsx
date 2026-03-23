import { useState } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll.js';
import axios from 'axios';
import '../styles/contact.css';

/**
 * Contact / Commission page.
 * The enquiry form posts to /api/contact.
 */
export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', projectType: '', brief: '' });
  const [submitting, setSub]  = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  useAnimateOnScroll();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSub(true);
    setError('');
    try {
      await axios.post('/api/contact', form);
      setSuccess(true);
      setForm({ name: '', email: '', projectType: '', brief: '' });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSub(false);
    }
  }

  return (
    <div id="page-contact">
      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="contact-hero" aria-label="Contact hero">
        <div className="contact-hero-bg" aria-hidden="true">
          <div className="art-contact-bg" />
        </div>
        <div className="contact-hero-content">
          <p className="section-label" data-animate="from-left">
            Commission
          </p>
          <h1 className="contact-headline">
            Begin the
            <br />
            <span className="stroke">Dialogue.</span>
          </h1>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────── */}
      <div className="contact-body">
        {/* Form section */}
        <div className="contact-form-section" data-animate="from-left">
          <h2>New Enquiry</h2>

          {success && (
            <div className="form-success">
              Enquiry received. We will be in touch.
            </div>
          )}

          <form onSubmit={handleSubmit} aria-label="Contact form">
            <div className="form-group">
              <label className="form-label" htmlFor="f-name">Name</label>
              <input
                className="form-input"
                type="text"
                id="f-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                autoComplete="name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="f-email">Email</label>
              <input
                className="form-input"
                type="email"
                id="f-email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="studio@domain.com"
                autoComplete="email"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="f-type">Project Type</label>
              <input
                className="form-input"
                type="text"
                id="f-type"
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
                placeholder="Residential / Cultural / Hospitality…"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="f-brief">Brief</label>
              <textarea
                className="form-textarea"
                id="f-brief"
                name="brief"
                value={form.brief}
                onChange={handleChange}
                placeholder="Describe your spatial ambition…"
                rows={5}
              />
            </div>

            {error && <p style={{ color: '#e35050', fontSize: '12px', marginBottom: '12px' }}>{error}</p>}

            <button
              className="btn-primary form-submit-btn"
              type="submit"
              disabled={submitting}
            >
              {submitting ? 'Sending…' : 'Send Enquiry'}{' '}
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>

        {/* Info section */}
        <div className="contact-info-section" data-animate="from-right">
          <h2>Studio</h2>

          <div className="contact-details">
            <div className="contact-detail">
              <span className="contact-detail-label">Address</span>
              <span className="contact-detail-value">
                Schönhauser Allee 36
                <br />
                10435 Berlin, Germany
              </span>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Email</span>
              <a
                className="contact-detail-value"
                href="mailto:studio@iidesign.com"
              >
                studio@iidesign.com
              </a>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">New Business</span>
              <a
                className="contact-detail-value"
                href="mailto:projects@iidesign.com"
              >
                projects@iidesign.com
              </a>
            </div>
            <div className="contact-detail">
              <span className="contact-detail-label">Press</span>
              <a
                className="contact-detail-value"
                href="mailto:press@iidesign.com"
              >
                press@iidesign.com
              </a>
            </div>
          </div>

          <div className="studio-hours">
            <h3>Studio Hours</h3>
            <div className="hours-line">
              <span>Monday — Thursday</span>
              <span>09:00 — 18:00</span>
            </div>
            <div className="hours-line">
              <span>Friday</span>
              <span>09:00 — 16:00</span>
            </div>
            <div className="hours-line">
              <span>Saturday — Sunday</span>
              <span>By appointment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-bottom-text">
          © 2024 II Design Studio. All rights reserved.
        </span>
        <span className="footer-bottom-text">
          Berlin · Tokyo · Paris · Oslo
        </span>
      </div>
    </div>
  );
}
