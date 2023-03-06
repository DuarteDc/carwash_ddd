import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';
import { CustomerEntity } from '../../domain/customer/CustomerEntity';


export interface IGoogle {
    fullname: string | undefined;
    email: string | undefined;
    picture: string | undefined;
}

export interface ICustomerAuth {
    user    : CustomerEntity;
    token  ?: string;
}

export class Authentication {

    private client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    protected async generateJWT(user: CustomerEntity): Promise<ICustomerAuth>{
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

    protected async validateGoogleToken(token: string): Promise<IGoogle> {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        return { fullname: payload?.name, email: payload?.email, picture: payload?.picture };
    }

    protected encryptPassword(password: string): string {
        const salt = bcrypt.genSaltSync();
        return password = bcrypt.hashSync(password, salt);
    }

    private generateRandomPassword() {

    }

}