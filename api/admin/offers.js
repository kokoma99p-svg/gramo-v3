import { setCors, sendError } from '../_cors.js';
import { requireAdmin } from '../_auth.js';
import { getSupabaseAdmin } from '../_supabaseAdmin.js';
import { listTable, createRow, updateRow, deleteRow, bool, num } from '../_crudHelpers.js';

function normalize(body) {
  return {
    title: body.title || '',
    description: body.description || '',
    promo_code: body.promo_code || null,
    discount_type: body.discount_type || 'percent',
    discount_value: num(body.discount_value, 0),
    starts_at: body.starts_at || null,
    ends_at: body.ends_at || null,
    image_url: body.image_url || null,
    is_enabled: bool(body.is_enabled, true),
    display_order: num(body.display_order, 0)
  };
}

export default async function handler(req, res) {
  if (setCors(req, res)) return;
  if (!requireAdmin(req, res)) return;

  try {
    const supabase = getSupabaseAdmin();
    if (req.method === 'GET') return listTable(req, res, supabase, 'offers', 'display_order');
    if (req.method === 'POST') return createRow(req, res, supabase, 'offers', normalize);
    if (req.method === 'PUT') return updateRow(req, res, supabase, 'offers', normalize);
    if (req.method === 'DELETE') return deleteRow(req, res, supabase, 'offers');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('admin offers error', error);
    return sendError(res, 500, 'Admin offers request failed.', error.message);
  }
}
