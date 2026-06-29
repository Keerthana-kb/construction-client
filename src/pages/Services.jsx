import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'https://construction-backend-g6xy.onrender.com';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/api/services`)
      .then(res => { setServices(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleBook = (serviceId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) { navigate('/login'); return; }
    navigate(`/book/${serviceId}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      <div style={{ background: 'linear-gradient(135deg, #0a2e1a 0%, #1a4a2e 100%)', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#c9a84c', fontSize: 40 }}>Our Services</h1>
        <p style={{ color: '#ccc', fontSize: 18 }}>Professional construction services in Bengaluru</p>
      </div>

      {/* Service Categories */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, padding: '40px 20px 0', flexWrap: 'wrap' }}>
        {[
          { icon: '🏠', name: 'House Construction' },
          { icon: '🏢', name: 'Commercial Buildings' },
          { icon: '🔨', name: 'Renovation' },
          { icon: '🎨', name: 'Interior Work' }
        ].map((cat, i) => (
          <div key={i} style={{
            background: '#0a2e1a', color: '#c9a84c',
            padding: '16px 24px', borderRadius: 8,
            display: 'flex', alignItems: 'center', gap: 8,
            fontWeight: 'bold', fontSize: 15
          }}>
            {cat.icon} {cat.name}
          </div>
        ))}
      </div>

      <div style={{ padding: '40px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', fontSize: 20, color: '#666' }}>Loading services...</p>
        ) : services.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <p style={{ fontSize: 20, color: '#666' }}>No services available yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {services.map(service => (
              <div key={service._id} style={{
                background: '#fff', borderRadius: 12, width: 320,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                overflow: 'hidden', border: '1px solid #eee'
              }}>
                {service.image && (
                  <img src={service.image} alt={service.title}
                    style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                )}
                <div style={{ padding: 24 }}>
                  <span style={{
                    background: '#0a2e1a', color: '#c9a84c',
                    padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 'bold'
                  }}>{service.category}</span>
                  <h3 style={{ color: '#0a2e1a', margin: '12px 0 8px', fontSize: 20 }}>{service.title}</h3>
                  <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>{service.description}</p>
                  <button onClick={() => handleBook(service._id)} style={{
                    width: '100%', background: '#0a2e1a', color: '#c9a84c',
                    border: 'none', padding: '12px 20px',
                    borderRadius: 8, cursor: 'pointer',
                    fontWeight: 'bold', fontSize: 15
                  }}>Book This Service</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}