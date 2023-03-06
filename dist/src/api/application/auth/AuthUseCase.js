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
exports.AuthUseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const ErrorHandler_1 = require("../../../shared/domain/ErrorHandler");
const Authentication_1 = require("../../infrastructure/authentication/Authentication");
class AuthUseCase extends Authentication_1.Authentication {
    constructor(customerRespository) {
        super();
        this.customerRespository = customerRespository;
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let customer = yield this.customerRespository.findOneItem({ email });
            if (!customer)
                return new ErrorHandler_1.ErrorHandler('El usuario o contraseña no son validos', 400);
            const validatePassword = bcrypt_1.default.compareSync(password, customer.password);
            if (!validatePassword)
                return new ErrorHandler_1.ErrorHandler('El usuario o contraseña no son validos', 400);
            return yield this.generateJWT(customer);
        });
    }
    signUp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let customer = yield this.customerRespository.findOneItem({ email: body.email });
            if (customer)
                return new ErrorHandler_1.ErrorHandler('El usuario ya ha sido registrado', 400);
            const password = yield this.encryptPassword(body.password);
            customer = yield this.customerRespository.createOne(Object.assign(Object.assign({}, body), { password }));
            return yield this.generateJWT(customer);
        });
    }
    signInWithGoogle(idToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let { fullname, email, picture } = yield this.validateGoogleToken(idToken);
            let customer = yield this.customerRespository.findOneItem({ email });
            if (customer)
                return yield this.generateJWT(customer);
            customer = yield this.customerRespository.createOne({ fullname, email, image_profile: picture });
            const salt = bcrypt_1.default.genSaltSync();
            const pass = customer.password = bcrypt_1.default.hashSync(customer.password, salt);
            customer = yield this.customerRespository.updateOne(customer._id, { password: pass }, { new: true });
            if (customer)
                yield this.generateJWT(customer);
        });
    }
}
exports.AuthUseCase = AuthUseCase;
