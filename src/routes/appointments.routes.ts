import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

// POST http://localhost:3333/appointments
appointmentsRouter.post('/', (request, response) => {

  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response.status(400).json({ message: 'this appointment is already booked' })
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;