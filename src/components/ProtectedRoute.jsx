import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  // Temporary bypass for testing - remove this in production
  if (!currentUser) {
    // Create a mock user for testing the profile page
    const mockUser = {
      uid: 'test-user-123',
      email: 'test@flavourfusion.com',
      displayName: 'Test Food Chef'
    };
    
    // For now, allow access with mock user data
    // In production, you should use: return <Navigate to="/login" replace />;
    return React.cloneElement(children, { 
      currentUser: mockUser,
      isMockUser: true 
    });
  }

  return children;
};

export default ProtectedRoute;
