import React from 'react';

import './styles.css';

// import recipeImg from '../../assets/Images/Media.png';

import forkImg from '../../assets/Images/Fork.png';
import likeImg from '../../assets/Images/Like.png';
import cookImg from '../../assets/Images/Cook.png';
import { Recipe } from '../../@types/recipes';
import { Link } from 'react-router-dom';

interface RecipeProps {
  recipe: Recipe;
}

const RecipeItem: React.FC<RecipeProps> = ({ recipe }) => {
  return (
    <article className='recipe-item'>
      <div className='recipe-image'>
        <img src={recipe.images[0].url} alt='Recipe' />
      </div>

      <h3>{recipe.name} </h3>
      <div className='recipe-things'>
        {recipe.categories.map((category) => {
          return (
            <div key={category.name} className='recipe-category'>
              {' '}
              '{category.name}'{' '}
            </div>
          );
        })}
        {recipe.ingredients.slice(0, 2).map((ingredient) => {
          return (
            <div key={ingredient.ingredient} className='recipe-ingredients'>
              -{ingredient.ingredient}
            </div>
          );
        })}
      </div>
      <footer>
        <button className='cook'>
          <img src={cookImg} alt='cook' />
          {recipe.user}
        </button>
        <button className='Fork'>
          <Link to={`/recipes/${recipe.id}`}>
            <img src={forkImg} alt='Fork' />
          </Link>
        </button>
        <button>
          <img src={likeImg} alt='Like' />
        </button>
      </footer>
    </article>
  );
};

export default RecipeItem;
