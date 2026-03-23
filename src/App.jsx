import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import NavRail from './components/NavRail.jsx';
import MobileNav from './components/MobileNav.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Home from './pages/Home.jsx';
import Archive from './pages/Archive.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Philosophy from './pages/Philosophy.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

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
        <span className="loader-logo-inner">II DESIGN</span>
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

/**
 * Root application component.
 * NavRail and MobileNav are rendered outside the route-specific content
 * so they persist across route transitions.
 */
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageLoader />
        <ScrollProgress />
        <NavRail />
        <MobileNav />
        <ScrollToTop />
        <div id="app">
          <Routes>
            <Route path="/"              element={<Home />} />
            <Route path="/archive"       element={<Archive />} />
            <Route path="/project/:key"  element={<ProjectDetail />} />
            <Route path="/philosophy"    element={<Philosophy />} />
            <Route path="/contact"       element={<Contact />} />
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
      </BrowserRouter>
    </AuthProvider>
  );
}
