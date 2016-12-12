import BottleFactory from '../../../toolkit/BottleFactory';

describe('ChapterRoutes', () => {
    let chapterRoutes;
    let chapterJobService;
    let res;
    let req;

    beforeEach(() => {
        const bottle = BottleFactory.create();
        chapterRoutes = bottle.container.chapterRoutes;
        chapterJobService = bottle.container.chapterJobService;
        req = { query: {} };
        res = jasmine.createSpyObj('response', ['json', 'send']);
        spyOn(chapterJobService, 'loadChapter');
    });

    it('should check some value', () => {
        req.body = {
            chapterId: 'some-chapter-id',
        };
        chapterRoutes.requestLoadChapter(req, res);
        expect(res.json).toHaveBeenCalledWith({});
        expect(chapterJobService.loadChapter).toHaveBeenCalledWith('some-chapter-id');
    });
});
