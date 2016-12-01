import angular from 'angular';

class UpdatesController {

}

export default angular.module('mangaApp.updates', [])
    .component('updates', {
        template: require('./updates.pug')(),
        controller: UpdatesController,
    })
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider.state({
            name: 'updates',
            url: '/updates',
            template: '<updates />',
        });
    })
    .name;
