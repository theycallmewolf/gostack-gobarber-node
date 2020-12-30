import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
  });

  it('should be able to list the provider month availability', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 10, 30, 8, 0, 0), // 30.11.2020 8:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 11, 30, 8, 0, 0), // 30.12.2020 8:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 11, 30, 10, 0, 0), // 30.12.2020 10:00:00
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 11, 31, 10, 0, 0), // 31.12.2020 10:00:00
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 12,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 28, available: true },
        { day: 29, available: true },
        { day: 30, available: false },
        { day: 31, available: false },
      ]),
    );
  });
})