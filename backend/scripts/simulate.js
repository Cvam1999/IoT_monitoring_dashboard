// Posts random readings to the backend every second for sample devices.
import fetch from 'node-fetch';

const API_BASE = process.env.API_BASE || 'http://localhost:4000';
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASS = 'Admin@123';

const DEVICES = ['device-1', 'device-2', 'device-3'];

async function ensureAdminToken() {
  // Try logging in; if fails, try registering then login.
  async function login() {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASS })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(JSON.stringify(data));
    return data.access_token;
  }

  try {
    return await login();
  } catch {
    await fetch(`${API_BASE}/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASS, role: 'Admin' })
    });
    return await login();
  }
}

function rand(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

async function postReading(token, deviceId) {
  const body = {
    deviceId,
    temperature: rand(18, 32),
    humidity: rand(30, 80),
    power: rand(50, 500),
    timestamp: new Date().toISOString()
  };
  const res = await fetch(`${API_BASE}/sensors/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const data = await res.text();
    console.error('Ingest failed:', data);
  }
}

(async () => {
  const token = await ensureAdminToken();
  console.log('Simulator started');
  setInterval(() => {
    DEVICES.forEach(d => postReading(token, d));
  }, 1000);
})();
