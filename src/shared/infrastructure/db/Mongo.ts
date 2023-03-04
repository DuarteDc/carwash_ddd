import mongoose from 'mongoose';

import { config } from '../../../../config';

export const dbConnection = async () => {
    try {
        await mongoose.set('strictQuery', false);
        await mongoose.connect(config.APP_DATABASE_URL);
        console.log(`Connection db running!!`);

    } catch (error) {
        console.log(error)
        throw Error('Error al conectar la base de datos')
    }
}

