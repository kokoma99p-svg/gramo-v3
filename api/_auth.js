import crypto from 'crypto';
import { parseJsonBody, sendError } from './_cors.js';

function base64url(value) {
  return Buffer.from(value).toString('base64url');
}

function sign(value) {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error('Missing ADMIN_JWT_SECRET.');
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function sha256(value) {
  return crypto.createHash('sha256').update(String(value)).digest('hex');
}

function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

export function createAdminToken() {
  const payload = {
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 8
  };
  const encodedPayload = base64url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminToken(token) {
  if (!token || !token.includes('.')) return false;
  const [encodedPayload, signature] = token.split('.');
  const expected = sign(encodedPayload);
  if (!safeEqual(signature, expected)) return false;

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    return payload.role === 'admin' && payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function requireAdmin(req, res) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!verifyAdminToken(token)) {
    sendError(res, 401, 'Unauthorized admin request.');
    return false;
  }
  return true;
}

export function verifyPassword(req) {
  const body = parseJsonBody(req);
  const password = body.password || '';
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;
  const devPassword = process.env.ADMIN_PASSWORD;

  if (configuredHash) {
    return safeEqual(sha256(password), configuredHash);
  }

  if (devPassword) {
    return safeEqual(password, devPassword);
  }

  return false;
}
