import { createServer, Server as HttpServer } from 'http';

import express, { Router, Application } from 'express';
import { Server } from 'socket.io';

export class SocketServer {

    private readonly express    : Application;
    private readonly socket     : Server;
    private readonly httpServer : HttpServer;

    constructor(private router : Router) {
        this.express    = express()
        this.httpServer = createServer(this.express);
        this.socket     = new Server(this.httpServer);
        this.express.use(this.router);
    }

    public startSocketServer = async (): Promise<void> => {
        return await new Promise((resolve) => {
            this.httpServer.listen(process.env.SOCKET_PORT, () => {
                console.log(`🚀 Socket Service running on PORT ${process.env.SOCKET_PORT}`);
                resolve();
            });
        })
    }

    public resolve = async () => {
        this.socket.on('connection', () => {
            
        });
    }

}