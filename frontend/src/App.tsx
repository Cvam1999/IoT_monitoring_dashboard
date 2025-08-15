import React, { useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import { auth } from './auth';
import { setAuth } from './api';

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.state.token) setAuth(auth.state.token);
  }, []);

  function logout() {
    auth.clear();
    setAuth(null);
    navigate('/login');
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px' }}>
      <nav className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
        <div className="row" style={{ gap: 16 }}>
          <Link to="/">Dashboard</Link>
        </div>
        <div className="row" style={{ gap: 12 }}>
          {auth.state.user && <span style={{ color: 'var(--muted)' }}>{auth.state.user.email} ({auth.state.user.role})</span>}
          <ThemeToggle />
          {auth.state.user
            ? <button className="btn" onClick={logout}>Logout</button>
            : <Link to="/login" className="btn">Login</Link>}
        </div>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={
          <ProtectedRoute roles={['User','Admin']}>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}
