import { useEffect, useState } from 'react';
import { apiSend, getAdminToken, setAdminToken } from '../lib/api.js';

export default function AdminLogin({ navigate }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) return;
    fetch('/api/admin/verify', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => response.ok && navigate('/admin/dashboard'))
      .catch(() => {});
  }, [navigate]);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await apiSend('/api/admin/login', { password });
      setAdminToken(data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={submit}>
        <img src="/logo.svg" alt="GRAMO" />
        <p className="eyebrow">Private admin</p>
        <h1>Manage GRAMO</h1>
        <p>Login to control offers, categories, images, colors, reservations and orders.</p>
        <label>Admin password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        {error && <p className="form-error">{error}</p>}
        <button className="btn btn-primary full" disabled={loading}>{loading ? 'Checking...' : 'Login'}</button>
        <button type="button" className="link-button" onClick={() => navigate('/')}>Back to public website</button>
      </form>
    </main>
  );
}
