import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  doc, getDoc, setDoc, serverTimestamp,
  collection, query, where, getDocs
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

import {
  FaCamera, FaEdit, FaSave, FaTimes,
  FaUtensils, FaUser
} from 'react-icons/fa';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/EnhancedProfile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const avatarInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('recipes');
  const [recipes, setRecipes] = useState([]);

  const [userData, setUserData] = useState({
    name: '',
    username: '',
    bio: '',
    location: '',
    website: '',
    social: {},
    profileImage: null
  });

  const [editData, setEditData] = useState({
    name: '',
    bio: '',
    location: '',
    website: '',
    social: {}
  });

  /* ======================
     LOAD PROFILE
  ====================== */
  useEffect(() => {
    const load = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      const userRef = doc(db, 'users', currentUser.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          displayName: currentUser.email.split('@')[0],
          username: currentUser.email.split('@')[0],
          bio: '',
          social: {},
          createdAt: serverTimestamp()
        });
      }

      const data = (await getDoc(userRef)).data();

      const profile = {
        name: data.displayName,
        username: data.username,
        bio: data.bio || '',
        location: data.location || '',
        website: data.website || '',
        social: data.social || {},
        profileImage: data.profileImage || null
      };

      setUserData(profile);
      setEditData({
        name: profile.name,
        bio: profile.bio,
        location: profile.location,
        website: profile.website,
        social: profile.social
      });

      const q = query(
        collection(db, 'recipes'),
        where('userId', '==', currentUser.uid)
      );
      const snapRecipes = await getDocs(q);
      setRecipes(snapRecipes.docs.map(d => ({ id: d.id, ...d.data() })));

      setLoading(false);
    };

    load();
  }, [currentUser]);

  /* ======================
     UPLOAD PROFILE IMAGE
  ====================== */
  const uploadProfileImage = async file => {
    if (!file || isUploading) return;

    try {
      setIsUploading(true);

      const imgRef = ref(storage, `profiles/${currentUser.uid}`);
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);

      await setDoc(
        doc(db, 'users', currentUser.uid),
        { profileImage: url },
        { merge: true }
      );

      setUserData(prev => ({ ...prev, profileImage: url }));
      toast.success('Profile photo updated');
    } catch (err) {
      console.error(err);
      toast.error('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  /* ======================
     SAVE PROFILE
  ====================== */
  const saveProfile = async () => {
    try {
      await setDoc(
        doc(db, 'users', currentUser.uid),
        {
          displayName: editData.name,
          username: userData.username, // keep stable
          bio: editData.bio,
          location: editData.location,
          website: editData.website,
          social: editData.social,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      setUserData(prev => ({
        ...prev,
        name: editData.name,
        bio: editData.bio,
        location: editData.location,
        website: editData.website,
        social: editData.social
      }));

      setIsEditing(false);
      toast.success('Profile updated');
    } catch (err) {
      console.error(err);
      toast.error('Save failed');
    }
  };

  const cancelEdit = () => {
    setEditData({
      name: userData.name,
      bio: userData.bio,
      location: userData.location,
      website: userData.website,
      social: userData.social
    });
    setIsEditing(false);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="enhanced-profile">
      <ToastContainer />

      {/* HEADER */}
      <div className="profile-header">

        {/* AVATAR */}
        <div className="profile-avatar">
          <img
            src={userData.profileImage || 'https://www.gravatar.com/avatar/?d=mp'}
            alt="profile"
          />
          <button
            disabled={isUploading}
            onClick={() => avatarInputRef.current.click()}
          >
            <FaCamera />
          </button>
          <input
            ref={avatarInputRef}
            type="file"
            hidden
            accept="image/*"
            onChange={e => uploadProfileImage(e.target.files[0])}
          />
        </div>

        {/* INFO */}
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                placeholder="Your name"
                value={editData.name}
                onChange={e =>
                  setEditData({ ...editData, name: e.target.value })
                }
              />
              <textarea
                placeholder="Tell something about yourself"
                value={editData.bio}
                onChange={e =>
                  setEditData({ ...editData, bio: e.target.value })
                }
              />

              <div className="edit-actions">
                <button onClick={saveProfile}>
                  <FaSave /> Save
                </button>
                <button onClick={cancelEdit}>
                  <FaTimes /> Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h1>{userData.name}</h1>
              <p>@{userData.username}</p>
              {userData.bio && <p>{userData.bio}</p>}
              <button onClick={() => setIsEditing(true)}>
                <FaEdit /> Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      {/* NAV */}
      <div className="profile-nav">
        <button
          className={activeTab === 'recipes' ? 'active' : ''}
          onClick={() => setActiveTab('recipes')}
        >
          <FaUtensils /> Recipes
        </button>
        <button
          className={activeTab === 'about' ? 'active' : ''}
          onClick={() => setActiveTab('about')}
        >
          <FaUser /> About
        </button>
      </div>

      {/* CONTENT */}
      {activeTab === 'recipes' ? (
        recipes.length === 0 ? (
          <div className="empty-state">
            <FaUtensils size={48} />
            <p>No recipes yet</p>
          </div>
        ) : (
          <div className="recipes-grid">
            {recipes.map(r => (
              <div key={r.id} className="recipe-card">
                <div
                  className="recipe-image"
                  style={{ backgroundImage: `url(${r.image})` }}
                />
                <h4>{r.title}</h4>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="about-section">
          <p>{userData.bio || 'No bio added yet.'}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
