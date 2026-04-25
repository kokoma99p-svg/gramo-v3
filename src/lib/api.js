export async function apiGet(path, fallback) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`GET ${path} failed`);
    return await response.json();
  } catch (error) {
    console.warn(error.message);
    return fallback;
  }
}

export async function apiSend(path, payload, method = 'POST', token = '') {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(path, {
    method,
    headers,
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

export function getAdminToken() {
  return localStorage.getItem('gramo_admin_token') || '';
}

export function setAdminToken(token) {
  localStorage.setItem('gramo_admin_token', token);
}

export function clearAdminToken() {
  localStorage.removeItem('gramo_admin_token');
}
