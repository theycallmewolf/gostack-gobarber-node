import { inject, injectable } from 'tsyringe';

// import AppError from '@shared/errors/AppError';
// import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';


interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('userTokensRepository')
    private userTokensRepository: IUserTokensRepository,

  ) { };

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('user not found');
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'pedido de recuperação de palavra-passe recebida');
  }
}

export default SendForgotPasswordEmailService;