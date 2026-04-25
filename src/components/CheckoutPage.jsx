import { useMemo, useState } from 'react';
import { apiSend } from '../lib/api.js';

export default function CheckoutPage({ cart, settings, clearCart, navigate }) {
  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    orderType: settings.pickupEnabled !== false ? 'pickup' : 'delivery',
    address: '',
    notes: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0), [cart]);
  const totalCalories = useMemo(() => cart.reduce((sum, item) => sum + Number(item.totalCalories || 0), 0), [cart]);
  const deliveryFee = form.orderType === 'delivery' ? Number(settings.deliveryFee || 0) : 0;
  const totalPrice = subtotal + deliveryFee;

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus('loading');
    setError('');

    try {
      await apiSend('/api/orders', {
        ...form,
        items: cart,
        subtotal,
        deliveryFee,
        totalPrice,
        totalCalories
      });
      clearCart();
      navigate('/confirmation?type=order');
    } catch (err) {
      setError(err.message);
      setStatus('idle');
    }
  }

  if (cart.length === 0) {
    return (
      <main className="page-main">
        <section className="section narrow-section empty-state">
          <h1>No items to checkout.</h1>
          <button className="btn btn-primary" onClick={() => navigate('/configurator')}>Build your meal</button>
        </section>
      </main>
    );
  }

  return (
    <main className="page-main">
      <section className="section narrow-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Checkout</p>
            <h1>Confirm your order.</h1>
          </div>
        </div>
        <form className="form-card checkout-form" onSubmit={submit}>
          <div className="form-grid">
            <label>Name<input name="customerName" value={form.customerName} onChange={update} required /></label>
            <label>Phone<input name="customerPhone" value={form.customerPhone} onChange={update} required /></label>
            <label>Email<input type="email" name="customerEmail" value={form.customerEmail} onChange={update} /></label>
            <label>Order type
              <select name="orderType" value={form.orderType} onChange={update}>
                {settings.pickupEnabled !== false && <option value="pickup">Pickup</option>}
                {settings.deliveryEnabled !== false && <option value="delivery">Delivery</option>}
              </select>
            </label>
            {form.orderType === 'delivery' && <label className="form-wide">Address<input name="address" value={form.address} onChange={update} required /></label>}
            <label className="form-wide">Order notes<textarea name="notes" value={form.notes} onChange={update} /></label>
          </div>
          <div className="checkout-summary embedded">
            <div><span>Subtotal</span><strong>{subtotal.toFixed(2)} MAD</strong></div>
            <div><span>Delivery</span><strong>{deliveryFee.toFixed(2)} MAD</strong></div>
            <div><span>Total</span><strong>{totalPrice.toFixed(2)} MAD</strong></div>
            <div><span>Calories</span><strong>{totalCalories} kcal</strong></div>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-primary full" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending order...' : 'Place order'}
          </button>
        </form>
      </section>
    </main>
  );
}
