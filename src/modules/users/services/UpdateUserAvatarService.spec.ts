import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorareProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Joker',
      email: 'joker@gotham.com',
      password: '123123123'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fake-avatar.jpg'
    })

    expect(user.avatar).toBe('fake-avatar.jpg');
  })

  it('shouldn\'t be able to update avatar from a non user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'fake-avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should delete old avatar on update', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'Joker',
      email: 'joker@gotham.com',
      password: '123123123'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fake-avatar-1.jpg'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fake-avatar-2.jpg'
    })

    expect(deleteFile).toHaveBeenCalledWith('fake-avatar-1.jpg');
    expect(user.avatar).toBe('fake-avatar-2.jpg');
  })
})