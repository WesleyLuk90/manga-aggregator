import angular from 'angular';
import _ from 'lodash';

class RepositoryService {
    constructor(requestService) {
        'ngInject';

        this.requestService = requestService;
    }

    listRepositories() {
        return this.requestService.get('/api/repositories/list')
            .then(data => data.repositories);
    }

    getCapabilities(repository) {
        return this.requestService.get('/api/repositories/capabilities', { repository })
            .then(data => data.capabilities);
    }

    search(options) {
        this._checkOptions(options);
    }

    _checkOptions(options) {
        _(options)
            .keys()
            .pullAll(['fields', 'includedTags', 'excludedTags'])
            .forEach((extraTag) => {
                throw new Error(`Invalid option ${extraTag}`);
            });
    }
}

export default angular.module('mangaApp.repositoryService', [])
    .service('repositoryService', RepositoryService)
    .name;
