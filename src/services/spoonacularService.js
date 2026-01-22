// src/services/spoonacularService.js

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = import.meta.env.VITE_SPOONACULAR_BASE_URL || 'https://api.spoonacular.com';

// API Error Handler
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 402:
        return 'API quota exceeded. Please upgrade your plan or try again tomorrow.';
      case 401:
        return 'Invalid API key. Please check your configuration.';
      case 404:
        return 'Recipe not found.';
      case 429:
        return 'Rate limit exceeded. Please wait before making another request.';
      default:
        return `API error: ${error.response.status}`;
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your internet connection.';
  } else {
    // Other error
    return 'An unexpected error occurred.';
  }
};

// Search Recipes API
export const searchRecipes = async (params) => {
  try {
    const queryParams = new URLSearchParams({
      apiKey: API_KEY,
      number: 10,
      addRecipeInformation: true,
      addInstructions: true,
      addIngredients: true,
      fillIngredients: true,
      ...params
    });

    const response = await fetch(`${BASE_URL}/recipes/complexSearch?${queryParams}`);
    
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.response = { status: response.status };
      throw error;
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw new Error(handleAPIError(error));
  }
};

// Get Recipe Details by ID
export const getRecipeDetails = async (recipeId) => {
  try {
    const response = await fetch(`${BASE_URL}/recipes/${recipeId}/information?apiKey=${API_KEY}&includeNutrition=true`);
    
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.response = { status: response.status };
      throw error;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw new Error(handleAPIError(error));
  }
};

// Search with retry for rate limiting
export const searchRecipesWithRetry = async (params, retries = 2) => {
  try {
    return await searchRecipes(params);
  } catch (error) {
    if (retries > 0 && error.message.includes('Rate limit exceeded')) {
      // Wait 1 second and retry for rate limit errors
      await new Promise(resolve => setTimeout(resolve, 1000));
      return searchRecipesWithRetry(params, retries - 1);
    }
    throw error;
  }
};

// Get random recipes
export const getRandomRecipes = async (number = 10) => {
  try {
    const response = await fetch(`${BASE_URL}/recipes/random?apiKey=${API_KEY}&number=${number}&limitLicense=true`);
    
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.response = { status: response.status };
      throw error;
    }
    
    const data = await response.json();
    return data.recipes || [];
  } catch (error) {
    console.error('Error fetching random recipes:', error);
    throw new Error(handleAPIError(error));
  }
};

// Get recipe by ingredients
export const getRecipesByIngredients = async (ingredients, number = 10) => {
  try {
    const params = new URLSearchParams({
      apiKey: API_KEY,
      ingredients: ingredients.join(','),
      number: number,
      ranking: 1,
      ignorePantry: false
    });

    const response = await fetch(`${BASE_URL}/recipes/findByIngredients?${params}`);
    
    if (!response.ok) {
      const error = new Error(`HTTP error! status: ${response.status}`);
      error.response = { status: response.status };
      throw error;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes by ingredients:', error);
    throw new Error(handleAPIError(error));
  }
};
