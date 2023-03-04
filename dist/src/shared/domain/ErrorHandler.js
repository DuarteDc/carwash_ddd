"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.ErrorHandler = ErrorHandler;
