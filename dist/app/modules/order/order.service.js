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
const CustomError_1 = require("../../shared/utils/CustomError");
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(orderData.productId);
    if (!product) {
        throw (0, CustomError_1.CustomError)('No product found with this product id!', 404);
    }
    if (orderData.quantity > product.inventory.quantity) {
        throw (0, CustomError_1.CustomError)('Insufficient quantity available in inventory', 422);
    }
    product.inventory.quantity -= orderData.quantity; // update inventory quantity
    const result = yield order_model_1.Order.create(orderData); // create order
    yield product.save(); // save product data with updated quantity
    return result;
});
const getAllOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const findQuery = email ? { email } : {};
    const orders = yield order_model_1.Order.find(findQuery);
    if (orders.length === 0) {
        throw (0, CustomError_1.CustomError)('Order not found', 404);
    }
    return {
        success: true,
        message: email
            ? 'Orders fetched successfully for user email!'
            : 'Orders fetched successfully!',
        data: orders,
    };
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrdersFromDB,
};
