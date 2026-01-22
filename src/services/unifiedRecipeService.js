// src/services/unifiedRecipeService.js
import { searchRecipes, getRecipeDetails as getSpoonacularDetails, getRandomRecipes, getRecipesByIngredients } from './spoonacularService';
import { withCache, recipeCache } from '../utils/cache';
import { recipeDatabase } from '../pages/RecipeDetails';

// Cache wrapper for search
export const searchRecipesCached = withCache(
  (params) => `search-${JSON.stringify(params)}`,
  searchRecipes
);

// Get all recipes from all sources
export const getAllRecipes = async (searchQuery, options = {}) => {
  const {
    source = 'all',
    number = 10,
    includeLocal = true,
    includeSpoonacular = true,
    ...spoonacularParams
  } = options;

  try {
    const results = [];

    // Add local/home recipes if requested
    if (includeLocal && (source === 'all' || source === 'local')) {
      const localRecipes = searchLocalRecipes(searchQuery);
      results.push(...localRecipes);
    }

    // Add Spoonacular recipes if requested
    if (includeSpoonacular && (source === 'all' || source === 'spoonacular')) {
      try {
        const spoonacularRecipes = await searchRecipesCached({
          query: searchQuery,
          number: number,
          ...spoonacularParams
        });
        
        // Map to unified format
        const formattedSpoonacular = spoonacularRecipes.map(recipe => ({
          id: `spoonacular-${recipe.id}`,
          spoonacularId: recipe.id,
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          source: 'spoonacular',
          summary: recipe.summary,
          diets: recipe.diets || [],
          score: recipe.spoonacularScore,
          cuisines: recipe.cuisines || [],
          dishTypes: recipe.dishTypes || [],
          ingredients: recipe.extendedIngredients || [],
          instructions: recipe.analyzedInstructions || [],
          nutrition: recipe.nutrition
        }));
        
        results.push(...formattedSpoonacular);
      } catch (error) {
        console.warn('Spoonacular API unavailable, using local recipes only:', error.message);
        // Continue with local recipes if Spoonacular fails
      }
    }

    return results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// Search local recipes from the existing database
export const searchLocalRecipes = (searchQuery) => {
  const lowerQuery = searchQuery.toLowerCase();
  const results = [];

  // Search through all recipe categories in the database
  Object.entries(recipeDatabase).forEach(([id, recipe]) => {
    if (
      recipe.title.toLowerCase().includes(lowerQuery) ||
      recipe.subtitle?.toLowerCase().includes(lowerQuery) ||
      recipe.category?.toLowerCase().includes(lowerQuery) ||
      recipe.cuisine?.toLowerCase().includes(lowerQuery) ||
      recipe.description?.toLowerCase().includes(lowerQuery)
    ) {
      results.push({
        id: recipe.id,
        title: recipe.title,
        subtitle: recipe.subtitle,
        image: recipe.images?.[0] || recipe.image,
        readyInMinutes: recipe.readyInMinutes || recipe.cookTime,
        servings: recipe.servings,
        source: 'local',
        summary: recipe.description,
        diets: recipe.diets || [],
        score: recipe.rating * 20, // Convert 0-5 to 0-100 scale
        cuisines: [recipe.cuisine],
        dishTypes: [recipe.category],
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        nutrition: recipe.nutrition
      });
    }
  });

  return results;
};

// Get unified recipe details
export const getUnifiedRecipeDetails = async (recipeId) => {
  const [source, id] = recipeId.includes('-') ? recipeId.split('-', 2) : ['local', recipeId];
  
  if (source === 'spoonacular') {
    try {
      const details = await getSpoonacularDetails(id);
      return {
        ...details,
        id: recipeId,
        source: 'spoonacular'
      };
    } catch (error) {
      console.error('Error fetching Spoonacular recipe details:', error);
      throw error;
    }
  } else {
    // Local recipe from database
    const recipe = recipeDatabase[recipeId];
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    
    return {
      ...recipe,
      id: recipeId,
      source: 'local'
    };
  }
};

// Get random recipes from all sources
export const getRandomRecipesFromAllSources = async (number = 10) => {
  try {
    const results = [];
    
    // Get some local recipes
    const localRecipeIds = Object.keys(recipeDatabase);
    const shuffledLocal = localRecipeIds.sort(() => 0.5 - Math.random());
    const selectedLocal = shuffledLocal.slice(0, Math.ceil(number / 2));
    
    selectedLocal.forEach(id => {
      const recipe = recipeDatabase[id];
      results.push({
        id: recipe.id,
        title: recipe.title,
        subtitle: recipe.subtitle,
        image: recipe.images?.[0] || recipe.image,
        readyInMinutes: recipe.readyInMinutes || recipe.cookTime,
        servings: recipe.servings,
        source: 'local',
        summary: recipe.description,
        diets: recipe.diets || [],
        score: recipe.rating * 20
      });
    });
    
    // Try to get Spoonacular recipes
    try {
      const spoonacularRecipes = await getRandomRecipes(Math.floor(number / 2));
      const formattedSpoonacular = spoonacularRecipes.map(recipe => ({
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
      
      results.push(...formattedSpoonacular);
    } catch (error) {
      console.warn('Could not fetch Spoonacular random recipes:', error.message);
    }
    
    // Shuffle and return
    return results.sort(() => 0.5 - Math.random()).slice(0, number);
  } catch (error) {
    console.error('Error getting random recipes:', error);
    throw error;
  }
};

// Get recipes by ingredients
export const getRecipesByIngredientsFromAllSources = async (ingredients, number = 10) => {
  try {
    const results = [];
    
    // Search local recipes by ingredients
    Object.entries(recipeDatabase).forEach(([id, recipe]) => {
      if (recipe.ingredients) {
        const hasIngredients = ingredients.some(ingredient => 
          recipe.ingredients.some(recipeIngredient => 
            recipeIngredient.name.toLowerCase().includes(ingredient.toLowerCase())
          )
        );
        
        if (hasIngredients) {
          results.push({
            id: recipe.id,
            title: recipe.title,
            subtitle: recipe.subtitle,
            image: recipe.images?.[0] || recipe.image,
            readyInMinutes: recipe.readyInMinutes || recipe.cookTime,
            servings: recipe.servings,
            source: 'local',
            summary: recipe.description,
            diets: recipe.diets || [],
            score: recipe.rating * 20
          });
        }
      }
    });
    
    // Try Spoonacular API
    try {
      const spoonacularRecipes = await getRecipesByIngredients(ingredients, number);
      const formattedSpoonacular = spoonacularRecipes.map(recipe => ({
        id: `spoonacular-${recipe.id}`,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        source: 'spoonacular',
        summary: recipe.summary,
        diets: recipe.diets || [],
        score: recipe.spoonacularScore,
        usedIngredients: recipe.usedIngredients,
        missedIngredients: recipe.missedIngredients
      }));
      
      results.push(...formattedSpoonacular);
    } catch (error) {
      console.warn('Could not fetch Spoonacular recipes by ingredients:', error.message);
    }
    
    return results;
  } catch (error) {
    console.error('Error getting recipes by ingredients:', error);
    throw error;
  }
};
