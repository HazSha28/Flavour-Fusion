import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBars, FaSearch } from 'react-icons/fa';

const Header = ({ showHeroSection = true, showNavigation = true, children }) => {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality - could navigate to search results page
      console.log('Searching for:', searchQuery);
      // For now, just log search query
      alert(`Searching for: ${searchQuery}`);
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
              <Link to="/signup" onClick={handleLinkClick}>Sign up</Link>
            </>
          )}
        </div>
      </header>

      {showHeroSection && (
        <div className="headimg">
          <div className="hero-content">
            <h1>Curated with soul, Crafted with art, where every bite is a perfect blend of flavours</h1>
            <form onSubmit={handleSearch} className="hero-search">
              <FaSearch className="search-icon" />
              <span className="search-emoji">🍕</span>
              <span className="search-emoji">🍜</span>
              <span className="search-emoji">🥗</span>
              <span className="search-emoji">🍰</span>
              <span className="search-emoji">🍷</span>
              <input 
                type="text" 
                placeholder="🍽️ Discover your perfect culinary journey..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
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
