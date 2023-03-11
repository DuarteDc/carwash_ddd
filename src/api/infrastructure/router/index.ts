import { Router } from 'express';

import customerRouter from './customer/';
import authRouter from './auth/';
import servicesRouter from './services';

export const apiRouter = (): Router => {

    const apiRouter = Router();

    apiRouter.use('/auth', authRouter);
    apiRouter.use('/customer', customerRouter);
    apiRouter.use('/services', servicesRouter);


    return apiRouter;
}