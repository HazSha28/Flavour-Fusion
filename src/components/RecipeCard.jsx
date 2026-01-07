import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';

const RecipeCard = ({ image, title, subtitle, price, link }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    console.log(isFavorited ? 'Removed from favorites:' : 'Added to favorites:', title);
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
          <div className="recipe-price">${price}</div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
