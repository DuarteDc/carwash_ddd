import { Model } from 'mongoose';

import { ServicesRepository as ServicesConfig } from '../../../domain/services/ServicesRepository';
import { MongoRepository } from '../MongoRepository';

import { ServicesEntity } from '../../../domain/services/ServicesEntity';

export class ServiceRepository extends MongoRepository implements ServicesConfig {

    constructor(protected ServiceModel: Model<any>) {
        super(ServiceModel)
    }

    async findOneCustomer(query: Object): Promise<ServicesEntity | null> {
        return await this.findOneItem(query);
    }

    async findByIdCustomer(_id: String): Promise<ServicesEntity | null> {
        return await this.findById(_id);
    }
    async findAndUpdateCustomer(_id: String, updated: object): Promise<ServicesEntity | null> {
        return await this.updateOne(_id, updated);
    }
    async findAllCustomers(): Promise<ServicesEntity[] | null> {
        return await this.findAll();
    }

    async createOneCustomer(body: Object): Promise<ServicesEntity | null> {
        return await this.createOne(body);
    }

    async deleteOneService(_id: string): Promise<ServicesEntity | null> {
        return await this.ServiceModel.findByIdAndUpdate(_id, { status: false }, { new: true });
    }
}