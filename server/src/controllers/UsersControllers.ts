import { Request, Response } from 'express';
import knex from '../database/connection';

class UserController {
  async create(request: Request, response: Response) {
    const { email, password, name } = request.body;

    const user = {
      name,
      email,
      password,
    };

    await knex('users').insert(user);
    return response.json({
      ...user,
    });
  }
}

export default UserController;
