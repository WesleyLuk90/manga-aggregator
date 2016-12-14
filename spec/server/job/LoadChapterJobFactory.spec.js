import { ChapterHandle, Chapter, PageHandle } from 'manga-api';
import BottleFactory from '../../../toolkit/BottleFactory';

describe('LoadChapterJobFactory', () => {
    let loadChapterJobFactory;
    let chapterResource;
    let pageService;
    let pageEvents;
    let pageResource;
    let chapterEvents;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        loadChapterJobFactory = bottle.container.loadChapterJobFactory;
        chapterResource = bottle.container.chapterResource;
        pageService = bottle.container.pageService;
        pageEvents = bottle.container.pageEvents;
        pageResource = bottle.container.pageResource;
        chapterEvents = bottle.container.chapterEvents;
    });

    it('should create jobs with chapter id', () => {
        const job = loadChapterJobFactory.create('some chapter id');
        expect(job.getChapterId()).toBe('some chapter id');
    });

    it('should load pages', (done) => {
        const job = loadChapterJobFactory.create('some chapter id');
        const chapter = new Chapter(ChapterHandle.fromUrl('mock://chapter'))
            .setPages([
                { url: 'mock://page1' },
                { url: 'mock://page2' },
            ]);
        spyOn(chapterResource, 'getById').and.returnValue(Promise.resolve(chapter));
        spyOn(chapterEvents, 'emitChapter');
        spyOn(pageService, 'getOrLoadPage').and.returnValue(Promise.resolve());
        spyOn(pageEvents, 'emitPage').and.returnValue(Promise.resolve());
        spyOn(pageResource, 'getByHandle').and.returnValues(
            Promise.resolve(chapter.getPage(0)),
            Promise.resolve(chapter.getPage(1)));

        job.run()
            .then(() => {
                expect(chapterEvents.emitChapter).toHaveBeenCalledWith(chapter);
                expect(chapterResource.getById).toHaveBeenCalledWith('some chapter id');
                expect(pageService.getOrLoadPage).toHaveBeenCalledWith(PageHandle.fromUrl(chapter.getPage(0).url));
                expect(pageEvents.emitPage).toHaveBeenCalledWith(chapter.getPage(0));
                expect(pageService.getOrLoadPage).toHaveBeenCalledWith(PageHandle.fromUrl(chapter.getPage(1).url));
                expect(pageEvents.emitPage).toHaveBeenCalledWith(chapter.getPage(1));
            })
            .catch(fail)
            .then(done);
    });
});
