import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: IOrder) => {
  const result = await Order.create(orderData);
  return result;
};

const getAllOrdersFromDB = async (email: string | undefined) => {
  if (email) {
    const orders = await Order.find({ email });

    return {
      success: true,
      message: 'Orders fetched successfully for user email!',
      data: orders,
    };
  }

  const orders = await Order.find();

  return {
    success: true,
    message: 'Orders fetched successfully!',
    data: orders,
  };
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
