import { Request, Response } from 'express';
import knex from '../database/connection';

class RecipesController {
  async create(request: Request, response: Response) {
    const { recipe, owner, name, ingredients } = request.body;

    const trx = await knex.transaction();

    const recipes = {
      name,
      recipe,
      owner,
    };

    await trx('recipes')
      .insert(recipes)
      .returning('id')
      .then(async (id) => {
        const recipeIngredients = ingredients.map(
          (recipeIngredient: {
            ingredient: string;
            measure: number;
            amount: number;
          }) => {
            //resolver o cadastro dos ingredientes aqui
            // if tem, usa o q tem, se nao cria um novo
            return {
              recipe_id: Number(id),
              ingredient_id: recipeIngredient.ingredient,
              measure_id: recipeIngredient.measure,
              amount: recipeIngredient.amount,
            };
          }
        );
        await trx('recipe_ingredients').insert(recipeIngredients);

        await trx.commit();
        return response.json(recipeIngredients);
      })
      .catch(() => {
        console.log('errão');
      });
  }
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const recipe = await knex('recipes').select('*').where('id', id);

    if (!recipe) {
      return response.status(400).json({ message: 'Receita não encontrada' });
    }

    const ingredients = await knex('ingredients')
      .join(
        'recipe_ingredients',
        'ingredients.id',
        'recipe_ingredients.ingredient_id'
      )
      .join('measures', 'recipe_ingredients.measure_id', 'measures.id')
      .where('recipe_ingredients.recipe_id', id)
      .select(
        'ingredients.ingredient',
        'recipe_ingredients.amount',
        'measures.measure'
      );

    recipe.push(ingredients);
    return response.json({ recipe });
  }

  async index(request: Request, response: Response) {
    const trx = await knex.transaction();

    interface Recipes {
      id: number;
      name: string;
      recipe: string;
      owner: number;
    }

    const recipes = await knex.select('*').from<Recipes>('recipes');

    const recipeIngredient = recipes.map((recipe) => {
      console.log(recipe.id);
    });
    return response.json({ recipes });
  }
}

export default RecipesController;
