import { Model } from 'mongoose';
import { MongoRepository } from '../MongoRepository';

export class AuthRepository extends MongoRepository implements AuthRepository {

    constructor(protected CustomerModel: Model<any>) {
        super(CustomerModel);
    }


}