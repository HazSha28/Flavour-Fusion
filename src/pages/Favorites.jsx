import React, { useState, useMemo } from 'react';
import { FaHeart, FaRegSmile, FaBookmark, FaShare, FaFilter, FaSort, FaUtensils, FaClock, FaFire, FaStar } from 'react-icons/fa';
import Header from '../components/Header';

const Favorites = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Homemade Pasta Carbonara",
      description: "Finally perfected my Nonna's recipe! The secret is using egg yolks and pasta water for creamiest carbonara sauce.",
      image: "/globalhtml/F6.jpg",
      author: "Chef Maria",
      username: "mariacooks",
      timestamp: "2 hours ago",
      likes: 24,
      isLiked: false,
      isBookmarked: true,
      category: "Italian",
      difficulty: "Medium",
      cookTime: "30 min",
      prepTime: "15 min",
      rating: 4.5
    },
    {
      id: 2,
      title: "Weekend Brunch Adventure",
      description: "Explored a new local café and discovered most amazing avocado toast with poached eggs. Perfect weekend treat!",
      image: "/BitesBB/F2.jpg",
      author: "Weekend Foodie",
      username: "brunchlover",
      timestamp: "5 hours ago",
      likes: 18,
      isLiked: true,
      isBookmarked: false,
      category: "Brunch",
      difficulty: "Easy",
      cookTime: "15 min",
      prepTime: "10 min",
      rating: 4.2
    },
    {
      id: 3,
      title: "Spicy Thai Green Curry",
      description: "Made authentic Thai green curry from scratch. The balance of flavors was perfect - spicy, aromatic, and comforting.",
      image: "/EatW/F6.jpg",
      author: "ThaiFoodMaster",
      username: "thaicooking",
      timestamp: "1 day ago",
      likes: 32,
      isLiked: false,
      isBookmarked: true,
      category: "Thai",
      difficulty: "Hard",
      cookTime: "45 min",
      prepTime: "25 min",
      rating: 4.8
    },
    {
      id: 4,
      title: "Classic Margherita Pizza",
      description: "Wood-fired pizza with fresh mozzarella, basil, and San Marzano tomatoes. Simple perfection!",
      image: "/globalhtml/F1.jpg",
      author: "Pizza Master",
      username: "pizzalover",
      timestamp: "3 days ago",
      likes: 45,
      isLiked: true,
      isBookmarked: true,
      category: "Italian",
      difficulty: "Medium",
      cookTime: "25 min",
      prepTime: "20 min",
      rating: 4.7
    },
    {
      id: 5,
      title: "Japanese Ramen Bowl",
      description: "Rich tonkotsu broth with handmade noodles, soft-boiled egg, and chashu pork. Ultimate comfort food.",
      image: "/EatW/F2.jpg",
      author: "Ramen Chef",
      username: "ramenfan",
      timestamp: "1 week ago",
      likes: 28,
      isLiked: false,
      isBookmarked: true,
      category: "Japanese",
      difficulty: "Hard",
      cookTime: "4 hours",
      prepTime: "30 min",
      rating: 4.6
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  // Get unique categories from posts
  const categories = useMemo(() => {
    const cats = [...new Set(posts.map(post => post.category))];
    return ['All', ...cats];
  }, [posts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort posts
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.timestamp) - new Date(a.timestamp);
        case 'likes':
          return b.likes - a.likes;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [posts, selectedCategory, sortBy, searchTerm]);

  // Calculate statistics
  const stats = useMemo(() => {
    const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
    const avgRating = (posts.reduce((sum, post) => sum + post.rating, 0) / posts.length).toFixed(1);
    const categoryCounts = posts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {});
    
    return {
      totalRecipes: posts.length,
      totalLikes,
      avgRating,
      categoryCounts
    };
  }, [posts]);

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
          {filteredAndSortedPosts.map(post => (
            <div key={post.id} className="favorite-post">
              <div className="post-header">
                <img src={post.image} alt={post.title} className="post-image" />
                <div className="post-meta">
                  <div className="post-author">
                    <img src={`https://picsum.photos/seed/${post.username}/50/50.jpg`} alt={post.author} className="author-avatar" />
                    <div className="author-info">
                      <span className="author-name">{post.author}</span>
                      <span className="author-username">@{post.username}</span>
                      <span className="timestamp">{post.timestamp}</span>
                    </div>
                  </div>
                  <div className="post-actions">
                    <button 
                      className={`action-btn ${post.isLiked ? 'liked' : ''}`}
                      onClick={() => handleLike(post.id)}
                    >
                      <FaHeart />
                      <span>{post.likes}</span>
                    </button>
                    <button 
                      className={`action-btn ${post.isBookmarked ? 'bookmarked' : ''}`}
                      onClick={() => handleBookmark(post.id)}
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
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <div className="post-meta-info">
                  <span className="meta-item">
                    <FaUtensils />
                    {post.category}
                  </span>
                  <span className="meta-item">
                    <FaClock />
                    Prep: {post.prepTime}
                  </span>
                  <span className="meta-item">
                    <FaClock />
                    Cook: {post.cookTime}
                  </span>
                  <span className="meta-item">
                    <FaFire />
                    {post.difficulty}
                  </span>
                </div>
              </div>
              
              <div className="post-footer">
                <div className="post-stats">
                  <span className="stat-item">
                    <FaRegSmile />
                    <span>{post.likes || 0} likes</span>
                  </span>
                  <span className="timestamp">{post.timestamp}</span>
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
