import { Router } from 'express';

import validateAuthentication from '../../../../shared/infrastructure/validation/ValidateAuthentication';
import { AuthUseCase } from '../../../application/auth/AuthUseCase';
import { AuthController } from '../../controllers/auth/AuthController';
import { AuthRepository } from '../../repository/auth/AuthRepository';
import UserModel from '../../models/UserModel';

import { S3Service } from '../../../../shared/infrastructure/aws/S3Service';
import { TwilioService } from '../../../../shared/infrastructure/twilio/TwilioService';
import { AuthValidations } from '../../../../shared/infrastructure/validation/Auth/AuthValidatons';

const authAdminRouter = Router();

const authRepository     = new AuthRepository(UserModel);
const authUseCase        = new AuthUseCase(authRepository);
const s3Service          = new S3Service();
const twilioService      = new TwilioService();
const authValidations    = new AuthValidations();
const authController     = new AuthController(authUseCase, s3Service, twilioService);

authAdminRouter
    .post('/login', authValidations.loginValidation, authController.login)
    .post('/register', authValidations.registerValidation, authController.register)
    .post('/change-password', validateAuthentication, authController.changePassword)
    .post('/upload/profile-photo', authValidations.profilePhotoValidation, authController.uploadProfilePhoto)
    .get('/user', validateAuthentication, authController.revalidateToken)
    .patch('/update-user', validateAuthentication, authController.updateCustomer)

export default authAdminRouter;

