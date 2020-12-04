import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../model/User';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return response.status(401).json({ message: 'usuário invalido' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.status(401).json({ message: 'invalid password' });
    }

    // token jwt para validação, segundo parâmetro arquivo/info crítica

    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      'receit',
      { expiresIn: '1d' }
    );

    return response.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token,
    });
  },
};
