import { Schema, model } from 'mongoose';

import { TypeCustomerEntity } from '../../domain/typeCustomer/TypeCustomerEntity';

const TypeCustomerSchema = new Schema<TypeCustomerEntity>({
    name:{
        type    : String,
        required: true,
    },
    status: {
        type   : Boolean,
        default: true,
    }
}, {
    versionKey: false,
    timestamps: true,
});

const TypeCustomerModel =  model('TypeCustomer', TypeCustomerSchema);

export default TypeCustomerModel;