import { Authentication } from '../authentication/AuthenticationService';

import { AuthRepository } from '../../domain/auth/AuthRepository';
import { ErrorHandler } from '../../../shared/domain/ErrorHandler';

import { CustomerEntity } from '../../domain/customer/CustomerEntity';
import { ICustomerAuth } from '../authentication/AuthenticationService';

import { MomentService } from '../../../shared/infrastructure/moment/MomentService';
import { IFileKeys, IPhoneRequest } from './interfaces';

export class AuthUseCase extends Authentication {

    constructor(private readonly authRepository: AuthRepository) {
        super();
    }

    async signIn(email: string, password: string): Promise<ErrorHandler | ICustomerAuth> {
        let customer = await this.authRepository.findOneItem({ email });

        if (!customer) return new ErrorHandler('El usuario o contraseña no son validos', 400);

        const validatePassword = this.decryptPassword(password, customer.password)
        if (!validatePassword) return new ErrorHandler('El usuario o contraseña no son validos', 400);

        return await this.generateJWT(customer);
    }

    async signUp(body: any): Promise<ICustomerAuth | ErrorHandler | null> {
        let customer = await this.authRepository.findOneItem({ email: body.email });
        if (customer) return new ErrorHandler('El usuario ya ha sido registrado', 400);
        const typeCustomer = await this.authRepository.validateTypeCustomer(body.type_customer);
        console.log(typeCustomer)

        if(!typeCustomer) return new ErrorHandler('El tipo de usuario no es valido', 400);

        const password = await this.encryptPassword(body.password);
        customer = await this.authRepository.createOne({ ...body, password });
        return await this.generateJWT(customer);
    }

    async signInWithGoogle(idToken: string): Promise<ICustomerAuth> {
        let { fullname, email, picture } = await this.validateGoogleToken(idToken);
        let customer = await this.authRepository.findOneItem({ email });

        if (customer) return await this.generateJWT(customer);

        let password = this.generateRandomPassword();
        password = this.encryptPassword(password);

        customer = await this.authRepository.createOne({ fullname, email, profile_image: picture, password, google: true });

        return await this.generateJWT(customer);
    }

    async changePassword(password: string, newPassword: string, user: CustomerEntity): Promise<ErrorHandler | ICustomerAuth | null> {
        let customer = await this.authRepository.findById(user._id);
        const currentPassword = this.decryptPassword(password, customer.password);
        if (!currentPassword) return new ErrorHandler('Error la contraseña actual no es valida', 400);
        const newPass = this.encryptPassword(newPassword);
        return await this.authRepository.updateOne(customer._id, { password: newPass });
    }

    async updateProfilePhoto(photo: string, customer_id: string): Promise<CustomerEntity> {
        return await this.authRepository.updateOne(customer_id, { profile_image: photo });
    }

    async updateCustomer(customer_id: string, email: string, fullname: string): Promise<CustomerEntity> {
        return  await this.authRepository.updateOne(customer_id, { email, fullname });
    }

    async generateToken(customer: CustomerEntity) {
        const user = await this.authRepository.findById(customer._id);
        return await this.generateJWT(user)
    }

    async registerPhoneNumber(customer: CustomerEntity, phone_data: IPhoneRequest, code: number) {
        const { phone_number, prefix} = phone_data;
        
        const phoneData = await this.authRepository.validatePhoneNumber(phone_number, customer._id);
        if(phoneData) return new ErrorHandler('El telefono ya ha sido registrado', 400);

        const data = { phone: { code, prefix, phone_number, expiration_date: new MomentService().addMinutesToDate(5) } }
        return await this.authRepository.updateOne(customer._id, data);
    }

    async verifyPhoneNumber(_id: string, currentCode: number) {
        const customer = await this.authRepository.findById(_id);
        if(!customer.phone.phone_number) return new ErrorHandler('Ingresa un numero telefonico antes de continuar', 400);

        if(customer.phone.verified) return new ErrorHandler('El telefono ya ha sido verificado', 400);

        const { expiration_date, code } = customer.phone;
        if(code !== currentCode) return new ErrorHandler('El código no es correcto', 400)
        if(!new MomentService().verifyExpirationDate(expiration_date)) return new ErrorHandler('El código ha expirado', 400);

        return await this.authRepository.verifyCode(customer._id);
    }

    async uploadCustomerFiles(customer_id: string, keys: Array<IFileKeys>) {
        let customer = await this.authRepository.findById(customer_id);
        keys.forEach(async({ key, field }) => {
            customer[field] = key
        })
        return await customer.save();
        
    }

}