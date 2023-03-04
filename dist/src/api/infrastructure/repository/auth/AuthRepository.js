"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const MongoRepository_1 = require("../MongoRepository");
class AuthRepository extends MongoRepository_1.MongoRepository {
    constructor(CustomerModel) {
        super(CustomerModel);
        this.CustomerModel = CustomerModel;
    }
}
exports.AuthRepository = AuthRepository;
