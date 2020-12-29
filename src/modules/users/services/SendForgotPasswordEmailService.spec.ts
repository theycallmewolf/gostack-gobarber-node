// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import AppError from '@shared/errors/AppError';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using his email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    await fakeUsersRepository.create({
      name: 'Fake Dude',
      email: 'fake@theycallmewolf.com',
      password: 'fake-password',
    });

    await sendForgotPasswordEmail.execute({
      email: 'fake@theycallmewolf.com',
    })

    expect(sendMail).toHaveBeenCalled();
  })

  it('shouldn\'t be able to recover a non-existing user password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider
    );

    await expect(sendForgotPasswordEmail.execute({
      email: 'fake@theycallmewolf.com',
    })).rejects.toBeInstanceOf(AppError);

  })

})