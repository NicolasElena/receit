import React, { ChangeEvent, FormEvent, useState } from 'react';
import Input from '../../Components/Input';

import PageHeader from '../../Components/PageHeader';

import { FiPlus } from 'react-icons/fi';

import './styles.css';
import Select from '../../Components/Select';
import { useAuth } from '../../Context/auth';

function NewRecipe() {
  const { user, CreateRecipe } = useAuth();

  const [recipeName, setRecipeName] = useState('');
  const [prepareMethod, setPrepareMethod] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState([
    {
      ingredient: '',
      measure: '',
      amount: '',
    },
  ]);
  const [categories, setCategories] = useState([
    {
      name: '',
    },
  ]);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  async function handleCreateRecipe(e: FormEvent) {
    e.preventDefault();

    //validação caso necessário
    let tempUserId;
    if (user) {
      tempUserId = {
        id: user.id,
      };
    }

    const data = new FormData();

    data.append('name', recipeName);
    data.append('user', JSON.stringify(tempUserId));
    data.append('prepare_method', prepareMethod);
    recipeIngredients.forEach((recipeIngredient) => {
      const temp = JSON.stringify(recipeIngredient);
      data.append('recipeIngredient', temp);
    });
    categories.forEach((category) => {
      const temp = JSON.stringify(category);
      data.append('categories', temp);
    });
    images.forEach((image) => {
      data.append('images', image);
    });

    CreateRecipe(data);
  }

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

  function addNewCategory() {
    setCategories([
      ...categories,
      {
        name: '',
      },
    ]);
  }

  function removeLastCategory() {
    const index = categories.length;
    setCategories([...categories.slice(0, index - 1)]);
  }

  function removeRecipeIngredient(index: number) {
    setRecipeIngredients([
      ...recipeIngredients.slice(0, index),
      ...recipeIngredients.slice(index + 1),
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

  function setCategoriesValue(position: number, field: string, value: string) {
    const updateCategories = categories.map((recipeIngredient, index) => {
      if (index === position) {
        return { ...recipeIngredient, [field]: value };
      }
      return recipeIngredient;
    });
    setCategories(updateCategories);
  }

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const selectedImages = Array.from(e.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  return (
    <div id='page-newRecipe' className='container'>
      <PageHeader />

      <div className='nr-page-content'>
        <header>
          {' '}
          <h2> Cadastrar Receita </h2>{' '}
        </header>
        <form onSubmit={handleCreateRecipe}>
          <div className='name-categories'>
            <input
              name='recipeName'
              type='text'
              className='recipeName'
              placeholder='Nome da Receita'
              value={recipeName}
              onChange={(e) => {
                setRecipeName(e.target.value);
              }}
            />
            <div className='categories-container'>
              {categories.map((category, index) => {
                return (
                  <Select
                    name='category'
                    label='Categoria(s)'
                    value={category.name}
                    onChange={(e) => {
                      setCategoriesValue(index, 'name', e.target.value);
                    }}
                    options={[
                      { value: { name: 'Carne' }, label: 'Carne' },
                      { value: { name: 'Vegetariana' }, label: 'Vegetariana' },
                      { value: { name: 'Doce' }, label: 'Doce' },
                    ]}
                  />
                );
              })}
              <button
                type='button'
                className='add-category'
                onClick={addNewCategory}
              >
                +
              </button>
              <button
                type='button'
                className='remove-category'
                onClick={removeLastCategory}
              >
                -
              </button>
            </div>
          </div>
          <div className='ingredient-prepare'>
            <fieldset className='add-items'>
              <legend>
                <h2>Ingredientes</h2>
              </legend>

              <div>
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
                          setRecipeIngredientValue(
                            index,
                            'amount',
                            e.target.value
                          )
                        }
                      />
                      <input
                        name='measure'
                        placeholder='(g)'
                        className='g'
                        type='measure'
                        value={recipeIngredient.measure}
                        onChange={(e) =>
                          setRecipeIngredientValue(
                            index,
                            'measure',
                            e.target.value
                          )
                        }
                      />
                      <button
                        type='button'
                        className='remove-item'
                        onClick={() => removeRecipeIngredient(index)}
                      >
                        {' '}
                        -
                      </button>
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
                name='prepareMethod'
                id='prepareMethod'
                placeholder='Tempere os filés com sal e pimenta do reino...'
                onChange={(e) => setPrepareMethod(e.target.value)}
              ></textarea>
            </fieldset>
          </div>

          <fieldset className='recipe-images'>
            <div className='images-container'>
              {previewImages.map((image) => {
                return <img key={image} src={image} alt={recipeName} />;
              })}

              <label htmlFor='image[]' className='new-image'>
                <FiPlus size={25} color='#00af54' />
              </label>
            </div>
            <div className='file-upload'>
              <input
                className='btn-img'
                type='file'
                id='image[]'
                multiple
                onChange={handleSelectImages}
              />
            </div>
          </fieldset>

          <footer>
            {' '}
            <button type='submit'> Finalizar! </button>{' '}
          </footer>
        </form>
      </div>
    </div>
  );
}

export default NewRecipe;
