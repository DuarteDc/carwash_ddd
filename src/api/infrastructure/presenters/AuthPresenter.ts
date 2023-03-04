import Jwt from 'jsonwebtoken';
import { CustomerEntity } from '../../domain/customer/CustomerEntity';

export class AuthPresenter {

    async generateJWT(user: CustomerEntity) {
        return new Promise((resolve, reject) => {
            const payload: string | object | Buffer = { user };

            Jwt.sign(payload, process.env.SECRET_JWT_KEY || '', {
                expiresIn: '7d',
            }, (error, token) => {
                if (error) {
                    console.log(error);
                    return reject('Error to generate JWT');
                }
                resolve({ token, user });
            })

        });

    }

}