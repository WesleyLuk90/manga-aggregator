import angular from 'angular';
import _ from 'lodash';

class MangaService {
    constructor(requestService) {
        'ngInject';

        this.requestService = requestService;
    }

    search(options) {
        this._checkOptions(options);
        return this.requestService.get('/api/manga/search', options)
            .then(data => data.manga);
    }

    requestMangaUpdate(mangaId) {
        if (typeof mangaId !== 'string') {
            throw new Error('Expected a string');
        }

        return this.requestService.post('/api/manga/request-update', { mangaId });
    }

    _checkOptions(options) {
        if (typeof options.repository !== 'string') {
            throw new Error('Requires option \'repository\'');
        }
        _(options)
            .keys()
            .pullAll(['searchFields', 'includedTags', 'excludedTags', 'repository'])
            .forEach((extraTag) => {
                throw new Error(`Invalid option '${extraTag}'`);
            });
    }
}

export default angular.module('mangaApp.mangaService', [])
    .service('mangaService', MangaService)
    .name;
