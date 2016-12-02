import express from 'express';

export default class RepositoryRoutes {

    constructor(mangaService, repositoryList) {
        this.mangaService = mangaService;
        this.repositoryList = repositoryList;
    }

    listRepositories(req, res) {
        const repositories = this.repositoryList.getAll().map(r => r.getName());
        res.json({
            repositories,
        });
    }

    searchRepository(req, res) {
        const repo = this.repositoryList.get(req.body.repository);
        return repo.search()
            .then((manga) => {
                this.mangaService.loadMangas(manga);
                res.json({ manga });
            });
    }

    repositoryCapabilities(req, res) {
        const repo = this.repositoryList.get(req.body.repository);
        res.json({ capabilities: repo.getCapabilities() });
    }

    getRouter() {
        const router = new express.Router();
        router.get('/api/repositories/list', (req, res) => this.listRepositories(req, res));
        router.get('/api/repositories/search', (req, res) => this.searchRepository(req, res));
        return router;
    }
}

RepositoryRoutes.$name = 'repositoryRoutes';
RepositoryRoutes.$inject = ['mangaService', 'repositoryList'];
