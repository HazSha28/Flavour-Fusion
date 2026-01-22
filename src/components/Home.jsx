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
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState({
    globalCravings: [],
    bitesBrunch: [],
    eatYourWay: [],
    dessertsDrinks: [],
    smartPicks: [],
    soupsDrinks: []
  });
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
      console.log('Searching for:', searchQuery);
      alert(`Searching for: ${searchQuery}`);
    }
  };

  // Use all original hardcoded recipes by default
  useEffect(() => {
    // Set all original hardcoded recipes organized by cuisine with appropriate images
    setRecipes({
      // Italian Cuisine
      globalCravings: [
        { image: "/images/global/F1.jpg", title: "PIZZA", subtitle: "with Vegetable", cookTime: "30 min", prepTime: "15 min", difficulty: "Easy", rating: 4.5, id: "home-pizza" },
        { image: "/images/global/F2.jpg", title: "CREAMY CARBONARA", subtitle: "Classic Roman", cookTime: "25 min", prepTime: "10 min", difficulty: "Medium", rating: 4.8, id: "home-carbonara" },
        { image: "/images/global/F3.jpg", title: "LASAGNA", subtitle: "Layered Pasta", cookTime: "60 min", prepTime: "40 min", difficulty: "Hard", rating: 4.8, id: "home-lasagna" },
        { image: "/images/global/F4.jpg", title: "TIRAMISU", subtitle: "Italian Classic", cookTime: "30 min", prepTime: "25 min", difficulty: "Medium", rating: 4.9, id: "home-tiramisu" }
      ],
      
      // Middle Eastern Cuisine
      bitesBrunch: [
        { image: "/images/bitesbb/F1.jpg", title: "HIGH PROTEIN BOWL", subtitle: "Power Breakfast", cookTime: "15 min", prepTime: "10 min", difficulty: "Easy", rating: 4.4, id: "home-high-protein-bowl" },
        { image: "/images/bitesbb/F2.jpg", title: "PEACH BANANA SMOOTHIE BOWL", subtitle: "Healthy Start", cookTime: "10 min", prepTime: "5 min", difficulty: "Easy", rating: 4.6, id: "home-smoothie-bowl" },
        { image: "/images/bitesbb/F3.jpg", title: "TURKISH POACHED EGGS", subtitle: "Mediterranean Style", cookTime: "20 min", prepTime: "12 min", difficulty: "Medium", rating: 4.7, id: "home-poached-eggs" },
        { image: "/images/bitesbb/F4.jpg", title: "MINI FRITTATA", subtitle: "Italian Egg Dish", cookTime: "25 min", prepTime: "15 min", difficulty: "Easy", rating: 4.3, id: "home-frittata" },
        { image: "/images/bitesbb/F5.jpg", title: "SHAKSHUKA WITH FETA", subtitle: "Middle Eastern", cookTime: "30 min", prepTime: "18 min", difficulty: "Medium", rating: 4.8, id: "home-shakshuka" },
        { image: "/images/bitesbb/F6.jpg", title: "GARLIC RICE WITH WHITE SAUCE CHICKEN", subtitle: "Asian Fusion", cookTime: "35 min", prepTime: "20 min", difficulty: "Medium", rating: 4.5, id: "home-garlic-rice" },
        { image: "/images/bitesbb/F7.jpg", title: "COLESLAW", subtitle: "Classic Side", cookTime: "15 min", prepTime: "10 min", difficulty: "Easy", rating: 4.1, id: "home-coleslaw" },
        { image: "/images/bitesbb/F8.jpg", title: "FRUIT SALAD", subtitle: "Fresh Mix", cookTime: "12 min", prepTime: "8 min", difficulty: "Easy", rating: 4.2, id: "home-fruit-salad" }
      ],
      
      // Mexican/Latin American Cuisine
      eatYourWay: [
        { image: "/images/eatw/f1.jpg", title: "CREAMY GARLIC SAUCE WITH STEAK AND SHRIMP", subtitle: "Luxury Dinner", cookTime: "45 min", prepTime: "25 min", difficulty: "Hard", rating: 4.9, id: "home-steak-shrimp" },
        { image: "/images/eatw/f3.jpg", title: "GRILLED SALMON", subtitle: "Healthy Choice", cookTime: "30 min", prepTime: "15 min", difficulty: "Medium", rating: 4.7, id: "home-grilled-salmon" },
        { image: "/images/eatw/f4.jpg", title: "PIE AND MASH", subtitle: "Comfort Food", cookTime: "40 min", prepTime: "20 min", difficulty: "Easy", rating: 4.4, id: "home-pie-mash" },
        { image: "/images/eatw/F2.jpg", title: "TURKISH FATAYER", subtitle: "Traditional Pastry", cookTime: "35 min", prepTime: "30 min", difficulty: "Medium", rating: 4.6, id: "home-fatayer" },
        { image: "/images/eatw/F5.jpg", title: "STUFFED SEAFOOD BOWL", subtitle: "Ocean Fresh", cookTime: "50 min", prepTime: "35 min", difficulty: "Hard", rating: 4.8, id: "home-seafood-bowl" },
        { image: "/images/eatw/F6.jpg", title: "BIRIYANI", subtitle: "Indian Special", cookTime: "55 min", prepTime: "40 min", difficulty: "Hard", rating: 4.9, id: "home-biriyani" },
        { image: "/images/eatw/F7.jpg", title: "HONEY GARLIC CHICKEN", subtitle: "Sweet & Savory", cookTime: "35 min", prepTime: "20 min", difficulty: "Medium", rating: 4.5, id: "home-honey-chicken" },
        { image: "/images/eatw/F8.jpg", title: "BUTTER CHICKEN WITH NAAN", subtitle: "Indian Classic", cookTime: "40 min", prepTime: "25 min", difficulty: "Medium", rating: 4.7, id: "home-butter-chicken" }
      ],
      
      // Asian Cuisine
      dessertsDrinks: [
        { image: "/images/dd/F1.jpg", title: "MOUSSE", subtitle: "Chocolate Delight", cookTime: "20 min", prepTime: "15 min", difficulty: "Easy", rating: 4.3, id: "home-mousse" },
        { image: "/images/dd/F2.jpg", title: "BAKLAVA", subtitle: "Sweet Pastry", cookTime: "60 min", prepTime: "45 min", difficulty: "Hard", rating: 4.6, id: "home-baklava" },
        { image: "/images/dd/F3.jpg", title: "CREAMY BASQUE CHEESECAKE", subtitle: "Spanish Style", cookTime: "45 min", prepTime: "30 min", difficulty: "Medium", rating: 4.8, id: "home-basque-cheesecake" },
        { image: "/images/dd/F4.jpg", title: "TIRAMISU", subtitle: "Italian Classic", cookTime: "30 min", prepTime: "25 min", difficulty: "Medium", rating: 4.9, id: "home-tiramisu" },
        { image: "/images/dd/F5.jpg", title: "FRENCH CREME BRULEE", subtitle: "Caramelized Top", cookTime: "40 min", prepTime: "20 min", difficulty: "Hard", rating: 4.7, id: "home-creme-brulee" },
        { image: "/images/dd/F6.jpg", title: "APPLE MILLE FEUILLE", subtitle: "French Pastry", cookTime: "35 min", prepTime: "25 min", difficulty: "Medium", rating: 4.5, id: "home-apple-mille-feuille" },
        { image: "/images/dd/F7.jpg", title: "CHOCOLATE LAVA CAKE", subtitle: "Molten Center", cookTime: "25 min", prepTime: "15 min", difficulty: "Medium", rating: 4.8, id: "home-lava-cake" },
        { image: "/images/dd/F8.jpg", title: "FRESH BERRY TART", subtitle: "Summer Delight", cookTime: "30 min", prepTime: "20 min", difficulty: "Easy", rating: 4.4, id: "home-berry-tart" }
      ],
      
      // Spanish/Mediterranean Cuisine
      smartPicks: [
        { image: "/images/smartp/F1.jpg", title: "SPANISH PAELLA", subtitle: "Seafood Special", cookTime: "45 min", prepTime: "25 min", difficulty: "Hard", rating: 4.7, id: "home-paella" },
        { image: "/images/smartp/F2.jpg", title: "GAZPACHO", subtitle: "Cold Soup", cookTime: "15 min", prepTime: "10 min", difficulty: "Easy", rating: 4.1, id: "home-gazpacho" },
        { image: "/images/smartp/F3.jpg", title: "SPANISH TAPAS", subtitle: "Small Plates", cookTime: "40 min", prepTime: "20 min", difficulty: "Medium", rating: 4.5, id: "home-tapas" },
        { image: "/images/smartp/F4.jpg", title: "SANGRIA", subtitle: "Fruit Punch", cookTime: "10 min", prepTime: "5 min", difficulty: "Easy", rating: 4.3, id: "home-sangria" },
        { image: "/images/smartp/F5.jpg", title: "MEDITERRANEAN SALAD", subtitle: "Fresh & Healthy", cookTime: "20 min", prepTime: "15 min", difficulty: "Easy", rating: 4.4, id: "home-mediterranean-salad" },
        { image: "/images/smartp/F6.jpg", title: "GRILLED SEAFOOD", subtitle: "Ocean Fresh", cookTime: "30 min", prepTime: "15 min", difficulty: "Medium", rating: 4.6, id: "home-grilled-seafood" },
        { image: "/images/smartp/F7.jpg", title: "OLIVE TAPENADE", subtitle: "Mediterranean Spread", cookTime: "10 min", prepTime: "5 min", difficulty: "Easy", rating: 4.2, id: "home-olive-tapenade" },
        { image: "/images/smartp/F8.jpg", title: "HERB CRUSTED LAMB", subtitle: "Special Occasion", cookTime: "55 min", prepTime: "30 min", difficulty: "Hard", rating: 4.8, id: "home-lamb" }
      ],
      
      // Breakfast & Brunch
      soupsDrinks: [
        { image: "/images/robg-removebg-preview.png", title: "FLUFFY PANCAKES", subtitle: "Weekend Special", cookTime: "15 min", prepTime: "10 min", difficulty: "Easy", rating: 4.6, id: "home-pancakes" },
        { image: "/images/robg-removebg-preview.png", title: "FRENCH OMELETTE", subtitle: "Classic Style", cookTime: "10 min", prepTime: "5 min", difficulty: "Easy", rating: 4.3, id: "home-omelette" },
        { image: "/images/robg-removebg-preview.png", title: "AVOCADO TOAST", subtitle: "Healthy Start", cookTime: "8 min", prepTime: "5 min", difficulty: "Easy", rating: 4.4, id: "home-avocado-toast" },
        { image: "/images/robg-removebg-preview.png", title: "BERRY SMOOTHIE", subtitle: "Healthy Blend", cookTime: "8 min", prepTime: "5 min", difficulty: "Easy", rating: 4.4, id: "home-berry-smoothie" }
      ]
    });
    setLoading(false);
  }, []);

  
  if (loading) {
    return (
      <Header>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div className="loading-spinner"></div>
          <p>Loading delicious recipes...</p>
        </div>
      </Header>
    );
  }

  return (
    <Header>
      <RecipeSection 
        id="GC" 
        title="Global Cravings" 
        recipes={recipes.globalCravings} 
      />
      
      <RecipeSection 
        id="BBB" 
        title="Bites, Brunch & Bowls" 
        recipes={recipes.bitesBrunch} 
      />
      
      <RecipeSection 
        id="EW" 
        title="Eat your Way" 
        recipes={recipes.eatYourWay} 
      />
      
      <RecipeSection 
        id="DD" 
        title="Desserts & Drinks" 
        recipes={recipes.dessertsDrinks} 
      />
      
      <RecipeSection 
        id="SM" 
        title="Smart Picks & Mood Meals" 
        recipes={recipes.smartPicks} 
      />
      
      <RecipeSection 
        id="SD" 
        title="Soups & Drinks" 
        recipes={recipes.soupsDrinks} 
      />
      
      <Footer />
    </Header>
  );
};

export default Home;
