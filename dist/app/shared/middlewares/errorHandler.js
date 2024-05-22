"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    var _a;
    const statusCode = err.statusCode || 500;
    const message = err.name === 'ZodError'
        ? (_a = err.issues) === null || _a === void 0 ? void 0 : _a.map((e) => e.message).join(' | ')
        : err.message || 'Something went wrong!';
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.errorHandler = errorHandler;
