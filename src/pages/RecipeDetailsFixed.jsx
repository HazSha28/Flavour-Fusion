// src/pages/RecipeDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';
import { 
  FaHeart,
  FaShare,
  FaClock,
  FaUsers,
  FaUtensils,
  FaFire,
  FaChevronLeft,
  FaChevronRight,
  FaBookmark,
  FaCheck,
  FaStar,
  FaRegStar,
  FaPrint,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaInstagram
} from 'react-icons/fa';
import Header from '../components/Header';
import './RecipeDetails.css';

// Enhanced recipe data with all details - moved outside component
const recipeDatabase = {
  // Global Cravings
  'home-pizza': {
    id: 'home-pizza',
    title: 'PIZZA',
    subtitle: 'with Vegetable',
    category: 'Italian',
    area: 'Italian',
    difficulty: 'Easy',
    prepTime: '15 min',
    cookTime: '30 min',
    totalTime: '45 min',
    servings: 4,
    rating: 4.5,
    description: 'Classic Italian pizza with fresh vegetables and mozzarella cheese on a crispy crust.',
    images: ['/images/fly1-removebg-preview.png'],
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ingredients: [
      { name: 'Pizza Dough', amount: '500g', notes: 'Store-bought or homemade' },
      { name: 'Tomato Sauce', amount: '200ml', notes: 'Italian marinara' },
      { name: 'Fresh Mozzarella', amount: '250g', notes: 'Shredded' },
      { name: 'Bell Peppers', amount: '2', notes: 'Mixed colors, sliced' },
      { name: 'Red Onion', amount: '1', notes: 'Thinly sliced' },
      { name: 'Mushrooms', amount: '100g', notes: 'Sliced' },
      { name: 'Olives', amount: '50g', notes: 'Black or green' },
      { name: 'Fresh Basil', amount: 'Handful', notes: 'For garnish' },
      { name: 'Olive Oil', amount: '2 tbsp', notes: 'Extra virgin' },
      { name: 'Salt & Pepper', amount: 'To taste', notes: 'Freshly ground' }
    ],
    steps: [
      { step: 1, instruction: 'Preheat your oven to 220°C (425°F).', time: '5 min' },
      { step: 2, instruction: 'Roll out the pizza dough on a floured surface to desired thickness.', time: '10 min' },
      { step: 3, instruction: 'Spread tomato sauce evenly over the dough, leaving 1cm border.', time: '2 min' },
      { step: 4, instruction: 'Sprinkle mozzarella cheese over the sauce.', time: '1 min' },
      { step: 5, instruction: 'Add sliced vegetables and distribute evenly.', time: '3 min' },
      { step: 6, instruction: 'Drizzle with olive oil and season with salt and pepper.', time: '1 min' },
      { step: 7, instruction: 'Bake for 12-15 minutes until crust is golden and cheese is bubbly.', time: '15 min' },
      { step: 8, instruction: 'Garnish with fresh basil before serving.', time: '1 min' }
    ],
    nutrition: { calories: 285, protein: '12g', carbs: '35g', fat: '11g', fiber: '3g', sugar: '5g' }
  },
  'home-shawarma': {
    id: 'home-shawarma',
    title: 'SHAWARMA',
    subtitle: 'Middle Eastern Spiced',
    category: 'Middle Eastern',
    area: 'Middle Eastern',
    difficulty: 'Medium',
    prepTime: '20 min',
    cookTime: '45 min',
    totalTime: '65 min',
    servings: 4,
    rating: 4.8,
    description: 'Tender marinated meat slow-cooked on a vertical rotisserie, served in warm pita bread.',
    images: ['/images/fly3-removebg-preview.png'],
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    ingredients: [
      { name: 'Chicken Thighs', amount: '1kg', notes: 'Boneless, skinless' },
      { name: 'Yogurt', amount: '200ml', notes: 'Full fat' },
      { name: 'Lemon Juice', amount: '50ml', notes: 'Fresh' },
      { name: 'Garlic', amount: '6 cloves', notes: 'Minced' },
      { name: 'Spices', amount: '2 tbsp', notes: 'Cumin, paprika, turmeric' },
      { name: 'Pita Bread', amount: '4', notes: 'Warm' },
      { name: 'Tahini Sauce', amount: '100ml', notes: 'For serving' },
      { name: 'Pickled Vegetables', amount: '200g', notes: 'Turnips, carrots' },
      { name: 'Fresh Parsley', amount: 'Handful', notes: 'Chopped' }
    ],
    steps: [
      { step: 1, instruction: 'Marinate chicken in yogurt mixture for at least 4 hours.', time: '240 min' },
      { step: 2, instruction: 'Thread chicken onto skewers for even cooking.', time: '15 min' },
      { step: 3, instruction: 'Grill on rotisserie or barbecue for 45-60 minutes.', time: '60 min' },
      { step: 4, instruction: 'Warm pita bread and prepare tahini sauce.', time: '5 min' },
      { step: 5, instruction: 'Shave cooked meat and assemble in pita with vegetables.', time: '10 min' }
    ],
    nutrition: { calories: 380, protein: '28g', carbs: '32g', fat: '18g', fiber: '4g', sugar: '6g' }
  }
  // Add more recipes as needed...
};

const RecipeDetails = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [servings, setServings] = useState(4);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        
        // Use only local recipe database
        const recipeData = recipeDatabase[recipeId];
        if (recipeData) {
          setRecipe(recipeData);
        } else {
          throw new Error('Recipe not found');
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Recipe not found or failed to load');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this amazing ${recipe.title} recipe!`,
        url: window.location.href
      });
    }
    setShowShareOptions(!showShareOptions);
  };

  const toggleStepComplete = (stepIndex) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const adjustServings = (newServings) => {
    setServings(newServings);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % recipe.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + recipe.images.length) % recipe.images.length);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star-filled" />);
    }
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star-half" />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<FaRegStar key={i} className="star-empty" />);
    }
    
    return stars;
  };

  if (loading || !recipe) {
    return (
      <Header showHeroSection={false} showNavigation={false}>
        <div className="recipe-details-loading">
          <div className="loading-spinner"></div>
          <p>Loading recipe details...</p>
        </div>
      </Header>
    );
  }

  if (error) {
    return (
      <Header showHeroSection={false} showNavigation={false}>
        <div className="recipe-details-error">
          <h2>🍳 Recipe Not Found</h2>
          <p>{error}</p>
          <button onClick={() => window.location.href = '/'} className="back-home-btn">
            ← Back to Home
          </button>
        </div>
      </Header>
    );
  }

  return (
    <Header showHeroSection={false} showNavigation={false}>
      <div className="recipe-details-container">
        {/* Recipe Header with Carousel */}
        <div className="recipe-header">
          <div className="image-carousel">
            <div className="carousel-container">
              <button 
                className="carousel-btn prev" 
                onClick={prevImage}
                disabled={recipe.images.length <= 1}
              >
                <FaChevronLeft />
              </button>
              
              <div className="carousel-images">
                {recipe.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${recipe.title} - Image ${index + 1}`}
                    className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
              
              <button 
                className="carousel-btn next" 
                onClick={nextImage}
                disabled={recipe.images.length <= 1}
              >
                <FaChevronRight />
              </button>
            </div>
          </div>
          
          <div className="recipe-info">
            <h1>{recipe.title}</h1>
            <p className="recipe-subtitle">{recipe.subtitle}</p>
            
            <div className="recipe-meta">
              <span className="recipe-time">
                <FaClock />
                {recipe.readyInMinutes || recipe.totalTime} min
              </span>
              <span className="recipe-servings">
                <FaUsers />
                {recipe.servings} servings
              </span>
              <span className="recipe-difficulty">
                {recipe.difficulty}
              </span>
              <span className="recipe-rating">
                {renderStars(recipe.rating)}
              </span>
            </div>
            
            <div className="recipe-actions">
              <button 
                className={`bookmark-btn ${isBookmarked ? 'bookmarked' : ''}`}
                onClick={handleBookmark}
              >
                <FaBookmark /> {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
              
              <button 
                className="share-btn"
                onClick={handleShare}
              >
                <FaShare /> Share
              </button>
              
              <button className="print-btn" onClick={() => window.print()}>
                <FaPrint /> Print
              </button>
            </div>
          </div>
        </div>

        {/* Recipe Tabs */}
        <div className="recipe-tabs">
          <div className="tab-buttons">
            <button 
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
              onClick={() => setActiveTab('ingredients')}
            >
              Ingredients
            </button>
            <button 
              className={`tab-btn ${activeTab === 'instructions' ? 'active' : ''}`}
              onClick={() => setActiveTab('instructions')}
            >
              Instructions
            </button>
            <button 
              className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutrition
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <h3>About this Recipe</h3>
                <p>{recipe.description}</p>
                
                <div className="recipe-stats">
                  <div className="stat-item">
                    <h4>Prep Time</h4>
                    <p>{recipe.prepTime}</p>
                  </div>
                  <div className="stat-item">
                    <h4>Cook Time</h4>
                    <p>{recipe.cookTime}</p>
                  </div>
                  <div className="stat-item">
                    <h4>Total Time</h4>
                    <p>{recipe.totalTime}</p>
                  </div>
                  <div className="stat-item">
                    <h4>Difficulty</h4>
                    <p>{recipe.difficulty}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="ingredients-tab">
                <h3>Ingredients for {servings} servings</h3>
                <div className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-item">
                      <span className="ingredient-amount">
                        {ingredient.amount} {ingredient.unit}
                      </span>
                      <span className="ingredient-name">
                        {ingredient.name}
                      </span>
                      {ingredient.notes && (
                        <span className="ingredient-notes">
                          ({ingredient.notes})
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="servings-adjuster">
                  <label>Adjust Servings:</label>
                  <select 
                    value={servings} 
                    onChange={(e) => adjustServings(parseInt(e.target.value))}
                  >
                    {[1, 2, 4, 6, 8].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'instructions' && (
              <div className="instructions-tab">
                <h3>Step-by-Step Instructions</h3>
                <div className="instructions-list">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="instruction-step">
                      <div className="step-number">
                        <span>{instruction.step}</span>
                        <input 
                          type="checkbox"
                          checked={completedSteps.includes(index)}
                          onChange={() => toggleStepComplete(index)}
                        />
                      </div>
                      <div className="step-content">
                        <p>{instruction.instruction}</p>
                        {instruction.time && (
                          <span className="step-time">⏱️ {instruction.time}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="nutrition-tab">
                <h3>Nutritional Information</h3>
                <div className="nutrition-grid">
                  <div className="nutrition-item">
                    <span className="nutrition-value">{recipe.nutrition.calories}</span>
                    <span className="nutrition-label">Calories</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{recipe.nutrition.protein}</span>
                    <span className="nutrition-label">Protein</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{recipe.nutrition.carbs}</span>
                    <span className="nutrition-label">Carbohydrates</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{recipe.nutrition.fat}</span>
                    <span className="nutrition-label">Fat</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{recipe.nutrition.fiber}</span>
                    <span className="nutrition-label">Fiber</span>
                  </div>
                  <div className="nutrition-item">
                    <span className="nutrition-value">{recipe.nutrition.sugar}</span>
                    <span className="nutrition-label">Sugar</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Share Options */}
        {showShareOptions && (
          <div className="share-overlay">
            <div className="share-modal">
              <h3>Share Recipe</h3>
              <div className="share-buttons">
                <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
                  <FaFacebook /> Facebook
                </button>
                <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this ${recipe.title} recipe! ${window.location.href}`)}`, '_blank')}>
                  <FaTwitter /> Twitter
                </button>
                <button onClick={() => window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&description=${encodeURIComponent(recipe.title)}`, '_blank')}>
                  <FaPinterest /> Pinterest
                </button>
                <button onClick={() => window.open(`https://www.instagram.com/`, '_blank')}>
                  <FaInstagram /> Instagram
                </button>
              </div>
              <button className="close-share" onClick={() => setShowShareOptions(false)}>
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </Header>
  );
};

export default RecipeDetails;
export { recipeDatabase };
