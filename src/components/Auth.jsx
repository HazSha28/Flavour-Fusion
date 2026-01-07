import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { currentUser } = useAuth();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <div className="auth-toggle">
        <button
          className={`toggle-btn ${isLogin ? 'active' : ''}`}
          onClick={toggleForm}
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
      
      <div className="auth-form">
        {isLogin ? (
          <LoginForm />
        ) : (
          <SignupForm />
        )}
      </div>
    </div>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate authentication (replace with actual Firebase auth)
    setTimeout(() => {
      setLoading(false);
      // Simulate successful login
    }, 2000);
  };

  return (
    <form className="auth-form-content" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          required
        />
      </div>
      
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
        />
      </div>
      
      <button type="submit" className="auth-btn" disabled={loading}>
        {loading ? 'Signing In...' : 'Sign In'}
      </button>
      
      <div className="auth-links">
        <a href="#" className="auth-link">Forgot Password?</a>
      </div>
    </form>
  );
};

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate authentication (replace with actual Firebase auth)
    setTimeout(() => {
      setLoading(false);
      // Simulate successful signup
    }, 2000);
  };

  return (
    <form className="auth-form-content" onSubmit={handleSubmit}>
      <h2>Create Account</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
          required
        />
      </div>
      
      <div className="form-group">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          required
        />
      </div>
      
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
        />
      </div>
      
      <div className="form-group">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="auth-input"
          required
        />
      </div>
      
      <button type="submit" className="auth-btn" disabled={loading}>
        {loading ? 'Creating Account...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Auth;
