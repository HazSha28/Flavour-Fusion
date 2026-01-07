import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaClock, FaUsers, FaHeart, FaShare, FaBookmark, FaShoppingCart, FaUtensils, FaFire } from 'react-icons/fa';

const RecipeDetails = () => {
  const { recipeId } = useParams();
  
  // Mock recipe data - in real app, this would come from Firebase
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Simulate fetching recipe data
  React.useEffect(() => {
      // Replace with actual Firebase fetch
      setTimeout(() => {
        const mockRecipe = {
          id: recipeId,
          title: recipeId === '1' ? 'Classic Margherita Pizza' : 
                 recipeId === '2' ? 'Authentic Shawarma' :
                 recipeId === '3' ? 'Birria Tacos' :
                 recipeId === '4' ? 'Homemade Dumplings' :
                 recipeId === '5' ? 'Spicy Paratha' :
                 recipeId === '6' ? 'Creamy Alfredo Pasta' :
                 recipeId === '7' ? 'Street Style Dahi Poori' :
                 recipeId === '8' ? 'Premium Sushi Platter' : 'Unknown Recipe',
          image: `/images/global/F${recipeId}.jpg`,
          chef: recipeId === '1' ? 'Italian Nonna' : 
                recipeId === '2' ? 'Middle Eastern Chef' :
                recipeId === '3' ? 'Mexican Abuela' :
                recipeId === '4' ? 'Chinese Grandma' :
                recipeId === '5' ? 'Indian Spice Master' :
                 recipeId === '6' ? 'Italian Nonna' : 
                 recipeId === '7' ? 'French Chef' : 
                 recipeId === '8' ? 'Japanese Sushi Master' : 'Unknown Chef',
          cuisine: recipeId === '1' ? 'Italian' : 
                   recipeId === '2' ? 'Middle Eastern' : 
                   recipeId === '3' ? 'Mexican' : 
                   recipeId === '4' ? 'Chinese' : 
                   recipeId === '5' ? 'Indian' : 
                   recipeId === '6' ? 'French' : 
                   recipeId === '7' ? 'Japanese' : 
                   recipeId === '8' ? 'International' : 'Unknown Cuisine',
          difficulty: recipeId === '1' ? 'Easy' : 
                      recipeId === '2' ? 'Medium' : 
                      recipeId === '3' ? 'Medium' : 
                      recipeId === '4' ? 'Medium' : 
                      recipeId === '5' ? 'Medium' : 
                      recipeId === '6' ? 'Hard' : 
                      recipeId === '7' ? 'Hard' : 
                      recipeId === '8' ? 'Expert' : 'Beginner',
          prepTime: recipeId === '1' ? '30 min' : 
                     recipeId === '2' ? '45 min' : 
                     recipeId === '3' ? '2 hours' : 
                     recipeId === '4' ? '3 hours' : 
                     recipeId === '5' ? '4 hours' : 
                     recipeId === '6' ? '3 hours' : 
                     recipeId === '7' ? '5 hours' : 
                     recipeId === '8' ? '2 hours' : 'Beginner',
          cookTime: recipeId === '1' ? '25 min' : 
                     recipeId === '2' ? '1 hour' : 
                     recipeId === '3' ? '45 min' : 
                     recipeId === '4' ? '30 min' : 
                     recipeId === '5' ? '35 min' : 
                     recipeId === '6' ? '2 hours' : 
                     recipeId === '7' ? '4 hours' : 
                     recipeId === '8' ? '1.5 hours' : 'Beginner',
          totalTime: recipeId === '1' ? '55 min' : 
                     recipeId === '2' ? '1h 45min' : 
                     recipeId === '3' ? '2h 30min' : 
                     recipeId === '4' ? '3h 15min' : 
                     recipeId === '5' ? '3h 35min' : 
                     recipeId === '6' ? '3h 15min' : 
                     recipeId === '7' ? '4h 15min' : 
                     recipeId === '8' ? '2h 15min' : 'Beginner',
          servings: '4-6',
          calories: '450-650',
          rating: 4.5,
          reviews: 128
        };
        
        setRecipe(mockRecipe);
        setLoading(false);
      }, 1000);
    }, [recipeId]);

    if (loading || !recipe) {
      return (
        <div className="recipe-details-loading">
          <div className="loading-spinner"></div>
          <p>Loading recipe details...</p>
        </div>
      );
    }

    const handleFavorite = () => {
      // Toggle favorite status (would update in Firebase)
      setRecipe(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
    };

    const handleShare = () => {
      // Implement share functionality
      if (navigator.share) {
        navigator.share({
          title: recipe.title,
          text: `Check out this amazing ${recipe.title} recipe!`,
          url: window.location.href
        });
      }
    };

    const handleBookmark = () => {
      // Implement bookmark functionality
      setRecipe(prev => ({ ...prev, isBookmarked: !prev.isBookmarked }));
    };

    return (
      <div className="recipe-details-container">
        {/* Added a null check for recipe */}
        {recipe && (
          <>
            <div className="recipe-header">
              {/* Rest of the code */}
            </div>

            <div className="recipe-description">
              {/* Rest of the code */}
            </div>

            <div className="recipe-ingredients">
              {/* Rest of the code */}
            </div>

            <div className="recipe-instructions">
              {/* Rest of the code */}
            </div>

            <div className="recipe-actions-bottom">
              {/* Rest of the code */}
            </div>
          </>
        )}
      </div>
    );
  };

export default RecipeDetails;
