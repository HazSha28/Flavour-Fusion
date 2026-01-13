import React, { useState, useEffect } from 'react';
import Header from './Header';
import { 
  addJournal, 
  getUserJournals, 
  updateJournal, 
  deleteJournal, 
  uploadJournalFile 
} from '../journalService';
import './JournalManager.css';

const JournalManager = () => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    preparationTime: 0,
    isPublic: false
  });
  const [editingId, setEditingId] = useState(null);
  const [files, setFiles] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [saveStatus, setSaveStatus] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const userJournals = await getUserJournals();
      setJournals(userJournals);
    } catch (error) {
      console.error('Error fetching journals:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateJournal = () => {
    const errors = [];
    
    if (!formData.title.trim()) {
      errors.push('Title is required');
    }
    
    if (!formData.description.trim()) {
      errors.push('Description is required');
    }
    
    if (formData.preparationTime < 0) {
      errors.push('Preparation time must be positive');
    }
    
    if (!editingId && files.length === 0) {
      errors.push('At least one image or video is recommended');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateJournal()) {
      return;
    }
    
    setLoading(true);
    setSaveStatus('Saving journal...');
    
    try {
      let journalData = { ...formData };
      let uploadedFileUrls = [];
      
      if (editingId) {
        await updateJournal(editingId, journalData);
        setSaveStatus('Journal updated successfully!');
        setEditingId(null);
      } else {
        const journalId = await addJournal(journalData);
        setSaveStatus('Journal saved to Firestore! Uploading files...');
        
        // Upload files if any
        if (files.length > 0) {
          const imageUrls = [];
          let videoUrl = '';
          
          for (const file of files) {
            setSaveStatus(`Uploading ${file.name}...`);
            const url = await uploadJournalFile(file, journalId);
            uploadedFileUrls.push(url);
            
            if (file.type.startsWith('video/')) {
              videoUrl = url;
            } else {
              imageUrls.push(url);
            }
          }
          
          await updateJournal(journalId, { imageUrls, videoUrl });
          setSaveStatus(`Journal saved successfully! ${files.length} file(s) uploaded to Firebase Storage.`);
          setUploadedFiles(uploadedFileUrls);
        } else {
          setSaveStatus('Journal saved successfully! (No files uploaded)');
        }
      }
      
      setFormData({ title: '', description: '', preparationTime: 0, isPublic: false });
      setFiles([]);
      setUploadedFiles([]);
      setShowPreview(false);
      await fetchJournals();
      
      // Clear status after 3 seconds
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving journal:', error);
      setSaveStatus(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (journal) => {
    setFormData({
      title: journal.title,
      description: journal.description,
      preparationTime: journal.preparationTime,
      isPublic: journal.isPublic
    });
    setEditingId(journal.id);
  };

  const handleDelete = async (journalId) => {
    if (window.confirm('Are you sure you want to delete this journal?')) {
      try {
        await deleteJournal(journalId);
        await fetchJournals();
      } catch (error) {
        console.error('Error deleting journal:', error);
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getPreviewData = () => {
    return {
      ...formData,
      files: files.map(file => ({
        name: file.name,
        type: file.type,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      }))
    };
  };

  if (loading && journals.length === 0) {
    return <div>Loading journals...</div>;
  }

  return (
    <>
      <Header showHeroSection={false} showNavigation={false} />
      <div className="journal-manager">
        <h2>{editingId ? 'Edit Journal' : 'Create New Journal'}</h2>
      
      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="validation-errors" style={{color: 'red', marginBottom: '20px'}}>
          <h4>⚠️ Missing Information:</h4>
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Save Status */}
      {saveStatus && (
        <div className="save-status" style={{
          padding: '10px', 
          marginBottom: '20px', 
          backgroundColor: saveStatus.includes('Error') ? '#ffebee' : '#e8f5e8',
          borderRadius: '4px',
          border: `1px solid ${saveStatus.includes('Error') ? '#f44336' : '#4caf50'}`
        }}>
          {saveStatus}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="journal-form">
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label>Description:</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          />
        </div>
        
        <div>
          <label>Preparation Time (minutes):</label>
          <input
            type="number"
            value={formData.preparationTime}
            onChange={(e) => setFormData({...formData, preparationTime: parseInt(e.target.value)})}
            min="0"
          />
        </div>
        
        <div>
          <label>
            <input
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) => setFormData({...formData, isPublic: e.target.checked})}
            />
            Make Public
          </label>
        </div>
        
        {!editingId && (
          <div>
            <label>Images/Video:</label>
            <input
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
            {files.length > 0 && (
              <div className="file-list" style={{marginTop: '10px'}}>
                <h5>Selected Files:</h5>
                {files.map((file, index) => (
                  <div key={index} style={{display: 'flex', alignItems: 'center', gap: '10px', margin: '5px 0'}}>
                    <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    <button type="button" onClick={() => removeFile(index)} style={{padding: '2px 8px'}}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Preview Button */}
        <button 
          type="button" 
          onClick={() => setShowPreview(!showPreview)}
          style={{marginRight: '10px', backgroundColor: '#2196f3'}}
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : (editingId ? 'Update' : 'Create')}
        </button>
        
        {editingId && (
          <button 
            type="button" 
            onClick={() => {
              setEditingId(null);
              setFormData({ title: '', description: '', preparationTime: 0, isPublic: false });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {/* Preview Section */}
      {showPreview && (
        <div className="journal-preview" style={{
          border: '2px dashed #ccc', 
          padding: '20px', 
          margin: '20px 0',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>📋 Journal Preview</h3>
          {(() => {
            const preview = getPreviewData();
            return (
              <div>
                <h4>{preview.title || '<Missing Title>'}</h4>
                <p><strong>Description:</strong> {preview.description || '<Missing Description>'}</p>
                <p><strong>Preparation Time:</strong> {preview.preparationTime} minutes</p>
                <p><strong>Public:</strong> {preview.isPublic ? 'Yes' : 'No'}</p>
                
                {preview.files.length > 0 ? (
                  <div>
                    <h5>Files to Upload:</h5>
                    {preview.files.map((file, index) => (
                      <div key={index} style={{margin: '10px 0', padding: '10px', backgroundColor: 'white', borderRadius: '4px'}}>
                        <p><strong>{file.name}</strong> ({file.size})</p>
                        {file.preview && (
                          <img src={file.preview} alt="Preview" style={{maxWidth: '200px', maxHeight: '150px', objectFit: 'cover'}} />
                        )}
                        {file.type.startsWith('video/') && (
                          <p>🎥 Video file (preview not available)</p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{color: 'orange'}}>⚠️ No files selected - consider adding images or videos to make your journal more engaging!</p>
                )}
              </div>
            );
          })()}
        </div>
      )}

      <h3>Your Journals</h3>
      <div className="journals-list">
        {journals.map((journal) => (
          <div key={journal.id} className="journal-item">
            <h4>{journal.title}</h4>
            <p>{journal.description}</p>
            <p>Prep Time: {journal.preparationTime} minutes</p>
            <p>Public: {journal.isPublic ? 'Yes' : 'No'}</p>
            
            {journal.imageUrls && journal.imageUrls.length > 0 && (
              <div className="journal-images">
                <h5>Images ({journal.imageUrls.length}):</h5>
                {journal.imageUrls.map((url, index) => (
                  <div key={index} style={{margin: '5px'}}>
                    <img 
                      src={url} 
                      alt={`Journal image ${index + 1}`} 
                      width="100" 
                      style={{border: '1px solid #ddd', borderRadius: '4px'}}
                    />
                    <p style={{fontSize: '10px', color: '#666'}}>✓ Stored in Firebase Storage</p>
                  </div>
                ))}
              </div>
            )}
            
            {journal.videoUrl && (
              <div className="journal-video">
                <h5>Video:</h5>
                <video controls width="200" style={{border: '1px solid #ddd', borderRadius: '4px'}}>
                  <source src={journal.videoUrl} />
                  Your browser does not support the video tag.
                </video>
                <p style={{fontSize: '10px', color: '#666'}}>✓ Stored in Firebase Storage</p>
              </div>
            )}
            
            {!journal.imageUrls?.length && !journal.videoUrl && (
              <p style={{color: 'orange', fontStyle: 'italic'}}>⚠️ No media files - consider adding images or videos</p>
            )}
            
            <div className="journal-actions">
              <button onClick={() => handleEdit(journal)}>Edit</button>
              <button onClick={() => handleDelete(journal.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default JournalManager;
