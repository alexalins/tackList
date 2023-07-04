import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import TaskController from './app/controllers/TaskController';

const routes = new Router();

routes.post('/session', SessionController.store);
routes.post('/users', UserController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/tasks', TaskController.index);
routes.post('/tasks', TaskController.store);

export default routes;