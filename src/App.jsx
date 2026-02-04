import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import Home from './components/Home';
import NewLogin from './pages/NewLogin';
import NewSignup from './pages/NewSignup';
import ForgotPassword from './pages/ForgotPassword';
import About from './components/About';
import EnhancedProfile from './pages/EnhancedProfile';
import RecipeJournalingPage from './pages/RecipeJournalingPage';
import JournalManager from './components/JournalManager';
import Favorites from './pages/Favorites';
import RecipeDetails from './pages/RecipeDetails';
import RecipeUpload from './pages/RecipeUpload';
import AdminUpload from './components/AdminUpload';
import SearchResults from './pages/SearchResults';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <NewLogin />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <NewSignup />
              </PublicRoute>
            } 
          />
          <Route 
            path="/forgot-password" 
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
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
                <EnhancedProfile />
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

export default App;
