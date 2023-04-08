import { NextFunction, Request, Response } from 'express';

import { CustomerEntity } from '../../../domain/customer/CustomerEntity';
import { ErrorHandler } from '../../../../shared/domain/ErrorHandler';

import { AuthUseCase } from '../../../application/auth/AuthUseCase';
import { ICustomerAuth } from '../../../application/authentication/AuthenticationService';

import { S3Service } from '../../../../shared/infrastructure/aws/S3Service';
import { TwilioService } from '../../../../shared/infrastructure/twilio/TwilioService';

import { ResponseData } from '../../../../shared/infrastructure/validation/ResponseData';
import { AuthValidations } from '../../../../shared/infrastructure/validation/Auth/AuthValidatons';
import { generateRandomCode } from '../../../../shared/infrastructure/validation/Utils';


import { IPhoneRequest } from '../../../application/auth/interfaces';

export class AuthController extends ResponseData {

    constructor(private readonly authUseCase: AuthUseCase, private readonly s3Service: S3Service, private readonly twilioService: TwilioService) {
        super();
        this.login                      =   this.login.bind(this);
        this.register                   =   this.register.bind(this);
        this.loginWithGoogle            =   this.loginWithGoogle.bind(this);
        this.changePassword             =   this.changePassword.bind(this);
        this.uploadProfilePhoto         =   this.uploadProfilePhoto.bind(this);
        this.revalidateToken            =   this.revalidateToken.bind(this);
        this.verifyCode                 =   this.verifyCode.bind(this);
        this.savePhoneNumberAndSendCode =   this.savePhoneNumberAndSendCode.bind(this);
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<ICustomerAuth | ErrorHandler | void> {
        const { email, password } = req.body;
        try {
            const response = await this.authUseCase.signIn(email, password);
            this.invoke(response, 200, res, '', next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error al iniciar sesión', 500));
        }
    }

    public async register(req: Request, res: Response, next: NextFunction): Promise<ICustomerAuth | ErrorHandler | void> {
        const { email, password, fullname } = req.body;
        console.log(req.body)
        try {
            const response = await this.authUseCase.signUp({ fullname, email, password });
            this.invoke(response, 200, res, '', next);
        } catch (error) {
            console.log(error)
            next(new ErrorHandler('Hubo un error al iniciar sesión', 500));
        }
    }

    public async loginWithGoogle(req: Request, res: Response, next: NextFunction): Promise<ICustomerAuth | ErrorHandler | void> {
        const { idToken } = req.body;
        try {
            const response = await this.authUseCase.signInWithGoogle(idToken);
            this.invoke(response, 200, res, '', next);
        } catch (error) {
            console.log(error)
            next(new ErrorHandler('Hubo un error al iniciar sesión', 500));
        }
    }

    public async changePassword(req: Request, res: Response, next: NextFunction): Promise<ICustomerAuth | ErrorHandler | void> {
        const { password, new_password } = req.body;
        const user: CustomerEntity = req.user;
        try {
            const response = await this.authUseCase.changePassword(password, new_password, user);
            this.invoke(response, 200, res, 'La contraseña se cambio con exito', next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error al cambiar la contraseña', 500));
        }
    }

    public async uploadProfilePhoto(req: Request, res: Response, next: NextFunction) {
        const { user } = req;
        try {
            const { message, key } = await this.s3Service.uploadToS3(user._id, req.file);
            const response = await this.authUseCase.updateProfilePhoto(key, user._id);
            this.invoke(response, 200, res, message, next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error al subir la foto', 400));
        }
    }

    public async revalidateToken(req: Request, res: Response, next: NextFunction) {
        const { user } = req;
        try {
            const response = await this.authUseCase.generateToken(user);
            this.invoke(response, 200, res, '', next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error al generar el token', 500));
        }
    }

    public async savePhoneNumberAndSendCode(req: Request, res: Response, next: NextFunction) {
        const { user } = req;
        const { prefix, phone_number } : IPhoneRequest = req.body;
        try {
            const code = generateRandomCode();
            //await this.twilioService.sendSMS(`Verifica tu número de teléfono con el siguiente codigo - ${code}`);
            const response = await this.authUseCase.registerPhoneNumber(user, { prefix, phone_number }, +code);
            this.invoke(response, 200, res, 'El telefono se registro correctamente', next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error al guardar el telefono', 500));
        }
    }

    public async verifyCode(req: Request, res: Response, next: NextFunction) {
        const { user } = req;
        const { code } = req.body;
        try {
            const response = await this.authUseCase.verifyPhoneNumber(user._id, +code);
            this.invoke(response, 200, res, 'El código de verificación se envió correctamente', next);
        } catch (error) {
            next(new ErrorHandler('El codigo no se ha enviado', 500));
        }
    }

}