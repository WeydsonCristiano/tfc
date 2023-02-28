import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthenticatedUser from '../interface/AuthenticatedUser';

const TOKEN_SECRET = process.env.JWT_SECRET || 'seusecretdetoken';

const generateToken = (payload: JwtPayload): string =>
  jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: '7d',
    algorithm: 'HS256',
  });

const authenticateToken = (token: string): AuthenticatedUser => {
  const verificationResponse = jwt.verify(token, TOKEN_SECRET) as AuthenticatedUser;
  return verificationResponse;
};

export default { generateToken, authenticateToken };
