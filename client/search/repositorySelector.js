import angular from 'angular';

class RepositorySelectorController {
    constructor($scope, repositoryService) {
        'ngInject';

        this.$scope = $scope;

        this.repositories = [];

        repositoryService.listRepositories()
            .then(r => this.setRepositories(r));
    }

    setRepositories(repositories) {
        this.repositories = repositories;
    }

    getRepositories() {
        return this.repositories;
    }

    isRepositorySelected(repository) {
        return this.repository === repository;
    }

    selectRepository(repository) {
        this.repository = repository;
        this.onSelectRepository({ repository });
    }
}

export default angular.module('mangaApp.repositorySelector', [])
    .component('repositorySelector', {
        bindings: {
            repository: '<',
            onSelectRepository: '&',
        },
        template: require('./repositorySelector.pug')(),
        controller: RepositorySelectorController,
    })
    .name;
