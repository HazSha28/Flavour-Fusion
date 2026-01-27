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
    // ---------------- GLOBAL / WORLD CUISINE ----------------
    setRecipes({
      globalCravings: [
  {
    image: "/images/global/F1.jpg",
    title: "PIZZA",
    subtitle: "Vegetable Loaded Classic",
    cookTime: "30 min",
    prepTime: "15 min",
    difficulty: "Easy",
    rating: 4.5,
    id: "home-pizza"
  },
  {
    image: "/images/global/F2.jpg",
    title: "SHAWARMA",
    subtitle: "Middle Eastern Wrap",
    cookTime: "25 min",
    prepTime: "10 min",
    difficulty: "Easy",
    rating: 4.7,
    id: "home-shawarma"
  },
  {
    image: "/images/global/F3.jpg",
    title: "BIRRIA TACOS",
    subtitle: "Mexican Slow-Cooked Beef",
    cookTime: "60 min",
    prepTime: "40 min",
    difficulty: "Hard",
    rating: 4.8,
    id: "home-birria-tacos"
  },
  {
    image: "/images/global/F4.jpg",
    title: "DUMPLINGS",
    subtitle: "Asian Comfort Food",
    cookTime: "30 min",
    prepTime: "25 min",
    difficulty: "Medium",
    rating: 4.9,
    id: "home-dumplings"
  },
  {
    image: "/images/global/F5.jpg",
    title: "PARATHA CURRY",
    subtitle: "Spicy Chicken",
    cookTime: "35 min",
    prepTime: "20 min",
    difficulty: "Medium",
    rating: 4.6,
    id: "home-paratha-curry"
  },
  {
    image: "/images/global/F6.jpg",
    title: "ALFREDO PASTA",
    subtitle: "Cheese Loaded",
    cookTime: "30 min",
    prepTime: "20 min",
    difficulty: "Medium",
    rating: 4.7,
    id: "home-alfredo-pasta"
  },
  {
    image: "/images/global/F7.jpg",
    title: "DAHI POORI",
    subtitle: "Crispy Street Food",
    cookTime: "20 min",
    prepTime: "15 min",
    difficulty: "Medium",
    rating: 4.8,
    id: "home-dahi-poori"
  },
  {
    image: "/images/global/F8.jpg",
    title: "SUSHI",
    subtitle: "Fresh Japanese",
    cookTime: "35 min",
    prepTime: "25 min",
    difficulty: "Hard",
    rating: 4.7,
    id: "home-sushi"
  }
],

      // ---------------- BREAKFAST & BRUNCH ----------------
      bitesBrunch: [
  {
    image: "/images/bitesbb/F1.jpg",
    title: "HIGH PROTEIN BOWL",
    subtitle: "Power Packed Breakfast",
    cookTime: "15 min",
    prepTime: "10 min",
    difficulty: "Easy",
    rating: 4.4,
    id: "brunch-protein-bowl"
  },
  {
    image: "/images/bitesbb/F2.jpg",
    title: "PEACH BANANA SMOOTHIE BOWL",
    subtitle: "Healthy Morning Start",
    cookTime: "10 min",
    prepTime: "5 min",
    difficulty: "Easy",
    rating: 4.6,
    id: "brunch-smoothie-bowl"
  },
  {
    image: "/images/bitesbb/F3.jpg",
    title: "TURKISH POACHED EGGS",
    subtitle: "Mediterranean Egg Dish",
    cookTime: "20 min",
    prepTime: "12 min",
    difficulty: "Medium",
    rating: 4.7,
    id: "brunch-turkish-eggs"
  },
  {
    image: "/images/bitesbb/F4.jpg",
    title: "MINI FRITTATA",
    subtitle: "Italian Egg Bake",
    cookTime: "25 min",
    prepTime: "15 min",
    difficulty: "Easy",
    rating: 4.3,
    id: "brunch-frittata"
  },
  {
    image: "/images/bitesbb/F5.jpg",
    title: "SHAKSHUKA WITH FETA",
    subtitle: "Middle Eastern Skillet",
    cookTime: "30 min",
    prepTime: "18 min",
    difficulty: "Medium",
    rating: 4.8,
    id: "brunch-shakshuka"
  },
  {
    image: "/images/bitesbb/F6.jpg",
    title: "GARLIC RICE WITH WHITE SAUCE CHICKEN",
    subtitle: "Asian Fusion Bowl",
    cookTime: "35 min",
    prepTime: "20 min",
    difficulty: "Medium",
    rating: 4.5,
    id: "brunch-garlic-rice-chicken"
  },
  {
    image: "/images/bitesbb/F7.jpg",
    title: "COLESLAW",
    subtitle: "Classic Crunchy Side",
    cookTime: "15 min",
    prepTime: "10 min",
    difficulty: "Easy",
    rating: 4.1,
    id: "brunch-coleslaw"
  },
  {
    image: "/images/bitesbb/F8.jpg",
    title: "FRUIT SALAD",
    subtitle: "Fresh Seasonal Mix",
    cookTime: "12 min",
    prepTime: "8 min",
    difficulty: "Easy",
    rating: 4.2,
    id: "brunch-fruit-salad"
  }
],

      // ---------------- MAINS & DINNER ----------------
      eatYourWay: [
  {
    image: "/images/eatw/F1.jpg",
    title: "CREAMY GARLIC STEAK & SHRIMP",
    subtitle: "Luxury Surf & Turf",
    cookTime: "45 min",
    prepTime: "25 min",
    difficulty: "Hard",
    rating: 4.9,
    id: "dinner-steak-shrimp"
  },
    {
    image: "/images/eatw/F2.jpg",
    title: "GRILLED SALMON",
    subtitle: "Protein Rich Seafood",
    cookTime: "35 min",
    prepTime: "30 min",
    difficulty: "Medium",
    rating: 4.6,
    id: "dinner-grilled-salmon"
  },
  {
    image: "/images/eatw/F2.jpg",
    title: "PIE AND MASH",
    subtitle: "British Comfort Classic",
    cookTime: "30 min",
    prepTime: "15 min",
    difficulty: "Medium",
    rating: 4.7,
    id: "dinner-pie-mash"
  },
  {
    image: "/images/eatw/F3.jpg",
    title: "TURKISH FATAYER",
    subtitle: "Middle Eastern Pastry",
    cookTime: "40 min",
    prepTime: "20 min",
    difficulty: "Medium",
    rating: 4.4,
    id: "dinner-fatayer"
  },
  {
    image: "/images/eatw/F5.jpg",
    title: "STUFFED SEAFOOD BOWL",
    subtitle: "Ocean Fresh Feast",
    cookTime: "50 min",
    prepTime: "35 min",
    difficulty: "Hard",
    rating: 4.8,
    id: "dinner-seafood-bowl"
  },
  {
    image: "/images/eatw/F6.jpg",
    title: "BIRIYANI",
    subtitle: "Traditional Indian Rice Dish",
    cookTime: "55 min",
    prepTime: "40 min",
    difficulty: "Hard",
    rating: 4.9,
    id: "dinner-biriyani"
  },
  {
    image: "/images/eatw/F7.jpg",
    title: "HONEY GARLIC CHICKEN",
    subtitle: "Sweet & Savory Glaze",
    cookTime: "35 min",
    prepTime: "20 min",
    difficulty: "Medium",
    rating: 4.5,
    id: "dinner-honey-garlic-chicken"
  },
  {
    image: "/images/eatw/F8.jpg",
    title: "BUTTER CHICKEN WITH NAAN",
    subtitle: "North Indian Favorite",
    cookTime: "40 min",
    prepTime: "25 min",
    difficulty: "Medium",
    rating: 4.7,
    id: "dinner-butter-chicken"
  }
],

      // ---------------- DESSERTS & DRINKS ----------------
      dessertsDrinks: [
  {
    image: "/images/dd/F1.jpg",
    title: "CHOCOLATE MOUSSE",
    subtitle: "Light & Creamy Dessert",
    cookTime: "20 min",
    prepTime: "15 min",
    difficulty: "Easy",
    rating: 4.3,
    id: "dessert-mousse"
  },
  {
    image: "/images/dd/F2.jpg",
    title: "BAKLAVA",
    subtitle: "Middle Eastern Sweet Pastry",
    cookTime: "60 min",
    prepTime: "45 min",
    difficulty: "Hard",
    rating: 4.6,
    id: "dessert-baklava"
  },
  {
    image: "/images/dd/F3.jpg",
    title: "BASQUE CHEESECAKE",
    subtitle: "Spanish Burnt Cheesecake",
    cookTime: "45 min",
    prepTime: "30 min",
    difficulty: "Medium",
    rating: 4.8,
    id: "dessert-basque-cheesecake"
  },
  {
    image: "/images/dd/F4.jpg",
    title: "TIRAMISU",
    subtitle: "Italian Coffee Dessert",
    cookTime: "30 min",
    prepTime: "25 min",
    difficulty: "Medium",
    rating: 4.9,
    id: "dessert-tiramisu"
  },
  {
    image: "/images/dd/F5.jpg",
    title: "CREME BRULEE",
    subtitle: "French Caramel Dessert",
    cookTime: "40 min",
    prepTime: "20 min",
    difficulty: "Hard",
    rating: 4.7,
    id: "dessert-creme-brulee"
  },
  {
    image: "/images/dd/F6.jpg",
    title: "APPLE MILLE FEUILLE",
    subtitle: "Classic French Pastry",
    cookTime: "35 min",
    prepTime: "25 min",
    difficulty: "Medium",
    rating: 4.5,
    id: "dessert-mille-feuille"
  },
  {
    image: "/images/dd/F7.jpg",
    title: "CHOCOLATE LAVA CAKE",
    subtitle: "Molten Center Dessert",
    cookTime: "25 min",
    prepTime: "15 min",
    difficulty: "Medium",
    rating: 4.8,
    id: "dessert-lava-cake"
  },
  {
    image: "/images/dd/F8.jpg",
    title: "FRESH BERRY TART",
    subtitle: "Seasonal Fruit Dessert",
    cookTime: "30 min",
    prepTime: "20 min",
    difficulty: "Easy",
    rating: 4.4,
    id: "dessert-berry-tart"
  }
],

      // ---------------- SMART PICKS & MOOD MEALS ----------------
smartPicks: [
  {
    image: "/images/smartp/F1.jpg",
    title: "CRISPY SPRING ROLLS",
    subtitle: "Asian Appetizer",
    cookTime: "25 min",
    prepTime: "15 min",
    difficulty: "Medium",
    rating: 4.6,
    id: "smart-spring-rolls"
  },
  {
    image: "/images/smartp/F2.jpg",
    title: "SPAGHETTI BOLOGNESE",
    subtitle: "Italian Classic Pasta",
    cookTime: "30 min",
    prepTime: "15 min",
    difficulty: "Medium",
    rating: 4.7,
    id: "smart-spaghetti-bolognese"
  },
  {
    image: "/images/smartp/F3.jpg",
    title: "LASAGNA",
    subtitle: "Layered Italian Bake",
    cookTime: "45 min",
    prepTime: "25 min",
    difficulty: "Hard",
    rating: 4.8,
    id: "smart-lasagna"
  },
  {
    image: "/images/smartp/F4.jpg",
    title: "TORTILLA ESPAÑOLA",
    subtitle: "Spanish Potato Omelette",
    cookTime: "25 min",
    prepTime: "15 min",
    difficulty: "Easy",
    rating: 4.5,
    id: "smart-tortilla-espanola"
  },
  {
    image: "/images/smartp/F5.jpg",
    title: "STUFFED PORTOBELLO MUSHROOMS",
    subtitle: "Vegetarian Gourmet",
    cookTime: "30 min",
    prepTime: "20 min",
    difficulty: "Medium",
    rating: 4.6,
    id: "smart-stuffed-mushroom"
  },
  {
    image: "/images/smartp/F6.jpg",
    title: "RATATOUILLE",
    subtitle: "French Vegetable Medley",
    cookTime: "35 min",
    prepTime: "25 min",
    difficulty: "Medium",
    rating: 4.7,
    id: "smart-ratatouille"
  },
  {
    image: "/images/smartp/F7.jpg",
    title: "AFRICAN FUFU",
    subtitle: "Hearty Comfort Meal",
    cookTime: "60 min",
    prepTime: "30 min",
    difficulty: "Hard",
    rating: 4.8,
    id: "smart-beef-stew-dumplings"
  },
  {
    image: "/images/smartp/F8.jpg",
    title: "CHICKEN KORMA",
    subtitle: "Creamy Indian Curry",
    cookTime: "40 min",
    prepTime: "25 min",
    difficulty: "Medium",
    rating: 4.7,
    id: "smart-chicken-korma"
  }
],

      // ---------------- SOUPS & SHAKES ----------------
      soupsDrinks: [
  {
    image: "/images/sd/F1.jpg",
    title: "CREAM MUSHROOM SOUP",
    subtitle: "European Comfort Soup",
    cookTime: "35 min",
    prepTime: "20 min",
    difficulty: "Medium",
    rating: 4.7,
    id: "soup-mushroom"
  },
  {
    image: "/images/sd/F2.jpg",
    title: "HOT & SOUR SOUP",
    subtitle: "Asian Spicy Soup",
    cookTime: "30 min",
    prepTime: "20 min",
    difficulty: "Medium",
    rating: 4.7,
    id: "soup-hot-sour"
  },
  {
    image: "/images/sd/F3.jpg",
    title: "CREAM PUMPKIN SOUP",
    subtitle: "Seasonal European Soup",
    cookTime: "35 min",
    prepTime: "20 min",
    difficulty: "Medium",
    rating: 4.7,
    id: "soup-pumpkin"
  },
  {
    image: "/images/sd/F4.jpg",
    title: "CHICKEN SOUP",
    subtitle: "Hearty Comfort Bowl",
    cookTime: "40 min",
    prepTime: "25 min",
    difficulty: "Medium",
    rating: 4.7,
    id: "soup-chicken"
  },
  {
    image: "/images/sd/F5.jpg",
    title: "ORANGE CURACAO MOJITO",
    subtitle: "Citrus Mocktail",
    cookTime: "10 min",
    prepTime: "5 min",
    difficulty: "Easy",
    rating: 4.6,
    id: "drink-orange-curacao"
  },
  {
    image: "/images/sd/F6.jpg",
    title: "BLUE CURACAO MOJITO",
    subtitle: "Refreshing Mocktail",
    cookTime: "10 min",
    prepTime: "5 min",
    difficulty: "Easy",
    rating: 4.6,
    id: "drink-blue-curacao"
  },
  {
    image: "/images/sd/F7.jpg",
    title: "AVOCADO SHAKE",
    subtitle: "Creamy Health Shake",
    cookTime: "10 min",
    prepTime: "5 min",
    difficulty: "Easy",
    rating: 4.7,
    id: "shake-avocado"
  },
  {
    image: "/images/sd/F8.jpg",
    title: "DATES SHAKE",
    subtitle: "Natural Energy Drink",
    cookTime: "10 min",
    prepTime: "5 min",
    difficulty: "Easy",
    rating: 4.7,
    id: "shake-dates"
  }
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
    <>
      <Header />
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
    </>
  );
};

export default Home;
