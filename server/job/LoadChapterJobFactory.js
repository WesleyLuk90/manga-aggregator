import Rx from 'rx';
import Job from './Job';

export class LoadChapterJob extends Job {
    constructor(chapterId, chapterResource, pageService, pageEvents, pageResource) {
        super();
        this.chapterId = chapterId;
        this.chapterResource = chapterResource;
        this.pageService = pageService;
        this.pageEvents = pageEvents;
        this.pageResource = pageResource;
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
        return this.pageService.getOrLoadPage(pageHandle)
            .then(() => this.pageResource.getByHandle(pageHandle))
            .then(foundPage => this.pageEvents.emitPage(foundPage));
    }

    getChapter() {
        return this.chapterResource.getById(this.getChapterId());
    }
}

export default class LoadChapterJobFactory {
    constructor(chapterResource, pageService, pageEvents, pageResource) {
        this.chapterResource = chapterResource;
        this.pageService = pageService;
        this.pageEvents = pageEvents;
        this.pageResource = pageResource;
    }

    create(chapterId) {
        return new LoadChapterJob(chapterId, this.chapterResource, this.pageService, this.pageEvents, this.pageResource);
    }
}

LoadChapterJobFactory.$name = 'loadChapterJobFactory';
LoadChapterJobFactory.$inject = ['chapterResource', 'pageService', 'pageEvents', 'pageResource'];
