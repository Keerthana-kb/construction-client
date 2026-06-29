import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0a2e1a 0%, #1a4a2e 100%)',
        color: '#fff',
        textAlign: 'center',
        padding: '100px 20px'
      }}>
        <img
          src="https://res.cloudinary.com/dwulv7yhi/image/upload/v1782725250/AGR_CONSTRUCTION_gjmxya.png"
            alt="AGR Constructions Logo"
            style={{ 
              height: 60, 
              width: 60, 
              borderRadius: '50%', 
              objectFit: 'cover',
              objectPosition: '50% 20%'
            }}
        />
        <h1 style={{ fontSize: 48, marginBottom: 12, color: '#c9a84c' }}>
          A G R Constructions
        </h1>
        <p style={{ fontSize: 22, marginBottom: 8, color: '#fff', fontStyle: 'italic' }}>
          "From Your Vision to Our Blueprint"
        </p>
        <p style={{ fontSize: 16, marginBottom: 40, color: '#ccc' }}>
          Professional Civil Engineering & Construction Services in Bengaluru
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/services" style={{
            background: '#c9a84c',
            color: '#0a2e1a',
            padding: '14px 32px',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 18,
            fontWeight: 'bold'
          }}>View Our Work</Link>
          <Link to="/contact" style={{
            background: 'transparent',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 18,
            border: '2px solid #c9a84c'
          }}>Contact Us</Link>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ background: '#c9a84c', padding: '40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 60, flexWrap: 'wrap' }}>
          {[
            { number: '2+', label: 'Years Experience' },
            { number: '3', label: 'Projects Completed' },
            { number: '100%', label: 'Client Satisfaction' },
            { number: '4', label: 'Services Offered' }
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <h2 style={{ fontSize: 42, color: '#0a2e1a', margin: 0, fontWeight: 'bold' }}>{stat.number}</h2>
              <p style={{ color: '#0a2e1a', margin: '4px 0 0', fontWeight: '600' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={{ padding: '60px 40px', background: '#f9f9f9', textAlign: 'center' }}>
        <h2 style={{ fontSize: 36, marginBottom: 12, color: '#0a2e1a' }}>Why Choose Us?</h2>
        <p style={{ color: '#666', marginBottom: 40, fontSize: 16 }}>We deliver quality construction with trust and expertise</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          {[
            { icon: '🏆', title: '2+ Years Experience', desc: 'Trusted by clients across Bengaluru' },
            { icon: '👷', title: 'Civil Engineering Experts', desc: 'Certified professionals for every project' },
            { icon: '⚡', title: 'On-Time Delivery', desc: 'We complete projects on schedule' },
            { icon: '💎', title: 'Quality Materials', desc: 'Best materials for long-lasting structures' }
          ].map((item, i) => (
            <div key={i} style={{
              background: '#fff',
              padding: 32,
              borderRadius: 12,
              width: 220,
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              borderTop: '4px solid #c9a84c'
            }}>
              <div style={{ fontSize: 48 }}>{item.icon}</div>
              <h3 style={{ color: '#0a2e1a', margin: '12px 0 8px' }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: 14 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div style={{ padding: '60px 40px', textAlign: 'center', background: '#fff' }}>
        <h2 style={{ fontSize: 36, marginBottom: 12, color: '#0a2e1a' }}>Our Services</h2>
        <p style={{ color: '#666', marginBottom: 40, fontSize: 16 }}>Complete construction solutions under one roof</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          {[
            { icon: '🏠', name: 'House Construction', desc: 'Custom homes built to your dream' },
            { icon: '🏢', name: 'Commercial Buildings', desc: 'Offices and commercial spaces' },
            { icon: '🔨', name: 'Renovation', desc: 'Remodeling existing structures' },
            { icon: '🎨', name: 'Interior Work', desc: 'Modern interior design & finishing' }
          ].map((s, i) => (
            <div key={i} style={{
              background: '#0a2e1a',
              color: '#fff',
              padding: '32px 24px',
              borderRadius: 12,
              width: 200,
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}>
              <div style={{ fontSize: 48 }}>{s.icon}</div>
              <h3 style={{ color: '#c9a84c', margin: '12px 0 8px' }}>{s.name}</h3>
              <p style={{ color: '#ccc', fontSize: 13 }}>{s.desc}</p>
            </div>
          ))}
        </div>
        <Link to="/services" style={{
          display: 'inline-block',
          marginTop: 40,
          background: '#0a2e1a',
          color: '#c9a84c',
          padding: '12px 32px',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: 16
        }}>View All Services →</Link>
      </div>

      {/* Call to Action */}
      <div style={{
        background: 'linear-gradient(135deg, #0a2e1a 0%, #1a4a2e 100%)',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#c9a84c', fontSize: 36, marginBottom: 16 }}>Ready to Build Your Dream?</h2>
        <p style={{ color: '#ccc', fontSize: 18, marginBottom: 32 }}>Contact us today for a free consultation</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:8496099613" style={{
            background: '#c9a84c',
            color: '#0a2e1a',
            padding: '14px 32px',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 18,
            fontWeight: 'bold'
          }}>📞 Call Us Now</a>
          <Link to="/contact" style={{
            background: 'transparent',
            color: '#fff',
            padding: '14px 32px',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 18,
            border: '2px solid #c9a84c'
          }}>Send Message</Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: '#061a0e',
        color: '#fff',
        padding: '40px',
        textAlign: 'center'
      }}>
        <img
          src="https://res.cloudinary.com/dwulv7yhi/image/upload/v1782720497/AGR_CONSTRUCTIONS_zfxxzl.jpg"
          alt="AGR Logo"
          style={{ height: 70, width: 70, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', marginBottom: 16 }}
        />
        <h3 style={{ color: '#c9a84c', marginBottom: 8 }}>A G R Constructions</h3>
        <p style={{ color: '#aaa', marginBottom: 4 }}>Vishweshwaraiah Rd, Banashankari, Bengaluru - 560085</p>
        <p style={{ color: '#aaa', marginBottom: 4 }}>📞 8496099613 | ✉️ office.agrconstructions@gmail.com</p>
        <p style={{ color: '#aaa', marginBottom: 16 }}>Mon-Fri: 9:30AM-6:30PM | Sat: 24hrs | Sun: Closed</p>
        <p style={{ color: '#666', fontSize: 13 }}>© 2024 A G R Constructions. All rights reserved.</p>
      </div>
    </div>
  );
}