"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use('/api/products', product_route_1.productRoutes);
app.use('/api/orders', order_route_1.orderRoutes);
// test route
app.get('/', (_req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});
// handle unmatched routes
app.all('/*', (_req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});
// global error handler
app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
    res.status(statusCode).json({
        success: false,
        message,
    });
});
exports.default = app;
