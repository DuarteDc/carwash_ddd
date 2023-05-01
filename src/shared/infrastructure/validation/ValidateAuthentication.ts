import { Request, Response, NextFunction } from 'express';

import Jwt from 'jsonwebtoken';

import { config } from '../../../../config';

import { CustomerEntity } from '../../../api/domain/customer/CustomerEntity';
import { UserEntity } from '../../../api/domain/user/UserEntity';
import { ErrorHandler } from '../../domain/ErrorHandler';

export const validateAuthentication = (req: Request, res: Response, next: NextFunction) => {

        const token = req.header('token');

        if (!token) return next(new ErrorHandler('Token is required', 401));

        try {
            const { user } = Jwt.verify(token, config.SECRET_JWT_KEY) as { user: CustomerEntity | UserEntity };
            if (!user) return next(new ErrorHandler('El usuario no es valido', 400));
            req.user = user;

            next();
        } catch (error) {
            next(new ErrorHandler('Token no valido', 400));
        }
    }

export default validateAuthentication;