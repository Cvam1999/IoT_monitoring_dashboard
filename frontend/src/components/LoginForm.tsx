import React, { useState } from 'react';
import { api, setAuth } from '../api';
import { auth, parseUserFromToken } from '../auth';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.access_token || res.data.accessToken || res.data.access_token;
      const user = parseUserFromToken(token)!;
      auth.set(token, user);
      setAuth(token);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: '80px auto' }}>
      <h2 style={{ marginTop: 0 }}>Login</h2>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        {error && <div style={{ color: 'salmon', marginBottom: 8 }}>{error}</div>}
        <button className="btn" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
      </form>
      <p style={{ color: 'var(--muted)' }}>
        Tip: The simulator auto-registers <b>admin@example.com / Admin@123</b> on first run.
      </p>
    </div>
  );
}
