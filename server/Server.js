import express from 'express';
import WebpackMiddleware from './middleware/WebpackMiddleware';
import StaticMiddleware from './middleware/StaticMiddleware';

export default class Server {
    constructor() {
        this.createApp();
        this.loadMiddleware();
    }

    createApp() {
        this.app = express();
    }

    loadMiddleware() {
        new WebpackMiddleware().load(this.app);
        new StaticMiddleware().load(this.app);
    }

    start() {
        this.app.listen(3000, () => { console.log('listening on port 3000'); });
    }
}
