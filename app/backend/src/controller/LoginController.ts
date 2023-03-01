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

  static async role(req: Request, res: Response) {
    try {
      const token = req.headers.authorization || '';
      const resp = await LoginService.role(token);
      return res.status(200).json({ role: resp });
    } catch (err) {
      const error = err as Error;
      return res.status(500).json({ message: error.message });
    }
  }
}

export default LoginController;
