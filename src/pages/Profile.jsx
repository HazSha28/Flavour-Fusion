import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../style.css';
import '../styles/Profile.css';
import { 
  FaUtensils, FaHeart, FaUsers, FaEye, FaEnvelope, FaMapMarkerAlt, 
  FaCamera, FaEdit, FaSave, FaTimes, FaTrophy, FaMedal, FaAward, FaFire
} from 'react-icons/fa';

const Profile = () => {
  const fileInputRef = useRef(null);
  const { currentUser } = useAuth();
  
  // User state
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    username: '',
    location: '',
    bio: 'Share something about yourself...',
    joinDate: '',
    profileImage: null,
    stats: {
      recipes: 0,
      followers: 0,
      likes: 0,
      views: 0
    }
  });

  // Fetch user data when component mounts or currentUser changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserData(prev => ({
              ...prev,
              name: userData.displayName || userData.username || currentUser.email.split('@')[0],
              email: currentUser.email,
              username: userData.username || currentUser.email.split('@')[0],
              location: userData.location || '',
              bio: userData.bio || 'Share something about yourself...',
              joinDate: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Recently',
              profileImage: currentUser.photoURL || null,
              stats: {
                recipes: userData.recipeCount || 0,
                followers: userData.followers || 0,
                likes: userData.likes || 0,
                views: userData.views || 0
              }
            }));
            setTempBio(userData.bio || 'Share something about yourself...');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);
  
  // Update tempBio when userData.bio changes
  useEffect(() => {
    if (userData.bio) {
      setTempBio(userData.bio);
    }
  }, [userData.bio]);

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState(userData.bio);
  const [isUploading, setIsUploading] = useState(false);

  const userBadges = [
    { id: 'recipe_master', name: 'Recipe Master', icon: FaTrophy, color: '#ffd700', description: 'Created 20+ recipes' },
    { id: 'popular_chef', name: 'Popular Chef', icon: FaHeart, color: '#e91e63', description: '1000+ likes received' },
    { id: 'community_favorite', name: 'Community Favorite', icon: FaUsers, color: '#9c27b0', description: '300+ followers' },
    { id: 'trending', name: 'Trending Chef', icon: FaFire, color: '#ff5722', description: '10k+ recipe views' },
    { id: 'dedicated', name: 'Dedicated Chef', icon: FaMedal, color: '#4caf50', description: 'Active for 6+ months' },
    { id: 'expert', name: 'Expert Chef', icon: FaAward, color: '#2196f3', description: 'Master chef level' }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          profileImage: reader.result
        }));
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioEdit = () => {
    setIsEditingBio(true);
    setTempBio(userData.bio);
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    username: '',
    email: '',
    location: '',
    bio: '',
    website: '',
    social: {
      twitter: '',
      instagram: '',
      facebook: ''
    },
    preferences: {
      theme: 'light',
      notifications: true,
      newsletter: true
    }
  });

  // Initialize edit data when userData changes
  useEffect(() => {
    setEditData(prev => ({
      name: userData.name || '',
      username: userData.username || '',
      email: userData.email || '',
      location: userData.location || '',
      bio: userData.bio || '',
      website: userData.website || '',
      social: {
        twitter: userData.social?.twitter || '',
        instagram: userData.social?.instagram || '',
        facebook: userData.social?.facebook || ''
      },
      preferences: {
        theme: userData.preferences?.theme || 'light',
        notifications: userData.preferences?.notifications ?? true,
        newsletter: userData.preferences?.newsletter ?? true
      },
      ...prev // Preserve any existing state
    }));
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects (e.g., social.twitter)
      const [parent, child] = name.split('.');
      setEditData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      // Handle top-level fields
      setEditData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSaveProfile = async () => {
    try {
      // Prepare data for Firestore
      const userUpdate = {
        name: editData.name,
        username: editData.username,
        location: editData.location,
        bio: editData.bio,
        website: editData.website,
        social: {
          twitter: editData.social.twitter,
          instagram: editData.social.instagram,
          facebook: editData.social.facebook
        },
        preferences: {
          theme: editData.preferences.theme,
          notifications: editData.preferences.notifications,
          newsletter: editData.preferences.newsletter
        },
        updatedAt: new Date().toISOString()
      };

      // Update in Firestore
      await setDoc(doc(db, 'users', currentUser.uid), userUpdate, { merge: true });
      
      // Update local state
      setUserData(prev => ({
        ...prev,
        ...userUpdate
      }));
      
      setIsEditMode(false);
      
      // Show success message
      // You can add a toast notification here if you have one
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error (show error message to user)
    }
  };

  const handleCancelEdit = () => {
    // Reset to original data
    setEditData({
      name: userData.name || '',
      username: userData.username || '',
      location: userData.location || '',
      bio: userData.bio || ''
    });
    setIsEditMode(false);
  };

  // If no user is logged in, show a message
  if (!currentUser) {
    return (
      <div className="enhanced-profile-container">
        <div className="content-section">
          <h2>Please log in to view your profile</h2>
          <p>You need to be logged in to view this page. Please log in or sign up.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="enhanced-profile-container">
      {/* Profile Header with Photo Upload */}
      <div className="profile-header">
        <div className="profile-cover">
          <div className="profile-avatar-container">
            <div className="profile-avatar">
              {userData.profileImage ? (
                <img src={userData.profileImage} alt="Profile" className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">
                  {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                </div>
              )}
              <button 
                className={`upload-btn ${isUploading ? 'uploading' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                title="Change profile picture"
              >
                {isUploading ? (
                  <div className="uploading-spinner"></div>
                ) : (
                  <FaCamera className="camera-icon" />
                )}
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        
        <div className="profile-info">
          <div className="profile-header-row">
            <h1 className={isEditMode ? 'editing' : ''}>
              {isEditMode ? (
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  className="profile-edit-input"
                  placeholder="Your name"
                />
              ) : (
                userData.name
              )}
            </h1>
            <button 
              className={`edit-profile-btn ${isEditMode ? 'editing' : ''}`}
              onClick={isEditMode ? handleSaveProfile : () => setIsEditMode(true)}
            >
              <span className="btn-text">
                {isEditMode ? (
                  <>
                    <FaSave className="btn-icon" /> Save Changes
                  </>
                ) : (
                  <>
                    <FaEdit className="btn-icon" /> Edit Profile
                  </>
                )}
              </span>
              <span className="btn-particles">
                <span className="particle"></span>
                <span className="particle"></span>
                <span className="particle"></span>
                <span className="particle"></span>
              </span>
            </button>
          </div>
          
          <div className="profile-username">
            {isEditMode ? (
              <input
                type="text"
                name="username"
                value={editData.username}
                onChange={handleInputChange}
                className="username-edit-input"
                placeholder="username"
              />
            ) : (
              `@${userData.username || userData.email.split('@')[0]}`
            )}
          </div>
          
          {/* Bio Section */}
          <div className={`bio-section ${isEditMode ? 'editing' : ''}`}>
            {isEditMode ? (
              <div className="bio-edit-container">
                <textarea
                  name="bio"
                  value={editData.bio}
                  onChange={handleInputChange}
                  className="bio-textarea"
                  placeholder="Tell us about yourself..."
                  rows="3"
                />
              </div>
            ) : (
              <div className="bio-display">
                <p className="profile-bio">{userData.bio}</p>
              </div>
            )}
          </div>
          
          <div className="profile-meta">
            <div className="meta-item" title="Email">
              <FaEnvelope />
              {isEditMode ? (
                <input
                  type="email"
                  name="email"
                  value={editData.email}
                  onChange={handleInputChange}
                  className="meta-edit-input"
                  placeholder="your@email.com"
                />
              ) : (
                <span>{userData.email}</span>
              )}
            </div>
            
            <div className={`meta-item ${isEditMode ? 'editing' : ''}`}>
              <FaMapMarkerAlt />
              {isEditMode ? (
                <input
                  type="text"
                  name="location"
                  value={editData.location}
                  onChange={handleInputChange}
                  className="meta-edit-input"
                  placeholder="Your location"
                />
              ) : (
                <span>{userData.location || 'Add location'}</span>
              )}
            </div>
            
            {isEditMode ? (
              <div className="meta-item editing">
                <FaGlobe />
                <input
                  type="url"
                  name="website"
                  value={editData.website}
                  onChange={handleInputChange}
                  className="meta-edit-input"
                  placeholder="Your website"
                />
              </div>
            ) : userData.website ? (
              <div className="meta-item">
                <FaGlobe />
                <a href={userData.website} target="_blank" rel="noopener noreferrer">
                  {userData.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            ) : null}
            
            {!isEditMode && (
              <div className="meta-item" title="Member since">
                <span>📅 Joined {userData.joinDate}</span>
              </div>
            )}
            
            {isEditMode && (
              <div className="edit-section">
                <h3 className="edit-section-title">Social Media</h3>
                <div className="social-inputs">
                  <div className="social-input">
                    <FaTwitter className="social-icon" />
                    <input
                      type="text"
                      name="social.twitter"
                      value={editData.social.twitter}
                      onChange={handleInputChange}
                      placeholder="Twitter username"
                      className="social-edit-input"
                    />
                  </div>
                  <div className="social-input">
                    <FaInstagram className="social-icon" />
                    <input
                      type="text"
                      name="social.instagram"
                      value={editData.social.instagram}
                      onChange={handleInputChange}
                      placeholder="Instagram username"
                      className="social-edit-input"
                    />
                  </div>
                  <div className="social-input">
                    <FaFacebook className="social-icon" />
                    <input
                      type="text"
                      name="social.facebook"
                      value={editData.social.facebook}
                      onChange={handleInputChange}
                      placeholder="Facebook username"
                      className="social-edit-input"
                    />
                  </div>
                </div>
                
                <h3 className="edit-section-title">Preferences</h3>
                <div className="preference-item">
                  <label className="preference-label">
                    <input
                      type="checkbox"
                      name="preferences.notifications"
                      checked={editData.preferences.notifications}
                      onChange={handleInputChange}
                      className="preference-checkbox"
                    />
                    <span className="checkmark"></span>
                    Email Notifications
                  </label>
                </div>
                <div className="preference-item">
                  <label className="preference-label">
                    <input
                      type="checkbox"
                      name="preferences.newsletter"
                      checked={editData.preferences.newsletter}
                      onChange={handleInputChange}
                      className="preference-checkbox"
                    />
                    <span className="checkmark"></span>
                    Subscribe to Newsletter
                  </label>
                </div>
                <div className="preference-item">
                  <label className="preference-label">Theme</label>
                  <div className="theme-selector">
                    <label className="theme-option">
                      <input
                        type="radio"
                        name="preferences.theme"
                        value="light"
                        checked={editData.preferences.theme === 'light'}
                        onChange={handleInputChange}
                      />
                      <span className="theme-name">Light</span>
                    </label>
                    <label className="theme-option">
                      <input
                        type="radio"
                        name="preferences.theme"
                        value="dark"
                        checked={editData.preferences.theme === 'dark'}
                        onChange={handleInputChange}
                      />
                      <span className="theme-name">Dark</span>
                    </label>
                    <label className="theme-option">
                      <input
                        type="radio"
                        name="preferences.theme"
                        value="system"
                        checked={editData.preferences.theme === 'system'}
                        onChange={handleInputChange}
                      />
                      <span className="theme-name">System</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {isEditMode && (
            <div className="edit-actions">
              <button className="cancel-edit-btn" onClick={handleCancelEdit}>
                <FaTimes /> Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <FaUtensils className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{userData.stats.recipes}</span>
            <span className="stat-label">Recipes</span>
          </div>
        </div>
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{userData.stats.followers}</span>
            <span className="stat-label">Followers</span>
          </div>
        </div>
        <div className="stat-card">
          <FaHeart className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{userData.stats.likes}</span>
            <span className="stat-label">Likes</span>
          </div>
        </div>
        <div className="stat-card">
          <FaEye className="stat-icon" />
          <div className="stat-info">
            <span className="stat-number">{userData.stats.views}</span>
            <span className="stat-label">Views</span>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="content-section badges-section">
        <h2>My Achievements</h2>
        <div className="badges-grid">
          {userBadges.map(badge => {
            const Icon = badge.icon;
            return (
              <div key={badge.id} className="badge-card">
                <div className="badge-icon-container" style={{ backgroundColor: badge.color }}>
                  <Icon className="badge-icon" />
                </div>
                <div className="badge-info">
                  <h3>{badge.name}</h3>
                  <p>{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
