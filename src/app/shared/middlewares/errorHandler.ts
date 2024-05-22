import { NextFunction, Request, Response } from 'express';
import { ICustomError } from '../types';

export const errorHandler = (
  err: ICustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // Join zod error messages from all fields (if error comes from zod)
  const zodErrorMessage =
    err.name === 'ZodError' && err?.issues?.map((e) => e.message).join(' | ');

  res.status(err.statusCode || 500).json({
    success: false,
    message: zodErrorMessage || err.message || 'Something went wrong!',
  });
};
