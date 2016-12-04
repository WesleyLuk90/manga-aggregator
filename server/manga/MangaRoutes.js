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

    getPreviewImage(req, res) {
        return this.mangaService
            .getPreviewImage(req.params.id)
            .then(image => res.send(image));
    }

    getRouter() {
        const router = new express.Router();
        router.get('/api/manga/search', (req, res) => this.search(req, res));
        router.get('/api/manga/preview-image/:id', (req, res) => this.getPreviewImage(req, res));
        return router;
    }
}

MangaRoutes.$name = 'mangaRoutes';
MangaRoutes.$inject = ['mangaService', 'repositoryList'];
