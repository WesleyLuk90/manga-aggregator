import rx from 'rx';
import Job from './Job';

export class LoadMangaJob extends Job {
    constructor(mangaId, mangaResource, mangaService, chapterService, chapterEvents, mangaEvents) {
        super();
        this.mangaId = mangaId;
        this.mangaResource = mangaResource;
        this.mangaService = mangaService;
        this.chapterService = chapterService;
        this.chapterEvents = chapterEvents;
        this.mangaEvents = mangaEvents;
    }

    getMangaId() {
        return this.mangaId;
    }

    run() {
        return this.mangaResource
            .getById(this.mangaId)
            .then(manga => this.loadAndEmitManga(manga))
            .then(updatedManga =>
                rx.Observable.from(updatedManga.chapters)
                .flatMapWithMaxConcurrent(1, chapterHandle =>
                    rx.Observable.defer(() => this.loadAndEmitChapter(chapterHandle)))
                .toPromise());
    }

    loadAndEmitManga(manga) {
        return this.mangaService
            .loadManga(manga.mangaHandle)
            .then((loadedManga) => {
                this.mangaEvents.emitManga(loadedManga);
                return loadedManga;
            });
    }

    loadAndEmitChapter(chapterHandle) {
        return this.chapterService
            .loadChapter(chapterHandle)
            .then(loadedChapter => this.chapterEvents.emitChapter(loadedChapter));
    }
}

export default class LoadMangaJobFactory {
    constructor(mangaResource, mangaService, chapterService, chapterEvents, mangaEvents) {
        this.mangaResource = mangaResource;
        this.mangaService = mangaService;
        this.chapterService = chapterService;
        this.chapterEvents = chapterEvents;
        this.mangaEvents = mangaEvents;
    }

    create(mangaId) {
        if (typeof mangaId !== 'string') {
            throw new Error('Expected a string');
        }
        return new LoadMangaJob(mangaId, this.mangaResource, this.mangaService, this.chapterService, this.chapterEvents, this.mangaEvents);
    }
}

LoadMangaJobFactory.$name = 'loadMangaJobFactory';
LoadMangaJobFactory.$inject = ['mangaResource', 'mangaService', 'chapterService', 'chapterEvents', 'mangaEvents'];
