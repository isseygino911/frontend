import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/nav.css';

const NAV_ITEMS = [
  { label: 'Atelier',    path: '/' },
  { label: 'Archive',    path: '/archive' },
  { label: 'Philosophy', path: '/philosophy' },
  { label: 'Contact',    path: '/contact' },
];

/**
 * Fixed top bar + full-screen slide-down menu for mobile (<= 900px).
 * Closes automatically on route changes.
 */
export default function MobileNav() {
  const [open, setOpen]     = useState(false);
  const location            = useLocation();
  const { user, logout }    = useAuth();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  function toggleMenu() {
    setOpen((prev) => !prev);
  }

  async function handleLogout() {
    await logout();
    setOpen(false);
  }

  return (
    <>
      <div id="mobile-bar" role="banner">
        <Link id="mobile-logo" to="/" aria-label="II Design — Home">
          II DESIGN
        </Link>
        <button
          id="hamburger"
          className={open ? 'open' : ''}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={open ? 'open' : ''}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <ul role="list">
          {NAV_ITEMS.map(({ label, path }) => (
            <li key={path}>
              <Link
                to={path}
                className="mobile-nav-item"
                tabIndex={open ? 0 : -1}
              >
                {label}
              </Link>
            </li>
          ))}
          {user ? (
            <li>
              <button
                className="mobile-nav-item"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={handleLogout}
                tabIndex={open ? 0 : -1}
              >
                Sign Out
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="mobile-nav-item"
                tabIndex={open ? 0 : -1}
              >
                Sign In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
