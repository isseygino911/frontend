// Shared axios client so the request goes to API_BASE, not the frontend host
import { client } from './authAPI.js';

/**
 * Submit a commission enquiry.
 * @param {{ name: string, email: string, projectType?: string, brief: string }} data
 */
export async function sendEnquiry(data) {
  const res = await client.post('/contact', data);
  return res.data;
}
