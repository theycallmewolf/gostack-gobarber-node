import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO } from 'date-fns';

const appointmentsRouter = Router();

const appointments = [];

// POST http://localhost:3333/appointments
appointmentsRouter.post('/', (request, response) => {

  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  const appointment = {
    id: uuid(),
    provider,
    date: parsedDate,
  }

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;