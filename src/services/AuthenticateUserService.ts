import User from '../models/User';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
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
    const token = sign({}, '37a32992d68187ccd74ee4eb6f8c94ca', {
      subject: user.id,
      expiresIn: '1d'
    });

    return { user, token };
  };
}

export default AuthenticateUserService;