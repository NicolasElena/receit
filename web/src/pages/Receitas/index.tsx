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
        <h1>Receitas</h1>
        <div className='recipes'>
          {recipes.map((recipe) => {
            return <RecipeItem key={recipe.id} recipe={recipe} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Receitas;
