import { NextFunction, Request, Response } from 'express';
import { OrderServices } from './order.service';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData = req.body;
    const result = await OrderServices.createOrderIntoDB(orderData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
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
    const { email } = req.query;

    const result = await OrderServices.getAllOrdersFromDB(
      email as string | undefined,
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const orderControllers = {
  createOrder,
  getAllOrders,
};
