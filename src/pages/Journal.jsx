import React, { useState, useRef } from 'react';
import { FaUpload, FaImage, FaTrash, FaTimes, FaComment, FaHeart, FaShare, FaBookmark } from 'react-icons/fa';
import Header from '../components/Header';
import './Journal.css';

const Journal = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [journalPosts, setJournalPosts] = useState([
    {
      id: 1,
      title: "Homemade Pasta Adventure",
      content: "Today I tried making fresh pasta from scratch! The dough was challenging but so rewarding. Used semolina flour and let it rest for 30 minutes. The result was amazing - much better than store-bought!",
      tags: ['pasta', 'homemade', 'italian', 'success'],
      images: ['/images/journal/pasta1.jpg', '/images/journal/pasta2.jpg', '/images/journal/pasta3.jpg'],
      likes: 12,
      comments: 3,
      date: '2024-01-10',
      bookmarked: true
    },
    {
      id: 2,
      title: "Sourdough Bread Journey",
      content: "Week 3 of my sourdough adventure! The starter is getting more active and bubbly. Baked my first loaf today - great crust but could use more oven spring. Learning so much about fermentation!",
      tags: ['sourdough', 'baking', 'bread', 'learning'],
      images: ['/images/journal/bread1.jpg', '/images/journal/bread2.jpg'],
      likes: 8,
      comments: 5,
      date: '2024-01-09',
      bookmarked: false
    },
    {
      id: 3,
      title: "Thai Green Curry Masterclass",
      content: "Finally perfected my Thai green curry recipe! Found the perfect balance of lemongrass, galangal, and kaffir lime leaves. The secret is toasting the spices first. Family loved it!",
      tags: ['thai', 'curry', 'spices', 'mastered'],
      images: ['/images/journal/curry1.jpg', '/images/journal/curry2.jpg', '/images/journal/curry3.jpg'],
      likes: 25,
      comments: 7,
      date: '2024-01-08',
      bookmarked: true
    },
    {
      id: 4,
      title: "Weekend Brunch Experiment",
      content: "Tried a new eggs benedict recipe with homemade hollandaise sauce. The key is getting the temperature right - not too hot, not too cold. Served with avocado and smoked salmon!",
      tags: ['brunch', 'eggs', 'hollandaise', 'experiment'],
      images: ['/images/journal/brunch1.jpg'],
      likes: 15,
      comments: 2,
      date: '2024-01-07',
      bookmarked: false
    }
  ]);
  const [newPost, setNewPost] = useState({ title: '', content: '', tags: [] });
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !newPost.tags.includes(tagInput.trim())) {
      setNewPost(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmitPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
        tags: newPost.tags,
        images: [],
        likes: 0,
        comments: 0,
        date: new Date().toISOString().split('T')[0],
        bookmarked: false
      };
      setJournalPosts(prev => [post, ...prev]);
      setNewPost({ title: '', content: '', tags: [] });
    }
  };

  const handleLike = (postId) => {
    setJournalPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleBookmark = (postId) => {
    setJournalPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, bookmarked: !post.bookmarked } : post
    ));
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = [];
    
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = {
          id: Date.now() + index,
          name: file.name,
          url: e.target.result,
          size: file.size,
          type: file.type,
          uploadTime: new Date().toLocaleString()
        };
        
        setUploadedImages(prev => [...prev, imageData]);
        if (index === 0) {
          setSelectedImage(imageData);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleDeleteImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
    if (selectedImage && selectedImage.id === imageId) {
      setSelectedImage(uploadedImages.length > 1 ? uploadedImages[0] : null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleImageUpload({ target: { files } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Header showHeroSection={false} showNavigation={false}>
      <div className="journal-container">
        <div className="journal-header">
          <h2>My Culinary Journal</h2>
        </div>
        
        <div className="journal-layout">
          <div className="journal-main">
            {/* New Post Creation */}
            <div className="create-post-section">
              <h3>Create New Journal Entry</h3>
              <div className="post-form">
                <input
                  type="text"
                  placeholder="Entry title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="post-title-input"
                />
                
                <textarea
                  placeholder="Share your culinary experience..."
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  className="post-content-input"
                  rows="4"
                />
                
                <div className="tags-section">
                  <div className="tag-input-container">
                    <input
                      type="text"
                      placeholder="Add tags..."
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                      className="tag-input"
                    />
                    <button onClick={handleAddTag} className="add-tag-btn">Add</button>
                  </div>
                  
                  <div className="tags-list">
                    {newPost.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                        <button onClick={() => handleRemoveTag(tag)} className="remove-tag">
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                
                <button onClick={handleSubmitPost} className="submit-post-btn">
                  Post Entry
                </button>
              </div>
            </div>
            
            {/* Journal Posts */}
            <div className="journal-posts">
              <h3>Recent Entries</h3>
              {journalPosts.map(post => (
                <div key={post.id} className="journal-post">
                  <div className="post-header">
                    <h4>{post.title}</h4>
                    <span className="post-date">{post.date}</span>
                  </div>
                  
                  <div className="post-content">
                    <p>{post.content}</p>
                  </div>
                  
                  <div className="post-tags">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="post-tag">#{tag}</span>
                    ))}
                  </div>
                  
                  <div className="post-actions">
                    <button 
                      className={`action-btn ${post.bookmarked ? 'bookmarked' : ''}`}
                      onClick={() => handleBookmark(post.id)}
                    >
                      <FaBookmark />
                    </button>
                    <button className="action-btn" onClick={() => handleLike(post.id)}>
                      <FaHeart />
                      <span>{post.likes}</span>
                    </button>
                    <button className="action-btn">
                      <FaComment />
                      <span>{post.comments}</span>
                    </button>
                    <button className="action-btn">
                      <FaShare />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Image Upload Section */}
            <div className="upload-section">
              <div className="upload-area" 
                   onDrop={handleDrop} 
                   onDragOver={handleDragOver}
                   onClick={() => fileInputRef.current?.click()}>
                <FaUpload className="upload-icon" />
                <h3>Upload Images</h3>
                <p>Click to browse or drag and drop images here</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </div>
              
              {uploadedImages.length > 0 && (
                <div className="uploaded-images-list">
                  <h4>Uploaded Images ({uploadedImages.length})</h4>
                  <div className="image-thumbnails">
                    {uploadedImages.map(image => (
                      <div 
                        key={image.id} 
                        className={`thumbnail ${selectedImage?.id === image.id ? 'selected' : ''}`}
                        onClick={() => handleImageClick(image)}
                      >
                        <img src={image.url} alt={image.name} />
                        <button 
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage(image.id);
                          }}
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="journal-sidebar">
            <div className="sidebar-section">
              <h3>Posted Images</h3>
              <div className="sidebar-images">
                {journalPosts.map(post => (
                  <div key={post.id} className="sidebar-image-row">
                    {post.images.slice(0, 3).map((image, index) => (
                      <img key={index} src={image} alt={post.title} className="sidebar-image" />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="sidebar-section">
              <h3>Popular Tags</h3>
              <div className="popular-tags">
                <span className="popular-tag">pasta</span>
                <span className="popular-tag">baking</span>
                <span className="popular-tag">thai</span>
                <span className="popular-tag">brunch</span>
                <span className="popular-tag">homemade</span>
                <span className="popular-tag">curry</span>
                <span className="popular-tag">bread</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Journal;
