import express from 'express';
import path from 'path';

export default class StaticMiddleware {
    load(app) {
        app.use(express.static(this.getStaticPath()));
    }

    getStaticPath() {
        return path.join(__dirname, '../../public');
    }
}
