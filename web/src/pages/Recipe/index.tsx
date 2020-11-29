import React, { useEffect, useState } from 'react';

import './styles.css';
import PageHeader from '../../Components/PageHeader';
import api from '../../services/api';
import { Recipe } from '../../@types/recipes';
import { useParams } from 'react-router-dom';

interface RecipeParams {
  id: string;
}

function FullRecipe() {
  const params = useParams<RecipeParams>();
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    api.get(`/recipes/${params.id}`).then((response) => {
      setRecipe(response.data);
    });
  }, [params.id]);

  if (!recipe) {
    return <p> Carregando </p>; //retorar uma load screen/spinner
  }

  return (
    <div id='page-recipe' className='container'>
      <PageHeader />
      <div className='page-content'></div>
    </div>
  );
}

export default FullRecipe;
