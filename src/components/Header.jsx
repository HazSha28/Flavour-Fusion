import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaHeart, FaBook, FaSignOutAlt, FaHome, FaUtensils, FaStar, FaCog, FaHistory } from 'react-icons/fa';

const Header = ({ showHeroSection = true, showNavigation = true, children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await logout();
      setIsDropdownOpen(false);
      console.log('Logged out successfully');
      window.location.href = '/';
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleMenuClick = () => {
    console.log('Menu clicked, current state:', isDropdownOpen);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    console.log('Link clicked, closing dropdown');
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <header className="enhanced-header">
        <div className="logo">
          <img id="ilogo" src="/images/Flavour_Fusion-removebg-preview.png" alt="Logo" />
          <span>FLAVOUR FUSION</span>
        </div>

        
        {/* User Section */}
        <div className="user-section">
          {currentUser ? (
            <div className="user-menu">
              <div className="user-avatar">
                <FaUser />
              </div>
              <div className="user-dropdown">
                <Link to="/" className="dropdown-item">
                  <FaHome />
                  Home
                </Link>
                <Link to="/profile" className="dropdown-item">
                  <FaUser />
                  Profile
                </Link>
                <Link to="/favorites" className="dropdown-item">
                  <FaHeart />
                  Favorites
                </Link>
                <Link to="/recipe-journaling" className="dropdown-item">
                  <FaBook />
                  Recipe Journaling
                </Link>
                <Link to="/journal-manager" className="dropdown-item">
                  <FaBook />
                  Saved Journals
                </Link>
                                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-auth-btn login-btn">Login</Link>
              <Link to="/signup" className="nav-auth-btn signup-btn">Sign Up</Link>
            </div>
          )}
        </div>
      </header>

      {showHeroSection && (
        <div className="headimg">
          <div className="hero-content">
            <h1>Curated with soul, Crafted with art, where every bite is a perfect blend of flavours</h1>
            <div className="hero-search">
              <span className="search-emoji">🍕</span>
              <span className="search-emoji">🍔</span>
              <span className="search-emoji">🥗</span>
              <span className="search-emoji">🍜</span>
              <span className="search-emoji">🍰</span>
              <input 
                type="text" 
                placeholder="Search for recipes..." 
                className="search-input"
              />
              <button className="search-btn">
                <FaUtensils />
              </button>
            </div>
          </div>
          <img src="/images/head-removebg-preview.png" alt="header image" />
        </div>
      )}

      {showNavigation && (
        <nav className="min-header">
          <a href="#GC">Global Cravings</a>
          <a href="#BBB">Bites, Brunch & Bowls</a>
          <a href="#EW">Eat your Way</a>
          <a href="#DD">Desserts & Drinks</a>
          <a href="#SM">Smart Picks & Mood Meals</a>
          <a href="#SD">Soups & Drinks</a>
        </nav>
      )}

      {children}
    </>
  );
};

export default Header;
