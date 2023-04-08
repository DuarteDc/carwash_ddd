import { asClass, createContainer, asFunction, InjectionMode, asValue, AwilixContainer } from 'awilix';
import { config } from '../../../../config/index';

import { SocketServer } from './server/SocketServer';
import { Router } from './routes/SocketRouter';
import { socketRouter } from '../../api/infrastructure/router';
import { ErrorMiddleware } from '../../../shared/infrastructure/validation/ErrorMiddleware';

export class SocketContainer {
    private readonly container: AwilixContainer;

    constructor() {
        this.container = createContainer({
            injectionMode: InjectionMode.CLASSIC,
        });

        this.register();
    }

    public register(): void {
        this.container
            .register({
                config       : asValue(config),
                socketServer : asClass(SocketServer).singleton(),
                router       : asFunction(Router).singleton(),
            })
            .register({ 
                errorMiddleware : asClass(ErrorMiddleware).singleton(),
                socketRouter    : asFunction(socketRouter)
            })
    }

    public invoke(): AwilixContainer {
        return this.container;
    }
}