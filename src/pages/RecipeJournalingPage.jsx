import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';
import Header from '../components/Header';
import { 
  addJournal, 
  getUserJournals, 
  updateJournal, 
  deleteJournal, 
  uploadJournalFile 
} from '../journalService';
import { 
  FaSave, FaTimes, FaEye, FaEdit, FaCamera, FaVideo, FaPlus, FaTrash,
  FaClock, FaUtensils, FaUsers, FaStar, FaRegStar, FaChevronUp,
  FaChevronDown, FaSpinner, FaCheck, FaExclamationTriangle, FaFire,
  FaBook, FaHeart, FaRegHeart, FaArrowUp, FaArrowDown, FaGripVertical,
  FaUpload, FaImage, FaFilm, FaLock, FaGlobe, FaDraftingCompass,
  FaLeaf, FaDrumstickBite, FaIceCream, FaCoffee, FaGlassCheers,
  FaCalendar, FaTags, FaPen
} from 'react-icons/fa';
import './RecipeJournalingPage.css';

const RecipeJournalingPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [savedJournals, setSavedJournals] = useState([]);
  const [showSavedJournals, setShowSavedJournals] = useState(false);
  
  // Mode: 'personal' or 'public'
  const [mode, setMode] = useState('personal');
  const [recipeType, setRecipeType] = useState('veg');
  const [cuisineType, setCuisineType] = useState('');
  
  // Basic Recipe Info
  const [recipeTitle, setRecipeTitle] = useState('');
  const [recipeDate, setRecipeDate] = useState('');
  const [prepTime, setPrepTime] = useState({ hours: 0, minutes: 0 });
  const [cookTime, setCookTime] = useState({ hours: 0, minutes: 0 });
  const [difficulty, setDifficulty] = useState('medium');
  const [servings, setServings] = useState(4);
  
  // Ingredients
  const [ingredients, setIngredients] = useState([
    { id: 1, quantity: '', unit: '', name: '' }
  ]);
  
  // Step-by-step instructions
  const [instructionSteps, setInstructionSteps] = useState([
    { id: 1, text: '', media: [], timestamp: '' }
  ]);
  
  // Journaling Section (for personal mode)
  const [journalChanges, setJournalChanges] = useState('');
  const [journalWentWell, setJournalWentWell] = useState('');
  const [journalDidntWork, setJournalDidntWork] = useState('');
  const [tasteRating, setTasteRating] = useState(0);
  const [textureRating, setTextureRating] = useState(0);
  const [successRating, setSuccessRating] = useState(0);
  const [nextTimeNotes, setNextTimeNotes] = useState('');
  
  // Media files
  const [recipeMedia, setRecipeMedia] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Recipe Types
  const recipeTypes = [
    { id: 'veg', label: 'Vegetarian', icon: FaLeaf },
    { id: 'non-veg', label: 'Non-Vegetarian', icon: FaDrumstickBite },
    { id: 'vegan', label: 'Vegan', icon: FaLeaf },
    { id: 'dessert', label: 'Dessert', icon: FaIceCream },
    { id: 'beverage', label: 'Beverage', icon: FaCoffee },
    { id: 'appetizer', label: 'Appetizer', icon: FaUtensils },
    { id: 'main-course', label: 'Main Course', icon: FaUtensils },
    { id: 'soup', label: 'Soup', icon: FaUtensils },
    { id: 'salad', label: 'Salad', icon: FaLeaf },
    { id: 'breakfast', label: 'Breakfast', icon: FaCoffee },
    { id: 'snack', label: 'Snack', icon: FaUtensils },
    { id: 'drink', label: 'Drink', icon: FaGlassCheers }
  ];

  // Cuisine options
  const cuisineOptions = [
    'Indian', 'Italian', 'Chinese', 'Mexican', 'Japanese', 'Thai',
    'French', 'Greek', 'Spanish', 'Korean', 'Vietnamese', 'Mediterranean',
    'American', 'British', 'Middle Eastern', 'African', 'Fusion', 'Continental'
  ];

  // Unit options
  const unitOptions = [
    'cups', 'tablespoons', 'teaspoons', 'oz', 'lbs', 'kg', 'g', 'mg',
    'ml', 'l', 'pieces', 'cloves', 'cans', 'packages', 'pinch', 'to taste'
  ];
  
  // Collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    ingredients: true,
    instructions: true,
    journaling: true
  });

  // Initialize
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setRecipeDate(today);
    
    // Load saved journals
    loadSavedJournals();
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Load saved journals from Firebase
  const loadSavedJournals = async () => {
    try {
      const journals = await getUserJournals();
      setSavedJournals(journals);
    } catch (error) {
      console.error('Error loading journals:', error);
      setMessage({ type: 'error', text: 'Failed to load saved journals' });
    }
  };

  // Calculate total time
  const getTotalTime = () => {
    const totalMinutes = (prepTime.hours * 60 + prepTime.minutes) + 
                        (cookTime.hours * 60 + cookTime.minutes);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  };

  // Toggle section
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Add ingredient
  const addIngredient = () => {
    const newId = Math.max(...ingredients.map(i => i.id), 0) + 1;
    setIngredients([...ingredients, { id: newId, quantity: '', unit: '', name: '' }]);
  };

  // Remove ingredient
  const removeIngredient = (id) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter(i => i.id !== id));
    }
  };

  // Update ingredient
  const updateIngredient = (id, field, value) => {
    setIngredients(ingredients.map(i => 
      i.id === id ? { ...i, [field]: value } : i
    ));
  };

  // Add instruction step
  const addInstructionStep = () => {
    const newId = Math.max(...instructionSteps.map(s => s.id), 0) + 1;
    setInstructionSteps([...instructionSteps, { 
      id: newId, 
      text: '', 
      media: [], 
      timestamp: '' 
    }]);
  };

  // Remove instruction step
  const removeInstructionStep = (id) => {
    if (instructionSteps.length > 1) {
      setInstructionSteps(instructionSteps.filter(s => s.id !== id));
    }
  };

  // Update instruction step
  const updateInstructionStep = (id, field, value) => {
    setInstructionSteps(instructionSteps.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  // Move instruction step
  const moveInstructionStep = (id, direction) => {
    const index = instructionSteps.findIndex(s => s.id === id);
    if (direction === 'up' && index > 0) {
      const newSteps = [...instructionSteps];
      [newSteps[index], newSteps[index - 1]] = [newSteps[index - 1], newSteps[index]];
      setInstructionSteps(newSteps);
    } else if (direction === 'down' && index < instructionSteps.length - 1) {
      const newSteps = [...instructionSteps];
      [newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]];
      setInstructionSteps(newSteps);
    }
  };

  // Handle file upload
  const handleFileUpload = (files, stepId = null) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image',
      name: file.name,
      size: file.size
    }));

    if (stepId) {
      // Add to specific instruction step
      setInstructionSteps(instructionSteps.map(step => 
        step.id === stepId 
          ? { ...step, media: [...step.media, ...newFiles] }
          : step
      ));
    } else {
      // Add to general recipe media
      setRecipeMedia([...recipeMedia, ...newFiles]);
    }
  };

  // Remove media
  const removeMedia = (mediaId, stepId = null) => {
    if (stepId) {
      setInstructionSteps(instructionSteps.map(step => 
        step.id === stepId 
          ? { ...step, media: step.media.filter(m => m.id !== mediaId) }
          : step
      ));
    } else {
      setRecipeMedia(recipeMedia.filter(m => m.id !== mediaId));
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  // Validation
  const validateRecipe = () => {
    if (!recipeTitle.trim()) {
      setMessage({ type: 'error', text: 'Recipe title is required.' });
      return false;
    }
    if (!cuisineType) {
      setMessage({ type: 'error', text: 'Please select a cuisine type.' });
      return false;
    }
    if (ingredients.every(i => !i.name.trim())) {
      setMessage({ type: 'error', text: 'Please add at least one ingredient.' });
      return false;
    }
    if (instructionSteps.every(s => !s.text.trim())) {
      setMessage({ type: 'error', text: 'Please add at least one instruction step.' });
      return false;
    }
    return true;
  };

  // Save recipe to Firebase
  const handleSave = async (action = 'save') => {
    if (!validateRecipe()) return;
    
    setSaving(true);
    setMessage({ type: '', text: 'Saving to Firestore...' });

    try {
      // Prepare journal data for Firebase
      const journalData = {
        title: recipeTitle,
        description: `A ${difficulty} ${recipeType} recipe from ${cuisineType} cuisine. Serves ${servings} people.`,
        preparationTime: getTotalTime().hours * 60 + getTotalTime().minutes,
        isPublic: action === 'publish',
        // Additional recipe-specific data
        recipeData: {
          mode,
          cuisineType,
          prepTime,
          cookTime,
          totalTime: getTotalTime(),
          difficulty,
          servings,
          ingredients: ingredients.filter(i => i.name.trim()),
          instructionSteps: instructionSteps.filter(s => s.text.trim()),
          journaling: mode === 'personal' ? {
            changes: journalChanges,
            wentWell: journalWentWell,
            didntWork: journalDidntWork,
            tasteRating,
            textureRating,
            successRating,
            nextTimeNotes
          } : null
        }
      };

      // Create journal entry in Firestore
      const journalId = await addJournal(journalData);
      setMessage({ type: 'success', text: 'Journal saved to Firestore! Uploading files...' });
      
      // Upload media files if any
      const imageUrls = [];
      let videoUrl = '';
      
      // Upload main recipe media
      for (const mediaItem of recipeMedia) {
        setMessage({ type: '', text: `Uploading ${mediaItem.name}...` });
        const url = await uploadJournalFile(mediaItem.file, journalId);
        
        if (mediaItem.type === 'video') {
          videoUrl = url;
        } else {
          imageUrls.push(url);
        }
      }
      
      // Upload instruction step media
      for (const step of instructionSteps) {
        for (const mediaItem of step.media) {
          setMessage({ type: '', text: `Uploading step media ${mediaItem.name}...` });
          const url = await uploadJournalFile(mediaItem.file, journalId);
          
          if (mediaItem.type === 'video') {
            videoUrl = url;
          } else {
            imageUrls.push(url);
          }
        }
      }
      
      // Update journal with file URLs
      if (imageUrls.length > 0 || videoUrl) {
        await updateJournal(journalId, { imageUrls, videoUrl });
      }
      
      const actionText = action === 'publish' ? 'published' : 'saved';
      const fileCount = imageUrls.length + (videoUrl ? 1 : 0);
      setMessage({ 
        type: 'success', 
        text: `Recipe ${actionText} successfully! ${fileCount} file(s) uploaded to Firebase Storage.` 
      });
      
      // Reload journals
      await loadSavedJournals();
      
      // Clear form after successful save
      if (action === 'save') {
        handleClear();
      }
      
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      
    } catch (error) {
      console.error('Error saving recipe:', error);
      setMessage({ type: 'error', text: `Failed to save recipe: ${error.message}` });
    } finally {
      setSaving(false);
    }
  };

  // Delete saved journal
  const handleDeleteJournal = async (journalId) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      try {
        await deleteJournal(journalId);
        setMessage({ type: 'success', text: 'Journal deleted successfully!' });
        await loadSavedJournals();
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } catch (error) {
        console.error('Error deleting journal:', error);
        setMessage({ type: 'error', text: `Failed to delete journal: ${error.message}` });
      }
    }
  };

  // Clear form
  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all content?')) {
      setRecipeTitle('');
      setCuisineType('');
      setPrepTime({ hours: 0, minutes: 0 });
      setCookTime({ hours: 0, minutes: 0 });
      setDifficulty('medium');
      setServings(4);
      setIngredients([{ id: 1, quantity: '', unit: '', name: '' }]);
      setInstructionSteps([{ id: 1, text: '', media: [], timestamp: '' }]);
      setRecipeMedia([]);
      setJournalChanges('');
      setJournalWentWell('');
      setJournalDidntWork('');
      setTasteRating(0);
      setTextureRating(0);
      setSuccessRating(0);
      setNextTimeNotes('');
      setMessage({ type: '', text: '' });
    }
  };

  if (!currentUser) {
    return (
      <div className="recipe-journaling-page-error">
        <FaExclamationTriangle />
        <p>Please log in to create recipes</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="recipe-journaling-page-loading">
        <div className="loading-content">
          <FaSpinner className="spinner" />
          <p>Loading recipe journal...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header showHeroSection={false} showNavigation={false} />
      <div className="recipe-journaling-page">
        <div className="recipe-journal-container">
          {/* Header with Mode Selector */}
          <div className="recipe-journal-header">
            <div className="header-title">
              <FaBook />
              <h1>Recipe Journal</h1>
            </div>
            
            <div className="mode-selector">
              <button
                onClick={() => setMode('personal')}
                className={`mode-btn ${mode === 'personal' ? 'active' : ''}`}
              >
                <FaLock />
                Personal Journal
              </button>
              <button
                onClick={() => setMode('public')}
                className={`mode-btn ${mode === 'public' ? 'active' : ''}`}
              >
                <FaGlobe />
                Publish Recipe
              </button>
            </div>
          </div>

          {/* Main Recipe Card */}
          <div className="recipe-journal-card">
            {/* Basic Info Section */}
            <div className={`recipe-section ${expandedSections.basic ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('basic')}>
                <h3>Basic Information</h3>
                <div className="section-toggle">
                  {expandedSections.basic ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              
              {expandedSections.basic && (
                <div className="section-content">
                  <div className="form-row">
                    <div className="form-group full-width">
                      <label>Recipe Title *</label>
                      <input
                        type="text"
                        value={recipeTitle}
                        onChange={(e) => setRecipeTitle(e.target.value)}
                        placeholder="Enter your recipe title..."
                        className="form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Cuisine Type *</label>
                      <select
                        value={cuisineType}
                        onChange={(e) => setCuisineType(e.target.value)}
                        className="form-select"
                      >
                        <option value="">Select cuisine...</option>
                        {cuisineOptions.map(cuisine => (
                          <option key={cuisine} value={cuisine}>{cuisine}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Difficulty</label>
                      <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        className="form-select"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label>Servings</label>
                      <input
                        type="number"
                        value={servings}
                        onChange={(e) => setServings(parseInt(e.target.value) || 1)}
                        min="1"
                        max="50"
                        className="form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Prep Time</label>
                      <div className="time-inputs">
                        <input
                          type="number"
                          value={prepTime.hours}
                          onChange={(e) => setPrepTime({...prepTime, hours: parseInt(e.target.value) || 0})}
                          min="0"
                          max="23"
                          placeholder="Hours"
                          className="time-input"
                        />
                        <span>h</span>
                        <input
                          type="number"
                          value={prepTime.minutes}
                          onChange={(e) => setPrepTime({...prepTime, minutes: parseInt(e.target.value) || 0})}
                          min="0"
                          max="59"
                          placeholder="Minutes"
                          className="time-input"
                        />
                        <span>m</span>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Cook Time</label>
                      <div className="time-inputs">
                        <input
                          type="number"
                          value={cookTime.hours}
                          onChange={(e) => setCookTime({...cookTime, hours: parseInt(e.target.value) || 0})}
                          min="0"
                          max="23"
                          placeholder="Hours"
                          className="time-input"
                        />
                        <span>h</span>
                        <input
                          type="number"
                          value={cookTime.minutes}
                          onChange={(e) => setCookTime({...cookTime, minutes: parseInt(e.target.value) || 0})}
                          min="0"
                          max="59"
                          placeholder="Minutes"
                          className="time-input"
                        />
                        <span>m</span>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label>Total Time</label>
                      <div className="total-time">
                        <FaClock />
                        <span>
                          {getTotalTime().hours > 0 && `${getTotalTime().hours}h `}
                          {getTotalTime().minutes}m
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Media Upload Section */}
            <div className={`recipe-section ${expandedSections.media ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('media')}>
                <h3>Recipe Media</h3>
                <div className="section-toggle">
                  {expandedSections.media ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              
              {expandedSections.media && (
                <div className="section-content">
                  <div 
                    className={`media-upload-area ${dragActive ? 'drag-active' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="upload-content">
                      <FaUpload />
                      <p>Drag & drop images and videos here</p>
                      <p className="upload-hint">or click to browse</p>
                      <p className="upload-formats">Supported: JPG, PNG, MP4, MOV (max 50MB)</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                      className="hidden"
                    />
                  </div>
                  
                  {recipeMedia.length > 0 && (
                    <div className="media-grid">
                      {recipeMedia.map(media => (
                        <div key={media.id} className="media-item">
                          {media.type === 'video' ? (
                            <video src={media.preview} className="media-preview" />
                          ) : (
                            <img src={media.preview} alt="Upload" className="media-preview" />
                          )}
                          <button
                            onClick={() => removeMedia(media.id)}
                            className="media-remove"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Ingredients Section */}
            <div className={`recipe-section ${expandedSections.ingredients ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('ingredients')}>
                <h3>Ingredients</h3>
                <div className="section-toggle">
                  {expandedSections.ingredients ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              
              {expandedSections.ingredients && (
                <div className="section-content">
                  <div className="ingredients-list">
                    {ingredients.map((ingredient, index) => (
                      <div key={ingredient.id} className="ingredient-row">
                        <div className="ingredient-number">{index + 1}</div>
                        <input
                          type="text"
                          value={ingredient.quantity}
                          onChange={(e) => updateIngredient(ingredient.id, 'quantity', e.target.value)}
                          placeholder="Qty"
                          className="ingredient-input quantity"
                        />
                        <select
                          value={ingredient.unit}
                          onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                          className="ingredient-select unit"
                        >
                          <option value="">Unit</option>
                          {unitOptions.map(unit => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                        <input
                          type="text"
                          value={ingredient.name}
                          onChange={(e) => updateIngredient(ingredient.id, 'name', e.target.value)}
                          placeholder="Ingredient name"
                          className="ingredient-input name"
                        />
                        <button
                          onClick={() => removeIngredient(ingredient.id)}
                          className="ingredient-remove"
                          disabled={ingredients.length === 1}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <button onClick={addIngredient} className="add-btn">
                    <FaPlus />
                    Add Ingredient
                  </button>
                </div>
              )}
            </div>

            {/* Instructions Section */}
            <div className={`recipe-section ${expandedSections.instructions ? 'expanded' : ''}`}>
              <div className="section-header" onClick={() => toggleSection('instructions')}>
                <h3>Step-by-Step Instructions</h3>
                <div className="section-toggle">
                  {expandedSections.instructions ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </div>
              
              {expandedSections.instructions && (
                <div className="section-content">
                  <div className="instructions-list">
                    {instructionSteps.map((step, index) => (
                      <div key={step.id} className="instruction-step">
                        <div className="step-header">
                          <div className="step-number">
                            <span>Step {index + 1}</span>
                          </div>
                          <div className="step-controls">
                            <button
                              onClick={() => moveInstructionStep(step.id, 'up')}
                              disabled={index === 0}
                              className="step-control-btn"
                            >
                              <FaArrowUp />
                            </button>
                            <button
                              onClick={() => moveInstructionStep(step.id, 'down')}
                              disabled={index === instructionSteps.length - 1}
                              className="step-control-btn"
                            >
                              <FaArrowDown />
                            </button>
                            <button
                              onClick={() => removeInstructionStep(step.id)}
                              disabled={instructionSteps.length === 1}
                              className="step-control-btn remove"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        
                        <textarea
                          value={step.text}
                          onChange={(e) => updateInstructionStep(step.id, 'text', e.target.value)}
                          placeholder="Describe this step in detail..."
                          className="step-textarea"
                          rows={4}
                        />
                        
                        <div className="step-media-section">
                          <div className="step-media-upload">
                            <button
                              onClick={() => {
                                const input = document.createElement('input');
                                input.type = 'file';
                                input.multiple = true;
                                input.accept = 'image/*,video/*';
                                input.onchange = (e) => e.target.files && handleFileUpload(e.target.files, step.id);
                                input.click();
                              }}
                              className="step-media-btn"
                            >
                              <FaCamera />
                              Add Media
                            </button>
                          </div>
                          
                          {step.media.length > 0 && (
                            <div className="step-media-grid">
                              {step.media.map(media => (
                                <div key={media.id} className="step-media-item">
                                  {media.type === 'video' ? (
                                    <video src={media.preview} className="step-media-preview" />
                                  ) : (
                                    <img src={media.preview} alt="Step media" className="step-media-preview" />
                                  )}
                                  <button
                                    onClick={() => removeMedia(media.id, step.id)}
                                    className="step-media-remove"
                                  >
                                    <FaTimes />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <div className="step-timestamp">
                            <FaClock />
                            <input
                              type="text"
                              value={step.timestamp}
                              onChange={(e) => updateInstructionStep(step.id, 'timestamp', e.target.value)}
                              placeholder="e.g., 2:30 or 15 seconds"
                              className="timestamp-input"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button onClick={addInstructionStep} className="add-btn">
                    <FaPlus />
                    Add Step
                  </button>
                </div>
              )}
            </div>

            {/* Journaling Section (Personal Mode Only) */}
            {mode === 'personal' && (
              <div className={`recipe-section ${expandedSections.journaling ? 'expanded' : ''}`}>
                <div className="section-header" onClick={() => toggleSection('journaling')}>
                  <h3>Personal Journal</h3>
                  <div className="section-toggle">
                    {expandedSections.journaling ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                
                {expandedSections.journaling && (
                  <div className="section-content">
                    <div className="journaling-grid">
                      <div className="journaling-field">
                        <label>What I changed or customized</label>
                        <textarea
                          value={journalChanges}
                          onChange={(e) => setJournalChanges(e.target.value)}
                          placeholder="Describe any modifications you made to the original recipe..."
                          className="journal-textarea"
                          rows={3}
                        />
                      </div>
                      
                      <div className="journaling-field">
                        <label>What went well</label>
                        <textarea
                          value={journalWentWell}
                          onChange={(e) => setJournalWentWell(e.target.value)}
                          placeholder="What aspects of this recipe worked perfectly?"
                          className="journal-textarea"
                          rows={3}
                        />
                      </div>
                      
                      <div className="journaling-field">
                        <label>What didn't work</label>
                        <textarea
                          value={journalDidntWork}
                          onChange={(e) => setJournalDidntWork(e.target.value)}
                          placeholder="Any issues or things you'd do differently?"
                          className="journal-textarea"
                          rows={3}
                        />
                      </div>
                      
                      <div className="rating-section">
                        <div className="rating-field">
                          <label>Taste Rating</label>
                          <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => setTasteRating(star)}
                                className={`star-btn ${tasteRating >= star ? 'active' : ''}`}
                              >
                                {tasteRating >= star ? <FaStar /> : <FaRegStar />}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="rating-field">
                          <label>Texture Rating</label>
                          <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => setTextureRating(star)}
                                className={`star-btn ${textureRating >= star ? 'active' : ''}`}
                              >
                                {textureRating >= star ? <FaStar /> : <FaRegStar />}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="rating-field">
                          <label>Overall Success</label>
                          <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map(star => (
                              <button
                                key={star}
                                onClick={() => setSuccessRating(star)}
                                className={`star-btn ${successRating >= star ? 'active' : ''}`}
                              >
                                {successRating >= star ? <FaStar /> : <FaRegStar />}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="journaling-field full-width">
                        <label>Notes for next time</label>
                        <textarea
                          value={nextTimeNotes}
                          onChange={(e) => setNextTimeNotes(e.target.value)}
                          placeholder="What will you remember for the next time you make this?"
                          className="journal-textarea"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="recipe-actions">
              <button
                onClick={() => handleSave(mode === 'public' ? 'publish' : 'save')}
                disabled={saving}
                className="btn btn-primary"
              >
                {saving ? (
                  <>
                    <FaSpinner className="btn-spinner" />
                    {mode === 'public' ? 'Publishing...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    {mode === 'public' ? <FaGlobe /> : <FaSave />}
                    {mode === 'public' ? 'Publish Recipe' : 'Save Journal'}
                  </>
                )}
              </button>
              
              <button
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="btn btn-secondary"
              >
                <FaDraftingCompass />
                Save as Draft
              </button>
              
              <button
                className="btn btn-outline"
              >
                <FaEye />
                Preview
              </button>
              
              <button
                onClick={handleClear}
                className="btn btn-outline"
              >
                <FaTimes />
                Clear Form
              </button>
            </div>

            {/* Message Display */}
            {message.text && (
              <div className={`recipe-message ${message.type}`}>
                {message.type === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
                {message.text}
              </div>
            )}
          </div>
        </div>

        {/* Saved Journals Section */}
        <div className="saved-journals-section">
          <div className="journals-header">
            <h3>
              <FaBook />
              Your Saved Recipe Journals ({savedJournals.length})
            </h3>
            <button
              onClick={() => setShowSavedJournals(!showSavedJournals)}
              className="btn btn-outline"
            >
              {showSavedJournals ? <FaChevronUp /> : <FaChevronDown />}
              {showSavedJournals ? 'Hide' : 'Show'} Saved Journals
            </button>
          </div>

          {showSavedJournals && (
            <div className="journals-list">
              {savedJournals.length === 0 ? (
                <div className="no-journals">
                  <p>No saved journals yet. Create your first recipe journal above!</p>
                </div>
              ) : (
                savedJournals.map((journal) => (
                  <div key={journal.id} className="journal-item">
                    <div className="journal-header">
                      <h4>{journal.title}</h4>
                      <div className="journal-actions">
                        <button
                          onClick={() => handleDeleteJournal(journal.id)}
                          className="btn btn-sm btn-danger"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </div>
                    </div>
                    
                    <p className="journal-description">{journal.description}</p>
                    
                    <div className="journal-meta">
                      <span className="journal-time">
                        <FaClock />
                        {journal.preparationTime} minutes
                      </span>
                      <span className="journal-public">
                        {journal.isPublic ? <FaGlobe /> : <FaLock />}
                        {journal.isPublic ? 'Public' : 'Private'}
                      </span>
                      <span className="journal-date">
                        {journal.createdAt?.toDate?.() ? 
                          new Date(journal.createdAt.toDate()).toLocaleDateString() : 
                          'Unknown date'
                        }
                      </span>
                    </div>

                    {/* Display images from Firebase Storage */}
                    {journal.imageUrls && journal.imageUrls.length > 0 && (
                      <div className="journal-images">
                        <h5>Images ({journal.imageUrls.length}):</h5>
                        <div className="image-grid">
                          {journal.imageUrls.map((url, index) => (
                            <div key={index} className="journal-image">
                              <img 
                                src={url} 
                                alt={`Journal image ${index + 1}`} 
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                              />
                              <div className="image-error" style={{display: 'none'}}>
                                <FaImage />
                                <span>Image failed to load</span>
                              </div>
                              <p className="storage-indicator">✓ Firebase Storage</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Display video from Firebase Storage */}
                    {journal.videoUrl && (
                      <div className="journal-video">
                        <h5>Video:</h5>
                        <video controls width="300" style={{maxWidth: '100%'}}>
                          <source src={journal.videoUrl} />
                          Your browser does not support the video tag.
                        </video>
                        <p className="storage-indicator">✓ Firebase Storage</p>
                      </div>
                    )}

                    {/* Display recipe data if available */}
                    {journal.recipeData && (
                      <div className="recipe-details">
                        <h5>Recipe Details:</h5>
                        {journal.recipeData.ingredients && journal.recipeData.ingredients.length > 0 && (
                          <div className="ingredients-display">
                            <h6>Ingredients:</h6>
                            <ul>
                              {journal.recipeData.ingredients.map((ing, index) => (
                                <li key={index}>
                                  {ing.quantity} {ing.unit} {ing.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {journal.recipeData.journaling && (
                          <div className="journaling-display">
                            <h6>Personal Notes:</h6>
                            {journal.recipeData.journaling.changes && (
                              <p><strong>Changes:</strong> {journal.recipeData.journaling.changes}</p>
                            )}
                            {journal.recipeData.journaling.wentWell && (
                              <p><strong>What went well:</strong> {journal.recipeData.journaling.wentWell}</p>
                            )}
                            {journal.recipeData.journaling.didntWork && (
                              <p><strong>What didn't work:</strong> {journal.recipeData.journaling.didntWork}</p>
                            )}
                            {journal.recipeData.journaling.nextTimeNotes && (
                              <p><strong>Next time:</strong> {journal.recipeData.journaling.nextTimeNotes}</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {!journal.imageUrls?.length && !journal.videoUrl && (
                      <p className="no-media">⚠️ No media files uploaded</p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RecipeJournalingPage;
