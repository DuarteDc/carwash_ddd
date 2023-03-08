"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../../config");
const ErrorHandler_1 = require("../../domain/ErrorHandler");
const validateAuthentication = (req, res, next) => {
    let token;
    token = req.header('token');
    if (!token)
        return next(new ErrorHandler_1.ErrorHandler('Token is required', 401));
    try {
        const { user } = jsonwebtoken_1.default.verify(token || '', config_1.config.SECRET_JWT_KEY);
        if (!user)
            return next(new ErrorHandler_1.ErrorHandler('El usuario no es valido', 400));
        req.user = user;
        next();
    }
    catch (error) {
        next(new ErrorHandler_1.ErrorHandler('Token no valido', 400));
    }
};
exports.validateAuthentication = validateAuthentication;
exports.default = exports.validateAuthentication;
