import { recipeService } from '../services/recipeService';
import { recipeData } from '../data/recipes';

// Function to upload all recipes to Firebase
const uploadAllRecipes = async () => {
  console.log('Starting recipe upload to Firebase...');
  
  const success = await recipeService.uploadRecipes(recipeData);
  
  if (success) {
    console.log('✅ All recipes uploaded successfully to Firebase!');
    console.log(`📊 Total recipes uploaded: ${Object.keys(recipeData).length}`);
  } else {
    console.log('❌ Failed to upload recipes to Firebase');
  }
};

// Export for use in components or run directly
export { uploadAllRecipes };

// Auto-run if this script is executed directly
if (typeof window !== 'undefined') {
  // Add to window for manual execution in browser console
  window.uploadAllRecipes = uploadAllRecipes;
  console.log('💡 Run uploadAllRecipes() in browser console to upload recipes to Firebase');
}
