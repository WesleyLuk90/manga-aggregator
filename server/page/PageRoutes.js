import express from 'express';

import BaseRouter from '../routes/BaseRouter';

export default class PageRoutes extends BaseRouter {
    constructor(pageService) {
        super();
        this.pageService = pageService;
    }

    getPage(req, res) {
        return this.pageService
            .getPagePath(req.params.pageId)
            .then(pagePath => res.sendFile(pagePath));
    }

    getRouter() {
        const router = new express.Router();
        router.get('/api/page/get-page/:pageId', (req, res) => this.getPage(req, res));
        return router;
    }
}

PageRoutes.$name = 'pageRoutes';
PageRoutes.$inject = ['pageService'];
