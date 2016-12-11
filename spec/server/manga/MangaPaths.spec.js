import path from 'path';
import { Page, PageHandle } from 'manga-api';
import MangaPaths from '../../../server/manga/MangaPaths';

describe('MangaPaths', () => {
    let fileStorage;
    let mangaPaths;
    let mangaResource;
    let chapterResource;

    function normalizePath(pathToNormalize) {
        return pathToNormalize.replace(/\\/g, '/');
    }

    beforeEach(() => {
        fileStorage = jasmine.createSpyObj('fileStorage', ['getFolder']);
        fileStorage.getFolder.and.callFake(pathComponents => Promise.resolve(path.join('/base/path/', ...pathComponents)));
        mangaResource = jasmine.createSpyObj('mangaResource', ['getByChapter']);
        chapterResource = jasmine.createSpyObj('mangaResource', ['getByPage']);
        mangaPaths = new MangaPaths(fileStorage, mangaResource, chapterResource);
    });

    it('should get the image extension', () => {
        expect(mangaPaths.getImageExtension('something.jpg?1234')).toBe('jpg');
        expect(mangaPaths.getImageExtension('something.png?1234')).toBe('png');
        expect(mangaPaths.getImageExtension('something.unkonwon')).toBe('jpg');
    });

    it('should make manga paths', (done) => {
        mangaPaths.getMangaFolder({ name: 'My Manga', _id: 'abc123' })
            .then(mangaFolder => expect(normalizePath(mangaFolder)).toBe('/base/path/manga/My Manga-abc123'))
            .catch(fail)
            .then(done);
    });

    it('should make image preview path', (done) => {
        mangaPaths.getPreviewImagePath({ name: 'My Manga', _id: 'abc123', previewImageUrl: 'something.png' })
            .then(previewImagePath => expect(normalizePath(previewImagePath)).toBe('/base/path/manga/My Manga-abc123/preview-image.png'))
            .catch(fail)
            .then(done);
    });

    it('should make image preview path', (done) => {
        mangaPaths.getPreviewImagePath({ name: 'My Manga', _id: 'abc123', previewImageUrl: 'something.jpg?something' })
            .then(previewImagePath => expect(normalizePath(previewImagePath)).toBe('/base/path/manga/My Manga-abc123/preview-image.jpg'))
            .catch(fail)
            .then(done);
    });

    describe('page image paths', () => {
        beforeEach(() => {
            const manga = { _id: 'abc123', name: 'My Manga' };
            mangaResource.getByChapter.and.returnValue(Promise.resolve(manga));
            const chapter = {
                _id: 'some-chapter',
                chapter: '10.5',
                chapterHandle: { url: 'mock://chapter' },
                pages: [{ url: 'mock://page1' }, { url: 'mock://page2' }],
            };
            chapterResource.getByPage.and.returnValue(Promise.resolve(chapter));
        });

        it('should make a page image path', (done) => {
            const page = new Page(PageHandle.fromUrl('mock://page2'));
            page.fileName = '2.jpg';
            mangaPaths.getPageImagePath(page)
                .then((imagePath) => {
                    expect(normalizePath(imagePath)).toBe('/base/path/manga/My Manga-abc123/10.5-some-chapter/2.jpg');
                })
                .catch(fail)
                .then(done);
        });

        it('should throw an error if there is no fileName', (done) => {
            const page = new Page(PageHandle.fromUrl('mock://page2'));
            mangaPaths.getPageImagePath(page)
                .then(fail)
                .catch(e => expect(e).toMatch(/Expected page to have a fileName/))
                .then(done);
        });
    });
});
