import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'hello wolf' });
})

app.listen(3333, () => {
  console.log('server started on port 3333 🐺🤟🏾')
})