import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import NavRail from './components/NavRail.jsx';
import MobileNav from './components/MobileNav.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Archive from './pages/Archive.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Philosophy from './pages/Philosophy.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Tools from './pages/Tools.jsx';
import Lab from './pages/Lab.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import BrandLogo from './components/BrandLogo.jsx';

/**
 * Renders a page-loader overlay that fades out once fonts/DOM are ready.
 */
function PageLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-loader${loaded ? ' loaded' : ''}`} aria-hidden="true">
      <div className="loader-logo">
        <BrandLogo variant="stacked" className="loader-logo-inner" />
      </div>
    </div>
  );
}

/**
 * Scrolls to top on every route change.
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** Routes that render their own header and full-bleed layout, without the site nav. */
const BARE_ROUTES = ['/'];

/**
 * Global nav, progress bar and the routed content.
 * Bare routes drop the nav chrome and the rail margin on #app.
 */
function AppShell() {
  const { pathname } = useLocation();
  const bare = BARE_ROUTES.includes(pathname);

  return (
    <>
      {!bare && (
        <>
          <ScrollProgress />
          <NavRail />
          <MobileNav />
        </>
      )}
      <ScrollToTop />
      <div id="app" className={bare ? 'app-bare' : undefined}>
        <Routes>
          <Route path="/"              element={<Lab />} />
          <Route path="/archive"       element={<Archive />} />
          <Route path="/project/:key"  element={<ProjectDetail />} />
          <Route path="/philosophy"    element={<Philosophy />} />
          <Route path="/contact"       element={<Contact />} />
          <Route path="/tools"         element={<Tools />} />
          <Route path="/login"         element={<Login />} />
          <Route path="/register"      element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

/**
 * Root application component.
 * AppShell keeps NavRail and MobileNav outside the route-specific content
 * so they persist across route transitions.
 */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageLoader />
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  );
}
