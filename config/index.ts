import { config } from 'dotenv';

config();

import TEST from './environments/test';
import DEVELOPMENT from './environments/development';
import PRODUCTION from './environments/production';

const { NODE_ENV } = process.env;
let currentConfig = TEST;

export type Configuration = {
    NODE_ENV            :   string;
    PORT                :   number;
    APP_NAME            :   string;
    APP_DATABASE_URL    :   string;
    APP_LOG_LEVEL       :   string;
    SECRET_JWT_KEY      :   string;
    GOOGLE_CLIENT_ID    :   string;
    GOOGLE_SECRET_ID    :   string;
    AWS_REGION          :   string;
    AWS_ACCESS_KEY      :   string;
    AWS_SECRET_KEY      :   string;
    AWS_BUCKET_NAME     :   string;
    AWS_BUCKET          :   string;
    S3_ENVIRONMENT      :   string;
};


switch (NODE_ENV) {
    case 'production':
        currentConfig = PRODUCTION;
        break;

    case 'test':
        currentConfig = TEST;
        break;

    default:
        currentConfig = DEVELOPMENT;
}


export { currentConfig as config };
