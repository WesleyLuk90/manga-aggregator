import Rx from 'rx';
import Job from './Job';

export class LoadChapterJob extends Job {
    constructor(chapterId, chapterResource, pageService) {
        super();
        this.chapterId = chapterId;
        this.chapterResource = chapterResource;
        this.pageService = pageService;
    }

    getChapterId() {
        return this.chapterId;
    }

    run() {
        return this.getChapter()
            .then(chapter => chapter.pages)
            .then(pages => Rx.Observable.from(pages))
            .then(pages => pages.flatMapWithMaxConcurrent(1,
                    pageHandle => Rx.Observable.defer(() => this.loadPage(pageHandle)))
                .toPromise());
    }

    loadPage(pageHandle) {
        return this.pageService.getOrLoadPage(pageHandle);
    }

    getChapter() {
        return this.chapterResource.getById(this.getChapterId());
    }
}

export default class LoadChapterJobFactory {
    constructor(chapterResource, pageService) {
        this.chapterResource = chapterResource;
        this.pageService = pageService;
    }

    create(chapterId) {
        return new LoadChapterJob(chapterId, this.chapterResource, this.pageService);
    }
}

LoadChapterJobFactory.$name = 'loadChapterJobFactory';
LoadChapterJobFactory.$inject = ['chapterResource', 'pageService'];
