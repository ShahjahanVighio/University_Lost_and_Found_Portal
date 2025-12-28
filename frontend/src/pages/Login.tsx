import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await API.post('/auth/login', { email, password });
      
      // Backend se token aur user details dono nikal rahe hain
      const token = res.data?.access_token;
      const serverUser = res.data?.user;

      if (token) {
        // FIX: Ab role hardcoded 'admin' nahi hai, backend wala role use hoga
        const userData = {
          id: serverUser?.id,
          name: serverUser?.name || email.split('@')[0],
          email: serverUser?.email || email,
          role: serverUser?.role || 'user' // Agar role nahi aaya to default 'user'
        };

        login(token, userData);
        
        // Navigation se pehle thoda gap taake context update ho jaye
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 50);
        
      } else {
        setError("Login failed: Token not received.");
      }
    } catch (err: any) {
      console.error("Login Error Details:", err.response?.data);
      
      const serverError = err.response?.data?.message;
      const finalMessage = Array.isArray(serverError) 
        ? serverError[0] 
        : (typeof serverError === 'string' ? serverError : 'Invalid email or password.');

      setError(finalMessage); 
      setPassword(''); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
      
      <div className="col-md-4 col-sm-10">
        <div className="card border-0 shadow-lg p-4" 
             style={{ borderRadius: '20px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ borderRadius: '12px' }}
                />
                <label htmlFor="floatingEmail">Email address</label>
              </div>

              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control border-0 bg-light"
                  id="floatingPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ borderRadius: '12px' }}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <button type="submit" 
                      disabled={loading}
                      className="btn btn-dark btn-lg w-100 mb-3 shadow-sm"
                      style={{ borderRadius: '12px', padding: '12px', fontWeight: '600' }}>
                {loading ? 'Signing In...' : 'Sign In'}
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