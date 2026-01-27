import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { FaSearch, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import '../index.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Home page recipes organized by cuisine with appropriate images
  const homeRecipes = [
    // Italian Cuisine
    { id: 'home-pizza', title: 'PIZZA', subtitle: 'with Vegetable', image: '/images/global/F1.jpg', category: 'Italian', difficulty: 'Easy', rating: 4.5, time: '45 min' },
    { id: 'home-pasta', title: 'CREAMY CARBONARA', subtitle: 'Classic Roman', image: '/images/global/F3.jpg', category: 'Italian', difficulty: 'Medium', rating: 4.8, time: '25 min' },
    { id: 'home-lasagna', title: 'LASAGNA', subtitle: 'Layered Pasta', image: '/images/global/F4.jpg', category: 'Italian', difficulty: 'Hard', rating: 4.8, time: '100 min' },
    
    // Middle Eastern Cuisine
    { id: 'home-shawarma', title: 'SHAWARMA', subtitle: 'Middle Eastern Spiced', image: '/images/global/F2.jpg', category: 'Middle Eastern', difficulty: 'Medium', rating: 4.8, time: '65 min' },
    { id: 'home-shakshuka', title: 'SHAKSHUKA WITH FETA', subtitle: 'Middle Eastern', image: '/images/global/F3.jpg', category: 'Middle Eastern', difficulty: 'Medium', rating: 4.8, time: '48 min' },
    { id: 'home-falafel', title: 'FALAFEL PLATTER', subtitle: 'Chickpea Delights', image: '/images/global/F4.jpg', category: 'Middle Eastern', difficulty: 'Easy', rating: 4.5, time: '35 min' },
    
    // Main Course & Hearty Meals
    { id: 'home-steak-shrimp', title: 'CREAMY GARLIC SAUCE WITH STEAK AND SHRIMP', subtitle: 'Luxury Dinner', image: '/images/eatw/f1.jpg', category: 'Main Course', area: 'International', cookTime: '45 min', prepTime: '25 min', difficulty: 'Hard', rating: 4.9, time: '70 min' },
    { id: 'home-grilled-salmon', title: 'GRILLED SALMON', subtitle: 'Healthy Choice', image: '/images/eatw/f3.jpg', category: 'Seafood', area: 'International', cookTime: '30 min', prepTime: '15 min', difficulty: 'Medium', rating: 4.7, time: '45 min' },
    { id: 'home-pie-mash', title: 'PIE AND MASH', subtitle: 'Comfort Food', image: '/images/eatw/f4.jpg', category: 'Comfort Food', area: 'British', cookTime: '40 min', prepTime: '20 min', difficulty: 'Easy', rating: 4.4, time: '60 min' },
    { id: 'home-fatayer', title: 'TURKISH FATAYER', subtitle: 'Traditional Pastry', image: '/images/eatw/F2.jpg', category: 'Pastry', area: 'Turkish', cookTime: '35 min', prepTime: '30 min', difficulty: 'Medium', rating: 4.6, time: '65 min' },
    { id: 'home-seafood-bowl', title: 'STUFFED SEAFOOD BOWL', subtitle: 'Ocean Fresh', image: '/images/eatw/F5.jpg', category: 'Seafood', area: 'International', cookTime: '50 min', prepTime: '35 min', difficulty: 'Hard', rating: 4.8, time: '85 min' },
    { id: 'home-biriyani', title: 'BIRIYANI', subtitle: 'Indian Special', image: '/images/eatw/F6.jpg', category: 'Indian', area: 'Indian', cookTime: '55 min', prepTime: '40 min', difficulty: 'Hard', rating: 4.9, time: '95 min' },
    { id: 'home-honey-chicken', title: 'HONEY GARLIC CHICKEN', subtitle: 'Sweet & Savory', image: '/images/eatw/F7.jpg', category: 'Chicken', area: 'Asian', cookTime: '35 min', prepTime: '20 min', difficulty: 'Medium', rating: 4.5, time: '55 min' },
    { id: 'home-butter-chicken', title: 'BUTTER CHICKEN WITH NAAN', subtitle: 'Indian Classic', image: '/images/eatw/F8.jpg', category: 'Indian', area: 'Indian', cookTime: '40 min', prepTime: '25 min', difficulty: 'Medium', rating: 4.7, time: '65 min' },
    
    // Asian Cuisine
    { id: 'home-dumplings', title: 'DUMPLINGS', subtitle: 'Steamed Perfection', image: '/images/global/F5.jpg', category: 'Chinese', difficulty: 'Medium', rating: 4.3, time: '65 min' },
    { id: 'home-sushi', title: 'CALIFORNIA ROLLS', subtitle: 'Japanese Style', image: '/images/global/F6.jpg', category: 'Japanese', difficulty: 'Hard', rating: 4.6, time: '50 min' },
    { id: 'home-pad-thai', title: 'PAD THAI', subtitle: 'Thai Noodles', image: '/images/global/F7.jpg', category: 'Thai', difficulty: 'Medium', rating: 4.7, time: '30 min' },
    { id: 'home-stir-fry', title: 'VEGETABLE STIR FRY', subtitle: 'Asian Mix', image: '/images/global/F8.jpg', category: 'Asian', difficulty: 'Easy', rating: 4.2, time: '20 min' },
    
    // Spanish/Mediterranean Cuisine
    { id: 'home-paella', title: 'SPANISH PAELLA', subtitle: 'Seafood Special', image: '/images/smartp/F1.jpg', category: 'Spanish', difficulty: 'Hard', rating: 4.7, time: '70 min' },
    { id: 'home-gazpacho', title: 'GAZPACHO', subtitle: 'Cold Soup', image: '/images/smartp/F2.jpg', category: 'Spanish', difficulty: 'Easy', rating: 4.1, time: '15 min' },
    { id: 'home-tapas', title: 'SPANISH TAPAS', subtitle: 'Small Plates', image: '/images/smartp/F3.jpg', category: 'Spanish', difficulty: 'Medium', rating: 4.5, time: '40 min' },
    { id: 'home-sangria', title: 'SANGRIA', subtitle: 'Fruit Punch', image: '/images/smartp/F4.jpg', category: 'Drink', area: 'Spanish', cookTime: '10 min', prepTime: '5 min', difficulty: 'Easy', rating: 4.3, time: '15 min' },
    { id: 'home-mediterranean-salad', title: 'MEDITERRANEAN SALAD', subtitle: 'Fresh & Healthy', image: '/images/smartp/F5.jpg', category: 'Salad', area: 'Mediterranean', cookTime: '20 min', prepTime: '15 min', difficulty: 'Easy', rating: 4.4, time: '35 min' },
    { id: 'home-grilled-seafood', title: 'GRILLED SEAFOOD', subtitle: 'Ocean Fresh', image: '/images/smartp/F6.jpg', category: 'Seafood', area: 'Mediterranean', cookTime: '30 min', prepTime: '15 min', difficulty: 'Medium', rating: 4.6, time: '45 min' },
    { id: 'home-olive-tapenade', title: 'OLIVE TAPENADE', subtitle: 'Mediterranean Spread', image: '/images/smartp/F7.jpg', category: 'Appetizer', area: 'Mediterranean', cookTime: '10 min', prepTime: '5 min', difficulty: 'Easy', rating: 4.2, time: '15 min' },
    { id: 'home-lamb', title: 'HERB CRUSTED LAMB', subtitle: 'Special Occasion', image: '/images/smartp/F8.jpg', category: 'Main Course', area: 'Mediterranean', cookTime: '55 min', prepTime: '30 min', difficulty: 'Hard', rating: 4.8, time: '85 min' },
    
    // Breakfast & Brunch
    { id: 'home-high-protein-bowl', title: 'HIGH PROTEIN BOWL', subtitle: 'Power Breakfast', image: '/images/bitesbb/F1.jpg', category: 'Breakfast', area: 'American', cookTime: '15 min', prepTime: '10 min', difficulty: 'Easy', rating: 4.4, time: '25 min' },
    { id: 'home-smoothie-bowl', title: 'PEACH BANANA SMOOTHIE BOWL', subtitle: 'Healthy Start', image: '/images/bitesbb/F2.jpg', category: 'Breakfast', area: 'International', cookTime: '10 min', prepTime: '5 min', difficulty: 'Easy', rating: 4.6, time: '15 min' },
    { id: 'home-poached-eggs', title: 'TURKISH POACHED EGGS', subtitle: 'Mediterranean Style', image: '/images/bitesbb/F3.jpg', category: 'Breakfast', area: 'Turkish', cookTime: '20 min', prepTime: '12 min', difficulty: 'Medium', rating: 4.7, time: '32 min' },
    { id: 'home-frittata', title: 'MINI FRITTATA', subtitle: 'Italian Egg Dish', image: '/images/bitesbb/F4.jpg', category: 'Breakfast', area: 'Italian', cookTime: '25 min', prepTime: '15 min', difficulty: 'Easy', rating: 4.3, time: '40 min' },
    { id: 'home-shakshuka', title: 'SHAKSHUKA WITH FETA', subtitle: 'Middle Eastern', image: '/images/bitesbb/F5.jpg', category: 'Breakfast', area: 'Middle Eastern', cookTime: '30 min', prepTime: '18 min', difficulty: 'Medium', rating: 4.8, time: '48 min' },
    { id: 'home-garlic-rice', title: 'GARLIC RICE WITH WHITE SAUCE CHICKEN', subtitle: 'Asian Fusion', image: '/images/bitesbb/F6.jpg', category: 'Brunch', area: 'Asian', cookTime: '35 min', prepTime: '20 min', difficulty: 'Medium', rating: 4.5, time: '55 min' },
    { id: 'home-coleslaw', title: 'COLESLAW', subtitle: 'Classic Side', image: '/images/bitesbb/F7.jpg', category: 'Side Dish', area: 'American', cookTime: '15 min', prepTime: '10 min', difficulty: 'Easy', rating: 4.1, time: '25 min' },
    { id: 'home-fruit-salad', title: 'FRUIT SALAD', subtitle: 'Fresh Mix', image: '/images/bitesbb/F8.jpg', category: 'Healthy', area: 'International', cookTime: '12 min', prepTime: '8 min', difficulty: 'Easy', rating: 4.2, time: '20 min' },
    
    // Desserts
    { id: 'home-mousse', title: 'MOUSSE', subtitle: 'Chocolate Delight', image: '/images/dd/F1.jpg', category: 'Dessert', area: 'French', cookTime: '20 min', prepTime: '15 min', difficulty: 'Easy', rating: 4.3, time: '35 min' },
    { id: 'home-baklava', title: 'BAKLAVA', subtitle: 'Sweet Pastry', image: '/images/dd/F2.jpg', category: 'Dessert', area: 'Middle Eastern', cookTime: '60 min', prepTime: '45 min', difficulty: 'Hard', rating: 4.6, time: '105 min' },
    { id: 'home-basque-cheesecake', title: 'CREAMY BASQUE CHEESECAKE', subtitle: 'Spanish Style', image: '/images/dd/F3.jpg', category: 'Dessert', area: 'Spanish', cookTime: '45 min', prepTime: '30 min', difficulty: 'Medium', rating: 4.8, time: '75 min' },
    { id: 'home-tiramisu', title: 'TIRAMISU', subtitle: 'Italian Classic', image: '/images/dd/F4.jpg', category: 'Dessert', area: 'Italian', cookTime: '30 min', prepTime: '25 min', difficulty: 'Medium', rating: 4.9, time: '55 min' },
    { id: 'home-creme-brulee', title: 'FRENCH CREME BRULEE', subtitle: 'Caramelized Top', image: '/images/dd/F5.jpg', category: 'Dessert', area: 'French', cookTime: '40 min', prepTime: '20 min', difficulty: 'Hard', rating: 4.7, time: '60 min' },
    { id: 'home-mille-feuille', title: 'APPLE MILLE FEUILLE', subtitle: 'French Pastry', image: '/images/dd/F6.jpg', category: 'Dessert', area: 'French', cookTime: '35 min', prepTime: '25 min', difficulty: 'Medium', rating: 4.5, time: '60 min' },
    { id: 'home-lava-cake', title: 'CHOCOLATE LAVA CAKE', subtitle: 'Molten Center', image: '/images/dd/F7.jpg', category: 'Dessert', area: 'International', cookTime: '25 min', prepTime: '15 min', difficulty: 'Medium', rating: 4.8, time: '40 min' },
    { id: 'home-berry-tart', title: 'FRESH BERRY TART', subtitle: 'Summer Delight', image: '/images/dd/F8.jpg', category: 'Dessert', area: 'French', cookTime: '30 min', prepTime: '20 min', difficulty: 'Easy', rating: 4.4, time: '50 min' },
    
    // Soups
    { id: 'home-tomato-soup', title: 'TOMATO BASIL SOUP', subtitle: 'Comfort Bowl', image: '/images/head-removebg-preview.png', category: 'Soup', area: 'Italian', cookTime: '25 min', prepTime: '10 min', difficulty: 'Easy', rating: 4.2, time: '35 min' },
    { id: 'home-chicken-noodle', title: 'CHICKEN NOODLE SOUP', subtitle: 'Healing Bowl', image: '/images/head-removebg-preview.png', category: 'Soup', area: 'American', cookTime: '35 min', prepTime: '15 min', difficulty: 'Easy', rating: 4.6, time: '50 min' },
    { id: 'home-miso-soup', title: 'MISO SOUP', subtitle: 'Japanese Style', image: '/images/robg-removebg-preview.png', category: 'Soup', area: 'Japanese', cookTime: '15 min', prepTime: '5 min', difficulty: 'Easy', rating: 4.1, time: '20 min' },
    
    // Drinks & Beverages
    { id: 'home-lemonade', title: 'FRESH LEMONADE', subtitle: 'Summer Refresher', image: '/images/sd/F4.jpg', category: 'Drink', area: 'International', cookTime: '5 min', prepTime: '3 min', difficulty: 'Easy', rating: 4.2, time: '8 min' },
    { id: 'home-smoothie', title: 'BERRY SMOOTHIE', subtitle: 'Healthy Blend', image: '/images/sd/F5.jpg', category: 'Drink', area: 'International', cookTime: '8 min', prepTime: '5 min', difficulty: 'Easy', rating: 4.4, time: '13 min' },
    { id: 'home-iced-tea', title: 'ICED TEA', subtitle: 'Southern Sweet', image: '/images/sd/F6.jpg', category: 'Drink', area: 'American', cookTime: '10 min', prepTime: '60 min', difficulty: 'Easy', rating: 4.3, time: '70 min' }
  ];

  const defaultRecipes = [
    {
      id: 'default-pizza',
      title: 'Classic Margherita Pizza',
      image: 'https://www.themealdb.com/images/media/meals/llcbn0307460722622.jpg',
      category: 'Italian',
      area: 'Italian',
      instructions: 'Traditional Italian pizza with tomatoes, mozzarella, and fresh basil.',
      ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil'],
      rating: 4.5,
      time: '30 min',
      cookTime: '25 min'
    },
    {
      id: 'default-pasta',
      title: 'Creamy Carbonara',
      image: 'https://www.themealdb.com/images/media/meals/urtpxmds1467227228.jpg',
      category: 'Italian',
      area: 'Italian',
      instructions: 'Classic Roman pasta with eggs, cheese, and pancetta.',
      ingredients: ['Spaghetti', 'Eggs', 'Pecorino cheese', 'Pancetta', 'Black pepper'],
      rating: 4.8,
      time: '20 min',
      cookTime: '15 min'
    },
    {
      id: 'default-sushi',
      title: 'California Roll',
      image: 'https://www.themealdb.com/images/media/meals/xqvipprwqq1485343190.jpg',
      category: 'Japanese',
      area: 'Japanese',
      instructions: 'Popular sushi roll with crab, avocado, and cucumber.',
      ingredients: ['Sushi rice', 'Nori', 'Crab meat', 'Avocado', 'Cucumber', 'Sesame seeds'],
      rating: 4.2,
      time: '25 min',
      cookTime: '20 min'
    }
  ];

  // Search home page recipes by name or category
  const searchHomePageRecipes = (searchQuery) => {
    const lowerQuery = searchQuery.toLowerCase();
    return homeRecipes.filter(recipe => 
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.subtitle.toLowerCase().includes(lowerQuery) ||
      recipe.category.toLowerCase().includes(lowerQuery) ||
      (recipe.area && recipe.area.toLowerCase().includes(lowerQuery))
    );
  };

  // Search only home page recipes
  const searchRecipes = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      
      // Search home page recipes
      const homePageResults = searchHomePageRecipes(searchQuery);
      console.log(`Found ${homePageResults.length} recipes from home page`);
      setRecipes(homePageResults);
      
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search recipes');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      // Search for recipes when there's a query
      searchRecipes(query);
    } else {
      // Show all home page recipes when no search query
      setRecipes(homeRecipes);
      setLoading(false);
      setError(null);
    }
  }, [query]);

  if (loading) {
    return (
      <div className="search-results-loading">
        <FaSpinner className="spinner" />
        <p>Searching for recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-error">
        <FaExclamationTriangle />
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => searchRecipes(query)} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="search-results-empty">
        <FaSearch />
        <h2>Featured Recipes</h2>
        <p>Discover our handpicked selection of delicious recipes from around the world!</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="search-results-empty">
        <FaSearch />
        <h2>No Recipes Found</h2>
        <p>We couldn't find any recipes matching "{query}". Try different keywords!</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="search-header">
        <h1>Search Results</h1>
        <p>Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} for "{query}" from multiple sources</p>
        {recipes.length > 0 && (
          <div className="api-sources">
            <span className="source-badge">Home Page</span>
            <span className="source-badge">TheMealDB</span>
          </div>
        )}
      </div>
      
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <RecipeCard 
            key={recipe.id}
            id={recipe.id}
            title={recipe.title}
            image={recipe.image}
            category={recipe.category}
            rating={recipe.rating}
            time={recipe.time}
            cookTime={recipe.cookTime}
            subtitle={recipe.area}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
