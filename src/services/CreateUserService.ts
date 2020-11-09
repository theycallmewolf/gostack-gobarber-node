import User from '../models/User';
import { getRepository } from 'typeorm';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkEmailExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new Error('Email address already exists');
    }

    const user = usersRepository.create({
      name,
      email,
      password
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;