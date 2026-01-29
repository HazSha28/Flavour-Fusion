import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaLock, FaEnvelope, FaUtensils, FaLeaf, FaHeart } from 'react-icons/fa';
import '../styles/NewAuth.css';

const NewLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-auth-page">
      {/* Background Elements */}
      <div className="new-auth-background">
        <div className="floating-emoji emoji-1">🍕</div>
        <div className="floating-emoji emoji-2">🍜</div>
        <div className="floating-emoji emoji-3">🥗</div>
        <div className="floating-emoji emoji-4">🍰</div>
        <div className="floating-emoji emoji-5">🍷</div>
        <div className="floating-emoji emoji-6">🍔</div>
        <div className="floating-emoji emoji-7">🍝</div>
        <div className="floating-emoji emoji-8">🍱</div>
      </div>

      {/* Main Content */}
      <div className="new-auth-container">
        {/* Logo Section */}
        <div className="new-auth-logo">
          <img src="/images/Flavour_Fusion-removebg-preview.png" alt="Flavour Fusion" className="new-auth-logo-img" />
          <h1>Flavour Fusion</h1>
          <p>Culinary Adventures Await</p>
        </div>

        {/* Login Form */}
        <div className="new-auth-form-wrapper">
          <div className="new-auth-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your culinary journey</p>
          </div>

          {error && (
            <div className="new-auth-message error">
              <FaLock />
              {error}
            </div>
          )}

          {success && (
            <div className="new-auth-message success">
              <FaHeart />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="new-auth-form">
            <div className="new-form-group">
              <label className="new-form-label">Email Address</label>
              <div className="new-input-container">
                <FaEnvelope className="new-input-icon" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="new-auth-input"
                />
              </div>
            </div>

            <div className="new-form-group">
              <label className="new-form-label">Password</label>
              <div className="new-input-container">
                <FaLock className="new-input-icon" />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="new-auth-input"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="new-auth-btn">
              {loading ? (
                <>
                  <div className="new-spinner"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <FaUser />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="new-auth-footer">
            <div className="new-auth-links">
              <Link to="/signup" className="new-auth-link">
                Don't have an account? <span>Sign Up</span>
              </Link>
              <Link to="/forgot-password" className="new-auth-link">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="new-auth-decoration">
          <FaLeaf className="decoration-icon leaf-1" />
          <FaLeaf className="decoration-icon leaf-2" />
          <FaUtensils className="decoration-icon utensils" />
        </div>
      </div>
    </div>
  );
};

export default NewLogin;
