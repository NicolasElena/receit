import React, { useState } from 'react';
import Input from '../../Components/Input';

import PageHeader from '../../Components/PageHeader';

import './styles.css';

function NewRecipe() {
  const [recipeIngredients, setRecipeIngredients] = useState([
    {
      ingredient: '',
      amount: '',
      measure: '',
    },
  ]);

  function addNewRecipeIngredient() {
    setRecipeIngredients([
      ...recipeIngredients,
      {
        ingredient: '',
        amount: '',
        measure: '',
      },
    ]);
  }

  function setRecipeIngredientValue(
    position: number,
    field: string,
    value: string
  ) {
    const updateRecipeIngredient = recipeIngredients.map(
      (recipeIngredient, index) => {
        if (index === position) {
          return { ...recipeIngredient, [field]: value };
        }
        return recipeIngredient;
      }
    );
    setRecipeIngredients(updateRecipeIngredient);
  }

  return (
    // Criar componente do input e fazer botão "add-new-item" adicionar sua função!
    //o botão deve criar um novo input -> item

    <div id='page-newRecipe' className='container'>
      <PageHeader />

      <div className='nr-page-content'>
        <header>
          {' '}
          <h2> Cadastrar Receita </h2>{' '}
        </header>

        <fieldset className='add-items'>
          <legend>
            <div className='ingredients-items'>
              <h2>Ingredientes</h2>
            </div>
          </legend>

          <div className='item-group'>
            {recipeIngredients.map((recipeIngredient, index) => {
              return (
                <div className='items'>
                  <input
                    name='ingredient'
                    type='text'
                    className='ingrediente'
                    placeholder='Ingrediente'
                    value={recipeIngredient.ingredient}
                    onChange={(e) => {
                      setRecipeIngredientValue(
                        index,
                        'ingredient',
                        e.target.value
                      );
                    }}
                  />
                  <input
                    name='amount'
                    type='amount'
                    className='qtd'
                    placeholder='Qtd'
                    value={recipeIngredient.amount}
                    onChange={(e) =>
                      setRecipeIngredientValue(index, 'amount', e.target.value)
                    }
                  />
                  <input
                    name='measure'
                    placeholder='(g)'
                    className='g'
                    type='measure'
                    value={recipeIngredient.measure}
                    onChange={(e) =>
                      setRecipeIngredientValue(index, 'measure', e.target.value)
                    }
                  />
                </div>
              );
            })}
          </div>
          <button
            type='button'
            className='add-new-item'
            onClick={addNewRecipeIngredient}
          >
            + Novo Ingrediente
          </button>
        </fieldset>

        <fieldset className='txt-div'>
          <legend>
            <h2> Modo de Preparo </h2>
          </legend>
          <textarea
            name='M.D.P'
            id='mdp'
            placeholder='Tempere os filés com sal e pimenta do reino...'
          ></textarea>
        </fieldset>

        <footer>
          {' '}
          <button> Finalizar! </button>{' '}
        </footer>
      </div>
    </div>
  );
}

export default NewRecipe;
