import React, { useState } from 'react';
import { FaHeart, FaRegSmile, FaBookmark, FaShare, FaCamera, FaEdit } from 'react-icons/fa';

const Journal = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Homemade Pasta Carbonara",
      description: "Finally perfected my Nonna's recipe! The secret is using egg yolks and pasta water for the creamiest carbonara sauce.",
      image: "/globalhtml/F6.jpg",
      author: "Chef Maria",
      username: "mariacooks",
      timestamp: "2 hours ago",
      likes: 24,
      isLiked: false,
      isBookmarked: true
    },
    {
      id: 2,
      title: "Weekend Brunch Adventure",
      description: "Explored a new local café and discovered the most amazing avocado toast with poached eggs. Perfect weekend treat!",
      image: "/BitesBB/F2.jpg",
      author: "Weekend Foodie",
      username: "brunchlover",
      timestamp: "5 hours ago",
      likes: 18,
      isLiked: true,
      isBookmarked: false
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
      isBookmarked: true
    }
  ]);

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

  const handleCreatePost = () => {
    const newPost = {
      id: posts.length + 1,
      title: "New Culinary Creation",
      description: "Just created something amazing in the kitchen!",
      image: "/globalhtml/F1.jpg",
      author: "foodlover",
      username: "creativechef",
      timestamp: "Just now",
      likes: 0,
      isLiked: false,
      isBookmarked: false
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="journal-container">
      <div className="journal-header">
        <h2>My Culinary Journal</h2>
        <div className="journal-actions">
          <button className="create-post-btn" onClick={handleCreatePost}>
            <FaCamera />
            <span>Create Post</span>
          </button>
        </div>
      </div>
      
      <div className="journal-feed">
        {posts.map(post => (
          <div key={post.id} className="journal-post">
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
  );
};

export default Journal;
