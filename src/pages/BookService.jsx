/* eslint-disable */
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'https://construction-backend-g6xy.onrender.com';

export default function BookService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ date: '', address: '', notes: '' });
  const [success, setSuccess] = useState('');

  const handleBook = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post(`${API}/api/bookings`,
        { ...form, service: serviceId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Booking confirmed! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: 480 }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <img
            src="https://res.cloudinary.com/dwulv7yhi/image/upload/v1782720497/AGR_CONSTRUCTIONS_zfxxzl.jpg"
            alt="AGR Logo"
            style={{ height: 70, width: 70, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }}
          />
          <h2 style={{ color: '#0a2e1a', marginTop: 12, marginBottom: 4 }}>Book a Service</h2>
          <p style={{ color: '#666' }}>A G R Constructions</p>
        </div>
        {success && <p style={{ color: 'green', background: '#f0fff4', padding: 12, borderRadius: 8, marginBottom: 16 }}>{success}</p>}
        <form onSubmit={handleBook}>
          <label style={labelStyle}>Preferred Date</label>
          <input type="date" value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            style={inputStyle} required />
          <label style={labelStyle}>Your Address</label>
          <input placeholder="Enter your full address" value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            style={inputStyle} required />
          <label style={labelStyle}>Additional Notes</label>
          <textarea placeholder="Any special requirements or details about your project..."
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            style={{ ...inputStyle, height: 100, resize: 'vertical' }} />
          <button type="submit" style={btnStyle}>Confirm Booking</button>
          <button type="button" onClick={() => navigate('/services')}
            style={{ ...btnStyle, background: '#666', marginTop: 8 }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: 6, color: '#0a2e1a', fontWeight: 'bold' };
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