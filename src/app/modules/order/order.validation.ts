import mongoose from 'mongoose';
import { z } from 'zod';

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId',
  });

export const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: objectIdSchema,
  price: z.number().positive(),
  quantity: z.number().int().nonnegative(),
});
