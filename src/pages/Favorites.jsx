import React, { useState, useMemo } from 'react';
import { FaHeart, FaRegSmile, FaBookmark, FaShare, FaFilter, FaSort, FaUtensils, FaClock, FaFire, FaStar } from 'react-icons/fa';
import Header from '../components/Header';
import './Favorites.css';

const Favorites = () => {
  // Mock favorite recipes data - in real app, this would come from user's profile
  const [favoriteRecipes] = useState([
    { id: 1, title: 'Creamy Garlic Sauce Steak', image: '/images/eatw/F1.jpg', rating: 4.9, time: '45 min', category: 'Main Course' },
    { id: 2, title: 'High Protein Bowl', image: '/images/bitesbb/F1.jpg', rating: 4.4, time: '15 min', category: 'Breakfast' },
    { id: 3, title: 'Spaghetti', image: '/images/smartp/F2.jpg', rating: 4.4, time: '30 min', category: 'Italian' },
    { id: 4, title: 'Butter Chicken', image: '/images/eatw/F8.jpg', rating: 4.7, time: '40 min', category: 'Indian' },
    { id: 5, title: 'Pizza', image: '/images/global/F1.jpg', rating: 4.5, time: '30 min', category: 'Italian' },
    { id: 6, title: 'Sushi', image: '/images/global/F8.jpg', rating: 4.8, time: '50 min', category: 'Japanese' },
    { id: 7, title: 'Shawarma', image: '/images/global/F2.jpg', rating: 4.8, time: '45 min', category: 'Middle Eastern' },
    { id: 8, title: 'Biriyani', image: '/images/eatw/F6.jpg', rating: 4.9, time: '55 min', category: 'Indian' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLike = (recipeId) => {
    console.log('Like recipe:', recipeId);
  };

  const handleBookmark = (recipeId) => {
    console.log('Bookmark recipe:', recipeId);
  };

  // Get unique categories from recipes
  const categories = useMemo(() => {
    const cats = [...new Set(favoriteRecipes.map(recipe => recipe.category))];
    return ['All', ...cats];
  }, [favoriteRecipes]);

  // Filter and sort recipes
  const filteredAndSortedRecipes = useMemo(() => {
    let filtered = favoriteRecipes;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort recipes
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return 0; // Keep original order
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [favoriteRecipes, selectedCategory, sortBy, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalLikes = favoriteRecipes.reduce((sum, recipe) => sum + (recipe.likes || 0), 0);
    const avgRating = (favoriteRecipes.reduce((sum, recipe) => sum + (recipe.rating || 0), 0) / favoriteRecipes.length).toFixed(1);
    const categoryCounts = favoriteRecipes.reduce((acc, recipe) => {
      acc[recipe.category] = (acc[recipe.category] || 0) + 1;
      return acc;
    }, {});
    
    return {
      totalRecipes: favoriteRecipes.length,
      totalLikes,
      avgRating,
      categoryCounts
    };
  }, [favoriteRecipes]);

  return (
    <Header showHeroSection={false} showNavigation={false}>
      <div className="favorites-container">
        <div className="favorites-header">
          <h2>My Favorite Recipes</h2>
          <div className="favorites-subtitle">
            <FaHeart />
            <span>Recipes you've marked as favorites</span>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="favorites-stats">
          <div className="stat-card">
            <div className="stat-number">{stats.totalRecipes}</div>
            <div className="stat-label">Total Recipes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.totalLikes}</div>
            <div className="stat-label">Total Likes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.avgRating}</div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="category-distribution">
          <h3>Categories</h3>
          <div className="category-tags">
            {Object.entries(stats.categoryCounts).map(([category, count]) => (
              <div 
                key={category} 
                className={`category-tag ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                <span className="category-name">{category}</span>
                <span className="category-count">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="favorites-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search favorite recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-controls">
            <div className="filter-group">
              <label className="filter-label">
                <FaFilter />
                Category:
              </label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">
                <FaSort />
                Sort by:
              </label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="recent">Most Recent</option>
                <option value="likes">Most Liked</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="favorites-feed">
          {filteredAndSortedRecipes.map(recipe => (
            <div key={recipe.id} className="favorite-post">
              <div className="post-header">
                <img src={recipe.image} alt={recipe.title} className="post-image" />
                <div className="post-meta">
                  <div className="post-author">
                    <img src={`https://picsum.photos/seed/user/50/50.jpg`} alt="User" className="author-avatar" />
                    <div className="author-info">
                      <span className="author-name">You</span>
                      <span className="author-username">@chef</span>
                    </div>
                  </div>
                  <div className="post-actions">
                    <button 
                      className={`action-btn ${recipe.isLiked ? 'liked' : ''}`}
                      onClick={() => handleLike(recipe.id)}
                    >
                      <FaHeart />
                      <span>{recipe.likes || 0}</span>
                    </button>
                    <button 
                      className={`action-btn ${recipe.isBookmarked ? 'bookmarked' : ''}`}
                      onClick={() => handleBookmark(recipe.id)}
                    >
                      <FaBookmark />
                    </button>
                    <button className="action-btn">
                      <FaShare />
                    </button>
                  </div>
                </div>
              </div>
              <div className="post-content">
                <h3>{recipe.title}</h3>
                <div className="post-meta-info">
                  <span className="meta-item">
                    <FaUtensils />
                    {recipe.category}
                  </span>
                  <span className="meta-item">
                    <FaClock />
                    {recipe.time}
                  </span>
                  <span className="meta-item">
                    <FaStar />
                    {recipe.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Header>
  );
};

export default Favorites;
