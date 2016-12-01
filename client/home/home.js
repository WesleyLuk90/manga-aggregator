import angular from 'angular';

class HomeController {

}

export default angular.module('mangaApp.home', ['ui.router'])
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider.state({
            name: 'home',
            url: '/',
            template: '<home />',
        });
    })
    .component('home', {
        template: require('./home.pug')(),
        controller: HomeController,
    })
    .name;
