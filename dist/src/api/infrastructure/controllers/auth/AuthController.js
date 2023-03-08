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
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.uploadProfilePhoto = this.uploadProfilePhoto.bind(this);
        this.revalidateToken = this.revalidateToken.bind(this);
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const response = yield this.authUseCase.signIn(email, password);
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
                this.invoke(response, 200, res, '', next);
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al iniciar sesión', 500));
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password, new_password } = req.body;
            const user = req.user;
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
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                const { message, key } = yield this.s3Service.uploadToS3(user._id, req.file);
                const response = yield this.authUseCase.updateProfilePhoto(key, user._id);
                this.invoke(response, 200, res, message, next);
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al subir la foto', 400));
            }
        });
    }
    revalidateToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                const response = yield this.authUseCase.generateToken(user);
                this.invoke(response, 200, res, '', next);
            }
            catch (error) {
                next(new ErrorHandler_1.ErrorHandler('Hubo un error al generar el token', 500));
            }
        });
    }
    sendVerificationCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req;
            try {
                const code = (0, Utils_1.generateRandomCode)();
                yield this.twilioService.sendSMS(`xD ${code}`);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.AuthController = AuthController;
