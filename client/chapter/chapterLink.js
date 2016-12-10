import angular from 'angular';

class ChapterLinkController {
    constructor() {
        'ngInject';
    }
}

export default angular.module('mangaApp.chapterLink', [])
    .component('chapterLink', {
        bindings: {
            chapter: '<',
            manga: '<',
        },
        template: require('./chapterLink.pug')(),
        controller: ChapterLinkController,
    })
    .name;
