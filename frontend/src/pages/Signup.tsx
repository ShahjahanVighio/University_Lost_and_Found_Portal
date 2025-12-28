import React, { useState } from 'react';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', formData);
      alert('Signup successful! Now please login.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center py-5" 
         style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      
      <div className="col-md-5 col-sm-10">
        <div className="card border-0 shadow-lg p-3" style={{ borderRadius: '25px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.92)' }}>
          <div className="card-body">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark mb-1">Create Account</h2>
              <p className="text-muted small">Join our community and help find lost items</p>
            </div>

            {error && (
              <div className="alert alert-danger border-0 small text-center mb-4" 
                   style={{ borderRadius: '12px', backgroundColor: '#ffe5e5', color: '#d9534f' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control border-0 bg-light"
                  id="floatName"
                  placeholder="Full Name"
                  style={{ borderRadius: '12px' }}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
                <label htmlFor="floatName" className="text-muted">Full Name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control border-0 bg-light"
                  id="floatEmail"
                  placeholder="name@example.com"
                  style={{ borderRadius: '12px' }}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
                <label htmlFor="floatEmail" className="text-muted">Email address</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control border-0 bg-light"
                  id="floatPass"
                  placeholder="Password"
                  style={{ borderRadius: '12px' }}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
                <label htmlFor="floatPass" className="text-muted">Password</label>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold text-muted ms-2">I am a:</label>
                <select 
                  className="form-select border-0 bg-light p-3"
                  style={{ borderRadius: '12px', fontSize: '0.9rem' }}
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="user">Normal User (Helper/Finder)</option>
                  <option value="admin">Admin (System Manager)</option>
                </select>
              </div>

              <button type="submit" 
                      className="btn btn-primary btn-lg w-100 mb-3 shadow-sm border-0"
                      style={{ borderRadius: '12px', padding: '12px', fontWeight: '600', backgroundColor: '#000000' }}>
                Register Now
              </button>
            </form>

            <div className="text-center mt-3">
              <p className="text-muted small">
                Already have an account? 
                <Link to="/login" className="text-primary fw-bold text-decoration-none ms-1">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;