import { CustomError } from '../../shared/utils/CustomError';
import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: IProduct) => {
  const product = await Product.create(productData);

  return {
    success: true,
    message: 'Product created successfully!',
    data: product,
  };
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

  return {
    success: true,
    message: searchTerm
      ? `Products matching search term '${searchTerm}' fetched successfully!`
      : 'Products fetched successfully!',
    data: products,
  };
};

const getSingleProductFromDB = async (id: string) => {
  const product = await Product.findById(id);

  return {
    success: true,
    message: 'Product fetched successfully!',
    data: product,
  };
};

const updateSingleProductIntoDB = async (id: string, productData: IProduct) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
    new: true,
  });

  return {
    success: true,
    message: 'Product updated successfully!',
    data: updatedProduct,
  };
};

const deleteSingleProductIntoDB = async (id: string) => {
  const response = await Product.deleteOne({ _id: id });

  if (response.deletedCount === 0) {
    throw CustomError('No product found with this id!', 404);
  }

  return {
    success: true,
    message: 'Product deleted successfully!',
    data: null,
  };
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductIntoDB,
};
