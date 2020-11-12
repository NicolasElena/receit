import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../model/User';

import bcrypt from 'bcryptjs';

export default {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return response.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.sendStatus(401);
    }

    // token jwt para validação
  },
};
