import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RecipeSection from './RecipeSection';
import { FaBars } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';

const Home = () => {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality - could navigate to search results page
      console.log('Searching for:', searchQuery);
      // For now, just log the search query
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const globalCravingsRecipes = [
    { image: "/images/global/F1.jpg", title: "PIZZA", subtitle: "with Vegetable", price: "35.00", link: "/recipe1" },
    { image: "/images/global/F2.jpg", title: "SHAWARMA", subtitle: "Middle Eastern Spiced", price: "28.00", link: "/recipe1" },
    { image: "/images/global/F3.jpg", title: "BIRRIA TACOS", subtitle: "Slow Cooked Beef", price: "32.00", link: "/recipe1" },
    { image: "/images/global/F4.jpg", title: "DUMPLINGS", subtitle: "Steamed Perfection", price: "26.00", link: "/recipe1" },
    { image: "/images/global/F5.jpg", title: "PARATHA CURRY", subtitle: "Spicy Chicken", price: "30.00", link: "/recipe1" },
    { image: "/images/global/F6.jpg", title: "ALFREDO PASTA", subtitle: "Cheese Loaded", price: "34.00", link: "/recipe1" },
    { image: "/images/global/F7.jpg", title: "DAHI POORI", subtitle: "Crispy Street Food", price: "22.00", link: "/recipe1" },
    { image: "/images/global/F8.jpg", title: "SUSHI", subtitle: "Fresh Japanese", price: "45.00", link: "/recipe1" }
  ];

  const bitesBrunchRecipes = [
    { image: "/images/bitesbb/F1.jpg", title: "HIGH PROTEIN BOWL", subtitle: "Power Breakfast", price: "28.00", link: "/recipe2" },
    { image: "/images/bitesbb/F2.jpg", title: "PEACH BANANA SMOOTHIE BOWL", subtitle: "Healthy Start", price: "24.00", link: "/recipe2" },
    { image: "/images/bitesbb/F3.jpg", title: "TURKISH POACHED EGGS", subtitle: "Mediterranean Style", price: "26.00", link: "/recipe2" },
    { image: "/images/bitesbb/F4.jpg", title: "MINI FRITTATA", subtitle: "Italian Egg Dish", price: "22.00", link: "/recipe2" },
    { image: "/images/bitesbb/F5.jpg", title: "SHAKSHUKA WITH FETA", subtitle: "Middle Eastern", price: "30.00", link: "/recipe2" },
    { image: "/images/bitesbb/F6.jpg", title: "GARLIC RICE WITH WHITE SAUCE CHICKEN", subtitle: "Asian Fusion", price: "32.00", link: "/recipe2" },
    { image: "/images/bitesbb/F7.jpg", title: "COLESLAW", subtitle: "Classic Side", price: "18.00", link: "/recipe2" },
    { image: "/images/bitesbb/F8.jpg", title: "FRUIT SALAD", subtitle: "Fresh Mix", price: "20.00", link: "/recipe2" }
  ];

  const eatYourWayRecipes = [
    { image: "/images/eatw/F1.jpg", title: "CREAMY GARLIC SAUCE WITH STEAK AND SHRIMP", subtitle: "Luxury Dinner", price: "45.00", link: "/recipe3" },
    { image: "/images/eatw/F2.jpg", title: "GRILLED SALMON", subtitle: "Healthy Choice", price: "38.00", link: "/recipe3" },
    { image: "/images/eatw/F3.jpg", title: "PIE AND MASH", subtitle: "Comfort Food", price: "32.00", link: "/recipe3" },
    { image: "/images/eatw/F4.jpg", title: "TURKISH FATAYER", subtitle: "Traditional Pastry", price: "28.00", link: "/recipe3" },
    { image: "/images/eatw/F5.jpg", title: "STUFFED SEAFOOD BOWL", subtitle: "Ocean Fresh", price: "42.00", link: "/recipe3" },
    { image: "/images/eatw/F6.jpg", title: "BIRIYANI", subtitle: "Indian Special", price: "35.00", link: "/recipe3" },
    { image: "/images/eatw/F7.jpg", title: "HONEY GARLIC CHICKEN", subtitle: "Sweet & Savory", price: "30.00", link: "/recipe3" },
    { image: "/images/eatw/F8.jpg", title: "BUTTER CHICKEN WITH NAAN", subtitle: "Indian Classic", price: "33.00", link: "/recipe3" }
  ];

  const dessertsDrinksRecipes = [
    { image: "/images/dd/F1.jpg", title: "MOUSSE", subtitle: "Chocolate Delight", price: "18.00", link: "/recipe4" },
    { image: "/images/dd/F2.jpg", title: "BAKLAVA", subtitle: "Sweet Pastry", price: "22.00", link: "/recipe4" },
    { image: "/images/dd/F3.jpg", title: "CREAMY BASQUE CHEESECAKE", subtitle: "Spanish Style", price: "28.00", link: "/recipe4" },
    { image: "/images/dd/F4.jpg", title: "TIRAMISU", subtitle: "Italian Classic", price: "26.00", link: "/recipe4" },
    { image: "/images/dd/F5.jpg", title: "MOUSSE", subtitle: "Chocolate Delight", price: "18.00", link: "/recipe4" },
    { image: "/images/dd/F6.jpg", title: "FRENCH CREME BRULEE", subtitle: "Caramelized Top", price: "30.00", link: "/recipe4" },
    { image: "/images/dd/F7.jpg", title: "CREAMY BASQUE CHEESECAKE", subtitle: "Spanish Style", price: "28.00", link: "/recipe4" },
    { image: "/images/dd/F8.jpg", title: "APPLE MILLE FEUILLE", subtitle: "French Pastry", price: "25.00", link: "/recipe4" }
  ];

  const smartPickRecipes = [
    { image: "/images/smartp/F1.jpg", title: "SPRING ROLLS", subtitle: "Asian Appetizer", price: "20.00", link: "/recipe5" },
    { image: "/images/smartp/F2.jpg", title: "SPAGHETTI", subtitle: "Italian Pasta", price: "24.00", link: "/recipe5" },
    { image: "/images/smartp/F3.jpg", title: "LASAGNA", subtitle: "Layered Pasta", price: "28.00", link: "/recipe5" },
    { image: "/images/smartp/F4.jpg", title: "TORTILLA", subtitle: "Mexican Flatbread", price: "18.00", link: "/recipe5" },
    { image: "/images/smartp/F5.jpg", title: "STUFFED PORTOBELLO MUSHROOMS", subtitle: "Vegetarian", price: "22.00", link: "/recipe5" },
    { image: "/images/smartp/F6.jpg", title: "RATATOUILLE", subtitle: "French Vegetable", price: "26.00", link: "/recipe5" },
    { image: "/images/smartp/F7.jpg", title: "AFRICAN FUFU", subtitle: "Traditional Dish", price: "30.00", link: "/recipe5" },
    { image: "/images/smartp/F8.jpg", title: "CHICKEN PASANDA", subtitle: "Creamy Curry", price: "32.00", link: "/recipe5" }
  ];

  const soupsDrinksRecipes = [
    { image: "/images/sd/F1.jpg", title: "CREAM MUSHROOM SOUP", subtitle: "Earthy Flavor", price: "18.00", link: "/recipe6" },
    { image: "/images/sd/F2.jpg", title: "MANCHOW SOUP", subtitle: "Chinese Style", price: "20.00", link: "/recipe6" },
    { image: "/images/sd/F3.jpg", title: "SAVORY PUMPKIN SOUP", subtitle: "Autumn Special", price: "22.00", link: "/recipe6" },
    { image: "/images/sd/F4.jpg", title: "CHICKEN SOUP", subtitle: "Comfort Classic", price: "16.00", link: "/recipe6" },
    { image: "/images/sd/F5.jpg", title: "LEMON MOJITO", subtitle: "Refreshing Drink", price: "14.00", link: "/recipe6" },
    { image: "/images/sd/F6.jpg", title: "BLUE LAGOON MOJITO", subtitle: "Tropical Mix", price: "15.00", link: "/recipe6" },
    { image: "/images/sd/F7.jpg", title: "AVOCADO SMOOTHIE", subtitle: "Healthy Green", price: "18.00", link: "/recipe6" },
    { image: "/images/sd/F8.jpg", title: "DATES SHAKE", subtitle: "Sweet Energy", price: "16.00", link: "/recipe6" }
  ];

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
          <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
            <Link to="/" onClick={handleLinkClick}>Home</Link>
            <Link to="/profile" onClick={handleLinkClick}>Profile</Link>
            <Link to="/journaling" onClick={handleLinkClick}>Journaling</Link>
            <Link to="/favorites" onClick={handleLinkClick}>Favorites</Link>
            <div className="menu-divider"></div>
            <Link to="/login" onClick={handleLinkClick}>Login</Link>
            <Link to="/signup" onClick={handleLinkClick}>Sign up</Link>
            <div className="menu-divider"></div>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="headimg">
        <div className="hero-content">
          <h1>Crafted with passion, where every bite tells a story of culinary excellence</h1>
          <form onSubmit={handleSearch} className="hero-search">
            <FaSearch className="search-icon" />
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

      <nav className="min-header">
        <a href="#GC">Global Cravings</a>
        <a href="#BBB">Bites, Brunch & Bowls</a>
        <a href="#EW">Eat your Way</a>
        <a href="#DD">Desserts & Drinks</a>
        <a href="#SM">Smart Picks & Mood Meals</a>
        <a href="#SD">Soups & Drinks</a>
      </nav>

      <RecipeSection 
        id="GC" 
        title="Global Cravings" 
        recipes={globalCravingsRecipes} 
      />
      
      <RecipeSection 
        id="BBB" 
        title="Bites, Brunch & Bowls" 
        recipes={bitesBrunchRecipes} 
      />
      
      <RecipeSection 
        id="EW" 
        title="Eat your Way" 
        recipes={eatYourWayRecipes} 
      />
      
      <RecipeSection 
        id="DD" 
        title="Desserts & Drinks" 
        recipes={dessertsDrinksRecipes} 
      />
      
      <RecipeSection 
        id="SM" 
        title="Smart Picks & Mood Meals" 
        recipes={smartPickRecipes} 
      />
      
      <RecipeSection 
        id="SD" 
        title="Soups & Drinks" 
        recipes={soupsDrinksRecipes} 
      />

      <footer>
        &copy; All rights Reserved 2025
      </footer>
    </>
  );
};

export default Home;
