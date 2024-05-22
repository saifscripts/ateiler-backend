import { ICustomError } from '../types';

export const CustomError = (message: string, code?: number): ICustomError => {
  const err: ICustomError = new Error(message); // create a new error
  err.statusCode = code; // add a status code
  return err; // return the error with status code
};
