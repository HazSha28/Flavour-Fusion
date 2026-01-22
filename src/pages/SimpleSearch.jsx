// src/pages/SimpleSearch.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import '../index.css';

const SimpleSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(`Search query received: "${query}"`);
  }, [query]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🔍 Simple Search</h1>
      <p>{message}</p>
      <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px', margin: '1rem 0' }}>
        <h3>Debug Info:</h3>
        <p>Query: "{query}"</p>
        <p>Component Status: ✅ Working</p>
      </div>
    </div>
  );
};

export default SimpleSearch;
