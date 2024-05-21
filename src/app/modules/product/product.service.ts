import { IProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: IProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async (searchTerm: string | undefined) => {
  if (searchTerm) {
    const products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    });

    return {
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: products,
    };
  }

  const products = await Product.find();

  return {
    success: true,
    message: 'Products fetched successfully!',
    data: products,
  };
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

const deleteSingleProductIntoDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });

  if (result.deletedCount > 0) {
    return result;
  } else {
    throw new Error('Failed to delete product');
  }
};

export const productServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteSingleProductIntoDB,
};
