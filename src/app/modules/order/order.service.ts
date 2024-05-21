import { Product } from '../product/product.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (orderData: IOrder) => {
  const { productId, quantity: orderQuantity } = orderData;

  const product = await Product.findById(productId);

  if (!product) {
    throw new Error('No product found with this product id!');
  }

  const { quantity: inventoryQuantity } = product.inventory;

  if (orderQuantity > inventoryQuantity) {
    throw new Error('Insufficient quantity available in inventory');
  }

  product.inventory.quantity -= orderQuantity;

  const result = await Order.create(orderData);
  await product.save();
  return result;
};

const getAllOrdersFromDB = async (email?: string) => {
  const findQuery = email ? { email } : {};

  const orders = await Order.find(findQuery);

  if (orders.length === 0) {
    throw new Error('Order not found');
  }

  return {
    success: true,
    message: email
      ? 'Orders fetched successfully for user email!'
      : 'Orders fetched successfully!',
    data: orders,
  };
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
