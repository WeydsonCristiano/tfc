import { Request, Response, NextFunction } from 'express';

export default function clientErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof Error && err.stack) {
    return res.status(parseInt(err.stack, 10)).send({ message: err.message });
    // } else {
    //   next(err),
  }
  return res.status(500).send({ message: 'erro no servidor' });
}
