import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorareProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
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
    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'fake-avatar.jpg'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should delete old avatar on update', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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