import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaClock, 
  FaUsers, 
  FaHeart, 
  FaShare, 
  FaBookmark, 
  FaShoppingCart, 
  FaUtensils, 
  FaFire,
  FaPlay,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaStar,
  FaRegStar,
  FaPrint,
  FaFacebook,
  FaTwitter,
  FaPinterest,
  FaInstagram,
  FaShareAlt
} from 'react-icons/fa';
import Header from '../components/Header';
import { useFavorites } from '../contexts/FavoritesContext';
import { allRecipes } from '../data/allRecipes';
import { allRecipesPart2 } from '../data/allRecipesPart2';
import { allRecipesPart3 } from '../data/allRecipesPart3';
import { allRecipesPart4 } from '../data/allRecipesPart4';
import { allRecipesPart5 } from '../data/allRecipesPart5';
import { allRecipesPart6 } from '../data/allRecipesPart6';
import { getRecipeDetails as getMealDbRecipeDetails } from '../services/mealdbService';

// Combine all recipe collections
const combinedRecipes = { ...allRecipes, ...allRecipesPart2, ...allRecipesPart3, ...allRecipesPart4, ...allRecipesPart5, ...allRecipesPart6 };

// Your default recipes
const defaultRecipes = [
  {
    id: 'default-1',
    title: 'Classic Margherita Pizza',
    image: 'https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg',
    category: 'Italian',
    area: 'Italy',
    rating: 4.8,
    time: '30 min',
    cookTime: '20 min',
    instructions: 'Classic Italian pizza with fresh mozzarella, tomatoes, and basil.',
    ingredients: ['Pizza dough', 'Tomato sauce', 'Fresh mozzarella', 'Fresh basil', 'Olive oil'],
    source: 'default'
  },
  {
    id: 'default-2',
    title: 'Chicken Biryani',
    image: 'https://www.themealdb.com/images/media/meals/yypstx1511303613.jpg',
    category: 'Indian',
    area: 'India',
    rating: 4.9,
    time: '60 min',
    cookTime: '45 min',
    instructions: 'Fragrant rice dish with spiced chicken and aromatic herbs.',
    ingredients: ['Basmati rice', 'Chicken', 'Yogurt', 'Spices', 'Herbs'],
    source: 'default'
  },
  {
    id: 'default-3',
    title: 'Caesar Salad',
    image: 'https://www.themealdb.com/images/media/meals/948830.jpg',
    category: 'Salad',
    area: 'American',
    rating: 4.5,
    time: '15 min',
    cookTime: '10 min',
    instructions: 'Crisp romaine lettuce with Caesar dressing, croutons, and parmesan.',
    ingredients: ['Romaine lettuce', 'Caesar dressing', 'Croutons', 'Parmesan cheese'],
    source: 'default'
  },
  {
    id: 'default-4',
    title: 'Beef Tacos',
    image: 'https://www.themealdb.com/images/media/meals/tyywsw1505930335.jpg',
    category: 'Mexican',
    area: 'Mexico',
    rating: 4.7,
    time: '25 min',
    cookTime: '20 min',
    instructions: 'Seasoned ground beef in crispy taco shells with fresh toppings.',
    ingredients: ['Ground beef', 'Taco shells', 'Lettuce', 'Tomatoes', 'Cheese'],
    source: 'default'
  },
  {
    id: 'default-5',
    title: 'Pad Thai',
    image: 'https://www.themealdb.com/images/media/meals/wuxruu1508731394.jpg',
    category: 'Thai',
    area: 'Thailand',
    rating: 4.6,
    time: '30 min',
    cookTime: '25 min',
    instructions: 'Stir-fried rice noodles with shrimp, tofu, and tangy tamarind sauce.',
    ingredients: ['Rice noodles', 'Shrimp', 'Tofu', 'Tamarind sauce', 'Peanuts'],
    source: 'default'
  },
  {
    id: 'default-6',
    title: 'French Croissant',
    image: 'https://www.themealdb.com/images/media/meals/tkxqrw1565905064.jpg',
    category: 'Bakery',
    area: 'France',
    rating: 4.8,
    time: '180 min',
    cookTime: '30 min',
    instructions: 'Buttery, flaky French pastry perfect for breakfast.',
    ingredients: ['Flour', 'Butter', 'Yeast', 'Milk', 'Sugar'],
    source: 'default'
  }
];

const RecipeDetails = () => {
  const { id } = useParams();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [servings, setServings] = useState(4);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Load recipe based on URL parameter
  useEffect(() => {
    const loadRecipe = async () => {
      console.log('=== RECIPE DEBUG ===');
      console.log('id from URL:', id);
      console.log('Type of id:', typeof id);
      
      setLoading(true);
      setError(null);
      
      try {
        // First, check if it's a default recipe
        const defaultRecipe = defaultRecipes.find(recipe => recipe.id === id);
        if (defaultRecipe) {
          console.log('✅ Found default recipe:', defaultRecipe.title);
          setRecipe(defaultRecipe);
          return;
        }
        
        // Second, check if it's in local recipe data
        const localRecipe = combinedRecipes[id];
        if (localRecipe) {
          console.log('✅ Found local recipe:', localRecipe.title);
          setRecipe(localRecipe);
          return;
        }
        
        // Third, try to fetch from TheMealDB if the ID looks like a meal ID
        if (id && (id.startsWith('5') || id.length === 5 || /^\d+$/.test(id))) {
          console.log('🔍 Trying to fetch from TheMealDB with ID:', id);
          try {
            const mealDbRecipe = await getMealDbRecipeDetails(id);
            if (mealDbRecipe) {
              console.log('✅ Found TheMealDB recipe:', mealDbRecipe.title);
              setRecipe(mealDbRecipe);
              return;
            }
          } catch (mealDbError) {
            console.log('❌ TheMealDB fetch failed:', mealDbError.message);
          }
        }
        
        // If nothing found, use the first default recipe as fallback
        console.log('❌ Recipe not found, using default recipe');
        const fallbackRecipe = defaultRecipes[0];
        setRecipe(fallbackRecipe);
        
      } catch (error) {
        console.error('Error loading recipe:', error);
        setError('Failed to load recipe');
        // Use default recipe as fallback
        setRecipe(defaultRecipes[0]);
      } finally {
        setLoading(false);
        console.log('=== END DEBUG ===');
      }
    };
    
    loadRecipe();
  }, [id]);

  const handleFavorite = () => {
    if (recipe) {
      // Prepare recipe data for favorites
      const recipeForFavorites = {
        ...recipe,
        image: recipe.images?.[0] || recipe.image || '/images/default-recipe.jpg',
        time: recipe.totalTime || recipe.cookTime || 'Unknown'
      };
      toggleFavorite(recipeForFavorites);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe.title,
        text: `Check out this amazing ${recipe.title} recipe!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      setShowShareOptions(!showShareOptions);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Recipe link copied to clipboard!');
    setShowShareOptions(false);
  };

  const shareOnSocial = (platform) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this amazing ${recipe.title} recipe!`);
    
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
    setShowShareOptions(false);
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
          <div style={{margin: '20px 0'}}>
            <h3>Available Recipes:</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', margin: '10px 0'}}>
              {Object.keys(combinedRecipes).map(id => (
                <Link key={id} to={`/recipe/${id}`} style={{padding: '10px', border: '1px solid #ccc', borderRadius: '5px', textDecoration: 'none', color: '#333'}}>
                  {combinedRecipes[id].title}
                </Link>
              ))}
            </div>
          </div>
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
        {/* Recipe Header with Image */}
        <div className="recipe-header-section">
          <div className="recipe-header-top">
            <button className="back-btn" onClick={() => window.history.back()}>
              <FaChevronLeft />
            </button>
            <div className="recipe-actions">
              <button className="action-btn share-btn" onClick={handleShare}>
                <FaShareAlt />
              </button>
              <button className={`action-btn favorite-btn ${recipe && isFavorite(recipe.id) ? 'active' : ''}`} onClick={handleFavorite}>
                <FaHeart />
              </button>
            </div>
          </div>
          
          {showShareOptions && (
            <div className="share-options-dropdown">
              <button onClick={copyToClipboard} className="share-option">
                <FaShare /> Copy Link
              </button>
              <button onClick={() => shareOnSocial('facebook')} className="share-option">
                <FaFacebook /> Facebook
              </button>
              <button onClick={() => shareOnSocial('twitter')} className="share-option">
                <FaTwitter /> Twitter
              </button>
              <button onClick={() => shareOnSocial('pinterest')} className="share-option">
                <FaPinterest /> Pinterest
              </button>
            </div>
          )}
          
          <div className="recipe-image-section">
            <div className="recipe-image-container">
              <img 
                src={recipe.image || recipe.images?.[0] || '/images/default-recipe.jpg'} 
                alt={recipe.title} 
                className="recipe-main-image"
              />
            </div>
          </div>
          
          <div className="recipe-title-section">
            <h1 className="recipe-title">{recipe.title}</h1>
            <p className="recipe-subtitle">{recipe.subtitle}</p>
          </div>
          
          <div className="recipe-metadata">
            <div className="metadata-item">
              <FaUsers className="metadata-icon" />
              <div className="metadata-content">
                <span className="metadata-label">Serves</span>
                <span className="metadata-value">{recipe.servings}</span>
              </div>
            </div>
            <div className="metadata-item">
              <FaClock className="metadata-icon" />
              <div className="metadata-content">
                <span className="metadata-label">Prep</span>
                <span className="metadata-value">{recipe.prepTime}</span>
              </div>
            </div>
            <div className="metadata-item">
              <FaClock className="metadata-icon" />
              <div className="metadata-content">
                <span className="metadata-label">Cook</span>
                <span className="metadata-value">{recipe.cookTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="recipe-navigation">
          <button 
            className={`nav-tab ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </button>
          <button 
            className={`nav-tab ${activeTab === 'instructions' ? 'active' : ''}`}
            onClick={() => setActiveTab('instructions')}
          >
            Directions
          </button>
          <button 
            className={`nav-tab ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            Notes
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content-mobile">
          {activeTab === 'ingredients' && (
            <div className="ingredients-content-mobile">
              <div className="ingredients-list-mobile">
                {recipe.ingredients && recipe.ingredients.length > 0 ? recipe.ingredients.map((ingredient, index) => {
                  const multiplier = servings / (recipe.servings || 4); // Base servings
                  
                  // Handle different ingredient formats
                  let amountText = '';
                  let ingredientName = '';
                  let notes = '';
                  
                  // Local recipe format: { name, amount, notes }
                  const adjustedAmount = ingredient.amount && ingredient.amount.includes('g') 
                    ? `${Math.round(parseFloat(ingredient.amount) * multiplier)}g`
                    : ingredient.amount && ingredient.amount.includes('tbsp')
                    ? `${Math.round(parseFloat(ingredient.amount) * multiplier)} tbsp`
                    : ingredient.amount || '';
                  amountText = adjustedAmount;
                  ingredientName = ingredient.name;
                  notes = ingredient.notes || '';
                  
                  return (
                    <div key={index} className="ingredient-item-mobile">
                      <span className="ingredient-text">
                        {amountText && `${amountText} `}{ingredientName}
                        {notes && (
                          <span className="ingredient-notes"> {notes}</span>
                        )}
                      </span>
                    </div>
                  );
                }) : (
                  <div className="ingredient-item-mobile">
                    <span className="ingredient-text">No ingredients available</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'instructions' && (
            <div className="instructions-content-mobile">
              <div className="steps-list-mobile">
                {recipe.steps && recipe.steps.length > 0 ? recipe.steps.map((step, index) => {
                  // Handle different instruction formats
                  let stepText = '';
                  let stepNumber = index + 1;
                  
                  // Local recipe format: { step, instruction, time }
                  stepText = step.instruction || step.description || step.title || step.step || '';
                  
                  return (
                    <div key={index} className={`step-item-mobile ${completedSteps.includes(index) ? 'completed' : ''}`}>
                      <div className="step-header-mobile">
                        <button 
                          className={`step-checkbox ${completedSteps.includes(index) ? 'completed' : ''}`}
                          onClick={() => toggleStepComplete(index)}
                        >
                          {completedSteps.includes(index) && <FaCheck className="checkmark" />}
                        </button>
                        <div className="step-content">
                          <span className="step-text">{stepText}</span>
                        </div>
                      </div>
                    </div>
                  );
                }) : (
                  <div className="step-item-mobile">
                    <div className="step-header-mobile">
                      <div className="step-content">
                        <span className="step-text">No instructions available</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="notes-content">
              <div className="notes-section">
                <h3>Recipe Notes</h3>
                <div className="notes-content-text">
                  <p>• This recipe can be prepared ahead of time and refrigerated for up to 24 hours.</p>
                  <p>• For best results, use fresh ingredients and high-quality spices.</p>
                  <p>• Adjust seasoning according to your taste preferences.</p>
                  <p>• Store leftovers in an airtight container in the refrigerator for 3-4 days.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Header>
  );
};

export default RecipeDetails;
