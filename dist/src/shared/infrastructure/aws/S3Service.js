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
exports.S3Service = void 0;
const fs_1 = __importDefault(require("fs"));
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
class S3Service {
    constructor() {
        this.region = process.env.AWS_REGION;
        this.accessKeyId = process.env.AWS_ACCESS_KEY;
        this.secretAccessKey = process.env.AWS_SECRET_KEY;
        this.bucket = process.env.AWS_BUCKET_NAME || '';
        this.s3 = new s3_1.default({
            region: this.region,
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        });
    }
    uploadToS3(key, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fileContent = fs_1.default.readFileSync(file.path);
                const params = {
                    Bucket: this.bucket,
                    Key: key,
                    Body: fileContent,
                };
                yield this.s3.upload(params).promise();
                return { success: true, message: 'Archivo subido correctamente', key };
            }
            catch (error) {
                return { success: false, message: 'No se ha podido subir el archivo', key: '' };
            }
        });
    }
    getUrlObject(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME || '',
                Key: key,
                Expires: 300,
            };
            return yield this.s3.getSignedUrl('getObject', params);
        });
    }
}
exports.S3Service = S3Service;
