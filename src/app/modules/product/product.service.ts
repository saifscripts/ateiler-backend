import { CustomError } from '../../shared/utils/CustomError';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: IProduct) => {
  const product = await Product.create(productData);
  return product;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  const findQuery = searchTerm
    ? {
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { category: { $regex: searchTerm, $options: 'i' } },
        ],
      }
    : {};

  const products = await Product.find(findQuery);

  if (products.length === 0) {
    throw CustomError('Product not found', 404);
  }

  return products;
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findById(id);
  return product;
};

const updateSingleProductIntoDB = async (id: string, productData: IProduct) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
    new: true,
  });

  return updatedProduct;
};

const deleteSingleProductIntoDB = async (id: string) => {
  const response = await Product.deleteOne({ _id: id });

  if (response.deletedCount === 0) {
    throw CustomError('No product found with this id!', 404);
  }

  return response;
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductIntoDB,
};
