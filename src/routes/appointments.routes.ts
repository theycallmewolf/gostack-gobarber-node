import { Router } from 'express';

const appointmentsRouter = Router();

// POST http://localhost:3333/appointments
appointmentsRouter.post('/', (request, response) =>{
  return response.json({message: 'hello wolf 🐺🤟'});
});

export default appointmentsRouter;