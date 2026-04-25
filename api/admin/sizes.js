import { setCors, sendError } from '../_cors.js';
import { requireAdmin } from '../_auth.js';
import { getSupabaseAdmin } from '../_supabaseAdmin.js';
import { listTable, createRow, updateRow, deleteRow, bool, num } from '../_crudHelpers.js';

function normalize(body) {
  return {
    name: body.name || '',
    category_slug: body.category_slug || 'salad',
    grams: num(body.grams, 0),
    base_price: num(body.base_price, 0),
    is_enabled: bool(body.is_enabled, true),
    display_order: num(body.display_order, 0)
  };
}

export default async function handler(req, res) {
  if (setCors(req, res)) return;
  if (!requireAdmin(req, res)) return;

  try {
    const supabase = getSupabaseAdmin();
    if (req.method === 'GET') return listTable(req, res, supabase, 'sizes', 'display_order');
    if (req.method === 'POST') return createRow(req, res, supabase, 'sizes', normalize);
    if (req.method === 'PUT') return updateRow(req, res, supabase, 'sizes', normalize);
    if (req.method === 'DELETE') return deleteRow(req, res, supabase, 'sizes');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('admin sizes error', error);
    return sendError(res, 500, 'Admin sizes request failed.', error.message);
  }
}
