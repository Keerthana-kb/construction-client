import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('https://construction-backend-g6xy.onrender.com/api/bookings/my',
      { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { setBookings(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const statusColor = {
    pending: '#f59e0b', confirmed: '#10b981',
    completed: '#3b82f6', cancelled: '#ef4444'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      <div style={{ background: '#1a1a2e', padding: '40px', color: '#fff' }}>
        <h1 style={{ color: '#f59e0b' }}>Welcome, {user?.name}! 👋</h1>
        <p style={{ color: '#ccc' }}>Manage your bookings here</p>
      </div>
      <div style={{ padding: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ color: '#1a1a2e' }}>My Bookings</h2>
          <button onClick={() => navigate('/services')} style={{
            background: '#f59e0b', color: '#fff', border: 'none',
            padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold'
          }}>+ Book New Service</button>
        </div>
        {loading ? <p>Loading...</p> : bookings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <p style={{ fontSize: 20, color: '#666' }}>No bookings yet!</p>
            <button onClick={() => navigate('/services')} style={{
              background: '#f59e0b', color: '#fff', border: 'none',
              padding: '12px 24px', borderRadius: 8, cursor: 'pointer', marginTop: 16
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ color: '#1a1a2e', margin: '0 0 8px' }}>
                      {b.service?.title || 'Service'}
                    </h3>
                    <p style={{ color: '#666', margin: '0 0 4px' }}>📅 {new Date(b.date).toLocaleDateString()}</p>
                    <p style={{ color: '#666', margin: 0 }}>📍 {b.address}</p>
                  </div>
                  <span style={{
                    background: statusColor[b.status], color: '#fff',
                    padding: '6px 16px', borderRadius: 20, fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}