import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import BrandLogo from './BrandLogo.jsx';

/**
 * Wraps a route and redirects unauthenticated users to /login.
 *
 * @param {{ children: React.ReactNode }} props
 */
export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="brand-splash">
        <BrandLogo variant="stacked" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
