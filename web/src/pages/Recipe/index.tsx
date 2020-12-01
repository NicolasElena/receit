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
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
      <div className='page-content'>
        <div className='nr-page-content'>
          <header>
            {' '}
            <h2> {recipe.name} </h2>{' '}
          </header>
          <div className='name-categories'>
            <div className='categories-container'>
              {recipe.categories.map((category) => {
                return <label>{category.name}</label>;
              })}
            </div>
          </div>
          <fieldset className='image-container'>
            <img src={recipe.images[activeImageIndex].url} alt={recipe.name} />
            <div className='images'>
              {recipe.images.map((img, index) => {
                return (
                  <button
                    key={img.url}
                    className={activeImageIndex === index ? 'active' : ''}
                    type='button'
                    onClick={() => {
                      setActiveImageIndex(index);
                    }}
                  >
                    <img src={img.url} alt={recipe.name} />
                  </button>
                );
              })}
            </div>
          </fieldset>
          <div className='ingredient-prepare'>
            <fieldset className='add-items'>
              <legend>
                <h2>Ingredientes</h2>
              </legend>

              <div>
                {recipe.ingredients.map((recipeIngredient) => {
                  return (
                    <div className='items'>
                      <input
                        name='ingredient'
                        type='text'
                        className='ingrediente'
                        placeholder='Ingrediente'
                        value={recipeIngredient.ingredient}
                        disabled={true}
                      />
                      <input
                        name='amount'
                        type='amount'
                        className='qtd'
                        placeholder='Qtd'
                        value={recipeIngredient.amount}
                        disabled={true}
                      />
                      <input
                        name='measure'
                        placeholder='(g)'
                        className='g'
                        type='measure'
                        value={recipeIngredient.measure}
                        disabled={true}
                      />
                    </div>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className='txt-div'>
              <legend>
                <h2> Modo de Preparo </h2>
              </legend>
              <textarea name='prepareMethod' id='prepareMethod' disabled={true}>
                {recipe.prepare_method}
              </textarea>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullRecipe;
