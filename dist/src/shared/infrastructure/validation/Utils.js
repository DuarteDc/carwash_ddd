"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomCode = void 0;
const generate_password_1 = __importDefault(require("generate-password"));
const generateRandomCode = () => generate_password_1.default.generate({
    length: 4,
    numbers: true,
    lowercase: false,
    uppercase: false
});
exports.generateRandomCode = generateRandomCode;
