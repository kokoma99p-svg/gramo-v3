import { setCors } from '../_cors.js';
import { getSupabaseAdmin } from '../_supabaseAdmin.js';

export default async function handler(req, res) {
  if (setCors(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const supabase = getSupabaseAdmin();
    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from('offers')
      .select('*')
      .eq('is_enabled', true)
      .or(`starts_at.is.null,starts_at.lte.${now}`)
      .or(`ends_at.is.null,ends_at.gte.${now}`)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return res.status(200).json({ offers: data || [] });
  } catch (error) {
    console.error('public offers error', error);
    return res.status(500).json({ error: 'Could not load offers.' });
  }
}
