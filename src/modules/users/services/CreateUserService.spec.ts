import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Joker',
      email: 'fake@theycallmewolf.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id');
  })

  it('should not be able to create a new user with same email', async () => {
    await createUser.execute({
      name: 'Joker',
      email: 'fake@theycallmewolf.com',
      password: '123456'
    })

    await expect(
      createUser.execute({
        name: 'Joker',
        email: 'fake@theycallmewolf.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError);
  })
})