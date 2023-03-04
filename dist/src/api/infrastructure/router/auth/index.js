"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthUseCase_1 = require("../../../application/auth/AuthUseCase");
const AuthController_1 = require("../../controllers/auth/AuthController");
const CustomerModel_1 = __importDefault(require("../../models/CustomerModel"));
const CustomerRepository_1 = require("../../repository/customer/CustomerRepository");
const authRouter = (0, express_1.Router)();
const customerRespository = new CustomerRepository_1.CustomerRepository(CustomerModel_1.default);
const authUseCase = new AuthUseCase_1.AuthUseCase(customerRespository);
const customerController = new AuthController_1.AuthController(authUseCase);
authRouter
    .post('/login', customerController.login)
    .post('/register', customerController.register);
exports.default = authRouter;
