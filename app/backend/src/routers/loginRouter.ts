import { Router } from 'express';
import LoginController from '../controller/LoginController';
import validateEmail from '../middleware/validationLogin';

const loginRouter = Router();

loginRouter.post('/login', validateEmail, LoginController.login);

export default loginRouter;
