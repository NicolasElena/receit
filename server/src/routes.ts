import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import RecipeController from './controllers/RecipeController';
import UserController from './controllers/UserController';

const routes = Router();

const upload = multer(uploadConfig);

//rotas users

routes.post('/user', upload.single('image'), UserController.create);
routes.get('/users/:id', UserController.show);
routes.get('/users', UserController.index);

//rotas recipes

routes.post('/recipe', upload.array('images'), RecipeController.create);
routes.get('/recipes/:id', RecipeController.show);
routes.get('/recipes/user/:id', RecipeController.indexUserRecipes);
routes.get('/recipes', RecipeController.index);

//

export default routes;
