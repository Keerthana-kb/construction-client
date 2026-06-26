import { useState } from 'react';
import axios from 'axios';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://construction-backend-g6xy.onrender.com/api/contact', form);
      setSuccess('Message sent successfully! We will contact you soon.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      <div style={{ background: '#1a1a2e', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#f59e0b', fontSize: 40 }}>Contact Us</h1>
        <p style={{ color: '#ccc', fontSize: 18 }}>Get in touch with our team</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px', gap: 60, flexWrap: 'wrap' }}>
        <div style={{ background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: 440 }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: 24 }}>Send us a Message</h2>
          {success && <p style={{ color: 'green', marginBottom: 16 }}>{success}</p>}
          {error && <p style={{ color: 'red', marginBottom: 16 }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input placeholder="Your Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={inputStyle} required />
            <input placeholder="Email" type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={inputStyle} required />
            <input placeholder="Phone Number" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              style={inputStyle} />
            <textarea placeholder="Your Message" value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ ...inputStyle, height: 120, resize: 'vertical' }} required />
            <button type="submit" style={btnStyle}>Send Message</button>
          </form>
        </div>
        <div style={{ width: 300 }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: 24 }}>Contact Info</h2>
          {[
            { icon: '📍', title: 'Address', value: '123 Construction St, Bengaluru, India' },
            { icon: '📞', title: 'Phone', value: '+91 98765 43210' },
            { icon: '✉️', title: 'Email', value: 'info@buildpro.com' },
            { icon: '🕐', title: 'Working Hours', value: 'Mon-Sat: 9AM - 6PM' }
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div>
                <h4 style={{ color: '#1a1a2e', margin: '0 0 4px' }}>{item.title}</h4>
                <p style={{ color: '#666', margin: 0 }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
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
  width: '100%', background: '#f59e0b', color: '#fff',
  padding: '12px', border: 'none', borderRadius: 8,
  fontSize: 16, fontWeight: 'bold', cursor: 'pointer'
};