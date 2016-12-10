import angular from 'angular';

class MangaInfoController {
    constructor(mangaDetailsService, chapterDetailsService) {
        'ngInject';

        this.mangaDetailsService = mangaDetailsService;
        this.chapterDetailsService = chapterDetailsService;
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
        return this.chapterDetailsService.isChapterLoaded(chapterHandle);
    }

    getChapter(chapterHandle) {
        return this.chapterDetailsService.getChapter(chapterHandle);
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
