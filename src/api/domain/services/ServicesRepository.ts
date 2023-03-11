import { MongoRepository } from '../../infrastructure/repository/MongoRepository';
import { ServicesEntity } from './ServicesEntity';

export interface ServicesRepository extends MongoRepository {

    deleteOneService(_id: string): Promise<ServicesEntity | null>
    
}