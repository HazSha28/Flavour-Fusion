import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaCamera, FaUser, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaGlobe, FaEdit, 
  FaSave, FaTimes, FaCheck, FaUtensils, FaHeart, FaStar, FaCalendarAlt, FaTrophy,
  FaChartLine, FaUsers, FaBookmark, FaShare, FaCog, FaSignOutAlt, FaPlus, FaInstagram,
  FaYoutube, FaTwitter, FaPinterest
} from 'react-icons/fa';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/Header';
import './Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [profileData, setProfileData] = useState({
    username: '',
    bio: '',
    website: '',
    location: '',
    profession: '',
    profileImage: '',
    coverImage: '',
    socialLinks: {
      instagram: '',
      youtube: '',
      twitter: '',
      pinterest: ''
    },
    preferences: {
      emailNotifications: true,
      publicProfile: true,
      showEmail: false
    },
    stats: {
      recipesCount: 0,
      followersCount: 0,
      followingCount: 0,
      likesCount: 0
    }
  });

  // Load profile data from Firebase
  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser) return;
      
      try {
        const profileDoc = await getDoc(doc(db, 'profiles', currentUser.uid));
        
        if (profileDoc.exists()) {
          setProfileData(profileDoc.data());
        } else {
          // Create initial profile if it doesn't exist
          const initialProfile = {
            ...profileData,
            username: currentUser.displayName || 'User',
            email: currentUser.email,
            createdAt: serverTimestamp()
          };
          await setDoc(doc(db, 'profiles', currentUser.uid), initialProfile);
          setProfileData(initialProfile);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        setErrorMessage('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUser]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const profileRef = doc(db, 'profiles', currentUser.uid);
      await updateDoc(profileRef, {
        ...profileData,
        updatedAt: serverTimestamp()
      });
      
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
      setErrorMessage('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    // For now, just preview image
    // In production, you'd upload to Firebase Storage
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      setProfileData(prev => ({
        ...prev,
        [type]: result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setProfileData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  const handlePreferenceChange = (preference, value) => {
    setProfileData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: value
      }
    }));
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <Header />
      
      {/* Profile Header */}
      <div className="profile-header">
        {/* Cover Image */}
        <div className="cover-image-container">
          {profileData.coverImage ? (
            <img src={profileData.coverImage} alt="Cover" className="cover-image" />
          ) : (
            <div className="cover-image-placeholder"></div>
          )}
          {isEditing && (
            <div className="cover-image-upload">
              <label htmlFor="cover-upload" className="upload-btn">
                <FaCamera />
                <span>Change Cover</span>
              </label>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, 'coverImage')}
                className="file-input"
              />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="profile-info-section">
          <div className="profile-image-container">
            {profileData.profileImage ? (
              <img src={profileData.profileImage} alt="Profile" className="profile-image" />
            ) : (
              <div className="profile-image-placeholder">
                <FaUser />
              </div>
            )}
            {isEditing && (
              <label htmlFor="profile-upload" className="profile-image-upload">
                <FaCamera />
              </label>
            )}
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'profileImage')}
              className="file-input"
            />
          </div>

          <div className="profile-details">
            {isEditing ? (
              <div className="edit-mode">
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="username-input"
                  placeholder="Username"
                />
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="bio-textarea"
                  placeholder="Tell us about yourself..."
                  rows="3"
                />
              </div>
            ) : (
              <div className="view-mode">
                <h1 className="username">{profileData.username}</h1>
                <p className="bio">{profileData.bio || 'No bio yet'}</p>
              </div>
            )}

            <div className="profile-stats">
              <div className="stat-item">
                <FaUtensils className="stat-icon" />
                <span className="stat-number">{profileData.stats?.recipesCount || 0}</span>
                <span className="stat-label">Recipes</span>
              </div>
              <div className="stat-item">
                <FaUsers className="stat-icon" />
                <span className="stat-number">{profileData.stats?.followersCount || 0}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-item">
                <FaHeart className="stat-icon" />
                <span className="stat-number">{profileData.stats?.likesCount || 0}</span>
                <span className="stat-label">Likes</span>
              </div>
            </div>

            <div className="profile-actions">
              {isEditing ? (
                <div className="edit-actions">
                  <button
                    type="button"
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="btn btn-primary"
                  >
                    {saving ? <FaSave className="spinner" /> : <FaSave />}
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="btn btn-secondary"
                  >
                    <FaTimes /> Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="btn btn-primary"
                >
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="message success-message">
          <FaCheck /> {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="message error-message">
          <FaTimes /> {errorMessage}
        </div>
      )}

      {/* Profile Content */}
      <div className="profile-content">
        <div className="content-grid">
          {/* About Section */}
          <div className="content-card">
            <h3 className="card-title">
              <FaUser /> About
            </h3>
            <div className="card-content">
              {isEditing ? (
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="form-input"
                    placeholder="City, Country"
                  />
                </div>
              ) : (
                <div className="info-item">
                  <FaMapMarkerAlt className="info-icon" />
                  <span>{profileData.location || 'Location not set'}</span>
                </div>
              )}

              {isEditing ? (
                <div className="form-group">
                  <label>Profession</label>
                  <input
                    type="text"
                    value={profileData.profession}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                    className="form-input"
                    placeholder="Your profession"
                  />
                </div>
              ) : (
                <div className="info-item">
                  <FaBriefcase className="info-icon" />
                  <span>{profileData.profession || 'Profession not set'}</span>
                </div>
              )}

              {isEditing ? (
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    value={profileData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="form-input"
                    placeholder="yourwebsite.com"
                  />
                </div>
              ) : (
                <div className="info-item">
                  <FaGlobe className="info-icon" />
                  {profileData.website ? (
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                      {profileData.website}
                    </a>
                  ) : (
                    <span>Website not set</span>
                  )}
                </div>
              )}

              <div className="info-item">
                <FaCalendarAlt className="info-icon" />
                <span>Member since {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="content-card">
            <h3 className="card-title">
              <FaShare /> Social Links
            </h3>
            <div className="card-content">
              {isEditing ? (
                <div className="social-links-edit">
                  <div className="form-group">
                    <label><FaInstagram /> Instagram</label>
                    <input
                      type="text"
                      value={profileData.socialLinks.instagram}
                      onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                      className="form-input"
                      placeholder="@username"
                    />
                  </div>
                  <div className="form-group">
                    <label><FaYoutube /> YouTube</label>
                    <input
                      type="text"
                      value={profileData.socialLinks.youtube}
                      onChange={(e) => handleSocialLinkChange('youtube', e.target.value)}
                      className="form-input"
                      placeholder="channel name"
                    />
                  </div>
                  <div className="form-group">
                    <label><FaTwitter /> Twitter</label>
                    <input
                      type="text"
                      value={profileData.socialLinks.twitter}
                      onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                      className="form-input"
                      placeholder="@username"
                    />
                  </div>
                </div>
              ) : (
                <div className="social-links-view">
                  {profileData.socialLinks.instagram && (
                    <a href={`https://instagram.com/${profileData.socialLinks.instagram.replace('@', '')}`} 
                       target="_blank" rel="noopener noreferrer" className="social-link">
                      <FaInstagram /> Instagram
                    </a>
                  )}
                  {profileData.socialLinks.youtube && (
                    <a href={`https://youtube.com/${profileData.socialLinks.youtube}`} 
                       target="_blank" rel="noopener noreferrer" className="social-link">
                      <FaYoutube /> YouTube
                    </a>
                  )}
                  {profileData.socialLinks.twitter && (
                    <a href={`https://twitter.com/${profileData.socialLinks.twitter.replace('@', '')}`} 
                       target="_blank" rel="noopener noreferrer" className="social-link">
                      <FaTwitter /> Twitter
                    </a>
                  )}
                  {!profileData.socialLinks.instagram && !profileData.socialLinks.youtube && !profileData.socialLinks.twitter && (
                    <p className="no-social-links">No social links added yet</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="content-card">
            <h3 className="card-title">
              <FaCog /> Preferences
            </h3>
            <div className="card-content">
              {isEditing ? (
                <div className="preferences-edit">
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={profileData.preferences.emailNotifications}
                        onChange={(e) => handlePreferenceChange('emailNotifications', e.target.checked)}
                      />
                      <span>Email Notifications</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={profileData.preferences.publicProfile}
                        onChange={(e) => handlePreferenceChange('publicProfile', e.target.checked)}
                      />
                      <span>Public Profile</span>
                    </label>
                  </div>
                  <div className="form-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={profileData.preferences.showEmail}
                        onChange={(e) => handlePreferenceChange('showEmail', e.target.checked)}
                      />
                      <span>Show Email Publicly</span>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="preferences-view">
                  <div className="preference-item">
                    <span className="preference-label">Email Notifications:</span>
                    <span className={`preference-value ${profileData.preferences.emailNotifications ? 'enabled' : 'disabled'}`}>
                      {profileData.preferences.emailNotifications ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="preference-item">
                    <span className="preference-label">Profile Visibility:</span>
                    <span className={`preference-value ${profileData.preferences.publicProfile ? 'public' : 'private'}`}>
                      {profileData.preferences.publicProfile ? 'Public' : 'Private'}
                    </span>
                  </div>
                  <div className="preference-item">
                    <span className="preference-label">Email Visibility:</span>
                    <span className={`preference-value ${profileData.preferences.showEmail ? 'visible' : 'hidden'}`}>
                      {profileData.preferences.showEmail ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
