import { Filters, Fields } from 'manga-api';
import express from 'express';

export default class MangaRoutes {
    constructor(mangaService, repositoryList) {
        this.mangaService = mangaService;
        this.repositoryList = repositoryList;
    }

    buildFilters(query) {
        const filters = new Filters()
            .setIncludedTags(query.includedTags || [])
            .setExcludedTags(query.excludedTags || []);
        const searchFields = query.searchFields || {};
        Object.keys(searchFields)
            .forEach((field) => {
                filters.setSearchField(Fields.getField(field), searchFields[field]);
            });

        return filters;
    }

    search(req, res) {
        const repo = this.repositoryList.get(req.query.repository);

        const filters = this.buildFilters(req.query);

        return repo.search(filters)
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
