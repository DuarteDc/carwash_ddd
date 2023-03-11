import { Router } from 'express';
import multer from 'multer';

import validateAuthentication from '../../../../shared/infrastructure/validation/ValidateAuthentication';
import { AuthUseCase } from '../../../application/auth/AuthUseCase';
import { AuthController } from '../../controllers/auth/AuthController';
import { AuthRepository } from '../../repository/auth/AuthRepository';
import CustomerModel from '../../models/CustomerModel';

import { S3Service } from '../../../../shared/infrastructure/aws/S3Service';
import { multerConfig } from '../../../../shared/infrastructure/middleware/MulterConfig';
import { TwilioService } from '../../../../shared/infrastructure/twilio/TwilioService';


const authRouter = Router();

const authRepository     = new AuthRepository(CustomerModel);
const authUseCase        = new AuthUseCase(authRepository);
const s3Service          = new S3Service();
const twilioService      = new TwilioService();
const authController     = new AuthController(authUseCase, s3Service, twilioService);

const upload = multer(multerConfig);

authRouter
    .post('/login', authController.login)
    .post('/register', authController.register)
    .post('/change-password', validateAuthentication, authController.changePassword)
    .post('/upload/profile-photo', [validateAuthentication, upload.single('photo')], authController.uploadProfilePhoto)
    .get('/customer', validateAuthentication, authController.revalidateToken)
    .post('/verify-code', validateAuthentication, authController.verifyCode)
    .post('/phone-number', validateAuthentication, authController.savePhoneNumberAndSendCode)

export default authRouter;

