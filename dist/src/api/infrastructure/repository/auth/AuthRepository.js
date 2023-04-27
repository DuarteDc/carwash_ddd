"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const MongoRepository_1 = require("../MongoRepository");
const TypeCustomerModel_1 = __importDefault(require("../../models/TypeCustomerModel"));
class AuthRepository extends MongoRepository_1.MongoRepository {
    constructor(CustomerModel) {
        super(CustomerModel);
        this.CustomerModel = CustomerModel;
    }
    validateTypeCustomer(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield TypeCustomerModel_1.default.findById(_id);
        });
    }
    verifyCode(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.CustomerModel.findByIdAndUpdate(_id, { 'phone.verified': true }, { new: true });
        });
    }
    validatePhoneNumber(phone, customer_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.CustomerModel.findOne({ 'phone.phone_number': phone, _id: { $ne: customer_id } });
        });
    }
}
exports.AuthRepository = AuthRepository;
