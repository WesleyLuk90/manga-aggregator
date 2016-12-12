export default class ChapterJobService {
    constructor(executorService, loadChapterJobFactory) {
        this.executorService = executorService;
        this.loadChapterJobFactory = loadChapterJobFactory;
    }

    loadChapter(chapterId) {
        if (typeof chapterId !== 'string') {
            throw new Error('Expected a chapter id');
        }
        return this.executorService.submit(this.loadChapterJobFactory.create(chapterId));
    }
}

ChapterJobService.$name = 'chapterJobService';
ChapterJobService.$inject = ['executorService', 'loadChapterJobFactory'];
