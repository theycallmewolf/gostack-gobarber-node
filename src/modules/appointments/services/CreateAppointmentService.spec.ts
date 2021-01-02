import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';
import { id } from 'date-fns/locale';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 4, 12).getTime();
    })

    const appointment = await createAppointment.execute({
      date: new Date(2021, 0, 4, 13),
      user_id: '11111111',
      provider_id: '123123123'
    })

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  })

  it('should not be able to create two appointments at the same date', async () => {
    const appointmentDate = new Date(2021, 0, 10, 11); //11:00 10 May 2021

    await createAppointment.execute({
      date: appointmentDate,
      user_id: '11111111',
      provider_id: '123123123'
    });

    await expect(createAppointment.execute({
      date: appointmentDate,
      user_id: '11111111',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('shouldn\'t be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 4, 12).getTime();
    })

    await expect(createAppointment.execute({
      date: new Date(2021, 0, 4, 11),
      user_id: '11111111',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(AppError);
  })
})