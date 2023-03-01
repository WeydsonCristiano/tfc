import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';

class LoginService {
  static async login(email: string, password: string) {
    const login = await User.findOne({
      where: { email },
    });
    const newPassword = await bcrypt.compare(password, login?.password || ' ');
    if (!newPassword) {
      return undefined;
    }
    return login;
  }
}

export default LoginService;
