import { Router } from 'express';

import { CustomerUseCase } from '../../../application/customer/CustomerUseCase';
import { CustomerController } from '../../controllers/customer/CustomerController';
import { CustomerRepository } from '../../repository/customer/CustomerRepository';

import CustomerModel from '../../models/CustomerModel';

const customerRouter = Router();

const customerRepository = new CustomerRepository(CustomerModel);
const customerUserCase = new CustomerUseCase(customerRepository);
const customerController = new CustomerController(customerUserCase);

customerRouter
    .get('/', customerController.getAllCustomers)
    .get('/:id', customerController.getCustomerDetail)
    .post('/', customerController.createCustomer)
    .patch('/:id', customerController.updateCustomer)
    .delete('/:id', customerController.deleteCustomer)

export default customerRouter;

