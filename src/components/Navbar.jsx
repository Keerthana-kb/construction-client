import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{
      background: '#0a2e1a',
      padding: '10px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img
          src="https://res.cloudinary.com/dwulv7yhi/image/upload/v1782720497/AGR_CONSTRUCTIONS_zfxxzl.jpg"
          alt="AGR Constructions Logo"
          style={{ height: 60, width: 60, borderRadius: '50%', objectFit: 'cover' }}
        />
        <div>
          <div style={{ color: '#c9a84c', fontSize: 18, fontWeight: 'bold', lineHeight: 1.2 }}>
            A G R Constructions
          </div>
          <div style={{ color: '#a0a0a0', fontSize: 11 }}>
            From Your Vision to Our Blueprint
          </div>
        </div>
      </Link>

      {/* Nav Links */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <Link to="/" style={navLink}>Home</Link>
        <Link to="/services" style={navLink}>Services</Link>
        <Link to="/contact" style={navLink}>Contact</Link>
        {user ? (
          <>
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} style={navLink}>
              {user.role === 'admin' ? 'Admin Panel' : 'My Bookings'}
            </Link>
            <button onClick={logout} style={{
              background: '#c9a84c',
              color: '#0a2e1a',
              border: 'none',
              padding: '8px 18px',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: 14
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={navLink}>Login</Link>
            <Link to="/register" style={{
              background: '#c9a84c',
              color: '#0a2e1a',
              padding: '8px 18px',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: 14
            }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navLink = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: 15
};