import rx from 'rx';

export default class MangaService {
    constructor(repositoryList, mangaResource, mangaEvents, mangaImageService) {
        this.repositoryList = repositoryList;
        this.mangaResource = mangaResource;
        this.mangaEvents = mangaEvents;
        this.mangaImageService = mangaImageService;
    }

    loadMangas(mangaHandles) {
        if (!Array.isArray(mangaHandles)) {
            throw new Error('Expected an array');
        }
        const hotObservable = rx.Observable.from(mangaHandles)
            .flatMapWithMaxConcurrent(1, mangaHandle => rx.Observable.defer(() => this.getOrLoad(mangaHandle)))
            .do((manga) => {
                this.mangaEvents.emitManga(manga);
            })
            .publish();
        hotObservable.subscribeOnError(e => console.error(e.stack));
        hotObservable.connect();
        return hotObservable;
    }

    getOrLoad(mangaHandle) {
        return this.mangaResource.getByHandle(mangaHandle)
            .then((manga) => {
                if (!manga) {
                    return this.loadManga(mangaHandle);
                }
                return manga;
            });
    }

    loadManga(mangaHandle) {
        return this.repositoryList
            .getRepositoryForHandle(mangaHandle)
            .getManga(mangaHandle)
            .then(mangaData => this.mangaResource.create(mangaData));
    }

    getPreviewImage(id) {
        return this.mangaResource
            .getById(id)
            .then(manga => this.mangaImageService.getPreviewImage(manga));
    }
}


MangaService.$name = 'mangaService';
MangaService.$inject = ['repositoryList', 'mangaResource', 'mangaEvents', 'mangaImageService'];
