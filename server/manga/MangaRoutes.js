import express from 'express';

export default class MangaRoutes {
    constructor(mangaService, repositoryList) {
        this.mangaService = mangaService;
        this.repositoryList = repositoryList;
    }

    search(req, res) {
        const repo = this.repositoryList.get(req.query.repository);
        return repo.search()
            .then((manga) => {
                this.mangaService.loadMangas(manga);
                res.json({ manga });
            });
    }

    getRouter() {
        const router = new express.Router();
        router.get('/api/manga/search', (req, res) => this.search(req, res));
        return router;
    }
}

MangaRoutes.$name = 'mangaRoutes';
MangaRoutes.$inject = ['mangaService', 'repositoryList'];
