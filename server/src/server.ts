import express, { response } from 'express';

const app = express();

app.get('/users', (request, response) => {
  console.log('aaaa');

  response.json(['asad', 'asd']);
});

app.listen(3333);
