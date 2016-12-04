import express from 'express';
import { Server as HttpServer } from 'http';

import StaticMiddleware from '../middleware/StaticMiddleware';
import defaultRouter from '../routes/defaultRouter';


export default class Server {
    constructor(repositoryRoutes, socketService, webpackMiddleware, mangaRoutes) {
        this.repositoryRoutes = repositoryRoutes;
        this.socketService = socketService;
        this.webpackMiddleware = webpackMiddleware;
        this.mangaRoutes = mangaRoutes;
        this.createApp();
        this.loadMiddleware();
        this.loadRoutes();
        this.loadSocket();
    }

    createApp() {
        this.app = express();
        this.server = new HttpServer(this.app);
    }

    loadMiddleware() {
        this.webpackMiddleware.load(this.app);
        new StaticMiddleware().load(this.app);
    }

    loadRoutes() {
        this.app.use(this.repositoryRoutes.getRouter());
        this.app.use(this.mangaRoutes.getRouter());
        this.app.use(defaultRouter);
    }

    loadSocket() {
        this.socketService.load(this.server);
    }

    start() {
        this.server.listen(3000, () => { console.log('listening on port 3000'); });
    }
}

Server.$name = 'server';
Server.$inject = ['repositoryRoutes', 'socketService', 'webpackMiddleware', 'mangaRoutes'];
