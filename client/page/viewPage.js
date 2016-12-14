import angular from 'angular';

class ViewPageController {
    constructor() {
        'ngInject';
    }
}

export default angular.module('mangaApp.viewPage', [])
    .component('viewPage', {
        template: require('./viewPage.pug')(),
        controller: ViewPageController,
    })
    .name;
