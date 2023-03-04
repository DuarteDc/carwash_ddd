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
class AuthController extends ResponseData_1.ResponseData {
    constructor(authUseCase) {
        super();
        this.authUseCase = authUseCase;
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
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
}
exports.AuthController = AuthController;
