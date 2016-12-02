import rx from 'rx';

export default class MangaService {
    constructor(repositoryList, Manga, mangaEvents) {
        this.repositoryList = repositoryList;
        this.Manga = Manga;
        this.mangaEvents = mangaEvents;
    }

    loadMangas(mangaHandles) {
        if (!Array.isArray(mangaHandles)) {
            throw new Error('Expected an array');
        }
        return rx.Observable.from(mangaHandles)
            .flatMapWithMaxConcurrent(1, mangaHandle => rx.Observable.defer(() => this.getOrLoad(mangaHandle)))
            .do((manga) => {
                this.mangaEvents.emitLoadedManga(manga);
            });
    }

    getOrLoad(mangaHandle) {
        return this.Manga.findOne({ handle: mangaHandle })
            .then((manga) => {
                if (!manga) {
                    return this.repositoryList
                        .getRepositoryForHandle(mangaHandle)
                        .getManga(mangaHandle)
                        .then(mangaData => new this.Manga(mangaData).save());
                }
                return manga;
            });
    }
}


MangaService.$name = 'mangaService';
MangaService.$inject = ['repositoryList', 'Manga', 'mangaEvents'];
