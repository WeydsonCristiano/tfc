import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { generateToken } from '../utis/JWT';

class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
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
}

export default LoginController;
