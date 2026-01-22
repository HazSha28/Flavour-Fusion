// src/utils/cache.js

class RecipeCache {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  clear() {
    this.cache.clear();
  }

  has(key) {
    return this.get(key) !== null;
  }

  delete(key) {
    this.cache.delete(key);
  }

  size() {
    return this.cache.size;
  }
}

export const recipeCache = new RecipeCache();

// Cache wrapper for API calls
export const withCache = (cacheKey, apiCall) => {
  return async (...args) => {
    const key = typeof cacheKey === 'function' ? cacheKey(...args) : cacheKey;
    
    // Check cache first
    const cached = recipeCache.get(key);
    if (cached) return cached;

    // Fetch from API
    const result = await apiCall(...args);
    
    // Cache results
    recipeCache.set(key, result);
    
    return result;
  };
};
