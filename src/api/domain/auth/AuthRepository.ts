import { MongoRepository } from '../../infrastructure/repository/MongoRepository';
import { CustomerEntity } from '../customer/CustomerEntity';
export interface AuthRepository extends MongoRepository {
    validatePhoneNumber(phone: number): Promise<CustomerEntity | null>
    verifyCode(_id: string): Promise<CustomerEntity | null>
}