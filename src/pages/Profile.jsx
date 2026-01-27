import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../index.css';
import {
  FaCamera, FaUser, FaEdit, FaSave, FaTimes, FaCheck,
  FaUtensils, FaHeart, FaUsers, FaEye,
  FaCrown, FaBell, FaCog, FaChartLine, FaClock, FaRocket
} from 'react-icons/fa';

import {
  doc, getDoc, setDoc, updateDoc, serverTimestamp
} from 'firebase/firestore';

import {
  ref, uploadBytesResumable, getDownloadURL
} from 'firebase/storage';

import { db, storage } from '../firebase';
import Header from '../components/Header';

const Profile = () => {
  const { currentUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [profileData, setProfileData] = useState(null);
  const [initialProfileData, setInitialProfileData] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  /* ---------------- LOAD PROFILE ---------------- */
  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser) return;

      try {
        const profileRef = doc(db, 'profiles', currentUser.uid);
        const snap = await getDoc(profileRef);

        if (snap.exists()) {
          setProfileData(snap.data());
          setInitialProfileData(snap.data());
        } else {
          const initialProfile = {
            username: currentUser.displayName || 'Foodie',
            bio: '',
            profileImage: '',
            coverImage: '',
            stats: {
              recipesCount: 0,
              followersCount: 0,
              likesCount: 0,
              viewsCount: 0
            },
            createdAt: serverTimestamp()
          };

          await setDoc(profileRef, initialProfile);
          setProfileData(initialProfile);
          setInitialProfileData(initialProfile);
        }
      } catch (err) {
        console.error(err);
        setErrorMessage('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [currentUser]);

  /* ---------------- TRACK UNSAVED CHANGES ---------------- */
  useEffect(() => {
    if (!initialProfileData || !profileData) return;

    const changed =
      profileData.username !== initialProfileData.username ||
      profileData.bio !== initialProfileData.bio ||
      profileData.profileImage !== initialProfileData.profileImage ||
      profileData.coverImage !== initialProfileData.coverImage;

    setHasUnsavedChanges(changed);
  }, [profileData, initialProfileData]);

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Only image files allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage('Image must be under 2MB');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setErrorMessage('');

    const storageRef = ref(
      storage,
      `profiles/${currentUser.uid}/${type}/${file.name}`
    );

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      error => {
        console.error(error);
        setErrorMessage('Image upload failed');
        setIsUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        setProfileData(prev => ({
          ...prev,
          [type]: downloadURL
        }));

        await updateDoc(doc(db, 'profiles', currentUser.uid), {
          [type]: downloadURL,
          updatedAt: serverTimestamp()
        });

        setSuccessMessage('Image updated successfully!');
        setIsUploading(false);
        setUploadProgress(0);
      }
    );
  };

  /* ---------------- SAVE PROFILE ---------------- */
  const handleSaveProfile = async () => {
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await updateDoc(doc(db, 'profiles', currentUser.uid), {
        username: profileData.username,
        bio: profileData.bio,
        profileImage: profileData.profileImage,
        coverImage: profileData.coverImage,
        updatedAt: serverTimestamp()
      });

      setInitialProfileData(profileData);
      setIsEditing(false);
      setHasUnsavedChanges(false);
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- USER LEVEL ---------------- */
  const userLevel = useMemo(() => {
    if (!profileData) return {};

    const points =
      profileData.stats.likesCount +
      profileData.stats.recipesCount * 10;

    if (points < 100) return { level: 1, title: 'Novice Chef', color: '#aaa' };
    if (points < 500) return { level: 2, title: 'Home Cook', color: '#4caf50' };
    if (points < 1000) return { level: 3, title: 'Skilled Chef', color: '#2196f3' };
    return { level: 4, title: 'Master Chef', color: '#ff9800' };
  }, [profileData]);

  /* ---------------- LOADING ---------------- */
  if (loading || !profileData) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <Header />

      {/* COVER */}
      <div className="cover-image-container">
        {profileData.coverImage ? (
          <img src={profileData.coverImage} className="cover-image" alt="Cover" />
        ) : (
          <div className="cover-placeholder" />
        )}

        {isEditing && (
          <label className="upload-btn">
            <FaCamera /> Change Cover
            <input
              type="file"
              hidden
              onChange={(e) => handleImageUpload(e, 'coverImage')}
            />
          </label>
        )}
      </div>

      {/* PROFILE IMAGE */}
      <div className="profile-image-container">
        {profileData.profileImage ? (
          <img src={profileData.profileImage} className="profile-image" alt="Profile" />
        ) : (
          <div className="profile-image-placeholder">
            <FaUser />
          </div>
        )}

        {isEditing && (
          <label className="profile-image-upload">
            <FaCamera />
            <input
              type="file"
              hidden
              onChange={(e) => handleImageUpload(e, 'profileImage')}
            />
          </label>
        )}

        <div className="level-badge" style={{ background: userLevel.color }}>
          <FaCrown /> Level {userLevel.level}
        </div>
      </div>

      {/* DETAILS */}
      <div className="profile-details">
        {isEditing ? (
          <>
            <input
              value={profileData.username}
              onChange={(e) =>
                setProfileData({ ...profileData, username: e.target.value })
              }
            />
            <textarea
              value={profileData.bio}
              onChange={(e) =>
                setProfileData({ ...profileData, bio: e.target.value })
              }
            />
          </>
        ) : (
          <>
            <h1>{profileData.username}</h1>
            <span style={{ color: userLevel.color }}>{userLevel.title}</span>
            <p>{profileData.bio || 'No bio yet'}</p>
          </>
        )}

        {/* STATS */}
        <div className="advanced-stats">
          <div><FaUtensils /> {profileData.stats.recipesCount}</div>
          <div><FaUsers /> {profileData.stats.followersCount}</div>
          <div><FaHeart /> {profileData.stats.likesCount}</div>
          <div><FaEye /> {profileData.stats.viewsCount}</div>
        </div>

        {/* ACTIONS */}
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={handleSaveProfile} disabled={saving}>
                <FaSave /> Save
              </button>
              <button
                onClick={() => {
                  setProfileData(initialProfileData);
                  setIsEditing(false);
                  setHasUnsavedChanges(false);
                }}
              >
                <FaTimes /> Cancel
              </button>
            </>
          ) : (
            <>
              {hasUnsavedChanges && (
                <button onClick={handleSaveProfile} disabled={saving}>
                  <FaSave /> Save Changes
                </button>
              )}
              <button onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit Profile
              </button>
              <button><FaBell /></button>
              <button><FaCog /></button>
            </>
          )}
        </div>
      </div>

      {/* MESSAGES */}
      {successMessage && <div className="success"><FaCheck /> {successMessage}</div>}
      {errorMessage && <div className="error"><FaTimes /> {errorMessage}</div>}

      {/* TABS */}
      <div className="profile-navigation">
        {['overview', 'recipes', 'activity'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'active' : ''}
          >
            {tab === 'overview' && <FaChartLine />}
            {tab === 'recipes' && <FaUtensils />}
            {tab === 'activity' && <FaClock />}
            {tab}
          </button>
        ))}
      </div>

      {activeTab !== 'overview' && (
        <div className="coming-soon">
          <FaRocket />
          <p>Coming Soon</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
