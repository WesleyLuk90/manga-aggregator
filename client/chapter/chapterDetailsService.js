import angular from 'angular';

class ChapterDetailsService {
    constructor(updateService) {
        'ngInject';

        this.chapters = new Map();
        this.chapterById = new Map();
        updateService.subscribe('chapter', chapter => this.addChapter(chapter));
    }

    addChapter(chapter) {
        this.chapters.set(chapter.chapterHandle.url, chapter);
        this.chapterById.set(chapter._id, chapter);
    }

    isChapterLoaded(chapterHandle) {
        return this.chapters.has(chapterHandle.url);
    }

    getChapter(chapterHandle) {
        return this.chapters.get(chapterHandle.url);
    }

    getChapterById(chapterId) {
        return this.chapterById.get(chapterId);
    }

    isChapterLoadedById(chapterId) {
        return this.chapterById.has(chapterId);
    }
}

export default angular.module('mangaApp.chapterDetailsService', [])
    .service('chapterDetailsService', ChapterDetailsService)
    .name;
