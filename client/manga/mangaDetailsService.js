import angular from 'angular';

class MangaDetailsService {
    constructor(updateService) {
        'ngInject';

        updateService.subscribe('manga', (manga) => {
            this.addManga(manga);
        });

        this.detailsByHandle = new Map();
    }

    isLoaded(mangaHandle) {
        return this.detailsByHandle.has(mangaHandle.url);
    }

    addManga(manga) {
        this.detailsByHandle.set(manga.mangaHandle.url, manga);
    }

    getDetails(mangaHandle) {
        return this.detailsByHandle.get(mangaHandle.url);
    }

    getPreviewImageUrl(manga) {
        return `/api/manga/preview-image/${manga._id}`;
    }
}

export default angular.module('mangaApp.mangaDetailsService', [])
    .service('mangaDetailsService', MangaDetailsService)
    .name;
