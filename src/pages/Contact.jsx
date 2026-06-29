import { useState } from 'react';
import axios from 'axios';

const API = 'https://construction-backend-g6xy.onrender.com';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/contact`, form);
      setSuccess('Message sent! We will contact you soon.');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError('Failed to send. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9f9f9' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0a2e1a 0%, #1a4a2e 100%)', padding: '60px 20px', textAlign: 'center' }}>
        <h1 style={{ color: '#c9a84c', fontSize: 40, marginBottom: 8 }}>Contact Us</h1>
        <p style={{ color: '#ccc', fontSize: 18 }}>Get in touch with A G R Constructions</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 20px', gap: 60, flexWrap: 'wrap' }}>
        {/* Contact Form */}
        <div style={{ background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: 440 }}>
          <h2 style={{ color: '#0a2e1a', marginBottom: 24 }}>Send us a Message</h2>
          {success && <p style={{ color: 'green', marginBottom: 16, padding: 12, background: '#f0fff4', borderRadius: 8 }}>{success}</p>}
          {error && <p style={{ color: 'red', marginBottom: 16 }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input placeholder="Your Name" value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              style={inputStyle} required />
            <input placeholder="Email Address" type="email" value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={inputStyle} required />
            <input placeholder="Phone Number" value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              style={inputStyle} required />
            <textarea placeholder="Tell us about your project..." value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              style={{ ...inputStyle, height: 120, resize: 'vertical' }} required />
            <button type="submit" style={btnStyle}>Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div style={{ width: 320 }}>
          <h2 style={{ color: '#0a2e1a', marginBottom: 24 }}>Contact Information</h2>
          {[
            { icon: '📍', title: 'Address', value: 'Vishweshwaraiah Rd, 1st Phase Girinagar, Banashankari 3rd Stage, Bengaluru - 560085' },
            { icon: '📞', title: 'Phone', value: '8496099613' },
            { icon: '✉️', title: 'Email', value: 'office.agrconstructions@gmail.com' },
            { icon: '🕐', title: 'Working Hours', value: 'Mon-Fri: 9:30AM - 6:30PM\nSaturday: Open 24 Hours\nSunday: Closed' }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: 16, marginBottom: 28,
              padding: 20, background: '#fff',
              borderRadius: 12, boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              borderLeft: '4px solid #c9a84c'
            }}>
              <span style={{ fontSize: 28 }}>{item.icon}</span>
              <div>
                <h4 style={{ color: '#0a2e1a', margin: '0 0 6px', fontSize: 16 }}>{item.title}</h4>
                <p style={{ color: '#666', margin: 0, whiteSpace: 'pre-line', fontSize: 14 }}>{item.value}</p>
              </div>
            </div>
          ))}

          {/* Quick Call Button */}
          <a href="tel:8496099613" style={{
            display: 'block', textAlign: 'center',
            background: '#0a2e1a', color: '#c9a84c',
            padding: '14px', borderRadius: 8,
            textDecoration: 'none', fontWeight: 'bold',
            fontSize: 18, marginTop: 8
          }}>📞 Call Now: 8496099613</a>
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
  width: '100%', background: '#0a2e1a', color: '#c9a84c',
  padding: '14px', border: 'none', borderRadius: 8,
  fontSize: 16, fontWeight: 'bold', cursor: 'pointer'
};