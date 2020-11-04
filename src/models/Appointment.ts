import { v4 as uuid } from 'uuid';

interface AppointmentConstructorDTO {
  provider: string;
  date: Date;
}

class Appointment {
  id: string;
  provider: string;
  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;