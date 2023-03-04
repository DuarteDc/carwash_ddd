"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
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
const CustomerSchema = Schema({
    fullname: {
        type: String,
        required: true,
    },
    privacity: {
        type: Boolean,
        default: true,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    stripe_customer: {
        type: String,
        required: false
    },
    profileImage: {
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
}, {
    timestamps: true
});
ClientSchema.method('toJSON', function () {
    const _a = this.toObject(), { __v, password } = _a, client = __rest(_a, ["__v", "password"]);
    return client;
});
ClientSchema.plugin(mongoosePaginate);
module.exports = model('Customer', CustomerSchema);
