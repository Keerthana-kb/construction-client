/* eslint-disable */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'https://construction-backend-g6xy.onrender.com';

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${API}/api/bookings/my`,
      { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { setBookings(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const statusColor = {
    pending: '#f59e0b',
    confirmed: '#10b981',
    completed: '#3b82f6',
    cancelled: '#ef4444'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0a2e1a 0%, #1a4a2e 100%)', padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img
            src="https://res.cloudinary.com/dwulv7yhi/image/upload/v1782720497/AGR_CONSTRUCTIONS_zfxxzl.jpg"
            alt="AGR Logo"
            style={{ height: 60, width: 60, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top' }}
          />
          <div>
            <h1 style={{ color: '#c9a84c', margin: 0 }}>Welcome, {user?.name}! 👋</h1>
            <p style={{ color: '#ccc', margin: '4px 0 0' }}>A G R Constructions — My Bookings</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <h2 style={{ color: '#0a2e1a', margin: 0 }}>My Bookings</h2>
          <button onClick={() => navigate('/services')} style={{
            background: '#0a2e1a', color: '#c9a84c',
            border: 'none', padding: '10px 20px',
            borderRadius: 8, cursor: 'pointer', fontWeight: 'bold'
          }}>+ Book New Service</button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', fontSize: 20, color: '#666' }}>Loading your bookings...</p>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, background: '#fff', borderRadius: 12 }}>
            <p style={{ fontSize: 60 }}>🏗️</p>
            <p style={{ fontSize: 20, color: '#666' }}>No bookings yet!</p>
            <p style={{ color: '#999', marginBottom: 24 }}>Book a service to get started</p>
            <button onClick={() => navigate('/services')} style={{
              background: '#0a2e1a', color: '#c9a84c',
              border: 'none', padding: '12px 24px',
              borderRadius: 8, cursor: 'pointer', fontWeight: 'bold', fontSize: 16
            }}>Browse Services</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {bookings.map(b => (
              <div key={b._id} style={{
                background: '#fff', padding: 24, borderRadius: 12,
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                borderLeft: `4px solid ${statusColor[b.status]}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <h3 style={{ color: '#0a2e1a', margin: '0 0 8px', fontSize: 20 }}>
                      {b.service?.title || 'Service'}
                    </h3>
                    <p style={{ color: '#666', margin: '0 0 4px' }}>📅 Date: {new Date(b.date).toLocaleDateString()}</p>
                    <p style={{ color: '#666', margin: '0 0 4px' }}>📍 Address: {b.address}</p>
                    {b.notes && <p style={{ color: '#666', margin: 0 }}>📝 Notes: {b.notes}</p>}
                  </div>
                  <span style={{
                    background: statusColor[b.status], color: '#fff',
                    padding: '8px 20px', borderRadius: 20,
                    fontWeight: 'bold', textTransform: 'capitalize',
                    fontSize: 14
                  }}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: '#061a0e', color: '#aaa', textAlign: 'center', padding: '20px', marginTop: 40 }}>
        <p style={{ margin: 0 }}>📞 8496099613 | A G R Constructions, Bengaluru</p>
      </div>
    </div>
  );
}