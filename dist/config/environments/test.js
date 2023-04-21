"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TEST = {
    NODE_ENV: 'test',
    PORT: +process.env.PORT,
    APP_NAME: process.env.APP_NAME,
    TIME_ZONE: process.env.TIME_ZONE,
    APP_DATABASE_URL: process.env.APP_DATABASE_URL,
    APP_LOG_LEVEL: 'test',
    SECRET_JWT_KEY: process.env.SECRET_JWT_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    S3_ENVIRONMENT: process.env.S3_ENVIRONMENT,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
    MY_NUMBER: process.env.MY_NUMBER,
};
exports.default = TEST;
