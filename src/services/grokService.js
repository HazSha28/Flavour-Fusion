// src/services/grokService.js
import { withCache } from '../utils/cache';

// Grok API configuration
const GROK_API_CONFIG = {
  baseURL: 'https://api.x.ai/v1',
  model: 'grok-beta',
  maxTokens: 1000,
  temperature: 0.7
};

// Cache wrapper for Grok API calls
export const grokApiCallCached = withCache(
  (params) => `grok-${JSON.stringify(params)}`,
  grokApiCall
);

/**
 * Make a call to the Grok API
 * @param {string} prompt - The prompt to send to Grok
 * @param {Object} options - Additional options for the API call
 * @returns {Promise<Object>} - The API response
 */
export async function grokApiCall(prompt, options = {}) {
  try {
    const apiKey = process.env.REACT_APP_GROK_API_KEY || localStorage.getItem('grok_api_key');
    
    if (!apiKey) {
      throw new Error('Grok API key is required. Please set REACT_APP_GROK_API_KEY or add it to localStorage.');
    }

    const response = await fetch(`${GROK_API_CONFIG.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: GROK_API_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: `You are a professional chef and recipe expert. When users ask for recipes, provide detailed, accurate, and well-structured responses. Always include:
1. Recipe title and brief description
2. Prep time, cook time, and total time
3. Number of servings
4. Difficulty level
5. Ingredients with quantities
6. Step-by-step instructions
7. Nutritional information (approximate)
8. Tips and variations

Format your response as JSON with the following structure:
{
  "title": "Recipe Title",
  "description": "Brief description",
  "prepTime": "XX min",
  "cookTime": "XX min", 
  "totalTime": "XX min",
  "servings": X,
  "difficulty": "Easy/Medium/Hard",
  "ingredients": [{"name": "Ingredient", "amount": "Amount", "notes": "Notes"}],
  "steps": [{"title": "Step Title", "description": "Detailed instructions", "time": "XX min"}],
  "nutrition": {"calories": XXX, "protein": "XXg", "carbs": "XXg", "fat": "XXg"},
  "tips": ["Tip 1", "Tip 2"],
  "category": "Recipe Category",
  "cuisine": "Cuisine Type"
}`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: options.maxTokens || GROK_API_CONFIG.maxTokens,
        temperature: options.temperature || GROK_API_CONFIG.temperature
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Grok API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error calling Grok API:', error);
    throw error;
  }
}

/**
 * Search for recipes using Grok AI
 * @param {string} query - The search query
 * @param {Object} options - Search options
 * @returns {Promise<Array>} - Array of recipe suggestions
 */
export async function searchRecipesWithGrok(query, options = {}) {
  try {
    const prompt = `I'm looking for recipe ideas for: "${query}". Please provide 3-5 diverse recipe suggestions that match this request. For each recipe, provide the complete details in the JSON format specified in the system prompt.`;

    const response = await grokApiCallCached({
      prompt,
      ...options
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from Grok API');
    }

    // Try to parse JSON from the response
    let recipes;
    try {
      // Look for JSON content in the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recipes = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON found, create a basic recipe object from the text
        recipes = {
          title: `${query} Recipe`,
          description: content.substring(0, 200) + '...',
          prepTime: "30 min",
          cookTime: "30 min",
          totalTime: "1 hour",
          servings: 4,
          difficulty: "Medium",
          ingredients: [],
          steps: [],
          nutrition: { calories: 400, protein: "25g", carbs: "40g", fat: "15g" },
          tips: [],
          category: "Custom",
          cuisine: "International"
        };
      }
    } catch (parseError) {
      console.error('Error parsing Grok response:', parseError);
      // Fallback recipe object
      recipes = {
        title: `${query} Recipe`,
        description: content.substring(0, 200) + '...',
        prepTime: "30 min",
        cookTime: "30 min", 
        totalTime: "1 hour",
        servings: 4,
        difficulty: "Medium",
        ingredients: [],
        steps: [],
        nutrition: { calories: 400, protein: "25g", carbs: "40g", fat: "15g" },
        tips: [],
        category: "Custom",
        cuisine: "International"
      };
    }

    // Convert to array format for consistency
    return Array.isArray(recipes) ? recipes : [recipes];
  } catch (error) {
    console.error('Error searching recipes with Grok:', error);
    throw error;
  }
}

/**
 * Get detailed recipe information using Grok AI
 * @param {string} recipeName - The name of the recipe
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} - Detailed recipe information
 */
export async function getRecipeDetailsWithGrok(recipeName, options = {}) {
  try {
    const prompt = `Please provide detailed instructions for making: "${recipeName}". Include all ingredients, step-by-step instructions, cooking times, and any tips for success. Format as JSON according to the system prompt.`;

    const response = await grokApiCallCached({
      prompt,
      ...options
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from Grok API');
    }

    // Parse the JSON response
    let recipeDetails;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recipeDetails = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Error parsing recipe details:', parseError);
      throw new Error('Could not parse recipe details from Grok response');
    }

    return recipeDetails;
  } catch (error) {
    console.error('Error getting recipe details with Grok:', error);
    throw error;
  }
}

/**
 * Get recipe recommendations based on ingredients
 * @param {Array} ingredients - List of available ingredients
 * @param {Object} options - Additional options
 * @returns {Promise<Array>} - Recipe recommendations
 */
export async function getRecipesByIngredientsWithGrok(ingredients, options = {}) {
  try {
    const ingredientsList = ingredients.join(', ');
    const prompt = `I have these ingredients available: ${ingredientsList}. Please suggest 3-5 recipes I can make with them. For each recipe, provide complete details in JSON format. Consider recipes that use most or all of the ingredients.`;

    const response = await grokApiCallCached({
      prompt,
      ...options
    });

    const content = response.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error('No content received from Grok API');
    }

    // Parse the response
    let recipes;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        recipes = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Error parsing ingredient-based recipes:', parseError);
      throw new Error('Could not parse recipe suggestions from Grok response');
    }

    return Array.isArray(recipes) ? recipes : [recipes];
  } catch (error) {
    console.error('Error getting recipes by ingredients with Grok:', error);
    throw error;
  }
}

/**
 * Set the Grok API key
 * @param {string} apiKey - The API key to set
 */
export function setGrokApiKey(apiKey) {
  localStorage.setItem('grok_api_key', apiKey);
}

/**
 * Get the current Grok API key
 * @returns {string|null} - The current API key or null if not set
 */
export function getGrokApiKey() {
  return process.env.REACT_APP_GROK_API_KEY || localStorage.getItem('grok_api_key');
}

/**
 * Check if Grok API is configured
 * @returns {boolean} - True if API key is available
 */
export function isGrokConfigured() {
  return !!getGrokApiKey();
}
