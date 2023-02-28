import User from '../database/models/User';

class LoginService {
  static async login(email: string, _password: string) {
    const login = await User.findOne({
      where: { email },
    });
    return login;
  }
}

export default LoginService;
