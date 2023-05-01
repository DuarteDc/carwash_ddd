"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomerUseCase_1 = require("../../../application/customer/CustomerUseCase");
const CustomerController_1 = require("../../controllers/customer/CustomerController");
const CustomerRepository_1 = require("../../repository/customer/CustomerRepository");
const CustomerModel_1 = __importDefault(require("../../models/CustomerModel"));
const S3Service_1 = require("../../../../shared/infrastructure/aws/S3Service");
const customerRouter = (0, express_1.Router)();
const customerRepository = new CustomerRepository_1.CustomerRepository(CustomerModel_1.default);
const customerUserCase = new CustomerUseCase_1.CustomerUseCase(customerRepository);
const s3Service = new S3Service_1.S3Service();
const customerController = new CustomerController_1.CustomerController(customerUserCase, s3Service);
customerRouter
    .get('/', customerController.getAllCustomers)
    .get('/:id', customerController.getCustomerDetail)
    .post('/', customerController.createCustomer)
    .patch('/:id', customerController.updateCustomer)
    .delete('/:id', customerController.deleteCustomer);
exports.default = customerRouter;
