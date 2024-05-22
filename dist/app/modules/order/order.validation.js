"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const objectIdSchema = zod_1.z
    .string({
    required_error: 'Product ID is required',
    invalid_type_error: 'Product ID must be a string',
})
    .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId',
});
exports.orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    })
        .email({ message: 'Invalid email address' }),
    productId: objectIdSchema,
    price: zod_1.z
        .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
    })
        .positive({ message: 'Price must be a positive number' }),
    quantity: zod_1.z
        .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
    })
        .int({ message: 'Quantity must be an integer' })
        .nonnegative({ message: 'Quantity must be a non negative integer' }),
});
