"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ValidateAuthentication_1 = __importDefault(require("../../../../shared/infrastructure/validation/ValidateAuthentication"));
const AuthUseCase_1 = require("../../../application/auth/AuthUseCase");
const AuthController_1 = require("../../controllers/auth/AuthController");
const AuthRepository_1 = require("../../repository/auth/AuthRepository");
const CustomerModel_1 = __importDefault(require("../../models/CustomerModel"));
const S3Service_1 = require("../../../../shared/infrastructure/aws/S3Service");
const TwilioService_1 = require("../../../../shared/infrastructure/twilio/TwilioService");
const AuthValidatons_1 = require("../../../../shared/infrastructure/validation/Auth/AuthValidatons");
const authRouter = (0, express_1.Router)();
const authRepository = new AuthRepository_1.AuthRepository(CustomerModel_1.default);
const authUseCase = new AuthUseCase_1.AuthUseCase(authRepository);
const s3Service = new S3Service_1.S3Service();
const twilioService = new TwilioService_1.TwilioService();
const authValidations = new AuthValidatons_1.AuthValidations();
const authController = new AuthController_1.AuthController(authUseCase, s3Service, twilioService);
authRouter
    .post('/login', authValidations.loginValidation, authController.login)
    .post('/register', authValidations.registerValidation, authController.register)
    .post('/google', authValidations.googleLoginValidations, authController.loginWithGoogle)
    .post('/change-password', ValidateAuthentication_1.default, authController.changePassword)
    .post('/upload/profile-photo', authValidations.profilePhotoValidation, authController.uploadProfilePhoto)
    .get('/customer', ValidateAuthentication_1.default, authController.revalidateToken)
    .post('/verify-code', ValidateAuthentication_1.default, authController.verifyCode)
    .post('/phone-number', ValidateAuthentication_1.default, authController.savePhoneNumberAndSendCode)
    .patch('/update-customer', ValidateAuthentication_1.default, authController.updateCustomer)
    .post('/upload-files', authValidations.filesValidations, authController.uploadFiles);
// 
exports.default = authRouter;
