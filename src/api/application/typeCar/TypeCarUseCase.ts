import { IService, TypeCarEntity } from '../../domain/typeCar/TypeCarEntity';
import { TypeCarRepository } from '../../domain/typeCar/TypeCarRepository';

export class TypeCarUseCase {
    constructor(private typeCarRepository: TypeCarRepository) { }

    public async getTypeCars(): Promise<TypeCarEntity[] | null> {
        return await this.typeCarRepository.getAllTypeCars();
    }

    public async getTypeCar(_id: string): Promise<TypeCarEntity | null> {
        return await this.typeCarRepository.getOneTypeCar(_id);
    }

    public async createNewTypeCar(body:TypeCarEntity | object):Promise<TypeCarEntity | null> {
        return await this.typeCarRepository.createTypeCar(body);
    }

    public async updateTypeCar(_id: string, name: string): Promise<TypeCarEntity | null> {
        return await this.typeCarRepository.updateOneTypeCar(_id, name);
    }

    public async updateTypeCarService(_id: string, updated: IService): Promise<TypeCarEntity | null> {
        return await this.typeCarRepository.updateOneServiceFromTypeCar(_id, updated);
    }

    public async deleteTypeCar(_id: string): Promise<TypeCarEntity | null> {
        return await this.typeCarRepository.deleteOneTypeCar(_id);
    }

    public async deleteTypeCarService(_id: string): Promise<TypeCarEntity | null> {
        return await this.typeCarRepository.deleteOneServiceFromTypeCar(_id);
    }

}