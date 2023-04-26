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
exports.AuthController = void 0;
const ErrorHandler_1 = require("../../../../shared/domain/ErrorHandler");
const ResponseData_1 = require("../../../../shared/infrastructure/validation/ResponseData");
const Utils_1 = require("../../../../shared/infrastructure/validation/Utils");
class AuthController extends ResponseData_1.ResponseData {
    constructor(authUseCase, s3Service, twilioService) {
        super();
        this.authUseCase = authUseCase;
        this.s3Service = s3Service;
        this.twilioService = twilioService;
        this.path = '/customers';
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.uploadProfilePhoto = this.uploadProfilePhoto.bind(this);
        this.revalidateToken = this.revalidateToken.bind(this);
        this.verifyCode = this.verifyCode.bind(this);
        this.savePhoneNumberAndSendCode = this.savePhoneNumberAndSendCode.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const response = yield this.authUseCase.signIn(email, password);
                console.log(response);
                if (!(response instanceof ErrorHandler_1.ErrorHandler) && response.user.profile_image === response.user._id.toString())
                    response.user.profile_image = yield this.s3Service.getUrlObject(response.user.profile_image);
                this.invoke(response, 200, res, '', next);
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al iniciar sesión', 500));
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, fullname } = req.body;
            try {
                const response = yield this.authUseCase.signUp({ fullname, email, password });
                this.invoke(response, 200, res, '', next);
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al iniciar sesión', 500));
            }
        });
    }
    loginWithGoogle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idToken } = req.body;
            try {
                const response = yield this.authUseCase.signInWithGoogle(idToken);
                if (response.user.profile_image === response.user._id.toString())
                    response.user.profile_image = yield this.s3Service.getUrlObject(response.user.profile_image);
                this.invoke(response, 200, res, '', next);
            }
            catch (error) {
                console.log(error);
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al iniciar sesión', 500));
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, new_password } = req.body;
            const { user } = req;
            try {
                const response = yield this.authUseCase.changePassword(password, new_password, user);
                this.invoke(response, 200, res, 'La contraseña se cambio con exito', next);
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al cambiar la contraseña', 500));
            }
        });
    }
    uploadProfilePhoto(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                const pathObject = `${this.path}/${user._id}/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.fieldname}`;
                const { message, key, url, success } = yield this.s3Service.uploadToS3AndGetUrl(pathObject, req.file);
                if (!success)
                    return new ErrorHandler_1.ErrorHandler('Hubo un error al subir la imagen', 400);
                const response = yield this.authUseCase.updateProfilePhoto(key, user._id);
                response.profile_image = url;
                this.invoke(response, 200, res, message, next);
            }
            catch (error) {
                console.log(error);
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al subir la foto', 500));
            }
        });
    }
    updateCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { email, fullname } = req.body;
            try {
                const response = yield this.authUseCase.updateCustomer(user._id, email, fullname);
                if (response.profile_image === response._id.toString())
                    response.profile_image = yield this.s3Service.getUrlObject(response.profile_image);
                this.invoke(response, 200, res, 'El usuario se actualizo con exito', next);
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al actualizar la información', 500));
            }
        });
    }
    revalidateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                // if(user.profile_image === user._id.toString()) user.profile_image = await this.s3Service.getUrlObject(user.profile_image);
                const response = yield this.authUseCase.generateToken(user);
                this.invoke(response, 200, res, '', next);
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al generar el token', 500));
            }
        });
    }
    savePhoneNumberAndSendCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { prefix, phone_number } = req.body;
            try {
                const code = (0, Utils_1.generateRandomCode)();
                //await this.twilioService.sendSMS(`Verifica tu número de teléfono con el siguiente codigo - ${code}`);
                const response = yield this.authUseCase.registerPhoneNumber(user, { prefix, phone_number }, +code);
                this.invoke(response, 200, res, 'El telefono se registro correctamente', next);
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al guardar el telefono', 500));
            }
        });
    }
    verifyCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            const { code } = req.body;
            try {
                const response = yield this.authUseCase.verifyPhoneNumber(user._id, +code);
                this.invoke(response, 200, res, 'El código de verificación se envió correctamente', next);
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('El codigo no se ha enviado', 500));
            }
        });
    }
    uploadFiles({ files, user }, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const documents = [files === null || files === void 0 ? void 0 : files.ine, files === null || files === void 0 ? void 0 : files.curp, files === null || files === void 0 ? void 0 : files.prook_address, files === null || files === void 0 ? void 0 : files.criminal_record];
            let keys = [];
            try {
                if (!(files === null || files === void 0 ? void 0 : files.ine) || !(files === null || files === void 0 ? void 0 : files.curp) || !(files === null || files === void 0 ? void 0 : files.prook_address) || !(files === null || files === void 0 ? void 0 : files.criminal_record))
                    return next(new ErrorHandler_1.ErrorHandler('los archivos son requeridos', 400));
                yield Promise.all(documents === null || documents === void 0 ? void 0 : documents.map((file) => __awaiter(this, void 0, void 0, function* () {
                    const pathObject = `${this.path}/${user._id}/${file[0].fieldname}`;
                    keys.push({ field: file[0].fieldname, key: pathObject });
                    yield this.s3Service.uploadToS3(pathObject, file[0]);
                })));
                const response = yield this.authUseCase.uploadCustomerFiles(user._id, keys);
                this.invoke(response, 200, res, 'Los archivos se subieron correctamente', next);
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al subir los archivos', 500));
            }
        });
    }
}
exports.AuthController = AuthController;
