import { Router } from 'express';

import { ServicesUseCase } from '../../../application/services/ServicesUseCase';
import { ServicesController } from '../../controllers/services/ServiceController';
import { ServiceRepository } from '../../repository/services/ServiceRepository';

import ServiceModel from '../../models/ServicesModel';

const customerRouter = Router();

const serviceRepository    = new ServiceRepository(ServiceModel);
const servicesUseCase      = new ServicesUseCase(serviceRepository);
const servicesController   = new ServicesController(servicesUseCase);

customerRouter
    .get('/', servicesController.getAllServices)
    .get('/:id', servicesController.getService)
    .post('/', servicesController.createService)
    .patch('/:id', servicesController.updateService)
    .delete('/:id', servicesController.deleteService)

export default customerRouter;

