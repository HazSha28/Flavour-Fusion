// Test file to verify TheMealDB API connection
// Run this with: node test-mealdb.js

// Import the functions from our service
const { searchMealsByName, getRandomMeals, formatMealToRecipe } = require('./src/services/mealdbService.js');

async function testMealDB() {
  console.log('🍽️  Testing TheMealDB API connection...\n');
  
  try {
    // Test 1: Search for a recipe
    console.log('1. Testing search for "pizza"...');
    const searchResults = await searchMealsByName('pizza');
    console.log(`✅ Found ${searchResults.length} pizza recipes`);
    
    if (searchResults.length > 0) {
      const formatted = formatMealToRecipe(searchResults[0]);
      console.log(`   Example: ${formatted.title} from ${formatted.area}`);
      console.log(`   Category: ${formatted.category}`);
      console.log(`   Image: ${formatted.image}\n`);
    }
    
    // Test 2: Get random recipes
    console.log('2. Testing random recipes...');
    const randomRecipes = await getRandomMeals(3);
    console.log(`✅ Found ${randomRecipes.length} random recipes`);
    
    if (randomRecipes.length > 0) {
      randomRecipes.forEach((recipe, index) => {
        const formatted = formatMealToRecipe(recipe);
        console.log(`   ${index + 1}. ${formatted.title} (${formatted.category})`);
      });
    }
    
    console.log('\n🎉 All tests passed! TheMealDB API is working correctly.');
    
  } catch (error) {
    console.error('❌ Error testing TheMealDB:', error.message);
    process.exit(1);
  }
}

// Run the test
testMealDB();
