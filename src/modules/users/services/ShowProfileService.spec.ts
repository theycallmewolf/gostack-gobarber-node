import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from '././ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('showProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show user\'s profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Joker',
      email: 'joker@gotham.com',
      password: '123123123',
    })

    const profile = await showProfile.execute({
      user_id: user.id
    })

    expect(profile.name).toBe('Joker');
    expect(profile.email).toBe('joker@gotham.com');
  });

  it('shouldn\'t be able to show the profile from a non user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-user-id'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

})