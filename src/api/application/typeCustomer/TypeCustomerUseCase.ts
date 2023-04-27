import { ErrorHandler } from '../../../shared/domain/ErrorHandler';
import { TypeCustomerEntity } from '../../domain/typeCustomer/TypeCustomerEntity';
import { TypeCustomerRepository } from '../../domain/typeCustomer/TypeCustomerResitory';

export class TypeCustomerUseCase {
    constructor(private typeCustomerRepository: TypeCustomerRepository) { }

    public async getTypeCustomers(): Promise<TypeCustomerEntity[] | null> {
        return await this.typeCustomerRepository.getAllTypeCustomers()
    }

    public async getTypeCustomer(_id: string): Promise<TypeCustomerEntity | ErrorHandler | null> {
        const customer = await this.typeCustomerRepository.getOneTypeCustomer(_id);
        if (!customer) return new ErrorHandler('El usuario no existe o no es valido',400);
        return await this.typeCustomerRepository.getOneTypeCustomer(_id);
    }

    public async createNewTypeCustomer(body: TypeCustomerEntity | object): Promise<TypeCustomerEntity | null> {
        return await this.typeCustomerRepository.createTypeCustomer(body);
    }

    public async updateTypeCustomer(_id: string,name: string): Promise<TypeCustomerEntity | ErrorHandler | null> {
        const customer = await this.typeCustomerRepository.getOneTypeCustomer(_id);
        if (!customer) return new ErrorHandler('El usuario no existe o no es valido',400);
        return await this.typeCustomerRepository.updateOneTypeCustomer(_id,name);
    }

    public async deleteTypeCustomer(_id: string): Promise<TypeCustomerEntity | ErrorHandler | null> {
        const customer = await this.typeCustomerRepository.getOneTypeCustomer(_id);
        if (!customer) return new ErrorHandler('El usuario no existe o no es valido',400);
        return await this.typeCustomerRepository.deleteOneTypeCustomer(_id);
    }

}