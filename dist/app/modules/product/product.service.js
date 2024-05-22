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
exports.productServices = void 0;
const CustomError_1 = require("../../shared/utils/CustomError");
const product_model_1 = require("./product.model");
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.create(productData);
    return product;
});
const getAllProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    // define find query conditionally (based on the presence of searchTerm)
    const findQuery = searchTerm
        ? {
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
                { category: { $regex: searchTerm, $options: 'i' } },
            ],
        }
        : {};
    const products = yield product_model_1.Product.find(findQuery);
    if (products.length === 0) {
        throw (0, CustomError_1.CustomError)('Product not found', 404);
    }
    return products;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findById(id);
    return product;
});
const updateSingleProductIntoDB = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(id, productData, {
        new: true, // to return updated data
    });
    return updatedProduct;
});
const deleteSingleProductIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_model_1.Product.findByIdAndDelete(id);
    if (!response) {
        throw (0, CustomError_1.CustomError)('No product found with this id!', 404);
    }
    return null;
});
exports.productServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductIntoDB,
    deleteSingleProductIntoDB,
};
