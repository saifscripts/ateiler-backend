import { CustomError } from '../../shared/utils/CustomError';
import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: IOrder) => {
  const product = await Product.findById(orderData.productId);

  if (!product) {
    throw CustomError('No product found with this product id!', 404);
  }

  if (orderData.quantity > product.inventory.quantity) {
    throw CustomError('Insufficient quantity available in inventory', 422);
  }

  product.inventory.quantity -= orderData.quantity; // update inventory quantity
  product.inventory.inStock = product.inventory.quantity > 0; // update stock status

  const order = await Order.create(orderData); // create order
  await product.save(); // save product data with updated quantity and stock status

  return order;
};

const getAllOrdersFromDB = async (email?: string) => {
  // define find query conditionally (based on the presence of email)
  const findQuery = email ? { email } : {};

  const orders = await Order.find(findQuery);

  if (orders.length === 0) {
    throw CustomError('Order not found', 404);
  }

  return orders;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
