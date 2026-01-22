import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBars, FaSearch } from 'react-icons/fa';

const Header = ({ showHeroSection = true, showNavigation = true, children }) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

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

  // Recipe suggestions data
  const recipeSuggestions = [
    'Pizza', 'Pasta', 'Burger', 'Salad', 'Soup', 'Tacos', 'Sushi', 'Curry',
    'Chicken', 'Beef', 'Pork', 'Fish', 'Vegetarian', 'Vegan', 'Dessert',
    'Cake', 'Cookies', 'Ice Cream', 'Coffee', 'Tea', 'Smoothie', 'Juice',
    'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Appetizer', 'Main Course',
    'Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese', 'Thai', 'Korean',
    'French', 'Spanish', 'Greek', 'Mediterranean', 'American', 'BBQ'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim().length > 0) {
      const filteredSuggestions = recipeSuggestions.filter(recipe =>
        recipe.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    if (isDropdownOpen || showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, showSuggestions]);

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
              <Link to="/recipe-journaling" onClick={handleLinkClick}>Recipe Journaling</Link>
              <Link to="/journal-manager" onClick={handleLinkClick}>Saved Journals</Link>
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
            <form onSubmit={handleSearch} className="hero-search" ref={searchRef}>
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
                onChange={handleInputChange}
                onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
              />
              <button type="submit">Search</button>
              
              {/* Search Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="search-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <FaSearch className="suggestion-icon" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
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
