import { setCors, sendError } from '../_cors.js';
import { requireAdmin } from '../_auth.js';
import { getSupabaseAdmin } from '../_supabaseAdmin.js';
import { listTable, createRow, updateRow, deleteRow, bool, num } from '../_crudHelpers.js';

function normalize(body) {
  return {
    name: body.name || '',
    slug: body.slug || String(body.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    description: body.description || '',
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
    if (req.method === 'GET') return listTable(req, res, supabase, 'categories', 'display_order');
    if (req.method === 'POST') return createRow(req, res, supabase, 'categories', normalize);
    if (req.method === 'PUT') return updateRow(req, res, supabase, 'categories', normalize);
    if (req.method === 'DELETE') return deleteRow(req, res, supabase, 'categories');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('admin categories error', error);
    return sendError(res, 500, 'Admin categories request failed.', error.message);
  }
}
