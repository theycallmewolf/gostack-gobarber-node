import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list provider availability for the month', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user2',
      date: new Date(2020, 11, 30, 8, 0, 0), // 30.12.2020 8:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user2',
      date: new Date(2020, 11, 30, 9, 0, 0), // 30.12.2020 9:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user2',
      date: new Date(2020, 11, 30, 10, 0, 0), // 30.12.2020 10:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user2',
      date: new Date(2020, 11, 30, 11, 0, 0), // 30.12.2020 11:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user2',
      date: new Date(2020, 11, 30, 12, 0, 0), // 30.12.2020 12:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user2',
      date: new Date(2020, 11, 30, 13, 0, 0), // 30.12.2020 13:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user2',
      date: new Date(2020, 11, 30, 14, 0, 0), // 30.12.2020 14:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user2',
      date: new Date(2020, 11, 30, 15, 0, 0), // 30.12.2020 15:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user2',
      date: new Date(2020, 11, 30, 16, 0, 0), // 30.12.2020 16:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user2',
      date: new Date(2020, 11, 30, 17, 0, 0), // 30.12.2020 17:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user1',
      user_id: 'user2',
      date: new Date(2020, 11, 31, 10, 0, 0), // 31.12.2020 10:00
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user1',
      year: 2020,
      month: 12,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 28, available: true },
      { day: 29, available: true },
      { day: 30, available: false },
      { day: 31, available: true },
    ]));
  });
})