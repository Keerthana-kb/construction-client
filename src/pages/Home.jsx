import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#fff', textAlign: 'center',
        padding: '100px 20px'
      }}>
        <h1 style={{ fontSize: 48, marginBottom: 20, color: '#f59e0b' }}>
          🏗️ BuildPro Construction
        </h1>
        <p style={{ fontSize: 20, marginBottom: 40, color: '#ccc' }}>
          Professional Construction Services — Trusted Globally
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
          <Link to="/services" style={{
            background: '#f59e0b', color: '#fff',
            padding: '14px 32px', borderRadius: 8,
            textDecoration: 'none', fontSize: 18, fontWeight: 'bold'
          }}>View Services</Link>
          <Link to="/contact" style={{
            background: 'transparent', color: '#fff',
            padding: '14px 32px', borderRadius: 8,
            textDecoration: 'none', fontSize: 18,
            border: '2px solid #f59e0b'
          }}>Contact Us</Link>
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={{ padding: '60px 40px', background: '#f9f9f9', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, marginBottom: 40, color: '#1a1a2e' }}>Why Choose Us?</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
          {[
            { icon: '🏆', title: '10+ Years Experience', desc: 'Trusted by thousands of clients worldwide' },
            { icon: '👷', title: 'Expert Team', desc: 'Certified professionals for every project' },
            { icon: '⚡', title: 'Fast Delivery', desc: 'On-time project completion guaranteed' },
            { icon: '💰', title: 'Best Prices', desc: 'Competitive rates without compromising quality' }
          ].map((item, i) => (
            <div key={i} style={{
              background: '#fff', padding: 32, borderRadius: 12,
              width: 220, boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: 48 }}>{item.icon}</div>
              <h3 style={{ color: '#1a1a2e', margin: '12px 0 8px' }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: 14 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Preview */}
      <div style={{ padding: '60px 40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, marginBottom: 16, color: '#1a1a2e' }}>Our Services</h2>
        <p style={{ color: '#666', marginBottom: 40 }}>We offer a wide range of construction services</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          {[
            { icon: '🏠', name: 'Home Construction' },
            { icon: '🔧', name: 'Renovation' },
            { icon: '⚡', name: 'Electrical Work' },
            { icon: '🚿', name: 'Plumbing' },
            { icon: '🎨', name: 'Interior Design' },
            { icon: '🏢', name: 'Commercial Projects' }
          ].map((s, i) => (
            <div key={i} style={{
              background: '#1a1a2e', color: '#fff',
              padding: '24px 32px', borderRadius: 12,
              width: 160, cursor: 'pointer'
            }}>
              <div style={{ fontSize: 36 }}>{s.icon}</div>
              <p style={{ marginTop: 8, color: '#f59e0b' }}>{s.name}</p>
            </div>
          ))}
        </div>
        <Link to="/services" style={{
          display: 'inline-block', marginTop: 40,
          background: '#1a1a2e', color: '#f59e0b',
          padding: '12px 32px', borderRadius: 8,
          textDecoration: 'none', fontWeight: 'bold'
        }}>See All Services →</Link>
      </div>

      {/* Footer */}
      <div style={{
        background: '#1a1a2e', color: '#fff',
        textAlign: 'center', padding: '30px'
      }}>
        <p>© 2024 BuildPro Construction. All rights reserved.</p>
      </div>
    </div>
  );
}