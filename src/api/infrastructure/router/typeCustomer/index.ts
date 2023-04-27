import { Router } from 'express';

import { TypeCustomerRepository } from '../../repository/typeUser/TypeCustomerRepository';
import { TypeCustomerUseCase } from '../../../application/typeCustomer/TypeCustomerUseCase';
import { TypeCustomerController } from '../../controllers/typeCustomer/TypeCustomerController';

const typeCustomer = Router();

const typeCustomerRepository    = new TypeCustomerRepository();
const typeCustomerUseCase       = new TypeCustomerUseCase(typeCustomerRepository);
const typeCustomerController    = new TypeCustomerController(typeCustomerUseCase);

typeCustomer
    .get('/', typeCustomerController.getAllTypeCustomer)
    .get('/:id', typeCustomerController.getTypeCustomer)
    .post('/', typeCustomerController.createTypeCustomer)
    .patch('/:id', typeCustomerController.updateTypeCustomer)
    .delete('/:id', typeCustomerController.deleteTypeCustomer)

export default typeCustomer;

