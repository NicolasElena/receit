import React from 'react';

import './styles.css';

// import recipeImg from '../../assets/Images/Media.png';

import forkImg from '../../assets/Images/Fork.png';
import likeImg from '../../assets/Images/Like.png';
import cookImg from '../../assets/Images/Cook.png';
import { Recipe } from '../../@types/recipes';
import { Link, useParams } from 'react-router-dom';
import history from '../../history';

interface RecipeProps {
  recipe: Recipe;
}

interface UserParams {
  id: string;
}

const RecipeItem: React.FC<RecipeProps> = ({ recipe }) => {
  const params = useParams<UserParams>();
  function linkUserRecipes(recipeUserID: string) {
    if (recipeUserID === params.id) {
      history.push(`/user/${params.id}`);
    } else {
      history.push(`receitas/user/${recipeUserID}`);
    }
  }

  return (
    <article className='recipe-item'>
      <div className='recipe-image'>
        <img src={recipe.images[0].url} alt='Recipe' />
      </div>

      <h3>{recipe.name} </h3>
      <div className='recipe-categories'>
        {recipe.categories.slice(0, 2).map((category) => {
          return (
            <div key={category.name} className='recipe-category'>
              {' '}
              '{category.name}'{' '}
            </div>
          );
        })}
      </div>
      <div className='recipe-ingredients-user'>
        <div className='recipe-ingredients'>
          {recipe.ingredients.slice(0, 3).map((ingredient) => {
            return (
              <div key={ingredient.ingredient} className='recipe-ingredient'>
                -{ingredient.ingredient}
              </div>
            );
          })}
        </div>
        <div className='recipe-user'>
          <button className='Fork'>
            <Link to={`/recipes/${recipe.id}`}>
              <img src={forkImg} alt='Fork' />
            </Link>
          </button>
          <button>
            <img src={likeImg} alt='Like' />
          </button>
        </div>
      </div>
      <footer>
        <button
          className='cook'
          onClick={() => linkUserRecipes(recipe.user_id.toString())}
        >
          <img src={cookImg} alt='cook' />
          {recipe.user}
        </button>
      </footer>
    </article>
  );
};

export default RecipeItem;
