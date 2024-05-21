"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const CustomError = (message, code) => {
    const err = new Error(message);
    err.statusCode = code;
    return err;
};
exports.CustomError = CustomError;
