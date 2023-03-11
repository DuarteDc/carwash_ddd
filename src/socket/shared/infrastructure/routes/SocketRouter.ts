import { Router as ExpressRouter } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

import { ErrorMiddleware } from '../../../../shared/infrastructure/validation/ErrorMiddleware';

export const Router = (socketRouter: ExpressRouter, errorMiddleware: ErrorMiddleware): ExpressRouter => {

    const router = ExpressRouter();

    router
        .use(cors())
        .use(bodyParser.json())
        .use(
            bodyParser.urlencoded({
                extended: false
            })
        )
        .use(compression())

    router.use('/api/socket', socketRouter);
    router.use(errorMiddleware.routeNotFoundErrorHandler);
        
    router.use(errorMiddleware.customErrorHandler);
    router.use(errorMiddleware.globalErrorHandler);

    return router;

}