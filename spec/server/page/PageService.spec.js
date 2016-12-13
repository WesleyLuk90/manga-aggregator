import { Manga, Chapter, MangaHandle, ChapterHandle, PageHandle, Page } from 'manga-api';
import fs from 'fs';
import BottleFactory from '../../../toolkit/BottleFactory';
import ImageServer from '../../../toolkit/ImageServer';
import DatabaseReset from '../../../toolkit/DatabaseReset';
import TestStorage from '../../../toolkit/TestStorage';

describe('PageService', () => {
    let pageService;
    let mangaResource;
    let chapterResource;
    let pageResource;
    let mangaPaths;
    let imageServer;

    beforeEach((done) => {
        DatabaseReset.reset()
            .catch(fail)
            .then(done);
    });

    beforeEach((done) => {
        const bottle = BottleFactory.create();
        new TestStorage().init(bottle);
        pageService = bottle.container.pageService;
        mangaResource = bottle.container.mangaResource;
        chapterResource = bottle.container.chapterResource;
        pageResource = bottle.container.pageResource;
        mangaPaths = bottle.container.mangaPaths;

        imageServer = new ImageServer();
        imageServer.start()
            .then(() => {
                const page = new Page(PageHandle.fromUrl('mock://page'))
                    .setImageUrl(imageServer.makeUrl('test.png'));
                const repo = bottle.container.repositoryList.get('MockRepository');
                spyOn(repo, 'getPage').and.returnValue(Promise.resolve(page));
            })
            .catch(fail)
            .then(done);
    });

    it('should throw an error if the parameter is not a handle', () => {
        expect(() => pageService.getOrLoadPage({ url: 'handle' })).toThrowError('Expected a PageHandle');
        expect(() => pageService.loadPage({ url: 'handle' })).toThrowError('Expected a PageHandle');
    });

    describe('loads pages', () => {
        let pageHandle;
        let chapter;
        let manga;

        beforeEach((done) => {
            pageHandle = PageHandle.fromUrl('mock://page');
            chapter = new Chapter(ChapterHandle.fromUrl('mock://chapter'))
                .setChapter('10.2')
                .setPages([pageHandle]);
            manga = new Manga(MangaHandle.fromUrl('mock://manga'))
                .setName('My Manga')
                .setChapters([chapter.chapterHandle]);
            Promise
                .all([
                    mangaResource.upsert(manga),
                    chapterResource.upsert(chapter),
                ])
                .catch(fail)
                .then(done);
        });

        it('should not have the page loaded yet', (done) => {
            pageService.pageIsLoaded(pageHandle)
                .then(loaded => expect(loaded).toBe(false))
                .catch(fail)
                .then(done);
        });

        it('should get or load pages', (done) => {
            pageService.getOrLoadPage(pageHandle)
                .then(() => pageResource.getByHandle(pageHandle))
                .then((page) => {
                    expect(page.fileName).toBe('1.png');
                    return mangaPaths.getPageImagePath(page);
                })
                .then(imagePath => fs.readFileSync(imagePath))
                .then(imageBuffer => expect(imageBuffer.equals(imageServer.getTestImageData())).toBe(true))
                .catch(fail)
                .then(done);
        });

        it('should not load the page if already loaded', (done) => {
            pageService.loadPage(pageHandle)
                .then(() => spyOn(pageService, 'loadPage'))
                .then(() => pageService.getOrLoadPage(pageHandle))
                .then(() => expect(pageService.loadPage).not.toHaveBeenCalled())
                .catch(fail)
                .then(done);
        });
    });
});
