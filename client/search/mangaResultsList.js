import angular from 'angular';

class MangaResultsListController {
    constructor(mangaDetailsService) {
        'ngInject';

        this.mangaDetailsService = mangaDetailsService;
    }

    getResults() {
        return this.results;
    }

    isLoaded(result) {
        return this.mangaDetailsService.isLoaded(result);
    }

    getDetails(result) {
        return this.mangaDetailsService.getDetails(result);
    }
}

export default angular.module('mangaApp.mangaResultsList', [])
    .component('mangaResultsList', {
        bindings: {
            results: '<',
        },
        template: require('./mangaResultsList.pug')(),
        controller: MangaResultsListController,
    })
    .name;
