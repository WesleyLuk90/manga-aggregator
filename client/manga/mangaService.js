import angular from 'angular';
import _ from 'lodash';

class MangaService {
    constructor(requestService) {
        'ngInject';

        this.requestService = requestService;
    }

    search(options) {
        this._checkOptions(options);
        return this.requestService.get('/api/manga/search', {
            fields: options.fields,
        });
    }

    _checkOptions(options) {
        if (typeof options.repository !== 'string') {
            throw new Error('Requires option \'repository\'');
        }
        _(options)
            .keys()
            .pullAll(['fields', 'includedTags', 'excludedTags', 'repository'])
            .forEach((extraTag) => {
                throw new Error(`Invalid option '${extraTag}'`);
            });
    }
}

export default angular.module('mangaApp.mangaService', [])
    .service('mangaService', MangaService)
    .name;
