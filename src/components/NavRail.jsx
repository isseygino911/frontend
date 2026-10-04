import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import BrandLogo from './BrandLogo.jsx';
import '../styles/nav.css';

const NAV_ITEMS = [
  { label: 'Home',       path: '/',           auth: false },
  { label: 'Archive',    path: '/archive',    auth: false },
  { label: 'Philosophy', path: '/philosophy', auth: false },
  { label: 'Contact',    path: '/contact',    auth: false },
  { label: 'Tools',      path: '/tools',      auth: false },
  { label: 'Dashboard',  path: '/dashboard',  auth: true  },
];

/**
 * Fixed vertical navigation rail displayed on desktop (>900px).
 * Shows the studio logo, main nav links, and an
 * auth section (user email + logout, or Sign In link).
 */
export default function NavRail() {
  const location = useLocation();
  const { user, logout } = useAuth();

  function isActive(path) {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }

  return (
    <nav id="nav-rail" role="navigation" aria-label="Main navigation">
      <Link id="nav-logo" to="/" aria-label="II Design — Home">
        <BrandLogo variant="mark" />
      </Link>

      <ul id="nav-items" role="list">
        {NAV_ITEMS.filter(({ auth }) => !auth || !!user).map(({ label, path }) => (
          <li key={path}>
            <Link
              to={path}
              className={`nav-item${isActive(path) ? ' active' : ''}`}
              aria-current={isActive(path) ? 'page' : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="nav-user-section">
        {user ? (
          <>
            <span className="nav-user-email" title={user.email}>
              {user.email}
            </span>
            <button
              className="nav-logout-btn"
              onClick={logout}
              aria-label="Sign out"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-signin-link">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
