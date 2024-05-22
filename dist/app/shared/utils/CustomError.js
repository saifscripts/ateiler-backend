"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const CustomError = (message, code) => {
    const err = new Error(message); // create a new error
    err.statusCode = code; // add a status code
    return err; // return the error with status code
};
exports.CustomError = CustomError;
