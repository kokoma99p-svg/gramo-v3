import { useState } from 'react';
import { apiSend } from '../lib/api.js';

export default function ReservationPage({ settings, navigate }) {
  const slots = settings.reservationSlots || [];
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: slots[0] || '',
    guests: settings.minGuests || 1,
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await apiSend('/api/reservations', form);
      navigate('/confirmation?type=reservation');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  }

  return (
    <main className="page-main reservation-page">
      <section className="section narrow-section">
        <div className="reservation-hero soft-panel">
          <p className="eyebrow">Reservations</p>
          <h1>Book a table at GRAMO.</h1>
          <p>{settings.address} - {settings.openingHours}</p>
        </div>

        <form className="form-card" onSubmit={submit}>
          <div className="form-grid">
            <label>Name<input name="name" value={form.name} onChange={update} required /></label>
            <label>Phone<input name="phone" value={form.phone} onChange={update} required /></label>
            <label>Email<input type="email" name="email" value={form.email} onChange={update} /></label>
            <label>Date<input type="date" name="date" value={form.date} onChange={update} required /></label>
            <label>Time
              <select name="time" value={form.time} onChange={update} required>
                {slots.map((slot) => <option value={slot} key={slot}>{slot}</option>)}
              </select>
            </label>
            <label>Guests
              <input type="number" min={settings.minGuests || 1} max={settings.maxGuests || 12} name="guests" value={form.guests} onChange={update} required />
            </label>
            <label className="form-wide">Message<textarea name="message" value={form.message} onChange={update} /></label>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-primary full" disabled={settings.reservationsEnabled === false || status === 'loading'}>
            {status === 'loading' ? 'Sending reservation...' : 'Reserve table'}
          </button>
        </form>
      </section>
    </main>
  );
}
