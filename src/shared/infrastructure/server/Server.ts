import express, { Router } from 'express';
import { config } from '../../../../config';

export class Server {

    private readonly express: express.Application;

    constructor(private router: Router) {
        this.express = express();
        this.express.use(this.router);
    }

    public startServer = async (): Promise<void> => {
        return await new Promise((resolve) => {
            this.express.listen(process.env.PORT, () => {
                console.log(`🚀 Application ${process.env.APP_NAME} running on PORT ${process.env.PORT}`);
                resolve();
            })
        });
    }

}