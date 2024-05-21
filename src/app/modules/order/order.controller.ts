import { NextFunction, Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await OrderServices.createOrderIntoDB(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const email = req.query.email as string | undefined;

    const result = await OrderServices.getAllOrdersFromDB(email);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const orderControllers = {
  createOrder,
  getAllOrders,
};
