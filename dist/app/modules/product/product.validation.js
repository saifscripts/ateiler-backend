"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1),
    value: zod_1.z.string().min(1),
});
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().nonnegative(),
    inStock: zod_1.z.boolean(),
});
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string().min(1),
    tags: zod_1.z.array(zod_1.z.string().min(1)).min(1),
    variants: zod_1.z.array(variantValidationSchema).min(1),
    inventory: inventoryValidationSchema,
});
