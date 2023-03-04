import { Model, Document, Schema } from "mongoose";


export abstract class MongoRepository {

    private readonly MODEL;

    constructor(MODEL: Model<Document>) {
        this.MODEL = MODEL;
    }

    public async findAll(): Promise<any> {
        return await this.MODEL.find();
    }

    public async findById(_id: String): Promise<any> {
        return await this.MODEL.findById(_id);
    }

    public async updateOne(_id: String, updated: object, options: object): Promise<any> {
        return await this.MODEL.findByIdAndUpdate(_id, updated, options);
    }

    public async createOne(body: Object): Promise<any> {
        const newObject = new Model(body);
        await newObject.save()
        return newObject;
    }

    public async findOne(query: Object): Promise<any> {
        return await this.MODEL.findOne(query);
    }

}