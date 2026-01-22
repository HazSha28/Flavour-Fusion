// src/components/EnhancedRecipeCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaClock, FaUsers } from 'react-icons/fa';
import RecipeSourceBadge from './RecipeSourceBadge';
import { useFavorites } from '../contexts/FavoritesContext';

const EnhancedRecipeCard = ({ recipe }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const recipeId = recipe.id || recipe.spoonacularId;
  const isFavorited = isFavorite(recipeId);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const recipeData = {
      id: recipeId,
      title: recipe.title,
      image: recipe.image,
      rating: recipe.spoonacularScore || recipe.rating || 0,
      time: recipe.readyInMinutes || recipe.time || 'Unknown',
      category: recipe.category || 'General',
      source: recipe.source || 'local'
    };
    
    toggleFavorite(recipeData);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating / 20); // Convert from 0-100 to 0-5 scale
    const hasHalfStar = (rating % 20) >= 10;
    
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

  const getRecipeLink = () => {
    if (recipe.source === 'spoonacular') {
      return `/recipe/spoonacular-${recipe.id}`;
    }
    return `/recipe/${recipeId}`;
  };

  const getImageUrl = () => {
    if (recipe.image) {
      return recipe.image;
    }
    return '/images/fly1-removebg-preview.png'; // Fallback image
  };

  const getTimeDisplay = () => {
    if (recipe.readyInMinutes) {
      return `${recipe.readyInMinutes} min`;
    }
    if (recipe.time) {
      return recipe.time;
    }
    if (recipe.cookTime) {
      return recipe.cookTime;
    }
    return 'Unknown';
  };

  const getRatingDisplay = () => {
    if (recipe.spoonacularScore) {
      return (recipe.spoonacularScore / 20).toFixed(1); // Convert from 0-100 to 0-5
    }
    if (recipe.rating) {
      return recipe.rating.toFixed(1);
    }
    return 'N/A';
  };

  return (
    <Link to={getRecipeLink()} className="recipe-card-link">
      <div className="recipe-card enhanced">
        <div className="recipe-image-wrapper">
          <img 
            src={getImageUrl()} 
            alt={recipe.title} 
            className="recipe-card-img"
            onError={(e) => {
              e.target.src = '/images/fly1-removebg-preview.png';
            }}
          />
          
          <div className="recipe-overlays">
            <div className="recipe-time">
              <FaClock />
              <span>{getTimeDisplay()}</span>
            </div>
            
            <RecipeSourceBadge source={recipe.source || 'local'} />
          </div>
          
          <button 
            className="favorite-icon"
            onClick={handleFavorite}
            aria-label="Add to favorites"
          >
            {isFavorited ? <FaStar /> : <FaRegStar />}
          </button>
        </div>
        
        <div className="recipe-content">
          <h3 className="recipe-title">{recipe.title}</h3>
          
          {recipe.subtitle && (
            <p className="recipe-subtitle">{recipe.subtitle}</p>
          )}
          
          <div className="recipe-meta">
            {recipe.servings && (
              <span className="recipe-servings">
                <FaUsers />
                {recipe.servings} servings
              </span>
            )}
            
            <span className="recipe-rating">
              {renderStars((recipe.spoonacularScore || recipe.rating || 0))}
              <span className="rating-value">{getRatingDisplay()}</span>
            </span>
          </div>
          
          {recipe.diets && recipe.diets.length > 0 && (
            <div className="recipe-diets">
              {recipe.diets.slice(0, 2).map((diet, index) => (
                <span key={index} className="diet-tag">
                  {diet}
                </span>
              ))}
              {recipe.diets.length > 2 && (
                <span className="diet-tag">+{recipe.diets.length - 2}</span>
              )}
            </div>
          )}
          
          {recipe.summary && (
            <p className="recipe-summary">
              {recipe.summary.substring(0, 100)}...
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default EnhancedRecipeCard;
