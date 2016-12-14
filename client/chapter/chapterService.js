import angular from 'angular';

class ChapterService {
    constructor(requestService) {
        'ngInject';

        this.requestService = requestService;

        this.loadedChapters = new Map();
    }

    requestLoadChapter(chapterId) {
        if (typeof chapterId !== 'string') {
            throw new Error('Expected a string');
        }
        if (this.loadedChapters.has(chapterId)) {
            return this.loadedChapters.get(chapterId);
        }
        const promise = this.requestService
            .post('/api/chapter/request-load', { chapterId });
        this.loadedChapters.set(chapterId, promise);
        return promise;
    }
}

export default angular.module('mangaApp.chapterService', [])
    .service('chapterService', ChapterService)
    .name;
