import angular from 'angular';

class MangaService {
    constructor(requestService) {
        'ngInject';

        this.requestService = requestService;
    }
    getRepositories() {
        return this.requestService.get('/api/repositories/list');
    }
}

export default angular.module('mangaApp.mangaService', [])
    .service('mangaService', MangaService)
    .name;
