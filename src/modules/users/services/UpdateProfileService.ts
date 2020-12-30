import { inject, injectable } from 'tsyringe';

import AppError from "@shared/errors/AppError";
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProviders';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfile {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { };

  public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found');
    }

    const userWithRequestedEmail = await this.usersRepository.findByEmail(email);

    if (userWithRequestedEmail && user.id !== userWithRequestedEmail.id) {
      throw new AppError('email already in use');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('add current password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      )

      if (!checkOldPassword) {
        throw new AppError('incorrect current password')
      }
    }

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);;
  }
}

export default UpdateProfile;