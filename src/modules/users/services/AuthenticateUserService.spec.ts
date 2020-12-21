import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able to authenticate a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'Joker',
      email: 'joker@arkamasylum.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'joker@arkamasylum.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })

  it('shouldn\'t be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(authenticateUser.execute({
      email: 'joker@arkamasylum.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('shouldn\'t be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: 'Joker',
      email: 'joker@arkamasylum.com',
      password: '123456',
    });

    expect(authenticateUser.execute({
      email: 'joker@arkamasylum.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  })
})