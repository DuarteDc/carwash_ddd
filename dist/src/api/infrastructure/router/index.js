"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const customer_1 = __importDefault(require("./customer/"));
const auth_1 = __importDefault(require("./auth/"));
const apiRouter = () => {
    const apiRouter = (0, express_1.Router)();
    apiRouter.use('/auth', auth_1.default);
    apiRouter.use('/customer', customer_1.default);
    return apiRouter;
};
exports.apiRouter = apiRouter;
