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
}

MangaResource.$name = 'mangaResource';
MangaResource.$inject = ['Manga'];
