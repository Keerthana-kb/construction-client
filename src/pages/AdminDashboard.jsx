import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'https://construction-backend-g6xy.onrender.com';

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [newService, setNewService] = useState({ title: '', description: '', price: '', category: '' });
  const token = localStorage.getItem('token');

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    axios.get(`${API}/api/bookings/all`, { headers }).then(r => setBookings(r.data)).catch(console.error);
    axios.get(`${API}/api/services`).then(r => setServices(r.data)).catch(console.error);
    axios.get(`${API}/api/contact/all`).then(r => setContacts(r.data)).catch(console.error);
  }, [token]);

  const updateStatus = async (id, status) => {
    const headers = { Authorization: `Bearer ${token}` };
    await axios.put(`${API}/api/bookings/${id}`, { status }, { headers });
    setBookings(bookings.map(b => b._id === id ? { ...b, status } : b));
  };

  const addService = async (e) => {
    e.preventDefault();
    const headers = { Authorization: `Bearer ${token}` };
    const { data } = await axios.post(`${API}/api/services`, newService, { headers });
    setServices([...services, data]);
    setNewService({ title: '', description: '', price: '', category: '' });
    alert('Service added!');
  };

  const deleteService = async (id) => {
    const headers = { Authorization: `Bearer ${token}` };
    await axios.delete(`${API}/api/services/${id}`, { headers });
    setServices(services.filter(s => s._id !== id));
  };

  const statusColor = {
    pending: '#f59e0b', confirmed: '#10b981',
    completed: '#3b82f6', cancelled: '#ef4444'
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      <div style={{ background: '#1a1a2e', padding: '40px' }}>
        <h1 style={{ color: '#f59e0b', margin: 0 }}>🏗️ Admin Dashboard</h1>
        <p style={{ color: '#ccc', margin: '8px 0 0' }}>Manage your construction business</p>
      </div>

      <div style={{ display: 'flex', gap: 24, padding: '32px 40px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total Bookings', value: bookings.length, color: '#3b82f6' },
          { label: 'Pending', value: bookings.filter(item => item.status === 'pending').length, color: '#f59e0b' },
          { label: 'Completed', value: bookings.filter(item => item.status === 'completed').length, color: '#10b981' },
          { label: 'Total Services', value: services.length, color: '#8b5cf6' },
          { label: 'Contacts', value: contacts.length, color: '#ef4444' }
        ].map((stat, i) => (
          <div key={i} style={{
            background: '#fff', padding: '24px 32px', borderRadius: 12,
            boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderTop: `4px solid ${stat.color}`
          }}>
            <p style={{ color: '#666', margin: '0 0 8px', fontSize: 14 }}>{stat.label}</p>
            <h2 style={{ color: stat.color, margin: 0, fontSize: 36 }}>{stat.value}</h2>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 40px' }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {['bookings', 'services', 'contacts'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '10px 24px', borderRadius: 8, border: 'none',
              cursor: 'pointer', fontWeight: 'bold', textTransform: 'capitalize',
              background: activeTab === tab ? '#f59e0b' : '#fff',
              color: activeTab === tab ? '#fff' : '#666'
            }}>{tab}</button>
          ))}
        </div>

        {activeTab === 'bookings' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {bookings.map(booking => (
              <div key={booking._id} style={{
                background: '#fff', padding: 24, borderRadius: 12,
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                borderLeft: `4px solid ${statusColor[booking.status]}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px', color: '#1a1a2e' }}>{booking.service?.title}</h3>
                    <p style={{ margin: '0 0 4px', color: '#666' }}>👤 {booking.customer?.name}</p>
                    <p style={{ margin: '0 0 4px', color: '#666' }}>✉️ {booking.customer?.email}</p>
                    <p style={{ margin: '0 0 4px', color: '#666' }}>📞 {booking.customer?.phone}</p>
                    <p style={{ margin: '0 0 4px', color: '#666' }}>📅 {new Date(booking.date).toLocaleDateString()}</p>
                    <p style={{ margin: 0, color: '#666' }}>📍 {booking.address}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['pending', 'confirmed', 'completed', 'cancelled'].map(s => (
                      <button key={s} onClick={() => updateStatus(booking._id, s)} style={{
                        padding: '6px 14px', borderRadius: 20, border: 'none',
                        cursor: 'pointer', fontWeight: 'bold', textTransform: 'capitalize',
                        background: booking.status === s ? statusColor[s] : '#f0f0f0',
                        color: booking.status === s ? '#fff' : '#666'
                      }}>{s}</button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            <div style={{ background: '#fff', padding: 24, borderRadius: 12, marginBottom: 24, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
              <h3 style={{ color: '#1a1a2e', marginBottom: 16 }}>Add New Service</h3>
              <form onSubmit={addService} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <input placeholder="Service Title" value={newService.title}
                  onChange={e => setNewService({ ...newService, title: e.target.value })}
                  style={inputStyle} required />
                <input placeholder="Category" value={newService.category}
                  onChange={e => setNewService({ ...newService, category: e.target.value })}
                  style={inputStyle} />
                <input placeholder="Price (₹)" type="number" value={newService.price}
                  onChange={e => setNewService({ ...newService, price: e.target.value })}
                  style={inputStyle} required />
                <input placeholder="Description" value={newService.description}
                  onChange={e => setNewService({ ...newService, description: e.target.value })}
                  style={{ ...inputStyle, width: '100%' }} />
                <button type="submit" style={btnStyle}>Add Service</button>
              </form>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
              {services.map(service => (
                <div key={service._id} style={{
                  background: '#fff', padding: 24, borderRadius: 12,
                  width: 280, boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
                }}>
                  <span style={{ background: '#fff3cd', color: '#856404', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>{service.category}</span>
                  <h3 style={{ color: '#1a1a2e', margin: '12px 0 8px' }}>{service.title}</h3>
                  <p style={{ color: '#666', fontSize: 14 }}>{service.description}</p>
                  <p style={{ color: '#f59e0b', fontWeight: 'bold', fontSize: 20 }}>₹{service.price}</p>
                  <button onClick={() => deleteService(service._id)} style={{
                    background: '#ef4444', color: '#fff', border: 'none',
                    padding: '8px 16px', borderRadius: 8, cursor: 'pointer', width: '100%'
                  }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contacts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {contacts.map(contact => (
              <div key={contact._id} style={{
                background: '#fff', padding: 24, borderRadius: 12,
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
              }}>
                <h3 style={{ color: '#1a1a2e', margin: '0 0 8px' }}>{contact.name}</h3>
                <p style={{ color: '#666', margin: '0 0 4px' }}>✉️ {contact.email}</p>
                <p style={{ color: '#666', margin: '0 0 4px' }}>📞 {contact.phone}</p>
                <p style={{ color: '#444', margin: '8px 0 0', padding: '12px', background: '#f9f9f9', borderRadius: 8 }}>{contact.message}</p>
                <p style={{ color: '#999', fontSize: 12, margin: '8px 0 0' }}>{new Date(contact.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ height: 60 }} />
    </div>
  );
}

const inputStyle = {
  padding: '10px 14px', borderRadius: 8, border: '1px solid #ddd',
  fontSize: 15, minWidth: 200
};
const btnStyle = {
  background: '#f59e0b', color: '#fff', border: 'none',
  padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 'bold'
};