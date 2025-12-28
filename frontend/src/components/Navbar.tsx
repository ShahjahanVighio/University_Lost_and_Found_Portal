import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg sticky-top" 
         style={{ 
           backdropFilter: 'blur(15px)', 
           backgroundColor: 'rgba(33, 37, 41, 0.95)', 
           borderBottom: '1px solid rgba(255,255,255,0.1)' 
         }}>
      <div className="container py-1">
        {/* Brand Logo */}
        <Link className="navbar-brand fw-bolder fs-4" to="/" 
              style={{ 
                background: 'linear-gradient(to right, #ffffff, #00d4ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px'
              }}>
          Lost<span style={{ color: '#00d4ff', WebkitTextFillColor: '#00d4ff' }}>&</span>Found
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link px-3 text-light opacity-75" to="/">Home</Link>
            </li>
            
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/post-lost" style={{ color: '#ff6b6b' }}>
                    <i className="bi bi-plus-circle me-1"></i> Report Lost
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/post-found" style={{ color: '#51cf66' }}>
                    <i className="bi bi-search me-1"></i> Report Found
                  </Link>
                </li>
              </>
            )}
          </ul>

          <div className="navbar-nav ms-auto align-items-center gap-2">
            {user ? (
              <>
                {/* ✅ STRICT ADMIN CHECK: Sirf admin ko nazar aayega */}
                {user.role === 'admin' && (
                  <Link to="/admin" className="btn btn-sm px-3 me-2" 
                        style={{ 
                          backgroundColor: '#fcc419', 
                          color: '#000', 
                          fontWeight: '700', 
                          borderRadius: '8px',
                          fontSize: '0.75rem',
                          boxShadow: '0 0 10px rgba(252, 196, 25, 0.3)'
                        }}>
                    ADMIN PANEL
                  </Link>
                )}
                
                <Link className="nav-link text-light px-3 small opacity-75" to="/profile">
                  My Profile
                </Link>

                <div className="d-flex align-items-center bg-dark-subtle px-3 py-1 rounded-pill me-2 border border-secondary-subtle">
                  <div className="bg-info rounded-circle me-2" style={{ width: '8px', height: '8px' }}></div>
                  <span className="text-light small fw-medium">Hi, {user.name}</span>
                </div>
                
                <button 
                  onClick={logout} 
                  className="btn btn-sm px-4" 
                  style={{ 
                    borderRadius: '10px', 
                    border: '1px solid #fa5252', 
                    color: '#fa5252',
                    transition: '0.3s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#fa5252'; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#fa5252'; }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="nav-link text-light px-3" to="/login">Login</Link>
                <Link className="btn btn-primary btn-sm px-4 py-2 ms-2 shadow-sm" 
                      to="/signup"
                      style={{ borderRadius: '10px', fontWeight: '600' }}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;