import { CustomerEntity } from '../../src/api/domain/customer/CustomerEntity';
import { UserEntity } from '../../src/api/domain/user/UserEntity';

export { }

declare global {
    namespace Express {
        export interface Request {
            user : CustomerEntity | UserEntity,
            files: File[]
        }
    }
}