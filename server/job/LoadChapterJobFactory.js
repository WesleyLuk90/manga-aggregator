import Job from './Job';

export class LoadChapterJob extends Job {
    constructor(chapterId) {
        super();
        this.chapterId = chapterId;
    }

    getChapterId() {
        return this.chapterId;
    }

    run() {

    }
}

export default class LoadChapterJobFactory {
    create(chapterId) {
        return new LoadChapterJob(chapterId);
    }
}

LoadChapterJobFactory.$name = 'loadChapterJobFactory';
LoadChapterJobFactory.$inject = [];
