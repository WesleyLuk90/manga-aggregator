import angular from 'angular';

class Navigation {

}

export default angular.module('mangaApp.navigation', [])
    .component('navigation', {
        template: require('./navigation.pug')(),
        controller: Navigation,
    })
    .name;
