import { setCors } from '../_cors.js';
import { getSupabaseAdmin } from '../_supabaseAdmin.js';

export default async function handler(req, res) {
  if (setCors(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('is_enabled', true)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return res.status(200).json({ categories: data || [] });
  } catch (error) {
    console.error('public categories error', error);
    return res.status(500).json({ error: 'Could not load categories.' });
  }
}
