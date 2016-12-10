import angular from 'angular';

class ChapterDetailsService {
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

export default angular.module('mangaApp.chapterDetailsService', [])
    .service('chapterDetailsService', ChapterDetailsService)
    .name;
