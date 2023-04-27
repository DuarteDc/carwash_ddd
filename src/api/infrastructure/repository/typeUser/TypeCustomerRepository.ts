import { TypeCustomerEntity } from '../../../domain/typeCustomer/TypeCustomerEntity';
import { TypeCustomerRepository as TypeCustomerConfig } from '../../../domain/typeCustomer/TypeCustomerResitory';
import TypeCustomerModel from '../../models/TypeCustomerModel';

export class TypeCustomerRepository implements TypeCustomerConfig {

    async getAllTypeCustomers(): Promise<TypeCustomerEntity[] | null> {
        return await TypeCustomerModel.find({ status: true });
    }
    async getOneTypeCustomer(_id: string): Promise<TypeCustomerEntity | null> {
        return await TypeCustomerModel.findById(_id,{ status: true });
    }
    async createTypeCustomer(body: object): Promise<TypeCustomerEntity | null> {
        const typeCustomer = new TypeCustomerModel(body);
        return await typeCustomer.save();
    }
    async updateOneTypeCustomer(_id: string,name: string): Promise<TypeCustomerEntity | null> {
        return await TypeCustomerModel.findByIdAndUpdate(_id,{ name },{ new: true });
    }
    async deleteOneTypeCustomer(_id: string): Promise<TypeCustomerEntity | null> {
        return await TypeCustomerModel.findByIdAndUpdate(_id,{ status: false },{ new: true });
    }

}