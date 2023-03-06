
import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

import { CustomerEntity } from '../../domain/customer/CustomerEntity';

// const VerifyPhoneNumberSchema = Schema({
//     code: {
//         type: String,
//         required: false,
//     },
//     prefix: {
//         type: String,
//         required: false,
//     },
//     phone_number: {
//         type: String,
//         required: false,
//     },
//     expiration_date: {
//         type: Date,
//         required: false,
//     },
//     verified: {
//         type: Boolean,
//         required: true,
//         default: false
//     },
// },
//     {
//         timestamps: true
//     }
// );

const CustomerSchema = new Schema<CustomerEntity>({
    fullname: {
        type: String,
        required: true,
    },
    privacity: {
        type: Boolean,
        default: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    stripe_customer: {
        type: String,
        required: false
    },
    profile_image: {
        type: String,
        required: false,
    },
    // google: {
    //     type: Boolean,
    //     default: false
    // },
    // phone: VerifyPhoneNumberSchema,
    // type_client_id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'TypeClient',
    //     required: false,
    // },
    // status: {
    //     type: Boolean,
    //     default: true,
    // },
    // email_verified: {
    //     type: Boolean,
    //     default: true
    // },
    // facturapi_id: {
    //     type: String,
    //     required: false
    // },
    // ine: {
    //     type: String,
    //     required: false,
    // },
    // curp: {
    //     type: String,
    //     required: false,
    // },
    // prook_address: {
    //     type: String,
    //     required: false,
    // },
    // criminal_record: {
    //     type: String,
    //     required: false,
    // }
},
    {
        timestamps: true,
        versionKey: false,
    },
);

CustomerSchema.method('toJSON', function () {
    const { __v, password, ...client } = this.toObject();
    return client;
});

CustomerSchema.plugin(mongoosePaginate);

const CustomerModel = model('Customer', CustomerSchema);

export default CustomerModel;