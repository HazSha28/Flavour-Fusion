import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBars } from 'react-icons/fa';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { signup, currentUser, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(email, password, username);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
              <Link to="/login" onClick={handleLinkClick}>Login</Link>
              <Link to="/signup" onClick={handleLinkClick} className="active">Sign up</Link>
            </>
          )}
        </div>
      </header>
      
      <div className="auth-container">
        <div className="auth-toggle">
          <button className="toggle-btn active">Sign up</button>
        </div>
        
        <div className="auth-form-content">
          <h2>Join Our Community</h2>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Create Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            <div className="form-group">
              <button type="submit" disabled={loading} className="auth-btn">
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="auth-links">
            <Link to="/login" className="auth-link">Already have an account? Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
