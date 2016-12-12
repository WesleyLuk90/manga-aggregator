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

    getRoutes() {
        const router = new express.Router();
        router.get('/api/chapter/request-load', (req, res) => this.requestLoadChapter(req, res));
        return router;
    }

}

ChapterRoutes.$name = 'chapterRoutes';
ChapterRoutes.$inject = ['chapterJobService'];
