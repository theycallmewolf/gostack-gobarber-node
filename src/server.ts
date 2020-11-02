import express from 'express';

const routes = express();
routes.use(express.json());

routes.get('/', (request, response) => {
  return response.json({ message: 'hello wolf' });
})

routes.post('/users', (request, response) => {
  const { name, email } = request.body;

  const user = {
    name,
    email,
  }

  return response.json(user);
})

routes.listen(3333, () => {
  console.log('server started on port 3333 🐺🤟')
})