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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUseCase = void 0;
const AuthenticationService_1 = require("../authentication/AuthenticationService");
const ErrorHandler_1 = require("../../../shared/domain/ErrorHandler");
const MomentService_1 = require("../../../shared/infrastructure/moment/MomentService");
class AuthUseCase extends AuthenticationService_1.Authentication {
    constructor(authRepository) {
        super();
        this.authRepository = authRepository;
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let customer = yield this.authRepository.findOneItem({ email });
            if (!customer)
                return new ErrorHandler_1.ErrorHandler('El usuario o contraseña no son validos', 400);
            const validatePassword = this.decryptPassword(password, customer.password);
            if (!validatePassword)
                return new ErrorHandler_1.ErrorHandler('El usuario o contraseña no son validos', 400);
            return yield this.generateJWT(customer);
        });
    }
    signUp(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let customer = yield this.authRepository.findOneItem({ email: body.email });
            if (customer)
                return new ErrorHandler_1.ErrorHandler('El usuario ya ha sido registrado', 400);
            const password = yield this.encryptPassword(body.password);
            customer = yield this.authRepository.createOne(Object.assign(Object.assign({}, body), { password }));
            return yield this.generateJWT(customer);
        });
    }
    signInWithGoogle(idToken) {
        return __awaiter(this, void 0, void 0, function* () {
            let { fullname, email, picture } = yield this.validateGoogleToken(idToken);
            let customer = yield this.authRepository.findOneItem({ email });
            if (customer)
                return yield this.generateJWT(customer);
            let password = this.generateRandomPassword();
            password = this.encryptPassword(password);
            customer = yield this.authRepository.createOne({ fullname, email, image_profile: picture, password });
            return yield this.generateJWT(customer);
        });
    }
    changePassword(password, newPassword, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let customer = yield this.authRepository.findById(user._id);
            const currentPassword = this.decryptPassword(password, customer.password);
            if (!currentPassword)
                return new ErrorHandler_1.ErrorHandler('Error la contraseña actual no es valida', 400);
            const newPass = this.encryptPassword(newPassword);
            return yield this.authRepository.updateOne(customer._id, { password: newPass });
        });
    }
    updateProfilePhoto(photo, customer_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.authRepository.updateOne(customer_id, { profile_image: photo });
        });
    }
    generateToken(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.generateJWT(customer);
        });
    }
    registerPhoneNumber(customer, phone_data, code) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone_number, prefix } = phone_data;
            const phoneData = yield this.authRepository.validatePhoneNumber(phone_number, customer._id);
            if (phoneData)
                return new ErrorHandler_1.ErrorHandler('El telefono ya ha sido registrado', 400);
            const data = { phone: { code, prefix, phone_number, expiration_date: new MomentService_1.MomentService().addMinutesToDate(5) } };
            return yield this.authRepository.updateOne(customer._id, data);
        });
    }
    verifyPhoneNumber(_id, currentCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield this.authRepository.findById(_id);
            if (!customer.phone.phone_number)
                return new ErrorHandler_1.ErrorHandler('Ingresa un numero telefonico antes de continuar', 400);
            if (customer.phone.verified)
                return new ErrorHandler_1.ErrorHandler('El telefono ya ha sido verificado', 400);
            const { expiration_date, code } = customer.phone;
            if (code !== currentCode)
                return new ErrorHandler_1.ErrorHandler('El código no es correcto', 400);
            if (!new MomentService_1.MomentService().verifyExpirationDate(expiration_date))
                return new ErrorHandler_1.ErrorHandler('El código ha expirado', 400);
            return yield this.authRepository.verifyCode(customer._id);
        });
    }
}
exports.AuthUseCase = AuthUseCase;
