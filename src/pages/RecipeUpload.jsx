import React, { useState, useRef } from 'react';
import { FaCamera, FaUtensils, FaClock, FaUsers, FaStar, FaTag, FaPlus, FaTimes, FaArrowLeft, FaSave, FaImage, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Header from '../components/Header';
import './RecipeUpload.css';

const RecipeUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'easy',
    category: '',
    tags: [],
    ingredients: [''],
    instructions: [''],
    notes: '',
    rating: 5
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedRecipes, setUploadedRecipes] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleAddIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({
      ...prev,
      ingredients: newIngredients
    }));
  };

  const handleRemoveIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      setFormData(prev => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index)
      }));
    }
  };

  const handleAddInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, '']
    }));
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData(prev => ({
      ...prev,
      instructions: newInstructions
    }));
  };

  const handleRemoveInstruction = (index) => {
    if (formData.instructions.length > 1) {
      setFormData(prev => ({
        ...prev,
        instructions: prev.instructions.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newRecipe = {
      id: Date.now(),
      ...formData,
      image: imagePreview,
      uploadTime: new Date().toLocaleString()
    };
    
    setUploadedRecipes(prev => [newRecipe, ...prev]);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Recipe submitted:', newRecipe);
      setIsSubmitting(false);
      // Reset form
      setFormData({
        title: '',
        description: '',
        prepTime: '',
        cookTime: '',
        servings: '',
        difficulty: 'easy',
        category: '',
        tags: [],
        ingredients: [''],
        instructions: [''],
        notes: '',
        rating: 5
      });
      setImagePreview(null);
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  const handleDeleteRecipe = (recipeId) => {
    setUploadedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const StarRating = ({ rating, onChange }) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`star ${star <= rating ? 'active' : ''}`}
            onClick={() => onChange(star)}
          >
            <FaStar />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Header showHeroSection={false} showNavigation={false}>
      <div className="recipe-upload-container">
        <div className="upload-header">
          <h1>Create New Recipe</h1>
        </div>

        <div className="upload-content">
          {/* Left Side - Upload Form */}
          <div className="upload-form-section">
            <form onSubmit={handleSubmit} className="recipe-form">
              {/* Image Upload */}
              <div className="form-section">
                <label className="section-label">Recipe Image</label>
                <div className="image-upload-area">
                  {imagePreview ? (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Recipe preview" />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => {
                          setImagePreview(null);
                          setSelectedImage(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="upload-placeholder"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <FaCamera />
                      <span>Click to upload image</span>
                      <small>JPG, PNG up to 10MB</small>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden-input"
                  />
                </div>
              </div>

              {/* Basic Info */}
              <div className="form-section">
                <label className="section-label">Recipe Details</label>
                <div className="form-group">
                  <input
                    type="text"
                    name="title"
                    placeholder="Recipe Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <textarea
                    name="description"
                    placeholder="Describe your recipe..."
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="form-textarea"
                    rows={4}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <div className="input-with-icon">
                      <FaClock />
                      <input
                        type="text"
                        name="prepTime"
                        placeholder="Prep Time"
                        value={formData.prepTime}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <div className="input-with-icon">
                      <FaClock />
                      <input
                        type="text"
                        name="cookTime"
                        placeholder="Cook Time"
                        value={formData.cookTime}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <div className="input-with-icon">
                      <FaUsers />
                      <input
                        type="text"
                        name="servings"
                        placeholder="Servings"
                        value={formData.servings}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <select
                      name="difficulty"
                      value={formData.difficulty}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      name="category"
                      placeholder="Category (e.g., Dessert, Main Course)"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="form-section">
                <label className="section-label">Tags</label>
                <div className="tag-input-area">
                  <div className="tag-input-row">
                    <div className="input-with-icon">
                      <FaTag />
                      <input
                        type="text"
                        placeholder="Add tags..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        className="form-input"
                      />
                    </div>
                    <button type="button" onClick={handleAddTag} className="add-tag-btn">
                      <FaPlus />
                    </button>
                  </div>
                  <div className="tags-list">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                        <button type="button" onClick={() => handleRemoveTag(tag)}>
                          <FaTimes />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="form-section">
                <label className="section-label">Ingredients</label>
                <div className="ingredients-list">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-item">
                      <div className="input-with-icon">
                        <FaUtensils />
                        <input
                          type="text"
                          placeholder={`Ingredient ${index + 1}`}
                          value={ingredient}
                          onChange={(e) => handleIngredientChange(index, e.target.value)}
                          className="form-input"
                        />
                      </div>
                      {formData.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(index)}
                          className="remove-btn"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={handleAddIngredient} className="add-item-btn">
                    <FaPlus /> Add Ingredient
                  </button>
                </div>
              </div>

              {/* Instructions */}
              <div className="form-section">
                <label className="section-label">Instructions</label>
                <div className="instructions-list">
                  {formData.instructions.map((instruction, index) => (
                    <div key={index} className="instruction-item">
                      <div className="step-number">{index + 1}</div>
                      <textarea
                        placeholder={`Step ${index + 1}`}
                        value={instruction}
                        onChange={(e) => handleInstructionChange(index, e.target.value)}
                        className="form-textarea instruction-textarea"
                        rows={2}
                      />
                      {formData.instructions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveInstruction(index)}
                          className="remove-btn"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={handleAddInstruction} className="add-item-btn">
                    <FaPlus /> Add Step
                  </button>
                </div>
              </div>

              {/* Notes and Rating */}
              <div className="form-section">
                <label className="section-label">Personal Notes & Rating</label>
                <div className="form-group">
                  <textarea
                    name="notes"
                    placeholder="Add your personal notes, tips, or memories about this recipe..."
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows={3}
                  />
                </div>
                
                <div className="rating-section">
                  <label>Your Rating:</label>
                  <StarRating
                    rating={formData.rating}
                    onChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Saving Recipe...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Recipe
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Uploaded Recipes Display */}
          <div className="uploaded-recipes-section">
            <div className="section-header">
              <h2>Uploaded Recipes</h2>
              <span className="recipe-count">{uploadedRecipes.length} recipes</span>
            </div>
            
            {uploadedRecipes.length === 0 ? (
              <div className="no-recipes">
                <FaImage className="no-recipes-icon" />
                <h3>No recipes uploaded yet</h3>
                <p>Create your first recipe using the form on the left</p>
              </div>
            ) : (
              <div className="recipes-grid">
                {uploadedRecipes.map(recipe => (
                  <div key={recipe.id} className="recipe-card">
                    <div className="recipe-image">
                      <img src={recipe.image || '/placeholder-recipe.jpg'} alt={recipe.title} />
                      <button 
                        className="delete-recipe-btn"
                        onClick={() => handleDeleteRecipe(recipe.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <div className="recipe-content">
                      <h3>{recipe.title}</h3>
                      <p className="recipe-description">{recipe.description}</p>
                      <div className="recipe-meta">
                        <span className="category">{recipe.category}</span>
                        <span className="difficulty">{recipe.difficulty}</span>
                      </div>
                      <div className="recipe-details">
                        <span><FaClock /> {recipe.prepTime} prep</span>
                        <span><FaClock /> {recipe.cookTime} cook</span>
                        <span><FaUsers /> {recipe.servings} servings</span>
                      </div>
                      <div className="recipe-tags">
                        {recipe.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                      </div>
                      <div className="upload-time">{recipe.uploadTime}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Header>
  );
};

export default RecipeUpload;
