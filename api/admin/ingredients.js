import { setCors, sendError } from '../_cors.js';
import { requireAdmin } from '../_auth.js';
import { getSupabaseAdmin } from '../_supabaseAdmin.js';
import { listTable, createRow, updateRow, deleteRow, bool, num } from '../_crudHelpers.js';

function normalize(body) {
  return {
    name: body.name || '',
    type: body.type || 'topping',
    category_slug: body.category_slug || 'salad',
    price_per_gram: num(body.price_per_gram, 0),
    calories_per_gram: num(body.calories_per_gram, 0),
    default_grams: num(body.default_grams, 0),
    min_grams: num(body.min_grams, 0),
    max_grams: num(body.max_grams, 250),
    image_url: body.image_url || null,
    is_available: bool(body.is_available, true),
    display_order: num(body.display_order, 0)
  };
}

export default async function handler(req, res) {
  if (setCors(req, res)) return;
  if (!requireAdmin(req, res)) return;

  try {
    const supabase = getSupabaseAdmin();
    if (req.method === 'GET') return listTable(req, res, supabase, 'ingredients', 'display_order');
    if (req.method === 'POST') return createRow(req, res, supabase, 'ingredients', normalize);
    if (req.method === 'PUT') return updateRow(req, res, supabase, 'ingredients', normalize);
    if (req.method === 'DELETE') return deleteRow(req, res, supabase, 'ingredients');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('admin ingredients error', error);
    return sendError(res, 500, 'Admin ingredients request failed.', error.message);
  }
}
