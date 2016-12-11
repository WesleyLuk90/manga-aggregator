import { Manga, MangaHandle, ChapterHandle } from 'manga-api';
import BottleFactory from '../../../toolkit/BottleFactory';
import DatabaseReset from '../../../toolkit/DatabaseReset';

describe('MangaResource', () => {
    let bottle;
    let mangaResource;
    beforeEach((done) => {
        bottle = BottleFactory.create();
        mangaResource = bottle.container.mangaResource;

        DatabaseReset.reset()
            .catch(fail)
            .then(done);
    });
    it('should create manga', (done) => {
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

        mangaResource.upsert(manga)
            .then((mangaModel) => {
                expect(mangaModel._id).toBeTruthy();

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
            .then(() => mangaResource.getByHandle(manga.getMangaHandle()))
            .then(foundManga => expect(foundManga).toBeTruthy())
            .catch(fail)
            .then(done);
    });

    it('should not find non-existant manga', (done) => {
        mangaResource.getByHandle(MangaHandle.fromUrl('doesntexist'))
            .then(foundManga => expect(foundManga).toBeNull())
            .catch(fail)
            .then(done);
    });

    it('should upsert manga', (done) => {
        const manga = new Manga(MangaHandle.fromUrl('some-manga-url'));

        mangaResource.upsert(manga)
            .then(createdManga =>
                mangaResource
                .upsert(manga)
                .then(secondManga =>
                    expect(secondManga._id).toEqual(createdManga._id)),
            )
            .catch(fail)
            .then(done);
    });

    it('should get by id', (done) => {
        const myMangaUrl = 'some manga url';
        const manga = new Manga(MangaHandle.fromUrl(myMangaUrl));
        mangaResource.upsert(manga)
            .then(createdManga => mangaResource.getById(createdManga._id))
            .then(foundManga => expect(foundManga.mangaHandle.url).toBe(myMangaUrl))
            .catch(fail)
            .then(done);
    });

    it('should get manga by chapter', (done) => {
        const chapterHandle = ChapterHandle.fromUrl('mock://chapter');
        const manga = new Manga(MangaHandle.fromUrl('mock://manga'))
            .setChapters([chapterHandle]);
        mangaResource.upsert(manga)
            .then(createdManga => mangaResource.getByChapter(chapterHandle)
                .then(foundManga => expect(createdManga._id).toEqual(foundManga._id)))
            .catch(fail)
            .then(done);
    });
});
