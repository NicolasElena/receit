import express, { response } from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'oi' });
});

routes.get('/recipes', async (request, response) => {
  const recipes = await knex('recipes').select('*');

  const serializedItems = recipes.map((recipe) => {
    return {
      name: recipe.name,
      ingredients: recipe.ingredients,
      owner: recipe.owner,
    };
  });

  return response.json(recipes);
});

routes.post('/users', async (request, response) => {
  const { email, password, name } = request.body;

  await knex('users').insert({
    name,
    email,
    password,
  });

  return response.json({ success: 'Usuário registado' });
});

routes.post('/recipes', async (request, response) => {
  const { recipe, owner, name } = request.body;

  await knex('recipes')
    .insert({
      name,
      recipe,
      owner,
    })
    .returning('id')
    .then((id) => {
      console.log(id);
    });

  return response.json({ success: 'Usuário registado' });
});

routes.post('/recipeee', async (request, response) => {
  const { recipe, owner, name, ingredients } = request.body;
  // OWNER = useState armazenando o usuário logado
  //rota para cadastrar tudão

  const trx = await knex.transaction();

  const idRecipe = await trx('recipes').insert({
    name,
    recipe,
    owner,
  });

  const recipe_id = idRecipe[0];

  console.log(recipe_id);

  //inserção da tabela que relaciona tudo
  const recipeIngredients = ingredients.map(
    (recipeIngredient: {
      ingredient: number;
      measure: number;
      amount: number;
    }) => {
      return {
        recipe_id,
        ingredient_id: recipeIngredient.ingredient,
        measure_id: recipeIngredient.measure,
        amount: recipeIngredient.amount,
      };
    }
  );

  await trx('recipe_ingredients').insert(recipeIngredients);

  console.log(recipeIngredients);

  return response.json({ success: 'Usuário registado' });
});

routes.post('/ingredients', async (request, response) => {
  const { ingredient } = request.body;

  await knex('ingredients').insert({
    ingredient,
  });

  return response.json({ success: 'Usuário registado' });
});

export default routes;
