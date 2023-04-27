import { Request, Response, NextFunction } from 'express';

import { ResponseData } from '../../../../shared/infrastructure/validation/ResponseData';
import { ErrorHandler } from '../../../../shared/domain/ErrorHandler';
import { TypeCustomerUseCase } from '../../../application/typeCustomer/TypeCustomerUseCase';

export class TypeCustomerController extends ResponseData {

    constructor(private typeCustomerUseCase: TypeCustomerUseCase) {
        super();
        this.getAllTypeCustomer = this.getAllTypeCustomer.bind(this);
        this.getTypeCustomer     = this.getTypeCustomer.bind(this);
        this.createTypeCustomer  = this.createTypeCustomer.bind(this);
        this.updateTypeCustomer  = this.updateTypeCustomer.bind(this);
        this.deleteTypeCustomer  = this.deleteTypeCustomer.bind(this);
    }

    public async getAllTypeCustomer(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.typeCustomerUseCase.getTypeCustomers();
            this.invoke(response, 200, res, '', next)
        } catch (error) {
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }

    public async getTypeCustomer(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const response = await this.typeCustomerUseCase.getTypeCustomer(id);
            this.invoke(response, 200, res, '', next)
        } catch (error) {
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }

    public async createTypeCustomer(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        try {
            const response = await this.typeCustomerUseCase.createNewTypeCustomer({ name });
            this.invoke(response, 200, res, '', next)
        } catch (error) {
            console.log(error)
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }

    public async updateTypeCustomer(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        const { id } = req.params;
        try {
            const response = await this.typeCustomerUseCase.updateTypeCustomer(id, name);
            this.invoke(response, 200, res, '', next)
        } catch (error) {
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }


    public async deleteTypeCustomer(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const response = await this.typeCustomerUseCase.deleteTypeCustomer(id);
            this.invoke(response, 200, res, '', next)
        } catch (error) {
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }

}