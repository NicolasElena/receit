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

routes.get('/recipes', async (request, response) => {
  const recipes = await knex('recipes').select('*');

  const serializedRecipes = recipes.map((recipe) => {
    return {
      id: recipe.id,
      name: recipe.name,
      recipe: recipe.recipe,
      owner: recipe.owner,
    };
  });
  return response.json(serializedRecipes);
});

// routes.get('/recipess', async (request, response) => {
//   const trx = await knex.transaction();

//   const serialiedRecipes = await trx('recipes')
//     .select('*')
//     .then((recipe) => {
//       console.log(recipe);
//       //montar o .map aqui das recipes, pegar os IDs e buscar as outras infos

//       //

//       return {
//         //retornar aqui a estrutura do json?
//       };
//     });

//   // console.log(recipes);

//   // const completedRecipes = recipes.map(async (recipe) => {
//   //   // para cada recipe buscada, procurar na tabela pivot os ingredients com measure e amount ???
//   //   const ingredients = await trx('recipe_ingredients')
//   //     .select(
//   //       'ingredients.ingredient',
//   //       'recipe_ingredients.amount',
//   //       'measures.measure'
//   //     )
//   //     .innerJoin(
//   //       'ingredients',
//   //       'recipe_ingredients.ingredient_id',
//   //       'ingredients.id'
//   //     )
//   //     .innerJoin('measures', 'recipe_ingredients.measure_id', 'measures.id')
//   //     .where('recipe_id', recipe.id);

//   //   return {
//   //     recipe_id: recipe.id,
//   //     name: recipe.name,
//   //     recipe,
//   //   };
//   // });
//
//   return response.json(serialiedRecipes);
// });

routes.post('/users', usersController.create);

routes.post('/recipes', recipeController.create);

routes.post('/ingredients', async (request, response) => {
  const { ingredient } = request.body;

  await knex('ingredients').insert({
    ingredient,
  });

  return response.json({ success: 'Usuário registado' });
});

export default routes;
