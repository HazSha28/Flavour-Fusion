import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar, FaClock, FaUtensils, FaFire } from 'react-icons/fa';

const RecipeCard = ({ image, title, subtitle, link, cookTime, prepTime, difficulty }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    console.log(isFavorited ? 'Removed from favorites:' : 'Added to favorites:', title);
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
    <Link to={link} className="recipe-card-link">
      <div className="recipe-card">
        <div className="recipe-image-wrapper">
          <img src={image} alt={title} className="recipe-card-img" />
          
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
