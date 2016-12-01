import angular from 'angular';

class ReadingController {

}

export default angular.module('mangaApp.reading', [])
    .component('reading', {
        template: require('./reading.pug')(),
        controller: ReadingController,
    })
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider.state({
            name: 'reading',
            url: '/reading',
            template: '<reading />',
        });
    })
    .name;
