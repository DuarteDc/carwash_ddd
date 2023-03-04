"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMiddleware = void 0;
const ErrorHandler_1 = require("../../domain/ErrorHandler");
class ErrorMiddleware {
    constructor() {
        this.defaultHttpErrorCode = 500;
        this.routeNotFoundErrorHandler = (req, res) => {
            res.status(404).json({ status: 404, message: 'Route not found' });
        };
        this.customErrorHandler = (err, req, res, next) => {
            if (err instanceof ErrorHandler_1.ErrorHandler) {
                const { statusCode, message } = err;
                res.status(statusCode).json({
                    status: statusCode,
                    message: message
                });
            }
            else {
                next(err);
            }
        };
        this.globalErrorHandler = (err, req, res, next) => {
            return res.status(this.defaultHttpErrorCode).json({
                status: this.defaultHttpErrorCode,
                message: 'Something wrong happened :`('
            });
        };
    }
}
exports.ErrorMiddleware = ErrorMiddleware;
