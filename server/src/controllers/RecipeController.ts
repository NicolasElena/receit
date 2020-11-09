import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import { Recipe } from '../model/Recipe';
import { RecipeImage } from '../model/RecipeImage';
import recipeingredient_view from '../view/recipeingredient_view';
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

    console.log(serializedRecipeIngredient);
    console.log(serializedRecipeCategories);

    const data = {
      user,
      name,
      prepare_method,
      recipeIngredient: serializedRecipeIngredient,
      public_flag: public_flag === 'true',
      categories: serializedRecipeCategories,
      images,
    };

    console.log(data);

    const schema = Yup.object().shape({
      user: Yup.number().required(),
      name: Yup.string().required(),
      prepare_method: Yup.string().required(),
      public_flag: Yup.boolean().required(),
      recipeIngredient: Yup.array(
        Yup.object().shape({
          ingredient: Yup.object().shape({
            name: Yup.string().required(),
          }),
          measure: Yup.object().shape({
            name: Yup.string().required(),
          }),
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

    await schema.validate(data, {
      abortEarly: false,
    });

    const recipe = recipeRepository.create(data);

    console.log(recipe);

    await recipeRepository.save(recipe);

    return response.status(201).json(recipe);
  },
  // async index(request: Request, response: Response) {
  //   const usersRepository = getRepository(User);

  //   const users = await usersRepository.find({
  //     relations: ['recipes', 'image'],
  //   });

  //   return response.json(userView.renderMany(users));
  // },
  // async show(request: Request, response: Response) {
  //   const { id } = request.params;
  //   const usersRepository = getRepository(User);

  //   const user = await usersRepository.findOneOrFail(id, {
  //     relations: ['recipes', 'image'],
  //   });

  //   return response.json(userView.render(user));
  // },
};
