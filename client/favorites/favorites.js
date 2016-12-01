import angular from 'angular';

class FavoritesController {

}

export default angular.module('mangaApp.favorites', [])
    .component('favorites', {
        template: require('./favorites.pug')(),
        controller: FavoritesController,
    })
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider.state({
            name: 'favorites',
            url: '/favorites',
            template: '<favorites />',
        });
    })
    .name;
