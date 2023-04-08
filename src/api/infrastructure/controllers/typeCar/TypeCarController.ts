import { Request, Response, NextFunction } from 'express';

import { ResponseData } from "../../../../shared/infrastructure/validation/ResponseData";

import { ErrorHandler } from '../../../../shared/domain/ErrorHandler';
import { TypeCarUseCase } from "../../../application/typeCar/TypeCarUseCase";

export class TypeCarController extends ResponseData {

    constructor(private typeCarUseCar: TypeCarUseCase) {
        super();
        this.getAllTypeCars = this.getAllTypeCars.bind(this);
        this.getTypeCar     = this.getTypeCar.bind(this);
        this.createTypeCar  = this.createTypeCar.bind(this);
        this.updateTypeCar  = this.updateTypeCar.bind(this);
        this.deleteTypeCar  = this.deleteTypeCar.bind(this);
    }

    public async getAllTypeCars(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.typeCarUseCar.getTypeCars();
            this.invoke(response, 200, res, '', next)
        } catch (error) {
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }

    public async getTypeCar(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const response = await this.typeCarUseCar.getTypeCar(id);
            this.invoke(response, 200, res, '', next)
        } catch (error) {
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }

    public async createTypeCar(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        try {
            const response = await this.typeCarUseCar.createNewTypeCar({ name });
            this.invoke(response, 200, res, '', next)
        } catch (error) {
            console.log(error)
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }

    public async updateTypeCar(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        const { id } = req.params;
        try {
            const response = await this.typeCarUseCar.updateTypeCar(id, name);
            this.invoke(response, 200, res, '', next)
        } catch (error) {
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }


    public async deleteTypeCar(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const response = await this.typeCarUseCar.deleteTypeCar(id);
            this.invoke(response, 200, res, '', next)
        } catch (error) {
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }

}