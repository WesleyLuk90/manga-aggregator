import Job from './Job';

export class LoadMangaJob extends Job {
    constructor(mangaId) {
        super();
        this.mangaId = mangaId;
    }

    getMangaId() {
        return this.mangaId;
    }

    run() {

    }
}

export default class LoadMangaJobFactory {
    create(mangaId) {
        if (typeof mangaId !== 'string') {
            throw new Error('Expected a string');
        }
        return new LoadMangaJob(mangaId);
    }
}

LoadMangaJobFactory.$name = 'loadMangaJobFactory';
