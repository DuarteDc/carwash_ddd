import { Configuration } from './config';
import { Container } from './src/shared/infrastructure/Container';

import { Server } from './src/shared/infrastructure/server/Server';

const container = new Container();
const server = container.invoke().resolve<Server>('server');
const config = container.invoke().resolve<Configuration>('config');

server
    .startServer()
    .then(async () => {
        await container.invoke().resolve('db')
        console.log(`Env: ${config.NODE_ENV}`);
    })

