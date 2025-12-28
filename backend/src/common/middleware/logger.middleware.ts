import { Request, Response, NextFunction } from 'express';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { method, originalUrl } = req;

  res.on('finish', () => {
    console.log(`${method} ${originalUrl} ${res.statusCode}`);
  });

  next();
}
