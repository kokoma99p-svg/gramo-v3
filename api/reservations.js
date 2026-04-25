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
    const { name, phone, email, date, time, guests, message } = body;

    if (!name || !phone || !date || !time || !guests) {
      return sendError(res, 400, 'Missing required reservation fields.');
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('reservations')
      .insert({
        name,
        phone,
        email: email || null,
        reservation_date: date,
        reservation_time: time,
        guests: Number(guests),
        message: message || null,
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
        subject: 'New GRAMO reservation',
        html: `
          <h2>New GRAMO Reservation</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
          <p><strong>Date:</strong> ${escapeHtml(date)}</p>
          <p><strong>Time:</strong> ${escapeHtml(time)}</p>
          <p><strong>Guests:</strong> ${escapeHtml(guests)}</p>
        `
      });
    }

    return res.status(200).json({ ok: true, reservation: data });
  } catch (error) {
    console.error('reservation api error', error);
    return sendError(res, 500, 'Could not create reservation.', error.message);
  }
}
