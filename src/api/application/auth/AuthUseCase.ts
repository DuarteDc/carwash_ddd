import bcrypt from 'bcrypt';

import { ErrorHandler } from '../../../shared/domain/ErrorHandler';
import { Authentication } from '../../infrastructure/authentication/Authentication';
import { CustomerRepository } from '../../domain/customer/CustomerRepository';

import { ICustomerAuth } from '../../infrastructure/authentication/Authentication';
export class AuthUseCase extends Authentication {

    constructor(private readonly customerRespository: CustomerRepository) {
        super();
    }

    async signIn(email: string, password: string): Promise<ErrorHandler | ICustomerAuth | null> {
        let customer = await this.customerRespository.findOneItem({ email });

        if (!customer) return new ErrorHandler('El usuario o contraseña no son validos', 400);

        const validatePassword = bcrypt.compareSync(password, customer.password);
        if (!validatePassword) return new ErrorHandler('El usuario o contraseña no son validos', 400);

        return await this.generateJWT(customer);
    }

    async signUp(body: any): Promise<ICustomerAuth | ErrorHandler | null> {

        let customer = await this.customerRespository.findOneItem({ email: body.email });

        if (customer) return new ErrorHandler('El usuario ya ha sido registrado', 400);

        const password = await this.encryptPassword(body.password);
        customer = await this.customerRespository.createOne({ ...body, password });
        return await this.generateJWT(customer);
    }

    async signInWithGoogle(idToken: string): Promise<ErrorHandler | ICustomerAuth | void> {
        let { fullname, email, picture } = await this.validateGoogleToken(idToken);
        let customer = await this.customerRespository.findOneItem({ email });

        if (customer) return await this.generateJWT(customer);

        customer = await this.customerRespository.createOne({ fullname, email, image_profile: picture });
        const salt = bcrypt.genSaltSync();
        const pass = customer.password = bcrypt.hashSync(customer.password, salt);
        customer = await this.customerRespository.updateOne(customer._id, { password: pass }, { new: true });

        if (customer) await this.generateJWT(customer);

    }

}