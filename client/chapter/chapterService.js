import angular from 'angular';

class ChapterService {
    constructor(requestService) {
        'ngInject';

        this.requestService = requestService;
    }

    requestLoadChapter(chapterId) {
        if (typeof chapterId !== 'string') {
            throw new Error('Expected a string');
        }
        return this.requestService
            .post('/api/chapter/request-load', { chapterId });
    }
}

export default angular.module('mangaApp.chapterService', [])
    .service('chapterService', ChapterService)
    .name;
