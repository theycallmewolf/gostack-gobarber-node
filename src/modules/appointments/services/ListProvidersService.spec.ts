import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Joker',
      email: 'joker@gotham.com',
      password: 'kick-batman',
    })

    const user2 = await fakeUsersRepository.create({
      name: 'Batman',
      email: 'batman@gotham.com',
      password: 'catch-joker',
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'Wolf',
      email: 'hi@theycallmewolf.com',
      password: 'wolf',
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id
    })

    expect(providers).toEqual([user1, user2]);
  });

})