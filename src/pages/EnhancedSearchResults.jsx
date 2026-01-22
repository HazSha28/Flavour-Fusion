// src/pages/EnhancedSearchResults.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { getAllRecipes, getUnifiedRecipeDetails } from '../services/unifiedRecipeService';
import EnhancedRecipeCard from '../components/EnhancedRecipeCard';
import RecipeSourceBadge from '../components/RecipeSourceBadge';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import '../index.css';
import '../styles/EnhancedSearchResults.css';

const EnhancedSearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [source, setSource] = useState('all');
  const [cuisine, setCuisine] = useState('');
  const [diet, setDiet] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const cuisines = [
    'Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese', 
    'Thai', 'French', 'Greek', 'Spanish', 'American'
  ];

  const diets = [
    'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 
    'ketogenic', 'paleo', 'mediterranean'
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!debouncedQuery.trim()) {
        setRecipes([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const searchOptions = {
          source,
          number: 20
        };

        if (cuisine) searchOptions.cuisine = cuisine;
        if (diet) searchOptions.diet = diet;

        const results = await getAllRecipes(debouncedQuery, searchOptions);
        setRecipes(results);
      } catch (err) {
        console.error('Search error:', err);
        setError('Search temporarily unavailable. Please try again later.');
        
        // Fallback to local recipes only
        try {
          const localOnly = await getAllRecipes(debouncedQuery, { 
            source: 'local', 
            number: 20,
            includeSpoonacular: false 
          });
          setRecipes(localOnly);
          setError(null); // Clear error since we have local results
        } catch (localErr) {
          console.error('Local search error:', localErr);
          setError('Search is currently unavailable. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [debouncedQuery, source, cuisine, diet]);

  const clearFilters = () => {
    setSource('all');
    setCuisine('');
    setDiet('');
  };

  const getSourceStats = () => {
    const stats = recipes.reduce((acc, recipe) => {
      acc[recipe.source] = (acc[recipe.source] || 0) + 1;
      return acc;
    }, {});
    
    return stats;
  };

  const sourceStats = getSourceStats();

  if (loading) {
    return (
      <div className="search-results-container">
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>Searching recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results-container">
        <div className="search-error">
          <h2>🔍 Search Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="enhanced-search-results">
      <div className="search-header">
        <div className="search-info">
          <h1>Search Results</h1>
          {query && (
            <p className="search-query">
              Showing results for: <strong>"{query}"</strong>
            </p>
          )}
        </div>

        <div className="search-controls">
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            Filters
            {(source !== 'all' || cuisine || diet) && (
              <span className="filter-count">
                {[source !== 'all', cuisine, diet].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="search-filters">
          <div className="filter-group">
            <label>Source</label>
            <select value={source} onChange={(e) => setSource(e.target.value)}>
              <option value="all">All Sources</option>
              <option value="local">Local Recipes</option>
              <option value="spoonacular">Spoonacular</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Cuisine</label>
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
              <option value="">All Cuisines</option>
              {cuisines.map(c => (
                <option key={c} value={c.toLowerCase()}>{c}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Diet</label>
            <select value={diet} onChange={(e) => setDiet(e.target.value)}>
              <option value="">All Diets</option>
              {diets.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <button className="clear-filters" onClick={clearFilters}>
            <FaTimes />
            Clear Filters
          </button>
        </div>
      )}

      {Object.keys(sourceStats).length > 0 && (
        <div className="source-stats">
          <div className="stats-header">
            <span>Found {recipes.length} recipes from:</span>
          </div>
          <div className="stats-badges">
            {Object.entries(sourceStats).map(([src, count]) => (
              <div key={src} className="stat-badge">
                <RecipeSourceBadge source={src} />
                <span className="stat-count">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="search-results-grid">
        {recipes.length === 0 ? (
          <div className="no-results">
            <FaSearch className="no-results-icon" />
            <h2>No recipes found</h2>
            <p>
              {query 
                ? `No recipes found for "${query}". Try different keywords or adjust your filters.`
                : 'Enter a search term to find recipes.'
              }
            </p>
            <div className="search-suggestions">
              <p>Try searching for:</p>
              <div className="suggestion-tags">
                {['pasta', 'chicken', 'salad', 'dessert', 'soup'].map(term => (
                  <button 
                    key={term}
                    onClick={() => window.location.href = `/search?q=${term}`}
                    className="suggestion-tag"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          recipes.map(recipe => (
            <EnhancedRecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>

      {recipes.length > 0 && (
        <div className="search-footer">
          <p>Showing {recipes.length} recipes</p>
        </div>
      )}
    </div>
  );
};

export default EnhancedSearchResults;
