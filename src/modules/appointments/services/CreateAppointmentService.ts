import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'


interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can\'t create an appointment on a already passed date');
    }

    if (user_id === provider_id) {
      throw new AppError('You can\'t make an appointment with yourself')
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only make an appointment from 8am till 17pm');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id
    );

    if (findAppointmentInSameDate) {
      throw new AppError("this appointment is already booked");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Nova marcação para dia ${dateFormatted}`
    });

    // console.log(`provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`);

    await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`);

    return appointment;
  }
}

export default CreateAppointmentService;
