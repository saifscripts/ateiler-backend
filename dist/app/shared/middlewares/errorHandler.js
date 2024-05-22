"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, _req, res, _next) => {
    var _a;
    // Join zod error messages from all fields (if error comes from zod)
    const zodErrorMessage = err.name === 'ZodError' && ((_a = err === null || err === void 0 ? void 0 : err.issues) === null || _a === void 0 ? void 0 : _a.map((e) => e.message).join(' | '));
    res.status(err.statusCode || 500).json({
        success: false,
        message: zodErrorMessage || err.message || 'Something went wrong!',
    });
};
exports.errorHandler = errorHandler;
