import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

//autenticação JWT
import authMiddleware from './middlewares/authMiddleware';

import RecipeController from './controllers/RecipeController';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

const routes = Router();

const upload = multer(uploadConfig);

//rotas users

routes.post('/user', upload.single('image'), UserController.create);
routes.get('/user/:id', UserController.show);
routes.post('/user/update/:id', authMiddleware, UserController.update);
//routes.get('/users', UserController.index);
routes.get('/users', authMiddleware, UserController.index);

//rotas recipes

routes.post(
  '/recipe',
  // authMiddleware,
  upload.array('images'),
  RecipeController.create
);
routes.get('/recipes/:id', RecipeController.show);
routes.delete('/recipes/:id', RecipeController.deleteRecipe);
routes.get('/recipes', RecipeController.index);
routes.get('/user/recipes/:id', RecipeController.indexUserRecipes);

// rota autenticação
routes.post('/login', AuthController.authenticate);

export default routes;
