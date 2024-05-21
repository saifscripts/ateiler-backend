"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity: orderQuantity } = orderData;
    const product = yield product_model_1.Product.findById(productId);
    if (!product) {
        throw new Error('No product found with this product id!');
    }
    const { quantity: inventoryQuantity } = product.inventory;
    if (orderQuantity > inventoryQuantity) {
        throw new Error('Insufficient quantity available in inventory');
    }
    product.inventory.quantity -= orderQuantity;
    const result = yield order_model_1.Order.create(orderData);
    yield product.save();
    return result;
});
const getAllOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        const orders = yield order_model_1.Order.find({ email });
        return {
            success: true,
            message: 'Orders fetched successfully for user email!',
            data: orders,
        };
    }
    const orders = yield order_model_1.Order.find();
    return {
        success: true,
        message: 'Orders fetched successfully!',
        data: orders,
    };
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
};
