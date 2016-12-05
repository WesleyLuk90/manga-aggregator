import angular from 'angular';

class MangaInfoController {
    constructor() {
        'ngInject';
    }
}

export default angular.module('mangaApp.mangaInfo', [])
    .component('mangaInfo', {
        template: require('./mangaInfo.pug')(),
        controller: MangaInfoController,
    })
    .name;
