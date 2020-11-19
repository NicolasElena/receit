import React, { useEffect, useState } from 'react';

import './styles.css';
import PageHeader from '../../Components/PageHeader';
import RecipeItem from '../../Components/RecipeItem';
import api from '../../services/api';
import { Recipe } from '../../@types/recipes';

function Receitas() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    api.get('/recipes').then((response) => {
      setRecipes(response.data);
    });
  }, []);

  return (
    <div id='page-recipe' className='container'>
      <PageHeader />

      <div className='page-content'>
        <div className='recipe-search'>
          <h2> Minhas Receitas </h2>
          <input type='search' placeholder='Search' />
          <button> Categorias </button>
        </div>

        <div className='recipes'>
          {recipes.map((recipe) => {
            return <RecipeItem recipe={recipe} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Receitas;
