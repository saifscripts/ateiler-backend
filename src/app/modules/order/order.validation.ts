import mongoose from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z
  .string({
    required_error: 'Product ID is required',
    invalid_type_error: 'Product ID must be a string',
  })
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId',
  });

export const orderValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Invalid email address' }),
  productId: objectIdSchema,
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive({ message: 'Price must be a positive number' }),
  quantity: z
    .number({
      required_error: 'Quantity is required',
      invalid_type_error: 'Quantity must be a number',
    })
    .int({ message: 'Quantity must be an integer' })
    .nonnegative({ message: 'Quantity must be a non negative integer' }),
});
