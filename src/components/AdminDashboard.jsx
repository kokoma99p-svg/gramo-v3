import { useEffect, useState } from 'react';
import { apiSend, clearAdminToken, getAdminToken } from '../lib/api.js';
import { defaultSettings } from '../lib/fallbackData.js';
import { applyTheme } from '../lib/theme.js';
import AdminCrudTable from './AdminCrudTable.jsx';
import AdminImageField from './AdminImageField.jsx';
import AdminLayout from './AdminLayout.jsx';

const tabs = [
  { id: 'settings', label: 'Site settings' },
  { id: 'offers', label: 'Offers' },
  { id: 'categories', label: 'Categories' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'orders', label: 'Orders' },
  { id: 'reservations', label: 'Reservations' }
];

const offerFields = [
  { name: 'title', label: 'Title' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'promo_code', label: 'Promo code' },
  { name: 'discount_type', label: 'Discount type', type: 'select', options: ['percent', 'fixed'] },
  { name: 'discount_value', label: 'Discount value', type: 'number' },
  { name: 'starts_at', label: 'Start date/time', type: 'datetime-local' },
  { name: 'ends_at', label: 'End date/time', type: 'datetime-local' },
  { name: 'image_url', label: 'Offer image URL', type: 'image' },
  { name: 'display_order', label: 'Display order', type: 'number' },
  { name: 'is_enabled', label: 'Visible', type: 'checkbox', defaultValue: true }
];

const categoryFields = [
  { name: 'name', label: 'Name' },
  { name: 'slug', label: 'Slug' },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'image_url', label: 'Category image URL', type: 'image' },
  { name: 'display_order', label: 'Display order', type: 'number' },
  { name: 'is_enabled', label: 'Visible', type: 'checkbox', defaultValue: true }
];

const ingredientFields = [
  { name: 'name', label: 'Name' },
  { name: 'type', label: 'Type', type: 'select', options: ['base', 'protein', 'topping', 'sauce', 'supplement'] },
  { name: 'category_slug', label: 'Category slug' },
  { name: 'price_per_gram', label: 'Price per gram', type: 'number' },
  { name: 'calories_per_gram', label: 'Calories per gram', type: 'number' },
  { name: 'default_grams', label: 'Default grams', type: 'number' },
  { name: 'min_grams', label: 'Min grams', type: 'number' },
  { name: 'max_grams', label: 'Max grams', type: 'number' },
  { name: 'image_url', label: 'Ingredient image URL', type: 'image' },
  { name: 'display_order', label: 'Display order', type: 'number' },
  { name: 'is_available', label: 'Available', type: 'checkbox', defaultValue: true }
];

const sizeFields = [
  { name: 'name', label: 'Size name' },
  { name: 'category_slug', label: 'Category slug' },
  { name: 'grams', label: 'Grams/ml', type: 'number' },
  { name: 'base_price', label: 'Base price', type: 'number' },
  { name: 'display_order', label: 'Display order', type: 'number' },
  { name: 'is_enabled', label: 'Enabled', type: 'checkbox', defaultValue: true }
];

function AdminSettings({ token, settings, onSettingsSaved }) {
  const [form, setForm] = useState({ ...defaultSettings, ...settings, theme: { ...defaultSettings.theme, ...(settings.theme || {}) } });
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  function update(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }

  function updateTheme(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, theme: { ...current.theme, [name]: value } }));
  }

  function updateSlots(event) {
    const slots = event.target.value.split(',').map((slot) => slot.trim()).filter(Boolean);
    setForm((current) => ({ ...current, reservationSlots: slots }));
  }

  async function save(event) {
    event.preventDefault();
    setNotice('');
    setError('');
    try {
      const saved = await apiSend('/api/admin/site-settings', { settings: form }, 'PUT', token);
      onSettingsSaved(saved.settings);
      applyTheme(saved.settings);
      setNotice('Site settings saved and applied.');
    } catch (err) {
      setError(err.message);
    }
  }

  const colorFields = [
    ['primaryColor', 'Primary'],
    ['secondaryColor', 'Secondary'],
    ['accentColor', 'Accent'],
    ['buttonColor', 'Buttons'],
    ['selectedColor', 'Selected states'],
    ['announcementColor', 'Announcement'],
    ['backgroundColor', 'Background'],
    ['cardColor', 'Cards'],
    ['textColor', 'Text'],
    ['mutedTextColor', 'Muted text']
  ];

  return (
    <section className="admin-panel-card">
      <h2>Website control</h2>
      <form className="admin-form" onSubmit={save}>
        <div className="admin-form-grid">
          <label>Restaurant name<input name="restaurantName" value={form.restaurantName || ''} onChange={update} /></label>
          <label>Logo text<input name="logoText" value={form.logoText || ''} onChange={update} /></label>
          <label>Slogan<input name="slogan" value={form.slogan || ''} onChange={update} /></label>
          <AdminImageField name="logoUrl" label="Logo URL" value={form.logoUrl || ''} onChange={update} />
          <label>Hero title<input name="heroTitle" value={form.heroTitle || ''} onChange={update} /></label>
          <label>Hero subtitle<textarea name="heroSubtitle" value={form.heroSubtitle || ''} onChange={update} /></label>
          <AdminImageField name="heroImageUrl" label="Hero image URL" value={form.heroImageUrl || ''} onChange={update} />
          <label>Order CTA<input name="orderCtaText" value={form.orderCtaText || ''} onChange={update} /></label>
          <label>Reservation CTA<input name="reservationCtaText" value={form.reservationCtaText || ''} onChange={update} /></label>
          <label>Announcement<textarea name="announcementText" value={form.announcementText || ''} onChange={update} /></label>
          <label>Footer text<textarea name="footerText" value={form.footerText || ''} onChange={update} /></label>
          <label>Address<input name="address" value={form.address || ''} onChange={update} /></label>
          <label>Phone<input name="phone" value={form.phone || ''} onChange={update} /></label>
          <label>Email<input name="email" value={form.email || ''} onChange={update} /></label>
          <label>WhatsApp<input name="whatsapp" value={form.whatsapp || ''} onChange={update} /></label>
          <label>Opening hours<input name="openingHours" value={form.openingHours || ''} onChange={update} /></label>
          <label>Delivery fee<input type="number" name="deliveryFee" value={form.deliveryFee || 0} onChange={update} /></label>
          <label>Min order<input type="number" name="minOrder" value={form.minOrder || 0} onChange={update} /></label>
          <label>Prep time<input name="prepTimeText" value={form.prepTimeText || ''} onChange={update} /></label>
          <label>Service area<input name="serviceAreaText" value={form.serviceAreaText || ''} onChange={update} /></label>
          <label>Reservation slots comma separated<input value={(form.reservationSlots || []).join(', ')} onChange={updateSlots} /></label>
          <label>Min guests<input type="number" name="minGuests" value={form.minGuests || 1} onChange={update} /></label>
          <label>Max guests<input type="number" name="maxGuests" value={form.maxGuests || 12} onChange={update} /></label>
        </div>

        <h3>Section visibility and services</h3>
        <div className="toggle-grid">
          {['showHero','showOffers','showCategories','showInfoStrip','showReservationSection','showFooter','orderingEnabled','deliveryEnabled','pickupEnabled','reservationsEnabled'].map((name) => (
            <label className="checkbox-label" key={name}><input type="checkbox" name={name} checked={form[name] !== false} onChange={update} />{name}</label>
          ))}
        </div>

        <h3>Color system</h3>
        <div className="color-grid">
          {colorFields.map(([name, label]) => (
            <label key={name}>{label}<input type="color" name={name} value={form.theme?.[name] || defaultSettings.theme[name]} onChange={updateTheme} /></label>
          ))}
        </div>

        {error && <p className="form-error">{error}</p>}
        {notice && <p className="form-success">{notice}</p>}
        <button className="btn btn-primary">Save settings</button>
      </form>
    </section>
  );
}

function RecordsPanel({ token, endpoint, title }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  async function load() {
    const response = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not load records');
    setItems(data.items || []);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, [endpoint]);

  async function updateStatus(id, status) {
    await apiSend(endpoint, { id, status }, 'PUT', token);
    await load();
  }

  return (
    <section className="admin-panel-card">
      <h2>{title}</h2>
      {error && <p className="form-error">{error}</p>}
      <div className="admin-list">
        {items.map((item) => (
          <article className="admin-list-row wide" key={item.id}>
            <div>
              <strong>{item.customer_name || item.name || item.id}</strong>
              <small>{item.customer_phone || item.phone || ''} - {item.status}</small>
              <pre>{JSON.stringify(item.items || item.message || item, null, 2)}</pre>
            </div>
            <div className="admin-row-actions">
              <button className="btn btn-ghost" onClick={() => updateStatus(item.id, 'confirmed')}>Confirm</button>
              <button className="btn btn-danger" onClick={() => updateStatus(item.id, 'cancelled')}>Cancel</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function AdminDashboard({ settings, onSettingsSaved, navigate }) {
  const [activeTab, setActiveTab] = useState('settings');
  const [token, setToken] = useState(getAdminToken());

  useEffect(() => {
    if (!token) navigate('/admin');
  }, [token, navigate]);

  function logout() {
    clearAdminToken();
    setToken('');
    navigate('/admin');
  }

  const content = (() => {
    if (activeTab === 'settings') return <AdminSettings token={token} settings={settings} onSettingsSaved={onSettingsSaved} />;
    if (activeTab === 'offers') return <AdminCrudTable token={token} title="Offers" endpoint="/api/admin/offers" fields={offerFields} />;
    if (activeTab === 'categories') return <AdminCrudTable token={token} title="Categories" endpoint="/api/admin/categories" fields={categoryFields} />;
    if (activeTab === 'ingredients') return <AdminCrudTable token={token} title="Ingredients" endpoint="/api/admin/ingredients" fields={ingredientFields} />;
    if (activeTab === 'sizes') return <AdminCrudTable token={token} title="Sizes" endpoint="/api/admin/sizes" fields={sizeFields} />;
    if (activeTab === 'orders') return <RecordsPanel token={token} title="Orders" endpoint="/api/admin/orders" />;
    if (activeTab === 'reservations') return <RecordsPanel token={token} title="Reservations" endpoint="/api/admin/reservations" />;
    return null;
  })();

  return (
    <AdminLayout tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={logout}>
      {content}
    </AdminLayout>
  );
}
