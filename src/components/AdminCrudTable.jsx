import { useEffect, useState } from 'react';
import { apiSend } from '../lib/api.js';
import AdminImageField from './AdminImageField.jsx';

function emptyFromFields(fields) {
  return fields.reduce((acc, field) => {
    acc[field.name] = field.defaultValue ?? (field.type === 'checkbox' ? true : '');
    return acc;
  }, {});
}

export default function AdminCrudTable({ token, title, endpoint, fields }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyFromFields(fields));
  const [editingId, setEditingId] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function load() {
    const response = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Could not load data');
    setItems(data.items || []);
  }

  useEffect(() => {
    load().catch((err) => setError(err.message));
  }, [endpoint, token]);

  function update(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }

  function startEdit(item) {
    setEditingId(item.id);
    setForm({ ...emptyFromFields(fields), ...item });
    setNotice('');
  }

  function reset() {
    setEditingId('');
    setForm(emptyFromFields(fields));
  }

  async function submit(event) {
    event.preventDefault();
    setError('');
    setNotice('');
    try {
      await apiSend(endpoint, { ...form, id: editingId }, editingId ? 'PUT' : 'POST', token);
      await load();
      reset();
      setNotice('Saved.');
    } catch (err) {
      setError(err.message);
    }
  }

  async function remove(id) {
    setError('');
    try {
      await apiSend(`${endpoint}?id=${encodeURIComponent(id)}`, {}, 'DELETE', token);
      await load();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="admin-panel-card">
      <div className="admin-panel-heading">
        <h2>{title}</h2>
        <button className="btn btn-ghost" onClick={reset}>New</button>
      </div>
      <form className="admin-form" onSubmit={submit}>
        <div className="admin-form-grid">
          {fields.map((field) => {
            if (field.type === 'image') {
              return <AdminImageField key={field.name} name={field.name} label={field.label} value={form[field.name]} onChange={update} />;
            }
            if (field.type === 'textarea') {
              return <label key={field.name}>{field.label}<textarea name={field.name} value={form[field.name] || ''} onChange={update} /></label>;
            }
            if (field.type === 'checkbox') {
              return <label key={field.name} className="checkbox-label"><input type="checkbox" name={field.name} checked={Boolean(form[field.name])} onChange={update} />{field.label}</label>;
            }
            if (field.type === 'select') {
              return (
                <label key={field.name}>{field.label}
                  <select name={field.name} value={form[field.name] || ''} onChange={update}>
                    {(field.options || []).map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
              );
            }
            return <label key={field.name}>{field.label}<input type={field.type || 'text'} name={field.name} value={form[field.name] ?? ''} onChange={update} /></label>;
          })}
        </div>
        {error && <p className="form-error">{error}</p>}
        {notice && <p className="form-success">{notice}</p>}
        <button className="btn btn-primary">{editingId ? 'Update' : 'Create'}</button>
      </form>

      <div className="admin-list">
        {items.map((item) => (
          <article className="admin-list-row" key={item.id}>
            {item.image_url && <img src={item.image_url} alt="" />}
            <div>
              <strong>{item.name || item.title || item.customer_name || item.name || item.id}</strong>
              <small>{item.description || item.status || item.slug || item.category_slug || ''}</small>
            </div>
            <div className="admin-row-actions">
              <button className="btn btn-ghost" onClick={() => startEdit(item)}>Edit</button>
              <button className="btn btn-danger" onClick={() => remove(item.id)}>Delete</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
