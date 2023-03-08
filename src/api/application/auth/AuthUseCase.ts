import { ErrorHandler } from '../../../shared/domain/ErrorHandler';
import { Authentication } from '../authentication/AuthenticationService';
import { AuthRepository } from '../../domain/auth/AuthRepository';

import { ICustomerAuth } from '../authentication/AuthenticationService';
import { CustomerEntity } from '../../domain/customer/CustomerEntity';
export class AuthUseCase extends Authentication {

    constructor(private readonly authRepository: AuthRepository) {
        super();
    }

    async signIn(email: string, password: string): Promise<ErrorHandler | ICustomerAuth | null> {
        let customer = await this.authRepository.findOneItem({ email });

        if (!customer) return new ErrorHandler('El usuario o contraseña no son validos', 400);

        const validatePassword = this.decryptPassword(password, customer.password)
        if (!validatePassword) return new ErrorHandler('El usuario o contraseña no son validos', 400);

        return await this.generateJWT(customer);
    }

    async signUp(body: any): Promise<ICustomerAuth | ErrorHandler | null> {
        let customer = await this.authRepository.findOneItem({ email: body.email });

        if (customer) return new ErrorHandler('El usuario ya ha sido registrado', 400);

        const password = await this.encryptPassword(body.password);
        customer = await this.authRepository.createOne({ ...body, password });
        return await this.generateJWT(customer);
    }

    async signInWithGoogle(idToken: string): Promise<ErrorHandler | ICustomerAuth | null> {
        let { fullname, email, picture } = await this.validateGoogleToken(idToken);
        let customer = await this.authRepository.findOneItem({ email });

        if (customer) return await this.generateJWT(customer);

        let password = this.generateRandomPassword();
        password = this.encryptPassword(password);

        customer = await this.authRepository.createOne({ fullname, email, image_profile: picture, password });

        return await this.generateJWT(customer);
    }

    async changePassword(password: string, newPassword: string, user: CustomerEntity): Promise<ErrorHandler | ICustomerAuth | null> {
        let customer = await this.authRepository.findById(user._id);
        const currentPassword = this.decryptPassword(password, customer.password);
        if (!currentPassword) return new ErrorHandler('Error la contraseña actual no es valida', 400);
        const newPass = this.encryptPassword(newPassword);
        return await this.authRepository.updateOne(customer._id, { password: newPass }, { new: true });
    }

    async updateProfilePhoto(photo: string, customer_id: string): Promise<ErrorHandler | ICustomerAuth | null> {
        return await this.authRepository.updateOne(customer_id, { profile_image: photo }, { new: true });
    }

    async generateToken(customer: CustomerEntity) {
        return await this.generateJWT(customer)
    }

}