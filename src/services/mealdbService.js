// src/services/mealdbService.js
// TheMealDB API Service

const MEALDB_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Search for meals by name
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Array of meals
 */
export async function searchMealsByName(query) {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`TheMealDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching meals by name:', error);
    throw error;
  }
}

/**
 * Search for meals by first letter
 * @param {string} letter - First letter of meal name
 * @returns {Promise<Array>} - Array of meals
 */
export async function searchMealsByFirstLetter(letter) {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/search.php?f=${letter}`);
    
    if (!response.ok) {
      throw new Error(`TheMealDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error searching meals by first letter:', error);
    throw error;
  }
}

/**
 * Get meal details by ID
 * @param {string} id - Meal ID
 * @returns {Promise<Object>} - Meal details
 */
export async function getMealById(id) {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/lookup.php?i=${id}`);
    
    if (!response.ok) {
      throw new Error(`TheMealDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error getting meal by ID:', error);
    throw error;
  }
}

/**
 * Get random meal
 * @returns {Promise<Object>} - Random meal
 */
export async function getRandomMeal() {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/random.php`);
    
    if (!response.ok) {
      throw new Error(`TheMealDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals ? data.meals[0] : null;
  } catch (error) {
    console.error('Error getting random meal:', error);
    throw error;
  }
}

/**
 * Get multiple random meals
 * @param {number} count - Number of random meals to get
 * @returns {Promise<Array>} - Array of random meals
 */
export async function getRandomMeals(count = 10) {
  try {
    const promises = Array.from({ length: count }, () => getRandomMeal());
    const meals = await Promise.all(promises);
    return meals.filter(meal => meal !== null);
  } catch (error) {
    console.error('Error getting random meals:', error);
    throw error;
  }
}

/**
 * Get all meal categories
 * @returns {Promise<Array>} - Array of categories
 */
export async function getCategories() {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/categories.php`);
    
    if (!response.ok) {
      throw new Error(`TheMealDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}

/**
 * Get meals by category
 * @param {string} category - Category name
 * @returns {Promise<Array>} - Array of meals
 */
export async function getMealsByCategory(category) {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
    
    if (!response.ok) {
      throw new Error(`TheMealDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error getting meals by category:', error);
    throw error;
  }
}

/**
 * Get all areas (cuisines)
 * @returns {Promise<Array>} - Array of areas
 */
export async function getAreas() {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/list.php?a=list`);
    
    if (!response.ok) {
      throw new Error(`TheMealDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error getting areas:', error);
    throw error;
  }
}

/**
 * Get meals by area (cuisine)
 * @param {string} area - Area name
 * @returns {Promise<Array>} - Array of meals
 */
export async function getMealsByArea(area) {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/filter.php?a=${encodeURIComponent(area)}`);
    
    if (!response.ok) {
      throw new Error(`TheMealDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error getting meals by area:', error);
    throw error;
  }
}

/**
 * Get all ingredients
 * @returns {Promise<Array>} - Array of ingredients
 */
export async function getIngredients() {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/list.php?i=list`);
    
    if (!response.ok) {
      throw new Error(`TheMealDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error getting ingredients:', error);
    throw error;
  }
}

/**
 * Get meals by main ingredient
 * @param {string} ingredient - Ingredient name
 * @returns {Promise<Array>} - Array of meals
 */
export async function getMealsByIngredient(ingredient) {
  try {
    const response = await fetch(`${MEALDB_BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`);
    
    if (!response.ok) {
      throw new Error(`TheMealDB API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error('Error getting meals by ingredient:', error);
    throw error;
  }
}

/**
 * Convert TheMealDB meal to our recipe format
 * @param {Object} meal - TheMealDB meal object
 * @returns {Object} - Formatted recipe object
 */
export function formatMealToRecipe(meal) {
  if (!meal) return null;
  
  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        amount: measure ? measure.trim() : '',
        notes: ''
      });
    }
  }
  
  // Extract instructions steps
  const instructions = meal.strInstructions || '';
  const steps = instructions
    .split(/\r?\n/)
    .filter(step => step.trim())
    .map((step, index) => ({
      title: `Step ${index + 1}`,
      description: step.trim(),
      time: ''
    }));
  
  return {
    id: meal.idMeal,
    title: meal.strMeal,
    subtitle: meal.strTags || meal.strArea || 'International Cuisine',
    image: meal.strMealThumb,
    category: meal.strCategory,
    area: meal.strArea,
    difficulty: 'Medium', // TheMealDB doesn't provide difficulty
    rating: 4.0, // Default rating
    time: '45 min', // Default time
    cookTime: '30 min',
    prepTime: '15 min',
    servings: 4,
    source: 'themealdb',
    summary: meal.strInstructions ? meal.strInstructions.substring(0, 200) + '...' : '',
    ingredients,
    steps,
    nutrition: null, // TheMealDB doesn't provide nutrition info
    tips: [],
    youtube: meal.strYoutube,
    sourceUrl: meal.strSource
  };
}
