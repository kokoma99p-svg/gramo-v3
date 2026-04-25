import { Resend } from 'resend';
import { setCors, parseJsonBody, escapeHtml, sendError } from './_cors.js';
import { getSupabaseAdmin } from './_supabaseAdmin.js';

function getResend() {
  return process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
}

export default async function handler(req, res) {
  if (setCors(req, res)) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = parseJsonBody(req);
    const {
      customerName,
      customerPhone,
      customerEmail,
      orderType,
      address,
      items,
      subtotal,
      deliveryFee,
      totalPrice,
      totalCalories,
      notes
    } = body;

    if (!customerName || !customerPhone || !Array.isArray(items) || items.length === 0) {
      return sendError(res, 400, 'Missing required order fields.');
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('orders')
      .insert({
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail || null,
        order_type: orderType || 'pickup',
        address: address || null,
        items,
        subtotal: Number(subtotal || 0),
        delivery_fee: Number(deliveryFee || 0),
        total_price: Number(totalPrice || 0),
        total_calories: Number(totalCalories || 0),
        notes: notes || null,
        status: 'new'
      })
      .select()
      .single();

    if (error) throw error;

    const resend = getResend();
    if (resend && process.env.ADMIN_EMAIL) {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'GRAMO <onboarding@resend.dev>',
        to: process.env.ADMIN_EMAIL,
        subject: 'New GRAMO order',
        html: `
          <h2>New GRAMO Order</h2>
          <p><strong>Name:</strong> ${escapeHtml(customerName)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(customerPhone)}</p>
          <p><strong>Order type:</strong> ${escapeHtml(orderType || 'pickup')}</p>
          <p><strong>Total:</strong> ${escapeHtml(totalPrice)} MAD</p>
          <p><strong>Calories:</strong> ${escapeHtml(totalCalories)} kcal</p>
        `
      });
    }

    return res.status(200).json({ ok: true, order: data });
  } catch (error) {
    console.error('order api error', error);
    return sendError(res, 500, 'Could not create order.', error.message);
  }
}
