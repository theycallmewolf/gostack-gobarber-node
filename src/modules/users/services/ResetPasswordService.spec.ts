import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    );
  })

  it('should be able to reset the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Fake Dude',
      email: 'fake@theycallmewolf.com',
      password: 'fake-password',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: 'new-fake-password',
      token
    })

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('new-fake-password');
    expect(updatedUser?.password).toBe('new-fake-password');
  });

  it('shouldn\'t be able to reset the password without a token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: 'password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shouldn\'t be able to reset the password of a non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existing-user-id');

    await expect(
      resetPasswordService.execute({
        token,
        password: 'fake-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shouldn\'t be able to reset the password 2 hours after request', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Fake Dude',
      email: 'fake@theycallmewolf.com',
      password: 'fake-password',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    })

    await expect(
      resetPasswordService.execute({
        password: 'new-fake-password',
        token
      })
    ).rejects.toBeInstanceOf(AppError);
  });

});