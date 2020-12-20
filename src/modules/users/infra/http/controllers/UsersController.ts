// a controller should have 5 methods max: index, show, create, update, delete
// if you feel the need of creating more than this 5 ones, you probably should create another controller

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ user: userWithoutPassword });
  }
}