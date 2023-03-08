"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const ValidateAuthentication_1 = __importDefault(require("../../../../shared/infrastructure/validation/ValidateAuthentication"));
const AuthUseCase_1 = require("../../../application/auth/AuthUseCase");
const AuthController_1 = require("../../controllers/auth/AuthController");
const AuthRepository_1 = require("../../repository/auth/AuthRepository");
const CustomerModel_1 = __importDefault(require("../../models/CustomerModel"));
const S3Service_1 = require("../../../../shared/infrastructure/aws/S3Service");
const MulterConfig_1 = require("../../../../shared/infrastructure/middleware/MulterConfig");
const TwilioService_1 = require("../../../../shared/infrastructure/twilio/TwilioService");
const authRouter = (0, express_1.Router)();
const authRepository = new AuthRepository_1.AuthRepository(CustomerModel_1.default);
const authUseCase = new AuthUseCase_1.AuthUseCase(authRepository);
const s3Service = new S3Service_1.S3Service();
const twilioService = new TwilioService_1.TwilioService();
const authController = new AuthController_1.AuthController(authUseCase, s3Service, twilioService);
const upload = (0, multer_1.default)(MulterConfig_1.multerConfig);
authRouter
    .post('/login', authController.login)
    .post('/register', authController.register)
    .post('/change-password', ValidateAuthentication_1.default, authController.changePassword)
    .post('/upload/profile-photo', [ValidateAuthentication_1.default, upload.single('photo')], authController.uploadProfilePhoto)
    .get('/customer', ValidateAuthentication_1.default, authController.revalidateToken);
exports.default = authRouter;
