import { useState } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll.js';
import { sendEnquiry } from '../services/contactAPI.js';
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
      await sendEnquiry(form);
      setSuccess(true);
      setForm({ name: '', email: '', projectType: '', brief: '' });
    } catch (err) {
      setError(err?.response?.data?.message || 'Something went wrong. Please try again.');
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
        <div className="contact-form-section" data-animate>
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
