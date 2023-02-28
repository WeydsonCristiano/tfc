import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const respLogin = await LoginService.login(email, password);
    res.status(200).json(respLogin);
  }
}

export default LoginController;
