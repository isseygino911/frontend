import axios from 'axios';
import { API_BASE } from '../config/api.js';

const client = axios.create({
  baseURL:         API_BASE,
  withCredentials: true, // send httpOnly cookies on every request
});

// Auto-refresh on 401 — retry the original request once after refreshing
client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        await client.post('/auth/refresh');
        return client(original);
      } catch {
        // Refresh failed — let the caller handle the 401
      }
    }
    return Promise.reject(err);
  }
);

/**
 * Register a new account.
 * @param {{ email: string, password: string }} data
 */
export async function registerUser(data) {
  const res = await client.post('/auth/register', data);
  return res.data;
}

/**
 * Log in with email and password.
 * @param {{ email: string, password: string }} data
 */
export async function loginUser(data) {
  const res = await client.post('/auth/login', data);
  return res.data;
}

/**
 * Log out the current user.
 */
export async function logoutUser() {
  const res = await client.post('/auth/logout');
  return res.data;
}

/**
 * Fetch the current authenticated user profile.
 * Relies on the httpOnly accessToken cookie — no Authorization header needed.
 */
export async function getMe() {
  const res = await client.get('/auth/me');
  return res.data;
}

/**
 * Exchange the stored refresh token cookie for a new access token cookie.
 */
export async function refreshToken() {
  const res = await client.post('/auth/refresh');
  return res.data;
}
