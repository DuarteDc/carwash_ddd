import { Model,Document } from 'mongoose';

export abstract class MongoRepository {

    private readonly MODEL;

    constructor(MODEL: Model<Document>) {
        this.MODEL = MODEL;
    }

    public async findAll(populateConfig ?: any): Promise<any> {
        return await this.MODEL.find().populate(populateConfig);
    }

    public async findById(_id: String,populateConfig ?: any): Promise<any> {
        return await this.MODEL.findById(_id);
    }

    public async updateOne(_id: String,updated: object): Promise<any> {
        return await this.MODEL.findByIdAndUpdate(_id,updated,{ new: true });
    }

    public async createOne(body: Object): Promise<any> {
        const newObject = new this.MODEL(body);
        await newObject.save()
        return newObject;
    }

    public async findOneItem(query: Object,populateConfig ?: any): Promise<any> {
        return await this.MODEL.findOne(query).populate(populateConfig);
    }

}