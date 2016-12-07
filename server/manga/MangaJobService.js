export default class MangaJobService {
    constructor(executorService, loadMangaJobFactory) {
        this.executorService = executorService;
        this.loadMangaJobFactory = loadMangaJobFactory;
    }

    loadMangaById(mangaId) {
        this.executorService.submit(this.loadMangaJobFactory.create(mangaId));
    }
}

MangaJobService.$name = 'mangaJobService';
MangaJobService.$inject = ['executorService', 'loadMangaJobFactory'];
