import React, { useState } from 'react';
import { recipeService } from '../services/recipeService';
import { allRecipes } from '../data/allRecipes';

const AdminUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadedCount, setUploadedCount] = useState(0);

  const handleUpload = async () => {
    try {
      setUploading(true);
      setMessage('Uploading recipes to Firebase...');
      
      const success = await recipeService.uploadRecipes(allRecipes);
      
      if (success) {
        setMessage('✅ All recipes uploaded successfully!');
        setUploadedCount(Object.keys(allRecipes).length);
      } else {
        setMessage('❌ Failed to upload recipes');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '50px auto',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>
        📚 Recipe Upload to Firebase
      </h2>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <p style={{ marginBottom: '10px' }}>
          <strong>Total Recipes:</strong> {Object.keys(allRecipes).length}
        </p>
        <p style={{ marginBottom: '10px' }}>
          <strong>Categories:</strong> Global Cravings, Bites & Brunch, Eat Your Way, Desserts & Drinks, Smart Picks, Soups & Drinks
        </p>
        <p style={{ marginBottom: '20px', color: '#666' }}>
          Click the button below to upload all recipes to Firebase Firestore database.
        </p>
        
        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            backgroundColor: uploading ? '#ccc' : '#8b977c',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
        >
          {uploading ? '⏳ Uploading...' : '🚀 Upload All Recipes to Firebase'}
        </button>
        
        {message && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            borderRadius: '6px',
            backgroundColor: uploadedCount > 0 ? '#d4edda' : '#f8d7da',
            color: uploadedCount > 0 ? '#155724' : '#721c24',
            fontWeight: 'bold'
          }}>
            {message}
            {uploadedCount > 0 && (
              <div style={{ marginTop: '10px', fontSize: '14px' }}>
                📊 Successfully uploaded {uploadedCount} recipes to Firebase!
              </div>
            )}
          </div>
        )}
      </div>
      
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '15px', 
        borderRadius: '8px',
        fontSize: '14px',
        color: '#1565c0'
      }}>
        <strong>📋 Next Steps:</strong>
        <ol style={{ marginTop: '10px', paddingLeft: '20px' }}>
          <li>Upload recipes using the button above</li>
          <li>Verify recipes appear on home page</li>
          <li>Test recipe detail pages navigation</li>
          <li>Check Firebase Console for data</li>
        </ol>
      </div>
    </div>
  );
};

export default AdminUpload;
