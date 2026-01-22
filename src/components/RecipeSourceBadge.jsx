// src/components/RecipeSourceBadge.jsx
import React from 'react';

const RecipeSourceBadge = ({ source, className = '' }) => {
  const badges = {
    spoonacular: {
      label: 'Spoonacular',
      color: '#4CAF50',
      icon: '🌍',
      description: 'Recipe from Spoonacular database'
    },
    user: {
      label: 'Community',
      color: '#2196F3', 
      icon: '👥',
      description: 'User-created recipe'
    },
    home: {
      label: 'Featured',
      color: '#FF9800',
      icon: '⭐',
      description: 'Featured recipe'
    },
    local: {
      label: 'Local',
      color: '#9C27B0',
      icon: '🏠',
      description: 'Local recipe'
    }
  };

  const badge = badges[source] || badges.local;

  return (
    <span 
      className={`recipe-source-badge ${className}`}
      style={{ backgroundColor: badge.color }}
      title={badge.description}
    >
      <span className="badge-icon">{badge.icon}</span>
      <span className="badge-label">{badge.label}</span>
    </span>
  );
};

export default RecipeSourceBadge;
