import { Model } from 'mongoose';

import { CustomerRepository as CustomerConfig } from '../../../domain/customer/CustomerRepository';

import { MongoRepository } from '../MongoRepository';

import { CustomerEntity } from '../../../domain/customer/CustomerEntity';

export class CustomerRepository extends MongoRepository implements CustomerConfig {

    constructor(protected CustomerModel: Model<any>) {
        super(CustomerModel);
    }

    async findOneCustomer(query: Object): Promise<CustomerEntity | null> {
        return await this.findOneItem(query);
    }

    async findByEmailCustomer(email: String): Promise<CustomerEntity | null> {
        return await this.findOneItem({ email });
    }

    async findByIdCustomer(_id: String): Promise<CustomerEntity | null> {
        return await this.findById(_id);
    }
    async findAndUpdateCustomer(_id: String, updated: object): Promise<CustomerEntity | null> {
        return await this.updateOne(_id, updated, { new: true });
    }
    async findAllCustomers(): Promise<CustomerEntity[] | null> {
        return await this.findAll();
    }

    async createOneCustomer(body: Object): Promise<CustomerEntity | null> {
        return await this.createOne(body);
    }



}