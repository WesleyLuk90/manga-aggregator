import angular from 'angular';

class SettingsController {

}

export default angular.module('mangaApp.settings', [])
    .component('settings', {
        template: require('./settings.pug')(),
        controller: SettingsController,
    })
    .config(($stateProvider) => {
        'ngInject';

        $stateProvider.state({
            name: 'settings',
            url: '/settings',
            template: '<settings />',
        });
    })
    .name;
