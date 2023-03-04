import { CustomerEntity } from './CustomerEntity';

export class CustomerValue implements CustomerEntity {

    readonly _id     :   String;
    fullname         :   String;
    privacity        :   Boolean;
    email            :   String;
    password        ?:   String;
    stripe_customer ?:   String;
    profile_image   ?:   String;
    createdAt        :   NativeDate;
    updatedAt        :   NativeDate;


    constructor({_id, fullname, privacity, email, password, stripe_customer, profile_image, createdAt, updatedAt} : CustomerEntity){

        this._id                = _id;
        this.fullname           = fullname;
        this.privacity          = privacity;
        this.email              = email;
        this.password           = password ?? '';
        this.stripe_customer    = stripe_customer ?? '';
        this.profile_image      = profile_image ?? '';
        this.createdAt          = createdAt;
        this.updatedAt          = updatedAt;
    }

}