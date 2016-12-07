import Job from './Job';

export class LoadMangaJob extends Job {
    constructor(mangaId, mangaResource) {
        super();
        this.mangaId = mangaId;
        this.mangaResource = mangaResource;
    }

    getMangaId() {
        return this.mangaId;
    }

    run() {

    }
}

export default class LoadMangaJobFactory {
    constructor(mangaResource) {
        this.mangaResource = mangaResource;
    }

    create(mangaId) {
        if (typeof mangaId !== 'string') {
            throw new Error('Expected a string');
        }
        return new LoadMangaJob(mangaId, this.mangaResource);
    }
}

LoadMangaJobFactory.$name = 'loadMangaJobFactory';
LoadMangaJobFactory.$inject = ['mangaResource'];
