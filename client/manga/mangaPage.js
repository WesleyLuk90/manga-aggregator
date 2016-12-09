import angular from 'angular';

class MangaPageController {

    constructor($stateParams, mangaDetailsService) {
        'ngInject';

        this.$stateParams = $stateParams;
        this.mangaDetailsService = mangaDetailsService;
    }

    hasManga() {
        return !!this.$stateParams.mangaId;
    }

    isMangaLoaded() {
        return this.mangaDetailsService.isMangaIdLoaded(this.$stateParams.mangaId);
    }

    getManga() {
        return this.mangaDetailsService.getDetailsById(this.$stateParams.mangaId);
    }
}

export default angular.module('mangaApp.mangaPage', [])
    .component('mangaPage', {
        template: require('./mangaPage.pug')(),
        controller: MangaPageController,
    })
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider.state({
            name: 'manga',
            url: '/manga/:mangaId',
            template: '<manga-page />',
            onEnter: ($stateParams, mangaService) => {
                'ngInject';

                if ($stateParams.mangaId) {
                    mangaService.requestMangaUpdate($stateParams.mangaId);
                }
            },
        });
    })
    .name;
