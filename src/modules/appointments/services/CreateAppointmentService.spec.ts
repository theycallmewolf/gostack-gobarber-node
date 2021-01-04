import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );
  });


  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 4, 12).getTime();
    })

    const appointment = await createAppointment.execute({
      date: new Date(2021, 0, 4, 13),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  })

  it('should not be able to create two appointments at the same date', async () => {
    const appointmentDate = new Date(2021, 0, 10, 11); //11:00 10 May 2021

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: 'provider_id'
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('shouldn\'t be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 4, 12).getTime();
    })

    await expect(createAppointment.execute({
      date: new Date(2021, 0, 4, 11),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('shouldn\'t be able to create an appointment to himself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 4, 12).getTime();
    })

    await expect(createAppointment.execute({
      date: new Date(2021, 0, 4, 13),
      user_id: 'user_id',
      provider_id: 'user_id'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('shouldn\'t be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 4, 12).getTime();
    })

    await expect(createAppointment.execute({
      date: new Date(2021, 0, 5, 7),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(AppError);

    await expect(createAppointment.execute({
      date: new Date(2021, 0, 5, 18),
      user_id: 'user_id',
      provider_id: 'provider_id'
    })).rejects.toBeInstanceOf(AppError);
  })
})