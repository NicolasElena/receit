import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import { User } from '../model/User';
import { UserImage } from '../model/UserImage';
import userView from '../view/user_view';

export default {
  async create(request: Request, response: Response) {
    const { firstName, lastName, email, password } = request.body;

    const userRepository = getRepository(User);

    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) {
      return response.status(409).json({ message: 'E-mail já cadastrado' });
    }

    const requestImage = request.file as Express.Multer.File;

    const image = new UserImage();

    image.path = requestImage.filename;

    const data = {
      firstName,
      lastName,
      email,
      password,
      image,
    };

    console.log(data);
    const schema = Yup.object().shape({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      image: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = userRepository.create(data);

    await userRepository.save(user);

    return response.status(201).json(user);
  },
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { firstName, lastName, email, password } = request.body;

    console.log(firstName, lastName, email, password);

    const usersRepository = getRepository(User);

    try {
      const userUpdate = await usersRepository.findOne(id);

      console.log(userUpdate);

      usersRepository.save({
        ...userUpdate,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });

      return response.json({ message: 'user atualizado', user: userUpdate });
    } catch {
      return response.json({ message: 'falha ao atualizar' });
    }
  },
  async index(request: Request, response: Response) {
    const usersRepository = getRepository(User);

    console.log(request.userId);

    const users = await usersRepository.find({
      relations: ['recipes', 'image'],
    });

    return response.json(userView.renderMany(users));
  },
  async show(request: Request, response: Response) {
    const { id } = request.params;

    const usersRepository = getRepository(User);
    try {
      const user = await usersRepository.findOneOrFail(id, {
        relations: ['recipes', 'image'],
      });
      return response.json(userView.render(user));
    } catch {
      return response.json({ message: 'Usuário inválido' });
    }
  },
  async showUserRecipes(request: Request, response: Response) {
    const { id } = request.params;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOneOrFail(id, {
      relations: [
        'recipes',
        'image',
        'recipes.categories',
        'recipes.recipeIngredient',
        'recipes.images',
      ],
    });

    return response.json(userView.renderRecipes(user));
  },
};
