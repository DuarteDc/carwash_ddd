import { Model } from 'mongoose';
import { MongoRepository } from '../MongoRepository';
import { AuthRepository as AuthConfig } from '../../../domain/auth/AuthRepository';
import { ErrorHandler } from '../../../../shared/domain/ErrorHandler';
import { ICustomerAuth } from '../../../application/authentication/AuthenticationService';

export class AuthRepository extends MongoRepository implements AuthConfig {

    constructor(protected CustomerModel: Model<any>) {
        super(CustomerModel);
    }

    

}