"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = require("zod");
const objectIdSchema = zod_1.z
    .string()
    .refine((val) => mongoose_1.default.Types.ObjectId.isValid(val), {
    message: 'Invalid MongoDB ObjectId',
});
exports.orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: objectIdSchema,
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().int().nonnegative(),
});
