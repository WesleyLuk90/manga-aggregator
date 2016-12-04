import express from 'express';
import { Server } from 'http';
import url from 'url';
import path from 'path';


export default class ImageServer {
    makeUrl(webPath) {
        return url.format({
            protocol: 'http:',
            hostname: 'localhost',
            port: this.server.address().port,
            pathname: webPath,
        });
    }

    makeRoutes() {
        this.app.get('/test.png', (req, res) => {
            res.sendFile(path.join(__dirname, 'resources/test.png'));
        });
        this.app.get('/test-page', (req, res) => {
            res.send('hello world');
        });
    }

    start() {
        if (this.server) {
            throw new Error('Server already started');
        }
        this.app = express();
        this.server = new Server(this.app);
        this.makeRoutes();
        return new Promise((resolve) => {
            this.server.listen(0, resolve);
        });
    }

    stop() {
        if (!this.server) {
            throw new Error('Server has not been started');
        }
        return new Promise((resolve) => {
            this.server.close(resolve);
        });
    }
}