import { setCors } from '../_cors.js';
import { getSupabaseAdmin } from '../_supabaseAdmin.js';

export default async function handler(req, res) {
  if (setCors(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('site_settings')
      .select('settings')
      .eq('id', 'global')
      .maybeSingle();

    if (error) throw error;
    return res.status(200).json({ settings: data?.settings || {} });
  } catch (error) {
    console.error('public site settings error', error);
    return res.status(500).json({ error: 'Could not load site settings.' });
  }
}
