import { Schema, model } from 'mongoose';
import { IService, TypeCarEntity } from '../../domain/typeCar/TypeCarEntity';


const ServiceSchema = new Schema<IService>({
    name: {
        type    : String,
        required: true,
    },
    description: {
        type    : String,
        required: true,
    },
    price: {
        type    : Number,
        required: true,
    },
    status: {
        type    : Boolean,
        default : true,
    },
    service_id: {
        type        : Schema.Types.ObjectId,
        ref         : 'Service',
        required    : true,
    }
}, {
    versionKey: false,
    timestamps: true,
});


const TypeCarSchema = new Schema<TypeCarEntity>({
    name:{
        type        : String,
        required    : true,
    },
    status: {
        type    : Boolean,
        default : true,
    },
    services        : [ServiceSchema]
}, {
    versionKey: false,
    timestamps: true,
});

const TypeCarModel = model('TypeCar', TypeCarSchema);

export default TypeCarModel;