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

    interface Recipes {
      id: number;
      owner: number;
      name: string;
      recipe: string;
      ingredients: [
        {
          ingredient: string;
          amount: number;
          measure: string;
        }
      ];
    }

    interface Ingredient {
      ingredient: string;
      amount: number;
      measure: string;
    }

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
    interface Recipe {
      id: number;
      owner: number;
      name: string;
      recipe: string;
      ingredients: Array<Ingredient>;
    }

    interface Ingredient {
      ingredient: string;
      amount: number;
      measure: string;
    }

    interface TempRecipeIngredient {
      id: number;
      owner: number;
      name: string;
      recipe: string;
      ingredient: string;
      amount: number;
      measure: string;
    }

    const trx = await knex.transaction();

    await knex
      .select<[TempRecipeIngredient]>([
        'recipes.id',
        'recipes.name',
        'recipes.recipe',
        'ingredients.ingredient',
        'recipe_ingredients.amount',
        'measures.measure',
      ])
      .from('recipes')
      .innerJoin(
        'recipe_ingredients',
        'recipes.id',
        'recipe_ingredients.recipe_id'
      )
      .innerJoin(
        'ingredients',
        'recipe_ingredients.ingredient_id',
        'ingredients.id'
      )
      .innerJoin('measures', 'recipe_ingredients.measure_id', 'measures.id')
      .then((data) => {
        //console.log(data);

        let serializedRecipe: Array<Recipe> = [];
        // let uniqueRecipes: Array<Recipe> = [];

        function returnObjectIngredient(column: number): Array<Ingredient> {
          const filteredObjectIngredients: Array<Ingredient> = [];

          data.map((recipe: TempRecipeIngredient) => {
            if (recipe.id == column)
              filteredObjectIngredients.push({
                ingredient: recipe.ingredient,
                amount: recipe.amount,
                measure: recipe.measure,
              });
          });
          return filteredObjectIngredients;
        }

        // map para inserir os diversos ingredientes como objeto dentro de outro

        data.map((recipe) => {
          //console.log(recipe);
          // console.log(returnObjectIngredient(recipe.id));
          serializedRecipe.push({
            id: recipe.id,
            owner: recipe.owner,
            name: recipe.name,
            recipe: recipe.recipe,
            ingredients: returnObjectIngredient(recipe.id),
          });
        });

        // remover duplicidades

        const uniqueRecipes = Array.from(
          new Set(serializedRecipe.map((a) => a.id))
        ).map((id) => {
          return serializedRecipe.find((a) => a.id === id);
        });

        //retorno para a api com os objetos estruturados

        console.log(uniqueRecipes);
        return response.json(uniqueRecipes);
      });
  }
}

export default RecipesController;
