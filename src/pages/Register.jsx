import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API = 'https://construction-backend-g6xy.onrender.com';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${API}/api/auth/register`, form);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img
            src="https://res.cloudinary.com/dwulv7yhi/image/upload/v1782720497/AGR_CONSTRUCTIONS_zfxxzl.jpg"
            alt="AGR Logo"
            style={{ height: 80, width: 80, borderRadius: '50%', objectFit: 'cover' }}
          />
          <h2 style={{ color: '#0a2e1a', marginTop: 12, marginBottom: 4 }}>Create Account</h2>
          <p style={{ color: '#666' }}>Register with A G R Constructions</p>
        </div>
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: 16 }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input placeholder="Full Name" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={inputStyle} required />
          <input placeholder="Email Address" type="email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={inputStyle} required />
          <input placeholder="Phone Number" type="tel" value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            style={inputStyle} required />
          <input placeholder="Password" type="password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={inputStyle} required />
          <button type="submit" style={btnStyle}>Register</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 16, color: '#666' }}>
          Already have an account? <Link to="/login" style={{ color: '#c9a84c', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  display: 'block', width: '100%', marginBottom: 16,
  padding: '12px', borderRadius: 8, border: '1px solid #ddd',
  fontSize: 15, boxSizing: 'border-box'
};
const btnStyle = {
  width: '100%', background: '#0a2e1a', color: '#c9a84c',
  padding: '12px', border: 'none', borderRadius: 8,
  fontSize: 16, fontWeight: 'bold', cursor: 'pointer'
};