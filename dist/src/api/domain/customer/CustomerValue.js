"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerValue = void 0;
class CustomerValue {
    constructor({ _id, fullname, privacity, email, password, stripe_customer, profile_image, createdAt, updatedAt }) {
        this._id = _id;
        this.fullname = fullname;
        this.privacity = privacity;
        this.email = email;
        this.password = password !== null && password !== void 0 ? password : '';
        this.stripe_customer = stripe_customer !== null && stripe_customer !== void 0 ? stripe_customer : '';
        this.profile_image = profile_image !== null && profile_image !== void 0 ? profile_image : '';
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.CustomerValue = CustomerValue;
