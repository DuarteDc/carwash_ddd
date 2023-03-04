import { asClass, createContainer, asFunction, InjectionMode, asValue, AwilixContainer } from 'awilix';

import { Router } from './routes/Router';
import { config } from '../../../config';
import { Server } from './server/Server';
import { dbConnection } from './db/Mongo';

import { apiRouter } from '../../api/infrastructure/router';

import { ErrorMiddleware } from './validation/ErrorMiddleware';


export class Container {

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
                config  : asValue(config),
                server  : asClass(Server).singleton(),
                db      : asFunction(dbConnection).singleton(),
                router  : asFunction(Router).singleton(),
            })
            .register({
                errorMiddleware : asClass(ErrorMiddleware).singleton(),
                apiRouter       : asFunction(apiRouter).singleton(),
            })

    }

    public invoke(): AwilixContainer {
        return this.container;
    }

}



