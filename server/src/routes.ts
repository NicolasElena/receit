import express, { response } from 'express';
import knex from './database/connection';
import UsersController from './controllers/UsersControllers';
import RecipeController from './controllers/RecipesController';

const routes = express.Router();
const usersController = new UsersController();
const recipeController = new RecipeController();

routes.get('/', (request, response) => {
  return response.json({ message: 'oi' });
});

routes.get('/recipes/:id', recipeController.show);

routes.get('/recipes', recipeController.index);

routes.get('/recipess', async (request, response) => {
  const trx = await knex.transaction();

  const serializedRecipes = await knex
    .select('*')
    .from('recipes')
    .then(async (recipe) => {
      console.log(recipe);
      const id = recipe.map;

      const ingredients = await knex('recipe_ingredients')
        .select(
          'ingredients.ingredient',
          'recipe_ingredients.amount',
          'measures.measure'
        )
        .innerJoin(
          'ingredients',
          'recipe_ingredients.ingredient_id',
          'ingredients.id'
        )
        .innerJoin('measures', 'recipe_ingredients.measure_id', 'measures.id')
        .where('recipe_id', recipe);

      return {
        //retornar aqui a estrutura do json?
      };
    });

  return response.json(serializedRecipes);
});

routes.post('/users', usersController.create);

routes.post('/recipes', recipeController.create);

routes.get('/ingredient', recipeController.listIng);

export default routes;
