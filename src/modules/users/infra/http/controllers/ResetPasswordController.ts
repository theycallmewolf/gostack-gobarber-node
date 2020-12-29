// a controller should have 5 methods max: index, show, create, update, delete
// if you feel the need of creating more than this 5 ones, you probably should create another controller

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = container.resolve(
      ResetPasswordService
    );

    await resetPassword.execute({
      password,
      token,
    });

    return response.status(204).json();
  }

}