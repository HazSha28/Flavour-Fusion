import React, { useState, useEffect } from 'react';
import { FaRobot, FaKey, FaSave, FaEye, FaEyeSlash } from 'react-icons/fa';
import { setGrokApiKey, getGrokApiKey, isGrokConfigured } from '../services/grokService';
import '../styles/GrokSearch.css';

const GrokApiKeySetup = ({ onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const currentKey = getGrokApiKey();
    if (currentKey) {
      setApiKey(currentKey);
    }
  }, []);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      setError('API key cannot be empty');
      return;
    }

    if (!apiKey.startsWith('xai-')) {
      setError('Invalid API key format. Grok API keys should start with "xai-"');
      return;
    }

    setIsSaving(true);
    setError('');
    setSuccess('');

    try {
      setGrokApiKey(apiKey.trim());
      setSuccess('API key saved successfully!');
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    } catch (error) {
      setError('Failed to save API key');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    setApiKey('');
    setError('');
    setSuccess('');
    localStorage.removeItem('grok_api_key');
  };

  return (
    <div className="grok-api-setup">
      <div className="grok-api-modal">
        <div className="grok-api-header">
          <h3>
            <FaRobot className="grok-icon" />
            Configure Grok API
          </h3>
          <p>Set up your Grok API key to enable AI-powered recipe discovery</p>
        </div>

        <div className="grok-api-body">
          <div className="api-key-input-group">
            <label htmlFor="api-key">
              <FaKey className="key-icon" />
              API Key
            </label>
            <div className="input-wrapper">
              <input
                id="api-key"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="xai-..."
                className="api-key-input"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="toggle-visibility-btn"
                title={showKey ? 'Hide API key' : 'Show API key'}
              >
                {showKey ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {error && (
            <div className="api-error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="api-success-message">
              {success}
            </div>
          )}

          <div className="api-help-text">
            <h4>How to get your Grok API key:</h4>
            <ol>
              <li>Visit the <a href="https://console.x.ai/" target="_blank" rel="noopener noreferrer">X.ai Console</a></li>
              <li>Sign in or create an account</li>
              <li>Navigate to the API section</li>
              <li>Generate a new API key</li>
              <li>Copy the key and paste it above</li>
            </ol>
          </div>
        </div>

        <div className="grok-api-footer">
          <button
            onClick={handleClear}
            className="clear-btn"
            disabled={isSaving}
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            className="save-btn"
            disabled={isSaving || !apiKey.trim()}
          >
            {isSaving ? (
              <>
                <FaSpinner className="spinner" />
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save API Key
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrokApiKeySetup;
