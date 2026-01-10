import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaCamera, FaUser, FaEnvelope, FaMapMarkerAlt, FaClock, FaHeart } from 'react-icons/fa';
import Header from '../components/Header';

const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: currentUser?.username || 'Food Lover',
    email: currentUser?.email || 'user@example.com',
    bio: 'Passionate home cook exploring global cuisines',
    location: 'San Francisco, CA',
    favoriteCuisines: ['Italian', 'Japanese', 'Mexican'],
    joinedDate: 'January 2024'
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Simulate save (replace with actual Firebase update)
    console.log('Profile saved:', profileData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = reader.result;
        setProfileData(prev => ({ ...prev, profileImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Header showHeroSection={false} showNavigation={false}>
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image-wrapper">
            <div className="profile-image-container">
              {profileData.profileImage ? (
                <img src={profileData.profileImage} alt="Profile" className="profile-image" />
              ) : (
                <div className="profile-image-placeholder">
                  <FaCamera className="upload-icon" />
                  <span>Upload Photo</span>
                </div>
              )}
            </div>
            <button 
              className={`edit-profile-btn ${isEditing ? 'editing' : ''}`}
              onClick={handleEditToggle}
            >
              <FaUser />
            </button>
          </div>
          
          <div className="profile-info">
            <div className="profile-name">
              <h2>{profileData.username}</h2>
              {isEditing && (
                <input
                  type="text"
                  value={profileData.username}
                  onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                  className="profile-input"
                />
              )}
            </div>
            
            <div className="profile-details">
              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <span>{profileData.email}</span>
              </div>
              
              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <span>{profileData.location}</span>
              </div>
              
              <div className="detail-item">
                <FaClock className="detail-icon" />
                <span>Member since {profileData.joinedDate}</span>
              </div>
            </div>
          </div>
          
          {isEditing && (
            <form onSubmit={handleSaveProfile} className="profile-edit-form">
              <div className="form-group">
                <label>Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="profile-textarea"
                  rows="4"
                  placeholder="Tell us about your culinary journey..."
                />
              </div>
              
              <div className="form-group">
                <label>Favorite Cuisines</label>
                <div className="cuisine-tags">
                  {['Italian', 'Japanese', 'Mexican', 'Thai', 'Indian'].map(cuisine => (
                    <span key={cuisine} className="cuisine-tag">
                      {cuisine}
                      <button 
                        type="button"
                        onClick={() => {
                          setProfileData(prev => ({
                            ...prev,
                            favoriteCuisines: prev.favoriteCuisines.includes(cuisine) 
                              ? prev.favoriteCuisines.filter(c => c !== cuisine)
                              : [...prev.favoriteCuisines, cuisine]
                          }))
                        }}
                        className={profileData.favoriteCuisines.includes(cuisine) ? 'selected' : ''}
                      >
                        {cuisine}
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              
              <button type="submit" className="save-btn">
                {isEditing ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          )}
        </div>
      </div>
    </Header>
  );
};

export default Profile;
