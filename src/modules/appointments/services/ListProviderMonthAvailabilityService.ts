import { inject, injectable } from 'tsyringe';
import { getDate, getDaysInMonth } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) { };

  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      month,
      year,
    })

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (value, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const dailyAppointments = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      })

      return {
        day,
        available: dailyAppointments.length < 10,
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;