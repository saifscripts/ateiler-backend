import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: IProduct) => {
  const result = await Product.create(productData);
  return result;
};

export const productServices = {
  createProductIntoDB,
};
