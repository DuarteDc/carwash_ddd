import { TypeCarEntity, IService } from '../../../domain/typeCar/TypeCarEntity';
import { TypeCarRepository as TypeCarConfig } from '../../../domain/typeCar/TypeCarRepository';
import TypeCarModel from '../../models/TypeCarModel';

export class TypeCarRepository implements TypeCarConfig {

    async getAllTypeCars(): Promise<TypeCarEntity[] | null> {
        return await TypeCarModel.find();
    }
    async getOneTypeCar(_id: string): Promise<TypeCarEntity | null> {
        return await TypeCarModel.findById(_id);
    }
    async createTypeCar(body: object): Promise<TypeCarEntity | null> {
        const typeCar = new TypeCarModel(body);
        return await typeCar.save();
    }
    async updateOneTypeCar(_id: string, name: string): Promise<TypeCarEntity | null> {
        return await TypeCarModel.findByIdAndUpdate(_id, { name }, { new: true });
    }
    async updateOneServiceFromTypeCar(_id: string, updated: IService): Promise<TypeCarEntity | null> {
        return await TypeCarModel.findByIdAndUpdate(_id, updated, { new: true });
    }
    async deleteOneTypeCar(_id: string): Promise<TypeCarEntity | null> {
        return await TypeCarModel.findByIdAndUpdate(_id, { status: false }, { new: true });
    }
    async deleteOneServiceFromTypeCar(_id: string): Promise<TypeCarEntity | null> {
        return await TypeCarModel.findByIdAndUpdate(_id, { status: false }, { new: true });
    }

}