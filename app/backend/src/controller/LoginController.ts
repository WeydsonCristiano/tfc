import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { generateToken } from '../utis/JWT';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const respLogin = await LoginService.login(email, password);
    if (!respLogin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = generateToken({
      email: respLogin.email,
      id: respLogin.id,
      role: respLogin.role,
      username: respLogin.username,
    });

    res.status(200).json({ token });
  }

  static async verifToken(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { password } = req.body;
    const respToken = await LoginService.verifToken(authorization, password);
    if (!respToken) {
      res.status(401).json({ message: 'Token must be a valid token' });
    }
    return res.status(200).json({ respToken });
  }
}

export default LoginController;
