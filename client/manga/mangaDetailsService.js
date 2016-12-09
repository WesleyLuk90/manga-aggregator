import angular from 'angular';

class MangaDetailsService {
    constructor(updateService) {
        'ngInject';

        updateService.subscribe('manga', (manga) => {
            this.addManga(manga);
        });

        this.detailsByHandle = new Map();
        this.detailsById = new Map();
    }

    isMangaIdLoaded(id) {
        if (typeof id !== 'string') {
            throw new Error('Expected a string');
        }
        return this.detailsById.has(id);
    }

    isLoaded(mangaHandle) {
        return this.detailsByHandle.has(mangaHandle.url);
    }

    addManga(manga) {
        console.log(manga.mangaHandle.url);
        console.log(manga._id);
        this.detailsByHandle.set(manga.mangaHandle.url, manga);
        this.detailsById.set(manga._id, manga);
    }

    getDetails(mangaHandle) {
        return this.detailsByHandle.get(mangaHandle.url);
    }

    getDetailsById(mangaId) {
        return this.detailsById.get(mangaId);
    }

    getPreviewImageUrl(manga) {
        return `/api/manga/preview-image/${manga._id}`;
    }
}

export default angular.module('mangaApp.mangaDetailsService', [])
    .service('mangaDetailsService', MangaDetailsService)
    .name;
