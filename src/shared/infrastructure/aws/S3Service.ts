import Fs from 'fs';
import S3 from 'aws-sdk/clients/s3';

export class S3Service {

    private region          = process.env.AWS_REGION;
    private accessKeyId     = process.env.AWS_ACCESS_KEY;
    private secretAccessKey = process.env.AWS_SECRET_KEY;
    private bucket          = process.env.AWS_BUCKET_NAME || '';

    private s3 : S3; 

    constructor () {
        this.s3 = new S3({
            region          : this!.region, 
            accessKeyId     : this!.accessKeyId,
            secretAccessKey : this!.secretAccessKey,
        });
    }

    async uploadToS3(key: string, file?: Express.Multer.File) {
        try {
            const fileContent = Fs.readFileSync(file!.path);
            const params = {
                Bucket  : this.bucket,
                Key     : key,
                Body    : fileContent,
            };

            await this.s3.upload(params).promise();
            return { success: true, message: 'Archivo subido correctamente', key};
        } catch (error) {
            return { success: false, message: 'No se ha podido subir el archivo', key: '' };
        }
    }    

    async getUrlObject(key: string) {
        const params = {
            Bucket: process.env!.AWS_BUCKET_NAME || '',
            Key: key,
            Expires: 300,
        }
        return await this.s3.getSignedUrl('getObject', params);
    }

}