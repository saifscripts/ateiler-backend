import { NextFunction, Request, Response } from 'express';
import { ICustomError } from '../types';

export const errorHandler = (
  err: ICustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = err.statusCode || 500;

  const message =
    err.name === 'ZodError'
      ? err.issues?.map((e) => e.message).join(' | ')
      : err.message || 'Something went wrong!';

  res.status(statusCode).json({
    success: false,
    message,
  });
};
