import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().min(1),
  value: z.string().min(1),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().int().nonnegative(),
  inStock: z.boolean(),
});

export const productValidationSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  category: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  variants: z.array(variantValidationSchema).min(1),
  inventory: inventoryValidationSchema,
});
