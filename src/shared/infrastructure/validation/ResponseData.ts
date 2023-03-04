import { Response, NextFunction } from 'express';
import { CustomerEntity } from '../../../api/domain/customer/CustomerEntity';
import { ErrorHandler } from '../../domain/ErrorHandler';

export class ResponseData {


    private successResponse(res: Response, code: number = 200, data: ErrorHandler | CustomerEntity | null, message: string): void {
        res.status(code).json({ data, message });
    }

    private badResponse(errorType: ErrorHandler, next: NextFunction): void {
        next(errorType);
    }

    public invoke(data: ErrorHandler | CustomerEntity | null, code: number, res: Response, message: string, next: NextFunction) {
        if (data instanceof ErrorHandler) 
            return this.badResponse(data, next);
        
        return this.successResponse(res, code, data, message);
    }

}