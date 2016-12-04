import angular from 'angular';
import repositorySelector from './repositorySelector';
import repositorySearchForm from './repositorySearchForm';
import mangaResultsList from './mangaResultsList';

class SearchController {
    constructor(repositoryService) {
        'ngInject';

        this.repositoryService = repositoryService;

        this.capabilities = null;
        this.results = [1, 2, 3, 4];
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

    onResults(results) {
        this.results = results;
    }

    getResults() {
        return this.results;
    }
}

export default angular
    .module('mangaApp.search', [
        repositorySelector,
        repositorySearchForm,
        mangaResultsList,
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
