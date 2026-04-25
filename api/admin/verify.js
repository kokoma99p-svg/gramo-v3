import { setCors } from '../_cors.js';
import { requireAdmin } from '../_auth.js';

export default function handler(req, res) {
  if (setCors(req, res)) return;
  if (!requireAdmin(req, res)) return;
  return res.status(200).json({ ok: true });
}
