import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await API.post('/auth/login', { email, password });
      const payload = res.data.data || res.data;
      const token = payload.access_token || payload.accessToken || payload.token;
      
      const user = payload.user ? {
        ...payload.user,
        role: payload.user.role 
      } : { 
        name: email.split('@')[0], 
        email: email, 
        role: 'admin' 
      };

      if (token) {
        login(token, user);
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 100);
      } else {
        setError("Login response incomplete: Token missing.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      
      <div className="col-md-4 col-sm-10">
        <div className="card border-0 shadow-lg p-4" style={{ borderRadius: '20px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <div className="card-body">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-dark mb-1">Welcome Back</h2>
              <p className="text-muted small">Enter your details to access your account</p>
            </div>

            {error && (
              <div className="alert alert-danger border-0 small text-center mb-4" 
                   style={{ borderRadius: '10px', backgroundColor: '#ffe5e5', color: '#d9534f' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control border-0 bg-light"
                  id="floatingEmail"
                  placeholder="name@example.com"
                  style={{ borderRadius: '12px' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="floatingEmail" className="text-muted">Email address</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control border-0 bg-light"
                  id="floatingPassword"
                  placeholder="Password"
                  style={{ borderRadius: '12px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label htmlFor="floatingPassword" className="text-muted">Password</label>
              </div>

              <button type="submit" 
                      className="btn btn-dark btn-lg w-100 mb-3 shadow-sm"
                      style={{ borderRadius: '12px', padding: '12px', fontWeight: '600', letterSpacing: '0.5px' }}>
                Sign In
              </button>
            </form>

            <div className="text-center mt-4">
              <p className="text-muted small">
                Don't have an account? 
                <Link to="/signup" className="text-dark fw-bold text-decoration-none ms-1">Create one</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;