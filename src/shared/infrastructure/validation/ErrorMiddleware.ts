import { Request, Response, NextFunction } from 'express';

import { ErrorHandler } from '../../domain/ErrorHandler';

export class ErrorMiddleware {

    private defaultHttpErrorCode: number = 500;

    public routeNotFoundErrorHandler = (req: Request, res: Response): void => {
        res.status(404).json({ status: 404, message: 'Route not found' });
    };

    public customErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
        if (err instanceof ErrorHandler) {
            const { statusCode, message } = err;
            res.status(statusCode).json({
                status: statusCode,
                message: message
            });
        } else {
            next(err);
        }
    };

    public globalErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
        return res.status(this.defaultHttpErrorCode).json({
            status: this.defaultHttpErrorCode,
            message: 'Something wrong happened :`('
        });
    };

}