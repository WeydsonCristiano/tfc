import { Router } from 'express';
import validateToken from '../middleware/validationToken';
import LoginController from '../controller/LoginController';
import validateEmail from '../middleware/validationLogin';

const loginRouter = Router();

loginRouter.post('/login', validateEmail, LoginController.login);
loginRouter.get('/login/role', validateToken, LoginController.role);

export default loginRouter;
