import { SocketContainer } from "./shared/infrastructure/SocketContainer";

import { SocketServer } from "./shared/infrastructure/server/SocketServer";

const socketContainer = new SocketContainer();

const server = socketContainer.invoke().resolve<SocketServer>('socketServer');

server.startSocketServer();