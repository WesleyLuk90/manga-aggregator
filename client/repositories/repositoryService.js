import angular from 'angular';

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
}

export default angular.module('mangaApp.repositoryService', [])
    .service('repositoryService', RepositoryService)
    .name;
