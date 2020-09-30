import { json, Request, Response } from 'express';
import knex from '../database/connection';

class RecipesController {
  async create(request: Request, response: Response) {
    interface Ingredient {
      id: number;
      ingredient: string;
      amount: number;
      measure: string;
    }

    //const ingredients = request.body.ingredientes as Array<Ingredient>;
    const { recipe, owner, name, ingredients } = request.body;

    const trx = await knex.transaction();

    const recipes = {
      name,
      recipe,
      owner,
    };
    //ingredients.map();

    await trx('recipes')
      .insert(recipes)
      .returning('id')
      .then(async (id) => {
        const recipeIngredients = ingredients.map(
          (recipeIngredient: {
            ingredient: string;
            measure: string;
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
      .where('recipes.id', id)
      .then((data) => {
        //console.log(data);

        let serializedRecipe: Array<Recipe> = [];

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
  async listIng(request: Request, response: Response) {
    interface Ingredient {
      id: number;
      name: string;
    }
    const { ingredients } = request.body;

    // you can sequence queries
    function ingredient_get(ingredient: string) {
      knex('ingredients')
        .select('id')
        .select('ingredient')
        .where('ingredient', ingredient)
        .then((rows: any) => {
          if (!rows.length) return null;
          return rows[0];
        })
        .then(async (name: Ingredient) => {
          console.log(name);
          if (name) {
            console.log('tem valor no banco');
            return name;
          } else {
            console.log('não tem valor no banco');
            await knex('ingredients')
              .insert({ ingredient })
              .returning('id')
              .then((id) => {
                console.log(id);
              });
          }
        });
    }
    const serializedIngredients: any = [];
    ingredients.map((item: Ingredient) => {
      ingredient_get(item.name);
      console.log(serializedIngredients);
    });
    // return response.json(serializedIngredients);
  }
}

export default RecipesController;
