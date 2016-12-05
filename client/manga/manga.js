import angular from 'angular';
import mangaService from './mangaService';
import mangaDetailsService from './mangaDetailsService';
import mangaCard from './mangaCard';
import mangaInfo from './mangaInfo';

class MangaController {
    constructor($stateParams) {
        'ngInject';

        this.$stateParams = $stateParams;
    }

    hasManga() {
        return !!this.$stateParams.mangaId;
    }

    isMangaLoaded() {
        return true;
    }
}

export default angular
    .module('mangaApp.manga', [
        mangaService,
        mangaDetailsService,
        mangaCard,
        mangaInfo,
    ])
    .component('manga', {
        template: require('./manga.pug')(),
        controller: MangaController,
    })
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider.state({
            name: 'manga',
            url: '/manga/:mangaId',
            template: '<manga />',
        });
    })
    .name;
