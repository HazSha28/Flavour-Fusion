import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaLock, FaEnvelope, FaUtensils, FaLeaf, FaHeart, FaUserPlus } from 'react-icons/fa';
import '../styles/NewAuth.css';

const NewSignup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, currentUser } = useAuth();
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

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    try {
      await signup(email, password, username);
      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Failed to create account. Email may already be in use.');
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
          <p>Join Our Culinary Community</p>
        </div>

        {/* Signup Form */}
        <div className="new-auth-form-wrapper">
          <div className="new-auth-header">
            <h2>Create Account</h2>
            <p>Start your flavour journey today</p>
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
              <label className="new-form-label">Username</label>
              <div className="new-input-container">
                <FaUser className="new-input-icon" />
                <input
                  type="text"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="new-auth-input"
                />
              </div>
            </div>

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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="new-auth-input"
                  minLength="6"
                />
              </div>
            </div>

            <div className="new-form-group">
              <label className="new-form-label">Confirm Password</label>
              <div className="new-input-container">
                <FaLock className="new-input-icon" />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="new-auth-input"
                  minLength="6"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="new-auth-btn">
              {loading ? (
                <>
                  <div className="new-spinner"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <FaUserPlus />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="new-auth-footer">
            <div className="new-auth-links">
              <Link to="/login" className="new-auth-link">
                Already have an account? <span>Sign In</span>
              </Link>
              <Link to="/terms" className="new-auth-link">
                Terms & Conditions
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

export default NewSignup;
