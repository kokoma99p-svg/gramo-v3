import { setCors, parseJsonBody, sendError } from '../_cors.js';
import { requireAdmin } from '../_auth.js';
import { getSupabaseAdmin } from '../_supabaseAdmin.js';

export default async function handler(req, res) {
  if (setCors(req, res)) return;
  if (!requireAdmin(req, res)) return;

  try {
    const supabase = getSupabaseAdmin();
    if (req.method === 'GET') {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json({ items: data || [] });
    }
    if (req.method === 'PUT') {
      const body = parseJsonBody(req);
      if (!body.id) return sendError(res, 400, 'Missing id.');
      const { data, error } = await supabase.from('orders').update({ status: body.status || 'new' }).eq('id', body.id).select().single();
      if (error) throw error;
      return res.status(200).json({ ok: true, item: data });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('admin orders error', error);
    return sendError(res, 500, 'Admin orders request failed.', error.message);
  }
}
