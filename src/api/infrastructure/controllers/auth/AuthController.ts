import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../../../../shared/domain/ErrorHandler';
import { ResponseData } from '../../../../shared/infrastructure/validation/ResponseData';
import { AuthUseCase } from '../../../application/auth/AuthUseCase';

export class AuthController extends ResponseData {

    constructor(private authUseCase: AuthUseCase) {
        super();
        this.login      =   this.login.bind(this);
        this.register   =   this.register.bind(this);
    }


    public async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const response = await this.authUseCase.signIn(email, password);
            this.invoke(response, 200, res, '', next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error al iniciar sesión', 500));
        }
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        const { email, password, fullname } = req.body;
        try {
            const response = await this.authUseCase.signUp({ fullname, email, password });
            this.invoke(response, 200, res, '', next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error al iniciar sesión', 500));
        }
    }
}