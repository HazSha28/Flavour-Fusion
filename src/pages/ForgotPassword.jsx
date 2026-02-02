import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEnvelope, FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaUtensils, FaLeaf } from 'react-icons/fa';
import '../styles/NewAuth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const checkEmailExists = async (email) => {
    // Note: Firebase doesn't provide a direct way to check if email exists
    // for security reasons. We'll handle this in the resetPassword function
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // Check if email format is valid
      const emailExists = await checkEmailExists(email);
      
      if (!emailExists) {
        setError('This email address is not registered.');
        setLoading(false);
        return;
      }

      // Send password reset email
      await resetPassword(email);
      
      setEmailSent(true);
      setSuccess('Password reset email has been sent! Please check your inbox.');
      
      // Clear the email field
      setEmail('');
      
    } catch (err) {
      console.error('Password reset error:', err);
      
      // Handle specific Firebase errors
      switch (err.code) {
        case 'auth/user-not-found':
          setError('This email address is not registered.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address format.');
          break;
        case 'auth/too-many-requests':
          setError('Too many requests. Please try again later.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection.');
          break;
        default:
          setError('Failed to send password reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (emailSent) {
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

        <div className="new-auth-container">
          {/* Logo Section */}
          <div className="new-auth-logo">
            <img src="/images/Flavour_Fusion-removebg-preview.png" alt="Flavour Fusion" className="new-auth-logo-img" />
            <h1>Flavour Fusion</h1>
            <p>Culinary Adventures Await</p>
          </div>

          {/* Success Message */}
          <div className="new-auth-form-wrapper">
            <div className="new-auth-header">
              <div className="success-icon-large">
                <FaCheckCircle />
              </div>
              <h2>Email Sent Successfully!</h2>
              <p>We've sent a password reset link to your email address.</p>
            </div>

            <div className="new-auth-message success">
              <FaEnvelope />
              {success}
            </div>

            <div className="reset-instructions">
              <h3>Next Steps:</h3>
              <ul>
                <li>Check your email inbox</li>
                <li>Look for an email from Flavour Fusion</li>
                <li>Click the reset link in the email</li>
                <li>Create a new password</li>
              </ul>
              
              <div className="email-tips">
                <p><strong>Didn't receive the email?</strong></p>
                <ul>
                  <li>Check your spam/junk folder</li>
                  <li>Make sure the email address is correct</li>
                  <li>Wait a few minutes for delivery</li>
                </ul>
              </div>
            </div>

            <div className="new-auth-footer">
              <button 
                onClick={handleBackToLogin}
                className="new-auth-btn secondary"
              >
                <FaArrowLeft />
                Back to Login
              </button>
              
              <button 
                onClick={() => setEmailSent(false)}
                className="new-auth-link-btn"
              >
                Try Another Email
              </button>
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
  }

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

      <div className="new-auth-container">
        {/* Logo Section */}
        <div className="new-auth-logo">
          <img src="/images/Flavour_Fusion-removebg-preview.png" alt="Flavour Fusion" className="new-auth-logo-img" />
          <h1>Flavour Fusion</h1>
          <p>Culinary Adventures Await</p>
        </div>

        {/* Forgot Password Form */}
        <div className="new-auth-form-wrapper">
          <div className="new-auth-header">
            <button 
              onClick={handleBackToLogin}
              className="back-to-login-btn"
            >
              <FaArrowLeft />
              Back to Login
            </button>
            <h2>Reset Password</h2>
            <p>Enter your email address and we'll send you a link to reset your password.</p>
          </div>

          {error && (
            <div className="new-auth-message error">
              <FaExclamationTriangle />
              {error}
            </div>
          )}

          {success && (
            <div className="new-auth-message success">
              <FaCheckCircle />
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
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="new-auth-input"
                  autoFocus
                />
              </div>
              <small className="form-hint">
                Enter the email address associated with your Flavour Fusion account.
              </small>
            </div>

            <button 
              type="submit" 
              disabled={loading || !email} 
              className="new-auth-btn"
            >
              {loading ? (
                <>
                  <div className="new-spinner"></div>
                  Sending Reset Link...
                </>
              ) : (
                <>
                  <FaEnvelope />
                  Send Reset Link
                </>
              )}
            </button>
          </form>

          <div className="new-auth-footer">
            <div className="new-auth-links">
              <Link to="/login" className="new-auth-link">
                Remember your password? <span>Sign In</span>
              </Link>
              <Link to="/signup" className="new-auth-link">
                Don't have an account? <span>Sign Up</span>
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

export default ForgotPassword;
