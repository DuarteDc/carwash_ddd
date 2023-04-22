import Fs from 'fs';
import S3 from 'aws-sdk/clients/s3';

import { config } from '../../../../config';
export class S3Service {

    private region          = config.AWS_REGION;
    private accessKeyId     = config.AWS_ACCESS_KEY;
    private secretAccessKey = config.AWS_SECRET_KEY;
    private bucket          = config.AWS_BUCKET_NAME;
    private environment     = config.S3_ENVIRONMENT;

    private s3 : S3; 

    constructor () {
        
        this.s3 = new S3({
            region          : this.region, 
            accessKeyId     : this.accessKeyId,
            secretAccessKey : this.secretAccessKey,
        });
        
    }

    async uploadToS3(key: string, file?: Express.Multer.File) {
        try {
            const fileContent = Fs.readFileSync(file!.path);
            const params = {
                Bucket  : this.bucket,
                Key     : this.environment + key,
                Body    : fileContent,
            };

            await this.s3.upload(params).promise();
            return { success: true, message: 'Archivo subido correctamente', key};
        } catch (error) {
            return { success: false, message: 'No se ha podido subir el archivo', key: '' };
        }
    }    

    async uploadToS3AndGetUrl(key: string, file?: Express.Multer.File) {
        return await this.uploadToS3(key, file).then(async({ message, success }) => {
            const params = {
                Bucket  : this.bucket,
                Key     : this.environment + key,
                Expires : 300,
            }
            const url = await this.s3.getSignedUrl('getObject', params)
            return { url, message, success, key }
        })
    }

    async getUrlObject(key: string) {
        const params = {
            Bucket  : this.bucket,
            Key     : key,
            Expires : 300,
        }
        return await this.s3.getSignedUrl('getObject', params);
    }

}