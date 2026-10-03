import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, logoutUser, getMe, refreshToken } from '../services/authAPI.js';

const AuthContext = createContext(null);

/**
 * Provides authentication state and actions to the entire app.
 * Token transport is purely via httpOnly cookies — no token stored in JS state.
 */
export function AuthProvider({ children }) {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * On mount: try a silent refresh to restore the session,
   * then fetch the user profile via the refreshed access token cookie.
   */
  useEffect(() => {
    (async () => {
      try {
        await refreshToken();        // sets new accessToken cookie
        const profile = await getMe(); // reads cookie automatically
        setUser(profile.user);
      } catch {
        // No valid session — that is fine
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await loginUser({ email, password });
    // Access token is now in httpOnly cookie — just store the user profile
    setUser(data.user);
    return data;
  }, []);

  const register = useCallback(async (name, email, password) => {
    const data = await registerUser({ name, email, password });
    setUser(data.user);
    return data;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // Ignore errors — clear local state regardless
    }
    setUser(null);
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
