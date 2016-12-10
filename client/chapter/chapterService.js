import angular from 'angular';

class ChapterService {
    constructor(updateService) {
        'ngInject';

        this.chapters = new Map();
        updateService.subscribe('chapter', chapter => this.addChapter(chapter));
    }

    addChapter(chapter) {
        this.chapters.set(chapter.chapterHandle.url, chapter);
    }

    isChapterLoaded(chapterHandle) {
        return this.chapters.has(chapterHandle.url);
    }

    getChapter(chapterHandle) {
        return this.chapters.get(chapterHandle.url);
    }
}

export default angular.module('mangaApp.chapterService', [])
    .service('chapterService', ChapterService)
    .name;
