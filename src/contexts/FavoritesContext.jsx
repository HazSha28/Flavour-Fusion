import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth, db } from '../firebase';

const FavoritesContext = createContext();

export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const addFavorite = async (recipe) => {
    if (!auth.currentUser) return;

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const favoriteItem = {
        id: recipe.id || Date.now().toString(),
        title: recipe.title,
        image: recipe.image,
        rating: recipe.rating || 0,
        time: recipe.time || recipe.cookTime || 'Unknown',
        category: recipe.category || 'General',
        addedAt: new Date().toISOString()
      };

      await setDoc(userRef, {
        favorites: arrayUnion(favoriteItem)
      }, { merge: true });

      setFavorites(prev => [...prev, favoriteItem]);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  const removeFavorite = async (recipeId) => {
    if (!auth.currentUser) return;

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const favoriteToRemove = favorites.find(fav => fav.id === recipeId);
      
      if (favoriteToRemove) {
        await setDoc(userRef, {
          favorites: arrayRemove(favoriteToRemove)
        }, { merge: true });

        setFavorites(prev => prev.filter(fav => fav.id !== recipeId));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const isFavorite = (recipeId) => {
    return favorites.some(fav => fav.id === recipeId);
  };

  const toggleFavorite = (recipe) => {
    if (isFavorite(recipe.id)) {
      removeFavorite(recipe.id);
    } else {
      addFavorite(recipe);
    }
  };

  useEffect(() => {
    const loadFavorites = async () => {
      if (auth.currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
          if (userDoc.exists() && userDoc.data().favorites) {
            setFavorites(userDoc.data().favorites);
          }
        } catch (error) {
          console.error('Error loading favorites:', error);
        }
      }
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        loadFavorites();
      } else {
        setFavorites([]);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
