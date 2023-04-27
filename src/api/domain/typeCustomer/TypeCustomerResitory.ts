import { TypeCustomerEntity } from './TypeCustomerEntity';

export interface TypeCustomerRepository {

    getAllTypeCustomers(): Promise<TypeCustomerEntity[] | null>

    getOneTypeCustomer(_id: string): Promise<TypeCustomerEntity | null>

    createTypeCustomer(body: object): Promise<TypeCustomerEntity | null>

    updateOneTypeCustomer(_id: string, name: string): Promise<TypeCustomerEntity | null>

    deleteOneTypeCustomer(_id: string): Promise<TypeCustomerEntity | null>

}