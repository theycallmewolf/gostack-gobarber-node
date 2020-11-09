import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<{ user: User }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email }
    })

    if (!user) {
      throw new Error('wrong email/password combination');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('wrong email/password combination');
    }

    // user is now authenticated

    return { user };
  };
}

export default AuthenticateUserService;