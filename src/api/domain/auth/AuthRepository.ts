import { MongoRepository } from '../../infrastructure/repository/MongoRepository';
import { CustomerEntity } from '../customer/CustomerEntity';
export interface AuthRepository extends MongoRepository {
    validatePhoneNumber(phone: number, customer_id: string): Promise<CustomerEntity | null>
    verifyCode(_id: string): Promise<CustomerEntity | null>
}