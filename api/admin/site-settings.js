import { setCors, parseJsonBody, sendError } from '../_cors.js';
import { requireAdmin } from '../_auth.js';
import { getSupabaseAdmin } from '../_supabaseAdmin.js';

export default async function handler(req, res) {
  if (setCors(req, res)) return;
  if (!requireAdmin(req, res)) return;

  try {
    const supabase = getSupabaseAdmin();

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('site_settings')
        .select('settings')
        .eq('id', 'global')
        .maybeSingle();
      if (error) throw error;
      return res.status(200).json({ settings: data?.settings || {} });
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      const body = parseJsonBody(req);
      const settings = body.settings || body;
      const { data, error } = await supabase
        .from('site_settings')
        .upsert({ id: 'global', settings, updated_at: new Date().toISOString() }, { onConflict: 'id' })
        .select()
        .single();
      if (error) throw error;
      return res.status(200).json({ ok: true, settings: data.settings });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('admin site settings error', error);
    return sendError(res, 500, 'Could not save site settings.', error.message);
  }
}
