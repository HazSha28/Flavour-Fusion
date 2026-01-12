import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import { 
  FaUser, FaEdit, FaSave, FaTimes, FaCamera, FaEnvelope, 
  FaCalendar, FaUtensils, FaHeart, FaBookmark, FaSignOutAlt,
  FaSpinner, FaCheck, FaExclamationTriangle, FaTrophy, FaStar, 
  FaFire, FaClock, FaMedal, FaAward, FaGem
} from 'react-icons/fa';
import './ProfilePage.css';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [profileData, setProfileData] = useState({
    username: '',
    bio: '',
    favoriteCuisines: [],
    profileImage: '',
    createdAt: null
  });

  const [tempData, setTempData] = useState({ ...profileData });

  const cuisineOptions = [
    'Italian', 'Chinese', 'Indian', 'Mexican', 'Japanese', 
    'Thai', 'French', 'Mediterranean', 'Korean', 'Vietnamese',
    'American', 'Spanish', 'Greek', 'Turkish', 'Moroccan'
  ];

  // Load user data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (currentUser) {
          // Simulate loading profile data
          const mockProfile = {
            username: currentUser.displayName || currentUser.email?.split('@')[0] || 'Food Lover',
            bio: 'Passionate about exploring flavors from around the world. Love cooking and sharing culinary adventures! 🍳',
            favoriteCuisines: ['Italian', 'Thai', 'Japanese'],
            profileImage: currentUser.photoURL || '',
            createdAt: currentUser.metadata?.creationTime || new Date().toISOString()
          };
          
          setProfileData(mockProfile);
          setTempData(mockProfile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        showMessage('error', 'Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUser]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  const handleEdit = () => {
    setTempData({ ...profileData });
    setIsEditing(true);
    setMessage({ type: '', text: '' });
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
    setMessage({ type: '', text: '' });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage({ type: '', text: '' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfileData({ ...tempData });
      setIsEditing(false);
      showMessage('success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      showMessage('error', 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Mock image upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempData({ ...tempData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCuisine = (cuisine) => {
    const updated = tempData.favoriteCuisines.includes(cuisine)
      ? tempData.favoriteCuisines.filter(c => c !== cuisine)
      : [...tempData.favoriteCuisines, cuisine];
    
    setTempData({ ...tempData, favoriteCuisines: updated });
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      showMessage('error', 'Failed to logout');
    }
  };

  if (loading) {
    return (
      <div className="profile-page-loading">
        <FaSpinner className="spinner" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="profile-page-error">
        <FaExclamationTriangle />
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <>
      <Header showHeroSection={false} showNavigation={false} />
      <div className="profile-page">
      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-card">
          {/* Header Section */}
          <div className="profile-header">
            <div className="profile-image-section">
              <div className="profile-image-wrapper">
                {tempData.profileImage ? (
                  <img 
                    src={tempData.profileImage} 
                    alt="Profile" 
                    className="profile-image"
                  />
                ) : (
                  <div className="profile-image-placeholder">
                    <FaUser />
                  </div>
                )}
                
                {isEditing && (
                  <label className="image-upload-btn">
                    <FaCamera />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      hidden
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="profile-info">
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.username}
                  onChange={(e) => setTempData({ ...tempData, username: e.target.value })}
                  className="profile-input"
                  placeholder="Username"
                />
              ) : (
                <h1 className="profile-username">{profileData.username}</h1>
              )}

              <div className="profile-email">
                <FaEnvelope />
                <span>{currentUser.email}</span>
              </div>

              <div className="profile-date">
                <FaCalendar />
                <span>Member since {new Date(profileData.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="profile-section">
            <h3 className="section-title">About</h3>
            {isEditing ? (
              <textarea
                value={tempData.bio}
                onChange={(e) => setTempData({ ...tempData, bio: e.target.value })}
                className="profile-textarea"
                placeholder="Tell us about yourself..."
                rows={4}
              />
            ) : (
              <p className="profile-bio">
                {profileData.bio || 'No bio added yet'}
              </p>
            )}
          </div>

          {/* Favorite Cuisines */}
          <div className="profile-section">
            <h3 className="section-title">
              <FaUtensils /> Favorite Cuisines
            </h3>
            <div className="cuisine-tags">
              {cuisineOptions.map(cuisine => (
                <button
                  key={cuisine}
                  type="button"
                  onClick={() => isEditing && toggleCuisine(cuisine)}
                  className={`cuisine-tag ${
                    tempData.favoriteCuisines.includes(cuisine) ? 'selected' : ''
                  } ${!isEditing ? 'readonly' : ''}`}
                  disabled={!isEditing}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="profile-actions">
            {isEditing ? (
              <div className="edit-actions">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn btn-primary"
                >
                  {saving ? <FaSpinner className="btn-spinner" /> : <FaSave />}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="btn btn-secondary"
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            ) : (
              <div className="view-actions">
                <button onClick={handleEdit} className="btn btn-primary">
                  <FaEdit />
                  Edit Profile
                </button>
                <button onClick={handleLogout} className="btn btn-outline">
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Message Display */}
          {message.text && (
            <div className={`profile-message ${message.type}`}>
              {message.type === 'success' ? <FaCheck /> : <FaExclamationTriangle />}
              {message.text}
            </div>
          )}
        </div>

        {/* Achievements Card */}
        <div className="stats-card">
          <h3 className="stats-title">Your Achievements</h3>
          <div className="achievements-grid">
            <div className="achievement-item">
              <div className="achievement-icon gold">
                <FaTrophy />
              </div>
              <div className="achievement-info">
                <span className="achievement-title">Master Chef</span>
                <span className="achievement-desc">Created 15+ recipes</span>
              </div>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon silver">
                <FaStar />
              </div>
              <div className="achievement-info">
                <span className="achievement-title">Rising Star</span>
                <span className="achievement-desc">247 likes received</span>
              </div>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon bronze">
                <FaFire />
              </div>
              <div className="achievement-info">
                <span className="achievement-title">Trendsetter</span>
                <span className="achievement-desc">89 recipes saved</span>
              </div>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon special">
                <FaClock />
              </div>
              <div className="achievement-info">
                <span className="achievement-title">Early Bird</span>
                <span className="achievement-desc">Member since 2024</span>
              </div>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon special">
                <FaMedal />
              </div>
              <div className="achievement-info">
                <span className="achievement-title">Explorer</span>
                <span className="achievement-desc">Tried 8+ cuisines</span>
              </div>
            </div>
            <div className="achievement-item">
              <div className="achievement-icon special">
                <FaGem />
              </div>
              <div className="achievement-info">
                <span className="achievement-title">Quality Chef</span>
                <span className="achievement-desc">High-rated recipes</span>
              </div>
            </div>
          </div>
          
          {/* Overall Status */}
          <div className="overall-status">
            <h4 className="status-title">Overall Usage Status</h4>
            <div className="status-item">
              <span className="status-label">Profile Completion</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '85%'}}></div>
              </div>
              <span className="status-value">85%</span>
            </div>
            <div className="status-item">
              <span className="status-label">Activity Level</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '72%'}}></div>
              </div>
              <span className="status-value">72%</span>
            </div>
            <div className="status-item">
              <span className="status-label">Community Impact</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: '68%'}}></div>
              </div>
              <span className="status-value">68%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
