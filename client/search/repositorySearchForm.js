import angular from 'angular';
import tagSelector from './tagSelector';


class RepositorySearchFormController {
    constructor(repositoryService) {
        'ngInject';

        this.repositoryService = repositoryService;

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
        this.repositoryService
            .search({
                fields: this.searchByField,
                includedTags: this.includedTags,
                excludedTags: this.excludedTags,
            })
            .then((res) => {
                console.log(res);
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
        },
        template: require('./repositorySearchForm.pug')(),
        controller: RepositorySearchFormController,
    })
    .name;
