import angular from 'angular';

class MangaCardController {
    constructor(mangaDetailsService) {
        'ngInject';

        this.mangaDetailsService = mangaDetailsService;
    }

    getPreviewImage() {
        return this.mangaDetailsService
            .getPreviewImageUrl(this.manga);
    }
}

export default angular.module('mangaApp.mangaCard', [])
    .component('mangaCard', {
        bindings: {
            manga: '<',
        },
        template: require('./mangaCard.pug')(),
        controller: MangaCardController,
    })
    .name;
