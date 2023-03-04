"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const test_1 = __importDefault(require("./environments/test"));
const development_1 = __importDefault(require("./environments/development"));
const production_1 = __importDefault(require("./environments/production"));
const { NODE_ENV } = process.env;
let currentConfig = test_1.default;
exports.config = currentConfig;
switch (NODE_ENV) {
    case 'production':
        exports.config = currentConfig = production_1.default;
        break;
    case 'test':
        exports.config = currentConfig = test_1.default;
        break;
    default:
        exports.config = currentConfig = development_1.default;
}
