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
exports.AuthPresenter = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthPresenter {
    generateJWT(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const payload = { user };
                jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT_KEY || '', {
                    expiresIn: '7d',
                }, (error, token) => {
                    if (error) {
                        console.log(error);
                        return reject('Error to generate JWT');
                    }
                    resolve({ token, user });
                });
            });
        });
    }
}
exports.AuthPresenter = AuthPresenter;
