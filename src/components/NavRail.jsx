import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/nav.css';

const NAV_ITEMS = [
  { label: 'Atelier',    path: '/',           auth: false },
  { label: 'Archive',    path: '/archive',    auth: false },
  { label: 'Philosophy', path: '/philosophy', auth: false },
  { label: 'Contact',    path: '/contact',    auth: false },
  { label: 'Dashboard',  path: '/dashboard',  auth: true  },
];

/**
 * Fixed vertical navigation rail displayed on desktop (>900px).
 * Shows the studio logo, main nav links, social icons, and an
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
        II&nbsp;DESIGN
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

      <div id="nav-social" aria-label="Social links">
        <a href="#" aria-label="Instagram (coming soon)" aria-disabled="true" className="nav-social-icon-wrap" onClick={(e) => e.preventDefault()}>
          <svg
            className="nav-social-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <a href="#" aria-label="LinkedIn (coming soon)" aria-disabled="true" className="nav-social-icon-wrap" onClick={(e) => e.preventDefault()}>
          <svg
            className="nav-social-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </a>
        <a href="#" aria-label="Behance (coming soon)" aria-disabled="true" className="nav-social-icon-wrap" onClick={(e) => e.preventDefault()}>
          <svg
            className="nav-social-icon"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.726-3h3.608c-.12-1.97-1.32-2.44-1.80-2.44-1.07 0-1.655.57-1.808 2.44zM8 11c.065 2.79-2.396 4-4.5 4H0V5h3.5C5.604 5 8 6.21 7.935 9c0 .8-.202 1.45-.6 1.96.558.41.665.89.665 2.04zm-2.46 0c0-1.1-.897-1.5-2.04-1.5H2v3h1.5c1.143 0 2.04-.4 2.04-1.5zM6 8.5C6 7.4 5.1 7 4 7H2v3h2c1.1 0 2-.4 2-1.5z" />
          </svg>
        </a>
      </div>

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
