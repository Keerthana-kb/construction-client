import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://construction-backend-g6xy.onrender.com/api/services')
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
      <div style={{ background: '#1a1a2e', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#f59e0b', fontSize: 40 }}>Our Services</h1>
        <p style={{ color: '#ccc', fontSize: 18 }}>Choose a service and book instantly</p>
      </div>
      <div style={{ padding: '60px 40px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', fontSize: 20 }}>Loading services...</p>
        ) : services.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60 }}>
            <p style={{ fontSize: 20, color: '#666' }}>No services available yet.</p>
            <p style={{ color: '#999' }}>Please check back later!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {services.map(service => (
              <div key={service._id} style={{
                background: '#fff', borderRadius: 12, width: 300,
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden'
              }}>
                {service.image && (
                  <img src={service.image} alt={service.title}
                    style={{ width: '100%', height: 180, objectFit: 'cover' }} />
                )}
                <div style={{ padding: 24 }}>
                  <span style={{
                    background: '#fff3cd', color: '#856404',
                    padding: '4px 10px', borderRadius: 20, fontSize: 12
                  }}>{service.category}</span>
                  <h3 style={{ color: '#1a1a2e', margin: '12px 0 8px' }}>{service.title}</h3>
                  <p style={{ color: '#666', fontSize: 14, marginBottom: 16 }}>{service.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: 20 }}>
                      ₹{service.price}
                    </span>
                    <button onClick={() => handleBook(service._id)} style={{
                      background: '#1a1a2e', color: '#f59e0b',
                      border: 'none', padding: '10px 20px',
                      borderRadius: 8, cursor: 'pointer', fontWeight: 'bold'
                    }}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}