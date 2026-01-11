import React, { useState, useRef, useEffect } from 'react';
import { FaUpload, FaImage, FaTrash, FaTimes, FaComment, FaHeart, FaShare, FaBookmark, FaVideo, FaLock, FaGlobe, FaUtensils, FaClock, FaUsers, FaStar, FaFire, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import Header from '../components/Header';
import './Journal.css';

const Journal = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentStream, setCurrentStream] = useState('personal'); // 'personal' or 'public'
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const [journalPosts, setJournalPosts] = useState([
    {
      id: 1,
      title: "Homemade Pasta Adventure",
      recipeName: "SPAGHETTI",
      content: "Today I tried making fresh pasta from scratch! The dough was challenging but so rewarding. Used semolina flour and let it rest for 30 minutes. The result was amazing - much better than store-bought!",
      tags: ['pasta', 'homemade', 'italian', 'success'],
      images: ['/images/smartp/F2.jpg'],
      likes: 12,
      comments: 3,
      date: '2024-01-10',
      bookmarked: true,
      stream: 'personal',
      author: 'You',
      prepTime: '15 min',
      cookTime: '30 min',
      servings: '4 people',
      difficulty: 'easy',
      cuisine: 'Italian',
      ingredients: ['2 cups semolina flour', '3 eggs', '1 tsp salt', '2 tbsp olive oil'],
      instructions: ['Mix flour and salt on clean surface', 'Make well in center and add eggs', 'Gradually incorporate flour into eggs', 'Knead for 10 minutes until smooth', 'Rest for 30 minutes', 'Roll out and cut into strands'],
      tips: 'The resting time is crucial for gluten development - dont skip it!'
    },
    {
      id: 2,
      title: "Sourdough Bread Journey",
      recipeName: "CREAMY BASQUE CHEESECAKE",
      content: "Week 3 of my sourdough adventure! The starter is getting more active and bubbly. Baked my first loaf today - great crust but could use more oven spring. Learning so much about fermentation!",
      tags: ['sourdough', 'baking', 'bread', 'learning'],
      images: ['/images/dd/F3.jpg', '/images/dd/F7.jpg'],
      likes: 8,
      comments: 5,
      date: '2024-01-09',
      bookmarked: false,
      stream: 'personal',
      author: 'You',
      prepTime: '30 min',
      cookTime: '45 min',
      servings: '8 slices',
      difficulty: 'medium',
      cuisine: 'Spanish',
      ingredients: ['500g cream cheese', '3 eggs', '200g sugar', '200ml heavy cream', '1 vanilla bean'],
      instructions: ['Cream cheese and sugar until smooth', 'Add eggs one at a time', 'Fold in cream and vanilla', 'Pour into springform pan', 'Bake at 200°C for 45 minutes'],
      tips: 'Room temperature ingredients mix better and prevent lumps'
    },
    {
      id: 3,
      title: "Thai Green Curry Masterclass",
      recipeName: "BUTTER CHICKEN WITH NAAN",
      content: "Finally perfected my Thai green curry recipe! Found the perfect balance of lemongrass, galangal, and kaffir lime leaves. The secret is toasting the spices first. Family loved it!",
      tags: ['thai', 'curry', 'spices', 'mastered'],
      images: ['/images/eatw/F8.jpg', '/images/eatw/F7.jpg', '/images/eatw/F6.jpg'],
      likes: 25,
      comments: 7,
      date: '2024-01-08',
      bookmarked: true,
      stream: 'personal',
      author: 'You',
      prepTime: '25 min',
      cookTime: '40 min',
      servings: '6 people',
      difficulty: 'medium',
      cuisine: 'Indian',
      ingredients: ['1kg chicken thighs', '200ml cream', '4 tbsp butter', '2 onions', '4 garlic cloves', 'ginger', 'garam masala'],
      instructions: ['Marinate chicken for 2 hours', 'Sauté onions until golden', 'Add chicken and cook through', 'Add cream and spices', 'Simmer for 20 minutes', 'Garnish with cilantro'],
      tips: 'Make naan fresh while curry simmers for the best combination'
    },
    {
      id: 4,
      title: "Weekend Brunch Experiment",
      recipeName: "HIGH PROTEIN BOWL",
      content: "Tried a new eggs benedict recipe with homemade hollandaise sauce. The key is getting the temperature right - not too hot, not too cold. Served with avocado and smoked salmon!",
      tags: ['brunch', 'eggs', 'hollandaise', 'experiment'],
      images: ['/images/bitesbb/F1.jpg'],
      likes: 15,
      comments: 2,
      date: '2024-01-07',
      bookmarked: false,
      stream: 'personal',
      author: 'You',
      prepTime: '10 min',
      cookTime: '15 min',
      servings: '2 bowls',
      difficulty: 'easy',
      cuisine: 'Healthy',
      ingredients: ['4 eggs', '200g Greek yogurt', 'quinoa', 'avocado', 'spinach', 'cherry tomatoes'],
      instructions: ['Cook quinoa according to package', 'Poach eggs in simmering water', 'Arrange bowl with quinoa base', 'Top with spinach and avocado', 'Add poached eggs', 'Drizzle with yogurt'],
      tips: 'Add a squeeze of lemon to brighten all the flavors'
    },
    {
      id: 5,
      title: "Mexican Night Success",
      recipeName: "SHAWARMA",
      content: "Made authentic shawarma at home! The spice blend was perfect - cumin, coriander, paprika, and a hint of cinnamon. Meat came out tender and juicy. Served with garlic sauce and pickles.",
      tags: ['mexican', 'shawarma', 'spices', 'success'],
      images: ['/images/global/F2.jpg', '/images/global/F5.jpg'],
      likes: 18,
      comments: 4,
      date: '2024-01-06',
      bookmarked: true,
      stream: 'personal',
      author: 'You',
      prepTime: '20 min',
      cookTime: '45 min',
      servings: '4 people',
      difficulty: 'medium',
      cuisine: 'Middle Eastern',
      ingredients: ['1kg chicken thighs', '2 tbsp cumin', '1 tbsp coriander', '1 tsp cinnamon', '4 garlic cloves', 'yogurt'],
      instructions: ['Mix spices and marinate chicken overnight', 'Grill on high heat for 5 minutes each side', 'Let rest for 10 minutes', 'Slice thinly', 'Serve in pita with garlic sauce'],
      tips: 'Dont skip the overnight marinade - it makes all the difference'
    },
    {
      id: 6,
      title: "Japanese Cooking Adventure",
      recipeName: "SUSHI",
      content: "First attempt at making sushi at home! Rolling was tricky but got better with practice. Used fresh salmon and cucumber. The rice seasoning was the key - rice vinegar, sugar, and salt in perfect ratio.",
      tags: ['japanese', 'sushi', 'rice', 'adventure'],
      images: ['/images/global/F8.jpg', '/images/global/F4.jpg'],
      likes: 22,
      comments: 6,
      date: '2024-01-05',
      bookmarked: true,
      stream: 'personal',
      author: 'You',
      prepTime: '40 min',
      cookTime: '50 min',
      servings: '4 rolls',
      difficulty: 'hard',
      cuisine: 'Japanese',
      ingredients: ['2 cups sushi rice', '300g fresh salmon', '1 cucumber', 'nori sheets', 'rice vinegar', 'sugar', 'salt'],
      instructions: ['Cook rice and season with vinegar mixture', 'Cut fish and vegetables into strips', 'Place nori on bamboo mat', 'Spread rice evenly on nori', 'Add fillings and roll tightly', 'Cut into 8 pieces'],
      tips: 'Keep hands wet with water to prevent rice from sticking'
    }
  ]);
  const [newPost, setNewPost] = useState({ 
    title: '', 
    content: '', 
    tags: [],
    recipeName: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'easy',
    cuisine: '',
    ingredients: [''],
    instructions: [''],
    tips: ''
  });
  const [tagInput, setTagInput] = useState('');
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !newPost.tags.includes(tagInput.trim())) {
      setNewPost(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleAddIngredient = () => {
    setNewPost(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const handleUpdateIngredient = (index, value) => {
    setNewPost(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => i === index ? value : ing)
    }));
  };

  const handleUpdateIngredientVoice = (index, transcript) => {
    setNewPost(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => i === index ? ing + transcript : ing)
    }));
  };

  const handleRemoveIngredient = (index) => {
    setNewPost(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleAddInstruction = () => {
    setNewPost(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const handleUpdateInstruction = (index, value) => {
    setNewPost(prev => ({
      ...prev,
      instructions: prev.instructions.map((inst, i) => i === index ? value : inst)
    }));
  };

  const handleRemoveInstruction = (index) => {
    setNewPost(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
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
        recipeName: newPost.recipeName,
        prepTime: newPost.prepTime,
        cookTime: newPost.cookTime,
        servings: newPost.servings,
        difficulty: newPost.difficulty,
        cuisine: newPost.cuisine,
        ingredients: newPost.ingredients.filter(ing => ing.trim()),
        instructions: newPost.instructions.filter(inst => inst.trim()),
        tips: newPost.tips,
        images: uploadedImages.map(img => img.url),
        videos: uploadedVideos.map(vid => vid.url),
        likes: 0,
        comments: 0,
        date: new Date().toISOString().split('T')[0],
        bookmarked: false,
        stream: currentStream,
        author: 'You'
      };
      setJournalPosts(prev => [post, ...prev]);
      setNewPost({ 
        title: '', 
        content: '', 
        tags: [],
        recipeName: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        difficulty: 'easy',
        cuisine: '',
        ingredients: [''],
        instructions: [''],
        tips: ''
      });
      setUploadedImages([]);
      setUploadedVideos([]);
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

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this journal entry? This action cannot be undone.')) {
      setJournalPosts(prev => prev.filter(post => post.id !== postId));
    }
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

  const handleVideoUpload = (event) => {
    const files = event.target.files;
    const newVideos = [];
    
    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const videoData = {
          id: Date.now() + index,
          name: file.name,
          url: e.target.result,
          size: file.size,
          type: file.type,
          uploadTime: new Date().toLocaleString()
        };
        
        setUploadedVideos(prev => [...prev, videoData]);
        if (index === 0) {
          setSelectedVideo(videoData);
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

  const handleDeleteVideo = (videoId) => {
    setUploadedVideos(prev => prev.filter(vid => vid.id !== videoId));
    if (selectedVideo && selectedVideo.id === videoId) {
      setSelectedVideo(uploadedVideos.length > 1 ? uploadedVideos[0] : null);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNextMedia = () => {
    const allMedia = [...uploadedImages, ...uploadedVideos];
    if (currentMediaIndex < allMedia.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  const handlePrevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  // Voice Recording Functions
  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            currentTranscript += transcript + ' ';
          }
        }
        
        if (currentTranscript) {
          setTranscript(prev => prev + currentTranscript);
          
          // Update the corresponding field based on recordingField
          if (recordingField) {
            // Handle dynamic field names for ingredients and instructions
            if (recordingField.startsWith('ingredients[')) {
              const index = parseInt(recordingField.match(/\d+/)[0]);
              handleUpdateIngredientVoice(index, currentTranscript);
            } else if (recordingField.startsWith('instructions[')) {
              const index = parseInt(recordingField.match(/\d+/)[0]);
              handleUpdateInstructionVoice(index, currentTranscript);
            } else {
              // Handle regular fields
              setNewPost(prev => ({
                ...prev,
                [recordingField]: prev[recordingField] + currentTranscript
              }));
            }
          }
        }
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'no-speech') {
          alert('No speech detected. Please try again.');
        } else if (event.error === 'not-allowed') {
          alert('Microphone access denied. Please allow microphone access to use voice recording.');
        }
        stopRecording();
      };
      
      recognitionInstance.onend = () => {
        if (isRecording) {
          // Restart recognition if still recording
          recognitionInstance.start();
        }
      };
      
      setRecognition(recognitionInstance);
    } else {
      console.warn('Speech recognition not supported in this browser');
    }
  }, [isRecording, recordingField]);
  
  const startRecording = (fieldName) => {
    if (!recognition) {
      alert('Voice recording is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }
    
    setRecordingField(fieldName);
    setIsRecording(true);
    setTranscript('');
    
    try {
      recognition.start();
      console.log('Voice recording started for:', fieldName);
    } catch (error) {
      console.error('Error starting recognition:', error);
      setIsRecording(false);
      setRecordingField(null);
    }
  };
  
  const stopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
      setRecordingField(null);
      console.log('Voice recording stopped');
    }
  };
  
  const toggleRecording = (fieldName) => {
    if (isRecording && recordingField === fieldName) {
      stopRecording();
    } else {
      if (isRecording) {
        stopRecording();
      }
      startRecording(fieldName);
    }
  };
  
  // Voice Input Component
  const VoiceInputButton = ({ fieldName, isCurrentlyRecording }) => {
    const isActive = isCurrentlyRecording && recordingField === fieldName;
    
    return (
      <button
        type="button"
        onClick={() => toggleRecording(fieldName)}
        className={`voice-input-btn ${isActive ? 'recording' : ''}`}
        title={isActive ? 'Stop recording' : 'Start voice recording'}
      >
        {isActive ? <FaStop /> : <FaMicrophone />}
      </button>
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleImageUpload({ target: { files } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const filteredPosts = currentStream === 'personal' 
    ? journalPosts.filter(post => post.stream === 'personal' || !post.stream)
    : journalPosts.filter(post => post.stream === 'public');

  return (
    <Header showHeroSection={false} showNavigation={false}>
      <div className="journal-container">
        <div className="journal-header">
          <h2>My Culinary Journal</h2>
          <div className="stream-toggle">
            <button 
              className={`stream-btn ${currentStream === 'personal' ? 'active' : ''}`}
              onClick={() => setCurrentStream('personal')}
            >
              <FaLock /> Personal Journal
            </button>
            <button 
              className={`stream-btn ${currentStream === 'public' ? 'active' : ''}`}
              onClick={() => setCurrentStream('public')}
            >
              <FaGlobe /> Public Stream
            </button>
          </div>
        </div>
        
        <div className="journal-layout">
          <div className="journal-main">
            {/* New Post Creation */}
            <div className="create-post-section">
              <h3>Create New Journal Entry</h3>
              
              {/* Voice Recording Status */}
              {isRecording && (
                <div className="voice-recording-status active">
                  <FaMicrophone />
                  Recording for: {recordingField?.replace(/\[|\]/g, ' ') || 'Unknown field'}...
                </div>
              )}
              
              <div className="post-form">
                {/* Basic Information */}
                <div className="form-section">
                  <h4><FaUtensils /> Basic Information</h4>
                  <input
                    type="text"
                    placeholder="Entry title..."
                    value={newPost.title}
                    onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                    className="post-title-input"
                  />
                  <input
                    type="text"
                    placeholder="Recipe name (if applicable)..."
                    value={newPost.recipeName}
                    onChange={(e) => setNewPost(prev => ({ ...prev, recipeName: e.target.value }))}
                    className="recipe-name-input"
                  />
                  <textarea
                    placeholder="Share your culinary experience..."
                    value={newPost.content}
                    onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                    className="post-content-input"
                    rows="4"
                  />
                </div>

                {/* Recipe Details */}
                <div className="form-section">
                  <h4><FaClock /> Recipe Details</h4>
                  <div className="recipe-details-grid">
                    <input
                      type="text"
                      placeholder="Prep time (e.g., 15 mins)"
                      value={newPost.prepTime}
                      onChange={(e) => setNewPost(prev => ({ ...prev, prepTime: e.target.value }))}
                      className="detail-input"
                    />
                    <input
                      type="text"
                      placeholder="Cook time (e.g., 30 mins)"
                      value={newPost.cookTime}
                      onChange={(e) => setNewPost(prev => ({ ...prev, cookTime: e.target.value }))}
                      className="detail-input"
                    />
                    <input
                      type="text"
                      placeholder="Servings (e.g., 4 people)"
                      value={newPost.servings}
                      onChange={(e) => setNewPost(prev => ({ ...prev, servings: e.target.value }))}
                      className="detail-input"
                    />
                    <select
                      value={newPost.difficulty}
                      onChange={(e) => setNewPost(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="detail-select"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Cuisine type (e.g., Italian, Asian)"
                      value={newPost.cuisine}
                      onChange={(e) => setNewPost(prev => ({ ...prev, cuisine: e.target.value }))}
                      className="detail-input"
                    />
                  </div>
                </div>

                {/* Ingredients */}
                <div className="form-section">
                  <h4>Ingredients</h4>
                  {newPost.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-row">
                      <input
                        type="text"
                        placeholder={`Ingredient ${index + 1}`}
                        value={ingredient}
                        onChange={(e) => handleUpdateIngredient(index, e.target.value)}
                        className="ingredient-input"
                      />
                      {newPost.ingredients.length > 1 && (
                        <button 
                          onClick={() => handleRemoveIngredient(index)}
                          className="remove-btn"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={handleAddIngredient} className="add-ingredient-btn">
                    + Add Ingredient
                  </button>
                </div>

                {/* Instructions */}
                <div className="form-section">
                  <h4>Instructions</h4>
                  {newPost.instructions.map((instruction, index) => (
                    <div key={index} className="instruction-row">
                      <textarea
                        placeholder={`Step ${index + 1}`}
                        value={instruction}
                        onChange={(e) => handleUpdateInstruction(index, e.target.value)}
                        className="instruction-input"
                        rows="2"
                      />
                      {newPost.instructions.length > 1 && (
                        <button 
                          onClick={() => handleRemoveInstruction(index)}
                          className="remove-btn"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={handleAddInstruction} className="add-instruction-btn">
                    + Add Step
                  </button>
                </div>

                {/* Tips */}
                <div className="form-section">
                  <h4>Tips & Notes</h4>
                  <textarea
                    placeholder="Share any tips, variations, or notes..."
                    value={newPost.tips}
                    onChange={(e) => setNewPost(prev => ({ ...prev, tips: e.target.value }))}
                    className="tips-input"
                    rows="3"
                  />
                </div>

                {/* Tags */}
                <div className="form-section">
                  <h4>Tags</h4>
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
                </div>

                {/* Media Upload */}
                <div className="form-section">
                  <h4>Media Upload</h4>
                  <div className="media-upload-grid">
                    <div className="upload-area" 
                         onDrop={handleDrop} 
                         onDragOver={handleDragOver}
                         onClick={() => fileInputRef.current?.click()}>
                      <FaImage className="upload-icon" />
                      <h5>Upload Images</h5>
                      <p>Click to browse or drag and drop</p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                    
                    <div className="upload-area" 
                         onClick={() => videoInputRef.current?.click()}>
                      <FaVideo className="upload-icon" />
                      <h5>Upload Videos</h5>
                      <p>Click to browse video files</p>
                      <input
                        ref={videoInputRef}
                        type="file"
                        multiple
                        accept="video/*"
                        onChange={handleVideoUpload}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>
                  
                  {(uploadedImages.length > 0 || uploadedVideos.length > 0) && (
                    <div className="uploaded-media-list">
                      <h5>Uploaded Media</h5>
                      <div className="media-grid">
                        {uploadedImages.map(image => (
                          <div 
                            key={image.id} 
                            className={`media-thumbnail ${selectedImage?.id === image.id ? 'selected' : ''}`}
                            onClick={() => handleImageClick(image)}
                          >
                            <img src={image.url} alt={image.name} />
                            <button 
                              className="delete-media-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteImage(image.id);
                              }}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ))}
                        {uploadedVideos.map(video => (
                          <div 
                            key={video.id} 
                            className={`media-thumbnail video-thumbnail ${selectedVideo?.id === video.id ? 'selected' : ''}`}
                            onClick={() => handleVideoClick(video)}
                          >
                            <video src={video.url} className="video-preview" />
                            <div className="video-overlay">
                              <FaPlay />
                            </div>
                            <button 
                              className="delete-media-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteVideo(video.id);
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
                
                <button onClick={handleSubmitPost} className="submit-post-btn">
                  Post to {currentStream === 'personal' ? 'Personal Journal' : 'Public Stream'}
                </button>
              </div>
            </div>
            
            {/* Journal Posts */}
            <div className="journal-posts">
              <h3>{currentStream === 'personal' ? 'Personal Journal Entries' : 'Public Stream Posts'}</h3>
              {filteredPosts.map(post => (
                <div key={post.id} className="journal-post">
                  <div className="post-header">
                    <div className="post-title-section">
                      <h4>{post.title}</h4>
                      {post.recipeName && (
                        <div className="recipe-name">
                          <FaUtensils /> {post.recipeName}
                        </div>
                      )}
                    </div>
                    <div className="post-meta">
                      <span className="post-date">{post.date}</span>
                      <span className="post-author">{post.author}</span>
                      {post.stream === 'public' && (
                        <span className="public-badge">
                          <FaGlobe /> Public
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="post-content">
                    <p>{post.content}</p>
                  </div>
                  
                  {/* Recipe Details Display */}
                  {(post.prepTime || post.cookTime || post.servings || post.difficulty || post.cuisine) && (
                    <div className="recipe-details-display">
                      {post.prepTime && <div className="detail-badge"><FaClock /> Prep: {post.prepTime}</div>}
                      {post.cookTime && <div className="detail-badge"><FaClock /> Cook: {post.cookTime}</div>}
                      {post.servings && <div className="detail-badge"><FaUsers /> Servings: {post.servings}</div>}
                      {post.difficulty && <div className="detail-badge difficulty-badge">{post.difficulty}</div>}
                      {post.cuisine && <div className="detail-badge cuisine-badge">{post.cuisine}</div>}
                    </div>
                  )}
                  
                  {/* Ingredients Display */}
                  {post.ingredients && post.ingredients.length > 0 && (
                    <div className="ingredients-display">
                      <h5>Ingredients:</h5>
                      <ul>
                        {post.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Instructions Display */}
                  {post.instructions && post.instructions.length > 0 && (
                    <div className="instructions-display">
                      <h5>Instructions:</h5>
                      <ol>
                        {post.instructions.map((instruction, index) => (
                          <li key={index}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                  
                  {/* Tips Display */}
                  {post.tips && (
                    <div className="tips-display">
                      <h5>Tips & Notes:</h5>
                      <p>{post.tips}</p>
                    </div>
                  )}
                  
                  {/* Media Display */}
                  {(post.images && post.images.length > 0) && (
                    <div className="post-media">
                      <div className="post-images">
                        {post.images.map((image, index) => (
                          <img key={index} src={image} alt={`${post.title} - Image ${index + 1}`} className="post-image" />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {(post.videos && post.videos.length > 0) && (
                    <div className="post-media">
                      <div className="post-videos">
                        {post.videos.map((video, index) => (
                          <video key={index} src={video} controls className="post-video" />
                        ))}
                      </div>
                    </div>
                  )}
                  
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
                    {post.author === 'You' && (
                      <button 
                        className="action-btn delete-btn"
                        onClick={() => handleDeletePost(post.id)}
                        title="Delete this post"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="journal-sidebar">
            <div className="sidebar-section">
              <h3>Stream Info</h3>
              <div className="stream-info">
                <div className={`stream-status ${currentStream}`}>
                  {currentStream === 'personal' ? (
                    <><FaLock /> Private Journal</>
                  ) : (
                    <><FaGlobe /> Public Stream</>
                  )}
                </div>
                <p className="stream-description">
                  {currentStream === 'personal' 
                    ? 'Your personal cooking journal - only you can see these entries.'
                    : 'Share your culinary creations with the community!'}
                </p>
              </div>
            </div>
            
            <div className="sidebar-section">
              <h3>Recent Media</h3>
              <div className="sidebar-media">
                {filteredPosts.slice(0, 6).map(post => (
                  <div key={post.id} className="sidebar-media-row">
                    {(post.images && post.images.length > 0) && (
                      post.images.slice(0, 3).map((image, index) => (
                        <img key={index} src={image} alt={post.title} className="sidebar-image" />
                      ))
                    )}
                    {(post.videos && post.videos.length > 0) && (
                      <div className="video-indicator">
                        <FaVideo />
                      </div>
                    )}
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
                <span className="popular-tag">dessert</span>
                <span className="popular-tag">healthy</span>
                <span className="popular-tag">quick</span>
              </div>
            </div>
            
            <div className="sidebar-section">
              <h3>Quick Stats</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{filteredPosts.length}</div>
                  <div className="stat-label">Entries</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    {filteredPosts.reduce((sum, post) => sum + post.likes, 0)}
                  </div>
                  <div className="stat-label">Likes</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    {filteredPosts.filter(post => post.images && post.images.length > 0).length}
                  </div>
                  <div className="stat-label">With Images</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">
                    {filteredPosts.filter(post => post.videos && post.videos.length > 0).length}
                  </div>
                  <div className="stat-label">With Videos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default Journal;
