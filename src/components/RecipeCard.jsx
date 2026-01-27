import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaClock, FaUtensils, FaFire } from 'react-icons/fa';
import { useFavorites } from '../contexts/FavoritesContext';

const RecipeCard = ({ image, title, subtitle, cookTime, prepTime, difficulty, id, category, rating, time }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const recipeId = id || title?.replace(/\s+/g, '-').toLowerCase();
  const isFavorited = isFavorite(recipeId);

  // Default image if none provided
  const defaultImage = '/images/fly1-removebg-preview.png';
  const imageUrl = image && image.trim() !== '' ? image : defaultImage;

  // Generate link to recipe details page
  const recipeLink = `/recipe/${recipeId}`;

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const recipe = {
      id: recipeId,
      title,
      image,
      rating: rating || 0,
      time: time || cookTime || 'Unknown',
      category: category || 'General'
    };
    
    toggleFavorite(recipe);
  };

  const getDifficultyColor = (level) => {
    switch(level?.toLowerCase()) {
      case 'easy': return '#4caf50';
      case 'medium': return '#ff9800';
      case 'hard': return '#f44336';
      default: return '#757575';
    }
  };


  return (
    <Link to={recipeLink} className="recipe-card-link">
      <div className="recipe-card">
        <div className="recipe-image-wrapper">
          <img 
            src={imageUrl} 
            alt={title} 
            className="recipe-card-img"
            onError={(e) => {
              console.log('Image failed to load:', imageUrl);
              // Try multiple fallback images
              if (!e.target.dataset.fallbackAttempted) {
                e.target.dataset.fallbackAttempted = 'true';
                e.target.src = '/images/Flavour_Fusion-removebg-preview.png';
              } else {
                e.target.src = '/images/fly1-removebg-preview.png';
              }
            }}
          />
          
          <button 
            className="favorite-icon"
            onClick={handleFavorite}
            aria-label="Add to favorites"
          >
            {isFavorited ? <FaStar /> : <FaRegStar />}
          </button>
        </div>
        
        <div className="recipe-content">
          <h3 className="recipe-title">{title}</h3>
          <p className="recipe-subtitle">{subtitle}</p>
          
          <div className="recipe-meta">
            {prepTime && (
              <div className="meta-item">
                <FaClock className="meta-icon" />
                <span>Prep: {prepTime}</span>
              </div>
            )}
            
            {cookTime && (
              <div className="meta-item">
                <FaClock className="meta-icon" />
                <span>Cook: {cookTime}</span>
              </div>
            )}
            {difficulty && (
              <div className="meta-item difficulty-item">
                <FaFire className="meta-icon" />
                <span>{difficulty}</span>
              </div>
            )}
          </div>

          <div className="recipe-footer">
            <div className="recipe-tags">
              <span className="tag"><FaUtensils /> Recipe</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
