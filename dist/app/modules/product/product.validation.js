"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z
        .string({
        required_error: 'Variant Type is required',
        invalid_type_error: 'Variant Type must be a string',
    })
        .min(1, { message: 'Variant Type cannot be a empty string' }),
    value: zod_1.z
        .string({
        required_error: 'Variant Value is required',
        invalid_type_error: 'Variant Value must be a string',
    })
        .min(1, { message: 'Variant Value cannot be a empty string' }),
});
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
    })
        .int({ message: 'Quantity must be an integer' })
        .nonnegative({ message: 'Quantity must be a non negative integer' }),
    inStock: zod_1.z.boolean({
        required_error: 'inStock is required',
        invalid_type_error: 'inStock must be a boolean',
    }),
}, {
    required_error: 'Inventory is required',
    invalid_type_error: 'Inventory must be an object',
});
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    })
        .min(1, { message: 'Name cannot be a empty string' }),
    description: zod_1.z
        .string({
        required_error: 'Description is required',
        invalid_type_error: 'Description must be a string',
    })
        .min(1, { message: 'Description cannot be a empty string' }),
    price: zod_1.z
        .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
    })
        .positive({ message: 'Price must be a positive number' }),
    category: zod_1.z
        .string({
        required_error: 'Category is required',
        invalid_type_error: 'Category must be a string',
    })
        .min(1, { message: 'Category cannot be a empty string' }),
    tags: zod_1.z
        .array(zod_1.z
        .string({
        required_error: 'Tag is required',
        invalid_type_error: 'Tag must be a string',
    })
        .min(1, { message: 'Tag cannot be a empty string' }), {
        required_error: 'Tags are required',
        invalid_type_error: 'Tags must be an object',
    })
        .min(1, { message: 'Tags cannot be a empty array' }),
    variants: zod_1.z
        .array(variantValidationSchema, {
        required_error: 'Variants are required',
        invalid_type_error: 'Variants must be an object',
    })
        .min(1, { message: 'Variants cannot be a empty array' }),
    inventory: inventoryValidationSchema,
});
