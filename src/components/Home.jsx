import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RecipeSection from './RecipeSection';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality - could navigate to search results page
      console.log('Searching for:', searchQuery);
      // For now, just log search query
      alert(`Searching for: ${searchQuery}`);
    }
  };

  const globalCravingsRecipes = [
    { image: "/images/global/F1.jpg", title: "PIZZA", subtitle: "with Vegetable", cookTime: "30 min", prepTime: "15 min", difficulty: "Easy", rating: 4.5, link: "/recipe1" },
    { image: "/images/global/F2.jpg", title: "SHAWARMA", subtitle: "Middle Eastern Spiced", cookTime: "45 min", prepTime: "20 min", difficulty: "Medium", rating: 4.8, link: "/recipe1" },
    { image: "/images/global/F3.jpg", title: "BIRRIA TACOS", subtitle: "Slow Cooked Beef", cookTime: "60 min", prepTime: "30 min", difficulty: "Hard", rating: 4.9, link: "/recipe1" },
    { image: "/images/global/F4.jpg", title: "DUMPLINGS", subtitle: "Steamed Perfection", cookTime: "40 min", prepTime: "25 min", difficulty: "Medium", rating: 4.3, link: "/recipe1" },
    { image: "/images/global/F5.jpg", title: "PARATHA CURRY", subtitle: "Spicy Chicken", cookTime: "35 min", prepTime: "20 min", difficulty: "Medium", rating: 4.6, link: "/recipe1" },
    { image: "/images/global/F6.jpg", title: "ALFREDO PASTA", subtitle: "Cheese Loaded", cookTime: "25 min", prepTime: "10 min", difficulty: "Easy", rating: 4.7, link: "/recipe1" },
    { image: "/images/global/F7.jpg", title: "DAHI POORI", subtitle: "Crispy Street Food", cookTime: "20 min", prepTime: "15 min", difficulty: "Easy", rating: 4.2, link: "/recipe1" },
    { image: "/images/global/F8.jpg", title: "SUSHI", subtitle: "Fresh Japanese", cookTime: "50 min", prepTime: "40 min", difficulty: "Hard", rating: 4.8, link: "/recipe1" }
  ];

  const bitesBrunchRecipes = [
    { image: "/images/bitesbb/F1.jpg", title: "HIGH PROTEIN BOWL", subtitle: "Power Breakfast", cookTime: "15 min", prepTime: "10 min", difficulty: "Easy", rating: 4.4, link: "/recipe2" },
    { image: "/images/bitesbb/F2.jpg", title: "PEACH BANANA SMOOTHIE BOWL", subtitle: "Healthy Start", cookTime: "10 min", prepTime: "5 min", difficulty: "Easy", rating: 4.6, link: "/recipe2" },
    { image: "/images/bitesbb/F3.jpg", title: "TURKISH POACHED EGGS", subtitle: "Mediterranean Style", cookTime: "20 min", prepTime: "12 min", difficulty: "Medium", rating: 4.7, link: "/recipe2" },
    { image: "/images/bitesbb/F4.jpg", title: "MINI FRITTATA", subtitle: "Italian Egg Dish", cookTime: "25 min", prepTime: "15 min", difficulty: "Easy", rating: 4.3, link: "/recipe2" },
    { image: "/images/bitesbb/F5.jpg", title: "SHAKSHUKA WITH FETA", subtitle: "Middle Eastern", cookTime: "30 min", prepTime: "18 min", difficulty: "Medium", rating: 4.8, link: "/recipe2" },
    { image: "/images/bitesbb/F6.jpg", title: "GARLIC RICE WITH WHITE SAUCE CHICKEN", subtitle: "Asian Fusion", cookTime: "35 min", prepTime: "20 min", difficulty: "Medium", rating: 4.5, link: "/recipe2" },
    { image: "/images/bitesbb/F7.jpg", title: "COLESLAW", subtitle: "Classic Side", cookTime: "15 min", prepTime: "10 min", difficulty: "Easy", rating: 4.1, link: "/recipe2" },
    { image: "/images/bitesbb/F8.jpg", title: "FRUIT SALAD", subtitle: "Fresh Mix", cookTime: "12 min", prepTime: "8 min", difficulty: "Easy", rating: 4.2, link: "/recipe2" }
  ];

  const eatYourWayRecipes = [
    { image: "/images/eatw/F1.jpg", title: "CREAMY GARLIC SAUCE WITH STEAK AND SHRIMP", subtitle: "Luxury Dinner", cookTime: "45 min", prepTime: "25 min", difficulty: "Hard", rating: 4.9, link: "/recipe3" },
    { image: "/images/eatw/F2.jpg", title: "GRILLED SALMON", subtitle: "Healthy Choice", cookTime: "30 min", prepTime: "15 min", difficulty: "Medium", rating: 4.7, link: "/recipe3" },
    { image: "/images/eatw/F3.jpg", title: "PIE AND MASH", subtitle: "Comfort Food", cookTime: "40 min", prepTime: "20 min", difficulty: "Easy", rating: 4.4, link: "/recipe3" },
    { image: "/images/eatw/F4.jpg", title: "TURKISH FATAYER", subtitle: "Traditional Pastry", cookTime: "35 min", prepTime: "30 min", difficulty: "Medium", rating: 4.6, link: "/recipe3" },
    { image: "/images/eatw/F5.jpg", title: "STUFFED SEAFOOD BOWL", subtitle: "Ocean Fresh", cookTime: "50 min", prepTime: "35 min", difficulty: "Hard", rating: 4.8, link: "/recipe3" },
    { image: "/images/eatw/F6.jpg", title: "BIRIYANI", subtitle: "Indian Special", cookTime: "55 min", prepTime: "40 min", difficulty: "Hard", rating: 4.9, link: "/recipe3" },
    { image: "/images/eatw/F7.jpg", title: "HONEY GARLIC CHICKEN", subtitle: "Sweet & Savory", cookTime: "35 min", prepTime: "20 min", difficulty: "Medium", rating: 4.5, link: "/recipe3" },
    { image: "/images/eatw/F8.jpg", title: "BUTTER CHICKEN WITH NAAN", subtitle: "Indian Classic", cookTime: "40 min", prepTime: "25 min", difficulty: "Medium", rating: 4.7, link: "/recipe3" }
  ];

  const dessertsDrinksRecipes = [
    { image: "/images/dd/F1.jpg", title: "MOUSSE", subtitle: "Chocolate Delight", cookTime: "20 min", prepTime: "15 min", difficulty: "Easy", rating: 4.3, link: "/recipe4" },
    { image: "/images/dd/F2.jpg", title: "BAKLAVA", subtitle: "Sweet Pastry", cookTime: "60 min", prepTime: "45 min", difficulty: "Hard", rating: 4.6, link: "/recipe4" },
    { image: "/images/dd/F3.jpg", title: "CREAMY BASQUE CHEESECAKE", subtitle: "Spanish Style", cookTime: "45 min", prepTime: "30 min", difficulty: "Medium", rating: 4.8, link: "/recipe4" },
    { image: "/images/dd/F4.jpg", title: "TIRAMISU", subtitle: "Italian Classic", cookTime: "30 min", prepTime: "25 min", difficulty: "Medium", rating: 4.9, link: "/recipe4" },
    { image: "/images/dd/F5.jpg", title: "MOUSSE", subtitle: "Chocolate Delight", cookTime: "20 min", prepTime: "15 min", difficulty: "Easy", rating: 4.3, link: "/recipe4" },
    { image: "/images/dd/F6.jpg", title: "FRENCH CREME BRULEE", subtitle: "Caramelized Top", cookTime: "40 min", prepTime: "20 min", difficulty: "Hard", rating: 4.7, link: "/recipe4" },
    { image: "/images/dd/F7.jpg", title: "CREAMY BASQUE CHEESECAKE", subtitle: "Spanish Style", cookTime: "45 min", prepTime: "30 min", difficulty: "Medium", rating: 4.8, link: "/recipe4" },
    { image: "/images/dd/F8.jpg", title: "APPLE MILLE FEUILLE", subtitle: "French Pastry", cookTime: "35 min", prepTime: "25 min", difficulty: "Medium", rating: 4.5, link: "/recipe4" }
  ];

  const smartPickRecipes = [
    { image: "/images/smartp/F1.jpg", title: "SPRING ROLLS", subtitle: "Asian Appetizer", cookTime: "25 min", prepTime: "20 min", difficulty: "Easy", rating: 4.2, link: "/recipe5" },
    { image: "/images/smartp/F2.jpg", title: "SPAGHETTI", subtitle: "Italian Pasta", cookTime: "30 min", prepTime: "15 min", difficulty: "Easy", rating: 4.4, link: "/recipe5" },
    { image: "/images/smartp/F3.jpg", title: "LASAGNA", subtitle: "Layered Pasta", cookTime: "60 min", prepTime: "40 min", difficulty: "Hard", rating: 4.8, link: "/recipe5" },
    { image: "/images/smartp/F4.jpg", title: "TORTILLA", subtitle: "Mexican Flatbread", cookTime: "15 min", prepTime: "10 min", difficulty: "Easy", rating: 4.1, link: "/recipe5" },
    { image: "/images/smartp/F5.jpg", title: "STUFFED PORTOBELLO MUSHROOMS", subtitle: "Vegetarian", cookTime: "35 min", prepTime: "25 min", difficulty: "Medium", rating: 4.5, link: "/recipe5" },
    { image: "/images/smartp/F6.jpg", title: "RATATOUILLE", subtitle: "French Vegetable", cookTime: "40 min", prepTime: "30 min", difficulty: "Medium", rating: 4.3, link: "/recipe5" },
    { image: "/images/smartp/F7.jpg", title: "AFRICAN FUFU", subtitle: "Traditional Dish", cookTime: "50 min", prepTime: "35 min", difficulty: "Hard", rating: 4.6, link: "/recipe5" },
    { image: "/images/smartp/F8.jpg", title: "CHICKEN PASANDA", subtitle: "Creamy Curry", cookTime: "45 min", prepTime: "30 min", difficulty: "Medium", rating: 4.7, link: "/recipe5" }
  ];

  const soupsDrinksRecipes = [
    { image: "/images/sd/F1.jpg", title: "CREAM MUSHROOM SOUP", subtitle: "Earthy Flavor", cookTime: "25 min", prepTime: "15 min", difficulty: "Easy", rating: 4.3, link: "/recipe6" },
    { image: "/images/sd/F2.jpg", title: "MANCHOW SOUP", subtitle: "Chinese Style", cookTime: "20 min", prepTime: "12 min", difficulty: "Easy", rating: 4.4, link: "/recipe6" },
    { image: "/images/sd/F3.jpg", title: "SAVORY PUMPKIN SOUP", subtitle: "Autumn Special", cookTime: "30 min", prepTime: "18 min", difficulty: "Medium", rating: 4.5, link: "/recipe6" },
    { image: "/images/sd/F4.jpg", title: "CHICKEN SOUP", subtitle: "Comfort Classic", cookTime: "35 min", prepTime: "20 min", difficulty: "Easy", rating: 4.6, link: "/recipe6" },
    { image: "/images/sd/F5.jpg", title: "LEMON MOJITO", subtitle: "Refreshing Drink", cookTime: "5 min", prepTime: "3 min", difficulty: "Easy", rating: 4.2, link: "/recipe6" },
    { image: "/images/sd/F6.jpg", title: "BLUE LAGOON MOJITO", subtitle: "Tropical Mix", cookTime: "5 min", prepTime: "3 min", difficulty: "Easy", rating: 4.3, link: "/recipe6" },
    { image: "/images/sd/F7.jpg", title: "AVOCADO SMOOTHIE", subtitle: "Healthy Green", cookTime: "8 min", prepTime: "5 min", difficulty: "Easy", rating: 4.4, link: "/recipe6" },
    { image: "/images/sd/F8.jpg", title: "DATES SHAKE", subtitle: "Sweet Energy", cookTime: "6 min", prepTime: "4 min", difficulty: "Easy", rating: 4.1, link: "/recipe6" }
  ];

  return (
    <Header>
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
      
      <Footer />
    </Header>
  );
};

export default Home;
