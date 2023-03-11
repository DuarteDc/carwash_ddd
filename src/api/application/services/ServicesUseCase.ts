import { ServicesEntity } from "../../domain/services/ServicesEntity";
import { ServicesRepository } from "../../domain/services/ServicesRepository";

export class ServicesUseCase {

    constructor(private servicesRepository: ServicesRepository) { }

    public async getServices(): Promise<ServicesEntity[] | null> {
        return this.servicesRepository.findAll();
    }

    public async getDetailService(_id: string): Promise<ServicesEntity | null> {
        return this.servicesRepository.findById(_id);
    }

    public async createNewService(name: string, description: string): Promise<ServicesEntity | null> {
        return this.servicesRepository.createOne({ name, description })
    }

    public async updateOneService(_id: string, updated: object): Promise<ServicesEntity | null> {
        return this.servicesRepository.updateOne(_id, updated);
    }

    public async deleteOneService(_id: string): Promise<ServicesEntity | null> {
        return this.servicesRepository.deleteOneService(_id)
    }
}