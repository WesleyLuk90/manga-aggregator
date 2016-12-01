import express from 'express';
import mangaApi from 'manga-api';

export default class RepositoryRoutes {

    constructor() {
        this.repositoryList = mangaApi.RepositoryListFactory.create();
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
            .then(manga =>
                res.json({
                    manga,
                })
            );
    }

    getRouter() {
        const router = new express.Router();
        router.get('/api/repositories/list', (req, res) => this.listRepositories(req, res));
        router.get('/api/repositories/search', (req, res) => this.searchRepository(req, res));
        return router;
    }
}
