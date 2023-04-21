import { Router } from 'express';

import validateAuthentication from '../../../../shared/infrastructure/validation/ValidateAuthentication';
import { AuthUseCase } from '../../../application/auth/AuthUseCase';
import { AuthController } from '../../controllers/auth/AuthController';
import { AuthRepository } from '../../repository/auth/AuthRepository';
import CustomerModel from '../../models/CustomerModel';

import { S3Service } from '../../../../shared/infrastructure/aws/S3Service';
import { TwilioService } from '../../../../shared/infrastructure/twilio/TwilioService';
import { AuthValidations } from '../../../../shared/infrastructure/validation/Auth/AuthValidatons';

const authRouter = Router();

const authRepository     = new AuthRepository(CustomerModel);
const authUseCase        = new AuthUseCase(authRepository);
const s3Service          = new S3Service();
const twilioService      = new TwilioService();
const authValidations    = new AuthValidations();
const authController     = new AuthController(authUseCase, s3Service, twilioService);

authRouter
    .post('/login', authValidations.loginValidation, authController.login)
    .post('/register', authValidations.registerValidation, authController.register)
    .post('/google', authValidations.googleLoginValidations, authController.loginWithGoogle)
    .post('/change-password', validateAuthentication, authController.changePassword)
    .post('/upload/profile-photo', authValidations.profilePhotoValidation, authController.uploadProfilePhoto)
    .get('/customer', validateAuthentication, authController.revalidateToken)
    .post('/verify-code', validateAuthentication, authController.verifyCode)
    .post('/phone-number', validateAuthentication, authController.savePhoneNumberAndSendCode)
    .patch('/update-customer', validateAuthentication, authController.updateCustomer)
    .post('/upload-files', authValidations.filesValidations, authController.uploadFiles)
    // 

export default authRouter;

