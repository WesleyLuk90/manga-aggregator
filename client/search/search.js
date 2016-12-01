import angular from 'angular';

class SearchController {

}

export default angular.module('mangaApp.search', [])
    .component('search', {
        template: require('./search.pug')(),
        controller: SearchController,
    })
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider.state({
            name: 'search',
            url: '/search',
            template: '<search />',
        });
    })
    .name;