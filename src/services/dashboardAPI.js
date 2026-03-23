import axios from 'axios';
import { API_BASE } from '../config/api.js';

const client = axios.create({
  baseURL:         API_BASE,
  withCredentials: true,
});

// Auto-refresh on 401 — same pattern as authAPI.js
client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    const status   = err.response?.status;
    const isRefreshCall = original?.url?.includes('/auth/refresh');

    if (status === 429) {
      return Promise.reject(new Error('Too many requests, please slow down and try again.'));
    }

    if (status === 401 && !original._retry && !isRefreshCall) {
      original._retry = true;
      try {
        await client.post('/auth/refresh');
        return client(original);
      } catch {
        // Refresh failed — let caller handle 401
      }
    }
    return Promise.reject(err);
  }
);

/**
 * Fetch the full dashboard payload.
 * @returns {{ data: { profile, accountStats, portfolioStats } }}
 */
export async function getDashboard() {
  const res = await client.get('/dashboard');
  return res.data;
}

/**
 * Update profile name and/or email.
 * @param {{ name?: string, email?: string }} data
 */
export async function updateProfile(data) {
  const res = await client.patch('/dashboard/profile', data);
  return res.data;
}

/**
 * Change the authenticated user's password.
 * @param {{ currentPassword: string, newPassword: string }} data
 */
export async function changePassword(data) {
  const res = await client.patch('/dashboard/password', data);
  return res.data;
}
