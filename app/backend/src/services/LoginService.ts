import User from '../database/models/User';

class LoginService {
  static async login(email: string, password: string) {
    const login = await User.findOne({
      where: { email, password },
    });
    return login;
  }
}

export default LoginService;
