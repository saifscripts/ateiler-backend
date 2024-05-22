import { ICustomError } from '../types';

export const CustomError = (message: string, code?: number): ICustomError => {
  const err: ICustomError = new Error(message);
  err.statusCode = code;
  return err;
};
