// src/services/unifiedRecipeService.js
import { searchMealsByName, getMealById, getRandomMeals, getMealsByIngredient, formatMealToRecipe } from './mealdbService';
import { withCache } from '../utils/cache';

// Cache wrapper for search
export const searchRecipesCached = withCache(
  (params) => `search-${JSON.stringify(params)}`,
  searchMealsByName
);

// Get all recipes from TheMealDB
export const getAllRecipes = async (searchQuery, options = {}) => {
  const {
    number = 10,
    ...mealDbParams
  } = options;

  try {
    // Search TheMealDB API
    const mealDbResults = await searchRecipesCached({
      query: searchQuery,
      ...mealDbParams
    });
    
    // Format meals to our unified format
    const formattedMeals = mealDbResults.map(meal => formatMealToRecipe(meal)).filter(Boolean);
    
    return formattedMeals;
  } catch (error) {
    console.error('Error fetching recipes from TheMealDB:', error);
    throw error;
  }
};

// Search recipes from TheMealDB
export const searchLocalRecipes = async (searchQuery) => {
  try {
    const mealDbResults = await searchMealsByName(searchQuery);
    return mealDbResults.map(meal => formatMealToRecipe(meal)).filter(Boolean);
  } catch (error) {
    console.error('Error searching TheMealDB:', error);
    return [];
  }
};

// Get unified recipe details from TheMealDB
export const getUnifiedRecipeDetails = async (recipeId) => {
  try {
    const details = await getMealById(recipeId);
    if (!details) {
      throw new Error('Recipe not found');
    }
    
    return {
      ...formatMealToRecipe(details),
      id: recipeId,
      source: 'themealdb'
    };
  } catch (error) {
    console.error('Error fetching TheMealDB recipe details:', error);
    throw error;
  }
};

// Get random recipes from TheMealDB
export const getRandomRecipesFromAllSources = async (number = 10) => {
  try {
    const randomMeals = await getRandomMeals(number);
    return randomMeals.map(meal => formatMealToRecipe(meal)).filter(Boolean);
  } catch (error) {
    console.error('Error getting random recipes from TheMealDB:', error);
    throw error;
  }
};

// Get recipes by ingredients from TheMealDB
export const getRecipesByIngredientsFromAllSources = async (ingredients, number = 10) => {
  try {
    const results = [];
    
    // For each ingredient, get recipes from TheMealDB
    for (const ingredient of ingredients) {
      try {
        const meals = await getMealsByIngredient(ingredient);
        const formattedMeals = meals.map(meal => formatMealToRecipe(meal)).filter(Boolean);
        results.push(...formattedMeals);
      } catch (error) {
        console.warn(`Could not fetch recipes for ingredient ${ingredient}:`, error.message);
      }
    }
    
    // Remove duplicates and limit results
    const uniqueRecipes = results.filter((recipe, index, self) => 
      index === self.findIndex(r => r.id === recipe.id)
    );
    
    return uniqueRecipes.slice(0, number);
  } catch (error) {
    console.error('Error getting recipes by ingredients from TheMealDB:', error);
    throw error;
  }
};
