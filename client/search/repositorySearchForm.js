import angular from 'angular';
import tagSelector from './tagSelector';


class RepositorySearchFormController {
    constructor(mangaService) {
        'ngInject';

        this.mangaService = mangaService;

        this.includedTags = [];
        this.excludedTags = [];

        this.searchByField = {};
    }

    hasCapabilities() {
        return !!this.capabilities;
    }

    getSearchableFields() {
        return this.capabilities.searchableFields;
    }

    getSearchableTags() {
        return this.capabilities.tagOptions;
    }

    canExcludeTags() {
        return this.capabilities.filterByExcludingTags;
    }

    setTags(included, excluded) {
        this.includedTags = included;
        this.excludedTags = excluded;
    }

    search() {
        this.mangaService
            .search({
                repository: this.repository,
                fields: this.searchByField,
                includedTags: this.includedTags,
                excludedTags: this.excludedTags,
            })
            .then((results) => {
                this.onResults({ results });
            });
    }
}

export default angular
    .module('mangaApp.repositorySearchForm', [
        tagSelector,
    ])
    .component('repositorySearchForm', {
        bindings: {
            repository: '<',
            capabilities: '<',
            onResults: '&',
        },
        template: require('./repositorySearchForm.pug')(),
        controller: RepositorySearchFormController,
    })
    .name;
