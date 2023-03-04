"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = void 0;
const ErrorHandler_1 = require("../../domain/ErrorHandler");
class ResponseData {
    successResponse(res, code = 200, data, message) {
        res.status(code).json({ data, message });
    }
    badResponse(errorType, next) {
        next(errorType);
    }
    invoke(data, code, res, message, next) {
        if (data instanceof ErrorHandler_1.ErrorHandler)
            return this.badResponse(data, next);
        return this.successResponse(res, code, data, message);
    }
}
exports.ResponseData = ResponseData;
