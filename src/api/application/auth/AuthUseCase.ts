import bcrypt from 'bcrypt';

import { ErrorHandler } from '../../../shared/domain/ErrorHandler';
import { AuthPresenter } from '../../infrastructure/presenters/AuthPresenter';
import { CustomerRepository } from '../../domain/customer/CustomerRepository';

export class AuthUseCase extends AuthPresenter {

    constructor(private readonly customerRespository: CustomerRepository) {
        super();
    }

    async signIn(email: string, password: string): Promise<any | null> {
        let customer = await this.customerRespository.findOne({ email });

        if (!customer) return new ErrorHandler('El usuario o contraseña no son validos', 400);

        const validatePassword = bcrypt.compareSync(password, customer.password);
        if (!validatePassword) return new ErrorHandler('El usuario o contraseña no son validos', 400);

        return await this.generateJWT(customer);

    }

    async signUp(body: any): Promise<any | null> {
        let customer = await this.customerRespository.findOne({ email: body.email });

        if (customer) return new ErrorHandler('El usuario ya ha sido registrado', 400);

        customer = await this.customerRespository.createOne(body);
        const salt = bcrypt.genSaltSync();
        const pass = { ...customer, password: bcrypt.hashSync(customer.password, salt) }
        console.log(customer)
        customer = await this.customerRespository.updateOne(customer._id, { password: pass }, { new: true })
        console.log(customer);
        return await this.generateJWT(customer);

    }

}