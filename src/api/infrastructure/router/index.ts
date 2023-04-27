import { Router } from 'express';

import customerRouter from './customer/';
import authRouter from './auth/';
import servicesRouter from './services';
import typeCarRouter from './typeCar';
import typeCustomer from './typeCustomer';

export const apiRouter = (): Router => {

    const apiRouter = Router();

    apiRouter.use('/auth', authRouter);
    apiRouter.use('/customer', customerRouter);
    apiRouter.use('/services', servicesRouter);
    apiRouter.use('/type-car', typeCarRouter)
    apiRouter.use('/type-customer', typeCustomer)


    return apiRouter;
}