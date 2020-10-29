import { create } from 'domain';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import { User } from '../model/User';
import userView from '../view/user_view';

export default {
  async create(request: Request, response: Response) {
    const { firstName, lastName, email, password } = request.body;

    const userRepository = getRepository(User);

    const requestImage = request.file as Express.Multer.File;

    const data = {
      firstName,
      lastName,
      email,
      password,
    };

    const schema = Yup.object().shape({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const user = userRepository.create(data);
    await userRepository.save(user);

    console.log(user);
    return response.status(201).json(user);
  },
};
