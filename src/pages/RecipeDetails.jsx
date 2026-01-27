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

// Combine all recipe collections
const combinedRecipes = { ...allRecipes, ...allRecipesPart2, ...allRecipesPart3, ...allRecipesPart4, ...allRecipesPart5, ...allRecipesPart6 };

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
    console.log('=== RECIPE DEBUG ===');
    console.log('id from URL:', id);
    console.log('Type of id:', typeof id);
    console.log('Available recipe keys:', Object.keys(combinedRecipes));
    console.log('Looking for key:', id);
    console.log('Key exists in combinedRecipes:', id in combinedRecipes);
    
    // Try to get the requested recipe from combined recipes
    const requestedRecipe = combinedRecipes[id];
    console.log('Requested recipe:', requestedRecipe?.title || 'NOT FOUND');
    
    if (requestedRecipe) {
      console.log('✅ Found recipe:', requestedRecipe.title);
      setRecipe(requestedRecipe);
      setError(null);
    } else {
      console.log('❌ Recipe not found, using default pizza');
      // Set a default recipe if requested one not found
      const firstRecipe = combinedRecipes['home-pizza'];
      setRecipe(firstRecipe);
      setError(null);
    }
    console.log('=== END DEBUG ===');
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
