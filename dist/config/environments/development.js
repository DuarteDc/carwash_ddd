"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DEVELOPMENT = {
    NODE_ENV: 'development',
    PORT: +(process.env.PORT || 3000),
    APP_NAME: process.env.APP_NAME || 'CARWASH',
    APP_DATABASE_URL: process.env.APP_DATABASE_URL || 'mongodb+srv://admin:Q7bErx2ttZz4nxuUubu2YZPnb@clustermotopack.invpg.mongodb.net/Carwash',
    APP_LOG_LEVEL: 'test',
    SECRET_JWT_KEY: process.env.SECRET_JWT_KEY || '4msT&@u0vrYZCM1GVUs9ZAV$bI3Mp*31xOFKYg1daALNoMRenz',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
};
exports.default = DEVELOPMENT;
