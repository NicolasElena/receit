import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';
import UserController from './controllers/UserController';

const routes = Router();

const upload = multer(uploadConfig);

routes.post('/user', upload.single('image'), UserController.create);

export default routes;
