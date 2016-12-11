import { ChapterHandle, Chapter } from 'manga-api';
import BottleFactory from '../../../toolkit/BottleFactory';

fdescribe('LoadChapterJobFactory', () => {
    let loadChapterJobFactory;
    let chapterResource;
    let pageService;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        loadChapterJobFactory = bottle.container.loadChapterJobFactory;
        chapterResource = bottle.container.chapterResource;
        pageService = bottle.container.pageService;
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
        spyOn(pageService, 'getOrLoadPage').and.returnValue(Promise.resolve());

        job.run()
            .then(() => {
                expect(chapterResource.getById).toHaveBeenCalledWith('some chapter id');
                expect(pageService.getOrLoadPage).toHaveBeenCalledWith(chapter.getPage(0));
                expect(pageService.getOrLoadPage).toHaveBeenCalledWith(chapter.getPage(1));
            })
            .catch(fail)
            .then(done);
    });
});
