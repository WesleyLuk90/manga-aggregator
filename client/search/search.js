import angular from 'angular';
import repositorySelector from './repositorySelector';
import repositorySearchForm from './repositorySearchForm';

class SearchController {
    constructor(repositoryService) {
        'ngInject';

        this.repositoryService = repositoryService;

        this.capabilities = null;
    }

    getRepository() {
        return this.repository;
    }

    getCapabilities() {
        return this.capabilities;
    }

    selectRepository(repository) {
        this.repository = repository;
        this.capabilities = null;
        if (repository) {
            this.repositoryService.getCapabilities(repository)
                .then((cap) => {
                    this.capabilities = cap;
                });
        }
    }
}

export default angular
    .module('mangaApp.search', [
        repositorySelector,
        repositorySearchForm,
    ])
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
