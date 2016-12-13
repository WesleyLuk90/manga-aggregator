import express from 'express';
import BaseRouter from '../routes/BaseRouter';

export default class ChapterRoutes extends BaseRouter {
    constructor(chapterJobService) {
        super();
        this.chapterJobService = chapterJobService;
    }

    requestLoadChapter(req, res) {
        this.chapterJobService.loadChapter(req.body.chapterId);
        res.json({});
    }

    getRouter() {
        const router = new express.Router();
        router.post('/api/chapter/request-load', (req, res) => this.requestLoadChapter(req, res));
        return router;
    }

}

ChapterRoutes.$name = 'chapterRoutes';
ChapterRoutes.$inject = ['chapterJobService'];
