import { Schema, model } from 'mongoose';
import {
  IProduct,
  IProductInventory,
  IProductVariant,
} from './product.interface';

const productVariantSchema = new Schema<IProductVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const productInventorySchema = new Schema<IProductInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [productVariantSchema],
    required: true,
  },
  inventory: {
    type: productInventorySchema,
    required: true,
  },
});

export const Product = model('Product', productSchema);