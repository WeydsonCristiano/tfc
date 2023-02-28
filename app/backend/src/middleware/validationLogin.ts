import { Request, Response, NextFunction } from 'express';

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const regex = /\S+@\S+\.\S+/;
  const verifica = regex.test(email);
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!verifica || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default validateEmail;
