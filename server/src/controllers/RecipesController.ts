import { Request, Response } from 'express';
import knex from '../database/connection';

class RecipesController {
  async create(request: Request, response: Response) {
    const { recipe, owner, name, ingredients } = request.body;

    const trx = await knex.transaction();

    await trx('recipes')
      .insert({
        name,
        recipe,
        owner,
      })
      .returning('id')
      .then(async (id) => {
        console.log(id);
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

        return response.json({ success: 'Usuário registado' });
      })
      .catch(() => {
        console.log('errão');
      });
  }
}

export default RecipesController;
