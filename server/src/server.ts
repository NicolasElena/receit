import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

import './database/connection';
import routes from './routes';
import errorHandler from './errors/handler';

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorHandler);

app.listen(process.env.PORT || 3333, () => console.log('running on port 3333'));
