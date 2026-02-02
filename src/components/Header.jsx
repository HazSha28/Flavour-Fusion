import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaHeart, FaBook, FaSignOutAlt, FaHome, FaUtensils, FaStar, FaCog, FaHistory, FaYoutube, FaSearch } from 'react-icons/fa';
import '../styles/EnhancedHeader.css';

const Header = ({ showHeroSection = true, showNavigation = true, children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isYouTubeSearchOpen, setIsYouTubeSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const youtubeSearchRef = useRef(null);

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
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleYouTubeSearch = () => {
    setIsYouTubeSearchOpen(!isYouTubeSearchOpen);
    if (!isYouTubeSearchOpen) {
      setTimeout(() => {
        youtubeSearchRef.current?.focus();
      }, 300);
    }
  };

  const handleYouTubeSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery + ' recipe')}`;
      window.open(youtubeUrl, '_blank');
      setSearchQuery('');
      setIsYouTubeSearchOpen(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (youtubeSearchRef.current && !youtubeSearchRef.current.contains(event.target) && 
          !event.target.closest('.youtube-search-btn') && 
          !event.target.closest('.youtube-search-expanded')) {
        setIsYouTubeSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="enhanced-header">
        <div className="logo">
          <img id="ilogo" src="/images/Flavour_Fusion-removebg-preview.png" alt="Logo" />
          <span>FLAVOUR FUSION</span>
        </div>

        
        {/* User Section */}
        <div className="user-section">
          {/* YouTube Search - Expandable */}
          <div className={`youtube-search-expanded ${isYouTubeSearchOpen ? 'open' : ''}`}>
            <button 
              className="youtube-search-btn"
              onClick={toggleYouTubeSearch}
              title="Search YouTube Recipes"
            >
              <FaYoutube />
            </button>
            
            {isYouTubeSearchOpen && (
              <form onSubmit={handleYouTubeSearch} className="youtube-search-form">
                <input 
                  ref={youtubeSearchRef}
                  type="text" 
                  placeholder="Search YouTube recipes..." 
                  className="youtube-search-input"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                />
                <button type="submit" className="youtube-search-submit">
                  <FaSearch />
                </button>
              </form>
            )}
          </div>
          
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
            <div className="hero-emojis">
              <span className="search-emoji">🍕</span>
              <span className="search-emoji">🍔</span>
              <span className="search-emoji">🥗</span>
              <span className="search-emoji">🍜</span>
              <span className="search-emoji">🍰</span>
            </div>
            
            {/* Hero Search Bar */}
            <div className="hero-search-container">
              <form onSubmit={handleSearch} className="hero-search-form">
                <div className="hero-search-wrapper">
                  <span className="search-icon">🔍</span>
                  <input 
                    type="text" 
                    placeholder="Search your recipes and TheMealDB..." 
                    className="hero-search-input"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                  />
                  <button type="submit" className="hero-search-btn">
                    <FaUtensils />
                    <span>Search</span>
                  </button>
                </div>
              </form>
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
