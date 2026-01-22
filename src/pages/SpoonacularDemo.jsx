// src/pages/SpoonacularDemo.jsx
import React, { useState, useEffect } from 'react';
import { searchRecipes, getRandomRecipes } from '../services/spoonacularService';
import EnhancedRecipeCard from '../components/EnhancedRecipeCard';
import '../index.css';
import '../styles/SpoonacularDemo.css';

const SpoonacularDemo = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadRandomRecipes();
  }, []);

  const loadRandomRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const randomRecipes = await getRandomRecipes(8);
      const formattedRecipes = randomRecipes.map(recipe => ({
        id: `spoonacular-${recipe.id}`,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        source: 'spoonacular',
        summary: recipe.summary,
        diets: recipe.diets || [],
        score: recipe.spoonacularScore
      }));
      setRecipes(formattedRecipes);
    } catch (err) {
      console.error('Spoonacular API error:', err);
      setError('Spoonacular API temporarily unavailable. Showing local recipes instead.');
      
      // Fallback to local recipes
      try {
        const { searchLocalRecipes } = await import('../services/unifiedRecipeService');
        const localRecipes = searchLocalRecipes(''); // Get all local recipes
        setRecipes(localRecipes.slice(0, 8));
        setError(null); // Clear error since we have fallback
      } catch (localErr) {
        console.error('Local recipes error:', localErr);
        setError('Both Spoonacular API and local recipes are unavailable.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const searchResults = await searchRecipes({
        query: searchQuery,
        number: 8
      });
      
      const formattedRecipes = searchResults.map(recipe => ({
        id: `spoonacular-${recipe.id}`,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        source: 'spoonacular',
        summary: recipe.summary,
        diets: recipe.diets || [],
        score: recipe.spoonacularScore
      }));
      
      setRecipes(formattedRecipes);
    } catch (err) {
      console.error('Spoonacular API error:', err);
      setError('Spoonacular API temporarily unavailable. Showing local recipes instead.');
      
      // Fallback to local recipes
      try {
        const { searchLocalRecipes } = await import('../services/unifiedRecipeService');
        const localRecipes = searchLocalRecipes(searchQuery);
        setRecipes(localRecipes.slice(0, 8));
        setError(null); // Clear error since we have fallback
      } catch (localErr) {
        console.error('Local recipes error:', localErr);
        setError('Both Spoonacular API and local recipes are unavailable.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="spoonacular-demo">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading recipes from Spoonacular...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="spoonacular-demo">
        <div className="error">
          <h2>API Error</h2>
          <p>{error}</p>
          <button onClick={loadRandomRecipes}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="spoonacular-demo">
      <div className="demo-header">
        <h1>🌍 Spoonacular API Demo</h1>
        <p>Testing integration with Spoonacular recipe database</p>
        
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={loadRandomRecipes}>Random</button>
        </form>
      </div>

      <div className="recipes-grid">
        {recipes.map(recipe => (
          <EnhancedRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {recipes.length === 0 && !loading && !error && (
        <div className="no-recipes">
          <p>No recipes found. Try searching or loading random recipes.</p>
        </div>
      )}
    </div>
  );
};

export default SpoonacularDemo;
