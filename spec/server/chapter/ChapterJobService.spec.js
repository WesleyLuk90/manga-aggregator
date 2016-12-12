import BottleFactory from '../../../toolkit/BottleFactory';

describe('ChapterJobService', () => {
    let chapterJobService;
    let executorService;
    let loadChapterJobFactory;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        chapterJobService = bottle.container.chapterJobService;
        executorService = bottle.container.executorService;
        loadChapterJobFactory = bottle.container.loadChapterJobFactory;
    });

    it('should check some value', () => {
        spyOn(executorService, 'submit');
        spyOn(loadChapterJobFactory, 'create');

        chapterJobService.loadChapter('some-chapter-id');
        expect(executorService.submit).toHaveBeenCalled();
        expect(loadChapterJobFactory.create).toHaveBeenCalledWith('some-chapter-id');
    });
});
