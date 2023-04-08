import { Router } from 'express';

import { TypeCarRepository } from '../../repository/typeCar/TypeCarRepository';
import { TypeCarUseCase } from '../../../application/typeCar/TypeCarUseCase';
import { TypeCarController } from '../../controllers/typeCar/TypeCarController';

const typeCarRouter = Router();

const typeCarRepository     = new TypeCarRepository();
const typeCarUseCase        = new TypeCarUseCase(typeCarRepository);
const typeCarController     = new TypeCarController(typeCarUseCase);

typeCarRouter
    .get('/', typeCarController.getAllTypeCars)
    .get('/:id', typeCarController.getTypeCar)
    .post('/', typeCarController.createTypeCar)
    .patch('/:id', typeCarController.updateTypeCar)
    .delete('/:id', typeCarController.deleteTypeCar)

export default typeCarRouter;

