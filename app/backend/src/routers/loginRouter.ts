import { Router } from 'express';
import LoginController from '../controller/LoginController';

const loginRouter = Router();

loginRouter.get('/login', LoginController.login);
loginRouter.post('/login');

export default loginRouter;
