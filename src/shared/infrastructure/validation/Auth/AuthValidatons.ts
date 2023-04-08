import { RequestValidator } from '../RequestValidator';

import { body } from 'express-validator';

export class AuthValidations {

    readonly loginValidation = [
        body('email', 'El correo es requerido').notEmpty().trim().isEmail().withMessage('El correo no es valido'),
        body('password', 'La contraseña es requerida').trim().isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres'),
        RequestValidator
    ];
    
    readonly registerValidation = [
        body('email', 'El correo es requerido').notEmpty().trim().isEmail().withMessage('El correo no es valido'),
        body('password', 'La contraseña es requerida').trim().isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres'),
        body('fullname', 'El nombre es requerido').trim().isLength({ min: 8 }).withMessage('La contraseña debe contener al menos 8 caracteres'),
        RequestValidator
    ];

    readonly googleLoginValidations = [        
        body('idToken', 'El token es requerido').notEmpty().trim(),
        RequestValidator
    ];
}