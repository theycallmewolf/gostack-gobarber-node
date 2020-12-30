import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });


  it('should be able to update his profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joker',
      email: 'joker@gotham.com',
      password: '123123123',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Batman',
      email: 'batman@gotham.com',
    })

    expect(updatedUser.name).toBe('Batman');
    expect(updatedUser.email).toBe('batman@gotham.com');
  });

  it('shouldn\'t be able to update the profile from a non user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-user-id',
        name: 'non-user',
        email: 'non-user@email.com',
        password: 'non-user-password'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shouldn\'t be able to change to another user\'s email', async () => {
    await fakeUsersRepository.create({
      name: 'Joker',
      email: 'joker@gotham.com',
      password: '123123123',
    })

    const user = await fakeUsersRepository.create({
      name: 'Batman',
      email: 'batman@gotham.com',
      password: '000111000',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Harley Quinn',
        email: 'joker@gotham.com',
        password: '000111000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joker',
      email: 'joker@gotham.com',
      password: '123123123',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Joker',
      email: 'joker@gotham.com',
      old_password: '123123123',
      password: '000111000',
    })

    expect(updatedUser.password).toBe('000111000');
  });

  it('shouldn\'t be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joker',
      email: 'joker@gotham.com',
      password: '123123123',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joker',
        email: 'joker@gotham.com',
        password: '000111000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shouldn\'t be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joker',
      email: 'joker@gotham.com',
      password: '123123123',
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Joker',
        email: 'joker@gotham.com',
        old_password: 'wrong-password',
        password: '000111000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

})