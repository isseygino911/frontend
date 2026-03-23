import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/auth.css';

/**
 * Login page — dark brutalist aesthetic matching the design system.
 * Bottom-border ghost input style, ochre primary button.
 */
export default function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Redirect already-authenticated users
  if (!authLoading && user) return <Navigate to="/" replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      const msg = err?.response?.data?.message || 'Invalid credentials. Please try again.';
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

        <h1 className="auth-heading">Welcome back.</h1>
        <p className="auth-subheading">
          Sign in to your studio account.
        </p>

        <div className="auth-divider" />

        {error && (
          <div className="auth-error" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} aria-label="Sign in form" noValidate>
          <div className="auth-form-group">
            <label className="auth-label" htmlFor="login-email">
              Email
            </label>
            <input
              className="auth-input"
              type="email"
              id="login-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="studio@domain.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="login-password">
              Password
            </label>
            <input
              className="auth-input"
              type="password"
              id="login-password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            className="btn-primary auth-submit-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing in…' : 'Sign In'}{' '}
            <span aria-hidden="true">→</span>
          </button>
        </form>

        <p className="auth-footer-link">
          No account?{' '}
          <Link to="/register">Create one →</Link>
        </p>
      </div>
    </div>
  );
}
