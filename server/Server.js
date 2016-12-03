import express from 'express';
import io from 'socket.io';
import { Server as HttpServer } from 'http';

import WebpackMiddleware from './middleware/WebpackMiddleware';
import StaticMiddleware from './middleware/StaticMiddleware';
import defaultRouter from './routes/defaultRouter';


export default class Server {
    constructor(repositoryRoutes) {
        this.repositoryRoutes = repositoryRoutes;
        this.createApp();
        this.loadMiddleware();
        this.loadRoutes();
    }

    createApp() {
        this.app = express();
        this.server = new HttpServer(this.app);
    }

    loadMiddleware() {
        new WebpackMiddleware().load(this.app);
        new StaticMiddleware().load(this.app);
    }

    loadRoutes() {
        this.app.use(this.repositoryRoutes.getRouter());
        this.app.use(defaultRouter);
        this.socker = io(this.server);
    }

    start() {
        this.server.listen(3000, () => { console.log('listening on port 3000'); });
    }
}

Server.$name = 'server';
Server.$inject = ['repositoryRoutes'];
