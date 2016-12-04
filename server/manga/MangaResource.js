export default class MangaResource {
    constructor(Manga) {
        this.Manga = Manga;
    }

    getByHandle(mangaHandle) {
        return this.Manga.findOne({ 'mangaHandle.url': mangaHandle.url });
    }

    create(manga) {
        return new this.Manga(manga)
            .save();
    }

    getById(mangaId) {
        return this.Manga.findOne({ _id: mangaId });
    }
}

MangaResource.$name = 'mangaResource';
MangaResource.$inject = ['Manga'];
