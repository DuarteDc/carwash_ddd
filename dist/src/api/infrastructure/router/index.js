"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth/"));
const authAdmin_1 = __importDefault(require("./authAdmin"));
const customer_1 = __importDefault(require("./customer/"));
const services_1 = __importDefault(require("./services"));
const typeCar_1 = __importDefault(require("./typeCar"));
const typeCustomer_1 = __importDefault(require("./typeCustomer"));
const apiRouter = () => {
    const apiRouter = (0, express_1.Router)();
    apiRouter.use('/auth', auth_1.default);
    apiRouter.use('/auth/admin', authAdmin_1.default);
    apiRouter.use('/customer', customer_1.default);
    apiRouter.use('/services', services_1.default);
    apiRouter.use('/type-car', typeCar_1.default);
    apiRouter.use('/type-customer', typeCustomer_1.default);
    return apiRouter;
};
exports.apiRouter = apiRouter;
