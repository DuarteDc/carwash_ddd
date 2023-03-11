import { Request, Response, NextFunction, response } from 'express';
import { ErrorHandler } from '../../../../shared/domain/ErrorHandler';
import { ResponseData } from '../../../../shared/infrastructure/validation/ResponseData';

import { ServicesUseCase } from '../../../application/services/ServicesUseCase';

export class ServicesController extends ResponseData {

    constructor(private servicesUseCase: ServicesUseCase) {
        super();
        this.getAllServices     =   this.getAllServices.bind(this);
        this.getService         =   this.getService.bind(this);
        this.createService      =   this.createService.bind(this);
        this.updateService      =   this.updateService.bind(this);
        this.deleteService      =   this.deleteService.bind(this);
    }

    public async getAllServices(req: Request, res: Response, next: NextFunction) {
        try {
            const response = await this.servicesUseCase.getServices();
            this.invoke(response, 200, res, '', next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }

    public async getService(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const response = await this.servicesUseCase.getDetailService(id);
            this.invoke(response, 200, res, '', next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error al consultar la información', 500));
        }
    }

    public async createService(req: Request, res: Response, next: NextFunction) {
        const { name, description } = req.body;
        try {
            const response = await this.servicesUseCase.createNewService(name, description);
            this.invoke(response, 201, res, 'El servicio se creo con exito', next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error al crear el servicio', 500));
        }
    }

    public async updateService(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { name, description } = req.body;
        try {
            const response = await this.servicesUseCase.updateOneService(id, { name, description });
            this.invoke(response, 201, res, 'El servicio se actualizó con exito', next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error al actualizar el servicio', 500));   
        }
    }

    public async deleteService(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        try {
            const response = await this.servicesUseCase.deleteOneService(id);
            this.invoke(response, 201, res, 'El servicio se elimino con exito', next);
        } catch (error) {
            next(new ErrorHandler('Hubo un error eliminar el servicio', 500));   
        }
    }


}


