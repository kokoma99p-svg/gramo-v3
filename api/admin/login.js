import { setCors, sendError } from '../_cors.js';
import { createAdminToken, verifyPassword } from '../_auth.js';

export default function handler(req, res) {
  if (setCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    if (!verifyPassword(req)) return sendError(res, 401, 'Invalid admin password.');
    return res.status(200).json({ ok: true, token: createAdminToken() });
  } catch (error) {
    console.error('admin login error', error);
    return sendError(res, 500, 'Admin login failed.');
  }
}
