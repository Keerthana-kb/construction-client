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
      background: '#1a1a2e', padding: '15px 40px',
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', position: 'sticky', top: 0, zIndex: 100
    }}>
      <Link to="/" style={{ color: '#f59e0b', fontSize: 22, fontWeight: 'bold', textDecoration: 'none' }}>
        🏗️ BuildPro
      </Link>
      <div style={{ display: 'flex', gap: 24 }}>
        <Link to="/" style={navLink}>Home</Link>
        <Link to="/services" style={navLink}>Services</Link>
        <Link to="/contact" style={navLink}>Contact</Link>
        {user ? (
          <>
            <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} style={navLink}>
              {user.role === 'admin' ? 'Admin Panel' : 'My Bookings'}
            </Link>
            <button onClick={logout} style={{
              background: '#f59e0b', color: '#fff',
              border: 'none', padding: '6px 16px',
              borderRadius: 6, cursor: 'pointer'
            }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={navLink}>Login</Link>
            <Link to="/register" style={{
              background: '#f59e0b', color: '#fff',
              padding: '6px 16px', borderRadius: 6,
              textDecoration: 'none', fontWeight: 'bold'
            }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const navLink = {
  color: '#fff', textDecoration: 'none', fontSize: 15
};