import Rx from 'rx';
import { PageHandle } from 'manga-api';
import Job from './Job';

export class LoadChapterJob extends Job {
    constructor(chapterId, chapterResource, pageService, pageEvents, pageResource, chapterEvents) {
        super();
        this.chapterId = chapterId;
        this.chapterResource = chapterResource;
        this.pageService = pageService;
        this.pageEvents = pageEvents;
        this.pageResource = pageResource;
        this.chapterEvents = chapterEvents;
    }

    getChapterId() {
        return this.chapterId;
    }

    run() {
        return this.getChapter()
            .then((chapter) => {
                this.chapterEvents.emitChapter(chapter);
                return chapter.pages;
            })
            .then(pages => Rx.Observable.from(pages))
            .then(pages => pages.flatMapWithMaxConcurrent(1,
                    pageHandle => Rx.Observable.defer(() => this.loadPage(pageHandle)))
                .toPromise());
    }

    loadPage(pageHandle) {
        const handle = PageHandle.fromUrl(pageHandle.url);
        return this.pageService.getOrLoadPage(handle)
            .then(() => this.pageResource.getByHandle(handle))
            .then(foundPage => this.pageEvents.emitPage(foundPage));
    }

    getChapter() {
        return this.chapterResource.getById(this.getChapterId());
    }
}

export default class LoadChapterJobFactory {
    constructor(chapterResource, pageService, pageEvents, pageResource, chapterEvents) {
        this.chapterResource = chapterResource;
        this.pageService = pageService;
        this.pageEvents = pageEvents;
        this.pageResource = pageResource;
        this.chapterEvents = chapterEvents;
    }

    create(chapterId) {
        return new LoadChapterJob(chapterId, this.chapterResource, this.pageService, this.pageEvents, this.pageResource, this.chapterEvents);
    }
}

LoadChapterJobFactory.$name = 'loadChapterJobFactory';
LoadChapterJobFactory.$inject = ['chapterResource', 'pageService', 'pageEvents', 'pageResource', 'chapterEvents'];
