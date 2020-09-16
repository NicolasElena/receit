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
      preparemethod: recipe.preparemethod,
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

export default routes;
