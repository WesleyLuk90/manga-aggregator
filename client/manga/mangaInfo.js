import angular from 'angular';

class MangaInfoController {
    constructor(mangaService) {
        'ngInject';

        this.mangaService = mangaService;
    }

    $onChanges(changes) {
        const mangaChanges = changes.manga;
        if (mangaChanges.currentValue && mangaChanges.currentValue !== mangaChanges.previousValue) {
            const mangaId = mangaChanges.currentValue._id;
            this.mangaService.requestMangaUpdate(mangaId);
        }
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
