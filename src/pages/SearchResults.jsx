import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { FaSearch, FaSpinner, FaExclamationTriangle, FaUtensils, FaYoutube, FaPlay } from 'react-icons/fa';
import { searchMealsByName, getRandomMeals, formatMealToRecipe } from '../services/mealdbService';
import { searchRecipeVideos, formatVideoToRecipe, searchRecipesWithYouTube } from '../services/youtubeService';
import '../index.css';
import '../styles/SearchResults.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const source = searchParams.get('source') || 'all';
  const [recipes, setRecipes] = useState([]);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Search recipes using TheMealDB API and YouTube
  const searchRecipes = async (searchQuery, searchSource = 'all') => {
    try {
      setLoading(true);
      setError(null);
      
      if (searchSource === 'youtube') {
        // Search only YouTube
        const youtubeResults = await searchRecipeVideos(searchQuery, 12);
        const formattedVideos = youtubeResults.map(video => formatVideoToRecipe(video));
        setYoutubeVideos(formattedVideos);
        setRecipes([]);
      } else if (searchSource === 'mealdb') {
        // Search only TheMealDB
        const mealDbResults = await searchMealsByName(searchQuery);
        const formattedRecipes = mealDbResults.map(meal => formatMealToRecipe(meal)).filter(Boolean);
        setRecipes(formattedRecipes);
        setYoutubeVideos([]);
      } else {
        // Search both sources
        const combinedResults = await searchRecipesWithYouTube(searchQuery, {
          includeYouTube: true,
          includeMealDB: true,
          maxResults: 12
        });
        
        // Separate YouTube and MealDB results
        const youtubeResults = combinedResults.filter(recipe => recipe.source === 'youtube');
        const mealDbResults = combinedResults.filter(recipe => recipe.source !== 'youtube');
        
        setYoutubeVideos(youtubeResults);
        setRecipes(mealDbResults);
      }
      
    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to search recipes. Please try again.');
      setRecipes([]);
      setYoutubeVideos([]);
    } finally {
      setLoading(false);
    }
  };

  // Get random recipes for home page
  const getRandomRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get random meals from TheMealDB
      const randomMeals = await getRandomMeals(12);
      console.log(`Found ${randomMeals.length} random recipes from TheMealDB`);
      
      // Format meals to our recipe format
      const formattedRecipes = randomMeals.map(meal => formatMealToRecipe(meal)).filter(Boolean);
      setRecipes(formattedRecipes);
      
    } catch (error) {
      console.error('Error getting random recipes:', error);
      setError('Failed to load recipes. Please try again.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query.trim()) {
      // Search for recipes when there's a query
      searchRecipes(query, source);
    } else {
      // Show random recipes when no search query
      getRandomRecipes();
    }
  }, [query, source]);

  if (loading) {
    return (
      <div className="search-results-loading">
        <FaSpinner className="spinner" />
        <p>Searching for recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-error">
        <FaExclamationTriangle />
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={() => searchRecipes(query)} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  const openYouTubeVideo = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  const VideoRecipeCard = ({ recipe }) => (
    <div className="recipe-card video-card" onClick={() => openYouTubeVideo(recipe.youtube)}>
      <div className="recipe-image-container">
        <img src={recipe.image} alt={recipe.title} className="recipe-image" />
        <div className="video-overlay">
          <FaPlay className="play-icon" />
        </div>
        <div className="video-badge">
          <FaYoutube />
          <span>YouTube</span>
        </div>
      </div>
      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        <p className="recipe-subtitle">{recipe.subtitle}</p>
        <div className="recipe-meta">
          <span className="recipe-category">{recipe.category}</span>
          <span className="recipe-time">{recipe.time}</span>
        </div>
        <div className="video-stats">
          {recipe.viewCount && <span className="views">{parseInt(recipe.viewCount).toLocaleString()} views</span>}
          <span className="channel">{recipe.channelTitle}</span>
        </div>
      </div>
    </div>
  );

  if (!query.trim()) {
    return (
      <div className="search-results-empty">
        <FaSearch />
        <h2>Featured Recipes</h2>
        <p>Discover delicious recipes from around the world!</p>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="search-results-empty">
        <FaSearch />
        <h2>No Recipes Found</h2>
        <p>We couldn't find any recipes matching "{query}". Try different keywords!</p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <div className="search-header">
        <h1>Search Results</h1>
        <p>Found {recipes.length + youtubeVideos.length} result{recipes.length + youtubeVideos.length !== 1 ? 's' : ''} for "{query}"</p>
        {(recipes.length > 0 || youtubeVideos.length > 0) && (
          <div className="api-sources">
            {recipes.length > 0 && <span className="source-badge mealdb-badge">TheMealDB ({recipes.length})</span>}
            {youtubeVideos.length > 0 && <span className="source-badge youtube-badge">YouTube ({youtubeVideos.length})</span>}
          </div>
        )}
      </div>
      
      {/* YouTube Videos Section */}
      {youtubeVideos.length > 0 && (
        <div className="recipes-section youtube-section">
          <div className="section-header">
            <h2>
              <FaYoutube className="youtube-icon" />
              YouTube Recipe Videos
            </h2>
            <p className="section-description">
              Click on any video to watch the recipe tutorial on YouTube
            </p>
          </div>
          <div className="recipes-grid video-grid">
            {youtubeVideos.map((video) => (
              <VideoRecipeCard 
                key={video.id}
                recipe={video}
              />
            ))}
          </div>
        </div>
      )}

      {/* TheMealDB Recipes Section */}
      {recipes.length > 0 && (
        <div className="recipes-section">
          <div className="section-header">
            <h2>Recipes from TheMealDB</h2>
          </div>
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <RecipeCard 
                key={recipe.id}
                id={recipe.id}
                title={recipe.title}
                image={recipe.image}
                category={recipe.category}
                rating={recipe.rating}
                time={recipe.time}
                cookTime={recipe.cookTime}
                subtitle={recipe.area}
              />
            ))}
          </div>
        </div>
      )}

      {/* No results found */}
      {recipes.length === 0 && youtubeVideos.length === 0 && !loading && (
        <div className="search-results-empty">
          <FaSearch />
          <h2>No Recipes Found</h2>
          <p>We couldn't find any recipes matching "{query}". Try different keywords!</p>
          <div className="search-suggestions">
            <p>Try searching for:</p>
            <div className="suggestion-tags">
              <span onClick={() => window.location.href = '/search?q=pasta&source=all'}>pasta</span>
              <span onClick={() => window.location.href = '/search?q=chicken&source=all'}>chicken</span>
              <span onClick={() => window.location.href = '/search?q=dessert&source=all'}>dessert</span>
              <span onClick={() => window.location.href = '/search?q=vegetarian&source=all'}>vegetarian</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
