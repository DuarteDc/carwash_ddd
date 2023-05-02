import bcrypt from 'bcrypt';
import { ErrorHandler } from '../../../shared/domain/ErrorHandler';
import { CustomerEntity } from '../../domain/customer/CustomerEntity';

import { CustomerRepository } from '../../domain/customer/CustomerRepository';

export class CustomerUseCase {

    constructor(private readonly customerRepository: CustomerRepository) { }

    public async getCustomers(): Promise<CustomerEntity | ErrorHandler | null> {
        return await this.customerRepository.findAll();
    }

    public async getDetailCustomer(_id: string): Promise<CustomerEntity | ErrorHandler | null> {
        return await this.customerRepository.findById(_id);
    }

    public async createNewCustomer(fullname: String,email: String,pass: Buffer): Promise<CustomerEntity | ErrorHandler | null> {

        const customer = await this.customerRepository.findOneItem({ email });
        if (customer) return new ErrorHandler('El usuario ya ha sido registrado',400);
        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(pass,salt);
        return await this.customerRepository.createOne({ fullname,email,password });

    }

    public async updateOneCustomer(_id: string,updated: object): Promise<CustomerEntity | ErrorHandler | null> {
        return await this.customerRepository.updateOne(_id,updated);
    }

    public async becomeAPartner(customer_id: string): Promise<CustomerEntity | ErrorHandler | null> {

        const customer = await this.customerRepository.findById(customer_id);
        if (!customer) return new ErrorHandler('El usuario no es correcto', 400);

        return await this.customerRepository.updateOne(customer_id,{ type: '1' })

    }

}