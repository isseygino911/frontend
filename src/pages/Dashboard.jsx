import { useState, useEffect, useRef, useCallback, Component } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll.js';
import { getDashboard, updateProfile, changePassword } from '../services/dashboardAPI.js';
import '../styles/dashboard.css';

/* =========================================================
   ERROR BOUNDARY (Bug 6)
========================================================= */
class DashboardErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <main className="dashboard-page">
          <div className="dash-error">
            <h1 className="dash-error-title">Something went wrong</h1>
            <p className="dash-error-msg">An unexpected error occurred. Please refresh the page.</p>
          </div>
        </main>
      );
    }
    return this.props.children;
  }
}

/* =========================================================
   SMALL HELPERS
========================================================= */

/** Formats an ISO date string as "Month YYYY" */
function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  } catch {
    return iso;
  }
}


/* =========================================================
   PORTFOLIO BREAKDOWN ROW
========================================================= */
function BreakdownRow({ type, count, max, delay }) {
  const fillRef = useRef(null);
  const ratio = max > 0 ? count / max : 0;

  // Trigger bar fill once the row is visible — animate to the proportional ratio (Bug 7)
  useEffect(() => {
    const el = fillRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transform = `scaleX(${ratio})`;
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el.parentElement);
    return () => observer.disconnect();
  }, [ratio, delay]);

  return (
    <div className="dash-breakdown-row" data-animate style={{ transitionDelay: `${delay}ms` }}>
      <span className="dash-breakdown-type">{type}</span>
      <div className="dash-breakdown-bar-track">
        <div className="dash-breakdown-bar-fill" ref={fillRef} />
      </div>
      <span className="dash-breakdown-count">{count}</span>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */
function StatCard({ label, value, sub, accent, delay, loading }) {
  return (
    <div
      className="dash-stat"
      data-animate
      style={{ transitionDelay: `${delay}ms` }}
    >
      {loading ? (
        <>
          <div className="dash-skeleton dash-stat-skel-label" />
          <div className="dash-skeleton dash-stat-skel-val" />
          <div className="dash-skeleton dash-stat-skel-sub" />
        </>
      ) : (
        <>
          <div className="dash-stat-label">{label}</div>
          <div className={`dash-stat-value${accent ? ' accent' : ''}`}>{value}</div>
          {sub && <div className="dash-stat-sub">{sub}</div>}
        </>
      )}
    </div>
  );
}

/* =========================================================
   PROFILE FORM
========================================================= */
function ProfileForm({ profile, onSaved }) {
  const [name,   setName]   = useState(profile?.name  ?? '');
  const [email,  setEmail]  = useState(profile?.email ?? '');
  const [busy,   setBusy]   = useState(false);
  const [fb,     setFb]     = useState({ msg: '', kind: '' }); // kind: 'success'|'error'

  // Sync if profile changes externally
  useEffect(() => {
    if (profile) {
      setName(profile.name  ?? '');
      setEmail(profile.email ?? '');
    }
  }, [profile]);

  const showFeedback = useCallback((msg, kind) => {
    setFb({ msg, kind });
    setTimeout(() => setFb({ msg: '', kind: '' }), 4000);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      await updateProfile({ name: name.trim(), email: email.trim() });
      showFeedback('Profile updated.', 'success');
      onSaved?.({ name: name.trim(), email: email.trim() });
    } catch (err) {
      const msg = err.response?.data?.message ?? err.message ?? 'Update failed.';
      showFeedback(msg, 'error');
    } finally {
      setBusy(false);
    }
  }

  const dirty = name !== (profile?.name ?? '') || email !== (profile?.email ?? '');

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={`dash-feedback ${fb.kind} ${fb.msg ? 'visible' : ''}`} aria-live="polite">
        {fb.msg}
      </div>

      <div className="dash-form-group">
        <label className="dash-label" htmlFor="dash-name">Display Name</label>
        <input
          id="dash-name"
          type="text"
          className="dash-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          disabled={busy}
          autoComplete="name"
        />
      </div>

      <div className="dash-form-group">
        <label className="dash-label" htmlFor="dash-email">Email Address</label>
        <input
          id="dash-email"
          type="email"
          className="dash-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          disabled={busy}
          autoComplete="email"
        />
      </div>

      <div className="dash-form-actions">
        <button
          type="submit"
          className="dash-btn-save"
          disabled={busy || !dirty}
          aria-label="Save profile changes"
        >
          {busy ? <span className="dash-btn-spinner" aria-hidden="true" /> : null}
          {busy ? 'Saving' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

/* =========================================================
   PASSWORD FORM
========================================================= */
function PasswordForm() {
  const [current, setCurrent] = useState('');
  const [next,    setNext]    = useState('');
  const [busy,    setBusy]    = useState(false);
  const [fb,      setFb]      = useState({ msg: '', kind: '' });

  const showFeedback = useCallback((msg, kind) => {
    setFb({ msg, kind });
    setTimeout(() => setFb({ msg: '', kind: '' }), 4500);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (busy) return;
    if (next.length < 8) {
      showFeedback('New password must be at least 8 characters.', 'error');
      return;
    }
    setBusy(true);
    try {
      await changePassword({ currentPassword: current, newPassword: next });
      showFeedback('Password changed successfully.', 'success');
      setCurrent('');
      setNext('');
    } catch (err) {
      const msg = err.response?.data?.message ?? err.message ?? 'Password change failed.';
      showFeedback(msg, 'error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={`dash-feedback ${fb.kind} ${fb.msg ? 'visible' : ''}`} aria-live="polite">
        {fb.msg}
      </div>

      <div className="dash-form-group">
        <label className="dash-label" htmlFor="dash-current-pw">Current Password</label>
        <input
          id="dash-current-pw"
          type="password"
          className="dash-input"
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          placeholder="••••••••"
          disabled={busy}
          autoComplete="current-password"
        />
      </div>

      <div className="dash-form-group">
        <label className="dash-label" htmlFor="dash-new-pw">New Password</label>
        <input
          id="dash-new-pw"
          type="password"
          className="dash-input"
          value={next}
          onChange={(e) => setNext(e.target.value)}
          placeholder="Min. 8 characters"
          disabled={busy}
          autoComplete="new-password"
        />
      </div>

      <div className="dash-form-actions">
        <button
          type="submit"
          className="dash-btn-save"
          disabled={busy || !current || !next}
          aria-label="Change password"
        >
          {busy ? <span className="dash-btn-spinner" aria-hidden="true" /> : null}
          {busy ? 'Updating' : 'Change Password'}
        </button>
      </div>
    </form>
  );
}

/* =========================================================
   MAIN DASHBOARD PAGE
========================================================= */
function DashboardInner() {
  const { user } = useAuth();

  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  // Local profile state so edits reflect immediately
  const [profile, setProfile] = useState(null);

  useAnimateOnScroll();

  useEffect(() => {
    let cancelled = false;

    async function fetchDashboard() {
      try {
        const res = await getDashboard();
        if (!cancelled) {
          setData(res.data);
          setProfile(res.data?.profile ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.response?.data?.message ?? err.message ?? 'Failed to load dashboard.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDashboard();
    return () => { cancelled = true; };
  }, []);

  // When user edits profile, merge into local state
  function handleProfileSaved(patch) {
    setProfile((prev) => ({ ...prev, ...patch }));
  }

  /* ---- Derived values ---------------------------------- */
  const accountStats   = data?.accountStats   ?? {};
  const portfolioStats = data?.portfolioStats ?? {};
  const isAdmin        = profile?.role === 'admin'; // Bug 1: server response only, never client JWT state
  const displayName    = profile?.name || user?.name || user?.email?.split('@')[0] || 'Studio';

  // Build breakdown array sorted descending
  const typeEntries = Object.entries(portfolioStats.projectsByType ?? {})
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);

  const maxCount = typeEntries.length ? typeEntries[0].count : 1;

  /* ---- Loading full-page state (Bug 9: role+aria-live) -- */
  if (loading) {
    return (
      <div className="dashboard-page dash-loading" role="status" aria-live="polite">
        <div className="dash-loading-inner">
          <span>Loading</span>
        </div>
      </div>
    );
  }

  /* ---- Error state (Bug 10: <main> landmark, safe msg) -- */
  if (error) {
    return (
      <main className="dashboard-page">
        <div className="dash-error">
          <h1 className="dash-error-title">Unavailable</h1>
          <p className="dash-error-msg">Unable to load your dashboard. Please try again later.</p>
        </div>
      </main>
    );
  }

  /* ---- Main render ------------------------------------- */
  return (
    <div className="dashboard-page">

      {/* ── Header (Bug 11: <section> not <header> to avoid duplicate banner landmark) */}
      <section className="dash-header" aria-label="Account overview">
        <div className="dash-header-inner">
          <div className="dash-section-label" data-animate>Account</div>

          <h1 className="dash-welcome" data-animate style={{ transitionDelay: '0.06s' }}>
            Welcome,{' '}
            <em>{displayName}</em>
          </h1>

          <div data-animate style={{ transitionDelay: '0.13s' }}>
            <span className={`dash-role-badge${isAdmin ? ' admin' : ''}`}>
              {isAdmin ? 'Administrator' : 'Member'}
            </span>
          </div>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────── */}
      <div className="dash-body">

        {/* ── Forms ───────────────────────────────────── */}
        <section className="dash-forms-section" aria-label="Account settings">

          {/* Profile */}
          <div className="dash-form-panel" data-animate="from-left">
            <h2 className="dash-form-title">Edit Profile</h2>
            <p className="dash-form-desc">
              Update your display name or email address. Changes take effect immediately.
            </p>
            <ProfileForm profile={profile} onSaved={handleProfileSaved} />
          </div>

          {/* Password */}
          <div className="dash-form-panel" data-animate="from-right">
            <h2 className="dash-form-title">Change Password</h2>
            <p className="dash-form-desc">
              Enter your current password and choose a new one. Minimum 8 characters.
            </p>
            <PasswordForm />
          </div>

        </section>

      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardErrorBoundary>
      <DashboardInner />
    </DashboardErrorBoundary>
  );
}
