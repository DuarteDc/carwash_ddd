import { Response, NextFunction } from 'express';

import { ErrorHandler } from '../../domain/ErrorHandler';
import { ICustomerAuth } from '../../../api/application/authentication/AuthenticationService';

export class ResponseData {

    private successResponse(res: Response, code: number = 200, data: ErrorHandler | ICustomerAuth | null, message: string): void {
        res.status(code).json({ data, ...(message && { message }) });
    }

    private badResponse(errorType: ErrorHandler, next: NextFunction): void {
        next(errorType);
    }

    public invoke(data: any, code: number, res: Response, message: string, next: NextFunction) {
        if (data instanceof ErrorHandler)
            return this.badResponse(data, next);

        return this.successResponse(res, code, data, message);
    }

}