import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    
    try {
      // TODO: Implement forgot password functionality
      setError('Password reset functionality will be implemented.');
    } catch (err) {
      setError('Failed to send password reset email.');
      console.error(err);
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          <img src="/images/Flavour_Fusion-removebg-preview.png" alt="Logo" />
          <span>FLAVOUR FUSION</span>
        </div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </nav>
      </header>
      
      <div className="bg1">
        <div className="img left-img">
          <img src="/images/robg-removebg-preview.png" alt="Left Background" />
        </div>
        <div className="login">
          <div className="login-card">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="forgot" onClick={handleForgotPassword}>Forgot Password?</div>
              <br />
              <button type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
        <div className="img right-img">
          <img src="/images/robg-removebg-preview.png" alt="Right Background" />
        </div>
      </div>
    </>
  );
};

export default Login;
