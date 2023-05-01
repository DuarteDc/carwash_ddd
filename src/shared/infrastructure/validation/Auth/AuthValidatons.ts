import multer from 'multer';

import { body,  } from 'express-validator';

import { RequestValidator } from '../RequestValidator';
import { multerConfig } from '../../middleware/MulterConfig';
import validateAuthentication from '../ValidateAuthentication';

export class AuthValidations {

    private upload  = multer(multerConfig);
    protected arrayOfFiles = [{ name: 'ine', maxCount: 1 }, { name: 'curp', maxCount: 1 }, { name: 'prook_address', maxCount: 1 }, { name: 'criminal_record', maxCount: 1 }];

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

    readonly profilePhotoValidation = [
        validateAuthentication,
        this.upload.single('photo'),
    ]

    readonly filesValidations = [
        validateAuthentication,
        this.upload.fields(this.arrayOfFiles),
    ]
}