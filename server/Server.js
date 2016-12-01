import express from 'express';

import WebpackMiddleware from './middleware/WebpackMiddleware';
import StaticMiddleware from './middleware/StaticMiddleware';
import defaultRouter from './routes/defaultRouter';

export default class Server {
    constructor() {
        this.createApp();
        this.loadMiddleware();
        this.loadRoutes();
    }

    createApp() {
        this.app = express();
    }

    loadMiddleware() {
        new WebpackMiddleware().load(this.app);
        new StaticMiddleware().load(this.app);
    }

    loadRoutes() {
        this.app.use(defaultRouter);
    }

    start() {
        this.app.listen(3000, () => { console.log('listening on port 3000'); });
    }
}
