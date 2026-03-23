// Shared axios client (with auth interceptors) from authAPI — single source of truth (Bug 4)
import { client } from './authAPI.js';

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
