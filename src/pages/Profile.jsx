import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaCamera, FaUser, FaEnvelope, FaClock, FaHeart, FaTrophy, FaChartLine, FaUtensils, FaStar, FaBookmark, FaShare, FaAward, FaFire, FaCalendarAlt, FaUsers, FaCog, FaSignOutAlt, FaEdit, FaCheck, FaTimes, FaPlus } from 'react-icons/fa';
import Header from '../components/Header';
import './Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  console.log('Profile page rendering, currentUser:', currentUser);
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileData, setProfileData] = useState({
    username: currentUser?.username || 'Food Lover',
    email: currentUser?.email || 'user@example.com',
    bio: 'Passionate home cook exploring global cuisines',
    favoriteCuisines: ['Italian', 'Japanese', 'Mexican'],
    joinedDate: 'January 2024',
    profileImage: null,
    website: 'www.myfoodblog.com',
    socialLinks: {
      instagram: '@foodlover',
      youtube: 'Food Channel',
      twitter: '@chef_user'
    }
  });

  // Mock data for enhanced features
  const [userStats] = useState({
    recipesCreated: 42,
    journalEntries: 156,
    likesReceived: 892,
    followers: 234,
    following: 189,
    totalViews: 5432,
    averageRating: 4.7
  });

  const [myRecipes] = useState([
    { id: 1, title: 'Creamy Garlic Sauce Steak', image: '/images/eatw/F1.jpg', rating: 4.9, time: '45 min', category: 'Main Course' },
    { id: 2, title: 'High Protein Bowl', image: '/images/bitesbb/F1.jpg', rating: 4.4, time: '15 min', category: 'Breakfast' },
    { id: 3, title: 'Spaghetti', image: '/images/smartp/F2.jpg', rating: 4.4, time: '30 min', category: 'Italian' },
    { id: 4, title: 'Butter Chicken', image: '/images/eatw/F8.jpg', rating: 4.7, time: '40 min', category: 'Indian' },
    { id: 5, title: 'Pizza', image: '/images/global/F1.jpg', rating: 4.5, time: '30 min', category: 'Italian' },
    { id: 6, title: 'Sushi', image: '/images/global/F8.jpg', rating: 4.8, time: '50 min', category: 'Japanese' }
  ]);

  const [achievements] = useState([
    { id: 1, title: 'Recipe Master', description: 'Created 25+ recipes', icon: '🏆', earned: true, date: '2024-01-15' },
    { id: 2, title: 'Journal Keeper', description: 'Made 100+ journal entries', icon: '📖', earned: true, date: '2024-02-20' },
    { id: 3, title: 'Social Butterfly', description: 'Gained 200+ followers', icon: '🦋', earned: true, date: '2024-03-10' },
    { id: 4, title: 'Rising Star', description: '1000+ total likes', icon: '⭐', earned: false, progress: 892 },
    { id: 5, title: 'Content Creator', description: '50+ media uploads', icon: '📸', earned: false, progress: 38 }
  ]);

  const [recentActivity] = useState([
    { id: 1, type: 'recipe', title: 'Homemade Pasta Adventure', date: '2024-01-10', action: 'Created new recipe' },
    { id: 2, type: 'journal', title: 'Weekend Brunch Experiment', date: '2024-01-09', action: 'Added journal entry' },
    { id: 3, type: 'like', title: 'Thai Green Curry', date: '2024-01-08', action: 'Liked a recipe' },
    { id: 4, type: 'comment', title: 'Sourdough Journey', date: '2024-01-07', action: 'Commented on post' },
    { id: 5, type: 'bookmark', title: 'Japanese Sushi', date: '2024-01-06', action: 'Bookmarked recipe' }
  ]);

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
    <div>
      <div style={{ background: 'red', color: 'white', padding: '20px', margin: '20px' }}>
        PROFILE PAGE TEST - If you see this, the Profile component is rendering!
      </div>
      <div className="profile-container">
        {/* Profile Header */}
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
            <div className="profile-actions">
              <button 
                className={`edit-profile-btn ${isEditing ? 'editing' : ''}`}
                onClick={handleEditToggle}
                title="Edit Profile"
              >
                <FaEdit />
              </button>
              <button 
                className="profile-action-btn logout"
                onClick={() => console.log('Logout clicked')}
                title="Logout"
              >
                <FaSignOutAlt />
              </button>
              <button className="profile-action-btn settings" title="Settings">
                <FaCog />
              </button>
            </div>
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
            
            <div className="profile-bio">
              <p>{profileData.bio}</p>
              {isEditing && (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="profile-textarea"
                  rows="3"
                  placeholder="Tell us about your culinary journey..."
                />
              )}
            </div>
            
            <div className="profile-details">
              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <span>{profileData.email}</span>
              </div>
              
              <div className="detail-item">
                <FaClock className="detail-icon" />
                <span>Member since {profileData.joinedDate}</span>
              </div>
              
              {profileData.website && (
                <div className="detail-item">
                  <FaShare className="detail-icon" />
                  <span>{profileData.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="profile-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaChartLine /> Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'recipes' ? 'active' : ''}`}
            onClick={() => setActiveTab('recipes')}
          >
            <FaUtensils /> Recipes
          </button>
          <button 
            className={`tab-btn ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => setActiveTab('achievements')}
          >
            <FaTrophy /> Achievements
          </button>
          <button 
            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            <FaClock /> Activity
          </button>
        </div>

        {/* Tab Content */}
        <div className="profile-content">
          {activeTab === 'overview' && (
            <div className="tab-content overview-tab">
              {/* Stats Grid */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaUtensils />
                  </div>
                  <div className="stat-info">
                    <h3>{userStats.recipesCreated}</h3>
                    <p>Recipes Created</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaHeart />
                  </div>
                  <div className="stat-info">
                    <h3>{userStats.likesReceived}</h3>
                    <p>Likes Received</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaUsers />
                  </div>
                  <div className="stat-info">
                    <h3>{userStats.followers}</h3>
                    <p>Followers</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaStar />
                  </div>
                  <div className="stat-info">
                    <h3>{userStats.averageRating}</h3>
                    <p>Average Rating</p>
                  </div>
                </div>
              </div>

              {/* Favorite Recipes */}
              <div className="favorites-section">
                <h3><FaHeart /> Favorite Recipes</h3>
                <div className="favorites-grid">
                  {favoriteRecipes.map(recipe => (
                    <div key={recipe.id} className="favorite-card">
                      <img src={recipe.image} alt={recipe.title} className="favorite-image" />
                      <div className="favorite-info">
                        <h4>{recipe.title}</h4>
                        <div className="favorite-meta">
                          <span className="rating">⭐ {recipe.rating}</span>
                          <span className="time">⏱️ {recipe.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recipes' && (
            <div className="tab-content recipes-tab">
              <div className="section-header">
                <h3><FaUtensils /> My Recipes</h3>
                <button className="add-recipe-btn">
                  <FaPlus /> Add New Recipe
                </button>
              </div>
              <div className="recipes-grid">
                {myRecipes.map(recipe => (
                  <div key={recipe.id} className="recipe-card">
                    <img src={recipe.image} alt={recipe.title} className="recipe-image" />
                    <div className="recipe-overlay">
                      <div className="recipe-actions">
                        <button className="overlay-btn edit">
                          <FaEdit />
                        </button>
                        <button className="overlay-btn delete">
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                    <div className="recipe-info">
                      <h4>{recipe.title}</h4>
                      <div className="recipe-meta">
                        <span className="rating">⭐ {recipe.rating}</span>
                        <span className="time">⏱️ {recipe.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="tab-content achievements-tab">
              <h3><FaTrophy /> Achievements & Badges</h3>
              <div className="achievements-grid">
                {achievements.map(achievement => (
                  <div key={achievement.id} className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}>
                    <div className="achievement-icon">
                      <span className="achievement-emoji">{achievement.icon}</span>
                      {achievement.earned && <FaCheck className="earned-check" />}
                    </div>
                    <div className="achievement-info">
                      <h4>{achievement.title}</h4>
                      <p>{achievement.description}</p>
                      {achievement.earned ? (
                        <span className="achievement-date">Earned: {achievement.date}</span>
                      ) : (
                        <div className="achievement-progress">
                          <span>Progress: {achievement.progress || 0}</span>
                          <div className="progress-bar">
                            <div 
                              className="progress-fill" 
                              style={{ width: `${((achievement.progress || 0) / 1000) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="tab-content activity-tab">
              <h3><FaClock /> Recent Activity</h3>
              <div className="activity-timeline">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">
                      {activity.type === 'recipe' && <FaUtensils />}
                      {activity.type === 'journal' && <FaBookmark />}
                      {activity.type === 'like' && <FaHeart />}
                      {activity.type === 'comment' && <FaShare />}
                      {activity.type === 'bookmark' && <FaBookmark />}
                    </div>
                    <div className="activity-content">
                      <p className="activity-action">{activity.action}</p>
                      <h4 className="activity-title">{activity.title}</h4>
                      <span className="activity-date">{activity.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Edit Form (shown when editing) */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="profile-edit-form">
            <div className="form-group">
              <label>Favorite Cuisines</label>
              <div className="cuisine-tags">
                {['Italian', 'Japanese', 'Mexican', 'Thai', 'Indian', 'Chinese', 'French', 'Mediterranean'].map(cuisine => (
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
            
            <div className="form-group">
              <label>Website</label>
              <input
                type="text"
                value={profileData.website}
                onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                className="profile-input"
                placeholder="Your website or blog..."
              />
            </div>
            
            <div className="form-group">
              <label>Social Links</label>
              <div className="social-inputs">
                <input
                  type="text"
                  value={profileData.socialLinks.instagram}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                  }))}
                  className="profile-input"
                  placeholder="Instagram"
                />
                <input
                  type="text"
                  value={profileData.socialLinks.youtube}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, youtube: e.target.value }
                  }))}
                  className="profile-input"
                  placeholder="YouTube"
                />
                <input
                  type="text"
                  value={profileData.socialLinks.twitter}
                  onChange={(e) => setProfileData(prev => ({
                    ...prev,
                    socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                  }))}
                  className="profile-input"
                  placeholder="Twitter"
                />
              </div>
            </div>
            
            <button type="submit" className="save-btn">
              {isEditing ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
