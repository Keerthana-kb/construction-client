/* eslint-disable */
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'https://construction-backend-g6xy.onrender.com';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API}/api/auth/login`, form);
      if (data.user.role !== 'admin') {
        setError('Access denied! Admins only.');
        return;
      }
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#061a0e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        background: '#0a2e1a',
        padding: 40,
        borderRadius: 12,
        boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
        width: 400,
        border: '1px solid #c9a84c'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <img
            src="https://res.cloudinary.com/dwulv7yhi/image/upload/v1782720497/AGR_CONSTRUCTIONS_zfxxzl.jpg"
            alt="AGR Logo"
            style={{ height: 90, width: 90, borderRadius: '50%', objectFit: 'cover', border: '3px solid #c9a84c' }}
          />
          <h2 style={{ color: '#c9a84c', marginTop: 16, marginBottom: 4 }}>Admin Access</h2>
          <p style={{ color: '#aaa', fontSize: 14 }}>A G R Constructions — Restricted Area</p>
        </div>

        {error && (
          <p style={{
            color: '#ef4444',
            textAlign: 'center',
            marginBottom: 16,
            padding: 10,
            background: 'rgba(239,68,68,0.1)',
            borderRadius: 8,
            border: '1px solid #ef4444'
          }}>{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ color: '#c9a84c', fontSize: 14, marginBottom: 6, display: 'block' }}>
              Admin Email
            </label>
            <input
              placeholder="Enter admin email"
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
              required
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ color: '#c9a84c', fontSize: 14, marginBottom: 6, display: 'block' }}>
              Password
            </label>
            <input
              placeholder="Enter admin password"
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={inputStyle}
              required
            />
          </div>
          <button type="submit" style={btnStyle}>
            🔐 Login as Admin
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, color: '#666', fontSize: 13 }}>
          This page is restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '12px',
  borderRadius: 8,
  border: '1px solid #c9a84c',
  fontSize: 15,
  boxSizing: 'border-box',
  background: '#061a0e',
  color: '#fff'
};

const btnStyle = {
  width: '100%',
  background: '#c9a84c',
  color: '#0a2e1a',
  padding: '14px',
  border: 'none',
  borderRadius: 8,
  fontSize: 16,
  fontWeight: 'bold',
  cursor: 'pointer'
};