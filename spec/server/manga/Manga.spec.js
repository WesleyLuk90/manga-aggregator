import { Manga, MangaHandle, ChapterHandle } from 'manga-api';

import Module from '../../../server/Module';

describe('Manga', () => {
    let bottle;
    let MangaModel;
    beforeEach(() => {
        bottle = new Module().create();
        MangaModel = bottle.container.Manga;
    });
    it('should create manga manga', (done) => {
        const manga = new Manga(MangaHandle.fromUrl('abc'))
            .setName('my name')
            .setAltNames(['alt1', 'alt2'])
            .setReleaseYear('2015')
            .setAuthors(['a1', 'a2'])
            .setArtists(['a3', 'a4'])
            .setGenres(['t1', 't2'])
            .setSummary('abc')
            .setChapters([
                ChapterHandle.fromUrl('c1'),
                ChapterHandle.fromUrl('c2'),
                ChapterHandle.fromUrl('c3'),
            ])
            .setPreviewImageUrl('some url');

        new MangaModel(manga)
            .save()
            .then(savedModel => MangaModel.findOne({ _id: savedModel._id }))
            .then((mangaModel) => {
                expect(mangaModel.mangaHandle.url).toEqual(manga.mangaHandle.url);
                expect(mangaModel.name).toEqual(manga.name);
                expect(Array.from(mangaModel.altNames)).toEqual(manga.altNames);
                expect(mangaModel.releaseYear).toEqual(manga.releaseYear);
                expect(Array.from(mangaModel.authors)).toEqual(manga.authors);
                expect(Array.from(mangaModel.artists)).toEqual(manga.artists);
                expect(Array.from(mangaModel.genres)).toEqual(manga.genres);
                expect(mangaModel.summary).toEqual(manga.summary);
                expect(mangaModel.previewImageUrl).toEqual(manga.previewImageUrl);
                expect(mangaModel.chapters.length).toEqual(manga.chapters.length);
                mangaModel.chapters
                    .forEach((chapter, index) => {
                        expect(chapter.url).toEqual(manga.chapters[index].url);
                    });
            })
            .catch(fail)
            .then(done);
    });
});
