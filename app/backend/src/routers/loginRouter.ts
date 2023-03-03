import { Router, Request, Response } from 'express';
import validateToken from '../middleware/validationToken';
import LoginController from '../controller/LoginController';
import validateEmail from '../middleware/validationLogin';

const loginRouter = Router();

loginRouter.post('/', validateEmail, (req: Request, res: Response) => {
  LoginController.login(req, res);
});
loginRouter.get('/role', validateToken, (req: Request, res: Response) => {
  LoginController.role(req, res);
});

export default loginRouter;
