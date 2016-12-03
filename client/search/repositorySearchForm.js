import angular from 'angular';

class RepositorySearchFormController {
    constructor() {
        'ngInject';
    }

    hasCapabilities() {
        return !!this.capabilities;
    }
}

export default angular.module('mangaApp.repositorySearchForm', [])
    .component('repositorySearchForm', {
        bindings: {
            repository: '<',
            capabilities: '<',
        },
        template: require('./repositorySearchForm.pug')(),
        controller: RepositorySearchFormController,
    })
    .name;
