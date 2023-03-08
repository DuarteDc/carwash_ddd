import { CustomerEntity } from '../../src/api/domain/customer/CustomerEntity';

export { }

declare global {
    namespace Express {
        export interface Request {
            user: CustomerEntity
        }
    }
}