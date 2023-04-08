import { MongoRepository } from '../../infrastructure/repository/MongoRepository';
import { TypeCarEntity, IService } from './TypeCarEntity';


export interface TypeCarRepository {

    getAllTypeCars(): Promise<TypeCarEntity[] | null>

    getOneTypeCar(_id: string): Promise<TypeCarEntity | null>

    createTypeCar(body: object): Promise<TypeCarEntity | null>

    updateOneTypeCar(_id: string, name: string): Promise<TypeCarEntity | null>

    updateOneServiceFromTypeCar(_id: string, updated: IService): Promise<TypeCarEntity | null>

    deleteOneTypeCar(_id: string): Promise<TypeCarEntity | null>

    deleteOneServiceFromTypeCar(_id: string): Promise<TypeCarEntity | null>

}