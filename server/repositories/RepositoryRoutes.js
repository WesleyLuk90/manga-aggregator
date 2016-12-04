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

    repositoryCapabilities(req, res) {
        const repo = this.repositoryList.get(req.query.repository);
        res.json({ capabilities: repo.getCapabilities() });
    }

    getRouter() {
        const router = new express.Router();
        router.get('/api/repositories/list', (req, res) => this.listRepositories(req, res));
        router.get('/api/repositories/capabilities', (req, res) => this.repositoryCapabilities(req, res));
        return router;
    }
}

RepositoryRoutes.$name = 'repositoryRoutes';
RepositoryRoutes.$inject = ['mangaService', 'repositoryList'];
