import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;


describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository
    );
  })

  it('should be able to recover the password using his email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'Fake Dude',
      email: 'fake@theycallmewolf.com',
      password: 'fake-password',
    });

    await sendForgotPasswordEmail.execute({
      email: 'fake@theycallmewolf.com',
    })

    expect(sendMail).toHaveBeenCalled();
  });

  it('shouldn\'t be able to recover a non-existing user password', async () => {
    jest.spyOn(fakeMailProvider, 'sendMail');

    await expect(sendForgotPasswordEmail.execute({
      email: 'fake@theycallmewolf.com',
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Fake Dude',
      email: 'fake@theycallmewolf.com',
      password: 'fake-password',
    });

    await sendForgotPasswordEmail.execute({
      email: 'fake@theycallmewolf.com',
    })

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });

})