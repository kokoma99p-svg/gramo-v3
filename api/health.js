import { setCors } from './_cors.js';

export default function handler(req, res) {
  if (setCors(req, res)) return;
  return res.status(200).json({
    ok: true,
    app: 'GRAMO',
    environment: process.env.VERCEL_ENV || 'local'
  });
}
