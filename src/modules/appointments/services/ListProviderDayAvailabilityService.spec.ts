import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list the daily provider availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 0, 4, 8, 0, 0), // 4.1.2021 8:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2021, 0, 4, 10, 0, 0), // 4.1.2021 10:00:00
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      day: 4,
      year: 2021,
      month: 1,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: true },
      { hour: 10, available: false },
      { hour: 11, available: true },
    ]));
  });
})