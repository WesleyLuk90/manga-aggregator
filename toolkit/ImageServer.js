import express from 'express';
import { Server } from 'http';
import url from 'url';
import path from 'path';
import fs from 'fs';


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

    getTestImageData() {
        return fs.readFileSync(path.join(__dirname, 'resources/test.png'));
    }

    start() {
        if (this.server) {
            throw new Error('Server already started');
        }
        this.app = express();
        this.server = new Server(this.app);
        this.makeRoutes();
        afterEach(() => this.stop());
        return new Promise((resolve) => {
            this.server.listen(0, resolve);
        });
    }

    stop() {
        if (!this.server) {
            return Promise.resolve();
        }
        const server = this.server;
        this.server = null;
        return new Promise((resolve) => {
            server.close(resolve);
        });
    }
}
