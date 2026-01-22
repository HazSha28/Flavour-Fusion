import React from 'react';
import RecipeCard from './RecipeCard';


const RecipeSection = ({ title, id, recipes }) => {
  return (
    <>
      <div id={id} className="main">
        <h4>{title}</h4>
      </div>
      <div className="parent">
        {recipes.map((recipe, index) => (
          <RecipeCard
            key={index}
            id={recipe.id}
            image={recipe.image}
            title={recipe.title}
            subtitle={recipe.subtitle}
            price={recipe.price}
            link={recipe.link}
            cookTime={recipe.cookTime}
            prepTime={recipe.prepTime}
            difficulty={recipe.difficulty}
            rating={recipe.rating}
          />
        ))}
      </div>
    </>
  );
};

export default RecipeSection;
