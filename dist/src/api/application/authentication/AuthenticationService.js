"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCustomer = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthCustomer {
    generateJWT(user) {
        return new Promise((resolve, reject) => {
            const payload = { user };
            jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT_KEY || '', {
                expiresIn: '7d',
            }, (error, token) => {
                if (error) {
                    console.log(error);
                    return reject('Error to generate JWT');
                }
                resolve(token);
            });
        });
    }
}
exports.AuthCustomer = AuthCustomer;
