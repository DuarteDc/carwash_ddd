import { Router } from 'express';

import customerRouter from './customer/';
import authRouter from './auth/';

export const apiRouter = (): Router => {

    const apiRouter = Router();

    apiRouter.use('/auth', authRouter);
    apiRouter.use('/customer', customerRouter);


    return apiRouter;
}