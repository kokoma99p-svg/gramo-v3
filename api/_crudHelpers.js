import { parseJsonBody, sendError } from './_cors.js';

export async function listTable(req, res, supabase, table, orderColumn = 'created_at') {
  let query = supabase.from(table).select('*');
  if (orderColumn) query = query.order(orderColumn, { ascending: orderColumn === 'display_order' });
  const { data, error } = await query;
  if (error) throw error;
  return res.status(200).json({ items: data || [] });
}

export async function createRow(req, res, supabase, table, normalize) {
  const body = parseJsonBody(req);
  const payload = normalize ? normalize(body) : body;
  const { data, error } = await supabase.from(table).insert(payload).select().single();
  if (error) throw error;
  return res.status(200).json({ ok: true, item: data });
}

export async function updateRow(req, res, supabase, table, normalize) {
  const body = parseJsonBody(req);
  const id = body.id || req.query?.id;
  if (!id) return sendError(res, 400, 'Missing id.');
  const payload = normalize ? normalize(body) : body;
  delete payload.id;
  const { data, error } = await supabase.from(table).update(payload).eq('id', id).select().single();
  if (error) throw error;
  return res.status(200).json({ ok: true, item: data });
}

export async function deleteRow(req, res, supabase, table) {
  const body = parseJsonBody(req);
  const id = req.query?.id || body.id;
  if (!id) return sendError(res, 400, 'Missing id.');
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
  return res.status(200).json({ ok: true });
}

export function bool(value, fallback = false) {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return fallback;
}

export function num(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
