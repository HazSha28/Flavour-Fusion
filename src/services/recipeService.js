import { db } from '../firebase';
import { collection, doc, setDoc, getDoc, getDocs, query, where } from 'firebase/firestore';

const RECIPES_COLLECTION = 'recipes';

export const recipeService = {
  // Upload all recipes to Firebase
  async uploadRecipes(recipes) {
    const recipesCollection = collection(db, RECIPES_COLLECTION);
    const uploadPromises = [];
    
    Object.entries(recipes).forEach(([id, recipe]) => {
      const docRef = doc(db, RECIPES_COLLECTION, id);
      uploadPromises.push(setDoc(docRef, recipe));
    });
    
    try {
      await Promise.all(uploadPromises);
      console.log('All recipes uploaded successfully!');
      return true;
    } catch (error) {
      console.error('Error uploading recipes:', error);
      return false;
    }
  },

  // Get single recipe by ID
  async getRecipe(recipeId) {
    try {
      const docRef = doc(db, RECIPES_COLLECTION, recipeId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log('No such recipe!');
        return null;
      }
    } catch (error) {
      console.error('Error getting recipe:', error);
      return null;
    }
  },

  // Get all recipes
  async getAllRecipes() {
    try {
      const querySnapshot = await getDocs(collection(db, RECIPES_COLLECTION));
      const recipes = [];
      
      querySnapshot.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
      
      return recipes;
    } catch (error) {
      console.error('Error getting recipes:', error);
      return [];
    }
  },

  // Get recipes by category
  async getRecipesByCategory(category) {
    try {
      const q = query(collection(db, RECIPES_COLLECTION), where('category', '==', category));
      const querySnapshot = await getDocs(q);
      const recipes = [];
      
      querySnapshot.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
      
      return recipes;
    } catch (error) {
      console.error('Error getting recipes by category:', error);
      return [];
    }
  },

  // Get recipes by area/cuisine
  async getRecipesByArea(area) {
    try {
      const q = query(collection(db, RECIPES_COLLECTION), where('area', '==', area));
      const querySnapshot = await getDocs(q);
      const recipes = [];
      
      querySnapshot.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
      
      return recipes;
    } catch (error) {
      console.error('Error getting recipes by area:', error);
      return [];
    }
  }
};
