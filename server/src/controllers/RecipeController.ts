import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import { Recipe } from '../model/Recipe';
import recipeView from '../view/Recipe_view';

export default {
  async create(request: Request, response: Response) {
    const {
      user,
      name,
      public_flag,
      categories,
      recipeIngredient,
      prepare_method,
    } = request.body;

    const recipeRepository = getRepository(Recipe);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    let serializedRecipeIngredient = [];
    let serializedRecipeCategories = [];
    let serializedUser;

    if (Array.isArray(recipeIngredient)) {
      serializedRecipeIngredient = recipeIngredient.map((item) => {
        const jsonItem = JSON.parse(item);
        return jsonItem;
      });
    } else {
      serializedRecipeIngredient.push(JSON.parse(recipeIngredient));
    }

    if (Array.isArray(categories)) {
      serializedRecipeCategories = categories.map((item) => {
        const jsonItem = JSON.parse(item);
        return jsonItem;
      });
    } else {
      serializedRecipeCategories.push(JSON.parse(categories));
    }

    if (Array.isArray(user)) {
      serializedUser = user.map((item) => {
        const jsonItem = JSON.parse(item);
        return jsonItem;
      });
    } else {
      serializedUser = JSON.parse(user);
    }

    console.log(serializedRecipeIngredient);
    console.log(serializedRecipeCategories);
    console.log(serializedUser);

    const data = {
      user: serializedUser,
      name,
      prepare_method,
      recipeIngredient: serializedRecipeIngredient,
      public_flag: public_flag === 'true',
      categories: serializedRecipeCategories,
      images,
    };

    console.log(data);

    const schema = Yup.object().shape({
      user: Yup.object().shape({
        id: Yup.number().required(),
      }),
      name: Yup.string().required(),
      prepare_method: Yup.string().required(),
      public_flag: Yup.boolean().required(),
      recipeIngredient: Yup.array(
        Yup.object().shape({
          ingredient: Yup.string().required(),
          measure: Yup.string().required(),
          amount: Yup.number().required(),
        })
      ),
      categories: Yup.array(
        Yup.object().shape({
          name: Yup.string().required(),
        })
      ),
      image: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    console.log(schema);

    await schema.validate(data, {
      abortEarly: false,
    });

    const recipe = recipeRepository.create(data);
    console.log(recipe);

    await recipeRepository.save(recipe);

    return response.status(201).json(recipe);
  },
  async index(request: Request, response: Response) {
    const recipeRepository = getRepository(Recipe);

    const recipes = await recipeRepository.find({
      relations: ['user', 'recipeIngredient', 'categories', 'images'],
    });

    return response.json(recipeView.renderMany(recipes));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const recipesRepository = getRepository(Recipe);

    console.log(id);
    console.log(recipesRepository);

    const recipe = await recipesRepository.findOneOrFail(id, {
      relations: ['user', 'recipeIngredient', 'categories', 'images'],
    });

    return response.json(recipeView.render(recipe));
  },

  async indexUserRecipes(request: Request, response: Response) {
    const { id } = request.params;
    const recipesRepository = getRepository(Recipe);

    console.log(id);
    console.log(recipesRepository);

    const recipe = await recipesRepository.find({
      relations: ['recipeIngredient', 'categories', 'images'],
      where: { user: { id: id } },
    });

    return response.json(recipeView.renderMany(recipe));
  },
};
