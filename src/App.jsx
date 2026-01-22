import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Home from './components/Home';
import Auth from './components/Auth';
import About from './components/About';
import Profile from './pages/Profile';
import ProfilePage from './pages/ProfilePage';
import RecipeJournalingPage from './pages/RecipeJournalingPage';
import JournalManager from './components/JournalManager';
import Favorites from './pages/Favorites';
import RecipeDetails from './pages/RecipeDetails';
import RecipeUpload from './pages/RecipeUpload';
import AdminUpload from './components/AdminUpload';
import SearchResults from './pages/SearchResults';
import SimpleSearch from './pages/SimpleSearch';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/auth" 
            element={
              <PublicRoute>
                <Auth />
              </PublicRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <Navigate to="/auth" replace />
            } 
          />
          <Route 
            path="/signup" 
            element={
              <Navigate to="/auth" replace />
            } 
          />
          <Route 
            path="/upload-recipe" 
            element={
              <ProtectedRoute>
                <RecipeUpload />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recipe-journaling" 
            element={
              <ProtectedRoute>
                <RecipeJournalingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/journal-manager" 
            element={
              <ProtectedRoute>
                <JournalManager />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/favorites" 
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            } 
          />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/simple-search" element={<SimpleSearch />} />
          <Route path="/admin-upload" element={<AdminUpload />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route 
            path="/protected" 
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </FavoritesProvider>
  </AuthProvider>
);
}

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  
  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default App;
