export default class MangaResource {
    constructor(Manga) {
        this.Manga = Manga;
    }

    getByHandle(mangaHandle) {
        return this.Manga.findOne({ 'mangaHandle.url': mangaHandle.url });
    }

    upsert(manga) {
        return this.Manga.findOneAndUpdate({ 'mangaHandle.url': manga.mangaHandle.url }, manga, { new: true, upsert: true });
    }

    getById(mangaId) {
        return this.Manga.findOne({ _id: mangaId });
    }
}

MangaResource.$name = 'mangaResource';
MangaResource.$inject = ['Manga'];
