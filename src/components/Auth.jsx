import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBars } from 'react-icons/fa';
import './Auth.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // Debug: Log when Auth component renders
  console.log('Auth component rendering, isLogin:', isLogin, 'currentUser:', currentUser);

  const handleMenuClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <header>
        <div className="logo">
          <img id="ilogo" src="/images/Flavour_Fusion-removebg-preview.png" alt="Logo" />
          <span>FLAVOUR FUSION</span>
        </div>

        <div className="hamburger-menu" onClick={handleMenuClick}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>
        
        <div ref={dropdownRef} className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
          <Link to="/" onClick={handleLinkClick}>Home</Link>
          <Link to="/favorites" onClick={handleLinkClick}>Favorites</Link>
          <Link to="/journaling" onClick={handleLinkClick}>Journaling</Link>
          <div className="menu-divider"></div>
          {currentUser ? (
            <>
              <Link to="/profile" onClick={handleLinkClick}>Profile</Link>
              <Link to="/journaling" onClick={handleLinkClick}>Journaling</Link>
              <div className="menu-divider"></div>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleLinkClick} className="active">Login</Link>
              <Link to="/signup" onClick={handleLinkClick}>Sign up</Link>
            </>
          )}
        </div>
      </header>
      
      <div className="auth-container">
        {/* Floating Food Emojis - Increased Collection */}
        <div className={`floating-emoji emoji-1 ${isEmailFocused ? 'email-focused' : ''}`}>🍕</div>
        <div className={`floating-emoji emoji-2 ${isEmailFocused ? 'email-focused' : ''}`}>🍜</div>
        <div className={`floating-emoji emoji-3 ${isEmailFocused ? 'email-focused' : ''}`}>🥗</div>
        <div className={`floating-emoji emoji-4 ${isEmailFocused ? 'email-focused' : ''}`}>🍰</div>
        <div className={`floating-emoji emoji-5 ${isEmailFocused ? 'email-focused' : ''}`}>🍷</div>
        <div className={`floating-emoji emoji-6 ${isEmailFocused ? 'email-focused' : ''}`}>🍔</div>
        <div className={`floating-emoji emoji-7 ${isEmailFocused ? 'email-focused' : ''}`}>🍝</div>
        <div className={`floating-emoji emoji-8 ${isEmailFocused ? 'email-focused' : ''}`}>🍳</div>
        <div className={`floating-emoji emoji-9 ${isEmailFocused ? 'email-focused' : ''}`}>🥘</div>
        <div className={`floating-emoji emoji-10 ${isEmailFocused ? 'email-focused' : ''}`}>🍤</div>
        <div className={`floating-emoji emoji-11 ${isEmailFocused ? 'email-focused' : ''}`}>🥐</div>
        <div className={`floating-emoji emoji-12 ${isEmailFocused ? 'email-focused' : ''}`}>🍮</div>
        <div className={`floating-emoji emoji-13 ${isEmailFocused ? 'email-focused' : ''}`}>🍱</div>
        <div className={`floating-emoji emoji-14 ${isEmailFocused ? 'email-focused' : ''}`}>🍲</div>
        <div className={`floating-emoji emoji-15 ${isEmailFocused ? 'email-focused' : ''}`}>🍛</div>
        <div className={`floating-emoji emoji-16 ${isEmailFocused ? 'email-focused' : ''}`}>🥟</div>
        <div className={`floating-emoji emoji-17 ${isEmailFocused ? 'email-focused' : ''}`}>🍗</div>
        <div className={`floating-emoji emoji-18 ${isEmailFocused ? 'email-focused' : ''}`}>🥪</div>
        <div className={`floating-emoji emoji-19 ${isEmailFocused ? 'email-focused' : ''}`}>🌮</div>
        <div className={`floating-emoji emoji-20 ${isEmailFocused ? 'email-focused' : ''}`}>🌯</div>
        
        {/* Food Particles */}
        <div className="food-particle particle-1"></div>
        <div className="food-particle particle-2"></div>
        <div className="food-particle particle-3"></div>
        <div className="food-particle particle-4"></div>
        <div className="food-particle particle-5"></div>
        <div className="food-particle particle-6"></div>
        <div className="food-particle particle-7"></div>
        <div className="food-particle particle-8"></div>
        
        <div className={`auth-toggle ${!isLogin ? 'signup-active' : ''} ${isEmailFocused ? 'email-focused' : ''}`}>
          <button
            className={`toggle-btn ${isLogin ? 'active' : ''}`}
            onClick={() => {
              console.log('Sign In button clicked, current isLogin:', isLogin);
              if (!isLogin) {
                console.log('Switching to Sign In');
                setIsLogin(true);
              }
            }}
          >
            Sign In
          </button>
          <button
            className={`toggle-btn ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              console.log('Sign Up button clicked, current isLogin:', isLogin);
              if (isLogin) {
                console.log('Switching to Sign Up');
                setIsLogin(false);
              }
            }}
          >
            Sign Up
          </button>
        </div>
        
        <div className={`auth-form-content ${isSwitching ? 'switching' : ''} ${isEmailFocused ? 'email-focused' : ''}`}>
          {isLogin ? (
            <LoginForm setIsEmailFocused={setIsEmailFocused} />
          ) : (
            <SignupForm setIsEmailFocused={setIsEmailFocused} />
          )}
        </div>
      </div>
    </>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
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
      setSuccess('');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await resetPassword(email);
      setSuccess('Password reset email sent! Please check your inbox.');
    } catch (err) {
      setError('Failed to send password reset email. Please check your email address.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome Back</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
          className={`auth-input ${isEmailFocused ? 'email-focused' : ''}`}
          required
        />
        <div className="steam steam-1"></div>
        <div className="steam steam-2"></div>
        <div className="steam steam-3"></div>
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
        <div className="steam steam-1"></div>
        <div className="steam steam-2"></div>
        <div className="steam steam-3"></div>
      </div>
      
      <div className="form-group">
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
      
      <div className="auth-links">
        <button type="button" className="auth-link" onClick={handleForgotPassword}>
          Forgot password?
        </button>
      </div>
    </form>
  );
};

const SignupForm = ({ setIsEmailFocused }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocusedLocal] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleEmailFocus = (focused) => {
    setIsEmailFocusedLocal(focused);
    if (setIsEmailFocused) {
      setIsEmailFocused(focused);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('SignupForm handleSubmit called');
    console.log('Form data:', { username, email, password, confirmPassword });
    setError('');
    setLoading(true);
    
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      console.log('Password too short');
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }
    
    try {
      console.log('Calling signup with:', { email, password, username });
      await signup(email, password, username);
      console.log('Signup successful');
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <div className="steam steam-1"></div>
        <div className="steam steam-2"></div>
        <div className="steam steam-3"></div>
      </div>
      
      <div className="form-group">
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => handleEmailFocus(true)}
          onBlur={() => handleEmailFocus(false)}
          className={`auth-input ${isEmailFocused ? 'email-focused' : ''}`}
          required
        />
        <div className="steam steam-1"></div>
        <div className="steam steam-2"></div>
        <div className="steam steam-3"></div>
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
        <div className="steam steam-1"></div>
        <div className="steam steam-2"></div>
        <div className="steam steam-3"></div>
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
        <div className="steam steam-1"></div>
        <div className="steam steam-2"></div>
        <div className="steam steam-3"></div>
      </div>
      
      <div className="form-group">
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default Auth;
