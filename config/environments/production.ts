import { Configuration } from '../';


const PRODUCTION : Configuration   = {
    NODE_ENV            :    'production',
    PORT                :    3000,
    APP_NAME            :    'CARWASH',
    APP_DATABASE_URL    :    'mongodb+srv://admin:Q7bErx2ttZz4nxuUubu2YZPnb@clustermotopack.invpg.mongodb.net/Carwash',
    APP_LOG_LEVEL       :    'test',
    SECRET_JWT_KEY      :     '4msT&@u0vrYZCM1GVUs9ZAV$bI3Mp*31xOFKYg1daALNoMRenz',
    GOOGLE_CLIENT_ID    :    process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_SECRET_ID    :    process.env.GOOGLE_SECRET_ID || '',
    AWS_REGION          :    process.env.AWS_REGION || '',
    AWS_ACCESS_KEY      :    process.env.AWS_ACCESS_KEY || '',
    AWS_SECRET_KEY      :    process.env.AWS_SECRET_KEY ||  '',
    AWS_BUCKET_NAME     :    process.env.AWS_BUCKET_UPLOAD || '',
    AWS_BUCKET          :    process.env.AWS_BUCKET ||  '',
    S3_ENVIRONMENT      :    process.env.S3_ENVIRONMENT ||  '',
}


export default PRODUCTION;