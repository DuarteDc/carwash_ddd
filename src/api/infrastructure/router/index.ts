import { Router } from 'express';

import authRouter from './auth/';
import authAdminRouter from './authAdmin';
import customerRouter from './customer/';
import servicesRouter from './services';
import typeCarRouter from './typeCar';
import typeCustomer from './typeCustomer';

export const apiRouter = (): Router => {

    const apiRouter = Router();

    apiRouter.use('/auth', authRouter);
    apiRouter.use('/auth/admin', authAdminRouter);
    apiRouter.use('/customer', customerRouter);
    apiRouter.use('/services', servicesRouter);
    apiRouter.use('/type-car', typeCarRouter)
    apiRouter.use('/type-customer', typeCustomer)


    return apiRouter;
}