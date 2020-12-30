import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate a new user', async () => {
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
    await expect(authenticateUser.execute({
      email: 'joker@arkamasylum.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('shouldn\'t be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Joker',
      email: 'joker@arkamasylum.com',
      password: '123456',
    });

    await expect(authenticateUser.execute({
      email: 'joker@arkamasylum.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  })
})