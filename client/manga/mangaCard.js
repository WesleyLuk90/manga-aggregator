import angular from 'angular';

class MangaCardController {
    constructor() {
        'ngInject';
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
