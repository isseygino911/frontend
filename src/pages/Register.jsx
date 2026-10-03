import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/auth.css';

/**
 * Register page — same dark brutalist aesthetic as Login.
 * Validates name, password length (>=8), and password confirmation match.
 */
export default function Register() {
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm]   = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const { register, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect already-authenticated users
  if (!authLoading && user) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }

    if (name.trim().length > 100) {
      setError('Name must be 100 characters or fewer.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await register(name.trim(), email, password);
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" aria-hidden="true" />

      <div className="auth-card">
        <Link to="/" className="auth-wordmark" aria-label="II Design — Home">
          II DESIGN
        </Link>

        <h1 className="auth-heading">Create Account.</h1>
        <p className="auth-subheading">
          Join the studio.
        </p>

        <div className="auth-divider" />

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} aria-label="Create account form" noValidate>
          <div className="auth-form-group">
            <label className="auth-label" htmlFor="reg-name">
              Name
            </label>
            <input
              className="auth-input"
              type="text"
              id="reg-name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              maxLength={100}
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="reg-email">
              Email
            </label>
            <input
              className="auth-input"
              type="email"
              id="reg-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="studio@domain.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="reg-password">
              Password
            </label>
            <input
              className="auth-input"
              type="password"
              id="reg-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              autoComplete="new-password"
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="reg-confirm">
              Confirm Password
            </label>
            <input
              className="auth-input"
              type="password"
              id="reg-confirm"
              name="confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat password"
              autoComplete="new-password"
              required
            />
          </div>

          <button
            className="btn-primary auth-submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating…' : 'Create Account'}{' '}
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="auth-footer-link">
          Already have an account?{' '}
          <Link to="/login">Sign in →</Link>
        </p>
      </div>
    </div>
  );
}
