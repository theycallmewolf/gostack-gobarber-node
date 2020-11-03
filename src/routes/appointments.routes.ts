import { Router } from 'express';
import { v4 as uuid } from 'uuid';

const appointmentsRouter = Router();

const appointments = [];

// POST http://localhost:3333/appointments
appointmentsRouter.post('/', (request, response) => {

  const { provider, date } = request.body;

  const appointment = {
    id: uuid(),
    provider,
    date,
  }

  appointments.push(appointment);

  return response.json(appointment);
});

export default appointmentsRouter;