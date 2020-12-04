import React, { useEffect, useState } from 'react';

import './styles.css';
import PageHeader from '../../Components/PageHeader';
import RecipeItem from '../../Components/RecipeItem';
import api from '../../services/api';
import { Recipe } from '../../@types/recipes';
import { useParams } from 'react-router-dom';

interface UserParams {
  id: string;
}

const Receitas: React.FC = () => {
  const params = useParams<UserParams>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    console.log(params);

    if (params.id) {
      api.get(`/user/recipes/${params.id}`).then((response) => {
        setRecipes(response.data);
      });
    } else {
      api.get('/recipes').then((response) => {
        setRecipes(response.data);
      });
    }
  }, [params, params.id]);

  return (
    <div id='page-recipe' className='container'>
      <PageHeader />
      <div className='page-tag'>
        <h1>Receitas</h1>
      </div>
      <div className='page-content'>
        <div className='recipes'>
          {recipes.map((recipe) => {
            return <RecipeItem key={recipe.id} recipe={recipe} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Receitas;
