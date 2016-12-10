import angular from 'angular';

class MangaInfoController {
    constructor(mangaDetailsService, chapterService) {
        'ngInject';

        this.mangaDetailsService = mangaDetailsService;
        this.chapterService = chapterService;
    }

    getPreviewImage() {
        return this.mangaDetailsService
            .getPreviewImageUrl(this.manga);
    }

    getAuthors() {
        return this.manga.authors.join(', ');
    }

    getArtists() {
        return this.manga.artists.join(', ');
    }

    getGenres() {
        return this.manga.genres.join(', ');
    }

    isLoaded(chapterHandle) {
        return this.chapterService.isChapterLoaded(chapterHandle);
    }

    getChapter(chapterHandle) {
        return this.chapterService.getChapter(chapterHandle);
    }
}

export default angular.module('mangaApp.mangaInfo', [])
    .component('mangaInfo', {
        bindings: {
            manga: '<',
        },
        template: require('./mangaInfo.pug')(),
        controller: MangaInfoController,
    })
    .name;
