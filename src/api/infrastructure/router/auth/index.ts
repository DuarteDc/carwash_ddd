import { Router } from 'express';
import { AuthUseCase } from '../../../application/auth/AuthUseCase';
import { AuthController } from '../../controllers/auth/AuthController';
import CustomerModel from '../../models/CustomerModel';
import { CustomerRepository } from '../../repository/customer/CustomerRepository';


const authRouter = Router();

const customerRespository = new CustomerRepository(CustomerModel);
const authUseCase = new AuthUseCase(customerRespository);
const customerController = new AuthController(authUseCase);

authRouter
    .post('/login', customerController.login)
    .post('/register', customerController.register)

export default authRouter;

