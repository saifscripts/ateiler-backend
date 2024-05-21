import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: IProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await Product.find().select('-_id');
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id).select('-_id');
  return result;
};

const updateSingleProductIntoDB = async (id: string, productData: IProduct) => {
  const result = await Product.updateOne({ _id: id }, { $set: productData });

  if (result.modifiedCount > 0) {
    const updatedProduct = await getSingleProductFromDB(id);
    return updatedProduct;
  }
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
};
