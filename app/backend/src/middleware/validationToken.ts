import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from '../utis/JWT';

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const verifToken = authenticateToken(token);

  if (!verifToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  return res.status(200).json({ role: 'admin' });
  next();
};

export default validateToken;
