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
